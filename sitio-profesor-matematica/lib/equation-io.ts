/**
 * Equation.io: enlace oficial de estado gráfico, sin SDK ni clave.
 * El formato # evita incluir la ecuación en la ruta solicitada al servidor.
 * Referencia: https://equation.io/llms.txt
 */
export function equationIoGraphUrl(equations: readonly string[]): string {
  if(!equations.length || equations.some(eq=>!eq.trim() || /[\r\n;]/.test(eq))){
    throw new Error("Equation.io requiere expresiones válidas, no vacías y sin separadores de filas");
  }
  const encode=(eq:string)=>encodeURIComponent(eq.trim()).replace(/[!'()*]/g,
    character=>"%"+character.charCodeAt(0).toString(16).toUpperCase());
  return "https://equation.io/#"+equations.map(encode).join(";");
}
