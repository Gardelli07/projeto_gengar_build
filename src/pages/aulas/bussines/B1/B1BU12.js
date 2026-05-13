import { Exercise1 } from "../../../../exc/ex1";
import { Exercise2 } from "../../../../exc/ex2";
import { Exercise3 } from "../../../../exc/ex3";
import { Exercise4 } from "../../../../exc/ex4";
import { Exercise5 } from "../../../../exc/ex5";
import { Exercise6 } from "../../../../exc/ex6";
import { Exercise13 } from "../../../../exc/ex13";
import { Exercise14 } from "../../../../exc/ex14";
import { Exercise16 } from "../../../../exc/ex16";
import { Exercise17 } from "../../../../exc/ex17";
import { BUB1, Images } from "../../../../util/images";
import createBusinessLessonScreen from "./BusinessLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "concessions-intro",
    component: Exercise17,
    activity: {
      label: "A Regra de Ouro: Nunca Ceda de Graça",
      content: [
        `Em negociações de alto nível, quando o cliente pede um desconto, um amador diz "Okay, I can give you a discount". Um negociador nativo avançado usa condicionais para trocar variáveis. Se você vai ceder em algo, o outro lado tem que se comprometer com outra coisa. A estrutura imbatível é: "If you can commit to [X], we can concede on [Y]".`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "concessions-match",
    component: Exercise1,
    activity: {
      prompt: "Conecte as expressões de troca (trade-offs) com os seus significados em português corporativo.",
      pairs: [
        { en: "Commit to", pt: "Comprometer-se com (garantir algo)" },
        { en: "Concede on", pt: "Ceder em (abrir mão de algo)" },
      ],
      successTitle: "Correto",
      successMessage: "Negociadores fortes cedem apenas quando recebem algo em troca.",
    },
  },
  {
    key: "commit-concede-correct",
    component: Exercise4,
    activity: {
      prompt: "O cliente pediu frete grátis. Você só vai dar o frete se ele comprar 500 unidades. Qual estrutura está correta?",
      image: BUB1.A12S10,
      wrongSentence: "Trade-off",
      options: [
        "If you can commit to 500 units, we can concede on the shipping.",
        "If you can commit on 500 units, we can concede to the shipping.",
        "If you can commit at 500 units, we can concede at the shipping.",
      ],
      correctAnswer: "If you can commit to 500 units, we can concede on the shipping.",
      successTitle: "Correto",
      successMessage: 'Use "commit to" e "concede on".',
    },
  },
  {
    key: "dealbreaker-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Ouça a palavra isolada e escolha a alternativa correta.",
      image: BUB1.A12S5,
      audioSource: require("../../../../../mp3/BU/B1/A12S5.mp3"),
      audioText: "Dealbreaker.",
      audioDurationMs: 1100,
      answerOptions: ["Dealmaker", "Dealbreaker"],
      correctOption: "Dealbreaker",
      successTitle: "Correto",
      feedbackMessage: '"Dealbreaker" é o fator que quebra o acordo.',
    },
  },
  {
    key: "limits-tip",
    component: Exercise17,
    activity: {
      label: "Impondo Limites e Testando a Flexibilidade",
      content: [
        `Como você diz um "NÃO" absoluto em uma negociação sem bater na mesa? Nativos usam: "That's a dealbreaker for us" (Isso é inegociável para nós). E se o limite for do outro lado e você quiser testar se eles abrem uma exceção, pergunte educadamente: "Is there any flexibility on...?"`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "dealbreaker-complete",
    component: Exercise5,
    activity: {
      prompt: "O fornecedor quer aumentar o preço em 40%. Complete a frase para impor seu limite final.",
      image: BUB1.A12S5,
      sentenceStart: "I'm sorry, but a 40% price increase is a",
      sentenceEnd: "for us. We cannot accept that.",
      options: ["dealbreaker", "dealmaker"],
      correctAnswer: "dealbreaker",
      successTitle: "Correto",
      successMessage: '"Dealbreaker" marca uma linha vermelha da negociação.',
    },
  },
  {
    key: "flexibility-spell",
    component: Exercise13,
    needsSpeech: true,
    activity: {
      prompt: 'Organize as letras para formar a palavra em "Is there any ________ on the deadline?".',
      audioText: "Flexibility",
      audioDurationMs: 1400,
      letters: ["X", "E", "L", "F", "I", "B", "I", "I", "L", "Y", "T"],
      correctWord: "FLEXIBILITY",
      successTitle: "Correto",
      successMessage: "FLEXIBILITY.",
    },
  },
  {
    key: "tradeoff-complete",
    component: Exercise2,
    activity: {
      prompt: 'Leia a negociação completa e preencha as lacunas.',
      paragraphs: [
        [
          'Buyer: "Is there any ',
          { id: "blank-1", options: ["flexibility", "possibility"], answer: "flexibility" },
          ' on the price?"\nSeller: "If you can ',
          { id: "blank-2", options: ["connect", "commit"], answer: "commit" },
          " to a larger volume, we can ",
          { id: "blank-3", options: ["concede", "cancel"], answer: "concede" },
          " on the price. However, changing the delivery schedule is a ",
          { id: "blank-4", options: ["dealmaker", "dealbreaker"], answer: "dealbreaker" },
          '."',
        ],
      ],
      successTitle: "Correto",
      successMessage: "Você negociou concessões e limites no mesmo diálogo.",
    },
  },
  {
    key: "counter-offer-audio",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt: "Escute o vendedor respondendo à contraproposta. A afirmação escrita é verdadeira ou falsa?",
      image: BUB1.A12S10,
      audioSource: require("../../../../../mp3/BU/B1/A12S10.mp3"),
      audioText: "We can concede on the payment terms if you commit to five years. But removing the support team is a dealbreaker for us.",
      audioDurationMs: 6700,
      statement: "O vendedor disse que tirar a equipe de suporte é algo aceitável e negociável para eles.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage: "Remover a equipe de suporte é um dealbreaker.",
    },
  },
  {
    key: "flexibility-order",
    component: Exercise6,
    activity: {
      prompt: "Clique nas palavras na ordem correta para testar se há margem no prazo.",
      words: ["flexibility", "any", "there", "the", "is", "deadline", "on", "?"],
      correctOrder: ["is", "there", "any", "flexibility", "on", "the", "deadline", "?"],
      successTitle: "Correto",
      successMessage: "Is there any flexibility on the deadline?",
    },
  },
  {
    key: "discount-speaking",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        'O cliente quer 20% de desconto. Pergunte sobre flexibilidade na quantidade, proponha "If you commit to 1000 units..." e finalize dizendo que desconto de graça é dealbreaker.',
      helperText: "Is there any flexibility on the quantity? If you commit to 1000 units, we can concede on the price. A free discount is a dealbreaker for us.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Is there any flexibility on the quantity? If you commit to 1000 units, we can concede on the price. A free discount is a dealbreaker for us.",
      recordLabel: "Gravar Áudio",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você negociou como profissional.",
    },
  },
  {
    key: "concessions-feedback",
    component: Exercise17,
    activity: {
      label: "Você não cede, você Negocia!",
      content: [
        `Absolutamente impecável! Substituir "Give a discount" pelo poder do "If you commit to X, we concede on Y" muda a forma como o mercado te vê. Você se posiciona não como alguém pedindo um favor, mas como um parceiro de negócios buscando benefício mútuo. E ao usar "Dealbreaker", você estabelece respeito instantâneo. Na próxima aula, vamos mergulhar no vocabulário avançado de Sourcing e Cadeia de Suprimentos.`,
      ],
      continueLabel: "Finalizar",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
