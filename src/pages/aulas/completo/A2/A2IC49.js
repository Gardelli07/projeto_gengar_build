import createA2LessonScreen from "./A2LessonScreen";
import { ICA2 } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic49s1",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 6 • AULA 49",
      image: ICA2.A49S1,
      content: [
        "/blue{I have to work all day!}",
        "/blue{Regras São Regras!}",
        "Quando algo é obrigatório ou necessário, usamos have to.",
        "É como uma lei ou uma instrução que precisamos seguir.",
        "/blue{You have to work.}",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic49s2",
    component: "Exercise14",
    activity: {
      prompt: "Ouça e escolha a frase correta.",
      image: ICA2.A49S2,
      audioSource: require("../../../../../mp3/IC/A2/A49S2.mp3"),
      options: ["He has to study.", "He has study."],
      correctAnswer: "He has to study.",
      successMessage: "Com he, she e it, usamos has to.",
    },
  },
  {
    key: "a2ic49s3",
    component: "Exercise14",
    activity: {
      prompt: "Ouça a obrigação.",
      image: ICA2.A49S3,
      audioSource: require("../../../../../mp3/IC/A2/A49S3.mp3"),
      options: ["I have to clean the floor.", "I has to clean the floor."],
      correctAnswer: "I have to clean the floor.",
      successMessage: "Com I, usamos have to.",
    },
  },
  {
    key: "a2ic49s4",
    component: "Exercise13",
    activity: {
      prompt: "Escreva a expressão de obrigação:",
      audioSource: require("../../../../../mp3/IC/A2/A49S4.mp3"),
      letters: ["H", "A", "V", "E", "T", "O"],
      correctWord: "HAVETO",
      successMessage: "Have to indica obrigação.",
    },
  },
  {
    key: "a2ic49s5",
    component: "Exercise6",
    activity: {
      prompt: "Você tem que parar no sinal vermelho.",
      words: ["You", "have to", "stop", "at the red light", "."],
      correctOrder: ["You", "have to", "stop", "at the red light", "."],
      correctAnswer: "You have to stop at the red light.",
      successMessage: "Obrigação clara com have to.",
    },
  },
  {
    key: "a2ic49s6",
    component: "Exercise5",
    activity: {
      prompt: "Complete com a forma correta de have to:",
      sentenceStart: "She",
      sentenceEnd: "wash her hands before dinner.",
      options: ["has to", "have to"],
      correctAnswer: "has to",
      successMessage: "She has to wash her hands before dinner.",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
