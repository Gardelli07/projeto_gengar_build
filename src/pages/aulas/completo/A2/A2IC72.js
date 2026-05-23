import createA2LessonScreen from "./A2LessonScreen";
import { Images } from "../../../../util/images";

const QUESTION_IMAGE = Images.ex10;
const USER_IMAGE = Images.ex16;

const LESSON_SLIDES = [
  {
    key: "a2ic72s1",
    component: "Exercise10",
    activity: {
      prompt: "Escolha a forma negativa correta: wasn't ou weren't.",
      title: "Challenge 12",
      userImage: USER_IMAGE,
      lockStorageKey: "@A2IC72_wasnt_werent_test_lock",
      questions: [
        { image: QUESTION_IMAGE, question: "I", options: ["wasn't", "weren't"], correctAnswer: "wasn't" },
        { image: QUESTION_IMAGE, question: "THEY", options: ["wasn't", "weren't"], correctAnswer: "weren't" },
        { image: QUESTION_IMAGE, question: "HE", options: ["wasn't", "weren't"], correctAnswer: "wasn't" },
        { image: QUESTION_IMAGE, question: "WE", options: ["wasn't", "weren't"], correctAnswer: "weren't" },
        { image: QUESTION_IMAGE, question: "YOU", options: ["wasn't", "weren't"], correctAnswer: "weren't" },
        { image: QUESTION_IMAGE, question: "SHE", options: ["wasn't", "weren't"], correctAnswer: "wasn't" },
        { image: QUESTION_IMAGE, question: "IT", options: ["wasn't", "weren't"], correctAnswer: "wasn't" },
        { image: QUESTION_IMAGE, question: "YOU (plural)", options: ["wasn't", "weren't"], correctAnswer: "weren't" },
        { image: QUESTION_IMAGE, question: "MY FRIEND", options: ["wasn't", "weren't"], correctAnswer: "wasn't" },
        { image: QUESTION_IMAGE, question: "MY FRIENDS", options: ["wasn't", "weren't"], correctAnswer: "weren't" },
      ],
      successTitle: "Correto",
      successMessage: "Você acertou wasn't para singular e weren't para plural/you.",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
