import { Images, TRA1 } from "../../../../util/images";
import createTravelLessonScreen from "./TravelLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "checking-out-intro",
    component: "Exercise17",
    activity: {
      label: "Checking Out",
      content: [
        "Chegou o dia de ir embora! O momento do check-out é geralmente rápido, mas você precisa saber pedir a sua conta para conferir se está tudo certo. Além disso, nesta aula, você vai aprender a pergunta de ouro de todo viajante esperto: como pedir para o hotel guardar a sua mala enquanto você dá o último passeio pela cidade.",
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "check-out-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A15S2,
      audioSource: require("../../../../../mp3/TR/A1/A15S2.mp3"),
      audioDurationMs: 1200,
      answerOptions: ["Check out", "Check in"],
      correctOption: "Check out",
      successTitle: "Correto",
      feedbackMessage:
        'Para avisar que está indo embora, diga: "I would like to check out, please."',
    },
  },
  {
    key: "bill-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A15S3,
      audioSource: require("../../../../../mp3/TR/A1/A15S3.mp3"),
      audioDurationMs: 1200,
      answerOptions: ["The bill", "The key"],
      correctOption: "The bill",
      successTitle: "Correto",
      feedbackMessage: '"The bill" significa a conta.',
    },
  },
  {
    key: "leave-bags-tip",
    component: "Exercise17",
    activity: {
      label: "Dica de Nativo",
      content: [
        `Seu voo é só à noite, mas o check-out é ao meio-dia? Não ande com as malas pela cidade! Quase todos os hotéis do mundo guardam a sua bagagem de graça.

Aponte para a sua mala e pergunte: "Can I leave my bags here?" Leave significa "deixar". Essa frase vai salvar o seu último dia de viagem!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "leave-my-bags-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A15S7,
      audioSource: require("../../../../../mp3/TR/A1/A15S5.mp3"),
      audioDurationMs: 1500,
      answerOptions: ["Leave my bags", "Lost my bags"],
      correctOption: "Leave my bags",
      successTitle: "Correto",
      feedbackMessage: '"Leave my bags" significa deixar minhas malas.',
    },
  },
  {
    key: "check-out-complete",
    component: "Exercise5",
    activity: {
      prompt:
        "Você chegou na recepção no seu último dia de manhã, entregou a chave e disse:",
      sentenceStart: "Good morning. I would like to check",
      sentenceEnd: ", please.",
      options: ["out", "in"],
      correctAnswer: "out",
      successTitle: "Correto",
      successMessage: "Good morning. I would like to check out, please.",
    },
  },
  {
    key: "leave-bags-true-false",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e responda: verdadeiro ou falso?",
      image: TRA1.A15S7,
      audioSource: require("../../../../../mp3/TR/A1/A15S7.mp3"),
      audioDurationMs: 1900,
      statement:
        "O hóspede do áudio está avisando que perdeu as malas dele no hotel.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage:
        'Ele perguntou se pode deixar as malas ali: "Can I leave my bags here?"',
    },
  },
  {
    key: "check-out-vocab",
    component: "Exercise1",
    activity: {
      prompt: "Conecte o vocabulário final de hospedagem com suas traduções.",
      pairs: [
        { en: "Check out", pt: "Fechar a conta / Sair" },
        { en: "The bill", pt: "A conta" },
        { en: "Leave my bags", pt: "Deixar minhas malas" },
      ],
      successTitle: "Correto",
      successMessage: "Vocabulário de check-out revisado.",
    },
  },
  {
    key: "check-out-word-order",
    component: "Exercise6",
    activity: {
      prompt: "Clique nas palavras para escrever a frase na ordem correta.",
      words: ["out", "like", "to", "I", "would", "check"],
      correctOrder: ["I", "would", "like", "to", "check", "out"],
      successTitle: "Correto",
      successMessage: "I would like to check out.",
    },
  },
  {
    key: "bill-correct-sentence",
    component: "Exercise4",
    activity: {
      prompt:
        "O recepcionista avisa que está tudo certo com a saída. Você quer dar uma olhada na conta para conferir. Como você pede isso de forma educada?",
      image: TRA1.A15S3,
      wrongSentence: "Hotel bill request",
      options: [
        "Can I see the bill, please?",
        "What is the bill?",
        "Give me bill now.",
      ],
      correctAnswer: "Can I see the bill, please?",
      successTitle: "Correto",
      successMessage: "Can I see the bill, please?",
    },
  },
  {
    key: "leave-bags-writing",
    component: "Exercise12",
    activity: {
      prompt: "Writing",
      instruction:
        'A sua diária acabou, mas você ainda quer ir comprar umas lembrancinhas antes do voo. Digite em inglês a pergunta de ouro para o recepcionista: "Posso deixar minhas malas aqui?".',
      placeholder: "Can I leave my bags here?",
      helperText: "Use Can I leave...",
      tipText: "Can I leave my bags here?",
      submitLabel: "Enviar",
      successTitle: "Correto",
      successMessage: "Can I leave my bags here?",
    },
  },
  {
    key: "check-out-speaking",
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction:
        'Aperte o botão e grave a sua voz avisando de forma educada que você quer encerrar a sua estadia: "I would like to check out, please."',
      helperText: "I would like to check out, please.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "I would like to check out, please.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você praticou o check-out em inglês.",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createTravelLessonScreen(LESSON_SLIDES);
