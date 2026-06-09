import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise17",
    activity: {
      label: "This is my ...",
      content: [
        ICA1.A41S1,
        "Você está com um amigo e encontra seu chefe. Como você apresenta um ao outro? Vamos aprender a conectar as pessoas!",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A41S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A41S2.mp3"),
      audioDurationMs: 900,
      answerOptions: ["Teeth is", "This is"],
      correctOption: "This is",
      successTitle: "Correto",
      feedbackMessage: '"This is" é a forma correta para apresentar alguém.',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Dica de Ouro: para apresentar alguém que está ao seu lado, usamos sempre This is...",
        "Evite dizer He is... ou She is... logo de cara na apresentação.",
        "This is é o padrão de etiqueta.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A41S4,
      audioSource: require("../../../../../mp3/IC/A0-A1/A41S4.mp3"),
      audioDurationMs: 2200,
      answerOptions: ["This is my brother", "They are nice"],
      correctOption: "This is my brother",
      successTitle: "Correto",
      feedbackMessage: 'A frase ouvida foi "This is my brother".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A41S5,
      audioSource: require("../../../../../mp3/IC/A0-A1/A41S5.mp3"),
      audioDurationMs: 1200,
      answerOptions: ["Meet my", "this is my"],
      correctOption: "Meet my",
      successTitle: "Correto",
      feedbackMessage: '"Meet my" é a expressão ouvida no áudio.',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Dica Técnica: se você quer ser um pouco mais dinâmico, pode usar Meet my...",
        "Ex: Meet my friend, Julia.",
        "é uma forma calorosa de iniciar a conexão.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A41S5,
      audioSource: require("../../../../../mp3/IC/A0-A1/A41S7.mp3"),
      audioDurationMs: 2200,
      answerOptions: ["Meet my brother", "this is my brother"],
      correctOption: "Meet my brother",
      successTitle: "Correto",
      feedbackMessage: 'A frase ouvida foi "Meet my brother".',
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Você quer apresentar sua amiga, Maria, para o seu grupo.",
      words: ["Maria.", "friend,", "my", "This", "is"],
      correctOrder: ["This", "is", "my", "friend,", "Maria."],
      successTitle: "Correto",
      successMessage: 'A frase correta é "This is my friend, Maria."',
    },
  },
  {
    component: "Exercise1",
    activity: {
      prompt: "Conectar quem é quem",
      pairs: [
        { en: "Meet my boss, Mr. Smith.", pt: "Boss" },
        { en: "This is my friend, Bob.", pt: "Friend" },
        { en: "Meet my sister, Kelly.", pt: "Sister" },
      ],
      successTitle: "Excelente",
      successMessage:
        "Meet my boss = Boss, This is my friend = Friend, Meet my sister = Sister.",
    },
  },
  {
    component: "Exercise7",
    activity: {
      prompt:
        "Ordene a conversa entre três pessoas (Tom, Ana e o novo amigo Ben).",
      options: [
        'Ana: "Hi, Ben! Nice to meet you."',
        'Tom: "Ana, this is my friend, Ben."',
        'Ben: "Nice to meet you too, Ana."',
      ],
      correctOrder: [
        'Tom: "Ana, this is my friend, Ben."',
        'Ana: "Hi, Ben! Nice to meet you."',
        'Ben: "Nice to meet you too, Ana."',
      ],
      successTitle: "Correto",
      successMessage: "A ordem correta é 2, 1, 3.",
    },
  },
  {
    component: "Exercise4",
    activity: {
      prompt: "Frase errada vs. correta",
      image: ICA1.A41S11,
      wrongSentence: "Apresentando sua mãe para alguém.",
      options: ["She is my mother, Helena.", "This is my mother, Helena."],
      correctAnswer: "This is my mother, Helena.",
      successTitle: "Correto",
      successMessage:
        'Em apresentações, a forma natural ? "This is my mother, Helena."',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A41S12,
      audioSource: require("../../../../../mp3/IC/A0-A1/A41S12.mp3"),
      audioDurationMs: 7500,
      answerOptions: ["O chefe da Sarah", "O irmão do Leo"],
      correctOption: "O irmão do Leo",
      successTitle: "Correto",
      feedbackMessage: "Mark é o irmão do Leo na conversa.",
    },
  },
  {
    component: "Exercise11",
    activity: {
      prompt: "Rápido! Como se diz 'Esta é minha irmã'?",
      title: "Digite rápido",
      placeholder: "Digite aqui",
      secondsPerWord: 8,
      words: ["This is my sister"],
      successTitle: "Correto",
      successMessage:
        'A resposta esperada ? "This is my sister" ou "Meet my sister".',
    },
  },
  {
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction:
        "O Camaleão está com um novo amigo chamado Zeca. Ele diz: Hey! This is my friend, Zeca.",
      helperText: "Seja gentil e cumprimente o Zeca.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "Hi, Zeca! Nice to meet you! / Hello, Zeca! Nice to meet you too!",
      recordLabel: "Speak",
      stopLabel: "Parar",
      playLabel: "Ouvir",
      pauseLabel: "Pausar",
      rerecordLabel: "Regravar",
      submitLabel: "Enviar áudio",
      successTitle: "Correto",
      successMessage:
        'Resposta esperada: "Hi, Zeca! Nice to meet you!" ou "Hello, Zeca! Nice to meet you too!"',
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
