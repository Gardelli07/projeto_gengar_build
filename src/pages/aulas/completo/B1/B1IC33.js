import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "idioms-time-money-intro",
    component: "Exercise17",
    activity: {
      label: "Idioms de Tempo e Dinheiro",
      content: [
        `Expressões idiomáticas (Idioms) são o segredo para você não soar como um robô.

- Time flies: o tempo voa. Usamos quando o tempo passa muito rápido, geralmente quando estamos nos divertindo.
- Break the bank: custar uma fortuna. Geralmente usado na negativa: "It won't break the bank" (não vai te falir / é barato).`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "time-flies-image",
    component: "Exercise8",
    activity: {
      prompt:
        "Baseado na imagem, qual expressão idiomática ela representa literalmente?",
      image: ICB1.A33S2e4,
      options: ["Time flies", "Break the bank", "Back down", "Make a mistake"],
      correctAnswer: "Time flies",
      successTitle: "Correto",
      successMessage:
        "Um relógio com asas representa literalmente: Time flies.",
    },
  },
  {
    key: "break-bank-correct-sentence",
    component: "Exercise4",
    activity: {
      prompt: "Qual frase soa mais natural usando as expressões aprendidas?",
      wrongSentence: "Idioms",
      image: ICB1.A33S3,
      options: [
        "Buying this car will time flies.",
        "This vacation is beautiful, it breaks the bank time.",
        "We can buy this TV, it won't break the bank.",
      ],
      correctAnswer: "We can buy this TV, it won't break the bank.",
      successTitle: "Correto",
      successMessage:
        "It won't break the bank significa que algo não vai custar uma fortuna.",
    },
  },
  {
    key: "time-flies-true-false",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e responda se a frase é verdadeira ou falsa.",
      image: ICB1.A33S2e4,
      audioSource: require("../../../../../mp3/IC/B1/A33S4.mp3"),
      audioDurationMs: 3500,
      statement: "The person feels that the year passed very slowly.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage:
        "Time flies mostra que a pessoa sentiu que o tempo passou rápido.",
    },
  },
  {
    key: "match-idioms",
    component: "Exercise1",
    activity: {
      prompt: "Conecte o Idiom ao seu significado real.",
      pairs: [
        { en: "Time flies", pt: "O tempo passa muito rápido" },
        { en: "Break the bank", pt: "Gastar todo o seu dinheiro" },
      ],
      successTitle: "Correto",
      successMessage: "Esses idioms aparecem muito em conversas naturais.",
    },
  },
  {
    key: "spell-bank",
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt:
        'Organize as letras para formar a palavra que completa a expressão "Break the _____".',
      audioSource: require("../../../../../mp3/IC/B1/A33S6.mp3"),
      audioDurationMs: 900,
      letters: ["K", "N", "A", "B"],
      correctWord: "BANK",
      successTitle: "Correto",
      successMessage: 'A expressão completa é "Break the bank".',
    },
  },
  {
    key: "time-flies-writing-order",
    component: "Exercise18",
    activity: {
      prompt: "As palavras estão bagunçadas. Digite a frase corretamente.",
      scrambledSentence: "fun / flies / having / you're / when / Time",
      correctAnswer: "Time flies when you're having fun.",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "Time flies when you're having fun.",
    },
  },
  {
    key: "break-bank-complete",
    component: "Exercise5",
    activity: {
      prompt: "Complete a frase com a opção correta.",
      sentenceStart: "I bought this shirt on sale. It didn't",
      sentenceEnd: ".",
      options: ["time fly", "break the bank"],
      correctAnswer: "break the bank",
      successTitle: "Correto",
      successMessage: "Se não foi caro, it didn't break the bank.",
    },
  },
  {
    key: "time-flew-audio",
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction:
        'Mande um áudio contando sobre uma situação recente em que você sentiu que "Time flew" (o tempo voou). O que você estava fazendo?',
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Time flew when I was talking to my friends.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Seu áudio usando o idiom foi gravado.",
    },
  },
  {
    key: "lesson-finish",
    type: "finish",
  },
];

export default createLessonScreen(LESSON_SLIDES, {
  storageKey: "@progesso_ingles_completo_B1",
  nextRouteName: "InglescompletoB1",
  screenName: "InglesCompletoB1LessonScreen",
});
