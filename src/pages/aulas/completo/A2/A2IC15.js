import createA2LessonScreen from "./A2LessonScreen";
import { ICA2 } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic15s1",
    component: "Exercise4",
    activity: {
      prompt: "Escolha a frase gramaticalmente correta.",
      image: ICA2.A15S1,
      wrongSentence: "Regular and irregular",
      options: [
        "I watched a movie and ate some popcorn.",
        "I watched a movie and eated some popcorn.",
        "I watch a movie and ate some popcorn.",
      ],
      correctAnswer: "I watched a movie and ate some popcorn.",
      successTitle: "Correto",
      successMessage: "Watched é regular; ate é irregular.",
    },
  },
  {
    key: "a2ic15s2",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha.",
      image: ICA2.A15S2,
      audioSource: require("../../../../../mp3/IC/A2/A15S2.mp3"),
      options: ["I went to work.", "I goed to work."],
      correctAnswer: "I went to work.",
      correctOption: "I went to work.",
      feedbackMessage: "Go vira went no passado.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic15s3",
    component: "Exercise1",
    activity: {
      prompt: "Conecte o presente ao passado.",
      pairs: [
        { en: "Study", pt: "Studied" },
        { en: "Buy", pt: "Bought" },
        { en: "Cook", pt: "Cooked" },
        { en: "Give", pt: "Gave" },
        { en: "Listen", pt: "Listened" },
      ],
      successTitle: "Correto",
      successMessage: "Você misturou regulares e irregulares corretamente.",
    },
  },
  {
    key: "a2ic15s4",
    component: "Exercise2",
    activity: {
      prompt: "Complete a frase.",
      paragraphs: [
        [
          "Last night, I ",
          { id: "b1", answer: "watched", options: ["watched", "watch"] },
          " a movie and I ",
          { id: "b2", answer: "ate", options: ["ate", "eat"] },
          " popcorn.",
        ],
      ],
      successTitle: "Correto",
      successMessage: "Watched e ate indicam ações no passado.",
    },
  },
  {
    key: "a2ic15s5",
    component: "Exercise8",
    activity: {
      prompt: "Escolha a frase que descreve a imagem.",
      image: ICA2.A15S5,
      options: [
        "She cleaned the house yesterday.",
        "She clean the house yesterday.",
      ],
      correctAnswer: "She cleaned the house yesterday.",
      successTitle: "Correto",
      successMessage: "Clean é regular: cleaned.",
    },
  },
  {
    key: "a2ic15s6",
    component: "Exercise6",
    activity: {
      prompt: "Coloque as palavras na ordem correta.",
      words: ["last", "They", "night", "pizza", "ordered", "."],
      correctOrder: ["They", "ordered", "pizza", "last", "night", "."],
      successTitle: "Correto",
      successMessage: "They ordered pizza last night.",
    },
  },
  {
    key: "a2ic15s7",
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt: 'Ordene as letras. Dica: passado de "DRINK".',
      audioSource: require("../../../../../mp3/IC/A2/A15S7.mp3"),
      letters: ["D", "R", "A", "N", "K"],
      correctWord: "DRANK",
      successTitle: "Correto",
      successMessage: "Drink vira drank.",
    },
  },
  {
    key: "a2ic15s8",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Ouça e responda: verdadeiro ou falso?",
      image: ICA2.A15S8,
      audioSource: require("../../../../../mp3/IC/A2/A15S8.mp3"),
      statement: "The person studied last Sunday.",
      textOnScreen: "The person studied last Sunday.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      successMessage: "False. A pessoa jogou videogame e não estudou.",
      feedbackMessage: "O áudio diz: I didn't study.",
    },
  },
  {
    key: "a2ic15s9",
    component: "Exercise2",
    activity: {
      prompt: "Complete o texto.",
      paragraphs: [
        [
          "Last year, we ",
          { id: "b1", answer: "went", options: ["went", "goed"] },
          " to Florida. We ",
          { id: "b2", answer: "stayed", options: ["stayed", "staied"] },
          " in a beautiful hotel.",
        ],
      ],
      successTitle: "Correto",
      successMessage: "Went é irregular; stayed é regular.",
    },
  },
  {
    key: "a2ic15s10",
    component: "Exercise7",
    activity: {
      prompt: "Coloque as frases na ordem correta.",
      options: [
        "After that, I had breakfast.",
        "Yesterday, I woke up at 7 AM.",
        "Then, I went to work by bus.",
      ],
      correctOrder: [
        "Yesterday, I woke up at 7 AM.",
        "After that, I had breakfast.",
        "Then, I went to work by bus.",
      ],
      successTitle: "Correto",
      successMessage: "A história ficou em ordem lógica.",
    },
  },
  {
    key: "a2ic15s11",
    component: "Exercise12",
    activity: {
      prompt: "Freer Practice",
      instruction: "Write three things you did last Saturday.",
      helperText:
        "Exemplo: I played soccer, I saw my friends and I cooked dinner.",
      placeholder: "Digite sua resposta aqui",
      tipText: "Misture verbos regulares e irregulares.",
      successTitle: "Muito bem!",
      successMessage: "Você escreveu ações no passado.",
    },
  },
  {
    key: "a2ic15s12",
    component: "Exercise17",
    activity: {
      label: "Desafio",
      content: [
        "/blue{Desafio de Velocidade!}",
        "Agora vamos misturar tudo. Digite o passado dos verbos o mais rápido que puder.",
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "a2ic15s13",
    component: "Exercise11",
    activity: {
      prompt: "Digite o passado dos verbos:",
      title: "Escreva rápido",
      placeholder: "Digite aqui",
      secondsPerWord: 5,
      words: ["Watched", "Ate", "Studied", "Drank", "Cleaned"],
      successTitle: "Correto",
      successMessage: "Você misturou regulares e irregulares.",
    },
  },
  {
    key: "a2ic15s14",
    component: "Exercise17",
    activity: {
      label: "Final",
      content: [
        "/blue{Você é nota 10!}",
        "Misturar verbos regulares e irregulares é o segredo para contar qualquer história em inglês.",
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
