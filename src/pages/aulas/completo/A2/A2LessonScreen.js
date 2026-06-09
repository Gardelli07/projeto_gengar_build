import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider from "@react-native-community/slider";
import { useFocusEffect } from "@react-navigation/native";
import * as Speech from "expo-speech";
import { createAudioPlayer } from "expo-audio";
import geral from "../../../../exc/geral";
import ex1, { Exercise1 } from "../../../../exc/ex1";
import ex2, { Exercise2 } from "../../../../exc/ex2";
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
import ex14, { Exercise14 } from "../../../../exc/ex14";
import ex15, { Exercise15 } from "../../../../exc/ex15";
import ex16, { Exercise16 } from "../../../../exc/ex16";
import ex17, { Exercise17 } from "../../../../exc/ex17";
import ex18, { Exercise18 } from "../../../../exc/ex18";
import ex19, { Exercise19 } from "../../../../exc/ex19";
import ex20, { Exercise20 } from "../../../../exc/ex20";
import Feedback from "../../../../exc/feedback";
import { Images } from "../../../../util/images";
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
  ...ex19,
  ...ex20,
};

const COMPONENTS = {
  Exercise1,
  Exercise2,
  Exercise4,
  Exercise5,
  Exercise6,
  Exercise7,
  Exercise8,
  Exercise9,
  Exercise10,
  Exercise11,
  Exercise12,
  Exercise13,
  Exercise14,
  Exercise15,
  Exercise16,
  Exercise17,
  Exercise18,
  Exercise19,
  Exercise20,
};

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

function ListenOnlySlide({ activity, next, speak, onAttempt }) {
  const playerRef = useRef(null);
  const playbackSubscriptionRef = useRef(null);
  const completedRef = useRef(false);
  const shouldResumeAfterSeekRef = useRef(false);
  const speechPausedRef = useRef(false);

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);

  const audioRate = activity.audioRate || 0.85;
  const audioPromptText = activity.audioText || activity.transcript || "";
  const estimatedDurationMs =
    activity.audioDurationMs ||
    Math.max(
      1200,
      Math.round(((audioPromptText.length / 5) * 60000) / 140 / audioRate),
    );

  const clearPlayback = () => {
    if (playbackSubscriptionRef.current) {
      playbackSubscriptionRef.current.remove();
      playbackSubscriptionRef.current = null;
    }

    if (playerRef.current) {
      playerRef.current.remove();
      playerRef.current = null;
    }

    shouldResumeAfterSeekRef.current = false;
    speechPausedRef.current = false;
    Speech.stop().catch(() => {});
    setIsAudioPlaying(false);
  };

  useEffect(() => {
    return () => {
      clearPlayback();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        clearPlayback();
      };
    }, []),
  );

  const updateAudioStatus = (status) => {
    if (!status?.isLoaded) {
      setIsAudioPlaying(false);
      return;
    }

    const duration =
      typeof status.duration === "number" && status.duration > 0
        ? status.duration
        : estimatedDurationMs / 1000;
    const currentTime =
      typeof status.currentTime === "number" ? status.currentTime : 0;
    const progress = duration > 0 ? currentTime / duration : 0;

    setAudioDuration(duration);
    setAudioProgress(Math.max(0, Math.min(progress, 1)));
    setIsAudioPlaying(Boolean(status.playing));

    if (status.didJustFinish) {
      setAudioProgress(1);
      setIsAudioPlaying(false);
    }
  };

  const ensureAudioPlayer = () => {
    if (playerRef.current || !activity.audioSource) {
      return playerRef.current;
    }

    const player = createAudioPlayer(activity.audioSource, {
      updateInterval: 100,
    });
    playbackSubscriptionRef.current = player.addListener(
      "playbackStatusUpdate",
      updateAudioStatus,
    );
    playerRef.current = player;

    return player;
  };

  const playAudio = async () => {
    if (activity.audioSource) {
      try {
        const player = ensureAudioPlayer();
        if (!player) return;

        if (isAudioPlaying) {
          player.pause();
          setIsAudioPlaying(false);
          return;
        }

        if (audioProgress >= 0.995) {
          await player.seekTo(0);
          setAudioProgress(0);
        }

        player.play();
        setIsAudioPlaying(true);
        return;
      } catch (error) {
        console.warn("ListenOnlySlide playAudio error", error);
        clearPlayback();
        setAudioProgress(0);
      }
    }

    if (isAudioPlaying) {
      try {
        await Speech.pause();
        speechPausedRef.current = true;
      } catch (error) {
        await Speech.stop().catch(() => {});
        speechPausedRef.current = false;
      }

      setIsAudioPlaying(false);
      return;
    }

    if (speechPausedRef.current) {
      try {
        await Speech.resume();
        setIsAudioPlaying(true);
        return;
      } catch (error) {
        speechPausedRef.current = false;
      }
    }

    clearPlayback();
    speechPausedRef.current = false;
    setAudioProgress(0);
    setIsAudioPlaying(true);

    speak({
      text: audioPromptText,
      language: activity.audioLanguage || "en-US",
      rate: audioRate,
      onDone: () => {
        setAudioProgress(1);
        setIsAudioPlaying(false);
      },
      onStopped: () => setIsAudioPlaying(false),
      onError: () => setIsAudioPlaying(false),
    });
  };

  const handleAudioSeekStart = () => {
    shouldResumeAfterSeekRef.current = isAudioPlaying;
    playerRef.current?.pause?.();
    setIsAudioPlaying(false);
  };

  const handleAudioSeek = (value) => {
    setAudioProgress(Math.max(0, Math.min(value, 1)));
  };

  const handleAudioSeekComplete = async (value) => {
    const player = ensureAudioPlayer();
    const progress = Math.max(0, Math.min(value, 1));
    const duration = audioDuration || estimatedDurationMs / 1000;
    const seekTime = duration * progress;

    setAudioProgress(progress);

    if (!player) return;

    try {
      await player.seekTo(seekTime);

      if (shouldResumeAfterSeekRef.current) {
        player.play();
        setIsAudioPlaying(true);
      }
    } catch (error) {
      console.warn("ListenOnlySlide seekAudio error", error);
    } finally {
      shouldResumeAfterSeekRef.current = false;
    }
  };

  const handleContinue = () => {
    if (!completedRef.current) {
      completedRef.current = true;
      onAttempt({
        isCorrect: true,
        correctDelta: 0,
        totalDelta: 0,
        exerciseAccuracy: 100,
      });
    }

    clearPlayback();
    next();
  };

  return (
    <View style={styles.slide}>
      <SlideHeader />

      <Text style={styles.fastTypePrompt}>{activity.prompt}</Text>

      <View style={styles.mediaWrapper}>
        <View style={styles.mediaCard}>
          <Image
            source={activity.image || Images.ex16}
            style={styles.mediaImage}
          />
        </View>

        <View style={styles.audioButton}>
          <TouchableOpacity
            style={styles.audioPlayButton}
            onPress={playAudio}
            accessibilityRole="button"
            accessibilityLabel={
              isAudioPlaying ? "Pausar audio" : "Reproduzir audio"
            }
          >
            <Text style={styles.audioIcon}>{isAudioPlaying ? "II" : "▶"}</Text>
          </TouchableOpacity>
          <View style={styles.audioBar}>
            <Slider
              style={styles.audioSlider}
              minimumValue={0}
              maximumValue={1}
              value={audioProgress}
              minimumTrackTintColor="#F8FAFC"
              maximumTrackTintColor="rgba(255,255,255,0.35)"
              thumbTintColor="#F8FAFC"
              onSlidingStart={handleAudioSeekStart}
              onValueChange={handleAudioSeek}
              onSlidingComplete={handleAudioSeekComplete}
              disabled={!activity.audioSource}
            />
          </View>
        </View>
      </View>

      {activity.transcript ? (
        <View style={styles.tipVisualCard}>
          <Text style={styles.tipVisualText}>{activity.transcript}</Text>
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.tipVisualContinueButton}
        onPress={handleContinue}
        activeOpacity={0.9}
      >
        <Text style={styles.tipVisualContinueText}>
          {activity.continueLabel || "Continuar"}
        </Text>
      </TouchableOpacity>
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

  if (slide.type === "listenOnly") {
    return (
      <ListenOnlySlide
        activity={slide.activity}
        next={next}
        speak={speak}
        onAttempt={onAttempt}
      />
    );
  }

  const ExerciseComponent =
    typeof slide.component === "string"
      ? COMPONENTS[slide.component]
      : slide.component;

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

export default function createA2LessonScreen(slides) {
  const lessonSlides = [
    ...slides,
    {
      key: "lesson-finish",
      type: "finish",
    },
  ];
  const slideCount = lessonSlides.length;
  const exerciseSlideCount = lessonSlides.filter(
    (slide) => slide.type !== "finish",
  ).length;

  return function A2LessonScreen({ route, navigation }) {
    const lesson = route && route.params ? route.params.lesson : undefined;
    const lessons = route && route.params ? route.params.lessons : undefined;
    const { speak } = useSpeech();

    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const progressAnim = useRef(new Animated.Value(1 / slideCount)).current;
    const [lessonStats, setLessonStats] = useState({
      correct: 0,
      total: 0,
      exerciseScores: {},
      slideAttempts: {},
    });
    const [completedLessonsCount, setCompletedLessonsCount] = useState(0);
    const [currentStreak, setCurrentStreak] = useState(0);
    const [lessonAlreadyCompleted, setLessonAlreadyCompleted] =
      useState(false);
    const [lessonMetaLoaded, setLessonMetaLoaded] = useState(false);
    const lessonCommitRef = useRef(false);

    useEffect(() => {
      updateProgress(progressAnim, currentSlideIndex, slideCount);
    }, [currentSlideIndex, progressAnim]);

    const slideNav = useSlideNavigation({
      currentSlideIndex,
      setCurrentSlideIndex,
      totalSlides: slideCount,
      progressAnim,
    });

    const currentSlide = lessonSlides[currentSlideIndex];
    const completedExerciseScores = Object.values(lessonStats.exerciseScores);
    const lessonAccuracy = completedExerciseScores.length
      ? Math.round(
          completedExerciseScores.reduce((sum, score) => sum + score, 0) /
            exerciseSlideCount,
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
          lesson && lesson.id != null && progress && progress[lesson.id],
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
    }, [lesson && lesson.id]);

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
            (typeof correctDelta === "number"
              ? correctDelta
              : isCorrect
                ? 1
                : 0),
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
      if (!lessonMetaLoaded || !currentSlide || currentSlide.type !== "finish")
        return;
      if (lessonAlreadyCompleted || lessonCommitRef.current) return;

      lessonCommitRef.current = true;

      async function commitLessonCompletion() {
        if (lesson && lesson.id != null) {
          const progress = await loadProgress();
          await Promise.all([
            saveProgress({ ...progress, [lesson.id]: true }),
            AsyncStorage.setItem(LESSON_STREAK_STORAGE_KEY, String(nextStreak)),
          ]);
        }
      }

      commitLessonCompletion();
    }, [
      currentSlide && currentSlide.type,
      lesson && lesson.id,
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
      const nextLesson = findNextLesson();
      navigation.replace("InglescompletoA2", {
        autoOpenLessonId: nextLesson ? nextLesson.id : null,
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
              key={currentSlide.key || currentSlideIndex}
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
  };
}
