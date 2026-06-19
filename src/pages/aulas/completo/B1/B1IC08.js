import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "startup-vocabulary-intro",
    component: "Exercise17",
    activity: {
      label: "O Vocabulário do Vale",
      content: [
        `Se você quer trabalhar em tech ou lançar seu próprio app, precisa dessas palavras na ponta da língua:

/blue{VC}
Venture Capital: o dinheiro e as pessoas que investem em startups de alto risco.

/blue{Pitch}
Aquela apresentação rápida e matadora para convencer alguém a investir na sua ideia.

/blue{Scale}
Crescer o negócio de forma rápida e sustentável.

/blue{Deadline}
O prazo final. Em startups, perder um deadline pode custar caro!`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "vc-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escolha a definição correta",
      image: ICB1.A8S1,
      audioSource: require("../../../../../mp3/IC/B1/A8S1.mp3"),
      audioDurationMs: 2200,
      answerOptions: [
        "Venture Capital refers to investors who provide money to startups.",
        "VC is a type of computer hardware used in offices.",
      ],
      correctOption:
        "Venture Capital refers to investors who provide money to startups.",
      successTitle: "Correto",
      feedbackMessage: "Diga apenas as letras: VI-CI.",
    },
  },
  {
    key: "pitch-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escolha a definição correta",
      image: ICB1.A8S2,
      audioSource: require("../../../../../mp3/IC/B1/A8S2.mp3"),
      audioDurationMs: 2800,
      answerOptions: [
        "A pitch is a fast presentation to sell an idea or product.",
        "A pitch is a long holiday taken by startup founders.",
      ],
      correctOption:
        "A pitch is a fast presentation to sell an idea or product.",
      successTitle: "Correto",
      feedbackMessage: 'Tem som de "TCH" no final: P?-TCH.',
    },
  },
  {
    key: "scale-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escolha a definição correta",
      image: ICB1.A8S3,
      audioSource: require("../../../../../mp3/IC/B1/A8S3.mp3"),
      audioDurationMs: 3000,
      answerOptions: [
        "To scale means to grow the business significantly.",
        "To scale means to delete the application from the store.",
      ],
      correctOption: "To scale means to grow the business significantly.",
      successTitle: "Correto",
      feedbackMessage: 'O "E" final é mudo. Diga: SQUÊI-OU.',
    },
  },
  {
    key: "deadline-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escolha a definição correta",
      image: ICB1.A8S4,
      audioSource: require("../../../../../mp3/IC/B1/A8S4.mp3"),
      audioDurationMs: 3200,
      answerOptions: [
        "A deadline is the latest time or date something must be finished.",
        "A deadline is a phone line used only by CEOs.",
      ],
      correctOption:
        "A deadline is the latest time or date something must be finished.",
      successTitle: "Correto",
      feedbackMessage: 'Enfatize o "Dead": DÉD-láin.',
    },
  },
  {
    key: "startup-conversation",
    component: "Exercise2",
    activity: {
      prompt: "Escolha as palavras corretas para a conversa entre dois sócios:",
      paragraphs: [
        [
          "Our",
          { id: "b1", answer: "VC", options: ["VC", "Deadline"] },
          "is meeting us today.",
        ],
        [
          "We need to give a perfect",
          { id: "b2", answer: "Pitch", options: ["Pitch", "Scale"] },
          "to show how we will",
        ],
        [
          { id: "b3", answer: "Scale", options: ["Deadline", "Scale"] },
          "the Lingueto app this year.",
        ],
      ],
      successTitle: "Correto",
      successMessage: "A sequência correta é: VC / Pitch / Scale.",
    },
  },
  {
    key: "miss-deadline-false",
    component: "Exercise20",
    activity: {
      prompt: "Verdadeiro ou falso?",
      image: ICB1.A8S6,
      dialogue:
        "If you miss a deadline, it means you finished the task on time.",
      options: ["True", "False"],
      correctAnswer: "False",
      successTitle: "Correto",
      successMessage:
        "Miss a deadline significa que você se atrasou. Se terminar a tempo, você met the deadline.",
    },
  },
  {
    key: "order-scale-business",
    component: "Exercise6",
    activity: {
      prompt: "Monte a frase sobre o crescimento do app:",
      words: ["It", "is", "time", "to", "scale", "our", "business", "."],
      correctOrder: ["It", "is", "time", "to", "scale", "our", "business", "."],
      successTitle: "Correto",
      successMessage: "It is time to scale our business.",
    },
  },
  {
    key: "not-startup-word",
    component: "Exercise8",
    activity: {
      prompt:
        "Qual destas palavras NÃO faz parte do mundo dos negócios e startups?",
      image: ICB1.A8S8,
      options: ["VC", "Pitch", "Pineapple", "Deadline"],
      correctAnswer: "Pineapple",
      successTitle: "Correto",
      successMessage: "Pineapple é abacaxi, não vocabulário de startup.",
    },
  },
  {
    key: "deadline-vc-dialogue",
    component: "Exercise2",
    activity: {
      prompt: "Complete a conversa",
      paragraphs: [
        [
          'David: "We have to! The',
          {
            id: "b1",
            answer: "deadline",
            options: ["deadline", "VC", "pitch"],
          },
          'is at midnight."',
        ],
        [
          'Developer: "I hope the',
          { id: "b2", answer: "VC", options: ["scale", "deadline", "VC"] },
          'gives us more money after this."',
        ],
      ],
      successTitle: "Correto",
      successMessage: "A sequência correta é: deadline / VC.",
    },
  },
  {
    key: "spell-pitch",
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt: 'Desembaralhe a palavra usada para a "apresentação de venda":',
      audioSource: require("../../../../../mp3/IC/B1/A8S10.mp3"),
      audioDurationMs: 900,
      letters: ["P", "I", "T", "C", "H"],
      correctWord: "PITCH",
      successTitle: "Correto",
      successMessage: 'A palavra é "PITCH".',
    },
  },
  {
    key: "silicon-valley-dreams",
    component: "Exercise17",
    activity: {
      label: "Silicon Valley Dreams",
      content: [
        `"David is the founder of Lingueto. He has a very important deadline tomorrow: he needs to present his pitch to a famous VC from Silicon Valley. David knows his app is great, but now he needs to prove that it can scale to millions of users. If the investors like the project, Lingueto will become a giant! David is nervous, but he is ready for the challenge."`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "elevator-pitch-write",
    component: "Exercise12",
    activity: {
      prompt: "O Camaleão te desafia!",
      instruction:
        "Você está em um elevador com um investidor bilionário. Você tem 30 segundos para falar do seu app.",
      helperText:
        "Escreva 2 frases: diga que seu projeto está pronto para scale e peça uma reunião para fazer o seu pitch.",
      placeholder:
        "My app is ready to scale globally. Could we schedule a meeting so I can present my pitchá",
      tipText: "Use scale como verbo e pitch como apresentação de venda.",
      minLength: 20,
      successTitle: "Correto",
      successMessage: "Boa! Esse é o vocabulário de founder.",
    },
  },
  {
    key: "unicorn-conclusion",
    component: "Exercise17",
    activity: {
      label: "Próxima Parada: Unicórnio!",
      content: [
        `Agora você já fala a língua dos grandes fundadores.

Recapitulando:
VC = Investidor.
Pitch = Apresentação.
Scale = Crescer rápido.
Deadline = Prazo final.

Mantenha o foco no projeto e não perca o deadline da próxima aula!

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
