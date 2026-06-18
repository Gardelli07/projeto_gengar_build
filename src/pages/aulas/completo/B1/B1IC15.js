import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "ping-pong-rule",
    component: "Exercise17",
    activity: {
      label: "The Ping-Pong Rule!",
      content: [
        `Welcome! O segredo de um bom small talk É como um jogo de ping-pong.

Se alguém te conta algo, você não pode simplesmente dizer "Ah, legal" e deixar a bola cair.

Você precisa devolver a bola fazendo uma follow-up question, uma pergunta de acompanhamento.

Hoje vamos aprender como os nativos mantém o assunto fluindo de forma natural!`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "chatting-awkward-match",
    component: "Exercise15",
    activity: {
      prompt: "Clique na imagem e na palavra que a descreve perfeitamente.",
      images: [
        { id: "chatting-img", image: ICB1.A20S10 },
        { id: "awkward-img", image: ICB1.A20S2 },
      ],
      words: [
        { id: "chatting-word", label: "Chatting" },
        { id: "awkward-word", label: "Awkward silence" },
      ],
      pairs: [
        { imageId: "chatting-img", wordId: "chatting-word" },
        { imageId: "awkward-img", wordId: "awkward-word" },
      ],
      successTitle: "Correto",
      successMessage:
        "Você identificou conversa fluindo e silêncio desconfortável.",
    },
  },
  {
    key: "coffee-follow-up-false",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Escute e responda",
      image: ICB1.A20S3,
      audioSource: require("../../../../../mp3/IC/B1/A15S3.mp3"),
      audioDurationMs: 7800,
      dialogue: "Person B killed the conversation.",
      options: ["True", "False"],
      correctAnswer: "False",
      successTitle: "Correto",
      successMessage:
        "Person B manteve a conversa viva com uma follow-up question.",
    },
  },
  {
    key: "show-interest",
    component: "Exercise17",
    activity: {
      label: "Show Interest!",
      content: [
        `Para fazer boas perguntas de acompanhamento, use as famosas Wh- Questions:

What, Where, When, Who, Why, How.

/blue{Native Tip}
Antes de fazer a pergunta, sempre reaja com entusiasmo ao que a pessoa disse.

Diga coisas como:
"Really?"
"Oh, nice!"
"That's interesting!"

Isso mostra que você está prestando atenção.`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "follow-up-match",
    component: "Exercise1",
    activity: {
      prompt: "Conecte a frase inicial com a melhor follow-up question.",
      pairs: [
        {
          en: "I visited my brother last weekend.",
          pt: "Oh, nice! How is he doing?",
        },
        {
          en: "I love playing the guitar.",
          pt: "Really? Acoustic or electric?",
        },
        {
          en: "I am creating an app right now.",
          pt: "That's interesting! What is it about?",
        },
      ],
      successTitle: "Excelente",
      successMessage: "Você conectou as perguntas de acompanhamento certas.",
    },
  },
  {
    key: "movie-what",
    component: "Exercise5",
    activity: {
      prompt: "Complete a reação para manter a conversa rolando.",
      sentenceStart: 'A: "I watched a great movie yesterday." B: "Really?',
      sentenceEnd: 'was it about?"',
      options: ["What", "Who"],
      correctAnswer: "What",
      successTitle: "Correto",
      successMessage:
        'Perguntamos "What was it about?" para saber sobre o assunto.',
    },
  },
  {
    key: "miami-follow-up",
    component: "Exercise4",
    activity: {
      prompt:
        'Alguém disse: "I traveled to Miami." Qual é a melhor follow-up question?',
      image: ICB1.A20S7,
      wrongSentence: "Follow-up question",
      options: [
        "Who did you went withá",
        "Who did you go withá",
        "Who you go withá",
      ],
      correctAnswer: "Who did you go withá",
      successTitle: "Correto",
      successMessage: 'Depois de "did", usamos o verbo base: go.',
    },
  },
  {
    key: "small-talk-order",
    component: "Exercise7",
    activity: {
      prompt: "Coloque esse small talk na ordem correta.",
      options: [
        "Hey! How was your weekend?",
        "It was great! I just stayed home and relaxed.",
        "That sounds nice. Did you watch any good movies?",
        "Yes, I watched a great action movie on Saturday.",
      ],
      correctOrder: [
        "Hey! How was your weekend?",
        "It was great! I just stayed home and relaxed.",
        "That sounds nice. Did you watch any good movies?",
        "Yes, I watched a great action movie on Saturday.",
      ],
      successTitle: "Correto",
      successMessage: "Você manteve a conversa fluindo na ordem natural.",
    },
  },
  {
    key: "type-how-long",
    component: "Exercise18",
    activity: {
      prompt: "Digite a pergunta de acompanhamento corretamente.",
      scrambledSentence: "/ lived / How / you / have / long / there / ? /",
      correctAnswer: "How long have you lived there?",
      placeholder: "Digite a pergunta correta",
      submitLabel: "Enviar",
      errorTitle: "Incorreto",
      successTitle: "Correto",
      successMessage: "A pergunta correta é: How long have you lived there?",
    },
  },
  {
    key: "listen-interesting",
    component: "Exercise19",
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e escreva a reação exata que você ouviu.",
      audioSource: require("../../../../../mp3/IC/B1/A15S4.mp3"),
      audioDurationMs: 3000,
      correctAnswer: "That is so interesting. Tell me more!",
      placeholder: "Digite a reação",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "Você escreveu a reação corretamente.",
      errorMessage: "Ouça novamente e confira cada palavra.",
    },
  },
  {
    key: "networking-audio",
    component: "Exercise16",
    activity: {
      prompt: "Networking",
      instruction:
        'Imagine que eu disse: "Hi! I just started creating content for YouTube and Spotify."',
      helperText:
        "Mande um áudio reagindo e fazendo pelo menos duas follow-up questions.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "Really? That sounds interesting! What kind of content do you create? How often do you post?",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Seu áudio de networking foi gravado com sucesso.",
    },
  },
  {
    key: "quick-reflexes",
    component: "Exercise17",
    activity: {
      label: "Quick Reflexes!",
      content: [
        `Mandou super bem no networking!

Para não deixar nenhuma conversa morrer, você precisa ter essas palavras na ponta da língua.

Na próxima tela, você terá 5 segundos para digitar cada palavra-chave de small talk.

Get ready!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "small-talk-speed",
    component: "Exercise11",
    activity: {
      prompt: "Escreva rápido",
      secondsPerWord: 5,
      words: ["REALLY", "WHERE", "ABOUT", "SOUNDS", "GREAT"],
      successTitle: "Correto",
      successMessage: "Você digitou as palavras-chave de small talk.",
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
