import katex from "katex";
import { splitMathText, stripMathDelimiters } from "@/lib/math-text-segments.mjs";

const exact:Record<string,string>={
  "(1/x − 1/2)/(x − 2)":String.raw`\frac{\frac1x-\frac12}{x-2}`,
  "h(x)=2^(x−1)+2":String.raw`h(x)=2^{x-1}+2`,
  "(x²−1)/(x−1), x≠1":String.raw`\frac{x^2-1}{x-1},\quad x\ne1`,
  "1/x cerca de 0":String.raw`\frac1x,\quad x\to0`,
  "f(x)=x²−3x+2 en x=1":String.raw`f(x)=x^2-3x+2,\quad x=1`,
  "f(x)=(x²−1)/(x−1), x≠1":String.raw`f(x)=\frac{x^2-1}{x-1},\quad x\ne1`,
  "f(x)=1/(x−2) en x=2":String.raw`f(x)=\frac1{x-2},\quad x\to2`,
  "f(x)=(x²−1)/(x−1), x≠1; f(1)=c":String.raw`f(x)=\begin{cases}\frac{x^2-1}{x-1},&x\ne1\\c,&x=1\end{cases}`,
  "(1/2)ˣ":String.raw`\left(\frac12\right)^x`,
  "f(x)=(1/2)ˣ":String.raw`f(x)=\left(\frac12\right)^x`,
  "x<0: −1 · x≥0: 1":String.raw`f(x)=\begin{cases}-1,&x<0\\1,&x\ge 0\end{cases}`,
  "f(x)=−1 si x<0; 1 si x≥0":String.raw`f(x)=\begin{cases}-1,&x<0\\1,&x\ge 0\end{cases}`,
};

function enclosesWhole(value:string,left:string,right:string){
  if(!value.startsWith(left)||!value.endsWith(right))return false;
  let depth=0;
  for(let i=0;i<value.length;i++){
    if(value[i]===left)depth++;
    if(value[i]===right)depth--;
    if(depth===0&&i<value.length-1)return false;
  }
  return depth===0;
}

function ungroup(value:string){
  let result=value.trim();
  if(enclosesWhole(result,"(",")")||enclosesWhole(result,"[","]"))result=result.slice(1,-1);
  return result;
}

function topLevelSlash(value:string){
  let round=0,square=0,curly=0;
  for(let i=0;i<value.length;i++){
    const c=value[i];
    if(c==="(")round++;else if(c===")")round--;else if(c==="[")square++;else if(c==="]")square--;else if(c==="{")curly++;else if(c==="}")curly--;
    else if(c==="/"&&round===0&&square===0&&curly===0)return i;
  }
  return -1;
}

function symbols(value:string){
  return value
    .replace(/(^|[^\\\p{L}])(?:arcsen|arccos|arctan|arccot|arcsec|arccsc|sen|cos|tan|cot|sec|csc|log₂|log|ln)(?=\s*[(0-9xθ^²³])/gu, (whole,prefix) => { const name=whole.slice(prefix.length); const names:Record<string,string>={arcsen:"operatorname{arcsen}",sen:"operatorname{sen}","log₂":"log_{2}"}; return prefix+"\\"+(names[name]||(["arccot","arcsec","arccsc"].includes(name)?`operatorname{${name}}`:name))+" "; })
    .replace(/√\(([^()]*)\)/g,String.raw`\sqrt{$1}`).replace(/√([A-Za-z0-9]+)/g,String.raw`\sqrt{$1}`)
    .replace(/⁰/g,"^{0}").replace(/¹/g,"^{1}").replace(/²/g,"^{2}").replace(/³/g,"^{3}").replace(/⁴/g,"^{4}").replace(/ⁿ/g,"^{n}").replace(/ˣ/g,"^{x}").replace(/₀/g,"_{0}").replace(/₁/g,"_{1}").replace(/₂/g,"_{2}").replace(/₃/g,"_{3}")
    .replace(/ℝ/g,String.raw`\mathbb{R}`).replace(/ℕ/g,String.raw`\mathbb{N}`).replace(/ℤ/g,String.raw`\mathbb{Z}`).replace(/∈/g,String.raw`\in `).replace(/∉/g,String.raw`\notin `).replace(/∩/g,String.raw`\cap `).replace(/∅/g,String.raw`\varnothing`).replace(/∖/g,String.raw`\setminus `).replace(/∪/g,String.raw`\cup `).replace(/∞/g,String.raw`\infty`)
    .replace(/≤/g,String.raw`\le `).replace(/≥/g,String.raw`\ge `).replace(/≠/g,String.raw`\ne `).replace(/→/g,String.raw`\to `).replace(/·/g,String.raw`\cdot `)
    .replace(/π/g,String.raw`\pi `).replace(/θ/g,String.raw`\theta `).replace(/α/g,String.raw`\alpha `).replace(/β/g,String.raw`\beta `).replace(/Δ/g,String.raw`\Delta `).replace(/×/g,String.raw`\times `).replace(/÷/g,String.raw`\div `).replace(/−/g,"-");
}

function expression(value:string):string{
  const trimmed=value.trim();
  const equality=trimmed.indexOf("=");
  if(equality>0&&!/[<>]$/.test(trimmed.slice(0,equality))){
    return `${symbols(trimmed.slice(0,equality))}=${expression(trimmed.slice(equality+1))}`;
  }
  const slash=topLevelSlash(trimmed);
  if(slash>0){
    const numerator=ungroup(trimmed.slice(0,slash));
    const denominator=ungroup(trimmed.slice(slash+1));
    return String.raw`\frac{${symbols(numerator)}}{${symbols(denominator)}}`;
  }
  return symbols(trimmed);
}

export function toLatex(source:string){
  const cleaned=stripMathDelimiters(source);
  if(exact[cleaned])return exact[cleaned];
  source=cleaned;
  if(source.includes("\\"))return source;
  if(source.includes("∖")||source.includes("∪")||source==="ℝ")return symbols(source.replace(/\{/g,"\\{").replace(/\}/g,"\\}"));
  const limit=source.match(/^lim x→([^ ]+) (.+)$/);
  if(limit)return String.raw`\displaystyle \lim_{x\to ${symbols(limit[1])}} ${exact[limit[2]]||expression(limit[2])}`;
  return expression(source.replace(" cerca de ",",\quad x\to "));
}

export function MathFormula({source,className="math-formula",displayMode=true,label}:{source:string;className?:string;displayMode?:boolean;label?:string}){
  let html:string|null=null;
  try {
    html=katex.renderToString(toLatex(source),{
      throwOnError:true,strict:"warn",displayMode,output:"htmlAndMathml",trust:false,maxExpand:500,maxSize:10
    });
  } catch {
    // No mostramos código TeX en rojo ni inyectamos contenido sin escapar.
  }
  const Tag=displayMode?"div":"span";
  const classes=className+(displayMode?" math-scroll-region math-typeset-display":" math-typeset-inline");
  if(!html)return <Tag className={classes+" math-typeset-fallback"} title="Expresión pendiente de revisar">{source}</Tag>;
  return <Tag className={classes} role={displayMode?"group":undefined} tabIndex={displayMode ? 0 : undefined}
    aria-label={label||undefined} dangerouslySetInnerHTML={{__html:html}}/>;
}

/** Matemáticas integradas en texto académico: compatible con LaTeX y notación Unicode. */
export function MathText({source,inlineOnly=false}:{source:string;inlineOnly?:boolean}){
  const tokens=splitMathText(source);
  return <>{tokens.map((piece,i)=>piece.type==="math"
    ? <MathFormula key={i} source={piece.value} displayMode={!!piece.display&&!inlineOnly} className="math-text-expression"/>
    : <span key={i}>{piece.value}</span>
  )}</>;
}
