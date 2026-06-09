import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "what-if-tip",
    component: "Exercise17",
    activity: {
      label: 'Playing "What if..."',
      content: [
        `E se você quisesse perguntar a alguém sobre uma situação imagináriaí

Em inglês, nós invertemos o would com o sujeito.

A estrutura matadora é:
What would you do if + passado?

/blue{Native Tip}
Nativos adoram jogar o jogo do "What if" (E se...) para quebrar o gelo em conversas.

Vamos aprender a fazer essas perguntas!`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "spell-would",
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt:
        "Organize as letras para formar a palavra essencial para perguntas imaginárias.",
      audioSource: require("../../../../../mp3/IC/B1/A13S2.mp3"),
      audioDurationMs: 900,
      letters: ["D", "L", "U", "O", "W"],
      correctWord: "WOULD",
      successTitle: "Correto",
      successMessage: 'A palavra essencial ? "WOULD".',
    },
  },
  {
    key: "order-million-question",
    component: "Exercise6",
    activity: {
      prompt: "Clique nas palavras na ordem correta para formar a pergunta.",
      words: [
        "do",
        "what",
        "would",
        "you",
        "you won",
        "if",
        "a",
        "million",
        "dollars",
        "?",
      ],
      correctOrder: [
        "what",
        "would",
        "you",
        "do",
        "if",
        "you won",
        "a",
        "million",
        "dollars",
        "?",
      ],
      successTitle: "Correto",
      successMessage: "What would you do if you won a million dollars?",
    },
  },
  {
    key: "correct-wallet-question",
    component: "Exercise4",
    activity: {
      prompt: "Qual é a forma correta de fazer a perguntaí",
      image: ICB1.A19S2p1,
      wrongSentence: "What if...",
      options: [
        "What you would do if you found a wallet?",
        "What would you do if you found a wallet?",
        "What would you do if you find a wallet?",
      ],
      correctAnswer: "What would you do if you found a wallet?",
      successTitle: "Correto",
      successMessage:
        "Em perguntas, usamos What + would + sujeito + verbo.",
    },
  },
  {
    key: "listen-write-country",
    component: "Exercise19",
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e digite exatamente a pergunta que você ouviu.",
      audioSource: require("../../../../../mp3/IC/B1/A13S5.mp3"),
      audioDurationMs: 4400,
      correctAnswer: "Where would you live if you could choose any country?",
      placeholder: "Digite a pergunta",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "Você escreveu a pergunta do áudio corretamente.",
      errorMessage: "Ouça novamente e confira a ordem das palavras.",
    },
  },
  {
    key: "write-creative-question",
    component: "Exercise12",
    activity: {
      prompt: "Pergunta criativa",
      instruction:
        'Faça uma pergunta para mim usando a estrutura "What would you do if...".',
      helperText:
        "Pode ser sobre qualquer coisa maluca ou interessante.",
      image: ICB1.A19S2p2,
      placeholder:
        "What would you do if you could travel to Mars tomorrow?",
      tipText:
        "Use What would you do if + sujeito + verbo no passado.",
      minLength: 15,
      successTitle: "Correto",
      successMessage: "Ótimo! Você criou uma pergunta imaginária.",
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
