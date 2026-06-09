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
import ex20, { Exercise20 } from "../../../../exc/ex20";
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
  ...ex20,
};

const LESSON_SLIDES = [
  {
    key: "beyond-how-are-you",
    component: Exercise17,
    activity: {
      label: 'Beyond "How are you?"',
      content: [
        `Quebrar o gelo não é apenas sobre falar; é sobre observar o ambiente.

Um bom icebreaker foca em algo que você e a outra pessoa compartilham no momento: a comida, a música do evento ou até o clima.

/blue{Native Tip}
Em situações informais, usamos muito "How's it going?".

Em eventos formais, iniciar com um comentário sobre o palestrante ou o motivo do evento é mais seguro.

Evite perguntas muito pessoais logo de cara!`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "awkward-image",
    component: Exercise9,
    activity: {
      prompt: "Clique na imagem que representa a palavra.",
      question: "AWKWARD",
      correctOptionId: "awkward",
      options: [
        { id: "laughing", image: ICB1.A19S2p2 },
        { id: "awkward", image: ICB1.A19S2p3 },
        { id: "handshake", image: ICB1.A19S2p4 },
        { id: "dancing", image: ICB1.A19S4 },
      ],
      successTitle: "Correto",
      successMessage:
        'A imagem correta representa "awkward": constrangedor ou estranho.',
    },
  },
  {
    key: "social-success-text",
    component: Exercise17,
    activity: {
      label: "Strategies for Social Success",
      content: [
        `"To break the ice effectively at a professional gathering, you should start with an observational comment. For instance, if you are at a tech conference, you might say: 'The keynote speech was quite insightful, wasn't it?'. This invites the other person to share their opinion without feeling pressured. Remember, the goal is to find common ground. Avoiding controversial topics like politics or religion is crucial for a smooth first interaction."

/blue{Dica de escrita}
Note o uso de question tags, como "wasn't it?", para convidar o outro para a conversa.`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "shared-experience-true",
    component: Exercise20,
    activity: {
      prompt: "De acordo com o texto anterior, responda:",
      image: ICB1.A19S5,
      dialogue:
        "The text suggests that asking for opinions about a shared experience is a good strategy.",
      options: ["True", "False"],
      correctAnswer: "True",
      successTitle: "Correto",
      successMessage:
        "O texto recomenda comentários observacionais e perguntas sobre experiências compartilhadas.",
    },
  },
  {
    key: "politics-false",
    component: Exercise20,
    activity: {
      prompt: "De acordo com o texto anterior, responda:",
      image: ICB1.A20S2,
      dialogue:
        "You should talk about politics to make the conversation more interesting.",
      options: ["True", "False"],
      correctAnswer: "False",
      successTitle: "Correto",
      successMessage:
        "O texto diz para evitar tópicos controversos, como política ou religião.",
    },
  },
  {
    key: "precision-sprint",
    component: Exercise17,
    activity: {
      label: "Precision Sprint!",
      content: [
        `Para escrever bem, você precisa dominar a grafia de palavras complexas.

Você tem 5 segundos para cada.

Let's go!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "precision-words",
    component: Exercise11,
    activity: {
      prompt: "Hard Mode",
      secondsPerWord: 5,
      words: [
        "AUTHENTICITY",
        "OBSERVATION",
        "INSIGHTFUL",
        "CONTROVERSIAL",
        "INTERACTION",
      ],
      successTitle: "Correto",
      successMessage: "Você digitou palavras complexas com precisão.",
    },
  },
  {
    key: "break-genuine",
    component: Exercise2,
    activity: {
      prompt: "Complete a dica de escrita.",
      paragraphs: [
        ["When you want to", { id: "b1", answer: "break", options: ["break", "crack"] }, "the ice, try to be"],
        [{ id: "b2", answer: "genuine", options: ["fake", "genuine"] }, "."],
        ["People can tell when you are not being yourself, and it makes the situation feel forced."],
      ],
      successTitle: "Correto",
      successMessage: "A sequência correta é: break / genuine.",
    },
  },
  {
    key: "type-speech-question",
    component: Exercise18,
    activity: {
      prompt: "Digite a frase corretamente para formar um excelente icebreaker.",
      scrambledSentence: "/ speech / What / think / you / did / of / the / ? /",
      correctAnswer: "What did you think of the speech?",
      placeholder: "Digite a pergunta",
      submitLabel: "Enviar",
      errorTitle: "Incorreto",
      successTitle: "Correto",
      successMessage: "A pergunta correta é: What did you think of the speech?",
    },
  },
  {
    key: "write-ai-workshop",
    component: Exercise12,
    activity: {
      prompt: "Writing Task",
      instruction:
        "Imagine que você está em um workshop sobre inteligência artificial, na fila do café ao lado de um desconhecido.",
      helperText:
        "Escreva 2-3 frases para quebrar o gelo. Use uma observação sobre o evento e uma pergunta aberta.",
      image: ICB1.A20S3,
      placeholder:
        "The talk about AI was really insightful, wasn't it? What did you think of the speaker's ideas?",
      tipText:
        "Use uma observação compartilhada + uma pergunta aberta.",
      minLength: 25,
      successTitle: "Correto",
      successMessage: "Ótimo icebreaker escrito.",
    },
  },
  {
    key: "audio-intonation",
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction:
        "Imagine que a pessoa respondeu e a conversa começou.",
      helperText:
        "Mande um áudio de 15 segundos praticando sua entonação ao dizer a frase que escreveu.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "The workshop was really insightful, wasn't it? What did you think of the speaker?",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Seu áudio de icebreaker foi gravado.",
    },
  },
  {
    key: "eloquent-conclusion",
    component: Exercise17,
    activity: {
      label: "Eloquente!",
      content: [
        `Você provou que tem as ferramentas para iniciar conversas com confiança e clareza.

Sua escrita está cada vez mais sofisticada e natural.

See you in the next lesson!`,
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

export default function B1IC19({ route, navigation }) {
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
