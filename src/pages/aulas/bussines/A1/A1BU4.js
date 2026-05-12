import { Exercise1 } from "../../../../exc/ex1";
import { Exercise2 } from "../../../../exc/ex2";
import { Exercise3 } from "../../../../exc/ex3";
import { Exercise8 } from "../../../../exc/ex8";
import { Exercise12 } from "../../../../exc/ex12";
import { Exercise14 } from "../../../../exc/ex14";
import { Exercise17 } from "../../../../exc/ex17";
import { Exercise18 } from "../../../../exc/ex18";
import { BUA1 } from "../../../../util/images";
import createBusinessLessonScreen from "./BusinessLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "meeting-update-intro",
    component: Exercise17,
    activity: {
      label: "Status Update!",
      content: [
        `Reuniões de equipe geralmente começam com todo mundo dando um "update" rápido do que estão fazendo. Vamos aprender a reportar seu progresso.

Dica de Nativo:
Nativos adoram usar o Present Continuous nas reuniões para dar foco no que está rolando agora. "I am working on a new project" soa muito mais dinâmico do que "I work on a new project".`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "working-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute a palavra e escolha a alternativa correta.",
      image: BUA1.A4S2,
      audioSource: require("../../../../../mp3/BU/A1/A4S2.mp3"),
      audioText: "Working",
      audioDurationMs: 1000,
      answerOptions: ["Working", "Walking"],
      correctOption: "Working",
      successTitle: "Correto",
      feedbackMessage: '"Working" significa trabalhando.',
    },
  },
  {
    key: "working-well-complete",
    component: Exercise2,
    activity: {
      prompt: "Complete o texto com as alternativas.",
      paragraphs: [
        [
          "Good morning, team. Today, I am ",
          { id: "blank-1", options: ["working", "work"], answer: "working" },
          " on the new report. It is going ",
          { id: "blank-2", options: ["well", "bad"], answer: "well" },
          ".",
        ],
      ],
      successTitle: "Correto",
      successMessage: 'Use "I am working on..." para status atual.',
    },
  },
  {
    key: "status-match",
    component: Exercise1,
    activity: {
      prompt: "Conecte o status ao seu significado.",
      pairs: [
        { en: "Finished", pt: "Terminado" },
        { en: "Working on", pt: "Trabalhando em" },
        { en: "Delayed", pt: "Atrasado" },
      ],
      successTitle: "Correto",
      successMessage: "Agora você entende status de reunião.",
    },
  },
  {
    key: "presentation-true-false",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e responda se a frase escrita é verdadeira ou falsa.",
      image: BUA1.A4S3,
      audioSource: require("../../../../../mp3/BU/A1/A4S5.mp3"),
      audioText: "I am working on the presentation right now.",
      audioDurationMs: 3200,
      statement: "The person is finished with the presentation.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage: 'A pessoa ainda está trabalhando: "I am working on...".',
    },
  },
  {
    key: "in-progress-done-tip",
    component: Exercise17,
    activity: {
      label: "In Progress vs. Done",
      content: [
        `Para ser rápido nas reuniões:

Use "It is in progress" ou "I am working on it" para coisas que você ainda está fazendo.

Use "It is done" ou "I finished" para coisas prontas.

Sem enrolação, os chefes gringos amam direto ao ponto.`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "done-image-choice",
    component: Exercise8,
    activity: {
      prompt: "Olhe para a imagem. Como dizemos que uma tarefa está terminada em inglês?",
      emoji: "✓",
      options: ["Done", "Working"],
      correctAnswer: "Done",
      successTitle: "Correto",
      successMessage: '"Done" significa concluído.',
    },
  },
  {
    key: "working-on-project",
    component: Exercise18,
    activity: {
      prompt: "As palavras estão bagunçadas. Digite a frase na ordem certa.",
      scrambledSentence: "project / am / I / on / the / working",
      correctAnswer: "I am working on the project",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "I am working on the project.",
    },
  },
  {
    key: "update-writing",
    component: Exercise12,
    activity: {
      prompt: "Writing",
      instruction:
        "Escreva uma frase curta (update) sobre algo que você está trabalhando no momento no seu emprego.",
      placeholder: "I am working on a report.",
      helperText: 'Comece com "I am working on...".',
      submitLabel: "Enviar",
      successTitle: "Correto",
      successMessage: "Seu update de reunião ficou pronto.",
    },
  },
  {
    key: "meeting-feedback",
    component: Exercise17,
    activity: {
      label: "Meeting Adjourned! (Reunião encerrada!)",
      content: [
        'Mandou bem! Você já sabe como atualizar sua equipe sem travar. O segredo é usar "I am working on..." e "It is done". Pratique isso na sua próxima Daily!',
      ],
      continueLabel: "Finalizar",
    },
  },
  {
    key: "lesson-finish",
    type: "finish",
  },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
