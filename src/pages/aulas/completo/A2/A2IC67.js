import createA2LessonScreen from "./A2LessonScreen";
import { Images } from "../../../../util/images";

const QUESTION_IMAGE = Images.ex10;
const USER_IMAGE = Images.ex16;

const LESSON_SLIDES = [
  {
    key: "a2ic67s1",
    component: "Exercise10",
    activity: {
      prompt: "Escolha o passado correto: regular ou irregular.",
      title: "Challenge 7",
      userImage: USER_IMAGE,
      lockStorageKey: "@A2IC67_mixed_past_test_lock",
      questions: [
        { image: QUESTION_IMAGE, question: "PLAY", options: ["Played", "Playied"], correctAnswer: "Played" },
        { image: QUESTION_IMAGE, question: "GO", options: ["Goed", "Went"], correctAnswer: "Went" },
        { image: QUESTION_IMAGE, question: "COOK", options: ["Cooked", "Cookied"], correctAnswer: "Cooked" },
        { image: QUESTION_IMAGE, question: "SEE", options: ["Seed", "Saw"], correctAnswer: "Saw" },
        { image: QUESTION_IMAGE, question: "LISTEN", options: ["Listened", "Listeneded"], correctAnswer: "Listened" },
        { image: QUESTION_IMAGE, question: "GIVE", options: ["Gived", "Gave"], correctAnswer: "Gave" },
        { image: QUESTION_IMAGE, question: "STAY", options: ["Stayed", "Staied"], correctAnswer: "Stayed" },
        { image: QUESTION_IMAGE, question: "TAKE", options: ["Taked", "Took"], correctAnswer: "Took" },
        { image: QUESTION_IMAGE, question: "DANCE", options: ["Danced", "Danceed"], correctAnswer: "Danced" },
        { image: QUESTION_IMAGE, question: "BUY", options: ["Bought", "Buyed"], correctAnswer: "Bought" },
      ],
      successTitle: "Correto",
      successMessage: "Você acertou a mistura de regulares e irregulares.",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
