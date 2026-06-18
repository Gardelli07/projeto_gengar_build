import createA2LessonScreen from "./A2LessonScreen";
import { ICA2 } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic56s1",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 7 • AULA 56",
      content: [
        "/blue{It's frozen!}",
        "/blue{O Diagnóstico do David}",
        "No inglês digital, usamos palavras específicas para cada problema.",
        "Dead: bateria em 0%. Slow: baixa velocidade. Frozen: travado. No signal: sem sinal. Low battery: bateria fraca.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic56s2",
    component: "Exercise14",
    activity: {
      prompt: "Ouça o problema.",
      image: ICA2.A56S2,
      audioSource: require("../../../../../mp3/IC/A2/A56S2.mp3"),
      options: ["My phone is dad.", "My phone is dead."],
      correctAnswer: "My phone is dead.",
      feedbackMessage:
        "Correto: em tecnologia, dead pode significar bateria zerada. My phone is dead quer dizer que o celular descarregou.",
    },
  },
  {
    key: "a2ic56s3",
    component: "Exercise14",
    activity: {
      prompt: "Ouça e escolha.",
      image: ICA2.A56S3,
      audioSource: require("../../../../../mp3/IC/A2/A56S3.mp3"),
      options: ["The Wi-Fi is low.", "The Wi-Fi is slow."],
      correctAnswer: "The Wi-Fi is slow.",
      feedbackMessage:
        "Muito bem: slow indica baixa velocidade. The Wi-Fi is slow descreve uma internet lenta.",
    },
  },
  {
    key: "a2ic56s4",
    component: "Exercise14",
    activity: {
      prompt: "Ouça a expressão exata.",
      image: ICA2.A56S4,
      audioSource: require("../../../../../mp3/IC/A2/A56S4.mp3"),
      options: ["The screen is frozen.", "The screen is fresh."],
      correctAnswer: "The screen is frozen.",
      feedbackMessage:
        "Boa escuta: frozen é o termo para uma tela travada, quando nada responde ao toque ou clique.",
    },
  },
  {
    key: "a2ic56s5",
    component: "Exercise14",
    activity: {
      prompt: "Ouça e escolha.",
      image: ICA2.A56S5,
      audioSource: require("../../../../../mp3/IC/A2/A56S5.mp3"),
      options: ["There's no signal.", "Have no signal."],
      correctAnswer: "There's no signal.",
      feedbackMessage:
        "Isso mesmo: There's no signal é a forma natural para dizer que não há sinal de rede ou conexão.",
    },
  },
  {
    key: "a2ic56s6",
    component: "Exercise14",
    activity: {
      prompt: "Ouça o aviso de bateria.",
      image: ICA2.A56S6,
      audioSource: require("../../../../../mp3/IC/A2/A56S6.mp3"),
      options: ["I have battery.", "I have low battery."],
      correctAnswer: "I have low battery.",
      feedbackMessage:
        "Correto: low battery significa bateria fraca, antes de o aparelho ficar totalmente dead.",
    },
  },
  {
    key: "a2ic56s7",
    component: "Exercise8",
    activity: {
      prompt: "Qual destas palavras NÃO é um problema técnico?",
      image: ICA2.A56S7,
      options: ["Frozen", "Slow Wi-Fi", "New Laptop", "No signal"],
      correctAnswer: "New Laptop",
      successMessage:
        "Exato: new laptop descreve um aparelho novo. Frozen, slow Wi-Fi e no signal são problemas técnicos.",
    },
  },
  {
    key: "a2ic56s8",
    component: "Exercise3",
    activity: {
      prompt: "Responda verdadeiro ou falso.",
      image: ICA2.A56S8,
      audioSource: require("../../../../../mp3/IC/A2/A56S8.mp3"),
      textOnScreen:
        "If your phone is dead, it means it is broken and you need a new one.",
      options: ["true", "false"],
      correctAnswer: "false",
      successMessage:
        "Isso mesmo: dead quer dizer que a bateria chegou a 0%. Normalmente você precisa de um carregador, não de um celular novo.",
      feedbackMessage:
        "Dead não significa necessariamente quebrado; muitas vezes é só bateria em 0%.",
    },
  },
  {
    key: "a2ic56s9",
    component: "Exercise5",
    activity: {
      prompt: "Lia está tentando falar com você no Zoom.",
      sentenceStart: "Not really. The",
      sentenceEnd: "is very slow today.",
      options: ["TV", "Wi-Fi"],
      correctAnswer: "Wi-Fi",
      successMessage:
        "Certo: em uma chamada no Zoom, The Wi-Fi is very slow today explica que a conexão está lenta.",
    },
  },
  {
    key: "a2ic56s10",
    component: "Exercise14",
    activity: {
      prompt: "Ouça a reclamação.",
      image: ICA2.A56S10,
      audioSource: require("../../../../../mp3/IC/A2/A56S10.mp3"),
      options: [
        "Everything is frozen! I can't click on anything!",
        "Everything is working! I can click on anything!",
      ],
      correctAnswer: "Everything is frozen! I can't click on anything!",
      feedbackMessage:
        "Boa escolha: Everything is frozen! descreve uma tela travada, quando você não consegue clicar em nada.",
    },
  },
  {
    key: "a2ic56s11",
    component: "Exercise6",
    activity: {
      prompt: "Eu não tenho sinal aqui dentro.",
      words: ["I", "have", "no signal", "in here", "."],
      correctOrder: ["I", "have", "no signal", "in here", "."],
      correctAnswer: "I have no signal in here.",
      successMessage:
        "Frase correta: I have no signal in here. Use no signal para falar de falta de rede ou conexão.",
    },
  },
  {
    key: "a2ic56s12",
    component: "Exercise5",
    activity: {
      prompt: "Complete a reclamação do David:",
      sentenceStart: "Wait a minute. I can't scroll the page. The screen is",
      sentenceEnd: ".",
      options: ["frozen", "melt"],
      correctAnswer: "frozen",
      successMessage:
        "Isso mesmo: The screen is frozen explica por que David não consegue rolar a página.",
    },
  },
  {
    key: "a2ic56s13",
    component: "Exercise13",
    activity: {
      prompt: "O oposto de Fast Wi-Fi é:",
      audioSource: require("../../../../../mp3/IC/A2/A56S13.mp3"),
      letters: ["W", "O", "L", "S"],
      correctWord: "SLOW",
      successMessage:
        "Perfeito: slow significa lento, o oposto de fast em uma conexão ou sistema.",
    },
  },
  {
    key: "a2ic56s14",
    component: "Exercise12",
    activity: {
      prompt: "Sua internet caiu no meio da aula.",
      instruction:
        "Escreva uma mensagem curta para seu professor explicando o problema usando slow ou no signal.",
      tipText: "Sorry, teacher. My Wi-Fi is slow and I have no signal.",
      successMessage:
        "Muito bem: sua mensagem explica o problema técnico com vocabulário claro, como slow ou no signal.",
    },
  },
  {
    key: "a2ic56s15",
    component: "Exercise17",
    activity: {
      label: "Final",
      content: [
        "/blue{Diagnóstico Completo!}",
        "Você agora é um mestre em reportar problemas técnicos.",
        "Você usou lógica, audição, gramática e escrita para dominar dead, slow, frozen e signal.",
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
