import { BUB1, Images } from "../../../../util/images";
import createBusinessLessonScreen from "./BusinessLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "deadlocks-intro",
    component: "Exercise17",
    activity: {
      label: "Destravando o Impasse (Deadlock)",
      content: [
        `O que fazer quando o comprador não quer pagar mais e você não pode cobrar menos? A negociação travou. Em inglês avançado, chamamos esse "beco sem saída" de Deadlock (impasse). Para salvar o negócio e quebrar o gelo, líderes propõem ceder um pouco de cada lado dizendo: "Let's find a middle ground" (Vamos encontrar um meio-termo).`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "deadlock-match",
    component: "Exercise1",
    activity: {
      prompt:
        "Conecte o vocabulário de resolução de conflitos com os seus significados em português.",
      pairs: [
        { en: "Deadlock", pt: "Impasse / Beco sem saída na negociação" },
        { en: "Find a middle ground", pt: "Encontrar um meio-termo" },
      ],
      successTitle: "Correto",
      successMessage:
        "Deadlock é o travamento; middle ground é o caminho para sair dele.",
    },
  },
  {
    key: "deadlock-image-match",
    component: "Exercise15",
    activity: {
      prompt:
        "Clique na imagem e na expressão exata que a descreve no mundo dos negócios.",
      images: [
        { id: "deadlock-img", image: BUB1.A15S3p1 },
        { id: "middle-img", image: BUB1.A15S3p2 },
      ],
      words: [
        { id: "deadlock-word", label: "Deadlock" },
        { id: "middle-word", label: "Find a middle ground" },
      ],
      pairs: [
        { imageId: "deadlock-img", wordId: "deadlock-word" },
        { imageId: "middle-img", wordId: "middle-word" },
      ],
      successTitle: "Correto",
      successMessage: "Um bloqueio pede um meio-termo.",
    },
  },
  {
    key: "middle-ground-correct",
    component: "Exercise4",
    activity: {
      prompt:
        "A negociação chegou a um limite onde ninguém quer ceder. Qual frase sugere que ambos abram mão um pouco?",
      image: BUB1.A15S4,
      wrongSentence: "Middle ground",
      options: [
        "Let's find a middle ground.",
        "Let's look a center ground.",
        "Let's find a medium ground.",
      ],
      correctAnswer: "Let's find a middle ground.",
      successTitle: "Correto",
      successMessage:
        'A combinação natural para "meio-termo" é "middle ground".',
    },
  },
  {
    key: "summarize-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Ouça a palavra isolada e escolha a alternativa correta.",
      image: BUB1.A15S5,
      audioSource: require("../../../../../mp3/BU/B1/A15S5.mp3"),
      audioDurationMs: 1200,
      answerOptions: ["Summarize", "Summer"],
      correctOption: "Summarize",
      successTitle: "Correto",
      feedbackMessage: '"Summarize" é resumir para não deixar pontas soltas.',
    },
  },
  {
    key: "closing-tip",
    component: "Exercise17",
    activity: {
      label: "O Xeque-Mate e o Aperto de Mãos",
      content: [
        `Antes de comemorar, um negociador profissional amarra o acordo para evitar surpresas. Use: "To summarize our agreed terms..." (Para resumir nossos termos acordados...). Depois, faça a pergunta de ouro para o fechamento verbal: "Do we have a deal?" (Temos um acordo?). Essa é a deixa para o aperto de mãos final!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "summarize-complete",
    component: "Exercise5",
    activity: {
      prompt:
        "Você precisa recapitular o que foi decidido para garantir que não há dúvidas.",
      sentenceStart: "Before we finish, allow me to",
      sentenceEnd: "our agreed terms.",
      options: ["summarize", "subtract"],
      correctAnswer: "summarize",
      successTitle: "Correto",
      successMessage:
        '"Summarize our agreed terms" fecha o acordo com clareza.',
    },
  },
  {
    key: "deal-spell",
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt:
        'Organize as letras para formar a palavra que representa "Acordo" ou "Negócio Fechado".',
      audioSource: require("../../../../../mp3/BU/B1/A15S8.mp3"),
      audioDurationMs: 900,
      letters: ["E", "A", "L", "D"],
      correctWord: "DEAL",
      successTitle: "Correto",
      successMessage: "DEAL.",
    },
  },
  {
    key: "final-supplier-complete",
    component: "Exercise2",
    activity: {
      prompt:
        "Leia a fala final do fornecedor brasileiro e preencha as lacunas.",
      paragraphs: [
        [
          "Since we reached a ",
          {
            id: "blank-1",
            options: ["deadlock", "deadline"],
            answer: "deadlock",
          },
          " on the price, let's find a ",
          { id: "blank-2", options: ["medium", "middle"], answer: "middle" },
          " ground. I'll drop the price by 5%. To ",
          {
            id: "blank-3",
            options: ["summarize", "surprise"],
            answer: "summarize",
          },
          " our agreed terms: 5% discount and delivery in 30 days. Do we have a ",
          { id: "blank-4", options: ["deal", "doubt"], answer: "deal" },
          "?",
        ],
      ],
      successTitle: "Correto",
      successMessage: "Você destravou o impasse e fechou o acordo.",
    },
  },
  {
    key: "middle-ground-audio",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt:
        "Escute a compradora americana aceitando a proposta. A afirmação escrita é verdadeira ou falsa?",
      image: BUB1.A15S10,
      audioSource: require("../../../../../mp3/BU/B1/A15S10.mp3"),
      audioDurationMs: 8500,
      statement:
        "Eles encontraram um meio-termo perfeito e a compradora confirmou que eles têm um acordo.",
      options: ["true", "false"],
      correctAnswer: "true",
      successTitle: "Correto",
      feedbackMessage: 'Ela diz "we have a deal".',
    },
  },
  {
    key: "deal-order",
    component: "Exercise6",
    activity: {
      prompt:
        "Clique nas palavras na ordem correta para fazer a pergunta matadora de fechamento.",
      words: ["deal", "we", "have", "a", "do", "?"],
      correctOrder: ["do", "we", "have", "a", "deal", "?"],
      successTitle: "Correto",
      successMessage: "Do we have a deal?",
    },
  },
  {
    key: "deadlock-speaking",
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction:
        'A mesa está em deadlock. Sugira um meio-termo, resuma os termos acordados e finalize perguntando "Do we have a deal?".',
      helperText:
        "Let's find a middle ground. To summarize our agreed terms, we offer a 5% discount and delivery in 30 days. Do we have a deal?",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "Let's find a middle ground. To summarize our agreed terms, we offer a 5% discount and delivery in 30 days. Do we have a deal?",
      recordLabel: "Gravar Áudio",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você fechou como um closer.",
    },
  },
  {
    key: "deadlocks-feedback",
    component: "Exercise17",
    activity: {
      label: "Você é um Closer (Fechador de Negócios)!",
      content: [
        `Vitória absoluta! Você não apenas sobreviveu ao Módulo 3, mas dominou a sala. Você aprendeu a ancorar propostas, proteger sua margem com dealbreakers, usar vocabulário pesado de logística e, finalmente, destravar impasses com "Middle ground" para fechar contratos com o lendário "Do we have a deal?". Você está falando como um verdadeiro Diretor Internacional. Prepare-se, porque no Módulo 4 nós vamos focar na Resolução e Responsabilidade!`,
      ],
      continueLabel: "Finalizar",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
