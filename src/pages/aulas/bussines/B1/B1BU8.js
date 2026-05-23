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
    key: "clarifying-intro",
    component: Exercise17,
    activity: {
      label: "A Arte de Pedir para Repetir (Com Classe)",
      content: [
        `No nível avançado, se você não entender algo, nunca diga "I don't understand" ou "Repeat, please". Isso soa muito básico e até inseguro. Em vez disso, os nativos validam o que a pessoa disse e pedem para ela elaborar mais. Usamos: "Just to make sure I'm following..." (Só para ter certeza de que estou acompanhando/entendendo...). E para pedir mais detalhes de forma elegante, dizemos: "Could you expand on that?" (Você poderia expandir/falar mais sobre isso?). Assim, você mantém a postura de liderança, mesmo quando está confuso!`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "clarifying-match",
    component: Exercise1,
    activity: {
      prompt:
        "Conecte as expressões de alinhamento em inglês com os seus significados em português.",
      pairs: [
        {
          en: "Make sure I'm following",
          pt: "Ter certeza de que estou acompanhando",
        },
        {
          en: "Expand on that",
          pt: "Falar mais sobre isso / Expandir o assunto",
        },
      ],
      successTitle: "Correto",
      successMessage:
        "Essas frases pedem clareza sem perder postura profissional.",
    },
  },
  {
    key: "clarifying-image-match",
    component: Exercise15,
    activity: {
      prompt: "Clique na imagem e na expressão exata que a descreve.",
      images: [
        { id: "following-img", image: BUB1.A8S3p1 },
        { id: "expand-img", image: BUB1.A8S3p2 },
      ],
      words: [
        { id: "following-word", label: "Make sure I'm following" },
        { id: "expand-word", label: "Expand on that" },
      ],
      pairs: [
        { imageId: "following-img", wordId: "following-word" },
        { imageId: "expand-img", wordId: "expand-word" },
      ],
      successTitle: "Correto",
      successMessage:
        "Following acompanha o raciocínio; expand pede mais detalhes.",
    },
  },
  {
    key: "following-correct",
    component: Exercise4,
    activity: {
      prompt:
        "O cliente usou um termo técnico que você não pegou. Qual é a frase avançada escrita corretamente?",
      image: BUB1.A8S10,
      wrongSentence: "Clarifying",
      options: [
        "Just to make sure I'm walking...",
        "Just to make sure I'm following...",
        "Just to make sure I'm trailing...",
      ],
      correctAnswer: "Just to make sure I'm following...",
      successTitle: "Correto",
      successMessage:
        'Em inglês, "acompanhar um raciocínio" usa o verbo "follow".',
    },
  },
  {
    key: "exactly-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Ouça a palavra isolada e escolha a alternativa correta.",
      image: BUB1.A8S5,
      audioSource: require("../../../../../mp3/BU/B1/A8S5.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Exactly", "Extract"],
      correctOption: "Exactly",
      successTitle: "Correto",
      feedbackMessage: '"Exactly" foca a pergunta nos fatos.',
    },
  },
  {
    key: "probing-tip",
    component: Exercise17,
    activity: {
      label: "Sondagem: Indo Direto ao Ponto",
      content: [
        `Às vezes, as pessoas falam muito e não dizem nada. Como você faz a pessoa ir direto ao ponto sem parecer grosseiro? Você adiciona a palavra mágica exactly (exatamente) à sua pergunta. Em vez de perguntar o agressivo "What do you want?", pergunte: "What exactly are you proposing?" (O que exatamente você está propondo?). Essa pequena palavra tira o tom de acusação e coloca o foco puramente nos fatos e na clareza.`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "exactly-complete",
    component: Exercise5,
    activity: {
      prompt:
        "O fornecedor fez uma proposta muito confusa. Como você foca a conversa de forma incisiva, mas diplomática?",
      image: BUB1.A8S5,
      sentenceStart: "This sounds interesting, but what",
      sentenceEnd: "are you proposing in terms of deadlines?",
      options: ["exactly", "extract"],
      correctAnswer: "exactly",
      successTitle: "Correto",
      successMessage: '"What exactly..." pede precisão sem soar agressivo.',
    },
  },
  {
    key: "exactly-spell",
    component: Exercise13,
    needsSpeech: true,
    activity: {
      prompt:
        "Organize as letras para formar a palavra que usamos para ir exatamente ao ponto.",
      audioText: "Exactly",
      audioDurationMs: 1200,
      letters: ["X", "E", "T", "C", "Y", "A", "L"],
      correctWord: "EXACTLY",
      successTitle: "Correto",
      successMessage: "EXACTLY.",
    },
  },
  {
    key: "clarifying-dialog-complete",
    component: Exercise2,
    activity: {
      prompt: "Leia o diálogo e preencha as lacunas.",
      paragraphs: [
        [
          'Boss: "We need to optimize the global synergy of our assets."\nYou: "Okay, just to make sure I\'m ',
          {
            id: "blank-1",
            options: ["following", "going"],
            answer: "following",
          },
          "... could you ",
          { id: "blank-2", options: ["expand", "extend"], answer: "expand" },
          " on that? What ",
          { id: "blank-3", options: ["exactly", "expect"], answer: "exactly" },
          ' are you proposing we do first?"',
        ],
      ],
      successTitle: "Correto",
      successMessage: "Você pediu clareza com elegância.",
    },
  },
  {
    key: "server-risk-audio",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt:
        "Escute a analista pedindo esclarecimentos ao time de tecnologia. A afirmação escrita é verdadeira ou falsa?",
      image: BUB1.A8S10,
      audioSource: require("../../../../../mp3/BU/B1/A8S10.mp3"),
      audioDurationMs: 7600,
      statement:
        "A analista entendeu tudo perfeitamente na primeira vez e não precisa de mais informações.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage:
        'Ela usa "expand on that" porque precisa de mais detalhes sobre o risco.',
    },
  },
  {
    key: "following-order",
    component: Exercise6,
    activity: {
      prompt:
        "Clique nas palavras na ordem correta para garantir que você está acompanhando o raciocínio.",
      words: ["I'm", "sure", "just", "following", "make", "to"],
      correctOrder: ["just", "to", "make", "sure", "I'm", "following"],
      successTitle: "Correto",
      successMessage: "Just to make sure I'm following.",
    },
  },
  {
    key: "fees-plan-speaking",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        'Uma empresa americana falou rápido demais sobre o novo plano de taxas. Use "Just to make sure...", "Could you expand..." e "What exactly...".',
      helperText:
        "Just to make sure I'm following, could you expand on that? What exactly are you proposing?",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "Just to make sure I'm following, could you expand on that? What exactly are you proposing?",
      recordLabel: "Gravar Áudio",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você pediu esclarecimento com postura profissional.",
    },
  },
  {
    key: "clarifying-feedback",
    component: Exercise17,
    activity: {
      label: "Você no Controle da Informação!",
      content: [
        `Trabalho brilhante! Fazer perguntas em inglês costuma ser o ponto fraco de muitos profissionais, mas você acabou de transformar isso no seu ponto forte. Quando você usa "Could you expand on that?" e "What exactly...?", você obriga o outro lado a ser claro e objetivo, e você ganha tempo para pensar! Você está dominando a diplomacia corporativa. Na próxima aula, vamos para um dos momentos mais tensos: como discordar sem destruir o relacionamento (Diplomatic Disagreement).`,
      ],
      continueLabel: "Finalizar",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
