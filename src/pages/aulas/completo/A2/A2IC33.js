import createA2LessonScreen from "./A2LessonScreen";
import { ICA2, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic33s1",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 3 • AULA 33",
      content: [
        "/blue{Let's go sightseeing}",
        "/blue{Turista Profissional!}",
        "Sightseeing é o ato de visitar lugares famosos e turísticos.",
        "Hoje vamos falar sobre museus, tours guiados, souvenirs e landmarks.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic33s2",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha.",
      image: ICA2.A33S2,
      audioSource: require("../../../../../mp3/IC/A2/A33S2.mp3"),
      options: ["Museum", "Music"],
      correctAnswer: "Museum",
      correctOption: "Museum",
      feedbackMessage: "Museum é o lugar onde guardamos arte e história.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic33s3",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha.",
      image: ICA2.A33S3,
      audioSource: require("../../../../../mp3/IC/A2/A33S3.mp3"),
      options: ["Garden tour", "Guided tour"],
      correctAnswer: "Guided tour",
      correctOption: "Guided tour",
      feedbackMessage: "Guided tour é tour guiado.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic33s4",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha.",
      image: ICA2.A33S4,
      audioSource: require("../../../../../mp3/IC/A2/A33S4.mp3"),
      options: ["Souvenir", "Summer"],
      correctAnswer: "Souvenir",
      correctOption: "Souvenir",
      feedbackMessage: "Souvenir é uma lembrancinha de viagem.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic33s5",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha.",
      image: ICA2.A33S5,
      audioSource: require("../../../../../mp3/IC/A2/A33S5.mp3"),
      options: ["Landmark", "Landlord"],
      correctAnswer: "Landmark",
      correctOption: "Landmark",
      feedbackMessage: "Landmark é ponto turístico famoso.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic33s6",
    component: "Exercise17",
    activity: {
      label: "Checklist",
      content: [
        "/blue{Checklist do Turista}",
        "Museum: museu.",
        "Guided tour: tour guiado.",
        "Souvenir: lembrancinha.",
        "Landmark: ponto turístico / marco histórico.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic33s7",
    component: "Exercise18",
    activity: {
      prompt: "Você quer saber onde fica o museu. Digite a pergunta.",
      scrambledWords: ["is", "Where", "museum", "the", "?"],
      words: ["is", "Where", "museum", "the", "?"],
      correctAnswer: "Where is the museum?",
      successTitle: "Correto",
      successMessage: "Where is the museum?",
      submitLabel: "Enviar",
    },
  },
  {
    key: "a2ic33s8",
    component: "Exercise18",
    activity: {
      prompt: "Você quer fazer um tour guiado. Digite seu desejo.",
      scrambledWords: ["want", "I", "a", "tour", "guided", "."],
      words: ["want", "I", "a", "tour", "guided", "."],
      correctAnswer: "I want a guided tour.",
      successTitle: "Correto",
      successMessage: "I want a guided tour.",
      submitLabel: "Enviar",
    },
  },
  {
    key: "a2ic33s9",
    component: "Exercise19",
    activity: {
      prompt: "Escute o que o turista comprou e digite.",
      audioSource: require("../../../../../mp3/IC/A2/A33S9.mp3"),
      correctAnswer: "I bought a souvenir for my mom.",
      successTitle: "Correto",
      successMessage: "I bought a souvenir for my mom.",
      submitLabel: "Responder",
    },
  },
  {
    key: "a2ic33s10",
    component: "Exercise19",
    activity: {
      prompt: "Escute a pergunta e digite.",
      audioSource: require("../../../../../mp3/IC/A2/A33S10.mp3"),
      correctAnswer: "Is there a landmark near here?",
      successTitle: "Correto",
      successMessage: "Is there a landmark near here?",
      submitLabel: "Responder",
    },
  },
  {
    key: "a2ic33s11",
    component: "Exercise8",
    activity: {
      prompt: "What is the person doing?",
      image: ICA2.A33S11,
      options: ["She is taking a guided tour.", "She is buying souvenirs."],
      correctAnswer: "She is taking a guided tour.",
      successTitle: "Correto",
      successMessage: "Ela está fazendo um tour guiado.",
    },
  },
  {
    key: "a2ic33s12",
    component: "Exercise12",
    activity: {
      prompt: "Qual ponto turístico você mais quer visitar no mundo?",
      instruction: "Escreva uma frase curta contando o motivo.",
      tipText: "I want to visit the Louvre museum in Paris.",
      successTitle: "Muito bem!",
      successMessage: "Resposta registrada.",
    },
  },
  {
    key: "a2ic33s13",
    component: "Exercise16",
    activity: {
      prompt: "Gravação de áudio",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      instruction:
        'Grave: "I\'d like two tickets for the guided tour, please."',
      helperText: "I'd like two tickets for the guided tour, please.",
      successTitle: "Muito bem!",
      successMessage: "Seu áudio foi gravado.",
    },
  },
  {
    key: "a2ic33s14",
    component: "Exercise17",
    activity: {
      label: "Final",
      content: [
        "/blue{Cidadão do Mundo!}",
        "Agora você já sabe como se virar em qualquer cidade turística, de museus a lembrancinhas.",
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
