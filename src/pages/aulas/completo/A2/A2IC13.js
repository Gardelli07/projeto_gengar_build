import createA2LessonScreen from "./A2LessonScreen";
import { ICA2, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic13s1",
    component: "Exercise4",
    activity: {
      prompt: 'Como dizemos "Eu fui ao cinema ontem"?',
      image: ICA2.A13S1,
      wrongSentence: "I goed to the cinema yesterday.",
      options: [
        "I went to the cinema yesterday.",
        "I goed to the cinema yesterday.",
        "I gone to the cinema yesterday.",
      ],
      correctAnswer: "I went to the cinema yesterday.",
      successTitle: "Correto",
      successMessage: "Go é irregular: no passado vira went.",
    },
  },
  {
    key: "a2ic13s2",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Ouça o áudio e selecione a forma do passado.",
      image: ICA2.A13S2,
      audioSource: require("../../../../../mp3/IC/A2/A13S2.mp3"),
      options: ["Buy", "Bought"],
      correctAnswer: "Bought",
      correctOption: "Bought",
      feedbackMessage: "Buy vira bought no passado.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic13s3",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Ouça o áudio e selecione a forma do passado.",
      image: ICA2.A13S3,
      audioSource: require("../../../../../mp3/IC/A2/A13S3.mp3"),
      options: ["Take", "Took"],
      correctAnswer: "Took",
      correctOption: "Took",
      feedbackMessage: "Take vira took no passado.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic13s4",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Ouça o áudio e selecione a forma do passado.",
      image: ICA2.A13S4,
      audioSource: require("../../../../../mp3/IC/A2/A13S4.mp3"),
      options: ["Have", "Had"],
      correctAnswer: "Had",
      correctOption: "Had",
      feedbackMessage: "Have vira had no passado.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic13s5",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Ouça o áudio e selecione a forma do passado.",
      image: ICA2.A13S5,
      audioSource: require("../../../../../mp3/IC/A2/A13S5.mp3"),
      options: ["Go", "Went"],
      correctAnswer: "Went",
      correctOption: "Went",
      feedbackMessage: "Go vira went no passado.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic13s6",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 2 • AULA 13",
      content: [
        "/blue{I took a shower}",
        "Chegou a hora de conhecer os rebeldes do inglês: os Verbos Irregulares.",
        "",
        "/blue{Por que Irregulares?}",
        "Eles não terminam em -ed. Eles mudam de palavra.",
        "Go → Went",
        "Have → Had",
        "Buy → Bought",
        "Take → Took",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic13s7",
    component: "Exercise1",
    activity: {
      prompt: "Conecte o verbo no presente com sua forma irregular no passado.",
      pairs: [
        { en: "Take", pt: "Took" },
        { en: "Buy", pt: "Bought" },
        { en: "Go", pt: "Went" },
        { en: "Have", pt: "Had" },
      ],
      successTitle: "Correto",
      successMessage: "Esses são quatro irregulares muito frequentes.",
    },
  },
  {
    key: "a2ic13s8",
    component: "Exercise5",
    activity: {
      prompt: 'Complete a frase com o passado de "HAVE".',
      image: ICA2.A13S8,
      sentenceStart: "I",
      sentenceEnd: "a big breakfast this morning.",
      options: ["had", "has"],
      correctAnswer: "had",
      successTitle: "Correto",
      successMessage: "Have vira had no passado.",
    },
  },
  {
    key: "a2ic13s9",
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt: 'Ordene as letras para formar o passado de "BUY".',
      audioSource: require("../../../../../mp3/IC/A2/A13S9.mp3"),
      letters: ["B", "O", "U", "G", "H", "T"],
      correctWord: "BOUGHT",
      successTitle: "Correto",
      successMessage: "Buy vira bought.",
    },
  },
  {
    key: "a2ic13s10",
    component: "Exercise15",
    activity: {
      prompt: "Clique na imagem e na frase que a descreve.",
      images: [
        { id: "img1", image: ICA2.A13S10 },
        { id: "img2", image: ICA2.A13S10p2 },
      ],
      words: [
        { id: "w1", label: "She took a beautiful photograph." },
        { id: "w2", label: "She saw a nice painting on the wall." },
      ],
      pairs: [
        { imageId: "img1", wordId: "w1" },
        { imageId: "img2", wordId: "w2" },
      ],
      successTitle: "Correto",
      successMessage: "Took e saw são formas irregulares do passado.",
    },
  },
  {
    key: "a2ic13s11",
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "/blue{O grupo do OUGHT}",
        "Muitos verbos irregulares terminam em -ought.",
        "A pronúncia parece um Ó aberto e o GH é mudo.",
        "Bought, brought, thought.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic13s12",
    component: "Exercise6",
    activity: {
      prompt: "Coloque as palavras na ordem correta.",
      words: ["went", "They", "to", "the", "beach", "Sunday", "last", "."],
      correctOrder: [
        "They",
        "went",
        "to",
        "the",
        "beach",
        "last",
        "Sunday",
        ".",
      ],
      successTitle: "Correto",
      successMessage: "They went to the beach last Sunday.",
    },
  },
  {
    key: "a2ic13s13",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Ouça e responda: verdadeiro ou falso?",
      image: ICA2.A13S13,
      audioSource: require("../../../../../mp3/IC/A2/A13S13.mp3"),
      statement: "The person bought shoes at the mall.",
      textOnScreen: "The person bought shoes at the mall.",
      options: ["true", "false"],
      correctAnswer: "true",
      successTitle: "Correto",
      successMessage: "True. A pessoa foi ao shopping e comprou sapatos.",
      feedbackMessage: "O áudio diz: I bought a new pair of shoes.",
    },
  },
  {
    key: "a2ic13s14",
    component: "Exercise2",
    activity: {
      prompt: "Escolha as palavras para completar a história de Mike.",
      paragraphs: [
        [
          "Last night, I ",
          { id: "b1", answer: "had", options: ["had", "went"] },
          " dinner with my friends. Then, I ",
          { id: "b2", answer: "took", options: ["took", "bought"] },
          " a taxi to go home.",
        ],
      ],
      successTitle: "Correto",
      successMessage: "Had dinner e took a taxi são combinações naturais.",
    },
  },
  {
    key: "a2ic13s15",
    component: "Exercise17",
    activity: {
      label: "Tip cultural",
      content: [
        "/blue{No restaurante}",
        "Em inglês, é muito comum usar HAD para comida e bebida.",
        'Exemplo: "I had a coffee and a sandwich."',
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic13s16",
    component: "Exercise12",
    activity: {
      prompt: "Freer Practice",
      instruction:
        "Escreva uma frase sobre algo que você comprou recentemente.",
      helperText: "Exemplo: I bought a new book yesterday.",
      placeholder: "Digite sua frase aqui",
      tipText: "Use bought para falar de compras no passado.",
      successTitle: "Muito bem!",
      successMessage: "Você usou um verbo irregular no passado.",
    },
  },
  {
    key: "a2ic13s17",
    component: "Exercise16",
    activity: {
      prompt: "Freer Practice - Áudio",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      instruction:
        "Mande um áudio contando para onde você foi no seu último feriado.",
      helperText: "Lembre-se: se for um lugar, diga I went to...",
      tipText: "Exemplo: I went to the beach.",
      successTitle: "Muito bem!",
      successMessage: "Seu áudio foi gravado.",
    },
  },
  {
    key: "a2ic13s18",
    component: "Exercise17",
    activity: {
      label: "Desafio",
      content: [
        "/blue{Desafio dos Rebeldes!}",
        "Estes verbos são irregulares e mudam de forma. Digite a forma correta do passado em até 5 segundos.",
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "a2ic13s19",
    component: "Exercise11",
    activity: {
      prompt: "Digite o passado dos verbos irregulares:",
      title: "Escreva rápido",
      placeholder: "Digite aqui",
      secondsPerWord: 5,
      words: ["Went", "Had", "Bought", "Took", "Saw"],
      successTitle: "Correto",
      successMessage: "Você praticou os irregulares essenciais.",
    },
  },
  {
    key: "a2ic13s20",
    component: "Exercise17",
    activity: {
      label: "Final",
      content: [
        "/blue{Sobrevivendo aos Rebeldes!}",
        "Aprenda os irregulares mais usados primeiro. Com os de hoje, você já conversa sobre grande parte do seu dia.",
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
