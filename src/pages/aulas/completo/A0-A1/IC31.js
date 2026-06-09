import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise10",
    activity: {
      prompt: "Responda às questões",
      title: "Revisão Geral",
      userImage: Images.ex16,
      lockStorageKey: "@ic31_exercise10_lock_until",
      questions: [
        {
          image: Images.ex10,
          question: 'Como se diz o símbolo "@" num e-mail?',
          options: ["At", "Dot"],
          correctAnswer: "At",
        },
        {
          image: Images.ex10,
          question: 'Qual letra tem o som de "djii" (Time do EE)?',
          options: ["G", "J"],
          correctAnswer: "G",
        },
        {
          image: Images.ex10,
          question: '"Como você soletra isso?" em inglês é:',
          options: ["How do you spell that?", "What is your name?"],
          correctAnswer: "How do you spell that?",
        },
        {
          image: Images.ex10,
          question: 'Qual vogal tem o som de "ái" (dor)?',
          options: ["E", "I"],
          correctAnswer: "I",
        },
        {
          image: Images.ex10,
          question: 'Como se diz o símbolo "." num site (URL)?',
          options: ["Point", "Dot"],
          correctAnswer: "Dot",
        },
        {
          image: Images.ex10,
          question: 'Qual é o som correto da letra "H"?',
          options: ["Aitch", "Eight"],
          correctAnswer: "Aitch",
        },
        {
          image: Images.ex10,
          question: "Qual letra exige fechar os lábios no final?",
          options: ["M", "N"],
          correctAnswer: "M",
        },
        {
          image: Images.ex10,
          question: 'Como um britúnico diz a letra "Z"?',
          options: ["Zee", "Zed"],
          correctAnswer: "Zed",
        },
        {
          image: Images.ex10,
          question: 'Como se chama o símbolo "_" no e-mail?',
          options: ["Underscore", "Dash"],
          correctAnswer: "Underscore",
        },
        {
          image: Images.ex10,
          question: 'Qual letra tem o mesmo som de "Why?" (Por qu?)?',
          options: ["Y", "I"],
          correctAnswer: "Y",
        },
      ],
      successTitle: "Correto",
      successMessage: "Você acertou todas as 10 respostas da revisão geral.",
    },
  },
  {
    key: "lesson-finish",
    type: "finish",
  },
];

export default createLessonScreen(LESSON_SLIDES, {
  storageKey: "@progesso_ingles_completo_A0-A1",
  nextRouteName: "Inglescompleto",
  screenName: "InglesCompletoA0A1LessonScreen",
});
