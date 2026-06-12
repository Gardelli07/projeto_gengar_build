import createLessonScreen from "../../LessonScreen";
import { ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise17",
    activity: {
      label: "Vowels",
      content: [
        ICA1.A23S1,
        "Toda palavra precisa de uma vogal para ter som. Vamos aprender como elas se chamam em inglês?",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A23S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A23S2.mp3"),
      audioDurationMs: 900,
      answerOptions: ["A", "E"],
      correctOption: "A",
      successTitle: "Correto",
      feedbackMessage: 'A letra "A" em inglês tem som de ái.',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A23S3,
      audioSource: require("../../../../../mp3/IC/A0-A1/A23S3.mp3"),
      audioDurationMs: 900,
      answerOptions: ["E", "I"],
      correctOption: "E",
      successTitle: "Correto",
      feedbackMessage: 'A letra "E" em inglês tem som de ii, como um sorriso.',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A23S4,
      audioSource: require("../../../../../mp3/IC/A0-A1/A23S4.mp3"),
      audioDurationMs: 900,
      answerOptions: ["I", "E"],
      correctOption: "I",
      successTitle: "Correto",
      feedbackMessage: 'A letra "I" em inglês tem som de ái.',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A23S5,
      audioSource: require("../../../../../mp3/IC/A0-A1/A23S5.mp3"),
      audioDurationMs: 900,
      answerOptions: ["O", "U"],
      correctOption: "O",
      successTitle: "Correto",
      feedbackMessage: 'A letra "O" em inglês tem som de áu.',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A23S6,
      audioSource: require("../../../../../mp3/IC/A0-A1/A23S6.mp3"),
      audioDurationMs: 900,
      answerOptions: ["U", "W"],
      correctOption: "U",
      successTitle: "Correto",
      feedbackMessage:
        'A letra "U" em inglês tem som de i?, como a palavra "you".',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Dica para nunca mais esquecer:",
        "A -> Pense em um EI! (chamando alguém).",
        "E -> Pense em um II... (dando um sorriso).",
        "I -> Pense em um AI! (quando você se machuca).",
        "O -> Pense em um OU... (uma dúvida).",
        "U -> Pense em YOU (você).",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise1",
    activity: {
      prompt: "Conecte som à letra",
      pairs: [
        { en: "Ái", pt: "I" },
        { en: "Êi", pt: "A" },
        { en: "Ii", pt: "E" },
        { en: "Iú", pt: "U" },
        { en: "Ôu", pt: "O" },
      ],
      successTitle: "Excelente",
      successMessage: "Ái = I, Êi = A, Ii = E, Iú = U, Ôu = O.",
    },
  },
  {
    component: "Exercise11",
    activity: {
      prompt:
        "O Camaleão vai dizer as vogais rápido. Digite a sequência que você ouvir!",
      title: "Digite rápido",
      placeholder: "Digite aqui",
      secondsPerWord: 8,
      words: ["A", "E", "I", "O", "U"],
      successTitle: "Correto",
      successMessage: "Você digitou AIE no tempo certo.",
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
