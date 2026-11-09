import assert from "node:assert/strict";
import {existsSync,readFileSync,readdirSync} from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const read=p=>readFileSync(path.join(root,p),"utf8");
const index=JSON.parse(read("content/catalog/lessons-index.json"));
const base="https://sistemazenit.com";
const xml=read("public/sitemap.xml");
const urls=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x=>x[1]);
assert.ok(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
assert.ok(urls.length>110,"Sitemap sospechosamente pequeño");
assert.equal(new Set(urls).size,urls.length,"URLs duplicadas");
assert.ok(urls.every(u=>u===base||(u.startsWith(base+"/")&&!u.includes("?")&&!u.endsWith("/"))),"Sólo URLs canónicas");
assert.doesNotMatch(xml,/<lastmod>|<changefreq>|<priority>/,"No inventar última modificación");
const urlset=new Set(urls);
for(const page of ["/","/contacto","/privacidad","/empieza","/blog","/aprende","/herramientas","/laboratorio","/diagnostico/funciones","/sobre-mi","/profesor-matematicas-lima","/clase/funciones-antes-de-calculo","/cursos/funciones-para-calculo","/curso/funciones-sin-vacios/modulo-1","/recursos"]){
 assert.ok(urlset.has(base+(page==="/"?"":page)),"Falta ruta pública: "+page);
}
for(const page of ["/webinars/funciones-antes-del-calculo","/ruta-funciones-uni","/aprende/funciones"]){
 assert.ok(!urlset.has(base+page),"Página incompleta en sitemap: "+page);
}
let published=0,scheduled=0;
for(const l of index){
 const u=base+"/aprende/"+l.area+"/"+l.course+"/"+l.slug;
 if(l.publishStatus==="published"){assert.ok(urlset.has(u),"Lección publicada fuera del sitemap: "+l.slug);published++;}
 if(l.publishStatus==="scheduled"){assert.ok(!urlset.has(u),"Lección no publicada en sitemap: "+l.slug);scheduled++;}
}
const robots=read("public/robots.txt");
assert.match(robots,/User-agent: \*/);
assert.match(robots,/Sitemap: https:\/\/sistemazenit\.com\/sitemap\.xml/);
assert.doesNotMatch(robots,/^Disallow:\s*\/_next\/|^Disallow:\s*\/_vinext\//m);
const generator=read("scripts/pipeline/generate-sitemap-and-graph.mjs");
assert.doesNotMatch(generator,/<lastmod>|const today =/);
const staticGroup=generator.match(/const staticUrls = \[([\s\S]*?)\];/);
assert.ok(staticGroup,"No está la lista de páginas estáticas");
const staticPages=JSON.parse("["+staticGroup[1]+"]");
const expected=new Set(staticPages.map(p=>base+p));
for(const l of index){
  expected.add(base+"/aprende/"+l.area);
  expected.add(base+"/aprende/"+l.area+"/"+l.course);
  if(l.publishStatus==="published")expected.add(base+"/aprende/"+l.area+"/"+l.course+"/"+l.slug);
}
assert.deepEqual([...urlset].sort(),[...expected].sort(),"Sitemap y catálogo no coinciden");
assert.match(read("scripts/pipeline/publish-drip.mjs"),/newlyPublishedSlugs\.length === 0/);

assert.match(generator,/publishStatus === "published"/);
for(const p of ["/aprende/funciones","/ruta-funciones-uni"]){assert.ok(!generator.includes('"'+p+'"'));}
const light=read("lib/catalog-index.ts");
assert.doesNotMatch(light,/lessons-full\.json|LESSONS_FULL|SLUG_MAP/);
assert.match(read("lib/catalog-loader.ts"),/lessons-full\.json/);
assert.match(read("components/blog-constructor-explorer.tsx"),/from "@\/lib\/catalog-index"/);
function findClient(dir){
 const all=[];
 for(const ent of readdirSync(path.join(root,dir),{withFileTypes:true})){
   const sub=path.join(dir,ent.name);
   if(ent.isDirectory()) all.push(...findClient(sub));
   else if(/\.tsx?$/.test(ent.name)){
     const src=read(sub);
     if(/^\s*["']use client["'];?/.test(src))all.push([sub,src]);
   }
 }
 return all;
}
for(const [file,src] of findClient("components")){
 assert.doesNotMatch(src,/from\s*["']@\/lib\/catalog-loader["']/,"Cliente importa catálogo completo: "+file);
}
const canonical={
 "app/page.tsx":"/","app/contacto/page.tsx":"/contacto",
 "app/privacidad/page.tsx":"/privacidad","app/sobre-mi/page.tsx":"/sobre-mi",
 "app/empieza/page.tsx":"/empieza","app/cursos/funciones-para-calculo/page.tsx":"/cursos/funciones-para-calculo",
 "app/blog/page.tsx":"/blog","app/aprende/page.tsx":"/aprende",
 "app/herramientas/page.tsx":"/herramientas","app/laboratorio/page.tsx":"/laboratorio",
 "app/profesor-matematicas-lima/page.tsx":"/profesor-matematicas-lima",
 "app/diagnostico/funciones/page.tsx":"/diagnostico/funciones",
 "app/clase/funciones-antes-de-calculo/page.tsx":"/clase/funciones-antes-de-calculo",
 "app/curso/funciones-sin-vacios/modulo-1/page.tsx":"/curso/funciones-sin-vacios/modulo-1",
 "app/recursos/page.tsx":"/recursos"
};
for(const [file,url] of Object.entries(canonical)){
 const src=read(file);
 assert.ok(src.includes('canonical: "'+url+'"')||src.includes('canonical:"'+url+'"'),"Canónica ausente: "+file);
}
const area=read("app/aprende/[area]/page.tsx");
const course=read("app/aprende/[area]/[curso]/page.tsx");
const topic=read("app/aprende/[area]/[curso]/[slug]/page.tsx");
assert.ok(area.includes("canonical:")&&area.includes("areaSlug"));
assert.ok(course.includes("canonical:")&&course.includes("area"));
assert.match(topic,/catalogLesson\.publishStatus === "published"/);
assert.match(topic,/catalogLesson\.area/);
for(const p of ["app/webinars/funciones-antes-del-calculo/page.tsx","app/ruta-funciones-uni/page.tsx","app/aprende/funciones/page.tsx"]){
 assert.match(read(p),/index:\s*false/);
}
const headers=read("public/_headers");
assert.match(headers,/\/_next\/static\/\*/);
assert.match(headers,/max-age=31536000, immutable/);
assert.doesNotMatch(headers,/^\/\*\n\s*Cache-Control/m);
assert.ok(existsSync(path.join(root,"public/brand/social-avatar.png")));
console.log("✓ SEO: "+urls.length+" URLs, "+published+" publicadas, "+scheduled+" programadas excluidas; caché y división de catálogo revisadas.");
