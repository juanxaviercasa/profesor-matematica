import type { Metadata } from "next";
import { FunctionDiagnostic } from "@/components/function-diagnostic";
import { Footer, Header, PageHero } from "@/components/site";

export const metadata:Metadata={
  alternates: { canonical: "/diagnostico/funciones" },title:"Diagnóstico gratuito de funciones",description:"Descubre en diez preguntas qué base de funciones necesitas reforzar antes de iniciar cálculo."};

export default function DiagnosticPage(){return <><Header/><main><PageHero kicker="Diagnóstico gratuito · 5 minutos" title="¿Qué vacío debes cerrar antes de cálculo?" text="Diez preguntas sobre notación, dominio, gráficas y transformaciones. Al terminar recibirás una ruta recomendada dentro de Sistema Zénit."/><div className="wrap diagnostic-page"><FunctionDiagnostic/></div></main><Footer/></>}
