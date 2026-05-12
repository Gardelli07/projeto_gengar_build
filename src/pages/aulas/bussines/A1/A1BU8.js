import { Exercise5 } from "../../../../exc/ex5";
import { Exercise6 } from "../../../../exc/ex6";
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
    key: "problem-solving-intro",
    component: Exercise17,
    activity: {
      label: "Houston, we have a problem.",
      content: [
        `Problemas acontecem em qualquer empresa. O que importa é como você os comunica. Hoje vamos aprender o vocabulário para reportar problemas de forma clara e profissional.

Dica de Nativo:
Nativos evitam soar desesperados. Quando algo dá errado, eles dizem calmamente "We have an issue" ou o clássico "We have a problem". E logo em seguida já focam na solução: "fix" ou "solve".`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "problem-fix-match",
    component: Exercise15,
    activity: {
      prompt: "Clique na imagem e na palavra que a descreve.",
      images: [
        { id: "problem-img", image: BUA1.A8S2p1 },
        { id: "fix-img", image: BUA1.A8S2p2 },
      ],
      words: [
        { id: "problem-word", label: "Problem" },
        { id: "fix-word", label: "Fix" },
      ],
      pairs: [
        { imageId: "problem-img", wordId: "problem-word" },
        { imageId: "fix-img", wordId: "fix-word" },
      ],
      successTitle: "Correto",
      successMessage: "Problem é problema; fix é consertar.",
    },
  },
  {
    key: "problem-listen-write",
    component: Exercise19,
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio com atenção e digite exatamente o que você ouviu.",
      audioSource: require("../../../../../mp3/BU/A1/A8S3.mp3"),
      audioText: "We have a problem.",
      audioDurationMs: 1800,
      correctAnswer: "We have a problem.",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "We have a problem.",
      errorMessage: 'Confira a frase: "We have a problem."',
    },
  },
  {
    key: "problem-dialogue-order",
    component: Exercise7,
    activity: {
      prompt: "Coloque o diálogo na ordem correta clicando nas frases.",
      options: [
        "Hi Sarah, are you there?",
        "Yes, tell me.",
        "We have a problem with the system.",
        "Okay, I can fix it.",
      ],
      correctOrder: [
        "Hi Sarah, are you there?",
        "Yes, tell me.",
        "We have a problem with the system.",
        "Okay, I can fix it.",
      ],
      successTitle: "Correto",
      successMessage: "Você comunicou o problema e chegou à solução.",
    },
  },
  {
    key: "fix-problem-complete",
    component: Exercise5,
    activity: {
      prompt: "Complete a frase.",
      image: BUA1.A8S2p2,
      sentenceStart: "Don't worry, I can",
      sentenceEnd: "the problem.",
      options: ["fix", "break"],
      correctAnswer: "fix",
      successTitle: "Correto",
      successMessage: '"Fix the problem" é muito usado no trabalho.',
    },
  },
  {
    key: "fix-solve-tip",
    component: Exercise17,
    activity: {
      label: "Fix vs. Solve",
      content: [
        `Ambos significam resolver problemas, mas têm uma diferença importante:

Fix: usado para coisas físicas ou técnicas.
Ex: fix the computer, fix the internet.

Solve: usado para problemas mais abstratos.
Ex: solve a problem, solve a mystery.

No ambiente de trabalho do dia a dia, "fix" é o mais usado para situações rápidas!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "i-can-fix-it-order",
    component: Exercise6,
    activity: {
      prompt: "Clique nas palavras para escrever a frase na ordem correta.",
      words: ["fix", "I", "can", "it"],
      correctOrder: ["I", "can", "fix", "it"],
      successTitle: "Correto",
      successMessage: "I can fix it.",
    },
  },
  {
    key: "problem-image-choice",
    component: Exercise8,
    activity: {
      prompt: "Olhe para a imagem. O que nós temos aqui no contexto de negócios?",
      image: BUA1.A8S2p1,
      options: ["Problem", "Meeting"],
      correctAnswer: "Problem",
      successTitle: "Correto",
      successMessage: "A imagem mostra um problema técnico.",
    },
  },
  {
    key: "report-problem-audio",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction: "Hora da prática! Mande um áudio comunicando um problema para a sua equipe.",
      helperText: "We have a problem.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "We have a problem.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Seu áudio reportando um problema foi gravado.",
    },
  },
  {
    key: "problem-feedback",
    component: Exercise17,
    activity: {
      label: "Problem solved!",
      content: [
        "Muito bom! Agora você consegue reportar problemas com clareza e sem pânico. Lembre-se: comunicar bem é o primeiro passo para resolver qualquer situação!",
      ],
      continueLabel: "Finalizar",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
