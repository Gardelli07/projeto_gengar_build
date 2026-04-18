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
import { IC, Images } from "../../../util/images";
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
    component: Exercise17,
    activity: {
      label: "Tip",
      content: [
        `Para dizer quem você é, você precisa de uma palavra mágica. Consegue adivinhar?`,
        IC.A8S1,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: IC.A8S2,
      audioSource: require("../../../../mp3/IC/A8S2.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["He", "Hi"],
      correctOption: "He",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "He is" para dizer "ele é".',
    },
  },
  {
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: IC.A8S3,
      audioSource: require("../../../../mp3/IC/A8S3.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["She", "See"],
      correctOption: "She",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "She is" para dizer "ela é".',
    },
  },
  {
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: IC.A8S4,
      audioSource: require("../../../../mp3/IC/A8S4.mp3"),
      audioDurationMs: 600,
      answerOptions: ["It", "Eat"],
      correctOption: "It",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "It is" para dizer "é".',
    },
  },
  {
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: IC.A8S5,
      audioSource: require("../../../../mp3/IC/A8S5.mp3"),
      audioDurationMs: 600,
      answerOptions: ["Is", "Easy"],
      correctOption: "Is",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "Is" para dizer "é".',
    },
  },
  {
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: IC.A8S6,
      audioSource: require("../../../../mp3/IC/A8S6.mp3"),
      audioDurationMs: 1000,
      answerOptions: ["Isn't", "Is"],
      correctOption: "Isn't",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "Isn\'t" para dizer "é".',
    },
  },
  {
    component: Exercise17,
    activity: {
      label: "Tip",
      content: [
        `O Camaleão ensina: 
He (ele), She (ela) e It (coisas/animais) são melhores amigos da palavra IS. 
Pense neles como um time inseparável! `,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: Exercise15,
    activity: {
      prompt: "Clique na imagem e na palavra",
      images: [
        { id: "img1", image: IC.A8S2 },
        { id: "img2", image: IC.A8S3 },
        { id: "img3", image: IC.A8S4 },
      ],
      words: [
        { id: "test1", label: "He" },
        { id: "test2", label: "She" },
        { id: "test3", label: "It" },
      ],
      pairs: [
        { imageId: "img1", wordId: "test1" },
        { imageId: "img2", wordId: "test2" },
        { imageId: "img3", wordId: "test3" },
      ],
      successTitle: "Correto",
      successMessage: "Você formou os dois pares corretamente.",
    },
  },
  {
    component: Exercise1,
    activity: {
      prompt: "Encontre a tradução",
      pairs: [
        { en: "He is", pt: "Ele é/está" },
        { en: "She is", pt: "Ela é/está" },
        { en: "It is", pt: "Isto é/está" },
      ],
      successTitle: "Excelente",
      successMessage: "Você acertou todas as traduções.",
    },
  },
  {
    component: Exercise13,
    needsSpeech: true,
    activity: {
      prompt: "Escreva a palavra",
      audioSource: require("../../../../mp3/IC/A8S6.mp3"),
      audioDurationMs: 800,
      letters: ["I", "S", "N", "T"],
      correctWord: "ISNT",
      successTitle: "Correto",
      successMessage: 'A palavra correta é "Isn\'t".',
    },
  },
  {
    component: Exercise17,
    activity: {
      label: "Tip",
      content: [
        `Dica de Pronúncia: Em vez de falar 'Is not', os nativos quase sempre dizem Isn't. 
O som é como um 'iz-ent'. Pratique esse som para não parecer um robô!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: Exercise4,
    activity: {
      prompt: "Corrija",
      image: IC.A8S12,
      wrongSentence: "Você está apontando para uma médica.",
      options: ["He is a doctor.", "She is a doctor."],
      correctAnswer: "She is a doctor.",
      successTitle: "Correto",
      successMessage: 'A forma correta e "She is a doctor."',
    },
  },
  {
    component: Exercise2,
    activity: {
      prompt: "Completar o Texto",
      paragraphs: [
        [
          "It",
          { id: "blank-1", answer: "isn’t", options: ["isn’t", "is"] },
          "a sunny day.",
        ],
        [
          "It",
          {
            id: "blank-2",
            answer: "is",
            options: ["isn’t", "is"],
          },
          "raining.",
        ],
      ],
      successTitle: "Excelente",
      successMessage: "Você completou o texto corretamente.",
    },
  },
  {
    component: Exercise6,
    activity: {
      prompt: "Coloque a frase em ordem.",
      words: ["is", "it", "a", "dog"],
      correctOrder: ["it", "is", "a", "dog"],
      successTitle: "Correto",
      successMessage: `A frase correta e "It is a dog."`,
    },
  },
  {
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction: "Fale brevemente sobre você em inglês.",
      helperText: "Aponte para uma amiga e diga: 'Ela é legal' em inglês.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: '"She is nice"',
      recordLabel: "Speak",
      stopLabel: "Parar",
      playLabel: "Ouvir",
      pauseLabel: "Pausar",
      rerecordLabel: "Regravar",
      submitLabel: "Enviar áudio",
      successTitle: "Correto",
      successMessage: "Seu áudio foi gravado com sucesso.",
    },
  },
  {
    component: Exercise17,
    activity: {
      label: "Tip",
      content: [
        `Mandou muito bem! Agora você já sabe falar de todo mundo ao seu redor.  Próxima aula: Como fazer perguntas usando o líder IS! See you! `,
      ],
      continueLabel: "Continuar",
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

export default function IC08({ route, navigation }) {
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
