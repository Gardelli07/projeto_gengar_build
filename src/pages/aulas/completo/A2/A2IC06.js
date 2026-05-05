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
import geral from "../../../../exc/geral";
import ex1, { Exercise1 } from "../../../../exc/ex1";
import ex2, { Exercise2 } from "../../../../exc/ex2";
import ex3, { Exercise3 } from "../../../../exc/ex3";
import ex4, { Exercise4 } from "../../../../exc/ex4";
import ex5, { Exercise5 } from "../../../../exc/ex5";
import ex6, { Exercise6 } from "../../../../exc/ex6";
import ex7, { Exercise7 } from "../../../../exc/ex7";
import ex8, { Exercise8 } from "../../../../exc/ex8";
import ex9, { Exercise9 } from "../../../../exc/ex9";
import ex10, { Exercise10 } from "../../../../exc/ex10";
import ex11, { Exercise11 } from "../../../../exc/ex11";
import ex12, { Exercise12 } from "../../../../exc/ex12";
import ex13, { Exercise13 } from "../../../../exc/ex13";
import ex15, { Exercise15 } from "../../../../exc/ex15";
import ex14, { Exercise14 } from "../../../../exc/ex14";
import ex16, { Exercise16 } from "../../../../exc/ex16";
import ex17, { Exercise17 } from "../../../../exc/ex17";
import ex18, { Exercise18 } from "../../../../exc/ex18";
import Feedback from "../../../../exc/feedback";
import { ICA2, Images } from "../../../../util/images";
import {
  calculateLessonAccuracy,
  LESSON_STREAK_MIN_ACCURACY,
  LESSON_STREAK_STORAGE_KEY,
} from "../../../../util/lessonPerformance";
import { getLevelProgress, XP_PER_LESSON } from "../../../../util/xp";

const SlideNavContext = React.createContext(null);

const STORAGE_KEY = "@progesso_ingles_completo_A2";
const BACK_IMAGE = require("../../../../../assets/seta.png");
const CLOSE_IMAGE = require("../../../../../assets/x.png");

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

const SABRINA_PICNIC_AUDIO =
  "Hi! I'm Sabrina. I'm sitting in the park right now. It's a beautiful day! My brother, Leo, is running near the lake. My parents are eating sandwiches on the grass. Oh, look! A small dog is chasing a ball. It's so cute! My sister is taking photos of everyone. I'm wearing my green hat and I'm drinking cold juice. My friends are arriving now. We're starting a big picnic!";

const SABRINA_PICNIC_QUESTIONS = [
  {
    image: Images.ex10,
    question: "Onde a Sabrina está agora?",
    options: ["At home", "In the park", "At the office"],
    correctAnswer: "In the park",
  },
  {
    image: Images.ex10,
    question: "O que a Sabrina está fazendo no início?",
    options: ["She's running", "She's sitting", "She's eating"],
    correctAnswer: "She's sitting",
  },
  {
    image: Images.ex10,
    question: "O que o Leo (irmão) está fazendo?",
    options: ["He's running", "He's swimming", "He's sleeping"],
    correctAnswer: "He's running",
  },
  {
    image: Images.ex10,
    question: "Onde o Leo está correndo?",
    options: ["On the street", "In the kitchen", "Near the lake"],
    correctAnswer: "Near the lake",
  },
  {
    image: Images.ex10,
    question: "O que os pais da Sabrina estão fazendo?",
    options: ["They're eating", "They're dancing", "They're working"],
    correctAnswer: "They're eating",
  },
  {
    image: Images.ex10,
    question: "O que o cachorro está fazendo?",
    options: ["It's sleeping", "It's chasing a ball", "It's eating a sandwich"],
    correctAnswer: "It's chasing a ball",
  },
  {
    image: Images.ex10,
    question: "Qual é a ação da irmã da Sabrina?",
    options: ["She's drinking juice", "She's running", "She's taking photos"],
    correctAnswer: "She's taking photos",
  },
  {
    image: Images.ex10,
    question: "O que a Sabrina está vestindo?",
    options: ["A red shirt", "A green hat", "Blue jeans"],
    correctAnswer: "A green hat",
  },
  {
    image: Images.ex10,
    question: "O que a Sabrina está bebendo?",
    options: ["Hot coffee", "Water", "Cold juice"],
    correctAnswer: "Cold juice",
  },
  {
    image: Images.ex10,
    question: "O que vai acontecer agora com os amigos?",
    options: [
      "They're leaving",
      "They're starting a picnic",
      "They're studying",
    ],
    correctAnswer: "They're starting a picnic",
  },
];

const LESSON_SLIDES = [
  {
    component: Exercise17,
    activity: {
      label: "Tip - O Som da Cena",
      content: [
        "Em diálogos reais, as pessoas usam muitas contrações (/blue{I'm}, /blue{He's}, /blue{They're}).",
        "",
        "Dica de Ouro: Preste atenção no verbo auxiliar (/blue{am/is/are}) logo após o nome da pessoa. Ele indica quem está agindo.",
        "",
        "O Alvo: Foque nas palavras terminadas em /blue{-ING}, elas são as estrelas da ação!",
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Áudio Principal: O Piquenique da Sabrina",
      image: ICA2.A6S2,
      audioText: SABRINA_PICNIC_AUDIO,
      answerOptions: ["Continuar"],
      correctOption: "Continuar",
      successTitle: "Áudio ouvido",
      successMessage: "Agora responda sobre os detalhes do piquenique.",
      audioRate: 0.82,
    },
  },
  {
    component: Exercise10,
    activity: {
      prompt:
        "Com base no áudio da Sabrina, escolha a resposta correta para cada detalhe da cena:",
      title: "Sabrina's Picnic",
      userImage: Images.ex16,
      lockStorageKey: "@a2ic06_exercise10_lock_until",
      questions: SABRINA_PICNIC_QUESTIONS,
      successTitle: "Correto",
      successMessage: "Você acertou todas as 10 respostas do áudio.",
    },
  },
  {
    component: Exercise5,
    activity: {
      prompt: "True or False",
      image: ICA2.A6S4,
      sentenceStart: "De acordo com o áudio,",
      sentenceEnd: "os pais da Sabrina estão comendo pizza.",
      options: ["True", "False"],
      correctAnswer: "False",
      successTitle: "Correto",
      successMessage: 'False. O áudio diz que eles estão comendo "sandwiches".',
      feedbackMessage: 'A comida mencionada foi "sandwiches", não pizza.',
    },
  },
  {
    component: Exercise6,
    activity: {
      prompt: "Monte a frase que descreve a Sabrina no final do áudio:",
      words: ["juice.", "Sabrina", "drinking", "is", "cold"],
      correctOrder: ["Sabrina", "is", "drinking", "cold", "juice."],
      successTitle: "Correto",
      successMessage: "Sabrina is drinking cold juice.",
      feedbackMessage: 'A ordem correta é: "Sabrina is drinking cold juice."',
    },
  },
  {
    component: Exercise11,
    activity: {
      prompt:
        "O áudio usou estes 5 verbos. Digite-os corretamente com o final -ING!",
      words: ["Sitting", "Running", "Eating", "Taking", "Arriving"],
      secondsPerWord: 5,
    },
  },
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

export default function A2IC06({ route, navigation }) {
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
    navigation.replace("InglescompletoA2", {
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
