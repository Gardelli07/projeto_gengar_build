import { BUA1, Images } from "../../../../util/images";
import createBusinessLessonScreen from "./BusinessLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "business-trip-intro",
    component: "Exercise17",
    activity: {
      label: "Business Trip!",
      content: [
        `Hora de colocar o pé na estrada (ou no avião) a negócios. Saber se virar no aeroporto e no hotel é essencial para o profissional moderno.

Dica de Nativo:
No balcão do aeroporto ou hotel, você vai ouvir muito a palavra "Here" quando entregam algo pra você. Ao invés de entregar os documentos em silêncio, fale "Here is my passport". Mostra muita fluência!`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "passport-room-key-match",
    component: "Exercise15",
    activity: {
      prompt: "Clique na imagem e na palavra que a descreve.",
      images: [
        { id: "passport-img", image: BUA1.A5S2p1 },
        { id: "room-key-img", image: BUA1.A5S2p2 },
      ],
      words: [
        { id: "passport-word", label: "Passport" },
        { id: "room-key-word", label: "Room key" },
      ],
      pairs: [
        { imageId: "passport-img", wordId: "passport-word" },
        { imageId: "room-key-img", wordId: "room-key-word" },
      ],
      successTitle: "Correto",
      successMessage: "Passport e room key são essenciais em viagens.",
    },
  },
  {
    key: "ticket-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute a palavra e escolha a alternativa correta.",
      image: BUA1.A5S8,
      audioSource: require("../../../../../mp3/BU/A1/A5S3.mp3"),
      audioDurationMs: 900,
      answerOptions: ["Ticket", "Pocket"],
      correctOption: "Ticket",
      successTitle: "Correto",
      feedbackMessage: '"Ticket" é passagem ou bilhete.',
    },
  },
  {
    key: "hotel-checkin-order",
    component: "Exercise7",
    activity: {
      prompt:
        "Coloque o diálogo de check-in na ordem correta clicando nas frases.",
      options: [
        "Good evening. Welcome to the hotel.",
        "Hello. I have a reservation.",
        "May I have your passport, please?",
        "Yes, here is my passport.",
      ],
      correctOrder: [
        "Good evening. Welcome to the hotel.",
        "Hello. I have a reservation.",
        "May I have your passport, please?",
        "Yes, here is my passport.",
      ],
      successTitle: "Correto",
      successMessage: "Check-in organizado com clareza.",
    },
  },
  {
    key: "passport-correct",
    component: "Exercise4",
    activity: {
      prompt: "Qual é a frase correta para entregar o seu passaporte?",
      image: BUA1.A5S5,
      wrongSentence: "Passport",
      options: [
        "Here is my passport.",
        "This my passport.",
        "Here have passport.",
      ],
      correctAnswer: "Here is my passport.",
      successTitle: "Correto",
      successMessage: '"Here is..." é natural ao entregar algo.',
    },
  },
  {
    key: "reservation-booking-tip",
    component: "Exercise17",
    activity: {
      label: "Reservation vs Booking",
      content: [
        'Sabia que "Reservation" e "Booking" significam praticamente a mesma coisa no inglês para viagens? "I have a reservation" ou "I have a booking". O Booking é um pouco mais comum no inglês britânico, mas ambos funcionam perfeitamente no hotel!',
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "reservation-order",
    component: "Exercise6",
    activity: {
      prompt: "Clique nas palavras para escrever a frase corretamente.",
      words: ["reservation", "a", "have", "I"],
      correctOrder: ["I", "have", "a", "reservation"],
      successTitle: "Correto",
      successMessage: "I have a reservation.",
    },
  },
  {
    key: "ticket-passport-true-false",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt:
        "Escute o áudio e responda se a frase escrita é verdadeira ou falsa.",
      image: BUA1.A5S8,
      audioSource: require("../../../../../mp3/BU/A1/A5S8.mp3"),
      audioDurationMs: 2600,
      statement: "The person is only giving the ticket.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage: "A pessoa entrega a passagem e o passaporte.",
    },
  },
  {
    key: "hotel-reception-audio",
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction:
        'Mande um áudio imaginando que você chegou na recepção do hotel. Diga: "Olá, eu tenho uma reserva. Aqui está meu passaporte."',
      helperText: "Hello, I have a reservation. Here is my passport.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Hello, I have a reservation. Here is my passport.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Seu check-in em inglês foi gravado.",
    },
  },
  {
    key: "travel-feedback",
    component: "Exercise17",
    activity: {
      label: "Safe Travels!",
      content: [
        "Você fechou o Módulo 1 com chave de ouro! Agora você já sabe como se apresentar, falar do trabalho, vender, dar updates e viajar. Está pronto para o próximo nível? Let's go!",
      ],
      continueLabel: "Finalizar",
    },
  },
  {
    key: "lesson-finish",
    type: "finish",
  },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
