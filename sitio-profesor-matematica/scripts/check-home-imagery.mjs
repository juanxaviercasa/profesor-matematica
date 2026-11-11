import assert from "node:assert/strict";
import { readFileSync, existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const read=(name)=>readFileSync(path.join(root,name),"utf8");
const home=read("app/page.tsx");
const css=read("app/home-cinematic.css");
const layout=read("app/layout.tsx");
const names=["aspiracion","versatilidad","tecnologia","matematica","fisica","quimica","claridad","mentoria","meta"];
let total=0;
for(const name of names){
  const file=path.join(root,"public/images/home/zenit-"+name+".webp");
  assert.ok(existsSync(file),"No está la imagen "+name);
  const bytes=readFileSync(file);
  assert.equal(bytes.toString("ascii",0,4),"RIFF","Formato WebP incorrecto: "+name);
  assert.equal(bytes.toString("ascii",8,12),"WEBP","Encabezado WebP incorrecto: "+name);
  assert.ok(bytes.length>2000 && bytes.length<50000,"Archivo con tamaño inusual: "+name);
  total+=bytes.length;
  assert.ok(home.includes("zenit-"+name+".webp") || home.includes('image: "'+name+'"'),
    "Imagen no utilizada en la portada: "+name);
}
assert.ok(total<180000,"El paquete visual es demasiado pesado: "+total+" bytes");
assert.equal((home.match(/<FormulaCard\/>/g)||[]).length,1,"Debe existir solo un graficador");
assert.ok(home.includes('src="/juan-xavier.jpg"'),"Conservar el retrato real de Juan Xavier");
assert.ok(home.includes('import Image from "next/image"'));
assert.ok(home.includes('loading="lazy"'),"Usar carga diferida");
assert.ok(layout.indexOf('import "./home-cinematic.css";')>layout.indexOf('import "./hero-quadratic-lab.css";'),
  "Estilos cinematográficos deben cargarse después del hero");
for(const key of ["home-vision","home-subject-grid","home-innovation","home-human","home-path-head","home-cinematic-end"]){
  assert.ok(css.includes(key),"Falta CSS para la sección "+key);
  assert.ok(home.includes(key),"Falta sección visual "+key);
}
for(const bp of ["max-width: 1050px","max-width: 850px","max-width: 700px"]){
  assert.ok(css.includes(bp),"Falta breakpoint "+bp);
}
assert.doesNotMatch(home,/https?:\/\/\S+\.(?:jpg|png|webp)/i,"Las fotos deben ser locales y optimizadas");
console.log("✓ 9 imágenes WebP locales ("+(total/1024).toFixed(0)+" KiB), founder auténtico, carga diferida y media queries.");
