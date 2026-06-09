import createLessonScreen from "../../LessonScreen";

export default function createBusinessLessonScreen(slides) {
  return createLessonScreen(slides, {
    storageKey: "@curso_progress_bussines_A1",
    nextRouteName: "Bussines",
    screenName: "BusinessA1LessonScreen",
  });
}
