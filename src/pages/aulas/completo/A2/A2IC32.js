import createA2LessonScreen from "./A2LessonScreen";
import { ICA2 } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic32s1",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 3 • AULA 32",
      content: [
        "/blue{Hotel}",
        "/blue{Conforto em Primeiro Lugar!}",
        'No hotel, você precisa saber frases de necessidade, como "I need an extra bed", e frases de problema, como "The AC isn\'t working".',
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic32s2",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha.",
      image: ICA2.A32S2,
      audioSource: require("../../../../../mp3/IC/A2/A32S2.mp3"),
      options: ["Air conditioning", "Hair conditioning"],
      correctAnswer: "Air conditioning",
      correctOption: "Air conditioning",
      feedbackMessage: "Air conditioning é o ar-condicionado.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic32s3",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha.",
      image: ICA2.A32S3,
      audioSource: require("../../../../../mp3/IC/A2/A32S3.mp3"),
      options: ["Exit bed", "Extra bed"],
      correctAnswer: "Extra bed",
      correctOption: "Extra bed",
      feedbackMessage: "Extra bed significa cama extra.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic32s4",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha.",
      image: ICA2.A32S4,
      audioSource: require("../../../../../mp3/IC/A2/A32S4.mp3"),
      options: ["Towels", "Towers"],
      correctAnswer: "Towels",
      correctOption: "Towels",
      feedbackMessage: "Towels são toalhas.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic32s5",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha.",
      image: ICA2.A32S5,
      audioSource: require("../../../../../mp3/IC/A2/A32S5.mp3"),
      options: ["Hairbrush", "Hairdryer"],
      correctAnswer: "Hairdryer",
      correctOption: "Hairdryer",
      feedbackMessage: "Hairdryer significa secador de cabelo.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic32s6",
    component: "Exercise17",
    activity: {
      label: "Amenidades",
      content: [
        "/blue{Kit de Sobrevivência no Hotel}",
        "AC: ar-condicionado.",
        "Extra bed: cama extra.",
        "Towels: toalhas.",
        "Hairdryer: secador de cabelo.",
        "Remote control: controle remoto.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic32s7",
    component: "Exercise18",
    activity: {
      prompt: "O ar-condicionado parou. Digite a reclamação para a recepção.",
      scrambledWords: ["working", "isn't", "AC", "The", "."],
      words: ["working", "isn't", "AC", "The", "."],
      correctAnswer: "The AC isn't working.",
      successTitle: "Correto",
      successMessage: "The AC isn't working.",
    },
  },
  {
    key: "a2ic32s8",
    component: "Exercise18",
    activity: {
      prompt: "Você precisa de uma cama extra. Digite o pedido.",
      scrambledWords: ["need", "I", "bed", "extra", "an", "."],
      words: ["need", "I", "bed", "extra", "an", "."],
      correctAnswer: "I need an extra bed.",
      successTitle: "Correto",
      successMessage: "I need an extra bed.",
    },
  },
  {
    key: "a2ic32s9",
    component: "Exercise19",
    activity: {
      prompt: "Escute o pedido e digite exatamente o que ouviu.",
      audioSource: require("../../../../../mp3/IC/A2/A32S9.mp3"),
      correctAnswer: "Could I have some fresh towels?",
      successTitle: "Correto",
      successMessage: "Could I have some fresh towels?",
    },
  },
  {
    key: "a2ic32s10",
    component: "Exercise19",
    activity: {
      prompt: "Escute o problema e digite.",
      audioSource: require("../../../../../mp3/IC/A2/A32S10.mp3"),
      correctAnswer: "The remote control is broken.",
      successTitle: "Correto",
      successMessage: "The remote control is broken.",
    },
  },
  {
    key: "a2ic32s11",
    component: "Exercise8",
    activity: {
      prompt: "What is the problem?",
      image: ICA2.A32S11,
      options: ["The bed is small.", "The TV isn't working."],
      correctAnswer: "The TV isn't working.",
      successTitle: "Correto",
      successMessage: "A TV não está funcionando.",
    },
  },
  {
    key: "a2ic32s12",
    component: "Exercise7",
    activity: {
      prompt: "O que você faz quando algo quebra? Ordene a história.",
      sentences: [
        "I call the reception.",
        "I arrive at the hotel room.",
        "The technician fixes the problem.",
        "I notice the hairdryer isn't working.",
      ],
      correctOrder: [
        "I arrive at the hotel room.",
        "I notice the hairdryer isn't working.",
        "I call the reception.",
        "The technician fixes the problem.",
      ],
      successTitle: "Correto",
      successMessage: "Você organizou a solução do problema.",
    },
  },
  {
    key: "a2ic32s13",
    component: "Exercise12",
    activity: {
      prompt: "Escreva uma mensagem curta para o WhatsApp do hotel.",
      instruction:
        'Peça um secador de cabelo e toalhas novas. Use "I need..." ou "Could I have...?"',
      correctAnswer: "Could I have a hairdryer and some fresh towels?",
      successTitle: "Muito bem!",
      successMessage: "Mensagem registrada.",
    },
  },
  {
    key: "a2ic32s14",
    component: "Exercise16",
    activity: {
      prompt: "Gravação de áudio",
      instruction:
        'Grave: "Hello, the AC in my room isn\'t working. Can you help me?"',
      helperText: "Hello, the AC in my room isn't working. Can you help me?",
      successTitle: "Muito bem!",
      successMessage: "Seu áudio foi gravado.",
    },
  },
  {
    key: "a2ic32s15",
    component: "Exercise17",
    activity: {
      label: "Final",
      content: [
        "/blue{Hóspede VIP!}",
        'Agora você já sabe como garantir seu conforto em qualquer hotel. Se algo não estiver certo, use "isn\'t working".',
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
