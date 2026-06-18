import createA2LessonScreen from "./A2LessonScreen";
import { ICA2 } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic51s1",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 6 • AULA 51",
      content: [
        "/blue{We could stay in!}",
        "/blue{O Talvez do Inglês}",
        "Usamos could e might quando não temos certeza de algo.",
        "Could indica uma possibilidade teórica ou geral. Might indica uma possibilidade mais remota ou incerta.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic51s2",
    component: "Exercise14",
    activity: {
      prompt: "Ouça a possibilidade.",
      image: ICA2.A51S2,
      audioSource: require("../../../../../mp3/IC/A2/A51S2.mp3"),
      options: ["It could rain tomorrow.", "It could to rain tomorrow."],
      correctAnswer: "It could rain tomorrow.",
      feedbackMessage:
        "Correto: depois de could usamos o verbo puro, sem to. It could rain tomorrow fala de uma possibilidade.",
    },
  },
  {
    key: "a2ic51s3",
    component: "Exercise14",
    activity: {
      prompt: "Ouça e escolha.",
      image: ICA2.A51S3,
      audioSource: require("../../../../../mp3/IC/A2/A51S3.mp3"),
      options: [
        "She might travel this year.",
        "She might to travel this year.",
      ],
      correctAnswer: "She might travel this year.",
      feedbackMessage:
        "Muito bem: might travel mostra uma possibilidade incerta. Depois de might, o verbo também vem sem to.",
    },
  },
  {
    key: "a2ic51s4",
    component: "Exercise13",
    activity: {
      prompt: "Escreva a palavra de possibilidade remota:",
      audioSource: require("../../../../../mp3/IC/A2/A51S4.mp3"),
      letters: ["M", "I", "G", "H", "T"],
      correctWord: "MIGHT",
      successMessage:
        "Perfeito: might ajuda a falar de algo possível, mas incerto, como talvez aconteça.",
    },
  },
  {
    key: "a2ic51s5",
    component: "Exercise6",
    activity: {
      prompt: "Pode ser que eles cheguem tarde.",
      words: ["They", "could", "arrive", "late", "."],
      correctOrder: ["They", "could", "arrive", "late", "."],
      correctAnswer: "They could arrive late.",
      successMessage:
        "Frase correta: They could arrive late. Could vem antes do verbo arrive sem to.",
    },
  },
  {
    key: "a2ic51s6",
    component: "Exercise5",
    activity: {
      prompt: "Expresse uma possibilidade geral:",
      sentenceStart: "We",
      sentenceEnd: "go to the beach on Saturday.",
      options: ["might", "must"],
      correctAnswer: "might",
      successMessage:
        "Isso mesmo: We might go to the beach on Saturday mostra um plano possível, mas ainda não confirmado.",
    },
  },
  {
    key: "a2ic51s7",
    component: "Exercise14",
    activity: {
      prompt: "Ouça o pedido educado.",
      image: ICA2.A51S7,
      audioSource: require("../../../../../mp3/IC/A2/A51S7.mp3"),
      options: [
        "Should I use your phone, please?",
        "Could I use your phone, please?",
      ],
      correctAnswer: "Could I use your phone, please?",
      feedbackMessage:
        "Boa escolha: Could I...? é uma forma educada de pedir permissão. Could I use your phone, please? soa mais gentil.",
    },
  },
  {
    key: "a2ic51s8",
    component: "Exercise17",
    activity: {
      label: "Reading",
      image: ICA2.A51S8,
      content: [
        "/blue{Our Talent Show}",
        "Hi Mark! My family and I are talking about the weekend. We might visit my grandparents in the countryside.",
        "The weather report says it could be sunny on Saturday, but it might rain on Sunday. We are not sure!",
        "What could we do? Could we go to the beach? Maybe! It could be a good idea, or it might be too cold.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic51s9",
    component: "Exercise2",
    activity: {
      prompt: "Organize as possibilidades do fim de semana:",
      paragraphs: [
        [
          "For the weekend, David and his family",
          {
            id: "1",
            options: ["might", "could to"],
            answer: "might",
          },
          "visit his grandparents. The weather",
          {
            id: "2",
            options: ["could", "could be"],
            answer: "could be",
          },
          "sunny. He asks:",
          {
            id: "3",
            options: ["Could", "Do we could"],
            answer: "Could",
          },
          "we go to the beach? Maybe, but it",
          {
            id: "4",
            options: ["might", "could not be"],
            answer: "might",
          },
          "be too cold.",
        ],
      ],
      successMessage:
        "Ótimo: você usou might para incerteza, could be para possibilidade no clima e Could we...? para sugerir uma ideia.",
    },
  },
  {
    key: "a2ic51s10",
    component: "Exercise12",
    activity: {
      prompt: "Escrevendo Possibilidades",
      image: ICA2.A51S10,
      instruction:
        "Conte o que você poderia ou talvez faria no próximo feriado. Escreva 5 frases sobre seus planos e a previsão do tempo.",
      tipText:
        "I could travel to the beach. I might visit my family. It could rain. I might stay home. I could watch a movie.",
      successMessage:
        "Muito bem: suas frases usam could e might para falar de planos possíveis e incertezas sobre o feriado.",
    },
  },
  {
    key: "a2ic51s11",
    component: "Exercise17",
    activity: {
      label: "Final",
      content: [
        "/blue{Você Entendeu a Possibilidade!}",
        "Você concluiu a trilha de could e might.",
        "Agora você sabe expressar possibilidades, falar sobre incerteza e pedir permissões amigáveis.",
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
