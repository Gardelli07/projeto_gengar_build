import createA2LessonScreen from "./A2LessonScreen";
import { ICA2 } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic59s1",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 8 • AULA 59",
      image: ICA2.A59S1,
      content: [
        "/blue{Blister pack}",
        "/blue{Pill, Cream or Spray?}",
        "Os remédios vêm em vários formatos. Conhecer esses nomes evita confusão na hora de usar.",
        "Pill ou tablet: comprimido. Capsule: cápsula. Blister pack: cartela. Ointment ou cream: pomada ou creme. Drops: gotas. Spray: spray.",
        "Dizemos take a pill, mas apply the ointment.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic59s2",
    component: "Exercise14",
    activity: {
      prompt: "Ouça a dose.",
      image: ICA2.A59S2,
      audioSource: require("../../../../../mp3/IC/A2/A59S2.mp3"),
      options: ["Take one tablet.", "Take two tablets."],
      correctAnswer: "Take one tablet.",
      successMessage: "Tablet e pill são usados para comprimidos.",
    },
  },
  {
    key: "a2ic59s3",
    component: "Exercise14",
    activity: {
      prompt: "Ouça sobre a cartela.",
      image: ICA2.A59S3,
      audioSource: require("../../../../../mp3/IC/A2/A59S3.mp3"),
      options: [
        "There are ten pills in this blister pack.",
        "There are ten chargers in this blister pack.",
      ],
      correctAnswer: "There are ten pills in this blister pack.",
      successMessage: "Blister pack é a cartela de comprimidos.",
    },
  },
  {
    key: "a2ic59s4",
    component: "Exercise14",
    activity: {
      prompt: "Ouça como usar a pomada.",
      image: ICA2.A59S4,
      audioSource: require("../../../../../mp3/IC/A2/A59S4.mp3"),
      options: [
        "Apply the ointment to your skin.",
        "Drink the ointment with water.",
      ],
      correctAnswer: "Apply the ointment to your skin.",
      successMessage: "Ointment se aplica na pele.",
    },
  },
  {
    key: "a2ic59s5",
    component: "Exercise14",
    activity: {
      prompt: "Ouça sobre gotas.",
      image: ICA2.A59S5,
      audioSource: require("../../../../../mp3/IC/A2/A59S5.mp3"),
      options: ["Use three drops in each eye.", "Use three pills in each eye."],
      correctAnswer: "Use three drops in each eye.",
      successMessage: "Drops são gotas.",
    },
  },
  {
    key: "a2ic59s6",
    component: "Exercise8",
    activity: {
      prompt: "Qual destes NÃO é uma forma de medicamento?",
      image: ICA2.A59S6,
      options: ["Capsule", "Spray", "Charger", "Ointment"],
      correctAnswer: "Charger",
      successMessage: "Charger é para o laptop.",
    },
  },
  {
    key: "a2ic59s7",
    component: "Exercise1",
    activity: {
      prompt: "Associe o remédio à forma como ele é usado:",
      pairs: [
        { en: "Pills", pt: "Swallow with water" },
        { en: "Cream", pt: "Rub on the skin" },
        { en: "Spray", pt: "Use in the throat" },
      ],
      successMessage: "Formas de uso associadas.",
    },
  },
  {
    key: "a2ic59s8",
    component: "Exercise6",
    activity: {
      prompt: "Eu preciso de uma cartela de aspirina.",
      words: ["I", "need", "a", "blister pack", "of aspirin", "."],
      correctOrder: ["I", "need", "a", "blister pack", "of aspirin", "."],
      correctAnswer: "I need a blister pack of aspirin.",
      successMessage: "Blister pack usado corretamente.",
    },
  },
  {
    key: "a2ic59s9",
    component: "Exercise3",
    activity: {
      prompt: "Responda verdadeiro ou falso.",
      image: ICA2.A59S9,
      audioSource: require("../../../../../mp3/IC/A2/A59S9.mp3"),
      textOnScreen: "You drink an ointment to cure a headache.",
      options: ["true", "false"],
      correctAnswer: "false",
      successMessage: "Você aplica ointment na pele; não bebe.",
      feedbackMessage: "Use apply the ointment.",
    },
  },
  {
    key: "a2ic59s10",
    component: "Exercise13",
    activity: {
      prompt: "Remédio que você pinga nos olhos:",
      audioSource: require("../../../../../mp3/IC/A2/A59S10.mp3"),
      letters: ["D", "R", "O", "P", "S"],
      correctWord: "DROPS",
      successMessage: "Drops são gotas.",
    },
  },
  {
    key: "a2ic59s11",
    component: "Exercise17",
    activity: {
      label: "The Medicine Cabinet",
      content: [
        "David is checking his medicine cabinet. He has a blister pack of painkillers for his headache.",
        "He also has an ointment for his back pain. For his cold, he has a nasal spray and some Vitamin C capsules.",
        "He sees a bottle of eye drops, but it is old. David is ready for any tech problem or health problem!",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic59s12",
    component: "Exercise12",
    activity: {
      prompt: "Descreva o que tem na sua bolsa de remédios.",
      instruction: "Escreva 3 frases usando pill, ointment ou spray.",
      correctAnswer:
        "I have a blister pack of pills in my bag. I have an ointment for my back. I have a nasal spray.",
      successMessage: "Bolsa de remédios descrita!",
    },
  },
  {
    key: "a2ic59s13",
    component: "Exercise17",
    activity: {
      label: "Final",
      content: [
        "/blue{Formatos Dominados!}",
        "Agora você sabe a diferença entre cápsula, comprimido, cartela, pomada e gotas.",
        "Blister pack = cartela. Tablet/Pill = comprimido. Ointment = pomada.",
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
