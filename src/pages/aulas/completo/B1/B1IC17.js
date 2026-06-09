import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "yes-trap",
    component: "Exercise17",
    activity: {
      label: 'Avoid the "Yes" Trap!',
      content: [
        `No nível B1-B2, em reuniões ou conversas complexas, você não pode simplesmente balançar a cabeça e dizer "Yes" se não entendeu direito.

A habilidade mais valiosa aqui é o paraphrasing: repetir com suas próprias palavras para confirmar.

/blue{Native Tip}
Nunca pergunte "Do you understand?" para um nativo. Isso soa agressivo e superior.

Use:
"Does that make sense?"`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "clarify-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute a palavra-chave e escolha a alternativa correta.",
      image: ICB1.A18S2,
      audioSource: require("../../../../../mp3/IC/B1/A17S2.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Clarify", "Classify"],
      correctOption: "Clarify",
      successTitle: "Correto",
      feedbackMessage: '"Clarify" significa esclarecer.',
    },
  },
  {
    key: "understand-correctly",
    component: "Exercise4",
    activity: {
      prompt:
        "Como você confirma se entendeu o ponto da pessoa de forma formal e educadaí",
      image: ICB1.A18S3,
      wrongSentence: "Clarifying",
      options: [
        "If I understood you good, we need more time.",
        "If I understand correctly, we need more time.",
        "If I understanding exactly, we need more time.",
      ],
      correctAnswer: "If I understand correctly, we need more time.",
      successTitle: "Correto",
      successMessage:
        'A estrutura natural ? "If I understand correctly...".',
    },
  },
  {
    key: "vocabulary-sprint",
    component: "Exercise17",
    activity: {
      label: "Vocabulary Sprint!",
      content: [
        `Vamos aquecer seu vocabulário de negócios e conversação.

Na próxima tela, você terá 5 segundos para digitar termos essenciais para esclarecer ideias.

Atenção é ortografia!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "clarify-speed",
    component: "Exercise11",
    activity: {
      prompt: "Escreva rápido",
      secondsPerWord: 5,
      words: ["EXACTLY", "CLARIFY", "MEANING", "SENSE", "WORDS"],
      successTitle: "Correto",
      successMessage: "Você digitou termos essenciais de clarificação.",
    },
  },
  {
    key: "in-other-words",
    component: "Exercise17",
    activity: {
      label: "In other words...",
      content: [
        `Uma estrutura muito comum para parafrasear é dizer:

"So, what you're saying is..."

ou

"In other words..."

Isso mostra que você está prestando atenção e garante que não haverá falhas de comunicação.`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "listen-other-words",
    component: "Exercise19",
    needsSpeech: true,
    activity: {
      prompt: "Escute com atenção e digite exatamente o que ouvir.",
      audioSource: require("../../../../../mp3/IC/B1/A17S7.mp3"),
      audioDurationMs: 3600,
      correctAnswer: "So, in other words, the project is delayed.",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "Você escreveu a paráfrase corretamente.",
      errorMessage: "Ouça novamente e confira as vírgulas mentalmente.",
    },
  },
  {
    key: "type-make-sense",
    component: "Exercise18",
    activity: {
      prompt:
        "Digite a frase corretamente para checar se a pessoa está acompanhando.",
      scrambledSentence: "/ that / sense / far / make / so / Does / ? /",
      correctAnswer: "Does that make sense so far?",
      placeholder: "Digite a frase correta",
      submitLabel: "Enviar",
      errorTitle: "Incorreto",
      successTitle: "Correto",
      successMessage: "A frase correta é: Does that make sense so far?",
    },
  },
  {
    key: "write-budget-confirm",
    component: "Exercise12",
    activity: {
      prompt: "Confirme a informação",
      instruction:
        "Seu chefe falou por 5 minutos sobre reduzir custos. Você entendeu que o orçamento da sua equipe vai cair pela metade.",
      helperText:
        'Escreva uma frase começando com "If I understand correctly..."',
      image: ICB1.A18S5,
      placeholder:
        "If I understand correctly, our team's budget will be cut in half.",
      tipText:
        "Use essa estrutura para confirmar informação sem soar perdido.",
      minLength: 20,
      successTitle: "Correto",
      successMessage: "Ótimo! Você confirmou a informação com clareza.",
    },
  },
  {
    key: "audio-make-sense",
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction:
        "Você acabou de explicar uma ideia longa para um colega.",
      helperText:
        'Mande um áudio usando "Does that make sense?" e pergunte se ele quer que você repita ou esclareça algo.',
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "Does that make sense? Would you like me to repeat or clarify any part?",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Seu áudio de clarificação foi gravado.",
    },
  },
  {
    key: "clarifying-conclusion",
    component: "Exercise17",
    activity: {
      label: "Masterful communication!",
      content: [
        `Você aprendeu a arte de parafrasear e esclarecer ideias.

Isso separa quem apenas "fala inglês" de quem realmente "se comunica em inglês".

Brilliant job!`,
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
