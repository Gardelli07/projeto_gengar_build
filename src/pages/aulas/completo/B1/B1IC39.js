import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "contrast-linking-words-intro",
    component: "Exercise17",
    activity: {
      label: "Elevando o nível do seu debate",
      content: [
        `Para soar como um nativo fluente e educado ao discordar ou contrastar ideias, usamos "Linking Words" avançadas.

- However (No entanto): formal, geralmente no início da frase.
- Nevertheless (Apesar disso): muito formal, excelente para negócios.
- Despite (Apesar de): usado antes de um substantivo ou verbo com -ing.

Nunca use "Despite of"!`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "nevertheless-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute a palavra e escolha a alternativa correta.",
      image: ICB1.A39S2,
      audioSource: require("../../../../../mp3/IC/B1/A39S2.mp3"),
      audioDurationMs: 1400,
      answerOptions: ["Nevertheless", "Never the less"],
      correctOption: "Nevertheless",
      successTitle: "Correto",
      feedbackMessage:
        '"Nevertheless" é uma só palavra e soa bem formal em debates e negócios.',
    },
  },
  {
    key: "despite-rain-correct",
    component: "Exercise4",
    activity: {
      prompt: 'Escolha a frase escrita corretamente usando "Despite".',
      image: ICB1.A39S3,
      wrongSentence: "Despite",
      options: [
        "Despite of the rain, she was happy.",
        "Despite the rain, she was happy.",
        "Despite it rained, she was happy.",
      ],
      correctAnswer: "Despite the rain, she was happy.",
      successTitle: "Correto",
      successMessage:
        'Use "Despite" direto antes de substantivo ou -ing. Nada de "despite of".',
    },
  },
  {
    key: "however-expensive",
    component: "Exercise5",
    activity: {
      prompt: "Complete a frase com a opção correta.",
      sentenceStart: "The car is beautiful.",
      sentenceEnd: ", it is too expensive.",
      options: ["However", "Despite"],
      correctAnswer: "However",
      successTitle: "Correto",
      successMessage:
        "However conecta duas ideias contrastantes em frases completas.",
    },
  },
  {
    key: "native-tip",
    component: "Exercise17",
    activity: {
      label: "Dica de Nativo",
      content: [
        'No dia a dia informal, nativos usam muito "But" ou "Even though". Deixe "Nevertheless" para e-mails de trabalho, redações (IELTS/TOEFL) ou quando quiser impressionar em uma reunião!',
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "linking-word-match",
    component: "Exercise1",
    activity: {
      prompt: "Conecte a linking word à sua tradução/sinânimo mais próximo.",
      pairs: [
        { en: "However", pt: "No entanto" },
        { en: "Despite", pt: "Apesar de" },
        { en: "But", pt: "Mas (Informal)" },
      ],
      successTitle: "Correto",
      successMessage:
        "Essas palavras ajudam a contrastar ideias com níveis diferentes de formalidade.",
    },
  },
  {
    key: "despite-studying-order",
    component: "Exercise6",
    activity: {
      prompt:
        '"Despite" precisa ser seguido de -ing. Clique nas palavras para escrever a frase.',
      words: ["studying", "failed", "Despite", "he", "hard,"],
      correctOrder: ["Despite", "studying", "hard,", "he", "failed"],
      successTitle: "Correto",
      successMessage: "Despite studying hard, he failed.",
    },
  },
  {
    key: "product-contrast-complete",
    component: "Exercise2",
    activity: {
      prompt: "Complete o texto com as alternativas.",
      paragraphs: [
        [
          "The new product is very innovative. ",
          { id: "blank-1", options: ["However", "Despite"], answer: "However" },
          ", the price is too high. ",
          {
            id: "blank-2",
            options: ["Despite", "Nevertheless"],
            answer: "Despite",
          },
          " the high price, we expect good sales.",
        ],
      ],
      successTitle: "Correto",
      successMessage:
        "However inicia contraste entre frases; despite vem antes de substantivo.",
    },
  },
  {
    key: "opinion-paragraph-writing",
    component: "Exercise12",
    activity: {
      prompt: "Writing",
      instruction:
        'Escreva um pequeno parágrafo defendendo uma opinião polêmica sua. Use "However" ou "Despite" para contrastar com a opinião dos outros.',
      placeholder: "People think fast food is bad. However, I believe...",
      helperText:
        'Use "However" para contrastar frases completas ou "Despite" antes de substantivo/-ing.',
      submitLabel: "Enviar",
      successTitle: "Correto",
      successMessage: "Ótimo uso de linking words para debate.",
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
