/**
 * Curaduría de fórmulas centrales para matemática escolar (1.º–5.º).
 * Sustituciones intencionalmente conservadoras: solo títulos inequívocos.
 * Las demás lecciones conservan su expresión original para revisión humana.
 * Este módulo jamás modifica los JSON extraídos de los libros.
 */
export const EDITORIAL_RULES = [
  // ÁLGEBRA
  {course:"algebra",pattern:/ecuaci[oó]n(?:es)? cuadr[aá]tica/,tex:String.raw`ax^2+bx+c=0,\quad x=\frac{-b\pm\sqrt{b^2-4ac}}{2a},\quad a\ne0`},
  {course:"algebra",pattern:/sistema(?:s)? de ecuaciones/,tex:String.raw`\begin{cases}ax+by=c\\dx+ey=f\end{cases}`},
  {course:"algebra",pattern:/ecuaci[oó]n(?:es)? (?:de )?primer grado|ecuaci[oó]n(?:es)? lineal/,tex:String.raw`ax+b=0\quad\Longrightarrow\quad x=-\frac{b}{a},\ a\ne0`},
  {course:"algebra",pattern:/producto(?:s)? notable/,tex:String.raw`(a+b)^2=a^2+2ab+b^2`},
  {course:"algebra",pattern:/factorizaci[oó]n/,tex:String.raw`a^2-b^2=(a-b)(a+b)`},
  {course:"algebra",pattern:/fraccion(?:es)? algebraica/,tex:String.raw`\frac{P(x)}{Q(x)},\quad Q(x)\ne0`},
  {course:"algebra",pattern:/teor[ií]a de exponentes|potenciaci[oó]n/,tex:String.raw`a^m\cdot a^n=a^{m+n}`},
  {course:"algebra",pattern:/radicaci[oó]n/,tex:String.raw`\sqrt[n]{a^n}=|a|\quad\text{si }n\text{ es par}`},
  {course:"algebra",pattern:/logaritm/,tex:String.raw`\log_a x=y\iff a^y=x,\quad a>0,\ a\ne1,\ x>0`},
  {course:"algebra",pattern:/funci[oó]n cuadr[aá]tica/,tex:String.raw`f(x)=ax^2+bx+c,\quad a\ne0`},
  {course:"algebra",pattern:/funci[oó]n lineal/,tex:String.raw`f(x)=mx+b`},
  {course:"algebra",pattern:/polinomio/,tex:String.raw`P(x)=a_nx^n+a_{n-1}x^{n-1}+\cdots+a_0`},
  {course:"algebra",pattern:/expresi[oó]n(?:es)? algebraica/,tex:String.raw`E(x)=3x^2-2x+5`},

  // ARITMÉTICA
  {course:"aritmetica",pattern:/conjunto/,tex:String.raw`n(A\cup B)=n(A)+n(B)-n(A\cap B)`},
  {course:"aritmetica",pattern:/m[aá]ximo com[uú]n divisor|m[ií]nimo com[uú]n m[uú]ltiplo|mcd|mcm/,tex:String.raw`\operatorname{MCD}(a,b)\,\operatorname{MCM}(a,b)=ab,\quad a,b\in\mathbb{N}^{+}`},
  {course:"aritmetica",pattern:/fraccion/,tex:String.raw`\frac{a}{b}+\frac{c}{d}=\frac{ad+bc}{bd},\quad bd\ne0`},
  {course:"aritmetica",pattern:/porcentaj/,tex:String.raw`p\%=\frac{p}{100}`},
  {course:"aritmetica",pattern:/proporcional|razones y proporciones/,tex:String.raw`\frac{a}{b}=\frac{c}{d}\quad\Longrightarrow\quad ad=bc,\quad bd\ne0`},
  {course:"aritmetica",pattern:/inter[eé]s simple/,tex:String.raw`I=C\cdot r\cdot t`},
  {course:"aritmetica",pattern:/m[uú]ltiplos y divisores|divisibilidad/,tex:String.raw`a\mid b\iff b=ak,\quad k\in\mathbb Z`},

  // GEOMETRÍA
  {course:"geometria",pattern:/segmento/,tex:String.raw`AB+BC=AC\quad\text{si }B\text{ está entre }A\text{ y }C`},
  {course:"geometria",pattern:/[aá]ngulos? (?:determinados|formados).*paralela/,tex:String.raw`\alpha=\beta\quad\text{(alternos internos entre paralelas)}`},
  {course:"geometria",pattern:/[aá]ngulo/,tex:String.raw`m\angle AOB+m\angle BOC=m\angle AOC`},
  {course:"geometria",pattern:/tri[aá]ngulos? rect[aá]ngulos?|pit[aá]goras/,tex:String.raw`a^2+b^2=c^2`},
  {course:"geometria",pattern:/tri[aá]ngulo/,tex:String.raw`\alpha+\beta+\gamma=180^\circ`},
  {course:"geometria",pattern:/cuadril[aá]tero/,tex:String.raw`\alpha+\beta+\gamma+\delta=360^\circ`},
  {course:"geometria",pattern:/pol[ií]gono/,tex:String.raw`S_i=(n-2)\cdot180^\circ`},
  {course:"geometria",pattern:/circunferencia|c[ií]rculo/,tex:String.raw`L=2\pi r,\qquad A=\pi r^2`},
  {course:"geometria",pattern:/prisma/,tex:String.raw`V_{\text{prisma}}=A_bh`},
  {course:"geometria",pattern:/pir[aá]mide/,tex:String.raw`V_{\text{pirámide}}=\frac{A_bh}{3}`},

  // TRIGONOMETRÍA
  {course:"trigonometria",pattern:/sistema(?:s)? (?:de )?medida(?:s)? angular|sistema(?:s)? angular/,tex:String.raw`\frac{S}{180}=\frac{C}{200}=\frac{R}{\pi}`},
  {course:"trigonometria",pattern:/longitud de arco|sector circular/,tex:String.raw`L=r\theta,\quad A=\frac{r^2\theta}{2},\quad\theta\text{ en radianes}`},
  {course:"trigonometria",pattern:/[aá]ngulos? notables?/,tex:String.raw`\sin30^\circ=\frac12,\quad\cos60^\circ=\frac12`},
  {course:"trigonometria",pattern:/razones? trigonom[eé]tricas?/,tex:String.raw`\sin\theta=\frac{\text{cateto opuesto}}{\text{hipotenusa}}`},
  {course:"trigonometria",pattern:/identidad(?:es)? trigonom[eé]tricas?/,tex:String.raw`\sin^2\theta+\cos^2\theta=1`},
  {course:"trigonometria",pattern:/circunferencia trigonom[eé]trica/,tex:String.raw`P(\theta)=(\cos\theta,\sin\theta)`},
  {course:"trigonometria",pattern:/ecuacion(?:es)? trigonom[eé]tricas?/,tex:String.raw`\sin\theta=0\iff\theta=k\pi,\quad k\in\mathbb Z`},
  {course:"trigonometria",pattern:/reducci[oó]n al primer cuadrante/,tex:String.raw`\sin(180^\circ-\theta)=\sin\theta`},

  // ESTADÍSTICA Y PROBABILIDAD
  {course:"estadistica-y-probabilidad",pattern:/gr[aá]fico circular/,tex:String.raw`\theta_i=360^\circ\frac{f_i}{N}`},
  {course:"estadistica-y-probabilidad",pattern:/frecuencia/,tex:String.raw`N=\sum_{i=1}^{k}f_i`},
  {course:"estadistica-y-probabilidad",pattern:/dispersi[oó]n|varianza/,tex:String.raw`\sigma^2=\frac{\sum_i f_i(x_i-\bar x)^2}{\sum_i f_i}`},
  {course:"estadistica-y-probabilidad",pattern:/tendencia central|promedio/,tex:String.raw`\bar x=\frac{\sum_i x_if_i}{\sum_i f_i}`},
  {course:"estadistica-y-probabilidad",pattern:/combinator/,tex:String.raw`\binom nr=\frac{n!}{r!(n-r)!},\quad 0\le r\le n`},
  {course:"estadistica-y-probabilidad",pattern:/probabilidad/,tex:String.raw`P(A)=\frac{n(A)}{n(\Omega)}\quad\text{(casos equiprobables)}`},

  // RAZONAMIENTO MATEMÁTICO (SOLO TEMAS CON IDENTIDAD INEQUÍVOCA)
  {course:"razonamiento-matematico",pattern:/cronometri|reloj/,tex:String.raw`\theta=\left|30H-\frac{11}{2}M\right|`},
  {course:"razonamiento-matematico",pattern:/m[oó]viles?|movimiento/,tex:String.raw`d=v\cdot t`},
  {course:"razonamiento-matematico",pattern:/planteo de ecuaciones?/,tex:String.raw`ax+b=c\quad\Longrightarrow\quad x=\frac{c-b}{a},\ a\ne0`},
];

export function resolveEditorialKeyFormula(lesson) {
  if(!lesson||!Number.isInteger(lesson.grade)||lesson.grade<1||lesson.grade>5)return lesson?.keyFormula||"";
  const title=String(lesson.title||"").toLowerCase().normalize("NFC");
  const matched=EDITORIAL_RULES.find(rule=>rule.course===lesson.course&&rule.pattern.test(title));
  return matched ? matched.tex : lesson.keyFormula;
}

export function isEditoriallyCurated(lesson) {
  if(!lesson||!Number.isInteger(lesson.grade)||lesson.grade<1||lesson.grade>5)return false;
  const title=String(lesson.title||"").toLowerCase().normalize("NFC");
  return EDITORIAL_RULES.some(rule=>rule.course===lesson.course&&rule.pattern.test(title));
}
