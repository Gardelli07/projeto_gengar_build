import createA2LessonScreen from "./A2LessonScreen";
import { ICA2 } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic28s1",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 3 • AULA 28",
      content: [
        "/blue{ING or ED?}",
        "/blue{O Clímax da História!}",
        "Sabe quando você está fazendo algo e algo acontece de repente?",
        "Ação longa: Past Continuous. Exemplo: I was sleeping.",
        "Ação curta: Past Simple. Exemplo: the phone rang.",
        "O segredo é o conector when: I was sleeping when the phone rang.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic28s2",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha.",
      image: ICA2.A28S2,
      audioSource: require("../../../../../mp3/IC/A2/A28S2.mp3"),
      options: [
        "I was cooking when he arrived.",
        "Cooked when he was arriving.",
      ],
      correctAnswer: "I was cooking when he arrived.",
      correctOption: "I was cooking when he arrived.",
      feedbackMessage:
        "A ação que já estava rolando leva ing; a interrupção fica no Past Simple.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic28s3",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha.",
      image: ICA2.A28S3,
      audioSource: require("../../../../../mp3/IC/A2/A28S3.mp3"),
      options: [
        "We were play when it started to rain.",
        "We were playing when it started to rain.",
      ],
      correctAnswer: "We were playing when it started to rain.",
      correctOption: "We were playing when it started to rain.",
      feedbackMessage: "When liga as duas partes da história.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic28s4",
    component: "Exercise7",
    activity: {
      prompt: "O que aconteceu primeiro? Coloque na ordem lógica da cena.",
      sentences: [
        "When the lights went out.",
        "I was studying for my exam.",
        "I found a candle.",
        "Then, I continued studying.",
      ],
      correctOrder: [
        "I was studying for my exam.",
        "When the lights went out.",
        "I found a candle.",
        "Then, I continued studying.",
      ],
      successTitle: "Correto",
      successMessage: "A cena longa veio antes da interrupção.",
    },
  },
  {
    key: "a2ic28s5",
    component: "Exercise2",
    activity: {
      prompt: "Complete o texto.",
      text: "They (1) _________ when the music (2) _________. Everybody (3) _________ surprised!",
      blanks: [
        {
          id: "1",
          options: ["were dancing", "danced"],
          answer: "were dancing",
        },
        { id: "2", options: ["was stopping", "stopped"], answer: "stopped" },
        { id: "3", options: ["was looking", "looked"], answer: "looked" },
      ],
      successTitle: "Correto",
      successMessage:
        "Ação longa com were dancing; interrupções no passado simples.",
    },
  },
  {
    key: "a2ic28s6",
    component: "Exercise18",
    activity: {
      prompt: "Monte a cena da interrupção.",
      scrambledWords: [
        "sleeping",
        "I",
        "was",
        "when",
        "rang",
        "phone",
        "the",
        ".",
      ],
      words: ["sleeping", "I", "was", "when", "rang", "phone", "the", "."],
      correctAnswer: "I was sleeping when the phone rang.",
      successTitle: "Correto",
      successMessage: "I was sleeping when the phone rang.",
    },
  },
  {
    key: "a2ic28s7",
    component: "Exercise18",
    activity: {
      prompt: "Agora sobre o Camaleão. Digite a frase.",
      scrambledWords: [
        "Cam",
        "was",
        "eating",
        "when",
        "he",
        "saw",
        "a",
        "fly",
        ".",
      ],
      words: ["Cam", "was", "eating", "when", "he", "saw", "a", "fly", "."],
      correctAnswer: "Cam was eating when he saw a fly.",
      successTitle: "Correto",
      successMessage: "Cam was eating when he saw a fly.",
    },
  },
  {
    key: "a2ic28s8",
    component: "Exercise18",
    activity: {
      prompt: "Mais uma! Digite com atenção.",
      scrambledWords: [
        "They",
        "were",
        "walking",
        "when",
        "it",
        "started",
        "to",
        "snow",
        ".",
      ],
      words: [
        "They",
        "were",
        "walking",
        "when",
        "it",
        "started",
        "to",
        "snow",
        ".",
      ],
      correctAnswer: "They were walking when it started to snow.",
      successTitle: "Correto",
      successMessage: "They were walking when it started to snow.",
    },
  },
  {
    key: "a2ic28s9",
    component: "Exercise19",
    activity: {
      prompt: "Escute e digite.",
      audioSource: require("../../../../../mp3/IC/A2/A28S9.mp3"),
      correctAnswer: "She was singing when I entered the room.",
      successTitle: "Correto",
      successMessage: "She was singing when I entered the room.",
    },
  },
  {
    key: "a2ic28s10",
    component: "Exercise19",
    activity: {
      prompt: "Escute e digite.",
      audioSource: require("../../../../../mp3/IC/A2/A28S10.mp3"),
      correctAnswer: "We were driving when the car broke down.",
      successTitle: "Correto",
      successMessage: "We were driving when the car broke down.",
    },
  },
  {
    key: "a2ic28s11",
    component: "Exercise19",
    activity: {
      prompt: "Escute e digite.",
      audioSource: require("../../../../../mp3/IC/A2/A28S11.mp3"),
      correctAnswer: "Was he working when you called?",
      successTitle: "Correto",
      successMessage: "Was he working when you called?",
    },
  },
  {
    key: "a2ic28s12",
    component: "Exercise17",
    activity: {
      label: "Desafio",
      content: [
        "/blue{Desafio Interrompido!}",
        "Vou te dar duas ações. Você deve juntá-las usando when.",
        "Exemplo: I / sleep | phone / ring → I was sleeping when the phone rang.",
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "a2ic28s13",
    component: "Exercise6",
    activity: {
      prompt: "Organize as palavras para formar a frase.",
      words: ["cooking", "I", "when", "arrived", "She", "was"],
      correctAnswer: "She was cooking when I arrived",
      successTitle: "Correto",
      successMessage: "She was cooking when I arrived.",
    },
  },
  {
    key: "a2ic28s14",
    component: "Exercise6",
    activity: {
      prompt: "Organize as palavras para formar a frase.",
      words: ["it", "were", "when", "They", "rained", "playing"],
      correctAnswer: "They were playing when it rained",
      successTitle: "Correto",
      successMessage: "They were playing when it rained.",
    },
  },
  {
    key: "a2ic28s15",
    component: "Exercise6",
    activity: {
      prompt: "Organize as palavras para formar a frase.",
      words: ["called", "was", "studying", "when", "Sarah", "He"],
      correctAnswer: "He was studying when Sarah called",
      successTitle: "Correto",
      successMessage: "He was studying when Sarah called.",
    },
  },
  {
    key: "a2ic28s16",
    component: "Exercise6",
    activity: {
      prompt: "Organize as palavras para formar a frase.",
      words: ["saw", "was", "a", "cat", "I", "when", "I", "driving"],
      correctAnswer: "I was driving when I saw a cat",
      successTitle: "Correto",
      successMessage: "I was driving when I saw a cat.",
    },
  },
  {
    key: "a2ic28s17",
    component: "Exercise6",
    activity: {
      prompt: "Organize as palavras para formar a frase.",
      words: ["eating", "when", "the", "rang", "were", "We", "bell"],
      correctAnswer: "We were eating when the bell rang",
      successTitle: "Correto",
      successMessage: "We were eating when the bell rang.",
    },
  },
  {
    key: "a2ic28s18",
    component: "Exercise12",
    activity: {
      prompt: "Conte algo que foi interrompido no seu dia de hoje.",
      instruction: 'Exemplo: "I was drinking coffee when my boss called me."',
      correctAnswer: "I was drinking coffee when my boss called me.",
      successTitle: "Muito bem!",
      successMessage: "História registrada.",
    },
  },
  {
    key: "a2ic28s19",
    component: "Exercise16",
    activity: {
      prompt: "Gravação de áudio",
      instruction:
        'Grave esta frase dramática: "I was dreaming about pizza when the alarm clock woke me up!"',
      helperText: "I was dreaming about pizza when the alarm clock woke me up!",
      successTitle: "Muito bem!",
      successMessage: "Seu áudio foi gravado.",
    },
  },
  {
    key: "a2ic28s20",
    component: "Exercise17",
    activity: {
      label: "Final",
      content: [
        "/blue{Storyteller Profissional!}",
        "Agora você sabe dar dinamismo às suas histórias misturando o contínuo com o simples.",
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
