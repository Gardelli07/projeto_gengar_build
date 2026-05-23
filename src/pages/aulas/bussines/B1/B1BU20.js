import { Exercise1 } from "../../../../exc/ex1";
import { Exercise2 } from "../../../../exc/ex2";
import { Exercise3 } from "../../../../exc/ex3";
import { Exercise4 } from "../../../../exc/ex4";
import { Exercise5 } from "../../../../exc/ex5";
import { Exercise6 } from "../../../../exc/ex6";
import { Exercise13 } from "../../../../exc/ex13";
import { Exercise14 } from "../../../../exc/ex14";
import { Exercise16 } from "../../../../exc/ex16";
import { Exercise17 } from "../../../../exc/ex17";
import { BUB1, Images } from "../../../../util/images";
import createBusinessLessonScreen from "./BusinessLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "intro",
    component: Exercise17,
    activity: {
      label: "A Reunião deu Lucro? O ROI das Reuniões",
      content: [
        `Em níveis de alta gestão, tempo é literalmente dinheiro. Executivos avaliam o ROI (Return on Investment) de uma reunião. Para nativos, uma reunião de sucesso é "Outcome-driven" (focada em resultados). Se gerou decisões claras, foi "Highly productive" (altamente produtiva).`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "match",
    component: Exercise1,
    activity: {
      prompt:
        "Conecte os termos de performance de reuniões com suas traduções correspondentes.",
      pairs: [
        { en: "Outcome-driven", pt: "Focado em resultados" },
        { en: "Highly productive", pt: "Altamente produtiva" },
        {
          en: "ROI (Return on Investment)",
          pt: "Retorno sobre o investimento",
        },
      ],
      successTitle: "Correto",
      successMessage: "Esses termos avaliam eficiência de alta gestão.",
    },
  },
  {
    key: "correct",
    component: Exercise4,
    activity: {
      prompt:
        "Você quer elogiar a reunião porque ela foi focada em resultados. Qual frase está correta?",
      image: BUB1.A20S4,
      wrongSentence: "ROI",
      options: [
        "The meeting was outcome-driven and professional.",
        "The meeting was outcoming-driver and professional.",
        "The meeting was outcome-drove and professional.",
      ],
      correctAnswer: "The meeting was outcome-driven and professional.",
      successTitle: "Correto",
      successMessage: '"Outcome-driven" é focado em resultados.',
    },
  },
  {
    key: "improvement-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Ouça a palavra isolada e escolha a alternativa correta.",
      image: BUB1.A20S5,
      audioSource: require("../../../../../mp3/BU/B1/A20S5.mp3"),
      audioDurationMs: 1100,
      answerOptions: ["Improvement", "Important"],
      correctOption: "Improvement",
      successTitle: "Correto",
      feedbackMessage: "Improvement é melhoria.",
    },
  },
  {
    key: "debrief-tip",
    component: Exercise17,
    activity: {
      label: 'O "Debrief" e o Espaço para Melhora',
      content: [
        `Depois que a reunião acaba, líderes fazem um "Debrief" para discutir o que funcionou e o que não funcionou. Se algo não foi perfeito, em vez de dizer "It was bad", use: "There is room for improvement" (Há espaço para melhoria).`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "room-complete",
    component: Exercise5,
    activity: {
      prompt:
        "A reunião foi boa, mas demorou demais. Como sugerir melhora de forma elegante?",
      image: BUB1.A20S5,
      sentenceStart:
        "The discussion was good, but regarding the duration, there is",
      sentenceEnd: "for improvement.",
      options: ["room", "space"],
      correctAnswer: "room",
      successTitle: "Correto",
      successMessage: 'Para oportunidade de melhoria, usamos "room".',
    },
  },
  {
    key: "debrief-spell",
    component: Exercise13,
    needsSpeech: true,
    activity: {
      prompt:
        "Organize as letras para formar a palavra da reunião de balanço/análise.",
      audioText: "Debrief",
      audioDurationMs: 1000,
      letters: ["B", "E", "D", "R", "I", "E", "F"],
      correctWord: "DEBRIEF",
      successTitle: "Correto",
      successMessage: "DEBRIEF.",
    },
  },
  {
    key: "complete",
    component: Exercise2,
    activity: {
      prompt: "Leia o relatório do gerente e preencha as lacunas.",
      paragraphs: [
        [
          "Overall, our last session was highly ",
          {
            id: "b1",
            options: ["productive", "product"],
            answer: "productive",
          },
          ". It was clearly ",
          { id: "b2", options: ["outcome", "income"], answer: "outcome" },
          "-driven. However, during our ",
          { id: "b3", options: ["debrief", "brief"], answer: "debrief" },
          ", we noticed that there is still ",
          { id: "b4", options: ["room", "house"], answer: "room" },
          " for improvement regarding the agenda.",
        ],
      ],
      successTitle: "Correto",
      successMessage:
        "Você avaliou produtividade, outcome, debrief e melhoria.",
    },
  },
  {
    key: "audio",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt:
        "Escute o Diretor avaliando a reunião mensal. A afirmação é verdadeira ou falsa?",
      image: BUB1.A20S10,
      audioSource: require("../../../../../mp3/BU/B1/A20S10.mp3"),
      audioDurationMs: 7800,
      statement:
        "O Diretor acha que a reunião foi um desperdício de tempo e não teve resultados.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage: 'Ele disse que foi "outcome-driven" e teve "great ROI".',
    },
  },
  {
    key: "order",
    component: Exercise6,
    activity: {
      prompt:
        "Clique nas palavras na ordem correta para dar seu feedback final de alta gestão.",
      words: [
        "was",
        "meeting",
        "outcome-driven",
        "the",
        "highly",
        "and",
        "productive",
      ],
      correctOrder: [
        "the",
        "meeting",
        "was",
        "outcome-driven",
        "and",
        "highly",
        "productive",
      ],
      successTitle: "Correto",
      successMessage: "The meeting was outcome-driven and highly productive.",
    },
  },
  {
    key: "speaking",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        "Avalie a reunião: diga que foi outcome-driven, que houve bom ROI e que ainda há room for improvement.",
      helperText:
        "The meeting was outcome-driven. We had a good ROI. There is room for improvement.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "The meeting was outcome-driven. We had a good ROI. There is room for improvement.",
      recordLabel: "Gravar Áudio",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você avaliou a reunião como executivo.",
    },
  },
  {
    key: "feedback",
    component: Exercise17,
    activity: {
      label: "Master of Strategic Meetings!",
      content: [
        `Parabéns! Você concluiu o curso Advanced Business English: Strategic Meetings. Você começou aprendendo a abrir uma reunião com autoridade e terminou analisando o ROI e a eficiência estratégica dela. Agora possui vocabulário, diplomacia e firmeza para liderar equipes globais. Continue praticando esses "Action Items" e assuma o "Ownership" da sua carreira. See you in the next module!`,
      ],
      continueLabel: "Finalizar",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
