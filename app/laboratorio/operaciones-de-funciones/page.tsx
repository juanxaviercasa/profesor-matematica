import type { Metadata } from "next";
import { OperationsLab } from "@/components/curriculum-labs";
import { Footer,Header,PageHero } from "@/components/site";
export const metadata:Metadata={title:"Operaciones entre funciones | Zénit Lab",description:"Practica suma, resta, producto y cociente de funciones controlando su dominio."};
export default function Page(){return <><Header/><main className="wrap"><PageHero kicker="Zénit Lab · aplicación 06" title="Operaciones entre funciones" text="Combina dos funciones, calcula sus salidas y determina el dominio de la operación resultante."/><OperationsLab/></main><Footer/></>}
