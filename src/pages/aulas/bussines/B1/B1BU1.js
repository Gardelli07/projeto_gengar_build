import { Exercise1 } from "../../../../exc/ex1";
import { Exercise2 } from "../../../../exc/ex2";
import { Exercise3 } from "../../../../exc/ex3";
import { Exercise4 } from "../../../../exc/ex4";
import { Exercise5 } from "../../../../exc/ex5";
import { Exercise6 } from "../../../../exc/ex6";
import { Exercise13 } from "../../../../exc/ex13";
import { Exercise14 } from "../../../../exc/ex14";
import { Exercise15 } from "../../../../exc/ex15";
import { Exercise16 } from "../../../../exc/ex16";
import { Exercise17 } from "../../../../exc/ex17";
import { BUB1, Images } from "../../../../util/images";
import createBusinessLessonScreen from "./BusinessLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "setting-stage-intro",
    component: Exercise17,
    activity: {
      label: "Como os nativos realmente abrem reuniões.",
      content: [
        `Esqueça o clássico e robótico "Let's start the meeting". No mundo corporativo real, tempo é dinheiro e controle é tudo. Falantes nativos em posições de liderança usam expressões que transmitem energia e autoridade instantânea. A mais comum delas é "To kick things off" (Para dar o pontapé inicial / Para começarmos). E, logo em seguida, para falar qual é o primeiro assunto da pauta, eles dizem "First on the docket is..." (O primeiro item da pauta é...). Vamos dominar esse vocabulário hoje!`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "opening-expressions-match",
    component: Exercise1,
    activity: {
      prompt:
        "Conecte as expressões iniciais de liderança com seus significados em português.",
      pairs: [
        { en: "To kick things off", pt: "Dar o pontapé inicial / Começar" },
        { en: "First on the docket", pt: "O primeiro item da pauta" },
      ],
      successTitle: "Correto",
      successMessage:
        "Essas expressões dão controle e energia ao início da reunião.",
    },
  },
  {
    key: "kick-docket-image-match",
    component: Exercise15,
    activity: {
      prompt: "Clique na imagem e na expressão exata que a descreve.",
      images: [
        { id: "kick-img", image: BUB1.A1S3p1 },
        { id: "docket-img", image: BUB1.A1S3p2 },
      ],
      words: [
        { id: "kick-word", label: "Kick things off" },
        { id: "docket-word", label: "First on the docket" },
      ],
      pairs: [
        { imageId: "kick-img", wordId: "kick-word" },
        { imageId: "docket-img", wordId: "docket-word" },
      ],
      successTitle: "Correto",
      successMessage:
        "Kick things off inicia; docket aponta o primeiro item da pauta.",
    },
  },
  {
    key: "kick-things-off-correct",
    component: Exercise4,
    activity: {
      prompt:
        "Você é o líder da reunião e precisa começar de forma enérgica e profissional. Qual é a frase escrita corretamente?",
      image: BUB1.A1S4,
      wrongSentence: "Meeting opener",
      options: [
        "Let's kick off things to start.",
        "Let's kick things off.",
        "Let's kick the things off.",
      ],
      correctAnswer: "Let's kick things off.",
      successTitle: "Correto",
      successMessage: '"Let\'s kick things off" é natural e profissional.',
    },
  },
  {
    key: "hard-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt:
        "Ouça a palavra isolada e escolha a alternativa correta que você escutou.",
      image: BUB1.A1S5,
      audioSource: require("../../../../../mp3/BU/B1/A1S5.mp3"),
      audioDurationMs: 900,
      answerOptions: ["Hard", "Heart"],
      correctOption: "Hard",
      successTitle: "Correto",
      feedbackMessage: '"Hard" é a palavra usada em "hard stop".',
    },
  },
  {
    key: "objective-hard-stop-tip",
    component: Exercise17,
    activity: {
      label: "Objetivo Claro e Limite de Tempo",
      content: [
        `Depois de dar o pontapé inicial, um bom líder não diz apenas "Our goal is...". Para soar realmente avançado, use "The primary objective today is..." (O objetivo principal hoje é...). Além disso, para evitar que a reunião dure o dia todo, você deve estabelecer um limite inflexível logo no início dizendo: "We have a hard stop at 11 AM" (Temos um horário de término inegociável às 11h).`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "hard-stop-complete",
    component: Exercise5,
    activity: {
      prompt:
        "Tempo é valioso. Escolha a palavra certa para completar a frase do líder da reunião.",
      image: BUB1.A1S5,
      sentenceStart: "I know we have a lot to discuss, but we have a",
      sentenceEnd: "stop at 11:00 AM.",
      options: ["heavy", "hard"],
      correctAnswer: "hard",
      successTitle: "Correto",
      successMessage: '"Hard stop" indica um limite de tempo inegociável.',
    },
  },
  {
    key: "objective-spell",
    component: Exercise13,
    needsSpeech: true,
    activity: {
      prompt:
        'Organize as letras para formar a palavra que usamos em "Primary _________".',
      audioText: "Objective",
      audioDurationMs: 1200,
      letters: ["B", "J", "E", "C", "I", "O", "T", "V", "E"],
      correctWord: "OBJECTIVE",
      successTitle: "Correto",
      successMessage: "OBJECTIVE.",
    },
  },
  {
    key: "meeting-opening-complete",
    component: Exercise2,
    activity: {
      prompt:
        "Leia a abertura da reunião e preencha as lacunas com as alternativas corretas.",
      paragraphs: [
        [
          "Good morning everyone. To ",
          { id: "blank-1", options: ["kick", "start"], answer: "kick" },
          " things off, let's talk about our focus. The ",
          { id: "blank-2", options: ["primary", "prime"], answer: "primary" },
          " objective today is to solve the logistics delay. Please remember we have a ",
          { id: "blank-3", options: ["strong", "hard"], answer: "hard" },
          " stop at 10 AM, so let's focus on what is first on the docket.",
        ],
      ],
      successTitle: "Correto",
      successMessage: "Você combinou abertura, objetivo e limite de tempo.",
    },
  },
  {
    key: "chair-audio-true-false",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt:
        "Escute o áudio do Chair da reunião. A afirmação escrita é verdadeira ou falsa?",
      image: BUB1.A1S10,
      audioSource: require("../../../../../mp3/BU/B1/A1S10.mp3"),
      audioDurationMs: 6500,
      statement: "O líder da reunião pode ficar na sala até as 13:00h (1 PM).",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage:
        '"Noon" é meio-dia, e "hard stop" significa que ele sai exatamente nesse horário.',
    },
  },
  {
    key: "kick-objective-order",
    component: Exercise6,
    activity: {
      prompt:
        "Clique nas palavras na ordem correta para abrir a reunião e declarar o objetivo.",
      words: [
        "kick",
        "let's",
        "off",
        "things",
        ",",
        "objective",
        "our",
        "primary",
        "is",
        "sales",
      ],
      correctOrder: [
        "let's",
        "kick",
        "things",
        "off",
        ",",
        "our",
        "primary",
        "objective",
        "is",
        "sales",
      ],
      successTitle: "Correto",
      successMessage: "Let's kick things off, our primary objective is sales.",
    },
  },
  {
    key: "manager-room-audio",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        'Você é o gerente. Mande um áudio assumindo o controle da sala: use "kick things off", diga que "first on the docket" é o aplicativo Lingueto e avise que você tem um "hard stop" ao meio-dia.',
      helperText:
        "Let's kick things off. First on the docket is the Lingueto app. I have a hard stop at noon.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "Let's kick things off. First on the docket is the Lingueto app. I have a hard stop at noon.",
      recordLabel: "Gravar Áudio",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você abriu a reunião com autoridade.",
    },
  },
  {
    key: "setting-stage-feedback",
    component: Exercise17,
    activity: {
      label: "Great job managing the room!",
      content: [
        `Você acabou de assumir o controle total. Lembre-se: em inglês para negócios, a firmeza não é considerada grosseria, é considerada profissionalismo e eficiência. Quando você diz "We have a hard stop", você não está sendo rude, está respeitando o tempo de todos na mesa. Agora que você sabe abrir uma reunião, já está pronto para a Aula 2, onde aprendemos a gerenciar as distrações (Managing Digressions). Keep it up!`,
      ],
      continueLabel: "Finalizar",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
