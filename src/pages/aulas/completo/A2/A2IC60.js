import createA2LessonScreen from "./A2LessonScreen";
import { ICA2 } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "lesson-finish",
    type: "finish",
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
