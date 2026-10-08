"use client";

import Link from "next/link";
import { FormEvent, ReactNode, useEffect, useState } from "react";

declare global {
  interface Window { dataLayer?: Array<Record<string, unknown>> }
}

function track(event: string, details: Record<string, unknown> = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...details });
}

export function TrackedLink({href, className, eventName, children}:{href:string; className?:string; eventName:string; children:ReactNode}) {
  return <Link href={href} className={className} onClick={()=>track(eventName,{destination:href})}>{children}</Link>;
}

export function ConversionDock(){return <a className="conversion-dock" href="https://wa.me/51925475034?text=Hola%20Juan%2C%20quiero%20orientaci%C3%B3n%20para%20mejorar%20en%20matem%C3%A1tica." target="_blank" rel="noreferrer" onClick={()=>track("whatsapp_quick_click",{location:"floating_dock"})} aria-label="Consultar por WhatsApp"><span>WA</span><b>Orientación</b></a>}

const interestLabels: Record<string,string> = {
  clases:"Clases de matemática",
  curso:"Curso digital de funciones",
  webinar:"Próximo webinar",
};

export function ConversionForm(){
  const [interest,setInterest]=useState("clases");
  const [sent,setSent]=useState(false);
  const [source,setSource]=useState("sitio web");

  useEffect(()=>{
    const params=new URLSearchParams(window.location.search);
    const requested=params.get("interes");
    if(requested && interestLabels[requested]) setInterest(requested);
    const campaign=[params.get("utm_source"),params.get("utm_medium"),params.get("utm_campaign"),params.get("utm_content")].filter(Boolean).join(" / ");
    if(campaign) setSource(campaign);
    track("lead_form_view",{interest:requested || "clases",source:campaign || "direct"});
  },[]);

  function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    const data=new FormData(event.currentTarget);
    const lines=[
      "Hola Juan, quiero recibir orientación.",
      `Nombre: ${data.get("nombre")}`,
      `Interés: ${interestLabels[String(data.get("interes"))]}`,
      `Nivel: ${data.get("nivel")}`,
      `Tema: ${data.get("tema")}`,
      `Modalidad: ${data.get("modalidad")}`,
      `Horario preferido: ${data.get("horario")}`,
      data.get("detalle") ? `Detalle: ${data.get("detalle")}` : "",
      `Origen: ${source}`,
    ].filter(Boolean);
    track("lead_whatsapp_submit",{interest:data.get("interes"),level:data.get("nivel"),source});
    setSent(true);
    window.open(`https://wa.me/51925475034?text=${encodeURIComponent(lines.join("\n"))}`,"_blank","noopener,noreferrer");
  }

  return <form className="conversion-form" onSubmit={submit}>
    <div className="form-heading"><div><p className="eyebrow">Orientación inicial</p><h2>Cuéntame qué necesitas</h2></div><p>Completa estos datos y se abrirá WhatsApp con tu consulta organizada. Podrás revisar el mensaje antes de enviarlo.</p></div>
    <div className="form-grid">
      <label><span>Nombre</span><input name="nombre" autoComplete="name" required placeholder="Tu nombre"/></label>
      <label><span>Estoy interesado en</span><select name="interes" value={interest} onChange={e=>setInterest(e.target.value)} required><option value="clases">Clases de matemática</option><option value="curso">Curso digital de funciones</option><option value="webinar">Próximo webinar</option></select></label>
      <label><span>Nivel actual</span><select name="nivel" required defaultValue=""><option value="" disabled>Selecciona tu nivel</option><option>4.º o 5.º de secundaria</option><option>Preparación preuniversitaria</option><option>Primeros ciclos universitarios</option><option>Otro nivel</option></select></label>
      <label><span>Tema principal</span><select name="tema" required defaultValue="Funciones"><option>Funciones</option><option>Álgebra</option><option>Aritmética</option><option>Razonamiento matemático</option><option>Otro tema</option></select></label>
      <label><span>Modalidad preferida</span><select name="modalidad" required><option>Online</option><option>Presencial en Lima, por consultar</option><option>Cualquiera de las dos</option></select></label>
      <label><span>Horario preferido</span><select name="horario" required defaultValue=""><option value="" disabled>Selecciona una franja</option><option>Mañanas</option><option>Tardes</option><option>Noches</option><option>Fines de semana</option></select></label>
      <label className="full-field"><span>¿Qué dificultad quieres resolver?</span><textarea name="detalle" rows={4} placeholder="Por ejemplo: entiendo la fórmula, pero no sé interpretar la gráfica."/></label>
    </div>
    <label className="consent"><input type="checkbox" required/><span>Acepto abrir WhatsApp con estos datos para solicitar orientación. Nada se envía hasta que yo confirme el mensaje.</span></label>
    <div className="form-action"><button type="submit">Preparar consulta por WhatsApp</button><small>Este formulario no almacena tus respuestas en el sitio.</small></div>
    {sent && <p className="form-success" role="status">Tu consulta está preparada en WhatsApp. Revisa el mensaje y envíalo cuando estés listo.</p>}
  </form>
}
