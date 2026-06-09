import createLessonScreen from "../../LessonScreen";
import { ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "past-perfect-continuous-tip",
    component: "Exercise17",
    activity: {
      label: "Tip - Activity 17",
      content: [
        `Duration before a past moment

Use the Past Perfect Continuous to show how long an action had been happening before something else occurred.

Form: had been + verb-ing

"I had been waiting for two hours when the bus finally came." -> Focus on the duration.

Key words: for, since, all day, all morning, how long.`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "had-been-studying-listen-choose",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Listen and choose the correct form",
      image: ICB1.A26S5,
      audioSource: require("../../../../../mp3/IC/B1/A26S2.mp3"),
      audioLanguage: "en-US",
      audioDurationMs: 3600,
      answerOptions: ["had been studying", "has been studying"],
      correctOption: "had been studying",
      successTitle: "Correct",
      feedbackMessage: "Had been studying shows duration before a past moment.",
    },
  },
  {
    key: "waiting-correct-sentence",
    component: "Exercise4",
    activity: {
      prompt: "Which sentence is correct?",
      image: ICB1.A26S5,
      wrongSentence: "Choose the correct sentence.",
      options: [
        "A. He had been wait for an hour.",
        "B. He had been waiting for an hour.",
        "C. He has been waited for an hour.",
      ],
      correctAnswer: "B. He had been waiting for an hour.",
      successTitle: "Correct",
      successMessage:
        'Use "had been" + verb-ing: He had been waiting for an hour.',
    },
  },
  {
    key: "running-two-hours-type",
    component: "Exercise18",
    activity: {
      prompt: "Write the sentence in the correct order",
      scrambledSentence: "for / had / He / been / hours / running / two",
      correctAnswer: "He had been running for two hours",
      placeholder: "Write the sentence",
      submitLabel: "Enviar",
      errorTitle: "Incorrect",
      successTitle: "Correct",
      successMessage: "Answer: He had been running for two hours.",
    },
  },
  {
    key: "travelling-six-hours-listen-write",
    component: "Exercise19",
    needsSpeech: true,
    activity: {
      prompt: "Listen and write what you hear",
      audioSource: require("../../../../../mp3/IC/B1/A26S9.mp3"),
      audioLanguage: "en-GB",
      audioDurationMs: 5200,
      correctAnswer:
        "We had been travelling for six hours when we finally reached the hotel.",
      placeholder: "Write the sentence",
      submitLabel: "Responder",
      successTitle: "Correct",
      successMessage:
        "You wrote the Past Perfect Continuous sentence correctly.",
      errorMessage: "Remember the structure: had been + verb-ing.",
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
