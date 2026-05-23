import createA2LessonScreen from "./A2LessonScreen";
import { ICA2 } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic47s1",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 6 • AULA 47",
      content: [
        "/blue{What should I do?}",
        "/blue{Amigo é para essas coisas!}",
        "Mark não está se sentindo muito bem e pediu ajuda para sua amiga Sarah.",
        "Ele vai usar should I...? para perguntar, e ela vai usar you shouldn't... para dizer o que ele deve parar de fazer.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic47s2",
    component: "Exercise13",
    activity: {
      prompt: "Antes de ouvir, escreva a palavra para conselho:",
      audioSource: require("../../../../../mp3/IC/A2/A47S2.mp3"),
      letters: ["A", "D", "V", "I", "C", "E"],
      correctWord: "ADVICE",
      successMessage: "Advice significa conselho.",
    },
  },
  {
    key: "a2ic47s3",
    component: "Exercise3",
    activity: {
      prompt: "Ouça e responda verdadeiro ou falso.",
      image: ICA2.A47S3,
      audioSource: require("../../../../../mp3/IC/A2/A47S3.mp3"),
      textOnScreen: "Mark quer saber o que ele deveria fazer.",
      options: ["true", "false"],
      correctAnswer: "true",
      successMessage: "Ele pergunta: What should I do?",
      feedbackMessage: "A frase fala sobre pedir conselho, não sobre ontem.",
    },
  },
  {
    key: "a2ic47s4",
    component: "Exercise3",
    activity: {
      prompt: "Ouça o primeiro conselho da Sarah.",
      image: ICA2.A47S4,
      audioSource: require("../../../../../mp3/IC/A2/A47S4.mp3"),
      textOnScreen: "Sarah diz que Mark não deveria ir para a cama tão tarde.",
      options: ["true", "false"],
      correctAnswer: "true",
      successMessage: "You shouldn't go to bed so late.",
      feedbackMessage: "Shouldn't indica o que ele deve evitar.",
    },
  },
  {
    key: "a2ic47s5",
    component: "Exercise3",
    activity: {
      prompt: "Ouça e responda.",
      image: ICA2.A47S5,
      audioSource: require("../../../../../mp3/IC/A2/A47S5.mp3"),
      textOnScreen: "Mark deve parar de beber tanto refrigerante.",
      options: ["true", "false"],
      correctAnswer: "true",
      successMessage: "Sarah recomenda água e diz para evitar soda.",
      feedbackMessage: "O conselho negativo é sobre refrigerante.",
    },
  },
  {
    key: "a2ic47s6",
    component: "Exercise6",
    activity: {
      prompt: "O que a Sarah disse sobre o sono?",
      words: ["You", "shouldn't", "go to bed", "so late", "."],
      correctOrder: ["You", "shouldn't", "go to bed", "so late", "."],
      correctAnswer: "You shouldn't go to bed so late.",
      successMessage: "Ótimo conselho negativo.",
    },
  },
  {
    key: "a2ic47s7",
    component: "Exercise6",
    activity: {
      prompt: "Organize o conselho sobre a bebida:",
      words: ["You", "should", "drink", "more", "water"],
      correctOrder: ["You", "should", "drink", "more", "water"],
      correctAnswer: "You should drink more water",
      successMessage: "You should drink more water.",
    },
  },
  {
    key: "a2ic47s8",
    component: "Exercise5",
    activity: {
      prompt: "Complete a pergunta do Mark:",
      image: ICA2.A47S8,
      sentenceStart: "",
      sentenceEnd: "I exercise in the morning?",
      options: ["Should", "Shouldn't"],
      correctAnswer: "Should",
      successMessage: "Should I exercise in the morning?",
    },
  },
  {
    key: "a2ic47s9",
    component: "Exercise5",
    activity: {
      prompt: "Sarah acha que Mark trabalha demais:",
      image: ICA2.A47S9,
      sentenceStart: "You",
      sentenceEnd: "work on weekends. It's bad for you.",
      options: ["should", "shouldn't"],
      correctAnswer: "shouldn't",
      successMessage: "You shouldn't work on weekends.",
    },
  },
  {
    key: "a2ic47s10",
    component: "Exercise19",
    activity: {
      prompt: "Escute a dúvida do Mark e digite:",
      audioSource: require("../../../../../mp3/IC/A2/A47S10.mp3"),
      correctAnswer: "What should I do to be healthy?",
      successMessage: "Ditado perfeito!",
    },
  },
  {
    key: "a2ic47s11",
    component: "Exercise12",
    activity: {
      prompt: "O Camaleão está com dor de dente.",
      instruction:
        "Escreva 2 conselhos usando should e shouldn't. Use verbos como go to the dentist e eat candies.",
      correctAnswer: "You should go to the dentist. You shouldn't eat candies.",
      successMessage: "Bons conselhos para dor de dente!",
    },
  },
  {
    key: "a2ic47s12",
    component: "Exercise16",
    activity: {
      prompt: "Grave sua resposta para o Mark:",
      phrase: "You shouldn't worry so much. You should relax!",
      correctAnswer: "You shouldn't worry so much. You should relax!",
      successMessage: "Muito bem!",
    },
  },
  {
    key: "a2ic47s13",
    component: "Exercise17",
    activity: {
      label: "Final",
      content: [
        "/blue{Ouvido Afiado!}",
        "Aprender a ouvir conselhos é o primeiro passo para conseguir dar os seus próprios em inglês.",
        "Na próxima aula, vamos consolidar tudo com Reading & Writing Day.",
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
