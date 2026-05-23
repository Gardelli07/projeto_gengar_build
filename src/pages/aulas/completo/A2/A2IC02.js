import createA2LessonScreen from "./A2LessonScreen";
import { ICA2 } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic02s1",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 1 • AULA 2",
      content: [
        "/blue{Present Continuous: Part 2}",
        "",
        "Pense na sua vida agora. Cada pessoa que você conhece está fazendo algo neste exato milésimo de segundo. Hoje vamos esculpir o verbo e montar a estrutura perfeita para descrever o mundo em movimento.",
        "",
        "/blue{Tip - O Poder do Sufixo}",
        "Regra geral: Play → Playing",
        "CVC: Stop → Stopping",
        "Silent E: Write → Writing",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic02s2",
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "/blue{A Regra do E Invisível}",
        "Se o verbo termina em E silencioso, jogue esse E fora antes de adicionar -ING.",
        "Dance → Dancing",
        "Prepare-se para o Speed Challenge!",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic02s3",
    component: "Exercise11",
    activity: {
      prompt: "Transforme em -ING o mais rápido que puder!",
      title: "Digite a forma com -ING",
      placeholder: "Digite aqui",
      secondsPerWord: 8,
      words: ["Dancing", "Coding", "Scaling", "Practicing", "Creating"],
      successTitle: "Correto",
      successMessage: "Você aplicou a regra do E invisível.",
    },
  },
  {
    key: "a2ic02s4",
    component: "Exercise17",
    activity: {
      label: "Tip",
      content: [
        "/blue{Formal vs. Informal}",
        "A contração é sua melhor amiga na fala.",
        'Formal: "We are traveling."',
        'Informal: "We\'re traveling."',
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic02s5",
    component: "Exercise6",
    activity: {
      prompt: "Arraste os blocos para descrever o que a Maria está fazendo:",
      words: ["is", "Maria", "working", "from home", "today."],
      correctOrder: ["Maria", "is", "working", "from home", "today."],
      successTitle: "Correto",
      successMessage: "Maria is working from home today.",
    },
  },
  {
    key: "a2ic02s6",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Ouça e escolha a frase correta",
      image: ICA2.A2S6,
      audioSource: require("../../../../../mp3/IC/A2/A2S6.mp3"),
      options: ["They are making dinner.", "They are makeng dinner."],
      correctAnswer: "They are making dinner.",
      correctOption: "They are making dinner.",
      feedbackMessage: 'O correto é "making": o E de "make" desaparece.',
      successTitle: "Correto",
    },
  },
  {
    key: "a2ic02s7",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Leia e responda: verdadeiro ou falso?",
      image: ICA2.A2S7,
      audioText: "I'm swimming in the pool.",
      statement:
        'Na frase "I\'m swiming in the pool", a escrita do verbo está correta.',
      textOnScreen: '"I\'m swiming in the pool" está escrito corretamente.',
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      successMessage: "False. O correto é swimming com dois Ms pela regra CVC.",
      feedbackMessage:
        "Verbos CVC como swim dobram a última consoante: swimming.",
    },
  },
  {
    key: "a2ic02s8",
    component: "Exercise2",
    activity: {
      prompt: "Complete a frase",
      paragraphs: [
        [
          "Look at the dog! It ",
          { id: "b1", answer: "is", options: ["am", "is", "are"] },
          " chasing a ball.",
        ],
      ],
      successTitle: "Correto",
      successMessage: 'Usamos "is" com it: It is chasing a ball.',
    },
  },
  {
    key: "a2ic02s9",
    component: "Exercise4",
    activity: {
      prompt: 'Traduza: "Meus pais estão viajando."',
      image: ICA2.A2S9,
      wrongSentence: "Meus pais estão viajando.",
      options: [
        "My parents is traveling.",
        "My parents are traveling.",
        "My parents am traveling.",
      ],
      correctAnswer: "My parents are traveling.",
      successTitle: "Correto",
      successMessage: 'Parents é plural, então usamos "are".',
    },
  },
  {
    key: "a2ic02s10",
    component: "Exercise4",
    activity: {
      prompt: 'Alguém pergunta: "Onde está o João?"',
      image: ICA2.A2S10,
      wrongSentence: "Escolha a ação acontecendo agora.",
      options: [
        "He works at the office.",
        "He's working at the office right now.",
      ],
      correctAnswer: "He's working at the office right now.",
      successTitle: "Correto",
      successMessage: 'Right now pede Present Continuous: "He\'s working".',
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
