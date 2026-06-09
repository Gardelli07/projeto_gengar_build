import createLessonScreen from "../../LessonScreen";
import { ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise17",
    activity: {
      label: "Good evening!",
      content: [
        ICA1.A19S1,
        ICA1.A19S1p2,
        "Existem dois jeitos de dizer Boa noite. Um é para quando você chega e o outro para quando você vai dormir. Consegue adivinhar qual é qual?",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A19S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A19S2.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Good evening", "Good night"],
      correctOption: "Good evening",
      successTitle: "Correto",
      feedbackMessage: "Good evening é o cumprimento de chegada a noite.",
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Dica de Ouro do Camaleão: Good evening é um cumprimento de chegada.",
        "Pense nele como o Hello da noite.",
        "Se você entrar em um restaurante ou na aula as 20h, use sempre Evening!",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A19S3,
      audioSource: require("../../../../../mp3/IC/A0-A1/A19S3.mp3"),
      audioDurationMs: 900,
      answerOptions: ["Good evening", "Good night"],
      correctOption: "Good night",
      successTitle: "Correto",
      feedbackMessage: "Good night é usado para se despedir ou ir dormir.",
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Dica Cultural: Good night NÃO é um cumprimento de chegada.",
        "Ele é usado apenas para se despedir ou quando você está indo dormir.",
        "Se você disser Good night ao entrar em uma festa, as pessoas vão achar que você já está indo embora!",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise1",
    activity: {
      prompt: "Conecte a situacao",
      pairs: [
        { en: "Chegando em um evento às 19:00", pt: "Good evening" },
        { en: "Saindo de casa às 22:00", pt: "Good night" },
      ],
      successTitle: "Excelente",
      successMessage:
        "Chegada a noite combina com Good evening. Despedida a noite combina com Good night.",
    },
  },
  {
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt: "Letras baguncadas",
      audioSource: require("../../../../../mp3/IC/A0-A1/A19S7.mp3"),
      audioDurationMs: 1200,
      letters: ["G", "N", "I", "N", "E", "V", "E"],
      correctWord: "EVENING",
      successTitle: "Correto",
      successMessage: 'A palavra correta é "Evening".',
    },
  },
  {
    component: "Exercise4",
    activity: {
      prompt: "Escolha a frase correta",
      image: ICA1.A19S8,
      wrongSentence: "Você chega na casa de um amigo às 21h.",
      options: ["Good night, my friend!", "Good evening, my friend!"],
      correctAnswer: "Good evening, my friend!",
      successTitle: "Correto",
      successMessage:
        "Good evening mostra que você acabou de chegar. Good night parece despedida.",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A19S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A19S9.mp3"),
      audioDurationMs: 3000,
      answerOptions: ["A pessoa chegou", "A pessoa saiu"],
      correctOption: "A pessoa chegou",
      successTitle: "Correto",
      feedbackMessage:
        "Good evening, everyone! indica que a pessoa acabou de chegar.",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A19S8,
      audioText: "Good night, honey.",
      audioDurationMs: 1400,
      answerOptions: ["A pessoa chegou", "A pessoa vai dormir"],
      correctOption: "A pessoa vai dormir",
      successTitle: "Correto",
      feedbackMessage: "Good night indica despedida ou hora de dormir.",
    },
  },
  {
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction: "Imagine que voce esta saindo de uma pizzaria às 23h.",
      helperText: "Como você se despede do garãom?",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Good night!",
      recordLabel: "Speak",
      stopLabel: "Parar",
      playLabel: "Ouvir",
      pauseLabel: "Pausar",
      rerecordLabel: "Regravar",
      submitLabel: "Enviar audio",
      successTitle: "Correto",
      successMessage: 'Resposta esperada: "Good night!"',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip Final",
      content: [
        "Conquista Desbloqueada: Mestre da Noite!",
        "Agora você nunca mais vai passar vergonha chegando nos lugares e dizendo tchau sem querer.",
        "Lembre-se: Evening = Hello / Night = Bye. See you soon!",
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
