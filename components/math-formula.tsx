import katex from "katex";

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
    .replace(/arcsen|arccos|arctan|arccot|arcsec|arccsc|sen|cos|tan|cot|sec|csc|log₂|log|ln/g, name => { const names:Record<string,string>={arcsen:"arcsin",arccos:"arccos",arctan:"arctan",sen:"sin","log₂":"log_{2}"}; return "\\"+(names[name]||(["arccot","arcsec","arccsc"].includes(name)?`operatorname{${name}}`:name))+" "; })
    .replace(/√\(([^()]*)\)/g,String.raw`\sqrt{$1}`).replace(/√([A-Za-z0-9]+)/g,String.raw`\sqrt{$1}`)
    .replace(/²/g,"^{2}").replace(/³/g,"^{3}").replace(/ˣ/g,"^{x}").replace(/₂/g,"_{2}")
    .replace(/ℝ/g,String.raw`\mathbb{R}`).replace(/∖/g,String.raw`\setminus `).replace(/∪/g,String.raw`\cup `).replace(/∞/g,String.raw`\infty`)
    .replace(/≤/g,String.raw`\le `).replace(/≥/g,String.raw`\ge `).replace(/≠/g,String.raw`\ne `).replace(/→/g,String.raw`\to `).replace(/·/g,String.raw`\cdot `)
    .replace(/π/g,String.raw`\pi `).replace(/−/g,"-");
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
  if(exact[source])return exact[source];
  if(source.includes("\\"))return source;
  if(source.includes("∖")||source.includes("∪")||source==="ℝ")return symbols(source.replace(/\{/g,"\\{").replace(/\}/g,"\\}"));
  const limit=source.match(/^lim x→([^ ]+) (.+)$/);
  if(limit)return String.raw`\displaystyle \lim_{x\to ${symbols(limit[1])}} ${exact[limit[2]]||expression(limit[2])}`;
  return expression(source.replace(" cerca de ",",\quad x\to "));
}

export function MathFormula({source,className="math-formula",displayMode=true,label}:{source:string;className?:string;displayMode?:boolean;label?:string}){
  const tex=toLatex(source);
  const html=katex.renderToString(tex,{throwOnError:false,strict:false,displayMode,output:"htmlAndMathml"});
  const Tag=displayMode?"div":"span";
  return <Tag className={className} aria-label={label||source} dangerouslySetInnerHTML={{__html:html}}/>;
}
