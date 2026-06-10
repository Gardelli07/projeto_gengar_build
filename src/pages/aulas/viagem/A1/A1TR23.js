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
    key: "souvenirs-gifts-intro",
    component: Exercise17,
    activity: {
      label: "Souvenirs & Gifts",
      content: [
        "Gifts for everyone! A viagem está chegando ao fim e você quer levar um pedacinho dela para as pessoas que ama. Nesta aula, vamos aprender a encontrar lembrancinhas e presentes, além de saber como pedir para o vendedor embrulhar para presente. Prepare a mala extra!",
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "souvenir-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A23S2,
      audioText: "Souvenir",
      audioDurationMs: 1200,
      answerOptions: ["Souvenir", "Ticket"],
      correctOption: "Souvenir",
      successTitle: "Correto",
      feedbackMessage: '"Souvenir" é uma lembrancinha típica do lugar.',
    },
  },
  {
    key: "gift-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A23S3,
      audioSource: require("../../../../../mp3/TR/A1/A23S7.mp3"),
      audioDurationMs: 900,
      answerOptions: ["Gift", "Price"],
      correctOption: "Gift",
      successTitle: "Correto",
      feedbackMessage: '"Gift" significa presente.',
    },
  },
  {
    key: "for-a-gift-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A23S4,
      audioSource: require("../../../../../mp3/TR/A1/A23S7.mp3"),
      audioDurationMs: 1400,
      answerOptions: ["For a gift", "For here"],
      correctOption: "For a gift",
      successTitle: "Correto",
      feedbackMessage: '"For a gift" significa para presente.',
    },
  },
  {
    key: "gift-receipt-tip",
    component: Exercise17,
    activity: {
      label: "Dica de Nativo",
      content: [
        'Se você comprou um presente e não tem certeza se a pessoa vai gostar do tamanho ou da cor, peça o "gift receipt". É um comprovante de compra sem o preço impresso, que permite que a pessoa troque o item na loja depois.',
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "gift-complete",
    component: Exercise5,
    activity: {
      prompt:
        "Você está escolhendo um perfume para sua esposa e diz para o vendedor:",
      sentenceStart: "This is for a",
      sentenceEnd: ".",
      options: ["gift", "room"],
      correctAnswer: "gift",
      successTitle: "Correto",
      successMessage: "This is for a gift.",
    },
  },
  {
    key: "gift-true-false",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e responda: verdadeiro ou falso?",
      image: TRA1.A23S7,
      audioSource: require("../../../../../mp3/TR/A1/A23S7.mp3"),
      audioDurationMs: 1800,
      statement:
        "O cliente do áudio quer que o vendedor embrulhe o produto para presente.",
      options: ["true", "false"],
      correctAnswer: "true",
      successTitle: "Correto",
      feedbackMessage: '"It\'s for a gift" indica que é para presente.',
    },
  },
  {
    key: "souvenir-vocab",
    component: Exercise1,
    activity: {
      prompt: "Conecte o vocabulário de compras finais com suas traduções.",
      pairs: [
        { en: "Souvenir", pt: "Lembrancinha (típica)" },
        { en: "Gift", pt: "Presente" },
        { en: "For a gift", pt: "Para presente" },
      ],
      successTitle: "Correto",
      successMessage: "Vocabulário de presentes revisado.",
    },
  },
  {
    key: "for-a-gift-order",
    component: Exercise6,
    activity: {
      prompt: "Clique nas palavras para escrever a frase na ordem correta.",
      words: ["gift", "please", "For", "a", ","],
      correctOrder: ["For", "a", "gift", ",", "please"],
      successTitle: "Correto",
      successMessage: "For a gift, please.",
    },
  },
  {
    key: "for-a-gift-correct-sentence",
    component: Exercise4,
    activity: {
      prompt:
        "Você comprou uma camiseta para um amigo e quer que ela seja embrulhada. O que você diz ao caixa?",
      image: TRA1.A23S10,
      wrongSentence: "Gift wrap request",
      options: ["I want a gift.", "For a gift, please.", "This is souvenir."],
      correctAnswer: "For a gift, please.",
      successTitle: "Correto",
      successMessage: "For a gift, please.",
    },
  },
  {
    key: "souvenir-writing",
    component: Exercise12,
    activity: {
      prompt: "Writing",
      instruction:
        "Imagine que você está em uma loja de imãs de geladeira e chaveiros. Como você chama esses itens em inglês? Digite a palavra no singular.",
      placeholder: "Souvenir",
      helperText: "É uma lembrancinha típica.",
      tipText: "Souvenir",
      submitLabel: "Enviar",
      successTitle: "Correto",
      successMessage: "Souvenir.",
    },
  },
  {
    key: "gift-speaking",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        'Treino de fala! Grave um áudio pedindo para embrulhar o seu presente: "It\'s for a gift, please."',
      helperText: "It's for a gift, please.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "It's for a gift, please.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você praticou como pedir embalagem para presente.",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createTravelLessonScreen(LESSON_SLIDES);
