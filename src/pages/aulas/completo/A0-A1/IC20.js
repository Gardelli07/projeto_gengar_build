import createLessonScreen from "../../LessonScreen";
import { ICA1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise17",
    activity: {
      label: "See you!",
      content: [
        ICA1.A20S1,
        "Você terminou sua compra. O que dizer para fechar a interação com chave de ouro?",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A20S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A20S2.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Have a good one!", "Good morning!"],
      correctOption: "Have a good one!",
      successTitle: "Correto",
      feedbackMessage:
        'Have a good one! é uma despedida comum em lojas e restaurantes.',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Dica de Nativo: Have a good one! é a frase favorita dos americanos.",
        "O 'one' aqui substitui 'day', 'afternoon' ou 'evening'. Ou seja, serve para qualquer hora!",
        "é a forma mais comum de se despedir em lojas e restaurantes.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A20S4,
      audioSource: require("../../../../../mp3/IC/A0-A1/A20S4.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["See you later!", "See later you!"],
      correctOption: "See you later!",
      successTitle: "Correto",
      feedbackMessage:
        'Usamos "See you later!" para dizer "até mais". Em inglês, o "you" vem logo depois de "see".',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Com amigos, os nativos são ainda mais rápidos.",
        "Em vez de 'See you later', você ouvirá muito apenas um 'See ya!' ou simplesmente 'Later!'.",
        "Pratique o som: 'lei-der'.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A20S4,
      audioSource: require("../../../../../mp3/IC/A0-A1/A20S6.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Later!", "Letter!"],
      correctOption: "Later!",
      successTitle: "Correto",
      feedbackMessage: "Later! é uma despedida casual. Letter é carta, não confunda!",
    },
  },
  {
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha",
      image: ICA1.A20S7,
      audioSource: require("../../../../../mp3/IC/A0-A1/A20S7.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Take care!", "Take car!"],
      correctOption: "Take care!",
      successTitle: "Correto",
      feedbackMessage: 'Take care! significa "se cuida!".',
    },
  },
  {
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "Take care é uma despedida calorosa.",
        "Significa 'se cuida'.",
        "É perfeita para usar com amigos, vizinhos ou pessoas que você não verá por alguns dias.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: "Exercise6",
    activity: {
      prompt: "Você está saindo do táxi e deseja um bom dia ao motorista.",
      words: ["day!", "nice", "a", "Have"],
      correctOrder: ["Have", "a", "nice", "day!"],
      successTitle: "Correto",
      successMessage: 'A frase correta é "Have a nice day!"',
    },
  },
  {
    component: "Exercise1",
    activity: {
      prompt: "Conecte a situação",
      pairs: [
        { en: "Saindo do supermercado", pt: "Have a good one!" },
        { en: "Indo embora da casa de um amigo", pt: "Take care!" },
        {
          en: "Saindo de perto de alguém que você verá logo",
          pt: "See you!",
        },
      ],
      successTitle: "Excelente",
      successMessage:
        "Saindo do supermercado: Have a good one! Indo embora da casa de um amigo: Take care! Verá logo: See you!",
    },
  },
  {
    component: "Exercise4",
    activity: {
      prompt: "Escolha a frase correta",
      image: ICA1.A20S11,
      wrongSentence: "Você está se despedindo de um grupo às 15h.",
      options: ["Good afternoon!", "Have a good afternoon!"],
      correctAnswer: "Have a good afternoon!",
      successTitle: "Correto",
      successMessage:
        'Good afternoon! é "Oi". Have a good afternoon! é "Tchau".',
    },
  },
  {
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction:
        "Grave a frase que você mais usaria ao sair de um Starbucks em Nova York.",
      helperText: "Use uma despedida natural em ambiente de serviço.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Have a good one! / Have a nice day!",
      recordLabel: "Speak",
      stopLabel: "Parar",
      playLabel: "Ouvir",
      pauseLabel: "Pausar",
      rerecordLabel: "Regravar",
      submitLabel: "Enviar áudio",
      successTitle: "Correto",
      successMessage:
        'Resposta esperada: "Have a good one!" ou "Have a nice day!".',
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
