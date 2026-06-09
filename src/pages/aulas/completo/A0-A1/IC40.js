import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise17",
    activity: {
      label: "What's your name?",
      content: [
        ICA1.A40S1,
        "Você já se apresentou, mas e agoraí Vamos aprender a perguntar o nome da outra pessoa e mostrar que foi um prazer conhecê-la!",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A40S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A40S2.mp3"),
      audioDurationMs: 5500,
      answerOptions: ["Nice to meet you", "Nice to meet you too"],
      correctOption: "Nice to meet you too",
      successTitle: "Correto",
      feedbackMessage: 'A Pessoa A retribuiu dizendo: "Nice to meet you too."',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A40S3,
      audioSource: require("../../../../../mp3/IC/A0-A1/A40S3.mp3"),
      audioDurationMs: 1500,
      answerOptions: ["Quantos anos você tem?", "Como é o seu nome?"],
      correctOption: "Como é o seu nome?",
      successTitle: "Correto",
      feedbackMessage: '"What\'s your name?" pergunta o nome da pessoa.',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Dica Técnica: What's é a contração de What is.",
        "Na fala natural, quase ninguém diz a forma completa.",
        "Pratique o som do s no final: uót-s!",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A40S5,
      audioSource: require("../../../../../mp3/IC/A0-A1/A40S5.mp3"),
      audioDurationMs: 1600,
      answerOptions: ["Que bom te ver", "Prazer em conhec?-lo(la)"],
      correctOption: "Prazer em conhec?-lo(la)",
      successTitle: "Correto",
      feedbackMessage:
        '"Nice to meet you" significa "Prazer em conhec?-lo(la)".',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Dica Cultural: quando alguém diz Nice to meet you, a resposta automática e educada é adicionar o too no final.",
        "Pessoa A: Nice to meet you.",
        "Pessoa B: Nice to meet you too.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Você quer saber o nome do novo professor.",
      words: ["name?", "your", "What's"],
      correctOrder: ["What's", "your", "name?"],
      successTitle: "Correto",
      successMessage: 'A frase correta é "What\'s your name?"',
    },
  },
  {
    component: "Exercise1",
    activity: {
      prompt: "Conectar Pergunta e Resposta",
      pairs: [
        { en: "What's your name?", pt: "I'm Carlos." },
        { en: "Nice to meet you.", pt: "Nice to meet you too." },
      ],
      successTitle: "Excelente",
      successMessage:
        "What's your name? = I'm Carlos. | Nice to meet you. = Nice to meet you too.",
    },
  },
  {
    component: "Exercise7",
    activity: {
      prompt: "Coloque as falas na ordem lógica de uma conversa real.",
      options: [
        "Nice to meet you, Anna!",
        "Hi! I'm Tom. What's your name?",
        "My name is Anna. Nice to meet you.",
      ],
      correctOrder: [
        "Hi! I'm Tom. What's your name?",
        "My name is Anna. Nice to meet you.",
        "Nice to meet you, Anna!",
      ],
      successTitle: "Correto",
      successMessage:
        'A ordem correta é: "Hi! I\'m Tom. What\'s your name?", "My name is Anna. Nice to meet you." e "Nice to meet you, Anna!".',
    },
  },
  {
    component: "Exercise4",
    activity: {
      prompt: "Frase errada vs. correta",
      image: ICA1.A40S10,
      wrongSentence:
        'Brasileiros costumam dizer "Much pleasure". Isso não soa natural em inglês.',
      options: ["Much pleasure to meet you.", "Nice to meet you."],
      correctAnswer: "Nice to meet you.",
      successTitle: "Correto",
      successMessage: 'A forma natural em inglês ? "Nice to meet you."',
    },
  },
  {
    component: "Exercise11",
    activity: {
      prompt:
        "O tempo está acabando! Digite a resposta curta para: Nice to meet you.",
      title: "Digite rápido",
      placeholder: "Digite aqui",
      secondsPerWord: 8,
      words: ["Nice to meet you too"],
      successTitle: "Correto",
      successMessage:
        'A resposta esperada ? "Nice to meet you too" ou "You too".',
    },
  },
  {
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction:
        "O Camaleão diz: Hello! My name is Lingueto. Nice to meet you!",
      helperText:
        "Responda de forma completa, dizendo seu nome e retribuindo o prazer em conhec?-lo.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Hi Lingueto! My name is [Nome]. Nice to meet you too!",
      recordLabel: "Speak",
      stopLabel: "Parar",
      playLabel: "Ouvir",
      pauseLabel: "Pausar",
      rerecordLabel: "Regravar",
      submitLabel: "Enviar áudio",
      successTitle: "Correto",
      successMessage:
        'Resposta esperada: "Hi Lingueto! My name is [Nome]. Nice to meet you too!"',
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
