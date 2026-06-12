import createLessonScreen from "../../LessonScreen";
import { ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise17",
    activity: {
      label: "Review",
      content: [
        ICA1.A15S1,
        "Para descobrir a verdade, você precisa perguntar! Você lembra quem começa a frase em uma perguntaí",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A15S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A15S2.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Am I...?", "I am...?"],
      correctOption: "Am I...?",
      successTitle: "Correto",
      feedbackMessage: 'Em perguntas, o "am" vem antes do "I".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A15S3,
      audioSource: require("../../../../../mp3/IC/A0-A1/A15S3.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Is he...?", "He is...?"],
      correctOption: "Is he...?",
      successTitle: "Correto",
      feedbackMessage: 'Em perguntas, o "is" vai para o começo.',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A15S4,
      audioSource: require("../../../../../mp3/IC/A0-A1/A15S4.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Are you...?", "You are...?"],
      correctOption: "Are you...?",
      successTitle: "Correto",
      feedbackMessage: 'Em perguntas, o "are" vem antes do "you".',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Dica de Revisão: Em perguntas, o Verbo To Be (Am, Is, Are) é o líder. Ele pula para o início da frase e a sua voz sobe no final.",
        "Are you okay? Pratique essa subida de som!",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Perguntando se ele é seu professor.",
      words: ["your", "is", "teacher?", "he"],
      correctOrder: ["is", "he", "your", "teacher?"],
      successTitle: "Correto",
      successMessage: 'A frase correta é "Is he your teacher?"',
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Perguntando se nós estamos atrasados.",
      words: ["late?", "are", "we"],
      correctOrder: ["are", "we", "late?"],
      successTitle: "Correto",
      successMessage: 'A frase correta é "Are we late?"',
    },
  },
  {
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt: "Escreva a pergunta",
      audioSource: require("../../../../../mp3/IC/A0-A1/A15S8.mp3"),
      audioDurationMs: 1200,
      letters: ["S", "I", "I", "S", "H", "T", "?"],
      correctWord: "ISTHIS?",
      successTitle: "Correto",
      successMessage: 'A pergunta correta é "Is this?"',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Responda rápido!",
        "  • Is she happy? -> Yes, she is. / No, she isn't.",
        "  • Are they ready? -> Yes, they are. / No, they aren't.",
        "Nunca use contração no Yes. Yes, she's está errado. Mantenha as palavras separadas no positivo!",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise4",
    activity: {
      prompt: "Corrija",
      image: ICA1.A15S10,
      wrongSentence: "Como se pergunta: estou na lista?",
      options: ["Am I on the list?", "I am on the list?"],
      correctAnswer: "Am I on the list?",
      successTitle: "Correto",
      successMessage: 'A pergunta correta é "Am I on the list?"',
    },
  },
  {
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Escute e responda",
      image: ICA1.A15S11,
      audioSource: require("../../../../../mp3/IC/A0-A1/A15S11.mp3"),
      audioDurationMs: 2000,
      dialogue: "A pessoa está afirmando que está calor.",
      options: ["True", "False"],
      correctAnswer: "False",
      successTitle: "Correto",
      successMessage:
        'O áudio pergunta "Is it cold outside?", então não é uma afirmação sobre calor.',
    },
  },
  {
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction: "Pergunte para um grupo de pessoas em inglês.",
      helperText: "Grave: 'Vocês estão prontos?'",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Are you ready?",
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
      label: "Review",
      content: [
        "INCRÍVEL! Você agora domina as três formas do Verbo To Be: afirmar, negar e perguntar.",
        "Você concluiu a gramática mais importante do inglês! Agora, prepare-se para o GRAND REVIEW, onde vamos misturar TUDO em um desafio Épico. See you soon!",
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
