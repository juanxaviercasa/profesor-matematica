/* Fragmentos de notación científica para párrafos con fórmulas incrustadas.
   Conservamos el texto original y no evaluamos comandos ni HTML. */
const delimiters=[
  {open:"$$",close:"$$",display:true},
  {open:"\\[",close:"\\]",display:true},
  {open:"\\(",close:"\\)",display:false},
  {open:"$",close:"$",display:false}
];
const expression=/\b(?:[fghnPCV]\([^()\n]{1,40}\)\s*(?:[=<>≤≥≠]\s*[-+()a-zA-Z0-9πθ√²³ˣ₀₁₂·×÷∞^_/*− ]{1,80})?|[a-zA-Z]\s*[=<>≤≥≠]\s*[-+()a-zA-Z0-9πθ√²³ˣ₀₁₂·×÷∞^_/*− ]{1,65}|√\([^)]{1,55}\)|√[a-zA-Z0-9]+|\b[a-zA-Z][⁰¹²³⁴⁵⁶⁷⁸⁹ˣⁿ₀₁₂₃₄₅₆₇₈₉]+|\b[a-zA-Z]\s*\^\s*\{?[-+a-zA-Z0-9]+\}?)/gu;
function plainParts(text){
  const parts=[];let index=0;
  for(const match of text.matchAll(expression)){
    const start=match.index;
    if(start>index)parts.push({type:"text",value:text.slice(index,start)});
    const math=match[0].trimEnd();
    parts.push({type:"math",value:math,display:false});
    if(match[0].length>math.length)parts.push({type:"text",value:match[0].slice(math.length)});
    index=start+match[0].length;
  }
  if(index<text.length)parts.push({type:"text",value:text.slice(index)});
  return parts;
}
export function stripMathDelimiters(value){
  const source=String(value??"").trim();
  for(const item of delimiters){
    if(source.startsWith(item.open)&&source.endsWith(item.close)&&source.length>item.open.length+item.close.length){
      return source.slice(item.open.length,-item.close.length).trim();
    }
  }
  return source;
}
export function splitMathText(value){
  const text=String(value??"");
  const parts=[];let cursor=0;
  while(cursor<text.length){
    let found=null;
    for(const item of delimiters){
      let index=text.indexOf(item.open,cursor);
      if(item.open==="$"){
        while(index>=0&&index>0&&text[index-1]==="\\")index=text.indexOf(item.open,index+1);
      }
      if(index>=0&&(!found||index<found.index||(index===found.index&&item.open.length>found.open.length)))found={...item,index};
    }
    if(!found){parts.push(...plainParts(text.slice(cursor)));break;}
    if(found.index>cursor)parts.push(...plainParts(text.slice(cursor,found.index)));
    const end=text.indexOf(found.close,found.index+found.open.length);
    if(end<0){parts.push(...plainParts(text.slice(found.index)));break;}
    const formula=text.slice(found.index+found.open.length,end).trim();
    if(formula)parts.push({type:"math",value:formula,display:found.display});
    cursor=end+found.close.length;
  }
  return parts.length?parts:[{type:"text",value:text}];
}
