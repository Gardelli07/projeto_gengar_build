import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise17",
    activity: {
      label: "Self introduction",
      content: [
        ICA1.A42S1,
        "Agora que você sabe as peças do quebra-cabeça, vamos mont?-las! Uma apresentação curta e eficiente é a chave para começar qualquer conversa.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A42S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A42S2.mp3"),
      audioDurationMs: 2200,
      answerOptions: [
        "Nome e de onde ele é",
        "Saudação, nome e prazer em conhecer",
      ],
      correctOption: "Saudação, nome e prazer em conhecer",
      successTitle: "Correto",
      feedbackMessage:
        "Luca deu uma saudação, disse o nome e terminou com uma cortesia.",
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Dica de Ouro: para uma apresentação de 1 frase, use a fórmula:",
        "Saudação + Nome + Nice to meet you.",
        "Ex: Hello! My name is Julia. Nice to meet you!",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Dica Técnica: não tenha pressa.",
        "Faça uma pequena pausa após o seu nome antes de dizer Nice to meet you.",
        "Isso ajuda a outra pessoa a processar quem você ?.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt:
        "Você acabou de entrar em uma sala e quer se apresentar para todos.",
      words: ["you.", "meet", "Alice.", "to", "Nice", "I'm"],
      correctOrder: ["I'm", "Alice.", "Nice", "to", "meet", "you."],
      successTitle: "Correto",
      successMessage: 'A frase correta é "I\'m Alice. Nice to meet you."',
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Coloque os blocos na ordem que soe mais natural.",
      words: ["Nice to meet you!", "I'm Tom.", "Hello!"],
      correctOrder: ["Hello!", "I'm Tom.", "Nice to meet you!"],
      successTitle: "Correto",
      successMessage:
        'A ordem correta é "Hello! I\'m Tom. Nice to meet you!"',
    },
  },
  {
    component: "Exercise4",
    activity: {
      prompt: "Frase errada vs. correta",
      image: ICA1.A42S7,
      wrongSentence:
        'Alguém diz: "Hi! I\'m Sam. Nice to meet you!". Como você responde de volta na mesma frase?',
      options: [
        "Hi Sam! My name is Peter. Nice to meet you.",
        "Hi Sam! I'm Peter. Nice to meet you too!",
      ],
      correctAnswer: "Hi Sam! I'm Peter. Nice to meet you too!",
      successTitle: "Correto",
      successMessage:
        'O "too" é essencial para retribuir a gentileza: "Hi Sam! I\'m Peter. Nice to meet you too!"',
    },
  },
  {
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction:
        "O Camaleão está esperando por você no aeroporto! Diga sua frase de apresentação completa: Saudação + Seu Nome + Prazer em conhecer.",
      helperText: "Faça sua apresentação em uma sequência natural.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "Hello! My name is [Nome]. Nice to meet you!",
      recordLabel: "Speak",
      stopLabel: "Parar",
      playLabel: "Ouvir",
      pauseLabel: "Pausar",
      rerecordLabel: "Regravar",
      submitLabel: "Enviar áudio",
      successTitle: "Correto",
      successMessage:
        'Resposta esperada: "Hello! My name is [Nome]. Nice to meet you!"',
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
