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
    key: "native-speech-intro",
    component: Exercise17,
    activity: {
      label: "Como os nativos realmente falam",
      content: [
        `Na escola você aprende: "I have seen that". Na rua, você vai ouvir: "I've seen that" ou até "I seen that" em fala informal, embora seja gramaticalmente errado.

/blue{As Contrações Extremas}
I've / You've / We've / They've
He's / She's / It's

Sim, o 's do Present Perfect é igual ao do is. O contexto mostra o sentido.

/blue{Expressões chave de nativo}
Been there, done that: "já passei por isso, já fiz isso".

I've had it with...: "não aguento mais", "cheguei no meu limite".

What've you been up to?: a forma comum de perguntar "o que você tem feito de bom?".`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "whatve-up-to",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escolha a melhor interpretação",
      image: ICB1.A5S5,
      audioText: "Hey man! What've you been up to lately?",
      audioDurationMs: 3200,
      answerOptions: [
        "The speaker is asking about the other person's recent activities.",
        "The speaker is asking where the other person is going right now.",
      ],
      correctOption:
        "The speaker is asking about the other person's recent activities.",
      successTitle: "Correto",
      feedbackMessage:
        '"What\'ve you been up to?" é o "e aí, quais as novidades?" dos nativos.',
    },
  },
  {
    key: "ive-had-it",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escolha a melhor interpretação",
      image: ICB1.A6S2,
      audioText: "That's it! I've had it with this buggy code!",
      audioDurationMs: 3400,
      answerOptions: [
        "The speaker is frustrated and has reached his limit.",
        "The speaker just received a new gift.",
      ],
      correctOption: "The speaker is frustrated and has reached his limit.",
      successTitle: "Correto",
      feedbackMessage:
        '"I\'ve had it" é uma expressão idiomática fixa no Present Perfect.',
    },
  },
  {
    key: "been-there-done-that",
    component: Exercise8,
    activity: {
      prompt: "O que essa imagem representa melhor na fala de um nativo?",
      image: ICB1.A6S5,
      options: [
        "David has just arrived at the tower.",
        "Been there, done that.",
        "David is still looking for the tower.",
      ],
      correctAnswer: "Been there, done that.",
      successTitle: "Correto",
      successMessage:
        '"Been there, done that" indica que a pessoa já teve aquela experiência e ela não é mais novidade.',
    },
  },
  {
    key: "informal-coffee-native",
    component: Exercise8,
    activity: {
      prompt:
        "Qual dessas frases um nativo dificilmente diria em uma conversa informal no café?",
      image: ICB1.A7S1,
      options: [
        "I've been around.",
        "I have been a teacher for ten years.",
        "I've done this a million times.",
      ],
      correctAnswer: "I have been a teacher for ten years.",
      successTitle: "Correto",
      successMessage:
        'Em conversa informal, nativos preferem contrações como "I\'ve" ou expressões mais curtas.',
    },
  },
  {
    key: "store-app-dialogue",
    component: Exercise2,
    activity: {
      prompt: "Complete a conversa",
      paragraphs: [
        [
          "George: \"It's great! We've",
          {
            id: "blank-1",
            answer: "been",
            options: ["been", "yet", "already"],
          },
          'working on the new UI."',
        ],
        [
          'CEO: "Nice. Have you finished the animations',
          {
            id: "blank-2",
            answer: "yet",
            options: ["already", "yet", "been"],
          },
          '?"',
        ],
        [
          'George: "Not',
          {
            id: "blank-3",
            answer: "yet",
            options: ["yet", "been", "already"],
          },
          ", but I've",
          {
            id: "blank-4",
            answer: "already",
            options: ["yet", "already", "been"],
          },
          'finished the icons."',
        ],
      ],
      successTitle: "Correto",
      successMessage: "A sequência correta é: been / yet / yet / already.",
    },
  },
  {
    key: "small-talk-reading",
    component: Exercise17,
    activity: {
      label: "Small Talk like a Pro",
      content: [
        `"David meets an old friend at the studio. 'Long time no see! What've you been up to?', the friend asks. David smiles: 'Man, I've been busy with my new app. I've been coding like crazy!'. His friend laughs: 'I know the feeling. Been there, done that. I still haven't finished my own project, but I've just signed a new contract!'. They've both been around the tech scene for a while, so they know how it goes."`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "write-native-slang",
    component: Exercise12,
    activity: {
      prompt: "Use a gíria dos nativos!",
      instruction:
        'Escreva 2 frases: uma usando "What\'ve you been up to?" e outra usando "Been there, done that".',
      helperText: "Use as expressões em uma situação da sua vida.",
      image: ICB1.A7S3,
      placeholder:
        "Hey Kaique, what've you been up to? Learning React Native? Been there, done that!",
      tipText:
        '"What\'ve you been up to?" pergunta sobre novidades recentes. "Been there, done that" mostra que você já viveu aquela situação.',
      minLength: 20,
      successTitle: "Correto",
      successMessage: "Boa! Você praticou expressões naturais de conversa.",
    },
  },
  {
    key: "native-style-conclusion",
    component: Exercise17,
    activity: {
      label: "Você fala como um nativo!",
      content: [
        `Agora você não apenas sabe a regra, você sabe o estilo.

Resumo:
What've you been up to? = O que tem feito?
Been there, done that = Já conheço, já fiz.
I've had it = Chega, cansei!

Continue praticando o listening das contrações!

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

export default function B1IC04({ route, navigation }) {
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
