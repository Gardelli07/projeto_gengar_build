import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "causative-have-intro",
    component: "Exercise17",
    activity: {
      label: "Causative Have: Alguém fez por mim!",
      content: [
        `Em inglês, não dizemos "Eu cortei meu cabelo" se fomos ao salão.

Se você disser "I cut my hair", o nativo vai achar que você pegou a tesoura e cortou sozinho em casa!

Para serviços que pagamos para alguém fazer, usamos:

/blue{Have + Objeto + Past Participle}

Exemplo:
I had my car fixed.
Eu mandei consertar meu carro.`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "fixed-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute a palavra e escolha a alternativa correta.",
      image: ICB1.A31S2,
      audioSource: require("../../../../../mp3/IC/B1/A31S2.mp3"),
      audioDurationMs: 900,
      answerOptions: ["Fixed", "Mixed"],
      correctOption: "Fixed",
      successTitle: "Correto",
      feedbackMessage: '"Fixed" é o particípio de fix: consertado.',
    },
  },
  {
    key: "car-fixed",
    component: "Exercise4",
    activity: {
      prompt:
        'Você quer dizer que "mandou consertar o carro". Escolha a frase correta.',
      image: ICB1.A31S2,
      wrongSentence: "Causative have",
      options: [
        "I fixed my car yesterday.",
        "I had my car fixed yesterday.",
        "I have fixed my car yesterday.",
      ],
      correctAnswer: "I had my car fixed yesterday.",
      successTitle: "Correto",
      successMessage:
        "Essa frase mostra que alguém consertou o carro para você.",
    },
  },
  {
    key: "hair-cut",
    component: "Exercise5",
    activity: {
      prompt: "Complete a frase corretamente.",
      image: ICB1.A31S3,
      sentenceStart: "She",
      sentenceEnd: "her hair cut at the new salon.",
      options: ["had", "did"],
      correctAnswer: "had",
      successTitle: "Correto",
      successMessage:
        "Usamos had + objeto + past participle para serviços.",
    },
  },
  {
    key: "have-vs-get-tip",
    component: "Exercise17",
    activity: {
      label: "Formal (Have) vs. Informal (Get)",
      content: [
        `"I had my car fixed" é o padrão.

Mas, na linguagem falada das ruas, É super comum trocar have por get.

/blue{Formal}
I had my car fixed.

/blue{Informal}
I got my car fixed.

O significado É exatamente o mesmo, mas "got" soa mais descontraído!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "order-house-painted",
    component: "Exercise6",
    activity: {
      prompt: "Clique nas palavras para escrever a frase na ordem correta.",
      words: ["like", "to", "my", "I'd", "painted", "have", "house"],
      correctOrder: ["I'd", "like", "to", "have", "my", "house", "painted"],
      successTitle: "Correto",
      successMessage: "I'd like to have my house painted.",
    },
  },
  {
    key: "spell-fixed",
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt: "Organize as letras para formar a palavra correta no particípio.",
      audioSource: require("../../../../../mp3/IC/B1/A31S7.mp3"),
      audioDurationMs: 900,
      letters: ["X", "E", "F", "I", "D"],
      correctWord: "FIXED",
      successTitle: "Correto",
      successMessage: 'A palavra correta é "FIXED".',
    },
  },
  {
    key: "listen-computer-repaired",
    component: "Exercise19",
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e escreva exatamente o que você escutou.",
      audioSource: require("../../../../../mp3/IC/B1/A31S8.mp3"),
      audioDurationMs: 3200,
      correctAnswer: "I need to have my computer repaired.",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "Você escreveu a frase com causative have corretamente.",
      errorMessage: "Confira a estrutura: have my computer repaired.",
    },
  },
  {
    key: "audio-services",
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction:
        "Você prefere fazer as coisas sozinho ou pagar por serviços?",
      helperText:
        'Use Causative Have. Ex: "I prefer to have my car washed because I don\'t have time."',
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "I prefer to have my car washed because I don't have time.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Seu áudio com causative have foi gravado.",
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
