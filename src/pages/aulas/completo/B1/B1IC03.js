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
    key: "continuous-intro",
    component: Exercise17,
    activity: {
      label: "O que você tem andado fazendo?",
      content: [
        `Diferente do Present Perfect Simple, aqui o que importa é a atividade em si, não se ela terminou.

/blue{A Estrutura}
Have/Has + BEEN + verbo com -ING

/blue{Quando usar?}
Ações em progresso: algo que começou e continua.
Ex: "I've been coding for hours."

Ações recentes com evidência: quando você vê o resultado agora.
Ex: "I'm sweaty because I've been working out."

/blue{A diferença de vibe}
Present Perfect Simple: foca no resultado.
Ex: Eu li o livro.

Present Perfect Continuous: foca no tempo gasto.
Ex: Eu tenho andado lendo este livro.`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "working-out-evidence",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escolha a melhor interpretação",
      image: ICB1.A3S5,
      audioText: "I'm exhausted because I've been working out for two hours.",
      audioDurationMs: 3800,
      answerOptions: [
        "The person has spent a lot of energy exercising recently.",
        "The person finished their exercise routine yesterday.",
      ],
      correctOption:
        "The person has spent a lot of energy exercising recently.",
      successTitle: "Correto",
      feedbackMessage:
        "O Present Perfect Continuous mostra uma atividade recente ou em progresso com evidência agora.",
    },
  },
  {
    key: "coding-since-morning",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escolha a melhor interpretação",
      image: ICB1.A3S7,
      audioText:
        "David has been coding this new feature since early morning.",
      audioDurationMs: 3800,
      answerOptions: [
        "David is still in the process of writing the code.",
        "David already finished and uploaded the new feature.",
      ],
      correctOption: "David is still in the process of writing the code.",
      successTitle: "Correto",
      feedbackMessage:
        'O "since" com o "-ing" indica que o trabalho ainda está rolando.',
    },
  },
  {
    key: "guitar-for-hours",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escolha a melhor interpretação",
      image: ICB1.A3S9,
      audioText: "I've been playing the guitar for three hours straight.",
      audioDurationMs: 3600,
      answerOptions: [
        "The speaker started playing 3 hours ago and is likely still playing.",
        "The speaker only played the guitar 3 hours ago and stopped.",
      ],
      correctOption:
        "The speaker started playing 3 hours ago and is likely still playing.",
      successTitle: "Correto",
      feedbackMessage:
        'O "-ing" mostra imersão na atividade e destaca o processo.',
    },
  },
  {
    key: "result-not-process-song",
    component: Exercise8,
    activity: {
      prompt:
        "Qual frase foca no resultado final e não no processo contínuo?",
      image: ICB1.A4S1,
      options: [
        "I've been practicing the song.",
        "I've practiced the song three times.",
        "I've been playing since noon.",
      ],
      correctAnswer: "I've practiced the song three times.",
      successTitle: "Correto",
      successMessage:
        "Essa frase conta o resultado: três vezes. As outras focam no tempo gasto na ação.",
    },
  },
  {
    key: "david-studying-scenario",
    component: Exercise8,
    activity: {
      prompt: "Qual frase melhor descreve a situação de David?",
      image: ICB1.A4S2,
      options: [
        "David has finished his exam.",
        "David has been studying since morning.",
        "David studied yesterday.",
      ],
      correctAnswer: "David has been studying since morning.",
      successTitle: "Correto",
      successMessage:
        "Livros abertos e café mostram uma ação que ainda está acontecendo ou acabou de ser interrompida, mas deixou rastros.",
    },
  },
  {
    key: "spell-been",
    component: Exercise13,
    needsSpeech: true,
    activity: {
      prompt:
        'Para formar o Continuous, você sempre precisa deste verbo no particípio. Desembaralhe:',
      audioText: "Been",
      audioDurationMs: 900,
      letters: ["B", "E", "E", "N"],
      correctWord: "BEEN",
      successTitle: "Correto",
      successMessage: 'Sem o "been", o Continuous não existe!',
    },
  },
  {
    key: "result-not-activity-guitar",
    component: Exercise8,
    activity: {
      prompt:
        "Qual frase foca na conclusão (resultado) e não na atividade contínua?",
      image: ICB1.A4S4,
      options: [
        "I've been playing the guitar.",
        "I've played three songs.",
        "I've been practicing for the show.",
      ],
      correctAnswer: "I've played three songs.",
      successTitle: "Correto",
      successMessage:
        "Essa opção foca na quantidade/resultado: três músicas. As outras focam no tempo dedicado à ação.",
    },
  },
  {
    key: "order-new-design",
    component: Exercise6,
    activity: {
      prompt: 'Monte a frase: "Ela tem trabalhado muito no novo design."',
      words: ["She", "has been", "working", "hard", "on the", "new design", "."],
      correctOrder: [
        "She",
        "has been",
        "working",
        "hard",
        "on the",
        "new design",
        ".",
      ],
      successTitle: "Correto",
      successMessage: "She has been working hard on the new design.",
    },
  },
  {
    key: "been-been-dialogue",
    component: Exercise8,
    activity: {
      prompt:
        'David: "I\'ve ____ working out every morning. I\'ve ____ doing this for three months now."',
      image: ICB1.A4S5,
      options: ["been / been", "being / been", "been / be"],
      correctAnswer: "been / been",
      successTitle: "Correto",
      successMessage:
        "A estrutura é have/has + been + verbo com -ing.",
    },
  },
  {
    key: "creator-routine-reading",
    component: Exercise17,
    activity: {
      label: "The Creator's Routine",
      content: [
        `"David is exhausted. He has been developing the Lingueto app for months. Lately, he hasn't been sleeping very well because his mind is full of code. His sister says: 'You have been working too much!'. David knows she is right, but he has been dreaming about the launch day since January. He has been playing his acoustic guitar to relax, but even then, he thinks about the app's music!"`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "write-continuous",
    component: Exercise12,
    activity: {
      prompt: "O que você tem andado fazendo?",
      instruction:
        "Pense no que você tem feito ultimamente para melhorar seu inglês ou sua carreira.",
      helperText:
        "Escreva 3 frases usando o Present Perfect Continuous.",
      image: ICB1.A5S2,
      placeholder:
        "I've been watching series in English. I've been studying every night. I've been practicing speaking.",
      tipText:
        'Use have/has + been + verbo com -ing. Ex: "I\'ve been studying", "She has been working".',
      minLength: 20,
      successTitle: "Correto",
      successMessage:
        "Muito bem! Você praticou como falar de atividades em progresso.",
    },
  },
  {
    key: "process-mastered-conclusion",
    component: Exercise17,
    activity: {
      label: "Processo Dominado!",
      content: [
        `Agora você sabe descrever não só o que fez, mas o que tem feito.

Resumo:
Foco na atividade: have/has been + ING.
Duração ou evidência: "I've been running" mostra por que estou cansado agora.

Continue nesse ritmo, você tem andado estudando muito bem!

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

export default function B1IC03({ route, navigation }) {
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
