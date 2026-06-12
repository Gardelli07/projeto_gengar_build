import createLessonScreen from "../../LessonScreen";
import { ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise17",
    activity: {
      label: "Atividade 17",
      content: [
        ICA1.A16S1,
        "Você desbloqueou todos os poderes da identidade. Consegue usar o motor certo para cada situação?",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A13S3,
      audioSource: require("../../../../../mp3/IC/A0-A1/A16S2.mp3"),
      audioDurationMs: 850,
      answerOptions: ["She isn't", "He is"],
      correctOption: "She isn't",
      successTitle: "Correto",
      feedbackMessage: 'O audio diz "She isn\'t".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A13S4,
      audioSource: require("../../../../../mp3/IC/A0-A1/A16S3.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Are they?", "They are?"],
      correctOption: "Are they?",
      successTitle: "Correto",
      feedbackMessage: 'Em perguntas, usamos "Are they?".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A14S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A16S4.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["I'm not", "I am't"],
      correctOption: "I'm not",
      successTitle: "Correto",
      feedbackMessage: 'A forma correta é "I\'m not".',
    },
  },
  {
    component: "Exercise1",
    activity: {
      prompt: "Conecte tudo",
      pairs: [
        { en: "She", pt: "isn't a teacher." },
        { en: "They", pt: "are students." },
        { en: "I", pt: "am not hungry." },
      ],
      successTitle: "Excelente",
      successMessage:
        "She isn't a teacher. They are students. I am not hungry.",
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Perguntando se o cafe esta quente.",
      words: ["hot?", "it", "Is"],
      correctOrder: ["Is", "it", "hot?"],
      successTitle: "Correto",
      successMessage: 'A pergunta correta é "Is it hot?"',
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Dizendo que nos nao estamos cansados.",
      words: ["tired.", "aren't", "We"],
      correctOrder: ["We", "aren't", "tired."],
      successTitle: "Correto",
      successMessage: 'A frase correta é "We aren\'t tired."',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Revisao Final:",
        "Identidade: I am / He is.",
        "Negacao: It isn't / You aren't.",
        "Pergunta: Am I? / Are they?",
        "O segredo e olhar para QUEM voce esta falando antes de escolher o motor!",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise4",
    activity: {
      prompt: "Escolha a resposta correta",
      image: ICA1.A16S9,
      wrongSentence: 'Alguem pergunta: "Is she Brazilian?"',
      options: ["Yes, she's.", "Yes, she is."],
      correctAnswer: "Yes, she is.",
      successTitle: "Correto",
      successMessage:
        "Em respostas curtas positivas, nunca usamos contracao: Yes, she is.",
    },
  },
  {
    component: "Exercise2",
    activity: {
      prompt: "Complete o dialogo",
      paragraphs: [
        [
          "A:",
          {
            id: "blank-1",
            answer: "Are",
            options: ["Are", "Is", "Am"],
          },
          "you ready?",
        ],
        [
          "B: No, I",
          {
            id: "blank-2",
            answer: "am",
            options: ["am", "are", "is"],
          },
          "not.",
        ],
      ],
      successTitle: "Excelente",
      successMessage: 'O dialogo correto e: "Are you ready? No, I am not."',
    },
  },
  {
    component: "Exercise12",
    activity: {
      prompt: "Escrita",
      instruction:
        "Escreva uma pergunta para o Camaleao perguntando se ele esta feliz.",
      helperText: "Use a palavra happy.",
      placeholder: "Are you happy?",
      tipText: "Are you happy?",
      minLength: 5,
      successTitle: "Correto",
      successMessage: 'Resposta esperada: "Are you happy?"',
    },
  },
  {
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction: "Apresente dois amigos em ingles.",
      helperText: "Grave: Eles sao legais.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "They are cool.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      playLabel: "Ouvir",
      pauseLabel: "Pausar",
      rerecordLabel: "Regravar",
      submitLabel: "Enviar audio",
      successTitle: "Correto",
      successMessage: 'Resposta esperada: "They are cool."',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip Final",
      content: [
        "INCRIVEL! Voce concluiu todo o treinamento do Verbo To Be.",
        "Voce agora fala sobre si mesmo, sobre os outros e sobre o mundo ao seu redor.",
        "Voce esta pronto para o BOSS LEVEL: O Desafio Final.",
        "Se falhar, o portal se fecha por 24 horas. Good luck!",
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
