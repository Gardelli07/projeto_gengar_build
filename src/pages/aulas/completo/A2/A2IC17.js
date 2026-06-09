import createA2LessonScreen from "./A2LessonScreen";
import { ICA2 } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic17s1",
    component: "Exercise19",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escreva.",
      audioSource: require("../../../../../mp3/IC/A2/A17S1.mp3"),
      correctAnswer: "We didn't go to the beach.",
      placeholder: "Digite a frase aqui",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "Você escreveu a frase negativa corretamente.",
      errorMessage: "Ouça novamente: depois de didn't, usamos go.",
    },
  },
  {
    key: "a2ic17s2",
    component: "Exercise8",
    activity: {
      prompt: "Escolha a frase correta para a imagem.",
      image: ICA2.A17S2,
      options: ["I didn't have any money.", "I didn't had any money."],
      correctAnswer: "I didn't have any money.",
      successTitle: "Correto",
      successMessage: "Com didn't, use have, não had.",
    },
  },
  {
    key: "a2ic17s3",
    component: "Exercise6",
    activity: {
      prompt: "Monte a frase negativa corretamente.",
      words: ["see", "didn't", "They", "the", "accident", "."],
      correctOrder: ["They", "didn't", "see", "the", "accident", "."],
      successTitle: "Correto",
      successMessage: "They didn't see the accident.",
    },
  },
  {
    key: "a2ic17s4",
    component: "Exercise2",
    activity: {
      prompt: "Complete o diálogo.",
      paragraphs: [
        [
          'A: "Did you like the party?" ',
          'B: "Actually, I ',
          {
            id: "b1",
            answer: "didn't go",
            options: ["didn't go", "didn't went"],
          },
          ' there."',
        ],
      ],
      successTitle: "Correto",
      successMessage: "Didn't go é a forma correta.",
    },
  },
  {
    key: "a2ic17s5",
    component: "Exercise2",
    activity: {
      prompt: "Complete a continuação.",
      paragraphs: [
        [
          'A: "Really? Why?" ',
          'B: "I ',
          {
            id: "b1",
            answer: "didn't have",
            options: ["didn't had", "didn't have"],
          },
          ' any free time."',
        ],
      ],
      successTitle: "Correto",
      successMessage: "Didn't have é a forma correta.",
    },
  },
  {
    key: "a2ic17s6",
    component: "Exercise1",
    activity: {
      prompt: "Conecte a ação positiva à forma negativa.",
      pairs: [
        { en: "Went", pt: "Didn't go" },
        { en: "Saw", pt: "Didn't see" },
        { en: "Had", pt: "Didn't have" },
        { en: "Ate", pt: "Didn't eat" },
        { en: "Took", pt: "Didn't take" },
      ],
      successTitle: "Correto",
      successMessage: "O verbo principal volta ao presente depois de didn't.",
    },
  },
  {
    key: "a2ic17s7",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 2 • AULA 17",
      content: [
        "/blue{I didn’t go!}",
        "/blue{Parabéns!}",
        "Você dominou as negativas. O didn't puxa o passado para ele e deixa o verbo principal no presente.",
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
