import { Images, TRA1 } from "../../../../util/images";
import createTravelLessonScreen from "./TravelLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "time-days-intro",
    component: "Exercise17",
    activity: {
      label: "Time & Days",
      content: [
        'Tick-tock! Perder o voo ou o horário do check-in não é uma opção, certo? Nesta última aula do nosso primeiro módulo de sobrevivência, você vai aprender a perguntar as horas, entender a regra mais importante dos relógios no exterior e saber como dizer "hoje" e "amanhã" para confirmar suas reservas!',
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "what-time-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A4S2,
      audioSource: require("../../../../../mp3/TR/A1/A4S2.mp3"),
      audioDurationMs: 1600,
      answerOptions: ["What time is it?", "How much is it?"],
      correctOption: "What time is it?",
      successTitle: "Correto",
      feedbackMessage:
        '"What time is it?" é a frase clássica para perguntar que horas são.',
    },
  },
  {
    key: "today-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A4S3,
      audioSource: require("../../../../../mp3/TR/A1/A4S3.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Today", "Tomorrow"],
      correctOption: "Today",
      successTitle: "Correto",
      feedbackMessage:
        '"Today" significa hoje. Muito usado para confirmar voos e reservas.',
    },
  },
  {
    key: "tomorrow-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A4S4,
      audioSource: require("../../../../../mp3/TR/A1/A4S4.mp3"),
      audioDurationMs: 1200,
      answerOptions: ["Today", "Tomorrow"],
      correctOption: "Tomorrow",
      successTitle: "Correto",
      feedbackMessage:
        '"Tomorrow" significa amanhã. Essencial para confirmar datas.',
    },
  },
  {
    key: "am-pm-tip",
    component: "Exercise17",
    activity: {
      label: "Dica de Nativo",
      content: [
        `Em inglês, as pessoas raramente usam o formato de 24 horas. O mundo gira em torno do AM e PM!

AM: Da meia-noite até às 11:59 da manhã.

PM: Do meio-dia até às 11:59 da noite.

Se o seu voo é às 20h, no painel estará: 8:00 PM. Muito cuidado para não confundir!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "what-time-complete",
    component: "Exercise5",
    activity: {
      prompt:
        "Você chegou na recepção e quer confirmar a hora do seu check-out. Como você pergunta as horas?",
      sentenceStart: "Excuse me, what",
      sentenceEnd: "is it?",
      options: ["time", "money"],
      correctAnswer: "time",
      successTitle: "Correto",
      successMessage: 'Para perguntar as horas, diga "What time is it?"',
    },
  },
  {
    key: "flight-am-true-false",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e responda: verdadeiro ou falso?",
      image: TRA1.A4S2,
      audioSource: require("../../../../../mp3/TR/A1/A4S7.mp3"),
      audioDurationMs: 1800,
      statement: "O áudio diz que o voo é às 9 horas da noite.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage: "9 AM é de manhã, não de noite.",
    },
  },
  {
    key: "time-words-match",
    component: "Exercise1",
    activity: {
      prompt:
        "Conecte as palavras de tempo com suas traduções corretas para não perder sua reserva.",
      pairs: [
        { en: "Today", pt: "Hoje" },
        { en: "Tomorrow", pt: "Amanhã" },
        { en: "Time", pt: "Hora / Tempo" },
      ],
      successTitle: "Correto",
      successMessage: "Vocabulário de tempo pronto para viagem.",
    },
  },
  {
    key: "what-time-order",
    component: "Exercise6",
    activity: {
      prompt: "Clique nas palavras para escrever a frase na ordem correta.",
      words: ["it", "time", "What", "is", "?"],
      correctOrder: ["What", "time", "is", "it", "?"],
      successTitle: "Correto",
      successMessage: "What time is it?",
    },
  },
  {
    key: "what-time-correct-sentence",
    component: "Exercise4",
    activity: {
      prompt:
        'Qual é a maneira correta de perguntar "Que horas são?" em inglês?',
      image: TRA1.A4S2,
      wrongSentence: "Time question",
      options: ["What hour are?", "What time is it?", "What is the clock?"],
      correctAnswer: "What time is it?",
      successTitle: "Correto",
      successMessage: '"What time is it?" é a estrutura natural.',
    },
  },
  {
    key: "what-time-writing",
    component: "Exercise12",
    activity: {
      prompt: "Writing",
      instruction:
        'Imagine que o seu celular acabou a bateria e você precisa digitar essa pergunta para traduzir ou mostrar para alguém na rua. Escreva em inglês: "Que horas são?"',
      placeholder: "What time is it?",
      helperText: "Use What time...",
      tipText: "What time is it?",
      submitLabel: "Enviar",
      successTitle: "Correto",
      successMessage: "Você escreveu a pergunta de horário corretamente.",
    },
  },
  {
    key: "what-time-speaking",
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction:
        'Imagine que você quer saber a hora local ao chegar em um novo país. Grave um áudio fazendo a pergunta: "What time is it?"',
      helperText: "What time is it?",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "What time is it?",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você praticou a pergunta de horário.",
    },
  },
  {
    key: "lesson-finish",
    type: "finish",
  },
];

export default createTravelLessonScreen(LESSON_SLIDES);
