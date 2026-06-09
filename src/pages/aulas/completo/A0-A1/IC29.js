import createLessonScreen from "../../LessonScreen";
import { ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise17",
    activity: {
      label: "Diferença B/P V/W",
      content: [
        ICA1.A29S1,
        "Algumas letras soam parecidas, mas o segredo está na boca! Vamos aprender a diferenciar esses pares?",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Dica de Mestre: Coloque um papel na frente da boca.",
        "Ao dizer P (p?), o papel deve se mexer com o sopro!",
        "Ao dizer B (b?), o papel quase não se mexe, mas você sente sua garganta vibrar.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A29S3,
      audioSource: require("../../../../../mp3/IC/A0-A1/A29S3.mp3"),
      audioDurationMs: 800,
      answerOptions: ["B", "P"],
      correctOption: "P",
      successTitle: "Correto",
      feedbackMessage: "P tem explosão de ar.",
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Para o V (v?), encoste os dentes de cima no lábio de baixo, como um motorzinho: vvvvv.",
        "Jé o W (dábol-i?) não usa os dentes!",
        "Você faz um biquinho de 'u' e diz o nome longo dele.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A29S5,
      audioSource: require("../../../../../mp3/IC/A0-A1/A29S5.mp3"),
      audioDurationMs: 800,
      answerOptions: ["V", "W"],
      correctOption: "V",
      successTitle: "Correto",
      feedbackMessage: "V faz o motorzinho nos lábios.",
    },
  },
  {
    component: "Exercise1",
    activity: {
      prompt: "Conecte a letra à sua característica",
      pairs: [
        { en: "P", pt: "Explosão de ar" },
        { en: "B", pt: "Vibração na garganta" },
        { en: "V", pt: "Motorzinho nos lábios" },
        { en: "W", pt: "Nome mais longo" },
      ],
      successTitle: "Excelente",
      successMessage:
        "P = Explosão de ar, B = Vibração na garganta, V = Motorzinho nos lábios, W = Nome mais longo.",
    },
  },
  {
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt: "Letras bagunçadas",
      audioSource: require("../../../../../mp3/IC/A0-A1/A29S7.mp3"),
      audioDurationMs: 1200,
      letters: ["E", "B", "W"],
      correctWord: "WEB",
      successTitle: "Correto",
      successMessage: 'A sequência correta ? "WEB".',
    },
  },
  {
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction: "Desafio final! Soletre para o Camaleão a sigla: B - V - P.",
      helperText:
        "Cheque se você diferenciou bem a explosão do P e o motorzinho do V!",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "b? - v? - p?",
      recordLabel: "Speak",
      stopLabel: "Parar",
      playLabel: "Ouvir",
      pauseLabel: "Pausar",
      rerecordLabel: "Regravar",
      submitLabel: "Enviar áudio",
      successTitle: "Correto",
      successMessage: 'Resposta esperada: "b? - v? - p?".',
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
