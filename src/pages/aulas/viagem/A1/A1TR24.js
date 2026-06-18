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
    key: "pharmacy-intro",
    component: Exercise17,
    activity: {
      label: "At the Pharmacy",
      content: [
        "Medicine & Care. Uma dor de cabeça ou um resfriado podem aparecer sem avisar. No exterior, as farmácias (pharmacy ou drugstore) vendem quase tudo, mas você precisa saber pedir o remédio certo. Nesta aula, vamos aprender a descrever sintomas simples e encontrar os remédios básicos que não precisam de receita médica.",
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "painkiller-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A24S2,
      audioSource: require("../../../../../mp3/TR/A1/A24S2.mp3"),
      audioDurationMs: 1200,
      answerOptions: ["Painkiller", "Passport"],
      correctOption: "Painkiller",
      successTitle: "Correto",
      feedbackMessage:
        '"Painkiller" significa analgésico, um remédio para dor.',
    },
  },
  {
    key: "cold-medicine-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A24S3,
      audioSource: require("../../../../../mp3/TR/A1/A24S3.mp3"),
      audioDurationMs: 1500,
      answerOptions: ["Cold medicine", "Drip coffee"],
      correctOption: "Cold medicine",
      successTitle: "Correto",
      feedbackMessage: '"Cold medicine" é remédio para resfriado.',
    },
  },
  {
    key: "drugstore-tip",
    component: Exercise17,
    activity: {
      label: "Dica de Nativo",
      content: [
        "Nos EUA, você ouvirá muito a palavra drugstore. Elas são gigantes e vendem de tudo: comida, maquiagem e eletrônicos. Já no Reino Unido, é mais comum dizer pharmacy ou chemist's. Independentemente do nome, se precisar de ajuda, procure o balcão ao fundo onde fica o pharmacist.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "medicine-image-match",
    component: Exercise15,
    activity: {
      prompt: "Combine o sintoma com o que você deve comprar.",
      images: [
        { id: "pain-img", image: TRA1.A24S2 },
        { id: "cold-img", image: TRA1.A24S3 },
      ],
      words: [
        { id: "pain-word", label: "Painkiller" },
        { id: "cold-word", label: "Cold medicine" },
      ],
      pairs: [
        { imageId: "pain-img", wordId: "pain-word" },
        { imageId: "cold-img", wordId: "cold-word" },
      ],
      successTitle: "Correto",
      successMessage: "Painkiller é para dor; cold medicine é para resfriado.",
    },
  },
  {
    key: "pharmacy-object",
    component: Exercise8,
    activity: {
      prompt:
        "Você está procurando o lugar que vende remédios no aeroporto. Qual palavra você deve procurar na placa?",
      image: TRA1.A24S10,
      options: ["Pharmacy", "Restaurant"],
      correctAnswer: "Pharmacy",
      successTitle: "Correto",
      successMessage: "Pharmacy é farmácia.",
    },
  },
  {
    key: "painkiller-true-false",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e responda: verdadeiro ou falso?",
      image: TRA1.A24S7,
      audioSource: require("../../../../../mp3/TR/A1/A24S7.mp3"),
      audioDurationMs: 1900,
      statement: "O turista do áudio está pedindo um café coado na farmácia.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage: "Ele pediu um painkiller, um analgésico.",
    },
  },
  {
    key: "cold-medicine-complete",
    component: Exercise5,
    activity: {
      prompt: "Você está resfriado e entra na farmácia. Você diz ao atendente:",
      sentenceStart: "I need",
      sentenceEnd: "medicine, please.",
      options: ["cold", "ticket"],
      correctAnswer: "cold",
      successTitle: "Correto",
      successMessage: "I need cold medicine, please.",
    },
  },
  {
    key: "pharmacy-vocab",
    component: Exercise1,
    activity: {
      prompt: "Conecte os itens de farmácia com suas utilidades.",
      pairs: [
        { en: "Painkiller", pt: "Para dores (cabeça, corpo)" },
        { en: "Cold medicine", pt: "Para resfriados e espirros" },
        { en: "Prescription", pt: "Receita médica" },
      ],
      successTitle: "Correto",
      successMessage: "Vocabulário de farmácia revisado.",
    },
  },
  {
    key: "painkiller-correct-sentence",
    component: Exercise4,
    activity: {
      prompt:
        "Como você pede um remédio para dor de forma educada para o farmacêutico?",
      image: TRA1.A24S7,
      wrongSentence: "Pharmacy request",
      options: [
        "Give me medicine.",
        "I need a painkiller, please.",
        "Where is the cold?",
      ],
      correctAnswer: "I need a painkiller, please.",
      successTitle: "Correto",
      successMessage: "I need a painkiller, please.",
    },
  },
  {
    key: "nearest-pharmacy-complete",
    component: Exercise2,
    activity: {
      prompt: "Você quer saber onde fica a farmácia mais próxima. Complete:",
      paragraphs: [
        [
          '"Where is the nearest',
          { id: "blank-1", answer: "pharmacy", options: ["pharmacy", "hotel"] },
          ', please?"',
        ],
      ],
      successTitle: "Correto",
      successMessage: "Where is the nearest pharmacy, please?",
    },
  },
  {
    key: "painkiller-speaking",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        'Hora de praticar! Imagine que você está com uma dor de cabeça chata. Grave um áudio pedindo ajuda: "I need a painkiller, please."',
      helperText: "I need a painkiller, please.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "I need a painkiller, please.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você praticou um pedido na farmácia.",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createTravelLessonScreen(LESSON_SLIDES);
