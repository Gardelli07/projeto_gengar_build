import { Exercise1 } from "../../../../exc/ex1";
import { Exercise4 } from "../../../../exc/ex4";
import { Exercise7 } from "../../../../exc/ex7";
import { Exercise12 } from "../../../../exc/ex12";
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
    key: "requests-problems-intro",
    component: Exercise17,
    activity: {
      label: "Making Requests & Solving Problems",
      content: [
        "Você entrou no quarto, abriu a mala e foi tomar banho... mas cadê a toalha? Ou pior, o ar-condicionado não liga! Problemas acontecem em qualquer hotel do mundo. A boa notícia é que você não precisa saber consertar nada, só precisa saber avisar a recepção. Vamos aprender as frases de emergência para pedir coisas e relatar problemas.",
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "towel-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A14S2,
      audioSource: require("../../../../../mp3/TR/A1/A14S2.mp3"),
      audioDurationMs: 900,
      answerOptions: ["Towel", "Key"],
      correctOption: "Towel",
      successTitle: "Correto",
      feedbackMessage: '"Towel" significa toalha.',
    },
  },
  {
    key: "not-working-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A14S3,
      audioSource: require("../../../../../mp3/TR/A1/A14S3.mp3"),
      audioDurationMs: 1300,
      answerOptions: ["Not working", "Good morning"],
      correctOption: "Not working",
      successTitle: "Correto",
      feedbackMessage:
        '"Not working" é a frase coringa para dizer que algo não está funcionando.',
    },
  },
  {
    key: "need-tip",
    component: Exercise17,
    activity: {
      label: "Dica de Nativo",
      content: [
        `Se algo está quebrado, você já sabe: use "is not working".

Mas e se você só quiser pedir algo, como uma toalha extra? A forma mais fácil e direta no hotel é usar o verbo need. Diga: "I need a towel, please".`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "towel-dialogue-order",
    component: Exercise7,
    activity: {
      prompt:
        "Você ligou da cama para a recepção do hotel para pedir uma toalha. Clique nas frases para organizar o diálogo.",
      options: [
        "Hello, reception.",
        "Hi. I need a towel, please.",
        "Of course! We will send it to your room.",
        "Thank you.",
      ],
      correctOrder: [
        "Hello, reception.",
        "Hi. I need a towel, please.",
        "Of course! We will send it to your room.",
        "Thank you.",
      ],
      successTitle: "Correto",
      successMessage: "Você organizou um pedido educado na recepção.",
    },
  },
  {
    key: "problems-vocab",
    component: Exercise1,
    activity: {
      prompt:
        "Conecte o vocabulário para resolver os seus problemas no quarto.",
      pairs: [
        { en: "Towel", pt: "Toalha" },
        { en: "Need", pt: "Precisar" },
        { en: "Not working", pt: "Não está funcionando" },
      ],
      successTitle: "Correto",
      successMessage: "Vocabulário de emergência no hotel dominado.",
    },
  },
  {
    key: "towel-letters",
    component: Exercise13,
    activity: {
      prompt:
        'Como se escreve a palavra que salva o seu banho no hotel? Clique nas letras na ordem correta para formar a palavra "toalha" em inglês.',
      letters: ["e", "l", "t", "o", "w"],
      correctWord: "TOWEL",
      successTitle: "Correto",
      successMessage: "Towel significa toalha.",
    },
  },
  {
    key: "towel-listen-write",
    component: Exercise19,
    needsSpeech: true,
    activity: {
      prompt:
        "Escute o áudio do hóspede fazendo um pedido na recepção e escreva exatamente o que ele disse.",
      audioText: "I need a towel, please.",
      audioDurationMs: 1900,
      correctAnswer: "I need a towel, please.",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "I need a towel, please.",
      errorMessage: 'Confira a frase: "I need a towel, please."',
    },
  },
  {
    key: "tv-not-working-write-order",
    component: Exercise18,
    activity: {
      prompt:
        "Não clique, digite! As palavras da sua reclamação estão bagunçadas. Digite a frase na ordem correta para avisar que a TV quebrou.",
      scrambledSentence: "working / The / is / not / TV",
      correctAnswer: "The TV is not working.",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "The TV is not working.",
    },
  },
  {
    key: "shower-correct-sentence",
    component: Exercise4,
    activity: {
      prompt:
        "O chuveiro da sua suíte está com a água gelada. Como você avisa a recepção de forma correta?",
      image: TRA1.A14S3,
      wrongSentence: "Hotel problem",
      options: [
        "The shower is not working.",
        "I need a shower working.",
        "Shower no work.",
      ],
      correctAnswer: "The shower is not working.",
      successTitle: "Correto",
      successMessage: "The shower is not working.",
    },
  },
  {
    key: "ac-not-working-writing",
    component: Exercise12,
    activity: {
      prompt: "Writing",
      instruction:
        'Imagine que você está no quarto e o ar-condicionado (AC) parou do nada. Você abre o chat do hotel no seu celular. Digite em inglês: "O AC não está funcionando".',
      placeholder: "The AC is not working.",
      helperText: "Use: The AC is...",
      tipText: "The AC is not working.",
      submitLabel: "Enviar",
      successTitle: "Correto",
      successMessage: "The AC is not working.",
    },
  },
  {
    key: "towel-speaking",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        'Pegue o telefone do quarto, aperte para gravar e faça o seu pedido completo e educado. Diga: "Oi, eu preciso de uma toalha, por favor".',
      helperText: "Hi, I need a towel, please.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Hi, I need a towel, please.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você praticou um pedido educado para a recepção.",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createTravelLessonScreen(LESSON_SLIDES);
