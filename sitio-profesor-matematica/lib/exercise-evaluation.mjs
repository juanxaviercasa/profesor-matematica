/**
 * Califica solo respuestas con una clave explícita y una alternativa existente.
 * Nunca se supone que la respuesta sea "a" cuando falta la clave.
 *
 * @typedef {{ answerKey?: string, options?: string[] }} ExerciseWithAnswer
 * @typedef {{ tab: string, ex: ExerciseWithAnswer, idx: number }} IndexedExercise
 */

/** @param {ExerciseWithAnswer} exercise
 *  @returns {string | null}
 */
export function getVerifiedAnswerKey(exercise) {
  if (!Array.isArray(exercise.options) || exercise.options.length < 2) return null;
  const raw = typeof exercise.answerKey === "string" ? exercise.answerKey.trim() : "";
  const match = raw.match(/^([a-e])[\).]?$/i);
  if (!match) return null;
  const key = match[1].toLowerCase();
  return "abcde".indexOf(key) < exercise.options.length ? key : null;
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
    if ("abcde"[chosen] === answer) correctCount++;
  }
  return {
    answeredCount,
    gradedCount,
    correctCount,
    ungradedCount,
    accuracy: gradedCount ? Math.round(correctCount / gradedCount * 100) : null
  };
}
