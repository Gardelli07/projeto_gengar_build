import createA2LessonScreen from "./A2LessonScreen";
import { ICA2 } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic55s1",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 7 • AULA 55",
      content: [
        "/blue{Post it!}",
        "/blue{Você é um Digital Influencer?}",
        "Nas redes sociais do Lingueto, a gente interage o tempo todo.",
        "Post: publicar. Like: curtir. Share: compartilhar. Tag: marcar alguém. Follower: seguidor.",
        "Hoje você vai dominar os verbos de interação e as pessoas que fazem parte da rede.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic55s2",
    component: "Exercise14",
    activity: {
      prompt: "Ouça a frase sobre publicar.",
      image: ICA2.A55S2,
      audioSource: require("../../../../../mp3/IC/A2/A55S2.mp3"),
      options: ["I want to post a photo.", "I want to print a photo."],
      correctAnswer: "I want to post a photo.",
      successMessage: "Post significa publicar.",
    },
  },
  {
    key: "a2ic55s3",
    component: "Exercise14",
    activity: {
      prompt: "Ouça e escolha.",
      image: ICA2.A55S3,
      audioSource: require("../../../../../mp3/IC/A2/A55S3.mp3"),
      options: ["Give it a like!", "Gave it a like!"],
      correctAnswer: "Give it a like!",
      successMessage: "Like é curtir uma publicação.",
    },
  },
  {
    key: "a2ic55s4",
    component: "Exercise14",
    activity: {
      prompt: "Ouça o comando.",
      image: ICA2.A55S4,
      audioSource: require("../../../../../mp3/IC/A2/A55S4.mp3"),
      options: ["Tare the video.", "Share this video."],
      correctAnswer: "Share this video.",
      successMessage: "Share é compartilhar.",
    },
  },
  {
    key: "a2ic55s5",
    component: "Exercise4",
    activity: {
      prompt: "You want your friend to see a funny photo. What do you do?",
      image: ICA2.A55S5,
      wrongSentence: "Choose the best social media action.",
      options: ["I download the photo.", "I tag my friend in the photo."],
      correctAnswer: "I tag my friend in the photo.",
      successMessage: "Tag é marcar alguém e chamar atenção para o post.",
    },
  },
  {
    key: "a2ic55s6",
    component: "Exercise13",
    activity: {
      prompt: "Escreva como chamamos alguém que acompanha seu perfil:",
      audioSource: require("../../../../../mp3/IC/A2/A55S6.mp3"),
      letters: ["F", "O", "L", "L", "O", "W", "E", "R"],
      correctWord: "FOLLOWER",
      successMessage: "Follower significa seguidor.",
    },
  },
  {
    key: "a2ic55s7",
    component: "Exercise6",
    activity: {
      prompt: "Por favor, compartilhe este post.",
      words: ["Please", "share", "this", "post", "."],
      correctOrder: ["Please", "share", "this", "post", "."],
      correctAnswer: "Please share this post.",
      successMessage: "Pedido educado e natural.",
    },
  },
  {
    key: "a2ic55s8",
    component: "Exercise5",
    activity: {
      prompt: "David é famoso! Ele tem muitos fãs.",
      image: ICA2.A55S8,
      sentenceStart: "David has one million",
      sentenceEnd: "on Instagram.",
      options: ["friends", "followers"],
      correctAnswer: "followers",
      successMessage: "No plural: followers.",
    },
  },
  {
    key: "a2ic55s9",
    component: "Exercise17",
    activity: {
      label: "Going Viral!",
      content: [
        "David is very happy today. He decided to post a video of his dog.",
        "Many people like the video and start to share it with friends.",
        "One person decides to tag a famous celebrity in the comments! Now, David has 500 new followers. His video is a success!",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic55s10",
    component: "Exercise12",
    activity: {
      prompt: "Fale sobre sua rede social favorita.",
      instruction:
        "Escreva 3 frases usando pelo menos 3 palavras da aula: post, like, share, tag ou follower.",
      correctAnswer:
        "I like to post photos. My friends like my photos. I share funny videos.",
      successMessage: "Interações sociais registradas!",
    },
  },
  {
    key: "a2ic55s11",
    component: "Exercise17",
    activity: {
      label: "Final",
      content: [
        "/blue{Influenciador de Inglês!}",
        "Agora você já fala a língua das redes sociais corretamente.",
        "Like termina no K, post termina no T e share começa com som de silêncio.",
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
