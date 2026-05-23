import createA2LessonScreen from "./A2LessonScreen";
import { Images } from "../../../../util/images";

const QUESTION_IMAGE = Images.ex10;
const USER_IMAGE = Images.ex16;

const LESSON_SLIDES = [
  {
    key: "a2ic64s1",
    component: "Exercise10",
    activity: {
      prompt: "Escolha a grafia correta do passado regular.",
      title: "Challenge 4",
      userImage: USER_IMAGE,
      lockStorageKey: "@A2IC64_spelling_ed_test_lock",
      questions: [
        { image: QUESTION_IMAGE, question: "PLAN", options: ["Planned", "Planed"], correctAnswer: "Planned" },
        { image: QUESTION_IMAGE, question: "NEED", options: ["Needded", "Needed"], correctAnswer: "Needed" },
        { image: QUESTION_IMAGE, question: "STOP", options: ["Stopped", "Stoped"], correctAnswer: "Stopped" },
        { image: QUESTION_IMAGE, question: "WANT", options: ["Wantted", "Wanted"], correctAnswer: "Wanted" },
        { image: QUESTION_IMAGE, question: "FIT", options: ["Fitted", "Fited"], correctAnswer: "Fitted" },
        { image: QUESTION_IMAGE, question: "WAIT", options: ["Waitted", "Waited"], correctAnswer: "Waited" },
        { image: QUESTION_IMAGE, question: "HOP", options: ["Hopped", "Hoped"], correctAnswer: "Hopped" },
        { image: QUESTION_IMAGE, question: "START", options: ["Startted", "Started"], correctAnswer: "Started" },
        { image: QUESTION_IMAGE, question: "VISIT", options: ["Visited", "Visitted"], correctAnswer: "Visited" },
        { image: QUESTION_IMAGE, question: "CHAT", options: ["Chated", "Chatted"], correctAnswer: "Chatted" },
      ],
      successTitle: "Correto",
      successMessage: "Você acertou as regras de escrita com -ed.",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
