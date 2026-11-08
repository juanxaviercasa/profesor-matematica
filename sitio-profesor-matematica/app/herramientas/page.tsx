import type { Metadata } from "next";
import { Header, Footer } from "@/components/site";
import { HerramientasInteractiveHub } from "@/components/herramientas-hub";
import Link from "@/components/safe-link";

export const metadata: Metadata = {
  title: "Suite de Web Apps Interactivas y Constructor · Sistema Zénit",
  description: "Explora y valida las 12 Web Apps matemáticas y científicas interactivas del Sistema Zénit: conjuntos, teoría de números, división de Ruffini, puntos críticos, geometría, cónicas, circunferencia trigonométrica, estadística, razonamiento matemático, cálculo y ciencias."
};

export default function HerramientasPage() {
  return (
    <>
      <Header />
      <main className="wrap my-10 space-y-10">
        <section className="rounded-3xl border border-emerald-800/40 bg-gradient-to-br from-emerald-950/50 via-stone-900 to-stone-950 p-8 md:p-12 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <span className="inline-block rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300">
                DESPLIEGUE DIRECTO DÍA 1 · 12 MOTORES INTERACTIVOS
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                Constructor y Suite de Web Apps Zénit
              </h1>
              <p className="text-sm md:text-base text-stone-300 leading-relaxed">
                Cada tema de nuestra enciclopedia matemática cuenta con su propia herramienta interactiva responsiva. Aquí puedes probar, validar y utilizar desde el primer día los <strong>12 motores especializados</strong> que alimentan las <strong>584 páginas</strong> del ecosistema.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/blog" className="button primary text-center">
                Explorar las 584 Lecciones (Blog / Capas) →
              </Link>
              <Link href="/laboratorio" className="button secondary text-center">
                Ver Zénit Labs de Funciones
              </Link>
            </div>
          </div>
        </section>

        <HerramientasInteractiveHub />
      </main>
      <Footer />
    </>
  );
}
