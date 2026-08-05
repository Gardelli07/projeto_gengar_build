import { Images, TRA1 } from "../../../../util/images";
import createTravelLessonScreen from "./TravelLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "buying-tickets-intro",
    component: "Exercise17",
    activity: {
      label: "Buying Tickets",
      content: [
        'Let\'s have some fun! Para visitar museus, parques temáticos ou subir na Torre Eiffel, você vai precisar de um "ticket". Nesta aula, você vai aprender a chegar na bilheteria com confiança, pedir a quantidade certa de ingressos e entender a diferença entre os tipos de visitantes. Vamos garantir a sua entrada!',
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "ticket-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A20S2,
      audioSource: require("../../../../../mp3/TR/A1/A20S2.mp3"),
      audioDurationMs: 900,
      answerOptions: ["Ticket", "Passport"],
      correctOption: "Ticket",
      successTitle: "Correto",
      feedbackMessage: '"Ticket" significa ingresso.',
    },
  },
  {
    key: "adult-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A20S3,
      audioSource: require("../../../../../mp3/TR/A1/A20S3.mp3"),
      audioDurationMs: 900,
      answerOptions: ["Adult", "Child"],
      correctOption: "Adult",
      successTitle: "Correto",
      feedbackMessage: '"Adult" significa adulto.',
    },
  },
  {
    key: "child-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A20S4,
      audioSource: require("../../../../../mp3/TR/A1/A20S4.mp3"),
      audioDurationMs: 900,
      answerOptions: ["Child", "Adult"],
      correctOption: "Child",
      successTitle: "Correto",
      feedbackMessage: '"Child" significa criança.',
    },
  },
  {
    key: "tickets-tip",
    component: "Exercise17",
    activity: {
      label: "Dica de Nativo",
      content: [
        `Para pedir ingressos, você pode usar a nossa frase coringa: "Can I have...?"

Se estiver em casal, diga: "Can I have two tickets, please?"
Se estiver com um filho pequeno: "One adult and one child, please." Simples e direto!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "tickets-complete",
    component: "Exercise5",
    activity: {
      prompt:
        "Você chegou na bilheteria do museu e quer dois ingressos. Complete a frase:",
      sentenceStart: "Can I have two",
      sentenceEnd: ", please?",
      options: ["tickets", "tables"],
      correctAnswer: "tickets",
      successTitle: "Correto",
      successMessage: "Can I have two tickets, please?",
    },
  },
  {
    key: "adult-true-false",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e responda: verdadeiro ou falso?",
      image: TRA1.A20S7,
      audioSource: require("../../../../../mp3/TR/A1/A20S7.mp3"),
      audioDurationMs: 1500,
      statement:
        "O turista do áudio está pedindo um ingresso para uma criança.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage: '"One adult" é um ingresso de adulto.',
    },
  },
  {
    key: "ticket-vocab",
    component: "Exercise1",
    activity: {
      prompt: "Conecte o vocabulário de passeio com as traduções corretas.",
      pairs: [
        { en: "Ticket", pt: "Ingresso" },
        { en: "Adult", pt: "Adulto" },
        { en: "Child", pt: "Criança" },
      ],
      successTitle: "Correto",
      successMessage: "Vocabulário de bilheteria dominado.",
    },
  },
  {
    key: "two-tickets-order",
    component: "Exercise6",
    activity: {
      prompt: "Clique nas palavras para escrever a frase na ordem correta.",
      words: ["tickets", "please", "Two", ","],
      correctOrder: ["Two", "tickets", ",", "please"],
      successTitle: "Correto",
      successMessage: "Two tickets, please.",
    },
  },
  {
    key: "adult-ticket-correct-sentence",
    component: "Exercise4",
    activity: {
      prompt:
        "Como você pede um ingresso de adulto de forma educada e correta na bilheteria?",
      image: TRA1.A20S10,
      wrongSentence: "Ticket request",
      options: [
        "I want enter.",
        "One adult ticket, please.",
        "Give me one adult.",
      ],
      correctAnswer: "One adult ticket, please.",
      successTitle: "Correto",
      successMessage: "One adult ticket, please.",
    },
  },
  {
    key: "two-tickets-writing",
    component: "Exercise12",
    activity: {
      prompt: "Writing",
      instruction:
        'Imagine que você está viajando com um amigo e precisa comprar as entradas para o museu. Digite em inglês: "Dois ingressos, por favor".',
      placeholder: "Two tickets, please.",
      helperText: "Use two tickets...",
      tipText: "Two tickets, please.",
      submitLabel: "Enviar",
      successTitle: "Correto",
      successMessage: "Two tickets, please.",
    },
  },
  {
    key: "ticket-speaking",
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction:
        'Hora de garantir a diversão! Grave um áudio pedindo um ingresso para adulto usando a nossa frase coringa: "Can I have one ticket, please?".',
      helperText: "Can I have one ticket, please?",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Can I have one ticket, please?",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você praticou como comprar um ingresso.",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createTravelLessonScreen(LESSON_SLIDES);
