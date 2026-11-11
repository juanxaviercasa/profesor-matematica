/**
 * Presentación móvil de fórmulas extensas: divide solo los espacios
 * \quad / \qquad de nivel superior, conservando contenido y MathML.
 */
export function prepareDisplayLatex(tex, minLength = 92) {
  if (typeof tex !== "string" || tex.length <= minLength ||
      /\\(?:begin|end|left|right|tag)\b/.test(tex)) return tex;
  const rows = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < tex.length; i++) {
    const char = tex[i];
    if (char === "\\") {
      const command = tex.slice(i + 1).match(/^[a-zA-Z]+/);
      if (command) {
        const name = command[0];
        if (depth === 0 && (name === "quad" || name === "qquad")) {
          const left = tex.slice(start, i).trim();
          if (!left) return tex;
          rows.push(left);
          start = i + name.length + 1;
        }
        i += name.length;
        continue;
      }
      i++;
      continue;
    }
    if (char === "{") depth++;
    else if (char === "}") {
      depth--;
      if (depth < 0) return tex;
    }
  }
  const final = tex.slice(start).trim();
  if (depth !== 0 || !final || rows.length === 0) return tex;
  rows.push(final);
  if (rows.some(row => row.length > 110)) return tex;
  return "\\begin{gathered}" + rows.join("\\\\[0.3em]") + "\\end{gathered}";
}
