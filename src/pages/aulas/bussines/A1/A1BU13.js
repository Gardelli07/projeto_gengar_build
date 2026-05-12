import { Exercise1 } from "../../../../exc/ex1";
import { Exercise4 } from "../../../../exc/ex4";
import { Exercise5 } from "../../../../exc/ex5";
import { Exercise12 } from "../../../../exc/ex12";
import { Exercise13 } from "../../../../exc/ex13";
import { Exercise14 } from "../../../../exc/ex14";
import { Exercise17 } from "../../../../exc/ex17";
import { Exercise18 } from "../../../../exc/ex18";
import { BUA1 } from "../../../../util/images";
import createBusinessLessonScreen from "./BusinessLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "audience-intro",
    component: Exercise17,
    activity: {
      label: "Eye Contact!",
      content: [
        `Uma apresentação não é só o que você fala, mas como você se conecta com o público. Hoje você vai aprender frases simples para engajar sua audiência.

Dica de Nativo:
Use "As you can see..." para conectar o público ao slide sem perder contato visual.`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "smile-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: BUA1.A13S2,
      audioSource: require("../../../../../mp3/BU/A1/A13S2.mp3"),
      audioText: "Smile",
      audioDurationMs: 900,
      answerOptions: ["Smile", "Small"],
      correctOption: "Smile",
      successTitle: "Correto",
      feedbackMessage: '"Smile" significa sorrir.',
    },
  },
  {
    key: "body-language-match",
    component: Exercise1,
    activity: {
      prompt: "Conecte as palavras.",
      pairs: [
        { en: "See", pt: "Ver" },
        { en: "Smile", pt: "Sorrir" },
        { en: "Look", pt: "Olhar" },
      ],
      successTitle: "Correto",
      successMessage: "Essas palavras ajudam na conexão com o público.",
    },
  },
  {
    key: "as-you-can-see",
    component: Exercise5,
    activity: {
      prompt: "Complete a frase.",
      image: BUA1.A13S7,
      sentenceStart: "As you can",
      sentenceEnd: ", the project is ready.",
      options: ["see", "look"],
      correctAnswer: "see",
      successTitle: "Correto",
      successMessage: "As you can see...",
    },
  },
  {
    key: "spell-smile",
    component: Exercise13,
    needsSpeech: true,
    activity: {
      prompt: "Organize a palavra.",
      audioSource: require("../../../../../mp3/BU/A1/A13S2.mp3"),
      audioText: "Smile",
      audioDurationMs: 900,
      letters: ["M", "I", "S", "E", "L"],
      correctWord: "SMILE",
      successTitle: "Correto",
      successMessage: "SMILE.",
    },
  },
  {
    key: "can-without-to-tip",
    component: Exercise17,
    activity: {
      label: 'Can sem "to"',
      content: ['Depois de can, nunca usamos "to".\n\n✔ You can see\n❌ You can to see'],
      continueLabel: "Continuar",
    },
  },
  {
    key: "can-see-correct",
    component: Exercise4,
    activity: {
      prompt: "Escolha a frase correta.",
      image: BUA1.A13S7,
      wrongSentence: "As you can...",
      options: [
        "As you can to see, the numbers are good",
        "As you can see, the numbers are good",
        "As you can looking, the numbers are good",
      ],
      correctAnswer: "As you can see, the numbers are good",
      successTitle: "Correto",
      successMessage: 'Depois de "can", use o verbo base: see.',
    },
  },
  {
    key: "as-you-can-see-order",
    component: Exercise18,
    activity: {
      prompt: "Organize a frase.",
      scrambledSentence: "see / you / As / can",
      correctAnswer: "As you can see",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "As you can see.",
    },
  },
  {
    key: "audience-writing",
    component: Exercise12,
    activity: {
      prompt: "Writing",
      instruction: "Escreva uma frase dizendo: As you can see, we have a problem.",
      placeholder: "As you can see, we have a problem.",
      helperText: 'Use "As you can see..."',
      submitLabel: "Enviar",
      successTitle: "Correto",
      successMessage: "Você engajou o público com clareza.",
    },
  },
  {
    key: "audience-feedback",
    component: Exercise17,
    activity: {
      label: "You have their attention!",
      content: ["Perfeito! Agora você sabe como engajar o público e transmitir mais confiança."],
      continueLabel: "Finalizar",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
