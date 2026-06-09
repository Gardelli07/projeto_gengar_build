import createLessonScreen from "../../LessonScreen";
import { ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "narrative-fillers-tip",
    component: "Exercise17",
    activity: {
      label: "Tip - Activity 17",
      content: [
        `Natural storytelling expressions

"Long story short" -> skip the details and get to the conclusion.

"Believe it or not" -> what I'm about to say is surprising but true.

"Out of nowhere" -> something happened completely unexpectedly.

"Next thing I knew" -> something happened very quickly after.

"To cut a long story short" -> British version of "long story short".`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "narrative-fillers-connect",
    component: "Exercise1",
    activity: {
      prompt: "Match the filler with its meaning",
      pairs: [
        { en: "Long story short", pt: "skipping to the conclusion" },
        { en: "Believe it or not", pt: "surprising but true" },
        { en: "Out of nowhere", pt: "completely unexpected" },
      ],
      successTitle: "Excellent",
      successMessage: "You connected each narrative filler to its meaning.",
    },
  },
  {
    key: "believe-it-or-not-listen",
    component: "Exercise14",
    needsSpeech: true,
    activity: {
      prompt: "Listen and choose the filler you heard",
      image: ICB1.A28S5,
      audioSource: require("../../../../../mp3/IC/B1/A28S3.mp3"),
      audioLanguage: "en-US",
      audioDurationMs: 3800,
      answerOptions: ["Believe it or not", "Long story short"],
      correctOption: "Believe it or not",
      successTitle: "Correct",
      feedbackMessage:
        "Believe it or not introduces surprising true information.",
    },
  },
  {
    key: "long-story-short-correct-sentence",
    component: "Exercise4",
    activity: {
      prompt: "Which sentence uses the filler correctly?",
      image: ICB1.A28S5,
      wrongSentence: "Choose the correct sentence.",
      options: [
        "A. Long story short, believe it or not I was late.",
        "B. Long story short, I missed the flight.",
        "C. I long story short missed the flight.",
      ],
      correctAnswer: "B. Long story short, I missed the flight.",
      successTitle: "Correct",
      successMessage:
        '"Long story short" comes before the conclusion of the story.',
    },
  },
  {
    key: "narrative-speaking-practice",
    component: "Exercise16",
    activity: {
      prompt: "Record your answer",
      instruction:
        "Record a short story (30-60 seconds) about something funny or unexpected. Use at least two narrative fillers from the tip.",
      helperText:
        'Example: "So I was on my way to work and, believe it or not, I saw a dog driving a car. Long story short, I was late."',
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "Try: believe it or not, out of nowhere, next thing I knew, long story short.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correct",
      successMessage: "Great storytelling with narrative fillers.",
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
