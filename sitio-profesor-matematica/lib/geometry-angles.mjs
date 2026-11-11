/** Clases de ángulos en geometría euclidiana (0° ≤ θ ≤ 180°). */
export function classifyAngle(degrees){
  if(!Number.isFinite(degrees)||degrees<0||degrees>180)throw new RangeError("El ángulo debe estar entre 0° y 180°");
  if(degrees===0)return "nulo";
  if(degrees<90)return "agudo";
  if(degrees===90)return "recto";
  if(degrees<180)return "obtuso";
  return "llano";
}
export function anglePoint(degrees,radius=115,cx=210,cy=170){
  const rad=degrees*Math.PI/180;
  return {x:cx+radius*Math.cos(rad),y:cy-radius*Math.sin(rad)};
}
