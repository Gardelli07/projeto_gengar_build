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
import ex3, { Exercise3 } from "../../../../exc/ex3";
import ex6, { Exercise6 } from "../../../../exc/ex6";
import ex11, { Exercise11 } from "../../../../exc/ex11";
import ex13, { Exercise13 } from "../../../../exc/ex13";
import ex15, { Exercise15 } from "../../../../exc/ex15";
import ex14, { Exercise14 } from "../../../../exc/ex14";
import ex16, { Exercise16 } from "../../../../exc/ex16";
import ex17, { Exercise17 } from "../../../../exc/ex17";
import Feedback from "../../../../exc/feedback";
import { BussinesImages, Images, ICA1 } from "../../../../util/images";
import {
  calculateLessonAccuracy,
  LESSON_STREAK_MIN_ACCURACY,
  LESSON_STREAK_STORAGE_KEY,
} from "../../../../util/lessonPerformance";
import { getLevelProgress, XP_PER_LESSON } from "../../../../util/xp";

const SlideNavContext = React.createContext(null);

const STORAGE_KEY = "@progesso_ingles_completo_A0-A1";

const styles = {
  ...geral,
  ...ex14,
  ...ex1,
  ...ex3,
  ...ex6,
  ...ex11,
  ...ex13,
  ...ex15,
  ...ex16,
  ...ex17,
};

const LESSON_SLIDES = [
  {
    component: Exercise17,
    activity: {
      label: "Tip",
      content: [
        "/blue{Observe a cena}",
        ICA1.A2S1,
        `Você usaria 'Hello' com seu melhor amigo em um momento de diversão? Ou existe algo mais natural?`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: ICA1.A2S2,
      audioSource: require("../../../../../mp3/IC/A0-A1/A2S2.mp3"),
      audioDurationMs: 624,
      answerOptions: ["Hey", "Hay"],
      correctOption: "Hey",
      successTitle: "Correto",
      feedbackMessage: 'Usamos "Hey" para dizer "oi" de forma mais informal.',
    },
  },
  {
    component: Exercise17,
    activity: {
      label: "Tip",
      content: [
        `Cuidado! /blueHey é ótimo para amigos, família e colegas próximos.
Mas atenção: usar "Hey" com seu chefe em uma reunião séria pode parecer que você está sendo desleixado ou até desrespeitoso. 
Na dúvida com estranhos? 
Fique com o Hi ou Hello!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: Exercise15,
    activity: {
      prompt: "Clique na imagem e na palavra",
      images: [
        { id: "img1", image: ICA1.A2S4 },
        { id: "img2", image: ICA1.A2S4p2 },
      ],
      words: [
        { id: "test1", label: "Hey" },
        { id: "test2", label: "Hello" },
      ],
      pairs: [
        { imageId: "img1", wordId: "test1" },
        { imageId: "img2", wordId: "test2" },
      ],
      successTitle: "Correto",
      successMessage: "Você formou os dois pares corretamente.",
    },
  },
  {
    component: Exercise1,
    activity: {
      prompt: "Encontre a tradução",
      pairs: [
        { en: "Hey", pt: "Oi / Ei (muito informal)" },
        {
          en: "Hey there",
          pt: "Olá / Oi (de um jeito mais carinhoso/amigável)",
        },
      ],
      successTitle: "Excelente",
      successMessage: "Você acertou todas as traduções.",
    },
  },
  {
    component: Exercise13,
    needsSpeech: true,
    activity: {
      prompt: "Escreva a palavra",
      audioSource: require("../../../../../mp3/IC/A0-A1/A2S6.mp3"),
      audioDurationMs: 824,
      letters: ["H", "E", "Y", "T", "H", "E", "R", "E"],
      correctWord: "HEYTHERE",
      successTitle: "Correto",
      successMessage: 'A palavra correta é "Hey there".',
    },
  },
  {
    component: Exercise17,
    activity: {
      label: "Tip",
      content: [
        `Dica de Mestre: /blue{Hey there} é uma versão levemente mais 'cheia' do que o simples Hey. 
É muito comum quando você quer ser extra amigável ao ver alguém que gosta. 
É como um 'Oi, tudo bem?' resumido em duas palavras! `,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt: "Escute e responda",
      image: ICA1.A2S8,
      audioSource: require("../../../../../mp3/IC/A0-A1/A2S8.mp3"),
      audioDurationMs: 1000,
      dialogue:
        " Nesse áudio, a pessoa está usando 'Hey' como uma saudação amigável?",
      options: ["true", "false"],
      correctAnswer: "false",
      successTitle: "Correto",
      successMessage: 'A resposta correta é "false".',
    },
  },
  {
    component: Exercise6,
    activity: {
      prompt: "Coloque a frase em ordem.",
      words: ["hey", "there,", "Lucas!", "good", "morning"],
      correctOrder: ["hey", "there,", "Lucas!", "good", "morning"],
      successTitle: "Correto",
      successMessage: `A frase correta e "Hey there, Lucas! Good morning."`,
    },
  },
  {
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction: "Fale brevemente sobre você em inglês.",
      helperText:
        "Grave um áudio cumprimentando um colega de trabalho que você gosta muito e tem intimidade. Use 'Hey there!' com uma entonação bem positiva.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText: "Hey there!",
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
    component: Exercise11,
    activity: {
      prompt: "Escreva rápido",
      title: "Escreva a palavra abaixo",
      placeholder: "Digite aqui",
      secondsPerWord: 8,
      words: ["Hey", "Hi", "There", "Hello"],
      successTitle: "Correto",
      successMessage: "Você digitou todas as palavras no tempo certo.",
    },
  },
  {
    component: Exercise17,
    activity: {
      label: "Tip",
      content: [
        `/blue{Você subiu de nível!}💎
Sabia que no sul dos EUA, o 'Hey' é quase obrigatório? 
Já em Londres, o 'Hi' ainda é o rei da vizinhança. 
No Lingueto, você aprende a falar com o mundo todo! 
Próxima aula: What's up? (A gíria que todo mundo quer saber). Até lá! `,
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
        <Image source={Images.seta} style={styles.headerCircleImage} />
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
        <Image source={Images.x} style={styles.headerCircleImage} />
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
  onSkipActivity,
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
      onSkipActivity={onSkipActivity}
      onAttempt={onAttempt}
      {...(slide.needsSpeech ? { speak } : {})}
    />
  );
}

export default function IC02({ route, navigation }) {
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
            next={slideNav.next}
            speak={speak}
            onPressNextLesson={goToNextLesson}
            onSkipActivity={goToNextLesson}
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
