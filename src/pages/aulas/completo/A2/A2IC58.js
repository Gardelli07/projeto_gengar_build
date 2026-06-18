import createA2LessonScreen from "./A2LessonScreen";
import { ICA2 } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "a2ic58s1",
    component: "Exercise17",
    activity: {
      label: "MÓDULO 8 • AULA 58",
      content: [
        "/blue{OTC}",
        "/blue{OTC ou Prescription?}",
        "Na farmácia, os remédios são divididos em over-the-counter (OTC) e prescription.",
        "OTC são remédios sem receita. Prescription é a receita médica para remédios controlados.",
        "Para comprimidos, dizemos take medicine, não drink medicine.",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic58s2",
    component: "Exercise14",
    activity: {
      prompt: "Ouça o pedido na farmácia.",
      image: ICA2.A58S2,
      audioSource: require("../../../../../mp3/IC/A2/A58S2.mp3"),
      options: [
        "I need some over-the-counter painkillers, please.",
        "I need some prescription headphones, please.",
      ],
      correctAnswer: "I need some over-the-counter painkillers, please.",
      feedbackMessage:
        "Correto: painkillers são analgésicos, e over-the-counter indica que podem ser comprados sem receita.",
    },
  },
  {
    key: "a2ic58s3",
    component: "Exercise14",
    activity: {
      prompt: "Ouça a explicação do farmacêutico.",
      image: ICA2.A58S3,
      audioSource: require("../../../../../mp3/IC/A2/A58S3.mp3"),
      options: [
        "Sorry, you need a prescription for this antibiotic.",
        "Sorry, you need a charger for this antibiotic.",
      ],
      correctAnswer: "Sorry, you need a prescription for this antibiotic.",
      feedbackMessage:
        "Muito bem: prescription é receita médica. Para antibióticos, normalmente ela é obrigatória.",
    },
  },
  {
    key: "a2ic58s4",
    component: "Exercise8",
    activity: {
      prompt: "Qual destes itens NÃO pertence a uma farmácia?",
      image: ICA2.A58S4,
      options: ["Prescription", "Pills", "Headphones", "Syrup"],
      correctAnswer: "Headphones",
      successMessage:
        "Exato: headphones são fones de ouvido. Prescription, pills e syrup pertencem ao contexto de farmácia.",
    },
  },
  {
    key: "a2ic58s5",
    component: "Exercise14",
    activity: {
      prompt: "Ouça o sintoma.",
      image: ICA2.A58S5,
      audioSource: require("../../../../../mp3/IC/A2/A58S5.mp3"),
      options: [
        "I have a terrible headache today.",
        "I have a terrible stomach today.",
      ],
      correctAnswer: "I have a terrible headache today.",
      feedbackMessage:
        "Boa escuta: headache significa dor de cabeça. I have a terrible headache descreve um sintoma forte.",
    },
  },
  {
    key: "a2ic58s6",
    component: "Exercise14",
    activity: {
      prompt: "Ouça o remédio líquido.",
      image: ICA2.A58S6,
      audioSource: require("../../../../../mp3/IC/A2/A58S6.mp3"),
      options: [
        "This cough syrup tastes like cherry.",
        "This cough pill tastes like cherry.",
      ],
      correctAnswer: "This cough syrup tastes like cherry.",
      feedbackMessage:
        "Isso mesmo: cough syrup é xarope para tosse, um remédio líquido.",
    },
  },
  {
    key: "a2ic58s7",
    component: "Exercise14",
    activity: {
      prompt: "Ouça sobre antibióticos.",
      image: ICA2.A58S7,
      audioSource: require("../../../../../mp3/IC/A2/A58S7.mp3"),
      options: [
        "The doctor gave me antibiotics for the infection.",
        "The doctor gave me painkillers for the screen.",
      ],
      correctAnswer: "The doctor gave me antibiotics for the infection.",
      feedbackMessage:
        "Correto: antibiotics são usados para infecções e normalmente exigem prescription.",
    },
  },
  {
    key: "a2ic58s8",
    component: "Exercise14",
    activity: {
      prompt: "Ouça e escolha.",
      image: ICA2.A58S8,
      audioSource: require("../../../../../mp3/IC/A2/A58S8.mp3"),
      options: ["painkillers", "penkillers"],
      correctAnswer: "painkillers",
      feedbackMessage:
        "Perfeito: painkillers junta pain e killers, ou seja, remédios para aliviar dor.",
    },
  },
  {
    key: "a2ic58s9",
    component: "Exercise14",
    activity: {
      prompt: "Ouça sobre OTC.",
      image: ICA2.A58S9,
      audioSource: require("../../../../../mp3/IC/A2/A58S9.mp3"),
      options: ["You don't need a prescription.", "You need a prescription."],
      correctAnswer: "You don't need a prescription.",
      feedbackMessage:
        "Muito bem: OTC significa over-the-counter, remédio que você compra sem prescription.",
    },
  },
  {
    key: "a2ic58s10",
    component: "Exercise14",
    activity: {
      prompt: "Ouça sobre receita médica.",
      image: ICA2.A58S10,
      audioSource: require("../../../../../mp3/IC/A2/A58S10.mp3"),
      options: [
        "Wait, I need to see your prescription first",
        "Wait, I need to see your recipe first.",
      ],
      correctAnswer: "Wait, I need to see your prescription first",
      feedbackMessage:
        "Isso mesmo: para remédio, use prescription. Recipe é receita de comida.",
    },
  },
  {
    key: "a2ic58s11",
    component: "Exercise1",
    activity: {
      prompt: "Relacione o item ao contexto:",
      pairs: [
        { en: "Headache", pt: "Needs a painkiller" },
        { en: "Bad cough", pt: "Needs cough syrup" },
        { en: "Infection", pt: "Needs a prescription" },
        { en: "OTC", pt: "No doctor's note needed" },
      ],
      successMessage:
        "Muito bem: headache combina com painkiller, cough com syrup, infection com prescription e OTC com sem receita.",
    },
  },
  {
    key: "a2ic58s12",
    component: "Exercise1",
    activity: {
      prompt: "Ligue o problema ao que você precisa pedir:",
      pairs: [
        { en: "Bad cough", pt: "Cough Syrup" },
        { en: "Infection", pt: "Prescription / Antibiotics" },
        { en: "Headache", pt: "OTC Painkillers" },
      ],
      successMessage:
        "Correto: tosse pede cough syrup, infecção costuma pedir prescription/antibiotics, e dor de cabeça pode usar OTC painkillers.",
    },
  },
  {
    key: "a2ic58s13",
    component: "Exercise6",
    activity: {
      prompt: "Você tem uma receita para este remédio?",
      words: ["Do you", "have", "a prescription", "for this", "medicine", "?"],
      correctOrder: [
        "Do you",
        "have",
        "a prescription",
        "for this",
        "medicine",
        "?",
      ],
      correctAnswer: "Do you have a prescription for this medicine?",
      successMessage:
        "Pergunta correta: Do you have a prescription for this medicine? é essencial quando o remédio pode exigir receita.",
    },
  },
  {
    key: "a2ic58s14",
    component: "Exercise5",
    activity: {
      prompt: "David está com resfriado.",
      sentenceStart: "I have a bad cold. Can I get some",
      sentenceEnd: "medicine?",
      options: ["OTC", "bad"],
      correctAnswer: "OTC",
      successMessage:
        "Isso mesmo: OTC medicine é remédio sem receita, uma boa opção para sintomas comuns como resfriado.",
    },
  },
  {
    key: "a2ic58s15",
    component: "Exercise3",
    activity: {
      prompt: "Responda verdadeiro ou falso.",
      image: ICA2.A58S15,
      audioSource: require("../../../../../mp3/IC/A2/A58S15.mp3"),
      textOnScreen:
        "You can buy prescription medicine without a doctor's note.",
      options: ["true", "false"],
      correctAnswer: "false",
      successMessage:
        "Correto: prescription medicine exige receita médica ou autorização do médico.",
      feedbackMessage:
        "Prescription indica que a receita médica é obrigatória; não é remédio de balcão.",
    },
  },
  {
    key: "a2ic58s16",
    component: "Exercise5",
    activity: {
      prompt: "David está lendo as instruções da caixa de comprimidos.",
      sentenceStart: "Take two",
      sentenceEnd: "every 8 hours with water.",
      options: ["OTC", "pills"],
      correctAnswer: "pills",
      successMessage:
        "Certo: Take two pills every 8 hours. Para comprimidos, usamos take, não drink.",
    },
  },
  {
    key: "a2ic58s17",
    component: "Exercise17",
    activity: {
      label: "David's Prescription",
      content: [
        "David is still feeling sick. He has a fever and his back hurts. He goes to the pharmacy with a prescription from his doctor.",
        "The pharmacist looks at the paper and says: 'I have your medicine, but you also need some painkillers for your back. Those are over-the-counter'.",
        "David buys the pills and a cough syrup. He wants to be 100% healthy again!",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "a2ic58s18",
    component: "Exercise12",
    activity: {
      prompt: "Imagine que você está em uma farmácia em Londres.",
      instruction:
        "Escreva um pequeno diálogo com 3 frases pedindo um remédio para stomachache que seja over-the-counter.",
      tipText:
        "Hello! Do you have medicine for a stomachache? Is it over-the-counter? Thank you.",
      successMessage:
        "Muito bem: seu diálogo usa linguagem de farmácia para pedir um remédio OTC para stomachache.",
    },
  },
  {
    key: "a2ic58s19",
    component: "Exercise17",
    activity: {
      label: "Final",
      content: [
        "/blue{Farmácia sob Controle!}",
        "Agora você sabe a diferença entre OTC e prescription.",
        "OTC = sem receita. Prescription = com receita. Pills e syrup são formas de remédio.",
      ],
      continueLabel: "Concluir",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
