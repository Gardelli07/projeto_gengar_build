import createA2LessonScreen from "./A2LessonScreen";
import { ICA2, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic41s1",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 5 • AULA 41",
      content: [
        "/blue{It's the most...}",
        "/blue{O Número 1 do Mundo!}",
        'No superlativo, destacamos quem é o "top" de um grupo de três ou mais.',
        "Para adjetivos longos, usamos THE MOST.",
        "Regra de ouro: nunca esqueça o THE.",
        "Fórmula: THE MOST + adjetivo.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic41s2",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha.",
      image: ICA2.A41S1,
      audioSource: require("../../../../../mp3/IC/A2/A41S2.mp3"),
      options: ["The most beautiful", "The more beautiful"],
      correctAnswer: "The most beautiful",
      correctOption: "The most beautiful",
      feedbackMessage: "Beautiful vira the most beautiful.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic41s3",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha.",
      image: ICA2.A41S3,
      audioSource: require("../../../../../mp3/IC/A2/A41S3.mp3"),
      options: ["The most dangerous", "The more dangerous"],
      correctAnswer: "The most dangerous",
      correctOption: "The most dangerous",
      feedbackMessage: "Dangerous vira the most dangerous.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic41s4",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha.",
      image: ICA2.A41S4,
      audioSource: require("../../../../../mp3/IC/A2/A41S4.mp3"),
      options: ["The most comfortable", "The more comfortable"],
      correctAnswer: "The most comfortable",
      correctOption: "The most comfortable",
      feedbackMessage: "Comfortable vira the most comfortable.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic41s5",
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt: 'Escreva o adjetivo para "perigoso".',
      audioSource: require("../../../../../mp3/IC/A2/A41S5.mp3"),
      letters: ["D", "A", "N", "G", "E", "R", "O", "U", "S"],
      correctWord: "DANGEROUS",
      successTitle: "Correto",
      successMessage: "Dangerous.",
    },
  },
  {
    key: "a2ic41s6",
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt: 'Escreva o adjetivo para "importante".',
      audioSource: require("../../../../../mp3/IC/A2/A41S6.mp3"),
      letters: ["I", "M", "P", "O", "R", "T", "A", "N", "T"],
      successTitle: "Correto",
      successMessage: "Important.",
    },
  },
  {
    key: "a2ic41s7",
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt: 'Escreva o adjetivo para "difícil".',
      audioSource: require("../../../../../mp3/IC/A2/A41S7.mp3"),
      letters: ["D", "I", "F", "F", "I", "C", "U", "L", "T"],
      correctWord: "DIFFICULT",
      successTitle: "Correto",
      successMessage: "Difficult.",
    },
  },
  {
    key: "a2ic41s8",
    component: "Exercise6",
    activity: {
      prompt: 'Organize: "Este é o livro mais interessante."',
      words: ["This", "is", "the most", "interesting", "book", "."],
      correctOrder: ["This", "is", "the most", "interesting", "book", "."],
      successTitle: "Correto",
      successMessage: "This is the most interesting book.",
    },
  },
  {
    key: "a2ic41s9",
    component: "Exercise6",
    activity: {
      prompt: 'Organize: "Ela é a cantora mais popular."',
      words: ["She", "is", "the most", "popular", "singer", "."],
      correctOrder: ["She", "is", "the most", "popular", "singer", "."],
      successTitle: "Correto",
      successMessage: "She is the most popular singer.",
    },
  },
  {
    key: "a2ic41s10",
    component: "Exercise6",
    activity: {
      prompt: 'Organize: "O leão é o animal mais perigoso."',
      words: ["The lion", "is", "the most", "dangerous", "animal", "."],
      correctOrder: ["The lion", "is", "the most", "dangerous", "animal", "."],
      successTitle: "Correto",
      successMessage: "The lion is the most dangerous animal.",
    },
  },
  {
    key: "a2ic41s11",
    component: "Exercise5",
    activity: {
      prompt: 'Use o superlativo de "expensive".',
      image: ICA2.A41S11,
      sentenceStart: "This diamond is",
      sentenceEnd: "expensive ring in the shop.",
      options: ["the more", "the most"],
      correctAnswer: "the most",
      successTitle: "Correto",
      successMessage: "Use the most com adjetivos longos.",
    },
  },
  {
    key: "a2ic41s12",
    component: "Exercise11",
    activity: {
      words: [
        "the most modern",
        "the most exciting",
        "the most powerful",
        "the most generous",
        "the most difficult",
      ],
      secondsPerWord: 5,
    },
  },
  {
    key: "a2ic41s13",
    component: "Exercise19",
    activity: {
      prompt: "Escute e digite a frase completa.",
      audioSource: require("../../../../../mp3/IC/A2/A41S13.mp3"),
      correctAnswer: "Health is the most important thing.",
      successTitle: "Correto",
      successMessage: "Health is the most important thing.",
    },
  },
  {
    key: "a2ic41s14",
    component: "Exercise19",
    activity: {
      prompt: "Escute e digite.",
      audioSource: require("../../../../../mp3/IC/A2/A41S14.mp3"),
      correctAnswer: "This is the most comfortable sofa.",
      successTitle: "Correto",
      successMessage: "This is the most comfortable sofa.",
    },
  },
  {
    key: "a2ic41s15",
    component: "Exercise16",
    activity: {
      prompt: "Gravação de áudio",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      instruction:
        'Grave: "English is the most interesting language to learn!"',
      helperText: "English is the most interesting language to learn!",
      successTitle: "Muito bem!",
      successMessage: "Seu áudio foi gravado.",
    },
  },
  {
    key: "a2ic41s16",
    component: "Exercise17",
    activity: {
      label: "Final",
      content: [
        '/blue{Mestre do "The Most"!}',
        "Você completou a maratona de adjetivos longos. Agora já sabe destacar o que há de melhor usando palavras grandes.",
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
