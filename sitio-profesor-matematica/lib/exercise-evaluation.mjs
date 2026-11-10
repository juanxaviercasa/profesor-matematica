/**
 * Califica solo respuestas con una clave explícita y una alternativa existente.
 * Nunca se supone que la respuesta sea "a" cuando falta la clave.
 *
 * @typedef {{ answerKey?: string, options?: string[] }} ExerciseWithAnswer
 * @typedef {{ tab: string, ex: ExerciseWithAnswer, idx: number }} IndexedExercise
 */

/**
 * Determina la letra real de una opción a partir del contenido extraído.
 * Los libros pueden presentar alternativas en orden A, C, E, B, D.
 * No se asigna una letra por índice si hay etiquetas incompletas o duplicadas.
 * @param {ExerciseWithAnswer} exercise
 * @param {number} index
 * @returns {string | null}
 */
export function getExerciseOptionLetter(exercise, index) {
  const options = exercise.options;
  if (!Array.isArray(options) || !Number.isInteger(index) || index < 0 || index >= options.length) return null;
  const letters = options.map(option =>
    typeof option === "string" ? option.match(/^\s*([a-e])[.)]\s*/i)?.[1]?.toLowerCase() || null : null
  );
  if (letters.every(Boolean)) {
    if (new Set(letters).size !== letters.length) return null;
    return letters[index];
  }
  // Si alguna opción tiene letra y otra no, la correspondencia es ambigua.
  if (letters.some(Boolean)) return null;
  return "abcde"[index] || null;
}

/** @param {ExerciseWithAnswer} exercise
 *  @returns {string | null}
 */
export function getVerifiedAnswerKey(exercise) {
  if (!Array.isArray(exercise.options) || exercise.options.length < 2) return null;
  const raw = typeof exercise.answerKey === "string" ? exercise.answerKey.trim() : "";
  const match = raw.match(/^([a-e])[\).]?$/i);
  if (!match) return null;
  const key = match[1].toLowerCase();
  // Validar contra las letras que realmente ve el estudiante, no el índice.
  const labels = exercise.options.map((_, idx) => getExerciseOptionLetter(exercise, idx));
  return labels.includes(key) ? key : null;
}

/**
 * @param {IndexedExercise[]} exercises
 * @param {Record<string,number>} selectedOptions
 */
export function scoreExerciseAnswers(exercises, selectedOptions) {
  let answeredCount = 0, gradedCount = 0, correctCount = 0, ungradedCount = 0;
  for (const { tab, ex, idx } of exercises) {
    const key = `${tab}-${ex.number}-${idx}`;
    const chosen = selectedOptions[key];
    if (!Number.isInteger(chosen) || chosen < 0 || !Array.isArray(ex.options) || chosen >= ex.options.length) continue;
    answeredCount++;
    const answer = getVerifiedAnswerKey(ex);
    if (answer === null) {
      ungradedCount++;
      continue;
    }
    gradedCount++;
    if (getExerciseOptionLetter(ex, chosen) === answer) correctCount++;
  }
  return {
    answeredCount,
    gradedCount,
    correctCount,
    ungradedCount,
    accuracy: gradedCount ? Math.round(correctCount / gradedCount * 100) : null
  };
}
