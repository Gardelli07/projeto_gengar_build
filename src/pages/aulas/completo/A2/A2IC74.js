import createA2LessonScreen from "./A2LessonScreen";
import { Images } from "../../../../util/images";

const QUESTION_IMAGE = Images.ex10;
const USER_IMAGE = Images.ex16;

const LESSON_SLIDES = [
  {
    key: "a2ic74s1",
    component: "Exercise10",
    activity: {
      prompt: "Escolha a forma correta: afirmativa, negativa ou pergunta.",
      title: "Challenge 14",
      userImage: USER_IMAGE,
      lockStorageKey: "@A2IC74_past_continuous_combo_test_lock",
      questions: [
        { image: QUESTION_IMAGE, question: "(+)", options: ["She was running", "She were running"], correctAnswer: "She was running" },
        { image: QUESTION_IMAGE, question: "(-)", options: ["I wasn't eat", "I wasn't eating"], correctAnswer: "I wasn't eating" },
        { image: QUESTION_IMAGE, question: "(?)", options: ["Were you working?", "Was you working?"], correctAnswer: "Were you working?" },
        { image: QUESTION_IMAGE, question: "(+)", options: ["We was talking", "We were talking"], correctAnswer: "We were talking" },
        { image: QUESTION_IMAGE, question: "(-)", options: ["He wasn't sleeping", "He weren't sleeping"], correctAnswer: "He wasn't sleeping" },
        { image: QUESTION_IMAGE, question: "(?)", options: ["Was it rain?", "Was it raining?"], correctAnswer: "Was it raining?" },
        { image: QUESTION_IMAGE, question: "(+)", options: ["They were dancing", "They was dancing"], correctAnswer: "They were dancing" },
        { image: QUESTION_IMAGE, question: "(-)", options: ["We weren't watching", "We wasn't watching"], correctAnswer: "We weren't watching" },
        { image: QUESTION_IMAGE, question: "(?)", options: ["Was she calling?", "Were she calling?"], correctAnswer: "Was she calling?" },
        { image: QUESTION_IMAGE, question: "(+)", options: ["I was dreaming", "I were dreaming"], correctAnswer: "I was dreaming" },
      ],
      successTitle: "Correto",
      successMessage: "Você acertou o combo do Past Continuous.",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
