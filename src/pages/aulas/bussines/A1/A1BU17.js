import { Exercise1 } from "../../../../exc/ex1";
import { Exercise5 } from "../../../../exc/ex5";
import { Exercise7 } from "../../../../exc/ex7";
import { Exercise8 } from "../../../../exc/ex8";
import { Exercise15 } from "../../../../exc/ex15";
import { Exercise16 } from "../../../../exc/ex16";
import { Exercise17 } from "../../../../exc/ex17";
import { Exercise19 } from "../../../../exc/ex19";
import { BUA1, Images } from "../../../../util/images";
import createBusinessLessonScreen from "./BusinessLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "agreements-intro",
    component: Exercise17,
    activity: {
      label: "We have a deal!",
      content: [
        `Chegou o momento mais importante da negociação: fechar o acordo! Hoje você vai aprender como aceitar propostas e finalizar negociações.

Dica de Nativo:
Em inglês, usamos muito a palavra "deal" no dia a dia corporativo. Em vez de "agreement", diga: "Deal!" ou "We have a deal!"`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "accept-deal-match",
    component: Exercise15,
    activity: {
      prompt: "Clique na imagem e na palavra correta.",
      images: [
        { id: "accept-img", image: BUA1.A17S2p1 },
        { id: "deal-img", image: BUA1.A17S2p2 },
      ],
      words: [
        { id: "accept-word", label: "Accept" },
        { id: "deal-word", label: "Deal" },
      ],
      pairs: [
        { imageId: "accept-img", wordId: "accept-word" },
        { imageId: "deal-img", wordId: "deal-word" },
      ],
      successTitle: "Correto",
      successMessage: "Accept é aceitar; deal é acordo.",
    },
  },
  {
    key: "deal-listen-write",
    component: Exercise19,
    needsSpeech: true,
    activity: {
      prompt: "Digite exatamente o que você ouviu.",
      audioSource: require("../../../../../mp3/BU/A1/A17S3.mp3"),
      audioDurationMs: 1700,
      correctAnswer: "We have a deal.",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "We have a deal.",
      errorMessage: 'Confira a frase: "We have a deal."',
    },
  },
  {
    key: "agreement-vocab",
    component: Exercise1,
    activity: {
      prompt: "Conecte as palavras com as traduções.",
      pairs: [
        { en: "Accept", pt: "Aceitar" },
        { en: "Deal", pt: "Acordo" },
        { en: "Great", pt: "Ótimo" },
      ],
      successTitle: "Correto",
      successMessage: "Vocabulário essencial para fechar acordos.",
    },
  },
  {
    key: "accept-offer-complete",
    component: Exercise5,
    activity: {
      prompt: "Complete a frase.",
      image: BUA1.A17S2p2,
      sentenceStart: "Great! I",
      sentenceEnd: "the offer.",
      options: ["accept", "about"],
      correctAnswer: "accept",
      successTitle: "Correto",
      successMessage: "Great! I accept the offer.",
    },
  },
  {
    key: "deal-tip",
    component: Exercise17,
    activity: {
      label: "Deal!",
      content: [
        'Para dizer "Fechado!", use apenas:\n\n"Deal!"\n\nExemplo:\nPessoa A: How about 80?\nPessoa B: Deal!',
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "deal-dialogue-order",
    component: Exercise7,
    activity: {
      prompt: "Organize o diálogo.",
      options: [
        "The price is 100 dollars.",
        "That is too high. How about 80?",
        "Okay, I accept.",
        "Great, we have a deal!",
      ],
      correctOrder: [
        "The price is 100 dollars.",
        "That is too high. How about 80?",
        "Okay, I accept.",
        "Great, we have a deal!",
      ],
      successTitle: "Correto",
      successMessage: "Você organizou uma negociação completa.",
    },
  },
  {
    key: "deal-image-choice",
    component: Exercise8,
    activity: {
      prompt: "Qual palavra descreve isso?",
      image: BUA1.A17S2p2,
      options: ["Deal", "Problem"],
      correctAnswer: "Deal",
      successTitle: "Correto",
      successMessage: "Um aperto de mão representa um deal.",
    },
  },
  {
    key: "accept-deal-audio",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction: 'Grave um áudio dizendo: "I accept. We have a deal."',
      helperText: "I accept. We have a deal.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "I accept. We have a deal.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você fechou o acordo em inglês.",
    },
  },
  {
    key: "agreements-feedback",
    component: Exercise17,
    activity: {
      label: "Deal closed!",
      content: [
        "Excelente! Você já consegue fechar negociações com confiança.",
      ],
      continueLabel: "Finalizar",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
