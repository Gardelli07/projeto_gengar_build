import { Exercise1 } from "../../../../exc/ex1";
import { Exercise4 } from "../../../../exc/ex4";
import { Exercise5 } from "../../../../exc/ex5";
import { Exercise12 } from "../../../../exc/ex12";
import { Exercise13 } from "../../../../exc/ex13";
import { Exercise14 } from "../../../../exc/ex14";
import { Exercise17 } from "../../../../exc/ex17";
import { Exercise18 } from "../../../../exc/ex18";
import { BUA1 } from "../../../../util/images";
import createBusinessLessonScreen from "./BusinessLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "work-duties-intro",
    component: Exercise17,
    activity: {
      label: "What do you do?",
      content: [
        `Depois do aperto de mão, a próxima pergunta sempre é sobre o que você faz. Hoje vamos aprender a falar sobre o seu cargo e as suas responsabilidades diárias.

Dica de Nativo:
"What do you do?" é a forma natural de perguntar a profissão de alguém. Se você traduzir ao pé da letra vai achar que estão perguntando "o que você está fazendo agora", mas no mundo dos negócios, isso significa "qual é o seu trabalho?".`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "manager-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute a palavra e escolha a alternativa correta.",
      image: BUA1.A2S2,
      audioSource: require("../../../../../mp3/BU/A1/A2S2.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Manager", "Maker"],
      correctOption: "Manager",
      successTitle: "Correto",
      feedbackMessage: '"Manager" significa gerente.',
    },
  },
  {
    key: "i-am-developer",
    component: Exercise5,
    activity: {
      prompt: "Complete a frase com a palavra correta.",
      sentenceStart: "I",
      sentenceEnd: "a developer.",
      options: ["am", "are"],
      correctAnswer: "am",
      successTitle: "Correto",
      successMessage: 'Com "I", usamos "am".',
    },
  },
  {
    key: "jobs-match",
    component: Exercise1,
    activity: {
      prompt: "Conecte as palavras em inglês com suas traduções.",
      pairs: [
        { en: "Manager", pt: "Gerente" },
        { en: "Teacher", pt: "Professor" },
        { en: "Work", pt: "Trabalhar" },
      ],
      successTitle: "Correto",
      successMessage: "Vocabulário básico de trabalho dominado.",
    },
  },
  {
    key: "spell-work",
    component: Exercise13,
    needsSpeech: true,
    activity: {
      prompt: "As letras estão bagunçadas! Escreva a palavra na ordem correta.",
      audioText: "Work",
      audioDurationMs: 900,
      letters: ["W", "O", "K", "R"],
      correctWord: "WORK",
      successTitle: "Correto",
      successMessage: "WORK significa trabalhar.",
    },
  },
  {
    key: "work-as-for-tip",
    component: Exercise17,
    activity: {
      label: "I work AS a... vs I work FOR...",
      content: [
        `Cuidado com as preposições!

Use "work as a" para sua profissão:
I work as a manager.
Eu trabalho como gerente.

Use "work for" para a empresa:
I work for Lingueto.
Eu trabalho para o Lingueto.

Nunca diga "I work of manager", isso entrega na hora que você não é fluente!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "work-as-manager",
    component: Exercise4,
    activity: {
      prompt: "Qual das frases abaixo está escrita corretamente?",
      image: BUA1.A2S7,
      wrongSentence: "Job description",
      options: [
        "I work as a manager.",
        "I am work a manager.",
        "I work for a manager.",
      ],
      correctAnswer: "I work as a manager.",
      successTitle: "Correto",
      successMessage: '"Work as a" apresenta sua profissão.',
    },
  },
  {
    key: "work-for-lingueto",
    component: Exercise18,
    activity: {
      prompt: "As palavras estão bagunçadas. Digite a frase corretamente.",
      scrambledSentence: "for / I / Lingueto / work",
      correctAnswer: "I work for Lingueto",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "I work for Lingueto.",
    },
  },
  {
    key: "profession-writing",
    component: Exercise12,
    activity: {
      prompt: "Writing",
      instruction:
        "Digite abaixo: Qual é a sua profissão e para qual empresa você trabalha?",
      placeholder: "I work as a teacher. I work for...",
      helperText: 'Use "I work as a..." e "I work for...".',
      submitLabel: "Enviar",
      successTitle: "Correto",
      successMessage: "Agora você sabe falar da sua profissão.",
    },
  },
  {
    key: "duties-feedback",
    component: Exercise17,
    activity: {
      label: "You nailed it!",
      content: [
        'Muito bem! Agora você já consegue se apresentar e falar da sua profissão com segurança. Continue praticando essa estrutura mentalmente durante o dia: "I work as a... I work for...".',
      ],
      continueLabel: "Finalizar",
    },
  },
  {
    key: "lesson-finish",
    type: "finish",
  },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
