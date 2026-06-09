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
    key: "startup-vocabulary-intro",
    component: Exercise17,
    activity: {
      label: "O Vocabulário do Vale",
      content: [
        `Se você quer trabalhar em tech ou lançar seu próprio app, precisa dessas palavras na ponta da língua:

/blue{VC}
Venture Capital: o dinheiro e as pessoas que investem em startups de alto risco.

/blue{Pitch}
Aquela apresentação rápida e matadora para convencer alguém a investir na sua ideia.

/blue{Scale}
Crescer o negócio de forma rápida e sustentável.

/blue{Deadline}
O prazo final. Em startups, perder um deadline pode custar caro!`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "vc-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escolha a definição correta",
      image: ICB1.A9S11,
      audioSource: require("../../../../../mp3/IC/B1/A8S1.mp3"),
      audioDurationMs: 2200,
      answerOptions: [
        "Venture Capital refers to investors who provide money to startups.",
        "VC is a type of computer hardware used in offices.",
      ],
      correctOption:
        "Venture Capital refers to investors who provide money to startups.",
      successTitle: "Correto",
      feedbackMessage: "Diga apenas as letras: VI-CI.",
    },
  },
  {
    key: "pitch-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escolha a definição correta",
      image: ICB1.A10S1,
      audioSource: require("../../../../../mp3/IC/B1/A8S2.mp3"),
      audioDurationMs: 2800,
      answerOptions: [
        "A pitch is a fast presentation to sell an idea or product.",
        "A pitch is a long holiday taken by startup founders.",
      ],
      correctOption:
        "A pitch is a fast presentation to sell an idea or product.",
      successTitle: "Correto",
      feedbackMessage: 'Tem som de "TCH" no final: PÍ-TCH.',
    },
  },
  {
    key: "scale-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escolha a definição correta",
      image: ICB1.A10S2,
      audioSource: require("../../../../../mp3/IC/B1/A8S3.mp3"),
      audioDurationMs: 3000,
      answerOptions: [
        "To scale means to grow the business significantly.",
        "To scale means to delete the application from the store.",
      ],
      correctOption: "To scale means to grow the business significantly.",
      successTitle: "Correto",
      feedbackMessage: 'O "E" final é mudo. Diga: SQUÊI-OU.',
    },
  },
  {
    key: "deadline-audio",
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escolha a definição correta",
      image: ICB1.A10S3,
      audioSource: require("../../../../../mp3/IC/B1/A8S4.mp3"),
      audioDurationMs: 3200,
      answerOptions: [
        "A deadline is the latest time or date something must be finished.",
        "A deadline is a phone line used only by CEOs.",
      ],
      correctOption:
        "A deadline is the latest time or date something must be finished.",
      successTitle: "Correto",
      feedbackMessage: 'Enfatize o "Dead": DÉD-láin.',
    },
  },
  {
    key: "startup-conversation",
    component: Exercise2,
    activity: {
      prompt: "Escolha as palavras corretas para a conversa entre dois sócios:",
      paragraphs: [
        [
          "Our",
          { id: "b1", answer: "VC", options: ["VC", "Deadline"] },
          "is meeting us today.",
        ],
        [
          "We need to give a perfect",
          { id: "b2", answer: "Pitch", options: ["Pitch", "Scale"] },
          "to show how we will",
        ],
        [
          { id: "b3", answer: "Scale", options: ["Deadline", "Scale"] },
          "the Lingueto app this year.",
        ],
      ],
      successTitle: "Correto",
      successMessage: "A sequência correta é: VC / Pitch / Scale.",
    },
  },
  {
    key: "miss-deadline-false",
    component: Exercise20,
    activity: {
      prompt: "Verdadeiro ou falso?",
      image: ICB1.A10S4,
      dialogue:
        "If you miss a deadline, it means you finished the task on time.",
      options: ["True", "False"],
      correctAnswer: "False",
      successTitle: "Correto",
      successMessage:
        "Miss a deadline significa que você se atrasou. Se terminar a tempo, você met the deadline.",
    },
  },
  {
    key: "order-scale-business",
    component: Exercise6,
    activity: {
      prompt: "Monte a frase sobre o crescimento do app:",
      words: ["It", "is", "time", "to", "scale", "our", "business", "."],
      correctOrder: ["It", "is", "time", "to", "scale", "our", "business", "."],
      successTitle: "Correto",
      successMessage: "It is time to scale our business.",
    },
  },
  {
    key: "not-startup-word",
    component: Exercise8,
    activity: {
      prompt:
        "Qual destas palavras NÃO faz parte do mundo dos negócios e startups?",
      image: ICB1.A11S2,
      options: ["VC", "Pitch", "Pineapple", "Deadline"],
      correctAnswer: "Pineapple",
      successTitle: "Correto",
      successMessage: "Pineapple é abacaxi, não vocabulário de startup.",
    },
  },
  {
    key: "deadline-vc-dialogue",
    component: Exercise2,
    activity: {
      prompt: "Complete a conversa",
      paragraphs: [
        [
          'David: "We have to! The',
          {
            id: "b1",
            answer: "deadline",
            options: ["deadline", "VC", "pitch"],
          },
          'is at midnight."',
        ],
        [
          'Developer: "I hope the',
          { id: "b2", answer: "VC", options: ["scale", "deadline", "VC"] },
          'gives us more money after this."',
        ],
      ],
      successTitle: "Correto",
      successMessage: "A sequência correta é: deadline / VC.",
    },
  },
  {
    key: "spell-pitch",
    component: Exercise13,
    needsSpeech: true,
    activity: {
      prompt: 'Desembaralhe a palavra usada para a "apresentação de venda":',
      audioSource: require("../../../../../mp3/IC/B1/A8S10.mp3"),
      audioDurationMs: 900,
      letters: ["P", "I", "T", "C", "H"],
      correctWord: "PITCH",
      successTitle: "Correto",
      successMessage: 'A palavra é "PITCH".',
    },
  },
  {
    key: "silicon-valley-dreams",
    component: Exercise17,
    activity: {
      label: "Silicon Valley Dreams",
      content: [
        `"David is the founder of Lingueto. He has a very important deadline tomorrow: he needs to present his pitch to a famous VC from Silicon Valley. David knows his app is great, but now he needs to prove that it can scale to millions of users. If the investors like the project, Lingueto will become a giant! David is nervous, but he is ready for the challenge."`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "elevator-pitch-write",
    component: Exercise12,
    activity: {
      prompt: "O Camaleão te desafia!",
      instruction:
        "Você está em um elevador com um investidor bilionário. Você tem 30 segundos para falar do seu app.",
      helperText:
        "Escreva 2 frases: diga que seu projeto está pronto para scale e peça uma reunião para fazer o seu pitch.",
      image: ICB1.A11S3,
      placeholder:
        "My app is ready to scale globally. Could we schedule a meeting so I can present my pitch?",
      tipText: "Use scale como verbo e pitch como apresentação de venda.",
      minLength: 20,
      successTitle: "Correto",
      successMessage: "Boa! Esse é o vocabulário de founder.",
    },
  },
  {
    key: "unicorn-conclusion",
    component: Exercise17,
    activity: {
      label: "Próxima Parada: Unicórnio!",
      content: [
        `Agora você já fala a língua dos grandes fundadores.

Recapitulando:
VC = Investidor.
Pitch = Apresentação.
Scale = Crescer rápido.
Deadline = Prazo final.

Mantenha o foco no projeto e não perca o deadline da próxima aula!

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

export default function B1IC08({ route, navigation }) {
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
