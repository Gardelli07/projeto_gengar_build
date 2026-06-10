import createA2LessonScreen from "./A2LessonScreen";
import { ICA2 } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic29s1",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 3 • AULA 29",
      content: [
        "/blue{Carol's Saturday}",
        "/blue{Misturando os Passados!}",
        "Hoje vamos ler uma história sobre a Carol em que as coisas acontecem de repente.",
        "Vamos ver como o Past Continuous encontra o Past Simple.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic29s2",
    component: "Exercise17",
    activity: {
      label: "Vocabulário",
      content: [
        "A seguir você verá algumas palavras importantes para a leitura.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic29s3",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Vocabulário: escute e escolha.",
      image: ICA2.A29S3,
      audioSource: require("../../../../../mp3/IC/A2/A29S3.mp3"),
      options: ["Hiking", "Hiding"],
      correctAnswer: "Hiking",
      correctOption: "Hiking",
      feedbackMessage: "Hiking significa fazer trilha.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic29s4",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Vocabulário: escute e escolha.",
      image: ICA2.A29S4,
      audioSource: require("../../../../../mp3/IC/A2/A29S4.mp3"),
      options: ["Spotted", "Started"],
      correctAnswer: "Spotted",
      correctOption: "Spotted",
      feedbackMessage: "Spotted é o passado de spot: avistou.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic29s5",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Vocabulário: escute e escolha.",
      image: ICA2.A29S5,
      audioSource: require("../../../../../mp3/IC/A2/A29S5.mp3"),
      options: ["Nose", "Noise"],
      correctAnswer: "Noise",
      correctOption: "Noise",
      feedbackMessage: "Noise significa barulho.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic29s6",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Vocabulário: escute e escolha.",
      image: ICA2.A29S6,
      audioSource: require("../../../../../mp3/IC/A2/A29S6.mp3"),
      options: ["Towards", "Tower"],
      correctAnswer: "Towards",
      correctOption: "Towards",
      feedbackMessage: "Towards significa em direção a.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic29s7",
    component: "Exercise17",
    activity: {
      label: "Dicionário",
      content: [
        "/blue{Dicionário de Bolso}",
        "Hiking: fazendo trilha.",
        "Spotted: avistou / notou.",
        "Noise: barulho.",
        "Towards: em direção a.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic29s8",
    component: "Exercise17",
    activity: {
      label: "Leitura",
      content: [
        "Agora que você está pronto, comece a leitura e fique atento às interrupções.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic29s9",
    component: "Exercise17",
    activity: {
      label: "Part 1",
      content: [
        "/blue{A Beautiful Day}",
        "Last Saturday, I was hiking in the mountains. The sun was shining and the birds were singing. I was listening to music on my phone when I heard a very strange noise behind a tree.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic29s10",
    component: "Exercise4",
    activity: {
      prompt: "O que a pessoa estava fazendo quando ouviu o barulho?",
      image: ICA2.A29S10,
      wrongSentence: "Choose the correct answer.",
      options: ["Listening to music.", "Taking photos."],
      correctAnswer: "Listening to music.",
      successTitle: "Correto",
      successMessage: "Ela estava ouvindo música.",
    },
  },
  {
    key: "a2ic29s11",
    component: "Exercise4",
    activity: {
      prompt: "Where was the person?",
      image: ICA2.A29S11,
      wrongSentence: "Choose the correct answer.",
      options: ["At the beach.", "In the mountains."],
      correctAnswer: "In the mountains.",
      successTitle: "Correto",
      successMessage: "The person was in the mountains.",
    },
  },
  {
    key: "a2ic29s12",
    component: "Exercise17",
    activity: {
      label: "Part 2",
      content: [
        "/blue{The Interruption}",
        "I stopped and looked. A small bear was eating some berries! I was taking a photo of the bear when it spotted me. Suddenly, the bear started walking towards me! I was very scared.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic29s13",
    component: "Exercise5",
    activity: {
      prompt: "What was the bear doing when the person saw it?",
      sentenceStart: "It was",
      sentenceEnd: ".",
      options: ["sleeping", "eating berries"],
      correctAnswer: "eating berries",
      successTitle: "Correto",
      successMessage: "The bear was eating berries.",
    },
  },
  {
    key: "a2ic29s14",
    component: "Exercise5",
    activity: {
      prompt: "O que aconteceu enquanto a pessoa tirava a foto?",
      sentenceStart: "The bear",
      sentenceEnd: ".",
      options: ["spotted me", "turned off the phone"],
      correctAnswer: "spotted me",
      successTitle: "Correto",
      successMessage: "O urso a avistou.",
    },
  },
  {
    key: "a2ic29s15",
    component: "Exercise17",
    activity: {
      label: "Part 3",
      content: [
        "/blue{Running Home}",
        "I ran back to my car quickly. I was driving home when I realized I didn't have my keys! Luckily, they were in my pocket. I arrived home safely and told the story to my family. What an adventure!",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic29s16",
    component: "Exercise4",
    activity: {
      prompt: "O que a pessoa percebeu enquanto dirigia para casa?",
      image: ICA2.A29S16,
      wrongSentence: "Choose the correct answer.",
      options: [
        "Que estava com fome.",
        "Que achou que não estava com as chaves.",
      ],
      correctAnswer: "Que achou que não estava com as chaves.",
      successTitle: "Correto",
      successMessage: "Ela achou que estava sem as chaves.",
    },
  },
  {
    key: "a2ic29s17",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Ouça e responda: verdadeiro ou falso?",
      image: ICA2.A29S17,
      audioSource: require("../../../../../mp3/IC/A2/A29S17.mp3"),
      statement: "The person forgot the keys at the mountain.",
      textOnScreen: "The person forgot the keys at the mountain.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      successMessage: "False. The keys were in the pocket.",
      feedbackMessage: "O texto diz que as chaves estavam no bolso.",
    },
  },
  {
    key: "a2ic29s18",
    component: "Exercise12",
    activity: {
      prompt: "Resuma essa aventura do Camaleão.",
      instruction: 'Tente usar: "He was ...ing when ...".',
      correctAnswer: "He was hiking when he heard a noise.",
      successTitle: "Muito bem!",
      successMessage: "Resumo registrado.",
    },
  },
  {
    key: "a2ic29s19",
    component: "Exercise17",
    activity: {
      label: "Final",
      content: [
        "/blue{Você é um Grande Leitor!}",
        "Entender como os tempos verbais se misturam é a chave para ler e assistir em inglês com mais confiança.",
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
