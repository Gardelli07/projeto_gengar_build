import { Exercise1 } from "../../../../exc/ex1";
import { Exercise3 } from "../../../../exc/ex3";
import { Exercise4 } from "../../../../exc/ex4";
import { Exercise5 } from "../../../../exc/ex5";
import { Exercise12 } from "../../../../exc/ex12";
import { Exercise14 } from "../../../../exc/ex14";
import { Exercise15 } from "../../../../exc/ex15";
import { Exercise17 } from "../../../../exc/ex17";
import { BUA1 } from "../../../../util/images";
import createBusinessLessonScreen from "./BusinessLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "charts-intro",
    component: Exercise17,
    activity: {
      label: "Let's look at the numbers!",
      content: [
        `No mundo dos negócios, os números falam alto. Hoje você vai aprender o vocabulário básico para apresentar gráficos de forma simples e clara.

Dica de Nativo:
Não complique! Use "go up" (subir) e "go down" (descer). Até executivos usam isso.`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "go-up-down-match",
    component: Exercise15,
    activity: {
      prompt: "Clique na imagem correta.",
      images: [
        { id: "up-img", image: BUA1.A11S2p1 },
        { id: "down-img", image: BUA1.A11S2p2 },
      ],
      words: [
        { id: "up-word", label: "Go up" },
        { id: "down-word", label: "Go down" },
      ],
      pairs: [
        { imageId: "up-img", wordId: "up-word" },
        { imageId: "down-img", wordId: "down-word" },
      ],
      successTitle: "Correto",
      successMessage: "Go up é subir; go down é descer.",
    },
  },
  {
    key: "chart-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escolha a alternativa correta.",
      image: BUA1.A11S3,
      audioSource: require("../../../../../mp3/BU/A1/A11S3.mp3"),
      audioDurationMs: 900,
      answerOptions: ["Chart", "Start"],
      correctOption: "Chart",
      successTitle: "Correto",
      feedbackMessage: '"Chart" significa gráfico.',
    },
  },
  {
    key: "chart-vocab-match",
    component: Exercise1,
    activity: {
      prompt: "Conecte as palavras.",
      pairs: [
        { en: "Chart", pt: "Gráfico" },
        { en: "Go up", pt: "Subir" },
        { en: "Go down", pt: "Descer" },
      ],
      successTitle: "Correto",
      successMessage: "Vocabulário básico de gráficos dominado.",
    },
  },
  {
    key: "sales-go-up",
    component: Exercise5,
    activity: {
      prompt: "Complete a frase.",
      image: BUA1.A11S2p1,
      sentenceStart: "The sales go",
      sentenceEnd: "this month.",
      options: ["up", "open"],
      correctAnswer: "up",
      successTitle: "Correto",
      successMessage: "The sales go up this month.",
    },
  },
  {
    key: "look-at-tip",
    component: Exercise17,
    activity: {
      label: "Look at vs See",
      content: [
        'Use "Look at" para direcionar atenção.\n\n✔ Look at this chart\n❌ See this chart',
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "sales-down-true-false",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt: "Verdadeiro ou falso?",
      image: BUA1.A11S7,
      audioSource: require("../../../../../mp3/BU/A1/A11S7.mp3"),
      audioDurationMs: 3000,
      statement: "The sales go up.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage: "O áudio diz que as vendas descem.",
    },
  },
  {
    key: "look-at-correct",
    component: Exercise4,
    activity: {
      prompt: "Escolha a frase correta.",
      image: BUA1.A11S3,
      wrongSentence: "Chart attention",
      options: ["See this chart", "Look to this chart", "Look at this chart"],
      correctAnswer: "Look at this chart",
      successTitle: "Correto",
      successMessage: 'A expressão correta é "Look at this chart".',
    },
  },
  {
    key: "chart-writing",
    component: Exercise12,
    activity: {
      prompt: "Writing",
      instruction:
        "Escreva uma frase: peça para olhar o gráfico e diga que as vendas sobem.",
      placeholder: "Look at this chart. The sales go up.",
      helperText: 'Use "Look at this chart" e "go up".',
      submitLabel: "Enviar",
      successTitle: "Correto",
      successMessage: "Você descreveu um gráfico com clareza.",
    },
  },
  {
    key: "charts-feedback",
    component: Exercise17,
    activity: {
      label: "Numbers don't lie!",
      content: [
        "Excelente! Você já consegue apresentar gráficos com clareza e confiança.",
      ],
      continueLabel: "Finalizar",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
