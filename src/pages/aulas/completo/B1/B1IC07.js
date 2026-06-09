import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "email-tone-intro",
    component: "Exercise17",
    activity: {
      label: "Acerte o Tom",
      content: [
        `A escolha da saudação define o respeito e a proximidade no mundo tech.

/blue{Formal}
Clientes novos / Diretores
Saudação: Dear Mr. Smith,
Fechamento: Sincerely,

/blue{Semi-formal}
Colegas / Parceiros recorrentes
Saudação: Hi David, ou Hello Team,
Fechamento: Best regards, ou Thanks,

/blue{Dica do Camaleão}
Se você não sabe o nome da pessoa, use o cargo: Dear Hiring Manager.
Nunca use "Yo" ou "Hey" para quem você quer que te contrate!`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "semi-formal-email",
    component: "Exercise4",
    activity: {
      prompt: "Escolha a melhor análise do e-mail",
      image: ICB1.A8S8,
      wrongSentence:
        "Hi Alex, thanks for the meeting earlier. I've sent the files you requested. Kind regards, David.",
      options: [
        'The email is semi-formal because it uses a first name and "Kind regards".',
        "The email is strictly formal because of the technical language.",
      ],
      correctAnswer:
        'The email is semi-formal because it uses a first name and "Kind regards".',
      successTitle: "Correto",
      successMessage:
        "Nome próprio + Kind regards cria um tom semi-formal e profissional.",
    },
  },
  {
    key: "investor-email-blanks",
    component: "Exercise2",
    activity: {
      prompt: "Complete o e-mail para um novo investidor",
      paragraphs: [
        [
          { id: "b1", answer: "Dear", options: ["Dear", "Hi"] },
          "Mr. Anderson, I am writing",
        ],
        [
          { id: "b2", answer: "regarding", options: ["regarding", "with"] },
          "the new update on the Lingueto app.",
        ],
        [
          "Please find the roadmap",
          { id: "b3", answer: "attached", options: ["inside", "attached"] },
          "to this email. Sincerely, Kaique.",
        ],
      ],
      successTitle: "Correto",
      successMessage: "Para um investidor novo: Dear / regarding / attached.",
    },
  },
  {
    key: "sincerely-close-teammate",
    component: "Exercise20",
    activity: {
      prompt: "Verdadeiro ou falso?",
      image: ICB1.A9S1,
      dialogue:
        'You should use "Sincerely" when closing an email to a close teammate.',
      options: ["True", "False"],
      correctAnswer: "False",
      successTitle: "Correto",
      successMessage:
        '"Sincerely" É muito formal para colegas próximos. Use "Thanks" ou "Best".',
    },
  },
  {
    key: "order-attached",
    component: "Exercise6",
    activity: {
      prompt: "Monte a frase para avisar que você está enviando um anexo:",
      words: ["Please", "find", "the", "presentation", "attached", "."],
      correctOrder: ["Please", "find", "the", "presentation", "attached", "."],
      successTitle: "Correto",
      successMessage: "Please find the presentation attached.",
    },
  },
  {
    key: "not-email-closing",
    component: "Exercise8",
    activity: {
      prompt: "Qual destas palavras NÃO é um fechamento de e-mail?",
      image: ICB1.A9S2,
      options: ["Sincerely,", "Best regards,", "Attachment", "Thanks,"],
      correctAnswer: "Attachment",
      successTitle: "Correto",
      successMessage: "Attachment significa anexo, não fechamento de e-mail.",
    },
  },
  {
    key: "send-email-dialogue",
    component: "Exercise2",
    activity: {
      prompt: "Complete a conversa",
      paragraphs: [
        [
          'David: "Not',
          { id: "b1", answer: "yet", options: ["yet", "attach", "already"] },
          ". I'm checking the spelling.\"",
        ],
        [
          "Sarah: \"Don't forget to",
          { id: "b2", answer: "attach", options: ["attach", "yet", "inquire"] },
          'the PDF file!"',
        ],
      ],
      successTitle: "Correto",
      successMessage: "A sequência correta é: yet / attach.",
    },
  },
  {
    key: "spell-inquire",
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt:
        'Desembaralhe a palavra usada para "perguntar" ou "saber" sobre algo formalmente:',
      audioSource: require("../../../../../mp3/IC/B1/A7S7.mp3"),
      audioDurationMs: 1000,
      letters: ["I", "N", "Q", "U", "I", "R", "E"],
      correctWord: "INQUIRE",
      successTitle: "Correto",
      successMessage: 'A palavra ? "INQUIRE".',
    },
  },
  {
    key: "professional-touch",
    component: "Exercise17",
    activity: {
      label: "The Professional Touch",
      content: [
        `"David is writing an important email. He starts with 'Dear Ms. Garcia' because he doesn't know her well. He writes: 'I am writing to inquire about the partnership'. He attaches the Lingueto project to the message. He ends the email with 'Sincerely' and his full name. David knows that a good email can open many doors in the tech world!"`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "write-investor-email",
    component: "Exercise12",
    activity: {
      prompt: "O Camaleão te desafia!",
      instruction:
        "Você é o desenvolvedor do Lingueto. Escreva um e-mail para Mr. Anderson pedindo uma reunião.",
      helperText:
        'Inclua saudação formal, "I am writing to inquire about your availability for a meeting.", menão ao anexo, fechamento formal e assinatura.',
      image: ICB1.A9S3,
      placeholder:
        "Dear Mr. Anderson,\nI am writing to inquire about your availability for a meeting. Please find the project overview attached.\nSincerely,\nKaique",
      tipText: "Para tom formal, use Dear, attached e Sincerely.",
      minLength: 40,
      successTitle: "Correto",
      successMessage: "Ótimo! Seu e-mail está com tom profissional.",
    },
  },
  {
    key: "inbox-zero",
    component: "Exercise17",
    activity: {
      label: "Inbox Zero!",
      content: [
        `Você aprendeu a transitar entre o formal e o semi-formal.

Recapitulando:
Dear / Sincerely = Formal.
Hi / Regards = Semi-formal.

Agora é só apertar o "Send"!

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
