import createA2LessonScreen from "./A2LessonScreen";
import { ICA2 } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic18s2",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 2 • AULA 18",
      content: [
        "/blue{Did you study?}",
        "/blue{O Ajudante DID}",
        "Para fazer perguntas no passado, colocamos DID na frente.",
        "Ele avisa que a frase é passado, então o verbo principal fica no presente.",
        "Did you go? Nunca: Did you went?",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic18s1",
    component: "Exercise2",
    activity: {
      prompt: "Como fazemos perguntas no passado?",
      paragraphs: [
        [
          "",
          { id: "b1", answer: "Did", options: ["Did", "Does"] },
          " you ",
          { id: "b2", answer: "see", options: ["see", "saw"] },
          " the movie yesterday?",
        ],
      ],
      successTitle: "Correto",
      successMessage: "Use Did + pessoa + verbo no presente.",
    },
  },
  {
    key: "a2ic18s3",
    component: "Exercise18",
    activity: {
      prompt: "Digite a pergunta na ordem correta:",
      scrambledSentence: "see / you / Did / him / ?",
      correctAnswer: "Did you see him?",
      placeholder: "Digite a pergunta",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "Did you see him?",
    },
  },
  {
    key: "a2ic18s4",
    component: "Exercise19",
    needsSpeech: true,
    activity: {
      prompt: "Escute e digite exatamente o que foi dito:",
      audioSource: require("../../../../../mp3/IC/A2/A18S4.mp3"),
      correctAnswer: "Did you have lunch?",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "Você escreveu a pergunta corretamente.",
      errorMessage: "Confira a estrutura: Did you have lunch?",
    },
  },
  {
    key: "a2ic18s5",
    component: "Exercise8",
    activity: {
      prompt: "Escolha a pergunta correta.",
      image: ICA2.A18S5,
      options: ["Did you go to London?", "Did you went to London?"],
      correctAnswer: "Did you go to London?",
      successTitle: "Correto",
      successMessage: "Depois de Did, use go.",
    },
  },
  {
    key: "a2ic18s6",
    component: "Exercise1",
    activity: {
      prompt: "Conecte a pergunta à resposta curta correta.",
      pairs: [
        { en: "Did you go?", pt: "Yes, I did." },
        { en: "Did she see?", pt: "Yes, she did." },
        { en: "Did they have?", pt: "Yes, they did." },
        { en: "Did he eat?", pt: "Yes, he did." },
      ],
      successTitle: "Correto",
      successMessage: "As respostas curtas usam did.",
    },
  },
  {
    key: "a2ic18s8",
    component: "Exercise17",
    activity: {
      label: "Desafio",
      content: [
        "/blue{Desafio de Interrogativas!}",
        "Transforme a afirmação em pergunta usando DID. Digite a frase completa.",
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "a2ic18s9",
    component: "Exercise11",
    activity: {
      prompt: "Transforme em pergunta:",
      title: "Digite a pergunta",
      placeholder: "Digite aqui",
      secondsPerWord: 10,
      words: [
        "Did you go?",
        "Did she see?",
        "Did they have?",
        "Did he eat?",
        "Did you do?",
      ],
      successTitle: "Correto",
      successMessage: "Você formou perguntas com DID.",
    },
  },
  {
    key: "a2ic18s10",
    component: "Exercise17",
    activity: {
      label: "Final",
      content: [
        "/blue{Missão Cumprida!}",
        "Você agora sabe perguntar, negar e afirmar no passado. DID e DIDN'T são seus aliados.",
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
