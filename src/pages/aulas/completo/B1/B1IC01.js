import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "intro-timeline",
    component: "Exercise17",
    activity: {
      label: "O Tempo sob Controle",
      content: [
        `No nível avançado, não basta saber o que aconteceu. Você precisa saber dizer há quanto tempo algo vem acontecendo.

/blue{Present Perfect}
Subject + have/has + Past Participle

/blue{FOR}
Usado para duração, ou seja, um período de tempo.
Ex: for 5 years, for a long time.

/blue{SINCE}
Usado para o ponto de partida, quando começou.
Ex: since 2020, since this morning.

Essa estrutura conecta o passado ao presente. Se você diz "I've worked here for 2 years", você ainda trabalha l?!`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "for-duration-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "O falante ainda é um desenvolvedor?",
      image: ICB1.A1S1,
      audioSource: require("../../../../../mp3/IC/B1/A1S1.mp3"),
      audioDurationMs: 3200,
      answerOptions: ["Sim", "Não"],
      correctOption: "Sim",
      successTitle: "Correto",
      feedbackMessage:
        'O Present Perfect indica uma ação conectada ao presente. "For" foca na extensão do tempo, não na data de início.',
    },
  },
  {
    key: "since-starting-point-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Quando foi a última atualização?",
      image: ICB1.A1S2,
      audioSource: require("../../../../../mp3/IC/B1/A1S2.mp3"),
      audioDurationMs: 3300,
      answerOptions: ["No último trimestre", "Por vários meses"],
      correctOption: "No último trimestre",
      successTitle: "Correto",
      feedbackMessage:
        '"Since" exige um marco temporal específico no passado: since the last quarter.',
    },
  },
  {
    key: "since-clause-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "David começou a tocar guitarra quando?",
      image: ICB1.A1S3,
      audioSource: require("../../../../../mp3/IC/B1/A1S3.mp3"),
      audioDurationMs: 3200,
      answerOptions: ["Na infância", "Por muitos anos"],
      correctOption: "Na infância",
      successTitle: "Correto",
      feedbackMessage:
        '"Since" também pode vir antes de uma frase inteira no Simple Past: since he was a child.',
    },
  },
  {
    key: "for-since-tip",
    component: "Exercise17",
    activity: {
      label: "Dominando a Linha do Tempo",
      content: [
        `Para falar de ações que começaram no passado e continuam até hoje, usamos o Present Perfect. Mas como saber qual marcador usar?

/blue{FOR}
Foco: duração.
Depois vem um intervalo de tempo, uma quantidade.
Ex: for 3 hours, for 5 years.

/blue{SINCE}
Foco: ponto de partida.
Depois vem uma data, hora ou evento específico.
Ex: since 2010, since Monday.

Pense no FOR como um cronômetro que conta a quantidade de tempo que passou. Pense no SINCE como um calendário que marca o dia ou hora que tudo começou.

Errado: I have lived here since 5 years.
Certo: I have lived here for 5 years. (Duração)
Certo: I have lived here since 2019. (Ponto de partida)`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "since-10-years-false",
    component: "Exercise20",
    activity: {
      prompt: "Verdadeiro ou falso?",
      image: ICB1.A1S5,
      dialogue:
        'In the sentence "I\'ve been a teacher since 10 years", the use of "since" is correct.',
      options: ["True", "False"],
      correctAnswer: "False",
      successTitle: "Correto",
      successMessage:
        '"10 years" é uma duração, uma quantidade de tempo. Por isso, o correto é usar FOR.',
    },
  },
  {
    key: "since-daughter-born-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "O áudio indica um ponto de partida ou uma duração?",
      image: ICB1.A1S6,
      audioSource: require("../../../../../mp3/IC/B1/A1S6.mp3"),
      audioDurationMs: 4000,
      answerOptions: ["Duração (For)", "Ponto de Partida (Since)"],
      correctOption: "Ponto de Partida (Since)",
      successTitle: "Correto",
      feedbackMessage:
        '"Since" pode ser seguido por uma frase inteira no passado: since his daughter was born.',
    },
  },
  {
    key: "order-laptop-long-time",
    component: "Exercise6",
    activity: {
      prompt: 'Monte a frase: "Nós usamos este laptop por muito tempo."',
      words: ["We", "have used", "this laptop", "for", "a long time", "."],
      correctOrder: [
        "We",
        "have used",
        "this laptop",
        "for",
        "a long time",
        ".",
      ],
      successTitle: "Correto",
      successMessage: "We have used this laptop for a long time.",
    },
  },
  {
    key: "since-5-years-false",
    component: "Exercise20",
    activity: {
      prompt: "Verdadeiro ou falso?",
      image: ICB1.A1S7,
      dialogue:
        'In the sentence "I have lived in London since 5 years", the grammar is correct.',
      options: ["True", "False"],
      correctAnswer: "False",
      successTitle: "Correto",
      successMessage:
        'O correto seria "for 5 years" (duração) ou "since 2019" (ponto de partida). Esse é um erro comum de alunos avançados.',
    },
  },
  {
    key: "order-app-since-last-year",
    component: "Exercise6",
    activity: {
      prompt:
        'Monte a frase: "Eles estão desenvolvendo este aplicativo desde o ano passado."',
      words: ["They", "have developed", "this app", "since", "last year", "."],
      correctOrder: [
        "They",
        "have developed",
        "this app",
        "since",
        "last year",
        ".",
      ],
      successTitle: "Correto",
      successMessage: "They have developed this app since last year.",
    },
  },
  {
    key: "dialogue-since-for",
    component: "Exercise8",
    activity: {
      prompt:
        "David: \"I've used it ____ we launched the first version. It hasn't crashed ____ months.\"",
      image: ICB1.A1S9,
      options: ["since / for", "for / since", "since / since"],
      correctAnswer: "since / for",
      successTitle: "Correto",
      successMessage:
        '"We launched the first version" é ponto de partida, então usamos since. "Months" é duração, então usamos for.',
    },
  },
  {
    key: "structurally-wrong-sentence",
    component: "Exercise8",
    activity: {
      prompt: "Qual frase está estruturalmente ERRADA?",
      image: ICB1.A1S10,
      options: [
        "I've known him for years.",
        "She has since 2010 worked here.",
        "They have been married since June.",
      ],
      correctAnswer: "She has since 2010 worked here.",
      successTitle: "Correto",
      successMessage:
        'O "since" não deve interromper o verbo auxiliar e o principal dessa forma.',
    },
  },
  {
    key: "lingueto-journey-reading",
    component: "Exercise17",
    activity: {
      label: "The Lingueto Journey",
      content: [
        `"David is a dedicated creator. He has worked on the Lingueto project since January 2026. He has used React Native for several months to build the perfect UI. Since he started, David hasn't had a boring day! He has played his acoustic guitar to relax for short breaks, but his focus has been on the code since the beginning of the week. The app is almost ready!"`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "write-present-perfect",
    component: "Exercise12",
    activity: {
      prompt: "Sua linha do tempo",
      instruction:
        "Pense na sua habilidade mais forte hoje: Inglês, Tech, Música ou outra.",
      helperText:
        "Escreva 3 frases usando o Present Perfect. Use for para dizer a duração e since para dizer quando começou.",
      placeholder:
        "I have studied English since 2022. I have practiced every day for 3 years.",
      tipText:
        'Use "since" com o início: since 2022, since January, since I started. Use "for" com duração: for 3 years, for months, for a long time.',
      minLength: 20,
      successTitle: "Correto",
      successMessage:
        "Boa! Você usou a estrutura para conectar passado e presente.",
    },
  },
  {
    key: "present-perfect-conclusion",
    component: "Exercise17",
    activity: {
      label: "Nível Pro Alcançado!",
      content: [
        `Dominar o Present Perfect com For e Since coloca você em um novo patamar de fluência.

Resumo:
FOR = Duração (for + intervalo).
SINCE = Início (since + data/evento).

Agora você já pode falar sobre sua carreira e hobbies como um nativo!

See you in the next level!`,
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
