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
    key: "separable-phrasal-verbs-intro",
    component: Exercise17,
    activity: {
      label: "Phrasal Verbs: Separar ou Não Separar?",
      content: [
        `Alguns Phrasal Verbs podem ser separados pelo objeto.

Exemplo:
Turn on the TV -> Turn the TV on.

A REGRA DE OURO NATIVA:
Se você usar um pronome (it, them, him), você obrigatoriamente deve separar o verbo.

Certo: Turn it on.
Errado: Turn on it.`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "turn-it-on-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e escolha a alternativa correta.",
      image: BussinesImages.config,
      audioSource: require("../../../../../mp3/IC/B1/A35S2.mp3"),
      audioText: "Turn it on",
      audioDurationMs: 1200,
      answerOptions: ["Turn on it", "Turn it on"],
      correctOption: "Turn it on",
      successTitle: "Correto",
      feedbackMessage:
        'Com pronome, separe: "Turn it on", nunca "Turn on it".',
    },
  },
  {
    key: "throw-it-away",
    component: Exercise4,
    activity: {
      prompt:
        'O Phrasal Verb "Throw away" é separável. Escolha a frase correta usando o pronome "it".',
      image: ICB1.A35S3,
      wrongSentence: "Throw away + it",
      options: [
        "Throw away it immediately!",
        "Throw it away immediately!",
        "It throw away immediately!",
      ],
      correctAnswer: "Throw it away immediately!",
      successTitle: "Correto",
      successMessage: "Com pronomes, o objeto fica no meio do phrasal verb.",
    },
  },
  {
    key: "inseparable-tip",
    component: Exercise17,
    activity: {
      label: "Os Inseparáveis",
      content: [
        `Alguns Phrasal Verbs nunca se separam, não importa se você usa pronome ou não.

Geralmente, são verbos de movimento ou direção.

Exemplo:
Get on (subir no ônibus/trem).

Você diz:
Get on it.

Nunca:
Get it on.`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "get-on-train-true-false",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e responda: Verdadeiro ou Falso?",
      image: ICB1.A35S5,
      audioSource: require("../../../../../mp3/IC/B1/A35S5.mp3"),
      audioText: "Hurry up and get on the train!",
      audioDurationMs: 2600,
      statement:
        'The phrase "get the train on" is also correct in this context.',
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      feedbackMessage: "Get on é inseparável nesse contexto.",
    },
  },
  {
    key: "pick-it-up-order",
    component: Exercise6,
    activity: {
      prompt:
        '"Pick up" é separável. Clique nas palavras para escrever a frase.',
      words: ["up", "Please,", "it", "pick"],
      correctOrder: ["Please,", "pick", "it", "up"],
      successTitle: "Correto",
      successMessage: "Please, pick it up.",
    },
  },
  {
    key: "wallet-pick-throw",
    component: Exercise2,
    activity: {
      prompt: "Complete o texto com as alternativas.",
      paragraphs: [
        [
          "I found a wallet on the street. I decided to ",
          {
            id: "blank-1",
            options: ["pick it up", "pick up it"],
            answer: "pick it up",
          },
          " and try to find the owner. I couldn't just ",
          {
            id: "blank-2",
            options: ["throw away it", "throw it away"],
            answer: "throw it away",
          },
          ".",
        ],
      ],
      successTitle: "Correto",
      successMessage: "Pick it up e throw it away seguem a regra do pronome.",
    },
  },
  {
    key: "take-shoes-off",
    component: Exercise18,
    activity: {
      prompt: "As palavras estão bagunçadas. Digite a frase corretamente.",
      scrambledSentence: "shoes / Take / off / your",
      correctAnswer: "Take your shoes off.",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "Take your shoes off. Também seria possível: Take off your shoes.",
    },
  },
  {
    key: "phrasal-verbs-test-mode",
    component: Exercise10,
    activity: {
      prompt:
        "Você tem 5 segundos para cada pergunta. Teste de revisão dos Phrasal Verbs!",
      lockStorageKey: "@B1IC35_phrasal_verbs_test_lock",
      questions: [
        {
          image: Images.ex16,
          question: 'Qual frase está correta com "turn on" + it?',
          options: ["Turn on it.", "Turn it on.", "It turn on."],
          correctAnswer: "Turn it on.",
        },
        {
          image: Images.ex16,
          question: 'Qual phrasal verb é inseparável neste contexto?',
          options: ["Get on", "Throw away", "Pick up"],
          correctAnswer: "Get on",
        },
        {
          image: Images.ex16,
          question: 'Escolha a frase correta com "throw away" + it.',
          options: ["Throw away it.", "Throw it away.", "It throw away."],
          correctAnswer: "Throw it away.",
        },
        {
          image: Images.ex16,
          question: 'Complete: Please, pick ___ up.',
          options: ["it", "up it", "on it"],
          correctAnswer: "it",
        },
        {
          image: Images.ex16,
          question: "Com pronomes, phrasal verbs separáveis devem...",
          options: ["ficar separados", "ficar sempre juntos", "vir no passado"],
          correctAnswer: "ficar separados",
        },
        {
          image: Images.ex16,
          question: 'Qual opção é correta?',
          options: ["Take your shoes off.", "Take off them.", "Pick up it."],
          correctAnswer: "Take your shoes off.",
        },
        {
          image: Images.ex16,
          question: 'Em "get on the train", o phrasal verb significa...',
          options: ["subir/entrar no trem", "jogar o trem fora", "ligar o trem"],
          correctAnswer: "subir/entrar no trem",
        },
        {
          image: Images.ex16,
          question: 'Qual frase está errada?',
          options: ["Turn it on.", "Throw it away.", "Pick up it."],
          correctAnswer: "Pick up it.",
        },
        {
          image: Images.ex16,
          question: 'Qual objeto é pronome?',
          options: ["it", "the TV", "the train"],
          correctAnswer: "it",
        },
        {
          image: Images.ex16,
          question: 'Qual frase usa um objeto comum, não um pronome?',
          options: ["Turn on the TV.", "Turn it on.", "Throw it away."],
          correctAnswer: "Turn on the TV.",
        },
      ],
      successTitle: "Correto",
      successMessage: "Você dominou a regra dos phrasal verbs separáveis.",
      feedbackMessage:
        "Revise a regra: com pronomes, o objeto entra no meio do phrasal verb separável.",
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

export default function B1IC35({ route, navigation }) {
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
