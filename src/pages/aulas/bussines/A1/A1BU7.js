import { Exercise1 } from "../../../../exc/ex1";
import { Exercise2 } from "../../../../exc/ex2";
import { Exercise4 } from "../../../../exc/ex4";
import { Exercise5 } from "../../../../exc/ex5";
import { Exercise12 } from "../../../../exc/ex12";
import { Exercise14 } from "../../../../exc/ex14";
import { Exercise17 } from "../../../../exc/ex17";
import { Exercise18 } from "../../../../exc/ex18";
import { BUA1 } from "../../../../util/images";
import createBusinessLessonScreen from "./BusinessLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "updates-intro",
    component: Exercise17,
    activity: {
      label: "Good News or Bad News?",
      content: [
        `Em atualizações de projetos, precisamos ser diretos sobre o que está dando certo e o que precisa de atenção. Vamos aprender a dar notícias e falar dos próximos passos.

Dica de Nativo:
No mundo dos negócios, nativos adoram a palavra "Step". Quando terminam de apresentar algo, sempre perguntam: "What is the next step?". É uma frase de ouro!`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "news-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute a palavra e escolha a alternativa correta.",
      image: BUA1.A7S2,
      audioSource: require("../../../../../mp3/BU/A1/A7S2.mp3"),
      audioDurationMs: 900,
      answerOptions: ["News", "New"],
      correctOption: "News",
      successTitle: "Correto",
      feedbackMessage: '"News" é notícia.',
    },
  },
  {
    key: "news-match",
    component: Exercise1,
    activity: {
      prompt: "Conecte as expressões em inglês com suas traduções.",
      pairs: [
        { en: "Good news", pt: "Notícia boa" },
        { en: "Bad news", pt: "Notícia ruim" },
        { en: "Next step", pt: "Próximo passo" },
      ],
      successTitle: "Correto",
      successMessage: "Você já sabe falar de notícias e próximos passos.",
    },
  },
  {
    key: "good-news-step-complete",
    component: Exercise2,
    activity: {
      prompt: "Complete o texto com as alternativas.",
      paragraphs: [
        [
          "Hello team, I have good ",
          { id: "blank-1", options: ["news", "new"], answer: "news" },
          ". The project is ready. The next ",
          { id: "blank-2", options: ["step", "stop"], answer: "step" },
          " is to send the email.",
        ],
      ],
      successTitle: "Correto",
      successMessage: 'Diga "good news" e "next step".',
    },
  },
  {
    key: "next-step",
    component: Exercise5,
    activity: {
      prompt: "Complete a frase com a palavra correta.",
      sentenceStart: "What is the next",
      sentenceEnd: "?",
      options: ["step", "walk"],
      correctAnswer: "step",
      successTitle: "Correto",
      successMessage: "What is the next step?",
    },
  },
  {
    key: "news-singular-tip",
    component: Exercise17,
    activity: {
      label: "News: Singular ou Plural?",
      content: [
        `A palavra "News" termina com S, então é plural, certo? Errado! Em inglês, "News" é incontável e age como singular.

Nós dizemos:
"The news is good."

Nunca use:
"The news are good."

Esse detalhe separa alunos básicos de profissionais fluentes!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "good-news-correct",
    component: Exercise4,
    activity: {
      prompt: "Qual das frases abaixo está escrita corretamente?",
      image: BUA1.A7S7,
      wrongSentence: "News",
      options: ["I have a good news.", "I have good news.", "I have good new."],
      correctAnswer: "I have good news.",
      successTitle: "Correto",
      successMessage: '"News" não usa artigo: I have good news.',
    },
  },
  {
    key: "good-news-order",
    component: Exercise18,
    activity: {
      prompt: "As palavras estão bagunçadas. Digite a frase corretamente.",
      scrambledSentence: "news / have / I / good",
      correctAnswer: "I have good news",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "I have good news.",
    },
  },
  {
    key: "good-news-writing",
    component: Exercise12,
    activity: {
      prompt: "Writing",
      instruction:
        "Digite abaixo: Imagine que você terminou uma tarefa. Dê a boa notícia em inglês para seu chefe usando as palavras que aprendemos.",
      placeholder: "I have good news. The project is ready.",
      helperText: 'Use "I have good news" e fale o próximo passo se quiser.',
      submitLabel: "Enviar",
      successTitle: "Correto",
      successMessage: "Sua atualização profissional ficou clara.",
    },
  },
  {
    key: "update-feedback",
    component: Exercise17,
    activity: {
      label: "Update Complete!",
      content: [
        'Excelente atualização! Ser claro ao dar notícias e focar no "next step" mostra que você tem controle da situação. Vamos manter esse ritmo para as próximas aulas!',
      ],
      continueLabel: "Finalizar",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
