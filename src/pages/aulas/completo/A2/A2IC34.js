import createA2LessonScreen from "./A2LessonScreen";
import { ICA2, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic34s1",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 3 • AULA 34",
      content: [
        "/blue{Where can I...?}",
        "/blue{O Segredo dos Locais!}",
        'Para descobrir os melhores segredos de uma cidade, usamos: "What\'s the best place to..." + verbo.',
        "Exemplo: What's the best place to eat pizza?",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic34s2",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha.",
      image: ICA2.A34S2,
      audioSource: require("../../../../../mp3/IC/A2/A34S2.mp3"),
      options: ["Eat", "It"],
      correctAnswer: "Eat",
      correctOption: "Eat",
      feedbackMessage: "Eat significa comer.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic34s3",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha.",
      image: ICA2.A34S3,
      audioSource: require("../../../../../mp3/IC/A2/A34S3.mp3"),
      options: ["Bye", "Buy"],
      correctAnswer: "Buy",
      correctOption: "Buy",
      feedbackMessage: "Buy significa comprar.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic34s4",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha.",
      image: ICA2.A34S4,
      audioSource: require("../../../../../mp3/IC/A2/A34S4.mp3"),
      options: ["See the sunset", "See the sunrise"],
      correctAnswer: "See the sunset",
      correctOption: "See the sunset",
      feedbackMessage: "See the sunset significa ver o pôr do sol.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic34s5",
    component: "Exercise2",
    activity: {
      prompt: "Complete o texto.",
      text: "Excuse me! What's the (1) _________ place (2) _________ buy souvenirs around here?",
      blanks: [
        { id: "1", options: ["best", "better"], answer: "best" },
        { id: "2", options: ["to", "for"], answer: "to" },
      ],
      successTitle: "Correto",
      successMessage: "What's the best place to buy souvenirs?",
    },
  },
  {
    key: "a2ic34s6",
    component: "Exercise7",
    activity: {
      prompt: "Organize o diálogo de recomendação.",
      sentences: [
        "You should go to Joe's Pizza. It's delicious!",
        "Thanks! I'll go there tonight.",
        "What's the best place to eat pizza in this city?",
        "Hi! Can I ask for a recommendation?",
      ],
      correctOrder: [
        "Hi! Can I ask for a recommendation?",
        "What's the best place to eat pizza in this city?",
        "You should go to Joe's Pizza. It's delicious!",
        "Thanks! I'll go there tonight.",
      ],
      successTitle: "Correto",
      successMessage: "O diálogo ficou natural.",
    },
  },
  {
    key: "a2ic34s7",
    component: "Exercise18",
    activity: {
      prompt: "O Camaleão quer ver o pôr do sol. Digite a pergunta correta.",
      scrambledWords: [
        "place",
        "to",
        "What's",
        "best",
        "the",
        "sunset",
        "see",
        "the",
        "?",
      ],
      words: [
        "place",
        "to",
        "What's",
        "best",
        "the",
        "sunset",
        "see",
        "the",
        "?",
      ],
      correctAnswer: "What's the best place to see the sunset?",
      successTitle: "Correto",
      successMessage: "What's the best place to see the sunset?",
    },
  },
  {
    key: "a2ic34s8",
    component: "Exercise18",
    activity: {
      prompt: "Pergunte sobre o melhor lugar para relaxar.",
      scrambledWords: ["the", "place", "best", "to", "What's", "relax", "?"],
      words: ["the", "place", "best", "to", "What's", "relax", "?"],
      correctAnswer: "What's the best place to relax?",
      successTitle: "Correto",
      successMessage: "What's the best place to relax?",
    },
  },
  {
    key: "a2ic34s9",
    component: "Exercise19",
    activity: {
      prompt: "Escute o pedido de ajuda e digite.",
      audioSource: require("../../../../../mp3/IC/A2/A34S9.mp3"),
      correctAnswer: "What's the best place to buy a camera?",
      successTitle: "Correto",
      successMessage: "What's the best place to buy a camera?",
    },
  },
  {
    key: "a2ic34s10",
    component: "Exercise19",
    activity: {
      prompt: "Escute a pergunta faminta e digite.",
      audioSource: require("../../../../../mp3/IC/A2/A34S10.mp3"),
      correctAnswer: "What's the best place to eat sushi?",
      successTitle: "Correto",
      successMessage: "What's the best place to eat sushi?",
    },
  },
  {
    key: "a2ic34s11",
    component: "Exercise12",
    activity: {
      prompt: "Pense na sua cidade atual.",
      instruction:
        'Se um turista perguntasse "What\'s the best place to eat?", o que você responderia?',
      correctAnswer: "The best place to eat is downtown.",
      successTitle: "Muito bem!",
      successMessage: "Resposta registrada.",
    },
  },
  {
    key: "a2ic34s12",
    component: "Exercise16",
    activity: {
      prompt: "Gravação de áudio",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      instruction: "Finja que você está em Nova York e grave a pergunta.",
      helperText: "Excuse me, what's the best place to see the city?",
      successTitle: "Muito bem!",
      successMessage: "Seu áudio foi gravado.",
    },
  },
  {
    key: "a2ic34s13",
    component: "Exercise17",
    activity: {
      label: "Final",
      content: [
        "/blue{Guia Turístico Ativado!}",
        'Com essa frase, você nunca mais vai ficar perdido. Lembre-se: o segredo é "to" + verbo.',
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
