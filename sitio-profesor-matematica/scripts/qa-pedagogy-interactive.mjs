import { chromium } from "playwright";
import axe from "axe-core";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const project = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const lessons = JSON.parse(readFileSync(join(project, "content/catalog/lessons-full.json"), "utf8"));
const published = lessons.filter(l => l.publishStatus === "published");
const base = (process.env.QA_BASE_URL || "http://127.0.0.1:8787").replace(/\/$/, "");
const folder = resolve(project, process.env.QA_OUTPUT_DIR || ".qa-output");
mkdirSync(folder, { recursive: true });
const route = l => "/aprende/" + l.area + "/" + l.course + "/" + l.slug;
const cases = [];
const covered = new Set();
for (const lesson of published) {
  if (!covered.has(lesson.appEngine)) {
    covered.add(lesson.appEngine);
    cases.push({ lesson, why: "motor-" + lesson.appEngine });
  }
}
const chem = published.filter(l => l.course === "quimica");
for (const pattern of [/gaseoso/, /soluciones químicas/i, /equilibrio químico/i,
                       /estequiometr/i, /atómic/i, /materia.*energía/i]) {
  const lesson = chem.find(l => pattern.test(l.title.toLowerCase()));
  if (lesson && !cases.some(c => c.lesson.slug === lesson.slug)) {
    cases.push({ lesson, why: "química-contextual" });
  }
}
// Asegurar cobertura de los tres laboratorios geométricos temáticos.
const geometrySlugs=[
  "segmentos-1sec-unidad1",
  "angulos-1sec-unidad2",
  "congruencia-de-triangulos-1sec-unidad3",
  "angulos-formados-por-2-rectas-paralelas-y-1-secante-1sec-unidad2"
];
for(const slug of geometrySlugs){
  const lesson=published.find(l=>l.slug===slug);
  if(!lesson)throw Error("No existe la lección geométrica publicada: "+slug);
  if(!cases.some(item=>item.lesson.slug===slug))cases.push({lesson,why:"geometria-formativa"});
}
const results = [];
const issues = [];
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const sizes = [
  { name: "movil390", width: 390, height: 844 },
  { name: "desktop1440", width: 1440, height: 900 }
];
function addIssue(level, page, reason) {
  issues.push({ level, page, reason });
}
async function open(url, size) {
  const ctx = await browser.newContext({
    viewport: { width: size.width, height: size.height },
    isMobile: size.width < 500, hasTouch: size.width < 500,
    deviceScaleFactor: 1, reducedMotion: "reduce"
  });
  const page = await ctx.newPage();
  page.setDefaultTimeout(12000);
  await page.goto(base + url, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(400);
  return { ctx, page };
}
try {
  for (const { lesson, why } of cases) {
    for (const size of sizes) {
      const key = lesson.slug + "-" + size.name;
      const entry = { slug: lesson.slug, engine: lesson.appEngine, course: lesson.course,
        size: size.name, why, slider: null, changed: null,
        overflow: null, tiny: 0, axeSerious: 0, error: null };
      const { ctx, page } = await open(route(lesson), size);
      try {
        const shell = page.locator("#lesson-simulator .zenit-webapp-shell");
        await shell.scrollIntoViewIfNeeded();
        const input = shell.locator('input[type="range"], input[type="number"]').first();
        if (await input.count()) {
          const before = await input.inputValue();
          const max = Number(await input.getAttribute("max"));
          const value = Number(before);
          await input.focus();
          await input.press(value >= max ? "ArrowLeft" : "ArrowRight");
          await page.waitForTimeout(180);
          const after = await input.inputValue();
          entry.slider = before + " → " + after;
          entry.changed = before !== after;
          if (!entry.changed) addIssue("error", key, "El control del simulador no responde al teclado");
        } else {
          addIssue("warning", key, "Simulador sin controles numéricos editables");
        }
        // Pruebas funcionales de retroalimentación pedagógica en geometría.
        if (lesson.slug==="angulos-1sec-unidad2") {
          const degrees=Number(await shell.locator("#angle-measure").inputValue());
          const correct=degrees===0?"Nulo":degrees<90?"Agudo":degrees===90?"Recto":degrees<180?"Obtuso":"Llano";
          await shell.getByRole("button",{name:correct,exact:true}).click();
          if(!await shell.getByRole("status").filter({hasText:"¡Correcto! La clasificación depende"}).count()){
            addIssue("error",key,"La clasificación interactiva del ángulo es incorrecta");
          }
          const graphic=await shell.locator('svg[aria-label^="Ángulo de"]').first().getAttribute("aria-label");
          if(!graphic?.includes(degrees+" grados")){
            addIssue("error",key,"El dibujo no anuncia la medida del ángulo actual");
          }
        }
        if (lesson.slug==="segmentos-1sec-unidad1") {
          const lengthAB=Number(await shell.locator("#segment-ab").inputValue());
          const answer=shell.getByRole("textbox", {name:/Si AB =/});
          await answer.fill(String(lengthAB+4));
          if (!await shell.getByRole("status").filter({hasText:"¡Correcto! Has aplicado"}).count()) {
            addIssue("error",key,"Segmentos no confirma correctamente la suma AB + BC = AC");
          }
          const link=await shell.locator('a[href^="https://equation.io/#"]').first().getAttribute("href");
          if(!link || !decodeURIComponent(link.split("#")[1]||"").includes("("+lengthAB+",0)")){
            addIssue("error",key,"La gráfica XY no conserva la posición actual del punto B");
          }
        }
        if (lesson.slug==="angulos-formados-por-2-rectas-paralelas-y-1-secante-1sec-unidad2") {
          const alpha=Number(await shell.locator("#parallel-angle").inputValue());
          await shell.getByRole("textbox",{name:/colateral interno/}).fill(String(180-alpha));
          if (!await shell.getByRole("status").filter({hasText:"¡Correcto! Has aplicado"}).count()) {
            addIssue("error",key,"El ángulo colateral interno no valida 180° − α");
          }
        }
        if (lesson.slug==="congruencia-de-triangulos-1sec-unidad3") {
          const ratio=Number(await shell.locator("#congruence-ratio").inputValue());
          await shell.getByRole("button",{name:ratio===100?"Sí":"No",exact:true}).click();
          if(!await shell.getByRole("status").filter({hasText:"¡Correcto! Compara"}).count()){
            addIssue("error",key,"La clasificación de congruencia no reconoce la razón de escala");
          }
        }
        const v = await shell.evaluate(el => {
          // Excluir símbolos internos de KaTeX, donde los exponentes y
          // denominadores deben ser proporcionalmente menores por notación.
          const fontSizes = [...el.querySelectorAll("p,label,button,small,span")]
            .filter(e => {
              if (e.closest(".katex,.katex-mathml,[aria-hidden='true'],.sr-only")) return false;
              const r = e.getBoundingClientRect();
              return r.width > 0 && r.height > 0 &&
                Number.parseFloat(getComputedStyle(e).fontSize) < 14;
            });
          const formulas = [...el.querySelectorAll(".math-typeset-display.math-scroll-region")]
            .filter(e => e.scrollWidth - e.clientWidth > 12);
          return { shellWidth: Math.round(el.getBoundingClientRect().width),
            pageOverflow: Math.max(0, document.documentElement.scrollWidth - innerWidth),
            tiny: fontSizes.length,
            tinyExamples: fontSizes.slice(0,8).map(e => ({
              text: (e.textContent||"").trim().slice(0,55),
              font: getComputedStyle(e).fontSize,
              selector: e.tagName.toLowerCase() + (e.className && typeof e.className === "string"
                ? "." + e.className.trim().replace(/\s+/g,".") : "")
            })),
            formulaScroll: formulas.length,
            formulaExamples: formulas.slice(0,3).map(e => e.scrollWidth-e.clientWidth)
          };
        });
        entry.overflow = v.pageOverflow;
        entry.tiny = v.tiny;
        entry.formulaScroll = v.formulaScroll;
        if (v.pageOverflow > 4) addIssue("error", key, "Desbordamiento horizontal de " + v.pageOverflow + " px");
        if (v.tiny) addIssue("warning", key,
          v.tiny + " textos visibles menores de 14 px: " +
          v.tinyExamples.map(x => x.font + " “" + x.text + "”").join("; "));
        if (v.formulaScroll) addIssue("warning", key,
          v.formulaScroll + " fórmulas aún requieren desplazamiento horizontal");
        if (size.width === 390) {
          await page.addScriptTag({ content: axe.source });
          const serious = await page.evaluate(async () => {
            const root = document.querySelector("#lesson-simulator .zenit-webapp-shell");
            const output = await window.axe.run(root, {
              runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] }
            });
            return output.violations.map(v => ({ id: v.id, impact: v.impact, count: v.nodes.length,
              targets:v.nodes.slice(0,3).map(n=>n.target.join(" ")) }));
          });
          entry.axeSerious = serious.filter(i=>["serious","critical"].includes(i.impact))
            .reduce((n,i)=>n+i.count,0);
          for (const issue of serious) addIssue(
            ["serious","critical"].includes(issue.impact) ? "error" : "warning",
            key, "axe " + issue.id + " (" + issue.impact + "): " + issue.count +
                " · " + (issue.targets||[]).join("; "));
        }
        await shell.screenshot({ path: join(folder, "ped-simulator-" + key + ".png"),
          animations:"disabled", timeout: 12000 });
      } catch (e) {
        entry.error = String(e.message).slice(0,300);
        addIssue("error", key, entry.error);
      } finally {
        results.push(entry);
        await ctx.close();
      }
    }
  }

  const quizLesson = published.find(l =>
    [...(l.exercisesF0||[]),...(l.exercisesFA||[])].some(ex => 
      Array.isArray(ex.options) && ex.options.length >= 2 &&
      /^[a-e][.)]?$/i.test(ex.answerKey || "") &&
      "abcde".indexOf(ex.answerKey[0].toLowerCase()) < ex.options.length));
  const writtenLesson = published.find(l =>
    [...(l.exercisesF0||[]),...(l.exercisesFA||[])].some(ex => !ex.options || ex.options.length < 2));
  if (!quizLesson) addIssue("error","bank","No hay lección con prueba de alternativas calificables");
  if (!writtenLesson) addIssue("error","bank","No hay lección con ejercicio de desarrollo");

  if (quizLesson) {
    const {ctx,page}=await open(route(quizLesson),sizes[0]);
    try {
      await page.locator("#lesson-exercises .exercise-bank").scrollIntoViewIfNeeded();
      const bank=page.locator("#lesson-exercises .exercise-bank");
      await bank.getByRole("button",{name:/Iniciar examen sin pistas/i}).click();
      if (await bank.getByRole("button",{name:/Ver orientación/i}).count())
        addIssue("error",quizLesson.slug,"Hay pistas accesibles durante el examen");
      const buttons=bank.locator(".math-option-button");
      if (!await buttons.count()) addIssue("error",quizLesson.slug,"El examen no presenta alternativas");
      else {
        await buttons.first().click();
        if (await bank.getByText(/Respuesta Correcta|La respuesta indicada/i).count())
          addIssue("error",quizLesson.slug,"Se revelan respuestas antes de calificar el examen");
        await bank.getByRole("button",{name:/Calificar Examen/i}).click();
        if (!await bank.locator('span[role="status"]').count())
          addIssue("warning",quizLesson.slug,"Revisar región de resultados después del envío");
      }
      await bank.locator(".math-option-button").first().screenshot({
        path: join(folder,"ped-exam-answered.png"), animations:"disabled"
      });
    } catch(e) { addIssue("error",quizLesson.slug,"Flujo de examen: "+String(e.message).slice(0,200)); }
    finally { await ctx.close(); }
  }

  if (writtenLesson) {
    const {ctx,page}=await open(route(writtenLesson),sizes[0]);
    try {
      const bank=page.locator("#lesson-exercises .exercise-bank");
      await bank.scrollIntoViewIfNeeded();
      const draft=bank.locator(".written-exercise textarea").first();
      if (!await draft.count()) addIssue("error",writtenLesson.slug,"No existe espacio de desarrollo escrito");
      else {
        await draft.fill("Datos → propiedad → procedimiento → verificación.");
        if (!await draft.inputValue()) addIssue("error",writtenLesson.slug,"No permite escribir el desarrollo");
        await draft.screenshot({
          path:join(folder,"ped-written-exercise.png"),animations:"disabled"
        });
      }
    } catch(e) {addIssue("error",writtenLesson.slug,"Ejercicio abierto: "+String(e.message).slice(0,200));}
    finally {await ctx.close();}
  }

} finally {
  await browser.close();
}
const out={cases:cases.length,published:published.length,visited:results.length,
  errors:issues.filter(x=>x.level==="error").length,
  warnings:issues.filter(x=>x.level==="warning").length,
  results,issues};
writeFileSync(join(folder,"pedagogy-interactive.json"),JSON.stringify(out,null,2));
writeFileSync(join(folder,"pedagogy-interactive.md"),[
  "# Simuladores y ejercicios — auditoría detallada",
  "Publicado: "+published.length+" lecciones. Muestras de simuladores: "+cases.length+
    ". Vistas: "+results.length+".",
  "Errores: "+out.errors+". Advertencias: "+out.warnings+".",
  "", "## Motores probados", "",
  "| Lección | Motor | Ancho | Cambio | Desbordamiento | Accesibilidad |",
  "|---|---|---|---|---:|---:|",
  ...results.map(r=>"| "+r.slug+" | "+r.engine+" | "+r.size+
    " | "+(r.slider||"—")+" | "+r.overflow+" | "+r.axeSerious+" |"),
  "", "## Hallazgos", "",
  ...issues.map(i=>"- **"+i.level+"** "+i.page+": "+i.reason)
].join("\n"));
console.log(JSON.stringify({cases:out.cases,views:out.visited,errors:out.errors,warnings:out.warnings}));
issues.slice(0,35).forEach(i=>console.log("[" + i.level.toUpperCase() + "] " + i.page + " — " + i.reason));
if(out.errors) process.exitCode=1;
