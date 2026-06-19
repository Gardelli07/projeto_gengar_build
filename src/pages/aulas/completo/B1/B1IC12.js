import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "pro-advice-tip",
    component: "Exercise17",
    activity: {
      label: "Pro Advice!",
      content: [
        `Quando um amigo te pede um conselho, você pode dizer "You should..." (Você deveria...).

Mas se você quiser soar como um verdadeiro nativo dando um conselho de ouro, use:

"If I were you, I would..."

é uma forma super educada e natural de ajudar alguém.

Let's practice!`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "advice-advise",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e escolha a palavra correta.",
      image: ICB1.A12S2,
      audioSource: require("../../../../../mp3/IC/B1/A12S2.mp3"),
      audioDurationMs: 900,
      answerOptions: ["Advice", "Advise"],
      correctOption: "Advice",
      successTitle: "Correto",
      feedbackMessage:
        '"Advice" é o substantivo: conselho. "Advise" é o verbo: aconselhar.',
    },
  },
  {
    key: "perfect-brew-were",
    component: "Exercise5",
    activity: {
      prompt: "Complete a frase",
      sentenceStart: "If I",
      sentenceEnd: "you, I would buy a Perfect Brew machine for the office.",
      options: ["was", "were"],
      correctAnswer: "were",
      successTitle: "Correto",
      successMessage: 'Para conselho formal e correto, use "If I were you".',
    },
  },
  {
    key: "problem-advice-match",
    component: "Exercise1",
    activity: {
      prompt: "Conecte o problema com o melhor conselho.",
      pairs: [
        {
          en: "I am always tired.",
          pt: "If I were you, I would sleep more.",
        },
        {
          en: "I want to learn English.",
          pt: "If I were you, I would use Lingueto.",
        },
        {
          en: "I am cold.",
          pt: "If I were you, I would put on a jacket.",
        },
      ],
      successTitle: "Excelente",
      successMessage: "Você conectou os conselhos corretamente.",
    },
  },
  {
    key: "type-advice-sentence",
    component: "Exercise18",
    activity: {
      prompt: "As palavras estão bagunçadas. Digite a frase corretamente.",
      scrambledSentence: "/ you / would / If / were / I / study / I /",
      correctAnswer: "If I were you, I would study.",
      placeholder: "Digite a frase correta",
      submitLabel: "Enviar",
      errorTitle: "Incorreto",
      successTitle: "Correto",
      successMessage: "A frase correta é: If I were you, I would study.",
    },
  },
  {
    key: "dialog-order-phone",
    component: "Exercise7",
    activity: {
      prompt: "Coloque o diálogo na ordem correta.",
      options: [
        "Hey! I have a big problem. I lost my phone.",
        "If I were you, I would call the police.",
        "What should I do?",
        "Oh no! That's terrible.",
      ],
      correctOrder: [
        "Hey! I have a big problem. I lost my phone.",
        "Oh no! That's terrible.",
        "What should I do?",
        "If I were you, I would call the police.",
      ],
      successTitle: "Correto",
      successMessage: "Você organizou o diálogo de conselho corretamente.",
    },
  },
  {
    key: "audio-youtube-advice",
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction:
        'Um amigo disse: "I want to start a YouTube channel, but I\'m shy."',
      helperText:
        'Mande um áudio dando um conselho começando com: "If I were you, I would..."',
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "If I were you, I would start with short videos and practice every week.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Seu conselho em áudio foi gravado com sucesso.",
    },
  },
  {
    key: "fast-fingers-tip",
    component: "Exercise17",
    activity: {
      label: "Fast Fingers!",
      content: [
        `Excelente! Agora vamos treinar a sua memória visual e velocidade.

Na próxima tela, você terá 5 segundos para digitar cada palavra que usamos muito para dar conselhos.

Ready?`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "fast-fingers",
    component: "Exercise11",
    activity: {
      prompt: "Escreva rápido",
      secondsPerWord: 5,
      words: ["ADVICE", "WERE", "WOULD", "FRIEND", "LISTEN"],
      successTitle: "Correto",
      successMessage: "Você digitou as palavras de conselho no tempo certo.",
    },
  },
  {
    key: "lesson-finish",
    type: "finish",
  },
];

export default createLessonScreen(LESSON_SLIDES, {
  storageKey: "@progesso_ingles_completo_B1",
  nextRouteName: "InglescompletoB1",
  screenName: "InglesCompletoB1LessonScreen",
});
