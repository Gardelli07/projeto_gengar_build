import createLessonScreen from "../../LessonScreen";
import { Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise10",
    activity: {
      prompt: "Responda as questáes",
      title: "Conversa Global",
      userImage: Images.ex16,
      lockStorageKey: "@ic22_exercise10_lock_until",
      questions: [
        {
          image: Images.ex10,
          question:
            "Você está na Austrália às 10h. Qual é a saudação mais icônicaí",
          options: ["G'day!", "Top o' the mornin'!"],
          correctAnswer: "G'day!",
        },
        {
          image: Images.ex10,
          question:
            'Em Londres, alguém te vê à noite e pergunta: "Alright?". O que isso significaí',
          options: ["Você está bem?", "Oi / Tudo certo?"],
          correctAnswer: "Oi / Tudo certo?",
        },
        {
          image: Images.ex10,
          question: 'Qual é o "atalho" informal para Good Morning nos EUA?',
          options: ["Morning!", "Good!"],
          correctAnswer: "Morning!",
        },
        {
          image: Images.ex10,
          question:
            "Você está na Irlanda e quer desejar uma Ótima manhá. O que diz?",
          options: ["G'day!", "Top o' the mornin'!"],
          correctAnswer: "Top o' the mornin'!",
        },
        {
          image: Images.ex10,
          question:
            "Saindo de uma loja em Nova York, qual é a despedida mais natural?",
          options: ["Good afternoon!", "Have a good one!"],
          correctAnswer: "Have a good one!",
        },
        {
          image: Images.ex10,
          question: 'Com um nativo diz "boa noite" de forma carinhosa (fofa)?',
          options: ["Nighty-night!", "Evening-evening!"],
          correctAnswer: "Nighty-night!",
        },
        {
          image: Images.ex10,
          question:
            "Você chega a um jantar às 20h. Qual a saudação de entradaí",
          options: ["Good night!", "Good evening!"],
          correctAnswer: "Good evening!",
        },
        {
          image: Images.ex10,
          question:
            'Qual dessas é uma gíria australiana para "Tenha um bom dia"?',
          options: ["Have a good one!", "Have a g'day!"],
          correctAnswer: "Have a g'day!",
        },
        {
          image: Images.ex10,
          question: 'Qual é o "atalho" para dizer Good Night de forma rápidaí',
          options: ["Nine!", "Night!"],
          correctAnswer: "Night!",
        },
        {
          image: Images.ex10,
          question:
            "Em Dublin, \"Top o' the mornin' to ya\" é um cumprimento de:",
          options: ["Chegada (Manhá)", "Despedida (Noite)"],
          correctAnswer: "Chegada (Manhá)",
        },
      ],
      successTitle: "Correto",
      successMessage: "Você acertou todas as 10 respostas da conversa global.",
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
