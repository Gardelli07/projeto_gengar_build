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
    key: "disagreement-intro",
    component: Exercise17,
    activity: {
      label: 'A Arte de Dizer "Não" com Elegância',
      content: [
        `Em reuniões com a diretoria ou clientes importantes, você não pode simplesmente dizer "I disagree" ou "You're wrong". Isso soa amador e agressivo. Nativos de alta performance discordam de forma indireta. A estrutura de ouro para isso é: "With respect, I see it slightly differently" (Com todo o respeito, eu vejo de forma ligeiramente diferente). Você tira o peso do "você está errado" e coloca o peso no "eu tenho uma perspectiva diferente". É genial e extremamente educado!`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "disagreement-match",
    component: Exercise1,
    activity: {
      prompt:
        "Conecte as expressões da discordância diplomática com suas traduções correspondentes no português.",
      pairs: [
        { en: "With respect", pt: "Com todo o respeito" },
        {
          en: "I see it slightly differently",
          pt: "Eu vejo de forma ligeiramente diferente",
        },
      ],
      successTitle: "Correto",
      successMessage: "Essas frases discordam sem atacar a outra pessoa.",
    },
  },
  {
    key: "disagreement-image-match",
    component: Exercise15,
    activity: {
      prompt: "Clique na imagem e na expressão exata que a descreve.",
      images: [
        { id: "respect-img", image: BUB1.A9S3p1 },
        { id: "slightly-img", image: BUB1.A9S3p2 },
      ],
      words: [
        { id: "respect-word", label: "With respect" },
        { id: "slightly-word", label: "I see it slightly differently" },
      ],
      pairs: [
        { imageId: "respect-img", wordId: "respect-word" },
        { imageId: "slightly-img", wordId: "slightly-word" },
      ],
      successTitle: "Correto",
      successMessage: "Respect abre a discordância; slightly reduz o impacto.",
    },
  },
  {
    key: "slightly-differently-correct",
    component: Exercise4,
    activity: {
      prompt:
        "O CEO propôs um plano que vai atrasar a entrega. Você precisa discordar com máxima educação. Qual frase está correta?",
      image: BUB1.A9S4,
      wrongSentence: "Diplomatic disagreement",
      options: [
        "With respect, I see it slight differently.",
        "With respect, I see it slightly differently.",
        "With respect, I look it slightly different.",
      ],
      correctAnswer: "With respect, I see it slightly differently.",
      successTitle: "Correto",
      successMessage: 'Usamos o advérbio "slightly" com -LY.',
    },
  },
  {
    key: "however-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: 'Ouça a palavra isolada. Ela é a versão profissional de "but".',
      image: BUB1.A9S5,
      audioSource: require("../../../../../mp3/BU/B1/A9S5.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Whoever", "However"],
      correctOption: "However",
      successTitle: "Correto",
      feedbackMessage: '"However" eleva o tom do argumento.',
    },
  },
  {
    key: "feedback-sandwich-tip",
    component: Exercise17,
    activity: {
      label: 'O "Sanduíche" do Feedback',
      content: [
        `Outra técnica incrível é validar a ideia da pessoa antes de apresentar o obstáculo. A estrutura usada pelos nativos é: "I see your point, however..." (Eu entendo o seu ponto, no entanto...). Substituir o "but" pelo "however" eleva o nível do seu inglês instantaneamente e dá um tom muito mais sério e executivo ao seu argumento.`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "however-complete",
    component: Exercise5,
    activity: {
      prompt:
        "Seu colega teve uma boa ideia, mas a empresa não tem dinheiro para isso no momento.",
      image: BUB1.A9S4,
      sentenceStart: "That's a very creative idea, Mark. I see your point,",
      sentenceEnd: "we don't have the budget for it this year.",
      options: ["however", "whenever"],
      correctAnswer: "however",
      successTitle: "Correto",
      successMessage: '"However" introduz contraste com tom profissional.',
    },
  },
  {
    key: "however-spell",
    component: Exercise13,
    needsSpeech: true,
    activity: {
      prompt:
        'Organize as letras para formar a palavra que usamos no lugar do simples "but".',
      audioSource: require("../../../../../mp3/BU/B1/A9S5.mp3"),
      audioDurationMs: 1200,
      letters: ["W", "E", "R", "E", "V", "O", "H"],
      correctWord: "HOWEVER",
      successTitle: "Correto",
      successMessage: "HOWEVER.",
    },
  },
  {
    key: "client-response-complete",
    component: Exercise2,
    activity: {
      prompt: "Leia a resposta ao cliente e preencha as lacunas.",
      paragraphs: [
        [
          "We appreciate the proposal. I see your ",
          { id: "blank-1", options: ["point", "pointer"], answer: "point" },
          ", ",
          {
            id: "blank-2",
            options: ["whenever", "however"],
            answer: "however",
          },
          ", with ",
          { id: "blank-3", options: ["respect", "regret"], answer: "respect" },
          ", I see the timeline slightly differently. It might take three weeks instead of two.",
        ],
      ],
      successTitle: "Correto",
      successMessage: "Você validou, contrastou e discordou com educação.",
    },
  },
  {
    key: "weekend-policy-audio",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt:
        "Escute a diretora discordando da nova política. A afirmação escrita é verdadeira ou falsa?",
      image: BUB1.A9S10,
      audioSource: require("../../../../../mp3/BU/B1/A9S10.mp3"),
      audioDurationMs: 7600,
      statement:
        "A Diretora concordou totalmente com a ideia de trabalhar nos finais de semana.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage:
        "Ela valida o ponto, mas discorda por causa do cansaço da equipe.",
    },
  },
  {
    key: "see-your-point-order",
    component: Exercise6,
    activity: {
      prompt:
        "Clique nas palavras na ordem correta para validar a visão do cliente antes da má notícia.",
      words: ["point", "your", "see", "I", ",", "however"],
      correctOrder: ["I", "see", "your", "point", ",", "however"],
      successTitle: "Correto",
      successMessage: "I see your point, however.",
    },
  },
  {
    key: "budget-defense-speaking",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        'O CEO sugeriu cortar o orçamento do seu departamento. Discorde usando "With respect, I see...", "I see your point..." e "However, we need this money".',
      helperText:
        "With respect, I see it slightly differently. I see your point, however, we need this money.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "With respect, I see it slightly differently. I see your point, however, we need this money.",
      recordLabel: "Gravar Áudio",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você defendeu seu ponto com diplomacia.",
    },
  },
  {
    key: "disagreement-feedback",
    component: Exercise17,
    activity: {
      label: "Você tem a voz de um líder!",
      content: [
        `Incrível! Discordar de superiores e clientes em uma segunda língua é o ápice da fluência profissional. Ao usar "I see your point, however" e "With respect, I see it slightly differently", você blindou a sua imagem profissional. Ninguém pode chamá-lo de grosso ou insubordinado, pois você dominou o protocolo diplomático de negócios. Na próxima e última aula deste módulo, aprenderemos sobre as nuances das chamadas de vídeo com equipes globais (Virtual Nuances).`,
      ],
      continueLabel: "Finalizar",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
