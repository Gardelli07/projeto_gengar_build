import React from "react";
import CourseOverviewScreen from "../CourseOverviewScreen";

export const INGLES_COMPLETO_STORAGE_KEY = "@progesso_ingles_completo";
export const INGLES_COMPLETO_COURSE_NAME = "Inglês Completo";

export const inglesModuleDefs = [
  {
    id: 0,
    name: "BASICS",
    subtitle: "Base de vocabulario, frases e escuta",
    locked: false,
    accent: "#6C63FF",
    icon: "check",
  },
  {
    id: 1,
    name: "I’m a student!",
    subtitle: "Aprenda a se apresentar com naturalidade",
    locked: false,
    accent: "#6C63FF",
    icon: "check",
  },
  {
    id: 2,
    name: "Good morning!",
    subtitle: "Use frases essenciais em situacoes reais",
    locked: false,
    accent: "#6C63FF",
    icon: "check",
  },
  {
    id: 3,
    name: "Alphabet",
    subtitle: "Expanda palavras e compreensao",
    locked: false,
    accent: "#B8C2CF",
    icon: "lock-outline",
  },
  {
    id: 4,
    name: "Numbers",
    subtitle: "Monte respostas e frases com seguranca",
    locked: false,
    accent: "#B8C2CF",
    icon: "lock-outline",
  },
  {
    id: 5,
    name: "Introduction",
    subtitle: "Fixe o conteudo com exercicios guiados",
    locked: false,
    accent: "#B8C2CF",
    icon: "lock-outline",
  },
];

export const inglesSampleLessons = [
  { module: 0, id: "1", title: "Hello/Hi", type: "Aula", screen: "IC01" },
  { module: 0, id: "2", title: "Hey/Hey there!", type: "Aula", screen: "IC02" },
  {
    module: 0,
    id: "3",
    title: "What’s up/Howdy",
    type: "Aula",
    screen: "IC03",
  },
  { module: 0, id: "4", title: "Bye/See ya!", type: "Aula", screen: "IC04" },
  {
    module: 0,
    id: "5",
    title: "Review Module 1",
    type: "Aula",
    screen: "IC05",
  },
  { module: 0, id: "6", title: "CHALLENGE", type: "Aula", screen: "IC06" },
  { module: 1, id: "7", title: "I am happy!", type: "Aula", screen: "IC07" },
  {
    module: 1,
    id: "8",
    title: "She’s a teacher!",
    type: "Aula",
    screen: "IC08",
  },
  { module: 1, id: "9", title: "Is he nice?", type: "Aula", screen: "IC09" },
  {
    module: 1,
    id: "10",
    title: "You’re my friend!",
    type: "Aula",
    screen: "IC10",
  },
  {
    module: 1,
    id: "11",
    title: "We are family!",
    type: "Aula",
    screen: "IC11",
  },
  {
    module: 1,
    id: "12",
    title: "Are you ready?",
    type: "Aula",
    screen: "IC12",
  },
  {
    module: 1,
    id: "13",
    title: "Review – affirmative",
    type: "Aula",
    screen: "IC13",
  },
  {
    module: 1,
    id: "14",
    title: "Review – Negative",
    type: "Aula",
    screen: "IC14",
  },
  {
    module: 1,
    id: "15",
    title: "Review – Interrogative",
    type: "Aula",
    screen: "IC15",
  },
  {
    module: 1,
    id: "16",
    title: "Review – Complete",
    type: "Aula",
    screen: "IC16",
  },
  { module: 1, id: "17", title: "Challenge", type: "Aula", screen: "IC17" },
  { module: 2, id: "18", title: "Morning!", type: "Aula", screen: "IC18" },
  { module: 2, id: "19", title: "Good evening!", type: "Aula", screen: "IC19" },
  { module: 2, id: "20", title: "See you!", type: "Aula", screen: "IC20" },
  { module: 2, id: "21", title: "Morning!", type: "Aula", screen: "IC21" },
  {
    module: 2,
    id: "22",
    title: "Regional Greetings",
    type: "Aula",
    screen: "IC22",
  },
  { module: 3, id: "23", title: "Vowels", type: "Aula", screen: "IC23" },
  { module: 3, id: "24", title: 'Time do "EE"', type: "Aula", screen: "IC24" },
  { module: 3, id: "25", title: 'Time do "EH"', type: "Aula", screen: "IC25" },
  {
    module: 3,
    id: "26",
    title: "Letras rebeldes",
    type: "Aula",
    screen: "IC26",
  },
  {
    module: 3,
    id: "27",
    title: "What’s your name?",
    type: "Aula",
    screen: "IC27",
  },
  { module: 3, id: "28", title: "It’s J-A...", type: "Aula", screen: "IC28" },
  {
    module: 3,
    id: "29",
    title: "Diference b/p v/w",
    type: "Aula",
    screen: "IC29",
  },
  {
    module: 3,
    id: "30",
    title: "O Mestre da Soletração",
    type: "Aula",
    screen: "IC30",
  },
  { module: 3, id: "31", title: "Boss Level", type: "Aula", screen: "IC31" },
  { module: 4, id: "32", title: "0-10", type: "Aula", screen: "IC32" },
  { module: 4, id: "33", title: "11-20", type: "Aula", screen: "IC33" },
  { module: 4, id: "34", title: "20-100", type: "Aula", screen: "IC34" },
  {
    module: 4,
    id: "35",
    title: "How old are you?",
    type: "Aula",
    screen: "IC35",
  },
  { module: 4, id: "36", title: "Phone number", type: "Aula", screen: "IC36" },
  {
    module: 4,
    id: "37",
    title: "How much is it?",
    type: "Aula",
    screen: "IC37",
  },
  { module: 4, id: "38", title: "Challenge", type: "Aula", screen: "IC38" },
  {
    module: 5,
    id: "39",
    title: "My name’s/ I’m",
    type: "Aula",
    screen: "IC39",
  },
  {
    module: 5,
    id: "40",
    title: "What’s your name?",
    type: "Aula",
    screen: "IC40",
  },
  { module: 5, id: "41", title: "This is my...", type: "Aula", screen: "IC41" },
  {
    module: 5,
    id: "42",
    title: "Self introduction",
    type: "Aula",
    screen: "IC42",
  },
  { module: 5, id: "43", title: "Boss level", type: "Aula", screen: "IC43" },
];

export default function InglesCompletoScreen(props) {
  return (
    <CourseOverviewScreen
      {...props}
      courseName={INGLES_COMPLETO_COURSE_NAME}
      storageKey={INGLES_COMPLETO_STORAGE_KEY}
      moduleDefs={inglesModuleDefs}
      lessons={inglesSampleLessons}
    />
  );
}

/*

import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Speech from "expo-speech";
import geral from "../../../exc/geral";
import ex1, { Exercise1 } from "../../../exc/ex1";
import ex2, { Exercise2 } from "../../../exc/ex2";
import ex3, { Exercise3 } from "../../../exc/ex3";
import ex4, { Exercise4 } from "../../../exc/ex4";
import ex5, { Exercise5 } from "../../../exc/ex5";
import ex6, { Exercise6 } from "../../../exc/ex6";
import ex7, { Exercise7 } from "../../../exc/ex7";
import ex8, { Exercise8 } from "../../../exc/ex8";
import ex9, { Exercise9 } from "../../../exc/ex9";
import ex10, { Exercise10 } from "../../../exc/ex10";
import ex11, { Exercise11 } from "../../../exc/ex11";
import ex12, { Exercise12 } from "../../../exc/ex12";
import ex13, { Exercise13 } from "../../../exc/ex13";
import ex15, { Exercise15 } from "../../../exc/ex15";
import ex14, { Exercise14 } from "../../../exc/ex14";
import ex16, { Exercise16 } from "../../../exc/ex16";
import ex17, { Exercise17 } from "../../../exc/ex17";
import ex18, { Exercise18 } from "../../../exc/ex18";
import Feedback from "../../../exc/feedback";
import { BussinesImages, IC, Images } from "../../../util/images";
import {
  calculateLessonAccuracy,
  LESSON_STREAK_MIN_ACCURACY,
  LESSON_STREAK_STORAGE_KEY,
} from "../../../util/lessonPerformance";
import { getLevelProgress, XP_PER_LESSON } from "../../../util/xp";

const SlideNavContext = React.createContext(null);

const STORAGE_KEY = "@progesso_ingles_completo";
const BACK_IMAGE = require("../../../../assets/seta.png");
const CLOSE_IMAGE = require("../../../../assets/x.png");

const styles = {
  ...geral,
  ...ex1,
  ...ex2,
  ...ex3,
  ...ex4,
  ...ex5,
  ...ex6,
  ...ex7,
  ...ex8,
  ...ex9,
  ...ex10,
  ...ex11,
  ...ex12,
  ...ex13,
  ...ex14,
  ...ex15,
  ...ex16,
  ...ex17,
  ...ex18,
};

const LESSON_SLIDES = [
  {
    key: "lesson-finish",
    type: "finish",
  },
];

const SLIDE_COUNT = LESSON_SLIDES.length;
const EXERCISE_SLIDE_COUNT = LESSON_SLIDES.filter(
  (slide) => slide.type !== "finish",
).length;

function useSpeech() {
  const speak = ({ text, stopBefore = true, ...speechOptions }) => {
    if (!text) return;
    if (stopBefore) Speech.stop();
    Speech.speak(text, speechOptions);
  };

  return { speak };
}

async function loadProgress() {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
}

async function saveProgress(progress) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function updateProgress(progressAnim, index, total) {
  Animated.timing(progressAnim, {
    toValue: (index + 1) / total,
    duration: 300,
    useNativeDriver: false,
  }).start();
}

function useSlideNavigation({
  currentSlideIndex,
  setCurrentSlideIndex,
  totalSlides,
  progressAnim,
}) {
  const lockRef = useRef(false);

  const next = () => {
    if (lockRef.current || currentSlideIndex >= totalSlides - 1) return;
    lockRef.current = true;
    setTimeout(() => {
      lockRef.current = false;
    }, 300);

    const nextIndex = currentSlideIndex + 1;
    setCurrentSlideIndex(nextIndex);
    updateProgress(progressAnim, nextIndex, totalSlides);
  };

  const prev = () => {
    if (lockRef.current || currentSlideIndex === 0) return;
    lockRef.current = true;
    setTimeout(() => {
      lockRef.current = false;
    }, 300);

    const previousIndex = currentSlideIndex - 1;
    setCurrentSlideIndex(previousIndex);
    updateProgress(progressAnim, previousIndex, totalSlides);
  };

  function renderPrevButton() {
    if (currentSlideIndex === 0) return null;

    return (
      <TouchableOpacity onPress={prev} style={styles.headerCircleButton}>
        <Image source={BACK_IMAGE} style={styles.headerCircleImage} />
      </TouchableOpacity>
    );
  }

  return { next, renderPrevButton };
}

function useNav() {
  return React.useContext(SlideNavContext);
}

function SlideHeader() {
  const { progressAnim, goBack, renderPrevButton } = useNav();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={goBack} style={styles.headerCircleButton}>
        <Image source={CLOSE_IMAGE} style={styles.headerCircleImage} />
      </TouchableOpacity>

      <View style={styles.headerProgress}>
        <Animated.View
          style={[
            styles.progressBarFill,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>

      <View style={styles.headerButton}>{renderPrevButton()}</View>
    </View>
  );
}

function LessonFinishSlide({ onPressNextLesson, feedbackProps }) {
  return (
    <Feedback
      onContinue={onPressNextLesson}
      reviewLabel="Revisar erros ->"
      {...feedbackProps}
    />
  );
}

function LessonSlideRenderer({
  slide,
  next,
  speak,
  onPressNextLesson,
  onAttempt,
  feedbackProps,
}) {
  if (slide.type === "finish") {
    return (
      <LessonFinishSlide
        onPressNextLesson={onPressNextLesson}
        feedbackProps={feedbackProps}
      />
    );
  }

  const ExerciseComponent = slide.component;

  return (
    <ExerciseComponent
      activity={slide.activity}
      styles={styles}
      HeaderComponent={SlideHeader}
      next={next}
      onAttempt={onAttempt}
      {...(slide.needsSpeech ? { speak } : {})}
    />
  );
}

export default function IC04({ route, navigation }) {
  const lesson = route?.params?.lesson;
  const lessons = route?.params?.lessons;
  const { speak } = useSpeech();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const progressAnim = useRef(new Animated.Value(1 / SLIDE_COUNT)).current;
  const [lessonStats, setLessonStats] = useState({
    correct: 0,
    total: 0,
    exerciseScores: {},
    slideAttempts: {},
  });
  const [completedLessonsCount, setCompletedLessonsCount] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [lessonAlreadyCompleted, setLessonAlreadyCompleted] = useState(false);
  const [lessonMetaLoaded, setLessonMetaLoaded] = useState(false);
  const lessonCommitRef = useRef(false);

  useEffect(() => {
    updateProgress(progressAnim, currentSlideIndex, SLIDE_COUNT);
  }, [currentSlideIndex, progressAnim]);

  const slideNav = useSlideNavigation({
    currentSlideIndex,
    setCurrentSlideIndex,
    totalSlides: SLIDE_COUNT,
    progressAnim,
  });

  const currentSlide = LESSON_SLIDES[currentSlideIndex];
  const completedExerciseScores = Object.values(lessonStats.exerciseScores);
  const lessonAccuracy = completedExerciseScores.length
    ? Math.round(
        completedExerciseScores.reduce((sum, score) => sum + score, 0) /
          EXERCISE_SLIDE_COUNT,
      )
    : calculateLessonAccuracy(lessonStats.correct, lessonStats.total);
  const earnedXp = lessonAlreadyCompleted ? 0 : XP_PER_LESSON;
  const nextStreak = lessonAlreadyCompleted
    ? currentStreak
    : lessonAccuracy >= LESSON_STREAK_MIN_ACCURACY
      ? currentStreak + 1
      : 0;
  const totalXpAfterLesson = completedLessonsCount * XP_PER_LESSON + earnedXp;
  const levelProgress = getLevelProgress(totalXpAfterLesson);

  useEffect(() => {
    let active = true;

    async function loadLessonMeta() {
      const [progress, streakRaw] = await Promise.all([
        loadProgress(),
        AsyncStorage.getItem(LESSON_STREAK_STORAGE_KEY),
      ]);

      if (!active) return;

      const completedCount = Object.values(progress || {}).filter(
        Boolean,
      ).length;
      const alreadyCompleted = Boolean(
        lesson?.id != null && progress?.[lesson.id],
      );
      const streak = streakRaw ? Number(streakRaw) || 0 : 0;

      setCompletedLessonsCount(completedCount);
      setLessonAlreadyCompleted(alreadyCompleted);
      setCurrentStreak(streak);
      setLessonMetaLoaded(true);
    }

    loadLessonMeta();

    return () => {
      active = false;
    };
  }, [lesson?.id]);

  const handleAttempt = ({
    isCorrect,
    correctDelta,
    totalDelta,
    exerciseAccuracy,
  } = {}) => {
    setLessonStats((current) => {
      const nextCorrect =
        current.correct +
        (typeof correctDelta === "number" ? correctDelta : isCorrect ? 1 : 0);
      const nextTotal =
        current.total + (typeof totalDelta === "number" ? totalDelta : 1);

      const previousSlideAttempts = current.slideAttempts[
        currentSlideIndex
      ] || {
        correct: 0,
        total: 0,
      };
      const nextSlideAttempts = {
        correct:
          previousSlideAttempts.correct +
          (typeof correctDelta === "number" ? correctDelta : isCorrect ? 1 : 0),
        total:
          previousSlideAttempts.total +
          (typeof totalDelta === "number" ? totalDelta : 1),
      };

      const derivedExerciseAccuracy =
        typeof exerciseAccuracy === "number"
          ? exerciseAccuracy
          : calculateLessonAccuracy(
              nextSlideAttempts.correct,
              nextSlideAttempts.total,
            );

      return {
        correct: nextCorrect,
        total: nextTotal,
        slideAttempts: {
          ...current.slideAttempts,
          [currentSlideIndex]: nextSlideAttempts,
        },
        exerciseScores: {
          ...current.exerciseScores,
          [currentSlideIndex]: derivedExerciseAccuracy,
        },
      };
    });
  };

  useEffect(() => {
    if (!lessonMetaLoaded || currentSlide?.type !== "finish") return;
    if (lessonAlreadyCompleted || lessonCommitRef.current) return;

    lessonCommitRef.current = true;

    async function commitLessonCompletion() {
      if (lesson?.id != null) {
        const progress = await loadProgress();
        await Promise.all([
          saveProgress({ ...progress, [lesson.id]: true }),
          AsyncStorage.setItem(LESSON_STREAK_STORAGE_KEY, String(nextStreak)),
        ]);
      }
    }

    commitLessonCompletion();
  }, [
    currentSlide?.type,
    lesson?.id,
    lessonAlreadyCompleted,
    lessonMetaLoaded,
    nextStreak,
  ]);

  const findNextLesson = () => {
    if (!lessons || !lesson) return null;
    const lessonIndex = lessons.findIndex(
      (lessonItem) => String(lessonItem.id) === String(lesson.id),
    );
    return lessons[lessonIndex + 1] || null;
  };

  const goToNextLesson = async () => {
    navigation.replace("Inglescompleto", {
      autoOpenLessonId: findNextLesson()?.id || null,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
      <SlideNavContext.Provider
        value={{
          ...slideNav,
          progressAnim,
          goBack: () => navigation.goBack(),
        }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <LessonSlideRenderer
            slide={currentSlide}
            next={slideNav.next}
            speak={speak}
            onPressNextLesson={goToNextLesson}
            onAttempt={handleAttempt}
            feedbackProps={{
              earnedXp,
              accuracy: lessonAccuracy,
              streak: nextStreak,
              totalXp: totalXpAfterLesson,
              lessonAlreadyCompleted,
              ...levelProgress,
            }}
          />
        </ScrollView>
      </SlideNavContext.Provider>
    </SafeAreaView>
  );
}
  
*/
