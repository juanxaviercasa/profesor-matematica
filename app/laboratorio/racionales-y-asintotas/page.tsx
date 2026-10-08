import type { Metadata } from "next";
import { RationalLab } from "@/components/family-deep-labs";
import { Footer,Header,PageHero } from "@/components/site";
export const metadata:Metadata={title:"Funciones racionales, huecos y asíntotas | Zénit Lab",description:"Explora restricciones, huecos y asíntotas verticales, horizontales y oblicuas."};
export default function Page(){return <><Header/><main className="wrap"><PageHero kicker="Zénit Lab · aplicación 09" title="Racionales y asíntotas" text="Distingue lo que sucede cerca de un valor excluido y aprende a leer el comportamiento al infinito."/><RationalLab/></main><Footer/></>}
