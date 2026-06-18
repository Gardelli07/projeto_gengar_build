import { Exercise1 } from "../../../../exc/ex1";
import { Exercise2 } from "../../../../exc/ex2";
import { Exercise3 } from "../../../../exc/ex3";
import { Exercise4 } from "../../../../exc/ex4";
import { Exercise5 } from "../../../../exc/ex5";
import { Exercise6 } from "../../../../exc/ex6";
import { Exercise13 } from "../../../../exc/ex13";
import { Exercise14 } from "../../../../exc/ex14";
import { Exercise15 } from "../../../../exc/ex15";
import { Exercise16 } from "../../../../exc/ex16";
import { Exercise17 } from "../../../../exc/ex17";
import { BUB1, Images } from "../../../../util/images";
import createBusinessLessonScreen from "./BusinessLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "hedging-intro",
    component: Exercise17,
    activity: {
      label: "A Arte de Discordar com Elegância",
      content: [
        `Em reuniões internacionais, ser direto demais pode soar rude. Se alguém dá uma ideia ruim, um falante avançado não diz o agressivo "I think we should do something else". Nós usamos a técnica de Hedging (suavização). Para sugerir uma mudança educadamente, usamos: "It might be worth considering..." (Talvez valha a pena considerar...). E para dar uma opinião forte sem parecer o dono da verdade, trocamos o simples "I think" por: "I tend to feel that..." (Eu tendo a achar/sentir que...). É assim que você exerce influência com classe!`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "hedging-expressions-match",
    component: Exercise1,
    activity: {
      prompt:
        "Conecte as expressões de diplomacia com os seus significados em português.",
      pairs: [
        {
          en: "It might be worth considering",
          pt: "Talvez valha a pena considerar",
        },
        {
          en: "I tend to feel that",
          pt: "Eu tendo a achar que / Eu costumo pensar que",
        },
      ],
      successTitle: "Correto",
      successMessage:
        "Essas expressões suavizam opiniões e sugestões em reuniões.",
    },
  },
  {
    key: "hedging-image-match",
    component: Exercise15,
    activity: {
      prompt: "Clique na imagem e na expressão exata que a descreve.",
      images: [
        { id: "considering-img", image: BUB1.A6S3p1 },
        { id: "tend-img", image: BUB1.A6S5p2 },
      ],
      words: [
        { id: "considering-word", label: "It might be worth considering" },
        { id: "tend-word", label: "I tend to feel that" },
      ],
      pairs: [
        { imageId: "considering-img", wordId: "considering-word" },
        { imageId: "tend-img", wordId: "tend-word" },
      ],
      successTitle: "Correto",
      successMessage:
        "Considering sugere análise; tend indica inclinação ou tendência.",
    },
  },
  {
    key: "worth-considering-correct",
    component: Exercise4,
    activity: {
      prompt:
        "Você quer sugerir uma nova estratégia de marketing sem ofender quem criou a estratégia antiga. Qual é a frase escrita corretamente?",
      image: BUB1.A6S4,
      wrongSentence: "Hedging",
      options: [
        "It might be worth to consider a new strategy.",
        "It might be worth considering a new strategy.",
        "It might be worth consider a new strategy.",
      ],
      correctAnswer: "It might be worth considering a new strategy.",
      successTitle: "Correto",
      successMessage: 'Depois de "worth", o verbo seguinte usa -ING.',
    },
  },
  {
    key: "slight-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt:
        'Ouça a palavra isolada e escolha a alternativa correta. Ela significa "leve" ou "pequeno".',
      image: BUB1.A6S5,
      audioSource: require("../../../../../mp3/BU/B1/A6S5.mp3"),
      audioDurationMs: 900,
      answerOptions: ["Flight", "Slight"],
      correctOption: "Slight",
      successTitle: "Correto",
      feedbackMessage: '"Slight" minimiza o impacto de um problema.',
    },
  },
  {
    key: "bad-news-tip",
    component: Exercise17,
    activity: {
      label: "Como dar Más Notícias",
      content: [
        `No mundo corporativo nativo, a palavra "Problem" é evitada, pois causa pânico. Quando algo dá errado, você minimiza o impacto psicológico usando a expressão: "There seems to be a slight issue with..." (Parece haver um leve problema/uma pequena questão com...). Você usa "seems to be" (parece haver) em vez de "there is" (existe) para suavizar ainda mais a pancada.`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "slight-issue-complete",
    component: Exercise5,
    activity: {
      prompt:
        "Você encontrou um erro no contrato do cliente. Como comunica isso sem causar pânico imediato?",
      sentenceStart: "Boss, there seems to be a",
      sentenceEnd: "issue with the contract numbers.",
      options: ["slight", "light"],
      correctAnswer: "slight",
      successTitle: "Correto",
      successMessage: '"A slight issue" soa profissional e menos alarmante.',
    },
  },
  {
    key: "issue-spell",
    component: Exercise13,
    needsSpeech: true,
    activity: {
      prompt:
        'Organize as letras para formar a palavra elegante que substitui o assustador "Problem".',
      audioSource: require("../../../../../mp3/BU/B1/A6S8.mp3"),
      audioDurationMs: 1000,
      letters: ["S", "S", "I", "E", "U"],
      correctWord: "ISSUE",
      successTitle: "Correto",
      successMessage: "ISSUE.",
    },
  },
  {
    key: "diplomatic-email-complete",
    component: Exercise2,
    activity: {
      prompt: "Leia o e-mail diplomático e preencha as lacunas.",
      paragraphs: [
        [
          "Hi Team. I was reviewing the project, and there ",
          { id: "blank-1", options: ["seems", "looks"], answer: "seems" },
          " to be a slight ",
          { id: "blank-2", options: ["issue", "problem"], answer: "issue" },
          " with the budget. Because of this, it might be worth ",
          {
            id: "blank-3",
            options: ["to consider", "considering"],
            answer: "considering",
          },
          " a different approach.",
        ],
      ],
      successTitle: "Correto",
      successMessage: "Você suavizou a má notícia e sugeriu uma alternativa.",
    },
  },
  {
    key: "delivery-timeline-audio",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt:
        "Escute o áudio do Gerente de Projetos lidando com um contratempo. A afirmação escrita é verdadeira ou falsa?",
      image: BUB1.A6S10,
      audioSource: require("../../../../../mp3/BU/B1/A6S10.mp3"),
      audioDurationMs: 7200,
      statement:
        "O gerente acha que a equipe deve esconder o problema do cliente por enquanto.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage:
        "Ele acha que a equipe deve comunicar o cliente imediatamente.",
    },
  },
  {
    key: "plan-b-order",
    component: Exercise6,
    activity: {
      prompt:
        "Clique nas palavras na ordem correta para sugerir polidamente que a equipe analise o plano B.",
      words: ["worth", "be", "might", "it", ",", "B", "considering", "plan"],
      correctOrder: ["it", "might", "be", "worth", "considering", "plan", "B"],
      successTitle: "Correto",
      successMessage: "It might be worth considering plan B.",
    },
  },
  {
    key: "digital-marketing-speaking",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        'Seu colega propôs investir 10 mil dólares em panfletos de papel. Responda com classe usando "I tend to feel that..." e "It might be worth considering...".',
      helperText:
        "I tend to feel that paper flyers are outdated. It might be worth considering digital marketing.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "I tend to feel that paper flyers are outdated. It might be worth considering digital marketing.",
      recordLabel: "Gravar Áudio",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você discordou com diplomacia.",
    },
  },
  {
    key: "hedging-feedback",
    component: Exercise17,
    activity: {
      label: "Bem-vindo à alta performance!",
      content: [
        `Que aula! Percebeu como o nível de sofisticação subiu? Ao usar "There seems to be a slight issue", você não assusta ninguém. Ao usar "It might be worth considering", você não impõe sua ideia, você a vende de forma irresistível. Você acabou de aprender o segredo de como os grandes executivos discordam sem criar inimigos. Na próxima aula, aprenderemos a interromper alguém no meio de uma frase sem parecer agressivo (Strategic Interruptions).`,
      ],
      continueLabel: "Finalizar",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
