/**
 * Curaduría integral de fórmulas centrales para matemática y ciencias (1.º–5.º + Universidad)
 * e inyección estructural vinculada a los 60 Motores Matemáticos Open-Source (#01–#60).
 * Este módulo jamás modifica los JSON extraídos de los libros; inyecta la fórmula
 * canónica verificada en KaTeX/MathML en tiempo de compilación y renderizado.
 */
export const EDITORIAL_RULES = [
  // ============================================================================
  // 1. ÁLGEBRA (100% de cobertura en 1.º a 5.º de secundaria)
  // ============================================================================
  {course:"algebra",engineId:"sympy",pattern:/ecuaci[oó]n(?:es)? cuadr[aá]tica/,tex:String.raw`ax^2+bx+c=0,\quad x=\frac{-b\pm\sqrt{b^2-4ac}}{2a},\quad a\ne0`},
  {course:"algebra",engineId:"sympy",pattern:/sistema(?:s)? de ecuaciones/,tex:String.raw`\begin{cases}ax+by=c\\dx+ey=f\end{cases},\quad \Delta=ae-bd\ne0`},
  {course:"algebra",engineId:"sympy",pattern:/ecuaci[oó]n(?:es)? (?:de )?primer grado|ecuaci[oó]n(?:es)? lineal/,tex:String.raw`ax+b=0\quad\Longrightarrow\quad x=-\frac{b}{a},\ a\ne0`},
  {course:"algebra",engineId:"mathlive",pattern:/producto(?:s)? notable/,tex:String.raw`(a+b)^2=a^2+2ab+b^2,\quad (a+b)(a-b)=a^2-b^2`},
  {course:"algebra",engineId:"sympy",pattern:/cociente(?:s)? notable/,tex:String.raw`\frac{x^n\pm a^n}{x\pm a}=x^{n-1}\mp x^{n-2}a+\cdots\pm a^{n-1},\quad T_k=\pm x^{n-k}a^{k-1}`},
  {course:"algebra",engineId:"sympy",pattern:/divisi[oó]n algebraica/,tex:String.raw`D(x)\equiv d(x)\cdot q(x)+R(x),\quad \operatorname{grad}(R)<\operatorname{grad}(d)`},
  {course:"algebra",engineId:"sympy",pattern:/factorizaci[oó]n/,tex:String.raw`a^2-b^2=(a-b)(a+b),\quad a^3\pm b^3=(a\pm b)(a^2\mp ab+b^2)`},
  {course:"algebra",engineId:"sympy",pattern:/fraccion(?:es)? algebraica/,tex:String.raw`\frac{P(x)}{Q(x)},\quad Q(x)\ne0,\quad \operatorname{MCD}(P,Q)\cdot\operatorname{MCM}(P,Q)=P(x)\cdot Q(x)`},
  {course:"algebra",engineId:"mathjs",pattern:/teor[ií]a de exponentes|potenciaci[oó]n/,tex:String.raw`a^m\cdot a^n=a^{m+n},\quad \frac{a^m}{a^n}=a^{m-n},\quad (a^m)^n=a^{mn}`},
  {course:"algebra",engineId:"mathjs",pattern:/radicaci[oó]n|radical/,tex:String.raw`\sqrt[n]{a^m}=a^{m/n},\quad \sqrt{A\pm 2\sqrt{B}}=\sqrt{x}\pm\sqrt{y}\ \ (x+y=A,\ xy=B)`},
  {course:"algebra",engineId:"desmos",pattern:/logaritm/,tex:String.raw`\log_a x=y\iff a^y=x,\quad \log_a(xy)=\log_a x+\log_a y,\quad a>0,\ a\ne1`},
  {course:"algebra",engineId:"desmos",pattern:/funci[oó]n cuadr[aá]tica/,tex:String.raw`f(x)=a(x-h)^2+k,\quad V=(h,k)=\left(-\frac{b}{2a},f\left(-\frac{b}{2a}\right)\right)`},
  {course:"algebra",engineId:"desmos",pattern:/funci[oó]n lineal/,tex:String.raw`f(x)=mx+b,\quad m=\frac{y_2-y_1}{x_2-x_1}`},
  {course:"algebra",engineId:"desmos",pattern:/funci[oó]n(?:es)? especial/,tex:String.raw`f(x)=|x|=\begin{cases}x,&x\ge0\\-x,&x<0\end{cases},\quad g(x)=\sqrt{x}\ (x\ge0)`},
  {course:"algebra",engineId:"function-plot",pattern:/l[ií]mite de una funci[oó]n/,tex:String.raw`\lim_{x\to x_0}f(x)=L\iff \forall\varepsilon>0,\ \exists\delta>0:0<|x-x_0|<\delta\implies |f(x)-L|<\varepsilon`},
  {course:"algebra",engineId:"desmos",pattern:/funci[oó]n|funciones/,tex:String.raw`f:A\to B,\quad y=f(x),\quad \operatorname{Dom}(f)=\{x\in A\mid \exists!\,y\in B\}`},
  {course:"algebra",engineId:"glpk-lp",pattern:/programaci[oó]n lineal/,tex:String.raw`\max Z=ax+by\quad\text{sujeto a}\quad A\mathbf{x}\le\mathbf{b},\quad x\ge0,\ y\ge0`},
  {course:"algebra",engineId:"sympy",pattern:/inecuaci[oó]n|desigualdad|intervalo|valor absoluto|n[uú]meros reales/,tex:String.raw`|x|<a\iff -a<x<a\ (a>0),\quad (x-r_1)(x-r_2)\ge0\implies x\in(-\infty,r_1]\cup[r_2,+\infty)`},
  {course:"algebra",engineId:"eigen",pattern:/determinante/,tex:String.raw`\det\begin{pmatrix}a&b\\c&d\end{pmatrix}=ad-bc,\quad \det(AB)=\det(A)\det(B)`},
  {course:"algebra",engineId:"eigen",pattern:/matri(?:z|ces)/,tex:String.raw`A=[a_{ij}]_{m\times n},\quad (AB)_{ij}=\sum_{k=1}^{p}a_{ik}b_{kj},\quad A\cdot A^{-1}=I`},
  {course:"algebra",engineId:"sympy",pattern:/progresi[oó]n aritm[eé]tica/,tex:String.raw`a_n=a_1+(n-1)r,\quad S_n=\frac{(a_1+a_n)n}{2}`},
  {course:"algebra",engineId:"sympy",pattern:/progresi[oó]n geom[eé]trica/,tex:String.raw`t_n=t_1\cdot q^{n-1},\quad S_n=t_1\frac{q^n-1}{q-1},\quad S_\infty=\frac{t_1}{1-q}\ (|q|<1)`},
  {course:"algebra",engineId:"sympy",pattern:/serie|sucesi[oó]n/,tex:String.raw`a_n=a_1+(n-1)r,\quad S_n=\sum_{k=1}^{n}a_k=\frac{n(a_1+a_n)}{2}`},
  {course:"algebra",engineId:"sympy",pattern:/polinomio/,tex:String.raw`P(x)=a_nx^n+a_{n-1}x^{n-1}+\cdots+a_0,\quad \sum\text{coef}=P(1),\quad T.I.=P(0)`},
  {course:"algebra",engineId:"mathlive",pattern:/expresi[oó]n(?:es)? algebraica/,tex:String.raw`P(x,y)=cx^ay^b,\quad \operatorname{GA}(P)=a+b,\quad \operatorname{GR}(x)=a`},

  // ============================================================================
  // 2. ARITMÉTICA (100% de cobertura en 1.º a 5.º de secundaria)
  // ============================================================================
  {course:"aritmetica",engineId:"venn-set",pattern:/conjunto/,tex:String.raw`n(A\cup B)=n(A)+n(B)-n(A\cap B),\quad n[\mathcal{P}(A)]=2^{n(A)}`},
  {course:"aritmetica",engineId:"venn-set",pattern:/producto(?:s)? cartesiano|relaci[oó]n|relaciones$/,tex:String.raw`A\times B=\{(a,b)\mid a\in A\wedge b\in B\},\quad n(A\times B)=n(A)\cdot n(B)`},
  {course:"aritmetica",engineId:"pari-gp",pattern:/m[aá]ximo com[uú]n divisor|m[ií]nimo com[uú]n m[uú]ltiplo|mcd|mcm/,tex:String.raw`\operatorname{MCD}(a,b)\cdot\operatorname{MCM}(a,b)=a\cdot b,\quad a,b\in\mathbb{N}^{+}`},
  {course:"aritmetica",engineId:"pari-gp",pattern:/sistema(?:s)? de numeraci[oó]n/,tex:String.raw`\overline{abc}_{(n)}=a\cdot n^2+b\cdot n+c,\quad 0\le a,b,c<n,\ a\ne0`},
  {course:"aritmetica",engineId:"pari-gp",pattern:/primos|teor[ií]a de (?:los )?n[uú]meros/,tex:String.raw`N=p_1^{\alpha_1}p_2^{\alpha_2}\cdots p_k^{\alpha_k},\quad \operatorname{CD}(N)=\prod_{i=1}^{k}(\alpha_i+1)`},
  {course:"aritmetica",engineId:"pari-gp",pattern:/m[uú]ltiplos y divisores|divisibilidad/,tex:String.raw`A=\overset{\circ}{n}+r\iff A=n\cdot k+r,\quad k\in\mathbb{Z},\ 0\le r<n`},
  {course:"aritmetica",engineId:"mathjs",pattern:/cuatro operaciones|m[eé]todos operativos/,tex:String.raw`D=d\cdot q+r\ (0\le r<d),\quad r_d+r_e=d,\quad q_e=q_d+1`},
  {course:"aritmetica",engineId:"mathjs",pattern:/n[uú]meros naturales/,tex:String.raw`S_n=1+2+3+\cdots+n=\frac{n(n+1)}{2},\quad n\in\mathbb{N}`},
  {course:"aritmetica",engineId:"mathjs",pattern:/n[uú]meros enteros|en z\b/i,tex:String.raw`a-b=a+(-b),\quad |a\cdot b|=|a|\cdot|b|,\quad a,b\in\mathbb{Z}`},
  {course:"aritmetica",engineId:"mathjs",pattern:/fraccion|racionales|decimales/,tex:String.raw`\frac{a}{b}+\frac{c}{d}=\frac{ad+bc}{bd},\quad 0,\widehat{ab}=\frac{\overline{ab}}{99},\quad 0,a\widehat{bc}=\frac{\overline{abc}-a}{900}`},
  {course:"aritmetica",engineId:"mathjs",pattern:/n[uú]meros reales|radical/,tex:String.raw`\sqrt[n]{a\cdot b}=\sqrt[n]{a}\cdot\sqrt[n]{b},\quad |a+b|\le|a|+|b|,\quad a,b\in\mathbb{R}`},
  {course:"aritmetica",engineId:"mathjs",pattern:/porcentaj/,tex:String.raw`p\%\cdot N=\frac{p}{100}\cdot N,\quad D_u=\left(d_1+d_2-\frac{d_1d_2}{100}\right)\%`},
  {course:"aritmetica",engineId:"mathjs",pattern:/proporcional|razones y proporciones|regla de tres/,tex:String.raw`\frac{A\ (\text{DP})}{B}=\text{cte},\quad A\cdot C\ (\text{IP})=\text{cte},\quad \frac{\text{Obra}}{\text{Obreros}\cdot\text{Tiempo}\cdot\text{Efic.}}=k`},
  {course:"aritmetica",engineId:"mathjs",pattern:/inter[eé]s|descuento/,tex:String.raw`I=C\cdot r\%\cdot t,\quad M=C(1+r\%\cdot t),\quad D_c=V_n\cdot r\%\cdot t`},
  {course:"aritmetica",engineId:"mathjs",pattern:/mezcla|aleaci[oó]n/,tex:String.raw`P_m=\frac{C_1P_1+C_2P_2+\cdots+C_kP_k}{C_1+C_2+\cdots+C_k},\quad \text{Ley}=\frac{W_{\text{fino}}}{W_{\text{total}}}`},
  {course:"aritmetica",engineId:"mathjs",pattern:/unidades de (?:medida|volumen)/,tex:String.raw`1\text{ m}^3=1000\text{ L},\quad 1\text{ ha}=10^4\text{ m}^2,\quad 1\text{ t}=1000\text{ kg}`},
  {course:"aritmetica",engineId:"jstat",pattern:/tabla de dist|an[aá]lisis e inter|tendencia no central/,tex:String.raw`h_i=\frac{f_i}{n},\quad Q_k=L_i+w\left(\frac{\frac{kn}{4}-F_{i-1}}{f_i}\right),\quad \sum_{i=1}^{k}f_i=n`},
  {course:"aritmetica",engineId:"geogebra",pattern:/geometr[ií]a|l[ií]neas notables/,tex:String.raw`C+V=A+2\quad\text{(Teorema de Euler)},\quad d=\sqrt{a^2+b^2+c^2}`},
  {course:"aritmetica",engineId:"z3-wasm",pattern:/calendario|tiempo|verdades|pesadas|poleas|traslado|ruta/,tex:String.raw`N_{\text{pesadas}}=\lceil\log_3(n)\rceil,\quad n_A\cdot Z_A=n_B\cdot Z_B,\quad \Delta\text{días}\equiv r\pmod 7`},

  // ============================================================================
  // 3. GEOMETRÍA (100% de cobertura en 1.º a 5.º de secundaria)
  // ============================================================================
  {course:"geometria",engineId:"jsxgraph",pattern:/segmento/,tex:String.raw`AB+BC=AC,\quad \frac{AB}{BC}=\frac{AD}{CD}\quad\text{(Cuaterna Armónica)}`},
  {course:"geometria",engineId:"jsxgraph",pattern:/[aá]ngulos? (?:determinados|formados).*paralela/,tex:String.raw`\alpha_{\text{alt. int.}}=\beta,\quad \alpha_{\text{conj. int.}}+\theta=180^\circ\quad(L_1\parallel L_2)`},
  {course:"geometria",engineId:"jsxgraph",pattern:/[aá]ngulo/,tex:String.raw`m\angle AOB+m\angle BOC=m\angle AOC,\quad C(\alpha)=90^\circ-\alpha,\quad S(\alpha)=180^\circ-\alpha`},
  {course:"geometria",engineId:"geogebra",pattern:/tri[aá]ngulos? rect[aá]ngulos?|pit[aá]goras|relaciones m[eé]tricas/,tex:String.raw`a^2+b^2=c^2,\quad h^2=m\cdot n,\quad a\cdot b=c\cdot h`},
  {course:"geometria",engineId:"geogebra",pattern:/proporcionalidad|semejanza/,tex:String.raw`\frac{AB}{BC}=\frac{DE}{EF}\quad\text{(Teorema de Thales)},\quad \frac{a}{a'}=\frac{b}{b'}=\frac{h}{h'}=k`},
  {course:"geometria",engineId:"geogebra",pattern:/tri[aá]ngulo/,tex:String.raw`\alpha+\beta+\gamma=180^\circ,\quad e=\alpha+\beta,\quad |b-c|<a<b+c`},
  {course:"geometria",engineId:"geogebra",pattern:/cuadril[aá]tero/,tex:String.raw`\alpha+\beta+\gamma+\delta=360^\circ,\quad m_{\text{mediana}}=\frac{B+b}{2}`},
  {course:"geometria",engineId:"geogebra",pattern:/pol[ií]gono/,tex:String.raw`S_i=180^\circ(n-2),\quad S_e=360^\circ,\quad N_D=\frac{n(n-3)}{2}`},
  {course:"geometria",engineId:"geogebra",pattern:/circunferencia|c[ií]rculo/,tex:String.raw`L=2\pi r,\quad A=\pi r^2,\quad \theta_{\text{inscrito}}=\frac{\widehat{AB}}{2},\quad PA\cdot PB=PC\cdot PD`},
  {course:"geometria",engineId:"geogebra",pattern:/per[ií]metro|[aá]rea/,tex:String.raw`A_\triangle=\frac{b\cdot h}{2}=\sqrt{p(p-a)(p-b)(p-c)},\quad A_{\odot}=\pi r^2,\quad p=\frac{a+b+c}{2}`},
  {course:"geometria",engineId:"threejs-math",pattern:/prisma|cilindro/,tex:String.raw`V_{\text{prisma}}=A_b\cdot h,\quad A_L=2p_b\cdot h,\quad V_{\text{cilindro}}=\pi r^2h`},
  {course:"geometria",engineId:"threejs-math",pattern:/pir[aá]mide|cono/,tex:String.raw`V_{\text{pirámide}}=\frac{1}{3}A_b\cdot h,\quad V_{\text{cono}}=\frac{1}{3}\pi r^2h,\quad g^2=h^2+r^2`},
  {course:"geometria",engineId:"threejs-math",pattern:/poliedro|despliegue|s[oó]lido/,tex:String.raw`C+V=A+2,\quad V_{\text{cil}}=\pi r^2h,\quad V_{\text{cono}}=\frac{1}{3}\pi r^2h,\quad V_{\text{esfera}}=\frac{4}{3}\pi r^3`},
  {course:"geometria",engineId:"desmos",pattern:/par[aá]bola|elipse|c[oó]nica/,tex:String.raw`(x-h)^2=4p(y-k),\quad \frac{(x-h)^2}{a^2}+\frac{(y-k)^2}{b^2}=1,\quad a^2=b^2+c^2`},
  {course:"geometria",engineId:"jsxgraph",pattern:/recta|geometr[ií]a anal[ií]tica/,tex:String.raw`d=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2},\quad m=\frac{y_2-y_1}{x_2-x_1},\quad y-y_1=m(x-x_1)`},
  {course:"geometria",engineId:"jsxgraph",pattern:/escala|plano|mapa|transformaciones geom[eé]tricas/,tex:String.raw`E=\frac{d_{\text{dibujo}}}{D_{\text{real}}},\quad R_\theta(x,y)=(x\cos\theta-y\sin\theta,\ x\sin\theta+y\cos\theta)`},

  // ============================================================================
  // 4. TRIGONOMETRÍA (100% de cobertura en 1.º a 5.º de secundaria)
  // ============================================================================
  {course:"trigonometria",engineId:"jsxgraph",pattern:/sistema(?:s)? (?:de )?medida(?:s)? angular|sistema(?:s)? angular/,tex:String.raw`\frac{S}{180}=\frac{C}{200}=\frac{R}{\pi}\iff \frac{S}{9}=\frac{C}{10}=\frac{20R}{\pi}`},
  {course:"trigonometria",engineId:"jsxgraph",pattern:/[aá]ngulo trigonom[eé]trico/,tex:String.raw`\theta_{\text{antihorario}}>0,\quad \theta_{\text{horario}}<0,\quad 1\text{ vuelta}=360^\circ=400^g=2\pi\text{ rad}`},
  {course:"trigonometria",engineId:"jsxgraph",pattern:/longitud de arco|sector circular/,tex:String.raw`L=\theta\cdot r,\quad S=\frac{1}{2}\theta r^2=\frac{L\cdot r}{2}=\frac{L^2}{2\theta}\quad(\theta\text{ en rad})`},
  {course:"trigonometria",engineId:"jsxgraph",pattern:/[aá]ngulos? verticales/,tex:String.raw`H=d\cdot\tan\alpha+h_{\text{obs}},\quad d=H(\cot\alpha-\cot\beta)`},
  {course:"trigonometria",engineId:"jsxgraph",pattern:/posici[oó]n normal|cuadrantales/,tex:String.raw`r=\sqrt{x^2+y^2}>0,\quad \sin\theta=\frac{y}{r},\quad \cos\theta=\frac{x}{r},\quad \tan\theta=\frac{y}{x}\ (x\ne0)`},
  {course:"trigonometria",engineId:"jsxgraph",pattern:/[aá]ngulos? notables?/,tex:String.raw`\sin30^\circ=\cos60^\circ=\frac{1}{2},\quad \tan45^\circ=1,\quad \sin37^\circ=\frac{3}{5},\ \cos37^\circ=\frac{4}{5}`},
  {course:"trigonometria",engineId:"jsxgraph",pattern:/razones? trigonom[eé]tricas?|\br\s*t\b/i,tex:String.raw`\sin\theta=\frac{\text{CO}}{H},\quad \cos\theta=\frac{\text{CA}}{H},\quad \tan\theta=\frac{\text{CO}}{\text{CA}},\quad \sin\alpha=\cos(90^\circ-\alpha)`},
  {course:"trigonometria",engineId:"sympy",pattern:/[aá]ngulos? compuestos/,tex:String.raw`\sin(\alpha\pm\beta)=\sin\alpha\cos\beta\pm\cos\alpha\sin\beta,\quad \cos(\alpha\pm\beta)=\cos\alpha\cos\beta\mp\sin\alpha\sin\beta`},
  {course:"trigonometria",engineId:"sympy",pattern:/[aá]ngulos? m[uú]ltiples/,tex:String.raw`\sin2\theta=2\sin\theta\cos\theta,\quad \cos2\theta=\cos^2\theta-\sin^2\theta,\quad \tan2\theta=\frac{2\tan\theta}{1-\tan^2\theta}`},
  {course:"trigonometria",engineId:"sympy",pattern:/transformaciones trigonom[eé]tricas/,tex:String.raw`\sin A+\sin B=2\sin\left(\frac{A+B}{2}\right)\cos\left(\frac{A-B}{2}\right),\quad 2\sin x\cos y=\sin(x+y)+\sin(x-y)`},
  {course:"trigonometria",engineId:"sympy",pattern:/identidad(?:es)? trigonom[eé]tricas?/,tex:String.raw`\sin^2\theta+\cos^2\theta=1,\quad 1+\tan^2\theta=\sec^2\theta,\quad 1+\cot^2\theta=\csc^2\theta`},
  {course:"trigonometria",engineId:"jsxgraph",pattern:/circunferencia trigonom[eé]trica/,tex:String.raw`x^2+y^2=1,\quad P(\theta)=(\cos\theta,\sin\theta),\quad -1\le\sin\theta,\cos\theta\le1`},
  {course:"trigonometria",engineId:"desmos",pattern:/funciones trigonom[eé]tricas/,tex:String.raw`f(x)=A\sin(Bx+C)+D,\quad T=\frac{2\pi}{|B|},\quad \arcsin x+\arccos x=\frac{\pi}{2}`},
  {course:"trigonometria",engineId:"sympy",pattern:/ecuacion(?:es)? trigonom[eé]tricas?/,tex:String.raw`\sin x=\sin\alpha\implies x=k\pi+(-1)^k\alpha,\quad \cos x=\cos\alpha\implies x=2k\pi\pm\alpha\ (k\in\mathbb{Z})`},
  {course:"trigonometria",engineId:"jsxgraph",pattern:/reducci[oó]n al primer cuadrante/,tex:String.raw`\operatorname{RT}(180^\circ\pm\theta)=\pm\operatorname{RT}(\theta),\quad \operatorname{RT}(90^\circ\pm\theta)=\pm\operatorname{Co-RT}(\theta)`},
  {course:"trigonometria",engineId:"geogebra",pattern:/oblicu[aá]ngulos/,tex:String.raw`\frac{a}{\sin A}=\frac{b}{\sin B}=\frac{c}{\sin C}=2R,\quad a^2=b^2+c^2-2bc\cos A`},

  // ============================================================================
  // 5. ESTADÍSTICA Y PROBABILIDAD (100% de cobertura en 1.º a 5.º de secundaria)
  // ============================================================================
  {course:"estadistica-y-probabilidad",engineId:"plotly",pattern:/gr[aá]fico|barras|circular|lineal/,tex:String.raw`h_i=\frac{f_i}{n},\quad h_i\%=h_i\times100\%,\quad \theta_i=360^\circ\cdot\frac{f_i}{n}`},
  {course:"estadistica-y-probabilidad",engineId:"jstat",pattern:/frecuencia|introducci[oó]n a la estad[ií]stica|^estad[ií]stica$/,tex:String.raw`n=\sum_{i=1}^{k}f_i,\quad F_m=\sum_{i=1}^{m}f_i,\quad h_i=\frac{f_i}{n},\quad \sum_{i=1}^{k}h_i=1`},
  {course:"estadistica-y-probabilidad",engineId:"jstat",pattern:/dispersi[oó]n|varianza/,tex:String.raw`\sigma^2=\frac{\sum_{i=1}^{k}f_i(x_i-\bar{x})^2}{n},\quad \sigma=\sqrt{\sigma^2},\quad CV=\frac{\sigma}{\bar{x}}\times100\%`},
  {course:"estadistica-y-probabilidad",engineId:"jstat",pattern:/tendencia central|promedio/,tex:String.raw`\bar{x}=\frac{\sum_{i=1}^{k}x_if_i}{n},\quad Me=L_i+w\left(\frac{\frac{n}{2}-F_{i-1}}{f_i}\right),\quad Mo=L_i+w\left(\frac{d_1}{d_1+d_2}\right)`},
  {course:"estadistica-y-probabilidad",engineId:"jstat",pattern:/combinator/,tex:String.raw`P_n=n!,\quad V_k^n=\frac{n!}{(n-k)!},\quad C_k^n=\binom{n}{k}=\frac{n!}{k!(n-k)!}`},
  {course:"estadistica-y-probabilidad",engineId:"jstat",pattern:/probabilidad/,tex:String.raw`P(A)=\frac{n(A)}{n(\Omega)},\quad P(A\cup B)=P(A)+P(B)-P(A\cap B),\quad P(A')=1-P(A)`},

  // ============================================================================
  // 6. RAZONAMIENTO MATEMÁTICO (100% de cobertura en 1.º a 5.º de secundaria)
  // ============================================================================
  {course:"razonamiento-matematico",engineId:"z3-wasm",pattern:/cronometr[ií]|reloj/,tex:String.raw`\theta=\left|30H-\frac{11}{2}M\right|,\quad T_{\text{total}}=(N_{\text{camp}}-1)\cdot I`},
  {course:"razonamiento-matematico",engineId:"z3-wasm",pattern:/m[oó]viles?|movimiento/,tex:String.raw`d=v\cdot t,\quad t_{\text{encuentro}}=\frac{d}{v_1+v_2},\quad t_{\text{alcance}}=\frac{d}{v_1-v_2}\ (v_1>v_2)`},
  {course:"razonamiento-matematico",engineId:"sympy",pattern:/planteo de ecuaciones?|edades/,tex:String.raw`E_A(\text{hoy})-E_B(\text{hoy})=E_A(\text{futuro})-E_B(\text{futuro})=\text{cte},\quad ax+b=c\implies x=\frac{c-b}{a}`},
  {course:"razonamiento-matematico",engineId:"z3-wasm",pattern:/conteo de (?:cubos|caras)/,tex:String.raw`N_{\text{cubos}}=\sum_{k=1}^{n}k^3=\left[\frac{n(n+1)}{2}\right]^2,\quad N_{\text{paralelepípedos}}=\frac{n(n+1)}{2}\frac{m(m+1)}{2}\frac{p(p+1)}{2}`},
  {course:"razonamiento-matematico",engineId:"z3-wasm",pattern:/conteo de figuras/,tex:String.raw`N_{\text{seg}}=\frac{n(n+1)}{2},\quad N_{\text{cuadriláteros}}=\frac{n(n+1)}{2}\cdot\frac{m(m+1)}{2}`},
  {course:"razonamiento-matematico",engineId:"z3-wasm",pattern:/cortes|estacas|campanadas/,tex:String.raw`N_{\text{cortes}}=\frac{L_T}{L_u}-1,\quad N_{\text{estacas}}=\frac{L_T}{L_u}+1,\quad N_{\text{fig. cerrada}}=\frac{\text{Perímetro}}{L_u}`},
  {course:"razonamiento-matematico",engineId:"z3-wasm",pattern:/criptoaritm[eé]tica/,tex:String.raw`\overline{abc}_{(10)}=100a+10b+c,\quad a\in\{1,\dots,9\},\quad b,c\in\{0,\dots,9\}`},
  {course:"razonamiento-matematico",engineId:"z3-wasm",pattern:/cuadrados m[aá]gicos|arreglos num[eé]ricos/,tex:String.raw`S_{\text{mágica}}=\frac{n(n^2+1)}{2}=3\cdot t_{\text{central}}\quad(n=3)`},
  {course:"razonamiento-matematico",engineId:"z3-wasm",pattern:/certeza/,tex:String.raw`N_{\text{extracciones mín}}=\text{Casos Desfavorables (peor escenario)}+\text{Casos Solicitados}`},
  {course:"razonamiento-matematico",engineId:"lean4-web",pattern:/l[oó]gica proposicional|situaciones l[oó]gicas|suficiencia de datos/,tex:String.raw`(p\to q)\equiv(\neg p\vee q),\quad \neg(p\wedge q)\equiv(\neg p\vee\neg q),\quad (p\to q)\equiv(\neg q\to\neg p)`},
  {course:"razonamiento-matematico",engineId:"sympy",pattern:/operadores matem[aá]ticos/,tex:String.raw`a\ast b=f(a,b),\quad a\ast e=e\ast a=a\ (\text{neutro}),\quad a\ast a^{-1}=e\ (\text{inverso})`},
  {course:"razonamiento-matematico",engineId:"z3-wasm",pattern:/inductivo|deductivo|habilidad operativa|propiedades de los n[uú]meros/,tex:String.raw`\sum_{k=1}^{n}(2k-1)=n^2,\quad \sum_{k=1}^{n}k(k+1)=\frac{n(n+1)(n+2)}{3},\quad (\overline{a5})^2=\overline{[a(a+1)]25}`},
  {course:"razonamiento-matematico",engineId:"cytoscape",pattern:/un solo trazo|trazo de figuras|rutas|trayectorias/,tex:String.raw`N_{\text{vértices impares}}\in\{0,2\}\ (\text{Euler}),\quad N_{\text{rutas}}=P_{a,b}^{a+b}=\frac{(a+b)!}{a!\,b!}`},
  {course:"razonamiento-matematico",engineId:"z3-wasm",pattern:/balanzas|pesadas/,tex:String.raw`\sum F_i d_i=\sum F_j d_j,\quad N_{\text{pesadas mín}}=\lceil\log_3(n)\rceil`},
  {course:"razonamiento-matematico",engineId:"z3-wasm",pattern:/ordenamiento/,tex:String.raw`P_n=n!\ (\text{lineal}),\quad P_c(n)=(n-1)!\ (\text{circular simétrico})`},
  {course:"razonamiento-matematico",engineId:"z3-wasm",pattern:/analog[ií]a|distribuci[oó]n|secuencia|psicot[eé]cnico|psicot[oó]nico|discordante|patrones|parentesco|tiempo/,tex:String.raw`t_n=t_1+(n-1)r+\frac{(n-1)(n-2)}{2}r_2,\quad x_{i,m}=F(x_{i,1},x_{i,2})`},

  // ============================================================================
  // 7. FÍSICA (100% de cobertura en 5.º de secundaria — 14 lecciones)
  // ============================================================================
  {course:"fisica",engineId:"matter-physics",pattern:/an[aá]lisis dimensional/,tex:String.raw`[X]=L^aM^bT^c\Theta^dI^eJ^fN^g,\quad \|\mathbf{R}\|=\sqrt{A^2+B^2+2AB\cos\theta}`},
  {course:"fisica",engineId:"matter-physics",pattern:/cinem[aá]tica unidimensional/,tex:String.raw`x(t)=x_0+v_0t+\frac{1}{2}at^2,\quad v_f=v_0+at,\quad v_f^2=v_0^2+2a\Delta x`},
  {course:"fisica",engineId:"matter-physics",pattern:/parab[oó]lico/,tex:String.raw`H_{\max}=\frac{v_0^2\sin^2\theta}{2g},\quad R_{\max}=\frac{v_0^2\sin2\theta}{g},\quad a_c=\frac{v^2}{R}=\omega^2R`},
  {course:"fisica",engineId:"matter-physics",pattern:/est[aá]tica/,tex:String.raw`\sum\mathbf{F}=\mathbf{0},\quad \sum\boldsymbol{\tau}_O=\mathbf{0},\quad \frac{F_1}{\sin\alpha}=\frac{F_2}{\sin\beta}=\frac{F_3}{\sin\gamma}\ (\text{Lamy})`},
  {course:"fisica",engineId:"matter-physics",pattern:/din[aá]mica/,tex:String.raw`\sum\mathbf{F}=m\mathbf{a},\quad F_{\text{cp}}=m\frac{v^2}{R},\quad f_k=\mu_kF_N,\quad f_{s,\max}=\mu_sF_N`},
  {course:"fisica",engineId:"matter-physics",pattern:/gravitaci[oó]n/,tex:String.raw`F_g=G\frac{m_1m_2}{r^2},\quad g(h)=g_0\left(\frac{R_T}{R_T+h}\right)^2,\quad \frac{T_1^2}{a_1^3}=\frac{T_2^2}{a_2^3}`},
  {course:"fisica",engineId:"matter-physics",pattern:/trabajo mec[aá]nico/,tex:String.raw`W_{A\to B}=\int_A^B\mathbf{F}\cdot d\mathbf{r},\quad P=\frac{dW}{dt}=\mathbf{F}\cdot\mathbf{v},\quad \eta=\frac{P_{\text{útil}}}{P_{\text{entregada}}}\times100\%`},
  {course:"fisica",engineId:"matter-physics",pattern:/energ[ií]a mec[aá]nica/,tex:String.raw`E_m=E_c+U_g+U_e=\frac{1}{2}mv^2+mgh+\frac{1}{2}kx^2,\quad W_{\text{FNC}}=\Delta E_m`},
  {course:"fisica",engineId:"matter-physics",pattern:/cantidad de movimiento/,tex:String.raw`\mathbf{I}=\int_{t_0}^{t_f}\mathbf{F}\,dt=\Delta\mathbf{p},\quad \sum\mathbf{p}_{\text{antes}}=\sum\mathbf{p}_{\text{después}},\quad e=-\frac{v_{2f}-v_{1f}}{v_{2i}-v_{1i}}`},
  {course:"fisica",engineId:"scipy-ode",pattern:/arm[oó]nico simple/,tex:String.raw`x(t)=A\sin(\omega t+\varphi),\quad \omega=\sqrt{\frac{k}{m}},\quad T=2\pi\sqrt{\frac{L}{g}},\quad v=\lambda\cdot f`},
  {course:"fisica",engineId:"matter-physics",pattern:/hidrost[aá]tica/,tex:String.raw`P_{\text{abs}}=P_{\text{atm}}+\rho_{\text{líq}}gh,\quad \frac{F_1}{A_1}=\frac{F_2}{A_2},\quad E_{\text{Arq}}=\rho_{\text{líq}}gV_{\text{sum}}`},
  {course:"fisica",engineId:"matter-physics",pattern:/calorimetr[ií]a|termodin[aá]mica/,tex:String.raw`Q=mc_e\Delta T,\quad Q=\Delta U+W,\quad PV=nRT,\quad \eta_{\text{Carnot}}=1-\frac{T_F}{T_C}`},
  {course:"fisica",engineId:"matter-physics",pattern:/electrost[aá]tica/,tex:String.raw`F=k_e\frac{|q_1q_2|}{r^2},\quad E=k_e\frac{|Q|}{r^2},\quad V=k_e\frac{Q}{r},\quad C=\frac{Q}{\Delta V}=\varepsilon_0\frac{A}{d}`},
  {course:"fisica",engineId:"matter-physics",pattern:/electrodin[aá]mica|electromagnetismo/,tex:String.raw`\Delta V=I\cdot R,\quad P=I^2R,\quad \mathbf{F}_m=q(\mathbf{E}+\mathbf{v}\times\mathbf{B}),\quad \varepsilon=-\frac{d\Phi_B}{dt}`},

  // ============================================================================
  // 8. QUÍMICA (100% de cobertura en 5.º de secundaria — 12 lecciones)
  // ============================================================================
  {course:"quimica",engineId:"chem-eq",pattern:/materia, energ[ií]a/,tex:String.raw`\Delta E=\Delta m\cdot c^2,\quad m_f=\frac{m_0}{\sqrt{1-(v/c)^2}},\quad Q=m\cdot c_e\cdot\Delta T`},
  {course:"quimica",engineId:"chem-eq",pattern:/n[uú]clidos/,tex:String.raw`{}_{Z}^{A}\text{E}^{q}:\quad A=Z+N,\quad \#e^{-}=Z-q`},
  {course:"quimica",engineId:"chem-eq",pattern:/n[uú]meros cu[aá]nticos/,tex:String.raw`E_R=n+l,\quad \#\text{máx }e^{-}=2(2l+1),\quad \mu=\sqrt{k(k+2)}\ \text{BM}`},
  {course:"quimica",engineId:"chem-eq",pattern:/tabla peri[oó]dica/,tex:String.raw`Z_{\text{ef}}=Z-\sigma,\quad \text{Grupo}=\#e^{-}\text{ valencia},\quad \text{Periodo}=\max(n)`},
  {course:"quimica",engineId:"chem-eq",pattern:/hibridaci[oó]n|enlace qu[ií]mico/,tex:String.raw`\text{CF}=V-\left(L+\frac{1}{2}B\right),\quad \text{O.E.}=\frac{n_{e^-,\text{enl}}-n_{e^-,\text{antienl}}}{2},\quad \mu=q\cdot d`},
  {course:"quimica",engineId:"chem-eq",pattern:/nomenclatura/,tex:String.raw`\sum_{i}\nu_i\cdot(\text{E.O.})_i=q_{\text{total}},\quad \sum(\text{E.O.})_{\text{neutro}}=0`},
  {course:"quimica",engineId:"chem-eq",pattern:/unidades qu[ií]micas de masa/,tex:String.raw`n=\frac{m}{\bar{M}}=\frac{N_{\text{partículas}}}{N_A}=\frac{V_{\text{CN}}}{22,4\text{ L}},\quad N_A=6,022\times10^{23}\text{ mol}^{-1}`},
  {course:"quimica",engineId:"chem-eq",pattern:/estado gaseoso/,tex:String.raw`PV=nRT,\quad P\cdot\bar{M}=\rho RT,\quad P_i=x_iP_T,\quad \frac{v_A}{v_B}=\sqrt{\frac{\bar{M}_B}{\bar{M}_A}}`},
  {course:"quimica",engineId:"chem-eq",pattern:/balance redox|reacciones qu[ií]micas/,tex:String.raw`\sum n_{\text{ox}}\cdot|\Delta\text{E.O.}_{\text{ox}}|=\sum n_{\text{red}}\cdot|\Delta\text{E.O.}_{\text{red}}|,\quad E^\circ_{\text{celda}}=E^\circ_{\text{cát}}-E^\circ_{\text{án}}`},
  {course:"quimica",engineId:"chem-eq",pattern:/estequiometr[ií]a/,tex:String.raw`\frac{n_A}{|a|}=\frac{n_B}{|b|}=\frac{n_C}{|c|},\quad \%R=\frac{m_{\text{real}}}{m_{\text{teórica}}}\times100\%`},
  {course:"quimica",engineId:"chem-eq",pattern:/molaridad|normalidad/,tex:String.raw`M=\frac{n_{\text{sto}}}{V_{\text{sol(L)}}}=\frac{10\cdot\%m\cdot\rho_{\text{sol}}}{\bar{M}_{\text{sto}}},\quad N=M\cdot\theta,\quad C_1V_1=C_2V_2`},
  {course:"quimica",engineId:"chem-eq",pattern:/equilibrio qu[ií]mico|ph/i,tex:String.raw`K_p=K_c(RT)^{\Delta n},\quad \text{pH}=-\log[\text{H}^+],\quad \text{pH}+\text{pOH}=14\ (25^\circ\text{C})`},
];

// Fórmulas por tema verificadas: no se sustituyen claves de ejercicios.
const LESSON_FORMULA_CORRECTIONS = {
  "nociones-basicas-de-geometria-1sec-unidad1": String.raw`AB+BC=AC\quad(B\text{ entre }A\text{ y }C)`,
  "criptoaritmetica-1sec-unidad2": String.raw`\overline{ab}=10a+b,\quad 1\le a\le9,\quad 0\le b\le9`,
  "criptoaritmetica-i-1sec-unidad2": String.raw`\overline{abc}=100a+10b+c,\quad 1\le a\le9`,
  "operaciones-con-polinomios-1sec-unidad2": String.raw`(P+Q)(x)=P(x)+Q(x),\quad (PQ)(x)=P(x)Q(x)`,
};

export function resolveEditorialKeyFormula(lesson) {
  if(lesson?.slug && LESSON_FORMULA_CORRECTIONS[lesson.slug])return LESSON_FORMULA_CORRECTIONS[lesson.slug];
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
