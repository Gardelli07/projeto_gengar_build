import { Images, TRA1 } from "../../../../util/images";
import createTravelLessonScreen from "./TravelLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "price-paying-intro",
    component: "Exercise17",
    activity: {
      label: "Price & Paying",
      content: [
        "How much is it? Você escolheu a roupa, provou e ficou ótima! Agora vem a parte final: saber o preço e pagar. No exterior, os preços nas etiquetas nem sempre incluem as taxas, então é bom estar preparado. Nesta aula, você vai aprender a perguntar o preço e escolher como quer pagar.",
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "how-much-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A22S2,
      audioSource: require("../../../../../mp3/TR/A1/A22S7.mp3"),
      audioDurationMs: 1600,
      answerOptions: ["How much is it?", "Where is it?"],
      correctOption: "How much is it?",
      successTitle: "Correto",
      feedbackMessage: '"How much is it?" significa "Quanto custa?".',
    },
  },
  {
    key: "card-or-cash-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A22S3,
      audioSource: require("../../../../../mp3/TR/A1/A22S3.mp3"),
      audioDurationMs: 1800,
      answerOptions: ["Credit card or cash?", "Table for two?"],
      correctOption: "Credit card or cash?",
      successTitle: "Correto",
      feedbackMessage: '"Cash" é dinheiro vivo.',
    },
  },
  {
    key: "sales-tax-tip",
    component: "Exercise17",
    activity: {
      label: "Dica de Nativo",
      content: [
        "Cuidado nos EUA! O preço que você vê na etiqueta não é o preço final. Na hora do caixa, eles adicionam o sales tax, que varia de 7% a 10% dependendo da cidade. Não ache que o caixa está te enganando, é apenas a lei local!",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "payment-dialogue-order",
    component: "Exercise7",
    activity: {
      prompt:
        "Você está no caixa para pagar. Organize o diálogo na ordem correta.",
      options: [
        "Hello! How much is this shirt?",
        "It's twenty dollars.",
        "Okay. Credit card, please.",
        "Perfect. Thank you!",
      ],
      correctOrder: [
        "Hello! How much is this shirt?",
        "It's twenty dollars.",
        "Okay. Credit card, please.",
        "Perfect. Thank you!",
      ],
      successTitle: "Correto",
      successMessage: "Você organizou uma compra no caixa.",
    },
  },
  {
    key: "cash-letters",
    component: "Exercise13",
    activity: {
      prompt:
        'Você quer pagar com "dinheiro vivo". Clique nas letras na ordem correta para formar essa palavra em inglês.',
      letters: ["s", "h", "a", "c"],
      audioSource: require("../../../../../mp3/TR/A1/A22S6.mpeg"),
      correctWord: "cash",
      successTitle: "Correto",
      successMessage: "Cash significa dinheiro vivo.",
    },
  },
  {
    key: "how-much-true-false",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e responda: verdadeiro ou falso?",
      image: TRA1.A22S7,
      audioSource: require("../../../../../mp3/TR/A1/A22S7.mp3"),
      audioDurationMs: 1600,
      statement: "O cliente do áudio está perguntando onde fica o provador.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage: "Ele perguntou o preço.",
    },
  },
  {
    key: "how-much-listen-write",
    component: "Exercise19",
    needsSpeech: true,
    activity: {
      prompt:
        "Ouça com atenção e escreva exatamente o que o cliente perguntou para saber o valor do produto.",
      audioSource: require("../../../../../mp3/TR/A1/A22S7.mp3"),
      audioDurationMs: 1600,
      correctAnswer: "How much is it?",
      placeholder: "Digite a pergunta",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "How much is it?",
      errorMessage: 'Confira a pergunta: "How much is it?"',
    },
  },
  {
    key: "how-much-write-order",
    component: "Exercise18",
    activity: {
      prompt:
        "Não clique, digite! Coloque as palavras na ordem correta para perguntar o preço.",
      scrambledSentence: "it / much / ? / How / is",
      correctAnswer: "How much is it?",
      placeholder: "Digite a pergunta",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "How much is it?",
    },
  },
  {
    key: "credit-card-correct-sentence",
    component: "Exercise4",
    activity: {
      prompt:
        "Na hora de pagar, você quer usar o seu cartão de crédito. O que você diz para o vendedor?",
      image: TRA1.A22S10,
      wrongSentence: "Payment method",
      options: ["I have cash.", "Credit card, please.", "Where is the card?"],
      correctAnswer: "Credit card, please.",
      successTitle: "Correto",
      successMessage: "Credit card, please.",
    },
  },
  {
    key: "how-much-writing",
    component: "Exercise12",
    activity: {
      prompt: "Writing",
      instruction:
        'Imagine que você está em uma feirinha de rua e não vê o preço de um chapéu. Digite em inglês a pergunta para o vendedor: "Quanto custa?".',
      placeholder: "How much is it?",
      helperText: "Use How much...",
      tipText: "How much is it?",
      submitLabel: "Enviar",
      successTitle: "Correto",
      successMessage: "How much is it?",
    },
  },
  {
    key: "how-much-speaking",
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction:
        'Prática de fala! Grave um áudio perguntando o preço como se estivesse com o produto na mão agora: "How much is it?".',
      helperText: "How much is it?",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "How much is it?",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você praticou como perguntar o preço.",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createTravelLessonScreen(LESSON_SLIDES);
