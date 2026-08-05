import { BUA1, Images } from "../../../../util/images";
import createBusinessLessonScreen from "./BusinessLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "making-offers-intro",
    component: "Exercise17",
    activity: {
      label: "Let's make a deal!",
      content: [
        `Bem-vindo ao Módulo de Negociações! O primeiro passo de qualquer acordo é saber colocar a sua oferta na mesa com clareza. Hoje aprenderemos o vocabulário básico para oferecer um negócio.

Dica de Nativo:
No mundo dos negócios, nativos raramente dizem "I give you a price". O mais profissional é usar "offer". Exemplo: "We can offer..."`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "offer-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute a palavra e escolha a alternativa correta.",
      image: BUA1.A15S2,
      audioSource: require("../../../../../mp3/BU/A1/A15S2.mp3"),
      audioDurationMs: 900,
      answerOptions: ["Offer", "Open"],
      correctOption: "Offer",
      successTitle: "Correto",
      feedbackMessage: '"Offer" significa oferecer.',
    },
  },
  {
    key: "price-deal-match",
    component: "Exercise15",
    activity: {
      prompt: "Clique na imagem e na palavra que a descreve.",
      images: [
        { id: "price-img", image: BUA1.A15S3p1 },
        { id: "deal-img", image: BUA1.A15S3p2 },
      ],
      words: [
        { id: "price-word", label: "Price" },
        { id: "deal-word", label: "Deal" },
      ],
      pairs: [
        { imageId: "price-img", wordId: "price-word" },
        { imageId: "deal-img", wordId: "deal-word" },
      ],
      successTitle: "Correto",
      successMessage: "Price é preço; deal é acordo.",
    },
  },
  {
    key: "offer-vocab-match",
    component: "Exercise1",
    activity: {
      prompt: "Conecte as palavras com suas traduções.",
      pairs: [
        { en: "Offer", pt: "Oferecer" },
        { en: "Price", pt: "Preço" },
        { en: "Good", pt: "Bom" },
      ],
      successTitle: "Correto",
      successMessage: "Você já conhece o vocabulário inicial da negociação.",
    },
  },
  {
    key: "offer-price-complete",
    component: "Exercise5",
    activity: {
      prompt: "Complete a frase.",
      sentenceStart: "We can",
      sentenceEnd: "a good price.",
      options: ["offer", "office"],
      correctAnswer: "offer",
      successTitle: "Correto",
      successMessage: "We can offer a good price.",
    },
  },
  {
    key: "we-vs-i-tip",
    component: "Exercise17",
    activity: {
      label: "We vs. I",
      content: [
        'Use "We" em negociações. Exemplo:\n\n"We can offer..." soa mais profissional que "I can offer".',
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "offer-true-false",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Verdadeiro ou falso?",
      image: BUA1.A15S7,
      audioSource: require("../../../../../mp3/BU/A1/A15S7.mp3"),
      audioDurationMs: 2200,
      statement: "The person is offering a bad price.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage: "O áudio diz que a pessoa pode oferecer um bom preço.",
    },
  },
  {
    key: "offer-good-price-order",
    component: "Exercise6",
    activity: {
      prompt: "Organize a frase.",
      words: ["offer", "can", "We", "price", "a", "good"],
      correctOrder: ["We", "can", "offer", "a", "good", "price"],
      successTitle: "Correto",
      successMessage: "We can offer a good price.",
    },
  },
  {
    key: "offer-audio-practice",
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction: 'Grave um áudio dizendo: "We can offer a good price."',
      helperText: "We can offer a good price.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "We can offer a good price.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Sua oferta foi gravada.",
    },
  },
  {
    key: "making-offers-feedback",
    component: "Exercise17",
    activity: {
      label: "Good Offer!",
      content: [
        "Excelente! Você já sabe iniciar uma negociação de forma profissional.",
      ],
      continueLabel: "Finalizar",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
