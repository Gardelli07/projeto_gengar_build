import createLessonScreen from "../../LessonScreen";
import { ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise17",
    activity: {
      label: "Time do EE",
      content: [
        ICA1.A24S1,
        "Estas letras são melhores amigas. Todas elas terminam com o mesmo som: um 'ii' longo e sorridente!",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A24S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A24S2.mp3"),
      audioDurationMs: 800,
      answerOptions: ["B", "D"],
      correctOption: "B",
      successTitle: "Correto",
      feedbackMessage: 'A letra correta ? "B".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A24S3,
      audioSource: require("../../../../../mp3/IC/A0-A1/A24S3.mp3"),
      audioDurationMs: 800,
      answerOptions: ["C", "S"],
      correctOption: "C",
      successTitle: "Correto",
      feedbackMessage: 'A letra correta ? "C".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A24S4,
      audioSource: require("../../../../../mp3/IC/A0-A1/A24S4.mp3"),
      audioDurationMs: 800,
      answerOptions: ["D", "T"],
      correctOption: "D",
      successTitle: "Correto",
      feedbackMessage: 'A letra correta ? "D".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A24S5,
      audioSource: require("../../../../../mp3/IC/A0-A1/A24S5.mp3"),
      audioDurationMs: 800,
      answerOptions: ["G", "J"],
      correctOption: "G",
      successTitle: "Correto",
      feedbackMessage: "O G tem som de 'dj', não confunda com o som do J!",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A24S6,
      audioSource: require("../../../../../mp3/IC/A0-A1/A24S6.mp3"),
      audioDurationMs: 800,
      answerOptions: ["P", "B"],
      correctOption: "P",
      successTitle: "Correto",
      feedbackMessage: 'A letra correta ? "P".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A24S7,
      audioSource: require("../../../../../mp3/IC/A0-A1/A24S7.mp3"),
      audioDurationMs: 800,
      answerOptions: ["T", "D"],
      correctOption: "T",
      successTitle: "Correto",
      feedbackMessage: 'A letra correta ? "T".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A24S8,
      audioSource: require("../../../../../mp3/IC/A0-A1/A24S8.mp3"),
      audioDurationMs: 800,
      answerOptions: ["V", "F"],
      correctOption: "V",
      successTitle: "Correto",
      feedbackMessage: 'A letra correta ? "V".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A24S9,
      audioSource: require("../../../../../mp3/IC/A0-A1/A24S9.mp3"),
      audioDurationMs: 800,
      answerOptions: ["Z", "C"],
      correctOption: "Z",
      successTitle: "Correto",
      feedbackMessage: "O Z deve vibrar como uma abelha!",
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        ICA1.A24S10,
        "Para falar qualquer uma dessas letras, estique os lábios como se estivesse tirando uma foto!",
        "B, C, D, G, P, T, V, Z... todos terminam em IIIII.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Cuidado com a pressão!",
        "O B é um som mais relaxado.",
        "O P é um som explosivo, sinta o ar saindo da boca ao dizer P?!",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise1",
    activity: {
      prompt: "Conecte a letra ao seu som",
      pairs: [
        { en: "G", pt: "Djá" },
        { en: "C", pt: "S?" },
        { en: "Z", pt: "Z?" },
        { en: "D", pt: "D?" },
      ],
      successTitle: "Excelente",
      successMessage: "G = Djá, C = S?, Z = Z?, D = D?.",
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Coloque estas letras do time na ordem alfabética correta.",
      words: ["D", "B", "C", "E"],
      correctOrder: ["B", "C", "D", "E"],
      successTitle: "Correto",
      successMessage:
        "A sequência correta ? B, C, D, E. Lembrando que o E também tem o som de ii.",
    },
  },
  {
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction: "Soletre estas duas letras famosas: T - V.",
      helperText: "Grave dizendo o nome das letras em inglês.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "T? - V?",
      recordLabel: "Speak",
      stopLabel: "Parar",
      playLabel: "Ouvir",
      pauseLabel: "Pausar",
      rerecordLabel: "Regravar",
      submitLabel: "Enviar áudio",
      successTitle: "Correto",
      successMessage: 'Resposta esperada: "T? - V?".',
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
