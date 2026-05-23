import createA2LessonScreen from "./A2LessonScreen";
import { ICA2 } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic24s1",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 3 • AULA 24",
      content: [
        "/blue{You were working}",
        "/blue{O Time do WERE!}",
        "Já dominamos o was. Agora vamos aprender o were, que usamos para You, We e They.",
        "A regra do verbo continua igual: pessoa + were + verbo com ING.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic24s2",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha.",
      image: ICA2.A24S2,
      audioSource: require("../../../../../mp3/IC/A2/A24S2.mp3"),
      audioText: "We were playing",
      options: ["We were playing", "Was playing"],
      correctAnswer: "We were playing",
      correctOption: "We were playing",
      feedbackMessage: "Usamos were para we.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic24s3",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha.",
      image: ICA2.A24S3,
      audioSource: require("../../../../../mp3/IC/A2/A24S3.mp3"),
      audioText: "They were dancing",
      options: ["They were dancing", "Were dance"],
      correctAnswer: "They were dancing",
      correctOption: "They were dancing",
      feedbackMessage: "They pede were, e o verbo fica com ing.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic24s4",
    component: "Exercise18",
    activity: {
      prompt: "O que eles estavam fazendo? Digite a frase completa.",
      scrambledWords: ["studying", "were", "They", "together", "."],
      words: ["studying", "were", "They", "together", "."],
      correctAnswer: "They were studying together.",
      successTitle: "Correto",
      successMessage: "They were studying together.",
    },
  },
  {
    key: "a2ic24s5",
    component: "Exercise19",
    activity: {
      prompt: "Escute e digite exatamente o que ouviu.",
      audioSource: require("../../../../../mp3/IC/A2/A24S5.mp3"),
      correctAnswer: "We were eating pizza.",
      successTitle: "Correto",
      successMessage: "We were eating pizza.",
    },
  },
  {
    key: "a2ic24s6",
    component: "Exercise17",
    activity: {
      label: "Desafio",
      content: [
        "/blue{Dedos no Teclado!}",
        "Vou mostrar frases no presente e você deve digitar a versão no Past Continuous usando were.",
        "Você tem 5 segundos por frase.",
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "a2ic24s7",
    component: "Exercise11",
    activity: {
      words: [
        "They were playing",
        "We were working",
        "You were eating",
        "They were dancing",
        "We were studying",
      ],
      secondsPerWord: 5,
    },
  },
  {
    key: "a2ic24s8",
    component: "Exercise16",
    activity: {
      prompt: "Gravação de áudio",
      instruction:
        "Grave um áudio contando o que seus amigos ou família estavam fazendo ontem à tarde.",
      helperText: 'Exemplo: "They were watching a movie."',
      successTitle: "Muito bem!",
      successMessage: "Seu áudio foi gravado.",
    },
  },
  {
    key: "a2ic24s9",
    component: "Exercise17",
    activity: {
      label: "Final",
      content: [
        "/blue{Past Continuous Concluído!}",
        "Agora você já sabe usar was e were para descrever ações em progresso no passado.",
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
