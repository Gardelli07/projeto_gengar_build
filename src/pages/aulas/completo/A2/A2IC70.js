import createA2LessonScreen from "./A2LessonScreen";
import { Images } from "../../../../util/images";

const QUESTION_IMAGE = Images.ex10;
const USER_IMAGE = Images.ex16;

const LESSON_SLIDES = [
  {
    key: "a2ic70s1",
    component: "Exercise10",
    activity: {
      prompt: "Escolha a forma correta com was + verbo-ing.",
      title: "Challenge 10",
      userImage: USER_IMAGE,
      lockStorageKey: "@A2IC70_was_ing_test_lock",
      questions: [
        { image: QUESTION_IMAGE, question: "I", options: ["was playing", "was play"], correctAnswer: "was playing" },
        { image: QUESTION_IMAGE, question: "HE", options: ["was watch", "was watching"], correctAnswer: "was watching" },
        { image: QUESTION_IMAGE, question: "SHE", options: ["was dancing", "is dancing"], correctAnswer: "was dancing" },
        { image: QUESTION_IMAGE, question: "IT", options: ["was rain", "was raining"], correctAnswer: "was raining" },
        { image: QUESTION_IMAGE, question: "I", options: ["was eating", "was eat"], correctAnswer: "was eating" },
        { image: QUESTION_IMAGE, question: "HE", options: ["was drive", "was driving"], correctAnswer: "was driving" },
        { image: QUESTION_IMAGE, question: "SHE", options: ["was talking", "was talk"], correctAnswer: "was talking" },
        { image: QUESTION_IMAGE, question: "I", options: ["was cleaning", "was clean"], correctAnswer: "was cleaning" },
        { image: QUESTION_IMAGE, question: "HE", options: ["was run", "was running"], correctAnswer: "was running" },
        { image: QUESTION_IMAGE, question: "SHE", options: ["was singing", "were singing"], correctAnswer: "was singing" },
      ],
      successTitle: "Correto",
      successMessage: "Você acertou o uso de was com I, he, she e it.",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
