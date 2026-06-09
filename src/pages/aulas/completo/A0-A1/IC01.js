import createLessonScreen from "../../LessonScreen";
import { ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "/blue{Observe a cena}",
        ICA1.slide1,
        `Como você iniciaria uma conversa aqui?`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A1S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/hello.mp3"),
      audioDurationMs: 824,
      answerOptions: ["Hello", "High"],
      correctOption: "Hello",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "Hello" para dizer "olá".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A1S3,
      audioSource: require("../../../../../mp3/IC/A0-A1/Hi.mp3"),
      audioDurationMs: 782,
      answerOptions: ["Hello", "Hi"],
      correctOption: "Hi",
      audioRate: 0.85,
      successTitle: "Correto",
      feedbackMessage: 'Usamos "Hi" para dizer "oi".',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: `/blueHello é o seu curinga. Ele funciona com o seu chefe, com um médico ou com um desconhecido.
É seguro e educado. /blueHi é um degrau abaixo na formalidade, use com colegas e pessoas que você já viu antes.`,
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise1",
    activity: {
      prompt: "Encontre a tradução",
      pairs: [
        { en: "Hello", pt: "olá" },
        { en: "Hi", pt: "oi" },
      ],
      successTitle: "Excelente",
      successMessage: "Você acertou todas as traduções.",
    },
  },
  {
    component: "Exercise15",
    activity: {
      prompt: "Clique na imagem e na palavra",
      images: [
        { id: "meeting", image: ICA1.slide6 },
        { id: "phone", image: ICA1.slide6p2 },
      ],
      words: [
        { id: "meeting-word", label: "Hello" },
        { id: "phone-word", label: "Hi" },
      ],
      pairs: [
        { imageId: "meeting", wordId: "meeting-word" },
        { imageId: "phone", wordId: "phone-word" },
      ],
      successTitle: "Correto",
      successMessage: "Você formou os dois pares corretamente.",
    },
  },
  {
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt: "Escreva a palavra",
      audioSource: require("../../../../../mp3/IC/A0-A1/hello.mp3"),
      audioDurationMs: 824,
      letters: ["H", "E", "L", "L", "O"],
      correctWord: "HELLO",
      successTitle: "Correto",
      successMessage: 'A palavra correta é "HELLO".',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: `/blueAtenção: Em muitos países de língua inglesa, não dizer nada ao entrar em um elevador ou loja pode parecer rude.
Um simples /blueHello acompanhado de um sorriso é a chave para ser bem recebido em qualquer lugar!.`,
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise4",
    activity: {
      prompt: "Corrija",
      image: ICA1.slide6,
      wrongSentence: "x! I need help.",
      options: ["Hey! I need help.", "Hello! I need help."],
      correctAnswer: "Hello! I need help.",
      successTitle: "Correto",
      successMessage: 'A forma correta é "Hello! I need help."',
    },
  },
  {
    component: "Exercise5",
    activity: {
      prompt: "Complete a frase",
      image: ICA1.A1S10,
      sentenceStart: "",
      sentenceEnd: ", my name is Jake.",
      options: ["Hello", "Goodbye"],
      correctAnswer: "Hello",
      successTitle: "Correto",
      successMessage: 'A forma correta é "Hello, my name is Jake."',
    },
  },
  {
    component: "Exercise6",
    needsSpeech: true,
    activity: {
      prompt: "Coloque a frase em ordem.",
      image: Images.teacher,
      words: ["Hello", "name's", "my", "Jake"],
      correctOrder: ["Hello", "my", "name's", "Jake"],
      audioRate: 0.85,
      successTitle: "Correto",
      successMessage: `A frase correta é "Hello, my name's Jake."`,
    },
  },
  {
    component: "Exercise12",
    activity: {
      prompt: "Write your introduction",
      instruction: "Escreva brevemente sobre você em inglês.",
      helperText:
        "Imagine que você está enviando um convite no LinkedIn para um recrutador. Escreva a primeira palavra da sua mensagem.",
      placeholder: "...",
      tipText: "Hello.",
      minLength: 3,
      successTitle: "Correto",
      successMessage: "Seu texto foi preenchido com sucesso.",
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: `/blue{Mandou muito bem na estreia!}? 
      
Dica final: O /blue{'H'} em inglês tem som de um suspiro, como se você estivesse embaçando um vidro.
Tente de novo: Hhh-ello. 

Vejo você na aula 2 para descobrirmos o tom informal do Hey!.`,
      continueLabel: "Continuar",
    },
  },

  {
    key: "lesson-finish",
    type: "finish",
  },
];

export default createLessonScreen(LESSON_SLIDES, {
  storageKey: "@progesso_ingles_completo_A0-A1",
  nextRouteName: "Inglescompleto",
  screenName: "InglesCompletoA0A1LessonScreen",
});
