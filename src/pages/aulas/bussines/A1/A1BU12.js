import { Exercise1 } from "../../../../exc/ex1";
import { Exercise2 } from "../../../../exc/ex2";
import { Exercise5 } from "../../../../exc/ex5";
import { Exercise6 } from "../../../../exc/ex6";
import { Exercise7 } from "../../../../exc/ex7";
import { Exercise16 } from "../../../../exc/ex16";
import { Exercise17 } from "../../../../exc/ex17";
import { Exercise19 } from "../../../../exc/ex19";
import { Images } from "../../../../util/images";
import createBusinessLessonScreen from "./BusinessLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "qa-intro",
    component: Exercise17,
    activity: {
      label: "Any questions?",
      content: [
        `Chegou o momento da apresentação que muitos temem: perguntas e respostas. Mas calma — você vai aprender frases simples para lidar com isso com confiança.

Dica de Nativo:
Sempre compre tempo! Diga: "That is a good question." Isso soa educado e te dá alguns segundos para pensar.`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "any-questions-listen",
    component: Exercise19,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escreva exatamente o que você ouviu.",
      audioSource: require("../../../../../mp3/BU/A1/A12S2.mp3"),
      audioText: "Any questions?",
      audioDurationMs: 1400,
      correctAnswer: "Any questions?",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "Any questions?",
      errorMessage: 'Confira a pergunta: "Any questions?"',
    },
  },
  {
    key: "qa-match",
    component: Exercise1,
    activity: {
      prompt: "Conecte as palavras.",
      pairs: [
        { en: "Question", pt: "Pergunta" },
        { en: "Answer", pt: "Resposta" },
        { en: "Any questions?", pt: "Alguma pergunta?" },
      ],
      successTitle: "Correto",
      successMessage: "Vocabulário essencial de Q&A.",
    },
  },
  {
    key: "questions-complete",
    component: Exercise2,
    activity: {
      prompt: "Complete o texto.",
      paragraphs: [
        [
          "Do you have any ",
          { id: "blank-1", options: ["questions", "question"], answer: "questions" },
          "? Yes, that is a good ",
          { id: "blank-2", options: ["question", "questions"], answer: "question" },
          ".",
        ],
      ],
      successTitle: "Correto",
      successMessage: "Any questions usa plural; a good question usa singular.",
    },
  },
  {
    key: "good-question",
    component: Exercise5,
    activity: {
      prompt: "Complete a frase.",
      image: Images.ex16,
      sentenceStart: "That is a",
      sentenceEnd: "question.",
      options: ["good", "well"],
      correctAnswer: "good",
      successTitle: "Correto",
      successMessage: "That is a good question.",
    },
  },
  {
    key: "let-me-check-tip",
    component: Exercise17,
    activity: {
      label: "Let me check",
      content: ['Se você não souber a resposta, diga:\n\n"Let me check and get back to you."\n\nIsso é profissional e evita erros.'],
      continueLabel: "Continuar",
    },
  },
  {
    key: "qa-dialogue-order",
    component: Exercise7,
    activity: {
      prompt: "Organize o diálogo.",
      options: [
        "Thank you. Do you have any questions?",
        "Yes. What is the price?",
        "That is a good question.",
        "It is fifty dollars.",
      ],
      correctOrder: [
        "Thank you. Do you have any questions?",
        "Yes. What is the price?",
        "That is a good question.",
        "It is fifty dollars.",
      ],
      successTitle: "Correto",
      successMessage: "Você lidou com a pergunta de forma profissional.",
    },
  },
  {
    key: "good-question-order",
    component: Exercise6,
    activity: {
      prompt: "Organize a frase.",
      words: ["is", "a", "That", "question", "good"],
      correctOrder: ["That", "is", "a", "good", "question"],
      successTitle: "Correto",
      successMessage: "That is a good question.",
    },
  },
  {
    key: "qa-audio",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction: "Grave um áudio dizendo: Any questions? That is a good question.",
      helperText: "Any questions? That is a good question.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Any questions? That is a good question.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Seu Q&A foi gravado.",
    },
  },
  {
    key: "qa-feedback",
    component: Exercise17,
    activity: {
      label: "Great Answer!",
      content: ["Excelente! Agora você sabe lidar com perguntas com confiança e profissionalismo."],
      continueLabel: "Finalizar",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
