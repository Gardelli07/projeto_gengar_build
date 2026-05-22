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
    key: "numbers-money-intro",
    component: Exercise17,
    activity: {
      label: "Numbers & Money",
      content: [
        "Time is money! E em uma viagem, saber perguntar o preço e entender os números é pura sobrevivência. Você não precisa saber contar até um milhão agora, mas precisa entender as dezenas e a frase mais importante para o seu bolso. Vamos aprender a fazer compras e pagar contas sem medo!",
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "how-much-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A3S2,
      audioSource: require("../../../../../mp3/TR/A1/A3S2.mp3"),
      audioText: "How much is it?",
      audioDurationMs: 1600,
      answerOptions: ["How much is it?", "How are you?"],
      correctOption: "How much is it?",
      successTitle: "Correto",
      feedbackMessage:
        '"How much is it?" é a frase de ouro para perguntar preço.',
    },
  },
  {
    key: "basic-numbers-match",
    component: Exercise1,
    activity: {
      prompt: "Conecte os números em inglês com suas traduções.",
      pairs: [
        { en: "One", pt: "Um (1)" },
        { en: "Five", pt: "Cinco (5)" },
        { en: "Ten", pt: "Dez (10)" },
      ],
      successTitle: "Correto",
      successMessage: "Números básicos ativados.",
    },
  },
  {
    key: "teen-ty-tip",
    component: Exercise17,
    activity: {
      label: "Dica de Nativo",
      content: [
        `Cuidado com a pegadinha dos números!

Os números entre 13 e 19 terminam em "TEEN" e têm um som mais longo.

Já as dezenas (20, 30, 40, 50) terminam em "TY", com som curto e seco.

Exemplo clássico: 15 é Fifteen. 50 é Fifty. O som no final muda tudo na hora de pagar!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "fifty-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A3S5,
      audioSource: require("../../../../../mp3/TR/A1/A3S5.mp3"),
      audioText: "Fifty",
      audioDurationMs: 1000,
      answerOptions: ["Fifteen", "Fifty"],
      correctOption: "Fifty",
      successTitle: "Correto",
      feedbackMessage:
        'Preste atenção no final curto "ty": Fifty representa 50.',
    },
  },
  {
    key: "how-much-complete",
    component: Exercise5,
    activity: {
      prompt:
        "Você pegou um ímã de geladeira na loja de souvenirs e quer saber o preço. Como você completa a pergunta?",
      image: TRA1.A3S2,
      sentenceStart: "How",
      sentenceEnd: "is it?",
      options: ["much", "many"],
      correctAnswer: "much",
      successTitle: "Correto",
      successMessage: 'Para preço, usamos "How much".',
    },
  },
  {
    key: "twenty-dollars-true-false",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e responda: verdadeiro ou falso?",
      image: TRA1.A3S7,
      audioSource: require("../../../../../mp3/TR/A1/A3S7.mp3"),
      audioText: "It's twenty dollars.",
      audioDurationMs: 1600,
      statement: "O preço falado no áudio é de 12 dólares.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage: "O áudio diz twenty dollars: 20 dólares.",
    },
  },
  {
    key: "dollars-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A3S8,
      audioSource: require("../../../../../mp3/TR/A1/A3S8.mp3"),
      audioText: "Dollars",
      audioDurationMs: 1000,
      answerOptions: ["Dollars", "Euros"],
      correctOption: "Dollars",
      successTitle: "Correto",
      feedbackMessage:
        "Dollars é a moeda mais famosa, mas sempre preste atenção na moeda local.",
    },
  },
  {
    key: "how-much-order",
    component: Exercise6,
    activity: {
      prompt: "Clique nas palavras para escrever a frase na ordem correta.",
      words: ["it", "How", "is", "much", "?"],
      correctOrder: ["How", "much", "is", "it", "?"],
      successTitle: "Correto",
      successMessage: "How much is it?",
    },
  },
  {
    key: "price-question-correct-sentence",
    component: Exercise4,
    activity: {
      prompt:
        "Você quer comprar uma garrafa de água no aeroporto. Qual é a maneira correta de perguntar o preço?",
      image: TRA1.A3S2,
      wrongSentence: "Price question",
      options: ["What money?", "How price is it?", "How much is it?"],
      correctAnswer: "How much is it?",
      successTitle: "Correto",
      successMessage: '"How much is it?" pergunta quanto custa.',
    },
  },
  {
    key: "how-much-writing",
    component: Exercise12,
    activity: {
      prompt: "Writing",
      instruction:
        'Imagine que você quer comprar um ticket de trem e precisa saber o valor. Escreva em inglês a pergunta mágica: "Quanto custa isso?"',
      placeholder: "How much is it?",
      helperText: "Use How much...",
      tipText: "How much is it?",
      submitLabel: "Enviar",
      successTitle: "Correto",
      successMessage: "Pergunta perfeita para compras em viagem.",
    },
  },
  {
    key: "how-much-speaking",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        'Fale em voz alta a pergunta que você vai usar todos os dias na sua viagem para saber o preço das coisas. Grave seu áudio perguntando: "How much is it?"',
      helperText: "How much is it?",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "How much is it?",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você praticou a pergunta de preço.",
    },
  },
  {
    key: "lesson-finish",
    type: "finish",
  },
];

export default createTravelLessonScreen(LESSON_SLIDES);
