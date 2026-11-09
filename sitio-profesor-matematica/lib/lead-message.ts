export const CONTACT_WHATSAPP = "51925475034";
export const CONTACT_EMAIL = "cabellosalirrosas@gmail.com";
export const interestLabels = {
  clases: "Clases de matemática",
  curso: "Programa Funciones sin Vacíos",
  recursos: "Recursos educativos",
  general: "Otra consulta",
} as const;
export type LeadInterest = keyof typeof interestLabels;
export type LeadFields = { nombre:string; interes:LeadInterest; nivel:string; tema:string; modalidad?:string; horario?:string; detalle?:string };
export function cleanLeadField(value: unknown, limit=100):string {
  return String(value??"").replace(/[\u0000-\u001f\u007f]+/g," ").replace(/\s+/g," ").trim().slice(0,limit);
}
export function parseLeadInterest(value:string|null):LeadInterest {
  return value && Object.prototype.hasOwnProperty.call(interestLabels,value) ? value as LeadInterest : "clases";
}
export function buildLeadMessage(data:LeadFields):string {
  const lines=[
    "Hola, quisiera consultar con el profesor Juan Xavier.",
    "Nombre: "+cleanLeadField(data.nombre,80),
    "Interés: "+interestLabels[data.interes],
    "Nivel: "+cleanLeadField(data.nivel),
    "Tema: "+cleanLeadField(data.tema),
  ];
  if(data.modalidad?.trim())lines.push("Modalidad preferida: "+cleanLeadField(data.modalidad));
  if(data.horario?.trim())lines.push("Horario preferido: "+cleanLeadField(data.horario));
  if(data.detalle?.trim())lines.push("Consulta: "+cleanLeadField(data.detalle,500));
  lines.push("Quisiera conocer la disponibilidad y las condiciones vigentes. Gracias.");
  return lines.join("\n");
}
export function whatsappHref(message:string):string {
  return "https://wa.me/"+CONTACT_WHATSAPP+"?text="+encodeURIComponent(message);
}
