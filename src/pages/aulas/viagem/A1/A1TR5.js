import { Exercise1 } from "../../../../exc/ex1";
import { Exercise20 } from "../../../../exc/ex20";
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
    key: "check-in-desk-intro",
    component: Exercise17,
    activity: {
      label: "At the Check-in Desk",
      content: [
        "Welcome to the airport! A primeira parada obrigatória de qualquer viagem internacional é o balcão de check-in. É lá que você vai despachar sua mala, entregar seu documento e escolher o seu assento no avião. Respire fundo, abra aquele sorriso que você treinou no Módulo 1 e vamos aprender as palavras-chave para passar por essa etapa sem suar frio!",
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "passport-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A5S2,
      audioSource: require("../../../../../mp3/TR/A1/A5S2.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Passport", "Money"],
      correctOption: "Passport",
      successTitle: "Correto",
      feedbackMessage:
        'Seu documento número um. Você pode ouvir: "Your passport, please?"',
    },
  },
  {
    key: "bag-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A5S3,
      audioSource: require("../../../../../mp3/TR/A1/A5S3.mp3"),
      audioDurationMs: 900,
      answerOptions: ["Bag", "Passport"],
      correctOption: "Bag",
      successTitle: "Correto",
      feedbackMessage:
        '"Bag" é curto, fácil e muito comum para se referir à sua mala.',
    },
  },
  {
    key: "seat-battle-tip",
    component: Exercise17,
    activity: {
      label: "Dica de Nativo",
      content: [
        `Depois de pegar seu passaporte, o atendente pode perguntar onde você quer sentar. Você precisa conhecer estas duas palavras:

Window: janela. Ótimo para dormir ou ver a paisagem.

Aisle: corredor. Ótimo para esticar as pernas e ir ao banheiro sem pedir licença.

Atenção: "Aisle" se pronuncia "ÁIL". O "S" é mudo!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "window-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A5S5,
      audioSource: require("../../../../../mp3/TR/A1/A5S5.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Window", "Aisle"],
      correctOption: "Window",
      successTitle: "Correto",
      feedbackMessage: 'Para pedir o assento, diga: "Window, please".',
    },
  },
  {
    key: "aisle-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A5S6,
      audioSource: require("../../../../../mp3/TR/A1/A5S6.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Aisle", "Window"],
      correctOption: "Aisle",
      successTitle: "Correto",
      feedbackMessage: 'Lembre-se da pronúncia: "Áil". Aisle é corredor.',
    },
  },
  {
    key: "here-is-passport-complete",
    component: Exercise5,
    activity: {
      prompt:
        'O atendente do aeroporto diz "Hello! Passport, please?". Você entrega o documento e diz:',
      image: TRA1.A5S2,
      sentenceStart: "Here is my",
      sentenceEnd: ".",
      options: ["passport", "bag"],
      correctAnswer: "passport",
      successTitle: "Correto",
      successMessage: "Here is my passport.",
    },
  },
  {
    key: "aisle-please-true-false",
    component: Exercise20,
    activity: {
      prompt: "Observe e responda: verdadeiro ou falso?",
      image: TRA1.A5S8,
      statement: 'A frase "Aisle, please." pede para sentar na janela.',
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage: '"Aisle" é corredor, não janela.',
    },
  },
  {
    key: "check-in-vocab-match",
    component: Exercise1,
    activity: {
      prompt: "Conecte o vocabulário de check-in com as traduções.",
      pairs: [
        { en: "Passport", pt: "Passaporte" },
        { en: "Window", pt: "Janela" },
        { en: "Aisle", pt: "Corredor" },
      ],
      successTitle: "Correto",
      successMessage: "Vocabulário de check-in dominado.",
    },
  },
  {
    key: "here-is-passport-order",
    component: Exercise6,
    activity: {
      prompt: "Clique nas palavras para escrever a frase na ordem correta.",
      words: ["my", "Here", "is", "passport"],
      correctOrder: ["Here", "is", "my", "passport"],
      successTitle: "Correto",
      successMessage: "Here is my passport.",
    },
  },
  {
    key: "window-please-writing",
    component: Exercise12,
    activity: {
      prompt: "Writing",
      instruction:
        'O atendente pergunta onde você quer sentar. Digite em inglês como você pediria um lugar na "Janela, por favor".',
      placeholder: "Window, please",
      helperText: "Use a palavra do assento e please.",
      tipText: "Window, please",
      submitLabel: "Enviar",
      successTitle: "Correto",
      successMessage: "Window, please.",
    },
  },
  {
    key: "here-is-passport-speaking",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        'Imagine que você está entregando o seu documento no balcão agora mesmo. Fale com naturalidade a frase: "Aqui está meu passaporte" em inglês.',
      helperText: "Here is my passport.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Here is my passport.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você praticou a frase do balcão de check-in.",
    },
  },
  {
    key: "lesson-finish",
    type: "finish",
  },
];

export default createTravelLessonScreen(LESSON_SLIDES);
