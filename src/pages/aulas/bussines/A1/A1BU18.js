import { Exercise1 } from "../../../../exc/ex1";
import { Exercise3 } from "../../../../exc/ex3";
import { Exercise5 } from "../../../../exc/ex5";
import { Exercise6 } from "../../../../exc/ex6";
import { Exercise12 } from "../../../../exc/ex12";
import { Exercise13 } from "../../../../exc/ex13";
import { Exercise14 } from "../../../../exc/ex14";
import { Exercise17 } from "../../../../exc/ex17";
import { BUA1 } from "../../../../util/images";
import createBusinessLessonScreen from "./BusinessLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "disagreements-intro",
    component: Exercise17,
    activity: {
      label: "Saying NO politely.",
      content: [
        `Nem toda negociação termina em acordo, e tudo bem. Hoje você vai aprender a discordar e rejeitar propostas de forma educada e profissional.

Dica de Nativo:
Nunca diga apenas "No" em negócios. Use sempre uma estrutura mais educada como: "I am sorry, but..."`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "cannot-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: BUA1.A18S2,
      audioSource: require("../../../../../mp3/BU/A1/A18S2.mp3"),
      audioDurationMs: 900,
      answerOptions: ["Cannot", "Can"],
      correctOption: "Cannot",
      successTitle: "Correto",
      feedbackMessage: '"Cannot" significa não poder.',
    },
  },
  {
    key: "polite-no-vocab",
    component: Exercise1,
    activity: {
      prompt: "Conecte as palavras com suas traduções.",
      pairs: [
        { en: "I am sorry", pt: "Me desculpe" },
        { en: "But", pt: "Mas" },
        { en: "Cannot", pt: "Não posso / não podemos" },
      ],
      successTitle: "Correto",
      successMessage: "Agora você tem a base para recusar com educação.",
    },
  },
  {
    key: "sorry-but-complete",
    component: Exercise5,
    activity: {
      prompt: "Complete a frase.",
      sentenceStart: "I am sorry,",
      sentenceEnd: "I cannot accept.",
      options: ["but", "and"],
      correctAnswer: "but",
      successTitle: "Correto",
      successMessage: "I am sorry, but I cannot accept.",
    },
  },
  {
    key: "spell-sorry",
    component: Exercise13,
    needsSpeech: true,
    activity: {
      prompt: "Organize a palavra.",
      audioText: "Sorry",
      audioDurationMs: 900,
      letters: ["S", "R", "O", "R", "Y"],
      correctWord: "SORRY",
      successTitle: "Correto",
      successMessage: "SORRY.",
    },
  },
  {
    key: "sorry-but-tip",
    component: Exercise17,
    activity: {
      label: "I am sorry, but...",
      content: [
        'Essa é a estrutura mais importante para recusar com educação:\n\n"I am sorry, but..."\n\nExemplo: "I am sorry, but we cannot accept the offer."',
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "cannot-accept-true-false",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt: "Verdadeiro ou falso?",
      image: BUA1.A18S7,
      audioSource: require("../../../../../mp3/BU/A1/A18S7.mp3"),
      audioDurationMs: 3300,
      statement: "The person accepts the offer.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage: "A pessoa recusou a oferta com educação.",
    },
  },
  {
    key: "cannot-accept-order",
    component: Exercise6,
    activity: {
      prompt: "Organize a frase.",
      words: ["cannot", "We", "accept", "offer", "the"],
      correctOrder: ["We", "cannot", "accept", "the", "offer"],
      successTitle: "Correto",
      successMessage: "We cannot accept the offer.",
    },
  },
  {
    key: "polite-refusal-writing",
    component: Exercise12,
    activity: {
      prompt: "Writing",
      instruction: "Escreva uma recusa educada.",
      placeholder: "I am sorry, but we cannot accept the offer.",
      helperText: 'Comece com "I am sorry, but..."',
      submitLabel: "Enviar",
      successTitle: "Correto",
      successMessage: "Sua recusa profissional ficou pronta.",
    },
  },
  {
    key: "disagreements-feedback",
    component: Exercise17,
    activity: {
      label: "Professional No!",
      content: [
        "Muito bem! Você já sabe dizer “não” de forma profissional e manter o relacionamento.",
      ],
      continueLabel: "Finalizar",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
