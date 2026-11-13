import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(new URL("../" + file, import.meta.url), "utf8");
const layout = read("app/layout.tsx");
const aurora = read("app/zenit-aurora.css");
const redesign = read("app/zenit-redesign.css");
const header = read("components/site.tsx");
const phoenix = read("public/brand/zenit-phoenix.svg");
const favicon = read("public/favicon.svg");
const lockup = read("public/brand/zenit-lockup.svg");
const avatar = read("public/brand/social-avatar.svg");
const guide = read("BRAND-GUIDE.md");

assert.ok(
  layout.lastIndexOf('import "./zenit-aurora.css";') > layout.lastIndexOf('import "./zenit-redesign.css";'),
  "La base visual debe cargarse después de los estilos heredados"
);
assert.match(layout, /themeColor: "#241B4B"/);
for (const [token, hex] of Object.entries({
  "aurora-indigo": "#241b4b",
  "aurora-violet": "#6840c5",
  "aurora-violet-deep": "#4b2a96",
  "aurora-violet-glow": "#9471e5",
  "aurora-lavender": "#eee8fd",
  "aurora-paper": "#fcfbff",
  "aurora-gold": "#e8bc71",
})) {
  assert.ok(
    aurora.toLowerCase().includes("--" + token + ": " + hex),
    "Token Aurora ausente o incorrecto: " + token
  );
}
for (const token of ["--aurora-brand-gradient", "--aurora-lavender-gradient", "--aurora-gold-gradient"]) {
  assert.ok(aurora.includes(token), "Degradado faltante: " + token);
}
assert.match(header, /src="\/brand\/zenit-phoenix\.svg"/);
assert.match(header, /<b>Sistema Zénit<\/b><small>Comprende para llegar más alto.<\/small>/);
assert.match(lockup, /Sistema Zénit — Comprende para llegar más alto./);
assert.match(lockup, /Comprende para llegar más alto./);
assert.match(guide, /Los colores del fénix NO definen la paleta de la interfaz/);
assert.match(phoenix, /viewBox="470 105 1090 1840"/);
assert.match(phoenix, /stop-color="#FF5300"/);
assert.match(phoenix, /stop-color="#FFE929"/);
assert.match(favicon, /fill="#241B4B"/);
assert.match(avatar, /fill="url\(#aurora\)"/);
for (const css of [aurora, redesign]) {
  assert.doesNotMatch(css, /#(?:c32b0c|9a220d|2a120e|462118|fff0e7|ffe7d9)\b/i,
    "Restos de la antigua capa cromática rojo-naranja");
}
const luminance = (hex) => {
  const linear = [1,3,5].map((i) => parseInt(hex.slice(i,i+2),16) / 255)
    .map((v) => v <= .04045 ? v / 12.92 : ((v+.055)/1.055)**2.4);
  return linear[0]*.2126 + linear[1]*.7152 + linear[2]*.0722;
};
const contrast = (a,b) => {
  const x=luminance(a), y=luminance(b);
  return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);
};
for (const [text, background] of [
  ["#FFFFFF","#6840C5"],
  ["#241B4B","#E8BC71"],
  ["#4B2A96","#EEE8FD"],
  ["#615B76","#FFFFFF"],
]) {
  assert.ok(contrast(text,background) >= 4.5,
    "Contraste AA insuficiente: "+text+" sobre "+background);
}
console.log("✓ Zénit Aura: fénix intacto, lema correcto, degradados y contraste AA.");
