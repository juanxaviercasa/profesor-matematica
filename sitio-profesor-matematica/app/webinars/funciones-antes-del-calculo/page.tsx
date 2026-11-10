import type { Metadata } from "next";
import Link from "@/components/safe-link";
import { Footer, Header, PageHero } from "@/components/site";

export const metadata: Metadata = {
  title: "Clase de funciones · Próximos encuentros | Zénit",
  robots: { index: false, follow: true }
};

export default function Webinar() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          kicker="Clase abierta · Próxima sesión en vivo"
          title="Por qué entender una fórmula no basta"
          text="Una clase sobre dominio, gráfica y comportamiento antes de empezar cálculo."
        />
        <section className="wrap course-detail">
          <div>
            <h2>En esta sesión</h2>
            <ul>
              <li>Detectaremos el error de leer una función solo como una fórmula.</li>
              <li>Resolveremos un problema conectando expresión y gráfica.</li>
              <li>Usaremos el laboratorio para predecir y comprobar.</li>
              <li>Explicaremos qué bases revisar antes de límites y derivadas.</li>
            </ul>
          </div>
          <aside className="buy-card">
            <span className="status">CONVOCATORIA ABIERTA</span>
            <h3>Próxima fecha</h3>
            <p>En línea · Horario Lima (UTC-5) · Duración: 60 minutos.</p>
            <Link className="button" href="/contacto?interes=curso">
              Quiero unirme a la lista
            </Link>
          </aside>
        </section>
        <section className="wrap">
          <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-8 text-center space-y-3">
            <h3 className="text-xl font-bold text-white">¿Cómo participar?</h3>
            <p className="text-stone-300 text-sm max-w-xl mx-auto">
              Las fechas y los accesos a la sala virtual se confirman previamente por WhatsApp para enviar los materiales de apoyo antes de la sesión.
            </p>
            <div className="pt-2">
              <Link className="button secondary" href="/contacto?interes=curso">
                Consultar próximas fechas
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
