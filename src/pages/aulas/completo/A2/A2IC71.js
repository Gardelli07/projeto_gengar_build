import createA2LessonScreen from "./A2LessonScreen";
import { Images } from "../../../../util/images";

const QUESTION_IMAGE = Images.ex10;
const USER_IMAGE = Images.ex16;

const LESSON_SLIDES = [
  {
    key: "a2ic71s1",
    component: "Exercise10",
    activity: {
      prompt: "Escolha a forma correta com were + verbo-ing.",
      title: "Challenge 11",
      userImage: USER_IMAGE,
      lockStorageKey: "@A2IC71_were_ing_test_lock",
      questions: [
        { image: QUESTION_IMAGE, question: "THEY", options: ["were working", "was working"], correctAnswer: "were working" },
        { image: QUESTION_IMAGE, question: "WE", options: ["was eating", "were eating"], correctAnswer: "were eating" },
        { image: QUESTION_IMAGE, question: "YOU", options: ["were sleeping", "was sleeping"], correctAnswer: "were sleeping" },
        { image: QUESTION_IMAGE, question: "THEY", options: ["were running", "were run"], correctAnswer: "were running" },
        { image: QUESTION_IMAGE, question: "WE", options: ["were talking", "was talking"], correctAnswer: "were talking" },
        { image: QUESTION_IMAGE, question: "YOU", options: ["was driving", "were driving"], correctAnswer: "were driving" },
        { image: QUESTION_IMAGE, question: "THEY", options: ["were laughing", "was laughing"], correctAnswer: "were laughing" },
        { image: QUESTION_IMAGE, question: "WE", options: ["were cooking", "was cooking"], correctAnswer: "were cooking" },
        { image: QUESTION_IMAGE, question: "YOU", options: ["were reading", "were read"], correctAnswer: "were reading" },
        { image: QUESTION_IMAGE, question: "THEY", options: ["were singing", "was singing"], correctAnswer: "were singing" },
      ],
      successTitle: "Correto",
      successMessage: "Você acertou o uso de were com you, we e they.",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
