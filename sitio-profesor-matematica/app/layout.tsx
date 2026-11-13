import type { Metadata, Viewport } from "next";
import { SITE_URL as BASE_URL } from "@/lib/site-config";
import { Analytics } from "@/components/analytics";
import { ConversionDock } from "@/components/conversion";
import "./globals.css";
import "./design-system.css";
import "./responsive-accessibility.css";
import "./public-pages.css";
import "./learning-experience.css";
import "./conversion-trust.css";
import "./scientific-typesetting.css";
import "katex/dist/katex.min.css";
import "./reading-comfort.css";
import "./zenit-editorial.css";
import "./math-responsive-layout.css";
import "./premium-responsive.css";
import "./home-experience.css";
import "./zenit-redesign.css";
import "./zenit-aurora.css";
import "./hero-quadratic-lab.css";
import "./home-cinematic.css";
import "./zenit-aura-home.css";
import "./zenit-aura-refinement.css";


export const viewport: Viewport = { themeColor: "#241B4B" };

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Sistema Zénit · Matemática y Ciencias",
    template: "%s · Sistema Zénit",
  },
  description:
    "Sistema Zénit: comprende para llegar más alto. Matemática y ciencias con lecciones, ejercicios y laboratorios interactivos para secundaria y preparación académica.",
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
  authors: [{ name: "Juan Xavier", url: BASE_URL }],
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Sistema Zénit · Matemática y Ciencias",
    images: [{ url: `${BASE_URL}/brand/social-avatar.png`, alt: "Identidad visual de Sistema Zénit" }],
    description:
      "Biblioteca de matemática y ciencias con simuladores interactivos, ejercicios graduados y materiales de aprendizaje.",
    type: "website",
    locale: "es_PE",
    siteName: "Sistema Zénit",
  },
  twitter: {
    card: "summary",
    images: [`${BASE_URL}/brand/social-avatar.png`],
    title: "Sistema Zénit · Matemática y Ciencias",
    description:
      "Matemática y ciencias para comprender: lecciones, ejercicios y laboratorios interactivos de Sistema Zénit.",
  },
};

const rootSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#docente`,
      name: "Juan Xavier",
      jobTitle: "Docente de Matemática y fundador del Sistema Zénit",
      description:
        "Licenciado en Ciencias de la Educación con Especialidad en Matemática, con experiencia docente escolar y preuniversitaria en Lima.",
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
      ],
    },
    {
      "@type": "EducationalOrganization",
      "@id": `${BASE_URL}/#organizacion`,
      name: "Sistema Zénit",
      url: BASE_URL,
      logo: `${BASE_URL}/brand/zenit-lockup.svg`,
      description:
        "Plataforma educativa de matemática y ciencias con lecciones, simuladores y ejercicios graduados.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lima",
        addressRegion: "Lima",
        addressCountry: "PE",
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
      name: "Sistema Zénit",
      inLanguage: "es",
      publisher: {
        "@id": `${BASE_URL}/#organizacion`,
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="author" href={BASE_URL} />
        <meta name="geo.region" content="PE-LMA" />
        <meta name="geo.placename" content="Lima, Perú" />
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
