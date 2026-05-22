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
    key: "getting-city-intro",
    component: Exercise17,
    activity: {
      label: "Getting to the City",
      content: [
        'O ar fresco da rua! Você saiu do aeroporto e agora precisa chegar ao seu hotel. O meio de transporte não importa muito (Táxi, Uber ou Trem), o que importa é você saber falar para onde vai e conseguir mostrar o seu endereço. Hoje vamos aprender o verbo mais importante para os transportes: "Take" (Levar) e o vocabulário básico de locomoção.',
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "train-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A10S2,
      audioSource: require("../../../../../mp3/TR/A1/A10S2.mp3"),
      audioText: "Train",
      audioDurationMs: 900,
      answerOptions: ["Train", "Taxi"],
      correctOption: "Train",
      successTitle: "Correto",
      feedbackMessage: '"Train" significa trem.',
    },
  },
  {
    key: "taxi-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A10S3,
      audioSource: require("../../../../../mp3/TR/A1/A10S3.mp3"),
      audioText: "Taxi",
      audioDurationMs: 900,
      answerOptions: ["Taxi", "Train"],
      correctOption: "Taxi",
      successTitle: "Correto",
      feedbackMessage:
        "Taxi tradicional ou carro de aplicativo: o vocabulário é o mesmo.",
    },
  },
  {
    key: "take-me-to-tip",
    component: Exercise17,
    activity: {
      label: "Dica de Ouro",
      content: [
        `Você não precisa saber os nomes das ruas ou explicar o caminho. A forma mais segura e comum no mundo todo é mostrar o papel ou celular com a sua reserva e usar a frase mágica:

"Take me to..."

Exemplo: "Take me to this address, please".`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "address-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A10S5,
      audioSource: require("../../../../../mp3/TR/A1/A10S5.mp3"),
      audioText: "Address",
      audioDurationMs: 1100,
      answerOptions: ["Address", "Passport"],
      correctOption: "Address",
      successTitle: "Correto",
      feedbackMessage:
        '"Address" significa endereço. Tenha seu endereço anotado ou salvo.',
    },
  },
  {
    key: "address-complete",
    component: Exercise5,
    activity: {
      prompt:
        'Você entrou no táxi, mostrou o celular com o nome da rua para o motorista e disse: "Take me to this ______, please."',
      image: TRA1.A10S5,
      sentenceStart: "Take me to this",
      sentenceEnd: ", please.",
      options: ["address", "window"],
      correctAnswer: "address",
      successTitle: "Correto",
      successMessage: "Take me to this address, please.",
    },
  },
  {
    key: "take-me-hotel-true-false",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e responda: verdadeiro ou falso?",
      image: TRA1.A10S7,
      audioSource: require("../../../../../mp3/TR/A1/A10S7.mp3"),
      audioText: "Take me to the hotel, please.",
      audioDurationMs: 2200,
      statement:
        "O passageiro do áudio está pedindo para o motorista levá-lo para a estação de trem.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage: 'Ele pediu para ir ao "hotel".',
    },
  },
  {
    key: "transport-vocab-match",
    component: Exercise1,
    activity: {
      prompt: "Conecte as palavras de transporte para não se perder.",
      pairs: [
        { en: "Taxi", pt: "Táxi" },
        { en: "Train", pt: "Trem" },
        { en: "Address", pt: "Endereço" },
      ],
      successTitle: "Correto",
      successMessage: "Vocabulário de locomoção pronto.",
    },
  },
  {
    key: "take-me-hotel-order",
    component: Exercise6,
    activity: {
      prompt: "Clique nas palavras para escrever a frase na ordem correta.",
      words: ["me", "the", "to", "Take", "hotel"],
      correctOrder: ["Take", "me", "to", "the", "hotel"],
      successTitle: "Correto",
      successMessage: "Take me to the hotel.",
    },
  },
  {
    key: "take-address-correct-sentence",
    component: Exercise4,
    activity: {
      prompt:
        'Qual é a frase perfeita e educada para dizer ao motorista do táxi "Me leve para este endereço, por favor"?',
      image: TRA1.A10S5,
      wrongSentence: "Taxi request",
      options: [
        "I go to address.",
        "Address for me, please.",
        "Take me to this address, please.",
      ],
      correctAnswer: "Take me to this address, please.",
      successTitle: "Correto",
      successMessage: "Take me to this address, please.",
    },
  },
  {
    key: "take-me-hotel-writing",
    component: Exercise12,
    activity: {
      prompt: "Writing",
      instruction:
        'Imagine que você acabou de entrar no carro pelo aplicativo. Digite em inglês a frase mágica para o motorista: "Me leve para o hotel".',
      placeholder: "Take me to the hotel.",
      helperText: "Use Take me to...",
      tipText: "Take me to the hotel.",
      submitLabel: "Enviar",
      successTitle: "Correto",
      successMessage: "Take me to the hotel.",
    },
  },
  {
    key: "take-address-speaking",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        'Faça o seu pedido para o motorista como se estivesse no banco de trás do táxi agora mesmo: "Take me to this address, please".',
      helperText: "Take me to this address, please.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Take me to this address, please.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você praticou uma instrução para o motorista.",
    },
  },
  {
    key: "lesson-finish",
    type: "finish",
  },
];

export default createTravelLessonScreen(LESSON_SLIDES);
