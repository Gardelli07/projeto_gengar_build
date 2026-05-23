import createA2LessonScreen from "./A2LessonScreen";
import { ICA2 } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic11s1",
    component: "Exercise4",
    activity: {
      prompt: "Qual frase indica uma ação que aconteceu ontem?",
      image: ICA2.A11S1,
      wrongSentence: "Yesterday I work a lot.",
      options: [
        "Yesterday I worked a lot.",
        "Yesterday I working a lot.",
        "Yesterday I works a lot.",
      ],
      correctAnswer: "Yesterday I worked a lot.",
      successTitle: "Correto",
      successMessage: "Yesterday indica passado; work vira worked.",
    },
  },
  {
    key: "a2ic11s2",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Ouça o áudio e selecione a palavra correta.",
      image: ICA2.A11S2,
      audioSource: require("../../../../../mp3/IC/A2/A11S2.mp3"),
      options: ["Play", "Played"],
      correctAnswer: "Played",
      correctOption: "Played",
      feedbackMessage: "Played é a forma no passado.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic11s3",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 2 • AULA 11",
      content: [
        "/blue{I studied last night}",
        "Você já sabe falar do presente, mas e se quiser contar uma história?",
        "",
        "/blue{A Regra do -ED}",
        "Para transformar a maioria dos verbos em passado, basta adicionar -ed ao final.",
        "Work → Worked",
        "Play → Played",
        "Watch → Watched",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic11s4",
    component: "Exercise1",
    activity: {
      prompt: "Conecte o verbo no presente com sua forma no passado.",
      pairs: [
        { en: "Cook", pt: "Cooked" },
        { en: "Listen", pt: "Listened" },
        { en: "Walk", pt: "Walked" },
      ],
      successTitle: "Correto",
      successMessage: "Esses verbos são regulares: basta usar -ed.",
    },
  },
  {
    key: "a2ic11s5",
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "/blue{Mudanças na Escrita}",
        "Se o verbo termina em -e, apenas adicione -d.",
        "Dance → Danced",
        "Se termina em consoante + Y, troque o Y por -ied.",
        "Study → Studied",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic11s6",
    component: "Exercise5",
    activity: {
      prompt: "Complete a frase com o passado do verbo entre parênteses.",
      image: ICA2.A11S6,
      sentenceStart: "She",
      sentenceEnd: "for the test last night.",
      options: ["studying", "studied"],
      correctAnswer: "studied",
      successTitle: "Correto",
      successMessage: "Study vira studied no passado.",
    },
  },
  {
    key: "a2ic11s7",
    component: "Exercise15",
    activity: {
      prompt: "Clique na imagem e na frase que a descreve.",
      images: [
        { id: "img1", image: ICA2.A11S7 },
        { id: "img2", image: ICA2.A11S7p2 },
      ],
      words: [
        { id: "w1", label: "She watched a movie yesterday." },
        { id: "w2", label: "He played soccer yesterday." },
      ],
      pairs: [
        { imageId: "img1", wordId: "w1" },
        { imageId: "img2", wordId: "w2" },
      ],
      successTitle: "Correto",
      successMessage: "Watched e played mostram ações no passado.",
    },
  },
  {
    key: "a2ic11s8",
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt: 'Ordene as letras para formar o passado de "DANCE".',
      audioSource: require("../../../../../mp3/IC/A2/A11S8.mp3"),
      letters: ["D", "E", "C", "N", "A", "D"],
      correctWord: "DANCED",
      successTitle: "Correto",
      successMessage: "Dance termina em E, então recebe apenas D: danced.",
    },
  },
  {
    key: "a2ic11s9",
    component: "Exercise6",
    activity: {
      prompt: "Coloque as palavras na ordem correta.",
      words: ["soccer", "They", "played", "Saturday", "last", "."],
      correctOrder: ["They", "played", "soccer", "last", "Saturday", "."],
      successTitle: "Correto",
      successMessage: "They played soccer last Saturday.",
    },
  },
  {
    key: "a2ic11s10",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Ouça o áudio e responda: verdadeiro ou falso?",
      image: ICA2.A11S10,
      audioSource: require("../../../../../mp3/IC/A2/A11S10.mp3"),
      textOnScreen: "The person visited friends last weekend.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      successMessage: "False. A pessoa ficou em casa, cozinhou e ouviu música.",
      feedbackMessage: "O áudio diz stayed at home, não visited friends.",
    },
  },
  {
    key: "a2ic11s11",
    component: "Exercise2",
    activity: {
      prompt: "Escolha as alternativas que completam o diário de Sarah.",
      paragraphs: [
        [
          "Yesterday was great! I ",
          { id: "b1", answer: "visited", options: ["visited", "visit"] },
          " my grandmother. We ",
          { id: "b2", answer: "talked", options: ["talked", "talk"] },
          " about our family for hours.",
        ],
      ],
      successTitle: "Correto",
      successMessage: "Visited e talked são passados regulares.",
    },
  },
  {
    key: "a2ic11s12",
    component: "Exercise17",
    activity: {
      label: "Tip cultural",
      content: [
        "/blue{O som do -ED}",
        "O -ed pode ter 3 sons diferentes: /t/, /d/ ou /id/.",
        "Quase nunca pronunciamos o E forte.",
        'Em "worked", o som final parece um T mudo: worked.',
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic11s13",
    component: "Exercise12",
    activity: {
      prompt: "Freer Practice",
      instruction: "O que você fez ontem?",
      helperText:
        "Escreva uma frase usando um verbo regular: worked, studied, cleaned ou cooked.",
      placeholder: "Digite sua frase aqui",
      tipText: "Use uma palavra de passado, como yesterday ou last night.",
      successTitle: "Muito bem!",
      successMessage: "Você escreveu uma frase no passado.",
    },
  },
  {
    key: "a2ic11s14",
    component: "Exercise16",
    activity: {
      prompt: "Freer Practice - Áudio",
      instruction:
        "Mande um áudio contando duas coisas que você fez semana passada.",
      helperText: "Exemplo: I worked and studied last week.",
      tipText: "Use verbos regulares com -ed.",
      successTitle: "Muito bem!",
      successMessage: "Seu áudio foi gravado.",
    },
  },
  {
    key: "a2ic11s15",
    component: "Exercise17",
    activity: {
      label: "Desafio",
      content: [
        "/blue{Desafio de Escrita!}",
        "Você verá o verbo no presente e deve digitar a forma correta do passado o mais rápido que puder.",
        "Você terá apenas 5 segundos por palavra.",
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "a2ic11s16",
    component: "Exercise11",
    activity: {
      prompt: "Digite o passado dos verbos regulares:",
      title: "Escreva rápido",
      placeholder: "Digite aqui",
      secondsPerWord: 5,
      words: ["Stayed", "Walked", "Visited", "Talked", "Fixed"],
      successTitle: "Correto",
      successMessage: "Você dominou o -ed dos verbos regulares.",
    },
  },
  {
    key: "a2ic11s17",
    component: "Exercise17",
    activity: {
      label: "Final",
      content: [
        "/blue{Missão Cumprida!}",
        "Você agora consegue contar o que já viveu. Os verbos regulares são a base para narrar suas experiências.",
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
