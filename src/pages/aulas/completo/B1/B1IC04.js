import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "native-speech-intro",
    component: "Exercise17",
    activity: {
      label: "Como os nativos realmente falam",
      content: [
        `Na escola você aprende: "I have seen that". Na rua, você vai ouvir: "I've seen that" ou até "I seen that" em fala informal, embora seja gramaticalmente errado.

/blue{As Contrações Extremas}
I've / You've / We've / They've
He's / She's / It's

Sim, o 's do Present Perfect é igual ao do is. O contexto mostra o sentido.

/blue{Expressões chave de nativo}
Been there, done that: "já passei por isso, já fiz isso".

I've had it with...: "não aguento mais", "cheguei no meu limite".

"What've you been up to?" é uma forma comum de perguntar "o que você tem feito de bom?".`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "whatve-up-to",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escolha a melhor interpretação",
      image: ICB1.A5S5,
      audioSource: require("../../../../../mp3/IC/B1/A4S1.mp3"),
      audioDurationMs: 3200,
      answerOptions: [
        "The speaker is asking about the other person's recent activities.",
        "The speaker is asking where the other person is going right now.",
      ],
      correctOption:
        "The speaker is asking about the other person's recent activities.",
      successTitle: "Correto",
      feedbackMessage:
        '"What\'ve you been up to?" é o "e aí, quais as novidades?" dos nativos.',
    },
  },
  {
    key: "ive-had-it",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escolha a melhor interpretação",
      image: ICB1.A6S2,
      audioSource: require("../../../../../mp3/IC/B1/A4S2.mp3"),
      audioDurationMs: 3400,
      answerOptions: [
        "The speaker is frustrated and has reached his limit.",
        "The speaker just received a new gift.",
      ],
      correctOption: "The speaker is frustrated and has reached his limit.",
      successTitle: "Correto",
      feedbackMessage:
        '"I\'ve had it" é uma expressão idiomática fixa no Present Perfect.',
    },
  },
  {
    key: "been-there-done-that",
    component: "Exercise8",
    activity: {
      prompt: "O que essa imagem representa melhor na fala de um nativo?",
      image: ICB1.A6S5,
      options: [
        "David has just arrived at the tower.",
        "Been there, done that.",
        "David is still looking for the tower.",
      ],
      correctAnswer: "Been there, done that.",
      successTitle: "Correto",
      successMessage:
        '"Been there, done that" indica que a pessoa já teve aquela experiência e ela não é mais novidade.',
    },
  },
  {
    key: "informal-coffee-native",
    component: "Exercise8",
    activity: {
      prompt:
        "Qual dessas frases um nativo dificilmente diria em uma conversa informal no café",
      image: ICB1.A7S1,
      options: [
        "I've been around.",
        "I have been a teacher for ten years.",
        "I've done this a million times.",
      ],
      correctAnswer: "I have been a teacher for ten years.",
      successTitle: "Correto",
      successMessage:
        'Em conversa informal, nativos preferem contrações como "I\'ve" ou expressões mais curtas.',
    },
  },
  {
    key: "store-app-dialogue",
    component: "Exercise2",
    activity: {
      prompt: "Complete a conversa",
      paragraphs: [
        [
          "George: \"It's great! We've",
          {
            id: "blank-1",
            answer: "been",
            options: ["been", "yet", "already"],
          },
          'working on the new UI."',
        ],
        [
          'CEO: "Nice. Have you finished the animations',
          {
            id: "blank-2",
            answer: "yet",
            options: ["already", "yet", "been"],
          },
          '?"',
        ],
        [
          'George: "Not',
          {
            id: "blank-3",
            answer: "yet",
            options: ["yet", "been", "already"],
          },
          ", but I've",
          {
            id: "blank-4",
            answer: "already",
            options: ["yet", "already", "been"],
          },
          'finished the icons."',
        ],
      ],
      successTitle: "Correto",
      successMessage: "A sequência correta é: been / yet / yet / already.",
    },
  },
  {
    key: "small-talk-reading",
    component: "Exercise17",
    activity: {
      label: "Small Talk like a Pro",
      content: [
        `"David meets an old friend at the studio. 'Long time no see! What've you been up to?', the friend asks. David smiles: 'Man, I've been busy with my new app. I've been coding like crazy!'. His friend laughs: 'I know the feeling. Been there, done that. I still haven't finished my own project, but I've just signed a new contract!'. They've both been around the tech scene for a while, so they know how it goes."`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "write-native-slang",
    component: "Exercise12",
    activity: {
      prompt: "Use a gíria dos nativos!",
      instruction:
        'Escreva 2 frases: uma usando "What\'ve you been up to?" e outra usando "Been there, done that".',
      helperText: "Use as expressões em uma situação da sua vida.",
      image: ICB1.A7S3,
      placeholder:
        "Hey Kaique, what've you been up to? Learning React Native? Been there, done that!",
      tipText:
        '"What\'ve you been up to?" pergunta sobre novidades recentes. "Been there, done that" mostra que você já viveu aquela situação.',
      minLength: 20,
      successTitle: "Correto",
      successMessage: "Boa! Você praticou expressões naturais de conversa.",
    },
  },
  {
    key: "native-style-conclusion",
    component: "Exercise17",
    activity: {
      label: "Você fala como um nativo!",
      content: [
        `Agora você não apenas sabe a regra, você sabe o estilo.

Resumo:
What've you been up to? = O que tem feito?
Been there, done that = Já conheço, já fiz.
I've had it = Chega, cansei!

Continue praticando o listening das contrações!

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
