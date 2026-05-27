import createA2LessonScreen from "./A2LessonScreen";
import { ICA2, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic10intro",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 1 • AULA 10",
      content: [
        "/blue{Do or doing?}",
        "Você já sabe falar sobre o que faz todo dia e sobre o que está fazendo agora. Hoje vamos contrastar Present Simple e Present Continuous.",
        "O segredo está no tempo.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic10s1",
    component: "Exercise4",
    activity: {
      prompt: "Uma pessoa sempre bebe café, mas agora está bebendo chá.",
      image: ICA2.A10S1,
      wrongSentence: "I am drinking coffee every morning.",
      options: [
        "I drink coffee every morning.",
        "I drinking coffee every morning.",
        "I drinks coffee every morning.",
      ],
      correctAnswer: "I drink coffee every morning.",
      successTitle: "Correto",
      successMessage: "Every morning indica rotina: Present Simple.",
    },
  },
  {
    key: "a2ic10s2",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e identifique a palavra de rotina",
      image: ICA2.A10S2,
      audioSource: require("../../../../../mp3/IC/A2/A10S2.mp3"),
      options: ["Usually (Routine)", "Always (Right now)"],
      correctAnswer: "Usually (Routine)",
      correctOption: "Usually (Routine)",
      feedbackMessage:
        "Usually é uma palavra de rotina, ligada ao Present Simple.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic10s3",
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "/blue{A Batalha dos Tempos}",
        "Present Simple: fatos e rotinas. I play.",
        "Present Continuous: ações agora ou temporárias. I am playing.",
        "Procure sentinelas como always, usually, now e today.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic10s4",
    component: "Exercise1",
    activity: {
      prompt: "Conecte os sentinelas com a gramática:",
      pairs: [
        { en: "Every day / Usually", pt: "Present Simple (I do)" },
        { en: "Now / At the moment", pt: "Present Continuous (I'm doing)" },
        { en: "Today / This week", pt: "Present Continuous (temporário)" },
      ],
      successTitle: "Correto",
      successMessage: "As palavras de tempo ajudam a escolher o tempo verbal.",
    },
  },
  {
    key: "a2ic10s5",
    component: "Exercise5",
    activity: {
      prompt: "Complete a rotina:",
      image: ICA2.A10S5,
      sentenceStart: "He",
      sentenceEnd: "to the gym every Monday.",
      options: ["go", "goes"],
      correctAnswer: "goes",
      successTitle: "Correto",
      successMessage: "Com he no Present Simple, usamos goes.",
    },
  },
  {
    key: "a2ic10s6",
    component: "Exercise5",
    activity: {
      prompt: "Complete a ação agora:",
      image: ICA2.A10S6,
      sentenceStart: "Look! She",
      sentenceEnd: "to the gym right now.",
      options: ["is going", "are going"],
      correctAnswer: "is going",
      successTitle: "Correto",
      successMessage: "Right now pede Present Continuous: is going.",
    },
  },
  {
    key: "a2ic10s7",
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "/blue{O S da discórdia}",
        "No Present Simple, lembre-se do S para he, she, it.",
        "He eats (sempre) vs. He is eating (agora).",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic10s8",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Escute e responda: verdadeiro ou falso?",
      image: ICA2.A10S8,
      audioSource: require("../../../../../mp3/IC/A2/A10S8.mp3"),
      statement: "The person usually eats meat.",
      textOnScreen: "The person usually eats meat.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      successMessage:
        "False. A pessoa diz que é vegetariana e normalmente não come carne.",
      feedbackMessage: 'O áudio diz: "I don\'t eat meat."',
    },
  },
  {
    key: "a2ic10s9",
    component: "Exercise2",
    activity: {
      prompt: "Complete o texto",
      paragraphs: [
        [
          "My brother ",
          { id: "b1", answer: "lives", options: ["lives", "is living"] },
          " in New York, but this month he ",
          { id: "b2", answer: "is staying", options: ["is staying", "stays"] },
          " with us in Brazil.",
        ],
      ],
      successTitle: "Correto",
      successMessage: "Lives é rotina/fato. Is staying é temporário.",
    },
  },
  {
    key: "a2ic10s10",
    component: "Exercise17",
    activity: {
      label: "Tip cultural",
      content: [
        "/blue{Como soa para o nativo?}",
        'Se você disser "I\'m loving this pizza", soa como curtir muito aquele momento específico.',
        'Se disser "I love pizza", é um gosto permanente.',
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic10s11",
    component: "Exercise12",
    activity: {
      prompt: "Freer Practice",
      instruction:
        "What do you usually do on Saturdays? And what are you doing this Saturday?",
      helperText:
        "Exemplo: I usually stay home, but this Saturday I'm going to a party.",
      placeholder: "Digite suas duas frases aqui",
      tipText:
        "Use Present Simple para rotina e Present Continuous para plano específico.",
      successTitle: "Muito bem!",
      successMessage: "Você contrastou rotina e ação específica.",
    },
  },
  {
    key: "a2ic10s12",
    component: "Exercise16",
    activity: {
      prompt: "Freer Practice - Áudio",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      instruction:
        "Fale sobre seu melhor amigo: o trabalho dele/dela e o que ele/ela está fazendo agora.",
      helperText: "Exemplo: She works at a bank. She is studying now.",
      tipText: "Use Simple para fato e Continuous para agora.",
      successTitle: "Muito bem!",
      successMessage: "Você gravou usando os dois tempos verbais.",
    },
  },
  {
    key: "a2ic10s13",
    component: "Exercise17",
    activity: {
      label: "Resumo",
      content: [
        "/blue{Resumo do Lingueto}",
        "Rotina/Fato? Simple.",
        "Agora/Temporário? Continuous.",
        "Você acaba de dar um passo gigante para a fluência!",
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
