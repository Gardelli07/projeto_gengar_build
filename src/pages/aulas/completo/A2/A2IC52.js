import createA2LessonScreen from "./A2LessonScreen";
import { ICA2 } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic52s1",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 6 • AULA 52",
      content: [
        "/blue{Why not?}",
        "/blue{Vamos fazer algo?}",
        "Para convidar alguém ou dar uma ideia, usamos duas ferramentas principais: let's + verbo e why don't we...?",
        "Let's é direto e animado. Why don't we...? é uma sugestão em forma de pergunta.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic52s2",
    component: "Exercise17",
    activity: {
      label: "TIP",
      content: [
        "/blue{Let's ou Why don't we?}",
        "Let's é a contração de let us. Usamos para uma sugestão direta: Let's go!",
        "Why don't we...? é uma pergunta mais gentil: Why don't we go?",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic52s3",
    component: "Exercise17",
    activity: {
      label: "TIP",
      content: [
        "/blue{Por que não posso perguntar com let's?}",
        "Let's funciona como um comando suave. Ele não tem auxiliar para inverter em pergunta.",
        "Errado: Let's go?",
        "Certo: Let's go! ou Why don't we go?",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic52s4",
    component: "Exercise14",
    activity: {
      prompt: "Ouça o convite direto.",
      image: ICA2.A52S4,
      audioSource: require("../../../../../mp3/IC/A2/A52S4.mp3"),
      options: ["Let's watch a movie.", "Why watch a movie."],
      correctAnswer: "Let's watch a movie.",
      successMessage: "Let's watch = vamos assistir.",
    },
  },
  {
    key: "a2ic52s5",
    component: "Exercise14",
    activity: {
      prompt: "Ouça a sugestão em forma de pergunta.",
      image: ICA2.A52S5,
      audioSource: require("../../../../../mp3/IC/A2/A52S5.mp3"),
      options: ["Why don't we eat pizza?", "Let's don't eat pizza."],
      correctAnswer: "Why don't we eat pizza?",
      successMessage:
        "Why don't we...? abre espaço para a opinião da outra pessoa.",
    },
  },
  {
    key: "a2ic52s6",
    component: "Exercise13",
    activity: {
      prompt: "Escreva o convite direto: Vamos!",
      audioSource: require("../../../../../mp3/IC/A2/A52S6.mp3"),
      letters: ["L", "E", "T", "'", "S"],
      correctWord: "LET'S",
      successMessage: "Let's significa vamos.",
    },
  },
  {
    key: "a2ic52s7",
    component: "Exercise6",
    activity: {
      prompt: "Comece a pergunta: Por que não...?",
      words: ["DON'T", "WHY", "WE"],
      correctOrder: ["WHY", "DON'T", "WE"],
      correctAnswer: "WHY DON'T WE",
      successMessage: "Why don't we...?",
    },
  },
  {
    key: "a2ic52s8",
    component: "Exercise6",
    activity: {
      prompt: "Vamos jogar futebol no parque.",
      words: ["Let's", "play", "soccer", "in the park", "."],
      correctOrder: ["Let's", "play", "soccer", "in the park", "."],
      correctAnswer: "Let's play soccer in the park.",
      successMessage: "Sugestão direta com let's.",
    },
  },
  {
    key: "a2ic52s9",
    component: "Exercise6",
    activity: {
      prompt: "Por que não estudamos juntos amanhã?",
      words: ["Why", "don't", "we", "study", "together", "tomorrow", "?"],
      correctOrder: [
        "Why",
        "don't",
        "we",
        "study",
        "together",
        "tomorrow",
        "?",
      ],
      correctAnswer: "Why don't we study together tomorrow?",
      successMessage: "Pergunta perfeita com why don't we.",
    },
  },
  {
    key: "a2ic52s10",
    component: "Exercise5",
    activity: {
      prompt: "Você quer ir à praia. Use a forma direta:",
      image: ICA2.A52S10,
      sentenceStart: "",
      sentenceEnd: "go to the beach!",
      options: ["Let's", "Shall we go"],
      correctAnswer: "Let's",
      successMessage: "Let's go to the beach!",
    },
  },
  {
    key: "a2ic52s11",
    component: "Exercise5",
    activity: {
      prompt: "Sugira um café em forma de pergunta:",
      sentenceStart: "",
      sentenceEnd: "we drink some coffee?",
      options: ["Why don't", "Let's"],
      correctAnswer: "Why don't",
      successMessage: "Why don't we drink some coffee?",
    },
  },
  {
    key: "a2ic52s12",
    component: "Exercise17",
    activity: {
      label: "Weekend Plans",
      content: [
        "Hi David! I'm bored. Let's do something fun today!",
        "Why don't we visit the new museum? Or let's go to the mall.",
        "Why don't we call Mark too? Let's have a great Saturday!",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic52s13",
    component: "Exercise12",
    activity: {
      prompt: "Agora é sua vez!",
      instruction:
        "O Camaleão quer sair. Dê 4 sugestões: 2 usando Let's e 2 usando Why don't we...?",
      correctAnswer:
        "Let's go to the park. Let's watch a movie. Why don't we eat pizza? Why don't we call Mark?",
      successMessage: "Sugestões registradas!",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
