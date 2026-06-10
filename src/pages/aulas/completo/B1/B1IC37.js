import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "detective-intro",
    component: "Exercise17",
    activity: {
      label: "Bancando o Detetive",
      content: [
        `Quando não temos certeza do que aconteceu no passado, nós especulamos:

- Must have: quase certeza, uma dedução lógica.
Ex: He must have forgotten.

- Might have / May have: possibilidade, algo mais 50/50.
Ex: She might have missed the bus.

Essas estruturas sempre vâm acompanhadas do verbo no particípio!`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "door-open-true-false",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e responda: Verdadeiro ou Falso?",
      image: ICB1.A37S2,
      audioSource: require("../../../../../mp3/IC/B1/A37S2.mp3"),
      audioDurationMs: 3300,
      statement: "The speaker is 100% sure they saw someone open the door.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage:
        "Must have é uma especulaíão forte, não uma certeza visual.",
    },
  },
  {
    key: "might-have-got-lost",
    component: "Exercise4",
    activity: {
      prompt: "é uma leve possibilidade (Might). Qual a frase corretaí",
      image: ICB1.A37S3,
      wrongSentence: "Might have",
      options: [
        "She might have got lost.",
        "She might had got lost.",
        "She might have get lost.",
      ],
      correctAnswer: "She might have got lost.",
      successTitle: "Correto",
      successMessage: "Might have também pede o verbo no particípio.",
    },
  },
  {
    key: "must-have-rained",
    component: "Exercise5",
    activity: {
      prompt: "é uma dedução lógica de quase 100% (Must). Complete a frase.",
      sentenceStart: "Look at the streets. It",
      sentenceEnd: "rained last night.",
      options: ["must have", "might have"],
      correctAnswer: "must have",
      successTitle: "Correto",
      successMessage:
        "Must have indica uma dedução forte baseada em evidência.",
    },
  },
  {
    key: "certainty-match",
    component: "Exercise1",
    activity: {
      prompt: "Conecte a expressão ao grau de certeza.",
      pairs: [
        { en: "Must have", pt: "Quase certeza (Deduão)" },
        { en: "Might have", pt: "Possibilidade (Talvez)" },
        { en: "Should have", pt: "Arrependimento (Deveria)" },
      ],
      successTitle: "Correto",
      successMessage: "Cada modal perfeito muda a intenção da frase.",
    },
  },
  {
    key: "speculation-story-order",
    component: "Exercise7",
    activity: {
      prompt: "Ordene a história de especulaíão clicando nas frases.",
      options: [
        "John didn't come to work today.",
        "He might have woken up late.",
        "Or he must have gotten sick, he was coughing yesterday.",
      ],
      correctOrder: [
        "John didn't come to work today.",
        "He might have woken up late.",
        "Or he must have gotten sick, he was coughing yesterday.",
      ],
      successTitle: "Correto",
      successMessage: "A história vai do fato para as possíveis explicações.",
    },
  },
  {
    key: "dropped-keys-order",
    component: "Exercise6",
    activity: {
      prompt: "Clique nas palavras para escrever a frase na ordem correta.",
      words: ["dropped", "have", "Someone", "keys", "must", "their"],
      correctOrder: ["Someone", "must", "have", "dropped", "their", "keys"],
      successTitle: "Correto",
      successMessage: "Someone must have dropped their keys.",
    },
  },
  {
    key: "missed-train-listen",
    component: "Exercise19",
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e escreva o que escutou.",
      audioSource: require("../../../../../mp3/IC/B1/A37S8.mp3"),
      audioDurationMs: 2600,
      correctAnswer: "She might have missed the train.",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "She might have missed the train.",
      errorMessage: "Confira a estrutura: might have + missed.",
    },
  },
  {
    key: "cake-detective-writing",
    component: "Exercise12",
    activity: {
      prompt: "Writing",
      instruction:
        'Seja o detetive! Escreva 2 frases especulando quem comeu o bolo que estava na sua geladeira, usando "Must have" e "Might have".',
      placeholder:
        "My brother must have eaten the cake.\nMy sister might have taken a slice.",
      helperText:
        "Use must have para dedução forte e might have para possibilidade.",
      submitLabel: "Enviar",
      successTitle: "Correto",
      successMessage: "Boa investigação com modais perfeitos.",
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
