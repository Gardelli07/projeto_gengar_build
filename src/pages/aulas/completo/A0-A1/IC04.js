import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `A conversa acabou e você está saindo.`,

        ICA1.A4S1,

        ` Qual é a primeira palavra que vem à sua mente para encerrar o encontro?`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A4S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A4S2.mp3"),
      audioDurationMs: 600,
      answerOptions: ["Goodbye ", "Goodbuy"],
      correctOption: "Goodbye ",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "Goodbye" para dizer "Adeus".',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `/blueGoodbye é a forma completa e mais formal. No dia a dia, quase todo mundo usa apenas o /blueBye. É curto, prático e funciona em 99% das situações. Guarde o 'Goodbye' para momentos mais sérios ou quando você não veré a pessoa por um longo tempo. `,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise1",
    activity: {
      prompt: "Encontre a tradução",
      pairs: [
        { en: "Goodbye", pt: "Adeus/Tchau (formal)" },
        { en: "Bye", pt: "Tchau" },
        { en: "See you", pt: "A gente se vê" },
      ],
      successTitle: "Excelente",
      successMessage: "Você acertou todas as traduções.",
    },
  },
  {
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt: "Escreva a palavra",
      audioSource: require("../../../../../mp3/IC/A0-A1/A4S5.mp3"),
      audioDurationMs: 1000,
      letters: ["S", "E", "E", "Y", "O", "U"],
      correctWord: "SEEYOU",
      successTitle: "Correto",
      successMessage: 'A palavra correta é "SEE YOU".',
    },
  },
  {
    component: "Exercise15",
    activity: {
      prompt: "Clique na imagem e na palavra",
      images: [
        { id: "img1", image: ICA1.A4S6 },
        { id: "img2", image: ICA1.A4S6p2 },
      ],
      words: [
        { id: "test1", label: "Goodbye" },
        { id: "test2", label: "See you" },
      ],
      pairs: [
        { imageId: "img1", wordId: "test1" },
        { imageId: "img2", wordId: "test2" },
      ],
      successTitle: "Correto",
      successMessage: "Você formou os dois pares corretamente.",
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `Dica Cultural: Os nativos adoram economizar energia! Na fala rápida, o 'See you' vira frequentemente /blue{See ya}. É super informal e mostra que você está relaxado. Tente usar com seus amigos! `,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise4",
    activity: {
      prompt: "Corrija",
      image: ICA1.A4S8,
      wrongSentence:
        "Você está saindo do escritório e verá seus colegas amanhã.",
      options: ["Goodbye forever, colleagues.", "Bye! See you tomorrow."],
      correctAnswer: "Bye! See you tomorrow.",
      successTitle: "Correto",
      successMessage: 'A forma correta é "Bye! See you tomorrow"',
    },
  },
  {
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Escute e responda",
      image: ICA1.A4S8,
      audioSource: require("../../../../../mp3/IC/A0-A1/A4S9.mp3"),
      audioDurationMs: 3000,
      dialogue: "As pessoas no áudio provavelmente são amigas ou conhecidas.",
      options: ["true", "false"],
      correctAnswer: "true",
      successTitle: "Correto",
      successMessage:
        'Verdadeiro! O uso de "See ya" e o primeiro nome indica proximidade',
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Coloque a frase em ordem.",
      words: ["see", "tomorrow", "bye,", "you"],
      correctOrder: ["bye,", "see", "you", "tomorrow"],
      successTitle: "Correto",
      successMessage: `A frase correta é "Bye, see you tomorrow".`,
    },
  },
  {
    component: "Exercise12",
    activity: {
      prompt: "Write your introduction",
      instruction: "Escreva brevemente sobre você em inglês.",
      helperText:
        "Você está saindo de uma aula de inglês. Escreva uma mensagem curta para o seu professor se despedindo de forma educada.",
      placeholder: "Hello...",
      tipText: "'Goodbye, teacher!' ou 'Bye! See you next class.'",
      minLength: 3,
      successTitle: "Correto",
      successMessage: "Seu texto foi preenchido com sucesso.",
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `Incrível! Você concluiu o primeiro módulo de conexões sociais!  
Uma última dica: se quiser soar extra gentil, diga /blue{'Take care'} (Se cuide). é uma forma carinhosa de encerrar qualquer conversa. 
Agora, como dizemos no Lingueto: See you in the next module! `,
      ],
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
