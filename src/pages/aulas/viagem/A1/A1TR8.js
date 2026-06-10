import { Exercise1 } from "../../../../exc/ex1";
import { Exercise3 } from "../../../../exc/ex3";
import { Exercise4 } from "../../../../exc/ex4";
import { Exercise5 } from "../../../../exc/ex5";
import { Exercise6 } from "../../../../exc/ex6";
import { Exercise12 } from "../../../../exc/ex12";
import { Exercise14 } from "../../../../exc/ex14";
import { Exercise16 } from "../../../../exc/ex16";
import { Exercise17 } from "../../../../exc/ex17";
import { Images, TRA1 } from "../../../../util/images";
import createTravelLessonScreen from "./TravelLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "immigration-customs-intro",
    component: Exercise17,
    activity: {
      label: "Immigration & Customs",
      content: [
        "Chegou a hora da Imigração! Respire fundo. O oficial (officer) vai fazer uma cara séria, mas ele só quer saber três coisas básicas: o que você foi fazer no país, onde vai dormir e quando vai embora. O segredo aqui não é falar frases longas, mas sim dar respostas curtas, precisas e confiantes. Vamos aprender as respostas de ouro!",
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "tourism-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A8S2,
      audioSource: require("../../../../../mp3/TR/A1/A8S2.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Tourism", "Today"],
      correctOption: "Tourism",
      successTitle: "Correto",
      feedbackMessage:
        'Se o oficial perguntar o motivo da viagem, "Tourism" pode bastar.',
    },
  },
  {
    key: "business-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A8S3,
      audioSource: require("../../../../../mp3/TR/A1/A8S3.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Business", "Baggage"],
      correctOption: "Business",
      successTitle: "Correto",
      feedbackMessage:
        '"Business" é a resposta curta para uma viagem de negócios.',
    },
  },
  {
    key: "immigration-short-answer-tip",
    component: Exercise17,
    activity: {
      label: "Dica de Nativo",
      content: [
        `Menos é mais! Não tente contar a história da sua vida para o oficial de imigração.

Se ele perguntar o motivo da viagem, diga apenas:

"Tourism" ou "Business".

Responda apenas o que foi perguntado. Respostas curtas, precisas e confiantes funcionam melhor.`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "hotel-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A8S5,
      audioSource: require("../../../../../mp3/TR/A1/A8S5.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Hotel", "Window"],
      correctOption: "Hotel",
      successTitle: "Correto",
      feedbackMessage:
        'Se perguntarem onde você vai ficar, responda "At a hotel".',
    },
  },
  {
    key: "here-for-tourism-complete",
    component: Exercise5,
    activity: {
      prompt:
        "Você chegou na cabine de imigração. O oficial pergunta o motivo da viagem. Você está de férias, então completa:",
      sentenceStart: "I am here for",
      sentenceEnd: ".",
      options: ["tourism", "passport"],
      correctAnswer: "tourism",
      successTitle: "Correto",
      successMessage: "I am here for tourism.",
    },
  },
  {
    key: "ten-days-true-false",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e responda: verdadeiro ou falso?",
      image: TRA1.A8S7,
      audioSource: require("../../../../../mp3/TR/A1/A8S7.mp3"),
      audioDurationMs: 1200,
      statement:
        "O passageiro do áudio respondeu ao oficial que vai ficar no país por 5 dias.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage: '"Ten days" significa dez dias.',
    },
  },
  {
    key: "immigration-vocab-match",
    component: Exercise1,
    activity: {
      prompt:
        "Conecte o vocabulário de sobrevivência da imigração com as traduções.",
      pairs: [
        { en: "Tourism", pt: "Turismo" },
        { en: "Business", pt: "Negócios" },
        { en: "Hotel", pt: "Hotel" },
      ],
      successTitle: "Correto",
      successMessage: "Vocabulário de imigração dominado.",
    },
  },
  {
    key: "here-for-tourism-order",
    component: Exercise6,
    activity: {
      prompt: "Clique nas palavras para escrever a frase na ordem correta.",
      words: ["here", "am", "I", "tourism", "for"],
      correctOrder: ["I", "am", "here", "for", "tourism"],
      successTitle: "Correto",
      successMessage: "I am here for tourism.",
    },
  },
  {
    key: "seven-days-correct-sentence",
    component: Exercise4,
    activity: {
      prompt:
        'O oficial pergunta: "How long are you staying?" Como você responde de forma correta se for ficar uma semana?',
      image: TRA1.A8S7,
      wrongSentence: "Length of stay",
      options: ["I am seven.", "Seven days.", "Days seven."],
      correctAnswer: "Seven days.",
      successTitle: "Correto",
      successMessage: "Responda curto e direto: Seven days.",
    },
  },
  {
    key: "business-writing",
    component: Exercise12,
    activity: {
      prompt: "Writing",
      instruction:
        'Imagine que você está viajando a trabalho. O oficial pergunta o motivo da viagem. Digite em inglês a palavra para "Negócios".',
      placeholder: "Business",
      helperText: "Uma palavra basta.",
      tipText: "Business",
      submitLabel: "Enviar",
      successTitle: "Correto",
      successMessage: "Business.",
    },
  },
  {
    key: "tourism-speaking",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        'Aperte para gravar e responda ao oficial de forma clara e direta que você está lá para fazer turismo: "Tourism".',
      helperText: "Tourism",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Tourism",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você praticou uma resposta curta de imigração.",
    },
  },
  {
    key: "lesson-finish",
    type: "finish",
  },
];

export default createTravelLessonScreen(LESSON_SLIDES);
