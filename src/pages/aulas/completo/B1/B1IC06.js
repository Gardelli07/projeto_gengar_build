import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "strengths-intro",
    component: "Exercise17",
    activity: {
      label: "O Método Sanduíche",
      content: [
        `Nativos não apenas listam adjetivos; eles vendem resultados.

/blue{Strengths}
Use adjetivos de ação como proactive, resourceful ou adaptable. Sempre dé um exemplo curto de um resultado que você alcançou.

/blue{Weaknesses}
O segredo não é esconder o erro, mas mostrar a solução.

Estrutura:
"I struggle with [fraqueza], but I've been [ação de melhoria] to fix it."

/blue{Dica do Camaleão}
Nunca diga que não tem fraquezas. Isso soa arrogante ou mentiroso. Escolha algo real, mas que não destrua sua chance na vaga.`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "buzzwords-match",
    component: "Exercise1",
    activity: {
      prompt: "Associe o buzzword é definição profissional:",
      pairs: [
        {
          en: "Resourceful",
          pt: "Encontra soluções criativas em situações difíceis.",
        },
        {
          en: "Team Player",
          pt: "Prioriza o sucesso do grupo e colabora bem.",
        },
        {
          en: "Proactive",
          pt: "Age antes que o problema aconteça, tem iniciativa.",
        },
        {
          en: "Detail-oriented",
          pt: "Tem olhar aguçado para detalhes e precisão.",
        },
      ],
      successTitle: "Excelente",
      successMessage: "Você associou os pontos fortes corretamente.",
    },
  },
  {
    key: "adaptable-interview",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escolha a melhor interpretação",
      image: ICB1.A2S11,
      audioSource: require("../../../../../mp3/IC/B1/A6S2.mp3"),
      audioDurationMs: 7200,
      answerOptions: [
        "David focuses on his ability to learn and adjust to new environments.",
        "David is saying he is tired of working with different frameworks.",
      ],
      correctOption:
        "David focuses on his ability to learn and adjust to new environments.",
      successTitle: "Correto",
      feedbackMessage:
        "Adaptable comunica capacidade de aprender rápido e se ajustar a novos cenários.",
    },
  },
  {
    key: "continuous-improvement",
    component: "Exercise2",
    activity: {
      prompt: "Preencha com a estratégia de melhoria contínua:",
      paragraphs: [
        [
          "I sometimes",
          {
            id: "b1",
            answer: "struggle",
            options: ["been", "struggle", "working"],
          },
          "with public speaking.",
        ],
        [
          "However, I have",
          {
            id: "b2",
            answer: "been",
            options: ["working", "struggle", "been"],
          },
          "taking a course to improve my communication.",
        ],
        [
          "I've been",
          {
            id: "b3",
            answer: "working",
            options: ["been", "working", "struggle"],
          },
          "on my presentation skills lately.",
        ],
      ],
      successTitle: "Correto",
      successMessage: "A sequência correta é: struggle / been / working.",
    },
  },
  {
    key: "spell-problem-solver",
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt: "Desembaralhe a força que todo desenvolvedor de app precisa ter:",
      audioSource: require("../../../../../mp3/IC/B1/A6S4.mp3"),
      audioDurationMs: 1200,
      letters: [
        "S",
        "O",
        "L",
        "V",
        "E",
        "R",
        "-",
        "P",
        "R",
        "O",
        "B",
        "L",
        "E",
        "M",
      ],
      correctWord: "PROBLEM-SOLVER",
      successTitle: "Correto",
      successMessage: 'A forma é "PROBLEM-SOLVER".',
    },
  },
  {
    key: "confident-posture",
    component: "Exercise8",
    activity: {
      prompt: "Qual ponto forte essa postura comunica ao recrutador?",
      image: ICB1.A6S5,
      options: [
        "David is distracted and wants to leave.",
        "David is confident and engaged in the conversation.",
        "David is nervous and doesn't know what to say.",
      ],
      correctAnswer: "David is confident and engaged in the conversation.",
      successTitle: "Correto",
      successMessage:
        "Linguagem corporal é parte importante da entrevista. Postura aberta indica confiança.",
    },
  },
  {
    key: "weakness-dialogue",
    component: "Exercise2",
    activity: {
      prompt: "Complete a entrevista",
      paragraphs: [
        [
          "David: \"I tend to take on too many tasks. But lately, I've",
          { id: "b1", answer: "been", options: ["been", "has", "yet"] },
          'learning how to delegate more effectively."',
        ],
        [
          'Interviewer: "And how has that',
          { id: "b2", answer: "been", options: ["has", "been", "working"] },
          'going?"',
        ],
        [
          "David: \"It's been great. My team",
          { id: "b3", answer: "has", options: ["been", "has", "have"] },
          'been more productive since then."',
        ],
      ],
      successTitle: "Correto",
      successMessage: "A sequência correta é: been / been / has.",
    },
  },
  {
    key: "candidate-review",
    component: "Exercise17",
    activity: {
      label: "Candidate Review: David",
      content: [
        `"David has a very strong profile. He described himself as a resourceful developer who has been building complex UIs for years. When asked about his weaknesses, he didn't give a cliché answer. He admitted that he has struggled with time management in the past, but he has been using the Pomodoro technique to stay focused. He has already finished several high-level projects, proving he is a results-oriented professional."`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "write-strength-weakness",
    component: "Exercise12",
    activity: {
      prompt: "O Camaleão quer te contratar!",
      instruction:
        'Escreva sua "strength" mais forte e uma "weakness" que você está resolvendo.',
      helperText: 'Use "I\'ve been working on..." para a fraqueza.',
      placeholder:
        "My main strength is that I'm resourceful. I struggle with public speaking, but I've been working on it.",
      tipText:
        "Mostre uma qualidade com resultado e uma fraqueza com plano de ação.",
      minLength: 20,
      successTitle: "Correto",
      successMessage: "Boa! Sua resposta soa mais profissional.",
    },
  },
  {
    key: "job-guaranteed",
    component: "Exercise17",
    activity: {
      label: "Vaga Garantida!",
      content: [
        `Você saiu do básico "I am good" para o avançado "I am a proactive problem-solver".

Resumo:
Strengths = adjetivos de ação + exemplos.
Weaknesses = honestidade + plano de ação.

Pratique no espelho e lembre-se: a confiança vem da preparação!

See you!`,
      ],
      continueLabel: "Finalizar",
    },
  },
  {
    key: "lesson-finish",
    type: "finish",
  },
];

export default createLessonScreen(LESSON_SLIDES, {
  storageKey: "@progesso_ingles_completo_B1",
  nextRouteName: "InglescompletoB1",
  screenName: "InglesCompletoB1LessonScreen",
});
