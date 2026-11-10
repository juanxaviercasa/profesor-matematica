/**
 * Auditoría de interacción: muestra representativa de cada motor publicado,
 * con capturas de simuladores, bancos, examen y práctica generada.
 */
import { chromium } from "playwright";
import axe from "axe-core";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
const catalog=JSON.parse(readFileSync(join(root,"content/catalog/lessons-index.json"),"utf8"));
const out=resolve(root,process.env.ZENIT_PEDAGOGY_QA_DIR||".pedagogy-qa");
mkdirSync(out,{recursive:true});
const base=(process.env.QA_BASE_URL||"http://127.0.0.1:8787").replace(/\/$/,"");
const samples=new Map();
for(const l of catalog.filter(l=>l.publishStatus==="published")){
  const key=l.appEngine+(l.course==="quimica"?":quimica":"");
  if(!samples.has(key))samples.set(key,l);
}
const sizes=[
  {name:"movil-390",width:390,height:844,isMobile:true,hasTouch:true},
  {name:"escritorio-1440",width:1440,height:900,isMobile:false,hasTouch:false}
];
const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
const records=[],problems=[];
const error=(rec,code,msg,severity="error")=>{
  const item={lesson:rec.slug,viewport:rec.viewport,severity,code,message:String(msg).slice(0,300)};
  rec.problems.push(item);problems.push(item);
};
async function screenshot(locator,rec,part){
  if(!await locator.count())return;
  try {
    const filename=rec.slug+"-"+rec.viewport+"-"+part+".png";
    await locator.first().screenshot({path:join(out,filename),timeout:11000,animations:"disabled"});
    rec.screenshots.push(filename);
  }catch(e){error(rec,"SCREENSHOT",e.message,"warning")}
}
for(const [engine,lesson] of samples){
  for(const viewport of sizes){
    const ctx=await browser.newContext({
      viewport:{width:viewport.width,height:viewport.height},
      isMobile:viewport.isMobile,hasTouch:viewport.hasTouch,reducedMotion:"reduce"
    });
    const page=await ctx.newPage();
    const rec={slug:lesson.slug,title:lesson.title,engine,viewport:viewport.name,
      simulator:"unchecked",slider:"not-applicable",selector:"not-applicable",
      exam:"not-applicable",generator:"not-applicable",problems:[],screenshots:[]};
    const js=[];
    page.on("pageerror",e=>js.push(e.message));
    try{
      const url="/aprende/"+lesson.area+"/"+lesson.course+"/"+lesson.slug;
      const response=await page.goto(base+url,{waitUntil:"domcontentloaded",timeout:35000});
      if(response?.status()!==200)throw Error("HTTP "+response?.status());
      await page.waitForTimeout(260);
      const docOverflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
      if(docOverflow>4)error(rec,"DOCUMENT_OVERFLOW",docOverflow+"px");
      const sim=page.locator(".zenit-webapp-shell");
      if(!await sim.count())error(rec,"MISSING_SIMULATOR","No aparece el laboratorio");
      else{
        rec.simulator="present";
        await screenshot(sim,rec,"simulador");
        const ranges=sim.locator('input[type="range"]');
        if(await ranges.count()){
          const r=ranges.first(),before=await r.inputValue();
          await r.focus();await r.press("ArrowRight");
          if(await r.inputValue()===before)await r.press("ArrowLeft");
          rec.slider=(await r.inputValue()===before)?"unchanged":"ok";
          if(rec.slider!=="ok")error(rec,"RANGE_CONTROL","Slider no cambia por teclado");
        }
        const toggles=sim.locator("button[aria-pressed]");
        if(await toggles.count()>1){
          await toggles.nth(1).click();
          rec.selector=(await toggles.nth(1).getAttribute("aria-pressed")==="true")?"ok":"failed";
          if(rec.selector!=="ok")error(rec,"SIMULATOR_TOGGLE","El selector no actualiza su estado");
        }
        if(rec.slider==="ok"||rec.selector==="ok")await screenshot(sim,rec,"simulador-interaccion");
      }
      const bank=page.locator(".exercise-bank");
      if(await bank.count()){
        await screenshot(bank,rec,"banco");
        const start=bank.getByRole("button",{name:/Iniciar examen sin pistas/});
        if(await start.count()){
          await start.click();rec.exam="started";
          if(await bank.getByRole("button",{name:/Ver orientación/}).count())error(rec,"EXAM_HINT","Pista disponible durante examen");
          const opts=bank.locator(".math-option-button:not([disabled])");
          if(await opts.count())await opts.first().click();
          if(await bank.getByText(/Coincide con la clave registrada|La clave registrada indica/).count()) {
            error(rec,"EXAM_SPOILER","Se mostró la clave antes de entregar");
          }
          const submit=bank.getByRole("button",{name:/Calificar Examen/i});
          if(await submit.count()){
            await submit.click();rec.exam="submitted";
            await screenshot(bank,rec,"examen-calificado");
          }
        }
      }
      const gen=page.locator(".infinite-problem-generator");
      if(await gen.count()){
        const options=gen.locator(".math-option-button");
        if(await options.count()!==5)error(rec,"GENERATOR_OPTIONS","El generador no tiene cinco alternativas");
        else{
          await options.first().click();
          if(!await options.first().isDisabled())error(rec,"GENERATOR_RESELECT","Permite cambiar una respuesta entregada");
          if(!await gen.locator('[role="status"]').count())error(rec,"GENERATOR_FEEDBACK","No hay explicación de la corrección");
          const steps=gen.getByRole("button",{name:/Ver demostración paso a paso/});
          if(await steps.count())await steps.click();
          await screenshot(gen,rec,"generador-resuelto");
          const next=gen.getByRole("button",{name:/Generar Nuevo Problema/});
          if(await next.count()){await next.click();rec.generator=(await options.first().isDisabled())?"failed":"ok";}
          if(rec.generator!=="ok")error(rec,"GENERATOR_RESET","No reinicia alternativas");
        }
      }
      if(viewport.name==="movil-390"){
        try{
          await page.addScriptTag({content:axe.source});
          const violations=await page.evaluate(async()=>{
            const r=await window.axe.run(document,{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21a","wcag21aa"]}});
            return r.violations.map(x=>({id:x.id,impact:x.impact,count:x.nodes.length,targets:x.nodes.slice(0,2).map(n=>n.target.join(" "))}));
          });
          for(const v of violations)error(rec,"AXE_"+v.id,v.impact+" "+v.count+" "+v.targets.join(" | "),
            ["critical","serious"].includes(v.impact)?"error":"warning");
        }catch(e){error(rec,"AXE_UNAVAILABLE",e.message,"warning")}
      }
    }catch(e){error(rec,"INTERACTION",e.message)}
    for(const e of js.slice(0,4))error(rec,"JS_ERROR",e);
    records.push(rec);
    console.log(viewport.name+" "+engine+": "+rec.problems.length+" hallazgos");
    await ctx.close();
  }
}
await browser.close();
const result={generated:new Date().toISOString(),engines:samples.size,views:records.length,
  errors:problems.filter(x=>x.severity==="error").length,
  warnings:problems.filter(x=>x.severity==="warning").length,records,problems};
writeFileSync(join(out,"resultados.json"),JSON.stringify(result,null,2));
const md=[
  "# Auditoría interactiva de simuladores y ejercicios",
  "", "Motores examinados: "+result.engines+"; vistas: "+result.views,
  "Errores: "+result.errors+"; advertencias: "+result.warnings,
  "", "| Lección / motor | Pantalla | Slider | Selector | Examen | Generador | Hallazgos |",
  "|---|---|---|---|---|---|---|",
  ...records.map(r=>"| "+r.title.replaceAll("|","/")+" / "+r.engine+" | "+
    r.viewport+" | "+r.slider+" | "+r.selector+" | "+r.exam+" | "+r.generator+" | "+r.problems.length+" |"),
  "", "## Hallazgos", "",
  ...problems.map(f=>"- "+f.severity+" "+f.lesson+" ("+f.viewport+") "+f.code+": "+f.message),
  "", "Las capturas y JSON originales se conservan como artefactos de GitHub Actions."
];
writeFileSync(join(out,"informe-interactivo.md"),md.join("\n"));
console.log(JSON.stringify({engines:result.engines,views:result.views,errors:result.errors,warnings:result.warnings}));
if(result.errors)process.exitCode=1;