import createA2LessonScreen from "./A2LessonScreen";
import { ICA2 } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic57s1",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 8 • AULA 57",
      content: [
        "/blue{Lift your arm!}",
        "/blue{Anatomia Básica}",
        "Hoje vamos aprender cinco partes fundamentais do corpo humano.",
        "Head: cabeça. Stomach: estômago ou barriga. Arm: braço. Leg: perna. Back: costas.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic57s2",
    component: "Exercise14",
    activity: {
      prompt: "Ouça a instrução.",
      image: ICA2.A57S2,
      audioSource: require("../../../../../mp3/IC/A2/A57S2.mp3"),
      options: ["Touch your head.", "Touch your hand."],
      correctAnswer: "Touch your head.",
      successMessage: "Head é a cabeça.",
    },
  },
  {
    key: "a2ic57s3",
    component: "Exercise14",
    activity: {
      prompt: "Ouça e escolha.",
      image: ICA2.A57S3,
      audioSource: require("../../../../../mp3/IC/A2/A57S3.mp3"),
      options: ["My stomach is fool.", "My stomach is full."],
      correctAnswer: "My stomach is full.",
      successMessage:
        "Stomach pode ser o órgão interno ou a região da barriga.",
    },
  },
  {
    key: "a2ic57s4",
    component: "Exercise14",
    activity: {
      prompt: "Ouça a ação.",
      image: ICA2.A57S4,
      audioSource: require("../../../../../mp3/IC/A2/A57S4.mp3"),
      options: ["Lift your arm.", "Left your arm."],
      correctAnswer: "Lift your arm.",
      successMessage: "Arm vai do ombro até o pulso.",
    },
  },
  {
    key: "a2ic57s5",
    component: "Exercise14",
    activity: {
      prompt: "Ouça a frase.",
      image: ICA2.A57S5,
      audioSource: require("../../../../../mp3/IC/A2/A57S5.mp3"),
      options: ["He has long legs.", "He has long arms."],
      correctAnswer: "He has long legs.",
      successMessage: "Legs são as pernas.",
    },
  },
  {
    key: "a2ic57s6",
    component: "Exercise14",
    activity: {
      prompt: "Ouça e escolha.",
      image: ICA2.A57S6,
      audioSource: require("../../../../../mp3/IC/A2/A57S6.mp3"),
      options: ["My back hurts.", "My back hearts."],
      correctAnswer: "My back hurts.",
      successMessage: "Back é a região das costas.",
    },
  },
  {
    key: "a2ic57s7",
    component: "Exercise8",
    activity: {
      prompt: "Qual destas palavras NÃO faz parte do corpo humano?",
      options: ["Leg", "Arm", "Laptop", "Back"],
      correctAnswer: "Laptop",
      successMessage: "Laptop é hardware; as outras são partes do corpo.",
    },
  },
  {
    key: "a2ic57s8",
    component: "Exercise13",
    activity: {
      prompt: "Escreva o nome da parte do corpo onde a comida vai:",
      audioSource: require("../../../../../mp3/IC/A2/A57S8.mp3"),
      letters: ["S", "T", "O", "M", "A", "C", "H"],
      correctWord: "STOMACH",
      successMessage: "Stomach significa estômago.",
    },
  },
  {
    key: "a2ic57s9",
    component: "Exercise1",
    activity: {
      prompt: "Associe a parte do corpo à ação correspondente:",
      pairs: [
        { en: "Leg", pt: "To walk and run" },
        { en: "Arm", pt: "To carry a heavy bag" },
        { en: "Head", pt: "To wear a hat" },
      ],
      successMessage: "Partes do corpo associadas corretamente.",
    },
  },
  {
    key: "a2ic57s10",
    component: "Exercise3",
    activity: {
      prompt: "Responda verdadeiro ou falso.",
      image: ICA2.A57S10,
      audioSource: require("../../../../../mp3/IC/A2/A57S10.mp3"),
      textOnScreen: "Your back is on the front of your body.",
      options: ["true", "false"],
      correctAnswer: "false",
      successMessage: "Back são as costas, na parte de trás do corpo.",
      feedbackMessage: "A parte da frente é o chest.",
    },
  },
  {
    key: "a2ic57s11",
    component: "Exercise6",
    activity: {
      prompt: "Eu tenho dois braços e duas pernas.",
      words: ["I", "have", "two arms", "and", "two legs", "."],
      correctOrder: ["I", "have", "two arms", "and", "two legs", "."],
      correctAnswer: "I have two arms and two legs.",
      successMessage: "Frase corporal completa.",
    },
  },
  {
    key: "a2ic57s12",
    component: "Exercise5",
    activity: {
      prompt: "David jogou muito futebol hoje.",
      sentenceStart: "David is tired. His",
      sentenceEnd: "are very sore from running.",
      options: ["legs", "head"],
      correctAnswer: "legs",
      successMessage: "Running deixa as legs doloridas.",
    },
  },
  {
    key: "a2ic57s13",
    component: "Exercise17",
    activity: {
      label: "David at the Gym",
      content: [
        "David is at the gym today. He is working out his arms and his legs. He feels strong!",
        "But after one hour, his back starts to ache. He sits down and rubs his stomach because he is hungry.",
        "He shakes his head and says: 'I need to go home and rest!'.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic57s14",
    component: "Exercise12",
    activity: {
      prompt: "Desenhe um monstro na sua mente.",
      instruction:
        "Escreva 3 frases em inglês descrevendo o corpo dele usando as palavras da aula.",
      correctAnswer:
        "My monster has four arms and three legs. His head is very big. His back is green.",
      successMessage: "Monstro descrito!",
    },
  },
  {
    key: "a2ic57s15",
    component: "Exercise17",
    activity: {
      label: "Final",
      content: [
        "/blue{Corpo e Mente em Dia!}",
        "Você aprendeu as partes principais do corpo: head, stomach, arm, leg e back.",
        "Agora já pode dizer ao médico ou ao treinador exatamente onde dói ou o que quer treinar.",
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
