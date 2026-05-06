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
    key: "ping-pong-rule",
    component: Exercise17,
    activity: {
      label: "The Ping-Pong Rule!",
      content: [
        `Welcome! O segredo de um bom small talk é como um jogo de ping-pong.

Se alguém te conta algo, você não pode simplesmente dizer "Ah, legal" e deixar a bola cair.

Você precisa devolver a bola fazendo uma follow-up question, uma pergunta de acompanhamento.

Hoje vamos aprender como os nativos mantêm o assunto fluindo de forma natural!`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "chatting-awkward-match",
    component: Exercise15,
    activity: {
      prompt: "Clique na imagem e na palavra que a descreve perfeitamente.",
      images: [
        { id: "chatting-img", image: ICB1.A20S10 },
        { id: "awkward-img", image: ICB1.A20S2 },
      ],
      words: [
        { id: "chatting-word", label: "Chatting" },
        { id: "awkward-word", label: "Awkward silence" },
      ],
      pairs: [
        { imageId: "chatting-img", wordId: "chatting-word" },
        { imageId: "awkward-img", wordId: "awkward-word" },
      ],
      successTitle: "Correto",
      successMessage: "Você identificou conversa fluindo e silêncio desconfortável.",
    },
  },
  {
    key: "coffee-follow-up-false",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt: "Escute e responda",
      image: ICB1.A20S3,
      audioText:
        "Person A: I love coffee. I just bought a perfect brew machine for my home office. Person B: Oh, nice! What kind of beans do you usually buy?",
      audioDurationMs: 7800,
      dialogue: "Person B killed the conversation.",
      options: ["True", "False"],
      correctAnswer: "False",
      successTitle: "Correto",
      successMessage:
        "Person B manteve a conversa viva com uma follow-up question.",
    },
  },
  {
    key: "show-interest",
    component: Exercise17,
    activity: {
      label: "Show Interest!",
      content: [
        `Para fazer boas perguntas de acompanhamento, use as famosas Wh- Questions:

What, Where, When, Who, Why, How.

/blue{Native Tip}
Antes de fazer a pergunta, sempre reaja com entusiasmo ao que a pessoa disse.

Diga coisas como:
"Really?"
"Oh, nice!"
"That's interesting!"

Isso mostra que você está prestando atenção.`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "follow-up-match",
    component: Exercise1,
    activity: {
      prompt: "Conecte a frase inicial com a melhor follow-up question.",
      pairs: [
        {
          en: "I visited my brother last weekend.",
          pt: "Oh, nice! How is he doing?",
        },
        {
          en: "I love playing the guitar.",
          pt: "Really? Acoustic or electric?",
        },
        {
          en: "I am creating an app right now.",
          pt: "That's interesting! What is it about?",
        },
      ],
      successTitle: "Excelente",
      successMessage: "Você conectou as perguntas de acompanhamento certas.",
    },
  },
  {
    key: "movie-what",
    component: Exercise5,
    activity: {
      prompt: "Complete a reação para manter a conversa rolando.",
      image: ICB1.A20S4,
      sentenceStart: 'A: "I watched a great movie yesterday." B: "Really?',
      sentenceEnd: 'was it about?"',
      options: ["What", "Who"],
      correctAnswer: "What",
      successTitle: "Correto",
      successMessage: 'Perguntamos "What was it about?" para saber sobre o assunto.',
    },
  },
  {
    key: "miami-follow-up",
    component: Exercise4,
    activity: {
      prompt:
        'Alguém disse: "I traveled to Miami." Qual é a melhor follow-up question?',
      image: ICB1.A20S7,
      wrongSentence: "Follow-up question",
      options: [
        "Who did you went with?",
        "Who did you go with?",
        "Who you go with?",
      ],
      correctAnswer: "Who did you go with?",
      successTitle: "Correto",
      successMessage:
        'Depois de "did", usamos o verbo base: go.',
    },
  },
  {
    key: "small-talk-order",
    component: Exercise7,
    activity: {
      prompt: "Coloque esse small talk na ordem correta.",
      options: [
        "Hey! How was your weekend?",
        "It was great! I just stayed home and relaxed.",
        "That sounds nice. Did you watch any good movies?",
        "Yes, I watched a great action movie on Saturday.",
      ],
      correctOrder: [
        "Hey! How was your weekend?",
        "It was great! I just stayed home and relaxed.",
        "That sounds nice. Did you watch any good movies?",
        "Yes, I watched a great action movie on Saturday.",
      ],
      successTitle: "Correto",
      successMessage: "Você manteve a conversa fluindo na ordem natural.",
    },
  },
  {
    key: "type-how-long",
    component: Exercise18,
    activity: {
      prompt: "Digite a pergunta de acompanhamento corretamente.",
      scrambledSentence: "/ lived / How / you / have / long / there / ? /",
      correctAnswer: "How long have you lived there?",
      placeholder: "Digite a pergunta correta",
      submitLabel: "Enviar",
      errorTitle: "Incorreto",
      successTitle: "Correto",
      successMessage: "A pergunta correta é: How long have you lived there?",
    },
  },
  {
    key: "listen-interesting",
    component: Exercise19,
    needsSpeech: true,
    activity: {
      prompt: "Escute o áudio e escreva a reação exata que você ouviu.",
      audioText: "That is so interesting. Tell me more!",
      audioDurationMs: 3000,
      correctAnswer: "That is so interesting. Tell me more!",
      placeholder: "Digite a reação",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "Você escreveu a reação corretamente.",
      errorMessage: "Ouça novamente e confira cada palavra.",
    },
  },
  {
    key: "networking-audio",
    component: Exercise16,
    activity: {
      prompt: "Networking",
      instruction:
        'Imagine que eu disse: "Hi! I just started creating content for YouTube and Spotify."',
      helperText:
        "Mande um áudio reagindo e fazendo pelo menos duas follow-up questions.",
      image: Images.ex16,
      tipButtonLabel: "Tip",
      tipText:
        "Really? That sounds interesting! What kind of content do you create? How often do you post?",
      recordLabel: "Speak",
      stopLabel: "Parar",
      successTitle: "Correto",
      successMessage: "Seu áudio de networking foi gravado com sucesso.",
    },
  },
  {
    key: "quick-reflexes",
    component: Exercise17,
    activity: {
      label: "Quick Reflexes!",
      content: [
        `Mandou super bem no networking!

Para não deixar nenhuma conversa morrer, você precisa ter essas palavras na ponta da língua.

Na próxima tela, você terá 5 segundos para digitar cada palavra-chave de small talk.

Get ready!`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "small-talk-speed",
    component: Exercise11,
    activity: {
      prompt: "Escreva rápido",
      secondsPerWord: 5,
      words: ["REALLY", "WHERE", "ABOUT", "SOUNDS", "GREAT"],
      successTitle: "Correto",
      successMessage: "Você digitou as palavras-chave de small talk.",
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

export default function B1IC15({ route, navigation }) {
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
