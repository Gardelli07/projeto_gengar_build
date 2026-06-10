import { Exercise1 } from "../../../../exc/ex1";
import { Exercise2 } from "../../../../exc/ex2";
import { Exercise3 } from "../../../../exc/ex3";
import { Exercise4 } from "../../../../exc/ex4";
import { Exercise5 } from "../../../../exc/ex5";
import { Exercise6 } from "../../../../exc/ex6";
import { Exercise14 } from "../../../../exc/ex14";
import { Exercise15 } from "../../../../exc/ex15";
import { Exercise16 } from "../../../../exc/ex16";
import { Exercise17 } from "../../../../exc/ex17";
import { Exercise18 } from "../../../../exc/ex18";
import { BUB1, Images } from "../../../../util/images";
import createBusinessLessonScreen from "./BusinessLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "silencing-dominators-intro",
    component: Exercise17,
    activity: {
      label: 'Trazendo os "Quietinhos" para a Conversa',
      content: [
        `Em toda reunião, existe alguém que domina a conversa e alguém brilhante que fica calado. Um líder de verdade sabe extrair ideias de todos. Para convidar alguém para a conversa de forma elegante e valorizando a pessoa, os nativos não dizem "Speak, Sarah". Eles usam: "I'd like to bring Sarah in on this" (Gostaria de trazer a Sarah para essa conversa/ouvir a Sarah sobre isso). E para perguntar a opinião, substituem o batido "What's your opinion?" por "What's your take on this?" (Qual é a sua visão/pegada sobre isso?).`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "bring-take-match",
    component: Exercise1,
    activity: {
      prompt:
        "Conecte as expressões avançadas de liderança com seus significados no português.",
      pairs: [
        { en: "Bring [Name] in on this", pt: "Trazer [Nome] para a conversa" },
        { en: "What's your take?", pt: "Qual a sua visão?" },
      ],
      successTitle: "Correto",
      successMessage:
        "Você já sabe incluir pessoas na conversa com naturalidade.",
    },
  },
  {
    key: "bring-sarah-correct",
    component: Exercise4,
    activity: {
      prompt:
        "Você quer ouvir o que a Sarah tem a dizer sobre o projeto. Qual é a frase escrita corretamente?",
      image: BUB1.A3S4,
      wrongSentence: "Invite Sarah",
      options: [
        "I'd like to bring Sarah on in this.",
        "I'd like to bring Sarah in on this.",
        "I'd like to bring Sarah at on this.",
      ],
      correctAnswer: "I'd like to bring Sarah in on this.",
      successTitle: "Correto",
      successMessage: '"Bring Sarah in on this" usa as preposições certas.',
    },
  },
  {
    key: "take-complete",
    component: Exercise5,
    activity: {
      prompt:
        'Complete a frase usando uma alternativa mais nativa que "opinion".',
      sentenceStart: "We've seen the numbers. Mark, what's your",
      sentenceEnd: "on this?",
      options: ["talk", "take"],
      correctAnswer: "take",
      successTitle: "Correto",
      successMessage: '"What\'s your take?" é natural e moderno.',
    },
  },
  {
    key: "hold-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt:
        "Ouça a palavra isolada e escolha a alternativa correta que você escutou.",
      image: BUB1.A3S9,
      audioSource: require("../../../../../mp3/BU/B1/A3S5.mp3"),
      audioDurationMs: 900,
      answerOptions: ["Hold", "Old"],
      correctOption: "Hold",
      successTitle: "Correto",
      feedbackMessage: '"Hold" aparece em "Hold that thought".',
    },
  },
  {
    key: "hold-thought-tip",
    component: Exercise17,
    activity: {
      label: 'Cortando o "Tagarela" com Classe',
      content: [
        `Como você corta alguém que não para de falar sem criar um clima ruim? Você usa a interrupção diplomática: "Hold that thought" (Segure esse pensamento). Em seguida, você justifica o corte transferindo a atenção para a equipe com a expressão: "Let's hear from the rest of the room" (Vamos ouvir o resto da sala).`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "hold-room-image-match",
    component: Exercise15,
    activity: {
      prompt: "Clique na imagem e na expressão exata que a descreve.",
      images: [
        { id: "hold-img", image: BUB1.A3S7p1 },
        { id: "room-img", image: BUB1.A3S7p2 },
      ],
      words: [
        { id: "hold-word", label: "Hold that thought" },
        { id: "room-word", label: "Rest of the room" },
      ],
      pairs: [
        { imageId: "hold-img", wordId: "hold-word" },
        { imageId: "room-img", wordId: "room-word" },
      ],
      successTitle: "Correto",
      successMessage:
        "Hold interrompe com classe; rest of the room inclui a equipe.",
    },
  },
  {
    key: "dominators-complete",
    component: Exercise2,
    activity: {
      prompt: 'Complete as lacunas para interromper o "tagarela".',
      paragraphs: [
        [
          'John: "And another thing about the budget, I really think we should..."\nManager: "John, ',
          { id: "blank-1", options: ["hold", "keep"], answer: "hold" },
          " that thought. You've made excellent points, but let's ",
          { id: "blank-2", options: ["listen", "hear"], answer: "hear" },
          " from the rest of the ",
          { id: "blank-3", options: ["room", "table"], answer: "room" },
          '."',
        ],
      ],
      successTitle: "Correto",
      successMessage: "Você interrompeu sem desvalorizar a pessoa.",
    },
  },
  {
    key: "dominators-audio-true-false",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt:
        "Escute o áudio. A afirmação escrita é verdadeira ou falsa sobre a atitude do gerente?",
      image: BUB1.A3S9,
      audioSource: require("../../../../../mp3/BU/B1/A3S9.mp3"),
      audioDurationMs: 7200,
      statement:
        "O gerente quer que o John continue falando para que a Sarah possa escutar.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage:
        "O gerente segura o John e traz a Sarah para a conversa.",
    },
  },
  {
    key: "hold-mark-order",
    component: Exercise6,
    activity: {
      prompt:
        "Clique nas palavras na ordem correta para segurar o pensamento dele e convidar o Mark.",
      words: [
        "thought",
        "hold",
        "that",
        ",",
        "like",
        "I'd",
        "to",
        "bring",
        "Mark",
        "in",
      ],
      correctOrder: [
        "hold",
        "that",
        "thought",
        ",",
        "I'd",
        "like",
        "to",
        "bring",
        "Mark",
        "in",
      ],
      successTitle: "Correto",
      successMessage: "Hold that thought, I'd like to bring Mark in.",
    },
  },
  {
    key: "take-on-this-type",
    component: Exercise18,
    activity: {
      prompt:
        "Escreva a frase na ordem correta para perguntar a visão do time.",
      scrambledSentence: "take / your / on / what's / this / ?",
      correctAnswer: "What's your take on this?",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "What's your take on this?",
    },
  },
  {
    key: "silencing-audio-practice",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        "O John está monopolizando a conversa. Envie um áudio pedindo para ele segurar o pensamento, trazendo Sarah para a conversa e perguntando a visão dela.",
      helperText:
        "John, hold that thought. I'd like to bring Sarah in on this. Sarah, what's your take?",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "John, hold that thought. I'd like to bring Sarah in on this. Sarah, what's your take?",
      recordLabel: "Gravar Áudio",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você redistribuiu a conversa com autoridade.",
    },
  },
  {
    key: "silencing-feedback",
    component: Exercise17,
    activity: {
      label: "Autoridade e Empatia",
      content: [
        `Perfeito! Percebeu como esse vocabulário te transforma de um simples participante em um facilitador de reuniões? Você usou "Hold that thought" para impor limites sem agressividade e "Bring [Name] in" para demonstrar que valoriza a equipe. Você dominou a dinâmica da sala! Na próxima aula, vamos aprender o vocabulário essencial de "Timeboxing" para nunca mais deixar uma reunião passar do horário. See you next class!`,
      ],
      continueLabel: "Finalizar",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
