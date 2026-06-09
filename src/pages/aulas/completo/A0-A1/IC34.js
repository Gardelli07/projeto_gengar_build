import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise17",
    activity: {
      label: "20-100",
      content: [
        ICA1.A34S1,
        "Estamos em órbita! Para navegar por aqui, você precisa das dezenas. Consegue ouvir a diferença entre um jovem teen e um general twenty?",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A34S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A34S2.mp3"),
      audioDurationMs: 9000,
      answerOptions: ["100 a 20", "20 a 100"],
      correctOption: "20 a 100",
      successTitle: "Correto",
      feedbackMessage: "O áudio apresenta as dezenas de 20 até 100.",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A34S3,
      audioSource: require("../../../../../mp3/IC/A0-A1/A34S3.mp3"),
      audioDurationMs: 900,
      answerOptions: ["13", "30"],
      correctOption: "30",
      successTitle: "Correto",
      feedbackMessage: '"Thirty" representa o número 30.',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A34S4,
      audioSource: require("../../../../../mp3/IC/A0-A1/A34S4.mp3"),
      audioDurationMs: 900,
      answerOptions: ["15", "50"],
      correctOption: "50",
      successTitle: "Correto",
      feedbackMessage: '"Fifty" representa o número 50.',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A34S4,
      audioSource: require("../../../../../mp3/IC/A0-A1/A34S5.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["1000", "100"],
      correctOption: "100",
      successTitle: "Correto",
      feedbackMessage: '"One hundred" representa o número 100.',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Confira o seu radar para não errar a altitude:",
        "20 - Twenty - tu-ân-ti",
        "30 - Thirty - târ-ti",
        "40 - Forty - fâr-ti",
        "50 - Fifty - fif-ti",
        "60 - Sixty - siks-ti",
        "70 - Seventy - s?-ven-ti",
        "80 - Eighty - eit-ti",
        "90 - Ninety - náin-ti",
        "100 - One Hundred - uân rân-dred",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Dica de Mestre:",
        "13 (Thir-TEEN): o som sobe e estica no final.",
        "30 (THIR-ty): o som é forte no começo e morre rápido no final.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise1",
    activity: {
      prompt: "Conectar",
      pairs: [
        { en: "Forty", pt: "40" },
        { en: "Eighty", pt: "80" },
        { en: "Sixty", pt: "60" },
        { en: "One Hundred", pt: "100" },
      ],
      successTitle: "Excelente",
      successMessage: "Forty = 40, Eighty = 80, Sixty = 60, One Hundred = 100.",
    },
  },
  {
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt: "Letras embaralhadas",
      image: ICA1.A34S4,
      audioSource: require("../../../../../mp3/IC/A0-A1/A34S9.mp3"),
      audioDurationMs: 1000,
      letters: ["F", "I", "F", "T", "Y"],
      correctWord: "FIFTY",
      successTitle: "Correto",
      successMessage: 'A palavra correta é "FIFTY".',
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Como escrevemos o número 25 no painel? Dica: use o hífen!",
      words: ["five", "Twenty", "-"],
      correctOrder: ["Twenty", "-", "five"],
      successTitle: "Correto",
      successMessage: 'A forma correta é "Twenty-five."',
    },
  },
  {
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction: "Relatório final! Grave sua voz dizendo: 40, 50 e 60.",
      helperText: "Foque no som seco do -ty.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Forty, fifty, sixty.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      playLabel: "Ouvir",
      pauseLabel: "Pausar",
      rerecordLabel: "Regravar",
      submitLabel: "Enviar áudio",
      successTitle: "Correto",
      successMessage: "Resposta esperada: gravação clara de 40, 50 e 60.",
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
