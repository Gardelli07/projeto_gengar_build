import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "news-lead-in",
    component: "Exercise17",
    activity: {
      label: "Como os Nativos Dão Notícias",
      content: [
        `Em jornais e notícias, usamos estruturas como "It is said that..." ou "It was reported that..." para passar objetividade e focar na informação, não em quem a disse.

/blue{Dica Lingueto}
No dia a dia informal, um nativo raramente usa "It is said".

Nós preferimos "They say..." ou "People are saying...".

Mas para soar profissional ou entender o noticiârio, dominar a voz passiva é essencial!`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "reported-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute a palavra e escolha a alternativa correta.",
      image: ICB1.A29S2,
      audioSource: require("../../../../../mp3/IC/B1/A29S2.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Reported", "Responded"],
      correctOption: "Reported",
      successTitle: "Correto",
      feedbackMessage:
        '"Reported" significa relatado ou informado em uma notícia.',
    },
  },
  {
    key: "was-reported-false",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Verdadeiro ou falso?",
      image: ICB1.A29S3,
      audioSource: require("../../../../../mp3/IC/B1/A29S3.mp3"),
      audioDurationMs: 3900,
      dialogue: "It is reported that the economy is growing this year.",
      options: ["True", "False"],
      correctAnswer: "False",
      successTitle: "Correto",
      successMessage:
        'O áudio diz "It was reported", no passado, não "It is reported".',
    },
  },
  {
    key: "president-said",
    component: "Exercise4",
    activity: {
      prompt: "Escolha a frase escrita corretamente.",
      image: ICB1.A29S2,
      wrongSentence: "Passive news structure",
      options: [
        "It is say that the president will travel tomorrow.",
        "It is said that the president will travel tomorrow.",
        "It said that the president travel tomorrow.",
      ],
      correctAnswer: "It is said that the president will travel tomorrow.",
      successTitle: "Correto",
      successMessage:
        'A estrutura correta é "It is said that..." com past participle.',
    },
  },
  {
    key: "company-reported",
    component: "Exercise5",
    activity: {
      prompt: "Complete a frase com a palavra correta.",
      sentenceStart: "It was",
      sentenceEnd: "that the company lost millions of dollars.",
      options: ["reported", "report"],
      correctAnswer: "reported",
      successTitle: "Correto",
      successMessage:
        "Depois de was, usamos o particípio: reported.",
    },
  },
  {
    key: "tense-tip",
    component: "Exercise17",
    activity: {
      label: "Atenção ao Tempo Verbal!",
      content: [
        `A estrutura "It is / It was + Past Participle" muda dependendo de quando a notícia foi dada.

/blue{Presente}
It is expected that...
Espera-se que...

/blue{Passado}
It was announced that...
Foi anunciado que...`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "order-expected-prices",
    component: "Exercise6",
    activity: {
      prompt: "Clique nas palavras para escrever a frase na ordem correta.",
      words: ["expected", "It", "the", "is", "that", "prices", "drop", "will"],
      correctOrder: ["It", "is", "expected", "that", "the", "prices", "will", "drop"],
      successTitle: "Correto",
      successMessage: "It is expected that the prices will drop.",
    },
  },
  {
    key: "reported-said-text",
    component: "Exercise2",
    activity: {
      prompt: "Complete o texto com as alternativas.",
      paragraphs: [
        ["Last night on the news,", { id: "b1", answer: "it was reported", options: ["it was reported", "it is report"] }, "that the local bank was robbed."],
        ["Today,", { id: "b2", answer: "it is said", options: ["it said", "it is said"] }, "that the police already caught the suspect."],
      ],
      successTitle: "Correto",
      successMessage: "A sequência correta é: it was reported / it is said.",
    },
  },
  {
    key: "anchor-audio",
    component: "Exercise16",
    activity: {
      prompt: "Hora de ser o âncora do jornal!",
      instruction:
        "Mande um áudio lendo a manchete com clareza e tom profissional.",
      helperText:
        '"Good evening. It is reported that a new technology will change our lives forever."',
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "Good evening. It is reported that a new technology will change our lives forever.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Sua manchete em áudio foi gravada com sucesso.",
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
