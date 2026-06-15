import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise17",
    activity: {
      label: "Phone number",
      content: [
        ICA1.A36S1,
        "Para não ficar isolado no espaço, você precisa passar suas coordenadas de contato. Como dizemos números de telefone em inglês?",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Dica de Ouro: em inglês, nunca agrupamos os números de telefone como noventa e nove.",
        "Dizemos dígito por dígito.",
        "9912 = Nine, nine, one, two.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Códigos Avançados:",
        "O Zero: quase sempre dizemos O em vez de Zero.",
        "Números Iguais: se tivermos 55, dizemos Double Five.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A36S4,
      audioSource: require("../../../../../mp3/IC/A0-A1/A36S4.mp3"),
      audioDurationMs: 1200,
      answerOptions: ["582", "502"],
      correctOption: "502",
      successTitle: "Correto",
      feedbackMessage: '"Five-oh-two" corresponde a 502.',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A36S5,
      audioSource: require("../../../../../mp3/IC/A0-A1/A36S5.mp3"),
      audioDurationMs: 1600,
      answerOptions: ["9771", "9271"],
      correctOption: "9771",
      successTitle: "Correto",
      feedbackMessage: '"Nine-double seven-one" corresponde a 9771.',
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Você quer o contato da central de comando.",
      words: ["phone", "your", "number?", "is", "What"],
      correctOrder: ["What", "is", "your", "phone", "number?"],
      successTitle: "Correto",
      successMessage: 'A frase correta é "What is your phone number?"',
    },
  },
  {
    component: "Exercise1",
    activity: {
      prompt: "Conectar a leitura ao número",
      pairs: [
        { en: "Nine-one-double three", pt: "9133" },
        { en: "Five-oh-nine-two", pt: "5092" },
        { en: "Seven-eight-four-oh", pt: "7840" },
      ],
      successTitle: "Excelente",
      successMessage:
        "Nine-one-double three = 9133, Five-oh-nine-two = 5092, Seven-eight-four-oh = 7840.",
    },
  },
  {
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt: "Letras embaralhadas",
      audioSource: require("../../../../../mp3/IC/A0-A1/A36S8.mp3"),
      audioDurationMs: 1000,
      letters: ["E", "N", "O", "H", "P"],
      correctWord: "PHONE",
      successTitle: "Correto",
      successMessage: 'A palavra correta é "PHONE".',
    },
  },
  {
    component: "Exercise11",
    activity: {
      prompt:
        "A base está ditando o código de resgate! Digite os números que você ouvir!",
      title: "Digite rápido",
      placeholder: "Digite aqui",
      secondsPerWord: 8,
      words: ["88014"],
      successTitle: "Correto",
      successMessage: "A resposta esperada ? 88014.",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A36S10,
      audioSource: require("../../../../../mp3/IC/A0-A1/A36S10.mp3"),
      audioDurationMs: 3200,
      answerOptions: ["What's you phone number?", "What number?"],
      correctOption: "What's you phone number?",
      successTitle: "Correto",
      feedbackMessage: 'A resposta correta é "What\'s your phone number?".',
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Monte a frase",
      words: ["What's", "phone", "your", "number?"],
      correctOrder: ["What's", "your", "phone", "number?"],
      successTitle: "Correto",
      successMessage: 'A frase correta é "What\'s your phone number?"',
    },
  },
  {
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction:
        "O controle da missão pergunta: What is your phone number? Invente um número e soletre dígito por dígito para o Lingueto!",
      helperText: "Diga os números individualmente.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "My number is nine, eight, zero, one, four. / My number is five, oh, two...",
      recordLabel: "Speak",
      stopLabel: "Parar",
      playLabel: "Ouvir",
      pauseLabel: "Pausar",
      rerecordLabel: "Regravar",
      submitLabel: "Enviar áudio",
      successTitle: "Correto",
      successMessage:
        "Resposta esperada: gravação dizendo os números individualmente.",
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
