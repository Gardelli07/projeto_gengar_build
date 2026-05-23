import createA2LessonScreen from "./A2LessonScreen";
import { Images } from "../../../../util/images";

const QUESTION_IMAGE = Images.ex10;
const USER_IMAGE = Images.ex16;

const LESSON_SLIDES = [
  {
    key: "a2ic66s1",
    component: "Exercise10",
    activity: {
      prompt: "Escolha o passado irregular correto.",
      title: "Challenge 6",
      userImage: USER_IMAGE,
      lockStorageKey: "@A2IC66_irregular_review_test_lock",
      questions: [
        { image: QUESTION_IMAGE, question: "SEE", options: ["Saw", "Seed"], correctAnswer: "Saw" },
        { image: QUESTION_IMAGE, question: "EAT", options: ["Eated", "Ate"], correctAnswer: "Ate" },
        { image: QUESTION_IMAGE, question: "DRINK", options: ["Drank", "Drinked"], correctAnswer: "Drank" },
        { image: QUESTION_IMAGE, question: "TELL", options: ["Telled", "Told"], correctAnswer: "Told" },
        { image: QUESTION_IMAGE, question: "GIVE", options: ["Gived", "Gave"], correctAnswer: "Gave" },
        { image: QUESTION_IMAGE, question: "GO", options: ["Went", "Goed"], correctAnswer: "Went" },
        { image: QUESTION_IMAGE, question: "BUY", options: ["Buyed", "Bought"], correctAnswer: "Bought" },
        { image: QUESTION_IMAGE, question: "HAVE", options: ["Had", "Haved"], correctAnswer: "Had" },
        { image: QUESTION_IMAGE, question: "TAKE", options: ["Took", "Taked"], correctAnswer: "Took" },
        { image: QUESTION_IMAGE, question: "DO", options: ["Dided", "Did"], correctAnswer: "Did" },
      ],
      successTitle: "Correto",
      successMessage: "Você revisou os irregulares com sucesso.",
    },
  },
];

export default createA2LessonScreen(LESSON_SLIDES);
