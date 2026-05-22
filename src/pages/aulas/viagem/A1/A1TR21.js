import { Exercise1 } from "../../../../exc/ex1";
import { Exercise2 } from "../../../../exc/ex2";
import { Exercise3 } from "../../../../exc/ex3";
import { Exercise4 } from "../../../../exc/ex4";
import { Exercise5 } from "../../../../exc/ex5";
import { Exercise8 } from "../../../../exc/ex8";
import { Exercise14 } from "../../../../exc/ex14";
import { Exercise15 } from "../../../../exc/ex15";
import { Exercise16 } from "../../../../exc/ex16";
import { Exercise17 } from "../../../../exc/ex17";
import { Images, TRA1 } from "../../../../util/images";
import createTravelLessonScreen from "./TravelLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "store-intro",
    component: Exercise17,
    activity: {
      label: "At the Store",
      content: [
        "Shopping time! Entrar em uma loja no exterior é tentador, mas para não errar na compra, você precisa dominar duas coisas: entender os tamanhos e saber onde provar a roupa. Nesta aula, vamos aprender a encontrar o provador e as palavras-chave para não levar a roupa errada para casa!",
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "sizes-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A21S2,
      audioText: "Small, Medium, Large",
      audioDurationMs: 1900,
      answerOptions: ["Small, Medium, Large", "Ticket, Adult, Child"],
      correctOption: "Small, Medium, Large",
      successTitle: "Correto",
      feedbackMessage: "Small, Medium e Large são os tamanhos S, M e L.",
    },
  },
  {
    key: "fitting-room-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A21S3,
      audioText: "Fitting room",
      audioDurationMs: 1400,
      answerOptions: ["Fitting room", "Bathroom"],
      correctOption: "Fitting room",
      successTitle: "Correto",
      feedbackMessage: '"Fitting room" significa provador.',
    },
  },
  {
    key: "try-on-tip",
    component: Exercise17,
    activity: {
      label: "Dica de Nativo",
      content: [
        `Muitas lojas no exterior têm políticas de troca rígidas. Por isso, sempre prove!

Se você estiver com uma peça na mão e quiser saber se pode experimentar, aponte para o provador e pergunte: "Can I try this on?"`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "size-image-match",
    component: Exercise15,
    activity: {
      prompt: "Combine a etiqueta com o tamanho correto em inglês.",
      images: [
        { id: "small-img", image: TRA1.A21S2 },
        { id: "large-img", image: TRA1.A21S10 },
      ],
      words: [
        { id: "small-word", label: "Small" },
        { id: "large-word", label: "Large" },
      ],
      pairs: [
        { imageId: "small-img", wordId: "small-word" },
        { imageId: "large-img", wordId: "large-word" },
      ],
      successTitle: "Correto",
      successMessage: "S é Small; L é Large.",
    },
  },
  {
    key: "fitting-room-image-choice",
    component: Exercise8,
    activity: {
      prompt:
        "Olhe a imagem. Como chamamos esse lugar da loja onde você experimenta as roupas?",
      image: TRA1.A21S3,
      options: ["Fitting room", "Bathroom"],
      correctAnswer: "Fitting room",
      successTitle: "Correto",
      successMessage: "Fitting room é o provador.",
    },
  },
  {
    key: "fitting-room-true-false",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e responda: verdadeiro ou falso?",
      image: TRA1.A21S7,
      audioSource: require("../../../../../mp3/TR/A1/A21S7.mp3"),
      audioText: "Where is the fitting room?",
      audioDurationMs: 1900,
      statement: "O cliente do áudio está perguntando onde fica o banheiro da loja.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage: "Ele está perguntando pelo provador.",
    },
  },
  {
    key: "fitting-room-complete",
    component: Exercise5,
    activity: {
      prompt:
        "Você achou uma camiseta linda, mas precisa provar. Você pergunta ao vendedor:",
      image: TRA1.A21S3,
      sentenceStart: "Where is the",
      sentenceEnd: "room?",
      options: ["fitting", "breakfast"],
      correctAnswer: "fitting",
      successTitle: "Correto",
      successMessage: "Where is the fitting room?",
    },
  },
  {
    key: "sizes-vocab",
    component: Exercise1,
    activity: {
      prompt: "Conecte os tamanhos internacionais com as traduções para não errar na mala.",
      pairs: [
        { en: "Small (S)", pt: "Pequeno" },
        { en: "Medium (M)", pt: "Médio" },
        { en: "Large (L)", pt: "Grande" },
      ],
      successTitle: "Correto",
      successMessage: "Tamanhos internacionais revisados.",
    },
  },
  {
    key: "try-on-correct-sentence",
    component: Exercise4,
    activity: {
      prompt:
        "Como você pergunta ao vendedor se pode experimentar a peça de roupa que está na sua mão?",
      image: TRA1.A21S10,
      wrongSentence: "Try on question",
      options: ["I want wear.", "Can I try this on?", "Where is the ticket?"],
      correctAnswer: "Can I try this on?",
      successTitle: "Correto",
      successMessage: "Can I try this on?",
    },
  },
  {
    key: "medium-size-complete",
    component: Exercise2,
    activity: {
      prompt: "Você está na arara de roupas e quer o tamanho médio. Complete:",
      paragraphs: [
        [
          '"I need a size',
          { id: "blank-1", answer: "medium", options: ["medium", "hotel"] },
          ', please."',
        ],
      ],
      successTitle: "Correto",
      successMessage: "I need a size medium, please.",
    },
  },
  {
    key: "fitting-room-speaking",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        'Hora de praticar! Imagine que você está com uma jaqueta e quer saber onde fica o provador. Grave um áudio fazendo a pergunta: "Where is the fitting room?".',
      helperText: "Where is the fitting room?",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Where is the fitting room?",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você praticou como perguntar pelo provador.",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createTravelLessonScreen(LESSON_SLIDES);
