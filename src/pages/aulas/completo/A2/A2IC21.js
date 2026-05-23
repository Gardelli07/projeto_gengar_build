import createA2LessonScreen from "./A2LessonScreen";
import { ICA2 } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic21s1",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 2 • AULA 21",
      content: [
        "/blue{Nice concert!}",
        "/blue{Desafio de Ouvido!}",
        "Hoje o desafio é sobre um show de rock. Vamos ouvir uma conversa entre Leo e Mia e entender o que aconteceu ontem.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic21s2",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Vocabulário: escute e escolha.",
      image: ICA2.A21S2,
      audioSource: require("../../../../../mp3/IC/A2/A21S2.mp3"),
      options: ["Concert", "Concrete"],
      correctAnswer: "Concert",
      correctOption: "Concert",
      feedbackMessage: "Concert significa show ou apresentação musical.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic21s3",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Vocabulário: escute e escolha.",
      image: ICA2.A21S3,
      audioSource: require("../../../../../mp3/IC/A2/A21S3.mp3"),
      options: ["Wake up", "Woke up"],
      correctAnswer: "Woke up",
      correctOption: "Woke up",
      feedbackMessage: "Woke up é o passado de wake up.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic21s4",
    type: "listenOnly",
    activity: {
      prompt: "Part 1: Leo's Night",
      image: ICA2.A21S5,
      audioSource: require("../../../../../mp3/IC/A2/A21S4.mp3"),
      transcript:
        "Leo: Hey Mia! Did you have a good weekend?\nMia: It was okay. I stayed at home and watched a movie with my sister. What about you?\nLeo: I went to that rock concert last night! It was amazing!\nMia: Really? I called you around 9 PM, but you didn't answer!",
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic21s5",
    component: "Exercise4",
    activity: {
      prompt: "What did Mia do on her weekend?",
      image: ICA2.A21S5,
      wrongSentence: "Choose the correct answer.",
      options: ["She went to a concert.", "She stayed home with her sister."],
      correctAnswer: "She stayed home with her sister.",
      successTitle: "Correto",
      successMessage: "Mia stayed at home and watched a movie with her sister.",
    },
  },
  {
    key: "a2ic21s6",
    component: "Exercise4",
    activity: {
      prompt: "Por que o Leo não atendeu o telefone às 21h?",
      image: ICA2.A21S6,
      wrongSentence: "Choose the correct answer.",
      options: ["Porque ele estava dormindo.", "Porque ele estava no show."],
      correctAnswer: "Porque ele estava no show.",
      successTitle: "Correto",
      successMessage: "Leo estava no show de rock.",
    },
  },
  {
    key: "a2ic21s7",
    component: "Exercise18",
    activity: {
      prompt: "O que o Leo fez ontem à noite? Digite a frase completa:",
      scrambledSentence: "went / a / He / concert / to / .",
      correctAnswer: "He went to a concert.",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "He went to a concert.",
    },
  },
  {
    key: "a2ic21s8",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Vocabulário: escute e escolha.",
      image: ICA2.A21S8,
      audioSource: require("../../../../../mp3/IC/A2/A21S8.mp3"),
      options: ["Headache", "Heartache"],
      correctAnswer: "Headache",
      correctOption: "Headache",
      feedbackMessage: "Headache significa dor de cabeça.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic21s9",
    type: "listenOnly",
    activity: {
      prompt: "Part 2: The Invitation",
      image: ICA2.A21S10,
      audioText:
        "Mia: So, did you go to the concert alone? Leo: Yes, I did. I invited my brother, but he didn't want to go. Mia: That's strange! He loves that band. Did he have a problem? Leo: He didn't feel well yesterday. He had a headache, so he stayed in bed.",
      transcript:
        "Mia: So, did you go to the concert alone?\nLeo: Yes, I did. I invited my brother, but he didn't want to go.\nMia: That's strange! He loves that band. Did he have a problem?\nLeo: He didn't feel well yesterday. He had a headache, so he stayed in bed.",
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic21s10",
    component: "Exercise8",
    activity: {
      prompt: "Why didn't Leo's brother go to the concert?",
      image: ICA2.A21S10,
      options: [
        "Because he had a headache.",
        "Because he didn't like the band.",
      ],
      correctAnswer: "Because he had a headache.",
      successTitle: "Correto",
      successMessage: "He had a headache, so he stayed in bed.",
    },
  },
  {
    key: "a2ic21s11",
    component: "Exercise19",
    needsSpeech: true,
    activity: {
      prompt: "Escute e digite o que Leo disse sobre o irmão:",
      audioSource: require("../../../../../mp3/IC/A2/A21S11.mp3"),
      correctAnswer: "He didn't want to go.",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "Você escreveu a frase corretamente.",
      errorMessage: "Confira: He didn't want to go.",
    },
  },
  {
    key: "a2ic21s12",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Vocabulário: escute e escolha.",
      image: ICA2.A21S12,
      audioSource: require("../../../../../mp3/IC/A2/A21S12.mp3"),
      options: ["Actually", "Currently"],
      correctAnswer: "Actually",
      correctOption: "Actually",
      feedbackMessage: "Actually significa na verdade.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic21s13",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Vocabulário: escute e escolha.",
      image: ICA2.A21S13,
      audioSource: require("../../../../../mp3/IC/A2/A21S13.mp3"),
      options: ["Near", "Far"],
      correctAnswer: "Near",
      correctOption: "Near",
      feedbackMessage: "Near significa perto.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic21s14",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Vocabulário: escute e escolha.",
      image: ICA2.A21S14,
      audioSource: require("../../../../../mp3/IC/A2/A21S14.mp3"),
      options: ["Stage", "State"],
      correctAnswer: "Stage",
      correctOption: "Stage",
      feedbackMessage: "Stage significa palco.",
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic21s15",
    type: "listenOnly",
    activity: {
      prompt: "Part 3: At the Venue",
      image: ICA2.A21S16,
      audioSource: require("../../../../../mp3/IC/A2/A21S15.mp3"),
      transcript:
        "Mia: Did you see anyone we know there?\nLeo: Actually, I did! I met Sarah near the stage!\nMia: No, I didn't! Did she like the show?\nLeo: She loved it! But she didn't stay until the end because she was tired.",
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic21s16",
    component: "Exercise4",
    activity: {
      prompt: "Onde o Leo encontrou a Sarah?",
      image: ICA2.A21S16,
      wrongSentence: "Choose the correct answer.",
      options: ["Perto do palco.", "Na entrada do show."],
      correctAnswer: "Perto do palco.",
      successTitle: "Correto",
      successMessage: "Leo met Sarah near the stage.",
    },
  },
  {
    key: "a2ic21s17",
    component: "Exercise19",
    needsSpeech: true,
    activity: {
      prompt: "Escute a pergunta da Mia e digite:",
      audioSource: require("../../../../../mp3/IC/A2/A21S17.mp3"),
      correctAnswer: "Did she like the show?",
      placeholder: "Digite a pergunta",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "Você escreveu a pergunta corretamente.",
      errorMessage: "Confira: Did she like the show?",
    },
  },
  {
    key: "a2ic21s18",
    component: "Exercise16",
    activity: {
      prompt: "Gravação de áudio",
      instruction:
        "Grave um áudio contando três coisas que aconteceram no show.",
      helperText:
        'Use frases como "Leo went to a concert", "He met Sarah" ou "His brother had a headache".',
      tipText: "Use Simple Past.",
      successTitle: "Muito bem!",
      successMessage: "Seu áudio foi gravado.",
    },
  },
  {
    key: "a2ic21s19",
    component: "Exercise17",
    activity: {
      label: "Final",
      content: [
        "/blue{Audição Impecável!}",
        "Você entendeu um diálogo natural e aprendeu palavras como actually e headache.",
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
