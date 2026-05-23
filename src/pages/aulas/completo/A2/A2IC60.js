import createA2LessonScreen from "./A2LessonScreen";
import { ICA2 } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic60s1",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 8 • AULA 60",
      content: [
        "/blue{Drugstore}",
        "/blue{David na Farmácia}",
        "David não está se sentindo nada bem.",
        "Observe como ele pede as coisas e como o farmacêutico explica a dosagem.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic60s2",
    component: "Exercise8",
    activity: {
      prompt: "David is entering this place. Where is he?",
      image: ICA2.A60S2,
      options: ["Gym", "Pharmacy", "Library"],
      correctAnswer: "Pharmacy",
      successMessage: "Também é comum ouvir drugstore ou chemist's.",
    },
  },
  {
    key: "a2ic60s3",
    component: "Exercise3",
    activity: {
      prompt: "Ouça e responda verdadeiro ou falso.",
      image: ICA2.A60S3,
      audioSource: require("../../../../../mp3/IC/A2/A60S3.mp3"),
      textOnScreen:
        "O cliente quer comprar remédio para dor de cabeça sem receita.",
      options: ["true", "false"],
      correctAnswer: "true",
      successMessage: "OTC painkillers são analgésicos sem receita.",
      feedbackMessage: "Ele pede OTC painkillers para headache.",
    },
  },
  {
    key: "a2ic60s4",
    component: "Exercise3",
    activity: {
      prompt: "Ouça e responda.",
      image: ICA2.A60S4,
      audioSource: require("../../../../../mp3/IC/A2/A60S4.mp3"),
      textOnScreen: "Ele não quer comprimidos.",
      options: ["true", "false"],
      correctAnswer: "false",
      successMessage: "Ele escolhe tablets, ou seja, comprimidos.",
      feedbackMessage: "Tablet significa comprimido.",
    },
  },
  {
    key: "a2ic60s5",
    component: "Exercise3",
    activity: {
      prompt: "Ouça e responda.",
      image: ICA2.A60S5,
      audioSource: require("../../../../../mp3/IC/A2/A60S5.mp3"),
      textOnScreen: "Ele pegou a receita com o farmacêutico.",
      options: ["true", "false"],
      correctAnswer: "false",
      successMessage: "Ele entregou a receita ao farmacêutico.",
      feedbackMessage: "He has this prescription for an antibiotic.",
    },
  },
  {
    key: "a2ic60s6",
    component: "Exercise3",
    activity: {
      prompt: "Ouça a dosagem.",
      image: ICA2.A60S6,
      audioSource: require("../../../../../mp3/IC/A2/A60S6.mp3"),
      textOnScreen: "É para tomar a cada 8 horas.",
      options: ["true", "false"],
      correctAnswer: "true",
      successMessage: "Every 8 hours = a cada 8 horas.",
      feedbackMessage: "O farmacêutico disse every 8 hours.",
    },
  },
  {
    key: "a2ic60s7",
    component: "Exercise13",
    activity: {
      prompt: "David precisa pagar. Escreva a palavra para dinheiro/pagamento:",
      audioSource: require("../../../../../mp3/IC/A2/A60S7.mp3"),
      letters: ["C", "A", "S", "H"],
      correctWord: "CASH",
      successMessage: "Cash significa dinheiro em espécie.",
    },
  },
  {
    key: "a2ic60s8",
    component: "Exercise17",
    activity: {
      label: "David's Shopping List",
      content: [
        "David goes to the pharmacy. He buys a blister pack of tablets for his headache. These are OTC medicines.",
        "He also gives a prescription to the pharmacist to get his antibiotics.",
        "The pharmacist says: 'Take your pills every 8 hours'. David pays and goes home to rest.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic60s9",
    component: "Exercise12",
    activity: {
      prompt: "Imagine que você está na farmácia.",
      instruction:
        "Você tem dor de estômago e quer uma pomada para as costas. Escreva 2 frases pedindo esses itens ao farmacêutico.",
      correctAnswer:
        "I have a stomachache. Do you have any pills for that? I also need an ointment for my back.",
      successMessage: "Pedido na farmácia registrado!",
    },
  },
  {
    key: "a2ic60s10",
    component: "Exercise17",
    activity: {
      label: "Final",
      content: [
        "/blue{Atendimento Finalizado!}",
        "Você sobreviveu à farmácia em inglês.",
        "Agora sabe pedir remédios OTC, entregar uma prescription e entender blister pack e tablet.",
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
