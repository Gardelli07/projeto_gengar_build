import createA2LessonScreen from "./A2LessonScreen";
import { ICA2 } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic23s1",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 3 • AULA 23",
      content: [
        "/blue{I was sleeping}",
        "/blue{Ações em Movimento!}",
        "Hoje vamos aprender o Past Continuous. Ele serve para falar de coisas que você estava fazendo.",
        "No passado contínuo, usamos was ou were. Nesta aula, vamos focar 100% no WAS, que usamos para I, He, She e It.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic23s2",
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "/blue{A Receita do WAS}",
        "Para montar sua frase, a regra é simples:",
        "Pessoa (I, He, She, It) + WAS + verbo com ING.",
        "Exemplo: I was sleeping. (Eu estava dormindo).",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic23s3",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a frase correta.",
      image: ICA2.A23S3,
      audioSource: require("../../../../../mp3/IC/A2/A23S3.mp3"),
      options: ["I was working", "Was work"],
      correctAnswer: "I was working",
      correctOption: "I was working",
      feedbackMessage: "Working é work + ing. Significa estava trabalhando.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic23s4",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a frase correta.",
      image: ICA2.A23S4,
      audioSource: require("../../../../../mp3/IC/A2/A23S4.mp3"),
      options: ["He was eating", "Was eating"],
      correctAnswer: "He was eating",
      correctOption: "He was eating",
      feedbackMessage: "Usamos was para o passado com he.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic23s5",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a frase correta.",
      image: ICA2.A23S5,
      audioSource: require("../../../../../mp3/IC/A2/A23S5.mp3"),
      options: ["She was studying", "Was study"],
      correctAnswer: "She was studying",
      correctOption: "She was studying",
      feedbackMessage: "Se tem was, o verbo precisa do ing.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic23s6",
    component: "Exercise4",
    activity: {
      prompt: "Michael estava lendo um livro. Qual é a frase certa?",
      image: ICA2.A23S6,
      wrongSentence: "Michael estava lendo um livro.",
      options: ["He was read a book.", "He was reading a book."],
      correctAnswer: "He was reading a book.",
      successTitle: "Correto",
      successMessage: "No Past Continuous, use was + verbo com ing.",
    },
  },
  {
    key: "a2ic23s7",
    component: "Exercise8",
    activity: {
      prompt: "Olhe a imagem e escolha a frase correta.",
      image: ICA2.A23S7,
      options: ["She was cooking dinner.", "She was cook dinner."],
      correctAnswer: "She was cooking dinner.",
      successTitle: "Correto",
      successMessage: "Cooking mantém o ing depois de was.",
    },
  },
  {
    key: "a2ic23s8",
    component: "Exercise6",
    activity: {
      prompt: 'Organize a frase: "Eu estava estudando ontem."',
      words: ["I", "was", "studying", "yesterday", "."],
      correctAnswer: "I was studying yesterday.",
      successTitle: "Correto",
      successMessage: "Você montou a frase com was + studying.",
    },
  },
  {
    key: "a2ic23s9",
    component: "Exercise18",
    activity: {
      prompt: "O que ele estava fazendo? Olhe as peças e digite.",
      scrambledWords: ["was", "He", "sleeping", "."],
      words: ["was", "He", "sleeping", "."],
      correctAnswer: "He was sleeping.",
      successTitle: "Correto",
      successMessage: "He was sleeping.",
    },
  },
  {
    key: "a2ic23s10",
    component: "Exercise19",
    activity: {
      prompt: "Escute e digite exatamente o que ouviu.",
      audioSource: require("../../../../../mp3/IC/A2/A23S10.mp3"),
      correctAnswer: "She was running.",
      successTitle: "Correto",
      successMessage: "She was running.",
    },
  },
  {
    key: "a2ic23s11",
    component: "Exercise17",
    activity: {
      label: "Desafio",
      content: [
        "/blue{Desafio de Velocidade!}",
        "Agora você precisa ser rápido. Vou te mostrar frases no presente e você deve digitar a versão no Past Continuous usando was.",
        "Você tem apenas 5 segundos!",
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "a2ic23s12",
    component: "Exercise11",
    activity: {
      words: [
        "I was working",
        "He was eating",
        "She was sleeping",
        "It was raining",
        "I was studying",
      ],
      secondsPerWord: 5,
    },
  },
  {
    key: "a2ic23s13",
    component: "Exercise12",
    activity: {
      prompt:
        "Imagine que ontem às 20h você estava fazendo algo muito legal. O que era?",
      instruction: 'Comece com "I was..." e adicione uma ação com ING.',
      correctAnswer: "I was watching a movie.",
      successTitle: "Muito bem!",
      successMessage: "Resposta registrada.",
    },
  },
  {
    key: "a2ic23s14",
    component: "Exercise16",
    activity: {
      prompt: "Gravação de áudio",
      instruction: 'Grave um áudio dizendo: "He was working late last night."',
      helperText: "He was working late last night.",
      tipText: 'Capriche na pronúncia de "was" e do final "ing".',
      successTitle: "Muito bem!",
      successMessage: "Seu áudio foi gravado.",
    },
  },
  {
    key: "a2ic23s15",
    component: "Exercise17",
    activity: {
      label: "Final",
      content: [
        "/blue{Você é um mestre do WAS!}",
        "Hoje focamos no was para I, He, She e It. Na próxima aula, vamos conhecer o parceiro dele, o were.",
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
