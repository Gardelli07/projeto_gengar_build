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
    key: "interruptions-intro",
    component: Exercise17,
    activity: {
      label: "Como Interromper sem ser Rude",
      content: [
        `Em reuniões de negócios em inglês, o ritmo é muito acelerado. Se você esperar alguém parar de respirar para dar sua opinião, você nunca vai falar! Porém, no nível avançado, não podemos simplesmente gritar "Listen to me!". Para cortar alguém com elegância e pedir licença para falar, os nativos usam a expressão: "If I could just jump in here..." (Se eu pudesse só entrar/pular aqui rapidinho na conversa...). O verbo jump in é a forma perfeita e polida de se inserir no meio do discurso de outra pessoa.`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "jump-in-match",
    component: Exercise1,
    activity: {
      prompt:
        "Conecte as partes da nossa nova expressão de interrupção com suas traduções correspondentes.",
      pairs: [
        { en: "If I could just...", pt: "Se eu pudesse apenas..." },
        { en: "Jump in here", pt: "Entrar aqui (na conversa)" },
      ],
      successTitle: "Correto",
      successMessage: "Essa abertura pede espaço sem atropelar a outra pessoa.",
    },
  },
  {
    key: "jump-in-image-match",
    component: Exercise15,
    activity: {
      prompt: "Clique na imagem e na expressão exata que a descreve.",
      images: [
        { id: "polite-img", image: BUB1.A7S3p1 },
        { id: "jump-img", image: BUB1.A7S3p2 },
      ],
      words: [
        { id: "polite-word", label: "If I could just jump in here..." },
        { id: "jump-word", label: "Jump" },
      ],
      pairs: [
        { imageId: "polite-img", wordId: "polite-word" },
        { imageId: "jump-img", wordId: "jump-word" },
      ],
      successTitle: "Correto",
      successMessage: "Jump pode ser literal ou figurativo em reuniões.",
    },
  },
  {
    key: "jump-complete",
    component: Exercise5,
    activity: {
      prompt:
        "O diretor está falando, mas você teve uma ideia brilhante e precisa interromper.",
      image: BUB1.A7S3p1,
      sentenceStart: "Sorry to interrupt, Mark, but if I could just",
      sentenceEnd: "in here, I have an idea that might help.",
      options: ["step", "jump"],
      correctAnswer: "jump",
      successTitle: "Correto",
      successMessage:
        '"Jump in" é a expressão natural para entrar na conversa.',
    },
  },
  {
    key: "quick-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Ouça a palavra isolada e escolha a alternativa correta.",
      image: BUB1.A7S5,
      audioSource: require("../../../../../mp3/BU/B1/A7S5.mp3"),
      audioDurationMs: 900,
      answerOptions: ["Quick", "Click"],
      correctOption: "Quick",
      successTitle: "Correto",
      feedbackMessage: '"Quick point" promete que você será breve.',
    },
  },
  {
    key: "quick-point-tip",
    component: Exercise17,
    activity: {
      label: 'O "Ponto Rápido" e o "Antes de Avançarmos"',
      content: [
        `Depois de conseguir interromper usando "jump in", você precisa justificar a sua interrupção. O segredo diplomático é prometer que você será breve: "...I'd like to add a quick point". E se o líder estiver prestes a mudar de assunto e você ainda não tiver falado, a frase de salvamento é: "Before we move on..." (Antes de prosseguirmos/avançarmos...). É o combo perfeito!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "quick-point-correct",
    component: Exercise4,
    activity: {
      prompt:
        'Você quer dizer que tem um "ponto rápido" a adicionar. Qual é a frase escrita corretamente?',
      image: BUB1.A7S7,
      wrongSentence: "Quick point",
      options: [
        "I'd like to add a fast point.",
        "I'd like to add a quick point.",
        "I'd like to add a speed point.",
      ],
      correctAnswer: "I'd like to add a quick point.",
      successTitle: "Correto",
      successMessage: 'A collocation natural é "quick point".',
    },
  },
  {
    key: "before-spell",
    component: Exercise13,
    needsSpeech: true,
    activity: {
      prompt:
        'Organize as letras para formar a palavra que você usa em "________ we move on".',
      audioText: "Before",
      audioDurationMs: 1000,
      letters: ["F", "E", "B", "R", "O", "E"],
      correctWord: "BEFORE",
      successTitle: "Correto",
      successMessage: "BEFORE.",
    },
  },
  {
    key: "interruption-dialog-complete",
    component: Exercise2,
    activity: {
      prompt: "Leia o diálogo e preencha as lacunas.",
      paragraphs: [
        [
          'Sarah: "So, that concludes the marketing numbers. Let\'s talk about IT."\nYou: "Sarah, if I could just ',
          { id: "blank-1", options: ["jump", "run"], answer: "jump" },
          " in here... ",
          { id: "blank-2", options: ["Before", "After"], answer: "Before" },
          " we move on, I'd like to add a ",
          { id: "blank-3", options: ["quick", "fast"], answer: "quick" },
          ' point about those marketing numbers."',
        ],
      ],
      successTitle: "Correto",
      successMessage: "Você montou uma interrupção educada e objetiva.",
    },
  },
  {
    key: "budget-interruption-audio",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt:
        "Escute o gerente interrompendo a reunião. A afirmação escrita é verdadeira ou falsa?",
      image: BUB1.A7S10,
      audioSource: require("../../../../../mp3/BU/B1/A7S10.mp3"),
      audioDurationMs: 7200,
      statement:
        "O gerente interrompeu a reunião porque ele quer falar sobre o novo software.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage:
        "Ele interrompeu antes do software porque queria falar sobre o budget.",
    },
  },
  {
    key: "jump-in-order",
    component: Exercise6,
    activity: {
      prompt:
        "Clique nas palavras na ordem correta para se inserir na conversa.",
      words: ["here", "jump", "in", "just", "could", "I", "if", ","],
      correctOrder: ["if", "I", "could", "just", "jump", "in", "here", ","],
      successTitle: "Correto",
      successMessage: "If I could just jump in here,",
    },
  },
  {
    key: "client-detail-speaking",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        'O diretor está encerrando o tópico, mas você lembrou de um detalhe crucial sobre o cliente. Use "If I could just jump...", "Before we..." e "I\'d like to add...".',
      helperText:
        "If I could just jump in here, before we move on, I'd like to add a quick point about the client.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "If I could just jump in here, before we move on, I'd like to add a quick point about the client.",
      recordLabel: "Gravar Áudio",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você interrompeu com timing e respeito.",
    },
  },
  {
    key: "interruptions-feedback",
    component: Exercise17,
    activity: {
      label: "O Mestre do Timing!",
      content: [
        `Sensacional! Interromper alguém em inglês costuma dar muito frio na barriga, mas agora você tem a "fórmula de segurança". Usando "If I could just jump in here" você demonstra domínio do idioma e respeito pela pessoa que está falando. E com o "add a quick point", você tira a tensão de quem estava apresentando. Você está soando extremamente profissional! Na próxima aula, vamos aprender a fazer as perguntas certas para descobrir o que não está sendo dito (Clarifying & Probing).`,
      ],
      continueLabel: "Finalizar",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
