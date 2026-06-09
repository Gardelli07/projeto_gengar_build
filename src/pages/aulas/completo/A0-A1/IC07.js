import createLessonScreen from "../../LessonScreen";
import { ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `Para dizer quem você ?, você precisa de uma palavra mágica. Consegue adivinhar?`,
        ICA1.A7S1,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A7S1,
      audioSource: require("../../../../../mp3/IC/A0-A1/A7S1.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["I am", "I are"],
      correctOption: "I am",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "I am" para dizer "eu sou".',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `Dica do Camaleão: Ninguém fala 'I am' o tempo todo. Na vida real, os nativos grudam as palavras: I am vira I'm. Soa muito mais fluido! `,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt: "Escreva a palavra",
      audioSource: require("../../../../../mp3/IC/A0-A1/A7S1.mp3"),
      audioDurationMs: 1000,
      letters: ["I", "A", "M"],
      correctWord: "IAM",
      successTitle: "Correto",
      successMessage: 'A palavra correta é "I am".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A7S5,
      audioSource: require("../../../../../mp3/IC/A0-A1/A7S5.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["I am not", "I are"],
      correctOption: "I am not",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "I am not" para dizer "eu não sou".',
    },
  },
  {
    component: "Exercise2",
    activity: {
      prompt: "Completar o Texto",
      paragraphs: [
        [
          "I",
          { id: "blank-1", answer: "am", options: ["is", "am"] },
          "not a robot.",
        ],
        [
          "I",
          {
            id: "blank-2",
            answer: "am",
            options: ["am", "are"],
          },
          "a human.",
        ],
      ],
      successTitle: "Excelente",
      successMessage: "Você completou o texto corretamente.",
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `Para dizer que você NÃO é algo, basta colocar o NOT depois do 'am'. Fácil, né? 
I am not ou I'm not. `,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction: "Fale brevemente sobre você em inglês.",
      helperText: "Diga seu nome e que você é um aluno do Lingueto.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "I am a student...",
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
    key: "lesson-finish",
    type: "finish",
  },
];

export default createLessonScreen(LESSON_SLIDES, {
  storageKey: "@progesso_ingles_completo_A0-A1",
  nextRouteName: "Inglescompleto",
  screenName: "InglesCompletoA0A1LessonScreen",
});
