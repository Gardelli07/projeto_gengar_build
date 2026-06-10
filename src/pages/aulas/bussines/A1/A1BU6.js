import { Exercise1 } from "../../../../exc/ex1";
import { Exercise3 } from "../../../../exc/ex3";
import { Exercise5 } from "../../../../exc/ex5";
import { Exercise6 } from "../../../../exc/ex6";
import { Exercise14 } from "../../../../exc/ex14";
import { Exercise15 } from "../../../../exc/ex15";
import { Exercise16 } from "../../../../exc/ex16";
import { Exercise17 } from "../../../../exc/ex17";
import { BUA1, Images } from "../../../../util/images";
import createBusinessLessonScreen from "./BusinessLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "meeting-participation-intro",
    component: Exercise17,
    activity: {
      label: "Speaking Up!",
      content: [
        `Em reuniões, ficar calado não é uma opção. Hoje você vai aprender as frases mais importantes para concordar, discordar e pedir a palavra de forma educada e profissional.

Dica de Nativo:
Para pedir a palavra, você não precisa levantar a mão e gritar. Uma das formas mais comuns e educadas que usamos é simplesmente dizer: "I have a question" ou "Can I say something?".`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "agree-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute a palavra e escolha a alternativa correta.",
      image: BUA1.A6S7,
      audioSource: require("../../../../../mp3/BU/A1/A6S2.mp3"),
      audioDurationMs: 900,
      answerOptions: ["Agree", "Angry"],
      correctOption: "Agree",
      successTitle: "Correto",
      feedbackMessage: '"Agree" significa concordar.',
    },
  },
  {
    key: "meeting-email-match",
    component: Exercise15,
    activity: {
      prompt: "Clique na imagem e na palavra que a descreve.",
      images: [
        { id: "meeting-img", image: BUA1.A6S7 },
        { id: "email-img", image: BUA1.A6S3p2 },
      ],
      words: [
        { id: "meeting-word", label: "Meeting" },
        { id: "email-word", label: "Email" },
      ],
      pairs: [
        { imageId: "meeting-img", wordId: "meeting-word" },
        { imageId: "email-img", wordId: "email-word" },
      ],
      successTitle: "Correto",
      successMessage: "Meeting é reunião; email é e-mail.",
    },
  },
  {
    key: "meeting-expressions-match",
    component: Exercise1,
    activity: {
      prompt: "Conecte as expressões em inglês com suas traduções.",
      pairs: [
        { en: "I agree", pt: "Eu concordo" },
        { en: "I disagree", pt: "Eu discordo" },
        { en: "I have a question", pt: "Eu tenho uma pergunta" },
      ],
      successTitle: "Correto",
      successMessage: "Essas frases ajudam você a participar de reuniões.",
    },
  },
  {
    key: "agree-with-you",
    component: Exercise5,
    activity: {
      prompt: "Complete a frase com a palavra correta.",
      sentenceStart: "I",
      sentenceEnd: "with you.",
      options: ["agree", "am"],
      correctAnswer: "agree",
      successTitle: "Correto",
      successMessage: 'Diga "I agree with you", sem "am".',
    },
  },
  {
    key: "i-am-agree-tip",
    component: Exercise17,
    activity: {
      label: 'O Erro Clássico do "I am agree"',
      content: [
        `Cuidado máximo aqui! Em português nós dizemos "Eu estou de acordo". Isso faz muita gente traduzir para "I am agree". Isso soa super estranho para um nativo!

O correto é ir direto para a ação:
"I agree" (Eu concordo)
"I disagree" (Eu discordo)

Nada de verb to be no meio!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "question-true-false",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e responda se a frase é verdadeira ou falsa.",
      image: BUA1.A6S7,
      audioSource: require("../../../../../mp3/BU/A1/A6S7.mp3"),
      audioDurationMs: 2600,
      statement: "The person agrees with the idea.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage:
        "A pessoa está pedindo a palavra para fazer uma pergunta.",
    },
  },
  {
    key: "agree-order",
    component: Exercise6,
    activity: {
      prompt: "Clique nas palavras para escrever a frase na ordem correta.",
      words: ["agree", "I", "you", "with"],
      correctOrder: ["I", "agree", "with", "you"],
      successTitle: "Correto",
      successMessage: "I agree with you.",
    },
  },
  {
    key: "meeting-audio",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        "Grave um áudio simulando que você está em uma reunião. Diga que você concorda com o seu colega.",
      helperText: "I agree with you.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "I agree with you.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Sua participação na reunião foi gravada.",
    },
  },
  {
    key: "meeting-feedback",
    component: Exercise17,
    activity: {
      label: "Great participation!",
      content: [
        'Você mandou bem! Concordar e pedir a palavra são os primeiros passos para ter voz ativa nas decisões. Continue praticando o "I agree" e lembre-se de nunca usar o "am" junto com ele.',
      ],
      continueLabel: "Finalizar",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
