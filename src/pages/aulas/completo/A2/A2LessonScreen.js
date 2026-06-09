import createLessonScreen from "../../LessonScreen";

export default function createA2LessonScreen(slides) {
  return createLessonScreen(slides, {
    storageKey: "@progesso_ingles_completo_A2",
    nextRouteName: "InglescompletoA2",
    screenName: "A2LessonScreen",
  });
}
