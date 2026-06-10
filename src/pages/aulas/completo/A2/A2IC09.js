import createA2LessonScreen from "./A2LessonScreen";
import { ICA2, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic09intro",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 1 • AULA 9",
      content: [
        "/blue{I’m working tomorrow}",
        "Você já aprendeu que usamos -ING para o que está acontecendo agora. Mas ele também serve para planos futuros confirmados.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic09s1",
    component: "Exercise4",
    activity: {
      prompt:
        'Qual é a maneira correta para dizer "I go to the dentist tomorrow"?',
      image: ICA2.A9S1,
      wrongSentence: "I go to the dentist tomorrow.",
      options: [
        "I am going to the dentist tomorrow.",
        "I am go to the dentist tomorrow.",
      ],
      correctAnswer: "I am going to the dentist tomorrow.",
      successTitle: "Correto",
      successMessage:
        "Com plano confirmado no futuro, podemos usar Present Continuous.",
    },
  },
  {
    key: "a2ic09s2",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA2.A9S2,
      audioSource: require("../../../../../mp3/IC/A2/A9S2.mp3"),
      options: ["I'm traveling next week.", "I'm traveling right now."],
      correctAnswer: "I'm traveling next week.",
      correctOption: "I'm traveling next week.",
      feedbackMessage: 'O marcador "next week" mostra que é futuro.',
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic09s3",
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "/blue{Futuro ou Presente?}",
        "Usamos o Present Continuous para o futuro quando o plano está confirmado ou anotado na agenda.",
        "Procure palavras como tomorrow, tonight e next week.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic09s4",
    component: "Exercise1",
    activity: {
      prompt: "Conecte as expressões de tempo:",
      pairs: [
        { en: "Tonight", pt: "Hoje à noite" },
        { en: "Tomorrow", pt: "Amanhã" },
        { en: "Next weekend", pt: "Próximo fim de semana" },
      ],
      successTitle: "Correto",
      successMessage: "Essas palavras ajudam a indicar futuro.",
    },
  },
  {
    key: "a2ic09s5",
    component: "Exercise5",
    activity: {
      prompt: "Complete a frase:",
      sentenceStart: "We are",
      sentenceEnd: "a party this Saturday!",
      options: ["having", "have"],
      correctAnswer: "having",
      successTitle: "Correto",
      successMessage: "Have perde o E: having.",
    },
  },
  {
    key: "a2ic09s6",
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "/blue{Cuidado com o E!}",
        "Verbos que terminam em -e perdem essa letra antes do -ing.",
        "Have → Having",
        "Write → Writing",
        "Dance → Dancing",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic09s7",
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt: "Coloque as letras na ordem para formar a palavra:",
      audioSource: require("../../../../../mp3/IC/A2/A9S7.mp3"),
      letters: ["T", "O", "M", "O", "R", "R", "O", "W"],
      correctWord: "TOMORROW",
      successTitle: "Correto",
      successMessage: "Tomorrow significa amanhã.",
    },
  },
  {
    key: "a2ic09s8",
    component: "Exercise6",
    activity: {
      prompt: "Organize a frase:",
      words: ["meeting", "I", "am", "my", "boss", "tomorrow."],
      correctOrder: ["I", "am", "meeting", "my", "boss", "tomorrow."],
      successTitle: "Correto",
      successMessage: "I am meeting my boss tomorrow.",
    },
  },
  {
    key: "a2ic09s9",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Escute e responda: verdadeiro ou falso?",
      image: ICA2.A9S9,
      audioSource: require("../../../../../mp3/IC/A2/A9S9.mp3"),
      statement: "The person is at the concert right now.",
      textOnScreen: "The person is at the concert right now.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      successMessage: "False. Tonight indica um plano para mais tarde.",
      feedbackMessage: "A pessoa vai ao show hoje à noite, não está lá agora.",
    },
  },
  {
    key: "a2ic09s10",
    component: "Exercise2",
    activity: {
      prompt: "Complete o texto",
      paragraphs: [
        [
          "My sister ",
          {
            id: "b1",
            answer: "is coming",
      options: ["is coming", "are coming"],
          },
          " to visit me next month. We ",
          {
            id: "b2",
            answer: "are staying",
      options: ["are staying", "is staying"],
          },
          " at a hotel near the beach.",
        ],
      ],
      successTitle: "Correto",
      successMessage: "My sister is coming; we are staying.",
    },
  },
  {
    key: "a2ic09s11",
    component: "Exercise17",
    activity: {
      label: "Tip cultural",
      content: [
        "/blue{Agenda de Nativo}",
        'Se alguém perguntar "What are you doing tonight?", normalmente quer saber seus planos para mais tarde, não o que você está fazendo agora.',
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic09s12",
    component: "Exercise12",
    activity: {
      prompt: "Freer Practice",
      instruction: "Check your calendar! What are you doing next Sunday?",
      helperText: "Exemplo: I'm visiting my grandparents.",
      placeholder: "Digite sua frase aqui",
      tipText: "Use am/is/are + verbo com -ING + marcador de futuro.",
      successTitle: "Muito bem!",
      successMessage: "Você escreveu um plano futuro com Present Continuous.",
    },
  },
  {
    key: "a2ic09s13",
    component: "Exercise16",
    activity: {
      prompt: "Freer Practice - Áudio",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      instruction:
        "Fale sobre suas próximas férias. Para onde você vai e com quem vai viajar?",
      helperText: "Exemplo: I'm traveling to Rio with my family.",
      tipText: "Use Present Continuous para plano confirmado.",
      successTitle: "Muito bem!",
      successMessage: "Você gravou um plano futuro.",
    },
  },
  {
    key: "a2ic09s14",
    component: "Exercise11",
    activity: {
      prompt: "Digite as palavras-chave do futuro:",
      title: "Escreva rápido",
      placeholder: "Digite aqui",
      secondsPerWord: 8,
      words: ["Tonight", "Tomorrow", "Next", "Meeting", "Planning"],
      successTitle: "Correto",
      successMessage: "Essas palavras sinalizam planos futuros.",
    },
  },
  {
    key: "a2ic09s15",
    component: "Exercise17",
    activity: {
      label: "Resumo",
      content: [
        "/blue{Resumo do Lingueto}",
        "O Present Continuous é multiuso: use para o agora e para planos confirmados.",
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
