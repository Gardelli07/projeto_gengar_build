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
      label: 'A Cobrança Educada: "Touching Base"',
      content: [
        `Como cobrar um colega atrasado sem parecer o chefe chato? Nativos evitam "Did you finish?". Eles usam "To touch base" (fazer um contato rápido). Para perguntar a situação atual, use: "Where do we stand on...?" (Em que pé estamos sobre...?).`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "match",
    component: Exercise1,
    activity: {
      prompt:
        "Conecte as expressões de checagem com suas traduções correspondentes no português corporativo.",
      pairs: [
        {
          en: "Touch base",
          pt: "Fazer um contato rápido / Dar uma atualizada",
        },
        { en: "Where do we stand on...?", pt: "Em que pé estamos sobre...?" },
      ],
      successTitle: "Correto",
      successMessage: "Essas frases cobram sem pesar o clima.",
    },
  },
  {
    key: "correct",
    component: Exercise4,
    activity: {
      prompt:
        "Você precisa saber o progresso do projeto de TI sem pressionar demais. Qual pergunta está correta?",
      image: BUB1.A19S4,
      wrongSentence: "Status check",
      options: [
        "Where do we stand on the IT project?",
        "Where do we stay on the IT project?",
        "Where do we stand in the IT project?",
      ],
      correctAnswer: "Where do we stand on the IT project?",
      successTitle: "Correto",
      successMessage: 'A preposição correta é "on".',
    },
  },
  {
    key: "loop-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Ouça a palavra isolada e escolha a alternativa correta.",
      image: BUB1.A19S5,
      audioSource: require("../../../../../mp3/BU/B1/A19S5.mp3"),
      audioDurationMs: 900,
      answerOptions: ["Look", "Loop"],
      correctOption: "Loop",
      successTitle: "Correto",
      feedbackMessage: '"Loop" é o circuito de informações.',
    },
  },
  {
    key: "loop-tip",
    component: Exercise17,
    activity: {
      label: 'Mantendo todos no "Circuito"',
      content: [
        `Quando um projeto está em andamento, peça um "Status update". Para garantir que ninguém seja pego de surpresa, use: "Keep me in the loop" (me mantenha informado). E para incluir alguém no e-mail, diga: "I will loop John in".`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "loop-complete",
    component: Exercise5,
    activity: {
      prompt:
        "O Diretor vai viajar, mas quer continuar recebendo notícias sobre a negociação.",
      sentenceStart:
        "Team, I will be traveling today, but please keep me in the",
      sentenceEnd: "about the contract.",
      options: ["loop", "look"],
      correctAnswer: "loop",
      successTitle: "Correto",
      successMessage: '"Keep me in the loop" é me mantenha informado.',
    },
  },
  {
    key: "status-spell",
    component: Exercise13,
    needsSpeech: true,
    activity: {
      prompt: 'Organize as letras para formar "Andamento" ou "Situação Atual".',
      audioSource: require("../../../../../mp3/BU/B1/A19S8.mp3"),
      audioDurationMs: 900,
      letters: ["S", "A", "U", "T", "S", "T"],
      correctWord: "STATUS",
      successTitle: "Correto",
      successMessage: "STATUS.",
    },
  },
  {
    key: "complete",
    component: Exercise2,
    activity: {
      prompt: "Leia a mensagem da gerente e preencha as lacunas.",
      paragraphs: [
        [
          "Hi team, I just wanted to ",
          { id: "b1", options: ["touch", "take"], answer: "touch" },
          " base on our new software. Where do we ",
          { id: "b2", options: ["stand", "sit"], answer: "stand" },
          " on the testing phase? Please send me a ",
          { id: "b3", options: ["status", "states"], answer: "status" },
          " update by 5 PM, and ",
          { id: "b4", options: ["keep", "put"], answer: "keep" },
          " the CEO in the loop.",
        ],
      ],
      successTitle: "Correto",
      successMessage: "Você cobrou atualização mantendo todos informados.",
    },
  },
  {
    key: "audio",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt:
        "Escute o líder pedindo informações. A afirmação é verdadeira ou falsa?",
      image: BUB1.A19S10,
      audioSource: require("../../../../../mp3/BU/B1/A19S10.mp3"),
      audioDurationMs: 7200,
      statement:
        "O líder pediu para o Mark esquecer o cliente de ontem e focar no projeto novo.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage: "Ele pediu atualização sobre o cliente de ontem.",
    },
  },
  {
    key: "order",
    component: Exercise6,
    activity: {
      prompt: "Clique nas palavras na ordem correta para cobrar gentilmente.",
      words: ["stand", "where", "we", "do", "project", "the", "on", "?"],
      correctOrder: ["where", "do", "we", "stand", "on", "the", "project", "?"],
      successTitle: "Correto",
      successMessage: "Where do we stand on the project?",
    },
  },
  {
    key: "speaking",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        'Antecipe-se ao Diretor: use "Just wanted to touch base on the report", "Here is the status update" e "I will keep you in the loop".',
      helperText:
        "Just wanted to touch base on the report. Here is the status update. I will keep you in the loop.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "Just wanted to touch base on the report. Here is the status update. I will keep you in the loop.",
      recordLabel: "Gravar Áudio",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você cobrou sem soar chato.",
    },
  },
  {
    key: "feedback",
    component: Exercise17,
    activity: {
      label: "Comunicação Transparente!",
      content: [
        `Sensacional! Substituir frases de pressão por "Touch base" e "Where do we stand" mantém o relacionamento excelente, mesmo quando você precisa cobrar prazos difíceis. Usar "Keep me in the loop" mostra que você supervisiona sem microgerenciar.`,
      ],
      continueLabel: "Finalizar",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
