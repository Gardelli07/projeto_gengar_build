import { BUB1, Images } from "../../../../util/images";
import createBusinessLessonScreen from "./BusinessLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "vendor-scenario-intro",
    component: "Exercise17",
    activity: {
      label: "Especificações Técnicas (Specs)",
      content: [
        `Na hora de fechar um contrato internacional, os detalhes técnicos do produto são a parte mais sensível. Nativos raramente falam a palavra inteira "Specifications"; eles usam a abreviação executiva "Specs". E quando o comprador pergunta se o produto tem a qualidade necessária, você diz: "We guarantee it meets the requirements". O verbo meet nos negócios significa atender ou cumprir uma meta, regra ou requisito.`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "specs-match",
    component: "Exercise1",
    activity: {
      prompt:
        "Conecte o vocabulário técnico de negociação com as suas traduções.",
      pairs: [
        { en: "Specs (Specifications)", pt: "Especificações técnicas" },
        {
          en: "Meet the requirements",
          pt: "Atender aos requisitos / Cumprir as exigências",
        },
      ],
      successTitle: "Correto",
      successMessage:
        "Specs são detalhes técnicos; requirements são exigências.",
    },
  },
  {
    key: "requirements-correct",
    component: "Exercise4",
    activity: {
      prompt:
        "O comprador perguntou se a manta de fibra atende ao padrão orgânico. Qual resposta está correta?",
      image: BUB1.A14S4,
      wrongSentence: "Requirements",
      options: [
        "We guarantee our liners do the requirements.",
        "We guarantee our liners make the requirements.",
        "We guarantee our liners meet the requirements.",
      ],
      correctAnswer: "We guarantee our liners meet the requirements.",
      successTitle: "Correto",
      successMessage: "Em inglês, você meet requirements.",
    },
  },
  {
    key: "align-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Ouça a palavra isolada e escolha a alternativa correta.",
      image: BUB1.A14S5,
      audioSource: require("../../../../../mp3/BU/B1/A14S5.mp3"),
      audioDurationMs: 900,
      answerOptions: ["Align", "Alive"],
      correctOption: "Align",
      successTitle: "Correto",
      feedbackMessage: '"Align" é alinhar próximos passos.',
    },
  },
  {
    key: "draft-tip",
    component: "Exercise17",
    activity: {
      label: "Alinhamento e Minuta de Contrato",
      content: [
        `Antes de assinar qualquer papel, o líder da negociação garante que todos estão na mesma página dizendo: "Let's align on delivery schedules". E quando está tudo certo verbalmente, o próximo passo não é "write the paper". No mundo corporativo, usamos o verbo formal: "Draft the contract" (elaborar/redigir a primeira versão do contrato).`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "align-complete",
    component: "Exercise5",
    activity: {
      prompt:
        "Vocês fecharam as especificações técnicas. Agora precisam concordar com as datas.",
      sentenceStart: "Now that we agree on the price, let's",
      sentenceEnd: "on the delivery schedules.",
      options: ["align", "assign"],
      correctAnswer: "align",
      successTitle: "Correto",
      successMessage: '"Align on" é alinhar-se sobre um ponto específico.',
    },
  },
  {
    key: "draft-spell",
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt:
        'Organize as letras para formar a palavra que usamos para "elaborar/redigir" o contrato.',
      audioSource: require("../../../../../mp3/BU/B1/A14S8.mp3"),
      audioDurationMs: 900,
      letters: ["F", "R", "A", "T", "D"],
      correctWord: "DRAFT",
      successTitle: "Correto",
      successMessage: "DRAFT.",
    },
  },
  {
    key: "final-negotiation-complete",
    component: "Exercise2",
    activity: {
      prompt: "Leia a transcrição da negociação final e preencha as lacunas.",
      paragraphs: [
        [
          "Perfect. If your coir liners ",
          { id: "blank-1", options: ["meet", "look"], answer: "meet" },
          " the requirements and follow all the ",
          { id: "blank-2", options: ["speaks", "specs"], answer: "specs" },
          " with zero latex, we have a deal. Let's ",
          { id: "blank-3", options: ["align", "around"], answer: "align" },
          " on the delivery schedules and I will ask my team to ",
          { id: "blank-4", options: ["draft", "draw"], answer: "draft" },
          " the contract.",
        ],
      ],
      successTitle: "Correto",
      successMessage: "Você fechou specs, requirements, agenda e contrato.",
    },
  },
  {
    key: "contract-audio",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt:
        "Escute o cliente americano formalizando a compra. A afirmação escrita é verdadeira ou falsa?",
      image: BUB1.A14S10,
      audioSource: require("../../../../../mp3/BU/B1/A14S10.mp3"),
      audioDurationMs: 7600,
      statement:
        "O cliente disse que as especificações não atendem aos requisitos, por isso eles não vão redigir o contrato.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage:
        "As specs atendem aos requisitos e o contrato será redigido amanhã.",
    },
  },
  {
    key: "draft-contract-order",
    component: "Exercise6",
    activity: {
      prompt:
        "Clique nas palavras na ordem correta para dizer que o setor jurídico vai preparar o documento.",
      words: ["contract", "the", "will", "our", "team", "legal", "draft"],
      correctOrder: [
        "our",
        "legal",
        "team",
        "will",
        "draft",
        "the",
        "contract",
      ],
      successTitle: "Correto",
      successMessage: "Our legal team will draft the contract.",
    },
  },
  {
    key: "closing-contract-speaking",
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction:
        "Sele o acordo: diga que o produto atende aos requisitos e às specs, alinhe os cronogramas de entrega e diga que vão elaborar o contrato amanhã.",
      helperText:
        "Our product meets the requirements and the specs. Let's align on the delivery schedules. We will draft the contract tomorrow.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "Our product meets the requirements and the specs. Let's align on the delivery schedules. We will draft the contract tomorrow.",
      recordLabel: "Gravar Áudio",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você selou o acordo internacional.",
    },
  },
  {
    key: "vendor-scenario-feedback",
    component: "Exercise17",
    activity: {
      label: "Negócio Fechado (Deal Closed)!",
      content: [
        `Parabéns, você fechou o contrato internacional! Usar "Specs", afirmar com segurança que "meets the requirements" e comandar os próximos passos com "Align" e "Draft the contract" mostram que você não é apenas um falante de inglês, mas um estrategista de negócios. Na próxima e última aula do Módulo 3, vamos aprender técnicas para destravar negociações que empacaram (Breaking Deadlocks). Você está quase lá!`,
      ],
      continueLabel: "Finalizar",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
