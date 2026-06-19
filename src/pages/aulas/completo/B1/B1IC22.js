import createLessonScreen from "../../LessonScreen";
import { BussinesImages, ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "cant-mustnt-prohibition-tip",
    component: "Exercise17",
    activity: {
      label: "Tip - Activity 17",
      content: [
        `Prohibition: two ways to say no

Mustn't -> it is forbidden / not allowed (strong rule). "You mustn't use your phone during the exam."

Can't -> it is not possible or not permitted in context. "You can't park here -- it's a no-parking zone."

Both express prohibition, but mustn't tends to be more formal or rules-based.`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "mustnt-listen-and-choose",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Listen to the word and choose",
      image: ICB1.A22S6,
      audioSource: require("../../../../../mp3/IC/B1/A22S2.mp3"),
      audioLanguage: "en-GB",
      audioDurationMs: 1200,
      answerOptions: ["mustn't", "must"],
      correctOption: "mustn't",
      successTitle: "Correct",
      feedbackMessage: "Mustn't means something is forbidden.",
    },
  },
  {
    key: "prohibited-image-grid",
    component: "Exercise9",
    activity: {
      prompt: "Which image matches the word?",
      question: "PROHIBITED",
      correctOptionId: "prohibited",
      options: [
        { id: "prohibited", image: ICB1.A22S6 },
        { id: "library", image: ICB1.A22S5 },
      ],
      successTitle: "Correct",
      successMessage: 'The no-smoking sign represents "prohibited".',
    },
  },
  {
    key: "library-prohibition-true-false",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Listen and decide: true or false?",
      image: ICB1.A22S5,
      audioSource: require("../../../../../mp3/IC/B1/A22S5.mp3"),
      audioLanguage: "en-GB",
      audioDurationMs: 7000,
      dialogue:
        'Written sentence: "In a library, you mustn\'t make noise or use your phone."',
      options: ["True", "False"],
      correctAnswer: "True",
      successTitle: "Correct",
      successMessage: "The written sentence matches the audio.",
    },
  },
  {
    key: "cant-smoke-correct-sentence",
    component: "Exercise4",
    activity: {
      prompt: "Which sentence is correct?",
      image: ICB1.A22S6,
      wrongSentence: "Choose the correct sentence.",
      options: [
        "A. You mustn't to smoke here.",
        "B. You can't smoking here.",
        "C. You can't smoke here.",
      ],
      correctAnswer: "C. You can't smoke here.",
      successTitle: "Correct",
      successMessage:
        'Use "mustn\'t" or "can\'t" + base verb: You can\'t smoke here.',
    },
  },
  {
    key: "mustnt-unscramble-word",
    component: "Exercise13",
    needsSpeech: true,
    activity: {
      prompt: "Write the letters in the correct order",
      audioSource: require("../../../../../mp3/IC/B1/A22S7.mp3"),
      audioLanguage: "en-GB",
      audioDurationMs: 1200,
      letters: ["T", "S", "N", "U", "M", "T", "'"],
      correctWord: "MUSTN'T",
      successTitle: "Correct",
      successMessage: "Answer: MUSTN'T",
    },
  },
  {
    key: "no-smoking-image-question",
    component: "Exercise8",
    activity: {
      prompt: "What does this sign mean?",
      image: ICB1.A22S6,
      options: [
        "You must smoke here.",
        "You mustn't / can't smoke here.",
        "You have to enter here.",
        "You can eat and drink here.",
      ],
      correctAnswer: "You mustn't / can't smoke here.",
      successTitle: "Correct",
      successMessage: "The sign shows a no-smoking rule in a public area.",
    },
  },
  {
    key: "security-pass-listen-write",
    component: "Exercise19",
    needsSpeech: true,
    activity: {
      prompt: "Listen and write what you hear",
      audioSource: require("../../../../../mp3/IC/B1/A22S11.mp3"),
      audioLanguage: "en-US",
      audioDurationMs: 3600,
      correctAnswer: "You can't enter this area without a security pass.",
      placeholder: "Write the sentence",
      submitLabel: "Responder",
      successTitle: "Correct",
      successMessage: "You wrote the prohibition correctly.",
      errorMessage: 'Remember: "can\'t" + base verb.',
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
