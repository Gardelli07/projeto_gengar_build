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
    key: "strengths-intro",
    component: Exercise17,
    activity: {
      label: "O Método Sanduíche",
      content: [
        `Nativos não apenas listam adjetivos; eles vendem resultados.

/blue{Strengths}
Use adjetivos de ação como proactive, resourceful ou adaptable. Sempre dê um exemplo curto de um resultado que você alcançou.

/blue{Weaknesses}
O segredo não é esconder o erro, mas mostrar a solução.

Estrutura:
"I struggle with [fraqueza], but I've been [ação de melhoria] to fix it."

/blue{Dica do Camaleão}
Nunca diga que não tem fraquezas. Isso soa arrogante ou mentiroso. Escolha algo real, mas que não destrua sua chance na vaga.`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "buzzwords-match",
    component: Exercise1,
    activity: {
      prompt: "Associe o buzzword à definição profissional:",
      pairs: [
        {
          en: "Resourceful",
          pt: "Encontra soluções criativas em situações difíceis.",
        },
        {
          en: "Team Player",
          pt: "Prioriza o sucesso do grupo e colabora bem.",
        },
        {
          en: "Proactive",
          pt: "Age antes que o problema aconteça; tem iniciativa.",
        },
        {
          en: "Detail-oriented",
          pt: "Tem olhar aguçado para detalhes e precisão.",
        },
      ],
      successTitle: "Excelente",
      successMessage: "Você associou os pontos fortes corretamente.",
    },
  },
  {
    key: "adaptable-interview",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escolha a melhor interpretação",
      image: ICB1.A8S3,
      audioText:
        "I'd say my main strength is that I'm highly adaptable. I've been working with different frameworks for years, and I pick up new tech very quickly.",
      audioDurationMs: 7200,
      answerOptions: [
        "David focuses on his ability to learn and adjust to new environments.",
        "David is saying he is tired of working with different frameworks.",
      ],
      correctOption:
        "David focuses on his ability to learn and adjust to new environments.",
      successTitle: "Correto",
      feedbackMessage:
        "Adaptable comunica capacidade de aprender rápido e se ajustar a novos cenários.",
    },
  },
  {
    key: "continuous-improvement",
    component: Exercise2,
    activity: {
      prompt: "Preencha com a estratégia de melhoria contínua:",
      paragraphs: [
        [
          "I sometimes",
          {
            id: "b1",
            answer: "struggle",
            options: ["been", "struggle", "working"],
          },
          "with public speaking.",
        ],
        [
          "However, I have",
          {
            id: "b2",
            answer: "been",
            options: ["working", "struggle", "been"],
          },
          "taking a course to improve my communication.",
        ],
        [
          "I've been",
          {
            id: "b3",
            answer: "working",
            options: ["been", "working", "struggle"],
          },
          "on my presentation skills lately.",
        ],
      ],
      successTitle: "Correto",
      successMessage: "A sequência correta é: struggle / been / working.",
    },
  },
  {
    key: "spell-problem-solver",
    component: Exercise13,
    needsSpeech: true,
    activity: {
      prompt: "Desembaralhe a força que todo desenvolvedor de app precisa ter:",
      audioText: "Problem solver",
      audioDurationMs: 1200,
      letters: [
        "S",
        "O",
        "L",
        "V",
        "E",
        "R",
        "-",
        "P",
        "R",
        "O",
        "B",
        "L",
        "E",
        "M",
      ],
      correctWord: "PROBLEM-SOLVER",
      successTitle: "Correto",
      successMessage: 'A força é "PROBLEM-SOLVER".',
    },
  },
  {
    key: "confident-posture",
    component: Exercise8,
    activity: {
      prompt: "Qual ponto forte essa postura comunica ao recrutador?",
      image: ICB1.A8S4,
      options: [
        "David is distracted and wants to leave.",
        "David is confident and engaged in the conversation.",
        "David is nervous and doesn't know what to say.",
      ],
      correctAnswer: "David is confident and engaged in the conversation.",
      successTitle: "Correto",
      successMessage:
        "Linguagem corporal é parte importante da entrevista. Postura aberta indica confiança.",
    },
  },
  {
    key: "weakness-dialogue",
    component: Exercise2,
    activity: {
      prompt: "Complete a entrevista",
      paragraphs: [
        [
          "David: \"I tend to take on too many tasks. But lately, I've",
          { id: "b1", answer: "been", options: ["been", "has", "yet"] },
          'learning how to delegate more effectively."',
        ],
        [
          'Interviewer: "And how has that',
          { id: "b2", answer: "been", options: ["has", "been", "working"] },
          'going?"',
        ],
        [
          "David: \"It's been great. My team",
          { id: "b3", answer: "has", options: ["been", "has", "have"] },
          'been more productive since then."',
        ],
      ],
      successTitle: "Correto",
      successMessage: "A sequência correta é: been / been / has.",
    },
  },
  {
    key: "candidate-review",
    component: Exercise17,
    activity: {
      label: "Candidate Review: David",
      content: [
        `"David has a very strong profile. He described himself as a resourceful developer who has been building complex UIs for years. When asked about his weaknesses, he didn't give a cliché answer. He admitted that he has struggled with time management in the past, but he has been using the Pomodoro technique to stay focused. He has already finished several high-level projects, proving he is a results-oriented professional."`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "write-strength-weakness",
    component: Exercise12,
    activity: {
      prompt: "O Camaleão quer te contratar!",
      instruction:
        'Escreva sua "strength" mais forte e uma "weakness" que você está resolvendo.',
      helperText: 'Use "I\'ve been working on..." para a fraqueza.',
      image: ICB1.A8S6,
      placeholder:
        "My main strength is that I'm resourceful. I struggle with public speaking, but I've been working on it.",
      tipText:
        "Mostre uma qualidade com resultado e uma fraqueza com plano de ação.",
      minLength: 20,
      successTitle: "Correto",
      successMessage: "Boa! Sua resposta soa mais profissional.",
    },
  },
  {
    key: "job-guaranteed",
    component: Exercise17,
    activity: {
      label: "Vaga Garantida!",
      content: [
        `Você saiu do básico "I am good" para o avançado "I am a proactive problem-solver".

Resumo:
Strengths = adjetivos de ação + exemplos.
Weaknesses = honestidade + plano de ação.

Pratique no espelho e lembre-se: a confiança vem da preparação!

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

export default function B1IC06({ route, navigation }) {
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
