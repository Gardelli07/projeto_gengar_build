import createA2LessonScreen from "./A2LessonScreen";
import { ICA2, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic25s1",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 3 • AULA 25",
      content: [
        "/blue{I wasn't writing}",
        "/blue{O Poder do NÃO!}",
        "No passado contínuo, para dizer que algo não estava acontecendo, basta juntar o not ao ajudante.",
        "I, He, She, It → wasn't",
        "You, We, They → weren't",
        "O verbo continua com ING.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic25s2",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha.",
      image: ICA2.A25S2,
      audioSource: require("../../../../../mp3/IC/A2/A25S2.mp3"),
      options: ["I wasn't sleeping", "Weren't sleeping"],
      correctAnswer: "I wasn't sleeping",
      correctOption: "I wasn't sleeping",
      feedbackMessage: "Usamos wasn't para I, He, She e It.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic25s3",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha.",
      image: ICA2.A25S3,
      audioSource: require("../../../../../mp3/IC/A2/A25S3.mp3"),
      options: ["Wasn't talking", "You weren't talking"],
      correctAnswer: "You weren't talking",
      correctOption: "You weren't talking",
      feedbackMessage: "Com you, usamos weren't.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic25s4",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha.",
      image: ICA2.A25S4,
      audioSource: require("../../../../../mp3/IC/A2/A25S4.mp3"),
      options: ["She wasn't working", "Wasn't work"],
      correctAnswer: "She wasn't working",
      correctOption: "She wasn't working",
      feedbackMessage: "Mesmo na negativa, o verbo fica com ing.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic25s5",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha.",
      image: ICA2.A25S5,
      audioSource: require("../../../../../mp3/IC/A2/A25S5.mp3"),
      options: ["They weren't eating", "Was eating"],
      correctAnswer: "They weren't eating",
      correctOption: "They weren't eating",
      feedbackMessage: "They pede weren't na negativa.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic25s6",
    component: "Exercise1",
    activity: {
      prompt: "Relacione a pessoa à forma negativa correta.",
      pairs: [
        { en: "I", pt: "Wasn't singing" },
        { en: "They", pt: "Weren't dancing" },
        { en: "We", pt: "Weren't playing" },
        { en: "She", pt: "Wasn't reading" },
        { en: "You", pt: "Weren't eating" },
      ],
      successTitle: "Correto",
      successMessage:
        "Wasn't é singular; weren't é plural e também combina com you.",
    },
  },
  {
    key: "a2ic25s7",
    component: "Exercise4",
    activity: {
      prompt: "Qual frase descreve que eles não estavam estudando?",
      image: ICA2.A25S7,
      wrongSentence: "Eles não estavam estudando.",
      options: ["They wasn't studying.", "They weren't studying."],
      correctAnswer: "They weren't studying.",
      successTitle: "Correto",
      successMessage: "They combina com weren't.",
    },
  },
  {
    key: "a2ic25s8",
    component: "Exercise8",
    activity: {
      prompt: "Olhe a imagem e escolha a frase correta.",
      image: ICA2.A25S8,
      options: [
        "He wasn't doing his homework.",
        "He weren't doing his homework.",
      ],
      correctAnswer: "He wasn't doing his homework.",
      successTitle: "Correto",
      successMessage: "He combina com wasn't.",
    },
  },
  {
    key: "a2ic25s9",
    component: "Exercise8",
    activity: {
      prompt: "Olhe a imagem e escolha a frase correta.",
      image: ICA2.A25S9,
      options: ["It wasn't rain.", "It wasn't raining."],
      correctAnswer: "It wasn't raining.",
      successTitle: "Correto",
      successMessage: "Depois de wasn't, o verbo continua com ing.",
    },
  },
  {
    key: "a2ic25s10",
    component: "Exercise18",
    activity: {
      prompt: "O Camaleão não estava bebendo café. Digite a frase.",
      scrambledWords: ["wasn't", "I", "coffee", "drinking", "."],
      words: ["wasn't", "I", "coffee", "drinking", "."],
      correctAnswer: "I wasn't drinking coffee.",
      successTitle: "Correto",
      successMessage: "I wasn't drinking coffee.",
    },
  },
  {
    key: "a2ic25s11",
    component: "Exercise18",
    activity: {
      prompt: "Eles não estavam assistindo TV. Digite a frase.",
      scrambledWords: ["watching", "weren't", "They", "TV", "."],
      words: ["watching", "weren't", "They", "TV", "."],
      correctAnswer: "They weren't watching TV.",
      successTitle: "Correto",
      successMessage: "They weren't watching TV.",
    },
  },
  {
    key: "a2ic25s12",
    component: "Exercise18",
    activity: {
      prompt: "Nós não estávamos correndo. Digite a frase.",
      scrambledWords: ["running", "were", "not", "We", "."],
      words: ["running", "were", "not", "We", "."],
      correctAnswer: "We were not running.",
      acceptableAnswers: ["We weren't running."],
      successTitle: "Correto",
      successMessage: "We were not running.",
    },
  },
  {
    key: "a2ic25s13",
    component: "Exercise19",
    activity: {
      prompt: "Escute e digite a frase negativa completa.",
      audioSource: require("../../../../../mp3/IC/A2/A25S13.mp3"),
      correctAnswer: "She wasn't listening to me.",
      successTitle: "Correto",
      successMessage: "She wasn't listening to me.",
    },
  },
  {
    key: "a2ic25s14",
    component: "Exercise19",
    activity: {
      prompt: "Escute com atenção ao weren't e digite.",
      audioSource: require("../../../../../mp3/IC/A2/A25S14.mp3"),
      correctAnswer: "You weren't driving fast.",
      successTitle: "Correto",
      successMessage: "You weren't driving fast.",
    },
  },
  {
    key: "a2ic25s15",
    component: "Exercise17",
    activity: {
      label: "Desafio",
      content: [
        "/blue{Desafio de Transformação!}",
        "Transforme frases do presente negativo para o Past Continuous negativo.",
        "I'm not → wasn't",
        "They aren't → weren't",
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "a2ic25s16",
    component: "Exercise11",
    activity: {
      words: [
        "I wasn't sleeping",
        "They weren't eating",
        "She wasn't working",
        "We weren't dancing",
        "He wasn't running",
      ],
      secondsPerWord: 5,
    },
  },
  {
    key: "a2ic25s17",
    component: "Exercise12",
    activity: {
      prompt: "O que você não estava fazendo às 7h da manhã de hoje?",
      instruction: 'Exemplo: "I wasn\'t working. I was sleeping!"',
      correctAnswer: "I wasn't working.",
      successTitle: "Muito bem!",
      successMessage: "Resposta registrada.",
    },
  },
  {
    key: "a2ic25s18",
    component: "Exercise16",
    activity: {
      prompt: "Gravação de áudio",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      instruction:
        'Grave um áudio dizendo: "We weren\'t watching the game yesterday."',
      helperText: "We weren't watching the game yesterday.",
      tipText: "Capriche na pronúncia do weren't.",
      successTitle: "Muito bem!",
      successMessage: "Seu áudio foi gravado.",
    },
  },
  {
    key: "a2ic25s19",
    component: "Exercise17",
    activity: {
      label: "Final",
      content: [
        "/blue{Mestre das Negativas!}",
        "Agora você já sabe negar ações em progresso no passado. Na próxima aula, vamos aprender a fazer perguntas.",
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
