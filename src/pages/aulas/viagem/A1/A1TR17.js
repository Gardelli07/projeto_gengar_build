import { Exercise2 } from "../../../../exc/ex2";
import { Exercise3 } from "../../../../exc/ex3";
import { Exercise4 } from "../../../../exc/ex4";
import { Exercise6 } from "../../../../exc/ex6";
import { Exercise13 } from "../../../../exc/ex13";
import { Exercise14 } from "../../../../exc/ex14";
import { Exercise16 } from "../../../../exc/ex16";
import { Exercise17 } from "../../../../exc/ex17";
import { Exercise18 } from "../../../../exc/ex18";
import { Exercise19 } from "../../../../exc/ex19";
import { Images, TRA1 } from "../../../../util/images";
import createTravelLessonScreen from "./TravelLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "booking-table-intro",
    component: Exercise17,
    activity: {
      label: "Booking a Table & Sitting Down",
      content: [
        "É noite de jantar fora! Ir a um restaurante tradicional é uma das melhores experiências de uma viagem. Mas o processo de chegada pode ser um pouquinho diferente do Brasil. Nesta aula, você vai aprender como pedir uma mesa, garantir o seu cardápio e descobrir qual é a regra número um ao entrar em um restaurante no exterior.",
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "table-for-two-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A17S2,
      audioSource: require("../../../../../mp3/TR/A1/A17S2.mp3"),
      audioDurationMs: 1500,
      answerOptions: ["A table for two", "A table for ten"],
      correctOption: "A table for two",
      successTitle: "Correto",
      feedbackMessage: '"A table for two" significa uma mesa para dois.',
    },
  },
  {
    key: "menu-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A17S3,
      audioSource: require("../../../../../mp3/TR/A1/A17S3.mp3"),
      audioDurationMs: 1200,
      answerOptions: ["The menu", "The check out"],
      correctOption: "The menu",
      successTitle: "Correto",
      feedbackMessage: '"The menu" é o cardápio.',
    },
  },
  {
    key: "wait-to-be-seated-tip",
    component: Exercise17,
    activity: {
      label: "Dica de Nativo",
      content: [
        `No Brasil, é comum entrarmos no restaurante e irmos direto escolher uma mesa vazia. No exterior, nunca faça isso!

Sempre espere na porta. Procure uma placa que diz "Please wait to be seated". O host vai até você, pergunta em quantas pessoas vocês estão e te leva até a mesa correta.`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "table-for-two-order",
    component: Exercise6,
    activity: {
      prompt: "Clique nas palavras para escrever a frase na ordem correta.",
      words: ["two", "table", "A", ",", "for", "please"],
      correctOrder: ["A", "table", "for", "two", ",", "please"],
      successTitle: "Correto",
      successMessage: "A table for two, please.",
    },
  },
  {
    key: "table-for-two-complete",
    component: Exercise2,
    activity: {
      prompt:
        'O host vem até você na entrada do restaurante e diz: "Good evening! How many?". Você está com a sua esposa. Como você responde?',
      paragraphs: [
        [
          '"A table for',
          { id: "blank-1", answer: "two", options: ["two", "reservation"] },
          ', please."',
        ],
      ],
      successTitle: "Correto",
      successMessage: "A table for two, please.",
    },
  },
  {
    key: "table-for-four-true-false",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e responda: verdadeiro ou falso?",
      image: TRA1.A17S7,
      audioSource: require("../../../../../mp3/TR/A1/A17S7.mp3"),
      audioDurationMs: 1700,
      statement:
        "O cliente do áudio está pedindo uma mesa para quatro pessoas no restaurante.",
      options: ["true", "false"],
      correctAnswer: "true",
      successTitle: "Correto",
      feedbackMessage: '"A table for four" é uma mesa para quatro.',
    },
  },
  {
    key: "menu-letters",
    component: Exercise13,
    activity: {
      prompt:
        'Você sentou, mas a mesa está vazia. Clique nas letras na ordem correta para formar a palavra "Cardápio" em inglês.',
      letters: ["u", "e", "n", "m"],
      audioSource: require("../../../../../mp3/TR/A1/A17S3.mp3"),
      correctWord: "menu",
      successTitle: "Correto",
      successMessage: "Menu significa cardápio.",
    },
  },
  {
    key: "menu-listen-write",
    component: Exercise19,
    needsSpeech: true,
    activity: {
      prompt:
        "O garçom passou perto da sua mesa. Escute com atenção e escreva exatamente a frase que o cliente usou para pedir o cardápio.",
      audioSource: require("../../../../../mp3/TR/A1/A17S9.mp3"),
      audioDurationMs: 1800,
      correctAnswer: "Can I have the menu?",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "Can I have the menu?",
      errorMessage: 'Confira a frase: "Can I have the menu?"',
    },
  },
  {
    key: "table-correct-sentence",
    component: Exercise4,
    activity: {
      prompt:
        "Qual é a maneira correta, educada e natural de pedir uma mesa para duas pessoas assim que você chega no restaurante?",
      image: TRA1.A17S2,
      wrongSentence: "Restaurant table request",
      options: [
        "Give me a table. Two!",
        "A table for two, please.",
        "Two tables now.",
      ],
      correctAnswer: "A table for two, please.",
      successTitle: "Correto",
      successMessage: "A table for two, please.",
    },
  },
  {
    key: "menu-write-order",
    component: Exercise18,
    activity: {
      prompt:
        'Não clique, digite! Você já sabe usar o "Can I have". Digite a frase na ordem correta para pedir o cardápio ao garçom.',
      scrambledSentence: "menu / I / the / Can / have / , / please / ?",
      correctAnswer: "Can I have the menu, please?",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "Can I have the menu, please?",
    },
  },
  {
    key: "table-speaking",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        'Vamos garantir a sua mesa! Grave a sua voz: "A table for two, please."',
      helperText: "A table for two, please.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "A table for two, please.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você praticou como pedir mesa no restaurante.",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createTravelLessonScreen(LESSON_SLIDES);
