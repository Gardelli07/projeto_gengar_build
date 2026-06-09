import createLessonScreen from "../../LessonScreen";
import { ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise17",
    activity: {
      label: "What's your name?",
      content: [
        ICA1.A27S1,
        ICA1.A27S1p2,
        "Nomes americanos e britúnicos podem ser parecidos, mas a escrita muda. Você está pronto para ser um mestre da soletração?",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A27S1,
      audioSource: require("../../../../../mp3/IC/A0-A1/A27S2.mp3"),
      audioDurationMs: 1500,
      answerOptions: ["how thaté", "How do you spell thaté"],
      correctOption: "How do you spell thaté",
      successTitle: "Correto",
      feedbackMessage: 'A pergunta correta é "How do you spell thaté".',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Não importa se você está nos EUA ou na Inglaterra, se o nome soar difícil, peça: 'How do you spell thaté'.",
        "Dica Cultural: Britúnicos costumam ser muito formais e educados, então eles vão adorar te ajudar se você perguntar com um sorriso!",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A27S1,
      audioSource: require("../../../../../mp3/IC/A0-A1/A27S4.mp3"),
      audioDurationMs: 2200,
      answerOptions: ["Jaxon", "Jackson"],
      correctOption: "Jackson",
      successTitle: "Correto",
      feedbackMessage: 'A soletração correta forma "Jackson".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Qual foi a última letra dita pelo hàspede?",
      image: ICA1.A27S1p2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A27S5.mp3"),
      audioDurationMs: 3200,
      answerOptions: ["I", "E"],
      correctOption: "E",
      successTitle: "Correto",
      feedbackMessage: 'A última letra dita foi "E".',
    },
  },
  {
    component: "Exercise1",
    activity: {
      prompt: "Conecte nomes às soletrações",
      pairs: [
        { en: "Sarah (US)", pt: "às-ái-âr-ái-itch" },
        { en: "Oliver (UK)", pt: "áu-ál-ái-v?-?-âr" },
        { en: "Hermione (UK)", pt: "itch-?-âr-âm-ái-áu-ân-?" },
      ],
      successTitle: "Excelente",
      successMessage:
        "Sarah = às-ái-âr-ái-itch, Oliver = áu-ál-ái-v?-?-âr, Hermione = itch-?-âr-âm-ái-áu-ân-?.",
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt:
        "Você precisa perguntar o sobrenome (last name) de um americano chamado Mr. Smith.",
      words: ["spell", "last", "do", "How", "your", "you", "name?"],
      correctOrder: ["How", "do", "you", "spell", "your", "last", "name?"],
      successTitle: "Correto",
      successMessage: 'A frase correta é "How do you spell your last name?"',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Cuidado com a letra Z!",
        "Nos EUA, eles dizem: ZEE (rima com 'E').",
        "No Reino Unido, eles dizem: ZED.",
        "Se você ouvir 'Zed', já sabe que está falando com um britúnico!",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction:
        "Imagine que você é um barista no Starbucks em Nova York.",
      helperText:
        "Pergunte ao cliente: 'What's your name?' e depois peça para ele soletrar: 'How do you spell thaté'.",
      image: ICA1.A27S9,
      tipButtonLabel: "Tip",
      tipText: "What's your name? / How do you spell thaté",
      recordLabel: "Speak",
      stopLabel: "Parar",
      playLabel: "Ouvir",
      pauseLabel: "Pausar",
      rerecordLabel: "Regravar",
      submitLabel: "Enviar áudio",
      successTitle: "Correto",
      successMessage:
        "Resposta esperada: as duas perguntas com entonação natural.",
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
