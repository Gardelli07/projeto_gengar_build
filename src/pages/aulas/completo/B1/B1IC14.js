import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "i-wish-intro",
    component: "Exercise17",
    activity: {
      label: "I wish...",
      content: [
        `Sabe quando você pensa: "Quem me dera ter mais dinheiro" ou "Eu queria saber tocar aquele violáo bege na parede"?

Em inglês, não traduzimos isso literalmente.

Usamos a palavra mágica WISH seguida de um verbo no passado!

Exemplo:
I don't have time.
I wish I had more time.`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "wish-could-french",
    component: "Exercise5",
    activity: {
      prompt: "Complete a frase",
      sentenceStart: "I can't speak French. I wish I",
      sentenceEnd: "speak French.",
      options: ["could", "can"],
      correctAnswer: "could",
      successTitle: "Correto",
      successMessage:
        'Depois de "I wish", usamos uma forma no passado: could.',
    },
  },
  {
    key: "wish-situations-match",
    component: "Exercise15",
    activity: {
      prompt: 'Combine a situação com o "Wish" correto.',
      images: [
        { id: "rain-img", image: ICB1.A19S2p4 },
        { id: "rich-img", image: ICB1.A20S4 },
      ],
      words: [
        { id: "umbrella-word", label: "I wish I had an umbrella." },
        { id: "rich-word", label: "I wish I was rich." },
      ],
      pairs: [
        { imageId: "rain-img", wordId: "umbrella-word" },
        { imageId: "rich-img", wordId: "rich-word" },
      ],
      successTitle: "Correto",
      successMessage: "Você combinou as situações com os desejos corretos.",
    },
  },
  {
    key: "suv-audio-false",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Escute e responda",
      image: ICB1.A20S7,
      audioSource: require("../../../../../mp3/IC/B1/A14S4.mp3"),
      audioDurationMs: 3200,
      dialogue: "The person is happy with their car.",
      options: ["True", "False"],
      correctAnswer: "False",
      successTitle: "Correto",
      successMessage:
        "A pessoa queria um SUV grande, então não está feliz com o carro atual.",
    },
  },
  {
    key: "hawaii-wish-text",
    component: "Exercise2",
    activity: {
      prompt: "Complete o desabafo com as palavras corretas.",
      paragraphs: [
        ["Today is Monday and I am at work. It's raining outside. I", { id: "b1", answer: "wish", options: ["wish", "hope"] }, "I was on a beach in Hawaii right now."],
        ["I wish I", { id: "b2", answer: "had", options: ["had", "have"] }, "a cold drink in my hand instead of this pen!"],
      ],
      successTitle: "Correto",
      successMessage: "A sequência correta é: wish / had.",
    },
  },
  {
    key: "audio-i-wish",
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction:
        "Pense em algo que você gostaria que fosse diferente na sua vida agora mesmo.",
      helperText:
        'Mande um áudio começando com: "I wish I..."',
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "I wish I could speak French. / I wish I had more free time.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Seu áudio com I wish foi gravado com sucesso.",
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
