import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "success-vocabulary-intro",
    component: "Exercise17",
    activity: {
      label: "O Vocabulário do Sucesso",
      content: [
        `Para entender a vida de um grande ícone da tecnologia, precisamos dominar quatro conceitos fundamentais.

Vamos aprender a falar e a identificar cada um deles agora:

Founder: fundador.
Visionary: alguém com visão criativa sobre o futuro.
Innovative: algo novo, avançado e original.
Legacy: o impacto duradouro deixado por alguém.`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "founder-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escolha a definição correta",
      image: ICB1.A10S1,
      audioSource: require("../../../../../mp3/IC/B1/A10S1.mp3"),
      audioDurationMs: 3000,
      answerOptions: [
        "The person who starts a company or an organization.",
        "A person who finds lost items in a garage.",
      ],
      correctOption: "The person who starts a company or an organization.",
      successTitle: "Correto",
      feedbackMessage: "Pronúncia: FÁUN-der.",
    },
  },
  {
    key: "visionary-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escolha a definição correta",
      image: ICB1.A10S2,
      audioSource: require("../../../../../mp3/IC/B1/A10S2.mp3"),
      audioDurationMs: 3200,
      answerOptions: [
        "Someone who has creative and original ideas about the future.",
        "Someone who has difficulty seeing things clearly.",
      ],
      correctOption:
        "Someone who has creative and original ideas about the future.",
      successTitle: "Correto",
      feedbackMessage: "Pronúncia: Ví-jio-né-ri.",
    },
  },
  {
    key: "innovative-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escolha a definição correta",
      image: ICB1.A10S3,
      audioSource: require("../../../../../mp3/IC/B1/A10S3.mp3"),
      audioDurationMs: 3200,
      answerOptions: [
        "Featuring new methods; advanced and original.",
        "Using old technology from many years ago.",
      ],
      correctOption: "Featuring new methods; advanced and original.",
      successTitle: "Correto",
      feedbackMessage: "Pronúncia: í-no-vei-tiv.",
    },
  },
  {
    key: "legacy-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escolha a definição correta",
      image: ICB1.A10S4,
      audioSource: require("../../../../../mp3/IC/B1/A10S4.mp3"),
      audioDurationMs: 3400,
      answerOptions: [
        "The long-lasting impact or reputation left by someone.",
        "A type of legal document used to buy a house.",
      ],
      correctOption: "The long-lasting impact or reputation left by someone.",
      successTitle: "Correto",
      feedbackMessage: "Pronúncia: LÉ-ga-si.",
    },
  },
  {
    key: "man-behind-apple",
    component: "Exercise17",
    activity: {
      label: "The Man Behind the Apple",
      content: [
        `"Steve Jobs was the founder of Apple and a true visionary of the digital age. He was born in 1955 in San Francisco. Along with Steve Wozniak, he started Apple in a garage. Jobs believed that technology should be beautiful and easy to use, not just functional.

He led the creation of innovative products that changed the world, such as the Macintosh, the iPod, and the iPhone. He was famous for his attention to detail and his 'Bento Grid' style of thinking, keeping things organized and elegant. Although he passed away in 2011, his legacy lives on in every smartphone and tablet we use today."`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "jobs-garage",
    component: "Exercise4",
    activity: {
      prompt: "Com base no texto, escolha a opção correta:",
      image: ICB1.A10S7,
      wrongSentence: "Jobs and Wozniak started Apple in...",
      options: ["a garage", "a professional studio"],
      correctAnswer: "a garage",
      successTitle: "Correto",
      successMessage: "Segundo o texto, a Apple começou em uma garagem.",
    },
  },
  {
    key: "jobs-belief",
    component: "Exercise4",
    activity: {
      prompt: "Com base no texto, escolha a opção correta:",
      image: ICB1.A10S8,
      wrongSentence: "Jobs believed technology should be...",
      options: [
        "It should be only functional",
        "It should be beautiful and easy to use",
      ],
      correctAnswer: "It should be beautiful and easy to use",
      successTitle: "Correto",
      successMessage:
        "Ele acreditava em tecnologia bonita, simples e funcional.",
    },
  },
  {
    key: "jobs-product",
    component: "Exercise4",
    activity: {
      prompt: "Com base no texto, escolha a opção correta:",
      image: ICB1.A10S9,
      wrongSentence: "Which product is mentioned in the text?",
      options: ["The iPhone", "The electric guitar"],
      correctAnswer: "The iPhone",
      successTitle: "Correto",
      successMessage: "O texto cita o iPhone como produto inovador.",
    },
  },
  {
    key: "jobs-legacy",
    component: "Exercise4",
    activity: {
      prompt: "Com base no texto, escolha a opção correta:",
      image: ICB1.A10S10,
      wrongSentence: "What lives on today?",
      options: ["Steve Jobs' legacy", "The first Apple garage"],
      correctAnswer: "Steve Jobs' legacy",
      successTitle: "Correto",
      successMessage:
        "O legado dele continua vivo nos dispositivos que usamos.",
    },
  },
  {
    key: "order-innovative-visionary",
    component: "Exercise6",
    activity: {
      prompt: "Monte a frase sobre o impacto de Jobs:",
      words: [
        "He",
        "was",
        "an",
        "innovative",
        "and",
        "visionary",
        "leader",
        ".",
      ],
      correctOrder: [
        "He",
        "was",
        "an",
        "innovative",
        "and",
        "visionary",
        "leader",
        ".",
      ],
      successTitle: "Correto",
      successMessage: "He was an innovative and visionary leader.",
    },
  },
  {
    key: "future-legacy-write",
    component: "Exercise12",
    activity: {
      prompt: "O Camaleão te desafia!",
      instruction: "Tema: Your Future Legacy.",
      helperText:
        "Escreva 3 frases: imagine que você é founder de algo novo, use innovative para descrever sua ideia e diga qual legacy quer deixar.",
      placeholder:
        "I am the founder of a new language app. My idea is innovative because it mixes AI and real practice. I want to leave a legacy for future developers.",
      tipText:
        "Use founder para fundador, innovative para inovador e legacy para legado.",
      minLength: 35,
      successTitle: "Correto",
      successMessage: "Excelente! Você conectou vocabulário e visão pessoal.",
    },
  },
  {
    key: "icon-lesson-complete",
    component: "Exercise17",
    activity: {
      label: "Lição de ícone Completa!",
      content: [
        `Você aprendeu a falar e a entender termos essenciais através da história de um mestre do design.

Recapitulando:
Founder = Fundador.
Visionary = Visionário.
Innovative = Inovador.
Legacy = Legado.

Continue focado na sua visão, o mundo precisa de mentes inovadoras!

See you!`,
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
