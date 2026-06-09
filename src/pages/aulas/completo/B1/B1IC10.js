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
import { BussinesImages, ICB1, Images } from "../../../../util/images";
import {
  calculateLessonAccuracy,
  LESSON_STREAK_MIN_ACCURACY,
  LESSON_STREAK_STORAGE_KEY,
} from "../../../../util/lessonPerformance";
import { getLevelProgress, XP_PER_LESSON } from "../../../../util/xp";

const SlideNavContext = React.createContext(null);

const STORAGE_KEY = "@progesso_ingles_completo_B1";
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

const LESSON_SLIDES = [
  {
    key: "success-vocabulary-intro",
    component: Exercise17,
    activity: {
      label: "O Vocabulário do Sucesso",
      content: [
        `Para entender a vida de um grande ícone da tecnologia, precisamos dominar quatro conceitos fundamentais.

Vamos aprender a falar e a identificar cada um deles agora:

Founder: fundador.
Visionary: alguém com visão criativa sobre o futuro.
Innovative: algo novo, avançado e original.
Legacy: o impacto duradouro deixado por alguém.`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "founder-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escolha a definição correta",
      image: ICB1.A14S4,
      audioSource: require("../../../../../mp3/IC/B1/A10S1.mp3"),
      audioDurationMs: 3000,
      answerOptions: [
        "The person who starts a company or an organization.",
        "A person who finds lost items in a garage.",
      ],
      correctOption: "The person who starts a company or an organization.",
      successTitle: "Correto",
      feedbackMessage: "Pronúncia: FÁUN-der.",
    },
  },
  {
    key: "visionary-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escolha a definição correta",
      image: ICB1.A15S2,
      audioSource: require("../../../../../mp3/IC/B1/A10S2.mp3"),
      audioDurationMs: 3200,
      answerOptions: [
        "Someone who has creative and original ideas about the future.",
        "Someone who has difficulty seeing things clearly.",
      ],
      correctOption:
        "Someone who has creative and original ideas about the future.",
      successTitle: "Correto",
      feedbackMessage: "Pronúncia: VÍ-jio-né-ri.",
    },
  },
  {
    key: "innovative-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escolha a definição correta",
      image: ICB1.A15S3,
      audioSource: require("../../../../../mp3/IC/B1/A10S3.mp3"),
      audioDurationMs: 3200,
      answerOptions: [
        "Featuring new methods; advanced and original.",
        "Using old technology from many years ago.",
      ],
      correctOption: "Featuring new methods; advanced and original.",
      successTitle: "Correto",
      feedbackMessage: "Pronúncia: Í-no-vei-tiv.",
    },
  },
  {
    key: "legacy-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escolha a definição correta",
      image: ICB1.A15S6,
      audioSource: require("../../../../../mp3/IC/B1/A10S4.mp3"),
      audioDurationMs: 3400,
      answerOptions: [
        "The long-lasting impact or reputation left by someone.",
        "A type of legal document used to buy a house.",
      ],
      correctOption: "The long-lasting impact or reputation left by someone.",
      successTitle: "Correto",
      feedbackMessage: "Pronúncia: LÉ-ga-si.",
    },
  },
  {
    key: "man-behind-apple",
    component: Exercise17,
    activity: {
      label: "The Man Behind the Apple",
      content: [
        `"Steve Jobs was the founder of Apple and a true visionary of the digital age. He was born in 1955 in San Francisco. Along with Steve Wozniak, he started Apple in a garage. Jobs believed that technology should be beautiful and easy to use, not just functional.

He led the creation of innovative products that changed the world, such as the Macintosh, the iPod, and the iPhone. He was famous for his attention to detail and his 'Bento Grid' style of thinking, keeping things organized and elegant. Although he passed away in 2011, his legacy lives on in every smartphone and tablet we use today."`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "jobs-garage",
    component: Exercise4,
    activity: {
      prompt: "Com base no texto, escolha a opção correta:",
      image: ICB1.A15S7,
      wrongSentence: "Jobs and Wozniak started Apple in...",
      options: ["a garage", "a professional studio"],
      correctAnswer: "a garage",
      successTitle: "Correto",
      successMessage: "Segundo o texto, a Apple começou em uma garagem.",
    },
  },
  {
    key: "jobs-belief",
    component: Exercise4,
    activity: {
      prompt: "Com base no texto, escolha a opção correta:",
      image: ICB1.A16S2,
      wrongSentence: "Jobs believed technology should be...",
      options: [
        "It should be only functional",
        "It should be beautiful and easy to use",
      ],
      correctAnswer: "It should be beautiful and easy to use",
      successTitle: "Correto",
      successMessage:
        "Ele acreditava em tecnologia bonita, simples e funcional.",
    },
  },
  {
    key: "jobs-product",
    component: Exercise4,
    activity: {
      prompt: "Com base no texto, escolha a opção correta:",
      image: ICB1.A16S3,
      wrongSentence: "Which product is mentioned in the text?",
      options: ["The iPhone", "The electric guitar"],
      correctAnswer: "The iPhone",
      successTitle: "Correto",
      successMessage: "O texto cita o iPhone como produto inovador.",
    },
  },
  {
    key: "jobs-legacy",
    component: Exercise4,
    activity: {
      prompt: "Com base no texto, escolha a opção correta:",
      image: ICB1.A16S5,
      wrongSentence: "What lives on today?",
      options: ["Steve Jobs' legacy", "The first Apple garage"],
      correctAnswer: "Steve Jobs' legacy",
      successTitle: "Correto",
      successMessage:
        "O legado dele continua vivo nos dispositivos que usamos.",
    },
  },
  {
    key: "order-innovative-visionary",
    component: Exercise6,
    activity: {
      prompt: "Monte a frase sobre o impacto de Jobs:",
      words: [
        "He",
        "was",
        "an",
        "innovative",
        "and",
        "visionary",
        "leader",
        ".",
      ],
      correctOrder: [
        "He",
        "was",
        "an",
        "innovative",
        "and",
        "visionary",
        "leader",
        ".",
      ],
      successTitle: "Correto",
      successMessage: "He was an innovative and visionary leader.",
    },
  },
  {
    key: "future-legacy-write",
    component: Exercise12,
    activity: {
      prompt: "O Camaleão te desafia!",
      instruction: "Tema: Your Future Legacy.",
      helperText:
        "Escreva 3 frases: imagine que você é founder de algo novo, use innovative para descrever sua ideia e diga qual legacy quer deixar.",
      image: ICB1.A16S6,
      placeholder:
        "I am the founder of a new language app. My idea is innovative because it mixes AI and real practice. I want to leave a legacy for future developers.",
      tipText:
        "Use founder para fundador, innovative para inovador e legacy para legado.",
      minLength: 35,
      successTitle: "Correto",
      successMessage: "Excelente! Você conectou vocabulário e visão pessoal.",
    },
  },
  {
    key: "icon-lesson-complete",
    component: Exercise17,
    activity: {
      label: "Lição de Ícone Completa!",
      content: [
        `Você aprendeu a falar e a entender termos essenciais através da história de um mestre do design.

Recapitulando:
Founder = Fundador.
Visionary = Visionário.
Innovative = Inovador.
Legacy = Legado.

Continue focado na sua visão, o mundo precisa de mentes inovadoras!

See you!`,
      ],
      continueLabel: "Finalizar",
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

export default function B1IC10({ route, navigation }) {
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
    navigation.replace("InglescompletoB1", {
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
