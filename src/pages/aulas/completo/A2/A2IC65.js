import createA2LessonScreen from "./A2LessonScreen";
import { Images } from "../../../../util/images";

const QUESTION_IMAGE = Images.ex10;
const USER_IMAGE = Images.ex16;

const LESSON_SLIDES = [
  {
    key: "a2ic65s1",
    component: "Exercise10",
    activity: {
      prompt: "Escolha o passado irregular correto.",
      title: "Challenge 5",
      userImage: USER_IMAGE,
      lockStorageKey: "@A2IC65_irregular_past_test_lock",
      questions: [
        { image: QUESTION_IMAGE, question: "GO", options: ["Went", "Goed"], correctAnswer: "Went" },
        { image: QUESTION_IMAGE, question: "HAVE", options: ["Haved", "Had"], correctAnswer: "Had" },
        { image: QUESTION_IMAGE, question: "BUY", options: ["Bought", "Buyed"], correctAnswer: "Bought" },
        { image: QUESTION_IMAGE, question: "TAKE", options: ["Taked", "Took"], correctAnswer: "Took" },
        { image: QUESTION_IMAGE, question: "DO", options: ["Did", "Dided"], correctAnswer: "Did" },
        { image: QUESTION_IMAGE, question: "SEE", options: ["Seed", "Saw"], correctAnswer: "Saw" },
        { image: QUESTION_IMAGE, question: "EAT", options: ["Ate", "Eated"], correctAnswer: "Ate" },
        { image: QUESTION_IMAGE, question: "DRINK", options: ["Drinked", "Drank"], correctAnswer: "Drank" },
        { image: QUESTION_IMAGE, question: "SLEEP", options: ["Slept", "Sleeped"], correctAnswer: "Slept" },
        { image: QUESTION_IMAGE, question: "WRITE", options: ["Writed", "Wrote"], correctAnswer: "Wrote" },
      ],
      successTitle: "Correto",
      successMessage: "Você acertou os verbos irregulares.",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
