import createA2LessonScreen from "./A2LessonScreen";
import { ICA2, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic12s3",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 2 • AULA 12",
      content: [
        "/blue{I worked yesterday}",
        "Você já sabe que o passado regular termina em -ed, mas às vezes dobramos a última letra.",
        "",
        "/blue{Quando o -ED ganha som de ID?}",
        "Se o verbo termina com som de T ou D, o -ed vira uma sílaba extra com som de ID.",
        "Want → Wanted",
        "Need → Needed",
        "Visit → Visited",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic12s1",
    component: "Exercise4",
    activity: {
      prompt: 'Como escrevemos o passado de "STOP"?',
      image: ICA2.A12S1,
      wrongSentence: "The bus stoped here.",
      options: [
        "The bus stopped here.",
        "The bus stoped here.",
        "The bus stoping here.",
      ],
      correctAnswer: "The bus stopped here.",
      successTitle: "Correto",
      successMessage: "Stop é CVC, então dobra o P: stopped.",
    },
  },
  {
    key: "a2ic12s2",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Ouça o som final e escolha a palavra que você ouviu.",
      image: ICA2.A12S2,
      audioSource: require("../../../../../mp3/IC/A2/A12S2.mp3"),
      options: ["Want", "Wanted"],
      correctAnswer: "Wanted",
      correctOption: "Wanted",
      feedbackMessage: "Wanted termina com som de ID.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic12s4",
    component: "Exercise1",
    activity: {
      prompt: "Conecte o verbo ao seu passado com som final ID.",
      pairs: [
        { en: "Decide", pt: "Decided" },
        { en: "Start", pt: "Started" },
        { en: "Paint", pt: "Painted" },
      ],
      successTitle: "Correto",
      successMessage: "Esses verbos ganham uma sílaba extra no passado.",
    },
  },
  {
    key: "a2ic12s5",
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "/blue{A Regra do CVC}",
        "Se o verbo for curto e terminar em Consoante + Vogal + Consoante, dobramos a última letra antes de colocar -ed.",
        "Stop → Stopped",
        "Plan → Planned",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic12s6",
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt: 'Ordene as letras para formar o passado de "PLAN".',
      audioSource: require("../../../../../mp3/IC/A2/A12S6.mp3"),
      letters: ["P", "L", "A", "N", "N", "E", "D"],
      correctWord: "PLANNED",
      successTitle: "Correto",
      successMessage: "Plan vira planned, com dois Ns.",
    },
  },
  {
    key: "a2ic12s7",
    component: "Exercise5",
    activity: {
      prompt: 'Complete a frase com o passado de "NEED".',
      sentenceStart: "I",
      sentenceEnd: "some help with my homework yesterday.",
      options: ["needed", "needs"],
      correctAnswer: "needed",
      successTitle: "Correto",
      successMessage: "Need termina em som de D, então needed tem som de ID.",
    },
  },
  {
    key: "a2ic12s8",
    component: "Exercise5",
    activity: {
      prompt: 'Complete com a grafia correta de "SHOP" no passado.',
      sentenceStart: "I",
      sentenceEnd: "at the mall last weekend.",
      options: ["shopping", "shopped"],
      correctAnswer: "shopped",
      successTitle: "Correto",
      successMessage: "Shop é CVC, então shopped tem dois Ps.",
    },
  },
  {
    key: "a2ic12s9",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Ouça e responda: verdadeiro ou falso?",
      image: ICA2.A12S9,
      audioSource: require("../../../../../mp3/IC/A2/A12S9.mp3"),
      statement: "The person planned a party.",
      textOnScreen: "The person planned a party.",
      options: ["true", "false"],
      correctAnswer: "true",
      successTitle: "Correto",
      successMessage: "True. O áudio diz: I planned a surprise party.",
      feedbackMessage: "A pessoa planejou uma festa surpresa.",
    },
  },
  {
    key: "a2ic12s10",
    component: "Exercise6",
    activity: {
      prompt: "Coloque as palavras na ordem correta.",
      words: ["a", "new", "painted", "He", "picture", "."],
      correctOrder: ["He", "painted", "a", "new", "picture", "."],
      successTitle: "Correto",
      successMessage: "He painted a new picture.",
    },
  },
  {
    key: "a2ic12s11",
    component: "Exercise17",
    activity: {
      label: "Tip cultural",
      content: [
        "/blue{Soa mais natural!}",
        "Muitos alunos tentam falar o E em todos os verbos, como work-ed.",
        "Só fale ID se o verbo terminar em T ou D.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic12s12",
    component: "Exercise12",
    activity: {
      prompt: "Freer Practice",
      instruction:
        "Pense em algo que você precisou ou planejou fazer semana passada.",
      helperText: "Exemplo: I needed to buy bread.",
      placeholder: "Digite sua frase aqui",
      tipText: "Use needed ou planned.",
      successTitle: "Muito bem!",
      successMessage: "Você escreveu uma frase no passado regular.",
    },
  },
  {
    key: "a2ic12s13",
    component: "Exercise16",
    activity: {
      prompt: "Freer Practice - Áudio",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      instruction: "Mande um áudio pronunciando estas 3 palavras no passado.",
      helperText: "Wanted, Needed, Decided.",
      tipText: "Essas três terminam com som de ID.",
      successTitle: "Muito bem!",
      successMessage: "Seu áudio foi gravado.",
    },
  },
  {
    key: "a2ic12s14",
    component: "Exercise17",
    activity: {
      label: "Desafio",
      content: [
        "/blue{Desafio de Escrita!}",
        "Cuidado com as letras dobradas. Você verá o verbo no presente e deve digitar o passado em até 5 segundos.",
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "a2ic12s15",
    component: "Exercise11",
    activity: {
      prompt: "Digite o passado dos verbos:",
      title: "Escreva rápido",
      placeholder: "Digite aqui",
      secondsPerWord: 5,
      words: ["Planned", "Stopped", "Needed", "Wanted", "Shopped"],
      successTitle: "Correto",
      successMessage: "Você aplicou CVC e o som ID.",
    },
  },
  {
    key: "a2ic12s16",
    component: "Exercise17",
    activity: {
      label: "Final",
      content: [
        "/blue{Você é um mestre dos Regulares!}",
        'Agora você domina as regras de escrita e a pronúncia do "ID".',
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
