import type { Metadata } from "next"; import { InverseLab } from "@/components/advanced-labs"; import { Footer,Header,PageHero } from "@/components/site";
export const metadata:Metadata={title:"Función inversa | Zénit Lab",description:"Visualiza la función inversa como un reflejo sobre y=x y evalúa cuándo existe."};
export default function Page(){return <><Header/><main className="wrap"><PageHero kicker="Zénit Lab · aplicación 18" title="Espejo de la inversa" text="Intercambia entradas y salidas para descubrir qué significa invertir una función."/><InverseLab/></main><Footer/></>}
