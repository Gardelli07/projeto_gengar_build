import createA2LessonScreen from "./A2LessonScreen";
import { ICA2, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic47s1",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 6 • AULA 47",
      content: [
        "/blue{What should I do?}",
        "/blue{Amigo é para essas coisas!}",
        "Mark não está se sentindo muito bem e pediu ajuda para sua amiga Sarah.",
        "Ele vai usar should I...? para perguntar, e ela vai usar you shouldn't... para dizer o que ele deve parar de fazer.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic47s2",
    component: "Exercise13",
    activity: {
      prompt: "Antes de ouvir, escreva a palavra para conselho:",
      audioSource: require("../../../../../mp3/IC/A2/A47S2.mp3"),
      letters: ["A", "D", "V", "I", "C", "E"],
      correctWord: "ADVICE",
      successMessage:
        "Muito bem: advice significa conselho. É a palavra central desta aula sobre pedir ajuda e orientar alguém.",
    },
  },
  {
    key: "a2ic47s3",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "O que o Mark quer saber?",
      image: ICA2.A47S3,
      audioSource: require("../../../../../mp3/IC/A2/A47S3.mp3"),
      answerOptions: ["O que ele fez ontem", "O que ele deveria fazer"],
      correctOption: "O que ele deveria fazer",
      successTitle: "Correto",
      feedbackMessage:
        "Isso mesmo: Mark está pedindo conselho. What should I do? significa O que eu deveria fazer?",
    },
  },
  {
    key: "a2ic47s4",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Qual o primeiro conselho da Sarah?",
      image: ICA2.A47S4,
      audioSource: require("../../../../../mp3/IC/A2/A47S4.mp3"),
      answerOptions: ["Ir para a cama cedo", "Não ir para cama tão tarde"],
      correctOption: "Não ir para cama tão tarde",
      successTitle: "Correto",
      feedbackMessage:
        "Correto: Sarah usa shouldn't para dizer que Mark não deveria ir dormir tão tarde.",
    },
  },
  {
    key: "a2ic47s5",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "O que Mark deve parar de beber?",
      image: ICA2.A47S5,
      audioSource: require("../../../../../mp3/IC/A2/A47S5.mp3"),
      answerOptions: ["Àgua", "Refrigerante"],
      correctOption: "Refrigerante",
      successTitle: "Correto",
      feedbackMessage:
        "Boa escuta: Sarah aconselha Mark a parar de beber refrigerante e escolher hábitos mais saudáveis.",
    },
  },
  {
    key: "a2ic47s6",
    component: "Exercise6",
    activity: {
      prompt: "O que a Sarah disse sobre o sono?",
      words: ["You", "shouldn't", "go to bed", "so late", "."],
      correctOrder: ["You", "shouldn't", "go to bed", "so late", "."],
      correctAnswer: "You shouldn't go to bed so late.",
      successMessage:
        "Frase correta: You shouldn't go to bed so late. Shouldn't mostra que esse hábito não é uma boa ideia.",
    },
  },
  {
    key: "a2ic47s7",
    component: "Exercise6",
    activity: {
      prompt: "Organize o conselho sobre a bebida:",
      words: ["You", "should", "drink", "more", "water"],
      correctOrder: ["You", "should", "drink", "more", "water"],
      correctAnswer: "You should drink more water",
      successMessage:
        "Muito bem: You should drink more water é um conselho positivo para Mark cuidar melhor da saúde.",
    },
  },
  {
    key: "a2ic47s8",
    component: "Exercise5",
    activity: {
      prompt: "Complete a pergunta do Mark:",
      sentenceStart: "",
      sentenceEnd: "I exercise in the morning?",
      options: ["Should", "Shouldn't"],
      correctAnswer: "Should",
      successMessage:
        "Perfeito: perguntas de conselho começam com Should. Should I exercise in the morning? pede uma opinião.",
    },
  },
  {
    key: "a2ic47s9",
    component: "Exercise5",
    activity: {
      prompt: "Sarah acha que Mark trabalha demais:",
      sentenceStart: "You",
      sentenceEnd: "work on weekends. It's bad for you.",
      options: ["should", "shouldn't"],
      correctAnswer: "shouldn't",
      successMessage:
        "Certo: como trabalhar no fim de semana está fazendo mal, Sarah diz You shouldn't work on weekends.",
    },
  },
  {
    key: "a2ic47s10",
    component: "Exercise19",
    activity: {
      prompt: "Escute a dúvida do Mark e digite:",
      audioSource: require("../../../../../mp3/IC/A2/A47S10.mp3"),
      correctAnswer: "What should I do to be healthy?",
      successMessage:
        "Ótimo ditado: What should I do to be healthy? junta a pergunta com should e o objetivo de ficar saudável.",
      placeholder: "What...",
      submitLabel: "Responder",
      successTitle: "Correto",
      errorMessage:
        "Ouça novamente e confira a ordem: What should I do to be healthy?",
    },
  },
  {
    key: "a2ic47s11",
    component: "Exercise12",
    activity: {
      prompt: "O Camaleão está com dor de dente.",
      instruction:
        "Escreva 2 conselhos usando should e shouldn't. Use verbos como go to the dentist e eat candies.",
      tipText: "You should go to the dentist. You shouldn't eat candies.",
      successMessage:
        "Muito bem: para dor de dente, combine um conselho positivo com should e um alerta com shouldn't.",
    },
  },
  {
    key: "a2ic47s12",
    component: "Exercise16",
    activity: {
      prompt: "Grave sua resposta para o Mark:",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      instruction: "You shouldn't worry so much. You should relax!",
      tipText: "You shouldn't worry so much. You should relax!",
      successMessage:
        "Boa resposta: você usou shouldn't para reduzir a preocupação e should para dar um conselho positivo ao Mark.",
    },
  },
  {
    key: "a2ic47s13",
    component: "Exercise17",
    activity: {
      label: "Final",
      content: [
        "/blue{Ouvido Afiado!}",
        "Aprender a ouvir conselhos é o primeiro passo para conseguir dar os seus próprios em inglês.",
        "Na próxima aula, vamos consolidar tudo com Reading & Writing Day.",
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
