import createA2LessonScreen from "./A2LessonScreen";
import { Images } from "../../../../util/images";

const QUESTION_IMAGE = Images.ex10;
const USER_IMAGE = Images.ex16;

const LESSON_SLIDES = [
  {
    key: "a2ic68s1",
    component: "Exercise10",
    activity: {
      prompt: "Escolha a negativa correta no passado.",
      title: "Challenge 8",
      userImage: USER_IMAGE,
      lockStorageKey: "@A2IC68_past_negative_test_lock",
      questions: [
        { image: QUESTION_IMAGE, question: "GO", options: ["Didn't go", "Didn't went"], correctAnswer: "Didn't go" },
        { image: QUESTION_IMAGE, question: "SEE", options: ["Didn't saw", "Didn't see"], correctAnswer: "Didn't see" },
        { image: QUESTION_IMAGE, question: "HAVE", options: ["Didn't have", "Didn't had"], correctAnswer: "Didn't have" },
        { image: QUESTION_IMAGE, question: "WATCH", options: ["Didn't watched", "Didn't watch"], correctAnswer: "Didn't watch" },
        { image: QUESTION_IMAGE, question: "EAT", options: ["Didn't eat", "Didn't ate"], correctAnswer: "Didn't eat" },
        { image: QUESTION_IMAGE, question: "BUY", options: ["Didn't bought", "Didn't buy"], correctAnswer: "Didn't buy" },
        { image: QUESTION_IMAGE, question: "TAKE", options: ["Didn't take", "Didn't took"], correctAnswer: "Didn't take" },
        { image: QUESTION_IMAGE, question: "STUDY", options: ["Didn't studied", "Didn't study"], correctAnswer: "Didn't study" },
        { image: QUESTION_IMAGE, question: "DRINK", options: ["Didn't drink", "Didn't drank"], correctAnswer: "Didn't drink" },
        { image: QUESTION_IMAGE, question: "WORK", options: ["Didn't worked", "Didn't work"], correctAnswer: "Didn't work" },
      ],
      successTitle: "Correto",
      successMessage: "Você acertou a regra: didn't + verbo no presente.",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
