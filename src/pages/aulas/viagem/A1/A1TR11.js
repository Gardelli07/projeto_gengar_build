import { Images, TRA1 } from "../../../../util/images";
import createTravelLessonScreen from "./TravelLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "directions-intro",
    component: "Exercise17",
    activity: {
      label: "Where is...? (Directions)",
      content: [
        'Hora de explorar! É muito comum ficar sem internet na rua ou se confundir com o GPS durante a viagem. Se você se perder, o segredo é juntar o que aprendemos na aula do aeroporto ("Where is...?") com os três comandos básicos de direção em inglês: Direita, Esquerda e Reto. Vamos aprender a não andar em círculos!',
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "right-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A11S2,
      audioSource: require("../../../../../mp3/TR/A1/A11S2.mp3"),
      audioDurationMs: 900,
      answerOptions: ["Right", "Left"],
      correctOption: "Right",
      successTitle: "Correto",
      feedbackMessage:
        '"Right" significa direita quando estamos falando de direções.',
    },
  },
  {
    key: "left-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A11S3,
      audioSource: require("../../../../../mp3/TR/A1/A11A3.mp3"),
      audioDurationMs: 900,
      answerOptions: ["Left", "Right"],
      correctOption: "Left",
      successTitle: "Correto",
      feedbackMessage: '"Left" significa esquerda.',
    },
  },
  {
    key: "turn-tip",
    component: "Exercise17",
    activity: {
      label: "Dica de Nativo",
      content: [
        `Saber a direção não basta, você precisa do verbo de ação.

Quando a pessoa quiser que você vire a esquina, ela vai usar a palavra TURN.

Exemplo: Turn right (vire à direita) ou Turn left (vire à esquerda).

Mas e se for para continuar andando reto na mesma rua? Vamos ver no próximo slide!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "go-straight-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: TRA1.A11S5,
      audioSource: require("../../../../../mp3/TR/A1/A11S5.mp3"),
      audioDurationMs: 1300,
      answerOptions: ["Go straight", "Turn left"],
      correctOption: "Go straight",
      successTitle: "Correto",
      feedbackMessage: '"Go straight" significa vá reto ou siga em frente.',
    },
  },
  {
    key: "turn-left-complete",
    component: "Exercise5",
    activity: {
      prompt:
        "Você perguntou onde fica o supermercado e a pessoa apontou para a esquina dizendo para você virar à esquerda. Complete a frase que ela disse:",
      sentenceStart: "Turn",
      sentenceEnd: ".",
      options: ["left", "straight"],
      correctAnswer: "left",
      successTitle: "Correto",
      successMessage: "Turn left.",
    },
  },
  {
    key: "turn-right-true-false",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e responda: verdadeiro ou falso?",
      image: TRA1.A11S7,
      audioSource: require("../../../../../mp3/TR/A1/A11S7.mp3"),
      audioDurationMs: 1200,
      statement: "A pessoa do áudio está dizendo para você virar à esquerda.",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage: '"Turn right" é vire à direita.',
    },
  },
  {
    key: "directions-match",
    component: "Exercise1",
    activity: {
      prompt: "Conecte os comandos de direção com as suas traduções.",
      pairs: [
        { en: "Right", pt: "Direita" },
        { en: "Left", pt: "Esquerda" },
        { en: "Go straight", pt: "Vá reto" },
      ],
      successTitle: "Correto",
      successMessage: "Agora você conhece os comandos básicos de direção.",
    },
  },
  {
    key: "turn-right-order",
    component: "Exercise6",
    activity: {
      prompt: "Clique nas palavras para escrever a frase na ordem correta.",
      words: ["right", "Turn", ",", "please"],
      correctOrder: ["Turn", "right", ",", "please"],
      successTitle: "Correto",
      successMessage: "Turn right, please.",
    },
  },
  {
    key: "go-straight-correct-sentence",
    component: "Exercise4",
    activity: {
      prompt:
        "Você perguntou onde é o hotel e o recepcionista disse que é só seguir reto na mesma rua. Qual frase ele usou?",
      image: TRA1.A11S5,
      wrongSentence: "Directions",
      options: ["Turn right.", "Turn left.", "Go straight."],
      correctAnswer: "Go straight.",
      successTitle: "Correto",
      successMessage: "Go straight.",
    },
  },
  {
    key: "turn-left-writing",
    component: "Exercise12",
    activity: {
      prompt: "Writing",
      instruction:
        'Imagine que você está ajudando outro brasileiro na rua e precisa dizer "Vire à esquerda" em inglês. Como você escreve isso?',
      placeholder: "Turn left",
      helperText: "Use Turn...",
      tipText: "Turn left",
      submitLabel: "Enviar",
      successTitle: "Correto",
      successMessage: "Turn left.",
    },
  },
  {
    key: "go-straight-speaking",
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction: 'Aperte o botão e grave a frase: "Go straight" (Vá reto).',
      helperText: "Go straight",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Go straight",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você praticou a direção para seguir reto.",
    },
  },
  {
    key: "lesson-finish",
    type: "finish",
  },
];

export default createTravelLessonScreen(LESSON_SLIDES);
