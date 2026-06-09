import createA2LessonScreen from "./A2LessonScreen";
import { ICA2, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic01s1",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 1 • AULA 1",
      content: [
        "/blue{Present Continuous: I am working}",
        "",
        'Pare por um segundo e observe: o mundo ao seu redor não é uma fotografia parada, é um vídeo em alta definição. Enquanto você respira, algo está acontecendo. Vamos capturar o "agora"?',
        "",
        "/blue{Tip - O Sufixo do Movimento}",
        'Para transformar um verbo estático em uma ação viva, usamos o -ING. É o nosso "ando", "endo", "indo".',
        "Work → Working",
        "Study → Studying",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic01s2",
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "/blue{A Dança do E}",
        "Verbos que terminam em E são charmosos, mas o E precisa sair para o -ING entrar.",
        "Dance → Dancing",
        "Write → Writing",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic01s3",
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "/blue{O Peso da Consoante}",
        "Verbos curtos que terminam em CVC (Consoante + Vogal + Consoante) ganham um reforço: dobramos a última letra.",
        "Run → Running",
        "Swim → Swimming",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic01s4",
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "/blue{A Bateria da Frase}",
        "Uma ação não anda sozinha. Você precisa do verbo BE (am, is, are) para ligar o motor.",
        'Informal: "I\'m working."',
        'Formal: "I am working."',
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic01s5",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Ouça e complete a estrutura",
      image: ICA2.A1S5,
      audioSource: require("../../../../../mp3/IC/A2/A1S5.mp3"),
      options: ["are", "'re"],
      correctAnswer: "are",
      correctOption: "are",
      feedbackMessage: 'A estrutura correta é "They are swimming."',
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic01s6",
    component: "Exercise6",
    activity: {
      prompt: "Coloque as peças no lugar para formar a ação:",
      words: ["is", "My", "writing", "father", "a book."],
      correctOrder: ["My", "father", "is", "writing", "a book."],
      successTitle: "Correto",
      successMessage: "My father is writing a book.",
    },
  },
  {
    key: "a2ic01s7",
    component: "Exercise20",
    activity: {
      prompt: "Leia e responda: verdadeiro ou falso?",
      image: ICA2.A1S7,
      statement:
        'Se a pessoa diz "I am eating", isso significa que ela sempre come no mesmo horário todos os dias.',
      textOnScreen:
        'Se a pessoa diz "I am eating", isso significa rotina diária.',
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      successMessage: 'False. "I am eating" descreve a ação acontecendo agora.',
      feedbackMessage:
        "Present Continuous fala do momento atual, não de rotina.",
    },
  },
  {
    key: "a2ic01s8",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Onde a ação está acontecendo?",
      image: ICA2.A1S8,
      audioSource: require("../../../../../mp3/IC/A2/A1S8.mp3"),
      options: ["No quarto (Bedroom)", "Na cozinha (Kitchen)"],
      correctAnswer: "Na cozinha (Kitchen)",
      correctOption: "Na cozinha (Kitchen)",
      feedbackMessage: 'A frase diz "in the kitchen".',
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic01s9",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: 'Escolha a resposta para "What are you doing?"',
      image: ICA2.A1S9,
      audioSource: require("../../../../../mp3/IC/A2/A1S9.mp3"),
      options: [
        "I study with Lingueto.",
        "I'm studying with Lingueto right now!",
      ],
      correctAnswer: "I'm studying with Lingueto right now!",
      correctOption: "I'm studying with Lingueto right now!",
      feedbackMessage:
        'Com "What are you doing?", responda com ação acontecendo agora.',
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic01s10",
    component: "Exercise16",
    activity: {
      prompt: "Não deixe a ação parar!",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      instruction: "Grave sua voz descrevendo o seu momento para o Lingueto.",
      helperText: 'Diga: "I am studying English."',
      expectedText: "I am studying English.",
      tipText: 'Sinta a vibração do "-ing" no final das palavras.',
      successTitle: "Muito bem!",
      successMessage: "Você descreveu uma ação acontecendo agora.",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
