import { Exercise3 } from "../../../../exc/ex3";
import { Exercise4 } from "../../../../exc/ex4";
import { Exercise7 } from "../../../../exc/ex7";
import { Exercise12 } from "../../../../exc/ex12";
import { Exercise13 } from "../../../../exc/ex13";
import { Exercise14 } from "../../../../exc/ex14";
import { Exercise16 } from "../../../../exc/ex16";
import { Exercise17 } from "../../../../exc/ex17";
import { Exercise18 } from "../../../../exc/ex18";
import { Exercise19 } from "../../../../exc/ex19";
import { Images, TRA1 } from "../../../../util/images";
import createTravelLessonScreen from "./TravelLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "sickness-symptoms-intro",
    component: Exercise17,
    activity: {
      label: "Sickness & Symptoms",
      content: [
        "I don't feel well... Ninguém quer ficar doente na viagem, mas saber dizer como você se sente pode acelerar muito a sua melhora. Nesta aula, vamos focar em duas frases essenciais: como dizer que você está passando mal e como indicar onde é a dor usando stomach e head.",
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "feel-sick-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A25S2,
      audioSource: require("../../../../../mp3/TR/A1/A25S2.mp3"),
      audioDurationMs: 1400,
      answerOptions: ["I feel sick", "I feel good"],
      correctOption: "I feel sick",
      successTitle: "Correto",
      feedbackMessage: '"I feel sick" significa estou passando mal.',
    },
  },
  {
    key: "stomach-ache-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A25S3,
      audioSource: require("../../../../../mp3/TR/A1/A25S3.mp3"),
      audioDurationMs: 1500,
      answerOptions: ["Stomach ache", "Headache"],
      correctOption: "Stomach ache",
      successTitle: "Correto",
      feedbackMessage: '"Stomach ache" é dor de estômago.',
    },
  },
  {
    key: "ache-tip",
    component: Exercise17,
    activity: {
      label: "Dica de Nativo",
      content: [
        `Sempre que algo doer de forma constante, você pode colocar ache no final da parte do corpo.

Head + ache = headache.
Back + ache = backache.

É uma forma simples e eficiente de ser entendido rapidamente!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "sickness-dialogue-order",
    component: Exercise7,
    activity: {
      prompt:
        "Você está conversando com o recepcionista do hotel sobre o seu mal-estar. Organize o diálogo.",
      options: [
        "Are you okay?",
        "No, I feel sick.",
        "Where is the pain?",
        "I have a stomach ache.",
      ],
      correctOrder: [
        "Are you okay?",
        "No, I feel sick.",
        "Where is the pain?",
        "I have a stomach ache.",
      ],
      successTitle: "Correto",
      successMessage: "Você organizou um diálogo sobre sintomas.",
    },
  },
  {
    key: "sick-letters",
    component: Exercise13,
    activity: {
      prompt:
        'Você quer dizer que está "doente" ou "passando mal". Clique nas letras na ordem correta para formar essa palavra.',
      letters: ["i", "c", "s", "k"],
      correctWord: "SICK",
      successTitle: "Correto",
      successMessage: "Sick significa doente ou passando mal.",
    },
  },
  {
    key: "stomach-ache-true-false",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e responda: verdadeiro ou falso?",
      image: TRA1.A25S7,
      audioSource: require("../../../../../mp3/TR/A1/A25S7.mp3"),
      audioDurationMs: 1900,
      statement: "O turista do áudio está dizendo que está com dor de cabeça.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage: "Ele disse que está com dor de estômago.",
    },
  },
  {
    key: "feel-sick-listen-write",
    component: Exercise19,
    needsSpeech: true,
    activity: {
      prompt:
        "Ouça com atenção e escreva exatamente a frase que o turista usou para dizer que não está bem.",
      audioSource: require("../../../../../mp3/TR/A1/A25S2.mp3"),
      audioDurationMs: 1500,
      correctAnswer: "I feel sick.",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "I feel sick.",
      errorMessage: 'Confira a frase: "I feel sick."',
    },
  },
  {
    key: "stomach-ache-write-order",
    component: Exercise18,
    activity: {
      prompt:
        "Não clique, digite! Coloque as palavras na ordem correta para dizer que você está com dor de estômago.",
      scrambledSentence: "stomach / have / a / I / ache",
      correctAnswer: "I have a stomach ache",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "I have a stomach ache.",
    },
  },
  {
    key: "headache-correct-sentence",
    component: Exercise4,
    activity: {
      prompt:
        "Você acordou com muita dor de cabeça no hotel. O que você diz para o seu acompanhante ou para o médico?",
      image: TRA1.A25S10,
      wrongSentence: "Symptom sentence",
      options: ["I have a headache.", "I have a stomach ache.", "I feel good."],
      correctAnswer: "I have a headache.",
      successTitle: "Correto",
      successMessage: "I have a headache.",
    },
  },
  {
    key: "stomach-ache-writing",
    component: Exercise12,
    activity: {
      prompt: "Writing",
      instruction:
        'Imagine que você comeu algo diferente e agora sua barriga dói. Digite em inglês: "Eu tenho uma dor de estômago".',
      placeholder: "I have a stomach ache.",
      helperText: "Use I have a...",
      tipText: "I have a stomach ache.",
      submitLabel: "Enviar",
      successTitle: "Correto",
      successMessage: "I have a stomach ache.",
    },
  },
  {
    key: "feel-sick-speaking",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        'Treino de sobrevivência! Grave um áudio avisando que você não está se sentindo bem: "I feel sick".',
      helperText: "I feel sick.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "I feel sick.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você praticou como avisar que não está bem.",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createTravelLessonScreen(LESSON_SLIDES);
