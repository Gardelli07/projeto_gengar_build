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
import ex19, { Exercise19 } from "../../../../exc/ex19";
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
  ...ex19,
};

const LESSON_SLIDES = [
  {
    key: "diplomacy-tip",
    component: Exercise17,
    activity: {
      label: "The Art of Diplomacy",
      content: [
        `No nível B1-B2, não basta dizer "I don't agree". Isso pode soar rude.

Para ser fluente, você precisa de frases que validem o que a outra pessoa disse antes de apresentar o seu ponto.

/blue{Native Tip}
Use o método "Yes, and..." ou "Yes, but...".

Em reuniões, expressões como "I see your point" ou "I hear what you're saying" são ferramentas poderosas para manter o respeito enquanto você discorda.`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "attitude-match",
    component: Exercise15,
    activity: {
      prompt: "Combine a imagem com a atitude correta.",
      images: [
        { id: "common-img", image: ICB1.A16S2 },
        { id: "polite-img", image: ICB1.A16S3 },
      ],
      words: [
        { id: "common-word", label: "Finding common ground" },
        { id: "polite-word", label: "Politeness" },
      ],
      pairs: [
        { imageId: "common-img", wordId: "common-word" },
        { imageId: "polite-img", wordId: "polite-word" },
      ],
      successTitle: "Correto",
      successMessage: "Você combinou as atitudes profissionais corretamente.",
    },
  },
  {
    key: "deadline-disagree-false",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt: "Escute e responda",
      image: ICB1.A16S5,
      audioText:
        "I see what you mean about the project deadline, however, I'm not so sure we have enough staff to finish it by Friday.",
      audioDurationMs: 6500,
      dialogue: "The speaker completely agrees with the deadline.",
      options: ["True", "False"],
      correctAnswer: "False",
      successTitle: "Correto",
      successMessage:
        '"However" sinaliza que a pessoa vai discordar ou apresentar uma ressalva.',
    },
  },
  {
    key: "agreement-expression-match",
    component: Exercise1,
    activity: {
      prompt: "Conecte o início e o fim das expressões.",
      pairs: [
        { en: "I couldn't agree", pt: "with you more." },
        { en: "I'm afraid I", pt: "beg to differ." },
        { en: "I'm with you", pt: "on that point." },
      ],
      successTitle: "Excelente",
      successMessage: "Você conectou expressões diplomáticas corretamente.",
    },
  },
  {
    key: "nevertheless-complete",
    component: Exercise5,
    activity: {
      prompt: "Complete a frase",
      image: ICB1.A16S6,
      sentenceStart: "I hear what you're saying,",
      sentenceEnd: "I think we should consider a different strategy.",
      options: ["nevertheless", "absolutely"],
      correctAnswer: "nevertheless",
      successTitle: "Correto",
      successMessage:
        '"Nevertheless" introduz contraste de forma profissional.',
    },
  },
  {
    key: "polite-disagreement",
    component: Exercise4,
    activity: {
      prompt: "Qual frase demonstra uma discordância educada profissional?",
      image: ICB1.A17S2,
      wrongSentence: "Professional disagreement",
      options: [
        "You are wrong about the budget.",
        "I see your point, but I have a different perspective.",
        "I don't agree with you at all.",
      ],
      correctAnswer: "I see your point, but I have a different perspective.",
      successTitle: "Correto",
      successMessage:
        "A frase valida o ponto da outra pessoa antes de discordar.",
    },
  },
  {
    key: "type-coming-from",
    component: Exercise18,
    activity: {
      prompt: "Digite a frase essencial para validar a opinião do outro.",
      scrambledSentence:
        "/ point / see / I / where / coming / you / are / from / but /",
      correctAnswer: "I see where you are coming from but",
      placeholder: "Digite a frase correta",
      submitLabel: "Enviar",
      errorTitle: "Incorreto",
      successTitle: "Correto",
      successMessage:
        "A frase correta é: I see where you are coming from but",
    },
  },
  {
    key: "ai-debate-order",
    component: Exercise7,
    activity: {
      prompt: "Organize o debate sobre o uso de IA no trabalho.",
      options: [
        "I believe AI will replace all human teachers in five years.",
        "I'm not so sure about that, to be honest.",
        "Why not? It's becoming very advanced.",
        "I see your point, however, the human touch is still essential for learning.",
      ],
      correctOrder: [
        "I believe AI will replace all human teachers in five years.",
        "I'm not so sure about that, to be honest.",
        "Why not? It's becoming very advanced.",
        "I see your point, however, the human touch is still essential for learning.",
      ],
      successTitle: "Correto",
      successMessage: "Você organizou o debate de forma natural.",
    },
  },
  {
    key: "listen-go-along",
    component: Exercise19,
    needsSpeech: true,
    activity: {
      prompt: "Escute e escreva a frase.",
      audioText: "I'm afraid I can't go along with you on that.",
      audioDurationMs: 3800,
      correctAnswer: "I'm afraid I can't go along with you on that.",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "Você escreveu a frase diplomática corretamente.",
      errorMessage: "Confira a expressão: go along with you on that.",
    },
  },
  {
    key: "write-disagree-creativity",
    component: Exercise12,
    activity: {
      prompt: "Discorde educadamente",
      instruction:
        'Contexto: alguém diz que "Trabalhar em casa é ruim para a criatividade".',
      helperText:
        'Use "I see where you\'re coming from, but..." e dê um motivo curto.',
      image: ICB1.A17S3,
      placeholder:
        "I see where you're coming from, but I think remote work can make people more focused and creative.",
      tipText:
        "Valide primeiro, depois apresente seu ponto com but/however/nevertheless.",
      minLength: 20,
      successTitle: "Correto",
      successMessage: "Boa! Sua discordância ficou educada e profissional.",
    },
  },
  {
    key: "audio-social-media-opinion",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        'Opinião polêmica: "I think all social media should be banned for people under 21."',
      helperText:
        'Se concordar, use "I couldn\'t agree more". Se discordar, use "I\'m afraid I beg to differ".',
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "I'm afraid I beg to differ because social media can also be used for learning.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Seu áudio com opinião diplomática foi gravado.",
    },
  },
  {
    key: "keyboardist-challenge",
    component: Exercise17,
    activity: {
      label: "The Professional Keyboardist Challenge",
      content: [
        `Agora o bicho vai pegar.

Para o nível B1-B2, você precisa digitar termos técnicos e conectores longos com perfeição.

Você tem 5 segundos para cada palavra. Não aceitamos erros!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "hard-mode-words",
    component: Exercise11,
    activity: {
      prompt: "Hard Mode",
      secondsPerWord: 5,
      words: [
        "PERSPECTIVE",
        "NEVERTHELESS",
        "AGREEMENT",
        "DIPLOMATICALLY",
        "CONTRADICT",
      ],
      successTitle: "Correto",
      successMessage: "Você digitou vocabulário profissional avançado.",
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

export default function B1IC16({ route, navigation }) {
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
