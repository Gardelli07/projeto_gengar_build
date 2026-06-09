import createLessonScreen from "../../LessonScreen";
import { ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise17",
    activity: {
      label: "O Mestre da Soletração",
      content: [
        ICA1.A30S1,
        "Você desbloqueou todos os sons do alfabeto. Consegue identificar cada um no meio da confusão?",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A30S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A30S2.mp3"),
      audioDurationMs: 900,
      answerOptions: ["A", "E", "I"],
      correctOption: "I",
      successTitle: "Correto",
      feedbackMessage: 'O som ouvido foi da letra "I".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A30S3,
      audioSource: require("../../../../../mp3/IC/A0-A1/A30S3.mp3"),
      audioDurationMs: 900,
      answerOptions: ["G", "J"],
      correctOption: "J",
      successTitle: "Correto",
      feedbackMessage: 'O som ouvido foi da letra "J".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A30S4,
      audioSource: require("../../../../../mp3/IC/A0-A1/A30S4.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["V", "W"],
      correctOption: "W",
      successTitle: "Correto",
      feedbackMessage: 'O som ouvido foi da letra "W".',
    },
  },
  {
    component: "Exercise1",
    activity: {
      prompt: "Conecte Símbolos",
      pairs: [
        { en: "@", pt: "At" },
        { en: ".", pt: "Dot" },
        { en: "_", pt: "Underscore" },
      ],
      successTitle: "Excelente",
      successMessage: "@ = At, . = Dot, _ = Underscore.",
    },
  },
  {
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt: "Letras bagunçadas",
      audioSource: require("../../../../../mp3/IC/A0-A1/A30S6.mp3"),
      audioDurationMs: 1200,
      letters: ["E", "L", "I", "A", "M"],
      correctWord: "EMAIL",
      successTitle: "Correto",
      successMessage: 'A palavra correta é "EMAIL".',
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt:
        "Você não entendeu o nome de um americano. Peça para ele soletrar.",
      words: ["do", "you", "spell", "How", "thaté"],
      correctOrder: ["How", "do", "you", "spell", "thaté"],
      successTitle: "Correto",
      successMessage: 'A frase correta é "How do you spell thaté"',
    },
  },
  {
    component: "Exercise11",
    activity: {
      prompt: "O Camaleão vai ditar uma sigla técnica. Digite rápido!",
      title: "Digite rápido",
      placeholder: "Digite aqui",
      secondsPerWord: 8,
      words: ["BPV"],
      successTitle: "Correto",
      successMessage: "Você digitou BPV no tempo certo.",
    },
  },
  {
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction:
        "Prove que você é um mestre! Soletre o nome do nosso app para o Camaleão: L - I - N - G - U - E - T - O.",
      helperText: "Diga cada letra com a pronúncia correta.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "ál-ái-ân-Djii-I?-Ii-Tii-áu",
      recordLabel: "Speak",
      stopLabel: "Parar",
      playLabel: "Ouvir",
      pauseLabel: "Pausar",
      rerecordLabel: "Regravar",
      submitLabel: "Enviar áudio",
      successTitle: "Correto",
      successMessage:
        "Resposta esperada: cada letra de LINGUETO com a pronúncia correta.",
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
