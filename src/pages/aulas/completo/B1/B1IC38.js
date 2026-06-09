import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "couldnt-have-intro",
    component: "Exercise17",
    activity: {
      label: "Impossibilidade Total no Passado",
      content: [
        `E se você tem certeza de que algo não aconteceu?

Usamos:
/blue{Couldn't have + Particípio}

Se alguém diz: "Eu vi a Maria no mercado ontem", mas você sabe que ela está na Europa, você responde:

You couldn't have seen her! She is in Paris!

Ou seja: você não pode ter visto ela!`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "typing-test-intro",
    component: "Exercise17",
    activity: {
      label: "Preparado para mais um desafio de digitação?",
      content: [
        'O verbo "ver" no particípio aparecerá. Lembre-se: ver = see. Mas e no particípio? Você tem 5 segundos!',
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "modal-perfect-typing",
    component: "Exercise11",
    activity: {
      prompt: "Digite a palavra. Você tem 5 segundos.",
      words: ["SEEN", "COULDN'T", "HAVE", "WOULDN'T", "MUST"],
      secondsPerWord: 5,
    },
  },
  {
    key: "dog-couldnt-have",
    component: "Exercise4",
    activity: {
      prompt: "Expresse a impossibilidade. Escolha a frase correta.",
      image: ICB1.A38S5,
      wrongSentence: "Impossible accusation",
      options: [
        "The dog couldn't have eaten the shoe!",
        "The dog couldn't ate the shoe!",
        "The dog shouldn't have eaten the shoe!",
      ],
      correctAnswer: "The dog couldn't have eaten the shoe!",
      successTitle: "Correto",
      successMessage:
        "Couldn't have + particípio expressa impossibilidade no passado.",
    },
  },
  {
    key: "safe-couldnt-have",
    component: "Exercise5",
    activity: {
      prompt: "Complete a frase.",
      sentenceStart: "The thief",
      sentenceEnd: "opened that safe without the code.",
      options: ["couldn't have", "wouldn't have"],
      correctAnswer: "couldn't have",
      successTitle: "Correto",
      successMessage:
        "Couldn't have mostra que algo não poderia ter acontecido.",
    },
  },
  {
    key: "caught-train-order",
    component: "Exercise6",
    activity: {
      prompt: "Clique nas palavras para escrever a frase na ordem correta.",
      words: ["the", "caught", "have", "couldn't", "You", "train"],
      correctOrder: ["You", "couldn't", "have", "caught", "the", "train"],
      successTitle: "Correto",
      successMessage: "You couldn't have caught the train.",
    },
  },
  {
    key: "party-alibi-complete",
    component: "Exercise2",
    activity: {
      prompt: "Complete o texto com as alternativas.",
      paragraphs: [
        [
          '"Are you sure it was Tom? He ',
          {
            id: "blank-1",
            options: ["couldn't have", "shouldn't have"],
            answer: "couldn't have",
          },
          " been at the party. I was with him all night! It ",
          {
            id: "blank-2",
            options: ["must have", "might have"],
            answer: "must have",
          },
          ' been someone else."',
        ],
      ],
      successTitle: "Correto",
      successMessage:
        "Couldn't have nega a possibilidade; must have cria uma dedução forte.",
    },
  },
  {
    key: "impossible-accusation-audio",
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction:
        'Mande um áudio negando uma acusação impossível. Alguém disse que você quebrou o vaso ontem à noite. Use "I couldn\'t have broken it because..." e crie seu álibi!',
      helperText: "I couldn't have broken it because I was at work.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "I couldn't have broken it because I was at work.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Seu áudio com couldn't have foi gravado.",
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
