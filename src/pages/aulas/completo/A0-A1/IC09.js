import createLessonScreen from "../../LessonScreen";
import { ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `Para fazer uma pergunta, o IS pula para a frente de todo mundo! Afirmativa: She is happy. Pergunta: Is she happy? O 'Is' vira o líder da frase! `,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Coloque a frase em ordem.",
      words: ["is", "she", "teacher?", "a"],
      correctOrder: ["is", "she", "a", "teacher?"],
      successTitle: "Correto",
      successMessage: `A frase correta é "Is she a teacher?"`,
    },
  },
  {
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Escute e responda",
      image: ICA1.A9S3,
      audioSource: require("../../../../../mp3/IC/A0-A1/A9S3.mp3"),
      audioDurationMs: 1000,
      dialogue: "A pessoa está afirmando que é um cachorro.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      successMessage: "Falso, a pessoa está pergunta se é um cachorro.",
    },
  },
  {
    component: "Exercise5",
    activity: {
      prompt: "Complete a frase",
      sentenceStart: "",
      sentenceEnd: "he your brother?",
      options: ["is", "are"],
      correctAnswer: "is",
      successTitle: "Correto",
      successMessage: 'A forma correta é "Is he your brother?"',
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Coloque a frase em ordem.",
      words: ["she", "is", "doctor?", "a"],
      correctOrder: ["is", "she", "a", "doctor?"],
      successTitle: "Correto",
      successMessage: `A frase correta é "Is she a doctor?"`,
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `Se alguém te perguntar 'Is he tall?', você pode responder apenas:
      
  ? Sim: Yes, he is. 
  ? Não: No, he isn't.

Curto, grosso e natural! 
`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Escute e responda",
      image: ICA1.A8S4,
      audioSource: require("../../../../../mp3/IC/A0-A1/A9S8.mp3"),
      audioDurationMs: 1000,
      dialogue: "A pessoa está afirmando que o carro é azul.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      successMessage: "Falso. O áudio é uma pergunta, não uma afirmação.",
    },
  },
  {
    component: "Exercise4",
    activity: {
      prompt: "Corrija",
      image: ICA1.A8S12,
      wrongSentence: "Perguntando se o café está quente.",
      options: ["Is it hot?", "It is hot?"],
      correctAnswer: "Is it hot?",
      successTitle: "Correto",
      successMessage: 'A forma correta é "Is it hot?"',
    },
  },
  {
    component: "Exercise2",
    activity: {
      prompt: "Completar o Texto",
      paragraphs: [
        [
          "A:",
          {
            id: "blank-1",
            answer: "Is / Isn't",
      options: ["Is / Isn't", "Are / Am"],
          },
          "she at home?",
        ],
        [
          "No, she",
          {
            id: "blank-2",
            answer: "Is / Isn't",
      options: ["Is / Isn't", "Are / Am"],
          },
          "",
        ],
      ],
      successTitle: "Excelente",
      successMessage: "Você completou o texto corretamente.",
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `/blue{Sensacional!} Você agora domina o 'Is' na afirmativa, negativa e interrogativa. 
Na próxima aula, vamos conhecer o grupo do ARE (You, We, They). 
O desafio vai aumentar! See you!`,
      ],
      continueLabel: "Continuar",
    },
  },

  {
    key: "lesson-finish",
    type: "finish",
  },
];

export default createLessonScreen(LESSON_SLIDES, {
  storageKey: "@progesso_ingles_completo_A0-A1",
  nextRouteName: "Inglescompleto",
  screenName: "InglesCompletoA0A1LessonScreen",
});
