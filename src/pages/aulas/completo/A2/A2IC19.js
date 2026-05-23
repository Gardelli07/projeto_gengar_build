import createA2LessonScreen from "./A2LessonScreen";
import { ICA2 } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic19s1",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 2 • AULA 19",
      content: [
        "/blue{Did you see it?}",
        "/blue{Construindo Perguntas!}",
        "Para criar uma pergunta no passado, a receita é simples:",
        "DID + PESSOA + AÇÃO no presente.",
        "Did you go?",
        "Did she have?",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic19s2",
    component: "Exercise18",
    activity: {
      prompt: "Olhe as peças e digite a pergunta completa:",
      scrambledSentence: "did / you / go / park / the / to / ?",
      correctAnswer: "Did you go to the park?",
      placeholder: "Digite a pergunta",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "Did you go to the park?",
    },
  },
  {
    key: "a2ic19s3",
    component: "Exercise18",
    activity: {
      prompt: "Agora, pergunte sobre o café da manhã:",
      scrambledSentence: "she / have / Did / breakfast / ?",
      correctAnswer: "Did she have breakfast?",
      placeholder: "Digite a pergunta",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "Did she have breakfast?",
    },
  },
  {
    key: "a2ic19s4",
    component: "Exercise18",
    activity: {
      prompt: "Vamos perguntar sobre o filme:",
      scrambledSentence: "watch / the / Did / movie / they / ?",
      correctAnswer: "Did they watch the movie?",
      placeholder: "Digite a pergunta",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "Did they watch the movie?",
    },
  },
  {
    key: "a2ic19s5",
    component: "Exercise19",
    needsSpeech: true,
    activity: {
      prompt: "Escute a pergunta e digite exatamente o que foi dito:",
      audioSource: require("../../../../../mp3/IC/A2/A19S5.mp3"),
      correctAnswer: "Did you buy the tickets?",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "Você escreveu a pergunta corretamente.",
      errorMessage: "Confira: Did you buy the tickets?",
    },
  },
  {
    key: "a2ic19s6",
    component: "Exercise19",
    needsSpeech: true,
    activity: {
      prompt: "Escute com atenção e digite a frase inteira:",
      audioSource: require("../../../../../mp3/IC/A2/A19S6.mp3"),
      correctAnswer: "Did you like the party last night?",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "Você escreveu a pergunta completa.",
      errorMessage: "Confira: Did you like the party last night?",
    },
  },
  {
    key: "a2ic19s7",
    component: "Exercise6",
    activity: {
      prompt: "Organize a estrutura da pergunta:",
      words: ["Did", "you", "find", "your", "wallet", "?"],
      correctOrder: ["Did", "you", "find", "your", "wallet", "?"],
      successTitle: "Correto",
      successMessage: "Did you find your wallet?",
    },
  },
  {
    key: "a2ic19s8",
    component: "Exercise12",
    activity: {
      prompt: "Escrita criativa",
      instruction: "Crie uma pergunta para o Camaleão usando GO ou SEE.",
      helperText: "Exemplo: Did you go home? / Did you see the sun?",
      placeholder: "Digite sua pergunta aqui",
      tipText: "Comece com Did e use o verbo no presente.",
      successTitle: "Muito bem!",
      successMessage: "Você criou uma pergunta no passado.",
    },
  },
  {
    key: "a2ic19s9",
    component: "Exercise17",
    activity: {
      label: "Final",
      content: [
        "/blue{Você é um Arquiteto de Inglês!}",
        "Montar frases completas leva à fluência. Você aprendeu a usar DID para abrir perguntas no passado.",
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
