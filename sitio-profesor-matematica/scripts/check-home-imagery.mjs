import assert from "node:assert/strict";
import { readFileSync, existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const read=(name)=>readFileSync(path.join(root,name),"utf8");
const home=read("app/page.tsx");
const css=read("app/home-cinematic.css");
const layout=read("app/layout.tsx");
const names=["aspiracion","versatilidad","tecnologia","claridad","mentoria","meta"];
let total=0;
for(const name of names){
  const file=path.join(root,"public/images/home/zenit-"+name+"-hd.webp");
  assert.ok(existsSync(file),"No está la imagen "+name);
  const bytes=readFileSync(file);
  assert.equal(bytes.toString("ascii",0,4),"RIFF","Formato WebP incorrecto: "+name);
  assert.equal(bytes.toString("ascii",8,12),"WEBP","Encabezado WebP incorrecto: "+name);
  assert.ok(bytes.length>45000 && bytes.length<350000,"Archivo HD con tamaño inusual: "+name);
  total+=bytes.length;
  assert.ok(home.includes("zenit-"+name+"-hd.webp"),
    "Imagen no utilizada en la portada: "+name);
}
const courseArtworks=["algebra","aritmetica","geometria","trigonometria","razonamiento-matematico","fisica","quimica","biologia"];
let coursesBytes=0;
for(const course of courseArtworks){
  const image=path.join(root,"public/images/home/zenit-"+course+"-aura-hd.webp");
  assert.ok(existsSync(image),"Falta foto hiperrealista de curso: "+course);
  const bytes=readFileSync(image);
  assert.equal(bytes.toString("ascii",0,4),"RIFF","Firma RIFF incorrecta: "+course);
  assert.equal(bytes.toString("ascii",8,12),"WEBP","WebP incorrecto: "+course);
  assert.ok(bytes.length>50000 && bytes.length<250000,"Imagen HD de curso fuera de presupuesto: "+course);
  assert.ok(home.includes('image: "'+course+'-aura-hd.webp"'),"Curso sin imagen HD: "+course);
  coursesBytes+=bytes.length;
}
assert.ok(coursesBytes<1700000,"Ocho imágenes HD de curso demasiado pesadas: "+coursesBytes);
assert.ok(total<1600000,"Las seis fotos editoriales HD exceden el presupuesto: "+total+" bytes");
const mobileBanner=path.join(root,"public/images/home/zenit-meta-hd-mobile.webp");
const mobileBytes=readFileSync(mobileBanner);
assert.equal(mobileBytes.toString("ascii",0,4),"RIFF","Banner móvil no es WebP");
assert.equal(mobileBytes.toString("ascii",8,12),"WEBP","Banner móvil mal formado");
assert.ok(mobileBytes.length>50000 && mobileBytes.length<250000,"Banner móvil demasiado pesado");
assert.ok(home.includes('zenit-meta-hd-mobile.webp'),"Falta imagen móvil alternativa en el banner");
assert.ok(home.includes('width={1916} height={821}'),"Usar medidas nativas de la escena panorámica");
assert.ok(home.includes('width={1600} height={900}'),"Usar las medidas reales de las fotografías editoriales");
assert.ok(home.includes('width={1200} height={750}'),"Usar las medidas reales de las tarjetas");
assert.doesNotMatch(home,/zenit-(?:claridad|mentoria|meta|aspiracion|tecnologia|versatilidad)\\.webp/,"No utilizar miniaturas pixeladas");
assert.equal((home.match(/<FormulaCard\/>/g)||[]).length,1,"Debe existir solo un graficador");
assert.ok(home.includes('src="/juan-xavier.jpg"'),"Conservar el retrato real de Juan Xavier");
assert.ok(home.includes('import Image from "next/image"'));
assert.ok(home.includes('loading="eager"'),"Las fotografías de curso deben estar listas para auditoría de portada completa");
assert.ok(layout.indexOf('import "./home-cinematic.css";')>layout.indexOf('import "./hero-quadratic-lab.css";'),
  "Estilos cinematográficos deben cargarse después del hero");
for(const key of ["home-vision","home-image-subject-grid","home-innovation","home-human","home-path-head","home-cinematic-end"]){
  assert.ok(css.includes(key),"Falta CSS para la sección "+key);
  assert.ok(home.includes(key),"Falta sección visual "+key);
}
for(const bp of ["max-width: 1050px","max-width: 850px","max-width: 700px"]){
  assert.ok(css.includes(bp),"Falta breakpoint "+bp);
}
assert.doesNotMatch(home,/https?:\/\/\S+\.(?:jpg|png|webp)/i,"Las fotos deben ser locales y optimizadas");
console.log("✓ Zénit Aura HD: "+names.length+" fotos editoriales originales + 8 fotos de cursos + banner móvil WebP; "+((total+coursesBytes+mobileBytes.length)/1048576).toFixed(2)+" MiB, fundador auténtico y responsive.");
