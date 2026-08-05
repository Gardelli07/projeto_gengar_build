import { BUA1 } from "../../../../util/images";
import createBusinessLessonScreen from "./BusinessLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "counter-offers-intro",
    component: "Exercise17",
    activity: {
      label: "How about this?",
      content: [
        `Nem toda primeira oferta é aceita. Hoje você vai aprender a fazer contrapropostas de forma educada e profissional.

Dica de Nativo:
Em negociações, ao invés de dizer "expensive", nativos preferem algo mais diplomático: "too high".`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "high-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: BUA1.A16S2,
      audioSource: require("../../../../../mp3/BU/A1/A16S2.mp3"),
      audioDurationMs: 800,
      answerOptions: ["High", "Hello"],
      correctOption: "High",
      successTitle: "Correto",
      feedbackMessage: '"High" significa alto.',
    },
  },
  {
    key: "counter-offer-vocab",
    component: "Exercise1",
    activity: {
      prompt: "Conecte as palavras com suas traduções.",
      pairs: [
        { en: "High", pt: "Alto" },
        { en: "Low", pt: "Baixo" },
        { en: "Expensive", pt: "Caro" },
      ],
      successTitle: "Correto",
      successMessage: "Você já entende o vocabulário de preço.",
    },
  },
  {
    key: "too-high-how-about",
    component: "Exercise2",
    activity: {
      prompt: "Complete a frase.",
      paragraphs: [
        [
          "The price is too ",
          { id: "blank-1", options: ["high", "low"], answer: "high" },
          ". ",
          { id: "blank-2", options: ["How", "Who"], answer: "How" },
          " about fifty dollars?",
        ],
      ],
      successTitle: "Correto",
      successMessage:
        "Too high indica que o preço está alto; How about sugere uma alternativa.",
    },
  },
  {
    key: "price-too-high",
    component: "Exercise5",
    activity: {
      prompt: "Complete a frase.",
      sentenceStart: "That price is too",
      sentenceEnd: ".",
      options: ["high", "happy"],
      correctAnswer: "high",
      successTitle: "Correto",
      successMessage: "That price is too high.",
    },
  },
  {
    key: "how-about-tip",
    component: "Exercise17",
    activity: {
      label: "How about...?",
      content: [
        'Para sugerir algo educadamente, use:\n\n"How about...?" (Que tal...?)\n\nExemplo: "How about 50 dollars?"',
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "how-about-correct",
    component: "Exercise4",
    activity: {
      prompt: "Escolha a forma mais educada.",
      image: BUA1.A16S7,
      wrongSentence: "Counter-offer",
      options: [
        "I want fifty dollars.",
        "Give me fifty dollars.",
        "How about fifty dollars?",
      ],
      correctAnswer: "How about fifty dollars?",
      successTitle: "Correto",
      successMessage: '"How about..." soa educado e profissional.',
    },
  },
  {
    key: "how-about-fifty-order",
    component: "Exercise18",
    activity: {
      prompt: "Organize a frase.",
      scrambledSentence: "about / How / dollars / fifty / ?",
      correctAnswer: "How about fifty dollars?",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "How about fifty dollars?",
    },
  },
  {
    key: "counter-offer-writing",
    component: "Exercise12",
    activity: {
      prompt: "Writing",
      instruction: "Escreva: diga que o preço está alto e sugira outro.",
      placeholder: "The price is too high. How about one hundred dollars?",
      helperText: 'Use "too high" e "How about...?"',
      submitLabel: "Enviar",
      successTitle: "Correto",
      successMessage: "Sua contraproposta ficou clara e educada.",
    },
  },
  {
    key: "counter-offer-feedback",
    component: "Exercise17",
    activity: {
      label: "Counter-offer sent!",
      content: [
        "Perfeito! Você já sabe recusar e propor alternativas com educação.",
      ],
      continueLabel: "Finalizar",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
