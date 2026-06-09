import createLessonScreen from "../../LessonScreen";

export default function createBusinessLessonScreen(slides) {
  return createLessonScreen(slides, {
    storageKey: "@curso_progress_bussines_B1",
    nextRouteName: "BussinesB1",
    screenName: "BusinessB1LessonScreen",
  });
}
