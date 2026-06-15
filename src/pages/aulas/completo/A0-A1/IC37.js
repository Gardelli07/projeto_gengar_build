import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise17",
    activity: {
      label: "How much is it?",
      content: [
        ICA1.A37S1,
        "Sobreviver no espaço não é de graça! Como perguntamos o preço das coisas e entendemos o valor em dólares e centavos?",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A37S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A37S2.mp3"),
      audioDurationMs: 1300,
      answerOptions: ["how much is it", "How many is it?"],
      correctOption: "how much is it",
      successTitle: "Correto",
      feedbackMessage: '"How much is it?" é a pergunta para saber o preço.',
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Você quer saber o preço de um capacete novo.",
      words: ["is", "much", "How", "it?"],
      correctOrder: ["How", "much", "is", "it?"],
      successTitle: "Correto",
      successMessage: 'A frase correta é "How much is it?"',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Dica Técnica: existem duas formas de ler preços como $5.50.",
        "Completa: Five dollars and fifty cents.",
        "Rápida, mais comum: Five fifty.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Vocabulário de Câmbio:",
        "$ = Dollar no singular / Dollars no plural.",
        "¢ = Cent no singular / Cents no plural.",
        "Para valores menores que 1 dólar, dizemos apenas os centavos. Ex: 75¢ = Seventy-five cents.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A37S7,
      audioSource: require("../../../../../mp3/IC/A0-A1/A37S6.mp3"),
      audioDurationMs: 1600,
      answerOptions: ["$10.25", "$10.50"],
      correctOption: "$10.25",
      successTitle: "Correto",
      feedbackMessage: '"That\'s ten twenty-five." corresponde a $10.25.',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A37S7,
      audioSource: require("../../../../../mp3/IC/A0-A1/A37S7.mp3"),
      audioDurationMs: 1500,
      answerOptions: ["$0.90", "$0.99"],
      correctOption: "$0.99",
      successTitle: "Correto",
      feedbackMessage: '"It is ninety-nine cents." corresponde a $0.99.',
    },
  },
  {
    component: "Exercise1",
    activity: {
      prompt: "Conectar",
      pairs: [
        { en: "Two dollars", pt: "$2.00" },
        { en: "Twelve fifty", pt: "$12.50" },
        { en: "Fifty cents", pt: "$0.50" },
      ],
      successTitle: "Excelente",
      successMessage:
        "Two dollars = $2.00, Twelve fifty = $12.50, Fifty cents = $0.50.",
    },
  },
  {
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt: "Letras embaralhadas",
      audioSource: require("../../../../../mp3/IC/A0-A1/A37S9.mp3"),
      audioDurationMs: 1000,
      letters: ["L", "A", "R", "D", "O", "L"],
      correctWord: "DOLLAR",
      successTitle: "Correto",
      successMessage: 'A palavra correta é "DOLLAR".',
    },
  },
  {
    component: "Exercise4",
    activity: {
      prompt: "Frase errada vs. correta",
      image: ICA1.A37S10,
      wrongSentence: "Você quer dizer que algo custa 5 dólares.",
      options: ["It is five dollars.", "It has five dollars."],
      correctAnswer: "It is five dollars.",
      successTitle: "Correto",
      successMessage: 'No preço, a coisa "é" o valor: "It is five dollars."',
    },
  },
  {
    component: "Exercise11",
    activity: {
      prompt: "O robô de vendas está esperando! Digite o preço que ele disse!",
      title: "Digite rápido",
      placeholder: "Digite aqui",
      secondsPerWord: 5,
      words: ["40"],
      successTitle: "Correto",
      successMessage: 'A resposta esperada ? "40" ou "$40".',
    },
  },
  {
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction:
        "Imagine que você é o vendedor. O cliente pergunta: How much is it? Aponte para um item de $15.00 e responda em voz alta!",
      helperText: "Responda usando o valor em dólares.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "It is fifteen dollars.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      playLabel: "Ouvir",
      pauseLabel: "Pausar",
      rerecordLabel: "Regravar",
      submitLabel: "Enviar áudio",
      successTitle: "Correto",
      successMessage: 'Resposta esperada: "It is fifteen dollars."',
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
