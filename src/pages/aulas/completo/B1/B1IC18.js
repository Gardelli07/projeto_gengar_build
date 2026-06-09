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
    key: "thirty-second-impression",
    component: Exercise17,
    activity: {
      label: "The 30-Second Impression",
      content: [
        `Em eventos de networking, a forma como você se apresenta diz muito sobre você.

No nível intermediário/avançado, evitamos dizer apenas "I am a teacher" ou "I work in a company".

/blue{Native Tip}
Nativos focam no valor que entregam:
"I'm in EdTech"
"I'm the founder of..."
"I specialize in..."

Vamos aprender essas estruturas!`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "networking-image",
    component: Exercise8,
    activity: {
      prompt: "Look at the image. What kind of professional situation is this?",
      image: ICB1.A18S2,
      options: [
        "A job interview",
        "A networking event",
        "A remote team meeting",
        "A family dinner",
      ],
      correctAnswer: "A networking event",
      successTitle: "Correto",
      successMessage: "A situação mostra um evento de networking.",
    },
  },
  {
    key: "mark-intro-true",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt: "Escute e responda",
      image: ICB1.A18S3,
      audioSource: require("../../../../../mp3/IC/B1/A18S3.mp3"),
      audioDurationMs: 6500,
      dialogue: "Mark works with digital media and education.",
      options: ["True", "False"],
      correctAnswer: "True",
      successTitle: "Correto",
      successMessage:
        "Ele cria conteúdo e gerencia canais educacionais no YouTube e Spotify.",
    },
  },
  {
    key: "break-the-ice-tip",
    component: Exercise17,
    activity: {
      label: "How to break the ice!",
      content: [
        `A melhor forma de abordar alguém que você não conhece em um evento é usando:

"Hi, I don't think we've met. I'm..."

Para perguntar o que a pessoa faz, fuja do básico "What is your job?".

Use:
"What line of work are you in?"
ou
"What do you do for a living?"`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "work-in-marketing",
    component: Exercise5,
    activity: {
      prompt: "Complete a frase",
      image: ICB1.A18S5,
      sentenceStart: "Hi, I don't think we've met. I'm Julia. I work",
      sentenceEnd: "digital marketing.",
      options: ["in", "on"],
      correctAnswer: "in",
      successTitle: "Correto",
      successMessage: 'Usamos "in" para áreas de atuação: in digital marketing.',
    },
  },
  {
    key: "professional-complements",
    component: Exercise1,
    activity: {
      prompt: "Conecte o início da frase com seu complemento profissional.",
      pairs: [
        { en: "I'm the founder", pt: "of a language learning app." },
        { en: "I specialize", pt: "in UI/UX design." },
        { en: "What line of work", pt: "are you in?" },
      ],
      successTitle: "Excelente",
      successMessage: "Você conectou as estruturas profissionais.",
    },
  },
  {
    key: "elevator-pitch-challenge",
    component: Exercise17,
    activity: {
      label: "The Elevator Pitch Challenge!",
      content: [
        `Primeiras impressões acontecem rápido, e sua digitação também precisa ser!

Vamos testar o vocabulário de negócios de hoje.

Você tem 5 segundos para cada palavra. Prepare-se!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "network-speed",
    component: Exercise11,
    activity: {
      prompt: "Escreva rápido",
      secondsPerWord: 5,
      words: ["FOUNDER", "SPECIALIZE", "INDUSTRY", "LIVING", "NETWORK"],
      successTitle: "Correto",
      successMessage: "Reflexos excelentes. Agora vamos para o diálogo real.",
    },
  },
  {
    key: "dialog-networking",
    component: Exercise7,
    activity: {
      prompt: "Coloque esse diálogo de networking na ordem correta.",
      options: [
        "Hi, I don't think we've met. I'm Alex.",
        "Nice to meet you, Alex. I'm Sarah. What line of work are you in?",
        "I'm in EdTech. I have a school app called Lingueto. And you?",
        "That sounds amazing! I work in software development.",
      ],
      correctOrder: [
        "Hi, I don't think we've met. I'm Alex.",
        "Nice to meet you, Alex. I'm Sarah. What line of work are you in?",
        "I'm in EdTech. I have a school app called Lingueto. And you?",
        "That sounds amazing! I work in software development.",
      ],
      successTitle: "Correto",
      successMessage: "Você organizou o diálogo de networking.",
    },
  },
  {
    key: "presentation-pitch",
    component: Exercise2,
    activity: {
      prompt: "Complete o pitch de apresentação.",
      paragraphs: [
        ['"Hello! I\'m David. I am a', { id: "b1", answer: "content", options: ["content", "happy"] }, "creator."],
        ["I focus on creating English lessons for mobile apps. What do you", { id: "b2", answer: "do", options: ["make", "do"] }, 'for a living?"'],
      ],
      successTitle: "Correto",
      successMessage: "A sequência correta é: content / do.",
    },
  },
  {
    key: "type-line-of-work",
    component: Exercise18,
    activity: {
      prompt: "Digite a frase para perguntar sobre a área de atuação.",
      scrambledSentence: "/ work / line / are / What / of / you / in / ? /",
      correctAnswer: "What line of work are you in?",
      placeholder: "Digite a pergunta",
      submitLabel: "Enviar",
      errorTitle: "Incorreto",
      successTitle: "Correto",
      successMessage: "A pergunta correta é: What line of work are you in?",
    },
  },
  {
    key: "write-elevator-pitch",
    component: Exercise12,
    activity: {
      prompt: "The Elevator Pitch!",
      instruction:
        "Imagine que você está em uma conferência internacional.",
      helperText:
        'Escreva 2 ou 3 frases se apresentando. Use "I specialize in..." ou "I focus on...".',
      image: ICB1.A19S2p1,
      placeholder:
        "Hi, I'm David. I'm in EdTech and I focus on creating English lessons for mobile apps.",
      tipText:
        "Diga nome, área e o valor que você entrega.",
      minLength: 25,
      successTitle: "Correto",
      successMessage: "Ótimo elevator pitch!",
    },
  },
  {
    key: "audio-break-ice",
    component: Exercise16,
    activity: {
      prompt: "Breaking the ice!",
      instruction:
        "Mande um áudio como se estivesse abordando alguém no coffee break.",
      helperText:
        'Use "Hi, I don\'t think we\'ve met...", apresente-se e termine com uma pergunta profissional.',
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "Hi, I don't think we've met. I'm David. I'm in EdTech. What line of work are you in?",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Seu áudio de networking foi gravado.",
    },
  },
  {
    key: "networker-conclusion",
    component: Exercise17,
    activity: {
      label: "You are a natural networker!",
      content: [
        `Você dominou as estruturas para se apresentar com confiança e autoridade em qualquer evento internacional.

O mundo dos negócios está de portas abertas para você!`,
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

export default function B1IC18({ route, navigation }) {
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
