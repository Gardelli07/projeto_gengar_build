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
    key: "intro-timeline",
    component: Exercise17,
    activity: {
      label: "O Tempo sob Controle",
      content: [
        `No nível avançado, não basta saber o que aconteceu. Você precisa saber dizer há quanto tempo algo vem acontecendo.

/blue{Present Perfect}
Subject + have/has + Past Participle

/blue{FOR}
Usado para duração, ou seja, um período de tempo.
Ex: for 5 years, for a long time.

/blue{SINCE}
Usado para o ponto de partida, quando começou.
Ex: since 2020, since this morning.

Essa estrutura conecta o passado ao presente. Se você diz "I've worked here for 2 years", você ainda trabalha lá!`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "for-duration-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "O falante ainda é um desenvolvedor?",
      image: ICB1.A1S1,
      audioSource: require("../../../../../mp3/IC/B1/A1S1.mp3"),
      audioDurationMs: 3200,
      answerOptions: ["Sim", "Não"],
      correctOption: "Sim",
      successTitle: "Correto",
      feedbackMessage:
        'O Present Perfect indica uma ação conectada ao presente. "For" foca na extensão do tempo, não na data de início.',
    },
  },
  {
    key: "since-starting-point-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Quando foi a última atualização?",
      image: ICB1.A1S2,
      audioSource: require("../../../../../mp3/IC/B1/A1S2.mp3"),
      audioDurationMs: 3300,
      answerOptions: ["No último trimestre", "Por vários meses"],
      correctOption: "No último trimestre",
      successTitle: "Correto",
      feedbackMessage:
        '"Since" exige um marco temporal específico no passado: since the last quarter.',
    },
  },
  {
    key: "since-clause-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "David começou a tocar guitarra quando?",
      image: ICB1.A1S3,
      audioSource: require("../../../../../mp3/IC/B1/A1S3.mp3"),
      audioDurationMs: 3200,
      answerOptions: ["Na infância", "Por muitos anos"],
      correctOption: "Na infância",
      successTitle: "Correto",
      feedbackMessage:
        '"Since" também pode vir antes de uma frase inteira no Simple Past: since he was a child.',
    },
  },
  {
    key: "for-since-tip",
    component: Exercise17,
    activity: {
      label: "Dominando a Linha do Tempo",
      content: [
        `Para falar de ações que começaram no passado e continuam até hoje, usamos o Present Perfect. Mas como saber qual marcador usar?

/blue{FOR}
Foco: duração.
Depois vem um intervalo de tempo, uma quantidade.
Ex: for 3 hours, for 5 years.

/blue{SINCE}
Foco: ponto de partida.
Depois vem uma data, hora ou evento específico.
Ex: since 2010, since Monday.

Pense no FOR como um cronômetro que conta a quantidade de tempo que passou. Pense no SINCE como um calendário que marca o dia ou hora que tudo começou.

Errado: I have lived here since 5 years.
Certo: I have lived here for 5 years. (Duração)
Certo: I have lived here since 2019. (Ponto de partida)`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "since-10-years-false",
    component: Exercise20,
    activity: {
      prompt: "Verdadeiro ou falso?",
      image: ICB1.A1S5,
      dialogue:
        'In the sentence "I\'ve been a teacher since 10 years", the use of "since" is correct.',
      options: ["True", "False"],
      correctAnswer: "False",
      successTitle: "Correto",
      successMessage:
        '"10 years" é uma duração, uma quantidade de tempo. Por isso, o correto é usar FOR.',
    },
  },
  {
    key: "since-daughter-born-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "O áudio indica um ponto de partida ou uma duração?",
      image: ICB1.A1S6,
      audioSource: require("../../../../../mp3/IC/B1/A1S6.mp3"),
      audioDurationMs: 4000,
      answerOptions: ["Duração (For)", "Ponto de Partida (Since)"],
      correctOption: "Ponto de Partida (Since)",
      successTitle: "Correto",
      feedbackMessage:
        '"Since" pode ser seguido por uma frase inteira no passado: since his daughter was born.',
    },
  },
  {
    key: "order-laptop-long-time",
    component: Exercise6,
    activity: {
      prompt: 'Monte a frase: "Nós usamos este laptop por muito tempo."',
      words: ["We", "have used", "this laptop", "for", "a long time", "."],
      correctOrder: [
        "We",
        "have used",
        "this laptop",
        "for",
        "a long time",
        ".",
      ],
      successTitle: "Correto",
      successMessage: "We have used this laptop for a long time.",
    },
  },
  {
    key: "since-5-years-false",
    component: Exercise20,
    activity: {
      prompt: "Verdadeiro ou falso?",
      image: ICB1.A1S7,
      dialogue:
        'In the sentence "I have lived in London since 5 years", the grammar is correct.',
      options: ["True", "False"],
      correctAnswer: "False",
      successTitle: "Correto",
      successMessage:
        'O correto seria "for 5 years" (duração) ou "since 2019" (ponto de partida). Esse é um erro comum de alunos avançados.',
    },
  },
  {
    key: "order-app-since-last-year",
    component: Exercise6,
    activity: {
      prompt:
        'Monte a frase: "Eles estão desenvolvendo este aplicativo desde o ano passado."',
      words: ["They", "have developed", "this app", "since", "last year", "."],
      correctOrder: [
        "They",
        "have developed",
        "this app",
        "since",
        "last year",
        ".",
      ],
      successTitle: "Correto",
      successMessage: "They have developed this app since last year.",
    },
  },
  {
    key: "dialogue-since-for",
    component: Exercise8,
    activity: {
      prompt:
        "David: \"I've used it ____ we launched the first version. It hasn't crashed ____ months.\"",
      image: ICB1.A1S9,
      options: ["since / for", "for / since", "since / since"],
      correctAnswer: "since / for",
      successTitle: "Correto",
      successMessage:
        '"We launched the first version" é ponto de partida, então usamos since. "Months" é duração, então usamos for.',
    },
  },
  {
    key: "structurally-wrong-sentence",
    component: Exercise8,
    activity: {
      prompt: "Qual frase está estruturalmente ERRADA?",
      image: ICB1.A1S10,
      options: [
        "I've known him for years.",
        "She has since 2010 worked here.",
        "They have been married since June.",
      ],
      correctAnswer: "She has since 2010 worked here.",
      successTitle: "Correto",
      successMessage:
        'O "since" não deve interromper o verbo auxiliar e o principal dessa forma.',
    },
  },
  {
    key: "lingueto-journey-reading",
    component: Exercise17,
    activity: {
      label: "The Lingueto Journey",
      content: [
        `"David is a dedicated creator. He has worked on the Lingueto project since January 2026. He has used React Native for several months to build the perfect UI. Since he started, David hasn't had a boring day! He has played his acoustic guitar to relax for short breaks, but his focus has been on the code since the beginning of the week. The app is almost ready!"`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "write-present-perfect",
    component: Exercise12,
    activity: {
      prompt: "Sua linha do tempo",
      instruction:
        "Pense na sua habilidade mais forte hoje: Inglês, Tech, Música ou outra.",
      helperText:
        "Escreva 3 frases usando o Present Perfect. Use for para dizer a duração e since para dizer quando começou.",
      placeholder:
        "I have studied English since 2022. I have practiced every day for 3 years.",
      tipText:
        'Use "since" com o início: since 2022, since January, since I started. Use "for" com duração: for 3 years, for months, for a long time.',
      minLength: 20,
      successTitle: "Correto",
      successMessage:
        "Boa! Você usou a estrutura para conectar passado e presente.",
    },
  },
  {
    key: "present-perfect-conclusion",
    component: Exercise17,
    activity: {
      label: "Nível Pro Alcançado!",
      content: [
        `Dominar o Present Perfect com For e Since coloca você em um novo patamar de fluência.

Resumo:
FOR = Duração (for + intervalo).
SINCE = Início (since + data/evento).

Agora você já pode falar sobre sua carreira e hobbies como um nativo!

See you in the next level!`,
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

export default function B1IC01({ route, navigation }) {
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
