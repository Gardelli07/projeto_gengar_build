import createLessonScreen from "../../LessonScreen";
import { ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "permission-contexts-tip",
    component: "Exercise17",
    activity: {
      label: "Tip - Activity 17",
      content: [
        `Asking for and giving permission

Can I...? -> informal, everyday. "Can I leave early today?"

Could I...? -> more polite and indirect. "Could I use your phone?"

May I...? -> formal. "May I speak with the manager?"

To give permission: "Yes, you can / could / may." To refuse: "No, you can't / may not."`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "permission-image-word-match",
    component: "Exercise15",
    activity: {
      prompt: "Match the image with the correct sentence",
      images: [
        { id: "casual-chat", image: ICB1.A23S2 },
        { id: "formal-meeting", image: ICB1.A24S3 },
      ],
      words: [
        { id: "borrow-pen", label: "Can I borrow your pen?" },
        { id: "speak-with-you", label: "May I speak with you, sir?" },
      ],
      pairs: [
        { imageId: "casual-chat", wordId: "borrow-pen" },
        { imageId: "formal-meeting", wordId: "speak-with-you" },
      ],
      successTitle: "Correct",
      successMessage:
        "Can is more natural in casual contexts; May is more formal.",
    },
  },
  {
    key: "may-could-formality-true-false",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Listen and decide: true or false?",
      image: ICB1.A24S3,
      audioSource: require("../../../../../mp3/IC/B1/A24S3.mp3"),
      audioLanguage: "en-GB",
      audioDurationMs: 7500,
      dialogue: 'Written sentence: "Could I is more formal than May I."',
      options: ["True", "False"],
      correctAnswer: "False",
      successTitle: "Correct",
      successMessage: "May I is the most formal option.",
    },
  },
  {
    key: "could-i-sit-correct-sentence",
    component: "Exercise4",
    activity: {
      prompt: "Which sentence is correct?",
      image: ICB1.A24S3,
      wrongSentence: "Choose the correct sentence.",
      options: [
        "A. May I to sit here?",
        "B. Could I sit here?",
        "C. Could I to sit here?",
      ],
      correctAnswer: "B. Could I sit here?",
      successTitle: "Correct",
      successMessage:
        'After can, could, and may, use the base verb: "Could I sit here?"',
    },
  },
  {
    key: "permission-fill-blanks",
    component: "Exercise2",
    activity: {
      prompt: "Fill in the blanks",
      paragraphs: [
        [
          "",
          {
            id: "b1",
            answer: "Can",
            options: ["Can", "May", "Could", "can't"],
          },
          "I open the window? -- Sure, you",
          {
            id: "b2",
            answer: "can",
            options: ["can", "May", "Could", "can't"],
          },
          ". Actually,",
          {
            id: "b3",
            answer: "Could",
            options: ["Can", "May", "Could", "can't"],
          },
          "I ask you something first? -- Of course!",
          {
            id: "b4",
            answer: "Can",
            options: ["Can", "May", "Could", "can't"],
          },
          "we use the conference room? -- Sorry, you",
          {
            id: "b5",
            answer: "can't",
            options: ["Can", "May", "Could", "can't"],
          },
          "-- it's already booked.",
        ],
      ],
      successTitle: "Excellent",
      successMessage:
        "Answers: (1) Can/Could - (2) can - (3) Could - (4) Can/Could - (5) can't",
    },
  },
  {
    key: "may-leave-early-scrambled",
    component: "Exercise6",
    activity: {
      prompt: "Put the words in order",
      words: ["I", "early", "today", "leave", "May", "?"],
      correctOrder: ["May", "I", "leave", "early", "today", "?"],
      successTitle: "Correct",
      successMessage: "Answer: May I leave early today?",
    },
  },
  {
    key: "permission-speaking-practice",
    component: "Exercise16",
    activity: {
      prompt: "Record your answer",
      instruction:
        "Record a short audio asking for permission in three different situations:",
      helperText:
        "1. Ask a friend if you can use their laptop. (informal)\n2. Ask your teacher if you can leave the classroom. (polite)\n3. Ask your boss if you may take a day off. (formal)",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "Can I use your laptop? Could I leave the classroom? May I take a day off?",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correct",
      successMessage: "Great permission practice.",
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
