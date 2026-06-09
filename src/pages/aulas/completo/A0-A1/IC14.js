import createLessonScreen from "../../LessonScreen";
import { ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        ICA1.A14S1,
        `As aparências enganam! Como dizemos que algo NÃO é o que parece?`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A14S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A14S2.mp3"),
      audioDurationMs: 800,
      answerOptions: ["I'm not", "I am't"],
      correctOption: "I'm not",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "I\'m not" para dizer "oi".',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `O 'I' é o único que não gruda no not. Ele sempre fica I'm not. Ouça a pronúncia e repita: aim-nót.`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A14S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A14S4.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["She isn't", "She aren't"],
      correctOption: "She isn't",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "She isn\'t" para dizer "ela não ?".',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `Para ele, ela ou coisas (He, She, It), o is e o not viram uma coisa só: Isn't. O som é um 'iz-ânt' bem curto no final.`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt: "Escreva a palavra",
      audioSource: require("../../../../../mp3/IC/A0-A1/A14S6.mp3"),
      audioDurationMs: 1000,
      letters: ["N", "I", "S", "T"],
      correctWord: "ISNT",
      successTitle: "Correto",
      successMessage: 'A palavra correta é "Isn\'t".',
    },
  },
  {
    component: "Exercise1",
    activity: {
      prompt: "Encontre a tradução",
      pairs: [
        { en: "He", pt: "isn't a boy" },
        { en: "She", pt: "isn't a girl" },
        { en: "It", pt: "isn't a cat" },
      ],
      successTitle: "Excelente",
      successMessage: "Você acertou todas as traduções.",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A13S4,
      audioSource: require("../../../../../mp3/IC/A0-A1/A14S8.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["They aren't", "They isn't"],
      correctOption: "They aren't",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "They aren\'t" para dizer "oi".',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `Para o plural (You, We, They), o are e o not viram Aren't. Imagine que você está dando um freio brusco no final da palavra: 'ar-ânt'.`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Coloque a frase em ordem.",
      words: ["friends", "aren't", "they"],
      correctOrder: ["they", "aren't", "friends"],
      successTitle: "Correto",
      successMessage: `A frase correta é "They aren't friends."`,
    },
  },
  {
    component: "Exercise4",
    activity: {
      prompt: "Corrija",
      image: ICA1.A14S11,
      wrongSentence: "Você diz que não é brasileiro (plural).",
      options: ["We isn't Brazilian.", "We aren't Brazilian."],
      correctAnswer: "We aren't Brazilian.",
      successTitle: "Correto",
      successMessage: 'A forma correta é "We aren\'t Brazilian."',
    },
  },
  {
    component: "Exercise12",
    activity: {
      prompt: "Write your introduction",
      instruction: "Escreva brevemente sobre você em inglês.",
      helperText:
        "Olhe para a foto de uma pizza deliciosa. Escreva uma frase dizendo que ela NÃO é ruim (bad).",
      image: ICA1.A14S12,
      placeholder: "Hello...",
      tipText: '"It isn\'t bad" ou "It is not bad".',
      minLength: 3,
      successTitle: "Correto",
      successMessage: "Seu texto foi preenchido com sucesso.",
    },
  },
  {
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction: "Fale brevemente sobre você em inglês.",
      helperText: "Diga com confiança: 'Eu não sou americano!' em inglês.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: '"I\'m not american"',
      recordLabel: "Speak",
      stopLabel: "Parar",
      playLabel: "Ouvir",
      pauseLabel: "Pausar",
      rerecordLabel: "Regravar",
      submitLabel: "Enviar áudio",
      successTitle: "Correto",
      successMessage: "Seu áudio foi gravado com sucesso.",
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `Sensacional! Negar em inglês agora é fácil para você. Você já sabe afirmar e negar.
Próxima parada: /blue{Review de Perguntas}, onde o 'motor' pula para a frente! Are you ready? `,
      ],
      continueLabel: "Continuar",
    },
  },

  {
    key: "lesson-finish",
    type: "finish",
  },
];

export default createLessonScreen(LESSON_SLIDES, {
  storageKey: "@progesso_ingles_completo_A0-A1",
  nextRouteName: "Inglescompleto",
  screenName: "InglesCompletoA0A1LessonScreen",
});
