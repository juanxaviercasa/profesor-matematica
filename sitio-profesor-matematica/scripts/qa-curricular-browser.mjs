/**
 * Chromium: comprobar realmente los 37 generadores especializados en móvil.
 * Asegura pregunta temática, 5 opciones, envío bloqueado, explicación, reinicio,
 * ausencia de scroll horizontal y capturas para revisión docente.
 */
import { chromium } from "playwright";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import vm from "node:vm";

const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
const json=p=>JSON.parse(readFileSync(join(root,p),"utf8"));
const catalog=json("content/catalog/lessons-index.json");
function exportsOf(file) {
  const source=readFileSync(join(root,file),"utf8");
  const js=ts.transpileModule(source,{compilerOptions:{
    module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022
  }}).outputText;
  const sandbox={exports:{}};
  vm.runInNewContext(js,sandbox,{timeout:4000});
  return sandbox.exports;
}
const focused=exportsOf("lib/focused-lesson-topics.ts").FOCUSED_LABS;
const curricular=exportsOf("lib/curricular-problem-generator.ts").CURRICULAR_PROBLEM_SLUGS;
const targeted=new Set([...Object.keys(focused),...curricular]);
const items=catalog.filter(l=>targeted.has(l.slug) && l.publishStatus==="published");
if(items.length!==targeted.size)throw Error("Hay rutas especializadas fuera del catálogo publicado");
const out=resolve(root,process.env.ZENIT_PEDAGOGY_QA_DIR||".pedagogy-qa");
mkdirSync(out,{recursive:true});
const base=(process.env.QA_BASE_URL||"http://127.0.0.1:8787").replace(/\/$/,"");
const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
const context=await browser.newContext({viewport:{width:390,height:844},
 isMobile:true,hasTouch:true,reducedMotion:"reduce"});
const page=await context.newPage();
page.setDefaultTimeout(13000);
const records=[],findings=[];
let done=0;
for(const lesson of items){
  const record={slug:lesson.slug,engine:focused[lesson.slug]||"curricular",status:0,
    options:0,feedback:false,steps:false,next:false,overflow:0,errors:[]};
  const error=(code,message)=>{
    const issue={slug:lesson.slug,code,message:String(message).slice(0,220)};
    record.errors.push(issue);findings.push(issue);
  };
  const js=[];
  const onPageError=e=>js.push(e.message);
  page.on("pageerror",onPageError);
  try {
    const route="/aprende/"+lesson.area+"/"+lesson.course+"/"+lesson.slug;
    const response=await page.goto(base+route,{waitUntil:"domcontentloaded",timeout:30000});
    record.status=response?.status()||0;
    if(record.status!==200){error("HTTP","HTTP "+record.status);continue;}
    const gen=page.locator(".infinite-problem-generator").first();
    await gen.waitFor({state:"visible",timeout:10000});
    const question=gen.locator("p.text-sm").first();
    const before=(await question.innerText()).trim();
    if(!before||before.length<30)error("STATEMENT","Enunciado vacío o incompleto");
    if(/inecuación cuadrática/i.test(before) &&
      lesson.course==="algebra-lineal")error("MISALIGNED_PROBLEM","Se muestra una inecuación en Álgebra Lineal");
    if(/lanzado verticalmente hacia arriba/i.test(before) &&
      lesson.course==="fisica")error("MISALIGNED_PROBLEM","Se muestra el ejercicio genérico de lanzamiento vertical");
    const options=gen.locator(".math-option-button");
    record.options=await options.count();
    if(record.options!==5){error("OPTIONS","Opciones: "+record.options);continue;}
    await options.first().click({timeout:9000});
    record.feedback=await gen.locator('[role="status"]').count()>0;
    if(!record.feedback)error("FEEDBACK","No aparece resultado de la elección");
    if(!await options.first().isDisabled())error("LOCK","Permite cambiar la respuesta enviada");
    const demonstrate=gen.getByRole("button",{name:/Ver demostración paso a paso/i});
    if(await demonstrate.count()){
      await demonstrate.first().click();
      record.steps=(await gen.getByText(/Resolución paso a paso/i).count())>0;
      if(!record.steps)error("SOLUTION","La demostración no se abre");
    }else error("SOLUTION_BUTTON","No hay acceso a la demostración");
    if(done<12||record.errors.length){
      const filename="practica-especializada-"+lesson.slug+".png";
      await gen.screenshot({path:join(out,filename),animations:"disabled",timeout:11000});
      record.screenshot=filename;
    }
    const next=gen.getByRole("button",{name:/Generar Nuevo Problema/i});
    await next.click({timeout:9000});
    const after=(await question.innerText()).trim();
    record.next=before!==after && !await options.first().isDisabled();
    if(!record.next)error("NEXT","No se genera una variante nueva o la respuesta no se reinicia");
    record.overflow=await page.evaluate(()=>Math.max(0,document.documentElement.scrollWidth-innerWidth));
    if(record.overflow>4)error("OVERFLOW","Desbordamiento: "+record.overflow+"px");
  }catch(e){error("INTERACTION",e.message)}
  finally{
    for(const e of js.slice(0,4))error("JS",e);
    page.off("pageerror",onPageError);
    records.push(record);done++;
    console.log("Práctica "+done+"/"+items.length+": "+lesson.slug+"; errores "+record.errors.length);
  }
}
await context.close();
await browser.close();
const output={createdAt:new Date().toISOString(),targets:items.length,completed:done,
 errors:findings.length,records,findings};
writeFileSync(join(out,"practicas-especializadas.json"),JSON.stringify(output,null,2));
writeFileSync(join(out,"practicas-especializadas.md"),[
 "# Pruebas funcionales individuales de los 37 generadores especializados",
 "",
 "Completadas: "+done+"/"+items.length+" · Incidencias: "+findings.length,
 "La prueba realiza clics, observa resultados y abre las demostraciones en un Worker local.",
 "",
 "| Lección | Motor | HTTP | Opciones | Explicación | Variante nueva | Errores |",
 "|---|---|---:|---:|---|---|---:|",
 ...records.map(r=>"| "+r.slug+" | "+r.engine+" | "+r.status+" | "+r.options+" | "+
  r.steps+" | "+r.next+" | "+r.errors.length+" |"),
 "",
 "## Incidencias",
 ...findings.map(f=>"- "+f.slug+" "+f.code+": "+f.message),
 "Las capturas acompañan el informe en el artefacto privado de GitHub Actions."
].join("\n"));
console.log(JSON.stringify({targets:items.length,completed:done,errors:findings.length}));
if(done!==items.length||findings.length)process.exitCode=1;
