import type { Metadata } from "next";
import { GraphReadingLab } from "@/components/curriculum-labs";
import { Footer,Header,PageHero } from "@/components/site";
export const metadata:Metadata={title:"Lectura completa de gráficas | Zénit Lab",description:"Aprende a identificar dominio, rango, ceros, crecimiento, extremos, simetría, periodicidad y asíntotas."};
export default function Page(){return <><Header/><main className="wrap"><PageHero kicker="Zénit Lab · aplicación 02" title="Lector completo de gráficas" text="Entrena la capacidad que conecta todos los temas de funciones: describir lo que una gráfica afirma antes de calcular."/><GraphReadingLab/></main><Footer/></>}
