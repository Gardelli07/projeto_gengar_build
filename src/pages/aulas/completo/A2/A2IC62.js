import createA2LessonScreen from "./A2LessonScreen";
import { Images } from "../../../../util/images";

const QUESTION_IMAGE = Images.ex10;
const USER_IMAGE = Images.ex16;

const LESSON_SLIDES = [
  {
    key: "a2ic62s1",
    component: "Exercise10",
    activity: {
      prompt:
        "Promova as frases de 5 segundos. Escolha a forma correta em cada frase.",
      title: "Study or Am Studying?",
      userImage: USER_IMAGE,
      lockStorageKey: "@A2IC62_present_review_test_lock",
      questions: [
        {
          image: QUESTION_IMAGE,
          question: "I ____ (study) every night.",
          options: ["Study", "Am studying"],
          correctAnswer: "Study",
        },
        {
          image: QUESTION_IMAGE,
          question: "Wait! I ____ (study) now.",
          options: ["Study", "Am studying"],
          correctAnswer: "Am studying",
        },
        {
          image: QUESTION_IMAGE,
          question: "She ____ (not/like) apples.",
          options: ["Is not liking", "Doesn't like"],
          correctAnswer: "Doesn't like",
        },
        {
          image: QUESTION_IMAGE,
          question: "They ____ (play) soccer today.",
          options: ["Play", "Are playing"],
          correctAnswer: "Are playing",
        },
        {
          image: QUESTION_IMAGE,
          question: "Water ____ (boil) at 100°C.",
          options: ["Is boiling", "Boils"],
          correctAnswer: "Boils",
        },
        {
          image: QUESTION_IMAGE,
          question: "The water ____ (boil)! Turn it off!",
          options: ["Boils", "Is boiling"],
          correctAnswer: "Is boiling",
        },
        {
          image: QUESTION_IMAGE,
          question: "Do you ____ (smoke)?",
          options: ["Smoking", "Smoke"],
          correctAnswer: "Smoke",
        },
        {
          image: QUESTION_IMAGE,
          question: "Why are you ____ (cry)?",
          options: ["Cry", "Crying"],
          correctAnswer: "Crying",
        },
      ],
      successTitle: "Correto",
      successMessage:
        "Você acertou as formas corretas entre Present Simple e Present Continuous.",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
