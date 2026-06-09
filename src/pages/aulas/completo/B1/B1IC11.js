import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "dream-big",
    component: "Exercise17",
    activity: {
      label: "Dream Big!",
      content: [
        `Welcome! Hoje vamos aprender a falar sobre situações imaginárias, sonhos e dar conselhos como um nativo.

Sabe quando você diz "Se eu ganhasse na loteria..." ou "Se eu fosse você..."? É exatamente isso que vamos dominar hoje usando a 2nd Conditional.

Ready?`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "lottery-mansion-match",
    component: "Exercise15",
    activity: {
      prompt: "Clique na imagem e na palavra que a descreve.",
      images: [
        { id: "ticket-img", image: ICB1.A17S2 },
        { id: "mansion-img", image: ICB1.A17S3 },
      ],
      words: [
        { id: "ticket-word", label: "Lottery ticket" },
        { id: "mansion-word", label: "Mansion" },
      ],
      pairs: [
        { imageId: "ticket-img", wordId: "ticket-word" },
        { imageId: "mansion-img", wordId: "mansion-word" },
      ],
      successTitle: "Correto",
      successMessage: "Você combinou as imagens com as palavras certas.",
    },
  },
  {
    key: "lottery-audio-false",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Escute e responda",
      image: ICB1.A18S2,
      audioSource: require("../../../../../mp3/IC/B1/A11S3.mp3"),
      audioDurationMs: 5200,
      dialogue: "The person would buy a new car.",
      options: ["True", "False"],
      correctAnswer: "False",
      successTitle: "Correto",
      successMessage:
        "A pessoa compraria uma máquina profissional de espresso, não um carro.",
    },
  },
  {
    key: "formula-tip",
    component: "Exercise17",
    activity: {
      label: "The Formula: If + Past, Would + Verb",
      content: [
        `Para situações hipotéticas, usamos o passado na condição e "would" no resultado.

Exemplo:
If I won the lottery, I would travel.

/blue{Native Tip}
Quando queremos dar um conselho, dizemos "If I were you..." (Se eu fosse você).

No inglês falado e informal, você vai ouvir muito nativo dizendo "If I was you", mas em situações formais ou testes, use sempre "If I were you"!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "complete-won",
    component: "Exercise5",
    activity: {
      prompt: "Complete a frase",
      image: ICB1.A18S3,
      sentenceStart: "If I",
      sentenceEnd: "the lottery, I would travel the world.",
      options: ["won", "win"],
      correctAnswer: "won",
      successTitle: "Correto",
      successMessage:
        "Na 2nd Conditional, usamos passado depois de if: If I won...",
    },
  },
  {
    key: "complete-were",
    component: "Exercise5",
    activity: {
      prompt: "Complete a frase",
      image: ICB1.A18S5,
      sentenceStart: "If I",
      sentenceEnd: "you, I would study more.",
      options: ["were", "am"],
      correctAnswer: "were",
      successTitle: "Correto",
      successMessage:
        'Para conselho, a forma padrão ? "If I were you...".',
    },
  },
  {
    key: "correct-conditional",
    component: "Exercise4",
    activity: {
      prompt: "Qual é a frase escrita corretamente?",
      image: ICB1.A19S4,
      wrongSentence: "2nd Conditional",
      options: [
        "If I win the lottery, I would bought a house.",
        "If I won the lottery, I will buy a house.",
        "If I won the lottery, I would buy a house.",
      ],
      correctAnswer: "If I won the lottery, I would buy a house.",
      successTitle: "Correto",
      successMessage:
        "A estrutura correta é: If + passado, would + verbo base.",
    },
  },
  {
    key: "connect-conditionals",
    component: "Exercise1",
    activity: {
      prompt: "Conecte o início da frase com o final correto.",
      pairs: [
        { en: "If I had more time,", pt: "I would play my guitar." },
        { en: "If I were you,", pt: "I would talk to her." },
        { en: "What would you do", pt: "if you won the lottery?" },
      ],
      successTitle: "Excelente",
      successMessage: "Você conectou as frases hipotéticas corretamente.",
    },
  },
  {
    key: "i-wish-tip",
    component: "Exercise17",
    activity: {
      label: "I wish...",
      content: [
        `Usamos "I wish" seguido de um verbo no passado para falar de coisas que queríamos que fossem diferentes no presente.

Exemplo:
I don't have time.
I wish I had more time.

É como se você estivesse imaginando uma realidade paralela!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "order-wish-money",
    component: "Exercise6",
    activity: {
      prompt: "Clique nas palavras para formar a frase correta.",
      words: ["had", "wish", "money", "I", "more", "I"],
      correctOrder: ["I", "wish", "I", "had", "more", "money"],
      successTitle: "Correto",
      successMessage: "I wish I had more money.",
    },
  },
  {
    key: "wish-apartment-text",
    component: "Exercise2",
    activity: {
      prompt: "Complete o texto com as opções corretas.",
      paragraphs: [
        ["I love my life, but sometimes I dream. I wish I", { id: "b1", answer: "had", options: ["had", "have"] }, "a bigger apartment."],
        ["If I had more space, I", { id: "b2", answer: "would", options: ["will", "would"] }, "invite my whole family for a big Sunday dinner!"],
      ],
      successTitle: "Correto",
      successMessage: "A sequência correta é: had / would.",
    },
  },
  {
    key: "write-lottery",
    component: "Exercise12",
    activity: {
      prompt: "Imaginative Scenario",
      instruction: "What would you do if you won the lottery?",
      helperText: "Escreva pelo menos duas coisas que você faria.",
      image: ICB1.A19S5,
      placeholder:
        "If I won the lottery, I would buy a house and I would travel to Japan.",
      tipText:
        "Use: If I won the lottery, I would... / I would also...",
      minLength: 20,
      successTitle: "Correto",
      successMessage: "Ótimo! Você escreveu sobre uma situação imaginária.",
    },
  },
  {
    key: "audio-advice",
    component: "Exercise16",
    activity: {
      prompt: 'Giving "Pro" Advice!',
      instruction:
        "Um amigo quer aprender inglês, mas tem medo de errar e não começar.",
      helperText:
        'Mande um áudio dando um conselho começando com: "If I were you, I would..."',
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "If I were you, I would start with small lessons every day.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Seu conselho em áudio foi gravado com sucesso.",
    },
  },
  {
    key: "speed-typing-tip",
    component: "Exercise17",
    activity: {
      label: "Speed Typing Challenge!",
      content: [
        `Você está quase l?! Agora, vamos testar sua agilidade e precisão.

Você terá 5 segundos para digitar cada uma das 5 palavras-chave que usamos para falar de sonhos e conselhos.

Don't blink!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "speed-typing",
    component: "Exercise11",
    activity: {
      prompt: "Escreva rápido",
      secondsPerWord: 5,
      words: ["WOULD", "COULD", "WERE", "WISH", "IMAGINE"],
      successTitle: "Correto",
      successMessage: "Você digitou as palavras-chave no tempo certo.",
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
