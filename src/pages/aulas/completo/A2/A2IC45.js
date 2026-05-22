import createA2LessonScreen from "./A2LessonScreen";
import { ICA2 } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic45s1",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 5 • AULA 45",
      content: [
        "/blue{The talent show}",
        "/blue{Dia de Recordes!}",
        "Hoje é o dia de consolidar tudo. Você vai ler sobre o Dia de Recordes na escola da Julia.",
        "Vamos ler, completar o texto e escrever sobre seus próprios recordes.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic45s2",
    component: "Exercise17",
    activity: {
      label: "Reading",
      content: [
        "/blue{Our Talent Show}",
        "Hi! Today was the best day at school. We had a talent show! My friend Leo won a trophy because he is the most intelligent student. Sarah sang a song; she has the most beautiful voice I know.",
        "My brother is the fastest runner, but I am the happiest person here because I won the prize for the biggest smile! The auditorium was the hottest place in the school, but it was also the most exciting event of the year.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic45s3",
    component: "Exercise4",
    activity: {
      prompt: "Why did Leo win a trophy?",
      image: ICA2.A45S3,
      wrongSentence: "Choose according to Julia's text.",
      options: [
        "Because he is the fastest runner.",
        "Because he is the most intelligent student.",
        "Because he has the biggest smile.",
      ],
      correctAnswer: "Because he is the most intelligent student.",
      successTitle: "Correto",
      successMessage: "Leo won because he is the most intelligent student.",
    },
  },
  {
    key: "a2ic45s4",
    component: "Exercise8",
    activity: {
      prompt: "Who is the fastest runner according to Julia?",
      image: ICA2.A45S4,
      options: ["Sarah.", "Julia's brother.", "Leo."],
      correctAnswer: "Julia's brother.",
      successTitle: "Correto",
      successMessage: "Julia's brother is the fastest runner.",
    },
  },
  {
    key: "a2ic45s5",
    component: "Exercise4",
    activity: {
      prompt: "How was the auditorium?",
      image: ICA2.A45S5,
      wrongSentence: "Choose according to Julia's text.",
      options: [
        "It was the coldest place.",
        "It was the worst place.",
        "It was the hottest place.",
      ],
      correctAnswer: "It was the hottest place.",
      successTitle: "Correto",
      successMessage: "The auditorium was the hottest place in the school.",
    },
  },
  {
    key: "a2ic45s6",
    component: "Exercise2",
    activity: {
      prompt: "Ajude o Camaleão a completar o diário da Julia.",
      paragraphs: [
        [
          "The talent show was ",
          { id: "b1", answer: "the best", options: ["the best", "the goodest"] },
          " event ever! My friend Sarah has ",
          { id: "b2", answer: "the most beautiful", options: ["the most beautiful", "the beautifulest"] },
          " voice. I have ",
          { id: "b3", answer: "the biggest", options: ["the bigest", "the biggest"] },
          " smile. It was ",
          { id: "b4", answer: "the most exciting", options: ["the most exciting", "the excitingest"] },
          " day of my life!",
        ],
      ],
      successTitle: "Correto",
      successMessage: "Você completou com as formas corretas do superlativo.",
    },
  },
  {
    key: "a2ic45s7",
    component: "Exercise12",
    activity: {
      prompt: "Quem são os recordistas do seu mundo?",
      instruction: "Escreva 5 frases usando superlativos sobre seus amigos, família ou hobbies. Use pelo menos um the most, um -est/-iest e o irregular the best.",
      correctAnswer: "My mom is the best cook. My dog is the fastest animal I know. My friend is the most intelligent person in class.",
      successTitle: "Muito bem!",
      successMessage: "Texto registrado.",
    },
  },
  {
    key: "a2ic45s8",
    component: "Exercise17",
    activity: {
      label: "Final",
      content: [
        "/blue{VOCÊ CHEGOU AO TOPO!}",
        "Parabéns, você concluiu o módulo de Superlativos.",
        "Você agora sabe usar the most, -est, -iest, CVC, the best e the worst.",
        "Você está pronto para descrever qualquer coisa como um verdadeiro campeão.",
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
