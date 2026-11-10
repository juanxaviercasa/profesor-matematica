import Link from "@/components/safe-link";
import { Header, Footer } from "@/components/site";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="wrap zenit-not-found" id="zenit-main">
        <div className="zenit-not-found__number" aria-hidden="true">404</div>
        <div>
          <p className="eyebrow">No encontramos esta dirección</p>
          <h1>El aprendizaje continúa por aquí.</h1>
          <p>Es posible que el enlace haya cambiado. Puedes volver a la biblioteca de lecciones, explorar los simuladores o regresar al inicio.</p>
          <nav aria-label="Opciones para continuar" className="zenit-not-found__links">
            <Link className="button" href="/aprende">Explorar lecciones</Link>
            <Link className="button secondary" href="/herramientas">Usar simuladores</Link>
            <Link className="text-link" href="/">Volver al inicio</Link>
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
}
