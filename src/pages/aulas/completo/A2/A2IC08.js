import createA2LessonScreen from "./A2LessonScreen";
import { ICA2, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic08s1",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 1 • AULA 8",
      content: [
        "/blue{She isn’t sleeping}",
        "Pronto para aprender a dizer o que não está acontecendo?",
        "",
        "/blue{I’m Not Doing That!}",
        "Hoje você vai dominar o uso do NOT e as contrações que os nativos usam o tempo todo.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic08s2",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA2.A8S2,
      audioSource: require("../../../../../mp3/IC/A2/A8S2.mp3"),
      options: ["I am sleeping.", "I am not sleeping."],
      correctAnswer: "I am not sleeping.",
      correctOption: "I am not sleeping.",
      feedbackMessage: 'O áudio diz: "I am not sleeping."',
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic08s3",
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "/blue{A Regra do NOT}",
        "Para dizer que algo não está acontecendo agora, colocamos NOT depois do verbo to be.",
        "I am not eating.",
        "She is not crying.",
        "You are not studying.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic08s4",
    component: "Exercise1",
    activity: {
      prompt: "Conecte as formas com suas contrações:",
      pairs: [
        { en: "I am not", pt: "I'm not" },
        { en: "He is not", pt: "He isn't" },
        { en: "You are not", pt: "You aren't" },
      ],
      successTitle: "Correto",
      successMessage: "Essas são as contrações naturais da fala.",
    },
  },
  {
    key: "a2ic08s5",
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "/blue{Formal vs. Informal}",
        "No dia a dia, usamos contrações: isn't, aren't, I'm not.",
        "Use is not / are not em escrita formal ou quando quiser dar muita ênfase.",
        'Exemplo: "I am NOT going!"',
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic08s6",
    component: "Exercise5",
    activity: {
      prompt: "Complete com a forma do verbo:",
      sentenceStart: "They are",
      sentenceEnd: "a movie.",
      options: ["watching", "watched"],
      correctAnswer: "watching",
      successTitle: "Correto",
      successMessage: "Present Continuous usa verbo com -ING: watching.",
    },
  },
  {
    key: "a2ic08s7",
    component: "Exercise5",
    activity: {
      prompt: "Complete com a negação:",
      sentenceStart: "It",
      sentenceEnd: "raining outside right now.",
      options: ["be not", "isn't"],
      correctAnswer: "isn't",
      successTitle: "Correto",
      successMessage: "It isn't raining outside right now.",
    },
  },
  {
    key: "a2ic08s8",
    component: "Exercise15",
    activity: {
      prompt: "Relacione a imagem com o que o homem não está fazendo:",
      images: [
        { id: "img1", image: ICA2.A8S8 },
        { id: "img2", image: ICA2.A8S8p2 },
      ],
      words: [
        { id: "w1", label: "He isn't running." },
        { id: "w2", label: "He is reading." },
      ],
      pairs: [
        { imageId: "img1", wordId: "w1" },
        { imageId: "img2", wordId: "w2" },
      ],
      successTitle: "Correto",
      successMessage:
        "A imagem do sofá mostra o que ele não está fazendo: He isn't running.",
    },
  },
  {
    key: "a2ic08s9",
    component: "Exercise6",
    activity: {
      prompt: "Organize a frase negativa:",
      words: ["He", "isn't", "the", "playing", "guitar."],
      correctOrder: ["He", "isn't", "playing", "the", "guitar."],
      successTitle: "Correto",
      successMessage: "He isn't playing the guitar.",
    },
  },
  {
    key: "a2ic08s10",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Escute e responda: verdadeiro ou falso?",
      image: ICA2.A8S10,
      audioSource: require("../../../../../mp3/IC/A2/A8S10.mp3"),
      statement: "The kids are playing.",
      textOnScreen: "The kids are playing.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      successMessage: "False. Eles não estão brincando; estão lendo um livro.",
      feedbackMessage: "O áudio diz: They aren't playing.",
    },
  },
  {
    key: "a2ic08s11",
    component: "Exercise2",
    activity: {
      prompt: "Complete o texto",
      paragraphs: [
        [
          "I'm at a party, but it's boring. The DJ ",
          {
            id: "b1",
            answer: "isn't playing",
      options: ["isn't playing", "am not playing"],
          },
          " good music and people ",
          {
            id: "b2",
            answer: "aren't dancing",
      options: ["aren't dancing", "isn't dancing"],
          },
          ".",
        ],
      ],
      successTitle: "Correto",
      successMessage:
        "The DJ isn't playing good music and people aren't dancing.",
    },
  },
  {
    key: "a2ic08s12",
    component: "Exercise17",
    activity: {
      label: "Tip cultural",
      content: [
        "/blue{Dica do Nativo}",
        'Em músicas de Pop e Hip-Hop, você ouvirá muito "AIN’T" (I ain’t doing, He ain’t going).',
        "Use apenas com amigos muito íntimos. É extremamente informal.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic08s13",
    component: "Exercise12",
    activity: {
      prompt: "Freer Practice",
      instruction: "Escreva uma frase sobre o que você NÃO está fazendo agora.",
      helperText: "Exemplo: I'm not sleeping.",
      placeholder: "Digite sua frase aqui",
      tipText: "Use am not, isn't ou aren't + verbo com -ING.",
      successTitle: "Muito bem!",
      successMessage: "Você criou uma frase negativa no Present Continuous.",
    },
  },
  {
    key: "a2ic08s14",
    component: "Exercise16",
    activity: {
      prompt: "Freer Practice - Áudio",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      instruction:
        "Imagine que você está na academia. Diga 2 coisas que você NÃO está fazendo lá.",
      helperText: "Exemplo: I'm not swimming.",
      tipText: "Use I'm not / isn't / aren't + verbo com -ING.",
      successTitle: "Muito bem!",
      successMessage: "Seu áudio foi gravado com frases negativas.",
    },
  },
  {
    key: "a2ic08s15",
    component: "Exercise11",
    activity: {
      prompt: "Transforme em negativa:",
      title: "Digite a frase negativa",
      placeholder: "Digite aqui",
      secondsPerWord: 10,
      words: [
        "I'm not eating.",
        "She isn't crying.",
        "They aren't studying.",
        "You aren't coming.",
        "It isn't snowing.",
        "We aren't driving.",
        "He isn't calling.",
        "The cat isn't sleeping.",
      ],
      successTitle: "Correto",
      successMessage: "Você praticou a negação com Present Continuous.",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
