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
    key: "did-you-know",
    component: Exercise17,
    activity: {
      label: "Did you know?",
      content: [
        `Hoje vamos treinar os seus ouvidos com um fato histórico mundial.

Ao invés de ler, você vai escutar a lenda de como a bebida mais consumida nas manhãs foi descoberta.

/blue{Native Tip}
Quando estamos escutando alguém contar uma história, nativos usam active listening.

Faça sons como "Uh-huh", "Wow" ou "No way!" para mostrar que está acompanhando a narrativa.`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "goats-image",
    component: Exercise8,
    activity: {
      prompt: "Look at the image. What is happening in this scene?",
      image: ICB1.A20S10,
      options: [
        "The animals are sleeping deeply in a barn.",
        "Energetic goats are eating red berries.",
        "Farmers are planting coffee trees.",
        "Sheep are drinking hot water.",
      ],
      correctAnswer: "Energetic goats are eating red berries.",
      successTitle: "Correto",
      successMessage: "As cabras estão agitadas e comendo frutas vermelhas.",
    },
  },
  {
    key: "shepherd-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute a palavra-chave e escolha a correta.",
      image: ICB1.A20S2,
      audioText: "Shepherd",
      audioDurationMs: 1000,
      answerOptions: ["Shepherd", "Sheep"],
      correctOption: "Shepherd",
      successTitle: "Correto",
      feedbackMessage:
        "Shepherd é a pessoa que cuida de ovelhas ou cabras.",
    },
  },
  {
    key: "coffee-legend-false",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio com atenção e responda.",
      image: ICB1.A20S3,
      audioText:
        "Legend says that coffee was discovered in Ethiopia by a goat shepherd named Kaldi. He noticed that his goats became extremely energetic after eating red berries from a certain tree. They wouldn't sleep at night! Later, monks used these berries to stay awake during long prayers, and that's how the coffee drink was born.",
      audioDurationMs: 15000,
      dialogue:
        "The goats became very tired and sleepy after eating the red berries.",
      options: ["True", "False"],
      correctAnswer: "False",
      successTitle: "Correto",
      successMessage:
        "As cabras ficaram extremamente energéticas, não sonolentas.",
    },
  },
  {
    key: "wouldnt-sleep",
    component: Exercise19,
    needsSpeech: true,
    activity: {
      prompt: "Escute este trecho curto e digite exatamente o que ouviu.",
      audioText: "They wouldn't sleep at night.",
      audioDurationMs: 2400,
      correctAnswer: "They wouldn't sleep at night.",
      placeholder: "Digite a frase",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "Você escreveu o trecho corretamente.",
      errorMessage: "Atenção à contração wouldn't.",
    },
  },
  {
    key: "audio-vocabulary-match",
    component: Exercise1,
    activity: {
      prompt: "Conecte as palavras-chave do áudio com suas definições.",
      pairs: [
        { en: "Shepherd", pt: "A person who takes care of animals." },
        { en: "Berries", pt: "Small round fruit from a tree." },
        { en: "Monks", pt: "Religious men living in a monastery." },
      ],
      successTitle: "Excelente",
      successMessage: "Você conectou o vocabulário da história.",
    },
  },
  {
    key: "monks-summary",
    component: Exercise4,
    activity: {
      prompt: "Qual frase resume corretamente o final do áudio?",
      image: ICB1.A20S4,
      wrongSentence: "Coffee legend",
      options: [
        "Monks used the berries to sleep better at night.",
        "Monks used the berries to stay awake during prayers.",
        "The shepherd sold the berries to the monks for a lot of money.",
      ],
      correctAnswer: "Monks used the berries to stay awake during prayers.",
      successTitle: "Correto",
      successMessage:
        "Os monges usavam as frutas para ficar acordados durante longas orações.",
    },
  },
  {
    key: "ear-hand",
    component: Exercise17,
    activity: {
      label: "Ear to Hand Coordination!",
      content: [
        `Você captou os detalhes da história perfeitamente.

Agora, vamos testar sua agilidade com o vocabulário narrativo.

Você tem 5 segundos para digitar as palavras que escutamos.

Focus!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "coffee-speed",
    component: Exercise11,
    activity: {
      prompt: "Hard Mode",
      secondsPerWord: 5,
      words: ["DISCOVERED", "ENERGETIC", "SHEPHERD", "LEGEND", "AWAKE"],
      successTitle: "Correto",
      successMessage: "Você digitou o vocabulário narrativo.",
    },
  },
  {
    key: "espresso-false",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt: "A história continua. Escute e responda.",
      image: ICB1.A20S7,
      audioText:
        "Centuries later, in Italy, the espresso machine was invented. The word espresso means pressed out. These machines use high pressure to force hot water through finely ground coffee, creating a strong shot with a perfect crema on top.",
      audioDurationMs: 10500,
      dialogue:
        "The audio states that an espresso machine uses cold water and low pressure.",
      options: ["True", "False"],
      correctAnswer: "False",
      successTitle: "Correto",
      successMessage:
        "A máquina usa água quente e alta pressão, não água fria e baixa pressão.",
    },
  },
  {
    key: "espresso-transcription",
    component: Exercise2,
    activity: {
      prompt: "Complete a transcrição.",
      paragraphs: [
        ["The word espresso means", { id: "b1", answer: "pressed", options: ["pressed", "pushed"] }, "out."],
        ["The machine uses high", { id: "b2", answer: "pressure", options: ["temperature", "pressure"] }, "to force hot water through the coffee."],
      ],
      successTitle: "Correto",
      successMessage: "A sequência correta é: pressed / pressure.",
    },
  },
  {
    key: "write-coffee-summary",
    component: Exercise12,
    activity: {
      prompt: "Resumo!",
      instruction:
        'Explique a "lenda do café e das cabras" para um amigo em inglês.',
      helperText: "Use suas próprias palavras em 2 frases curtas.",
      image: ICB1.A19S5,
      placeholder:
        "Coffee was discovered by a shepherd named Kaldi. His goats became energetic after eating red berries.",
      tipText:
        "Use discovered, shepherd, goats, berries e energetic.",
      minLength: 25,
      successTitle: "Correto",
      successMessage: "Ótimo resumo da história.",
    },
  },
  {
    key: "audio-favorite-drink",
    component: Exercise16,
    activity: {
      prompt: "Now it's personal!",
      instruction:
        "Todo mundo tem uma bebida favorita para dar energia.",
      helperText:
        "Mande um áudio contando qual é sua bebida indispensável e por que precisa dela no seu dia.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "My favorite drink is espresso because it helps me focus in the morning.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Seu áudio sobre sua bebida favorita foi gravado.",
    },
  },
  {
    key: "listening-conclusion",
    component: Exercise17,
    activity: {
      label: "Awesome listening skills!",
      content: [
        `Você conseguiu entender sotaques, extrair informações detalhadas sem precisar ler um texto longo e ainda aprendeu a história clássica de uma bebida mundial.

Seus ouvidos estão cada vez mais afiados para o inglês real!`,
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

export default function B1IC20({ route, navigation }) {
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
