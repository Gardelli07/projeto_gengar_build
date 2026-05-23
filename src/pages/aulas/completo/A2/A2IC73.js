import createA2LessonScreen from "./A2LessonScreen";
import { Images } from "../../../../util/images";

const QUESTION_IMAGE = Images.ex10;
const USER_IMAGE = Images.ex16;

const LESSON_SLIDES = [
  {
    key: "a2ic73s1",
    component: "Exercise10",
    activity: {
      prompt: "Escolha a pergunta correta no Past Continuous.",
      title: "Challenge 13",
      userImage: USER_IMAGE,
      lockStorageKey: "@A2IC73_past_continuous_questions_test_lock",
      questions: [
        { image: QUESTION_IMAGE, question: "YOU", options: ["Was you...?", "Were you...?"], correctAnswer: "Were you...?" },
        { image: QUESTION_IMAGE, question: "HE", options: ["Was he...?", "Were he...?"], correctAnswer: "Was he...?" },
        { image: QUESTION_IMAGE, question: "THEY", options: ["Was they...?", "Were they...?"], correctAnswer: "Were they...?" },
        { image: QUESTION_IMAGE, question: "I", options: ["Was I...?", "Were I...?"], correctAnswer: "Was I...?" },
        { image: QUESTION_IMAGE, question: "WE", options: ["Was we...?", "Were we...?"], correctAnswer: "Were we...?" },
        { image: QUESTION_IMAGE, question: "SHE", options: ["Was she...?", "Were she...?"], correctAnswer: "Was she...?" },
        { image: QUESTION_IMAGE, question: "IT", options: ["Was it...?", "Were it...?"], correctAnswer: "Was it...?" },
        { image: QUESTION_IMAGE, question: "DANCING", options: ["Was they dancing?", "Were they dancing?"], correctAnswer: "Were they dancing?" },
        { image: QUESTION_IMAGE, question: "SINGING", options: ["Was she singing?", "Were she singing?"], correctAnswer: "Was she singing?" },
        { image: QUESTION_IMAGE, question: "WORKING", options: ["Was we working?", "Were we working?"], correctAnswer: "Were we working?" },
      ],
      successTitle: "Correto",
      successMessage: "Você acertou as perguntas com was e were.",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
