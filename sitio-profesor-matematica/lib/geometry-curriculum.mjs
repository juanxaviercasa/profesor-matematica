/**
 * Reglas de geometría 1.º–5.º de secundaria. Cada tema conserva su propio
 * contenido; aquí solo se seleccionan fórmula clave y familia de representación.
 * NO cambia el estado publicado/programado ni la clave de ejercicios.
 */
export const GEOMETRY_TOPICS = [
  {id:"circle-equation",pattern:/^ecuacion de la circunferencia$/,mode:"analytic",label:"Ecuación de circunferencia",formula:"(x-h)^2+(y-k)^2=r^2,\\quad r>0"},
  {id:"parabola-equation",pattern:/^ecuacion de la parabola$/,mode:"analytic",label:"Ecuación de parábola",formula:"y=a(x-h)^2+k,\\quad a\\ne0,\\quad V=(h,k)"},
  {id:"line-equation",pattern:/^(?:ecuacion de la recta|estudio de la recta)$/,mode:"analytic",label:"Ecuación de recta",formula:"y-y_1=m(x-x_1),\\quad m=\\frac{y_2-y_1}{x_2-x_1}\\ (x_2\\ne x_1)"},
  {id:"analytic-intro",pattern:/^introduccion a la geometria analitica$/,mode:"analytic",label:"Distancia y punto medio",formula:"d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2},\\quad M=\\left(\\frac{x_1+x_2}{2},\\frac{y_1+y_2}{2}\\right)"},
  {id:"circle-metric",pattern:/relaciones metricas en la circunferencia/,mode:"circle",label:"Potencia de un punto",formula:"PA\\cdot PB=PC\\cdot PD\\quad\\text{(secantes desde un punto exterior P)}"},
  {id:"circle-angle",pattern:/angul.*circunferencia/,mode:"circle",label:"Ángulo inscrito",formula:"m\\angle APB=\\frac{1}{2}\\,m(\\widehat{AB})\\quad\\text{(P en la circunferencia)}"},
  {id:"parallel",pattern:/rectas paralelas.*secante/,mode:"parallel",label:"Paralelas y secante",formula:"\\alpha_{\\text{correspondiente}}=\\beta,\\quad\\alpha_{\\text{colat. int.}}+\\gamma=180^\\circ"},
  {id:"metric-combined",pattern:/(?:relaciones metricas|r m).*triangulo rectangulo y oblicuangulo/,mode:"triangles",label:"Relaciones métricas",formula:"c^2=a^2+b^2\\ \\text{(recto)},\\quad c^2=a^2+b^2-2ab\\cos\\gamma\\ \\text{(general)}"},
  {id:"metric-oblique",pattern:/relaciones metricas.*oblicuangulo/,mode:"triangles",label:"Teorema del coseno",formula:"c^2=a^2+b^2-2ab\\cos\\gamma,\\quad\\frac{a}{\\sin\\alpha}=\\frac{b}{\\sin\\beta}"},
  {id:"metric-right",pattern:/relaciones metricas.*triangulo rectangulo/,mode:"triangles",label:"Relaciones métricas en triángulo rectángulo",formula:"c=m+n,\\quad h^2=mn,\\quad a^2=cm,\\quad b^2=cn"},
  {id:"triangle-lines",pattern:/lineas notables.*triangulo/,mode:"triangles",label:"Medianas y baricentro",formula:"BM=MC,\\quad AG=2GM\\quad\\text{(mediana AM; G baricentro)}"},
  {id:"congruence",pattern:/congruencia de triangulos/,mode:"congruence",label:"Triángulos congruentes",formula:"\\triangle ABC\\cong\\triangle DEF\\implies AB=DE,\\quad BC=EF,\\quad AC=DF"},
  {id:"similarity",pattern:/semejanza de triangulos/,mode:"triangles",label:"Triángulos semejantes",formula:"\\triangle ABC\\sim\\triangle DEF\\implies\\frac{AB}{DE}=\\frac{BC}{EF}=\\frac{AC}{DF}"},
  {id:"proportion",pattern:/proporcionalidad geometrica/,mode:"triangles",label:"Proporcionalidad y semejanza",formula:"\\frac{AB}{DE}=\\frac{BC}{EF}=\\frac{AC}{DF}\\quad\\text{(triángulos semejantes)}"},
  {id:"right-triangle-ratios",pattern:/^(?:r t|rt de|rt |resolucion de triangulos rectangulos)/,mode:"triangles",label:"Razones trigonométricas",formula:"\\sin\\theta=\\frac{\\text{cateto opuesto}}{\\text{hipotenusa}},\\quad\\tan\\theta=\\frac{\\text{cateto opuesto}}{\\text{cateto adyacente}}"},
  {id:"right-triangle-notable",pattern:/triangulos rectangulos notables/,mode:"triangles",label:"Triángulos notables",formula:"45^\\circ\\text{-}45^\\circ\\text{-}90^\\circ:\\ 1:1:\\sqrt2,\\quad 30^\\circ\\text{-}60^\\circ\\text{-}90^\\circ:\\ 1:\\sqrt3:2"},
  {id:"triangle",pattern:/triangul/,mode:"triangles",label:"Propiedades de triángulos",formula:"\\alpha+\\beta+\\gamma=180^\\circ,\\quad |b-c|<a<b+c"},
  {id:"quadrilateral",pattern:/cuadrilater/,mode:"polygon",label:"Cuadriláteros",formula:"\\alpha+\\beta+\\gamma+\\delta=360^\\circ,\\quad A_{\\text{trapecio}}=\\frac{(B+b)h}{2}"},
  {id:"polygon",pattern:/poligon/,mode:"polygon",label:"Polígonos",formula:"S_i=180^\\circ(n-2),\\quad N_D=\\frac{n(n-3)}{2},\\quad n\\ge3"},
  {id:"circle",pattern:/circunferencia|circulo/,mode:"circle",label:"Circunferencia y círculo",formula:"L=2\\pi r,\\quad A=\\pi r^2"},
  {id:"shaded-area",pattern:/region(?:es)? sombreada/,mode:"area",label:"Regiones sombreadas",formula:"A_{\\text{sombreada}}=A_{\\text{total}}-\\sum A_{\\text{regiones excluidas}}"},
  {id:"area",pattern:/area|perimetro/,mode:"area",label:"Perímetros y áreas",formula:"A_{\\triangle}=\\frac{bh}{2},\\quad A_{\\text{rect}}=ab,\\quad A_{\\text{círculo}}=\\pi r^2"},
  {id:"scale",pattern:/planos y mapas a escala/,mode:"scale",label:"Escalas y mapas",formula:"E=\\frac{d_{\\text{plano}}}{d_{\\text{real}}}\\quad\\text{(mismas unidades)},\\quad E=\\frac{1}{n}"},
  {id:"transform",pattern:/transformaciones geometricas/,mode:"transform",label:"Transformaciones",formula:"T_{a,b}(x,y)=(x+a,y+b),\\quad R_{\\theta}(x,y)=(x\\cos\\theta-y\\sin\\theta,x\\sin\\theta+y\\cos\\theta)"},
  {id:"nets",pattern:/despliegue de (?:cubos|solidos)/,mode:"solids",label:"Desarrollo plano de un cubo",formula:"A_{\\text{cubo}}=6a^2,\\quad V_{\\text{cubo}}=a^3"},
  {id:"dihedral",pattern:/diedr/,mode:"solids",label:"Ángulos diedros",formula:"\\theta_{\\text{diedro}}=90^\\circ\\quad\\text{(caras adyacentes de un cubo)}"},
  {id:"prism-pyramid",pattern:/prisma y piramide/,mode:"solids",label:"Prismas y pirámides",formula:"V_{\\text{prisma}}=A_bh,\\quad V_{\\text{pirámide}}=\\frac{1}{3}A_bh"},
  {id:"polyhedron",pattern:/poliedr/,mode:"solids",label:"Poliedros convexos",formula:"V-E+F=2\\quad\\text{(poliedros convexos)}"},
  {id:"revolution",pattern:/solidos de revolucion/,mode:"solids",label:"Sólidos de revolución",formula:"V_{\\text{cilindro}}=\\pi r^2h,\\quad V_{\\text{cono}}=\\frac{1}{3}\\pi r^2h,\\quad V_{\\text{esfera}}=\\frac{4}{3}\\pi r^3"},
  {id:"solids",pattern:/solidos geometricos/,mode:"solids",label:"Volumen de sólidos",formula:"V_{\\text{prisma}}=A_bh,\\quad V_{\\text{cono}}=\\frac{1}{3}\\pi r^2h"},
  {id:"angles",pattern:/angul/,mode:"angles",label:"Ángulos",formula:"\\text{agudo: }0^\\circ<\\alpha<90^\\circ,\\quad\\text{obtuso: }90^\\circ<\\alpha<180^\\circ"},
  {id:"segments",pattern:/segment/,mode:"segments",label:"Segmentos",formula:"AB+BC=AC\\ \\text{si B está entre A y C},\\quad AM=MB=\\frac{AB}{2}"},
];

export function normalizeGeometryTitle(value){
  return String(value||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim();
}
export function resolveGeometryTopic(title){
  const name=normalizeGeometryTitle(title);
  return GEOMETRY_TOPICS.find(topic=>topic.pattern.test(name))||null;
}
