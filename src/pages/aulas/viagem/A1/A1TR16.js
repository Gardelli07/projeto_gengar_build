import { Exercise1 } from "../../../../exc/ex1";
import { Exercise2 } from "../../../../exc/ex2";
import { Exercise3 } from "../../../../exc/ex3";
import { Exercise4 } from "../../../../exc/ex4";
import { Exercise13 } from "../../../../exc/ex13";
import { Exercise14 } from "../../../../exc/ex14";
import { Exercise16 } from "../../../../exc/ex16";
import { Exercise17 } from "../../../../exc/ex17";
import { Exercise18 } from "../../../../exc/ex18";
import { Images, TRA1 } from "../../../../util/images";
import createTravelLessonScreen from "./TravelLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "cafe-fast-food-intro",
    component: Exercise17,
    activity: {
      label: "At the Café / Fast Food",
      content: [
        'Bateu a fome? O jeito mais rápido e barato de comer durante a viagem é nos cafés e lanchonetes de balcão. Mas existe uma pergunta que eles fazem 100% das vezes e que trava muitos turistas. Nesta aula, você vai aprender a fazer o seu pedido básico e dominar a arte do "Para aqui ou para viagem?". Let\'s eat!',
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "espresso-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A16S2,
      audioSource: require("../../../../../mp3/TR/A1/A16S2.mp3"),
      audioDurationMs: 1100,
      answerOptions: ["Espresso", "Water"],
      correctOption: "Espresso",
      successTitle: "Correto",
      feedbackMessage: 'O "Espresso" é o clássico café forte e rápido.',
    },
  },
  {
    key: "drip-coffee-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A16S3,
      audioSource: require("../../../../../mp3/TR/A1/A16S3.mp3"),
      audioDurationMs: 1400,
      answerOptions: ["Drip coffee", "Espresso"],
      correctOption: "Drip coffee",
      successTitle: "Correto",
      feedbackMessage: '"Drip coffee" é café coado.',
    },
  },
  {
    key: "for-here-to-go-tip",
    component: Exercise17,
    activity: {
      label: "Dica de Nativo",
      content: [
        `Assim que você fizer o pedido no balcão, o atendente vai falar muito rápido: "For here or to go?"

For here: para consumir no local.
To go: para levar.

Decore isso, você vai ouvir todos os dias!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "to-go-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A16S5,
      audioSource: require("../../../../../mp3/TR/A1/A16S5.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["To go", "For here"],
      correctOption: "To go",
      successTitle: "Correto",
      feedbackMessage: '"To go" significa para levar.',
    },
  },
  {
    key: "drip-coffee-complete",
    component: Exercise2,
    activity: {
      prompt:
        "Você chegou na cafeteria logo de manhã. Você prefere um café coado. Complete o seu pedido usando a nossa frase coringa:",
      paragraphs: [
        [
          '"Can I have a',
          {
            id: "blank-1",
            answer: "drip coffee",
            options: ["drip coffee", "reservation"],
          },
          ', please?"',
        ],
      ],
      successTitle: "Correto",
      successMessage: "Can I have a drip coffee, please?",
    },
  },
  {
    key: "for-here-true-false",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e responda: verdadeiro ou falso?",
      image: TRA1.A16S7,
      audioSource: require("../../../../../mp3/TR/A1/A16S7.mp3"),
      audioDurationMs: 1400,
      statement:
        "O cliente do áudio está pedindo para colocar o lanche na embalagem para levar.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage: '"For here" significa para consumir no local.',
    },
  },
  {
    key: "coffee-letters",
    component: Exercise13,
    activity: {
      prompt:
        'Vamos garantir a escrita da bebida mais pedida do mundo. Clique nas letras na ordem certa para escrever "café" em inglês.',
      letters: ["f", "e", "f", "o", "e", "c"],
      correctWord: "COFFEE",
      successTitle: "Correto",
      successMessage: "Coffee significa café.",
    },
  },
  {
    key: "cafe-vocab",
    component: Exercise1,
    activity: {
      prompt: "Conecte o vocabulário da cafeteria com as traduções corretas.",
      pairs: [
        { en: "Drip coffee", pt: "Café coado" },
        { en: "For here", pt: "Para comer/beber aqui" },
        { en: "To go", pt: "Para levar" },
      ],
      successTitle: "Correto",
      successMessage: "Vocabulário de cafeteria dominado.",
    },
  },
  {
    key: "to-go-correct-sentence",
    component: Exercise4,
    activity: {
      prompt:
        'Você comprou um lanche no balcão e o caixa perguntou: "For here or to go?". Você quer comer no quarto do seu hotel. Como você responde corretamente?',
      image: TRA1.A16S5,
      wrongSentence: "For here or to go",
      options: ["For hotel.", "To go, please.", "For here, please."],
      correctAnswer: "To go, please.",
      successTitle: "Correto",
      successMessage: "To go, please.",
    },
  },
  {
    key: "drip-coffee-to-go-write",
    component: Exercise18,
    activity: {
      prompt:
        "Não clique, digite! As palavras estão bagunçadas. Escreva a frase na ordem certa para pedir o seu café coado para levar.",
      scrambledSentence: "coffee / to / a / go / Drip / , / please",
      correctAnswer: "Drip coffee to go, please",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "Drip coffee to go, please.",
    },
  },
  {
    key: "espresso-speaking",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        'Você está de frente para o caixa! Grave a sua voz e faça o pedido usando a frase coringa. Peça um café espresso para beber no local: "Can I have an espresso for here, please?".',
      helperText: "Can I have an espresso for here, please?",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Can I have an espresso for here, please?",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você praticou um pedido de cafeteria.",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createTravelLessonScreen(LESSON_SLIDES);
