import { BUA1, Images } from "../../../../util/images";
import createBusinessLessonScreen from "./BusinessLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "business-greetings-intro",
    component: "Exercise17",
    activity: {
      label: "Welcome to the Business World!",
      content: [
        `Fala, futuro fluente! Para começar no mundo dos negócios, a primeira impressão é a que fica. Vamos dominar os cumprimentos iniciais em inglês.

Dica de Nativo:
No dia a dia corporativo, a gente raramente usa aquele "How do you do?" dos livros antigos. É muito formal e engessado. Vamos focar no que as pessoas realmente falam nas reuniões e corredores hoje em dia!`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "hello-good-morning-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute a palavra e escolha a alternativa que você ouviu.",
      image: BUA1.A1S2,
      audioSource: require("../../../../../mp3/BU/A1/A1S2.mp3"),
      audioDurationMs: 1800,
      answerOptions: ["Hello", "Yellow"],
      correctOption: "Hello",
      successTitle: "Correto",
      feedbackMessage: 'O áudio começa com "Hello".',
    },
  },
  {
    key: "morning-evening-match",
    component: "Exercise15",
    activity: {
      prompt: "Clique na imagem e na palavra que descreve ela.",
      images: [
        { id: "morning-img", image: BUA1.A1S3p1 },
        { id: "evening-img", image: BUA1.A1S3p2 },
      ],
      words: [
        { id: "morning-word", label: "Good morning" },
        { id: "evening-word", label: "Good evening" },
      ],
      pairs: [
        { imageId: "morning-img", wordId: "morning-word" },
        { imageId: "evening-img", wordId: "evening-word" },
      ],
      successTitle: "Correto",
      successMessage: "Good morning é de manhã; good evening é à noite.",
    },
  },
  {
    key: "intro-expression-match",
    component: "Exercise1",
    activity: {
      prompt: "Conecte as expressões em inglês com suas traduções.",
      pairs: [
        { en: "Nice to meet you", pt: "Prazer em conhecê-lo" },
        { en: "Good afternoon", pt: "Boa tarde" },
        { en: "My name is", pt: "Meu nome é" },
      ],
      successTitle: "Correto",
      successMessage: "Essas são expressões essenciais de apresentação.",
    },
  },
  {
    key: "my-name-is",
    component: "Exercise5",
    activity: {
      prompt: "Complete a frase com a palavra correta.",
      sentenceStart: "Hello,",
      sentenceEnd: "name is John.",
      options: ["my", "I"],
      correctAnswer: "my",
      successTitle: "Correto",
      successMessage: 'A estrutura correta é "my name is".',
    },
  },
  {
    key: "formal-informal-tip",
    component: "Exercise17",
    activity: {
      label: "Formal vs. Informal",
      content: [
        `Atenção aqui! Como nativos separam quem é amigo de quem é chefe?

Informal (colegas próximos):
"Hi!", "Hey!", "Morning!"

Formal (clientes, chefes, primeira vez):
"Hello", "Good morning", "Nice to meet you".

Não chegue mandando um "Hey" pro CEO na primeira reunião, beleza?`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "sarah-afternoon-true-false",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e responda se a frase é verdadeira ou falsa.",
      image: BUA1.A1S3p1,
      audioSource: require("../../../../../mp3/BU/A1/A1S7.mp3"),
      audioDurationMs: 3600,
      statement: "The woman's name is Sarah and she says good morning.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage: 'Ela diz "Good afternoon", não "good morning".',
    },
  },
  {
    key: "nice-to-meet-you-order",
    component: "Exercise6",
    activity: {
      prompt: "Clique nas palavras para escrever a frase na ordem correta.",
      words: ["meet", "to", "Nice", "you"],
      correctOrder: ["Nice", "to", "meet", "you"],
      successTitle: "Correto",
      successMessage: "Nice to meet you.",
    },
  },
  {
    key: "professional-introduction-audio",
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction:
        'Agora é a sua vez de falar! Mande um áudio cumprimentando alguém, dizendo seu nome e falando "prazer em conhecê-lo" de forma profissional.',
      helperText: "Hello, my name is [Nome]. Nice to meet you.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Hello, my name is David. Nice to meet you.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Sua apresentação profissional foi gravada.",
    },
  },
  {
    key: "greetings-feedback",
    component: "Exercise17",
    activity: {
      label: "Great job!",
      content: [
        'Você deu o primeiro passo! Introduções profissionais agora são fichinha pra você. Lembre-se: olho no olho e um aperto de mão firme (ou um sorriso no Zoom) complementam o seu "Nice to meet you". Nos vemos na próxima aula!',
      ],
      continueLabel: "Finalizar",
    },
  },
  {
    key: "lesson-finish",
    type: "finish",
  },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
