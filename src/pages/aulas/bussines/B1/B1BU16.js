import { Exercise1 } from "../../../../exc/ex1";
import { Exercise2 } from "../../../../exc/ex2";
import { Exercise3 } from "../../../../exc/ex3";
import { Exercise4 } from "../../../../exc/ex4";
import { Exercise5 } from "../../../../exc/ex5";
import { Exercise6 } from "../../../../exc/ex6";
import { Exercise13 } from "../../../../exc/ex13";
import { Exercise14 } from "../../../../exc/ex14";
import { Exercise16 } from "../../../../exc/ex16";
import { Exercise17 } from "../../../../exc/ex17";
import { BUB1, Images } from "../../../../util/images";
import createBusinessLessonScreen from "./BusinessLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "intro",
    component: Exercise17,
    activity: {
      label: 'Resumindo o Caos: Os "Takeaways"',
      content: [
        `Depois de 60 minutos de muito debate, alguém precisa assumir a liderança e resumir tudo em 60 segundos antes de a reunião acabar. Em inglês avançado, o líder não diz "Let me repeat what we talked about". Ele diz: "To recap our main takeaways..." (Para recapitular nossas principais conclusões/lições). A palavra Takeaway significa literalmente "aquilo que você leva embora" da reunião, ou seja, as conclusões principais.`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "match",
    component: Exercise1,
    activity: {
      prompt:
        "Conecte as expressões de resumo corporativo com os seus significados em português.",
      pairs: [
        { en: "To recap", pt: "Recapitular / Resumir brevemente" },
        {
          en: "Main takeaways",
          pt: "Principais conclusões / Pontos principais a se levar",
        },
      ],
      successTitle: "Correto",
      successMessage: "Essas expressões fecham reuniões com clareza.",
    },
  },
  {
    key: "correct",
    component: Exercise4,
    activity: {
      prompt:
        "A reunião está nos minutos finais. Qual frase lista os pontos principais corretamente?",
      image: BUB1.A16S4,
      wrongSentence: "Recap",
      options: [
        "To recap our main takeaways...",
        "To recap our main takeaways from...",
        "To recap our main takeouts...",
      ],
      correctAnswer: "To recap our main takeaways...",
      successTitle: "Correto",
      successMessage:
        '"Takeaways" são conclusões; "takeout" é mais usado para comida para viagem.',
    },
  },
  {
    key: "nutshell-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Ouça a palavra isolada e escolha a alternativa correta.",
      image: BUB1.A16S5,
      audioSource: require("../../../../../mp3/BU/B1/A16S5.mp3"),
      audioText: "Nutshell.",
      audioDurationMs: 1000,
      answerOptions: ["Nutshell", "Nothing"],
      correctOption: "Nutshell",
      successTitle: "Correto",
      feedbackMessage: '"In a nutshell" significa em resumo.',
    },
  },
  {
    key: "nutshell-tip",
    component: Exercise17,
    activity: {
      label: 'Como dizer "Trocando em miúdos"',
      content: [
        `Se o assunto foi extremamente complexo e você precisa explicá-lo em uma única frase simples, os nativos usam: "In a nutshell..." (Em resumo... / Trocando em miúdos...). E para fechar com chave de ouro, você diz qual foi o acordo geral do grupo: "The key consensus is..." (O consenso/acordo principal é...).`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "nutshell-complete",
    component: Exercise5,
    activity: {
      prompt: 'Como você diz "Em resumo" de forma avançada?',
      image: BUB1.A16S5,
      sentenceStart: "It's a complex software, but in a",
      sentenceEnd: "it makes your system 50% faster.",
      options: ["nutshell", "nutshells"],
      correctAnswer: "nutshell",
      successTitle: "Correto",
      successMessage: "A expressão é sempre no singular: in a nutshell.",
    },
  },
  {
    key: "consensus-spell",
    component: Exercise13,
    needsSpeech: true,
    activity: {
      prompt: 'Organize as letras para formar a palavra "Consenso".',
      audioText: "Consensus",
      audioDurationMs: 1300,
      letters: ["S", "N", "S", "O", "C", "N", "E", "S", "U"],
      correctWord: "CONSENSUS",
      successTitle: "Correto",
      successMessage: "CONSENSUS.",
    },
  },
  {
    key: "complete",
    component: Exercise2,
    activity: {
      prompt: "Leia as palavras finais do Diretor e preencha as lacunas.",
      paragraphs: [
        [
          "Great meeting, team. To ",
          { id: "b1", options: ["recap", "repeat"], answer: "recap" },
          " our main ",
          { id: "b2", options: ["takeaways", "takeouts"], answer: "takeaways" },
          ", we need to cut costs. In a ",
          { id: "b3", options: ["nutshell", "nutshells"], answer: "nutshell" },
          ", we are spending too much on software. So, the key ",
          {
            id: "b4",
            options: ["consensus", "consequence"],
            answer: "consensus",
          },
          " is to freeze new purchases.",
        ],
      ],
      successTitle: "Correto",
      successMessage: "Você resumiu takeaways, nutshell e consensus.",
    },
  },
  {
    key: "audio",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt:
        "Escute a gerente amarrando as ideias. A afirmação escrita é verdadeira ou falsa?",
      image: BUB1.A16S10,
      audioSource: require("../../../../../mp3/BU/B1/A16S10.mp3"),
      audioText:
        "To recap our main takeaways today: we have a new design for the app. In a nutshell, it's more modern and faster. The key consensus is that we launch it next week.",
      audioDurationMs: 7800,
      statement:
        "In a nutshell, a gerente resumiu que o novo design do app é mais moderno e mais rápido.",
      options: ["true", "false"],
      correctAnswer: "true",
      successTitle: "Correto",
      feedbackMessage: "Esse é exatamente o resumo compacto dela.",
    },
  },
  {
    key: "order",
    component: Exercise6,
    activity: {
      prompt:
        "Clique nas palavras na ordem correta para puxar o resumo final para você.",
      words: ["takeaways", "main", "our", "recap", "to", ","],
      correctOrder: ["to", "recap", "our", "main", "takeaways", ","],
      successTitle: "Correto",
      successMessage: "To recap our main takeaways,",
    },
  },
  {
    key: "speaking",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        'Finalize uma reunião longa: use "To recap our main takeaways", "In a nutshell" e "The key consensus is that we start tomorrow".',
      helperText:
        "To recap our main takeaways, in a nutshell, the key consensus is that we start tomorrow.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "To recap our main takeaways, in a nutshell, the key consensus is that we start tomorrow.",
      recordLabel: "Gravar Áudio",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você encerrou com liderança.",
    },
  },
  {
    key: "feedback",
    component: Exercise17,
    activity: {
      label: "Você evitou o caos!",
      content: [
        `Trabalho excepcional! Uma reunião sem um bom resumo final não serve para nada, pois as pessoas saem confusas. Ao assumir o controle nos últimos minutos e usar "To recap our main takeaways" e "In a nutshell", você garante que todos saiam da sala com o mesmo pensamento. Na próxima aula, vamos aprender a distribuir as tarefas usando "Action Items".`,
      ],
      continueLabel: "Finalizar",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
