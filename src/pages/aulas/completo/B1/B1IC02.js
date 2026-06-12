import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "nuances-intro",
    component: "Exercise17",
    activity: {
      label: "Expectativa vs. Realidade",
      content: [
        `/blue{JUST}
Significado: acabou de acontecer, agora mesmo.
Onde usar: no meio da frase, entre have/has e o verbo.
Ex: I've just sent the email.

/blue{ALREADY}
Significado: jé aconteceu, antes do que o esperado.
Onde usar: no meio da frase, entre have/has e o verbo.
Ex: He has already fixed the bug!

/blue{YET}
Significado: até agora / ainda, em perguntas ou negativas.
Onde usar: sempre no final da frase.
Ex: Is the update ready yet?

/blue{STILL}
Significado: ainda não, enfatiza que está demorando.
Onde usar: antes de haven't/hasn't.
Ex: I still haven't found the file.

/blue{Dica Pro do Camaleão}
Use STILL quando quiser mostrar impaciência ou que algo está levando tempo demais.
I haven't finished yet. (Neutro)
I still haven't finished! (Frustrado)`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "just-cleaned-screen",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "A tela foi limpa há muito tempo?",
      image: ICB1.A2S1,
      audioSource: require("../../../../../mp3/IC/B1/A2S1.mp3"),
      audioDurationMs: 2600,
      answerOptions: ["Não, foi agora mesmo", "Sim, foi há muito tempo"],
      correctOption: "Não, foi agora mesmo",
      successTitle: "Correto",
      feedbackMessage:
        '"Just" indica uma ação imediata, que acabou de acontecer.',
    },
  },
  {
    key: "updated-app-yet",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "O falante espera que o app seja atualizado?",
      image: ICB1.A2S2,
      audioSource: require("../../../../../mp3/IC/B1/A2S2.mp3"),
      audioDurationMs: 2800,
      answerOptions: ["yes", "no"],
      correctOption: "yes",
      successTitle: "Correto",
      feedbackMessage:
        '"Yet" em perguntas mostra expectativa: o falante espera que algo aconteça.',
    },
  },
  {
    key: "still-charger",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Qual é o sentimento do falante?",
      image: ICB1.A2S3,
      audioSource: require("../../../../../mp3/IC/B1/A2S3.mp3"),
      audioDurationMs: 2800,
      answerOptions: ["Frustração/Impaciência", "Surpresa positiva"],
      correctOption: "Frustração/Impaciência",
      successTitle: "Correto",
      feedbackMessage:
        "\"Still\" antes de haven't/hasn't mostra que algo continua pendente e incomoda.",
    },
  },
  {
    key: "expectation-reality-tip",
    component: "Exercise17",
    activity: {
      label: "Expectativa vs. Realidade",
      content: [
        `No nível Pro, essas quatro palavras funcionam como temperos da frase.

/blue{JUST}
Função: ação imediata, agora mesmo.
Onde colocar: entre have/has e o verbo.
Ex: "I've just sent the email."

/blue{ALREADY}
Função: surpresa, antes do esperado.
Onde colocar: entre have/has e o verbo.
Ex: "He has already fixed the bug!"

/blue{YET}
Função: expectativa, até agora.
Onde colocar: no final da frase.
Ex: "Is the update ready yet?"

/blue{STILL}
Função: frustraço, continua sem acontecer.
Onde colocar: antes de haven't/hasn't.
Ex: "I still haven't found the file."

Dica do Mestre: STILL no Present Perfect é quase sempre usado em frases negativas para enfatizar que algo está demorando mais do que deveria.`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "david-still-not-finished",
    component: "Exercise8",
    activity: {
      prompt:
        "David está na frente do computador, são 2h da manhã, e o projeto ainda não terminou. Qual frase melhor descreve a imagem?",
      image: ICB1.A2S5,
      options: [
        "David has just started working.",
        "David already finished the project.",
        "David still hasn't finished the project.",
      ],
      correctAnswer: "David still hasn't finished the project.",
      successTitle: "Correto",
      successMessage:
        '"Still" mostra que a ação continua pendente apesar do esforço.',
    },
  },
  {
    key: "just-spilled-coffee",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "O café caiu hÉ muito tempo?",
      image: ICB1.A2S6,
      audioSource: require("../../../../../mp3/IC/B1/A2S6.mp3"),
      audioDurationMs: 3600,
      answerOptions: ["Não, foi agora mesmo", "Sim, foi ontem"],
      correctOption: "Não, foi agora mesmo",
      successTitle: "Correto",
      feedbackMessage:
        '"Just" indica que a ação aconteceu há pouquíssimo tempo.',
    },
  },
  {
    key: "already-react-native",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "O falante está surpreso com a velocidade do aprendizado?",
      image: ICB1.A2S7,
      audioSource: require("../../../../../mp3/IC/B1/A2S7.mp3"),
      audioDurationMs: 3800,
      answerOptions: ["yes", "no"],
      correctOption: "yes",
      successTitle: "Correto",
      feedbackMessage:
        '"Already" pode mostrar surpresa porque algo aconteceu antes do esperado.',
    },
  },
  {
    key: "yet-positive-false",
    component: "Exercise20",
    activity: {
      prompt: "Verdadeiro ou falso?",
      image: ICB1.A2S8,
      dialogue:
        "We use YET in positive sentences to show something is finished.",
      options: ["True", "False"],
      correctAnswer: "False",
      successTitle: "Correto",
      successMessage:
        '"Yet" é usado em perguntas ou frases negativas. Para frases positivas, usamos "already".',
    },
  },
  {
    key: "order-still-coffee",
    component: "Exercise6",
    activity: {
      prompt:
        'Monte a frase: "Eu ainda não tomei meu café hoje (e estou com sono!)."',
      words: ["I", "still", "haven't", "had", "my coffee", "today", "."],
      correctOrder: ["I", "still", "haven't", "had", "my coffee", "today", "."],
      successTitle: "Correto",
      successMessage: "I still haven't had my coffee today.",
    },
  },
  {
    key: "website-update-still",
    component: "Exercise5",
    activity: {
      prompt: "Complete a frase",
      sentenceStart: "We've just finished the code, but we",
      sentenceEnd: "haven't tested it.",
      options: ["still", "yet", "already"],
      correctAnswer: "still",
      successTitle: "Correto",
      successMessage:
        "\"Still\" vem antes de haven't/hasn't para enfatizar demora ou pendência.",
    },
  },
  {
    key: "wrong-already-negative",
    component: "Exercise8",
    activity: {
      prompt: "Qual destas frases está gramaticalmente ERRADA?",
      image: ICB1.A3S2,
      options: [
        "I have already seen that movie.",
        "I haven't already finished the task.",
        "I haven't finished the task yet.",
      ],
      correctAnswer: "I haven't already finished the task.",
      successTitle: "Correto",
      successMessage:
        'Não usamos "already" em negativas simples; usamos "yet" ou "still".',
    },
  },
  {
    key: "deadline-pressure-reading",
    component: "Exercise17",
    activity: {
      label: "Deadline Pressure",
      content: [
        `"David is under pressure. The app launch is tomorrow. He has already created the 17 activities, but he still hasn't recorded the audios. He has just received a message from his partner: 'Is everything ready yet?'. David sighs. He has already worked for 10 hours today, but the job isn't finished yet."`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "write-already-yet-just",
    component: "Exercise12",
    activity: {
      prompt: "Sua lista de hoje",
      instruction: "Pense na sua lista de tarefas de hoje.",
      helperText: "Escreva 3 frases usando already, yet e just.",
      image: ICB1.A3S3,
      placeholder:
        "I've already checked my emails. I haven't had lunch yet. I've just finished a task.",
      tipText:
        "Already fica entre have/has e o verbo. Yet vai no final. Just fica entre have/has e o verbo.",
      minLength: 20,
      successTitle: "Correto",
      successMessage:
        "Boa! Você praticou as nuances de tempo no Present Perfect.",
    },
  },
  {
    key: "time-master-conclusion",
    component: "Exercise17",
    activity: {
      label: "Mestre do Tempo!",
      content: [
        `Você agora domina as nuances temporais que separam os básicos dos avançados.

Resumo:
Just = Agora.
Already = Antes do esperado.
Yet = Expectativa no fim da frase.
Still = Frustração/Demora.

Mantenha o foco e não pare ainda!

See you!`,
      ],
      continueLabel: "Finalizar",
    },
  },
  {
    key: "lesson-finish",
    type: "finish",
  },
];

export default createLessonScreen(LESSON_SLIDES, {
  storageKey: "@progesso_ingles_completo_B1",
  nextRouteName: "InglescompletoB1",
  screenName: "InglesCompletoB1LessonScreen",
});
