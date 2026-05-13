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
    key: "anchor-intro",
    component: Exercise17,
    activity: {
      label: 'Como Lançar a "Âncora" Financeira',
      content: [
        `Em negociações de alto nível, quem fala o primeiro número estabelece a "âncora" psicológica da mesa. Um nativo avançado nunca diz "I want 100 thousand dollars". Para apresentar seus termos com autoridade e definir o ponto de partida da negociação, usamos: "Our baseline proposal is..." (Nossa proposta base/inicial é...). E para mostrar o que sua empresa pode colocar na mesa com confiança, dizemos: "We are positioned to offer..." (Estamos posicionados para oferecer...).`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "anchor-match",
    component: Exercise1,
    activity: {
      prompt: "Conecte as expressões de abertura de negociação com os seus significados em português.",
      pairs: [
        { en: "Baseline proposal", pt: "Proposta base / Ponto de partida" },
        { en: "Positioned to offer", pt: "Posicionados para oferecer" },
      ],
      successTitle: "Correto",
      successMessage: "Essas expressões abrem a negociação com autoridade.",
    },
  },
  {
    key: "baseline-correct",
    component: Exercise4,
    activity: {
      prompt: "Chegou a hora de falar de valores. Qual é a frase escrita corretamente?",
      image: BUB1.A11S10,
      wrongSentence: "Anchor",
      options: [
        "Our basic line proposal is $50,000.",
        "Our baseline proposal is $50,000.",
        "Our base line propose is $50,000.",
      ],
      correctAnswer: "Our baseline proposal is $50,000.",
      successTitle: "Correto",
      successMessage: '"Baseline" é escrito como uma única palavra neste contexto.',
    },
  },
  {
    key: "rationale-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: 'Ouça a palavra isolada e escolha a alternativa correta. É a palavra avançada para "justificativa lógica".',
      image: BUB1.A11S5,
      audioSource: require("../../../../../mp3/BU/B1/A11S5.mp3"),
      audioText: "Rationale.",
      audioDurationMs: 1200,
      answerOptions: ["Rationale", "Rational"],
      correctOption: "Rationale",
      successTitle: "Correto",
      feedbackMessage: 'Pronúncia aproximada: "ra-sho-NÉU".',
    },
  },
  {
    key: "figure-tip",
    component: Exercise17,
    activity: {
      label: "Justificando o seu Preço",
      content: [
        `Quando o cliente pergunta "Why is it so expensive?", um falante amador diz "The reason for the price is...". Em negociações High-Stakes, nós evitamos as palavras "price" ou "cost" na abertura, pois elas geram atrito. Chamamos o valor de Figure (cifra/número) e usamos Rationale (lógica/justificativa). A frase perfeita é: "The rationale behind this figure is..."`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "rationale-complete",
    component: Exercise5,
    activity: {
      prompt: "O comprador americano questionou o valor da sua proposta. Como você começa a justificar esse valor?",
      image: BUB1.A11S5,
      sentenceStart: "I understand your concern. The",
      sentenceEnd: "behind this figure is our premium material quality.",
      options: ["rationale", "reason"],
      correctAnswer: "rationale",
      successTitle: "Correto",
      successMessage: '"Rationale" soa mais técnico e embasado.',
    },
  },
  {
    key: "figure-spell",
    component: Exercise13,
    needsSpeech: true,
    activity: {
      prompt: 'Organize as letras para formar a palavra "Cifra/Número".',
      audioText: "Figure",
      audioDurationMs: 1000,
      letters: ["G", "U", "R", "I", "F", "E"],
      correctWord: "FIGURE",
      successTitle: "Correto",
      successMessage: "FIGURE.",
    },
  },
  {
    key: "pitch-complete",
    component: Exercise2,
    activity: {
      prompt: "Leia a fala do negociador e preencha as lacunas com as alternativas corretas.",
      paragraphs: [
        [
          "Gentlemen, to start, our ",
          { id: "blank-1", options: ["baseline", "sideline"], answer: "baseline" },
          " proposal is $100k. We are ",
          { id: "blank-2", options: ["pointed", "positioned"], answer: "positioned" },
          " to offer full logistics support. The ",
          { id: "blank-3", options: ["rationale", "national"], answer: "rationale" },
          " behind this figure is the speed of delivery.",
        ],
      ],
      successTitle: "Correto",
      successMessage: "Você montou um pitch de negociação de alto nível.",
    },
  },
  {
    key: "anchor-audio",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt: "Escute o vendedor estabelecendo os termos. A afirmação escrita é verdadeira ou falsa?",
      image: BUB1.A11S10,
      audioSource: require("../../../../../mp3/BU/B1/A11S10.mp3"),
      audioText: "Our baseline proposal is $200,000. I know it seems high, but the rationale behind this figure is the exclusive technology we are positioned to offer.",
      audioDurationMs: 7800,
      statement: "O vendedor diz que a justificativa para essa cifra alta é a tecnologia exclusiva que eles oferecem.",
      options: ["true", "false"],
      correctAnswer: "true",
      successTitle: "Correto",
      feedbackMessage: "A tecnologia exclusiva é o rationale por trás da figure.",
    },
  },
  {
    key: "rationale-order",
    component: Exercise6,
    activity: {
      prompt: "Clique nas palavras na ordem correta para introduzir a sua justificativa.",
      words: ["figure", "this", "behind", "rationale", "the", "is"],
      correctOrder: ["the", "rationale", "behind", "this", "figure", "is"],
      successTitle: "Correto",
      successMessage: "The rationale behind this figure is.",
    },
  },
  {
    key: "license-pitch-speaking",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        'Venda a licença anual do app Lingueto: diga que a proposta base é 10 mil dólares, que vocês estão posicionados para oferecer treinamento completo e que a justificativa por trás dessa cifra é a alta tecnologia.',
      helperText: "Our baseline proposal is $10,000. We are positioned to offer complete training. The rationale behind this figure is our high technology.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Our baseline proposal is $10,000. We are positioned to offer complete training. The rationale behind this figure is our high technology.",
      recordLabel: "Gravar Áudio",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você ancorou a proposta com autoridade.",
    },
  },
  {
    key: "anchor-feedback",
    component: Exercise17,
    activity: {
      label: "Você ancorou a negociação!",
      content: [
        `Você acabou de dar uma aula de negociação! Ao usar "Baseline proposal", você indica que o valor é o início da conversa, mas sem parecer desesperado. E ao usar a dupla "Rationale" e "Figure", você retira a carga emocional das palavras "preço" e "custo", mantendo a discussão focada em lógica e valor agregado. Na próxima aula, vamos aprender as frases de ouro para fazer concessões e contrapropostas!`,
      ],
      continueLabel: "Finalizar",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
