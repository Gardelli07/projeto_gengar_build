import createLessonScreen from "../../LessonScreen";
import { ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise17",
    activity: {
      label: 'Time do "EH"',
      content: [
        ICA1.A25S1,
        'Diferente do time anterior, essas letras começam com um som de "?". Prepare o fôlego!',
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A25S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A25S2.mp3"),
      audioDurationMs: 900,
      answerOptions: ["F", "S"],
      correctOption: "F",
      successTitle: "Correto",
      feedbackMessage: 'A letra correta ? "F".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A25S3,
      audioSource: require("../../../../../mp3/IC/A0-A1/A25S3.mp3"),
      audioDurationMs: 900,
      answerOptions: ["L", "I"],
      correctOption: "L",
      successTitle: "Correto",
      feedbackMessage: 'A letra correta ? "L".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A25S4,
      audioSource: require("../../../../../mp3/IC/A0-A1/A25S4.mp3"),
      audioDurationMs: 800,
      answerOptions: ["M", "N"],
      correctOption: "M",
      successTitle: "Correto",
      feedbackMessage: 'A letra correta ? "M".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A25S5,
      audioSource: require("../../../../../mp3/IC/A0-A1/A25S5.mp3"),
      audioDurationMs: 800,
      answerOptions: ["N", "M"],
      correctOption: "N",
      successTitle: "Correto",
      feedbackMessage: 'A letra correta ? "N".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A25S6,
      audioSource: require("../../../../../mp3/IC/A0-A1/A25S6.mp3"),
      audioDurationMs: 900,
      answerOptions: ["S", "C"],
      correctOption: "S",
      successTitle: "Correto",
      feedbackMessage: 'A letra correta ? "S".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A25S7,
      audioSource: require("../../../../../mp3/IC/A0-A1/A25S7.mp3"),
      audioDurationMs: 700,
      answerOptions: ["X", "S"],
      correctOption: "X",
      successTitle: "Correto",
      feedbackMessage: 'A letra correta ? "X".',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Dica de Ouro: Para falar o M (âm), você precisa fechar os lábios no final. Se a boca ficar aberta, vai soar como N (ân).",
        "M = Lábios grudados.",
        "N = Língua no céu da boca.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "O X (éks) tem um som de 'ks' no final, como o som de uma faísca.",
        "Pratique: ?-ks!",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise1",
    activity: {
      prompt: "Conecte a letra ao seu som",
      pairs: [
        { en: "L", pt: "ál" },
        { en: "M", pt: "âm" },
        { en: "X", pt: "éks" },
        { en: "F", pt: "éf" },
      ],
      successTitle: "Excelente",
      successMessage: "L = ál, M = âm, X = éks, F = éf.",
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Coloque estas letras do time na ordem alfabética correta.",
      words: ["N", "L", "M"],
      correctOrder: ["L", "M", "N"],
      successTitle: "Correto",
      successMessage: "A sequência correta ? L, M, N.",
    },
  },
  {
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction: "Soletre a palavra S - M - S.",
      helperText: "Dica: cheque se você fechou a boca no M!",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "às - âm - às",
      recordLabel: "Speak",
      stopLabel: "Parar",
      playLabel: "Ouvir",
      pauseLabel: "Pausar",
      rerecordLabel: "Regravar",
      submitLabel: "Enviar áudio",
      successTitle: "Correto",
      successMessage: 'Resposta esperada: "às - âm - às".',
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
