import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "thirty-second-impression",
    component: "Exercise17",
    activity: {
      label: "The 30-Second Impression",
      content: [
        `Em eventos de networking, a forma como você se apresenta diz muito sobre você.

No nível intermediário/avançado, evitamos dizer apenas "I am a teacher" ou "I work in a company".

/blue{Native Tip}
Nativos focam no valor que entregam:
"I'm in EdTech"
"I'm the founder of..."
"I specialize in..."

Vamos aprender essas estruturas!`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "networking-image",
    component: "Exercise8",
    activity: {
      prompt: "Look at the image. What kind of professional situation is this?",
      image: ICB1.A18S2,
      options: [
        "A job interview",
        "A networking event",
        "A remote team meeting",
        "A family dinner",
      ],
      correctAnswer: "A networking event",
      successTitle: "Correto",
      successMessage: "A situação mostra um evento de networking.",
    },
  },
  {
    key: "mark-intro-true",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Escute e responda",
      image: ICB1.A18S3,
      audioSource: require("../../../../../mp3/IC/B1/A18S3.mp3"),
      audioDurationMs: 6500,
      dialogue: "Mark works with digital media and education.",
      options: ["True", "False"],
      correctAnswer: "True",
      successTitle: "Correto",
      successMessage:
        "Ele cria conteúdo e gerencia canais educacionais no YouTube e Spotify.",
    },
  },
  {
    key: "break-the-ice-tip",
    component: "Exercise17",
    activity: {
      label: "How to break the ice!",
      content: [
        `A melhor forma de abordar alguém que você não conhece em um evento é usando:

"Hi, I don't think we've met. I'm..."

Para perguntar o que a pessoa faz, fuja do básico "What is your job?".

Use:
"What line of work are you in?"
ou
"What do you do for a living?"`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "work-in-marketing",
    component: "Exercise5",
    activity: {
      prompt: "Complete a frase",
      sentenceStart: "Hi, I don't think we've met. I'm Julia. I work",
      sentenceEnd: "digital marketing.",
      options: ["in", "on"],
      correctAnswer: "in",
      successTitle: "Correto",
      successMessage:
        'Usamos "in" para áreas de atuação: in digital marketing.',
    },
  },
  {
    key: "professional-complements",
    component: "Exercise1",
    activity: {
      prompt: "Conecte o início da frase com seu complemento profissional.",
      pairs: [
        { en: "I'm the founder", pt: "of a language learning app." },
        { en: "I specialize", pt: "in UI/UX design." },
        { en: "What line of work", pt: "are you in?" },
      ],
      successTitle: "Excelente",
      successMessage: "Você conectou as estruturas profissionais.",
    },
  },
  {
    key: "elevator-pitch-challenge",
    component: "Exercise17",
    activity: {
      label: "The Elevator Pitch Challenge!",
      content: [
        `Primeiras impressões acontecem rápido, e sua digitação também precisa ser!

Vamos testar o vocabulário de negócios de hoje.

Você tem 5 segundos para cada palavra. Prepare-se!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "network-speed",
    component: "Exercise11",
    activity: {
      prompt: "Escreva rápido",
      secondsPerWord: 5,
      words: ["FOUNDER", "SPECIALIZE", "INDUSTRY", "LIVING", "NETWORK"],
      successTitle: "Correto",
      successMessage: "Reflexos excelentes. Agora vamos para o diálogo real.",
    },
  },
  {
    key: "dialog-networking",
    component: "Exercise7",
    activity: {
      prompt: "Coloque esse diálogo de networking na ordem correta.",
      options: [
        "Hi, I don't think we've met. I'm Alex.",
        "Nice to meet you, Alex. I'm Sarah. What line of work are you in?",
        "I'm in EdTech. I have a school app called Lingueto. And you?",
        "That sounds amazing! I work in software development.",
      ],
      correctOrder: [
        "Hi, I don't think we've met. I'm Alex.",
        "Nice to meet you, Alex. I'm Sarah. What line of work are you in?",
        "I'm in EdTech. I have a school app called Lingueto. And you?",
        "That sounds amazing! I work in software development.",
      ],
      successTitle: "Correto",
      successMessage: "Você organizou o diálogo de networking.",
    },
  },
  {
    key: "presentation-pitch",
    component: "Exercise2",
    activity: {
      prompt: "Complete o pitch de apresentação.",
      paragraphs: [
        [
          "\"Hello! I'm David. I am a",
          { id: "b1", answer: "content", options: ["content", "happy"] },
          "creator.",
        ],
        [
          "I focus on creating English lessons for mobile apps. What do you",
          { id: "b2", answer: "do", options: ["make", "do"] },
          'for a living?"',
        ],
      ],
      successTitle: "Correto",
      successMessage: "A sequência correta é: content / do.",
    },
  },
  {
    key: "type-line-of-work",
    component: "Exercise18",
    activity: {
      prompt: "Digite a frase para perguntar sobre a área de atuação.",
      scrambledSentence: "/ work / line / are / What / of / you / in / ? /",
      correctAnswer: "What line of work are you in?",
      placeholder: "Digite a pergunta",
      submitLabel: "Enviar",
      errorTitle: "Incorreto",
      successTitle: "Correto",
      successMessage: "A pergunta correta é: What line of work are you in?",
    },
  },
  {
    key: "write-elevator-pitch",
    component: "Exercise12",
    activity: {
      prompt: "The Elevator Pitch!",
      instruction: "Imagine que você está em uma conferência internacional.",
      helperText:
        'Escreva 2 ou 3 frases se apresentando. Use "I specialize in..." ou "I focus on...".',
      placeholder:
        "Hi, I'm David. I'm in EdTech and I focus on creating English lessons for mobile apps.",
      tipText: "Diga nome, área e o valor que você entrega.",
      minLength: 25,
      successTitle: "Correto",
      successMessage: "Ótimo elevator pitch!",
    },
  },
  {
    key: "audio-break-ice",
    component: "Exercise16",
    activity: {
      prompt: "Breaking the ice!",
      instruction:
        "Mande um áudio como se estivesse abordando alguém no coffee break.",
      helperText:
        "Use \"Hi, I don't think we've met...\", apresente-se e termine com uma pergunta profissional.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "Hi, I don't think we've met. I'm David. I'm in EdTech. What line of work are you in?",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Seu áudio de networking foi gravado.",
    },
  },
  {
    key: "networker-conclusion",
    component: "Exercise17",
    activity: {
      label: "You are a natural networker!",
      content: [
        `Você dominou as estruturas para se apresentar com confiança e autoridade em qualquer evento internacional.

O mundo dos negócios está de portas abertas para você!`,
      ],
      continueLabel: "Finalizar",
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
