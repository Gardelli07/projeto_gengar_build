import { BUB1, Images } from "../../../../util/images";
import createBusinessLessonScreen from "./BusinessLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "parking-lot-intro",
    component: "Exercise17",
    activity: {
      label: 'O famoso "Estacionamento" das Reuniões',
      content: [
        `Em reuniões avançadas, quando alguém foge da pauta, nós não dizemos "Stop talking about this". Nós usamos a técnica do "Parking Lot" (Estacionamento). Falamos: "Let's park that thought" (Vamos estacionar esse pensamento / Deixar para depois). Para trazer o assunto de volta para o foco principal, dizemos "Let's reel this back to..." (Vamos puxar isso de volta para...).`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "parking-expressions-match",
    component: "Exercise1",
    activity: {
      prompt:
        "Conecte as expressões de controle de narrativa com seus significados no mundo corporativo.",
      pairs: [
        { en: "Park that thought", pt: "Deixar essa ideia para depois" },
        { en: "Reel this back", pt: "Puxar o assunto de volta" },
      ],
      successTitle: "Correto",
      successMessage: "Você aprendeu a validar uma ideia sem sair da pauta.",
    },
  },
  {
    key: "park-reel-image-match",
    component: "Exercise15",
    activity: {
      prompt: "Clique na imagem e na expressão exata que a descreve.",
      images: [
        { id: "park-img", image: BUB1.A2S3p1 },
        { id: "reel-img", image: BUB1.A2S3p2 },
      ],
      words: [
        { id: "park-word", label: "Park that thought" },
        { id: "reel-word", label: "Reel this back" },
      ],
      pairs: [
        { imageId: "park-img", wordId: "park-word" },
        { imageId: "reel-img", wordId: "reel-word" },
      ],
      successTitle: "Correto",
      successMessage: "Park deixa para depois; reel puxa de volta.",
    },
  },
  {
    key: "reel-budget-correct",
    component: "Exercise4",
    activity: {
      prompt:
        "Qual é a frase escrita corretamente para puxar o assunto de volta para a pauta?",
      image: BUB1.A2S4,
      wrongSentence: "Back to budget",
      options: [
        "Let's wheel this back to the budget.",
        "Let's reel this back to the budget.",
        "Let's real this back to the budget.",
      ],
      correctAnswer: "Let's reel this back to the budget.",
      successTitle: "Correto",
      successMessage: '"Reel this back" é a expressão correta.',
    },
  },
  {
    key: "interest-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt:
        "Ouça a palavra isolada e escolha a alternativa correta que você escutou.",
      image: BUB1.A2S5,
      audioSource: require("../../../../../mp3/BU/B1/A2S5.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Interest", "Internet"],
      correctOption: "Interest",
      successTitle: "Correto",
      feedbackMessage: '"Interest" aparece em "In the interest of time".',
    },
  },
  {
    key: "interest-of-time-tip",
    component: "Exercise17",
    activity: {
      label: 'A desculpa de ouro: "In the interest of time"',
      content: [
        `Quando uma reunião está atrasada e você precisa cortar um assunto educadamente, os líderes usam a expressão "In the interest of time..." (Pelo bem do tempo / Devido ao nosso limite de tempo...). É a forma mais inquestionável de acelerar a reunião e passar para o próximo tópico!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "interest-complete",
    component: "Exercise5",
    activity: {
      prompt:
        'O tempo está acabando. Qual é a palavra certa para usar a "desculpa de ouro"?',
      sentenceStart: "In the",
      sentenceEnd: "of time, let's move on to the final topic.",
      options: ["interest", "inside"],
      correctAnswer: "interest",
      successTitle: "Correto",
      successMessage: "In the interest of time...",
    },
  },
  {
    key: "interest-spell",
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt:
        "Organize as letras para formar a palavra-chave da nossa última expressão.",
      audioSource: require("../../../../../mp3/BU/B1/A2S5.mp3"),
      audioDurationMs: 1000,
      letters: ["N", "I", "E", "T", "R", "E", "S", "T"],
      correctWord: "INTEREST",
      successTitle: "Correto",
      successMessage: "INTEREST.",
    },
  },
  {
    key: "parking-dialogue-complete",
    component: "Exercise2",
    activity: {
      prompt:
        "Leia o diálogo da reunião e complete as lacunas com as expressões que aprendemos hoje.",
      paragraphs: [
        [
          'Sarah: "Maybe we should change the uniform colors!"\nManager: "Sarah, let\'s ',
          { id: "blank-1", options: ["stop", "park"], answer: "park" },
          " that thought. It's not on the agenda today. In the ",
          {
            id: "blank-2",
      options: ["interest", "internet"],
            answer: "interest",
          },
          " of time, I need to ",
          { id: "blank-3", options: ["reel", "wheel"], answer: "reel" },
          ' this back to our current sales numbers."',
        ],
      ],
      successTitle: "Correto",
      successMessage: "Você cortou a distração sem soar rude.",
    },
  },
  {
    key: "parking-audio-true-false",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt:
        "Escute o áudio. A frase escrita na tela é verdadeira ou falsa sobre a decisão da líder da reunião?",
      image: BUB1.A2S10,
      audioSource: require("../../../../../mp3/BU/B1/A2S10.mp3"),
      audioDurationMs: 5200,
      statement:
        "A líder quer continuar falando sobre o assunto secundário porque eles têm muito tempo sobrando.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage:
        "Ela quer estacionar o assunto e voltar ao projeto principal.",
    },
  },
  {
    key: "interest-park-order",
    component: "Exercise6",
    activity: {
      prompt:
        "Clique nas palavras na ordem correta para montar a frase perfeita de controle de reunião.",
      words: [
        "time",
        "the",
        "interest",
        "in",
        "of",
        ",",
        "thought",
        "that",
        "park",
        "let's",
      ],
      correctOrder: [
        "in",
        "the",
        "interest",
        "of",
        "time",
        ",",
        "let's",
        "park",
        "that",
        "thought",
      ],
      successTitle: "Correto",
      successMessage: "In the interest of time, let's park that thought.",
    },
  },
  {
    key: "parking-audio-practice",
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction:
        'Alguém começou a falar sobre o torneio de tênis no meio da discussão do projeto. Envie um áudio interrompendo educadamente. Use "Park that thought" e "in the interest of time".',
      helperText:
        "In the interest of time, let's park that thought and return to the project.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "In the interest of time, let's park that thought and return to the project.",
      recordLabel: "Gravar Áudio",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você controlou a pauta com educação.",
    },
  },
  {
    key: "parking-feedback",
    component: "Exercise17",
    activity: {
      label: "Você é o mestre da pauta!",
      content: [
        `Excelente trabalho! Percebeu como o vocabulário avançado te dá poder sem parecer arrogante? Dizer "In the interest of time" mostra que você valoriza a agenda de todo mundo, enquanto "Park that thought" valida a ideia da pessoa, mas garante que a sua reunião não saia dos trilhos. Na próxima aula, vamos subir o nível e aprender a lidar com quem monopoliza a conversa!`,
      ],
      continueLabel: "Finalizar",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
