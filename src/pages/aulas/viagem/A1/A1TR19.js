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
    key: "paying-bill-intro",
    component: Exercise17,
    activity: {
      label: "Paying the Bill",
      content: [
        'Dinner is over! A comida estava ótima, mas agora chegou a hora de fechar a conta. No exterior, os garçons raramente trazem a conta sem você pedir, porque não querem que você se sinta "expulso". Nesta aula, você vai aprender a pedir a conta de forma educada e entender o que significa o famoso tip.',
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "check-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A19S2,
      audioSource: require("../../../../../mp3/TR/A1/A19S7.mp3"),
      audioDurationMs: 1200,
      answerOptions: ["The check", "The menu"],
      correctOption: "The check",
      successTitle: "Correto",
      feedbackMessage:
        'Nos EUA, usamos "the check". Na Europa, é mais comum "the bill".',
    },
  },
  {
    key: "tip-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A19S3,
      audioText: "Tip",
      audioDurationMs: 900,
      answerOptions: ["Tip", "Gift"],
      correctOption: "Tip",
      successTitle: "Correto",
      feedbackMessage: '"Tip" significa gorjeta.',
    },
  },
  {
    key: "service-included-tip",
    component: Exercise17,
    activity: {
      label: "Dica de Nativo",
      content: [
        `Sempre olhe o final da sua conta. Se estiver escrito "Service included" ou "Gratuity included", a gorjeta já faz parte do valor total.

Se não estiver, você deve adicionar o tip na hora de pagar com o cartão ou deixar em dinheiro na mesa.`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "check-tip-image-match",
    component: Exercise15,
    activity: {
      prompt: "Combine a imagem com a palavra correta.",
      images: [
        { id: "check-img", image: TRA1.A19S2 },
        { id: "tip-img", image: TRA1.A19S3 },
      ],
      words: [
        { id: "check-word", label: "The check" },
        { id: "tip-word", label: "Tip" },
      ],
      pairs: [
        { imageId: "check-img", wordId: "check-word" },
        { imageId: "tip-img", wordId: "tip-word" },
      ],
      successTitle: "Correto",
      successMessage: "The check é a conta; tip é gorjeta.",
    },
  },
  {
    key: "credit-card-image-choice",
    component: Exercise8,
    activity: {
      prompt:
        "O garçom pergunta como você quer pagar. Olhe a imagem e responda o que o turista está usando.",
      image: TRA1.A19S10,
      options: ["Credit card", "Cash"],
      correctAnswer: "Credit card",
      successTitle: "Correto",
      successMessage: "Credit card significa cartão de crédito.",
    },
  },
  {
    key: "check-true-false",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e responda: verdadeiro ou falso?",
      image: TRA1.A19S7,
      audioSource: require("../../../../../mp3/TR/A1/A19S7.mp3"),
      audioDurationMs: 1400,
      statement:
        "O cliente do áudio está pedindo para ver o cardápio (menu) de novo.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage: '"The check, please" é o pedido da conta.',
    },
  },
  {
    key: "check-complete",
    component: Exercise5,
    activity: {
      prompt:
        "Você terminou o seu café espresso e quer ir embora. Você chama o atendente e diz:",
      sentenceStart: "The",
      sentenceEnd: ", please.",
      options: ["check", "coffee"],
      correctAnswer: "check",
      successTitle: "Correto",
      successMessage: "The check, please.",
    },
  },
  {
    key: "payment-vocab",
    component: Exercise1,
    activity: {
      prompt:
        "Conecte os termos de pagamento com as traduções para não errar na saída.",
      pairs: [
        { en: "The check", pt: "A conta" },
        { en: "Tip", pt: "Gorjeta" },
        { en: "Cash", pt: "Dinheiro vivo" },
      ],
      successTitle: "Correto",
      successMessage: "Vocabulário de pagamento dominado.",
    },
  },
  {
    key: "check-correct-sentence",
    component: Exercise4,
    activity: {
      prompt:
        "Como você pede a conta de forma educada em um restaurante internacional?",
      image: TRA1.A19S10,
      wrongSentence: "Payment request",
      options: ["I want pay now.", "The check, please.", "Money for you."],
      correctAnswer: "The check, please.",
      successTitle: "Correto",
      successMessage: "The check, please.",
    },
  },
  {
    key: "tip-complete-text",
    component: Exercise2,
    activity: {
      prompt: "Complete a regra de etiqueta nos EUA:",
      paragraphs: [
        [
          '"In the USA, it is important to leave a',
          { id: "blank-1", answer: "tip", options: ["tip", "passport"] },
          'for the waiter."',
        ],
      ],
      successTitle: "Correto",
      successMessage:
        "In the USA, it is important to leave a tip for the waiter.",
    },
  },
  {
    key: "check-speaking",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        'Hora de pagar e seguir viagem! Grave um áudio pedindo a conta como um verdadeiro viajante: "The check, please."',
      helperText: "The check, please.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "The check, please.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você praticou como pedir a conta.",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createTravelLessonScreen(LESSON_SLIDES);
