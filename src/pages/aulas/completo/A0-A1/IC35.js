import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise17",
    activity: {
      label: "How old are you?",
      content: [
        ICA1.A35S1,
        "Para viajar entre as estrelas, precisamos saber quem você é e sua experiência. Como perguntar e responder sua idade?",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Monte a pergunta",
      words: ["are", "old", "How", "you?"],
      correctOrder: ["How", "old", "are", "you?"],
      successTitle: "Correto",
      successMessage: 'A frase correta é "How old are you?"',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "ALERTA DE SEGURANÇA: em português dizemos Eu tenho 20 anos, mas em inglês usamos o verbo TO BE.",
        "Correto: I am 25.",
        "Errado: I have 25.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Como responder de forma completa ou curta:",
        "Completa: I am 30 years old.",
        "Curta: I'm 30.",
        "Terceira pessoa: He is 15. / She is 40.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A35S5,
      audioSource: require("../../../../../mp3/IC/A0-A1/A35S5.mp3"),
      audioDurationMs: 1200,
      answerOptions: ["17", "11"],
      correctOption: "17",
      successTitle: "Correto",
      feedbackMessage: '"I\'m seventeen." indica a idade 17.',
    },
  },
  {
    component: "Exercise4",
    activity: {
      prompt: "Frase errada vs. correta",
      image: ICA1.A35S6,
      wrongSentence: "Alguém pergunta sua idade e você tem 19 anos.",
      options: ["I have 19 years old.", "I am 19 years old."],
      correctAnswer: "I am 19 years old.",
      successTitle: "Correto",
      successMessage: 'Em inglês usamos "I am 19 years old."',
    },
  },
  {
    component: "Exercise1",
    activity: {
      prompt: "Conectar",
      pairs: [
        { en: "How old are you?", pt: "I'm 28." },
        { en: "How old is he?", pt: "He is 12." },
        { en: "How do you spell thaté", pt: "K-A-I-Q-U-E." },
      ],
      successTitle: "Excelente",
      successMessage:
        "How old are you? = I'm 28. | How old is he? = He is 12. | How do you spell thaté = K-A-I-Q-U-E.",
    },
  },
  {
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt: "Letras embaralhadas",
      audioSource: require("../../../../../mp3/IC/A0-A1/A35S8.mp3"),
      audioDurationMs: 1000,
      letters: ["E", "A", "R", "S", "Y"],
      correctWord: "YEARS",
      successTitle: "Correto",
      successMessage: 'A palavra correta é "YEARS".',
    },
  },
  {
    component: "Exercise11",
    activity: {
      prompt: "O sistema está reiniciando! Digite sua idade agora!",
      title: "Digite rápido",
      placeholder: "Digite aqui",
      secondsPerWord: 5,
      words: ["25"],
      successTitle: "Correto",
      successMessage: "Exemplo aceito: 25.",
    },
  },
  {
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction:
        "Relatório final! O controle da missão pergunta: How old are you? Responda com sua idade real usando I am...",
      helperText:
        "Você pode completar com years old ou responder de forma curta.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "I am [número]. / I am [número] years old.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      playLabel: "Ouvir",
      pauseLabel: "Pausar",
      rerecordLabel: "Regravar",
      submitLabel: "Enviar áudio",
      successTitle: "Correto",
      successMessage: 'Resposta esperada: "I am [número] (years old)."',
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
