import { Exercise1 } from "../../../../exc/ex1";
import { Exercise2 } from "../../../../exc/ex2";
import { Exercise3 } from "../../../../exc/ex3";
import { Exercise4 } from "../../../../exc/ex4";
import { Exercise5 } from "../../../../exc/ex5";
import { Exercise6 } from "../../../../exc/ex6";
import { Exercise13 } from "../../../../exc/ex13";
import { Exercise14 } from "../../../../exc/ex14";
import { Exercise15 } from "../../../../exc/ex15";
import { Exercise16 } from "../../../../exc/ex16";
import { Exercise17 } from "../../../../exc/ex17";
import { BUB1, Images } from "../../../../util/images";
import createBusinessLessonScreen from "./BusinessLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "timeboxing-intro",
    component: Exercise17,
    activity: {
      label: 'A Arte do "Timeboxing"',
      content: [
        `Em reuniões avançadas, você não diz apenas "We have no time". Líderes proativos usam a técnica de Timeboxing, que significa estabelecer uma "caixa de tempo" exata para um assunto. Eles dizem: "Let's timebox this discussion to 5 minutes" (Vamos limitar essa discussão a 5 minutos). Além disso, quando o relógio aperta, a expressão nativa mais natural é: "We're running short on time" (Estamos ficando com o tempo curto / ficando sem tempo). Assuma o controle do relógio!`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "timeboxing-match",
    component: Exercise1,
    activity: {
      prompt:
        "Conecte as expressões de controle de tempo com os seus significados em português.",
      pairs: [
        {
          en: "Timebox this discussion",
          pt: "Limitar o tempo dessa discussão",
        },
        { en: "Running short on time", pt: "Ficando com o tempo curto" },
      ],
      successTitle: "Correto",
      successMessage: "Você já tem as expressões para controlar o relógio.",
    },
  },
  {
    key: "timebox-short-image-match",
    component: Exercise15,
    activity: {
      prompt: "Clique na imagem e na expressão exata que a descreve.",
      images: [
        { id: "timebox-img", image: BUB1.A4S3p1 },
        { id: "short-img", image: BUB1.A4S3p2 },
      ],
      words: [
        { id: "timebox-word", label: "Timebox this discussion" },
        { id: "short-word", label: "Running short on time" },
      ],
      pairs: [
        { imageId: "timebox-img", wordId: "timebox-word" },
        { imageId: "short-img", wordId: "short-word" },
      ],
      successTitle: "Correto",
      successMessage: "Timebox limita; running short on time cria urgência.",
    },
  },
  {
    key: "timebox-to-correct",
    component: Exercise4,
    activity: {
      prompt:
        "Você precisa impor um limite de tempo. Qual é a estrutura escrita corretamente?",
      image: BUB1.A4S4,
      wrongSentence: "Time limit",
      options: [
        "Let's timebox this discussion in 5 minutes.",
        "Let's timebox this discussion at 5 minutes.",
        "Let's timebox this discussion to 5 minutes.",
      ],
      correctAnswer: "Let's timebox this discussion to 5 minutes.",
      successTitle: "Correto",
      successMessage: 'Usamos "to" para indicar o limite alocado.',
    },
  },
  {
    key: "wrap-up-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt:
        "Ouça a palavra isolada e escolha a alternativa correta que você escutou.",
      image: BUB1.A4S5,
      audioSource: require("../../../../../mp3/BU/B1/A4S5.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Wrap up", "Rap up"],
      correctOption: "Wrap up",
      successTitle: "Correto",
      feedbackMessage: '"Wrap up" significa concluir/amarrar o assunto.',
    },
  },
  {
    key: "wrap-up-tip",
    component: Exercise17,
    activity: {
      label: 'O "Wrap-up" e a Transição',
      content: [
        `Quando o limite de tempo de um tópico acaba, você precisa fechá-lo e seguir em frente. Em vez de dizer o seco "Finish this", no mundo corporativo usamos o phrasal verb: "Let's wrap this up" (Vamos concluir/amarrar isso). Em seguida, para fazer a transição com elegância, diga: "Let's move on to the next item" (Vamos seguir para o próximo item da pauta).`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "wrap-complete",
    component: Exercise5,
    activity: {
      prompt:
        'Qual é a palavra certa para convidar a equipe a "amarrar" e concluir o assunto?',
      sentenceStart: "We made good progress, but let's",
      sentenceEnd: "this up now.",
      options: ["wrap", "close"],
      correctAnswer: "wrap",
      successTitle: "Correto",
      successMessage: "Let's wrap this up now.",
    },
  },
  {
    key: "move-spell",
    component: Exercise13,
    needsSpeech: true,
    activity: {
      prompt:
        'Organize as letras para formar a palavra essencial em "Let\'s ________ on".',
      audioText: "Move",
      audioDurationMs: 900,
      letters: ["E", "O", "M", "V"],
      correctWord: "MOVE",
      successTitle: "Correto",
      successMessage: "MOVE.",
    },
  },
  {
    key: "timeboxing-complete",
    component: Exercise2,
    activity: {
      prompt:
        "Leia a fala do líder e preencha as lacunas com as alternativas corretas de controle de tempo.",
      paragraphs: [
        [
          "Guys, we are running ",
          { id: "blank-1", options: ["short", "fast"], answer: "short" },
          " on time. We need to ",
          { id: "blank-2", options: ["timebox", "limit"], answer: "timebox" },
          " this discussion to 2 minutes, so please, let's ",
          { id: "blank-3", options: ["wrap", "pack"], answer: "wrap" },
          " this up and move on.",
        ],
      ],
      successTitle: "Correto",
      successMessage: "Você controlou o tempo e a transição.",
    },
  },
  {
    key: "wrap-move-audio-true-false",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt:
        "Escute o áudio. A afirmação escrita é verdadeira ou falsa sobre o que a líder quer fazer?",
      image: BUB1.A4S10,
      audioSource: require("../../../../../mp3/BU/B1/A4S10.mp3"),
      audioDurationMs: 5200,
      statement:
        "A líder quer finalizar a reunião inteira e ir todo mundo embora.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage:
        '"Move on to the next item" significa passar para o próximo tópico da pauta.',
    },
  },
  {
    key: "wrap-move-order",
    component: Exercise6,
    activity: {
      prompt:
        "Clique nas palavras na ordem correta para concluir um assunto e passar para o próximo.",
      words: [
        "up",
        "this",
        "wrap",
        "let's",
        ",",
        "to",
        "the",
        "item",
        "move",
        "next",
        "and",
        "on",
      ],
      correctOrder: [
        "let's",
        "wrap",
        "this",
        "up",
        ",",
        "and",
        "move",
        "on",
        "to",
        "the",
        "next",
        "item",
      ],
      successTitle: "Correto",
      successMessage: "Let's wrap this up, and move on to the next item.",
    },
  },
  {
    key: "timeboxing-audio-practice",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        "A reunião está demorando demais no tópico de Marketing. Grave um áudio avisando que vocês estão ficando sem tempo, pedindo para concluir o assunto e passando para o próximo item.",
      helperText:
        "We're running short on time. Let's wrap this up and move on to the next item.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "We're running short on time. Let's wrap this up and move on to the next item.",
      recordLabel: "Gravar Áudio",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você conduziu o ritmo da reunião.",
    },
  },
  {
    key: "timeboxing-feedback",
    component: Exercise17,
    activity: {
      label: "Você é o dono do relógio!",
      content: [
        `Excelente! Agora você tem o kit completo para dominar o ritmo (pacing) de qualquer reunião. Usando "Timebox" você impõe limites claros; com "Running short on time" você cria senso de urgência; e com "Wrap up" e "Move on" você conduz a equipe de um assunto para o outro sem parecer ditatorial. Você está agindo exatamente como um executivo nativo. Na nossa próxima e última aula deste módulo (Aula 5), aprenderemos a mediar conflitos e acalmar os ânimos!`,
      ],
      continueLabel: "Finalizar",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
