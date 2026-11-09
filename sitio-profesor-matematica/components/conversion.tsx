"use client";
import Link from "./safe-link";
import { FormEvent, ReactNode, useEffect, useState } from "react";
import { buildLeadMessage, interestLabels, parseLeadInterest, whatsappHref, type LeadInterest } from "@/lib/lead-message";
declare global { interface Window { dataLayer?: Array<Record<string,unknown>> } }
function track(event:string, details:Record<string,unknown>={}) {
  if(typeof window==="undefined")return;
  window.dataLayer=window.dataLayer||[];
  window.dataLayer.push({event,...details});
}
export function TrackedLink({href,className,eventName,children}:{href:string;className?:string;eventName:string;children:ReactNode}){
  return <Link href={href} className={className} onClick={()=>track(eventName,{destination:href.split("?")[0]})}>{children}</Link>;
}
export function ConversionDock(){
  const href=whatsappHref("Hola, quisiera orientación sobre clases y recursos de matemática del Sistema Zénit.");
  return <a className="conversion-dock" href={href} target="_blank" rel="noopener noreferrer"
    onClick={()=>track("whatsapp_quick_click",{location:"floating_dock"})}
    aria-label="Consultar por WhatsApp (abre otra pestaña)"><span>WA</span><b>Orientación</b></a>;
}
type Draft={message:string;url:string;interest:LeadInterest};
export function ConversionForm(){
  const [interest,setInterest]=useState<LeadInterest>("clases");
  const [draft,setDraft]=useState<Draft|null>(null);
  useEffect(()=>{
    const requested=parseLeadInterest(new URLSearchParams(window.location.search).get("interes"));
    const frame=window.requestAnimationFrame(()=>setInterest(requested));
    track("lead_form_view",{interest:requested});
    return ()=>window.cancelAnimationFrame(frame);
  },[]);
  function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    const data=new FormData(event.currentTarget);
    const selected=parseLeadInterest(String(data.get("interes")||""));
    const message=buildLeadMessage({
      nombre:String(data.get("nombre")||""),interes:selected,nivel:String(data.get("nivel")||""),
      tema:String(data.get("tema")||""),modalidad:String(data.get("modalidad")||""),
      horario:String(data.get("horario")||""),detalle:String(data.get("detalle")||""),
    });
    setDraft({message,url:whatsappHref(message),interest:selected});
    track("lead_message_preview",{interest:selected});
  }
  return <form className="conversion-form" onSubmit={submit} onChange={()=>setDraft(null)}
    aria-label="Consulta de orientación por WhatsApp">
    <div className="form-heading"><div><p className="eyebrow">Orientación inicial</p><h2>Cuéntame qué necesitas</h2></div>
      <p>Completa lo esencial y revisa el mensaje antes de abrir WhatsApp. Nada se envía automáticamente al profesor.</p></div>
    <div className="form-grid">
      <label><span>Tu nombre *</span><input name="nombre" type="text" autoComplete="name" required maxLength={80} placeholder="Cómo te llamas"/></label>
      <label><span>¿Qué te interesa? *</span><select name="interes" value={interest}
        onChange={e=>{setInterest(parseLeadInterest(e.target.value));setDraft(null);}} required>
        {Object.entries(interestLabels).map(([value,label])=><option key={value} value={value}>{label}</option>)}
      </select></label>
      <label><span>Nivel actual *</span><select name="nivel" required defaultValue="">
        <option value="" disabled>Selecciona tu nivel</option><option>1.º a 3.º de secundaria</option>
        <option>4.º o 5.º de secundaria</option><option>Preparación preuniversitaria</option>
        <option>Primeros ciclos universitarios</option><option>Otro nivel</option>
      </select></label>
      <label><span>Tema principal *</span><select name="tema" required defaultValue="">
        <option value="" disabled>Selecciona un tema</option><option>Funciones</option><option>Álgebra</option>
        <option>Aritmética</option><option>Geometría</option><option>Trigonometría</option>
        <option>Razonamiento matemático</option><option>Física o química</option><option>Otro tema</option>
      </select></label>
      <label><span>Modalidad preferida (opcional)</span><select name="modalidad" defaultValue="">
        <option value="">Sin preferencia</option><option>En línea</option>
        <option>Presencial en Lima, por confirmar</option><option>Cualquiera</option>
      </select></label>
      <label><span>Horario preferido (opcional)</span><select name="horario" defaultValue="">
        <option value="">Por coordinar</option><option>Mañana</option><option>Tarde</option>
        <option>Noche</option><option>Fines de semana</option>
      </select></label>
      <label className="full-field"><span>¿Qué dificultad tienes? (opcional)</span><textarea
        name="detalle" rows={3} maxLength={500}
        placeholder="Ejemplo: puedo sustituir valores, pero me cuesta interpretar la gráfica."/></label>
    </div>
    <label className="consent"><input type="checkbox" name="consentimiento" required/>
      <span>Quiero preparar este mensaje para WhatsApp. Entiendo que debo abrir la aplicación y pulsar «Enviar» para compartirlo con el profesor.</span></label>
    <p className="lead-privacy-note">No guardamos tus respuestas en una base de datos del sitio.
      Consulta <Link href="/privacidad">cómo funciona este contacto y qué datos intervienen</Link>.</p>
    <div className="form-action"><button type="submit">1. Revisar mi consulta</button>
      <small>Primero revisas el texto; después decides si deseas compartirlo.</small></div>
    {draft&&<section id="consulta-previa" className="lead-preview" aria-labelledby="preview-title">
      <p className="eyebrow">Mensaje preparado</p><h3 id="preview-title">Revisa lo que compartirás</h3>
      <textarea readOnly aria-label="Vista previa del mensaje de WhatsApp" rows={9} value={draft.message}/>
      <p>Este paso <strong>no ha enviado tu consulta</strong>. Puedes modificar los campos anteriores y volver a preparar el mensaje.</p>
      <a href={draft.url} className="lead-whatsapp-link" target="_blank" rel="noopener noreferrer"
        onClick={()=>track("lead_whatsapp_click",{interest:draft.interest,location:"form_preview"})}>
        2. Abrir WhatsApp para enviar <span aria-hidden="true">↗</span></a>
      <small>WhatsApp abre el texto listo para revisar; tú eliges si pulsas «Enviar». Si no se abre, comprueba que la aplicación esté disponible.</small>
    </section>}
  </form>;
}
