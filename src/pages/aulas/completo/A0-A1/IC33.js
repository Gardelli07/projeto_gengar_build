import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise17",
    activity: {
      label: "11-20",
      content: [
        ICA1.A33S1,
        "Atenção, comandante! Os números agora ganharam um novo código. Você consegue dominar os rebeldes 11 e 12 e os jovens Teens?",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A33S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A33S2.mp3"),
      audioDurationMs: 10000,
      answerOptions: ["11 a 20", "20 a 11"],
      correctOption: "11 a 20",
      successTitle: "Correto",
      feedbackMessage: "O áudio apresenta a sequência de 11 até 20.",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A33S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A33S3.mp3"),
      audioDurationMs: 950,
      answerOptions: ["twelve", "eleven"],
      correctOption: "eleven",
      successTitle: "Correto",
      feedbackMessage: '"Eleven" corresponde ao número 11.',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A33S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A33S4.mp3"),
      audioDurationMs: 950,
      answerOptions: ["Eleven", "Twelve"],
      correctOption: "Twelve",
      successTitle: "Correto",
      feedbackMessage: '"Twelve" corresponde ao número 12.',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A33S2,
      audioText: "Thirteen",
      audioDurationMs: 1000,
      answerOptions: ["13", "3"],
      correctOption: "13",
      successTitle: "Correto",
      feedbackMessage:
        "Thirteen tem o som forte no final e representa o número 13.",
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "O 11 e o 12 são rebeldes, com nomes únicos. Do 13 ao 19, todos terminam em TEEN:",
        "11 - Eleven - i-l?-ven",
        "12 - Twelve - tu-ál-v",
        "13 - Thirteen - târ-tân",
        "14 - Fourteen - fâr-tân",
        "15 - Fifteen - fif-tân",
        "16 - Sixteen - siks-tân",
        "17 - Seventeen - s?-ven-tân",
        "18 - Eighteen - eit-tân",
        "19 - Nineteen - náin-tân",
        "20 - Twenty - tu-ân-ti",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Curiosidade Espacial: a palavra Teenager vem justamente desses números.",
        "é a fase da vida que vai do thirteen ao nineteen!",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise1",
    activity: {
      prompt: "Conectar",
      pairs: [
        { en: "Eleven", pt: "11" },
        { en: "Twelve", pt: "12" },
        { en: "Fifteen", pt: "15" },
        { en: "Twenty", pt: "20" },
      ],
      successTitle: "Excelente",
      successMessage: "Eleven = 11, Twelve = 12, Fifteen = 15, Twenty = 20.",
    },
  },
  {
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt: "Letras embaralhadas",
      image: ICA1.A33S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A33S9.mp3"),
      audioDurationMs: 1000,
      letters: ["E", "T", "W", "E", "L", "V"],
      correctWord: "TWELVE",
      successTitle: "Correto",
      successMessage: 'A palavra correta é "TWELVE".',
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Complete a ordem de ignição dos motores.",
      words: ["Eighteen,", "Seventeen,", "Nineteen"],
      correctOrder: ["Seventeen,", "Eighteen,", "Nineteen"],
      successTitle: "Correto",
      successMessage: 'A sequência correta ? "Seventeen, Eighteen, Nineteen."',
    },
  },
  {
    component: "Exercise11",
    activity: {
      prompt: "Mensagem recebida da Terra! Digite o número que você ouvir!",
      title: "Digite rápido",
      placeholder: "Digite aqui",
      secondsPerWord: 5,
      words: ["Eleven"],
      successTitle: "Correto",
      successMessage: 'A resposta esperada ? "11" ou "Eleven".',
    },
  },
  {
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction:
        "Grave o relatório de altitude: Conte do 11 até o 20 sem errar os Teens!",
      helperText: "Faça a sequência completa com clareza.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "Eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      playLabel: "Ouvir",
      pauseLabel: "Pausar",
      rerecordLabel: "Regravar",
      submitLabel: "Enviar áudio",
      successTitle: "Correto",
      successMessage: "Resposta esperada: gravação da sequência completa.",
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
