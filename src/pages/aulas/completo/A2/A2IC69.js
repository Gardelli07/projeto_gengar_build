import createA2LessonScreen from "./A2LessonScreen";
import { Images } from "../../../../util/images";

const QUESTION_IMAGE = Images.ex10;
const USER_IMAGE = Images.ex16;

const LESSON_SLIDES = [
  {
    key: "a2ic69s1",
    component: "Exercise10",
    activity: {
      prompt: "Escolha a pergunta correta no passado.",
      title: "Challenge 9",
      userImage: USER_IMAGE,
      lockStorageKey: "@A2IC69_past_questions_test_lock",
      questions: [
        { image: QUESTION_IMAGE, question: "SEE", options: ["Did you see?", "Did you saw?"], correctAnswer: "Did you see?" },
        { image: QUESTION_IMAGE, question: "GO", options: ["Did you went?", "Did you go?"], correctAnswer: "Did you go?" },
        { image: QUESTION_IMAGE, question: "HAVE", options: ["Did you have?", "Did you had?"], correctAnswer: "Did you have?" },
        { image: QUESTION_IMAGE, question: "EAT", options: ["Did you ate?", "Did you eat?"], correctAnswer: "Did you eat?" },
        { image: QUESTION_IMAGE, question: "BUY", options: ["Did you buy?", "Did you bought?"], correctAnswer: "Did you buy?" },
        { image: QUESTION_IMAGE, question: "DO", options: ["Did you do?", "Did you did?"], correctAnswer: "Did you do?" },
        { image: QUESTION_IMAGE, question: "TAKE", options: ["Did you took?", "Did you take?"], correctAnswer: "Did you take?" },
        { image: QUESTION_IMAGE, question: "SAY", options: ["Did you say?", "Did you said?"], correctAnswer: "Did you say?" },
        { image: QUESTION_IMAGE, question: "KNOW", options: ["Did you knew?", "Did you know?"], correctAnswer: "Did you know?" },
        { image: QUESTION_IMAGE, question: "TELL", options: ["Did you tell?", "Did you told?"], correctAnswer: "Did you tell?" },
      ],
      successTitle: "Correto",
      successMessage: "Você acertou as perguntas com did + verbo no presente.",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
