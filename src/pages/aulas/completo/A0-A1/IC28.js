import createLessonScreen from "../../LessonScreen";
import { ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise17",
    activity: {
      label: "It's J-A...",
      content: [
        ICA1.A28S1,
        "Em viagens, nomes diferentes precisam ser soletrados. Vamos praticar com nomes americanos e britânicos?",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A28S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A28S2.mp3"),
      audioDurationMs: 4500,
      answerOptions: ["Madson", "Madison"],
      correctOption: "Madison",
      successTitle: "Correto",
      feedbackMessage: 'A soletração forma "Madison".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A28S3,
      audioSource: require("../../../../../mp3/IC/A0-A1/A28S3.mp3"),
      audioDurationMs: 5000,
      answerOptions: ["Poppy", "Popy"],
      correctOption: "Poppy",
      successTitle: "Correto",
      feedbackMessage: "Atenção ao Y no final: a forma correta é Poppy.",
    },
  },
  {
    component: "Exercise1",
    activity: {
      prompt: "Conecte nomes às soletrações",
      pairs: [
        { en: "Ethan (US)", pt: "Í-têitch-êi-én" },
        { en: "Harrison (UK)", pt: "Éitch-êi-ár-ár-ái-és-ôu-én" },
        { en: "Imogen (UK)", pt: "Ái-ém-ôu-djí-í-én" },
      ],
      successTitle: "Excelente",
      successMessage:
        "Ethan = Í-têitch-êi-én, Harrison = Éitch-êi-ár-ár-ái-és-ôu-én, Imogen = Ái-ém-ôu-djí-í-én.",
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Você quer pedir para o Sr. Harper soletrar o nome dele.",
      words: ["spell", "you", "How", "do", "Harper?"],
      correctOrder: ["How", "do", "you", "spell", "Harper?"],
      successTitle: "Correto",
      successMessage: 'A frase correta é "How do you spell Harper?"',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Símbolos Digitais",
      content: [
        ICA1.A28S6,
        "E-mails usam códigos. Você sabe como dizer 'ponto' ou 'sublinhado' em inglês?",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A28S7,
      audioSource: require("../../../../../mp3/IC/A0-A1/A28S7.mp3"),
      audioDurationMs: 2200,
      answerOptions: ["tech_hero@mail.net", "tech-hero@mail.net"],
      correctOption: "tech-hero@mail.net",
      successTitle: "Correto",
      feedbackMessage: "Dash é o hífen, o traço do meio.",
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Sabe aquele traço que fica embaixo, o 'sublinhado'?",
        "Em inglês ele se chama Underscore (Ander-scór).",
        "Pense em Under (embaixo) + Score (traço).",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise1",
    activity: {
      prompt: "Conecte o domínio ao som",
      pairs: [
        { en: ".com", pt: "Dot com" },
        { en: ".net", pt: "Dot net" },
        { en: ".edu", pt: "Dot edu" },
      ],
      successTitle: "Excelente",
      successMessage: ".com = Dot com, .net = Dot net, .edu = Dot edu.",
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Monte o endereço do site de viagens fictício.",
      words: ["net", "travel", "_", ".", "world"],
      correctOrder: ["travel", "_", "world", ".", "net"],
      successTitle: "Correto",
      successMessage: 'O endereço correto é "travel_world.net".',
    },
  },
  {
    component: "Exercise11",
    activity: {
      prompt: "O Camaleão vai ditar um e-mail secreto. Digite rápido!",
      title: "Digite rápido",
      placeholder: "Digite aqui",
      secondsPerWord: 12,
      words: ["blue.sky@web.com"],
      successTitle: "Correto",
      successMessage: "Você digitou o e-mail secreto no tempo certo.",
    },
  },
  {
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction:
        "Leia este e-mail fictício para o Camaleão: star_ninja@lingueto.edu.",
      helperText: "Diga os símbolos com naturalidade.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Star underscore ninja at lingueto dot edu",
      recordLabel: "Speak",
      stopLabel: "Parar",
      playLabel: "Ouvir",
      pauseLabel: "Pausar",
      rerecordLabel: "Regravar",
      submitLabel: "Enviar áudio",
      successTitle: "Correto",
      successMessage:
        'Resposta esperada: "Star underscore ninja at lingueto dot edu".',
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
