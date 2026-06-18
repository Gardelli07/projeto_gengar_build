import { Exercise1 } from "../../../../exc/ex1";
import { Exercise2 } from "../../../../exc/ex2";
import { Exercise3 } from "../../../../exc/ex3";
import { Exercise4 } from "../../../../exc/ex4";
import { Exercise13 } from "../../../../exc/ex13";
import { Exercise14 } from "../../../../exc/ex14";
import { Exercise16 } from "../../../../exc/ex16";
import { Exercise17 } from "../../../../exc/ex17";
import { Exercise18 } from "../../../../exc/ex18";
import { Exercise19 } from "../../../../exc/ex19";
import { Images, TRA1 } from "../../../../util/images";
import createTravelLessonScreen from "./TravelLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "checking-in-intro",
    component: Exercise17,
    activity: {
      label: "Checking In",
      content: [
        "Welcome to the hotel! Chegar no hotel depois de um longo dia de viagem e pegar a chave do quarto é a melhor sensação do mundo. Para que tudo ocorra de forma tranquila, você só precisa de 3 coisas: saber dizer que tem uma reserva, pegar sua chave e não se assustar quando pedirem o cartão de crédito. Vamos ao check-in!",
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "reservation-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A12S2,
      audioSource: require("../../../../../mp3/TR/A1/A12S2.mp3"),
      audioDurationMs: 1200,
      answerOptions: ["Reservation", "Exit"],
      correctOption: "Reservation",
      successTitle: "Correto",
      feedbackMessage:
        '"Reservation" significa reserva. A frase de ouro é: "I have a reservation".',
    },
  },
  {
    key: "key-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A12S3,
      audioSource: require("../../../../../mp3/TR/A1/A12S3.mp3"),
      audioDurationMs: 900,
      answerOptions: ["Key", "Bag"],
      correctOption: "Key",
      successTitle: "Correto",
      feedbackMessage:
        '"Key" significa chave. No hotel, ela pode ser um cartão magnético.',
    },
  },
  {
    key: "credit-card-tip",
    component: Exercise17,
    activity: {
      label: "Dica de Nativo",
      content: [
        `Muitos brasileiros tomam um susto no check-in porque, mesmo com o hotel já pago no Brasil, o recepcionista pede o seu "Credit card".

Não entre em pânico! Eles fazem isso como um deposit, uma caução de segurança caso você consuma algo do frigobar. Se você não usar nada, o valor nunca será cobrado!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "reservation-complete-text",
    component: Exercise2,
    activity: {
      prompt:
        "Você chegou ao balcão, entregou seu passaporte e agora precisa avisar sobre a sua estadia. Complete a frase:",
      paragraphs: [
        [
          '"Hello! I have a',
          {
            id: "blank-1",
            answer: "reservation",
            options: ["reservation", "key"],
          },
          '."',
        ],
      ],
      successTitle: "Correto",
      successMessage: "Hello! I have a reservation.",
    },
  },
  {
    key: "key-letters",
    component: Exercise13,
    activity: {
      prompt:
        'O recepcionista está prestes a te entregar o acesso ao quarto. Coloque as letras na ordem para formar a palavra "chave" em inglês.',
      letters: ["y", "k", "e"],
      correctWord: "KEY",
      successTitle: "Correto",
      successMessage: "Key significa chave.",
    },
  },
  {
    key: "key-true-false",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e responda: verdadeiro ou falso?",
      image: TRA1.A12S7,
      audioSource: require("../../../../../mp3/TR/A1/A12S7.mp3"),
      audioDurationMs: 1500,
      statement:
        "O recepcionista do áudio está pedindo para ver o seu passaporte.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage: 'Ele disse: "Here is your key."',
    },
  },
  {
    key: "reservation-write-order",
    component: Exercise18,
    activity: {
      prompt:
        "Não clique, digite! As palavras da sua frase principal estão bagunçadas. Digite a frase na ordem correta para garantir o seu quarto.",
      scrambledSentence: "have / a / I / reservation",
      correctAnswer: "I have a reservation",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "I have a reservation.",
    },
  },
  {
    key: "reservation-listen-write",
    component: Exercise19,
    needsSpeech: true,
    activity: {
      prompt:
        "Ouça o áudio com atenção e escreva exatamente a frase que o hóspede usou para falar da reserva.",
      audioSource: require("../../../../../mp3/TR/A1/A12S9.mp3"),
      audioDurationMs: 1800,
      correctAnswer: "I have a reservation.",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "I have a reservation.",
      errorMessage: 'Confira a frase: "I have a reservation."',
    },
  },
  {
    key: "reservation-correct-sentence",
    component: Exercise4,
    activity: {
      prompt:
        'O recepcionista sorri e diz "Good evening". Qual é a forma correta e natural de responder dizendo que você tem uma reserva?',
      image: TRA1.A12S2,
      wrongSentence: "Reservation check-in",
      options: [
        "My reservation here.",
        "I have a reservation.",
        "Want reservation now.",
      ],
      correctAnswer: "I have a reservation.",
      successTitle: "Correto",
      successMessage: "I have a reservation.",
    },
  },
  {
    key: "check-in-vocab",
    component: Exercise1,
    activity: {
      prompt: "Conecte o vocabulário de check-in com as suas traduções.",
      pairs: [
        { en: "Reservation", pt: "Reserva" },
        { en: "Key", pt: "Chave" },
        { en: "Credit card", pt: "Cartão de crédito" },
      ],
      successTitle: "Correto",
      successMessage: "Vocabulário de check-in revisado.",
    },
  },
  {
    key: "reservation-speaking",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        'Aperte para gravar e fale com naturalidade e confiança a frase que garante a sua estadia: "I have a reservation".',
      helperText: "I have a reservation.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "I have a reservation.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você praticou a frase de check-in.",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createTravelLessonScreen(LESSON_SLIDES);
