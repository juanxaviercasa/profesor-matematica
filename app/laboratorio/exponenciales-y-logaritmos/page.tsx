import type { Metadata } from "next";
import { ExponentialLogLab } from "@/components/family-deep-labs";
import { Footer,Header,PageHero } from "@/components/site";
export const metadata:Metadata={title:"Funciones exponenciales y logarítmicas | Zénit Lab",description:"Comprende crecimiento, decaimiento, dominio, rango, asíntotas y relación inversa."};
export default function Page(){return <><Header/><main className="wrap"><PageHero kicker="Zénit Lab · aplicación 10" title="Exponenciales y logaritmos" text="Observa cómo una exponencial y su logaritmo intercambian entradas y salidas al reflejarse sobre y=x."/><ExponentialLogLab/></main><Footer/></>}
