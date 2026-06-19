import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "continuous-intro",
    component: "Exercise17",
    activity: {
      label: "O que você tem andado fazendo?",
      content: [
        `Diferente do Present Perfect Simple, aqui o que importa é a atividade em si, não se ela terminou.

/blue{A Estrutura}
Have/Has + BEEN + verbo com -ING

/blue{Quando usar?}
Ações em progresso: algo que começou e continua.
Ex: "I've been coding for hours."

Ações recentes com evidência: quando você vé o resultado agora.
Ex: "I'm sweaty because I've been working out."

/blue{A diferença de vibe}
Present Perfect Simple: foca no resultado.
Ex: Eu li o livro.

Present Perfect Continuous: foca no tempo gasto.
Ex: Eu tenho andado lendo este livro.`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "working-out-evidence",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escolha a melhor interpretação",
      image: ICB1.A3S1,
      audioSource: require("../../../../../mp3/IC/B1/A3S1.mp3"),
      audioDurationMs: 3800,
      answerOptions: [
        "The person has spent a lot of energy exercising recently.",
        "The person finished their exercise routine yesterday.",
      ],
      correctOption:
        "The person has spent a lot of energy exercising recently.",
      successTitle: "Correto",
      feedbackMessage:
        "O Present Perfect Continuous mostra uma atividade recente ou em progresso com evidência agora.",
    },
  },
  {
    key: "coding-since-morning",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escolha a melhor interpretação",
      image: ICB1.A3S2,
      audioSource: require("../../../../../mp3/IC/B1/A3S2.mp3"),
      audioDurationMs: 3800,
      answerOptions: [
        "David is still in the process of writing the code.",
        "David already finished and uploaded the new feature.",
      ],
      correctOption: "David is still in the process of writing the code.",
      successTitle: "Correto",
      feedbackMessage:
        'O "since" com o "-ing" indica que o trabalho ainda está rolando.',
    },
  },
  {
    key: "guitar-for-hours",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escolha a melhor interpretação",
      image: ICB1.A3S3,
      audioSource: require("../../../../../mp3/IC/B1/A3S3.mp3"),
      audioDurationMs: 3600,
      answerOptions: [
        "The speaker started playing 3 hours ago and is likely still playing.",
        "The speaker only played the guitar 3 hours ago and stopped.",
      ],
      correctOption:
        "The speaker started playing 3 hours ago and is likely still playing.",
      successTitle: "Correto",
      feedbackMessage:
        'O "-ing" mostra imersão na atividade e destaca o processo.',
    },
  },
  {
    key: "result-not-process-song",
    component: "Exercise8",
    activity: {
      prompt: "Qual frase foca no resultado final e não no processo contínuo?",
      image: ICB1.A4S1,
      options: [
        "I've been practicing the song.",
        "I've practiced the song three times.",
        "I've been playing since noon.",
      ],
      correctAnswer: "I've practiced the song three times.",
      successTitle: "Correto",
      successMessage:
        "Essa frase conta o resultado: três vezes. As outras focam no tempo gasto na ação.",
    },
  },
  {
    key: "david-studying-scenario",
    component: "Exercise8",
    activity: {
      prompt: "Qual frase melhor descreve a situação de David?",
      image: ICB1.A3S5,
      options: [
        "David has finished his exam.",
        "David has been studying since morning.",
        "David studied yesterday.",
      ],
      correctAnswer: "David has been studying since morning.",
      successTitle: "Correto",
      successMessage:
        "Livros abertos e café mostram uma ação que ainda está acontecendo ou acabou de ser interrompida, mas deixou rastros.",
    },
  },
  {
    key: "spell-been",
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt:
        "Para formar o Continuous, você sempre precisa deste verbo no particípio. Desembaralhe:",
      audioSource: require("../../../../../mp3/IC/B1/A3S6.mp3"),
      audioDurationMs: 900,
      letters: ["B", "E", "E", "N"],
      correctWord: "BEEN",
      successTitle: "Correto",
      successMessage: 'Sem o "been", o Continuous não existe!',
    },
  },
  {
    key: "result-not-activity-guitar",
    component: "Exercise8",
    activity: {
      prompt:
        "Qual frase foca na conclusão (resultado) e não na atividade contínuaí",
      image: ICB1.A3S7,
      options: [
        "I've been playing the guitar.",
        "I've played three songs.",
        "I've been practicing for the show.",
      ],
      correctAnswer: "I've played three songs.",
      successTitle: "Correto",
      successMessage:
        "Essa opção foca na quantidade/resultado: três músicas. As outras focam no tempo dedicado é ação.",
    },
  },
  {
    key: "order-new-design",
    component: "Exercise6",
    activity: {
      prompt: 'Monte a frase: "Ela tem trabalhado muito no novo design."',
      words: [
        "She",
        "has been",
        "working",
        "hard",
        "on the",
        "new design",
        ".",
      ],
      correctOrder: [
        "She",
        "has been",
        "working",
        "hard",
        "on the",
        "new design",
        ".",
      ],
      successTitle: "Correto",
      successMessage: "She has been working hard on the new design.",
    },
  },
  {
    key: "been-been-dialogue",
    component: "Exercise8",
    activity: {
      prompt:
        "David: \"I've ____ working out every morning. I've ____ doing this for three months now.\"",
      image: ICB1.A3S9,
      options: ["been / been", "being / been", "been / be"],
      correctAnswer: "been / been",
      successTitle: "Correto",
      successMessage: "A estrutura é have/has + been + verbo com -ing.",
    },
  },
  {
    key: "creator-routine-reading",
    component: "Exercise17",
    activity: {
      label: "The Creator's Routine",
      content: [
        `"David is exhausted. He has been developing the Lingueto app for months. Lately, he hasn't been sleeping very well because his mind is full of code. His sister says: 'You have been working too much!'. David knows she is right, but he has been dreaming about the launch day since January. He has been playing his acoustic guitar to relax, but even then, he thinks about the app's music!"`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "write-continuous",
    component: "Exercise12",
    activity: {
      prompt: "O que você tem andado fazendo?",
      instruction:
        "Pense no que você tem feito ultimamente para melhorar seu inglês ou sua carreira.",
      helperText: "Escreva 3 frases usando o Present Perfect Continuous.",
      placeholder:
        "I've been watching series in English. I've been studying every night. I've been practicing speaking.",
      tipText:
        'Use have/has + been + verbo com -ing. Ex: "I\'ve been studying", "She has been working".',
      minLength: 20,
      successTitle: "Correto",
      successMessage:
        "Muito bem! Você praticou como falar de atividades em progresso.",
    },
  },
  {
    key: "process-mastered-conclusion",
    component: "Exercise17",
    activity: {
      label: "Processo Dominado!",
      content: [
        `Agora você sabe descrever não sé o que fez, mas o que tem feito.

Resumo:
Foco na atividade: have/has been + ING.
Duração ou evidência: "I've been running" mostra por que estou cansado agora.

Continue nesse ritmo, você tem andado estudando muito bem!

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
