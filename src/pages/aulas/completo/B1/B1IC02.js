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
    key: "nuances-intro",
    component: Exercise17,
    activity: {
      label: "Expectativa vs. Realidade",
      content: [
        `/blue{JUST}
Significado: acabou de acontecer, agora mesmo.
Onde usar: no meio da frase, entre have/has e o verbo.
Ex: I've just sent the email.

/blue{ALREADY}
Significado: já aconteceu, antes do que o esperado.
Onde usar: no meio da frase, entre have/has e o verbo.
Ex: He has already fixed the bug!

/blue{YET}
Significado: até agora / ainda, em perguntas ou negativas.
Onde usar: sempre no final da frase.
Ex: Is the update ready yet?

/blue{STILL}
Significado: ainda não, enfatiza que está demorando.
Onde usar: antes de haven't/hasn't.
Ex: I still haven't found the file.

/blue{Dica Pro do Camaleão}
Use STILL quando quiser mostrar impaciência ou que algo está levando tempo demais.
I haven't finished yet. (Neutro)
I still haven't finished! (Frustrado)`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "just-cleaned-screen",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "A tela foi limpa há muito tempo?",
      image: ICB1.A2S1,
      audioSource: require("../../../../../mp3/IC/B1/A2S1.mp3"),
      audioDurationMs: 2600,
      answerOptions: ["Não, foi agora mesmo", "Sim, foi há muito tempo"],
      correctOption: "Não, foi agora mesmo",
      successTitle: "Correto",
      feedbackMessage:
        '"Just" indica uma ação imediata, que acabou de acontecer.',
    },
  },
  {
    key: "updated-app-yet",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "O falante espera que o app seja atualizado?",
      image: ICB1.A2S2,
      audioSource: require("../../../../../mp3/IC/B1/A2S2.mp3"),
      audioDurationMs: 2800,
      answerOptions: ["Sim", "Não"],
      correctOption: "Sim",
      successTitle: "Correto",
      feedbackMessage:
        '"Yet" em perguntas mostra expectativa: o falante espera que algo aconteça.',
    },
  },
  {
    key: "still-charger",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Qual é o sentimento do falante?",
      image: ICB1.A2S3,
      audioSource: require("../../../../../mp3/IC/B1/A2S3.mp3"),
      audioDurationMs: 2800,
      answerOptions: ["Frustração/Impaciência", "Surpresa positiva"],
      correctOption: "Frustração/Impaciência",
      successTitle: "Correto",
      feedbackMessage:
        "\"Still\" antes de haven't/hasn't mostra que algo continua pendente e incomoda.",
    },
  },
  {
    key: "expectation-reality-tip",
    component: Exercise17,
    activity: {
      label: "Expectativa vs. Realidade",
      content: [
        `No nível Pro, essas quatro palavras funcionam como temperos da frase.

/blue{JUST}
Função: ação imediata, agora mesmo.
Onde colocar: entre have/has e o verbo.
Ex: "I've just sent the email."

/blue{ALREADY}
Função: surpresa, antes do esperado.
Onde colocar: entre have/has e o verbo.
Ex: "He has already fixed the bug!"

/blue{YET}
Função: expectativa, até agora.
Onde colocar: no final da frase.
Ex: "Is the update ready yet?"

/blue{STILL}
Função: frustração, continua sem acontecer.
Onde colocar: antes de haven't/hasn't.
Ex: "I still haven't found the file."

Dica do Mestre: STILL no Present Perfect é quase sempre usado em frases negativas para enfatizar que algo está demorando mais do que deveria.`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "david-still-not-finished",
    component: Exercise8,
    activity: {
      prompt:
        "David está na frente do computador, são 2h da manhã, e o projeto ainda não terminou. Qual frase melhor descreve a imagem?",
      image: ICB1.A2S5,
      options: [
        "David has just started working.",
        "David already finished the project.",
        "David still hasn't finished the project.",
      ],
      correctAnswer: "David still hasn't finished the project.",
      successTitle: "Correto",
      successMessage:
        '"Still" mostra que a ação continua pendente apesar do esforço.',
    },
  },
  {
    key: "just-spilled-coffee",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "O café caiu há muito tempo?",
      image: ICB1.A2S6,
      audioSource: require("../../../../../mp3/IC/B1/A2S6.mp3"),
      audioDurationMs: 3600,
      answerOptions: ["Não, foi agora mesmo", "Sim, foi ontem"],
      correctOption: "Não, foi agora mesmo",
      successTitle: "Correto",
      feedbackMessage:
        '"Just" indica que a ação aconteceu há pouquíssimo tempo.',
    },
  },
  {
    key: "already-react-native",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "O falante está surpreso com a velocidade do aprendizado?",
      image: ICB1.A2S7,
      audioSource: require("../../../../../mp3/IC/B1/A2S7.mp3"),
      audioDurationMs: 3800,
      answerOptions: ["Sim", "Não"],
      correctOption: "Sim",
      successTitle: "Correto",
      feedbackMessage:
        '"Already" pode mostrar surpresa porque algo aconteceu antes do esperado.',
    },
  },
  {
    key: "yet-positive-false",
    component: Exercise20,
    activity: {
      prompt: "Verdadeiro ou falso?",
      image: ICB1.A2S8,
      dialogue:
        "We use YET in positive sentences to show something is finished.",
      options: ["True", "False"],
      correctAnswer: "False",
      successTitle: "Correto",
      successMessage:
        '"Yet" é usado em perguntas ou frases negativas. Para frases positivas, usamos "already".',
    },
  },
  {
    key: "order-still-coffee",
    component: Exercise6,
    activity: {
      prompt:
        'Monte a frase: "Eu ainda não tomei meu café hoje (e estou com sono!)."',
      words: ["I", "still", "haven't", "had", "my coffee", "today", "."],
      correctOrder: ["I", "still", "haven't", "had", "my coffee", "today", "."],
      successTitle: "Correto",
      successMessage: "I still haven't had my coffee today.",
    },
  },
  {
    key: "website-update-still",
    component: Exercise5,
    activity: {
      prompt: "Complete a frase",
      image: ICB1.A3S1,
      sentenceStart: "We've just finished the code, but we",
      sentenceEnd: "haven't tested it.",
      options: ["still", "yet", "already"],
      correctAnswer: "still",
      successTitle: "Correto",
      successMessage:
        "\"Still\" vem antes de haven't/hasn't para enfatizar demora ou pendência.",
    },
  },
  {
    key: "wrong-already-negative",
    component: Exercise8,
    activity: {
      prompt: "Qual destas frases está gramaticalmente ERRADA?",
      image: ICB1.A3S2,
      options: [
        "I have already seen that movie.",
        "I haven't already finished the task.",
        "I haven't finished the task yet.",
      ],
      correctAnswer: "I haven't already finished the task.",
      successTitle: "Correto",
      successMessage:
        'Não usamos "already" em negativas simples; usamos "yet" ou "still".',
    },
  },
  {
    key: "deadline-pressure-reading",
    component: Exercise17,
    activity: {
      label: "Deadline Pressure",
      content: [
        `"David is under pressure. The app launch is tomorrow. He has already created the 17 activities, but he still hasn't recorded the audios. He has just received a message from his partner: 'Is everything ready yet?'. David sighs. He has already worked for 10 hours today, but the job isn't finished yet."`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "write-already-yet-just",
    component: Exercise12,
    activity: {
      prompt: "Sua lista de hoje",
      instruction: "Pense na sua lista de tarefas de hoje.",
      helperText: "Escreva 3 frases usando already, yet e just.",
      image: ICB1.A3S3,
      placeholder:
        "I've already checked my emails. I haven't had lunch yet. I've just finished a task.",
      tipText:
        "Already fica entre have/has e o verbo. Yet vai no final. Just fica entre have/has e o verbo.",
      minLength: 20,
      successTitle: "Correto",
      successMessage:
        "Boa! Você praticou as nuances de tempo no Present Perfect.",
    },
  },
  {
    key: "time-master-conclusion",
    component: Exercise17,
    activity: {
      label: "Mestre do Tempo!",
      content: [
        `Você agora domina as nuances temporais que separam os básicos dos avançados.

Resumo:
Just = Agora.
Already = Antes do esperado.
Yet = Expectativa no fim da frase.
Still = Frustração/Demora.

Mantenha o foco e não pare ainda!

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

export default function B1IC02({ route, navigation }) {
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
