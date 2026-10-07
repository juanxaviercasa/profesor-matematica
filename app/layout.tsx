import type { Metadata } from "next";
import "./globals.css";
export const metadata:Metadata={title:{default:"Funciones para Cálculo · Profesor de Matemática en Lima",template:"%s · Funciones para Cálculo"},description:"Aprende funciones y construye las bases para cálculo con explicaciones visuales, práctica y herramientas interactivas desde Lima.",icons:{icon:"/favicon.svg",shortcut:"/favicon.svg"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body>{children}</body></html>}
