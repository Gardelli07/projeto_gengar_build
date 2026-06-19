import createLessonScreen from "../../LessonScreen";
import { ICB1, Images } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    key: "dont-have-to-tip",
    component: "Exercise17",
    activity: {
      label: "Tip - Activity 17",
      content: [
        `Important! Don't confuse these

Don't have to = it is NOT necessary -- you are free to choose. "You don't have to wear a tie -- it's casual Friday."

Mustn't = it is FORBIDDEN -- you cannot do it. "You mustn't enter without ID."

These are opposites in meaning! Be very careful.`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "dont-have-to-connect",
    component: "Exercise1",
    activity: {
      prompt: "Match the sentence with its meaning",
      pairs: [
        {
          en: "You don't have to call",
          pt: "No obligation -- it's optional",
        },
        {
          en: "You mustn't call after 10pm",
          pt: "Forbidden -- it's a rule",
        },
        {
          en: "You have to call first",
          pt: "Obligatory -- required",
        },
      ],
      successTitle: "Excellent",
      successMessage:
        "You separated optional, forbidden, and required actions.",
    },
  },
  {
    key: "office-rules-fill-blanks",
    component: "Exercise2",
    activity: {
      prompt: "Fill in the blanks",
      paragraphs: [
        [
          "At our office, employees",
          {
            id: "b1",
            answer: "don't have to",
            options: ["don't have to", "mustn't", "doesn't have to", "has to"],
          },
          "wear formal clothes on Fridays. However, they",
          {
            id: "b2",
            answer: "mustn't",
            options: ["don't have to", "mustn't", "doesn't have to", "has to"],
          },
          "come in late -- punctuality is required. The manager",
          {
            id: "b3",
            answer: "doesn't have to",
            options: ["don't have to", "mustn't", "doesn't have to", "has to"],
          },
          "attend every meeting, but everyone",
          {
            id: "b4",
            answer: "has to",
            options: ["don't have to", "mustn't", "doesn't have to", "has to"],
          },
          "follow the safety rules.",
        ],
      ],
      successTitle: "Excellent",
      successMessage:
        "Answers: (1) don't have to - (2) mustn't - (3) doesn't have to - (4) has to",
    },
  },
  {
    key: "weekend-obligations-true-false",
    component: "Exercise3",
    needsSpeech: true,
    activity: {
      prompt: "Listen and decide: true or false?",
      image: ICB1.A23S3,
      audioSource: require("../../../../../mp3/IC/B1/A23S3.mp3"),
      audioLanguage: "en-US",
      audioDurationMs: 8500,
      dialogue:
        'Written sentence: "The speaker has no obligations at all on weekends."',
      options: ["True", "False"],
      correctAnswer: "False",
      successTitle: "Correct",
      successMessage:
        "The speaker has no obligation to wake up early, but still must feed the cat.",
    },
  },
  {
    key: "finish-food-choice",
    component: "Exercise5",
    activity: {
      prompt: "Choose one word",
      sentenceStart: "You",
      sentenceEnd: "finish all the food -- just eat what you want.",
      options: ["don't have to", "mustn't"],
      correctAnswer: "don't have to",
      successTitle: "Correct",
      successMessage:
        "There is no obligation to finish everything. It is optional.",
    },
  },
  {
    key: "dialog-order-obligations",
    component: "Exercise7",
    activity: {
      prompt: "Put the sentences in the correct order",
      options: [
        "A. But you mustn't forget to sign in at the reception.",
        "B. Welcome to our building!",
        "C. You don't have to make an appointment for the cafe.",
        "D. However, you have to show your ID to enter the offices.",
      ],
      correctOrder: [
        "B. Welcome to our building!",
        "C. You don't have to make an appointment for the cafe.",
        "D. However, you have to show your ID to enter the offices.",
        "A. But you mustn't forget to sign in at the reception.",
      ],
      successTitle: "Correct",
      successMessage: "Correct order: B -> C -> D -> A",
    },
  },
  {
    key: "dont-have-to-come-early",
    component: "Exercise18",
    activity: {
      prompt: "Write the sentence in the correct order",
      scrambledSentence: "to / don't / come / have / You / early",
      correctAnswer: "You don't have to come early",
      placeholder: "Write the sentence",
      submitLabel: "Enviar",
      errorTitle: "Incorrect",
      successTitle: "Correct",
      successMessage: "Answer: You don't have to come early.",
    },
  },
  {
    key: "daily-life-writing-practice",
    component: "Exercise12",
    activity: {
      prompt: "Free writing",
      instruction:
        "Write 3 sentences about your daily life using must, have to, and don't have to.",
      helperText:
        'Example: "I have to wake up at 7am. I must drink more water. I don\'t have to work on Sundays."',
      placeholder: "I have to...\nI must...\nI don't have to...",
      tipText:
        "Use have to for external obligations, must for personal decisions, and don't have to for optional actions.",
      minLength: 45,
      successTitle: "Correct",
      successMessage: "Great use of obligation and absence of obligation.",
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
