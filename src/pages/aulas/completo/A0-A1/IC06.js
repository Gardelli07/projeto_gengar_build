import createLessonScreen from "../../LessonScreen";
import { Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise10",
    activity: {
      prompt: "Responda as questáes",
      title: "Conversa",
      userImage: Images.ex16,
      lockStorageKey: "@ic01_exercise10_lock_until",
      questions: [
        {
          image: Images.ex10,
          question:
            "Qual é a saudação mais segura para uma entrevista de emprego?",
          options: ["Sup", "Hello"],
          correctAnswer: "Hello",
        },
        {
          image: Images.ex10,
          question: 'Como responder naturalmente a "What\'s up?"',
          options: ["Not much", "I am fine"],
          correctAnswer: "Not much",
        },
        {
          image: Images.ex10,
          question: 'Qual gíria é uma abreviaíão de "What\'s up"?',
          options: ["Howdy", "Sup"],
          correctAnswer: "Sup",
        },
        {
          image: Images.ex10,
          question: '"Hey there" é mais informal que "Hello"?',
          options: ["Sim", "Não"],
          correctAnswer: "Sim",
        },
        {
          image: Images.ex10,
          question: "O que dizer ao sair de um lugar e ver a pessoa amanhã",
          options: ["Howdy", "See you"],
          correctAnswer: "See you",
        },
        {
          image: Images.ex10,
          question: "No Texas, qual saudação é um clássico cultural?",
          options: ["Hey ya", "Howdy"],
          correctAnswer: "Howdy",
        },
        {
          image: Images.ex10,
          question: "Qual dessas é uma despedida super informal?",
          options: ["See ya", "Goodbye"],
          correctAnswer: "See ya",
        },
        {
          image: Images.ex10,
          question: "Posso usar 'Hey' com um desconhecido em tom formal?",
          options: ["Sim", "Não"],
          correctAnswer: "Não",
        },
        {
          image: Images.ex10,
          question: "Qual a forma correta de escrever a despedida?",
          options: ["Bye", "Buy"],
          correctAnswer: "Bye",
        },
        {
          image: Images.ex10,
          question: '"Good Night" serve para cumprimentar na chegada?',
          options: ["Verdadeiro", "Falso"],
          correctAnswer: "Falso",
        },
      ],
      successTitle: "Correto",
      successMessage: "Você acertou todas as 10 respostas da conversa.",
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
