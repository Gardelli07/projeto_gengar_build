import { Exercise1 } from "../../../../exc/ex1";
import { Exercise2 } from "../../../../exc/ex2";
import { Exercise3 } from "../../../../exc/ex3";
import { Exercise4 } from "../../../../exc/ex4";
import { Exercise5 } from "../../../../exc/ex5";
import { Exercise6 } from "../../../../exc/ex6";
import { Exercise13 } from "../../../../exc/ex13";
import { Exercise14 } from "../../../../exc/ex14";
import { Exercise16 } from "../../../../exc/ex16";
import { Exercise17 } from "../../../../exc/ex17";
import { BUB1, Images } from "../../../../util/images";
import createBusinessLessonScreen from "./BusinessLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "sourcing-intro",
    component: Exercise17,
    activity: {
      label: "O Relógio da Logística: Lead Time vs. Turnaround",
      content: [
        `Quando negociamos produtos físicos (Sourcing), prazos são tudo. Nativos não perguntam "How many days to deliver?". Eles usam dois termos técnicos cruciais: Lead time é o tempo total desde o pedido até a entrega. Turnaround time é o tempo de giro ou de resposta para concluir uma etapa rápida, como aprovar uma amostra ou responder um e-mail.`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "logistics-match",
    component: Exercise1,
    activity: {
      prompt:
        "Conecte os termos logísticos em inglês com os seus significados no mundo real.",
      pairs: [
        { en: "Lead time", pt: "Tempo total desde o pedido até a entrega" },
        {
          en: "Turnaround time",
          pt: "Tempo rápido de resposta / conclusão de uma tarefa",
        },
      ],
      successTitle: "Correto",
      successMessage:
        "Lead time mede o processo completo; turnaround mede uma etapa rápida.",
    },
  },
  {
    key: "lead-time-correct",
    component: Exercise4,
    activity: {
      prompt:
        "O comprador quer saber quanto tempo leva do pedido à entrega nos EUA. Qual pergunta profissional ele fará?",
      image: BUB1.A13S10,
      wrongSentence: "Logistics",
      options: [
        "What is the delivery wait for a container?",
        "What is the lead time for a container?",
        "What is the turnaround time for a container?",
      ],
      correctAnswer: "What is the lead time for a container?",
      successTitle: "Correto",
      successMessage: "Para fabricação e entrega, usamos lead time.",
    },
  },
  {
    key: "compliance-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Ouça a palavra isolada e escolha a alternativa correta.",
      image: BUB1.A13S5,
      audioSource: require("../../../../../mp3/BU/B1/A13S5.mp3"),
      audioText: "Compliance.",
      audioDurationMs: 1100,
      answerOptions: ["Compliance", "Complain"],
      correctOption: "Compliance",
      successTitle: "Correto",
      feedbackMessage: "Compliance é conformidade com regras e exigências.",
    },
  },
  {
    key: "qa-tip",
    component: Exercise17,
    activity: {
      label: "Garantia de Qualidade e Exigências",
      content: [
        `Fornecedores internacionais precisam seguir as regras do comprador americano: Vendor Compliance. Para garantir que o produto passe no teste, usamos Quality Assurance (QA), que é a Garantia de Qualidade. Um fornecedor top de linha diz: "We have strict vendor compliance and absolute quality assurance".`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "compliance-complete",
    component: Exercise5,
    activity: {
      prompt:
        "O comprador exige materiais 100% naturais. Complete a frase para mostrar que você segue as regras técnicas dele.",
      image: BUB1.A13S5,
      sentenceStart: "To meet your vendor",
      sentenceEnd: "we guarantee our products are strictly organic.",
      options: ["compliance", "complaint"],
      correctAnswer: "compliance",
      successTitle: "Correto",
      successMessage: '"Vendor compliance" é conformidade do fornecedor.',
    },
  },
  {
    key: "compliance-spell",
    component: Exercise13,
    needsSpeech: true,
    activity: {
      prompt:
        "Organize as letras para formar a palavra essencial para dizer conformidade.",
      audioText: "Compliance",
      audioDurationMs: 1300,
      letters: ["P", "C", "L", "O", "I", "M", "N", "C", "E", "A"],
      correctWord: "COMPLIANCE",
      successTitle: "Correto",
      successMessage: "COMPLIANCE.",
    },
  },
  {
    key: "buyer-email-complete",
    component: Exercise2,
    activity: {
      prompt: "Leia o e-mail do comprador dos EUA e preencha as lacunas.",
      paragraphs: [
        [
          "We need a fast ",
          {
            id: "blank-1",
            options: ["turnaround", "lead"],
            answer: "turnaround",
          },
          " time on the sample approval. Also, regarding the main order, what is your production ",
          { id: "blank-2", options: ["turnaround", "lead"], answer: "lead" },
          " time? Finally, our vendor ",
          {
            id: "blank-3",
            options: ["compliance", "assurance"],
            answer: "compliance",
          },
          " policy forbids the use of chemicals.",
        ],
      ],
      successTitle: "Correto",
      successMessage: "Você separou turnaround, lead time e compliance.",
    },
  },
  {
    key: "coir-compliance-audio",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt:
        "Escute o fornecedor brasileiro respondendo às exigências. A afirmação escrita é verdadeira ou falsa?",
      image: BUB1.A13S10,
      audioSource: require("../../../../../mp3/BU/B1/A13S10.mp3"),
      audioText:
        "To maintain strict vendor compliance with your standards, we guarantee that we do NOT use latex in our coir plant liners. They are 100% natural. And our lead time is 45 days.",
      audioDurationMs: 9000,
      statement:
        "O fornecedor afirma que eles não usam látex nas mantas para as plantas, mantendo o produto natural.",
      options: ["true", "false"],
      correctAnswer: "true",
      successTitle: "Correto",
      feedbackMessage: 'Ele diz claramente "we do NOT use latex".',
    },
  },
  {
    key: "qa-order",
    component: Exercise6,
    activity: {
      prompt:
        "Clique nas palavras na ordem correta para garantir a qualidade total ao cliente.",
      words: ["guarantee", "quality", "we", "strict", "assurance"],
      correctOrder: ["we", "guarantee", "strict", "quality", "assurance"],
      successTitle: "Correto",
      successMessage: "We guarantee strict quality assurance.",
    },
  },
  {
    key: "supplier-speaking",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        "Você é o porta-voz do fornecedor brasileiro. Diga que seu lead time é de 30 dias, mencione vendor compliance e garanta quality assurance.",
      helperText:
        "Our lead time is 30 days. To follow your vendor compliance, we guarantee the highest level of quality assurance.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "Our lead time is 30 days. To follow your vendor compliance, we guarantee the highest level of quality assurance.",
      recordLabel: "Gravar Áudio",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você falou como fornecedor global.",
    },
  },
  {
    key: "sourcing-feedback",
    component: Exercise17,
    activity: {
      label: "Domínio Total da Cadeia de Suprimentos!",
      content: [
        `Que aula incrível! Você acaba de adicionar um arsenal logístico ao seu inglês. Falar em "Lead Time" e "Vendor Compliance" separa imediatamente os amadores dos verdadeiros players do mercado internacional. Compradores globais confiam em fornecedores que usam o vocabulário correto para proteger os negócios deles. Na próxima aula, faremos um Deep-Dive e colocaremos tudo isso em um grande cenário simulado finalizando o contrato!`,
      ],
      continueLabel: "Finalizar",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
