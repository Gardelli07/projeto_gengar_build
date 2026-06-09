import createLessonScreen from "../../LessonScreen";
import { ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `Para dizer quem você ?, você precisa de uma palavra mágica. Consegue adivinhar?`,
        ICA1.A8S1,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A8S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A8S2.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["He", "Hi"],
      correctOption: "He",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "He is" para dizer "ele é".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A8S3,
      audioSource: require("../../../../../mp3/IC/A0-A1/A8S3.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["She", "See"],
      correctOption: "She",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "She is" para dizer "ela é".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A8S4,
      audioSource: require("../../../../../mp3/IC/A0-A1/A8S4.mp3"),
      audioDurationMs: 600,
      answerOptions: ["It", "Eat"],
      correctOption: "It",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "It is" para dizer "?".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A8S5,
      audioSource: require("../../../../../mp3/IC/A0-A1/A8S5.mp3"),
      audioDurationMs: 600,
      answerOptions: ["Is", "Easy"],
      correctOption: "Is",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "Is" para dizer "?".',
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A8S6,
      audioSource: require("../../../../../mp3/IC/A0-A1/A8S6.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Isn't", "Is"],
      correctOption: "Isn't",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "Isn\'t" para dizer "?".',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `O Camaleão ensina: 
He (ele), She (ela) e It (coisas/animais) são melhores amigos da palavra IS. 
Pense neles como um time inseparável! `,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise15",
    activity: {
      prompt: "Clique na imagem e na palavra",
      images: [
        { id: "img1", image: ICA1.A8S2 },
        { id: "img2", image: ICA1.A8S3 },
        { id: "img3", image: ICA1.A8S4 },
      ],
      words: [
        { id: "test1", label: "He" },
        { id: "test2", label: "She" },
        { id: "test3", label: "It" },
      ],
      pairs: [
        { imageId: "img1", wordId: "test1" },
        { imageId: "img2", wordId: "test2" },
        { imageId: "img3", wordId: "test3" },
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
        { en: "He is", pt: "Ele é/está" },
        { en: "She is", pt: "Ela é/está" },
        { en: "It is", pt: "Isto ?/está" },
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
      audioSource: require("../../../../../mp3/IC/A0-A1/A8S6.mp3"),
      audioDurationMs: 800,
      letters: ["I", "S", "N", "T"],
      correctWord: "ISNT",
      successTitle: "Correto",
      successMessage: 'A palavra correta é "Isn\'t".',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        `Dica de Pronúncia: Em vez de falar 'Is not', os nativos quase sempre dizem Isn't. 
O som É como um 'iz-ent'. Pratique esse som para não parecer um robô!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise4",
    activity: {
      prompt: "Corrija",
      image: ICA1.A8S12,
      wrongSentence: "Você está apontando para uma médica.",
      options: ["He is a doctor.", "She is a doctor."],
      correctAnswer: "She is a doctor.",
      successTitle: "Correto",
      successMessage: 'A forma correta é "She is a doctor."',
    },
  },
  {
    component: "Exercise2",
    activity: {
      prompt: "Completar o Texto",
      paragraphs: [
        [
          "It",
          { id: "blank-1", answer: "isn’t", options: ["isn’t", "is"] },
          "a sunny day.",
        ],
        [
          "It",
          {
            id: "blank-2",
            answer: "is",
            options: ["isn’t", "is"],
          },
          "raining.",
        ],
      ],
      successTitle: "Excelente",
      successMessage: "Você completou o texto corretamente.",
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Coloque a frase em ordem.",
      words: ["is", "it", "a", "dog"],
      correctOrder: ["it", "is", "a", "dog"],
      successTitle: "Correto",
      successMessage: `A frase correta é "It is a dog."`,
    },
  },
  {
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction: "Fale brevemente sobre você em inglês.",
      helperText: "Aponte para uma amiga e diga: 'Ela é legal' em inglês.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: '"She is nice"',
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
        `Mandou muito bem! Agora você já sabe falar de todo mundo ao seu redor.  Próxima aula: Como fazer perguntas usando o líder IS! See you! `,
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
