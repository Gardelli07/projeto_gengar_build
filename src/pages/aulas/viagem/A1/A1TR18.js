import { Exercise3 } from "../../../../exc/ex3";
import { Exercise4 } from "../../../../exc/ex4";
import { Exercise7 } from "../../../../exc/ex7";
import { Exercise12 } from "../../../../exc/ex12";
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
    key: "ordering-food-intro",
    component: Exercise17,
    activity: {
      label: "Ordering Food",
      content: [
        "Chegou a melhor hora! O garçom entregou o cardápio e agora está voltando para a sua mesa. Nesta aula, você vai aprender a entender a pergunta clássica do garçom e dominar a frase mais elegante, educada e usada pelos nativos na hora de fazer um pedido em qualquer restaurante do mundo.",
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "ready-to-order-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A18S2,
      audioSource: require("../../../../../mp3/TR/A1/A18S2.mp3"),
      audioDurationMs: 1500,
      answerOptions: ["Ready to order", "Ready to go"],
      correctOption: "Ready to order",
      successTitle: "Correto",
      feedbackMessage: '"Ready to order" significa pronto para pedir.',
    },
  },
  {
    key: "would-like-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A18S3,
      audioSource: require("../../../../../mp3/TR/A1/A18S3.mp3"),
      audioDurationMs: 1400,
      answerOptions: ["I would like", "I don't like"],
      correctOption: "I would like",
      successTitle: "Correto",
      feedbackMessage:
        '"I would like" é a forma educada de dizer "eu gostaria".',
    },
  },
  {
    key: "id-like-tip",
    component: Exercise17,
    activity: {
      label: "Dica de Nativo",
      content: [
        `Na vida real, os nativos raramente dizem "I would like" por completo. Eles encurtam para "I'd like".

Exemplo: "I'd like the chicken, please." Treine esse som para soar mais natural.`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "ordering-dialogue-order",
    component: Exercise7,
    activity: {
      prompt: "O garçom chegou. Organize o diálogo na ordem correta.",
      options: [
        "Hello! Are you ready to order?",
        "Yes. I would like the pasta, please.",
        "Excellent. And to drink?",
        "Water, please.",
      ],
      correctOrder: [
        "Hello! Are you ready to order?",
        "Yes. I would like the pasta, please.",
        "Excellent. And to drink?",
        "Water, please.",
      ],
      successTitle: "Correto",
      successMessage: "Você organizou um pedido completo.",
    },
  },
  {
    key: "order-letters",
    component: Exercise13,
    activity: {
      prompt:
        'O garçom quer saber se você está pronto para "pedir". Coloque as letras na ordem certa.',
      letters: ["o", "r", "d", "e", "r"],
      correctWord: "ORDER",
      successTitle: "Correto",
      successMessage: "Order significa pedir/fazer o pedido.",
    },
  },
  {
    key: "chicken-true-false",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e responda: verdadeiro ou falso?",
      image: TRA1.A18S7,
      audioSource: require("../../../../../mp3/TR/A1/A18S7.mp3"),
      audioDurationMs: 2100,
      statement: "O cliente do áudio pediu macarrão (pasta).",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage: "Ele pediu chicken, frango.",
    },
  },
  {
    key: "chicken-listen-write",
    component: Exercise19,
    needsSpeech: true,
    activity: {
      prompt: "Ouça com atenção e escreva exatamente o que o cliente pediu.",
      audioText: "I would like the chicken, please.",
      audioDurationMs: 2100,
      correctAnswer: "I would like the chicken, please.",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "I would like the chicken, please.",
      errorMessage: 'Confira a frase: "I would like the chicken, please."',
    },
  },
  {
    key: "chicken-write-order",
    component: Exercise18,
    activity: {
      prompt:
        "Não clique, digite! Coloque as palavras na ordem correta para pedir o frango.",
      scrambledSentence: "like / chicken / I / the / would / , / please",
      correctAnswer: "I would like the chicken, please",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "I would like the chicken, please.",
    },
  },
  {
    key: "pasta-correct-sentence",
    component: Exercise4,
    activity: {
      prompt: "Qual é a maneira mais educada de pedir um prato de macarrão?",
      image: TRA1.A18S10,
      wrongSentence: "Food order",
      options: [
        "I want the pasta.",
        "Give me the pasta.",
        "I would like the pasta, please.",
      ],
      correctAnswer: "I would like the pasta, please.",
      successTitle: "Correto",
      successMessage: "I would like the pasta, please.",
    },
  },
  {
    key: "fish-writing",
    component: Exercise12,
    activity: {
      prompt: "Writing",
      instruction:
        'Imagine que você quer pedir um peixe para o jantar. Escreva em inglês: "Eu gostaria do peixe, por favor".',
      placeholder: "I would like the fish, please.",
      helperText: "Use I would like...",
      tipText: "I would like the fish, please.",
      submitLabel: "Enviar",
      successTitle: "Correto",
      successMessage: "I would like the fish, please.",
    },
  },
  {
    key: "pasta-speaking",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        'Sua vez de falar! Grave um áudio fazendo o seu pedido completo para um macarrão: "I would like the pasta, please."',
      helperText: "I would like the pasta, please.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "I would like the pasta, please.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você praticou um pedido educado no restaurante.",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createTravelLessonScreen(LESSON_SLIDES);
