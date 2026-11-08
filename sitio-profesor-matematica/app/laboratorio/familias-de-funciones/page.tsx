import type { Metadata } from "next";
import { FamiliesAtlas } from "@/components/curriculum-labs";
import { Footer,Header,PageHero } from "@/components/site";
export const metadata:Metadata={title:"Atlas de familias de funciones | Zénit Lab",description:"Explora y compara funciones constantes, afines, polinómicas, radicales, racionales, exponenciales, logarítmicas y trigonométricas."};
export default function Page(){return <><Header/><main className="wrap"><PageHero kicker="Zénit Lab · aplicación 07" title="Atlas de familias de funciones" text="Reconoce cada familia por su fórmula, su gráfica, su dominio, su rango y su comportamiento esencial."/><FamiliesAtlas/></main><Footer/></>}
