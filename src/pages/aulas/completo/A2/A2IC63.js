import createA2LessonScreen from "./A2LessonScreen";
import { Images } from "../../../../util/images";

const QUESTION_IMAGE = Images.ex10;
const USER_IMAGE = Images.ex16;

const LESSON_SLIDES = [
  {
    key: "a2ic63s1",
    component: "Exercise10",
    activity: {
      prompt: "Escolha a forma correta do passado regular.",
      title: "Challenge 3",
      userImage: USER_IMAGE,
      lockStorageKey: "@A2IC63_regular_past_test_lock",
      questions: [
        { image: QUESTION_IMAGE, question: "WORK", options: ["Worked", "Workked"], correctAnswer: "Worked" },
        { image: QUESTION_IMAGE, question: "DANCE", options: ["Danceed", "Danced"], correctAnswer: "Danced" },
        { image: QUESTION_IMAGE, question: "STUDY", options: ["Studied", "Studyed"], correctAnswer: "Studied" },
        { image: QUESTION_IMAGE, question: "STOP", options: ["Stoped", "Stopped"], correctAnswer: "Stopped" },
        { image: QUESTION_IMAGE, question: "WATCH", options: ["Watched", "Watcheded"], correctAnswer: "Watched" },
        { image: QUESTION_IMAGE, question: "LISTEN", options: ["Listenned", "Listened"], correctAnswer: "Listened" },
        { image: QUESTION_IMAGE, question: "PLAY", options: ["Played", "Plaied"], correctAnswer: "Played" },
        { image: QUESTION_IMAGE, question: "CLEAN", options: ["Cleanned", "Cleaned"], correctAnswer: "Cleaned" },
        { image: QUESTION_IMAGE, question: "COOK", options: ["Cooked", "Cookked"], correctAnswer: "Cooked" },
        { image: QUESTION_IMAGE, question: "KISS", options: ["Kissied", "Kissed"], correctAnswer: "Kissed" },
      ],
      successTitle: "Correto",
      successMessage: "Você acertou as formas regulares do passado.",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
