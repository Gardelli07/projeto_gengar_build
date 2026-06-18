import createA2LessonScreen from "./A2LessonScreen";
import { ICA2 } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic54s1",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 7 • AULA 54",
      content: [
        "/blue{Nice laptop?}",
        "/blue{O que fazemos online?}",
        "Hoje vamos aprender os verbos que usamos para interagir com sites e aplicativos.",
        "Download: baixar. Upload: enviar. Click: clicar. Scroll: rolar a página.",
        "O objetivo é entender o fluxo da informação e falar essas ações como um nativo.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic54s2",
    component: "Exercise14",
    activity: {
      prompt: "Ouça o comando.",
      image: ICA2.A54S2,
      audioSource: require("../../../../../mp3/IC/A2/A54S2.mp3"),
      options: ["Click on the link.", "Scroll on the link."],
      correctAnswer: "Click on the link.",
      feedbackMessage:
        "Correto: click significa clicar. Click on the link é o comando para abrir um link.",
    },
  },
  {
    key: "a2ic54s3",
    component: "Exercise14",
    activity: {
      prompt: "Ouça e escolha.",
      image: ICA2.A54S3,
      audioSource: require("../../../../../mp3/IC/A2/A54S3.mp3"),
      options: ["Scroll down the page.", "Scroll up the page."],
      correctAnswer: "Scroll down the page.",
      feedbackMessage:
        "Muito bem: scroll down significa rolar a página para baixo para ver mais conteúdo.",
    },
  },
  {
    key: "a2ic54s4",
    component: "Exercise14",
    activity: {
      prompt: "Ouça a ação.",
      image: ICA2.A54S4,
      audioSource: require("../../../../../mp3/IC/A2/A54S4.mp3"),
      options: ["I have to download the file.", "I have to upload the file."],
      correctAnswer: "I have to download the file.",
      feedbackMessage:
        "Boa escuta: download é baixar um arquivo da internet para o seu dispositivo.",
    },
  },
  {
    key: "a2ic54s5",
    component: "Exercise14",
    activity: {
      prompt: "Ouça e escolha a palavra principal.",
      image: ICA2.A54S5,
      audioSource: require("../../../../../mp3/IC/A2/A54S5.mp3"),
      options: ["upload", "loaded"],
      correctAnswer: "upload",
      feedbackMessage:
        "Isso mesmo: upload é enviar um arquivo do seu dispositivo para a internet ou para outra pessoa.",
    },
  },
  {
    key: "a2ic54s6",
    component: "Exercise13",
    activity: {
      prompt: "Escreva a ação de rolar a página:",
      audioSource: require("../../../../../mp3/IC/A2/A54S6.mp3"),
      letters: ["S", "C", "R", "O", "L", "L"],
      correctWord: "SCROLL",
      successMessage:
        "Perfeito: scroll é a ação de rolar a página para encontrar mais informações.",
    },
  },
  {
    key: "a2ic54s7",
    component: "Exercise13",
    activity: {
      prompt: "Escreva a ação de enviar um arquivo para a internet:",
      audioSource: require("../../../../../mp3/IC/A2/A54S7.mp3"),
      letters: ["U", "P", "L", "O", "A", "D"],
      correctWord: "UPLOAD",
      successMessage:
        "Muito bem: upload é enviar um arquivo do seu aparelho para a internet, como um relatório ou uma foto.",
    },
  },
  {
    key: "a2ic54s8",
    component: "Exercise6",
    activity: {
      prompt: "Clique no botão verde.",
      words: ["Click", "on", "the", "green", "button", "."],
      correctOrder: ["Click", "on", "the", "green", "button", "."],
      correctAnswer: "Click on the green button.",
      successMessage:
        "Frase correta: Click on the green button. Use click on para indicar onde a pessoa deve clicar.",
    },
  },
  {
    key: "a2ic54s9",
    component: "Exercise5",
    activity: {
      prompt: "Para ver o resto da página, o que você deve fazer?",
      sentenceStart: "I need to",
      sentenceEnd: "down to read the text.",
      options: ["scroll", "put"],
      correctAnswer: "scroll",
      successMessage:
        "Certo: para ver o restante da página, você precisa dizer I need to scroll down.",
    },
  },
  {
    key: "a2ic54s10",
    component: "Exercise17",
    activity: {
      label: "Working Online",
      content: [
        "David needs to finish a report. First, he has to download some images from the internet.",
        "Then, he has to scroll down the website to find the information. He finds a button and says: 'I need to click here!'.",
        "After the report is ready, he does the upload to send it to his boss. Good job, David!",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic54s11",
    component: "Exercise12",
    activity: {
      prompt: "O que você faz no seu site favorito?",
      instruction: "Escreva 3 frases usando click, scroll, download ou upload.",
      tipText: "I scroll down the page. I click on a video. I download a file.",
      successMessage:
        "Muito bem: suas frases descrevem ações reais da navegação online usando click, scroll, download ou upload.",
    },
  },
  {
    key: "a2ic54s12",
    component: "Exercise17",
    activity: {
      label: "Final",
      content: [
        "/blue{Navegação Completa!}",
        "Agora você já sabe os comandos principais da vida digital.",
        "Lembre-se: download é receber e upload é enviar.",
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
