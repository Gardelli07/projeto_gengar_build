import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise17",
    activity: {
      label: "My name's / I'm",
      content: [
        ICA1.A39S1,
        "O primeiro passo para conectar-se com alguém é dizer quem você é. Vamos aprender as duas formas mais comuns de fazer isso!",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Como Anna respondeu à apresentação de David?",
      image: ICA1.A39S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A39S2.mp3"),
      audioDurationMs: 3500,
      answerOptions: ["I am David", "My name is Anna"],
      correctOption: "My name is Anna",
      successTitle: "Correto",
      feedbackMessage: 'Anna respondeu: "My name is Anna."',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Existem duas formas principais de se apresentar:",
        "I'm...: é a forma mais curta e usada em situações informais ou rápidas. é a contração de I am.",
        "My name is...: é um pouco mais formal e muito clara.",
        "Dica Fonética: ao dizer I'm, feche bem os lábios no som do m para soar natural!",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Você está em uma conferência e quer se apresentar como Robert.",
      words: ["Robert.", "name", "is", "My"],
      correctOrder: ["My", "name", "is", "Robert."],
      successTitle: "Correto",
      successMessage: 'A frase correta é "My name is Robert."',
    },
  },
  {
    component: "Exercise4",
    activity: {
      prompt: "Frase errada vs. correta",
      image: ICA1.A39S5,
      wrongSentence:
        'Um erro comum é tentar traduzir literalmente "Eu me chamo...".',
      options: ["I call me Sarah.", "I'm Sarah."],
      correctAnswer: "I'm Sarah.",
      successTitle: "Correto",
      successMessage: 'Em inglês, usamos "I am" ou "My name is": "I\'m Sarah."',
    },
  },
  {
    component: "Exercise7",
    activity: {
      prompt: "Coloque as falas na ordem correta para formar uma apresentação.",
      options: ["Hi! My name is Chris.", "Hello! I'm Alex."],
      correctOrder: ["Hello! I'm Alex.", "Hi! My name is Chris."],
      successTitle: "Correto",
      successMessage:
        'A ordem correta é: "Hello! I\'m Alex." e depois "Hi! My name is Chris."',
    },
  },
  {
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction:
        "Agora é sua vez! Imagine que você acabou de encontrar um novo colega. Ele diz: Hello! I'm John.",
      helperText:
        "Responda apresentando-se usando a forma que você preferir: I'm ou My name is.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Hi John! I'm [Nome]. / Hi John! My name is [Nome].",
      recordLabel: "Speak",
      stopLabel: "Parar",
      playLabel: "Ouvir",
      pauseLabel: "Pausar",
      rerecordLabel: "Regravar",
      submitLabel: "Enviar áudio",
      successTitle: "Correto",
      successMessage:
        'Resposta esperada: "Hi John! I\'m [Nome]." ou "Hi John! My name is [Nome]."',
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
