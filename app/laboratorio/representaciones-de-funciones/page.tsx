import type { Metadata } from "next";
import Link from "next/link";
import { RepresentationLab } from "@/components/representation-lab";
import { Footer, Header, PageHero } from "@/components/site";

export const metadata:Metadata={title:"Laboratorio de representaciones de funciones",description:"Conecta entrada, salida, fórmula, tabla y gráfica en un laboratorio interactivo de Sistema Zénit."};

export default function RepresentationsPage(){return <><Header/><main><PageHero kicker="Zénit Lab · aplicación 01" title="Una función, tres representaciones" text="Elige una familia, mueve la entrada y observa al mismo tiempo la salida, la tabla y el punto correspondiente en la gráfica."/><div className="wrap"><RepresentationLab/></div><section className="wrap lab-reflection"><div><p className="eyebrow">Comprueba que entendiste</p><h2>Predice antes de mover el control.</h2></div><ol><li>Elige una familia y coloca x en 0.</li><li>Predice qué salida aparecerá para x = 1.</li><li>Comprueba tu respuesta en la tabla y la gráfica.</li><li>Explica qué cambia y qué permanece constante.</li></ol><Link className="button secondary" href="/laboratorio/lectura-de-graficas">Continuar con lectura gráfica</Link></section></main><Footer/></>}
