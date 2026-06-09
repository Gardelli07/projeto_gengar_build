import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise10",
    activity: {
      prompt: "Responda as questáes",
      title: "43 Boss level",
      userImage: Images.ex16,
      lockStorageKey: "@ic43_exercise10_lock_until",
      questions: [
        {
          image: Images.ex10,
          question: 'Como você diz "Eu sou o Kaique" de forma curtaí',
          options: ["I have Kaique.", "I'm Kaique."],
          correctAnswer: "I'm Kaique.",
        },
        {
          image: Images.ex10,
          question: "Qual a pergunta correta para saber o nome de alguém?",
          options: ["What's your name?", "How is your name?"],
          correctAnswer: "What's your name?",
        },
        {
          image: Images.ex10,
          question: 'Se alguém diz "Nice to meet you", você responde:',
          options: ["Nice to meet you.", "Nice to meet you too."],
          correctAnswer: "Nice to meet you too.",
        },
        {
          image: Images.ex10,
          question: "Para apresentar um amigo ao seu lado, você diz:",
          options: ["This is my friend.", "He is my friend."],
          correctAnswer: "This is my friend.",
        },
        {
          image: Images.ex10,
          question: "Qual frase soa mais natural em uma apresentação?",
          options: ["Hello! I'm Leo.", "Hello! I call me Leo."],
          correctAnswer: "Hello! I'm Leo.",
        },
        {
          image: Images.ex10,
          question: '"What\'s" é a contração de quais palavras?',
          options: ["What has", "What is"],
          correctAnswer: "What is",
        },
        {
          image: Images.ex10,
          question: "Como você apresenta sua irm?, Sarahá",
          options: ["This is my sister, Sarah.", "Meet she, Sarah."],
          correctAnswer: "This is my sister, Sarah.",
        },
        {
          image: Images.ex10,
          question: 'Complete o diálogo: "Hi! I\'m Ana." -> "___"',
          options: ["Hi Ana! I'm Tom.", "Hi Ana! I have Tom."],
          correctAnswer: "Hi Ana! I'm Tom.",
        },
        {
          image: Images.ex10,
          question: 'Qual destas é uma "Mini Bio" de 1 frase corretaí',
          options: [
            "Hello! I'm Sam. Nice to meet you.",
            "Hi! Nice to meet you. I am.",
          ],
          correctAnswer: "Hello! I'm Sam. Nice to meet you.",
        },
        {
          image: Images.ex10,
          question: 'O que significa "Meet my..." ao apresentar alguém?',
          options: ["Olhe meu...", "Conheça meu..."],
          correctAnswer: "Conheça meu...",
        },
      ],
      successTitle: "Correto",
      successMessage: "Você acertou todas as 10 respostas da boss level 43.",
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
