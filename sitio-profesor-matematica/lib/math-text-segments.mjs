/**
 * Separador conservador de texto científico y expresiones matemáticas.
 * No interpreta prosa como algebra: primero delimitadores explícitos, después
 * patrones con límites y sintaxis completos. Los OCR ambiguos se mantienen.
 */
const delimiters=[
  {open:"$$",close:"$$",display:true},
  {open:"\\[",close:"\\]",display:true},
  {open:"\\(",close:"\\)",display:false},
  {open:"$",close:"$",display:false},
];

const par=String.raw`\([^()\n]{1,48}\)`;
const call="[A-Za-z]"+par;
const supers=String.raw`(?:[⁰¹²³⁴⁵⁶⁷⁸⁹ⁿˣ₀₁₂₃₄₅₆₇₈₉]|\^\{?[-+a-zA-Z0-9]{1,12}\}?){0,2}`;
const base=String.raw`(?:[A-Za-zπθℝℕℤ]|\d+(?:[.,]\d+)?)`+supers;
const factor="(?:"+call+"|"+par+"|√"+par+"|√[A-Za-z0-9]+|"+base+")"+supers;
const product="(?:"+factor+"){1,3}";
const rhs="[-+−]?"+product+"(?:\\s*[+\\-−*/·×÷]\\s*"+product+"){0,12}";
const relations=new RegExp("(?<![A-Za-z0-9])(?:"+call+"|[a-zA-Z])\\s*(?:=|≠|≥|≤|>|<|→|∈|∉)\\s*"+rhs,"gu");
const calls=new RegExp("(?<![A-Za-z0-9])"+call,"gu");
const powers=/\b[a-zA-Z][⁰¹²³⁴⁵⁶⁷⁸⁹ⁿˣ₀₁₂₃₄₅₆₇₈₉]+/gu;
const roots=/√\([^()\n]{1,48}\)|√[A-Za-z0-9]+/gu;
const fractions=/(?:\b\d+|[A-Za-z])\/\([^()\n]{1,48}\)|\b\d+\/\d+\b/gu;
const texAtoms=/\\(?:dfrac|tfrac|frac)\{[^{}]{1,90}\}\{[^{}]{1,90}\}|\\sqrt\{[^{}]{1,90}\}/gu;

function autoSegment(text){
  const matches=[];
  for(const regex of [relations,texAtoms,fractions,roots,powers,calls]){
    regex.lastIndex=0;
    for(const match of text.matchAll(regex)){
      const start=match.index;
      const end=start+match[0].length;
      // Nunca renderizar solo una parte de una potencia o de una respuesta incompleta.
      if(/^[\^_{]/.test(text.slice(end)))continue;
      if(match[0].includes("____")||/[=+\-−/*^_]$/.test(match[0]))continue;
      if(matches.some(m=>start<m.end&&end>m.start))continue;
      matches.push({start,end,value:match[0]});
    }
  }
  matches.sort((a,b)=>a.start-b.start);
  const pieces=[];
  let cursor=0;
  for(const m of matches){
    if(m.start>cursor)pieces.push({type:"text",value:text.slice(cursor,m.start)});
    pieces.push({type:"math",value:m.value,display:false});
    cursor=m.end;
  }
  if(cursor<text.length)pieces.push({type:"text",value:text.slice(cursor)});
  return pieces.length?pieces:[{type:"text",value:text}];
}

export function stripMathDelimiters(value){
  const source=String(value??"").trim();
  for(const d of delimiters){
    if(source.startsWith(d.open)&&source.endsWith(d.close)&&source.length>d.open.length+d.close.length){
      return source.slice(d.open.length,-d.close.length).trim();
    }
  }
  return source;
}

export function splitMathText(value){
  const text=String(value??"");
  const parts=[];
  let cursor=0;
  while(cursor<text.length){
    let found=null;
    for(const d of delimiters){
      let at=text.indexOf(d.open,cursor);
      if(d.open==="$"){
        while(at>=0&&at>0&&text[at-1]==="\\")at=text.indexOf(d.open,at+1);
      }
      if(at>=0&&(!found||at<found.at||(at===found.at&&d.open.length>found.open.length))){
        found={...d,at};
      }
    }
    if(!found){
      parts.push(...autoSegment(text.slice(cursor)));
      break;
    }
    if(found.at>cursor)parts.push(...autoSegment(text.slice(cursor,found.at)));
    const end=text.indexOf(found.close,found.at+found.open.length);
    if(end<0){
      parts.push(...autoSegment(text.slice(found.at)));
      break;
    }
    const tex=text.slice(found.at+found.open.length,end).trim();
    if(tex)parts.push({type:"math",value:tex,display:found.display});
    cursor=end+found.close.length;
  }
  return parts.length?parts:[{type:"text",value:text}];
}
