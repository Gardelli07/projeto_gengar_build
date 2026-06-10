import createA2LessonScreen from "./A2LessonScreen";
import { ICA2, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic46s1",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 6 • AULA 46",
      content: [
        "/blue{You should stop!}",
        "/blue{Dando um Conselho!}",
        "Usamos should para dizer que algo é uma boa ideia ou para dar um conselho.",
        "Regra de ouro: depois de should, o verbo vem puro, sem to.",
        "/blue{You should study.}",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic46s2",
    component: "Exercise14",
    activity: {
      prompt: "Ouça e escolha a frase correta.",
      image: ICA2.A46S2,
      audioSource: require("../../../../../mp3/IC/A2/A46S2.mp3"),
      options: ["He should rest", "He should to rest"],
      correctAnswer: "He should rest",
      successMessage: "Rest vira should rest: deveria descansar.",
    },
  },
  {
    key: "a2ic46s3",
    component: "Exercise14",
    activity: {
      prompt: "Ouça o conselho.",
      image: ICA2.A46S3,
      audioSource: require("../../../../../mp3/IC/A2/A46S3.mp3"),
      options: ["We should eat", "We should to eat"],
      correctAnswer: "We should eat",
      successMessage: "Depois de should, usamos o verbo eat sem to.",
    },
  },
  {
    key: "a2ic46s4",
    component: "Exercise13",
    activity: {
      prompt: "Escreva a palavra usada para dar conselhos:",
      audioSource: require("../../../../../mp3/IC/A2/A46S4.mp3"),
      letters: ["S", "H", "O", "U", "L", "D"],
      correctWord: "SHOULD",
      successMessage: "Should significa deveria.",
    },
  },
  {
    key: "a2ic46s5",
    component: "Exercise6",
    activity: {
      prompt: "Você deveria beber água.",
      words: ["You", "should", "drink", "water", "."],
      correctOrder: ["You", "should", "drink", "water", "."],
      correctAnswer: "You should drink water.",
      successMessage: "Perfeito: pessoa + should + verbo.",
    },
  },
  {
    key: "a2ic46s6",
    component: "Exercise5",
    activity: {
      prompt: "Cam está cansado. O que ele deveria fazer?",
      sentenceStart: "Cam",
      sentenceEnd: "sleep more.",
      options: ["should", "shouldn't"],
      correctAnswer: "should",
      successMessage: "Cam should sleep more.",
    },
  },
  {
    key: "a2ic46s7",
    component: "Exercise17",
    activity: {
      label: "TIP",
      content: [
        "/blue{Lista de Conselhos Bons}",
        "Study: should study (deveria estudar).",
        "Exercise: should exercise (deveria se exercitar).",
        "Help: should help (deveria ajudar).",
        "Listen: should listen (deveria ouvir).",
        "Save money: should save money (deveria economizar).",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic46s8",
    component: "Exercise17",
    activity: {
      label: "TIP",
      content: [
        "/blue{Não faça isso!}",
        "Quando algo não é uma boa ideia, usamos shouldn't, a junção de should + not.",
        "/blue{You shouldn't smoke.}",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic46s9",
    component: "Exercise14",
    activity: {
      prompt: "Ouça a forma negativa.",
      image: ICA2.A46S9,
      audioSource: require("../../../../../mp3/IC/A2/A46S9.mp3"),
      options: ["You shouldn't go", "You should go"],
      correctAnswer: "You shouldn't go",
      successMessage: "Shouldn't indica que não é uma boa ideia.",
    },
  },
  {
    key: "a2ic46s10",
    component: "Exercise14",
    activity: {
      prompt: "Ouça e escolha a frase correta.",
      image: ICA2.A46S10,
      audioSource: require("../../../../../mp3/IC/A2/A46S10.mp3"),
      options: ["They shouldn't worry", "They should worry"],
      correctAnswer: "They shouldn't worry",
      successMessage: "Worry vira shouldn't worry: não deveriam se preocupar.",
    },
  },
  {
    key: "a2ic46s11",
    component: "Exercise14",
    activity: {
      prompt: "Ouça o conselho negativo.",
      image: ICA2.A46S11,
      audioSource: require("../../../../../mp3/IC/A2/A46S11.mp3"),
      options: ["She shouldn't cry", "She should cry"],
      correctAnswer: "She shouldn't cry",
      successMessage: "She shouldn't cry: ela não deveria chorar.",
    },
  },
  {
    key: "a2ic46s12",
    component: "Exercise13",
    activity: {
      prompt: "Escreva a forma negativa, com apóstrofo:",
      audioSource: require("../../../../../mp3/IC/A2/A46S12.mp3"),
      letters: ["S", "H", "O", "U", "L", "D", "N", "'", "T"],
      correctWord: "SHOULDN'T",
      successMessage: "Shouldn't = should not.",
    },
  },
  {
    key: "a2ic46s13",
    component: "Exercise6",
    activity: {
      prompt: "Você não deveria comer muito chocolate.",
      words: ["You", "shouldn't", "eat", "too much", "chocolate"],
      correctOrder: ["You", "shouldn't", "eat", "too much", "chocolate"],
      correctAnswer: "You shouldn't eat too much chocolate",
      successMessage: "Boa! Shouldn't + eat.",
    },
  },
  {
    key: "a2ic46s14",
    component: "Exercise5",
    activity: {
      prompt: "O sinal está vermelho.",
      sentenceStart: "You",
      sentenceEnd: "cross the street now.",
      options: ["should", "shouldn't"],
      correctAnswer: "shouldn't",
      successMessage: "You shouldn't cross the street now.",
    },
  },
  {
    key: "a2ic46s15",
    component: "Exercise17",
    activity: {
      label: "TIP",
      content: [
        "/blue{O que eu faço?}",
        "Para pedir um conselho, colocamos should no começo da frase, antes da pessoa.",
        "/blue{Should I buy this?}",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic46s16",
    component: "Exercise14",
    activity: {
      prompt: "Ouça a pergunta.",
      image: ICA2.A46S16,
      audioSource: require("../../../../../mp3/IC/A2/A46S16.mp3"),
      options: ["Should I stay?", "I should stay?"],
      correctAnswer: "Should I stay?",
      successMessage: "Perguntas começam com should.",
    },
  },
  {
    key: "a2ic46s17",
    component: "Exercise14",
    activity: {
      prompt: "Ouça e escolha.",
      image: ICA2.A46S17,
      audioSource: require("../../../../../mp3/IC/A2/A46S17.mp3"),
      options: ["Should we start?", "We should start?"],
      correctAnswer: "Should we start?",
      successMessage: "Should we start? significa deveríamos começar?",
    },
  },
  {
    key: "a2ic46s18",
    component: "Exercise6",
    activity: {
      prompt: "O que eu deveria vestir?",
      words: ["What", "should", "I", "wear", "?"],
      correctOrder: ["What", "should", "I", "wear", "?"],
      correctAnswer: "What should I wear?",
      successMessage: "Pergunta perfeita com what should I.",
    },
  },
  {
    key: "a2ic46s19",
    component: "Exercise5",
    activity: {
      prompt: "Pergunta sobre o futuro:",
      sentenceStart: "",
      sentenceEnd: "I call her tonight?",
      options: ["Should", "Shouldn't"],
      correctAnswer: "Should",
      successMessage: "Should I call her tonight?",
    },
  },
  {
    key: "a2ic46s20",
    component: "Exercise17",
    activity: {
      label: "Reading",
      content: [
        "/blue{Dr. Cam em Ação!}",
        "A Julia está com alguns problemas e pediu conselhos para o Dr. Cam.",
        "Vamos ler o que ele disse.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic46s21",
    component: "Exercise17",
    activity: {
      label: "Advice for Julia",
      content: [
        "Hi Julia! I'm sorry you are feeling stressed. You should relax more. You shouldn't work until late at night.",
        "Maybe you should take a walk in the park. You should also drink some tea before bed.",
        "You shouldn't drink coffee in the evening. Should you talk to your boss? Yes, you should! Communication is important.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic46s22",
    component: "Exercise2",
    activity: {
      prompt: "Complete os conselhos do Dr. Cam:",
      paragraphs: [
        {
          text: "Julia (1) ______ relax. She (2) ______ drink coffee at night. She (3) ______ talk to her boss.",
          blanks: [
            {
              id: "1",
      options: ["should", "shouldn't"],
      correctAnswer: "should",
            },
            {
              id: "2",
      options: ["should", "shouldn't"],
      correctAnswer: "shouldn't",
            },
            {
              id: "3",
      options: ["should", "should to"],
      correctAnswer: "should",
            },
          ],
        },
      ],
      successMessage:
        "Julia should relax, shouldn't drink coffee and should talk to her boss.",
    },
  },
  {
    key: "a2ic46s23",
    component: "Exercise12",
    activity: {
      prompt: "O Camaleão quer ser um aluno melhor.",
      instruction: "Escreva 5 conselhos usando should e shouldn't.",
      correctAnswer:
        "You should study every day. You shouldn't play video games all night.",
      successMessage: "Conselhos registrados!",
    },
  },
  {
    key: "a2ic46s24",
    component: "Exercise16",
    activity: {
      prompt: "Grave esse conselho importante:",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      phrase: "You should always follow your dreams!",
      correctAnswer: "You should always follow your dreams!",
      successMessage: "Ótima pronúncia de should!",
    },
  },
  {
    key: "a2ic46s25",
    component: "Exercise17",
    activity: {
      label: "Final",
      content: [
        "/blue{Conselheiro Oficial!}",
        "Parabéns! Agora você sabe como ajudar seus amigos e pedir opiniões em inglês.",
        "Use should com sabedoria.",
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
