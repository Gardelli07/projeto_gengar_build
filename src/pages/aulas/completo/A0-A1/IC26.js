import createLessonScreen from "../../LessonScreen";
import { ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise17",
    activity: {
      label: "Letras rebeldes",
      content: [
        ICA1.A26S1,
        "Estas letras não seguem as regras das outras famílias. Cada uma tem sua própria personalidade e som único!",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A26S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A26S2.mp3"),
      audioDurationMs: 900,
      answerOptions: ["H", "A"],
      correctOption: "H",
      successTitle: "Correto",
      feedbackMessage: "H rima com o número 8 em inglês: eight.",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A26S3,
      audioSource: require("../../../../../mp3/IC/A0-A1/A26S3.mp3"),
      audioDurationMs: 900,
      answerOptions: ["J", "G"],
      correctOption: "J",
      successTitle: "Correto",
      feedbackMessage: "O J termina em ei, enquanto o G termina em ii.",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A26S4,
      audioSource: require("../../../../../mp3/IC/A0-A1/A26S4.mp3"),
      audioDurationMs: 900,
      answerOptions: ["K", "Q"],
      correctOption: "K",
      successTitle: "Correto",
      feedbackMessage: 'A letra correta ? "K".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A26S5,
      audioSource: require("../../../../../mp3/IC/A0-A1/A26S5.mp3"),
      audioDurationMs: 900,
      answerOptions: ["Q", "K"],
      correctOption: "Q",
      successTitle: "Correto",
      feedbackMessage: 'A letra correta ? "Q".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A26S6,
      audioSource: require("../../../../../mp3/IC/A0-A1/A26S6.mp3"),
      audioDurationMs: 900,
      answerOptions: ["R", "I"],
      correctOption: "R",
      successTitle: "Correto",
      feedbackMessage: 'A letra correta ? "R".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A26S7,
      audioSource: require("../../../../../mp3/IC/A0-A1/A26S7.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["W", "U"],
      correctOption: "W",
      successTitle: "Correto",
      feedbackMessage: 'A letra correta ? "W".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A26S8,
      audioSource: require("../../../../../mp3/IC/A0-A1/A26S8.mp3"),
      audioDurationMs: 1500,
      answerOptions: ["Y", "I"],
      correctOption: "Y",
      successTitle: "Correto",
      feedbackMessage: "Y soa como a pergunta 'Why?'.",
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Para não esquecer:",
        "O R (âr) tem som de pirata!",
        "O Y (uái) soa como um mineiro perguntando 'uai?'.",
        "Fica impossível de esquecer assim, né?",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "A confusão clássica:",
        "J = Djái (Rima com 'A').",
        "G = Djii (Rima com 'E'). Lembre-se: O J é o 'Jota-ei'!",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "O W se chama Double-U porque ele parece dois 'U' grudados (embora pareça mais com dois 'V').",
        "é a letra com o nome mais longo do alfabeto!",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise1",
    activity: {
      prompt: "Conecte a letra ao seu som",
      pairs: [
        { en: "H", pt: "itch" },
        { en: "J", pt: "Djái" },
        { en: "W", pt: "Dábol-i?" },
        { en: "Y", pt: "Uái" },
      ],
      successTitle: "Excelente",
      successMessage: "H = itch, J = Djái, W = Dábol-i?, Y = Uái.",
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Qual é a letra que falta na marca de Nova York?",
      words: ["N", "Y"],
      correctOrder: ["N", "Y"],
      successTitle: "Correto",
      successMessage:
        "A sequência correta é NY. O Y é fundamental em muitas siglas.",
    },
  },
  {
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction:
        "O Camaleão quer saber se você conhece essa sigla: H - B - O. Soletre para ele!",
      helperText: "Diga o nome das letras em inglês.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "itch - b? - áu",
      recordLabel: "Speak",
      stopLabel: "Parar",
      playLabel: "Ouvir",
      pauseLabel: "Pausar",
      rerecordLabel: "Regravar",
      submitLabel: "Enviar áudio",
      successTitle: "Correto",
      successMessage: 'Resposta esperada: "itch - b? - áu".',
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
