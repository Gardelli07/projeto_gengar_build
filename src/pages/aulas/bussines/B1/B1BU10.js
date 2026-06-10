import { Exercise1 } from "../../../../exc/ex1";
import { Exercise2 } from "../../../../exc/ex2";
import { Exercise3 } from "../../../../exc/ex3";
import { Exercise4 } from "../../../../exc/ex4";
import { Exercise5 } from "../../../../exc/ex5";
import { Exercise6 } from "../../../../exc/ex6";
import { Exercise13 } from "../../../../exc/ex13";
import { Exercise14 } from "../../../../exc/ex14";
import { Exercise15 } from "../../../../exc/ex15";
import { Exercise16 } from "../../../../exc/ex16";
import { Exercise17 } from "../../../../exc/ex17";
import { BUB1, Images } from "../../../../util/images";
import createBusinessLessonScreen from "./BusinessLessonTemplate";

const LESSON_SLIDES = [
  {
    key: "virtual-nuance-intro",
    component: Exercise17,
    activity: {
      label: "Superando Barreiras e Garantindo Alinhamento",
      content: [
        `Em equipes globais, uma palavra pode significar coisas diferentes para um americano e para um indiano. Por isso, líderes que trabalham remotamente não dizem apenas "Do you understand?". Eles assumem a responsabilidade pela clareza dizendo: "Let's ensure we're all aligned" (Vamos garantir que estamos todos alinhados/na mesma página). E quando há uma falha de comunicação ou diferença cultural evidente, eles dizem: "Just to bridge the gap here..." (Apenas para superar essa diferença / preencher essa lacuna aqui...). A palavra "bridge" (ponte) é usada como um verbo poderoso para conectar ideias!`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "global-communication-match",
    component: Exercise1,
    activity: {
      prompt:
        "Conecte as expressões de comunicação global com as suas traduções no português corporativo.",
      pairs: [
        {
          en: "Ensure we're all aligned",
          pt: "Garantir que estamos todos alinhados",
        },
        {
          en: "Bridge the gap",
          pt: "Preencher a lacuna / Superar a diferença",
        },
      ],
      successTitle: "Correto",
      successMessage: "Essas expressões alinham equipes multiculturais.",
    },
  },
  {
    key: "global-image-match",
    component: Exercise15,
    activity: {
      prompt: "Clique na imagem e na expressão exata que a descreve.",
      images: [
        { id: "aligned-img", image: BUB1.A10S3p1 },
        { id: "bridge-img", image: BUB1.A10S3p2 },
      ],
      words: [
        { id: "aligned-word", label: "Ensure we're all aligned" },
        { id: "bridge-word", label: "Bridge the gap" },
      ],
      pairs: [
        { imageId: "aligned-img", wordId: "aligned-word" },
        { imageId: "bridge-img", wordId: "bridge-word" },
      ],
      successTitle: "Correto",
      successMessage: "Aligned mostra encaixe; bridge conecta diferenças.",
    },
  },
  {
    key: "aligned-correct",
    component: Exercise4,
    activity: {
      prompt:
        "A ligação está ruim e o time parece confuso. Qual é a frase escrita corretamente?",
      image: BUB1.A10S4,
      wrongSentence: "Alignment",
      options: [
        "Let's ensure we're all aligned.",
        "Let's assure we're all in line.",
        "Let's ensure we're all align.",
      ],
      correctAnswer: "Let's ensure we're all aligned.",
      successTitle: "Correto",
      successMessage: 'Usamos o particípio "aligned" com -ED.',
    },
  },
  {
    key: "mindful-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Ouça a palavra isolada e escolha a alternativa correta.",
      image: BUB1.A10S4,
      audioSource: require("../../../../../mp3/BU/B1/A10S5.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Mindful", "Mindless"],
      correctOption: "Mindful",
      successTitle: "Correto",
      feedbackMessage: '"Mindful" demonstra respeito e atenção aos outros.',
    },
  },
  {
    key: "mindful-tip",
    component: Exercise17,
    activity: {
      label: 'Sendo "Mindful" (Consciente e Respeitoso)',
      content: [
        `Trabalhar com o mundo todo significa lidar com fusos horários (time zones) e feriados diferentes. Um nativo de alto nível demonstra empatia internacional usando a expressão: "I want to be mindful of..." (Quero estar atento a / Quero ser respeitoso com...). Por exemplo, se a reunião está acabando e na Europa já é tarde da noite, você diz: "I want to be mindful of everyone's time" (Quero ser respeitoso com o tempo de todos). Isso eleva a sua imagem executiva ao nível máximo de elegância!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "time-zones-complete",
    component: Exercise5,
    activity: {
      prompt:
        "A equipe de Londres já passou do horário de expediente. Como você demonstra consciência dessa diferença?",
      sentenceStart: "I know we have more to discuss, but I want to be",
      sentenceEnd: "of the time zones.",
      options: ["mindful", "careful"],
      correctAnswer: "mindful",
      successTitle: "Correto",
      successMessage:
        '"Be mindful of" mostra respeito pelos limites dos outros.',
    },
  },
  {
    key: "mindful-spell",
    component: Exercise13,
    needsSpeech: true,
    activity: {
      prompt:
        "Organize as letras para formar a palavra que descreve um profissional atento às necessidades dos outros.",
      audioSource: require("../../../../../mp3/BU/B1/A10S5.mp3"),
      audioDurationMs: 1200,
      letters: ["F", "I", "L", "U", "M", "N", "D"],
      correctWord: "MINDFUL",
      successTitle: "Correto",
      successMessage: "MINDFUL.",
    },
  },
  {
    key: "global-call-complete",
    component: Exercise2,
    activity: {
      prompt:
        "Leia a mensagem de encerramento da videochamada e preencha as lacunas.",
      paragraphs: [
        [
          "Team, before we finish, let's ",
          { id: "blank-1", options: ["ensure", "expect"], answer: "ensure" },
          " we're all ",
          {
            id: "blank-2",
      options: ["aligned", "assigned"],
            answer: "aligned",
          },
          " on the next steps. I also want to be ",
          {
            id: "blank-3",
      options: ["mindful", "mindless"],
            answer: "mindful",
          },
          " of the time difference, since it's already midnight in Tokyo. Thank you.",
        ],
      ],
      successTitle: "Correto",
      successMessage:
        "Você alinhou próximos passos e respeitou o fuso horário.",
    },
  },
  {
    key: "bridge-gap-audio",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt:
        "Escute o Líder Global tentando resolver uma confusão. A afirmação escrita é verdadeira ou falsa?",
      image: BUB1.A10S10,
      audioSource: require("../../../../../mp3/BU/B1/A10S10.mp3"),
      audioDurationMs: 7600,
      statement:
        "O líder quer tentar preencher a lacuna de comunicação e pede para que todos sejam respeitosos/conscientes das diferenças culturais.",
      options: ["true", "false"],
      correctAnswer: "true",
      successTitle: "Correto",
      feedbackMessage:
        'Ele usa "bridge the gap" e "be mindful" para alinhar a equipe global.',
    },
  },
  {
    key: "mindful-time-order",
    component: Exercise6,
    activity: {
      prompt:
        "Clique nas palavras na ordem correta para sugerir o fim da chamada de forma diplomática.",
      words: ["time", "the", "of", "mindful", "be", "to", "want", "I"],
      correctOrder: ["I", "want", "to", "be", "mindful", "of", "the", "time"],
      successTitle: "Correto",
      successMessage: "I want to be mindful of the time.",
    },
  },
  {
    key: "global-call-speaking",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        'Você está finalizando uma videochamada com a diretoria global da Lingueto. Use "Just to ensure we\'re all aligned..." e "I want to be mindful of everyone\'s time...".',
      helperText:
        "Just to ensure we're all aligned, I want to be mindful of everyone's time.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "Just to ensure we're all aligned, I want to be mindful of everyone's time.",
      recordLabel: "Gravar Áudio",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Você finalizou a chamada com classe global.",
    },
  },
  {
    key: "virtual-nuance-feedback",
    component: Exercise17,
    activity: {
      label: "Você Chegou ao Nível Global!",
      content: [
        `Espetacular! Com o fim do Módulo 2, você deixou de ser alguém que apenas "fala inglês" para se tornar alguém que domina a diplomacia corporativa internacional. Palavras como "Mindful", "Aligned", "Bridge the gap" e "However" formam a base da comunicação de alto nível de CEOs e Diretores em todo o mundo. Descanse, celebre o seu progresso, e nos vemos no Módulo 3, onde vamos partir para a ação no mundo de Alta Negociação!`,
      ],
      continueLabel: "Finalizar",
    },
  },
  { key: "lesson-finish", type: "finish" },
];

export default createBusinessLessonScreen(LESSON_SLIDES);
