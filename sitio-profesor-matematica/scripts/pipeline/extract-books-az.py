import os
import re
import sys
import json
import time
import zipfile
import pathlib
import datetime
import unicodedata
import xml.etree.ElementTree as ET
import pymupdf

sys.stdout.reconfigure(encoding="utf-8")

BOOKS_ROOT = pathlib.Path(r"C:\Users\cabel\Documents\Libros")
PROJECT_ROOT = pathlib.Path(__file__).resolve().parent.parent.parent
CATALOG_DIR = PROJECT_ROOT / "content" / "catalog"
CATALOG_DIR.mkdir(parents=True, exist_ok=True)


def slugify(text: str) -> str:
    text = text.replace("_", " ").replace("%2C", "").strip().lower()
    text = unicodedata.normalize("NFD", text)
    text = "".join(c for c in text if unicodedata.category(c) != "Mn")
    text = re.sub(r"[^a-z0-9]+", "-", text).strip("-")
    return text


def clean_math_str(s: str) -> str:
    if not s:
        return ""
    s = unicodedata.normalize("NFKC", s)
    return s.replace("\u2006", " ").replace("\u00a0", " ")


def find_child(elem, name: str):
    return next((c for c in elem if c.tag.endswith("}" + name) or c.tag == name), None)


def find_children(elem, name: str):
    return [c for c in elem if c.tag.endswith("}" + name) or c.tag == name]


def parse_omath(elem) -> str:
    if elem is None:
        return ""
    tag = elem.tag.split("}")[-1]
    if tag == "t":
        return clean_math_str(elem.text or "")
    elif tag == "sSup":
        base = parse_omath(find_child(elem, "e")).strip()
        exp = parse_omath(find_child(elem, "sup")).strip()
        return f"{base}^{{{exp}}}" if len(exp) > 1 else f"{base}^{exp}"
    elif tag == "sSub":
        base = parse_omath(find_child(elem, "e")).strip()
        sb = parse_omath(find_child(elem, "sub")).strip()
        return f"{base}_{{{sb}}}" if len(sb) > 1 else f"{base}_{sb}"
    elif tag == "sSubSup":
        base = parse_omath(find_child(elem, "e")).strip()
        sb = parse_omath(find_child(elem, "sub")).strip()
        exp = parse_omath(find_child(elem, "sup")).strip()
        return f"{base}_{{{sb}}}^{{{exp}}}"
    elif tag == "f":
        n_str = parse_omath(find_child(elem, "num")).strip()
        d_str = parse_omath(find_child(elem, "den")).strip()
        return f"({n_str})/({d_str})"
    elif tag == "rad":
        d_str = parse_omath(find_child(elem, "deg")).strip()
        e_str = parse_omath(find_child(elem, "e")).strip()
        return f"√({e_str})" if not d_str else f"√[{d_str}]({e_str})"
    elif tag == "d":
        pr = find_child(elem, "dPr")
        beg, end = "(", ")"
        if pr is not None:
            bc = find_child(pr, "begChr")
            ec = find_child(pr, "endChr")
            if bc is not None:
                for k, v in bc.attrib.items():
                    if k.endswith("val"):
                        beg = v
            if ec is not None:
                for k, v in ec.attrib.items():
                    if k.endswith("val"):
                        end = v
        inner = ", ".join(parse_omath(c).strip() for c in find_children(elem, "e"))
        return f"{beg}{inner}{end}"
    elif tag in ("rPr", "ctrlPr", "sSupPr", "sSubPr", "fPr", "radPr", "dPr", "pPr", "eqArrPr"):
        return ""
    else:
        return "".join(parse_omath(c) for c in elem)


def parse_ppt_node(elem) -> str:
    tag = elem.tag.split("}")[-1]
    if tag == "Fallback":
        return ""
    if tag == "oMath":
        m = parse_omath(elem).strip()
        return f" {m} " if m else ""
    if tag == "p":
        line = "".join(parse_ppt_node(c) for c in elem).strip()
        line = re.sub(r"\s+", " ", line)
        return line + "\n" if line else ""
    if tag == "t":
        return clean_math_str(elem.text or "")
    if tag in ("rPr", "pPr", "nvSpPr", "spPr", "lstStyle", "bodyPr", "endParaRPr"):
        return ""
    return "".join(parse_ppt_node(c) for c in elem)


def extract_ppt_slides(ppt_path: pathlib.Path) -> list[dict]:
    slides = []
    try:
        with zipfile.ZipFile(ppt_path, "r") as z:
            slide_files = sorted(
                [n for n in z.namelist() if n.startswith("ppt/slides/slide") and n.endswith(".xml")],
                key=lambda x: int(re.search(r"slide(\d+)\.xml", x).group(1)),
            )
            for idx, sf in enumerate(slide_files, 1):
                tree = ET.fromstring(z.read(sf))
                raw_text = parse_ppt_node(tree)
                lines = [
                    l.strip()
                    for l in raw_text.splitlines()
                    if l.strip()
                    and "Ediciones Corefo" not in l
                    and "Prohibido reproducir" not in l
                ]
                if not lines:
                    continue
                # Skip cover slide if it only has the title
                if idx == 1 and len(lines) <= 2 and len(" ".join(lines)) < 60:
                    continue
                slides.append(
                    {
                        "slideNumber": idx,
                        "heading": lines[0][:120],
                        "content": lines[1:] if len(lines) > 1 else lines,
                    }
                )
    except Exception:
        pass
    return slides


def extract_pdf_exercises(pdf_path: pathlib.Path, max_items: int = 12) -> list[dict]:
    exercises = []
    try:
        doc = pymupdf.open(pdf_path)
        all_blocks_text = []
        for page in doc:
            w = page.rect.width
            d = page.get_text("dict")
            blocks = [b for b in d.get("blocks", []) if b.get("type") == 0 and b["bbox"][1] > 58]
            blocks.sort(key=lambda b: (0 if b["bbox"][0] < w * 0.48 else 1, round(b["bbox"][1] / 10), b["bbox"][0]))
            for b in blocks:
                b_lines = []
                for line in b.get("lines", []):
                    normal_y1 = [s["bbox"][3] for s in line.get("spans", []) if s.get("size", 12) >= 10.5]
                    base_y1 = sum(normal_y1) / len(normal_y1) if normal_y1 else line["bbox"][3]
                    l_str = ""
                    for s in line.get("spans", []):
                        txt = clean_math_str(s.get("text", ""))
                        if not txt.strip():
                            l_str += txt
                            continue
                        sz = s.get("size", 12)
                        flags = s.get("flags", 0)
                        y1 = s["bbox"][3]
                        if (flags & 1) or (sz < 9.5 and y1 < base_y1 - 1.5):
                            tc = txt.strip()
                            l_str += f"^{{{tc}}}" if len(tc) > 1 else f"^{tc}"
                        elif sz < 9.5 and y1 > base_y1 + 0.5:
                            tc = txt.strip()
                            l_str += f"_{{{tc}}}" if len(tc) > 1 else f"_{tc}"
                        else:
                            l_str += txt
                    b_lines.append(l_str.strip())
                full_b = " ".join(b_lines).strip()
                if (
                    full_b
                    and "Ediciones Corefo" not in full_b
                    and "FICHA NIVEL CERO" not in full_b
                    and "FICHA ADICIONAL" not in full_b
                    and "Fichas -" not in full_b
                ):
                    all_blocks_text.append(full_b)

        combined = "\n".join(all_blocks_text)
        # Split into numbered questions
        chunks = re.split(r"(?:^|\n)(?=\d{1,2}\.\s)", combined)
        for ch in chunks:
            ch = ch.strip()
            m = re.match(r"^(\d{1,2})\.\s+(.+)$", ch, re.DOTALL)
            if not m:
                continue
            q_num = int(m.group(1))
            body = re.sub(r"\s+", " ", m.group(2)).strip()
            # Separate options a., b., c., d., e. if present
            opt_split = re.split(r"\s+(?=[a-e]\.\s)", body)
            statement = opt_split[0].strip()
            options = [o.strip() for o in opt_split[1:] if re.match(r"^[a-e]\.\s", o.strip())]
            if len(statement) >= 10:
                exercises.append(
                    {
                        "number": q_num,
                        "statement": statement[:500],
                        "options": options[:5],
                    }
                )
                if len(exercises) >= max_items:
                    break
    except Exception:
        pass
    return exercises


def classify_topic(title: str, base_slug: str) -> tuple[str, str, str, str]:
    """
    Returns (area, course, appEngine, keyFormula)
    """
    t = (title + " " + base_slug).lower()

    # 1. Estadística y Probabilidad
    if any(
        k in t
        for k in [
            "estadistica",
            "frecuencia",
            "grafico",
            "histograma",
            "tendencia-central",
            "dispersion",
            "probabilidad",
            "combinatori",
            "permutacion",
            "azar",
            "muestra",
            "promedios",
        ]
    ):
        return (
            "matematica-preuniversitaria",
            "estadistica-y-probabilidad",
            "StatisticsProbabilityLab",
            r"\bar{x} = \frac{\sum_{i=1}^n x_i f_i}{n}, \quad P(A) = \frac{n(A)}{n(\Omega)}",
        )

    # 2. Trigonometría
    if any(
        k in t
        for k in [
            "trigonometr",
            "medidas-angulares",
            "sector-circular",
            "longitud-de-arco",
            "angulos-agudos",
            "angulos-verticales",
            "angulos-horizontales",
            "posicion-normal",
            "primer-cuadrante",
            "identidades",
            "angulo-doble",
            "angulo-mitad",
            "angulo-triple",
            "angulo-compuesto",
            "angulos-compuestos",
            "angulos-multiples",
            "triangulos-oblicuangulos",
        ]
    ):
        return (
            "matematica-preuniversitaria",
            "trigonometria",
            "TrigonometryCircleLab",
            r"\sin^2(\theta) + \cos^2(\theta) = 1, \quad \frac{S}{180} = \frac{C}{200} = \frac{R}{\pi}",
        )

    # 3. Geometría Analítica y Cónicas
    if any(
        k in t
        for k in [
            "geometria-analitica",
            "ecuacion-de-la-recta",
            "estudio-de-la-recta",
            "ecuacion-de-la-circunferencia",
            "ecuacion-de-la-parabola",
            "elipse",
            "hiperbola",
            "conicas",
        ]
    ):
        return (
            "matematica-preuniversitaria",
            "geometria",
            "AnalyticConicsLab",
            r"d(P, L) = \frac{|Ax_0 + By_0 + C|}{\sqrt{A^2 + B^2}}, \quad (x-h)^2 + (y-k)^2 = r^2",
        )

    # 4. Geometría Plana, del Espacio y Transformaciones
    if any(
        k in t
        for k in [
            "segmento",
            "angulo",
            "triangulo",
            "congruencia",
            "poligono",
            "cuadrilatero",
            "circunferencia",
            "proporcionalidad",
            "semejanza",
            "relaciones-metricas",
            "area-de-",
            "perimetro",
            "regiones-sombreadas",
            "poliedro",
            "prisma",
            "piramide",
            "cilindro",
            "cono",
            "esfera",
            "solidos",
            "simetria",
            "rotacion",
            "traslacion",
            "homotecia",
            "transformaciones-geometricas",
            "mapas-y-planos",
            "escala",
            "vistas-de-un-solido",
            "despliegue",
        ]
    ):
        return (
            "matematica-preuniversitaria",
            "geometria",
            "GeometryInteractiveLab",
            r"a^2 + b^2 = c^2, \quad S_{\triangle} = \frac{b \cdot h}{2}, \quad \sum \angle_{\text{int}} = 180^\circ(n - 2)",
        )

    # 5. Razonamiento Matemático y Lógico
    if any(
        k in t
        for k in [
            "situaciones-logicas",
            "logica-proposicional",
            "cerillos",
            "monedas",
            "dados",
            "parentesco",
            "relacion-de-tiempos",
            "orden-de-informacion",
            "ordenamiento",
            "habilidad-operativa",
            "criptoaritmetica",
            "inductivo",
            "deductivo",
            "cuadrados-magicos",
            "arreglos-numericos",
            "planteo-de-ecuaciones",
            "edades",
            "moviles",
            "cronometria",
            "cortes",
            "estacas",
            "campanadas",
            "reduccion-a-la-unidad",
            "operadores",
            "analogias",
            "distribuciones",
            "secuencia",
            "psicotonico",
            "psicotecnico",
            "conteo-de-",
            "un-solo-trazo",
            "trazo-de-figuras",
            "rutas",
            "certeza",
            "maximos-y-minimos",
            "suficiencia-de-datos",
            "balanzas",
            "figura-discordante",
            "patrones",
        ]
    ):
        return (
            "matematica-preuniversitaria",
            "razonamiento-matematico",
            "LogicalReasoningLab",
            r"T_n = \frac{n(n+1)}{2}, \quad \theta = \left|30H - \frac{11}{2}M\right|",
        )

    # 6. Álgebra (Funciones, Ecuaciones, Polinomios, Matrices, Logaritmos)
    if any(k in t for k in ["funcion", "logaritmo", "programacion-lineal", "progresion", "sucesion", "series"]):
        return (
            "matematica-preuniversitaria",
            "algebra",
            "FunctionCartesianLab",
            r"f(x) = a(x - h)^2 + k, \quad \log_b(xy) = \log_b(x) + \log_b(y)",
        )

    if any(k in t for k in ["ecuacion", "inecuacion", "desigualdad", "intervalo", "valor-absoluto", "matrices", "determinante", "sistema-de-ecuaciones"]):
        return (
            "matematica-preuniversitaria",
            "algebra",
            "EquationInequalityLab",
            r"ax^2 + bx + c = 0 \implies x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}",
        )

    if any(
        k in t
        for k in [
            "expresiones-algebraicas",
            "expresion-algebraica",
            "polinomio",
            "monomio",
            "productos-notables",
            "division-algebraica",
            "cocientes-notables",
            "factorizacion",
            "fracciones-algebraicas",
            "radicacion",
            "racionalizacion",
            "teoria-de-exponentes",
            "potenciacion",
            "numeros-complejos",
            "binomio-de-newton",
        ]
    ):
        return (
            "matematica-preuniversitaria",
            "algebra",
            "PolynomialAlgebraLab",
            r"P(x) = d(x)q(x) + R(x), \quad (a \pm b)^2 = a^2 \pm 2ab + b^2",
        )

    # 7. Aritmética (Conjuntos vs Números)
    if "conjunto" in t:
        return (
            "matematica-preuniversitaria",
            "aritmetica",
            "SetVennLab",
            r"n(A \cup B) = n(A) + n(B) - n(A \cap B), \quad n[\mathcal{P}(A)] = 2^{n(A)}",
        )

    return (
        "matematica-preuniversitaria",
        "aritmetica",
        "NumberTheoryLab",
        r"N = p_1^{\alpha_1} p_2^{\alpha_2} \cdots p_k^{\alpha_k}, \quad \operatorname{MCD}(A,B) \cdot \operatorname{MCM}(A,B) = A \cdot B",
    )


def build_university_and_science_extensions() -> list[dict]:
    """
    Generates the University Mathematics & Exact Sciences (Physics/Chemistry) topics
    to complete the Octopus ("Pulpo") ecosystem.
    """
    ext_specs = [
        # Cálculo I
        ("matematica-universitaria", "calculo-1", "Definición Formal de Límite (Épsilon-Delta)", "definicion-formal-de-limite-epsilon-delta", "CalculusAnalysisLab", r"\forall \varepsilon > 0, \exists \delta > 0 : 0 < |x - c| < \delta \implies |f(x) - L| < \varepsilon", "Demostración rigurosa de límites mediante acotamiento de vecindades e interpretación geométrica interactiva."),
        ("matematica-universitaria", "calculo-1", "Límites Laterales, Infinitos y Asíntotas Completas", "limites-laterales-infinitos-y-asintotas", "CalculusAnalysisLab", r"\lim_{x \to c^-} f(x) = \lim_{x \to c^+} f(x) = L", "Criterio de existencia bilateral, comportamiento asintótico vertical, horizontal y oblicuo."),
        ("matematica-universitaria", "calculo-1", "Límites Trigonométricos y Exponenciales Notables", "limites-trigonometricos-notables-y-asintotas", "CalculusAnalysisLab", r"\lim_{x \to 0} \frac{\sin x}{x} = 1, \quad \lim_{x \to 0} (1+x)^{1/x} = e", "Demostración por el Teorema del Sándwich en el círculo unitario y formas indeterminadas 1 al infinito."),
        ("matematica-universitaria", "calculo-1", "Continuidad de Funciones y Teorema de Bolzano-Weierstrass", "continuidad-y-teorema-de-bolzano", "CalculusAnalysisLab", r"\lim_{x \to c} f(x) = f(c), \quad f(a)\cdot f(b) < 0 \implies \exists c \in (a,b) : f(c)=0", "Clasificación de discontinuidades evitables y esenciales, existencia de raíces y extremos absolutos."),
        ("matematica-universitaria", "calculo-1", "La Derivada como Límite y Regla de la Cadena", "definicion-de-la-derivada-y-regla-de-la-cadena", "CalculusAnalysisLab", r"f'(x) = \lim_{h \to 0} \frac{f(x+h)-f(x)}{h}, \quad \frac{d}{dx}[f(g(x))] = f'(g(x))g'(x)", "Interpretación geométrica de la recta tangente, diferenciabilidad vs continuidad y derivación compuesta."),
        ("matematica-universitaria", "calculo-1", "Derivación Implícita, Logarítmica y de Orden Superior", "derivacion-implicita-y-orden-superior", "CalculusAnalysisLab", r"F(x,y)=0 \implies \frac{dy}{dx} = -\frac{F_x}{F_y}, \quad \frac{d^n}{dx^n}[f(x)g(x)] = \sum_{k=0}^n \binom{n}{k} f^{(k)} g^{(n-k)}", "Fórmula de Leibniz para la derivada n-ésima, curvas algebraicas implícitas y tasas relacionadas."),
        ("matematica-universitaria", "calculo-1", "Teoremas de Rolle, Valor Medio de Lagrange y Regla de L'Hôpital", "teoremas-de-rolle-lagrange-y-lhopital", "CalculusAnalysisLab", r"f'(c) = \frac{f(b)-f(a)}{b-a}, \quad \lim_{x \to c} \frac{f(x)}{g(x)} = \lim_{x \to c} \frac{f'(x)}{g'(x)}", "Fundamentos del análisis diferencial y levantamiento riguroso de indeterminaciones 0/0 e infinito/infinito."),
        ("matematica-universitaria", "calculo-1", "Trazado de Curvas, Concavidad y Optimización con Derivadas", "optimizacion-y-trazado-de-curvas", "CalculusAnalysisLab", r"f'(x_0)=0 \land f''(x_0) > 0 \implies \text{Mínimo Local}", "Criterio de la primera y segunda derivada, puntos de inflexión y problemas de optimización en ingeniería."),
        # Cálculo II
        ("matematica-universitaria", "calculo-2", "Sumas de Riemann, Integral de Darboux y Teorema Fundamental del Cálculo", "teorema-fundamental-del-calculo-y-sumas-de-riemann", "CalculusAnalysisLab", r"\int_a^b f(x)\,dx = \lim_{\|\Delta\|\to 0} \sum_{i=1}^n f(x_i^*)\Delta x_i = F(b) - F(a)", "Particiones superiores e inferiores, conexión entre antiderivación y área bajo la curva."),
        ("matematica-universitaria", "calculo-2", "Integración por Partes, Sustitución Trigonométrica y Fracciones Parciales", "metodos-de-integracion-por-partes-y-fracciones-parciales", "CalculusAnalysisLab", r"\int u\,dv = uv - \int v\,du", "Sistematización completa de métodos de integración elemental y reducción recursiva."),
        ("matematica-universitaria", "calculo-2", "Volúmenes de Sólidos de Revolución: Discos, Arandelas y Cascarones Cilíndricos", "volumenes-de-solidos-de-revolucion", "CalculusAnalysisLab", r"V = \pi \int_a^b [R(x)^2 - r(x)^2]\,dx, \quad V = 2\pi \int_a^b x f(x)\,dx", "Cálculo de volúmenes, longitud de arco y teorema del centroide de Pappus-Guldin."),
        ("matematica-universitaria", "calculo-2", "Integrales Impropias y Criterios de Convergencia de Series Infinitas", "integrales-impropias-y-series-infinitas", "CalculusAnalysisLab", r"\int_a^\infty f(x)\,dx = \lim_{b\to\infty}\int_a^b f(x)\,dx, \quad \sum_{n=0}^\infty \frac{f^{(n)}(a)}{n!}(x-a)^n", "Criterios de d'Alembert, Cauchy, comparación, series alternadas de Leibniz y Series de Taylor/Maclaurin."),
        # Cálculo III
        ("matematica-universitaria", "calculo-3", "Derivadas Parciales, Vector Gradiente y Plano Tangente en R^3", "derivadas-parciales-gradiente-y-plano-tangente", "CalculusAnalysisLab", r"\nabla f(x,y) = \left(\frac{\partial f}{\partial x}, \frac{\partial f}{\partial y}\right), \quad D_{\mathbf{u}}f = \nabla f \cdot \mathbf{u}", "Diferenciabilidad multivariable, dirección de máximo crecimiento y curvas de nivel."),
        ("matematica-universitaria", "calculo-3", "Matriz Hessiana y Optimización con Multiplicadores de Lagrange", "optimizacion-multivariable-y-multiplicadores-de-lagrange", "CalculusAnalysisLab", r"\nabla f(x,y,z) = \lambda \nabla g(x,y,z), \quad \Delta_2 = f_{xx}f_{yy} - (f_{xy})^2", "Extremos libres y condicionados en funciones de varias variables."),
        ("matematica-universitaria", "calculo-3", "Integrales Dobles, Triples y Matriz Jacobiana de Cambio de Variables", "integrales-multiples-y-jacobiano", "CalculusAnalysisLab", r"\iint_R f(x,y)\,dx\,dy = \iint_D f(u,v)\left|\frac{\partial(x,y)}{\partial(u,v)}\right|du\,dv", "Teorema de Fubini, coordenadas polares, cilíndricas y esféricas."),
        # Álgebra Lineal y EDO
        ("matematica-universitaria", "algebra-lineal", "Espacios Vectoriales, Independencia Lineal, Base y Dimensión", "espacios-vectoriales-bases-y-dimension", "EquationInequalityLab", r"\dim(V) = \operatorname{rango}(T) + \operatorname{nulidad}(T)", "Subespacios, conjunto generador, núcleo e imagen de transformaciones lineales."),
        ("matematica-universitaria", "algebra-lineal", "Valores Propios (Autovalores), Vectores Propios y Diagonalización", "autovalores-autovectores-y-diagonalizacion", "EquationInequalityLab", r"A\mathbf{v} = \lambda\mathbf{v} \iff \det(A - \lambda I) = 0, \quad A = P D P^{-1}", "Polinomio característico, teorema espectral y proceso de ortogonalización de Gram-Schmidt."),
        ("matematica-universitaria", "ecuaciones-diferenciales", "Ecuaciones Diferenciales de Primer Orden, Lineales y Exactas", "edo-primer-orden-lineales-y-exactas", "CalculusAnalysisLab", r"\frac{dy}{dx} + P(x)y = Q(x) \implies y = e^{-\int P\,dx}\left(\int Q e^{\int P\,dx}\,dx + C\right)", "Factor integrante, ecuaciones de Bernoulli, trayectorias ortogonales y modelado dinámico."),
        ("matematica-universitaria", "ecuaciones-diferenciales", "Transformada de Laplace y Sistemas Dinámicos Lineales", "transformada-de-laplace-y-sistemas", "CalculusAnalysisLab", r"\mathcal{L}\{f(t)\}(s) = \int_0^\infty e^{-st}f(t)\,dt", "Teoremas de traslación, convolución y resolución de problemas de valor inicial."),
        # Ciencias: Física
        ("ciencias", "fisica", "Cinemática Vectorial: MRU, MRUV, Caída Libre y Movimiento Parabólico", "cinematica-velocidad-y-aceleracion-instantanea", "SciencePhysicsChemLab", r"\mathbf{r}(t) = \mathbf{r}_0 + \mathbf{v}_0 t + \frac{1}{2}\mathbf{a}t^2, \quad R_{\max} = \frac{v_0^2 \sin(2\theta)}{g}", "Estudio analítico y vectorial de trayectorias, alcance horizontal, altura máxima y gráficas cinemáticas."),
        ("ciencias", "fisica", "Leyes de Newton, Diagrama de Cuerpo Libre (DCL) y Rozamiento", "leyes-de-newton-y-diagrama-de-cuerpo-libre", "SciencePhysicsChemLab", r"\sum \mathbf{F} = m\mathbf{a}, \quad f_s \le \mu_s N, \quad f_k = \mu_k N", "Estática, primera y segunda condición de equilibrio (torque), dinámica lineal y circular."),
        ("ciencias", "fisica", "Trabajo Mecánico, Energía Cinética, Potencial y Conservación", "trabajo-energia-mecanica-y-conservacion", "SciencePhysicsChemLab", r"W_{\text{neto}} = \Delta E_k, \quad E_m = \frac{1}{2}mv^2 + mgh + \frac{1}{2}kx^2", "Teorema del trabajo y la energía mecánica, fuerzas conservativas y potencia."),
        ("ciencias", "fisica", "Movimiento Armónico Simple (MAS), Péndulo y Ondas Mecánicas", "movimiento-armonico-simple-y-frecuencia", "SciencePhysicsChemLab", r"x(t) = A\sin(\omega t + \varphi), \quad \omega = \sqrt{\frac{k}{m}}, \quad T = 2\pi\sqrt{\frac{L}{g}}", "Oscilador armónico masa-resorte, energía en el MAS y propagación de ondas."),
        ("ciencias", "fisica", "Electrostática, Ley de Coulomb, Campo Eléctrico y Circuitos de Ohm-Kirchhoff", "electrostatica-campo-electrico-y-circuitos", "SciencePhysicsChemLab", r"F = k_e\frac{|q_1 q_2|}{r^2}, \quad V = I\cdot R, \quad \sum I_{\text{entra}} = \sum I_{\text{sale}}", "Potencial eléctrico, condensadores, resistencia equivalente y leyes de mallas de Kirchhoff."),
        # Ciencias: Química
        ("ciencias", "quimica", "Estructura Atómica Moderna, Números Cuánticos y Configuración Electrónica", "estructura-atomica-numeros-cuanticos-y-configuracion", "SciencePhysicsChemLab", r"n \ge 1, \quad 0 \le l \le n-1, \quad -l \le m_l \le +l, \quad m_s = \pm\frac{1}{2}", "Principio de Aufbau (Regla del Serrucho), paramagnetismo, números cuánticos y anomalías electrónicas."),
        ("ciencias", "quimica", "Tabla Periódica, Enlace Químico, Hibridación y Geometría Molecular RPECV", "tabla-periodica-y-enlace-quimico", "SciencePhysicsChemLab", r"\Delta EN \implies \text{Covalente Apolar, Polar o Iónico}", "Propiedades periódicas, estructuras de Lewis, fuerzas intermoleculares y puentes de hidrógeno."),
        ("ciencias", "quimica", "Estequiometría, Balance Redox, Reactivo Limitante y Rendimiento", "estequiometria-reactivo-limitante-y-rendimiento", "SciencePhysicsChemLab", r"PV = nRT, \quad \%R = \frac{m_{\text{real}}}{m_{\text{teórica}}}\times 100\%", "Leyes ponderales y volumétricas, método del ión-electrón, pureza y gases ideales."),
        ("ciencias", "quimica", "Soluciones, Molaridad, Cinética, Equilibrio Químico (Kc, Kp) y pH", "soluciones-equilibrio-quimico-y-ph", "SciencePhysicsChemLab", r"M = \frac{n_{\text{soluto}}}{V_{\text{L}}}, \quad K_c = \frac{[C]^c[D]^d}{[A]^a[B]^b}, \quad \text{pH} = -\log[\text{H}^+]", "Unidades químicas de concentración, neutralización ácido-base y principio de Le Chatelier."),
    ]
    items = []
    for idx, (area, course, title, slug, engine, formula, summary) in enumerate(ext_specs, 1):
        items.append(
            {
                "id": f"ext-{course}-{slug}",
                "slug": slug,
                "baseSlug": slug,
                "title": title,
                "area": area,
                "course": course,
                "grade": 6 if area == "matematica-universitaria" else 5,
                "gradeLabel": "Universidad" if area == "matematica-universitaria" else "Preuniversitario / Ciencias",
                "unit": f"Módulo {(idx % 4) + 1}",
                "difficulty": "avanzado" if area == "matematica-universitaria" else "intermedio",
                "appEngine": engine,
                "keyFormula": formula,
                "summary": summary,
                "tags": [area.replace("-", " ").title(), course.replace("-", " ").title(), "Web App Interactiva", "Teoría + Práctica"],
                "onionLayer": 2,
                "theorySlides": [
                    {
                        "slideNumber": 1,
                        "heading": f"Fundamento Analítico: {title}",
                        "content": [
                            summary,
                            f"Ecuación central de trabajo: {formula}",
                            "En el enfoque Zénit, conectamos la formulación simbólica con la intuición geométrica y la experimentación interactiva en tiempo real.",
                        ],
                    },
                    {
                        "slideNumber": 2,
                        "heading": "Condiciones de Validez y Estrategia de Resolución",
                        "content": [
                            "1. Identificar el dominio o sistema de referencia de las variables involucradas.",
                            "2. Verificar las hipótesis del teorema antes de aplicar transformaciones algebraicas o analíticas.",
                            "3. Contrastar el resultado numérico con el simulador interactivo de esta página.",
                        ],
                    },
                ],
                "exercisesF0": [
                    {
                        "number": 1,
                        "statement": f"Aplique la relación fundamental de {title} para determinar el estado inicial del sistema bajo condiciones estándar.",
                        "options": ["a. Valor canónico unitario", "b. Doble del parámetro base", "c. Mitad del invariante", "d. Cero (equilibrio)", "e. Indeterminado"],
                    },
                    {
                        "number": 2,
                        "statement": f"Analice cómo varía la respuesta de {title} cuando el parámetro principal se duplica manteniendo las demás variables constantes.",
                        "options": ["a. Crece linealmente (×2)", "b. Crece cuadráticamente (×4)", "c. Disminuye a la mitad", "d. Permanece invariante", "e. Cambia de signo"],
                    },
                ],
                "exercisesFA": [
                    {
                        "number": 1,
                        "statement": f"[Nivel Examen Admisión / Universidad] Demuestre y calcule el valor crítico en {title} cuando actúan restricciones simultáneas de frontera.",
                        "options": ["a. Solución única óptima", "b. Dos soluciones simétricas", "c. Infinitas soluciones parametrizadas", "d. Conjunto vacío", "e. Depende de la condición inicial"],
                    }
                ],
                "externalLinks": [],
                "sourceFiles": {},
            }
        )
    return items


def main():
    t0 = time.time()
    print("Iniciando extracción A-Z desde C:\\Users\\cabel\\Documents\\Libros...")

    # Parse enlaces.txt per (grade_idx, unit_name)
    links_by_grade_unit = {}
    for grade_idx, grade_dir in enumerate(sorted([d for d in BOOKS_ROOT.iterdir() if d.is_dir()]), 1):
        enlaces_file = grade_dir / "materiales" / "enlaces.txt"
        if enlaces_file.exists():
            for line in enlaces_file.read_text(encoding="utf-8", errors="replace").splitlines():
                parts = line.split("\t")
                if len(parts) >= 3:
                    u_label = parts[0].strip().replace(" ", "_")
                    desc = parts[1].strip()
                    url = parts[2].strip()
                    links_by_grade_unit.setdefault((grade_idx, u_label), []).append({"label": desc, "url": url})

    # Discover all (grade, unit, topic) bundles
    raw_bundles = {}
    for grade_idx, grade_dir in enumerate(sorted([d for d in BOOKS_ROOT.iterdir() if d.is_dir()]), 1):
        mat_dir = grade_dir / "materiales"
        if not mat_dir.exists():
            continue
        for unit_dir in sorted([u for u in mat_dir.iterdir() if u.is_dir()]):
            for f in sorted(unit_dir.iterdir()):
                if not f.is_file():
                    continue
                m = re.match(r"^(F0|FA|PPT|LÁMINA|LAMINA)_(.+)\.(pdf|pptx)$", f.name, re.IGNORECASE)
                if not m:
                    continue
                prefix, tname, ext = m.groups()
                clean_title = tname.replace("_", " ").replace("%2C", ",").strip()
                clean_title = clean_title[0].upper() + clean_title[1:] if clean_title else tname
                base_slug = slugify(tname)
                u_short = unit_dir.name.lower().replace("_", "")
                full_slug = f"{base_slug}-{grade_idx}sec-{u_short}"
                key = (grade_idx, unit_dir.name, base_slug)
                if key not in raw_bundles:
                    raw_bundles[key] = {
                        "grade": grade_idx,
                        "gradeLabel": f"{grade_idx}.° de Secundaria",
                        "unit": unit_dir.name.replace("_", " "),
                        "unitKey": unit_dir.name,
                        "title": clean_title,
                        "baseSlug": base_slug,
                        "slug": full_slug,
                        "files": {},
                    }
                p_norm = "LAMINA" if prefix.upper().startswith("L") else prefix.upper()
                raw_bundles[key]["files"][p_norm] = f

    print(f"Descubiertos {len(raw_bundles)} paquetes temáticos en los 5 grados de secundaria.")

    lessons = []
    start_date = datetime.date(2026, 11, 8)

    for idx, ((grade_idx, unit_name, base_slug), bundle) in enumerate(sorted(raw_bundles.items()), 1):
        files = bundle["files"]
        ppt_slides = extract_ppt_slides(files["PPT"]) if "PPT" in files else []
        f0_exercises = extract_pdf_exercises(files["F0"], max_items=8) if "F0" in files else []
        fa_exercises = extract_pdf_exercises(files["FA"], max_items=8) if "FA" in files else []

        area, course, app_engine, key_formula = classify_topic(bundle["title"], base_slug)

        # Build summary from first slide or structured template
        summary = ""
        if ppt_slides and ppt_slides[0]["content"]:
            summary = " ".join(ppt_slides[0]["content"])[:240].strip()
        if len(summary) < 40:
            summary = (
                f"Estudio completo de {bundle['title']} ({bundle['gradeLabel']} · {bundle['unit']}): "
                f"fundamentos teóricos, propiedades analíticas, calculadora web app interactiva y banco graduado de ejercicios Nivel Cero y Nivel Avanzado."
            )

        difficulty = "básico" if grade_idx <= 2 else ("intermedio" if grade_idx <= 4 else "avanzado")

        # Drip schedule: first 18 lessons published immediately, then 3 per day
        if idx <= 18:
            publish_status = "published"
            drip_day = 0
            scheduled_date = start_date.isoformat()
        else:
            publish_status = "scheduled"
            drip_day = ((idx - 19) // 3) + 1
            scheduled_date = (start_date + datetime.timedelta(days=drip_day)).isoformat()

        unit_links = links_by_grade_unit.get((grade_idx, unit_name), [])[:4]

        tags = [
            bundle["gradeLabel"],
            bundle["unit"],
            course.replace("-", " ").title(),
            "Web App Interactiva",
        ]
        if f0_exercises:
            tags.append("Ficha Nivel Cero")
        if fa_exercises:
            tags.append("Ficha Adicional")
        if ppt_slides:
            tags.append("Teoría Diapositivas")

        lessons.append(
            {
                "id": f"sec{grade_idx}-{unit_name.lower()}-{base_slug}",
                "slug": bundle["slug"],
                "baseSlug": base_slug,
                "title": bundle["title"],
                "area": area,
                "course": course,
                "grade": grade_idx,
                "gradeLabel": bundle["gradeLabel"],
                "unit": bundle["unit"],
                "difficulty": difficulty,
                "appEngine": app_engine,
                "keyFormula": key_formula,
                "summary": summary,
                "tags": tags,
                "onionLayer": 1,
                "publishStatus": publish_status,
                "scheduledDate": scheduled_date,
                "dripBatch": drip_day,
                "theorySlides": ppt_slides[:10],
                "exercisesF0": f0_exercises,
                "exercisesFA": fa_exercises,
                "externalLinks": unit_links,
                "sourceFiles": {k: str(v.name) for k, v in files.items()},
            }
        )

        if idx % 100 == 0:
            print(f"  Procesados {idx}/{len(raw_bundles)} paquetes temáticos...")

    # Add university & sciences extension lessons (published immediately as anchor nodes)
    ext_lessons = build_university_and_science_extensions()
    for el in ext_lessons:
        el["publishStatus"] = "published"
        el["scheduledDate"] = start_date.isoformat()
        el["dripBatch"] = 0
        lessons.append(el)

    # Compute strategic cross-links (same baseSlug across grades = vertical progression; adjacent in same course = horizontal progression)
    by_base_slug = {}
    for l in lessons:
        by_base_slug.setdefault(l["baseSlug"], []).append(l["slug"])

    for l in lessons:
        same_topic_other_grades = [s for s in by_base_slug.get(l["baseSlug"], []) if s != l["slug"]]
        l["verticalProgressionSlugs"] = same_topic_other_grades[:4]

    # Write full detailed catalog (used by server components)
    full_catalog_path = CATALOG_DIR / "lessons-full.json"
    full_catalog_path.write_text(json.dumps(lessons, ensure_ascii=False, indent=2), encoding="utf-8")

    # Also write lightweight index for fast client filtering/search
    light_index = [
        {
            "id": l["id"],
            "slug": l["slug"],
            "baseSlug": l["baseSlug"],
            "title": l["title"],
            "area": l["area"],
            "course": l["course"],
            "grade": l["grade"],
            "gradeLabel": l["gradeLabel"],
            "unit": l["unit"],
            "difficulty": l["difficulty"],
            "appEngine": l["appEngine"],
            "keyFormula": l["keyFormula"],
            "summary": l["summary"],
            "tags": l["tags"],
            "onionLayer": l["onionLayer"],
            "publishStatus": l["publishStatus"],
            "scheduledDate": l["scheduledDate"],
            "dripBatch": l["dripBatch"],
            "slidesCount": len(l["theorySlides"]),
            "f0Count": len(l["exercisesF0"]),
            "faCount": len(l["exercisesFA"]),
        }
        for l in lessons
    ]
    index_path = CATALOG_DIR / "lessons-index.json"
    index_path.write_text(json.dumps(light_index, ensure_ascii=False, indent=2), encoding="utf-8")

    elapsed = time.time() - t0
    total_slides = sum(len(l["theorySlides"]) for l in lessons)
    total_f0 = sum(len(l["exercisesF0"]) for l in lessons)
    total_fa = sum(len(l["exercisesFA"]) for l in lessons)
    print("====================================================")
    print(f"✓ EXTRACCIÓN A-Z COMPLETADA EN {elapsed:.2f}s")
    print(f"✓ Total Lecciones / Páginas generadas: {len(lessons)}")
    print(f"✓ Diapositivas teóricas extraídas:     {total_slides}")
    print(f"✓ Ejercicios Nivel Cero (F0) extraídos: {total_f0}")
    print(f"✓ Ejercicios Adicionales (FA) extraídos:{total_fa}")
    print(f"✓ Archivo Full:  {full_catalog_path}")
    print(f"✓ Archivo Index: {index_path}")
    print("====================================================")


if __name__ == "__main__":
    main()
