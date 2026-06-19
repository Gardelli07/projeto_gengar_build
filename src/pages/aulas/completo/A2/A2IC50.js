import createA2LessonScreen from "./A2LessonScreen";
import { ICA2 } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic50s1",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 6 • AULA 50",
      image: ICA2.A50S1,
      content: [
        "/blue{I don't have to work today!}",
        "/blue{Sem Estresse!}",
        "Para dizer que algo não é obrigatório, usamos don't have to com I, you, we e they.",
        "Com he, she e it, usamos doesn't have to.",
        "Atenção: no negativo, has volta a ser have.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic50s2",
    component: "Exercise14",
    activity: {
      prompt: "Ouça e escolha a frase correta.",
      image: ICA2.A50S2,
      audioSource: require("../../../../../mp3/IC/A2/A50S2.mp3"),
      options: ["You don't have to pay.", "You doesn't have to pay."],
      correctAnswer: "You don't have to pay.",
      feedbackMessage:
        "Correto: com you usamos don't have to. You don't have to pay significa que pagar não é obrigatório.",
    },
  },
  {
    key: "a2ic50s3",
    component: "Exercise14",
    activity: {
      prompt: "Ouça a frase.",
      image: ICA2.A50S3,
      audioSource: require("../../../../../mp3/IC/A2/A50S3.mp3"),
      options: ["She doesn't have to cook.", "She doesn't has to cook."],
      correctAnswer: "She doesn't have to cook.",
      feedbackMessage:
        "Muito bem: no negativo com she usamos doesn't have to. O has volta para have depois de doesn't.",
    },
  },
  {
    key: "a2ic50s4",
    component: "Exercise13",
    activity: {
      prompt: "Escreva não ter que, sem espaços:",
      audioSource: require("../../../../../mp3/IC/A2/A50S4.mp3"),
      letters: ["D", "O", "N", "'", "T", "H", "A", "V", "E", "T", "O"],
      correctWord: "DON'THAVETO",
      successMessage:
        "Perfeito: don't have to significa não ter que. A ação pode acontecer, mas não é obrigatória.",
    },
  },
  {
    key: "a2ic50s5",
    component: "Exercise5",
    activity: {
      prompt: "Hoje é feriado! O que acontece?",
      sentenceStart: "We",
      sentenceEnd: "go to work today.",
      options: ["doesn't have to", "don't have to"],
      correctAnswer: "don't have to",
      successMessage:
        "Isso mesmo: com We usamos don't have to. Como hoje é feriado, ir ao trabalho não é necessário.",
    },
  },
  {
    key: "a2ic50s6",
    component: "Exercise17",
    activity: {
      label: "TIP",
      content: [
        "/blue{É Obrigatório?}",
        "Para perguntar, usamos do ou does antes da pessoa.",
        "/blue{Do you have to go?}",
        "/blue{Does she have to work?}",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic50s7",
    component: "Exercise17",
    activity: {
      label: "Office Protocol with Sarah",
      image: ICA2.A50S7,
      content: [
        "Hi David! Here is the office protocol for the new employees.",
        "To be successful, you have to arrive on time (9 AM). You don't have to wear a suit, but you have to wear a professional shirt.",
        "You don't have to work on weekends. Do I have to sign this contract? Yes, you have to sign it. Okay?",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic50s8",
    component: "Exercise2",
    activity: {
      prompt: "Ajude o Camaleão a organizar as regras de David:",
      paragraphs: [
        [
          "In the office, David",
          {
            id: "1",
            options: ["has to", "doesn't have to"],
            answer: "has to",
          },
          "arrive on time. He",
          {
            id: "2",
            options: ["has to", "doesn't have to"],
            answer: "doesn't have to",
          },
          "wear a suit. He asks Sarah:",
          {
            id: "3",
            options: ["Do I have to", "Has to I"],
            answer: "Do I have to",
          },
          "sign this contract? Yes, he does.",
        ],
      ],
      successMessage:
        "Ótimo: David has to arrive on time, doesn't have to wear a suit e pergunta Do I have to sign this contract?",
    },
  },
  {
    key: "a2ic50s9",
    component: "Exercise12",
    activity: {
      prompt: "Sua Vez, Mestre das Regras!",
      image: ICA2.A50S9,
      instruction:
        "Conte 3 coisas que você tem que fazer na semana e 2 coisas que você não tem que fazer. Use have to e don't have to. Mínimo: 5 frases.",
      tipText:
        "I have to work. I have to study. I have to clean my room. I don't have to cook today. I don't have to travel this week.",
      successMessage:
        "Muito bem: você separou obrigações com have to e coisas não obrigatórias com don't have to.",
    },
  },
  {
    key: "a2ic50s10",
    component: "Exercise17",
    activity: {
      label: "Final",
      content: [
        "/blue{Você Entendeu a Obrigação!}",
        "Parabéns! Você concluiu a trilha de have to e don't have to.",
        "Agora você consegue diferenciar o que é obrigatório e o que não é necessário.",
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
