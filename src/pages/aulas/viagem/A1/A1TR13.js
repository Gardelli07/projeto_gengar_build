import { Exercise2 } from "../../../../exc/ex2";
import { Exercise4 } from "../../../../exc/ex4";
import { Exercise8 } from "../../../../exc/ex8";
import { Exercise13 } from "../../../../exc/ex13";
import { Exercise14 } from "../../../../exc/ex14";
import { Exercise15 } from "../../../../exc/ex15";
import { Exercise16 } from "../../../../exc/ex16";
import { Exercise17 } from "../../../../exc/ex17";
import { Exercise18 } from "../../../../exc/ex18";
import { Exercise19 } from "../../../../exc/ex19";
import { Images, TRA1 } from "../../../../util/images";
import createTravelLessonScreen from "./TravelLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "hotel-amenities-intro",
    component: Exercise17,
    activity: {
      label: "Hotel Amenities",
      content: [
        "Você pegou a chave e o quarto é ótimo! Mas antes de subir e se jogar na cama, existem duas informações cruciais que você precisa perguntar na recepção para garantir a sua sobrevivência e felicidade: o café da manhã e a senha da internet! Vamos aprender a perguntar sobre essas duas comodidades essenciais.",
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "breakfast-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A13S2,
      audioSource: require("../../../../../mp3/TR/A1/A13S2.mp3"),
      audioDurationMs: 1200,
      answerOptions: ["Breakfast", "Dinner"],
      correctOption: "Breakfast",
      successTitle: "Correto",
      feedbackMessage:
        '"Breakfast" significa café da manhã, a refeição mais importante da viagem.',
    },
  },
  {
    key: "wifi-password-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A13S3,
      audioSource: require("../../../../../mp3/TR/A1/A13S3.mp3"),
      audioDurationMs: 1600,
      answerOptions: ["Wi-Fi password", "Room key"],
      correctOption: "Wi-Fi password",
      successTitle: "Correto",
      feedbackMessage: '"Password" significa senha.',
    },
  },
  {
    key: "amenities-question-tip",
    component: Exercise17,
    activity: {
      label: "Dica de Nativo",
      content: [
        `Para perguntar a senha, usamos o básico "What is...?"
Exemplo: "What is the Wi-Fi password?"

Para saber o horário do café, não use "What time is it?", que pergunta que horas são agora. Use: "What time is breakfast?"`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "amenities-image-match",
    component: Exercise15,
    activity: {
      prompt: "Clique na imagem e depois na palavra que a descreve.",
      images: [
        { id: "breakfast-img", image: TRA1.A13S2 },
        { id: "wifi-img", image: TRA1.A13S3 },
      ],
      words: [
        { id: "breakfast-word", label: "Breakfast" },
        { id: "wifi-word", label: "Wi-Fi password" },
      ],
      pairs: [
        { imageId: "breakfast-img", wordId: "breakfast-word" },
        { imageId: "wifi-img", wordId: "wifi-word" },
      ],
      successTitle: "Correto",
      successMessage:
        "Breakfast é café da manhã; Wi-Fi password é senha do Wi-Fi.",
    },
  },
  {
    key: "breakfast-image-choice",
    component: Exercise8,
    activity: {
      prompt: "Olhe para a placa do hotel na imagem. Que refeição é essa?",
      image: TRA1.A13S2,
      options: ["Breakfast", "Dinner"],
      correctAnswer: "Breakfast",
      successTitle: "Correto",
      successMessage: "Breakfast é o café da manhã.",
    },
  },
  {
    key: "wifi-password-complete",
    component: Exercise2,
    activity: {
      prompt: "Complete o pequeno diálogo na recepção do hotel:",
      paragraphs: [
        [
          '"Excuse me. What is the Wi-Fi',
          {
            id: "blank-1",
            answer: "password",
            options: ["password", "passport"],
          },
          '?"',
        ],
        ['"It\'s: hotel123."'],
      ],
      successTitle: "Correto",
      successMessage: "What is the Wi-Fi password?",
    },
  },
  {
    key: "password-letters",
    component: Exercise13,
    activity: {
      prompt:
        'Coloque as letras na ordem para descobrir como se escreve a palavra que usamos para "senha" em inglês.',
      letters: ["p", "a", "s", "s", "w", "o", "r", "d"],
      correctWord: "PASSWORD",
      successTitle: "Correto",
      successMessage: "Password significa senha.",
    },
  },
  {
    key: "breakfast-listen-write",
    component: Exercise19,
    needsSpeech: true,
    activity: {
      prompt:
        "Ouça com atenção e escreva exatamente a pergunta que o hóspede fez para o recepcionista.",
      audioSource: require("../../../../../mp3/TR/A1/A13S9.mp3"),
      audioDurationMs: 1800,
      correctAnswer: "What time is breakfast?",
      placeholder: "Digite a pergunta",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "What time is breakfast?",
      errorMessage: 'Confira a pergunta: "What time is breakfast?"',
    },
  },
  {
    key: "wifi-correct-sentence",
    component: Exercise4,
    activity: {
      prompt:
        "Você pegou a sua chave e quer pedir a senha da internet. Qual é a pergunta correta e educada?",
      image: TRA1.A13S3,
      wrongSentence: "Wi-Fi password question",
      options: [
        "Give me password Wi-Fi.",
        "What is the Wi-Fi password?",
        "Wi-Fi password, what?",
      ],
      correctAnswer: "What is the Wi-Fi password?",
      successTitle: "Correto",
      successMessage: "What is the Wi-Fi password?",
    },
  },
  {
    key: "breakfast-write-order",
    component: Exercise18,
    activity: {
      prompt:
        "Não clique, digite! As palavras da pergunta abaixo estão bagunçadas. Digite a frase na ordem correta para perguntar o horário do café.",
      scrambledSentence: "is / breakfast / time / What / ?",
      correctAnswer: "What time is breakfast?",
      placeholder: "Digite a pergunta",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "What time is breakfast?",
    },
  },
  {
    key: "wifi-speaking",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        'Imagine que a recepcionista acabou de te dar as boas-vindas. Grave um áudio fazendo a pergunta de ouro para conseguir postar suas fotos: "Qual é a senha do Wi-Fi?".',
      helperText: "What is the Wi-Fi password?",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "What is the Wi-Fi password?",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você praticou o pedido da senha do Wi-Fi.",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createTravelLessonScreen(LESSON_SLIDES);
