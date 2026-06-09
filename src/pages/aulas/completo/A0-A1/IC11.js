import createLessonScreen from "../../LessonScreen";
import { ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `O camaleão  abraíado com dois amigos (Nós)`,
        ICA1.A11S1,
        `Ele apontando para um grupo de pássaros no céu (Eles).`,
        ICA1.A11S1p2,
        `Você faz parte do grupo ou está apenas observando? Vamos descobrir como falar de 'nós' e 'eles'!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A10S3,
      audioSource: require("../../../../../mp3/IC/A0-A1/A11S2.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["We ", "Me"],
      correctOption: "We ",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "Are" para dizer "você".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A11S3,
      audioSource: require("../../../../../mp3/IC/A0-A1/A11S3.mp3"),
      audioDurationMs: 800,
      answerOptions: ["They", "Day"],
      correctOption: "They",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "You are" para dizer "você".',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `O Camaleão ensina: 
Ao falar /blueThey, coloque a ponta da língua nos dentes de cima e solte o ar. Se soar como 'Day', você está dizendo 'Dia'. Pratique o sopro! `,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A10S3,
      audioSource: require("../../../../../mp3/IC/A0-A1/A11S5.mp3"),
      audioDurationMs: 900,
      answerOptions: ["We are", "We is"],
      correctOption: "We are",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "You are" para dizer "você".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A11S3,
      audioSource: require("../../../../../mp3/IC/A0-A1/A11S6.mp3"),
      audioDurationMs: 900,
      answerOptions: ["They are", "They is"],
      correctOption: "They are",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "You are" para dizer "você".',
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Coloque a frase em ordem.",
      words: ["ready", "are", "we"],
      correctOrder: ["we", "are", "ready"],
      successTitle: "Correto",
      successMessage: `A frase correta é "We are ready."`,
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Coloque a frase em ordem.",
      words: ["friends", "they", "are"],
      correctOrder: ["they", "are", "friends"],
      successTitle: "Correto",
      successMessage: `A frase correta é "They are friends."`,
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A10S5,
      audioSource: require("../../../../../mp3/IC/A0-A1/A10S5.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Aren't ", "Are"],
      correctOption: "Aren't ",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "Aren\'t " para dizer "você".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A11S10,
      audioSource: require("../../../../../mp3/IC/A0-A1/A11S10.mp3"),
      audioDurationMs: 2000,
      answerOptions: ["We aren't ", "We are"],
      correctOption: "We aren't ",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "We aren\'t " para dizer "nós".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A11S11,
      audioSource: require("../../../../../mp3/IC/A0-A1/A11S11.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["They aren't", "They are"],
      correctOption: "They aren't",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "They aren\'t " para dizer "eles/elas".',
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Coloque a frase em ordem.",
      words: ["late", "aren't", "we"],
      correctOrder: ["we", "aren't", "late"],
      successTitle: "Correto",
      successMessage: `A frase correta é "We aren't late."`,
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Coloque a frase em ordem.",
      words: ["Brazilian", "aren't", "they"],
      correctOrder: ["they", "aren't", "Brazilian"],
      successTitle: "Correto",
      successMessage: `A frase correta é "They aren't Brazilian."`,
    },
  },
  {
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction: "Fale brevemente sobre você em inglês.",
      helperText: "Aponte para você e um amigo e diga: 'Nós somos legais'",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "We are cool",
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
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction: "Fale brevemente sobre você em inglês.",
      helperText: "Aponte para um grupo longe e diga: 'Eles não são médicos'",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "They aren't doctors",
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
        `Sensacional! Sua audição está ficando biônica! Agora você já sabe diferenciar quem está com você /blue(We) de quem está lá fora /blue(They). Próxima aula: Como inverter tudo isso para fazer perguntas com ARE! o`,
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
