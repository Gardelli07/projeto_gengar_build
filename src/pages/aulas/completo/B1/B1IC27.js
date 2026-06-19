import createLessonScreen from "../../LessonScreen";
import { ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "combining-tenses-tip",
    component: "Exercise17",
    activity: {
      label: "Tip - Activity 17",
      content: [
        `How tenses work together in a story

Simple Past -> the main events. "She walked in."

Past Continuous -> background / ongoing action. "It was raining."

Past Perfect -> what happened before the story began. "She had left her umbrella at home."

Together: "It was raining when she walked in. She had forgotten her umbrella."`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "dark-evening-true-false",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Listen and decide: true or false?",
      image: ICB1.A27S2,
      audioSource: require("../../../../../mp3/IC/B1/A27S2.mp3"),
      audioLanguage: "en-US",
      audioDurationMs: 8500,
      dialogue:
        'Written sentence: "Mark heard the noise while he was walking home in the evening."',
      options: ["True", "False"],
      correctAnswer: "True",
      successTitle: "Correct",
      successMessage:
        "The audio says Mark was walking home when he heard the noise.",
    },
  },
  {
    key: "cafe-story-fill-blanks",
    component: "Exercise2",
    activity: {
      prompt: "Fill in the blanks",
      paragraphs: [
        [
          "Anna",
          {
            id: "b1",
            answer: "was sitting",
            options: [
              "was sitting",
              "had forgotten",
              "started",
              "were talking",
            ],
          },
          "in the cafe when it",
          {
            id: "b2",
            answer: "started",
            options: [
              "was sitting",
              "had forgotten",
              "started",
              "were talking",
            ],
          },
          "to rain. She and her friend",
          {
            id: "b3",
            answer: "were talking",
            options: [
              "was sitting",
              "had forgotten",
              "started",
              "were talking",
            ],
          },
          "about their holiday plans. Anna suddenly remembered she",
          {
            id: "b4",
            answer: "had forgotten",
            options: [
              "was sitting",
              "had forgotten",
              "started",
              "were talking",
            ],
          },
          "her keys at home.",
        ],
      ],
      successTitle: "Excellent",
      successMessage:
        "Answers: (1) was sitting - (2) started - (3) were talking - (4) had forgotten",
    },
  },
  {
    key: "story-order-crowd",
    component: "Exercise7",
    activity: {
      prompt: "Put the story sentences in order",
      options: [
        "A. He had never seen so many people in one place before.",
        "B. Suddenly, the lights went out.",
        "C. James was standing in the middle of the crowd.",
        "D. Everyone started shouting.",
      ],
      correctOrder: [
        "C. James was standing in the middle of the crowd.",
        "A. He had never seen so many people in one place before.",
        "B. Suddenly, the lights went out.",
        "D. Everyone started shouting.",
      ],
      successTitle: "Correct",
      successMessage: "Correct order: C -> A -> B -> D",
    },
  },
  {
    key: "story-writing-practice",
    component: "Exercise12",
    activity: {
      prompt: "Free writing",
      instruction:
        "Write a short story (4-6 sentences) about a time something unexpected happened. Use at least one Simple Past, one Past Continuous, and one Past Perfect.",
      helperText:
        'Example: "I was walking to school when I realised I had left my bag at home."',
      placeholder: "I was...\nThen...\nI realised I had...",
      tipText:
        "Use Past Continuous for the background, Simple Past for the main event, and Past Perfect for an earlier action.",
      minLength: 55,
      successTitle: "Correct",
      successMessage: "Great storytelling with combined tenses.",
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
