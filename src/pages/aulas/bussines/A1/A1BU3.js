import { Exercise4 } from "../../../../exc/ex4";
import { Exercise5 } from "../../../../exc/ex5";
import { Exercise6 } from "../../../../exc/ex6";
import { Exercise7 } from "../../../../exc/ex7";
import { Exercise15 } from "../../../../exc/ex15";
import { Exercise16 } from "../../../../exc/ex16";
import { Exercise17 } from "../../../../exc/ex17";
import { Exercise19 } from "../../../../exc/ex19";
import { BUA1, Images } from "../../../../util/images";
import createBusinessLessonScreen from "./BusinessLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "sales-inquiries-intro",
    component: Exercise17,
    activity: {
      label: "Can I help you?",
      content: [
        `Vendas são o coração de qualquer negócio. Hoje vamos aprender o vocabulário básico para lidar com perguntas simples de clientes.

Dica de Nativo:
Quando um cliente chega, nós nunca perguntamos "What do you want?". Isso soa muito rude e agressivo em inglês. O clássico, educado e certeiro é sempre "How can I help you?".`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "price-product-match",
    component: Exercise15,
    activity: {
      prompt: "Clique na imagem e na palavra que a descreve.",
      images: [
        { id: "price-img", image: BUA1.A3S2p1 },
        { id: "product-img", image: BUA1.A3S2p2 },
      ],
      words: [
        { id: "price-word", label: "Price" },
        { id: "product-word", label: "Product" },
      ],
      pairs: [
        { imageId: "price-img", wordId: "price-word" },
        { imageId: "product-img", wordId: "product-word" },
      ],
      successTitle: "Correto",
      successMessage: "Price é preço; product é produto.",
    },
  },
  {
    key: "how-much-listen-write",
    component: Exercise19,
    needsSpeech: true,
    activity: {
      prompt:
        "Escute o áudio com atenção e digite exatamente o que você ouviu.",
      audioSource: require("../../../../../mp3/BU/A1/A3S3.mp3"),
      audioDurationMs: 1800,
      correctAnswer: "How much is this?",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "How much is this?",
      errorMessage: 'Confira a pergunta: "How much is this?"',
    },
  },
  {
    key: "sales-dialogue-order",
    component: Exercise7,
    activity: {
      prompt: "Coloque o diálogo na ordem correta clicando nas frases.",
      options: [
        "Hello! How can I help you?",
        "Hi! How much is this product?",
        "It is fifty dollars.",
        "Great, thank you!",
      ],
      correctOrder: [
        "Hello! How can I help you?",
        "Hi! How much is this product?",
        "It is fifty dollars.",
        "Great, thank you!",
      ],
      successTitle: "Correto",
      successMessage: "Você organizou o atendimento de vendas.",
    },
  },
  {
    key: "how-much-complete",
    component: Exercise5,
    activity: {
      prompt: "Complete a frase.",
      image: BUA1.A3S8,
      sentenceStart: "How",
      sentenceEnd: "is this product?",
      options: ["much", "many"],
      correctAnswer: "much",
      successTitle: "Correto",
      successMessage: 'Para preço, usamos "How much".',
    },
  },
  {
    key: "would-like-tip",
    component: Exercise17,
    activity: {
      label: "I want vs. I would like",
      content: [
        `Quer soar como um profissional de alto nível? Troque o "I want" por "I would like".

Cliente:
"I would like to buy this."

Vendedor:
"Would you like some help?"

É a chave mestra para a educação nos negócios.`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "how-can-i-help-order",
    component: Exercise6,
    activity: {
      prompt: "Clique nas palavras para escrever a frase na ordem correta.",
      words: ["help", "you", "I", "can", "How", "?"],
      correctOrder: ["How", "can", "I", "help", "you", "?"],
      successTitle: "Correto",
      successMessage: "How can I help you?",
    },
  },
  {
    key: "twenty-dollars-correct",
    component: Exercise4,
    activity: {
      prompt: "Qual é a forma correta e educada de dizer o preço?",
      image: BUA1.A3S8,
      wrongSentence: "Price",
      options: [
        "It is twenty dollars.",
        "It has twenty dollars.",
        "Is twenty dollars.",
      ],
      correctAnswer: "It is twenty dollars.",
      successTitle: "Correto",
      successMessage: '"It is..." é a forma correta para dizer o preço.',
    },
  },
  {
    key: "seller-audio",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        'Hora do áudio! Imagine que você é o vendedor. Grave um áudio dizendo: "Olá, como posso ajudar você? O produto custa vinte dólares."',
      helperText: "Hello, how can I help you? The product is twenty dollars.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Hello, how can I help you? The product is twenty dollars.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Seu atendimento de vendas foi gravado.",
    },
  },
  {
    key: "sales-feedback",
    component: Exercise17,
    activity: {
      label: "Sold! (Vendido!)",
      content: [
        'Você mandou muito bem lidando com o cliente. Dominar os números e a frase "How can I help you?" é tudo o que você precisa para iniciar no setor de vendas.',
      ],
      continueLabel: "Finalizar",
    },
  },
  {
    key: "lesson-finish",
    type: "finish",
  },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
