import { BUA1, Images } from "../../../../util/images";
import createBusinessLessonScreen from "./BusinessLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "closing-deal-intro",
    component: "Exercise17",
    activity: {
      label: "Sign here, please!",
      content: [
        `Depois de negociar, é hora de finalizar o acordo oficialmente. Hoje você vai aprender o vocabulário essencial para fechar contratos.

Dica de Nativo:
Para soar mais moderno e profissional, use "partnership" ao invés de apenas "contract". Empresas gostam de se sentir parceiras.`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "contract-audio",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Escute e escolha a alternativa correta.",
      image: BUA1.A19S2,
      audioSource: require("../../../../../mp3/BU/A1/A19S2.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Contract", "Contact"],
      correctOption: "Contract",
      successTitle: "Correto",
      feedbackMessage: '"Contract" significa contrato.',
    },
  },
  {
    key: "sign-partner-match",
    component: "Exercise15",
    activity: {
      prompt: "Clique na imagem e na palavra correta.",
      images: [
        { id: "sign-img", image: BUA1.A19S3p1 },
        { id: "partner-img", image: BUA1.A19S3p2 },
      ],
      words: [
        { id: "sign-word", label: "Sign" },
        { id: "partner-word", label: "Partner" },
      ],
      pairs: [
        { imageId: "sign-img", wordId: "sign-word" },
        { imageId: "partner-img", wordId: "partner-word" },
      ],
      successTitle: "Correto",
      successMessage: "Sign é assinar; partner é parceiro.",
    },
  },
  {
    key: "contract-vocab",
    component: "Exercise1",
    activity: {
      prompt: "Conecte as palavras com suas traduções.",
      pairs: [
        { en: "Sign", pt: "Assinar" },
        { en: "Contract", pt: "Contrato" },
        { en: "Please", pt: "Por favor" },
      ],
      successTitle: "Correto",
      successMessage: "Vocabulário essencial para fechar contratos.",
    },
  },
  {
    key: "sign-contract-complete",
    component: "Exercise2",
    activity: {
      prompt: "Complete a frase.",
      paragraphs: [
        [
          "Great deal! Please ",
          { id: "blank-1", options: ["sign", "sing"], answer: "sign" },
          " the ",
          {
            id: "blank-2",
            options: ["contract", "contact"],
            answer: "contract",
          },
          ".",
        ],
      ],
      successTitle: "Correto",
      successMessage: "Please sign the contract.",
    },
  },
  {
    key: "sign-signature-tip",
    component: "Exercise17",
    activity: {
      label: "Sign vs. Signature",
      content: [
        'Sign = verbo (assinar)\nSignature = substantivo (assinatura)\n\nExemplo: "Please sign the document."',
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "please-sign-correct",
    component: "Exercise4",
    activity: {
      prompt: "Escolha a forma correta.",
      image: BUA1.A19S7,
      wrongSentence: "Signature",
      options: [
        "Please signature the contract.",
        "Please sign the contract.",
        "Please signing the contract.",
      ],
      correctAnswer: "Please sign the contract.",
      successTitle: "Correto",
      successMessage: '"Sign" é o verbo correto nessa frase.',
    },
  },
  {
    key: "please-sign-order",
    component: "Exercise18",
    activity: {
      prompt: "Organize a frase.",
      scrambledSentence: "contract / Please / the / sign",
      correctAnswer: "Please sign the contract",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "Please sign the contract.",
    },
  },
  {
    key: "sign-contract-audio",
    component: "Exercise16",
    activity: {
      prompt: "Speaking",
      instruction: 'Grave um áudio dizendo: "Please sign the contract."',
      helperText: "Please sign the contract.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Please sign the contract.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Seu fechamento de contrato foi gravado.",
    },
  },
  {
    key: "closing-deal-feedback",
    component: "Exercise17",
    activity: {
      label: "Contract signed!",
      content: [
        "Parabéns! Você concluiu o módulo de negociações com sucesso. Agora você consegue negociar, recusar e fechar acordos em inglês com confiança.",
      ],
      continueLabel: "Finalizar",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
