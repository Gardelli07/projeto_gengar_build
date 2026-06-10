import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `Imagine-se neste ambiente.`,
        ICA1.A3S1,
        " Qual dessas opções soaria mais natural aqui?",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A3S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A3S2.mp3"),
      audioDurationMs: 1500,
      answerOptions: ["What's up?", "Watch up?"],
      correctOption: "What's up?",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "What\'s up?".',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `/blue{What's up?} é o nosso famoso 'E aí'. 
Ele também pode ser abreviado como SUP. Mas atenção: na maioria das vezes, a pessoa não está perguntando como você está de verdade, é apenas um cumprimento. 
A resposta clássicaí 'Not much' (Nada de mais). `,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt: "Escreva a palavra",
      audioSource: require("../../../../../mp3/IC/A0-A1/A3S4.mp3"),
      audioDurationMs: 1000,
      letters: ["S", "U", "P"],
      correctWord: "SUP",
      successTitle: "Correto",
      successMessage: 'A palavra correta é "SUP".',
    },
  },
  {
    component: "Exercise15",
    activity: {
      prompt: "Clique na imagem e na palavra",
      images: [
        { id: "img1", image: ICA1.A3S5 },
        { id: "img2", image: ICA1.A3S1 },
      ],
      words: [
        { id: "test1", label: "Howdy" },
        { id: "test2", label: "Sup" },
      ],
      pairs: [
        { imageId: "img1", wordId: "test1" },
        { imageId: "img2", wordId: "test2" },
      ],
      successTitle: "Correto",
      successMessage: "Você formou os dois pares corretamente.",
    },
  },
  {
    component: "Exercise1",
    activity: {
      prompt: "Encontre a tradução",
      pairs: [
        { en: "What's up? ", pt: "E aí (Padrão)" },
        { en: "Howdy ", pt: "Olá/E aí (Regional/Caubói)" },
        { en: "Sup", pt: "E aí (Gíria curta)" },
      ],
      successTitle: "Excelente",
      successMessage: "Você acertou todas as traduções.",
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `/blueHowdy é uma mistura de 'How do you do?'. É muito comum no sul dos Estados Unidos. Se você for ao Texas e disser 'Howdy', vai ganhar um sorriso na hora! é uma forma de mostrar que você conhece a cultura local. `,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise4",
    activity: {
      prompt: "Corrija",
      image: ICA1.A3S8,
      wrongSentence: "X",
      options: ["Howdy, Mr. President.", "What's up, guys!"],
      correctAnswer: "What's up, guys!",
      successTitle: "Correto",
      successMessage: "A forma correta é What's up, guys!",
    },
  },
  {
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Escute e responda",
      image: ICA1.A3S9,
      audioSource: require("../../../../../mp3/IC/A0-A1/A3S9.mp3"),
      audioDurationMs: 2500,
      dialogue: "A pessoa B está contando uma história longa sobre o seu dia.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      successMessage: "What's up É sempre usada como cumprimento.",
    },
  },
  {
    component: "Exercise5",
    activity: {
      prompt: "Complete a frase",
      sentenceStart: "A forma correta de abreviar what\'s up é:",
      sentenceEnd: "",
      options: ["sup ", "whatés"],
      correctAnswer: "sup",
      successTitle: "Correto",
      successMessage: 'A forma correta é de abreviar "What\'s up?" ? "Sup".',
    },
  },
  {
    component: "Exercise12",
    activity: {
      prompt: "Write your introduction",
      instruction: "Escreva brevemente sobre você em inglês.",
      helperText:
        "Seu amigo te mandou uma mensagem no WhatsApp: 'Sup, man!'. Responda usando a resposta padrão que aprendemos hoje.",
      placeholder: "Hello...",
      tipText: '"Not much" ou "Nothing much"',
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
      helperText:
        "Grave um áudio cumprimentando alguém usando 'Howdy!' com uma entonação bem animada, como se estivesse usando um chapéu de caubói!",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Howdy!",
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
    component: "Exercise11",
    activity: {
      prompt: "Escreva rápido",
      title: "Escreva a palavra abaixo",
      placeholder: "Digite aqui",
      secondsPerWord: 8,
      words: ["Sup", "Howdy", "Whatés up", "Much"],
      successTitle: "Correto",
      successMessage: "Você digitou todas as palavras no tempo certo.",
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `Uau! Você agora fala como um nativo das ruas e do campo! Lembre-se: gírias são como tempero, use com moderaíão e apenas com quem você tem intimidade. Próxima parada: /blueGoodbye! (Como sair de fininho ou se despedir com estilo). See ya! `,
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
