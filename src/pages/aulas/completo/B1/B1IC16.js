import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "diplomacy-tip",
    component: "Exercise17",
    activity: {
      label: "The Art of Diplomacy",
      content: [
        `No nível B1-B2, não basta dizer "I don't agree". Isso pode soar rude.

Para ser fluente, você precisa de frases que validem o que a outra pessoa disse antes de apresentar o seu ponto.

/blue{Native Tip}
Use o método "Yes, and..." ou "Yes, but...".

Em reuniões, expressões como "I see your point" ou "I hear what you're saying" são ferramentas poderosas para manter o respeito enquanto você discorda.`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "attitude-match",
    component: "Exercise15",
    activity: {
      prompt: "Combine a imagem com a atitude correta.",
      images: [
        { id: "common-img", image: ICB1.A16S2 },
        { id: "polite-img", image: ICB1.A16S3 },
      ],
      words: [
        { id: "common-word", label: "Finding common ground" },
        { id: "polite-word", label: "Politeness" },
      ],
      pairs: [
        { imageId: "common-img", wordId: "common-word" },
        { imageId: "polite-img", wordId: "polite-word" },
      ],
      successTitle: "Correto",
      successMessage: "Você combinou as atitudes profissionais corretamente.",
    },
  },
  {
    key: "deadline-disagree-false",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Escute e responda",
      image: ICB1.A16S5,
      audioSource: require("../../../../../mp3/IC/B1/A16S3.mp3"),
      audioDurationMs: 6500,
      dialogue: "The speaker completely agrees with the deadline.",
      options: ["True", "False"],
      correctAnswer: "False",
      successTitle: "Correto",
      successMessage:
        '"However" sinaliza que a pessoa vai discordar ou apresentar uma ressalva.',
    },
  },
  {
    key: "agreement-expression-match",
    component: "Exercise1",
    activity: {
      prompt: "Conecte o início e o fim das expressões.",
      pairs: [
        { en: "I couldn't agree", pt: "with you more." },
        { en: "I'm afraid I", pt: "beg to differ." },
        { en: "I'm with you", pt: "on that point." },
      ],
      successTitle: "Excelente",
      successMessage: "Você conectou expressões diplomáticas corretamente.",
    },
  },
  {
    key: "nevertheless-complete",
    component: "Exercise5",
    activity: {
      prompt: "Complete a frase",
      image: ICB1.A16S6,
      sentenceStart: "I hear what you're saying,",
      sentenceEnd: "I think we should consider a different strategy.",
      options: ["nevertheless", "absolutely"],
      correctAnswer: "nevertheless",
      successTitle: "Correto",
      successMessage:
        '"Nevertheless" introduz contraste de forma profissional.',
    },
  },
  {
    key: "polite-disagreement",
    component: "Exercise4",
    activity: {
      prompt: "Qual frase demonstra uma discordância educada profissional?",
      image: ICB1.A17S2,
      wrongSentence: "Professional disagreement",
      options: [
        "You are wrong about the budget.",
        "I see your point, but I have a different perspective.",
        "I don't agree with you at all.",
      ],
      correctAnswer: "I see your point, but I have a different perspective.",
      successTitle: "Correto",
      successMessage:
        "A frase valida o ponto da outra pessoa antes de discordar.",
    },
  },
  {
    key: "type-coming-from",
    component: "Exercise18",
    activity: {
      prompt: "Digite a frase essencial para validar a opinião do outro.",
      scrambledSentence:
        "/ point / see / I / where / coming / you / are / from / but /",
      correctAnswer: "I see where you are coming from but",
      placeholder: "Digite a frase correta",
      submitLabel: "Enviar",
      errorTitle: "Incorreto",
      successTitle: "Correto",
      successMessage:
        "A frase correta é: I see where you are coming from but",
    },
  },
  {
    key: "ai-debate-order",
    component: "Exercise7",
    activity: {
      prompt: "Organize o debate sobre o uso de IA no trabalho.",
      options: [
        "I believe AI will replace all human teachers in five years.",
        "I'm not so sure about that, to be honest.",
        "Why not? It's becoming very advanced.",
        "I see your point, however, the human touch is still essential for learning.",
      ],
      correctOrder: [
        "I believe AI will replace all human teachers in five years.",
        "I'm not so sure about that, to be honest.",
        "Why not? It's becoming very advanced.",
        "I see your point, however, the human touch is still essential for learning.",
      ],
      successTitle: "Correto",
      successMessage: "Você organizou o debate de forma natural.",
    },
  },
  {
    key: "listen-go-along",
    component: "Exercise19",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escreva a frase.",
      audioSource: require("../../../../../mp3/IC/B1/A16S9.mp3"),
      audioDurationMs: 3800,
      correctAnswer: "I'm afraid I can't go along with you on that.",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "Você escreveu a frase diplomática corretamente.",
      errorMessage: "Confira a expressão: go along with you on that.",
    },
  },
  {
    key: "write-disagree-creativity",
    component: "Exercise12",
    activity: {
      prompt: "Discorde educadamente",
      instruction:
        'Contexto: alguém diz que "Trabalhar em casa é ruim para a criatividade".',
      helperText:
        'Use "I see where you\'re coming from, but..." e dé um motivo curto.',
      image: ICB1.A17S3,
      placeholder:
        "I see where you're coming from, but I think remote work can make people more focused and creative.",
      tipText:
        "Valide primeiro, depois apresente seu ponto com but/however/nevertheless.",
      minLength: 20,
      successTitle: "Correto",
      successMessage: "Boa! Sua discordância ficou educada e profissional.",
    },
  },
  {
    key: "audio-social-media-opinion",
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction:
        'Opinião polêmica: "I think all social media should be banned for people under 21."',
      helperText:
        'Se concordar, use "I couldn\'t agree more". Se discordar, use "I\'m afraid I beg to differ".',
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "I'm afraid I beg to differ because social media can also be used for learning.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Seu áudio com opinião diplomática foi gravado.",
    },
  },
  {
    key: "keyboardist-challenge",
    component: "Exercise17",
    activity: {
      label: "The Professional Keyboardist Challenge",
      content: [
        `Agora o bicho vai pegar.

Para o nível B1-B2, você precisa digitar termos técnicos e conectores longos com perfeição.

Você tem 5 segundos para cada palavra. Não aceitamos erros!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "hard-mode-words",
    component: "Exercise11",
    activity: {
      prompt: "Hard Mode",
      secondsPerWord: 5,
      words: [
        "PERSPECTIVE",
        "NEVERTHELESS",
        "AGREEMENT",
        "DIPLOMATICALLY",
        "CONTRADICT",
      ],
      successTitle: "Correto",
      successMessage: "Você digitou vocabulário profissional avançado.",
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
