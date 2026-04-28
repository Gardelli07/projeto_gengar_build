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
import { ICA1, Images } from "../../../../util/images";
import {
  calculateLessonAccuracy,
  LESSON_STREAK_MIN_ACCURACY,
  LESSON_STREAK_STORAGE_KEY,
} from "../../../../util/lessonPerformance";
import { getLevelProgress, XP_PER_LESSON } from "../../../../util/xp";

const SlideNavContext = React.createContext(null);

const STORAGE_KEY = "@progesso_ingles_completo_A0-A1";
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
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A13S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A13S2.mp3"),
      audioDurationMs: 600,
      answerOptions: ["I am", "I is"],
      correctOption: "I am",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "I am" para dizer "eu sou".',
    },
  },
  {
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A13S3,
      audioSource: require("../../../../../mp3/IC/A0-A1/A13S3.mp3"),
      audioDurationMs: 900,
      answerOptions: ["She is", "She are"],
      correctOption: "She is",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "She is" para dizer "ela é".',
    },
  },
  {
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A13S4,
      audioSource: require("../../../../../mp3/IC/A0-A1/A13S4.mp3"),
      audioDurationMs: 2500,
      answerOptions: ["We are", "We is"],
      correctOption: "We are",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "We are" para dizer "nós somos".',
    },
  },
  {
    component: Exercise17,
    activity: {
      label: "Tip",
      content: [
        `Dica de Revisão: Guarde os times na memória:
  • I + AM (Sempre sozinho)
  • He / She / It + IS (O time do singular)
  • You / We / They + ARE (O time do plural) 
Não misture os motores ou o carro não anda! 🦎🏎️
 `,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: Exercise1,
    activity: {
      prompt: "Encontre a tradução",
      pairs: [
        { en: "I", pt: "am" },
        { en: "He", pt: "is" },
        { en: "They", pt: "are" },
      ],
      successTitle: "Excelente",
      successMessage: "Você acertou todas as conjunções.",
    },
  },
  {
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.semimg,
      audioSource: require("../../../../../mp3/IC/A0-A1/hello.mp3"),
      audioDurationMs: 824,
      answerOptions: ["It is", "It am"],
      correctOption: "It is",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "It is" para dizer "ele é".',
    },
  },
  {
    component: Exercise6,
    activity: {
      prompt: "Coloque a frase em ordem.",
      words: ["is", "doctor", "he", "a"],
      correctOrder: ["he", "is", "a", "doctor"],
      successTitle: "Correto",
      successMessage: `A frase correta e "He is a doctor."`,
    },
  },
  {
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.semimg,
      audioSource: require("../../../../../mp3/IC/A0-A1/hello.mp3"),
      audioDurationMs: 824,
      answerOptions: ["You are", "You is"],
      correctOption: "You are",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "You are" para dizer "você é".',
    },
  },
  {
    component: Exercise6,
    activity: {
      prompt: "Coloque a frase em ordem.",
      words: ["are", "we", "friends"],
      correctOrder: ["we", "are", "friends"],
      successTitle: "Correto",
      successMessage: `A frase correta e "We are friends."`,
    },
  },
  {
    component: Exercise17,
    activity: {
      label: "Tip",
      content: [
        `/blue{Lembre-se:} 
Na vida real, o 'am, is, are' encurtam!
  • I am -> I'm
  • He is -> He's
  • They are -> They're 
Pratique o som curto para soar como um nativo! 🦎⚡
`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: Exercise4,
    activity: {
      prompt: "Corrija",
      image: ICA1.A13S13,
      wrongSentence: "Você apresenta sua família.",
      options: ["They is my family.", "They are my family."],
      correctAnswer: "They are my family.",
      successTitle: "Correto",
      successMessage: 'A forma correta e "They are my family."',
    },
  },
  {
    component: Exercise12,
    activity: {
      prompt: "Write your introduction",
      instruction: "Escreva brevemente sobre você em inglês",
      helperText:
        "Escreva duas frases: uma sobre você (usando I) e uma sobre um objeto perto de você (usando It).",
      placeholder: "Hello...",
      tipText: '"I am Kaique. It is a book."',
      minLength: 3,
      successTitle: "Correto",
      successMessage: "Seu texto foi preenchido com sucesso.",
    },
  },
  {
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction: "Fale brevemente sobre você em inglês.",
      helperText: "Aponte para seus amigos e grave: 'Vocês são legais!'",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "You are cool.",
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
        `💎 Parabéns! Você consolidou a base de toda a comunicação em inglês. Você agora sabe dizer QUEM é QUEM. Próxima parada: Review da Negativa, onde vamos aprender a dizer o que as coisas NÃO são! See you! 🦎🚀`,
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
  slideIndex,
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
      key={slide.key || slideIndex}
      activity={slide.activity}
      styles={styles}
      HeaderComponent={SlideHeader}
      next={next}
      onAttempt={onAttempt}
      {...(slide.needsSpeech ? { speak } : {})}
    />
  );
}

export default function IC13({ route, navigation }) {
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
            slideIndex={currentSlideIndex}
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
