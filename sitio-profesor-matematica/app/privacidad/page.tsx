import type { Metadata } from "next";
import { Footer, Header, PageHero } from "@/components/site";
import Link from "@/components/safe-link";
import { CONTACT_EMAIL } from "@/lib/lead-message";
export const metadata:Metadata={
  title:"Privacidad del formulario y contacto · Sistema Zénit",
  description:"Cómo funciona la preparación de consultas para WhatsApp y qué información comparte el visitante."
};
export default function PrivacyPage(){
  return <><Header/><main className="privacy-page-v2">
    <PageHero kicker="Información de contacto" title="Cómo tratamos tu consulta"
      text="Queremos que sepas qué ocurre al completar el formulario antes de decidir si envías un mensaje."/>
    <div className="wrap privacy-content">
      <section><h2>1. Preparar no significa enviar</h2><p>Al completar el formulario se genera una vista previa en tu navegador. No realizamos un envío automático ni almacenamos las respuestas en una base de datos del sitio.</p></section>
      <section><h2>2. Compartes los datos que elijas</h2><p>Si pulsas «Abrir WhatsApp», se abre un enlace con el texto preparado. WhatsApp puede procesar ese enlace según sus propias condiciones. Revisa el mensaje allí y pulsa «Enviar» solo si deseas compartirlo con el profesor.</p></section>
      <section><h2>3. Para qué se utilizará</h2><p>La información que decidas enviar sirve para comprender tu consulta, valorar opciones de orientación y responderte. No se reserva una plaza ni se formaliza una inscripción hasta confirmar las condiciones directamente.</p></section>
      <section><h2>4. Medición de visitas</h2><p>Cuando las herramientas de analítica están configuradas, podemos registrar eventos técnicos como visitas y clics. Los eventos propios de este formulario no incluyen tu nombre, ni tu dificultad, ni el texto del mensaje.</p></section>
      <section><h2>5. Contacto</h2><p>Si necesitas consultar cómo se gestiona una conversación que hayas enviado, escribe a <a href={"mailto:"+CONTACT_EMAIL}>{CONTACT_EMAIL}</a> o vuelve a la <Link href="/contacto">página de contacto</Link>.</p></section>
    </div>
  </main><Footer/></>;
}
