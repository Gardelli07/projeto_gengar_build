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
    key: "on-airplane-intro",
    component: Exercise17,
    activity: {
      label: "On the Airplane",
      content: [
        'Welcome aboard! Você encontrou o seu assento, guardou a mala e o avião decolou. Daqui a pouco, o comissário de bordo vai passar com o carrinho de bebidas e comida. Nesta aula, você vai aprender o vocabulário clássico do avião e o "Coringa" secreto para pedir qualquer coisa em inglês sem parecer mal-educado!',
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "water-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A7S2,
      audioSource: require("../../../../../mp3/TR/A1/A7S2.mp3"),
      audioText: "Water",
      audioDurationMs: 1000,
      answerOptions: ["Water", "Window"],
      correctOption: "Water",
      successTitle: "Correto",
      feedbackMessage: "Water é água: essencial para se hidratar no voo.",
    },
  },
  {
    key: "chicken-pasta-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A7S3,
      audioSource: require("../../../../../mp3/TR/A1/A7S3.mp3"),
      audioText: "Chicken or pasta?",
      audioDurationMs: 1700,
      answerOptions: ["Chicken or pasta?", "Boarding pass?"],
      correctOption: "Chicken or pasta?",
      successTitle: "Correto",
      feedbackMessage:
        '"Chicken" é frango, e "Pasta" é macarrão.',
    },
  },
  {
    key: "can-i-have-tip",
    component: Exercise17,
    activity: {
      label: "Dica de Ouro",
      content: [
        `Em português, dizemos "Eu quero uma água". Em inglês, dizer "I want" soa muito rude, como se você estivesse dando uma ordem.

Para pedir qualquer coisa com educação, use a frase coringa:

"Can I have...?"

Exemplo perfeito: "Can I have water, please?"`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "coffee-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A7S5,
      audioSource: require("../../../../../mp3/TR/A1/A7S5.mp3"),
      audioText: "Coffee",
      audioDurationMs: 1000,
      answerOptions: ["Coffee", "Passport"],
      correctOption: "Coffee",
      successTitle: "Correto",
      feedbackMessage:
        'Você pode pedir "Coffee, please" ou "Can I have coffee?".',
    },
  },
  {
    key: "can-i-have-complete",
    component: Exercise5,
    activity: {
      prompt:
        "O carrinho chegou! Você quer pedir uma água para o comissário usando a frase coringa super educada. Complete:",
      image: TRA1.A7S2,
      sentenceStart: "Can I",
      sentenceEnd: "water, please?",
      options: ["have", "speak"],
      correctAnswer: "have",
      successTitle: "Correto",
      successMessage: "Can I have water, please?",
    },
  },
  {
    key: "chicken-please-true-false",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e responda: verdadeiro ou falso?",
      image: TRA1.A7S7,
      audioSource: require("../../../../../mp3/TR/A1/A7S7.mp3"),
      audioText: "Chicken, please.",
      audioDurationMs: 1400,
      statement: "O passageiro do áudio escolheu a opção de macarrão para o almoço.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage: '"Chicken" é frango, não macarrão.',
    },
  },
  {
    key: "airplane-service-match",
    component: Exercise1,
    activity: {
      prompt: "Conecte as palavras do serviço de bordo com suas traduções.",
      pairs: [
        { en: "Water", pt: "Água" },
        { en: "Chicken", pt: "Frango" },
        { en: "Pasta", pt: "Macarrão" },
      ],
      successTitle: "Correto",
      successMessage: "Vocabulário de bordo pronto para uso.",
    },
  },
  {
    key: "can-i-have-water-order",
    component: Exercise6,
    activity: {
      prompt: "Clique nas palavras para escrever a frase na ordem correta.",
      words: ["have", "water", "I", "Can", "?"],
      correctOrder: ["Can", "I", "have", "water", "?"],
      successTitle: "Correto",
      successMessage: "Can I have water?",
    },
  },
  {
    key: "water-polite-correct-sentence",
    component: Exercise4,
    activity: {
      prompt:
        "O comissário de bordo pergunta o que você quer beber. Qual é a forma correta e educada de pedir água?",
      image: TRA1.A7S2,
      wrongSentence: "Drink request",
      options: [
        "Give me water now.",
        "I want water.",
        "Can I have water, please?",
      ],
      correctAnswer: "Can I have water, please?",
      successTitle: "Correto",
      successMessage: '"Can I have..., please?" é educado e natural.',
    },
  },
  {
    key: "chicken-please-writing",
    component: Exercise12,
    activity: {
      prompt: "Writing",
      instruction:
        'O comissário parou ao seu lado e perguntou: "Chicken or pasta?". Digite a sua resposta escolhendo frango e lembrando de ser educado.',
      placeholder: "Chicken, please.",
      helperText: "Escolha chicken e use please.",
      tipText: "Chicken, please.",
      submitLabel: "Enviar",
      successTitle: "Correto",
      successMessage: "Chicken, please.",
    },
  },
  {
    key: "coffee-speaking",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        'Aperte para gravar e faça o seu pedido completo usando a frase coringa. Peça um café: "Can I have coffee, please?".',
      helperText: "Can I have coffee, please?",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Can I have coffee, please?",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você praticou um pedido educado no avião.",
    },
  },
  {
    key: "lesson-finish",
    type: "finish",
  },
];

export default createTravelLessonScreen(LESSON_SLIDES);
