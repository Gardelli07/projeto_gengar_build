import createLessonScreen from "../../LessonScreen";
import { Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise10",
    activity: {
      prompt: "Responda as questoes",
      title: "Boss Level",
      userImage: Images.ex16,
      lockStorageKey: "@ic17_boss_level_lock_until",
      questions: [
        {
          image: Images.ex10,
          question: '"Eu sou um aluno."',
          options: ["I am student.", "I is a student."],
          correctAnswer: "I am student.",
        },
        {
          image: Images.ex10,
          question: '"Ela e legal."',
          options: ["She are nice.", "She is nice."],
          correctAnswer: "She is nice.",
        },
        {
          image: Images.ex10,
          question: '"Nós não estamos cansados."',
          options: ["We isn't tired.", "We aren't tired."],
          correctAnswer: "We aren't tired.",
        },
        {
          image: Images.ex10,
          question: 'Pergunta: "Ele é seu pai?"',
          options: ["Is he your father?", "He is your father?"],
          correctAnswer: "Is he your father?",
        },
        {
          image: Images.ex10,
          question: '"Isso (objeto) é azul."',
          options: ["It is blue.", "She is blue."],
          correctAnswer: "It is blue.",
        },
        {
          image: Images.ex10,
          question: '"Eles são brasileiros."',
          options: ["They am Brazilian.", "They are Brazilian."],
          correctAnswer: "They are Brazilian.",
        },
        {
          image: Images.ex10,
          question: 'Pergunta: "Vocês estão prontos?"',
          options: ["Are you ready?", "Is you ready?"],
          correctAnswer: "Are you ready?",
        },
        {
          image: Images.ex10,
          question: 'Resposta curta: "Is she happy?"',
          options: ["Yes, she's.", "Yes, she is."],
          correctAnswer: "Yes, she is.",
        },
        {
          image: Images.ex10,
          question: '"Eu não sou um robô."',
          options: ["I am't a robot.", "I'm not a robot."],
          correctAnswer: "I'm not a robot.",
        },
        {
          image: Images.ex10,
          question: 'Pergunta: "Eu estou atrasado?"',
          options: ["Am I late?", "I am late?"],
          correctAnswer: "Am I late?",
        },
      ],
      successTitle: "Correto",
      successMessage: "Voce acertou todas as 10 respostas do desafio.",
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
