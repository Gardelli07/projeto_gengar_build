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
    key: "baggage-claim-intro",
    component: Exercise17,
    activity: {
      label: "Baggage Claim & Exiting",
      content: [
        "Welcome to a new country! Você passou pela imigração, parabéns! O último passo dentro do aeroporto é pegar a sua mala e ir para a rua aproveitar a viagem. Nesta aula, você vai aprender a encontrar a esteira de bagagens, perguntar pela saída e, caso o pior aconteça, saber avisar que a sua mala foi perdida sem entrar em pânico!",
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "baggage-claim-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A9S2,
      audioSource: require("../../../../../mp3/TR/A1/A9S2.mp3"),
      audioDurationMs: 1400,
      answerOptions: ["Baggage claim", "Boarding pass"],
      correctOption: "Baggage claim",
      successTitle: "Correto",
      feedbackMessage: '"Baggage claim" é a esteira/restituição de bagagens.',
    },
  },
  {
    key: "exit-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A9S3,
      audioSource: require("../../../../../mp3/TR/A1/A9S3.mp3"),
      audioDurationMs: 900,
      answerOptions: ["Exit", "Entrance"],
      correctOption: "Exit",
      successTitle: "Correto",
      feedbackMessage: '"Exit" significa saída.',
    },
  },
  {
    key: "lost-bag-tip",
    component: Exercise17,
    activity: {
      label: "Dica de Sobrevivência",
      content: [
        `Ficou esperando e a sua mala (bag) não apareceu? Respire fundo, vá até o balcão da companhia aérea e use apenas estas 4 palavras mágicas:

"My bag is lost."

Eles vão te dar um formulário e cuidar de tudo. Lembre-se: "Lost" = perdido.`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "lost-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A9S5,
      audioSource: require("../../../../../mp3/TR/A1/A9S5.mp3"),
      audioDurationMs: 900,
      answerOptions: ["Lost", "Found"],
      correctOption: "Lost",
      successTitle: "Correto",
      feedbackMessage: '"Lost" significa perdido(a).',
    },
  },
  {
    key: "bag-lost-complete",
    component: Exercise5,
    activity: {
      prompt:
        "A esteira parou, todo mundo foi embora e sua mala não chegou. Você vai ao balcão e diz:",
      image: TRA1.A9S5,
      sentenceStart: "My bag is",
      sentenceEnd: ".",
      options: ["lost", "here"],
      correctAnswer: "lost",
      successTitle: "Correto",
      successMessage: "My bag is lost.",
    },
  },
  {
    key: "baggage-claim-true-false",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e responda: verdadeiro ou falso?",
      image: TRA1.A9S7,
      audioSource: require("../../../../../mp3/TR/A1/A9S7.mp3"),
      audioDurationMs: 2100,
      statement:
        "O passageiro do áudio está perguntando onde fica a saída do aeroporto.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage: 'Ele pergunta pela "baggage claim", não pela saída.',
    },
  },
  {
    key: "airport-exit-vocab-match",
    component: Exercise1,
    activity: {
      prompt: "Conecte o vocabulário de saída do aeroporto com as traduções.",
      pairs: [
        { en: "Baggage claim", pt: "Esteira de bagagens" },
        { en: "Exit", pt: "Saída" },
        { en: "Lost", pt: "Perdido(a)" },
      ],
      successTitle: "Correto",
      successMessage: "Vocabulário final do aeroporto dominado.",
    },
  },
  {
    key: "where-exit-order",
    component: Exercise6,
    activity: {
      prompt: "Clique nas palavras para escrever a frase na ordem correta.",
      words: ["the", "is", "Where", "exit", "?"],
      correctOrder: ["Where", "is", "the", "exit", "?"],
      successTitle: "Correto",
      successMessage: "Where is the exit?",
    },
  },
  {
    key: "where-exit-correct-sentence",
    component: Exercise4,
    activity: {
      prompt:
        "Você pegou a sua mala e quer saber para que lado fica a saída do aeroporto. Qual é a forma correta de perguntar?",
      image: TRA1.A9S3,
      wrongSentence: "Exit question",
      options: ["Where is the exit?", "What is exit?", "The exit, where?"],
      correctAnswer: "Where is the exit?",
      successTitle: "Correto",
      successMessage: "Where is the exit?",
    },
  },
  {
    key: "my-bag-is-lost-writing",
    component: Exercise12,
    activity: {
      prompt: "Writing",
      instruction:
        'O pior aconteceu e sua mala sumiu! Vá até o balcão da companhia aérea. Digite em inglês a frase de resgate: "Minha mala está perdida".',
      placeholder: "My bag is lost.",
      helperText: "Use My bag is...",
      tipText: "My bag is lost.",
      submitLabel: "Enviar",
      successTitle: "Correto",
      successMessage: "My bag is lost.",
    },
  },
  {
    key: "where-exit-speaking",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        'Você está com as malas prontas e animado para ir para o hotel. Aperte para gravar e pergunte em inglês: "Onde é a saída?".',
      helperText: "Where is the exit?",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Where is the exit?",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você praticou a pergunta pela saída.",
    },
  },
  {
    key: "lesson-finish",
    type: "finish",
  },
];

export default createTravelLessonScreen(LESSON_SLIDES);
