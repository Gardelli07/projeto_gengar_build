import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `O mundo é feito de contextos. Você está pronto para transitar entre todos eles?`,
        ICA1.A5S1,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A5S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A3S4.mp3"),
      audioDurationMs: 824,
      answerOptions: ["Sup", "Soup"],
      correctOption: "Sup",
      successTitle: "Correto",
      feedbackMessage:
        'Usamos "Sup" como uma forma mais casual de perguntar "What\'s up?"',
    },
  },
  {
    component: "Exercise1",
    activity: {
      prompt: "Encontre a tradução",
      pairs: [
        { en: "Howdy", pt: "E aí (Texas)" },
        { en: "Hey there", pt: "Oi (Amigável)" },
        { en: "Hello", pt: "Olá (Formal)" },
      ],
      successTitle: "Excelente",
      successMessage: "Você acertou todas as traduções.",
    },
  },
  {
    component: "Exercise15",
    activity: {
      prompt: "Clique na imagem e na palavra",
      images: [
        { id: "img1", image: ICA1.A4S6p2 },
        { id: "img2", image: ICA1.A3S5 },
        { id: "img3", image: ICA1.A5S5 },
      ],
      words: [
        { id: "test1", label: "See ya" },
        { id: "test2", label: "Howdy" },
        { id: "test3", label: "Hello" },
      ],
      pairs: [
        { imageId: "img1", wordId: "test1" },
        { imageId: "img2", wordId: "test2" },
        { imageId: "img3", wordId: "test3" },
      ],
      successTitle: "Correto",
      successMessage: "Você formou os três pares corretamente.",
    },
  },
  {
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt: "Escreva a palavra",
      audioSource: require("../../../../../mp3/IC/A0-A1/A5S6.mp3"),
      audioDurationMs: 1000,
      letters: ["W", "H", "A", "T", "S", "U", "P"],
      correctWord: "WHATSUP",
      successTitle: "Correto",
      successMessage: 'A palavra correta é "WHAT\'S UP".',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `Lembre-se da regra de ouro: 
  • Se você começou com 'Hello', feche com 'Goodbye' ou 'Bye'. 
  • Se começou com 'What's up', feche com 'See ya'. 
Mantenha o mesmo tom do início ao fim! `,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise4",
    activity: {
      prompt: "Corrija",
      image: ICA1.A5S8,
      wrongSentence: "Você encontra um amigo e quer saber como ele está.",
      options: ["What's up? Not much.", "A: What's up? B: Not much."],
      correctAnswer: "A: What's up? B: Not much.",
      successTitle: "Correto",
      successMessage:
        'A forma correta é "A: What\'s up? B: Not much.", porque "Not much" é a resposta da outra pessoa.',
    },
  },
  {
    component: "Exercise7",
    activity: {
      prompt: "Monte o diálogo na ordem certa",
      options: [
        "Hi there, I'm Kaique!",
        "Not much, and you?",
        "Hey! What's up?",
        "I'm good! Bye!",
        "See ya!",
      ],
      correctOrder: [
        "Hi there, I'm Kaique!",
        "Hey! What's up?",
        "Not much, and you?",
        "I'm good! Bye!",
        "See ya!",
      ],
      successTitle: "Correto",
      successMessage: "Você colocou o diálogo na ordem certa.",
    },
  },
  {
    component: "Exercise11",
    activity: {
      prompt: "Escreva rápido",
      title: "Escreva a palavra abaixo",
      placeholder: "Digite aqui",
      secondsPerWord: 8,
      words: ["Hello", "Howdy", "Bye", "Sup"],
      successTitle: "Correto",
      successMessage: "Você digitou todas as palavras no tempo certo.",
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `/blue{VOCÊ CONSEGUIU! }
Agora você domina as entradas e saídas sociais. Você não é mais um turista, é um cidadão do mundo! 
No próximo módulo, vamos dar um passo à frente: Identidade. Você vai aprender a dizer quem você ?, de onde vem e o que faz. See you soon!`,
      ],
      continueLabel: "Continuar",
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
