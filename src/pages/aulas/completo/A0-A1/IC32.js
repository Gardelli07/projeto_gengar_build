import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise17",
    activity: {
      label: "0-10",
      content: [
        ICA1.A32S1,
        "Atenção, astronauta! O lançamento depende de uma contagem perfeita. Você está pronto para comandar os motores?",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A32S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A32S2.mp3"),
      audioDurationMs: 8500,
      answerOptions: ["0 a 10", "10 a 0"],
      correctOption: "0 a 10",
      successTitle: "Correto",
      feedbackMessage: "O áudio faz a contagem de zero até dez.",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A32S3,
      audioSource: require("../../../../../mp3/IC/A0-A1/A32S3.mp3"),
      audioDurationMs: 900,
      answerOptions: ["Tree", "Three"],
      correctOption: "Three",
      successTitle: "Correto",
      feedbackMessage: '"Three" é o número 3.',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A32S4,
      audioSource: require("../../../../../mp3/IC/A0-A1/A32S3.mp3"),
      audioDurationMs: 900,
      answerOptions: ["Tree", "Three"],
      correctOption: "Tree",
      successTitle: "Correto",
      feedbackMessage: '"Tree" é árvore.',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Dica: No Lingueto, ensinamos que Tree é árvore e Three é o número 3!",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A32S6,
      audioSource: require("../../../../../mp3/IC/A0-A1/A32S4.mp3"),
      audioDurationMs: 600,
      answerOptions: ["Eight", "Eighty"],
      correctOption: "Eight",
      successTitle: "Correto",
      feedbackMessage: '"Eight" é o número 8.',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Consulte o seu painel sempre que precisar conferir a escrita oficial dos comandos:",
        "0 - Zero / Oh - zí-rou / ôu",
        "1 - One - uán",
        "2 - Two - tú",
        "3 - Three - rrí (com sopro)",
        "4 - Four - fór",
        "5 - Five - fáiv",
        "6 - Six - siks",
        "7 - Seven - sé-ven",
        "8 - Eight - êit",
        "9 - Nine - náin",
        "10 - Ten - tén",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A32S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A32S8.mp3"),
      audioDurationMs: 2500,
      answerOptions: ["9 1 ou 6", "9 1 0 6"],
      correctOption: "9 1 0 6",
      successTitle: "Correto",
      feedbackMessage: "A sequência correta é 9 1 0 6.",
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Dica Técnica: Em códigos, números de telefone ou missões, os nativos costumam dizer O em vez de Zero.",
        "Ex: Sala 101 = One-O-One.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise1",
    activity: {
      prompt: "Conectar",
      pairs: [
        { en: "Six", pt: "6" },
        { en: "Three", pt: "3" },
        { en: "Zero", pt: "0" },
        { en: "Eight", pt: "8" },
      ],
      successTitle: "Excelente",
      successMessage: "Six = 6, Three = 3, Zero = 0, Eight = 8.",
    },
  },
  {
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt: "Letras embaralhadas",
      audioSource: require("../../../../../mp3/IC/A0-A1/A32S11.mp3"),
      audioDurationMs: 1000,
      letters: ["E", "V", "E", "S", "N"],
      correctWord: "SEVEN",
      successTitle: "Correto",
      successMessage: 'A palavra correta é "SEVEN".',
    },
  },
  {
    component: "Exercise11",
    activity: {
      prompt:
        "O foguete vai subir! Complete a contagem regressiva: Three, Two, One...",
      title: "Digite rápido",
      placeholder: "Digite aqui",
      secondsPerWord: 5,
      words: ["Zero"],
      successTitle: "Correto",
      successMessage: 'A resposta esperada ? "Zero" ou "0".',
    },
  },
  {
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction:
        "Grave sua voz contando de 10 até 0 para autorizar a decolagem.",
      helperText: "Faça a sequência regressiva completa.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "Ten, nine, eight, seven, six, five, four, three, two, one, zero.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      playLabel: "Ouvir",
      pauseLabel: "Pausar",
      rerecordLabel: "Regravar",
      submitLabel: "Enviar áudio",
      successTitle: "Correto",
      successMessage:
        "Resposta esperada: gravação da contagem regressiva de 10 até 0.",
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
