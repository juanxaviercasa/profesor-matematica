import type { Metadata } from "next";
import { MappingLab } from "@/components/advanced-labs";
import { Footer,Header,PageHero } from "@/components/site";
export const metadata:Metadata={title:"Funciones inyectivas, sobreyectivas y biyectivas | Zénit Lab",description:"Clasifica funciones como inyectivas, sobreyectivas o biyectivas mediante diagramas de correspondencia."};
export default function Page(){return <><Header/><main className="wrap"><PageHero kicker="Zénit Lab · aplicación 04" title="Clasificador de funciones" text="Aprende a distinguir funciones inyectivas, sobreyectivas y biyectivas, y conecta esa clasificación con la existencia de la inversa."/><MappingLab/></main><Footer/></>}
