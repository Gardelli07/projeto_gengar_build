import { Exercise1 } from "../../../../exc/ex1";
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
    key: "travel-politeness-intro",
    component: Exercise17,
    activity: {
      label: "Greetings & Politeness",
      content: [
        "Welcome aboard! Para começar a sua viagem com o pé direito, o segredo não é ter o vocabulário perfeito de cara, mas sim ser educado. Os nativos valorizam muito a educação (politeness). Neste módulo, você vai aprender as palavras mágicas que abrem portas em qualquer aeroporto, hotel ou restaurante do mundo! Let's go!",
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "good-morning-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A1S2,
      audioSource: require("../../../../../mp3/TR/A1/A1S2.mp3"),
      audioDurationMs: 1200,
      answerOptions: ["Good morning", "Good night"],
      correctOption: "Good morning",
      successTitle: "Correto",
      feedbackMessage:
        'Usamos "Good morning" desde a hora que acordamos até o meio-dia.',
    },
  },
  {
    key: "good-evening-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A1S3,
      audioSource: require("../../../../../mp3/TR/A1/A1S3.mp3"),
      audioDurationMs: 1200,
      answerOptions: ["Good evening", "Good afternoon"],
      correctOption: "Good evening",
      successTitle: "Correto",
      feedbackMessage:
        '"Good evening" é o nosso "Boa noite" de chegada em inglês.',
    },
  },
  {
    key: "evening-night-tip",
    component: Exercise17,
    activity: {
      label: "Dica de Nativo",
      content: [
        `No Brasil, falamos "Boa noite" para tudo. Em inglês, a regra é clara:

Chegou em um lugar à noite? Diga "Good evening".

Está indo embora do restaurante ou indo dormir no hotel? Diga "Good night". Nunca diga "Good night" ao chegar em um local!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "hotel-evening-complete",
    component: Exercise5,
    activity: {
      prompt:
        "Você acabou de chegar ao balcão do hotel às 20h para o check-in. Como você cumprimenta o recepcionista?",
      sentenceStart: "",
      sentenceEnd: ", I have a reservation.",
      options: ["Good evening", "Good night"],
      correctAnswer: "Good evening",
      successTitle: "Correto",
      successMessage: 'Ao chegar à noite, use "Good evening".',
    },
  },
  {
    key: "excuse-me-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A1S6,
      audioSource: require("../../../../../mp3/TR/A1/A1S6.mp3"),
      audioDurationMs: 1200,
      answerOptions: ["Excuse me", "Thank you"],
      correctOption: "Excuse me",
      successTitle: "Correto",
      feedbackMessage:
        '"Excuse me" serve para pedir licença ou chamar a atenção de alguém.',
    },
  },
  {
    key: "sorry-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A1S7,
      audioSource: require("../../../../../mp3/TR/A1/A1S7.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Please", "Sorry"],
      correctOption: "Sorry",
      successTitle: "Correto",
      feedbackMessage:
        '"Sorry" é o pedido de desculpas quando você comete um erro.',
    },
  },
  {
    key: "excuse-me-sorry-tip",
    component: Exercise17,
    activity: {
      label: "Excuse me vs. Sorry",
      content: [
        `Quer chamar a atenção do garçom ou passar em um corredor apertado no avião? Use "Excuse me".

Pisou no pé de alguém sem querer? Use "Sorry".

É sobrevivência pura!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "good-morning-excuse-me-order",
    component: Exercise6,
    activity: {
      prompt: "Clique nas palavras para escrever a frase na ordem correta.",
      words: ["morning", "Good", ",", "me", "excuse"],
      correctOrder: ["Good", "morning", ",", "excuse", "me"],
      successTitle: "Correto",
      successMessage: "Good morning, excuse me.",
    },
  },
  {
    key: "magic-words-match",
    component: Exercise1,
    activity: {
      prompt: "Conecte as palavras mágicas com suas traduções.",
      pairs: [
        { en: "Please", pt: "Por favor" },
        { en: "Thank you", pt: "Obrigado" },
        { en: "You're welcome", pt: "De nada" },
      ],
      successTitle: "Correto",
      successMessage: "Please, thank you e you're welcome abrem portas.",
    },
  },
  {
    key: "good-evening-writing",
    component: Exercise12,
    activity: {
      prompt: "Writing",
      instruction:
        "Imagine que você acabou de chegar na recepção do seu hotel à noite, por volta das 20h. Digite em inglês como você diria o 'Boa noite' de chegada para o recepcionista.",
      placeholder: "Good evening",
      helperText: "Use o cumprimento de chegada à noite.",
      tipText: "Good evening",
      submitLabel: "Enviar",
      successTitle: "Correto",
      successMessage: "Good evening é o cumprimento certo ao chegar à noite.",
    },
  },
  {
    key: "excuse-me-good-morning-speaking",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        'Imagine que você chegou na recepção do hotel de manhã para fazer o seu check-in e precisa chamar a atenção do recepcionista de forma educada. Grave um áudio dizendo "Com licença" e depois cumprimentando com "Bom dia".',
      helperText: "Excuse me, good morning!",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Excuse me, good morning!",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você praticou um cumprimento educado de viagem.",
    },
  },
  {
    key: "lesson-finish",
    type: "finish",
  },
];

export default createTravelLessonScreen(LESSON_SLIDES);
