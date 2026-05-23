import createA2LessonScreen from "./A2LessonScreen";
import { Images } from "../../../../util/images";

const QUESTION_IMAGE = Images.ex10;
const USER_IMAGE = Images.ex16;

const LESSON_SLIDES = [
  {
    key: "a2ic61s1",
    component: "Exercise10",
    activity: {
      prompt:
        "Promova as frases de 5 segundos. Confirme se é plano futuro ou presente.",
      title: "Future or Present?",
      userImage: USER_IMAGE,
      lockStorageKey: "@A2IC61_future_present_test_lock",
      questions: [
        {
          image: QUESTION_IMAGE,
          question: "I am meeting her at 5 PM.",
          options: ["Future", "Present"],
          correctAnswer: "Future",
        },
        {
          image: QUESTION_IMAGE,
          question: "They are playing now.",
          options: ["Future", "Present"],
          correctAnswer: "Present",
        },
        {
          image: QUESTION_IMAGE,
          question: "She is leaving tomorrow.",
          options: ["Future", "Present"],
          correctAnswer: "Future",
        },
        {
          image: QUESTION_IMAGE,
          question: "We are having lunch at 1 PM.",
          options: ["Future", "Present"],
          correctAnswer: "Future",
        },
        {
          image: QUESTION_IMAGE,
          question: "Look! It's raining.",
          options: ["Future", "Present"],
          correctAnswer: "Present",
        },
        {
          image: QUESTION_IMAGE,
          question: "I'm working late tonight.",
          options: ["Future", "Present"],
          correctAnswer: "Future",
        },
        {
          image: QUESTION_IMAGE,
          question: "He's wearing a blue shirt.",
          options: ["Future", "Present"],
          correctAnswer: "Present",
        },
        {
          image: QUESTION_IMAGE,
          question: "Are you coming to the party?",
          options: ["Future", "Present"],
          correctAnswer: "Future",
        },
        {
          image: QUESTION_IMAGE,
          question: "I'm not doing anything Sunday.",
          options: ["Future", "Present"],
          correctAnswer: "Future",
        },
        {
          image: QUESTION_IMAGE,
          question: "Listen! She's singing.",
          options: ["Future", "Present"],
          correctAnswer: "Present",
        },
      ],
      successTitle: "Correto",
      successMessage:
        "Você classificou corretamente as 10 frases entre plano futuro e presente.",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
