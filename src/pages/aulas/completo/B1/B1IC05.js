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
    key: "simple-continuous-intro",
    component: Exercise17,
    activity: {
      label: "O que importa na sua frase?",
      content: [
        `No nível avançado, a gramática é uma ferramenta de ênfase.

/blue{Present Perfect Simple: O Quê}
Foco: resultado final ou quantidade.
Fórmula: Subject + have/has + Past Participle
Uso: quando você quer dizer "missão cumprida" ou "fiz X vezes".
Ex: I've built the login screen. (Está pronto!)

/blue{Present Perfect Continuous: O Como}
Foco: esforço, duração e cansaço.
Fórmula: Subject + have/has + been + Verb-ing
Uso: quando você quer mostrar que está ralando em algo há um tempo.
Ex: I've been building the login screen. (Ainda estou nela, que trabalho!)`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "match-intention",
    component: Exercise2,
    activity: {
      prompt: "Escolha a intenção correta do falante",
      paragraphs: [
        [
          '"I\'ve been playing the guitar all day." -',
          {
            id: "blank-1",
            answer: "tempo gasto",
            options: ["tempo gasto", "quantidade", "resultado"],
          },
        ],
        [
          '"I\'ve played the guitar twice today." -',
          {
            id: "blank-2",
            answer: "quantidade",
            options: ["resultado", "tempo gasto", "quantidade"],
          },
        ],
        [
          '"I\'ve finished the song." -',
          {
            id: "blank-3",
            answer: "resultado",
            options: ["quantidade", "resultado", "tempo gasto"],
          },
        ],
      ],
      successTitle: "Correto",
      successMessage:
        "Continuous foca no esforço e no tempo. Simple foca em quantidade ou resultado.",
    },
  },
  {
    key: "fixing-bug-since-breakfast",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escolha a melhor interpretação",
      image: ICB1.A7S5,
      audioText: "Man, I've been fixing this bug since breakfast!",
      audioDurationMs: 3400,
      answerOptions: [
        "David is emphasizing the continuous struggle and duration of the task.",
        "David is celebrating that the bug is finally fixed and gone.",
      ],
      correctOption:
        "David is emphasizing the continuous struggle and duration of the task.",
      successTitle: "Correto",
      feedbackMessage:
        "O Continuous enfatiza esforço contínuo e duração da tarefa.",
    },
  },
  {
    key: "learn-context",
    component: Exercise2,
    activity: {
      prompt: "Analise o contexto e preencha com a forma correta de LEARN",
      paragraphs: [
        [
          "David is a fast learner. Today, he",
          {
            id: "blank-1",
            answer: "has learned",
            options: ["has learned", "has been learning", "learned"],
          },
          "three new React Native tricks.",
        ],
        [
          "He is exhausted because he",
          {
            id: "blank-2",
            answer: "has been learning",
            options: ["has learned", "has been learning", "learns"],
          },
          "new features all afternoon.",
        ],
      ],
      successTitle: "Correto",
      successMessage:
        '"Has learned" foca no resultado/quantidade. "Has been learning" foca no processo/duração.',
    },
  },
  {
    key: "order-duration",
    component: Exercise6,
    activity: {
      prompt: "Desembaralhe a frase que foca na duração da ação:",
      words: ["He", "long", "working", "has", "been", "for", "."],
      correctOrder: ["He", "has", "been", "working", "for", "long", "."],
      successTitle: "Correto",
      successMessage: "He has been working for long.",
    },
  },
  {
    key: "chameleons-progress",
    component: Exercise8,
    activity: {
      prompt: "Qual frase descreve o progresso atual?",
      image: ICB1.A8S1,
      options: [
        "David has been drawing 5 chameleons.",
        "David has drawn 5 chameleons so far.",
        "David draws chameleons every day.",
      ],
      correctAnswer: "David has drawn 5 chameleons so far.",
      successTitle: "Correto",
      successMessage:
        "Usamos o Simple, has drawn, porque estamos contando o resultado parcial: 5 desenhos prontos.",
    },
  },
  {
    key: "quality-quantity-reading",
    component: Exercise17,
    activity: {
      label: "Quality vs. Quantity",
      content: [
        `"In the Lingueto studio, David has been recording audios for six hours (Continuous - focus on the hard work). He has recorded 40 sentences so far (Simple - focus on the number). He has also been trying to find the perfect blue for the chameleon. He has tested ten different shades, but he still hasn't found the right one. He has been working hard, but he is happy with what he has achieved."`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "write-project-simple-continuous",
    component: Exercise12,
    activity: {
      prompt: "Processo e resultado",
      instruction: "O Camaleão quer ver se você entendeu a diferença.",
      helperText:
        "Escreva 2 frases sobre o seu projeto atual: uma com Continuous para dizer há quanto tempo você está nele e outra com Simple para dizer algo específico que já terminou.",
      image: ICB1.A8S2,
      placeholder:
        "I've been working on my app for months. I've finished the login screen.",
      tipText:
        "Se tem número ou quantidade, vá de Simple. Se tem all day, for ou since destacando esforço, considere o Continuous.",
      minLength: 20,
      successTitle: "Correto",
      successMessage: "Ótimo! Você alternou entre processo e resultado.",
    },
  },
  {
    key: "mission-complete-conclusion",
    component: Exercise17,
    activity: {
      label: "Missão Cumprida!",
      content: [
        `Você agora sabe alternar entre o processo e o resultado como um verdadeiro nativo.

Dica final:
Se tem número ou quantidade, vá de Simple.
Se tem "all day" ou "since", considere o Continuous!

Continue praticando essa diferença. Ela muda a intenção da frase.`,
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

export default function B1IC05({ route, navigation }) {
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
