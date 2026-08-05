import { BUB1, Images } from "../../../../util/images";
import createBusinessLessonScreen from "./BusinessLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "intro",
    component: "Exercise17",
    activity: {
      label: "Abertura Formal: Referenciando a Reunião",
      content: [
        `O e-mail de resumo pós-reunião é um documento oficial. Nativos no mundo corporativo não começam dizendo "About our meeting...". Eles usam o formato executivo: "As discussed," (Conforme discutido,). Para apresentar tarefas e decisões, a expressão formal é: "Please find outlined below..."`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "match",
    component: "Exercise1",
    activity: {
      prompt:
        "Conecte as expressões de escrita corporativa com as suas traduções em português.",
      pairs: [
        { en: "As discussed", pt: "Conforme discutido" },
        {
          en: "Please find outlined below",
          pt: "Por favor, encontre delineado abaixo",
        },
      ],
      successTitle: "Correto",
      successMessage: "Essas expressões dão peso executivo ao e-mail.",
    },
  },
  {
    key: "correct",
    component: "Exercise4",
    activity: {
      prompt:
        "Você precisa apresentar as decisões da reunião no e-mail. Qual frase está correta?",
      image: BUB1.A18S4,
      wrongSentence: "Follow-up email",
      options: [
        "Please find outlined below the action items.",
        "Please find line below the action items.",
        "Please look outlined below the action items.",
      ],
      correctAnswer: "Please find outlined below the action items.",
      successTitle: "Correto",
      successMessage: "Essa é a estrutura formal correta.",
    },
  },
  {
    key: "pending-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Ouça a palavra isolada e escolha a alternativa correta.",
      image: BUB1.A18S5,
      audioSource: require("../../../../../mp3/BU/B1/A18S5.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Pending", "Ending"],
      correctOption: "Pending",
      successTitle: "Correto",
      feedbackMessage: '"Pending" significa aguardando ou dependendo de.',
    },
  },
  {
    key: "pending-tip",
    component: "Exercise17",
    activity: {
      label: "Condições e Próximos Passos",
      content: [
        `Se você precisa que o chefe diga "Sim" para a equipe começar, não escreva "Waiting for you to say yes". Escreva: "Pending your approval..." (Aguardando sua aprovação...). Para ditar o ritmo do projeto, use: "Moving forward," (Daqui para frente / Avançando).`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "pending-complete",
    component: "Exercise5",
    activity: {
      prompt: "O cronograma está parado esperando o Diretor dar o OK final.",
      sentenceStart: "We will begin writing the software code,",
      sentenceEnd: "your approval of the final budget.",
      options: ["pending", "sending"],
      correctAnswer: "pending",
      successTitle: "Correto",
      successMessage: '"Pending your approval" é formal e claro.',
    },
  },
  {
    key: "approval-spell",
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt: 'Organize as letras para formar "Aprovação".',
      audioSource: require("../../../../../mp3/BU/B1/A18S8.mp3"),
      audioDurationMs: 1200,
      letters: ["P", "R", "P", "O", "V", "A", "L", "A"],
      correctWord: "APPROVAL",
      successTitle: "Correto",
      successMessage: "APPROVAL.",
    },
  },
  {
    key: "email-complete",
    component: "Exercise2",
    activity: {
      prompt:
        "Leia a mensagem e preencha as lacunas com as expressões corretas.",
      paragraphs: [
        [
          "Dear Team, ",
          { id: "b1", options: ["As", "Has"], answer: "As" },
          " discussed today, we are changing the logistics provider. Please find ",
          { id: "b2", options: ["outlined", "outside"], answer: "outlined" },
          " below the new deadlines. ",
          { id: "b3", options: ["Looking", "Moving"], answer: "Moving" },
          " forward, all deliveries must be registered. This new rule is ",
          { id: "b4", options: ["pending", "ending"], answer: "pending" },
          " the CEO's approval.",
        ],
      ],
      successTitle: "Correto",
      successMessage: "Você montou um follow-up executivo completo.",
    },
  },
  {
    key: "dictation-audio",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt:
        "Escute o gerente ditando um e-mail. A afirmação é verdadeira ou falsa?",
      image: BUB1.A18S10,
      audioSource: require("../../../../../mp3/BU/B1/A18S10.mp3"),
      audioDurationMs: 9000,
      statement:
        "O e-mail diz que a equipe de marketing vai focar nas redes sociais daqui para frente.",
      options: ["true", "false"],
      correctAnswer: "true",
      successTitle: "Correto",
      feedbackMessage:
        "Moving forward, the marketing team will focus on social media.",
    },
  },
  {
    key: "typing",
    component: "Exercise18",
    activity: {
      prompt:
        "Organize as palavras abaixo e escreva a frase correta para iniciar a conclusão do seu e-mail.",
      words: ["forward", "moving", ",", "we", "budget", "need", "the"],
      correctAnswer: "Moving forward, we need the budget.",
      submitLabel: "Enviar",
      successTitle: "Correto",
      successMessage: "Moving forward, we need the budget.",
    },
  },
  {
    key: "speaking",
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction:
        'Mande um áudio resumindo o e-mail: use "As discussed in the meeting", "Please find outlined below the deliverables" e "Moving forward, we are pending your approval".',
      helperText:
        "As discussed in the meeting, please find outlined below the deliverables. Moving forward, we are pending your approval.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "As discussed in the meeting, please find outlined below the deliverables. Moving forward, we are pending your approval.",
      recordLabel: "Gravar Áudio",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você soou como e-mail executivo em voz alta.",
    },
  },
  {
    key: "feedback",
    component: "Exercise17",
    activity: {
      label: "Escrita de Alto Impacto!",
      content: [
        `Fantástico! Ao usar "As discussed", "Outlined below", "Moving forward" e "Pending your approval", o seu e-mail ganha peso de documento oficial e demonstra profissionalismo. Na próxima aula, vamos aprender a fazer cobranças de tarefas com Feedback Loops e Status Reports.`,
      ],
      continueLabel: "Finalizar",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
