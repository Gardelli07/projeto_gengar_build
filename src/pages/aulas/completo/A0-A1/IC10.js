import createLessonScreen from "../../LessonScreen";
import { ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `Lado A: O camaleão  falando com um amigo. `,
        ICA1.A10S1,
        `Lado B: O camaleão falando com um grupo de amigos.`,
        ICA1.A10S1p2,
        `Em inglês, usamos a mesma palavra para falar com uma ou várias pessoas. Consegue descobrir qual ?`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A10S3,
      audioSource: require("../../../../../mp3/IC/A0-A1/A10S3.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Are", "Air"],
      correctOption: "Are",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "Are" para dizer "você".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A10S4,
      audioSource: require("../../../../../mp3/IC/A0-A1/A10S4.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["You are", "You is"],
      correctOption: "You are",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "You are" para dizer "você".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A10S5,
      audioSource: require("../../../../../mp3/IC/A0-A1/A10S5.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Aren't ", "Air"],
      correctOption: "Aren't ",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "Aren\'t" para dizer "não é/não está".',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `Dica de Ouro: You significa 'Você' E 'Vocês'. O verbo não muda: é sempre ARE.
  • 1 pessoa: You are a student.
  • 2+ pessoas: You are students. 
O segredo está no que vem depois! `,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise1",
    activity: {
      prompt: "Encontre a tradução",
      pairs: [
        { en: "You are", pt: "Você é / Vocês são" },
        { en: "You aren't", pt: "Você não é/está" },
      ],
      successTitle: "Excelente",
      successMessage: "Você acertou todas as traduções.",
    },
  },
  {
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt: "Escreva a palavra",
      audioSource: require("../../../../../mp3/IC/A0-A1/A10S8.mp3"),
      audioDurationMs: 1000,
      letters: ["E", "R", "A"],
      correctWord: "ARE",
      successTitle: "Correto",
      successMessage: 'A palavra correta é "Are".',
    },
  },
  {
    component: "Exercise15",
    activity: {
      prompt: "Clique na imagem e na palavra",
      images: [
        { id: "img1", image: ICA1.A10S9 },
        { id: "img2", image: ICA1.A10S9p2 },
      ],
      words: [
        { id: "test1", label: "You are a teacher" },
        { id: "test2", label: "You are teachers" },
      ],
      pairs: [
        { imageId: "img1", wordId: "test1" },
        { imageId: "img2", wordId: "test2" },
      ],
      successTitle: "Correto",
      successMessage: "Você formou os dois pares corretamente.",
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Coloque a frase em ordem.",
      words: ["are", "you", "tall"],
      correctOrder: ["you", "are", "tall"],
      successTitle: "Correto",
      successMessage: `A frase correta é "You are tall."`,
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `Como os nativos evitam confusão? Para deixar claro que estão falando com o grupo todo (plural), eles dizem /blue{You guys}. É super comum, informal e faz você soar muito mais natural!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A10S10,
      audioSource: require("../../../../../mp3/IC/A0-A1/A10S10.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["You are", "You guys"],
      correctOption: "You guys",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "You guys" para dizer "vocês".',
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Coloque a frase em ordem.",
      words: ["aren't", "Brazilian", "you"],
      correctOrder: ["you", "aren't", "Brazilian"],
      successTitle: "Correto",
      successMessage: `A frase correta é "You aren't Brazilian."`,
    },
  },
  {
    component: "Exercise4",
    activity: {
      prompt: "Corrija",
      image: ICA1.A10S12,
      wrongSentence: "Falando com um grupo de amigos.",
      options: ["You is my friends.", "You are my friends."],
      correctAnswer: "You are my friends.",
      successTitle: "Correto",
      successMessage: 'A forma correta é "You are my friends."',
    },
  },
  {
    component: "Exercise12",
    activity: {
      prompt: "Write your introduction",
      instruction: "Escreva brevemente sobre você em inglês.",
      helperText:
        "Escreva uma frase curta dizendo 'Você é legal' (cool) para um amigo.",
      placeholder: "Hello...",
      tipText: '"You guys are Brazilian!".',
      minLength: 3,
      successTitle: "Correto",
      successMessage: "Seu texto foi preenchido com sucesso.",
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `Sensacional! Você dominou o pronome mais importante das conversas. Agora que você já sabe falar 'Você', na próxima aula vamos aprender a falar de 'Nós' (We) e 'Eles' (They). See you! `,
      ],
      continueLabel: "Continuar",
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
