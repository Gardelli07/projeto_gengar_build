import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "beyond-how-are-you",
    component: "Exercise17",
    activity: {
      label: 'Beyond "How are you?"',
      content: [
        `Quebrar o gelo não é apenas sobre falar; é sobre observar o ambiente.

Um bom icebreaker foca em algo que você e a outra pessoa compartilham no momento: a comida, a música do evento ou até o clima.

/blue{Native Tip}
Em situações informais, usamos muito "How's it going?".

Em eventos formais, iniciar com um comentário sobre o palestrante ou o motivo do evento é mais seguro.

Evite perguntas muito pessoais logo de cara!`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "awkward-image",
    component: "Exercise9",
    activity: {
      prompt: "Clique na imagem que representa a palavra.",
      question: "AWKWARD",
      correctOptionId: "awkward",
      options: [
        { id: "laughing", image: ICB1.A19S2p2 },
        { id: "awkward", image: ICB1.A19S2p3 },
        { id: "handshake", image: ICB1.A19S2p4 },
        { id: "dancing", image: ICB1.A19S4 },
      ],
      successTitle: "Correto",
      successMessage:
        'A imagem correta representa "awkward": constrangedor ou estranho.',
    },
  },
  {
    key: "social-success-text",
    component: "Exercise17",
    activity: {
      label: "Strategies for Social Success",
      content: [
        `"To break the ice effectively at a professional gathering, you should start with an observational comment. For instance, if you are at a tech conference, you might say: 'The keynote speech was quite insightful, wasn't it?'. This invites the other person to share their opinion without feeling pressured. Remember, the goal is to find common ground. Avoiding controversial topics like politics or religion is crucial for a smooth first interaction."

/blue{Dica de escrita}
Note o uso de question tags, como "wasn't it?", para convidar o outro para a conversa.`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "shared-experience-true",
    component: "Exercise20",
    activity: {
      prompt: "De acordo com o texto anterior, responda:",
      image: ICB1.A19S5,
      dialogue:
        "The text suggests that asking for opinions about a shared experience is a good strategy.",
      options: ["True", "False"],
      correctAnswer: "True",
      successTitle: "Correto",
      successMessage:
        "O texto recomenda comentários observacionais e perguntas sobre experiências compartilhadas.",
    },
  },
  {
    key: "politics-false",
    component: "Exercise20",
    activity: {
      prompt: "De acordo com o texto anterior, responda:",
      image: ICB1.A20S2,
      dialogue:
        "You should talk about politics to make the conversation more interesting.",
      options: ["True", "False"],
      correctAnswer: "False",
      successTitle: "Correto",
      successMessage:
        "O texto diz para evitar tÉpicos controversos, como polática ou religião.",
    },
  },
  {
    key: "precision-sprint",
    component: "Exercise17",
    activity: {
      label: "Precision Sprint!",
      content: [
        `Para escrever bem, você precisa dominar a grafia de palavras complexas.

Você tem 5 segundos para cada.

Let's go!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "precision-words",
    component: "Exercise11",
    activity: {
      prompt: "Hard Mode",
      secondsPerWord: 5,
      words: [
        "AUTHENTICITY",
        "OBSERVATION",
        "INSIGHTFUL",
        "CONTROVERSIAL",
        "INTERACTION",
      ],
      successTitle: "Correto",
      successMessage: "Você digitou palavras complexas com precisão.",
    },
  },
  {
    key: "break-genuine",
    component: "Exercise2",
    activity: {
      prompt: "Complete a dica de escrita.",
      paragraphs: [
        ["When you want to", { id: "b1", answer: "break", options: ["break", "crack"] }, "the ice, try to be"],
        [{ id: "b2", answer: "genuine", options: ["fake", "genuine"] }, "."],
        ["People can tell when you are not being yourself, and it makes the situation feel forced."],
      ],
      successTitle: "Correto",
      successMessage: "A sequência correta é: break / genuine.",
    },
  },
  {
    key: "type-speech-question",
    component: "Exercise18",
    activity: {
      prompt: "Digite a frase corretamente para formar um excelente icebreaker.",
      scrambledSentence: "/ speech / What / think / you / did / of / the / ? /",
      correctAnswer: "What did you think of the speechá",
      placeholder: "Digite a pergunta",
      submitLabel: "Enviar",
      errorTitle: "Incorreto",
      successTitle: "Correto",
      successMessage: "A pergunta correta é: What did you think of the speechá",
    },
  },
  {
    key: "write-ai-workshop",
    component: "Exercise12",
    activity: {
      prompt: "Writing Task",
      instruction:
        "Imagine que você está em um workshop sobre inteligência artificial, na fila do café ao lado de um desconhecido.",
      helperText:
        "Escreva 2-3 frases para quebrar o gelo. Use uma observação sobre o evento e uma pergunta aberta.",
      image: ICB1.A20S3,
      placeholder:
        "The talk about AI was really insightful, wasn't it? What did you think of the speaker's ideas?",
      tipText:
        "Use uma observação compartilhada + uma pergunta aberta.",
      minLength: 25,
      successTitle: "Correto",
      successMessage: "Ótimo icebreaker escrito.",
    },
  },
  {
    key: "audio-intonation",
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction:
        "Imagine que a pessoa respondeu e a conversa começou.",
      helperText:
        "Mande um áudio de 15 segundos praticando sua entonação ao dizer a frase que escreveu.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "The workshop was really insightful, wasn't it? What did you think of the speaker?",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Seu áudio de icebreaker foi gravado.",
    },
  },
  {
    key: "eloquent-conclusion",
    component: "Exercise17",
    activity: {
      label: "Eloquente!",
      content: [
        `Você provou que tem as ferramentas para iniciar conversas com confiança e clareza.

Sua escrita está cada vez mais sofisticada e natural.

See you in the next lesson!`,
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
