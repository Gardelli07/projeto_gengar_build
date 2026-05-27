import createA2LessonScreen from "./A2LessonScreen";
import { ICA2, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic26s1",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 3 • AULA 26",
      content: [
        "/blue{Was he sleeping?}",
        "/blue{Invertendo a Lógica!}",
        "Para fazer perguntas no passado contínuo, Was e Were pulam para o início da frase.",
        "Fórmula: Was/Were + pessoa + verbo-ING?",
        "Was he sleeping? / Were they playing?",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic26s2",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha.",
      image: ICA2.A26S2,
      audioSource: require("../../../../../mp3/IC/A2/A26S2.mp3"),
      options: ["Was she working?", "Was she work?"],
      correctAnswer: "Was she working?",
      correctOption: "Was she working?",
      feedbackMessage: "Para she, usamos Was.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic26s3",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha.",
      image: ICA2.A26S3,
      audioSource: require("../../../../../mp3/IC/A2/A26S3.mp3"),
      options: ["Was you listening?", "Were you listening?"],
      correctAnswer: "Were you listening?",
      correctOption: "Were you listening?",
      feedbackMessage: "Com you, usamos Were.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic26s4",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha.",
      image: ICA2.A26S4,
      audioSource: require("../../../../../mp3/IC/A2/A26S4.mp3"),
      options: ["Was it raining?", "Were it raining?"],
      correctAnswer: "Was it raining?",
      correctOption: "Was it raining?",
      feedbackMessage: "Para clima com it, usamos Was.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic26s5",
    component: "Exercise18",
    activity: {
      prompt: "Organize as palavras para montar a pergunta correta.",
      scrambledWords: ["he", "Was", "TV", "watching", "?"],
      words: ["he", "Was", "TV", "watching", "?"],
      correctAnswer: "Was he watching TV?",
      successTitle: "Correto",
      successMessage: "Was he watching TV?",
    },
  },
  {
    key: "a2ic26s6",
    component: "Exercise18",
    activity: {
      prompt: "Eles estavam estudando? Digite a pergunta.",
      scrambledWords: ["studying", "they", "Were", "?"],
      words: ["studying", "they", "Were", "?"],
      correctAnswer: "Were they studying?",
      successTitle: "Correto",
      successMessage: "Were they studying?",
    },
  },
  {
    key: "a2ic26s7",
    component: "Exercise18",
    activity: {
      prompt: "Agora uma frase mais longa. Digite a pergunta.",
      scrambledWords: ["she", "Was", "dinner", "cooking", "yesterday", "?"],
      words: ["she", "Was", "dinner", "cooking", "yesterday", "?"],
      correctAnswer: "Was she cooking dinner yesterday?",
      successTitle: "Correto",
      successMessage: "Was she cooking dinner yesterday?",
    },
  },
  {
    key: "a2ic26s8",
    component: "Exercise18",
    activity: {
      prompt: "Você estava falando comigo? Monte a pergunta.",
      scrambledWords: ["to", "me", "listening", "you", "Were", "?"],
      words: ["to", "me", "listening", "you", "Were", "?"],
      correctAnswer: "Were you listening to me?",
      successTitle: "Correto",
      successMessage: "Were you listening to me?",
    },
  },
  {
    key: "a2ic26s9",
    component: "Exercise19",
    activity: {
      prompt: "Escute a pergunta com atenção e digite-a por extenso.",
      audioSource: require("../../../../../mp3/IC/A2/A26S9.mp3"),
      correctAnswer: "Was he playing video games?",
      successTitle: "Correto",
      successMessage: "Was he playing video games?",
    },
  },
  {
    key: "a2ic26s10",
    component: "Exercise19",
    activity: {
      prompt: "O que eles estavam fazendo? Ouça e digite.",
      audioSource: require("../../../../../mp3/IC/A2/A26S10.mp3"),
      correctAnswer: "Were they eating pizza?",
      successTitle: "Correto",
      successMessage: "Were they eating pizza?",
    },
  },
  {
    key: "a2ic26s11",
    component: "Exercise19",
    activity: {
      prompt: "Atenção ao lugar. Digite o que ouviu.",
      audioSource: require("../../../../../mp3/IC/A2/A26S11.mp3"),
      correctAnswer: "Was it snowing in London?",
      successTitle: "Correto",
      successMessage: "Was it snowing in London?",
    },
  },
  {
    key: "a2ic26s12",
    component: "Exercise17",
    activity: {
      label: "Desafio",
      content: [
        "/blue{Transformação Instantânea!}",
        "Vou te dar uma frase afirmativa e você deve transformá-la em pergunta.",
        "Exemplo: You were sleeping → Were you sleeping?",
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "a2ic26s13",
    component: "Exercise11",
    activity: {
      words: [
        "Was he working?",
        "Were they dancing?",
        "Was she eating?",
        "Were you listening?",
        "Was it raining?",
        "Were we playing?",
        "Was I dreaming?",
        "Was Sarah cooking?",
        "Were the dogs barking?",
        "Was he driving fast?",
      ],
      secondsPerWord: 10,
    },
  },
  {
    key: "a2ic26s14",
    component: "Exercise12",
    activity: {
      prompt: "Imagine que você ligou para um amigo e ele não atendeu.",
      instruction:
        'Crie duas perguntas para saber o que ele estava fazendo. Use "Were you...ing...?"',
      correctAnswer: "Were you sleeping? Were you working?",
      successTitle: "Muito bem!",
      successMessage: "Perguntas registradas.",
    },
  },
  {
    key: "a2ic26s15",
    component: "Exercise16",
    activity: {
      prompt: "Gravação de áudio",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      instruction:
        'Grave esta pergunta: "Were you studying English yesterday morning?"',
      helperText: "Were you studying English yesterday morning?",
      tipText: "Lembre-se da entonação de pergunta no final.",
      successTitle: "Muito bem!",
      successMessage: "Seu áudio foi gravado.",
    },
  },
  {
    key: "a2ic26s16",
    component: "Exercise17",
    activity: {
      label: "Final",
      content: [
        "/blue{Mestre do Past Continuous!}",
        "Você agora domina o Passado Contínuo nas formas afirmativa, negativa e interrogativa.",
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
