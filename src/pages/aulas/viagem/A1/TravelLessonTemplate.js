import createLessonScreen from "../../LessonScreen";

export default function createTravelLessonScreen(slides) {
  return createLessonScreen(slides, {
    storageKey: "@curso_progress_travel_A1",
    nextRouteName: "TravelEnglish",
    screenName: "TravelA1LessonScreen",
  });
}
