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
    key: "hustle-culture-intro",
    component: Exercise17,
    activity: {
      label: "Beyond the Hustle Culture",
      content: [
        `"In the modern tech world, Hustle Culture is everywhere. It's the idea that you must work '24/7' to be successful. However, this often leads to Burnout, a state of emotional and physical exhaustion.

To stay creative, developers need a healthy Work-life balance. This isn't just about 'working less', but about setting Boundaries. For example, closing your laptop at 7 PM or not checking emails on weekends. When you recharge your battery, your code actually gets better!"

/blue{Dicionário do Camaleão}
Hustle Culture: a cultura da correria incessante.
Burnout: esgotamento profissional.
Boundaries: limites essenciais para não pirar.
Recharge: recarregar as energias.`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "boundaries-burnout",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escolha a melhor interpretação",
      image: ICB1.A11S5,
      audioText: "Setting boundaries is the best way to avoid burnout.",
      audioDurationMs: 3400,
      answerOptions: [
        "The speaker believes that limits help prevent professional exhaustion.",
        "The speaker thinks working without limits is the best way to succeed.",
      ],
      correctOption:
        "The speaker believes that limits help prevent professional exhaustion.",
      successTitle: "Correto",
      feedbackMessage:
        "Boundaries são limites que ajudam a proteger sua energia.",
    },
  },
  {
    key: "hustle-culture-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escolha a definição correta",
      image: ICB1.A11S6,
      audioText: "Hustle Culture is very common in startups.",
      audioDurationMs: 3000,
      answerOptions: [
        "A social pressure to work all the time to reach success.",
        "A traditional way of farming in North America.",
      ],
      correctOption: "A social pressure to work all the time to reach success.",
      successTitle: "Correto",
      feedbackMessage: 'O "T" é mudo: RÃ-ssou KÂL-tcher.',
    },
  },
  {
    key: "boundaries-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escolha a definição correta",
      image: ICB1.A11S7,
      audioText: "You must set boundaries to protect your time.",
      audioDurationMs: 3200,
      answerOptions: [
        "Limits you establish to separate work and personal life.",
        "New features or updates in a software project.",
      ],
      correctOption: "Limits you establish to separate work and personal life.",
      successTitle: "Correto",
      feedbackMessage: "Boundaries são limites entre trabalho e vida pessoal.",
    },
  },
  {
    key: "avoid-burnout-blanks",
    component: Exercise2,
    activity: {
      prompt: "Escolha a melhor opção para completar a lógica profissional:",
      paragraphs: [
        [
          "To avoid",
          { id: "b1", answer: "Burnout", options: ["Burnout", "Scale"] },
          ", a developer needs a healthy",
        ],
        [
          {
            id: "b2",
            answer: "Work-life balance",
            options: ["Work-life balance", "Deadline"],
          },
          ".",
        ],
        [
          "This involves learning how to",
          { id: "b3", answer: "Unplug", options: ["Pitch", "Unplug"] },
          "and rest.",
        ],
      ],
      successTitle: "Correto",
      successMessage:
        "A sequência correta é: Burnout / Work-life balance / Unplug.",
    },
  },
  {
    key: "order-mental-health",
    component: Exercise6,
    activity: {
      prompt: "Monte a frase sobre prioridades:",
      words: [
        "Mental",
        "health",
        "is",
        "a",
        "priority",
        "over",
        "hustle culture",
        ".",
      ],
      correctOrder: [
        "Mental",
        "health",
        "is",
        "a",
        "priority",
        "over",
        "hustle culture",
        ".",
      ],
      successTitle: "Correto",
      successMessage: "Mental health is a priority over hustle culture.",
    },
  },
  {
    key: "wake-up-call-reading",
    component: Exercise17,
    activity: {
      label: "David's Wake-up Call",
      content: [
        `"David has been developing the Lingueto app for months. At first, he fell into the trap of Hustle Culture, working until 3 AM and drinking too much coffee. He thought that Toxic Productivity was the only way to succeed.

However, he soon faced Burnout. He couldn't code, he couldn't play his guitar, and he felt constantly exhausted. He realized that to save his project, he needed to Unplug. David started setting strict Boundaries: he now closes his laptop at 7 PM and never checks emails on weekends. This new Work-life balance didn't make him slower; it made him more creative and focused. Today, David is healthier, and his app is better than ever!"`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "why-burnout",
    component: Exercise4,
    activity: {
      prompt: "Com base no texto, escolha a resposta correta:",
      image: ICB1.A12S2,
      wrongSentence: "Why did David face Burnout?",
      options: [
        "Because he worked too much.",
        "Because he didn't like the app.",
      ],
      correctAnswer: "Because he worked too much.",
      successTitle: "Correto",
      successMessage: "Ele trabalhava até 3 da manhã e não descansava.",
    },
  },
  {
    key: "what-did-he-do",
    component: Exercise4,
    activity: {
      prompt: "Com base no texto, escolha a resposta correta:",
      image: ICB1.A12S3,
      wrongSentence: "What did David do to recover?",
      options: ["He quit his job.", "He set strict boundaries."],
      correctAnswer: "He set strict boundaries.",
      successTitle: "Correto",
      successMessage:
        "Ele passou a fechar o laptop às 19h e não checar e-mails no fim de semana.",
    },
  },
  {
    key: "app-result",
    component: Exercise4,
    activity: {
      prompt: "Com base no texto, escolha a resposta correta:",
      image: ICB1.A13S4,
      wrongSentence: "What happened to David's app?",
      options: [
        "It became better and more creative.",
        "It became slower and worse.",
      ],
      correctAnswer: "It became better and more creative.",
      successTitle: "Correto",
      successMessage: "O equilíbrio deixou David mais criativo e focado.",
    },
  },
  {
    key: "text-logic-blanks",
    component: Exercise2,
    activity: {
      prompt: "Complete a lógica com base no texto:",
      paragraphs: [
        [
          "If you follow the",
          {
            id: "b1",
            answer: "Hustle Culture",
            options: ["Hustle Culture", "Work-life balance"],
          },
          "too strictly, you might face",
        ],
        [{ id: "b2", answer: "Burnout", options: ["Success", "Burnout"] }, "."],
        [
          "To avoid this, you should set",
          {
            id: "b3",
            answer: "Boundaries",
            options: ["Deadlines", "Boundaries"],
          },
          "and find time to recharge.",
        ],
      ],
      successTitle: "Correto",
      successMessage:
        "A sequência correta é: Hustle Culture / Burnout / Boundaries.",
    },
  },
  {
    key: "recharge-false",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt: "Verdadeiro ou falso?",
      image: ICB1.A14S2,
      audioText:
        'According to the text, "recharging" your battery makes your code worse because you lose time.',
      audioDurationMs: 5200,
      dialogue:
        'According to the text, "recharging" your battery makes your code worse because you lose time.',
      options: ["True", "False"],
      correctAnswer: "False",
      successTitle: "Correto",
      successMessage:
        "O texto diz o contrário: recarregar as energias melhora a qualidade do trabalho.",
    },
  },
  {
    key: "write-work-life-balance",
    component: Exercise12,
    activity: {
      prompt: "O Camaleão te desafia!",
      instruction: "Tema: Your Work-life Balance.",
      helperText:
        "Escreva 3 frases: diga se já sentiu Burnout, use Boundaries para um limite atual e use Unplug para seu tempo livre.",
      image: ICB1.A14S3,
      placeholder:
        "I've felt burnout before. I set boundaries by closing my laptop at night. I unplug by playing guitar.",
      tipText:
        "Use burnout como esgotamento, boundaries como limites e unplug como desconectar.",
      minLength: 30,
      successTitle: "Correto",
      successMessage: "Boa reflexão. Inglês e autocuidado juntos.",
    },
  },
  {
    key: "balance-conclusion",
    component: Exercise17,
    activity: {
      label: "Equilíbrio é Tudo!",
      content: [
        `Você aprendeu a identificar os perigos da correria excessiva e como falar sobre isso em inglês.

Checklist:
Leu e interpretou um texto complexo.
Aprendeu a pronúncia de termos tech avançados.
Refletiu sobre sua própria produtividade.

Agora, siga o exemplo do David: dê um Unplug e descanse um pouco!

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

export default function B1IC09({ route, navigation }) {
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
