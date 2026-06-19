import createLessonScreen from "../../LessonScreen";
import { BussinesImages, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "phrasal-verbs-corporate-intro",
    component: "Exercise17",
    activity: {
      label: "Phrasal Verbs no Mundo Corporativo",
      content: [
        `No trabalho, nativos amam usar Phrasal Verbs. Eles soam naturais e dinâmicos. Hoje vamos focar em 3 gigantes dos negócios:

1. Carry out: realizar, executar um plano, projeto ou pesquisa.
2. Back down: ceder, recuar em uma discussão ou negociação.
3. Bring up: mencionar um assunto em uma reunião.`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "typing-test-intro",
    component: "Exercise17",
    activity: {
      label: "Preparado para o desafio?",
      content: [
        "A seguir, uma palavra do mundo dos negócios aparecerá na tela. Você terá exatamente 5 segundos para digitá-la corretamente. Prepare os dedos!",
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "business-typing-test",
    component: "Exercise11",
    activity: {
      prompt: "Digite a palavra. Você tem 5 segundos.",
      words: ["MEETING", "CARRY OUT", "BACK DOWN", "BRING UP"],
      secondsPerWord: 5,
    },
  },
  {
    key: "match-phrasal-verbs",
    component: "Exercise1",
    activity: {
      prompt:
        "Conecte o Phrasal Verb em inglês com seu significado no mundo dos negócios.",
      pairs: [
        { en: "Carry out", pt: "Executar um projeto" },
        { en: "Back down", pt: "Recuar em uma negociação" },
        { en: "Bring up", pt: "Levantar um tÉpico na reunião" },
      ],
      successTitle: "Correto",
      successMessage: "Esses três phrasal verbs são muito comuns no trabalho.",
    },
  },
  {
    key: "back-down-complete",
    component: "Exercise5",
    activity: {
      prompt: "Complete a frase com a opção correta.",
      sentenceStart: "The client didn't accept the price, so we had to",
      sentenceEnd: ".",
      options: ["back down", "bring up"],
      correctAnswer: "back down",
      successTitle: "Correto",
      successMessage: "Back down significa ceder ou recuar em uma negociação.",
    },
  },
  {
    key: "carry-out-order",
    component: "Exercise6",
    activity: {
      prompt: "Clique nas palavras para escrever a frase na ordem correta.",
      words: ["project", "out", "We", "to", "carry", "the", "need"],
      correctOrder: ["We", "need", "to", "carry", "out", "the", "project"],
      successTitle: "Correto",
      successMessage: "We need to carry out the project.",
    },
  },
  {
    key: "meeting-phrasal-verbs",
    component: "Exercise2",
    activity: {
      prompt: "Complete o texto com as alternativas.",
      paragraphs: [
        [
          "During the meeting, Sarah decided to ",
          {
            id: "blank-1",
            options: ["bring up", "carry out"],
            answer: "bring up",
          },
          " the budget issue. The manager disagreed at first, but finally decided to ",
          {
            id: "blank-2",
            options: ["back down", "bring up"],
            answer: "back down",
          },
          ".",
        ],
      ],
      successTitle: "Correto",
      successMessage:
        "Bring up menciona o assunto; back down mostra que alguém cedeu.",
    },
  },
  {
    key: "carry-out-writing",
    component: "Exercise12",
    activity: {
      prompt: "Writing",
      instruction:
        'Escreva sobre um projeto que você ajudou a "carry out" no seu trabalho ou estudos recentemente. O que você teve que fazer?',
      placeholder: "I helped carry out...",
      helperText:
        'Use "carry out" para falar de executar um plano, pesquisa ou projeto.',
      submitLabel: "Enviar",
      successTitle: "Correto",
      successMessage: "Boa prática com phrasal verbs corporativos.",
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
