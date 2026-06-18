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
      feedbackMessage:
        "Correto: head é a cabeça. Touch your head é uma instrução para tocar a cabeça.",
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
      feedbackMessage:
        "Muito bem: stomach pode ser o estômago ou a região da barriga. Full significa cheio.",
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
      feedbackMessage:
        "Boa escuta: arm é o braço, e lift your arm significa levante o braço.",
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
      feedbackMessage:
        "Isso mesmo: legs são as pernas. He has long legs descreve pernas compridas.",
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
      feedbackMessage:
        "Correto: back é a região das costas. My back hurts é usado para dizer que as costas estão doendo.",
    },
  },
  {
    key: "a2ic57s7",
    component: "Exercise8",
    activity: {
      prompt: "Qual destas palavras NÃO faz parte do corpo humano?",
      options: ["Leg", "Arm", "Laptop", "Back"],
      correctAnswer: "Laptop",
      successMessage:
        "Exato: laptop é um aparelho. Leg, arm e back são partes do corpo humano.",
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
      successMessage:
        "Perfeito: stomach significa estômago ou barriga, a parte ligada à comida e à digestão.",
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
      successMessage:
        "Muito bem: leg combina com andar e correr, arm com carregar, e head com usar um chapéu.",
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
      successMessage:
        "Isso mesmo: back são as costas, a parte de trás do corpo.",
      feedbackMessage:
        "Back não fica na frente do corpo; a frente do tronco é chest.",
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
      successMessage:
        "Frase correta: I have two arms and two legs. Arms e legs aparecem no plural porque são duas partes.",
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
      successMessage:
        "Certo: depois de correr muito, as legs podem ficar sore, ou seja, doloridas.",
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
      tipText:
        "My monster has four arms and three legs. His head is very big. His back is green.",
      successMessage:
        "Muito bem: sua descrição usa partes do corpo como arms, legs, head e back para criar uma imagem clara do monstro.",
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
