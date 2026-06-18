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
    key: "deescalating-intro",
    component: Exercise17,
    activity: {
      label: "Apagando Incêndios com Classe",
      content: [
        `Em reuniões de alto nível, discordâncias acontecem e os ânimos podem se exaltar. Um líder nativo não grita "Calm down!" (isso costuma irritar ainda mais a pessoa). Para esfriar a discussão com elegância e retomar o controle, nós usamos a expressão: "Let's take a step back" (Vamos dar um passo para trás / respirar e olhar o quadro geral). Se a conversa começar a ficar pessoal ou agressiva, você impõe respeito dizendo: "Let's keep this constructive" (Vamos manter isso construtivo / focado no profissional).`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "conflict-match",
    component: Exercise1,
    activity: {
      prompt:
        "Conecte as expressões de apaziguamento com os seus significados em português.",
      pairs: [
        {
          en: "Take a step back",
          pt: "Dar um passo para trás / Olhar o quadro geral",
        },
        {
          en: "Keep this constructive",
          pt: "Manter a discussão construtiva e profissional",
        },
      ],
      successTitle: "Correto",
      successMessage: "Você já sabe esfriar a conversa sem perder autoridade.",
    },
  },
  {
    key: "step-constructive-image-match",
    component: Exercise15,
    activity: {
      prompt: "Clique na imagem e na expressão exata que a descreve.",
      images: [
        { id: "step-img", image: BUB1.A5S3p1 },
        { id: "constructive-img", image: BUB1.A5S3p2 },
      ],
      words: [
        { id: "step-word", label: "Take a step back" },
        { id: "constructive-word", label: "Keep this constructive" },
      ],
      pairs: [
        { imageId: "step-img", wordId: "step-word" },
        { imageId: "constructive-img", wordId: "constructive-word" },
      ],
      successTitle: "Correto",
      successMessage:
        "Step back reduz a tensão; constructive mantém o profissionalismo.",
    },
  },
  {
    key: "take-step-back-correct",
    component: Exercise4,
    activity: {
      prompt:
        "O time está brigando. Você precisa pausar a discussão. Qual é a frase correta?",
      image: BUB1.A5S4,
      wrongSentence: "Calm the room",
      options: [
        "Let's make a step back.",
        "Let's do a step back.",
        "Let's take a step back.",
      ],
      correctAnswer: "Let's take a step back.",
      successTitle: "Correto",
      successMessage: 'Em inglês, usamos "take a step back".',
    },
  },
  {
    key: "focus-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Ouça a palavra isolada e escolha a alternativa correta.",
      image: BUB1.A5S5,
      audioSource: require("../../../../../mp3/BU/B1/A5S5.mp3"),
      audioDurationMs: 900,
      answerOptions: ["Focus", "Force"],
      correctOption: "Focus",
      successTitle: "Correto",
      feedbackMessage: '"Focus" muda a energia da sala para soluções.',
    },
  },
  {
    key: "empathy-focus-tip",
    component: Exercise17,
    activity: {
      label: "Empatia Estratégica e Foco na Solução",
      content: [
        `Depois de pedir para a equipe "dar um passo para trás", você precisa mostrar que os ouviu sem tomar partido. Fazemos isso usando a empatia estratégica: "I understand the frustration, but..." (Eu entendo a frustração, mas...). E para finalizar, você redireciona a energia da briga para a resolução do problema com a palavra que acabamos de ouvir: "...let's focus on solutions" (...vamos focar em soluções). Assim, você valida o sentimento, mas exige resultados.`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "frustration-complete",
    component: Exercise5,
    activity: {
      prompt:
        "Como você valida o que a pessoa está sentindo antes de redirecionar a reunião?",
      sentenceStart: "I understand the",
      sentenceEnd: "John, but complaining won't fix the bug.",
      options: ["frustration", "friction"],
      correctAnswer: "frustration",
      successTitle: "Correto",
      successMessage: "I understand the frustration...",
    },
  },
  {
    key: "solutions-spell",
    component: Exercise13,
    needsSpeech: true,
    activity: {
      prompt:
        'Organize as letras para formar a palavra em "Let\'s focus on ________".',
      audioSource: require("../../../../../mp3/BU/B1/A5S8.mp3"),
      audioDurationMs: 1200,
      letters: ["O", "S", "U", "L", "I", "T", "N", "O", "S"],
      correctWord: "SOLUTIONS",
      successTitle: "Correto",
      successMessage: "SOLUTIONS.",
    },
  },
  {
    key: "conflict-complete",
    component: Exercise2,
    activity: {
      prompt:
        "Leia o diálogo e preencha as lacunas com as alternativas corretas.",
      paragraphs: [
        [
          "Team, we are getting off track. Let's ",
          { id: "blank-1", options: ["take", "give"], answer: "take" },
          " a step back and keep this ",
          {
            id: "blank-2",
            options: ["constructive", "comfortable"],
            answer: "constructive",
          },
          ". I understand the ",
          {
            id: "blank-3",
            options: ["frustration", "celebration"],
            answer: "frustration",
          },
          ", but pointing fingers doesn't help. Let's focus on solutions.",
        ],
      ],
      successTitle: "Correto",
      successMessage: "Você mediou o conflito com empatia e direção.",
    },
  },
  {
    key: "conflict-audio-true-false",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt:
        "Escute o áudio do Chair da reunião separando uma discussão. A afirmação escrita é verdadeira ou falsa?",
      image: BUB1.A5S10,
      audioSource: require("../../../../../mp3/BU/B1/A5S10.mp3"),
      audioDurationMs: 7200,
      statement:
        "O líder da reunião concorda que eles devem continuar reclamando do cliente.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage:
        "Ele valida a frustração, mas redireciona para soluções.",
    },
  },
  {
    key: "step-constructive-order",
    component: Exercise6,
    activity: {
      prompt:
        "Clique nas palavras na ordem correta para pedir que todos respirem e se acalmem de forma diplomática.",
      words: [
        "back",
        "step",
        "a",
        "take",
        "let's",
        ",",
        "constructive",
        "this",
        "keep",
        "and",
      ],
      correctOrder: [
        "let's",
        "take",
        "a",
        "step",
        "back",
        ",",
        "and",
        "keep",
        "this",
        "constructive",
      ],
      successTitle: "Correto",
      successMessage: "Let's take a step back, and keep this constructive.",
    },
  },
  {
    key: "conflict-audio-practice",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        "Dois diretores estão discutindo forte sobre o corte de orçamento. Grave um áudio pedindo para todos darem um passo para trás, validando a frustração e redirecionando para soluções.",
      helperText:
        "Let's take a step back. I understand the frustration, but let's focus on solutions.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "Let's take a step back. I understand the frustration, but let's focus on solutions.",
      recordLabel: "Gravar Áudio",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você mediou o conflito com classe.",
    },
  },
  {
    key: "deescalating-feedback",
    component: Exercise17,
    activity: {
      label: "Você domina a narrativa!",
      content: [
        `Parabéns! Você concluiu o Módulo 1 com sucesso. Observe como seu vocabulário mudou: você parou de reagir emocionalmente e começou a conduzir a sala com frases de impacto. De "kick things off" a "focus on solutions", você agora tem as ferramentas de um executivo bilíngue de alta performance. Prepare-se, pois no Módulo 2 nós vamos mergulhar na arte da Nuance e da Diplomacia!`,
      ],
      continueLabel: "Finalizar",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
