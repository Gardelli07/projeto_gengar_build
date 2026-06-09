import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "hustle-culture-intro",
    component: "Exercise17",
    activity: {
      label: "Beyond the Hustle Culture",
      content: [
        `"In the modern tech world, Hustle Culture is everywhere. It's the idea that you must work '24/7' to be successful. However, this often leads to Burnout, a state of emotional and physical exhaustion.

To stay creative, developers need a healthy Work-life balance. This isn't just about 'working less', but about setting Boundaries. For example, closing your laptop at 7 PM or not checking emails on weekends. When you recharge your battery, your code actually gets better!"

/blue{Dicionário do Camaleão}
Hustle Culture: a cultura da correria incessante.
Burnout: esgotamento profissional.
Boundaries: limites essenciais para não pirar.
Recharge: recarregar as energias.`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "boundaries-burnout",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escolha a melhor interpretação",
      image: ICB1.A11S5,
      audioSource: require("../../../../../mp3/IC/B1/A9S1.mp3"),
      audioDurationMs: 3400,
      answerOptions: [
        "The speaker believes that limits help prevent professional exhaustion.",
        "The speaker thinks working without limits is the best way to succeed.",
      ],
      correctOption:
        "The speaker believes that limits help prevent professional exhaustion.",
      successTitle: "Correto",
      feedbackMessage:
        "Boundaries são limites que ajudam a proteger sua energia.",
    },
  },
  {
    key: "hustle-culture-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escolha a definição correta",
      image: ICB1.A11S6,
      audioSource: require("../../../../../mp3/IC/B1/A9S2.mp3"),
      audioDurationMs: 3000,
      answerOptions: [
        "A social pressure to work all the time to reach success.",
        "A traditional way of farming in North America.",
      ],
      correctOption: "A social pressure to work all the time to reach success.",
      successTitle: "Correto",
      feedbackMessage: 'O "T" é mudo: Râ-ssou KÁL-tcher.',
    },
  },
  {
    key: "boundaries-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escolha a definição correta",
      image: ICB1.A11S7,
      audioSource: require("../../../../../mp3/IC/B1/A9S3.mp3"),
      audioDurationMs: 3200,
      answerOptions: [
        "Limits you establish to separate work and personal life.",
        "New features or updates in a software project.",
      ],
      correctOption: "Limits you establish to separate work and personal life.",
      successTitle: "Correto",
      feedbackMessage: "Boundaries são limites entre trabalho e vida pessoal.",
    },
  },
  {
    key: "avoid-burnout-blanks",
    component: "Exercise2",
    activity: {
      prompt: "Escolha a melhor opção para completar a lógica profissional:",
      paragraphs: [
        [
          "To avoid",
          { id: "b1", answer: "Burnout", options: ["Burnout", "Scale"] },
          ", a developer needs a healthy",
        ],
        [
          {
            id: "b2",
            answer: "Work-life balance",
            options: ["Work-life balance", "Deadline"],
          },
          ".",
        ],
        [
          "This involves learning how to",
          { id: "b3", answer: "Unplug", options: ["Pitch", "Unplug"] },
          "and rest.",
        ],
      ],
      successTitle: "Correto",
      successMessage:
        "A sequência correta é: Burnout / Work-life balance / Unplug.",
    },
  },
  {
    key: "order-mental-health",
    component: "Exercise6",
    activity: {
      prompt: "Monte a frase sobre prioridades:",
      words: [
        "Mental",
        "health",
        "is",
        "a",
        "priority",
        "over",
        "hustle culture",
        ".",
      ],
      correctOrder: [
        "Mental",
        "health",
        "is",
        "a",
        "priority",
        "over",
        "hustle culture",
        ".",
      ],
      successTitle: "Correto",
      successMessage: "Mental health is a priority over hustle culture.",
    },
  },
  {
    key: "wake-up-call-reading",
    component: "Exercise17",
    activity: {
      label: "David's Wake-up Call",
      content: [
        `"David has been developing the Lingueto app for months. At first, he fell into the trap of Hustle Culture, working until 3 AM and drinking too much coffee. He thought that Toxic Productivity was the only way to succeed.

However, he soon faced Burnout. He couldn't code, he couldn't play his guitar, and he felt constantly exhausted. He realized that to save his project, he needed to Unplug. David started setting strict Boundaries: he now closes his laptop at 7 PM and never checks emails on weekends. This new Work-life balance didn't make him slower; it made him more creative and focused. Today, David is healthier, and his app is better than ever!"`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "why-burnout",
    component: "Exercise4",
    activity: {
      prompt: "Com base no texto, escolha a resposta correta:",
      image: ICB1.A12S2,
      wrongSentence: "Why did David face Burnout?",
      options: [
        "Because he worked too much.",
        "Because he didn't like the app.",
      ],
      correctAnswer: "Because he worked too much.",
      successTitle: "Correto",
      successMessage: "Ele trabalhava até 3 da manhá e não descansava.",
    },
  },
  {
    key: "what-did-he-do",
    component: "Exercise4",
    activity: {
      prompt: "Com base no texto, escolha a resposta correta:",
      image: ICB1.A12S3,
      wrongSentence: "What did David do to recoverá",
      options: ["He quit his job.", "He set strict boundaries."],
      correctAnswer: "He set strict boundaries.",
      successTitle: "Correto",
      successMessage:
        "Ele passou a fechar o laptop às 19h e não checar e-mails no fim de semana.",
    },
  },
  {
    key: "app-result",
    component: "Exercise4",
    activity: {
      prompt: "Com base no texto, escolha a resposta correta:",
      image: ICB1.A13S4,
      wrongSentence: "What happened to David's app?",
      options: [
        "It became better and more creative.",
        "It became slower and worse.",
      ],
      correctAnswer: "It became better and more creative.",
      successTitle: "Correto",
      successMessage: "O equilíbrio deixou David mais criativo e focado.",
    },
  },
  {
    key: "text-logic-blanks",
    component: "Exercise2",
    activity: {
      prompt: "Complete a lógica com base no texto:",
      paragraphs: [
        [
          "If you follow the",
          {
            id: "b1",
            answer: "Hustle Culture",
            options: ["Hustle Culture", "Work-life balance"],
          },
          "too strictly, you might face",
        ],
        [{ id: "b2", answer: "Burnout", options: ["Success", "Burnout"] }, "."],
        [
          "To avoid this, you should set",
          {
            id: "b3",
            answer: "Boundaries",
            options: ["Deadlines", "Boundaries"],
          },
          "and find time to recharge.",
        ],
      ],
      successTitle: "Correto",
      successMessage:
        "A sequência correta é: Hustle Culture / Burnout / Boundaries.",
    },
  },
  {
    key: "recharge-false",
    component: "Exercise20",
    activity: {
      prompt: "Verdadeiro ou falso?",
      image: ICB1.A14S2,
      dialogue:
        'According to the text, "recharging" your battery makes your code worse because you lose time.',
      options: ["True", "False"],
      correctAnswer: "False",
      successTitle: "Correto",
      successMessage:
        "O texto diz o contrário: recarregar as energias melhora a qualidade do trabalho.",
    },
  },
  {
    key: "write-work-life-balance",
    component: "Exercise12",
    activity: {
      prompt: "O Camaleão te desafia!",
      instruction: "Tema: Your Work-life Balance.",
      helperText:
        "Escreva 3 frases: diga se já sentiu Burnout, use Boundaries para um limite atual e use Unplug para seu tempo livre.",
      image: ICB1.A14S3,
      placeholder:
        "I've felt burnout before. I set boundaries by closing my laptop at night. I unplug by playing guitar.",
      tipText:
        "Use burnout como esgotamento, boundaries como limites e unplug como desconectar.",
      minLength: 30,
      successTitle: "Correto",
      successMessage: "Boa reflexão. Inglês e autocuidado juntos.",
    },
  },
  {
    key: "balance-conclusion",
    component: "Exercise17",
    activity: {
      label: "Equilíbrio ? Tudo!",
      content: [
        `Você aprendeu a identificar os perigos da correria excessiva e como falar sobre isso em inglês.

Checklist:
Leu e interpretou um texto complexo.
Aprendeu a pronúncia de termos tech avançados.
Refletiu sobre sua própria produtividade.

Agora, siga o exemplo do David: dé um Unplug e descanse um pouco!

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
