import createA2LessonScreen from "./A2LessonScreen";
import { ICA2 } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic48s1",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 6 • AULA 48",
      image: ICA2.A48S1,
      content: [
        "/blue{What should I do?}",
        "/blue{Nova Cidade, Novos Conselhos!}",
        "Chegou o momento do Reading & Writing Day.",
        "David acabou de se mudar para uma cidade grande e está empolgado, mas um pouco perdido.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic48s2",
    component: "Exercise17",
    activity: {
      label: "David's New Beginning",
      content: [
        "Hi! I am David. I moved to this big city last week for a new job. I love the energy here, but I feel a bit stressed.",
        "My new boss thinks I should wake up earlier to plan my day properly. My friends say I shouldn't stay home all weekend. They think I should explore the city to relax.",
        "Also, everything here is very expensive. Should I cook more at home to save money? I think yes, I should. I shouldn't eat in restaurants every day.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic48s3",
    component: "Exercise4",
    activity: {
      prompt: "How does David feel about his new life?",
      image: ICA2.A48S3,
      wrongSentence: "Choose according to the text.",
      options: ["He feels bored.", "He feels excited but stressed."],
      correctAnswer: "He feels excited but stressed.",
      successMessage: "David loves the energy, but feels a bit stressed.",
    },
  },
  {
    key: "a2ic48s4",
    component: "Exercise4",
    activity: {
      prompt: "What advice did David receive from his friends?",
      image: ICA2.A48S4,
      wrongSentence: "Choose according to the text.",
      options: [
        "He should stay home all weekend.",
        "He should explore the city to relax.",
      ],
      correctAnswer: "He should explore the city to relax.",
      successMessage: "His friends think he should explore the city.",
    },
  },
  {
    key: "a2ic48s5",
    component: "Exercise8",
    activity: {
      prompt: "According to the image and the text, what is David doing to help his situation?",
      image: ICA2.A48S5,
      options: [
        "He is eating in an expensive restaurant.",
        "He is sleeping until late.",
        "He is cooking at home to save money.",
      ],
      correctAnswer: "He is cooking at home to save money.",
      successMessage: "Cooking at home helps David save money.",
    },
  },
  {
    key: "a2ic48s6",
    component: "Exercise2",
    activity: {
      prompt: "Ajude o Camaleão a organizar os pensamentos do David:",
      paragraphs: [
        {
          text: "David is stressed. He (1) ______ wake up earlier. His friends say he (2) ______ stay home all weekend. Everything is expensive, so he asks: '(3) ______ cook at home to save money?' Yes, he should!",
          blanks: [
            { id: "1", options: ["should", "shouldn't"], correctAnswer: "should" },
            { id: "2", options: ["should", "shouldn't"], correctAnswer: "shouldn't" },
            { id: "3", options: ["Should I", "I should"], correctAnswer: "Should I" },
          ],
        },
      ],
      successMessage: "David should wake up earlier, shouldn't stay home all weekend and asks: Should I cook at home?",
    },
  },
  {
    key: "a2ic48s7",
    component: "Exercise12",
    activity: {
      prompt: "Agora você é o consultor do David!",
      instruction: "Escreva 5 conselhos para ele organizar melhor o novo emprego. Use pelo menos 3 vezes should e 2 vezes shouldn't.",
      correctAnswer: "You should plan your day. You should wake up early. You should save money. You shouldn't eat out every day. You shouldn't work all night.",
      successMessage: "Conselhos registrados!",
    },
  },
  {
    key: "a2ic48s8",
    component: "Exercise17",
    activity: {
      label: "Final",
      content: [
        "/blue{Missão Cumprida!}",
        "Você concluiu a trilha de should e shouldn't com sucesso.",
        "Agora você sabe dar conselhos, alertar sobre más ideias e pedir opiniões usando perguntas.",
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
