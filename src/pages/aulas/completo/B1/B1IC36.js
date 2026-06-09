import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "should-have-intro",
    component: "Exercise17",
    activity: {
      label: "Falando de Arrependimentos (Should have)",
      content: [
        `Como dizemos "Eu deveria ter feito" em inglês?

Usamos:
/blue{Should have + Past Participle}

Essa estrutura É perfeita para falar sobre arrependimentos ou dar broncas sobre o passado.

Dica de Pronúncia Nativa:
No dia a dia, "Should have" vira um som curto: "Shoulda".

Exemplo:
I shoulda told you.`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "should-have-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute a palavra e escolha a alternativa correta.",
      image: ICB1.A36S2,
      audioSource: require("../../../../../mp3/IC/B1/A36S2.mp3"),
      audioDurationMs: 1300,
      answerOptions: ["Should have", "Could have"],
      correctOption: "Should have",
      successTitle: "Correto",
      feedbackMessage:
        '"Should have" fala de arrependimento ou crítica sobre o passado.',
    },
  },
  {
    key: "should-have-called",
    component: "Exercise4",
    activity: {
      prompt: "Escolha a frase gramaticalmente correta para a situação.",
      image: ICB1.A36S3,
      wrongSentence: "Late apology",
      options: [
        "You should had called me!",
        "You should have called me!",
        "You should called me!",
      ],
      correctAnswer: "You should have called me!",
      successTitle: "Correto",
      successMessage: "Depois de should usamos have + past participle.",
    },
  },
  {
    key: "failed-test-complete",
    component: "Exercise5",
    activity: {
      prompt: "Complete a frase com a opção correta.",
      sentenceStart: "I failed the test. I",
      sentenceEnd: "studied more.",
      options: ["should have", "should"],
      correctAnswer: "should have",
      successTitle: "Correto",
      successMessage:
        "Should have + studied fala do que deveria ter acontecido.",
    },
  },
  {
    key: "late-advice-match",
    component: "Exercise1",
    activity: {
      prompt:
        "Conecte as partes para formar o conselho que chegou tarde demais.",
      pairs: [
        { en: "You should have", pt: "arrived earlier." },
        { en: "I shouldn't have", pt: "eaten so much." },
        { en: "She should have", pt: "told the truth." },
      ],
      successTitle: "Correto",
      successMessage: "Todas as frases usam should have + particípio.",
    },
  },
  {
    key: "umbrella-order",
    component: "Exercise6",
    activity: {
      prompt: "Clique nas palavras para escrever a frase na ordem correta.",
      words: ["an", "brought", "have", "I", "umbrella", "should"],
      correctOrder: ["I", "should", "have", "brought", "an", "umbrella"],
      successTitle: "Correto",
      successMessage: "I should have brought an umbrella.",
    },
  },
  {
    key: "spoken-spelling",
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt:
        'Organize as letras para formar a palavra que acompanha "Should have".',
      audioSource: require("../../../../../mp3/IC/B1/A36S7.mp3"),
      audioDurationMs: 1000,
      letters: ["O", "S", "K", "P", "N", "E"],
      correctWord: "SPOKEN",
      successTitle: "Correto",
      successMessage: "Spoken é o particípio de speak.",
    },
  },
  {
    key: "should-have-told-me",
    component: "Exercise18",
    activity: {
      prompt: "As palavras estão bagunçadas. Digite a frase corretamente.",
      scrambledSentence: "have / me / told / You / should",
      correctAnswer: "You should have told me.",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "You should have told me.",
    },
  },
  {
    key: "regret-audio",
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction:
        'Mande um áudio desabafando sobre um pequeno arrependimento da semana passada. Use "I should have...".',
      helperText: "Ex: I should have gone to sleep earlier.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "I should have gone to sleep earlier.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Seu áudio com should have foi gravado.",
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
