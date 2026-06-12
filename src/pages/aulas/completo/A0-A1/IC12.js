import createLessonScreen from "../../LessonScreen";
import { ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        ICA1.A12S1,
        `Você quer descobrir algo sobre um grupo. Como o 'Are' se move para fazer uma perguntaí`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A12S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A12S2.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Are you?", "You are"],
      correctOption: "Are you?",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "Are you?" para perguntar "você é/está?".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A10S10,
      audioSource: require("../../../../../mp3/IC/A0-A1/A12S4.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Are they?", "They are"],
      correctOption: "Are they?",
      successTitle: "Correto",
      feedbackMessage:
        'Usamos "Are they?" para perguntar "eles/elas são/estão?".',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `O Camaleão ensina: Para perguntar, o ARE vira o líder e pula para o começo da frase! 
  • Afirmaíão: They are friends.
  • Pergunta: Are they friends? 
Mude a ordem e você teré uma pergunta perfeita! `,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Coloque a frase em ordem.",
      words: ["ready", "you", "are", "?"],
      correctOrder: ["are", "you", "ready", "?"],
      successTitle: "Correto",
      successMessage: `A frase correta é "Are you ready?"`,
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Coloque a frase em ordem.",
      words: ["Brazilian", "they", "are", "?"],
      correctOrder: ["are", "they", "Brazilian", "?"],
      successTitle: "Correto",
      successMessage: `A frase correta é "Are they Brazilian?"`,
    },
  },
  {
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt: "Escreva a palavra",
      audioSource: require("../../../../../mp3/IC/A0-A1/A12S8.mp3"),
      audioDurationMs: 1000,
      letters: ["A", "E", "R"],
      correctWord: "ARE",
      successTitle: "Correto",
      successMessage: 'A palavra correta é "Are".',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `Como responder? Você não precisa repetir tudo.
  • Yes, we are. / No, we aren't.
  • Yes, they are. / No, they aren't. 
Dica: Na resposta curta de 'Sim', nunca usamos a contração. É sempre 'Yes, I am' ou 'Yes, they are', nunca 'Yes, they're'.
`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A12S10,
      audioSource: require("../../../../../mp3/IC/A0-A1/A12S10.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Yes, we are", "Yes, we're"],
      correctOption: "Yes, we are",
      successTitle: "Correto",
      feedbackMessage:
        'Usamos "Yes, we are." para responder "sim, nós somos/estamos".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A12S11,
      audioSource: require("../../../../../mp3/IC/A0-A1/A12S11.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["No, they aren't", "No, they are"],
      correctOption: "No, they aren't",
      successTitle: "Correto",
      feedbackMessage:
        'Usamos "No, they aren\'t." para responder "não, eles/elas não são/estão".',
    },
  },
  {
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Escute e responda",
      image: ICA1.A12S12,
      audioSource: require("../../../../../mp3/IC/A0-A1/A12S12.mp3"),
      audioDurationMs: 1100,
      dialogue: "A pessoa está afirmando que o grupo chegou no horário.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      successMessage: "Falso. Ele está perguntando se estão atrasados",
    },
  },
  {
    component: "Exercise4",
    activity: {
      prompt: "Corrija",
      image: ICA1.A12S13,
      wrongSentence: "Você pergunta para um grupo se eles são estudantes.",
      options: ["You are students?", "Are you students?"],
      correctAnswer: "Are you students?",
      successTitle: "Correto",
      successMessage: 'A forma correta é "Are you students?"',
    },
  },
  {
    component: "Exercise12",
    activity: {
      prompt: "Write your introduction",
      instruction: "Escreva brevemente sobre você em inglês.",
      helperText:
        "Imagine que você vê dois amigos conversando. Escreva uma pergunta para eles: 'Vocês estão felizes?'",
      placeholder: "Hello...",
      tipText: '"Are you happy?" ou "Are you guys happy?"',
      minLength: 3,
      successTitle: "Correto",
      successMessage: "Seu texto foi preenchido com sucesso.",
    },
  },
  {
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction: "Fale brevemente sobre você em inglês.",
      helperText: "Pergunte ao Camaleão e aos seus amigos: 'Nós somos amigos?'",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Are we friends?",
      recordLabel: "Speak",
      stopLabel: "Parar",
      playLabel: "Ouvir",
      pauseLabel: "Pausar",
      rerecordLabel: "Regravar",
      submitLabel: "Enviar áudio",
      successTitle: "Correto",
      successMessage: "Seu áudio foi gravado com sucesso.",
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `Uau! Você completou o mapa das perguntas! Agora você sabe interrogar qualquer pessoa ou grupo em inglês. Prepare-se, porque os próximos desafios serão os /blueREVIEWS (Revisões), onde vamos misturar TUDO o que você aprendeu! See you! `,
      ],
      continueLabel: "Continuar",
    },
  },

  {
    key: "lesson-finish",
    type: "finish",
  },
];

export default createLessonScreen(LESSON_SLIDES, {
  storageKey: "@progesso_ingles_completo_A0-A1",
  nextRouteName: "Inglescompleto",
  screenName: "InglesCompletoA0A1LessonScreen",
});
