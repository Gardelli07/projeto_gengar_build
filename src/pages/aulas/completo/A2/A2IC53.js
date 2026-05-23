import createA2LessonScreen from "./A2LessonScreen";
import { ICA2 } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic53s1",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 7 • AULA 53",
      content: [
        "/blue{Nice laptop?}",
        "/blue{Suas ferramentas de estudo!}",
        "No Lingueto, usamos a tecnologia a nosso favor. Hoje você vai aprender a nomear o que está na sua frente agora.",
        "Laptop: computador portátil. Charger: carregador. Headphones: fones de ouvido. Screen: tela.",
        "O objetivo de hoje é identificar, escrever e pronunciar corretamente esses nomes.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic53s2",
    component: "Exercise14",
    activity: {
      prompt: "Ouça a frase sobre laptop.",
      image: ICA2.A53S2,
      audioSource: require("../../../../../mp3/IC/A2/A53S2.mp3"),
      options: ["My laptop is new.", "My laptop is old."],
      correctAnswer: "My laptop is new.",
      successMessage: "Laptop é o computador portátil.",
    },
  },
  {
    key: "a2ic53s3",
    component: "Exercise14",
    activity: {
      prompt: "Ouça a pergunta.",
      image: ICA2.A53S3,
      audioSource: require("../../../../../mp3/IC/A2/A53S3.mp3"),
      options: ["Where is the charger?", "Where is the laptop?"],
      correctAnswer: "Where is the charger?",
      successMessage: "Charger significa carregador.",
    },
  },
  {
    key: "a2ic53s4",
    component: "Exercise14",
    activity: {
      prompt: "Ouça a instrução.",
      image: ICA2.A53S4,
      audioSource: require("../../../../../mp3/IC/A2/A53S4.mp3"),
      options: ["Put on your headphones.", "Put on your shoes."],
      correctAnswer: "Put on your headphones.",
      successMessage: "Headphones são fones de ouvido.",
    },
  },
  {
    key: "a2ic53s5",
    component: "Exercise14",
    activity: {
      prompt: "Ouça e escolha.",
      image: ICA2.A53S5,
      audioSource: require("../../../../../mp3/IC/A2/A53S5.mp3"),
      options: ["The screen is bright.", "The screen is light."],
      correctAnswer: "The screen is bright.",
      successMessage: "Screen é tela; bright é brilhante.",
    },
  },
  {
    key: "a2ic53s6",
    component: "Exercise13",
    activity: {
      prompt: "Escreva o nome do objeto que brilha e mostra as imagens:",
      audioSource: require("../../../../../mp3/IC/A2/A53S6.mp3"),
      letters: ["S", "C", "R", "E", "E", "N"],
      correctWord: "SCREEN",
      successMessage: "Screen significa tela.",
    },
  },
  {
    key: "a2ic53s7",
    component: "Exercise13",
    activity: {
      prompt: "Escreva o nome do computador que você leva na mochila:",
      audioSource: require("../../../../../mp3/IC/A2/A53S7.mp3"),
      letters: ["L", "A", "P", "T", "O", "P"],
      correctWord: "LAPTOP",
      successMessage: "Laptop, sem i no final.",
    },
  },
  {
    key: "a2ic53s8",
    component: "Exercise6",
    activity: {
      prompt: "Eu preciso de um carregador novo.",
      words: ["I", "need", "a", "new", "charger", "."],
      correctOrder: ["I", "need", "a", "new", "charger", "."],
      correctAnswer: "I need a new charger.",
      successMessage: "Frase montada com charger.",
    },
  },
  {
    key: "a2ic53s9",
    component: "Exercise5",
    activity: {
      prompt: "O lugar está barulhento! O que você deve usar?",
      image: ICA2.A53S9,
      sentenceStart: "I have to use my",
      sentenceEnd: "to hear the teacher.",
      options: ["headphones", "shoes"],
      correctAnswer: "headphones",
      successMessage: "Use headphones para ouvir melhor.",
    },
  },
  {
    key: "a2ic53s10",
    component: "Exercise17",
    activity: {
      label: "Tech Problems",
      content: [
        "David is in his home office. He wants to start his online class, but his laptop is off.",
        "He looks for his charger and plugs it in. Now, the screen is on!",
        "He puts on his headphones and says: 'Hello, teacher! Can you hear me?'. Everything is working now!",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic53s11",
    component: "Exercise12",
    activity: {
      prompt: "Descreva seu tech setup.",
      instruction:
        "Escreva 4 frases simples usando laptop, charger, headphones e screen.",
      correctAnswer:
        "My laptop is on the desk. My charger is in my bag. My headphones are black. My screen is big.",
      successMessage: "Setup descrito!",
    },
  },
  {
    key: "a2ic53s12",
    component: "Exercise17",
    activity: {
      label: "Final",
      content: [
        "/blue{Hardware Dominado!}",
        "Você agora sabe nomear e pronunciar itens essenciais da rotina digital.",
        "Lembre-se: laptop não tem i no final, e screen começa com som de S.",
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
