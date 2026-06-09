import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "simple-continuous-intro",
    component: "Exercise17",
    activity: {
      label: "O que importa na sua frase?",
      content: [
        `No nível avançado, a gramática é uma ferramenta de ênfase.

/blue{Present Perfect Simple: O Qu?}
Foco: resultado final ou quantidade.
Fórmula: Subject + have/has + Past Participle
Uso: quando você quer dizer "missão cumprida" ou "fiz X vezes".
Ex: I've built the login screen. (Está pronto!)

/blue{Present Perfect Continuous: O Como}
Foco: esforço, duração e cansação.
Fórmula: Subject + have/has + been + Verb-ing
Uso: quando você quer mostrar que está ralando em algo hé um tempo.
Ex: I've been building the login screen. (Ainda estou nela, que trabalho!)`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "match-intention",
    component: "Exercise2",
    activity: {
      prompt: "Escolha a intenção correta do falante",
      paragraphs: [
        [
          '"I\'ve been playing the guitar all day." -',
          {
            id: "blank-1",
            answer: "tempo gasto",
            options: ["tempo gasto", "quantidade", "resultado"],
          },
        ],
        [
          '"I\'ve played the guitar twice today." -',
          {
            id: "blank-2",
            answer: "quantidade",
            options: ["resultado", "tempo gasto", "quantidade"],
          },
        ],
        [
          '"I\'ve finished the song." -',
          {
            id: "blank-3",
            answer: "resultado",
            options: ["quantidade", "resultado", "tempo gasto"],
          },
        ],
      ],
      successTitle: "Correto",
      successMessage:
        "Continuous foca no esforço e no tempo. Simple foca em quantidade ou resultado.",
    },
  },
  {
    key: "fixing-bug-since-breakfast",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escolha a melhor interpretação",
      image: ICB1.A7S5,
      audioSource: require("../../../../../mp3/IC/B1/A5S2.mp3"),
      audioDurationMs: 3400,
      answerOptions: [
        "David is emphasizing the continuous struggle and duration of the task.",
        "David is celebrating that the bug is finally fixed and gone.",
      ],
      correctOption:
        "David is emphasizing the continuous struggle and duration of the task.",
      successTitle: "Correto",
      feedbackMessage:
        "O Continuous enfatiza esforço contínuo e duração da tarefa.",
    },
  },
  {
    key: "learn-context",
    component: "Exercise2",
    activity: {
      prompt: "Analise o contexto e preencha com a forma correta de LEARN",
      paragraphs: [
        [
          "David is a fast learner. Today, he",
          {
            id: "blank-1",
            answer: "has learned",
            options: ["has learned", "has been learning", "learned"],
          },
          "three new React Native tricks.",
        ],
        [
          "He is exhausted because he",
          {
            id: "blank-2",
            answer: "has been learning",
            options: ["has learned", "has been learning", "learns"],
          },
          "new features all afternoon.",
        ],
      ],
      successTitle: "Correto",
      successMessage:
        '"Has learned" foca no resultado/quantidade. "Has been learning" foca no processo/duração.',
    },
  },
  {
    key: "order-duration",
    component: "Exercise6",
    activity: {
      prompt: "Desembaralhe a frase que foca na duração da ação:",
      words: ["He", "long", "working", "has", "been", "for", "."],
      correctOrder: ["He", "has", "been", "working", "for", "long", "."],
      successTitle: "Correto",
      successMessage: "He has been working for long.",
    },
  },
  {
    key: "chameleons-progress",
    component: "Exercise8",
    activity: {
      prompt: "Qual frase descreve o progresso atual?",
      image: ICB1.A8S1,
      options: [
        "David has been drawing 5 chameleons.",
        "David has drawn 5 chameleons so far.",
        "David draws chameleons every day.",
      ],
      correctAnswer: "David has drawn 5 chameleons so far.",
      successTitle: "Correto",
      successMessage:
        "Usamos o Simple, has drawn, porque estamos contando o resultado parcial: 5 desenhos prontos.",
    },
  },
  {
    key: "quality-quantity-reading",
    component: "Exercise17",
    activity: {
      label: "Quality vs. Quantity",
      content: [
        `"In the Lingueto studio, David has been recording audios for six hours (Continuous - focus on the hard work). He has recorded 40 sentences so far (Simple - focus on the number). He has also been trying to find the perfect blue for the chameleon. He has tested ten different shades, but he still hasn't found the right one. He has been working hard, but he is happy with what he has achieved."`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "write-project-simple-continuous",
    component: "Exercise12",
    activity: {
      prompt: "Processo e resultado",
      instruction: "O Camaleão quer ver se você entendeu a diferença.",
      helperText:
        "Escreva 2 frases sobre o seu projeto atual: uma com Continuous para dizer há quanto tempo você está nele e outra com Simple para dizer algo específico que já terminou.",
      image: ICB1.A8S2,
      placeholder:
        "I've been working on my app for months. I've finished the login screen.",
      tipText:
        "Se tem número ou quantidade, vé de Simple. Se tem all day, for ou since destacando esforço, considere o Continuous.",
      minLength: 20,
      successTitle: "Correto",
      successMessage: "Ótimo! Você alternou entre processo e resultado.",
    },
  },
  {
    key: "mission-complete-conclusion",
    component: "Exercise17",
    activity: {
      label: "Missão Cumprida!",
      content: [
        `Você agora sabe alternar entre o processo e o resultado como um verdadeiro nativo.

Dica final:
Se tem número ou quantidade, vé de Simple.
Se tem "all day" ou "since", considere o Continuous!

Continue praticando essa diferença. Ela muda a intenção da frase.`,
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
