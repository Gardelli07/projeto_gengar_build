import createA2LessonScreen from "./A2LessonScreen";
import { ICA2 } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic27s1",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 3 • AULA 27",
      content: [
        "/blue{Final combo}",
        "/blue{O Cenário Completo}",
        "No Past Continuous, descrevemos cenas do passado.",
        "(+) I was working / They were playing.",
        "(-) I wasn't working / They weren't playing.",
        "(?) Was I working? / Were they playing?",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic27s2",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha.",
      image: ICA2.A27S2,
      audioSource: require("../../../../../mp3/IC/A2/A27S2.mp3"),
      audioText: "They weren't studying.",
      options: ["They were studying.", "They weren't studying."],
      correctAnswer: "They weren't studying.",
      correctOption: "They weren't studying.",
      feedbackMessage: "Foco no som do n't.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic27s3",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha.",
      image: ICA2.A27S3,
      audioSource: require("../../../../../mp3/IC/A2/A27S3.mp3"),
      audioText: "Was he sleeping?",
      options: ["Was he sleeping?", "He was sleeping."],
      correctAnswer: "Was he sleeping?",
      correctOption: "Was he sleeping?",
      feedbackMessage: "A pergunta começa com Was.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic27s4",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha.",
      image: ICA2.A27S4,
      audioSource: require("../../../../../mp3/IC/A2/A27S4.mp3"),
      audioText: "We were having fun.",
      options: ["We were having fun.", "We was having fun."],
      correctAnswer: "We were having fun.",
      correctOption: "We were having fun.",
      feedbackMessage: "We é plural, então usamos were.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic27s5",
    component: "Exercise7",
    activity: {
      prompt: "Coloque o diálogo na ordem lógica.",
      sentences: [
        "No, I wasn't. I was studying.",
        "Were you watching TV yesterday?",
        "Good! I was studying too!",
        "Oh, really? Was it a difficult exam?",
      ],
      correctOrder: [
        "Were you watching TV yesterday?",
        "No, I wasn't. I was studying.",
        "Good! I was studying too!",
        "Oh, really? Was it a difficult exam?",
      ],
      successTitle: "Correto",
      successMessage: "O diálogo ficou em uma sequência natural.",
    },
  },
  {
    key: "a2ic27s6",
    component: "Exercise2",
    activity: {
      prompt: "Complete o texto.",
      text: "Last night at 8 PM, I (1) _________ eating dinner. My parents (2) _________ eating with me. (3) _________ you eating too?",
      blanks: [
        { id: "1", options: ["was", "were"], answer: "was" },
        { id: "2", options: ["wasn't", "weren't"], answer: "weren't" },
        { id: "3", options: ["Was", "Were"], answer: "Were" },
      ],
      successTitle: "Correto",
      successMessage: "Você escolheu was, weren't e Were corretamente.",
    },
  },
  {
    key: "a2ic27s7",
    component: "Exercise18",
    activity: {
      prompt: "Monte a afirmativa.",
      scrambledWords: ["cooking", "She", "was", "dinner", "."],
      words: ["cooking", "She", "was", "dinner", "."],
      correctAnswer: "She was cooking dinner.",
      successTitle: "Correto",
      successMessage: "She was cooking dinner.",
    },
  },
  {
    key: "a2ic27s8",
    component: "Exercise18",
    activity: {
      prompt: "Monte a negativa.",
      scrambledWords: ["playing", "weren't", "They", "soccer", "."],
      words: ["playing", "weren't", "They", "soccer", "."],
      correctAnswer: "They weren't playing soccer.",
      successTitle: "Correto",
      successMessage: "They weren't playing soccer.",
    },
  },
  {
    key: "a2ic27s9",
    component: "Exercise18",
    activity: {
      prompt: "Monte a pergunta.",
      scrambledWords: ["he", "Was", "listening", "?"],
      words: ["he", "Was", "listening", "?"],
      correctAnswer: "Was he listening?",
      successTitle: "Correto",
      successMessage: "Was he listening?",
    },
  },
  {
    key: "a2ic27s10",
    component: "Exercise19",
    activity: {
      prompt: "Escute e digite.",
      audioSource: require("../../../../../mp3/IC/A2/A27S10.mp3"),
      audioText: "I wasn't working yesterday morning.",
      correctAnswer: "I wasn't working yesterday morning.",
      successTitle: "Correto",
      successMessage: "I wasn't working yesterday morning.",
    },
  },
  {
    key: "a2ic27s11",
    component: "Exercise19",
    activity: {
      prompt: "Escute e digite.",
      audioSource: require("../../../../../mp3/IC/A2/A27S11.mp3"),
      audioText: "Were they dancing at the party?",
      correctAnswer: "Were they dancing at the party?",
      successTitle: "Correto",
      successMessage: "Were they dancing at the party?",
    },
  },
  {
    key: "a2ic27s12",
    component: "Exercise19",
    activity: {
      prompt: "Escute e digite.",
      audioSource: require("../../../../../mp3/IC/A2/A27S12.mp3"),
      audioText: "She was wearing a green dress.",
      correctAnswer: "She was wearing a green dress.",
      successTitle: "Correto",
      successMessage: "She was wearing a green dress.",
    },
  },
  {
    key: "a2ic27s13",
    component: "Exercise17",
    activity: {
      label: "Desafio",
      content: [
        "/blue{O Desafio do Camaleão!}",
        "Vou te dar frases afirmativas. Sua missão é digitar a versão negativa ou interrogativa conforme o comando.",
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "a2ic27s14",
    component: "Exercise11",
    activity: {
      words: [
        "He wasn't eating",
        "Were they playing?",
        "She wasn't working",
        "Were you sleeping?",
        "It wasn't raining",
        "Was I singing?",
        "We weren't talking",
        "Were the dogs barking?",
        "Sarah wasn't cooking",
        "Were they waiting?",
      ],
      secondsPerWord: 10,
    },
  },
  {
    key: "a2ic27s15",
    component: "Exercise12",
    activity: {
      prompt: "Descreva uma cena de um filme que você gosta usando o Past Continuous.",
      instruction: "Diga o que o herói estava fazendo e o que o vilão não estava fazendo.",
      correctAnswer: "The hero was fighting. The villain wasn't winning.",
      successTitle: "Muito bem!",
      successMessage: "Cena registrada.",
    },
  },
  {
    key: "a2ic27s16",
    component: "Exercise16",
    activity: {
      prompt: "Gravação de áudio",
      instruction: 'Grave: "Were you studying? No, I wasn\'t. I was playing Lingueto!"',
      helperText: "Were you studying? No, I wasn't. I was playing Lingueto!",
      successTitle: "Muito bem!",
      successMessage: "Seu áudio foi gravado.",
    },
  },
  {
    key: "a2ic27s17",
    component: "Exercise17",
    activity: {
      label: "Final",
      content: [
        "/blue{Mestre Absoluto do Passado!}",
        "Você completou a trilha do Past Continuous e já sabe descrever ações, negar fatos e fazer perguntas.",
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
