export const LESSON_STREAK_MIN_ACCURACY = 90;

export function calculateLessonAccuracy(correctCount, totalAttempts) {
  if (!totalAttempts) return 0;
  return Math.round((correctCount / totalAttempts) * 100);
}
