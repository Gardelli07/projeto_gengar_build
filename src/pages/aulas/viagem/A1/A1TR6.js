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
    key: "security-boarding-intro",
    component: Exercise17,
    activity: {
      label: "Security & Boarding",
      content: [
        "O momento do Raio-X (Security) chegou! Muitos alunos ficam tensos nessa hora porque os agentes de segurança dão comandos rápidos. Mas fique tranquilo! Nesta aula, você vai aprender o vocabulário para passar ileso pela segurança e a frase mais importante para você não se perder e encontrar o seu portão de embarque. Let's go!",
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "boarding-pass-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A6S2,
      audioSource: require("../../../../../mp3/TR/A1/A6S2.mp3"),
      audioDurationMs: 1300,
      answerOptions: ["Boarding pass", "Passport"],
      correctOption: "Boarding pass",
      successTitle: "Correto",
      feedbackMessage: "Esse é o seu cartão de embarque.",
    },
  },
  {
    key: "gate-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A6S7,
      audioSource: require("../../../../../mp3/TR/A1/A6S3.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Gate", "Bag"],
      correctOption: "Gate",
      successTitle: "Correto",
      feedbackMessage: '"Gate" significa portão de embarque.',
    },
  },
  {
    key: "where-is-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A6S7,
      audioSource: require("../../../../../mp3/TR/A1/A6S4.mp3"),
      audioDurationMs: 1300,
      answerOptions: ["Where is...?", "How much is it?"],
      correctOption: "Where is...?",
      successTitle: "Correto",
      feedbackMessage: '"Where is...?" significa "Onde é/está...?".',
    },
  },
  {
    key: "security-tip",
    component: Exercise17,
    activity: {
      label: "Dica de Sobrevivência",
      content: [
        `Na área de segurança, duas palavras causam confusão para brasileiros: Shoes (sapatos) e Water (água).

A regra global é: você não pode passar com garrafas de água, e muitos aeroportos exigem que você tire os sapatos para passar no detector de metais.

Se o agente disser "Shoes" ou apontar para sua garrafa de água, sorria, tire os sapatos ou jogue a água fora.`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "where-gate-complete",
    component: Exercise5,
    activity: {
      prompt:
        "Você olhou no painel e viu que o seu voo sai do portão 5. Como você pergunta onde fica?",
      image: TRA1.A6S7,
      sentenceStart: "Excuse me,",
      sentenceEnd: "is gate 5?",
      options: ["Where", "What"],
      correctAnswer: "Where",
      successTitle: "Correto",
      successMessage: "Excuse me, where is gate 5?",
    },
  },
  {
    key: "gate-ten-true-false",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e responda: verdadeiro ou falso?",
      image: TRA1.A6S7,
      audioSource: require("../../../../../mp3/TR/A1/A6S7.mp3"),
      audioDurationMs: 1500,
      statement: "O áudio está instruindo você a ir para o portão 10.",
      options: ["true", "false"],
      correctAnswer: "true",
      successTitle: "Correto",
      feedbackMessage: 'O áudio diz "Go to gate ten".',
    },
  },
  {
    key: "airport-keywords-match",
    component: Exercise1,
    activity: {
      prompt:
        "Conecte as palavras-chave do aeroporto com as traduções corretas.",
      pairs: [
        { en: "Boarding pass", pt: "Cartão de embarque" },
        { en: "Gate", pt: "Portão" },
        { en: "Where is...?", pt: "Onde é/está...?" },
      ],
      successTitle: "Correto",
      successMessage: "Vocabulário essencial de embarque.",
    },
  },
  {
    key: "where-gate-seven-order",
    component: Exercise6,
    activity: {
      prompt: "Clique nas palavras para escrever a frase na ordem correta.",
      words: ["is", "gate", "Where", "7", "?"],
      correctOrder: ["Where", "is", "gate", "7", "?"],
      successTitle: "Correto",
      successMessage: "Where is gate 7?",
    },
  },
  {
    key: "gate-eight-correct-sentence",
    component: Exercise4,
    activity: {
      prompt:
        "Como você pergunta de forma educada para uma funcionária do aeroporto onde fica o portão 8?",
      image: TRA1.A6S2,
      wrongSentence: "Gate location",
      options: [
        "Gate 8, where?",
        "Excuse me, where is gate 8?",
        "How much is gate 8?",
      ],
      correctAnswer: "Excuse me, where is gate 8?",
      successTitle: "Correto",
      successMessage: "Começar com Excuse me deixa a pergunta educada.",
    },
  },
  {
    key: "gate-twenty-writing",
    component: Exercise12,
    activity: {
      prompt: "Writing",
      instruction:
        "Imagine que você acabou de passar pela segurança e precisa achar o portão 20 rapidamente. Digite a sua pergunta em inglês. Lembre-se de ser educado e pedir com licença!",
      placeholder: "Excuse me, where is gate 20?",
      helperText: "Use Excuse me, where is...",
      tipText: "Excuse me, where is gate 20?",
      submitLabel: "Enviar",
      successTitle: "Correto",
      successMessage: "Pergunta perfeita para achar o portão.",
    },
  },
  {
    key: "gate-twenty-speaking",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        'Segure o botão e grave um áudio fazendo a pergunta: "Com licença, onde é o portão 20?".',
      helperText: "Excuse me, where is gate 20?",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Excuse me, where is gate 20?",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você praticou a pergunta de localização.",
    },
  },
  {
    key: "lesson-finish",
    type: "finish",
  },
];

export default createTravelLessonScreen(LESSON_SLIDES);
