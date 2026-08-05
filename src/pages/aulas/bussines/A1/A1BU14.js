import { BUA1, Images } from "../../../../util/images";
import createBusinessLessonScreen from "./BusinessLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "closing-intro",
    component: "Exercise17",
    activity: {
      label: "The Grand Finale!",
      content: [
        `O final da sua apresentação é o que as pessoas mais vão lembrar. Hoje você vai aprender a encerrar com impacto e profissionalismo.

Dica de Nativo:
Nunca termine com "That's it". Use sempre: "Thank you for your time."`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "time-finish-match",
    component: "Exercise15",
    activity: {
      prompt: "Clique na imagem correta.",
      images: [
        { id: "time-img", image: BUA1.A14S2p1 },
        { id: "finish-img", image: BUA1.A14S2p2 },
      ],
      words: [
        { id: "time-word", label: "Time" },
        { id: "finish-word", label: "Finish" },
      ],
      pairs: [
        { imageId: "time-img", wordId: "time-word" },
        { imageId: "finish-img", wordId: "finish-word" },
      ],
      successTitle: "Correto",
      successMessage: "Time é tempo; finish é terminar.",
    },
  },
  {
    key: "closing-match",
    component: "Exercise1",
    activity: {
      prompt: "Conecte as palavras.",
      pairs: [
        { en: "To finish", pt: "Para terminar" },
        { en: "Thank you", pt: "Obrigado" },
        { en: "Your time", pt: "Seu tempo" },
      ],
      successTitle: "Correto",
      successMessage: "Expressões úteis para fechar apresentações.",
    },
  },
  {
    key: "finish-time-complete",
    component: "Exercise2",
    activity: {
      prompt: "Complete o texto.",
      paragraphs: [
        [
          "To ",
          { id: "blank-1", options: ["finish", "time"], answer: "finish" },
          ", the numbers are good. Thank you for your ",
          { id: "blank-2", options: ["time", "finish"], answer: "time" },
          ".",
        ],
      ],
      successTitle: "Correto",
      successMessage: "To finish... Thank you for your time.",
    },
  },
  {
    key: "thank-you-for-time",
    component: "Exercise5",
    activity: {
      prompt: "Complete a frase.",
      sentenceStart: "Thank you",
      sentenceEnd: "your time.",
      options: ["for", "to"],
      correctAnswer: "for",
      successTitle: "Correto",
      successMessage: "Thank you for your time.",
    },
  },
  {
    key: "professional-expression-tip",
    component: "Exercise17",
    activity: {
      label: "Expressão profissional",
      content: [
        'Use sempre: "Thank you for your time"\n\nÉ a forma mais profissional de encerrar apresentações.',
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "finish-good-news-true-false",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Verdadeiro ou falso?",
      image: BUA1.A14S7,
      audioSource: require("../../../../../mp3/BU/A1/A14S7.mp3"),
      audioDurationMs: 4000,
      statement: "The presentation ends with bad news.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage: "A apresentação termina com uma boa notícia.",
    },
  },
  {
    key: "thank-you-order",
    component: "Exercise6",
    activity: {
      prompt: "Organize a frase.",
      words: ["for", "Thank", "you", "time", "your"],
      correctOrder: ["Thank", "you", "for", "your", "time"],
      successTitle: "Correto",
      successMessage: "Thank you for your time.",
    },
  },
  {
    key: "closing-audio",
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction: "Grave um áudio encerrando sua apresentação.",
      helperText: "To finish, thank you for your time.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "To finish, thank you for your time.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Seu encerramento foi gravado.",
    },
  },
  {
    key: "closing-feedback",
    component: "Exercise17",
    activity: {
      label: "Standing Ovation!",
      content: [
        "Sensacional! Você agora sabe começar, desenvolver e encerrar apresentações como um profissional.",
      ],
      continueLabel: "Finalizar",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
