/** Geometría del polígono regular a escala, compartida con sus pruebas. */
export function regularPolygonVertices(sides, radius){
  if(!Number.isInteger(sides)||sides<3||sides>12)throw new RangeError("Lados fuera de rango");
  if(!Number.isFinite(radius)||radius<1||radius>10)throw new RangeError("Radio fuera de rango");
  const cx=210,cy=135,r=radius*11;
  return Array.from({length:sides},(_,i)=>{
    const angle=i*2*Math.PI/sides-Math.PI/2;
    return {x:cx+r*Math.cos(angle),y:cy+r*Math.sin(angle)};
  });
}
export function polygonInteriorSum(sides){return 180*(sides-2);}
export function polygonDiagonalCount(sides){return sides*(sides-3)/2;}
