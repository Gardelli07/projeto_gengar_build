import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "separable-phrasal-verbs-intro",
    component: "Exercise17",
    activity: {
      label: "Phrasal Verbs: Separar ou Não Separar?",
      content: [
        `Alguns Phrasal Verbs podem ser separados pelo objeto.

Exemplo:
Turn on the TV -> Turn the TV on.

A REGRA DE OURO NATIVA:
Se você usar um pronome (it, them, him), você obrigatoriamente deve separar o verbo.

Certo: Turn it on.
Errado: Turn on it.`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "turn-it-on-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e escolha a alternativa correta.",
      audioSource: require("../../../../../mp3/IC/B1/A35S2.mp3"),
      audioDurationMs: 1200,
      image: ICB1.A35S2,
      answerOptions: ["Turn on it", "Turn it on"],
      correctOption: "Turn it on",
      successTitle: "Correto",
      feedbackMessage: 'Com pronome, separe: "Turn it on", nunca "Turn on it".',
    },
  },
  {
    key: "throw-it-away",
    component: "Exercise4",
    activity: {
      prompt:
        'O Phrasal Verb "Throw away" é separável. Escolha a frase correta usando o pronome "it".',
      image: ICB1.A35S3,
      wrongSentence: "Throw away + it",
      options: [
        "Throw away it immediately!",
        "Throw it away immediately!",
        "It throw away immediately!",
      ],
      correctAnswer: "Throw it away immediately!",
      successTitle: "Correto",
      successMessage: "Com pronomes, o objeto fica no meio do phrasal verb.",
    },
  },
  {
    key: "inseparable-tip",
    component: "Exercise17",
    activity: {
      label: "Os Inseparáveis",
      content: [
        `Alguns Phrasal Verbs nunca se separam, não importa se você usa pronome ou não.

Geralmente, são verbos de movimento ou direão.

Exemplo:
Get on (subir no ânibus/trem).

Você diz:
Get on it.

Nunca:
Get it on.`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "get-on-train-true-false",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e responda: Verdadeiro ou Falso?",
      image: ICB1.A35S5,
      audioSource: require("../../../../../mp3/IC/B1/A35S5.mp3"),
      audioDurationMs: 2600,
      statement:
        'The phrase "get the train on" is also correct in this context.',
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage: "Get on é inseparável nesse contexto.",
    },
  },
  {
    key: "pick-it-up-order",
    component: "Exercise6",
    activity: {
      prompt:
        '"Pick up" é separável. Clique nas palavras para escrever a frase.',
      words: ["up", "Please,", "it", "pick"],
      correctOrder: ["Please,", "pick", "it", "up"],
      successTitle: "Correto",
      successMessage: "Please, pick it up.",
    },
  },
  {
    key: "wallet-pick-throw",
    component: "Exercise2",
    activity: {
      prompt: "Complete o texto com as alternativas.",
      paragraphs: [
        [
          "I found a wallet on the street. I decided to ",
          {
            id: "blank-1",
            options: ["pick it up", "pick up it"],
            answer: "pick it up",
          },
          " and try to find the owner. I couldn't just ",
          {
            id: "blank-2",
            options: ["throw away it", "throw it away"],
            answer: "throw it away",
          },
          ".",
        ],
      ],
      successTitle: "Correto",
      successMessage: "Pick it up e throw it away seguem a regra do pronome.",
    },
  },
  {
    key: "take-shoes-off",
    component: "Exercise18",
    activity: {
      prompt: "As palavras estão bagunçadas. Digite a frase corretamente.",
      scrambledSentence: "shoes / Take / off. / your",
      correctAnswer: "Take your shoes off.",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage:
        "Take your shoes off. Também seria possível: Take off your shoes.",
    },
  },

  {
    key: "lesson-finish",
    type: "finish",
  },
];

export default createLessonScreen(LESSON_SLIDES, {
  storageKey: "@progesso_ingles_completo_B1",
  nextRouteName: "InglescompletoB1",
  screenName: "InglesCompletoB1LessonScreen",
});
