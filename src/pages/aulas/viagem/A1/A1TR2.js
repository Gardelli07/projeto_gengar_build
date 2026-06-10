import { Exercise1 } from "../../../../exc/ex1";
import { Exercise3 } from "../../../../exc/ex3";
import { Exercise4 } from "../../../../exc/ex4";
import { Exercise5 } from "../../../../exc/ex5";
import { Exercise6 } from "../../../../exc/ex6";
import { Exercise12 } from "../../../../exc/ex12";
import { Exercise14 } from "../../../../exc/ex14";
import { Exercise16 } from "../../../../exc/ex16";
import { Exercise17 } from "../../../../exc/ex17";
import { Images, TRA1 } from "../../../../util/images";
import createTravelLessonScreen from "./TravelLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "magic-words-intro",
    component: Exercise17,
    activity: {
      label: "The Magic Words",
      content: [
        'Welcome back! Em uma viagem internacional, é normal o atendente falar muito rápido ou usar palavras que você não conhece. Não precisa entrar em pânico! Hoje você vai aprender as suas "frases de resgate": como dizer que não entendeu, pedir para falarem devagar e até descobrir se alguém ali fala português!',
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "dont-understand-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A2S2,
      audioSource: require("../../../../../mp3/TR/A1/A2S2.mp3"),
      audioDurationMs: 1600,
      answerOptions: ["I don't understand", "I understand"],
      correctOption: "I don't understand",
      successTitle: "Correto",
      feedbackMessage: '"I don\'t understand" significa "Eu não entendo".',
    },
  },
  {
    key: "speak-slowly-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A2S3,
      audioSource: require("../../../../../mp3/TR/A1/A2S3.mp3"),
      audioDurationMs: 2400,
      answerOptions: [
        "Can you speak slowly, please?",
        "Can you speak fast, please?",
      ],
      correctOption: "Can you speak slowly, please?",
      successTitle: "Correto",
      feedbackMessage:
        '"Slowly" significa devagar. Com "please", o pedido fica educado.',
    },
  },
  {
    key: "rescue-phrases-tip",
    component: Exercise17,
    activity: {
      label: "Dica de Nativo",
      content: [
        `Você pode (e deve!) juntar o que aprendeu na Aula 1 com o que está aprendendo agora.

O atendente falou algo e você não pegou? Sorria e diga:

"Sorry, I don't understand. Can you speak slowly, please?"

Isso resolve 90% dos problemas de comunicação!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "understand-complete",
    component: Exercise5,
    activity: {
      prompt:
        "O fiscal do aeroporto fez uma pergunta muito rápida e você não compreendeu. O que você diz?",
      sentenceStart: "Sorry, I don't",
      sentenceEnd: ".",
      options: ["understand", "morning"],
      correctAnswer: "understand",
      successTitle: "Correto",
      successMessage: 'A frase de resgate é "Sorry, I don\'t understand."',
    },
  },
  {
    key: "portuguese-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A2S6,
      audioSource: require("../../../../../mp3/TR/A1/A2S6.mp3"),
      audioDurationMs: 2000,
      answerOptions: ["Do you speak Portuguese?", "Do you speak English?"],
      correctOption: "Do you speak Portuguese?",
      successTitle: "Correto",
      feedbackMessage:
        "Não custa nada perguntar se alguém fala português em lugares turísticos.",
    },
  },
  {
    key: "portuguese-order",
    component: Exercise6,
    activity: {
      prompt: "Clique nas palavras para escrever a frase na ordem correta.",
      image: TRA1.A2S6,
      words: ["you", "Portuguese", "speak", "Do", "?"],
      correctOrder: ["Do", "you", "speak", "Portuguese", "?"],
      successTitle: "Correto",
      successMessage: "Do you speak Portuguese?",
    },
  },
  {
    key: "speak-slowly-true-false",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e responda: verdadeiro ou falso?",
      image: TRA1.A2S8,
      audioSource: require("../../../../../mp3/TR/A1/A2S8.mp3"),
      audioDurationMs: 2400,
      statement: "A pessoa do áudio está pedindo para você falar mais rápido.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage: '"Slowly" quer dizer devagar, não rápido.',
    },
  },
  {
    key: "survival-vocabulary-match",
    component: Exercise1,
    activity: {
      prompt: "Conecte o vocabulário de sobrevivência com suas traduções.",
      pairs: [
        { en: "Understand", pt: "Entender" },
        { en: "Slowly", pt: "Devagar" },
        { en: "Speak", pt: "Falar" },
      ],
      successTitle: "Correto",
      successMessage: "Essas palavras salvam conversas em viagens.",
    },
  },
  {
    key: "speak-slowly-correct-sentence",
    component: Exercise4,
    activity: {
      prompt:
        "Qual é a maneira correta e educada de pedir para o recepcionista do hotel falar mais devagar?",
      image: TRA1.A2S3,
      wrongSentence: "Speak slowly",
      options: [
        "Speak slowly now.",
        "Can you speak slowly, please?",
        "You speak slow.",
      ],
      correctAnswer: "Can you speak slowly, please?",
      successTitle: "Correto",
      successMessage: 'Use "Can you..." e "please" para soar educado.',
    },
  },
  {
    key: "portuguese-writing",
    component: Exercise12,
    activity: {
      prompt: "Writing",
      instruction:
        'Você está em uma loja no exterior e quer saber se o vendedor sabe falar a sua língua. Escreva em inglês a pergunta: "Você fala português?"',
      placeholder: "Do you speak Portuguese?",
      helperText: "Comece com Do you...",
      tipText: "Do you speak Portuguese?",
      submitLabel: "Enviar",
      successTitle: "Correto",
      successMessage: "Pergunta essencial para situações de viagem.",
    },
  },
  {
    key: "dont-understand-speaking",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        "O garçom falou os pratos do dia muito rápido. Grave um áudio pedindo desculpas primeiro (Sorry) e dizendo que você não entende.",
      helperText: "Sorry, I don't understand.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Sorry, I don't understand.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você praticou a frase de resgate mais importante.",
    },
  },
  {
    key: "lesson-finish",
    type: "finish",
  },
];

export default createTravelLessonScreen(LESSON_SLIDES);
