import { Images, TRA1 } from "../../../../util/images";
import createTravelLessonScreen from "./TravelLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "help-emergencies-intro",
    component: "Exercise17",
    activity: {
      label: "Help & Emergencies",
      content: [
        "Safety First! Em uma emergência real, a última coisa que você quer é tentar lembrar de gramática complexa. Você precisa de palavras curtas, rápidas e que chamem a atenção. Nesta aula, vamos aprender a pedir ajuda, pedir por um médico e saber como perguntar pelo hospital mais próximo.",
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "help-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A26S2,
      audioSource: require("../../../../../mp3/TR/A1/A26S2.mp3"),
      audioDurationMs: 900,
      answerOptions: ["Help!", "Hello!"],
      correctOption: "Help!",
      successTitle: "Correto",
      feedbackMessage: '"Help!" significa socorro ou ajuda.',
    },
  },
  {
    key: "call-doctor-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A26S3,
      audioSource: require("../../../../../mp3/TR/A1/A26S3.mp3"),
      audioDurationMs: 1500,
      answerOptions: ["Call a doctor", "Call a taxi"],
      correctOption: "Call a doctor",
      successTitle: "Correto",
      feedbackMessage: '"Call a doctor" significa chame um médico.',
    },
  },
  {
    key: "hospital-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A26S4,
      audioSource: require("../../../../../mp3/TR/A1/A26S4.mp3"),
      audioDurationMs: 1100,
      answerOptions: ["Hospital", "Hotel"],
      correctOption: "Hospital",
      successTitle: "Correto",
      feedbackMessage: "Hospital é o lugar para emergências graves.",
    },
  },
  {
    key: "emergency-number-tip",
    component: "Exercise17",
    activity: {
      label: "Dica de Nativo",
      content: [
        "Se você estiver nos EUA ou Canadá e precisar de polícia, bombeiros ou ambulância, o número único é o 911 (nine-one-one). No Reino Unido e em boa parte da Europa, o número é 999 ou 112. Memorize o número do país onde você está assim que desembarcar!",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "doctor-complete",
    component: "Exercise5",
    activity: {
      prompt:
        "Você vê alguém passando muito mal na rua e grita para as pessoas ao redor:",
      sentenceStart: "Please, call a",
      sentenceEnd: "!",
      options: ["doctor", "souvenir"],
      correctAnswer: "doctor",
      successTitle: "Correto",
      successMessage: "Please, call a doctor!",
    },
  },
  {
    key: "hospital-true-false",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e responda: verdadeiro ou falso?",
      image: TRA1.A26S7,
      audioSource: require("../../../../../mp3/TR/A1/A26S7.mp3"),
      audioDurationMs: 1700,
      statement: "O turista do áudio está perguntando onde fica o hotel.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage: "Ele perguntou onde fica o hospital.",
    },
  },
  {
    key: "emergency-vocab",
    component: "Exercise1",
    activity: {
      prompt: "Conecte as palavras de emergência com suas situações.",
      pairs: [
        { en: "Help!", pt: "Quando você precisa de socorro imediato" },
        { en: "Call a doctor", pt: "Quando alguém precisa de médico" },
        { en: "Hospital", pt: "O lugar para emergências graves" },
      ],
      successTitle: "Correto",
      successMessage: "Vocabulário de emergência revisado.",
    },
  },
  {
    key: "call-doctor-order",
    component: "Exercise6",
    activity: {
      prompt: "Clique nas palavras para escrever a frase na ordem correta.",
      words: ["a", "Call", ",", "doctor", "please"],
      correctOrder: ["Call", "a", "doctor", ",", "please"],
      successTitle: "Correto",
      successMessage: "Call a doctor, please.",
    },
  },
  {
    key: "hospital-correct-sentence",
    component: "Exercise4",
    activity: {
      prompt:
        "Como você pergunta a alguém na rua onde fica o hospital mais próximo de forma rápida e clara?",
      image: TRA1.A26S10,
      wrongSentence: "Hospital direction",
      options: [
        "I want hospital.",
        "Where is the hospital?",
        "Hospital for me.",
      ],
      correctAnswer: "Where is the hospital?",
      successTitle: "Correto",
      successMessage: "Where is the hospital?",
    },
  },
  {
    key: "help-writing",
    component: "Exercise12",
    activity: {
      prompt: "Writing",
      instruction:
        'Imagine que você precisa pedir socorro agora. Digite a palavra universal para "ajuda" em inglês.',
      placeholder: "Help",
      helperText: "Uma palavra curta e direta.",
      tipText: "Help",
      submitLabel: "Enviar",
      successTitle: "Correto",
      successMessage: "Help!",
    },
  },
  {
    key: "call-doctor-speaking",
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction:
        'Prática de urgência! Grave um áudio pedindo para chamarem um médico de forma educada, mas firme: "Call a doctor, please."',
      helperText: "Call a doctor, please.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Call a doctor, please.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você praticou uma frase de emergência.",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createTravelLessonScreen(LESSON_SLIDES);
