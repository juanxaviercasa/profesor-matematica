import type { Metadata } from "next";
import { Footer, Header, PageHero } from "@/components/site";
import { ConversionForm } from "@/components/conversion";
import { CONTACT_EMAIL } from "@/lib/lead-message";

export const metadata: Metadata = {
  alternates: { canonical: "/contacto" },
  title: "Contacto y orientación en matemática | Sistema Zénit",
  description: "Consulta por clases de matemática y recursos educativos. Prepara un mensaje por WhatsApp con tu nivel, dificultad y horario preferido.",
};

export default function Contact(){return <><Header/><main className="contact-page-v2"><PageHero kicker="Contacto directo" title="Hablemos de tu aprendizaje" text="Cuéntame tu nivel y lo que te gustaría aprender. Revisa tu mensaje antes de compartirlo por WhatsApp; horarios y condiciones se confirman directamente."/><section id="contactar" className="wrap conversion-section lead-contact-first"><ConversionForm/></section><section className="wrap public-contact-steps" aria-labelledby="contact-steps-title">
  <div className="public-section-head"><p className="eyebrow">Contacto sencillo</p><h2 id="contact-steps-title">Decide con información clara.</h2></div>
  <div className="public-method-grid">
    <article><span>01</span><h3>Cuéntame tu objetivo</h3><p>Indica tu nivel y el tema que necesitas reforzar.</p></article>
    <article><span>02</span><h3>Revisa el mensaje</h3><p>El formulario prepara un texto para WhatsApp. Puedes editarlo antes de enviarlo.</p></article>
    <article><span>03</span><h3>Conversemos sobre opciones</h3><p>La disponibilidad, modalidad y condiciones se confirman directamente.</p></article>
  </div>
</section><section className="wrap contact-card"><a href="https://wa.me/51925475034?text=Hola%20Juan%20Xavier%2C%20quiero%20consultar%20por%20clases%20de%20matem%C3%A1tica." target="_blank" rel="noreferrer"><span>Consulta rápida</span><b>WhatsApp</b><p>+51 925 475 034</p><strong>Iniciar conversación →</strong></a><a href={`mailto:${CONTACT_EMAIL}?subject=Consulta%20sobre%20clases%20de%20matem%C3%A1tica`}><span>Consultas detalladas</span><b>Correo</b><p>{CONTACT_EMAIL}</p><strong>Escribir un correo →</strong></a><a href="https://www.tiktok.com/@sistemazenit" target="_blank" rel="noreferrer"><span>Contenido educativo</span><b>TikTok</b><p>@sistemazenit</p><strong>Ver el perfil →</strong></a></section></main><Footer/></>}
