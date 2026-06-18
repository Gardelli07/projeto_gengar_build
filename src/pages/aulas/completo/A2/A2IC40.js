import createA2LessonScreen from "./A2LessonScreen";
import { ICA2 } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic40s1",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 4 • AULA 40",
      content: [
        "/blue{Julia's family!}",
        "/blue{O Grande Desafio do Camaleão!}",
        "Chegou a hora de colocar tudo o que você aprendeu à prova.",
        "Você já domina more, -er, irregulares e intensidades. Agora vai identificar tudo em uma história real.",
        "Hoje teremos Reading: Julia's Family e Writing: você será o autor.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic40s2",
    component: "Exercise17",
    activity: {
      label: "Reading",
      content: [
        "/blue{Meet My Family!}",
        "Hi! I'm Julia. My family is very special. I have one brother, Leo, and one sister, Sarah. Leo is older than me, but I am taller than him. He is much more intelligent than me, but I am faster than him at sports!",
        "My sister Sarah is as beautiful as my mother. They both have blond hair. My father is a bit shorter than my mom, but he is much stronger. My mom is a better cook than my dad, but his pizza is not as bad as people say! Life at home is better than anywhere else.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic40s3",
    component: "Exercise4",
    activity: {
      prompt: "Who is the oldest child in the family?",
      image: ICA2.A40S3,
      wrongSentence: "Choose according to Julia's text.",
      options: ["Julia.", "Sarah.", "Leo."],
      correctAnswer: "Leo.",
      successTitle: "Correto",
      successMessage: "Leo is older than Julia.",
    },
  },
  {
    key: "a2ic40s4",
    component: "Exercise4",
    activity: {
      prompt: "What does Julia say about her father's height?",
      image: ICA2.A40S4,
      wrongSentence: "Choose according to Julia's text.",
      options: [
        "He is taller than her mom.",
        "He is a bit shorter than her mom.",
        "He is as tall as her mom.",
      ],
      correctAnswer: "He is a bit shorter than her mom.",
      successTitle: "Correto",
      successMessage: "Julia says her father is a bit shorter than her mom.",
    },
  },
  {
    key: "a2ic40s5",
    component: "Exercise2",
    activity: {
      prompt: "Reconstrua a história escolhendo a opção correta.",
      paragraphs: [
        [
          "I have a great family. My brother is ",
          { id: "b1", answer: "older", options: ["older", "more old"] },
          " than me. My sister is ",
          { id: "b2", answer: "as", options: ["as", "than"] },
          " beautiful as my mom. My father is ",
          { id: "b3", answer: "much", options: ["much", "more"] },
          " stronger than my brother. To me, my family is ",
          { id: "b4", answer: "better", options: ["gooder", "better"] },
          " than anything in the world!",
        ],
      ],
      successTitle: "Correto",
      successMessage: "Older, as, much e better completam a história.",
    },
  },
  {
    key: "a2ic40s6",
    component: "Exercise12",
    activity: {
      prompt: "Agora o Camaleão quer conhecer o seu mundo.",
      instruction:
        "Escreva sobre sua família ou seus amigos. Use pelo menos um comparativo com -er, um com more e a estrutura as... as.",
      tipText:
        "My best friend is taller than me. My family is more important than anything. My sister is as funny as my brother.",
      successTitle: "Muito bem!",
      successMessage: "Texto registrado.",
    },
  },
  {
    key: "a2ic40s7",
    component: "Exercise17",
    activity: {
      label: "Final",
      content: [
        "/blue{VOCÊ É UM MESTRE!}",
        "Parabéns! Você passou por todas as fases dos comparativos:",
        "Aprendeu more e -er.",
        "Dominou -y e a dobra de consoante.",
        "Venceu os irregulares.",
        "Deu intensidade com much e a bit.",
        "Aprendeu igualdade com as... as.",
        "Agora você consegue descrever o mundo com muito mais detalhes.",
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
