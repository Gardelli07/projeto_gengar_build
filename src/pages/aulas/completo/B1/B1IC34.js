import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "do-make-intro",
    component: "Exercise17",
    activity: {
      label: 'O Pesadelo do "Make" vs "Do"',
      content: [
        `Esqueça a tradução "fazer". A regra nativa é:

- DO: usado para tarefas, trabalhos, obrigações ou ações genâricas.
Exemplos: do a favor, do business, do your best.

- MAKE: usado para criar, produzir, construir ou causar algo.
Exemplos: make money, make a decision, make a mistake.`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "do-make-image-match",
    component: "Exercise15",
    activity: {
      prompt: "Clique na imagem e na palavra que a descreve.",
      images: [
        { id: "do-img", image: ICB1.A34S2 },
        { id: "make-img", image: ICB1.A34S2p2 },
      ],
      words: [
        { id: "do-word", label: "Do" },
        { id: "make-word", label: "Make" },
      ],
      pairs: [
        { imageId: "do-img", wordId: "do-word" },
        { imageId: "make-img", wordId: "make-word" },
      ],
      successTitle: "Correto",
      successMessage: "Do combina com tarefas; make combina com criação.",
    },
  },
  {
    key: "do-business-correct",
    component: "Exercise4",
    activity: {
      prompt: "Qual é a collocation correta em inglês?",
      image: ICB1.A34S3,
      wrongSentence: "Make vs. Do",
      options: [
        "We need to make business with them.",
        "We need to do business with them.",
        "We need to do a decision.",
      ],
      correctAnswer: "We need to do business with them.",
      successTitle: "Correto",
      successMessage: 'A collocation natural é "do business".',
    },
  },
  {
    key: "made-mistake",
    component: "Exercise5",
    activity: {
      prompt: "Complete a frase.",
      sentenceStart: "I studied hard, but I",
      sentenceEnd: "a big mistake on the test.",
      options: ["made", "did"],
      correctAnswer: "made",
      successTitle: "Correto",
      successMessage: 'Dizemos "make a mistake", no passado, "made a mistake".',
    },
  },
  {
    key: "collocation-match",
    component: "Exercise1",
    activity: {
      prompt: "Conecte o verbo à palavra que combina com ele.",
      pairs: [
        { en: "DO", pt: "your best" },
        { en: "MAKE + effort", pt: "an effort" },
        { en: "MAKE + excuse", pt: "an excuse" },
      ],
      successTitle: "Correto",
      successMessage: "Essas combinações são collocations comuns.",
    },
  },
  {
    key: "make-money-do-best",
    component: "Exercise2",
    activity: {
      prompt: "Complete o texto com as alternativas.",
      paragraphs: [
        [
          "If you want to ",
          { id: "blank-1", options: ["do", "make"], answer: "make" },
          " money in this company, you have to ",
          { id: "blank-2", options: ["do", "make"], answer: "do" },
          " your best every single day.",
        ],
      ],
      successTitle: "Correto",
      successMessage: 'Use "make money" e "do your best".',
    },
  },
  {
    key: "make-decision-order",
    component: "Exercise6",
    activity: {
      prompt: "Clique nas palavras para escrever a frase na ordem correta.",
      words: ["an", "to", "need", "We", "make", "important", "decision"],
      correctOrder: ["We", "need", "to", "make", "an", "important", "decision"],
      successTitle: "Correto",
      successMessage: "We need to make an important decision.",
    },
  },
  {
    key: "do-me-a-favor-listen",
    component: "Exercise19",
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e escreva o que escutou.",
      audioSource: require("../../../../../mp3/IC/B1/A34S8.mp3"),
      audioDurationMs: 2200,
      correctAnswer: "Could you do me a favor?",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: 'A collocation é "do me a favor".',
      errorMessage: 'Confira a frase: "Could you do me a favor?"',
    },
  },
  {
    key: "make-mistake-do-best-writing",
    component: "Exercise12",
    activity: {
      prompt: "Writing",
      instruction:
        "Escreva 2 frases. Na primeira, confesse um erro que você cometeu (make a mistake). Na segunda, prometa dar o seu melhor (do your best) para consertar.",
      placeholder: "I made a mistake when...\nI will do my best to fix it.",
      helperText: 'Use "made a mistake" e "do my best".',
      submitLabel: "Enviar",
      successTitle: "Correto",
      successMessage: "Ótimo uso de make e do em contexto.",
    },
  },
  {
    key: "lesson-finish",
    type: "finish",
  },
];

export default createLessonScreen(LESSON_SLIDES, {
  storageKey: "@progesso_ingles_completo_B1",
  nextRouteName: "InglescompletoB1",
  screenName: "InglesCompletoB1LessonScreen",
});
