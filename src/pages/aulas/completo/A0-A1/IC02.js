import createLessonScreen from "../../LessonScreen";
import { BussinesImages, Images, ICA1 } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "/blue{Observe a cena}",
        ICA1.A2S1,
        `Você usaria 'Hello' com seu melhor amigo em um momento de diversão? Ou existe algo mais natural?`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A2S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A2S2.mp3"),
      audioDurationMs: 624,
      answerOptions: ["Hey", "Hay"],
      correctOption: "Hey",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "Hey" para dizer "oi" de forma mais informal.',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `Cuidado! /blueHey ? Ótimo para amigos, família e colegas próximos.
Mas atenção: usar "Hey" com seu chefe em uma reunião séria pode parecer que você está sendo desleixado ou até desrespeitoso. 
Na dúvida com estranhos? 
Fique com o Hi ou Hello!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise15",
    activity: {
      prompt: "Clique na imagem e na palavra",
      images: [
        { id: "img1", image: ICA1.A2S4 },
        { id: "img2", image: ICA1.A2S4p2 },
      ],
      words: [
        { id: "test1", label: "Hey" },
        { id: "test2", label: "Hello" },
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
        { en: "Hey", pt: "Oi / Ei (muito informal)" },
        {
          en: "Hey there",
          pt: "Olá / Oi (de um jeito mais carinhoso/amigável)",
        },
      ],
      successTitle: "Excelente",
      successMessage: "Você acertou todas as traduções.",
    },
  },
  {
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt: "Escreva a palavra",
      audioSource: require("../../../../../mp3/IC/A0-A1/A2S6.mp3"),
      audioDurationMs: 824,
      letters: ["H", "E", "Y", "T", "H", "E", "R", "E"],
      correctWord: "HEYTHERE",
      successTitle: "Correto",
      successMessage: 'A palavra correta é "Hey there".',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `Dica de Mestre: /blue{Hey there} é uma versão levemente mais 'cheia' do que o simples Hey. 
É muito comum quando você quer ser extra amigável ao ver alguém que gosta. 
É como um 'Oi, tudo bem?' resumido em duas palavras! `,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Escute e responda",
      image: ICA1.A2S8,
      audioSource: require("../../../../../mp3/IC/A0-A1/A2S8.mp3"),
      audioDurationMs: 1000,
      dialogue:
        " Nesse áudio, a pessoa está usando 'Hey' como uma saudação amigável?",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      successMessage: 'A resposta correta é "false".',
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Coloque a frase em ordem.",
      words: ["hey", "there,", "Lucas!", "good", "morning"],
      correctOrder: ["hey", "there,", "Lucas!", "good", "morning"],
      successTitle: "Correto",
      successMessage: `A frase correta é "Hey there, Lucas! Good morning."`,
    },
  },
  {
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction: "Fale brevemente sobre você em inglês.",
      helperText:
        "Grave um áudio cumprimentando um colega de trabalho que você gosta muito e tem intimidade. Use 'Hey there!' com uma entonação bem positiva.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Hey there!",
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
      words: ["Hey", "Hi", "There", "Hello"],
      successTitle: "Correto",
      successMessage: "Você digitou todas as palavras no tempo certo.",
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `/blue{Você subiu de nível!}
Sabia que no sul dos EUA, o 'Hey' é quase obrigatério? 
Já em Londres, o 'Hi' ainda é o rei da vizinhança. 
No Lingueto, você aprende a falar com o mundo todo! 
Próxima aula: What's up? (A gíria que todo mundo quer saber). Até l?! `,
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
