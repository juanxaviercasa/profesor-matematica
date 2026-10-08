import type { Metadata } from "next";
import { PolynomialLab } from "@/components/family-deep-labs";
import { Footer,Header,PageHero } from "@/components/site";
export const metadata:Metadata={title:"Polinomios, raíces y multiplicidad | Zénit Lab",description:"Relaciona factorización, multiplicidad, signos y comportamiento gráfico de funciones polinómicas."};
export default function Page(){return <><Header/><main className="wrap"><PageHero kicker="Zénit Lab · aplicación 08" title="Polinomios y multiplicidad" text="Descubre por qué una gráfica cruza, toca o se aplana en una raíz y conecta ese comportamiento con la factorización."/><PolynomialLab/></main><Footer/></>}
