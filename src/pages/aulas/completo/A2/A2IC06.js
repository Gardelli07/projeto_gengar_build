import createA2LessonScreen from "./A2LessonScreen";
import { ICA2 } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic06s1",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 1 • AULA 6",
      content: [
        "/blue{Are you studying?}",
        "",
        "No inglês, a pergunta é a ferramenta que transforma um espectador em participante da conversa. Hoje você vai inverter a lógica das frases para investigar o agora com precisão.",
        "",
        "/blue{Tip - O Salto do Verbo BE}",
        "Para perguntar, o verbo BE (am/is/are) assume a primeira posição.",
        "You are working. → Are you working?",
        "What are you doing?",
        "Where is he going?",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic06s2",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Ouça e complete a pergunta",
      image: ICA2.A6S2,
      audioSource: require("../../../../../mp3/IC/A2/A6S2.mp3"),
      audioText: "What are you making for dinner?",
      options: ["are / making", "is / making"],
      correctAnswer: "are / making",
      correctOption: "are / making",
      feedbackMessage: 'A pergunta correta é "What are you making for dinner?"',
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic06s3",
    type: "listenOnly",
    activity: {
      prompt: "Ouça a entonação das perguntas",
      image: ICA2.A6S3,
      audioSource: require("../../../../../mp3/IC/A2/A6S3.mp3"),
      audioText: "Is she dancing? Why are you crying?",
      transcript: "Is she dancing? ... Why are you crying?",
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic06s4",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Leia e responda: verdadeiro ou falso?",
      image: ICA2.A6S4,
      audioText: "Are they studying English now?",
      statement: 'Na pergunta "Are they study English now?", a estrutura está correta.',
      textOnScreen: '"Are they study English now?" está correta.',
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      successMessage: "False. Falta o -ING: Are they studying English now?",
      feedbackMessage: "Depois de are, use verbo com -ING no Present Continuous.",
    },
  },
  {
    key: "a2ic06s5",
    component: "Exercise6",
    activity: {
      prompt: "Monte a pergunta: por que você está correndo?",
      words: ["running?", "you", "are", "Why"],
      correctOrder: ["Why", "are", "you", "running?"],
      successTitle: "Correto",
      successMessage: "Why are you running?",
    },
  },
  {
    key: "a2ic06s6",
    component: "Exercise4",
    activity: {
      prompt: "Você vê seu parente com uma mala saindo de casa.",
      image: ICA2.A6S6,
      wrongSentence: "Qual pergunta faz mais sentido?",
      options: ["What do you do?", "Where are you going?", "Who is she?"],
      correctAnswer: "Where are you going?",
      successTitle: "Correto",
      successMessage: "A mala indica movimento: Where are you going?",
    },
  },
  {
    key: "a2ic06s7",
    component: "Exercise11",
    activity: {
      prompt: "Transforme a afirmação em pergunta rapidamente!",
      title: "Digite a pergunta completa",
      placeholder: "Digite aqui",
      secondsPerWord: 10,
      words: [
        "Are you eating?",
        "Is she working?",
        "Are they playing?",
        "Is he sleeping?",
        "Is it raining?",
      ],
      successTitle: "Correto",
      successMessage: "Você dominou a inversão com am, is e are.",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
