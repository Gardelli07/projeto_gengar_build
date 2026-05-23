import { Exercise1 } from "../../../../exc/ex1";
import { Exercise2 } from "../../../../exc/ex2";
import { Exercise5 } from "../../../../exc/ex5";
import { Exercise6 } from "../../../../exc/ex6";
import { Exercise7 } from "../../../../exc/ex7";
import { Exercise14 } from "../../../../exc/ex14";
import { Exercise16 } from "../../../../exc/ex16";
import { Exercise17 } from "../../../../exc/ex17";
import { BUA1, Images } from "../../../../util/images";
import createBusinessLessonScreen from "./BusinessLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "talk-structure-intro",
    component: Exercise17,
    activity: {
      label: "The Perfect Structure",
      content: [
        `Fazer uma apresentação em inglês pode dar um frio na barriga, mas o segredo é a estrutura! Hoje vamos aprender como organizar as suas ideias em Início, Meio e Fim.

Dica de Nativo:
Nativos adoram apresentações organizadas. Use: First, Then, Finally para guiar sua fala.`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "first-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: BUA1.A10S2,
      audioSource: require("../../../../../mp3/BU/A1/A10S2.mp3"),
      audioDurationMs: 800,
      answerOptions: ["First", "Fast"],
      correctOption: "First",
      successTitle: "Correto",
      feedbackMessage: '"First" significa primeiro.',
    },
  },
  {
    key: "structure-words-match",
    component: Exercise1,
    activity: {
      prompt: "Conecte as palavras com as traduções.",
      pairs: [
        { en: "First", pt: "Primeiro" },
        { en: "Then", pt: "Depois" },
        { en: "Finally", pt: "Finalmente" },
      ],
      successTitle: "Correto",
      successMessage: "Essas palavras organizam sua apresentação.",
    },
  },
  {
    key: "first-then-complete",
    component: Exercise2,
    activity: {
      prompt: "Complete o texto.",
      paragraphs: [
        [
          "Hello team. ",
          { id: "blank-1", options: ["First", "Finally"], answer: "First" },
          ", I will talk about the problem. ",
          { id: "blank-2", options: ["Then", "First"], answer: "Then" },
          ", I will show the solution.",
        ],
      ],
      successTitle: "Correto",
      successMessage: "First abre a sequência; then continua a ideia.",
    },
  },
  {
    key: "finally-complete",
    component: Exercise5,
    activity: {
      prompt: "Complete a frase.",
      image: BUA1.A10S2,
      sentenceStart: "",
      sentenceEnd: ", thank you for your time.",
      options: ["Finally", "Finish"],
      correctAnswer: "Finally",
      successTitle: "Correto",
      successMessage: "Finally é usado para introduzir a parte final.",
    },
  },
  {
    key: "today-talk-about-tip",
    component: Exercise17,
    activity: {
      label: "Today I will talk about...",
      content: [
        'Use: "Today, I will talk about..." para começar sua apresentação de forma profissional.',
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "presentation-dialogue-order",
    component: Exercise7,
    activity: {
      prompt: "Organize o diálogo.",
      options: [
        "Hello, good morning.",
        "Today, I will talk about our sales.",
        "First, the good news.",
        "Finally, our next steps.",
      ],
      correctOrder: [
        "Hello, good morning.",
        "Today, I will talk about our sales.",
        "First, the good news.",
        "Finally, our next steps.",
      ],
      successTitle: "Correto",
      successMessage: "A apresentação tem abertura, tema, início e fechamento.",
    },
  },
  {
    key: "will-talk-about-order",
    component: Exercise6,
    activity: {
      prompt: "Organize a frase.",
      words: ["talk", "I", "about", "will", "sales"],
      correctOrder: ["I", "will", "talk", "about", "sales"],
      successTitle: "Correto",
      successMessage: "I will talk about sales.",
    },
  },
  {
    key: "talk-about-sales-audio",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        'Grave um áudio dizendo: "Hello. Today, I will talk about sales."',
      helperText: "Hello. Today, I will talk about sales.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Hello. Today, I will talk about sales.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Sua abertura de apresentação foi gravada.",
    },
  },
  {
    key: "structure-feedback",
    component: Exercise17,
    activity: {
      label: "Great Start!",
      content: [
        "Excelente! Você já sabe estruturar apresentações com clareza. Continue usando First, Then e Finally.",
      ],
      continueLabel: "Finalizar",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
