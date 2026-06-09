import createLessonScreen from "../../LessonScreen";
import { ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "must-have-to-difference",
    component: "Exercise17",
    activity: {
      label: "Tip - Activity 17",
      content: [
        `What's the difference?

Both must and have to express obligation, but they come from different sources.

Must -> the speaker feels it's necessary (internal). "I must call my mum -- it's been weeks!"

Have to -> an external rule or someone else requires it. "I have to wear a uniform at work."

In questions and negatives they behave very differently -- pay attention to the next activities.`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "must-have-to-meaning-match",
    component: "Exercise1",
    activity: {
      prompt: "Match the sentence with its meaning",
      pairs: [
        { en: "I must exercise more", pt: "personal decision / internal" },
        { en: "I have to submit the report", pt: "boss's rule / external" },
        { en: "She must see a doctor", pt: "the speaker's strong advice" },
      ],
      successTitle: "Excellent",
      successMessage: "You matched each obligation with its source.",
    },
  },
  {
    key: "must-have-to-fill-blanks",
    component: "Exercise2",
    activity: {
      prompt: "Fill in the blanks",
      paragraphs: [
        [
          "I",
          {
            id: "b1",
            answer: "have to",
            options: ["must", "have to", "has to"],
          },
          "arrive before 8 a.m. -- it's company policy. But I also feel I",
          {
            id: "b2",
            answer: "must",
            options: ["must", "have to", "has to"],
          },
          "get more sleep. My colleague Jake",
          {
            id: "b3",
            answer: "has to",
            options: ["must", "have to", "has to"],
          },
          "attend every Monday meeting. We both think we",
          {
            id: "b4",
            answer: "must",
            options: ["must", "have to", "has to"],
          },
          "find a better work-life balance.",
        ],
      ],
      successTitle: "Excellent",
      successMessage: "Answers: (1) have to - (2) must - (3) has to - (4) must",
    },
  },
  {
    key: "badge-audio-true-false",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Listen and decide: true or false?",
      image: ICB1.A21S3,
      audioSource: require("../../../../../mp3/IC/B1/A21S3.mp3"),
      audioDurationMs: 11000,
      dialogue:
        'Written sentence: "The speaker has a personal rule about wearing a badge."',
      options: ["True", "False"],
      correctAnswer: "False",
      successTitle: "Correct",
      successMessage:
        "Wearing a badge is a company rule, so the obligation is external.",
    },
  },
  {
    key: "have-to-correct-sentence",
    component: "Exercise4",
    activity: {
      prompt: "Which sentence is correct?",
      image: ICB1.A21S5,
      wrongSentence: "Choose the correct sentence.",
      options: [
        "A. I must to finish this report today.",
        "B. I have to finish this report today.",
        "C. I have finish this report today.",
      ],
      correctAnswer: "B. I have to finish this report today.",
      successTitle: "Correct",
      successMessage:
        'Note: "must" is never followed by "to". "Have to" always needs "to".',
    },
  },
  {
    key: "uniform-scrambled-sentence",
    component: "Exercise6",
    activity: {
      prompt: "Put the words in order",
      words: ["every", "has", "She", "wear", "to", "day", "a", "uniform"],
      correctOrder: [
        "She",
        "has",
        "to",
        "wear",
        "a",
        "uniform",
        "every",
        "day",
      ],
      successTitle: "Correct",
      successMessage: "Answer: She has to wear a uniform every day.",
    },
  },
  {
    key: "must-recommendation-choice",
    component: "Exercise5",
    activity: {
      prompt: "Choose one word",
      image: ICB1.A21S7,
      sentenceStart: "You",
      sentenceEnd: "read this book -- it's absolutely amazing!",
      options: ["must", "have to"],
      correctAnswer: "must",
      successTitle: "Correct",
      successMessage:
        "Here the speaker is giving a strong personal recommendation -- internal obligation.",
    },
  },
  {
    key: "show-your-id-listen-write",
    component: "Exercise19",
    needsSpeech: true,
    activity: {
      prompt: "Listen and write what you hear",
      audioSource: require("../../../../../mp3/IC/B1/A21S9.mp3"),
      audioLanguage: "en-GB",
      audioDurationMs: 3500,
      correctAnswer: "You have to show your ID to enter the building.",
      placeholder: "Write the sentence",
      submitLabel: "Responder",
      successTitle: "Correct",
      successMessage: "You wrote the sentence correctly.",
      errorMessage: 'Remember the structure: "have to" + base verb.',
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
