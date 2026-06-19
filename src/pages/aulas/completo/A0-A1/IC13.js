import createLessonScreen from "../../LessonScreen";
import { ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A13S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A13S2.mp3"),
      audioDurationMs: 600,
      answerOptions: ["I am", "I is"],
      correctOption: "I am",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "I am" para dizer "eu sou".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A13S3,
      audioSource: require("../../../../../mp3/IC/A0-A1/A13S3.mp3"),
      audioDurationMs: 900,
      answerOptions: ["She is", "She are"],
      correctOption: "She is",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "She is" para dizer "ela é".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A13S4,
      audioSource: require("../../../../../mp3/IC/A0-A1/A13S4.mp3"),
      audioDurationMs: 2500,
      answerOptions: ["We are", "We is"],
      correctOption: "We are",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "We are" para dizer "nós somos".',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `Dica de Revisão: Guarde os times na memória:
  • I + AM (Sempre sozinho)
  • He / She / It + IS (O time do singular)
  • You / We / They + ARE (O time do plural) 
Não misture os motores ou o carro não anda!
 `,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise1",
    activity: {
      prompt: "Encontre a tradução",
      pairs: [
        { en: "I", pt: "am" },
        { en: "He", pt: "is" },
        { en: "They", pt: "are" },
      ],
      successTitle: "Excelente",
      successMessage: "Você acertou todas as conjunções.",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A13S7,
      audioSource: require("../../../../../mp3/IC/A0-A1/A13S6.mpeg"),
      audioDurationMs: 824,
      answerOptions: ["It is", "It am"],
      correctOption: "It is",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "It is" para dizer "ele é".',
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Coloque a frase em ordem.",
      words: ["is", "doctor", "he", "a"],
      correctOrder: ["he", "is", "a", "doctor"],
      successTitle: "Correto",
      successMessage: `A frase correta é "He is a doctor."`,
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A13S9,
      audioSource: require("../../../../../mp3/IC/A0-A1/A13S8.mpeg"),
      audioDurationMs: 824,
      answerOptions: ["You are", "You is"],
      correctOption: "You are",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "You are" para dizer "você ?".',
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Coloque a frase em ordem.",
      words: ["are", "we", "friends"],
      correctOrder: ["we", "are", "friends"],
      successTitle: "Correto",
      successMessage: `A frase correta é "We are friends."`,
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `/blue{Lembre-se:} 
Na vida real, o 'am, is, are' encurtam!
  • I am -> I'm
  • He is -> He's
  • They are -> They're 
Pratique o som curto para soar como um nativo! 
`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise4",
    activity: {
      prompt: "Corrija",
      image: ICA1.A13S13,
      wrongSentence: "Você apresenta sua família.",
      options: ["They is my family.", "They are my family."],
      correctAnswer: "They are my family.",
      successTitle: "Correto",
      successMessage: 'A forma correta é "They are my family."',
    },
  },
  {
    component: "Exercise12",
    activity: {
      prompt: "Write your introduction",
      instruction: "Escreva brevemente sobre você em inglês",
      helperText:
        "Escreva duas frases: uma sobre você (usando I) e uma sobre um objeto perto de você (usando It).",
      placeholder: "Hello...",
      tipText: '"I am Kaique. It is a book."',
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
      helperText: "Aponte para seus amigos e grave: 'Vocês são legais!'",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "You are cool.",
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
        ` Parabéns! Você consolidou a base de toda a comunicação em inglês. Você agora sabe dizer QUEM É QUEM. Próxima parada: Review da Negativa, onde vamos aprender a dizer o que as coisas NÃO são! See you! `,
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
