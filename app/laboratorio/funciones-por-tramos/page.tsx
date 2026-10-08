import type { Metadata } from "next"; import { PiecewiseLab } from "@/components/advanced-labs"; import { Footer,Header,PageHero } from "@/components/site";
export const metadata:Metadata={title:"Funciones por tramos | Zénit Lab",description:"Comprende cómo se activa cada regla de una función definida por tramos."};
export default function Page(){return <><Header/><main className="wrap"><PageHero kicker="Zénit Lab · aplicación 12" title="Constructor por tramos" text="Elige entradas, identifica la regla activa y entiende los puntos abiertos y cerrados."/><PiecewiseLab/></main><Footer/></>}
