import createA2LessonScreen from "./A2LessonScreen";
import { ICA2 } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic16s2",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 2 • AULA 16",
      content: [
        "/blue{I didn’t study}",
        "/blue{O Segredo do DIDN'T}",
        "No passado negativo, usamos didn't. Quando ele aparece, o verbo volta ao normal.",
        "I went → I didn't go",
        "She saw → She didn't see",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic16s1",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha.",
      image: ICA2.A16S1,
      audioSource: require("../../../../../mp3/IC/A2/A16S1.mp3"),
      options: ["She didn't see me.", "She didn't saw me."],
      correctAnswer: "She didn't see me.",
      correctOption: "She didn't see me.",
      feedbackMessage: "Com didn't, o verbo volta ao presente: see.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic16s3",
    component: "Exercise1",
    activity: {
      prompt: "Conecte a afirmativa à negativa.",
      pairs: [
        { en: "Had", pt: "Didn't have" },
        { en: "Saw", pt: "Didn't see" },
        { en: "Went", pt: "Didn't go" },
        { en: "Ate", pt: "Didn't eat" },
        { en: "Drank", pt: "Didn't drink" },
      ],
      successTitle: "Correto",
      successMessage:
        "Didn't puxa o passado e o verbo principal volta ao presente.",
    },
  },
  {
    key: "a2ic16s4",
    component: "Exercise2",
    activity: {
      prompt: "Complete com as opções corretas.",
      paragraphs: [
        [
          "I was tired, so I ",
          {
            id: "b1",
            answer: "didn't go",
            options: ["didn't go", "didn't went"],
          },
          " to the party. I ",
          {
            id: "b2",
            answer: "didn't have",
            options: ["didn't have", "didn't had"],
          },
          " any fun.",
        ],
      ],
      successTitle: "Correto",
      successMessage: "Depois de didn't, usamos go e have.",
    },
  },
  {
    key: "a2ic16s5",
    component: "Exercise8",
    activity: {
      prompt: "Escolha a frase correta para a imagem.",
      image: ICA2.A16S5,
      options: ["I didn't see my keys.", "I didn't saw my keys."],
      correctAnswer: "I didn't see my keys.",
      successTitle: "Correto",
      successMessage: "Com didn't, use see, não saw.",
    },
  },
  {
    key: "a2ic16s6",
    component: "Exercise6",
    activity: {
      prompt: "Monte a frase negativa corretamente.",
      words: ["didn't", "She", "have", "time", "lunch", "for", "."],
      correctOrder: ["She", "didn't", "have", "time", "for", "lunch", "."],
      successTitle: "Correto",
      successMessage: "She didn't have time for lunch.",
    },
  },
  {
    key: "a2ic16s7",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Ouça e responda: verdadeiro ou falso?",
      image: ICA2.A16S7,
      audioSource: require("../../../../../mp3/IC/A2/A16S7.mp3"),
      statement: "The person bought new shoes.",
      textOnScreen: "The person bought new shoes.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      successMessage: "False. A pessoa não comprou nada.",
      feedbackMessage: "O áudio diz: I didn't buy anything.",
    },
  },
  {
    key: "a2ic16s8",
    component: "Exercise17",
    activity: {
      label: "Desafio",
      content: [
        "/blue{Desafio de Negativas!}",
        "Transforme a frase no passado afirmativo em negativa completa.",
        "Use didn't e o verbo no presente.",
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "a2ic16s9",
    component: "Exercise11",
    activity: {
      prompt: "Transforme em negativa:",
      title: "Digite a negativa",
      placeholder: "Digite aqui",
      secondsPerWord: 5,
      words: [
        "I didn't go",
        "I didn't see",
        "I didn't have",
        "I didn't eat",
        "I didn't take",
      ],
      successTitle: "Correto",
      successMessage: "Você usou didn't com o verbo no presente.",
    },
  },
  {
    key: "a2ic16s10",
    component: "Exercise17",
    activity: {
      label: "Final",
      content: [
        "/blue{Você dominou as Negativas!}",
        "Se didn't entrar em campo, o verbo volta para o presente. Essa é a regra de ouro.",
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
