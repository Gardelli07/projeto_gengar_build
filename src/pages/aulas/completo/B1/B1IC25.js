import createLessonScreen from "../../LessonScreen";
import { ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "past-perfect-tip",
    component: "Exercise17",
    activity: {
      label: "Tip - Activity 17",
      content: [
        `What is the Past Perfect?

Use the Past Perfect to talk about an action that happened before another past action.

Form: had + past participle

"When I arrived, the movie had already started." -> The movie started first, then I arrived.

Key words: already, just, never, before, after, by the time.`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "past-perfect-connect",
    component: "Exercise1",
    activity: {
      prompt: "Match the sentence halves",
      pairs: [
        {
          en: "When she got home",
          pt: "her family had already eaten dinner",
        },
        {
          en: "He was tired because",
          pt: "he had worked all day",
        },
        {
          en: "By the time we arrived",
          pt: "the concert had finished",
        },
      ],
      successTitle: "Excellent",
      successMessage: "You matched each later action to the earlier event.",
    },
  },
  {
    key: "tom-party-true-false",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Listen and decide: true or false?",
      image: ICB1.A25S3,
      audioSource: require("../../../../../mp3/IC/B1/A25S3.mp3"),
      audioLanguage: "en-US",
      audioDurationMs: 7600,
      dialogue:
        'Written sentence: "Tom arrived at the party on time and met everyone there."',
      options: ["True", "False"],
      correctAnswer: "False",
      successTitle: "Correct",
      successMessage:
        "Everyone had already left before Tom arrived at the party.",
    },
  },
  {
    key: "hotel-fill-blanks",
    component: "Exercise2",
    activity: {
      prompt: "Fill in the blanks",
      paragraphs: [
        [
          "By the time Laura",
          {
            id: "b1",
            answer: "arrived",
            options: [
              "had left",
              "arrived",
              "had never seen",
              "had already booked",
            ],
          },
          "at the hotel, her friends",
          {
            id: "b2",
            answer: "had already booked",
            options: [
              "had left",
              "arrived",
              "had never seen",
              "had already booked",
            ],
          },
          "the room. She",
          {
            id: "b3",
            answer: "had never seen",
            options: [
              "had left",
              "arrived",
              "had never seen",
              "had already booked",
            ],
          },
          "such a beautiful place before. They",
          {
            id: "b4",
            answer: "had left",
            options: [
              "had left",
              "arrived",
              "had never seen",
              "had already booked",
            ],
          },
          "early that morning.",
        ],
      ],
      successTitle: "Excellent",
      successMessage:
        "Answers: (1) arrived - (2) had already booked - (3) had never seen - (4) had left",
    },
  },
  {
    key: "already-left-scrambled",
    component: "Exercise6",
    activity: {
      prompt: "Put the words in order",
      words: ["already", "She", "had", "when", "left", "I", "called"],
      correctOrder: ["She", "had", "already", "left", "when", "I", "called"],
      successTitle: "Correct",
      successMessage: "Answer: She had already left when I called.",
    },
  },
  {
    key: "food-arrived-listen-write",
    component: "Exercise19",
    needsSpeech: true,
    activity: {
      prompt: "Listen and write what you hear",
      audioSource: require("../../../../../mp3/IC/B1/A25S9.mp3"),
      audioLanguage: "en-GB",
      audioDurationMs: 3600,
      correctAnswer: "They had already eaten when the food arrived.",
      placeholder: "Write the sentence",
      submitLabel: "Responder",
      successTitle: "Correct",
      successMessage: "You wrote the Past Perfect sentence correctly.",
      errorMessage: "Remember the structure: had + past participle.",
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
