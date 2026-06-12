import createLessonScreen from "../../LessonScreen";
import { ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise17",
    activity: {
      label: "Morning!",
      content: [
        ICA1.A21S1,
        "O inglês é falado no mundo todo, mas cada lugar tem seu tempero. Vamos ver como os nativos se cumprimentam de verdade?",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A21S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A21S2.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Morning!", "Good morning!"],
      correctOption: "Morning!",
      successTitle: "Correto",
      feedbackMessage:
        "Nos EUA e no Reino Unido, a forma mais comum e informal é simplesmente cortar o 'Good'. é o nosso 'Dia!'.",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A21S3,
      audioSource: require("../../../../../mp3/IC/A0-A1/A21S3.mp3"),
      audioDurationMs: 2000,
      answerOptions: ["Top o' the mornin'!", "Good morning!"],
      correctOption: "Top o' the mornin'!",
      successTitle: "Correto",
      feedbackMessage:
        "\"Top o' the mornin'!\" é uma saudação irlandesa clássica. Significa algo como \"o melhor da manhã para você!\".",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A21S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A21S4.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["G'day!", "Good day!"],
      correctOption: "G'day!",
      successTitle: "Correto",
      feedbackMessage:
        "\"G'day!\" é uma saudação australiana informal. Vem de \"Good day\" e funciona como um \"oi\" ao longo do dia.",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A21S5,
      audioSource: require("../../../../../mp3/IC/A0-A1/A21S5.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Alright?", "Good evening?"],
      correctOption: "Alright?",
      successTitle: "Correto",
      feedbackMessage:
        "No Reino Unido (especialmente em Londres), as pessoas raramente dizem 'Good evening'. Elas dizem 'Alright?' (Tudo certo?). é um 'oi' e um 'tudo bem' ao mesmo tempo!",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A19S3,
      audioSource: require("../../../../../mp3/IC/A0-A1/A21S6.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Nighty-night!", "Good night!"],
      correctOption: "Nighty-night!",
      successTitle: "Correto",
      feedbackMessage:
        "Tanto nos EUA quanto no Reino Unido, Nighty-night é uma forma super informal e fofa de dizer boa noite, geralmente usada entre casais ou para crianças.",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A21S7,
      audioSource: require("../../../../../mp3/IC/A0-A1/A21S7.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Night!", "Nine!"],
      correctOption: "Night!",
      successTitle: "Correto",
      feedbackMessage:
        "O atalho universal: assim como no 'Morning', tirar o 'Good' e dizer apenas 'Night!' funciona em qualquer país de língua inglesa.",
    },
  },
  {
    component: "Exercise1",
    activity: {
      prompt: "Conecte a região à expressão",
      pairs: [
        { en: "Austrália", pt: "G'day!" },
        { en: "Irlanda", pt: "Top o' the mornin'!" },
        { en: "Londres (UK)", pt: "Alright?" },
        { en: "Global (Informal)", pt: "Morning!" },
      ],
      successTitle: "Excelente",
      successMessage:
        "Austrália: G'day! Irlanda: Top o' the mornin'! Londres: Alright? Global informal: Morning!",
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Você está em Dublin (Irlanda) e quer saudar alguém de manhã.",
      words: ["the", "Top", "mornin'!", "o'"],
      correctOrder: ["Top", "o'", "the", "mornin'!"],
      successTitle: "Correto",
      successMessage: "A frase correta é \"Top o' the mornin'!\"",
    },
  },
  {
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction:
        "Escolha sua região favorita (EUA, Austrália ou Irlanda) e mande a saudação informal que você aprendeu!",
      helperText: "Escolha entre Morning!, G'day! ou Top o' the mornin'!",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Morning! / G'day! / Top o' the mornin'!",
      recordLabel: "Speak",
      stopLabel: "Parar",
      playLabel: "Ouvir",
      pauseLabel: "Pausar",
      rerecordLabel: "Regravar",
      submitLabel: "Enviar áudio",
      successTitle: "Correto",
      successMessage:
        "Resposta esperada: Morning!, G'day! ou Top o' the mornin'!",
    },
  },
  {
    key: "lesson-finish",
    type: "finish",
  },
];

export default createLessonScreen(LESSON_SLIDES, {
  storageKey: "@progesso_ingles_completo_A0-A1",
  nextRouteName: "Inglescompleto",
  screenName: "InglesCompletoA0A1LessonScreen",
});
