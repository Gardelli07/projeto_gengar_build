import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise10",
    activity: {
      prompt: "Responda as questáes",
      title: "38 Challenge",
      userImage: Images.ex16,
      lockStorageKey: "@ic38_exercise10_lock_until",
      questions: [
        {
          image: Images.ex10,
          question: 'Como se pergunta "Quanto custaí"',
          options: ["How much is it?", "How many is it?"],
          correctAnswer: "How much is it?",
        },
        {
          image: Images.ex10,
          question: 'Qual a forma correta de dizer "Eu tenho 20 anos"?',
          options: ["I have 20 years.", "I am 20 years old."],
          correctAnswer: "I am 20 years old.",
        },
        {
          image: Images.ex10,
          question: 'áudio dita: "Thirteen". Qual o número?',
          options: ["13", "30"],
          correctAnswer: "13",
        },
        {
          image: Images.ex10,
          question: "Qual a escrita correta do número 3?",
          options: ["Tree", "Three"],
          correctAnswer: "Three",
        },
        {
          image: Images.ex10,
          question: "Como se diz o número 0 num telefone?",
          options: ["Oh", "Circle"],
          correctAnswer: "Oh",
        },
        {
          image: Images.ex10,
          question: "Qual destes é o número 12?",
          options: ["Eleven", "Twelve"],
          correctAnswer: "Twelve",
        },
        {
          image: Images.ex10,
          question: "Como ler o preço $4.50 de forma rápidaí",
          options: ["Four fifty", "Four and fifty"],
          correctAnswer: "Four fifty",
        },
        {
          image: Images.ex10,
          question: 'Como se escreve a moeda "$"?',
          options: ["Dollar", "Cent"],
          correctAnswer: "Dollar",
        },
        {
          image: Images.ex10,
          question: 'O que significa "Double seven" no telefone?',
          options: ["14", "77"],
          correctAnswer: "77",
        },
        {
          image: Images.ex10,
          question: "Monte a pergunta de idade:",
          options: ["How are you old?", "How old are you?"],
          correctAnswer: "How old are you?",
        },
      ],
      successTitle: "Correto",
      successMessage: "Você acertou todas as 10 respostas do desafio 38.",
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
