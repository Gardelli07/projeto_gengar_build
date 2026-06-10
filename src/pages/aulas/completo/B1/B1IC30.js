import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "processes-lead-in",
    component: "Exercise17",
    activity: {
      label: "Descrevendo Processos",
      content: [
        `Quando explicamos como algo é fabricado, como um celular, um carro ou um bolo, quem faz a ação não importa.

O foco é no objeto. Por isso, usamos a Voz Passiva.

/blue{Estrutura}
Objeto + verb to be + past participle

Exemplo:
The screen is attached.
A tela é conectada.`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "screen-warmup",
    component: "Exercise8",
    activity: {
      prompt: "O que é isso?",
      image: ICB1.A30S2,
      options: ["Smartphone screen", "Keyboard", "Coffee machine"],
      correctAnswer: "Smartphone screen",
      successTitle: "Correto",
      successMessage: "A imagem representa uma tela de smartphone.",
    },
  },
  {
    key: "motherboard-battery",
    component: "Exercise15",
    activity: {
      prompt: "Clique na imagem e na palavra que a descreve.",
      images: [
        { id: "motherboard-img", image: ICB1.A30S3p1 },
        { id: "battery-img", image: ICB1.A30S3p2 },
      ],
      words: [
        { id: "motherboard-word", label: "Motherboard" },
        { id: "battery-word", label: "Battery" },
      ],
      pairs: [
        { imageId: "motherboard-img", wordId: "motherboard-word" },
        { imageId: "battery-img", wordId: "battery-word" },
      ],
      successTitle: "Correto",
      successMessage: "Você identificou as peças do smartphone.",
    },
  },
  {
    key: "are-produced",
    component: "Exercise5",
    activity: {
      prompt: "Complete a frase com a opção correta.",
      sentenceStart: "First, the components",
      sentenceEnd: "in a factory in Asia.",
      options: ["are produced", "is produced"],
      correctAnswer: "are produced",
      successTitle: "Correto",
      successMessage:
        "Components está no plural, então usamos are produced.",
    },
  },
  {
    key: "smartphone-packed",
    component: "Exercise4",
    activity: {
      prompt: "Escolha a frase escrita corretamente.",
      image: ICB1.A30S2,
      wrongSentence: "Packaging process",
      options: [
        "The smartphone is pack carefully.",
        "The smartphone are packed carefully.",
        "The smartphone is packed carefully.",
      ],
      correctAnswer: "The smartphone is packed carefully.",
      successTitle: "Correto",
      successMessage:
        "Smartphone é singular, então usamos is packed.",
    },
  },
  {
    key: "participle-match",
    component: "Exercise1",
    activity: {
      prompt: "Conecte o particípio com sua tradução no contexto de fabricação.",
      pairs: [
        { en: "Attached", pt: "Conectado / Anexado" },
        { en: "Tested", pt: "Testado" },
        { en: "Shipped", pt: "Enviado / Transportado" },
      ],
      successTitle: "Excelente",
      successMessage: "Você conectou os particípios de fabricação.",
    },
  },
  {
    key: "smartphone-process",
    component: "Exercise7",
    activity: {
      prompt: "Coloque o processo de fabricação do smartphone na ordem correta.",
      options: [
        "First, the internal components are produced.",
        "Next, the screen is attached to the body.",
        "Finally, the smartphone is tested and shipped to stores.",
      ],
      correctOrder: [
        "First, the internal components are produced.",
        "Next, the screen is attached to the body.",
        "Finally, the smartphone is tested and shipped to stores.",
      ],
      successTitle: "Correto",
      successMessage: "Você organizou o processo de fabricação.",
    },
  },
  {
    key: "type-device-shipped",
    component: "Exercise18",
    activity: {
      prompt: "As palavras estão bagunçadas. Digite a frase corretamente.",
      scrambledSentence:
        "shipped / to / world / The / is / around / device / the",
      correctAnswer: "The device is shipped around the world.",
      placeholder: "Digite a frase",
      submitLabel: "Enviar",
      errorTitle: "Incorreto",
      successTitle: "Correto",
      successMessage: "A frase correta é: The device is shipped around the world.",
    },
  },
  {
    key: "write-cooking-process",
    component: "Exercise12",
    activity: {
      prompt: "Descreva um processo",
      instruction:
        "Descreva brevemente o processo de um prato que você sabe cozinhar.",
      helperText:
        'Use pelo menos uma frase na voz passiva. Ex: "The eggs are fried in butter."',
      image: ICB1.A30S5,
      placeholder:
        "The eggs are fried in butter. Then, the cheese is added.",
      tipText:
        "Use objeto + is/are + past participle.",
      minLength: 20,
      successTitle: "Correto",
      successMessage: "Ótimo! Você descreveu um processo com voz passiva.",
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
