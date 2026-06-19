import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "did-you-know",
    component: "Exercise17",
    activity: {
      label: "Did you know?",
      content: [
        `Hoje vamos treinar os seus ouvidos com um fato histórico mundial.

Ao invés de ler, você vai escutar a lenda de como a bebida mais consumida nas manhãs foi descoberta.

/blue{Native Tip}
Quando estamos escutando alguém contar uma história, nativos usam active listening.

Faça sons como "Uh-huh", "Wow" ou "No way!" para mostrar que está acompanhando a narrativa.`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "goats-image",
    component: "Exercise8",
    activity: {
      prompt: "Look at the image. What is happening in this scene?",
      image: ICB1.A20S2,
      options: [
        "The animals are sleeping deeply in a barn.",
        "Energetic goats are eating red berries.",
        "Farmers are planting coffee trees.",
        "Sheep are drinking hot water.",
      ],
      correctAnswer: "Energetic goats are eating red berries.",
      successTitle: "Correto",
      successMessage: "As cabras estão agitadas e comendo frutas vermelhas.",
    },
  },
  {
    key: "shepherd-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute a palavra-chave e escolha a correta.",
      image: ICB1.A20S3,
      audioSource: require("../../../../../mp3/IC/B1/A20S3.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Shepherd", "Sheep"],
      correctOption: "Shepherd",
      successTitle: "Correto",
      feedbackMessage: "Shepherd é a pessoa que cuida de ovelhas ou cabras.",
    },
  },
  {
    key: "coffee-legend-false",
    component: "Exercise20",
    activity: {
      prompt: "Observe e responda.",
      image: ICB1.A20S4,
      dialogue:
        "The goats became very tired and sleepy after eating the red berries.",
      options: ["True", "False"],
      correctAnswer: "False",
      successTitle: "Correto",
      successMessage:
        "As cabras ficaram extremamente energéticas, não sonolentas.",
    },
  },
  {
    key: "wouldnt-sleep",
    component: "Exercise19",
    needsSpeech: true,
    activity: {
      prompt: "Escute este trecho curto e digite exatamente o que ouviu.",
      audioSource: require("../../../../../mp3/IC/B1/A20S5.mp3"),
      audioDurationMs: 2400,
      correctAnswer: "They wouldn't sleep at night.",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "Você escreveu o trecho corretamente.",
      errorMessage: "Atenção à contração wouldn't.",
    },
  },
  {
    key: "audio-vocabulary-match",
    component: "Exercise1",
    activity: {
      prompt: "Conecte as palavras-chave do áudio com suas definições.",
      pairs: [
        { en: "Shepherd", pt: "A person who takes care of animals." },
        { en: "Berries", pt: "Small round fruit from a tree." },
        { en: "Monks", pt: "Religious men living in a monastery." },
      ],
      successTitle: "Excelente",
      successMessage: "Você conectou o vocabulário da história.",
    },
  },
  {
    key: "monks-summary",
    component: "Exercise4",
    activity: {
      prompt: "Qual frase resume corretamente o final do áudio?",
      image: ICB1.A20S7,
      wrongSentence: "Coffee legend",
      options: [
        "Monks used the berries to sleep better at night.",
        "Monks used the berries to stay awake during prayers.",
        "The shepherd sold the berries to the monks for a lot of money.",
      ],
      correctAnswer: "Monks used the berries to stay awake during prayers.",
      successTitle: "Correto",
      successMessage:
        "Os monges usavam as frutas para ficar acordados durante longas orações.",
    },
  },
  {
    key: "ear-hand",
    component: "Exercise17",
    activity: {
      label: "Ear to Hand Coordination!",
      content: [
        `Você captou os detalhes da história perfeitamente.

Agora, vamos testar sua agilidade com o vocabulário narrativo.

Você tem 5 segundos para digitar as palavras que escutamos.

Focus!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "coffee-speed",
    component: "Exercise11",
    activity: {
      prompt: "Hard Mode",
      secondsPerWord: 5,
      words: ["DISCOVERED", "ENERGETIC", "SHEPHERD", "LEGEND", "AWAKE"],
      successTitle: "Correto",
      successMessage: "Você digitou o vocabulário narrativo.",
    },
  },
  {
    key: "espresso-false",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "A história continua. Escute e responda.",
      image: ICB1.A20S10,
      audioSource: require("../../../../../mp3/IC/B1/A20S10.mp3"),
      audioDurationMs: 10500,
      dialogue:
        "The audio states that an espresso machine uses cold water and low pressure.",
      options: ["True", "False"],
      correctAnswer: "False",
      successTitle: "Correto",
      successMessage:
        "A máquina usa água quente e alta pressão, não água fria e baixa pressão.",
    },
  },
  {
    key: "espresso-transcription",
    component: "Exercise2",
    activity: {
      prompt: "Complete a transcrião.",
      paragraphs: [
        [
          "The word espresso means",
          { id: "b1", answer: "pressed", options: ["pressed", "pushed"] },
          "out.",
        ],
        [
          "The machine uses high",
          {
            id: "b2",
            answer: "pressure",
            options: ["temperature", "pressure"],
          },
          "to force hot water through the coffee.",
        ],
      ],
      successTitle: "Correto",
      successMessage: "A sequência correta é: pressed / pressure.",
    },
  },
  {
    key: "write-coffee-summary",
    component: "Exercise12",
    activity: {
      prompt: "Resumo!",
      instruction:
        'Explique a "lenda do café e das cabras" para um amigo em inglês.',
      helperText: "Use suas próprias palavras em 2 frases curtas.",
      placeholder:
        "Coffee was discovered by a shepherd named Kaldi. His goats became energetic after eating red berries.",
      tipText: "Use discovered, shepherd, goats, berries e energetic.",
      minLength: 25,
      successTitle: "Correto",
      successMessage: "Ótimo resumo da história.",
    },
  },
  {
    key: "audio-favorite-drink",
    component: "Exercise16",
    activity: {
      prompt: "Now it's personal!",
      instruction: "Todo mundo tem uma bebida favorita para dar energia.",
      helperText:
        "Mande um áudio contando qual é sua bebida indispensável e por que precisa dela no seu dia.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "My favorite drink is espresso because it helps me focus in the morning.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Seu áudio sobre sua bebida favorita foi gravado.",
    },
  },
  {
    key: "listening-conclusion",
    component: "Exercise17",
    activity: {
      label: "Awesome listening skills!",
      content: [
        `Você conseguiu entender sotaques, extrair informações detalhadas sem precisar ler um texto longo e ainda aprendeu a história clássica de uma bebida mundial.

Seus ouvidos estão cada vez mais afiados para o inglês real!`,
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
