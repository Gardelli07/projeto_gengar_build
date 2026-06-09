import createLessonScreen from "../../LessonScreen";
import { ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise17",
    activity: {
      label: "Morning!",
      content: [
        ICA1.A18S1,
        ICA1.A18S1p2,
        "O sol mudou de posição, e o seu cumprimento também muda! Vamos aprender a saudar o diaí",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A18S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A18S2.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Good morning", "Good night"],
      correctOption: "Good morning",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "Good morning" para cumprimentar de manha.',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Dica Cultural: De manhá, os nativos costumam ser práticos.",
        "Em situações informais, com amigos ou família, É muito comum eles cortarem o Good e dizerem apenas Morning!",
        "É como o nosso Dia! em vez de Bom dia!.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A18S4,
      audioSource: require("../../../../../mp3/IC/A0-A1/A18S4.mp3"),
      audioDurationMs: 1100,
      answerOptions: ["Good afternoon", "Good morning"],
      correctOption: "Good afternoon",
      successTitle: "Correto",
      feedbackMessage:
        'Usamos "Good afternoon" depois do meio-dia e antes do anoitecer.',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Quando mudaí O Good afternoon comeca exatamente após o meio-dia (12:00 PM) e vai até o pâr do sol, por volta das 5 ou 6 da tarde.",
        "Dica de Pronúncia: Note que as palavras se juntam! O som parece gu-dafter-nun.",
        "O d do Good gruda no a do Afternoon!",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise1",
    activity: {
      prompt: "Conecte a hora a saudacao",
      pairs: [
        { en: "08:00 AM", pt: "Good morning" },
        { en: "03:00 PM", pt: "Good afternoon" },
      ],
      successTitle: "Excelente",
      successMessage:
        "08:00 AM combina com Good morning. 03:00 PM combina com Good afternoon.",
    },
  },
  {
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt: "Letras baguncadas",
      audioSource: require("../../../../../mp3/IC/A0-A1/A18S7.mp3"),
      audioDurationMs: 1000,
      letters: ["O", "O", "N", "R", "A", "F", "T", "E", "N"],
      correctWord: "AFTERNOON",
      successTitle: "Correto",
      successMessage: 'A palavra correta é "AFTERNOON".',
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Voce chega no trabalho às 9 da manhá.",
      words: ["morning,", "Good", "boss!"],
      correctOrder: ["Good", "morning,", "boss!"],
      successTitle: "Correto",
      successMessage: 'A frase correta é "Good morning, boss!"',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e identifique o cenario",
      image: ICA1.A18S2,
      audioText: "Good morning, everyone!",
      audioDurationMs: 1850,
      answerOptions: ["Período da manhá", "Período da tarde"],
      correctOption: "Período da manhá",
      successTitle: "Correto",
      feedbackMessage: '"Good morning" indica o período da manhá.',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e identifique o cenario",
      image: ICA1.A18S4,
      audioText: "Good afternoon, sir.",
      audioDurationMs: 1400,
      answerOptions: ["Período da manhá", "Período da tarde"],
      correctOption: "Período da tarde",
      successTitle: "Correto",
      feedbackMessage: '"Good afternoon" indica o período da tarde.',
    },
  },
  {
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction: "Imagine que sao 14:00.",
      helperText: "Grave uma saudação para o seu professor.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Good afternoon! / Good afternoon, teacher!",
      recordLabel: "Speak",
      stopLabel: "Parar",
      playLabel: "Ouvir",
      pauseLabel: "Pausar",
      rerecordLabel: "Regravar",
      submitLabel: "Enviar audio",
      successTitle: "Correto",
      successMessage:
        'Resposta esperada: "Good afternoon!" ou "Good afternoon, teacher!"',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip Final",
      content: [
        "Parabéns! Você agora sabe brilhar em qualquer horário do dia.",
        "Lembre-se: o Good morning traz energia, e o Good afternoon mantem o ritmo!",
        "Próxima aula: O mistério do Good Evening vs Good Night. See you!",
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
