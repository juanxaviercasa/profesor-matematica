from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    NextPageTemplate,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "downloads" / "cuaderno-modulo-1.pdf"
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

INK = colors.HexColor("#12372F")
PAPER = colors.HexColor("#F6F1E6")
CORAL = colors.HexColor("#FF5A36")
LIME = colors.HexColor("#DDF277")
MUTED = colors.HexColor("#65716D")
WHITE = colors.HexColor("#FFFDF8")

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="CoverKicker", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=11, leading=14, textColor=LIME, spaceAfter=13, alignment=TA_LEFT))
styles.add(ParagraphStyle(name="CoverTitle", parent=styles["Title"], fontName="Times-Roman", fontSize=37, leading=39, textColor=WHITE, alignment=TA_LEFT, spaceAfter=16))
styles.add(ParagraphStyle(name="CoverText", parent=styles["BodyText"], fontName="Helvetica", fontSize=13, leading=19, textColor=WHITE, spaceAfter=10))
styles.add(ParagraphStyle(name="Section", parent=styles["Heading1"], fontName="Times-Roman", fontSize=26, leading=29, textColor=INK, spaceAfter=12))
styles.add(ParagraphStyle(name="Heading", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=15, leading=19, textColor=INK, spaceBefore=8, spaceAfter=8))
styles.add(ParagraphStyle(name="Body", parent=styles["BodyText"], fontName="Helvetica", fontSize=10.5, leading=16, textColor=INK, spaceAfter=9))
styles.add(ParagraphStyle(name="Small", parent=styles["BodyText"], fontName="Helvetica", fontSize=8.5, leading=12, textColor=MUTED))
styles.add(ParagraphStyle(name="Question", parent=styles["BodyText"], fontName="Helvetica-Bold", fontSize=10.5, leading=15, textColor=INK, spaceBefore=8, spaceAfter=5))
styles.add(ParagraphStyle(name="Answer", parent=styles["BodyText"], fontName="Helvetica", fontSize=9.5, leading=14, textColor=INK, leftIndent=10, spaceAfter=8))
styles.add(ParagraphStyle(name="Quote", parent=styles["BodyText"], fontName="Times-Italic", fontSize=18, leading=23, textColor=CORAL, leftIndent=16, rightIndent=16, spaceBefore=10, spaceAfter=18))


def page_background(canvas, doc):
    width, height = A4
    canvas.saveState()
    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, width, height, stroke=0, fill=1)
    canvas.setFillColor(INK)
    canvas.rect(0, height - 14 * mm, width, 14 * mm, stroke=0, fill=1)
    canvas.setFont("Helvetica-Bold", 7.5)
    canvas.setFillColor(LIME)
    canvas.drawString(18 * mm, height - 9 * mm, "PROFESOR JUAN XAVIER · SISTEMA ZENIT")
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 7.5)
    canvas.drawRightString(width - 18 * mm, 10 * mm, f"Modulo 1 · pagina {doc.page}")
    canvas.setStrokeColor(colors.HexColor("#CCD2CA"))
    canvas.line(18 * mm, 14 * mm, width - 18 * mm, 14 * mm)
    canvas.restoreState()


def cover_background(canvas, doc):
    width, height = A4
    canvas.saveState()
    canvas.setFillColor(INK)
    canvas.rect(0, 0, width, height, stroke=0, fill=1)
    canvas.setStrokeColor(CORAL)
    canvas.setLineWidth(10)
    canvas.bezier(15 * mm, 38 * mm, 50 * mm, 42 * mm, 62 * mm, 165 * mm, 111 * mm, 170 * mm)
    canvas.bezier(111 * mm, 170 * mm, 155 * mm, 174 * mm, 157 * mm, 110 * mm, 197 * mm, 95 * mm)
    canvas.setFillColor(LIME)
    canvas.circle(111 * mm, 170 * mm, 5 * mm, stroke=0, fill=1)
    canvas.restoreState()


doc = BaseDocTemplate(
    str(OUTPUT),
    pagesize=A4,
    rightMargin=18 * mm,
    leftMargin=18 * mm,
    topMargin=24 * mm,
    bottomMargin=20 * mm,
    title="Funciones sin Vacios - Cuaderno del Modulo 1",
    author="Profesor Juan Xavier · Sistema Zenit",
)
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
cover = PageTemplate(id="cover", frames=[frame], onPage=cover_background)
content = PageTemplate(id="content", frames=[frame], onPage=page_background)
doc.addPageTemplates([cover, content])


def line_space(rows=3):
    return Table([[""] for _ in range(rows)], colWidths=[doc.width], rowHeights=[9 * mm] * rows, style=TableStyle([
        ("LINEBELOW", (0, 0), (-1, -1), 0.4, colors.HexColor("#CCD2CA")),
        ("BACKGROUND", (0, 0), (-1, -1), WHITE),
    ]))


def concept_box(title, text):
    data = [[Paragraph(title, styles["Heading"])], [Paragraph(text, styles["Body"])]]
    return Table(data, colWidths=[doc.width], style=TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), WHITE),
        ("BOX", (0, 0), (-1, -1), 0.8, colors.HexColor("#CCD2CA")),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
    ]))


story = []
story += [Spacer(1, 22 * mm), Paragraph("SISTEMA ZENIT · CUADERNO DE TRABAJO", styles["CoverKicker"]), Paragraph("Funciones<br/>sin Vacios", styles["CoverTitle"]), Paragraph("Modulo 1 · Leer una funcion", styles["CoverText"]), Spacer(1, 8 * mm), Paragraph("Deja de ver f(x) como una formula aislada. Aprende a reconocer entradas, salidas, restricciones y representaciones.", styles["CoverText"]), Spacer(1, 13 * mm), Paragraph("Profesor Juan Xavier", styles["CoverKicker"]), Paragraph("Matematica que conecta", styles["CoverText"]), NextPageTemplate("content"), PageBreak()]

story += [Paragraph("Como usar este cuaderno", styles["Section"]), Paragraph("Trabaja cada bloque despues de ver la leccion correspondiente. Primero predice, luego calcula y al final explica con tus propias palabras. Marca con una estrella los ejercicios que no puedas justificar.", styles["Body"]), concept_box("Regla del Sistema Zenit", "Una respuesta numerica no termina el ejercicio. Debes poder indicar que representa, que entradas son validas y como se veria en otra representacion."), Spacer(1, 8 * mm), Paragraph("Ruta del modulo", styles["Heading"])]
route = [["1", "Entrada y salida"], ["2", "Notacion f(x)"], ["3", "Dominio como restriccion"], ["4", "Formula, tabla y grafica"], ["5", "Explicar una funcion"]]
table = Table(route, colWidths=[14 * mm, doc.width - 14 * mm], rowHeights=12 * mm)
table.setStyle(TableStyle([("BACKGROUND", (0, 0), (0, -1), LIME), ("TEXTCOLOR", (0, 0), (-1, -1), INK), ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"), ("FONTNAME", (1, 0), (1, -1), "Helvetica"), ("ALIGN", (0, 0), (0, -1), "CENTER"), ("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#CCD2CA"))]))
story += [table, PageBreak()]

story += [Paragraph("1 · Entrada y salida", styles["Section"]), Paragraph("Una funcion asigna a cada entrada permitida una sola salida. Puedes imaginarla como una regla de correspondencia, pero la regla incluye tambien las entradas que acepta.", styles["Body"]), Paragraph("f(x) = 2x + 3", styles["Quote"]), Paragraph("Ejercicio 1", styles["Question"]), Paragraph("Completa las salidas para x = -2, -1, 0, 1 y 2.", styles["Body"])]
data = [["x", "-2", "-1", "0", "1", "2"], ["f(x)", "", "", "", "", ""]]
t = Table(data, colWidths=[24 * mm] + [27 * mm] * 5, rowHeights=14 * mm)
t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, 0), INK), ("TEXTCOLOR", (0, 0), (-1, 0), WHITE), ("BACKGROUND", (0, 1), (-1, 1), WHITE), ("GRID", (0, 0), (-1, -1), 0.7, colors.HexColor("#CCD2CA")), ("ALIGN", (0, 0), (-1, -1), "CENTER"), ("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("FONTNAME", (0, 0), (-1, -1), "Helvetica-Bold")]))
story += [t, Paragraph("Ejercicio 2", styles["Question"]), Paragraph("Si f(a) = 11, plantea y resuelve una ecuacion para encontrar a.", styles["Body"]), line_space(3), Paragraph("Explica", styles["Question"]), Paragraph("¿Que diferencia existe entre x, f y f(x)?", styles["Body"]), line_space(3), PageBreak()]

story += [Paragraph("2 · Leer la notacion", styles["Section"]), concept_box("f(4) no significa f por 4", "La expresion f(4) indica la salida de la funcion f cuando la entrada es 4."), Spacer(1, 7 * mm), Paragraph("Ejercicio 3", styles["Question"]), Paragraph("Para g(t) = t^2 - 4t, calcula g(0), g(2), g(-1) y g(a + 1).", styles["Body"]), line_space(5), Paragraph("Ejercicio 4", styles["Question"]), Paragraph("La temperatura C depende del tiempo h. Interpreta con una frase cada expresion: C(0) = 18, C(5) = 24 y C(8) - C(2) = 7.", styles["Body"]), line_space(5), Paragraph("Predice", styles["Question"]), Paragraph("Sin calcular por completo: ¿g(3) sera positiva, negativa o cero? Justifica.", styles["Body"]), line_space(3), PageBreak()]

story += [Paragraph("3 · Dominio: entradas permitidas", styles["Section"]), Paragraph("El dominio no es una regla memorizada. Es el conjunto de entradas para las que la funcion tiene sentido matematico y dentro del contexto.", styles["Body"]), concept_box("Dos preguntas", "1. ¿La expresion se puede calcular?  2. ¿La entrada tiene sentido en la situacion?"), Spacer(1, 7 * mm), Paragraph("Ejercicio 5", styles["Question"]), Paragraph("Determina el dominio real y explica la restriccion.", styles["Body"])]
domains = [["Funcion", "Dominio y razon"], ["a) p(x) = 3x - 5", ""], ["b) q(x) = 1 / (x - 4)", ""], ["c) r(x) = sqrt(x + 2)", ""], ["d) A(r) = pi r^2, radio de un circulo", ""]]
t = Table(domains, colWidths=[70 * mm, doc.width - 70 * mm], rowHeights=[12 * mm, 19 * mm, 19 * mm, 19 * mm, 21 * mm])
t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, 0), INK), ("TEXTCOLOR", (0, 0), (-1, 0), WHITE), ("BACKGROUND", (0, 1), (-1, -1), WHITE), ("GRID", (0, 0), (-1, -1), 0.6, colors.HexColor("#CCD2CA")), ("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"), ("FONTNAME", (0, 1), (-1, -1), "Helvetica"), ("LEFTPADDING", (0, 0), (-1, -1), 8)]))
story += [t, Paragraph("Ejercicio 6", styles["Question"]), Paragraph("Una tarifa T(m) representa el costo de m minutos de una llamada. ¿Que restricciones contextuales puede tener m aunque la formula acepte todos los reales?", styles["Body"]), line_space(3), PageBreak()]

story += [Paragraph("4 · Cambiar de representacion", styles["Section"]), Paragraph("Comprender una funcion significa poder pasar de una formula a una tabla, una grafica o una descripcion sin perder su significado.", styles["Body"]), Paragraph("h(x) = (x - 1)^2 - 4", styles["Quote"]), Paragraph("Ejercicio 7", styles["Question"]), Paragraph("Completa la tabla y usa los puntos para hacer un bosquejo.", styles["Body"])]
data = [["x", "-2", "-1", "0", "1", "2", "3", "4"], ["h(x)", "", "", "", "", "", "", ""]]
t = Table(data, colWidths=[20 * mm] + [20 * mm] * 7, rowHeights=14 * mm)
t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, 0), INK), ("TEXTCOLOR", (0, 0), (-1, 0), WHITE), ("BACKGROUND", (0, 1), (-1, 1), WHITE), ("GRID", (0, 0), (-1, -1), 0.7, colors.HexColor("#CCD2CA")), ("ALIGN", (0, 0), (-1, -1), "CENTER"), ("VALIGN", (0, 0), (-1, -1), "MIDDLE")]))
story += [t, Spacer(1, 6 * mm)]
grid = Table([[""] * 8 for _ in range(8)], colWidths=[18 * mm] * 8, rowHeights=[13 * mm] * 8)
grid.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), WHITE), ("GRID", (0, 0), (-1, -1), 0.35, colors.HexColor("#CCD2CA"))]))
story += [grid, PageBreak()]

story += [Paragraph("5 · Reto integrador", styles["Section"]), Paragraph("Una empresa de bicicletas cobra una tarifa fija de S/8 y S/4 por cada hora de uso.", styles["Body"]), Paragraph("Ejercicio 8", styles["Question"]), Paragraph("a) Define una funcion C(h).  b) Calcula C(3).  c) Interpreta C(3).  d) Indica un dominio razonable.  e) Describe la grafica.  f) Explica que representan la pendiente y el corte vertical.", styles["Body"]), line_space(8), Paragraph("Autoevaluacion", styles["Heading"])]
self_eval = [["Puedo...", "Todavia no", "Con ayuda", "Solo"], ["distinguir entrada y salida", "", "", ""], ["interpretar f(a)", "", "", ""], ["justificar restricciones", "", "", ""], ["pasar de formula a tabla", "", "", ""], ["explicar una funcion en contexto", "", "", ""]]
t = Table(self_eval, colWidths=[82 * mm, 27 * mm, 27 * mm, 27 * mm], rowHeights=12 * mm)
t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, 0), INK), ("TEXTCOLOR", (0, 0), (-1, 0), WHITE), ("BACKGROUND", (0, 1), (-1, -1), WHITE), ("GRID", (0, 0), (-1, -1), 0.6, colors.HexColor("#CCD2CA")), ("ALIGN", (1, 0), (-1, -1), "CENTER"), ("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold")]))
story += [t, PageBreak()]

story += [Paragraph("Soluciones comentadas", styles["Section"]), Paragraph("1.", styles["Question"]), Paragraph("Para x = -2, -1, 0, 1 y 2: f(x) = -1, 1, 3, 5 y 7.", styles["Answer"]), Paragraph("2.", styles["Question"]), Paragraph("2a + 3 = 11, entonces a = 4. x es una entrada, f es la funcion y f(x) es la salida asociada a x.", styles["Answer"]), Paragraph("3.", styles["Question"]), Paragraph("g(0)=0, g(2)=-4, g(-1)=5 y g(a+1)=a^2-2a-3. g(3)=-3, por lo que es negativa.", styles["Answer"]), Paragraph("4.", styles["Question"]), Paragraph("C(0)=18 describe la temperatura inicial; C(5)=24, la temperatura a las cinco horas; C(8)-C(2)=7 indica un aumento de 7 grados entre las horas 2 y 8.", styles["Answer"]), Paragraph("5.", styles["Question"]), Paragraph("a) todos los reales. b) todos los reales excepto 4. c) x mayor o igual que -2. d) r mayor o igual que 0 por el contexto del radio.", styles["Answer"]), Paragraph("6.", styles["Question"]), Paragraph("Los minutos no deben ser negativos y, segun el sistema, pueden limitarse a numeros enteros o a la duracion maxima permitida.", styles["Answer"]), Paragraph("7.", styles["Question"]), Paragraph("Para x = -2, -1, 0, 1, 2, 3 y 4: h(x) = 5, 0, -3, -4, -3, 0 y 5. La grafica es una parabola con vertice (1,-4).", styles["Answer"]), Paragraph("8.", styles["Question"]), Paragraph("C(h)=8+4h; C(3)=20. Significa que tres horas cuestan S/20. Un dominio razonable es h mayor o igual que 0. La grafica parte de 8 y aumenta 4 por hora.", styles["Answer"]), Spacer(1, 8 * mm), concept_box("Siguiente paso", "Realiza el diagnostico interactivo del sitio y continua con el laboratorio de representaciones. Si puedes explicar tus decisiones sin mirar las soluciones, estas listo para el Modulo 2."), NextPageTemplate("cover"), PageBreak()]

story += [Spacer(1, 35 * mm), Paragraph("No memorices otra grafica.", styles["CoverKicker"]), Paragraph("Aprende a leer<br/>lo que cambia.", styles["CoverTitle"]), Spacer(1, 10 * mm), Paragraph("Profesor Juan Xavier · Sistema Zenit", styles["CoverText"]), Paragraph("Matematica que conecta", styles["CoverText"])]

doc.build(story)
print(OUTPUT)
