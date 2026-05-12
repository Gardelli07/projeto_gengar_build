import { Exercise1 } from "../../../../exc/ex1";
import { Exercise2 } from "../../../../exc/ex2";
import { Exercise4 } from "../../../../exc/ex4";
import { Exercise5 } from "../../../../exc/ex5";
import { Exercise12 } from "../../../../exc/ex12";
import { Exercise13 } from "../../../../exc/ex13";
import { Exercise14 } from "../../../../exc/ex14";
import { Exercise17 } from "../../../../exc/ex17";
import { BUA1 } from "../../../../util/images";
import createBusinessLessonScreen from "./BusinessLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "professional-emails-intro",
    component: Exercise17,
    activity: {
      label: "You've got mail!",
      content: [
        `A comunicação escrita é vital. Hoje vamos desvendar os segredos de começar e terminar um e-mail profissional, além da frase de negócios mais usada no mundo todo.

Dica de Nativo:
"Dear" é muito formal. Hoje em dia, a maioria dos e-mails começa com "Hi [Nome]" ou "Hello [Nome]". Use "Dear" apenas em contextos muito formais ou quando não souber o nome da pessoa.`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "attached-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute a palavra e escolha a alternativa correta.",
      image: BUA1.A9S2,
      audioSource: require("../../../../../mp3/BU/A1/A9S2.mp3"),
      audioText: "Attached",
      audioDurationMs: 1000,
      answerOptions: ["Attached", "Attack"],
      correctOption: "Attached",
      successTitle: "Correto",
      feedbackMessage: '"Attached" significa anexado.',
    },
  },
  {
    key: "email-parts-match",
    component: Exercise1,
    activity: {
      prompt: "Conecte as partes do e-mail com suas traduções.",
      pairs: [
        { en: "Dear John", pt: "Prezado John" },
        { en: "Please find attached", pt: "Segue em anexo" },
        { en: "Best regards", pt: "Atenciosamente" },
      ],
      successTitle: "Correto",
      successMessage: "Essas expressões deixam seu e-mail profissional.",
    },
  },
  {
    key: "email-complete",
    component: Exercise2,
    activity: {
      prompt: "Complete o texto do e-mail com as alternativas.",
      paragraphs: [
        [
          "Hello team, please find ",
          { id: "blank-1", options: ["attached", "attach"], answer: "attached" },
          " the new report. ",
          { id: "blank-2", options: ["Best", "Good"], answer: "Best" },
          " regards, Mark.",
        ],
      ],
      successTitle: "Correto",
      successMessage: 'Use "attached" e "Best regards".',
    },
  },
  {
    key: "read-document",
    component: Exercise5,
    activity: {
      prompt: "Complete a frase.",
      image: BUA1.A9S7,
      sentenceStart: "Please",
      sentenceEnd: "the document attached.",
      options: ["read", "reading"],
      correctAnswer: "read",
      successTitle: "Correto",
      successMessage: 'Depois de "please", usamos o verbo base: read.',
    },
  },
  {
    key: "attached-tip",
    component: Exercise17,
    activity: {
      label: "O Rei dos E-mails",
      content: [
        'A frase "Please find attached" é o padrão ouro corporativo. Significa "por favor, veja em anexo". Use sempre que enviar arquivos. Nunca envie um anexo sem mencionar isso no e-mail!',
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "professional-attachment-correct",
    component: Exercise4,
    activity: {
      prompt: "Qual é a forma profissional de enviar um arquivo?",
      image: BUA1.A9S2,
      wrongSentence: "Attachment",
      options: [
        "The document is attached.",
        "Please find attached the document.",
        "Look the document attached.",
      ],
      correctAnswer: "Please find attached the document.",
      successTitle: "Correto",
      successMessage: '"Please find attached the document" é formal e profissional.',
    },
  },
  {
    key: "spell-email",
    component: Exercise13,
    needsSpeech: true,
    activity: {
      prompt: "As letras estão bagunçadas! Escreva a palavra na ordem correta.",
      audioText: "Email",
      audioDurationMs: 900,
      letters: ["E", "M", "I", "A", "L"],
      correctWord: "EMAIL",
      successTitle: "Correto",
      successMessage: "EMAIL.",
    },
  },
  {
    key: "email-writing",
    component: Exercise12,
    activity: {
      prompt: "Writing",
      instruction:
        "Escreva um e-mail simples: cumprimente, peça para ver o anexo e finalize educadamente.",
      placeholder: "Hello, please find attached the document. Best regards.",
      helperText: 'Use "Hello", "please find attached" e "Best regards".',
      submitLabel: "Enviar",
      successTitle: "Correto",
      successMessage: "Seu e-mail profissional ficou pronto.",
    },
  },
  {
    key: "email-feedback",
    component: Exercise17,
    activity: {
      label: "Message sent!",
      content: [
        "E-mail perfeito! Você já domina as estruturas essenciais para se comunicar de forma profissional e educada. Continue praticando!",
      ],
      continueLabel: "Finalizar",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
