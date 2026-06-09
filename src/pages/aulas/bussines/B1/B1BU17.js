import { Exercise1 } from "../../../../exc/ex1";
import { Exercise2 } from "../../../../exc/ex2";
import { Exercise3 } from "../../../../exc/ex3";
import { Exercise4 } from "../../../../exc/ex4";
import { Exercise5 } from "../../../../exc/ex5";
import { Exercise6 } from "../../../../exc/ex6";
import { Exercise13 } from "../../../../exc/ex13";
import { Exercise14 } from "../../../../exc/ex14";
import { Exercise16 } from "../../../../exc/ex16";
import { Exercise17 } from "../../../../exc/ex17";
import { BUB1, Images } from "../../../../util/images";
import createBusinessLessonScreen from "./BusinessLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "intro",
    component: Exercise17,
    activity: {
      label: 'O Fim do "Homework": Action Items e Deliverables',
      content: [
        `No mundo corporativo avançado, nós não chamamos as tarefas pós-reunião de "tasks" ou "homework". Action Items são os passos práticos, as ações que precisam ser tomadas. Deliverables são os entregáveis, o produto final físico ou digital que você entrega ao chefe. O Action Item é o caminho, o Deliverable é o destino!`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "match",
    component: Exercise1,
    activity: {
      prompt:
        "Conecte o vocabulário de tarefas com os seus significados no mundo real.",
      pairs: [
        { en: "Action items", pt: "Passos práticos / Ações a serem tomadas" },
        { en: "Deliverables", pt: "O produto final / Os entregáveis" },
      ],
      successTitle: "Correto",
      successMessage: "Action items levam aos deliverables.",
    },
  },
  {
    key: "correct",
    component: Exercise4,
    activity: {
      prompt:
        "Você precisa definir o que cada um vai fazer na prática amanhã. Qual frase está correta?",
      image: BUB1.A17S4,
      wrongSentence: "Action items",
      options: [
        "What are the action items for this week?",
        "What are the action tasks for this week?",
        "What are the action objects for this week?",
      ],
      correctAnswer: "What are the action items for this week?",
      successTitle: "Correto",
      successMessage: '"Action items" é o termo corporativo natural.',
    },
  },
  {
    key: "ownership-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Ouça a palavra isolada e escolha a alternativa correta.",
      image: BUB1.A17S5,
      audioSource: require("../../../../../mp3/BU/B1/A17S5.mp3"),
      audioDurationMs: 1100,
      answerOptions: ["Ownership", "Fellowship"],
      correctOption: "Ownership",
      successTitle: "Correto",
      feedbackMessage: "Ownership é responsabilidade/propriedade da tarefa.",
    },
  },
  {
    key: "ownership-tip",
    component: Exercise17,
    activity: {
      label: 'O "Dono" do Projeto e o Prazo',
      content: [
        `Como você delega uma tarefa importante? Um líder nativo pergunta: "Who is taking ownership of this?" (Quem vai assumir a responsabilidade por isso?). E para definir o prazo final, pergunte com precisão executiva: "By when can we expect this?" (Para quando podemos esperar isso?).`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "ownership-complete",
    component: Exercise5,
    activity: {
      prompt:
        "Você precisa que alguém seja o responsável final por essa missão.",
      image: BUB1.A17S5,
      sentenceStart: "Mark, I need to know: who is taking",
      sentenceEnd: "of this project?",
      options: ["ownership", "relationship"],
      correctAnswer: "ownership",
      successTitle: "Correto",
      successMessage: '"Taking ownership" é assumir a responsabilidade.',
    },
  },
  {
    key: "ownership-spell",
    component: Exercise13,
    needsSpeech: true,
    activity: {
      prompt:
        "Organize as letras para formar a palavra que usamos para assumir responsabilidade.",
      audioSource: require("../../../../../mp3/BU/B1/A17S5.mp3"),
      audioDurationMs: 1300,
      letters: ["P", "O", "R", "E", "W", "N", "I", "H", "S"],
      correctWord: "OWNERSHIP",
      successTitle: "Correto",
      successMessage: "OWNERSHIP.",
    },
  },
  {
    key: "complete",
    component: Exercise2,
    activity: {
      prompt: "Leia a ata final da reunião e preencha as lacunas.",
      paragraphs: [
        [
          "Let's review our ",
          { id: "b1", options: ["action", "act"], answer: "action" },
          " items. Sarah, you are responsible for the marketing ",
          {
            id: "b2",
            options: ["deliver", "deliverables"],
            answer: "deliverables",
          },
          ". John, who is taking ",
          {
            id: "b3",
            options: ["ownership", "partnership"],
            answer: "ownership",
          },
          " of the financial report? And ",
          { id: "b4", options: ["until", "by"], answer: "by" },
          " when can we expect it?",
        ],
      ],
      successTitle: "Correto",
      successMessage: "Você delegou tarefas com dono e prazo.",
    },
  },
  {
    key: "audio",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt:
        "Escute a coordenadora delegando funções. A afirmação é verdadeira ou falsa?",
      image: BUB1.A17S10,
      audioSource: require("../../../../../mp3/BU/B1/A17S10.mp3"),
      audioDurationMs: 7200,
      statement:
        "O David será o responsável pelos entregáveis de design e o prazo é até sexta-feira.",
      options: ["true", "false"],
      correctAnswer: "true",
      successTitle: "Correto",
      feedbackMessage:
        "David is taking ownership of the design deliverables by Friday.",
    },
  },
  {
    key: "order",
    component: Exercise6,
    activity: {
      prompt:
        "Clique nas palavras na ordem correta para exigir que alguém assuma a responsabilidade.",
      words: ["taking", "is", "this", "ownership", "who", "of", "?"],
      correctOrder: ["who", "is", "taking", "ownership", "of", "this", "?"],
      successTitle: "Correto",
      successMessage: "Who is taking ownership of this?",
    },
  },
  {
    key: "speaking",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        'Você é o Diretor da Lingueto. Use "Let\'s review our action items", pergunte sobre ownership dos deliverables e pergunte "By when can we expect this?".',
      helperText:
        "Let's review our action items. Who is taking ownership of the deliverables? By when can we expect this?",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "Let's review our action items. Who is taking ownership of the deliverables? By when can we expect this?",
      recordLabel: "Gravar Áudio",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você delegou com firmeza.",
    },
  },
  {
    key: "feedback",
    component: Exercise17,
    activity: {
      label: "Líder que Delega, Líder que Cresce!",
      content: [
        `Brilhante! Ao diferenciar "Action items" de "Deliverables" e cobrar "Ownership" em vez de apenas perguntar quem vai fazer, você não deixa espaço para desculpas. A equipe sabe exatamente o que precisa ser feito e por quem. Na próxima aula, vamos colocar tudo isso no E-mail de Resumo Executivo.`,
      ],
      continueLabel: "Finalizar",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
