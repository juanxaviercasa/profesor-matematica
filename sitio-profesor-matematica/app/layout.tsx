import type { Metadata } from "next";
import { SITE_URL as BASE_URL } from "@/lib/site-config";
import { Analytics } from "@/components/analytics";
import { ConversionDock } from "@/components/conversion";
import "./globals.css";
import "./design-system.css";
import "katex/dist/katex.min.css";


export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Profesor Juan Xavier · Sistema Zénit",
    template: "%s · Profesor Juan Xavier",
  },
  description:
    "Matemática que conecta: 628 lecciones interactivas desde 1.° de secundaria hasta cálculo universitario y ciencias. Aprende con el profesor Juan Xavier, bachiller en Matemática y docente en Lima.",
  keywords: [
    "profesor de matemática en Lima",
    "clases de matemática Lima",
    "Sistema Zénit",
    "matematica secundaria",
    "admision UNI",
    "admision San Marcos",
    "curso de calculo",
    "algebra lineal",
    "web apps matematicas",
  ],
  authors: [{ name: "Juan Xavier Cabello Salirrosas", url: BASE_URL }],
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Profesor Juan Xavier · Sistema Zénit",
    description:
      "Enciclopedia matemática interactiva de 628 lecciones, 12 Web Apps y banco de ejercicios graduados con solucionario oficial.",
    type: "website",
    locale: "es_PE",
    url: BASE_URL,
    siteName: "Sistema Educativo Zénit",
  },
  twitter: {
    card: "summary_large_image",
    title: "Profesor Juan Xavier · Sistema Zénit",
    description:
      "Matemática que conecta: teoría estructurada, Web Apps interactivas y 628 lecciones completas.",
  },
};

const rootSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#docente`,
      name: "Juan Xavier Cabello Salirrosas",
      jobTitle: "Profesor de Matemática y Fundador del Sistema Zénit",
      description:
        "Bachiller en Matemática y docente con amplia experiencia en preparación secundaria, preuniversitaria (UNI, UNMSM, PUCP) y primeros ciclos universitarios.",
      url: BASE_URL,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lima",
        addressCountry: "PE",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Universidad Nacional de Educación Enrique Guzmán y Valle",
      },
      sameAs: [
        "https://www.tiktok.com/@sistemazenit",
        "https://www.linkedin.com/in/xaviercabello/",
      ],
    },
    {
      "@type": "EducationalOrganization",
      "@id": `${BASE_URL}/#organizacion`,
      name: "Sistema Educativo Zénit",
      url: BASE_URL,
      logo: `${BASE_URL}/brand/zenit-lockup.svg`,
      description:
        "Plataforma y enciclopedia matemática de 628 temas con Web Apps interactivas, solucionarios oficiales y banco graduado de problemas.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lima",
        addressRegion: "Lima",
        addressCountry: "PE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -12.046374,
        longitude: -77.042793,
      },
      areaServed: [
        { "@type": "AdministrativeArea", name: "Lima, Perú" },
        { "@type": "Country", name: "Perú" },
        { "@type": "GeoShape", name: "Hispanoamérica" },
      ],
      founder: {
        "@id": `${BASE_URL}/#docente`,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#sitio`,
      url: BASE_URL,
      name: "Sistema Educativo Zénit",
      inLanguage: "es",
      publisher: {
        "@id": `${BASE_URL}/#organizacion`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/blog?search={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="author" href={BASE_URL} />
        {/* Geographic Local SEO (GEO) */}
        <meta name="geo.region" content="PE-LMA" />
        <meta name="geo.placename" content="Lima, Perú" />
        <meta name="geo.position" content="-12.046374;-77.042793" />
        <meta name="ICBM" content="-12.046374, -77.042793" />
      </head>
      <body>
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootSchema) }}
        />
        {children}
        <ConversionDock />
      </body>
    </html>
  );
}
