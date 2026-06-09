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
    key: "email-tone-intro",
    component: Exercise17,
    activity: {
      label: "Acerte o Tom",
      content: [
        `A escolha da saudação define o respeito e a proximidade no mundo tech.

/blue{Formal}
Clientes novos / Diretores
Saudação: Dear Mr. Smith,
Fechamento: Sincerely,

/blue{Semi-formal}
Colegas / Parceiros recorrentes
Saudação: Hi David, ou Hello Team,
Fechamento: Best regards, ou Thanks,

/blue{Dica do Camaleão}
Se você não sabe o nome da pessoa, use o cargo: Dear Hiring Manager.
Nunca use "Yo" ou "Hey" para quem você quer que te contrate!`,
      ],
      continueLabel: "Começar",
    },
  },
  {
    key: "semi-formal-email",
    component: Exercise4,
    activity: {
      prompt: "Escolha a melhor análise do e-mail",
      image: ICB1.A8S8,
      wrongSentence:
        "Hi Alex, thanks for the meeting earlier. I've sent the files you requested. Kind regards, David.",
      options: [
        'The email is semi-formal because it uses a first name and "Kind regards".',
        "The email is strictly formal because of the technical language.",
      ],
      correctAnswer:
        'The email is semi-formal because it uses a first name and "Kind regards".',
      successTitle: "Correto",
      successMessage:
        "Nome próprio + Kind regards cria um tom semi-formal e profissional.",
    },
  },
  {
    key: "investor-email-blanks",
    component: Exercise2,
    activity: {
      prompt: "Complete o e-mail para um novo investidor",
      paragraphs: [
        [
          { id: "b1", answer: "Dear", options: ["Dear", "Hi"] },
          "Mr. Anderson, I am writing",
        ],
        [
          { id: "b2", answer: "regarding", options: ["regarding", "with"] },
          "the new update on the Lingueto app.",
        ],
        [
          "Please find the roadmap",
          { id: "b3", answer: "attached", options: ["inside", "attached"] },
          "to this email. Sincerely, Kaique.",
        ],
      ],
      successTitle: "Correto",
      successMessage: "Para um investidor novo: Dear / regarding / attached.",
    },
  },
  {
    key: "sincerely-close-teammate",
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt: "Verdadeiro ou falso?",
      image: ICB1.A9S1,
      audioText:
        'You should use "Sincerely" when closing an email to a close teammate.',
      audioDurationMs: 3600,
      dialogue:
        'You should use "Sincerely" when closing an email to a close teammate.',
      options: ["True", "False"],
      correctAnswer: "False",
      successTitle: "Correto",
      successMessage:
        '"Sincerely" é muito formal para colegas próximos. Use "Thanks" ou "Best".',
    },
  },
  {
    key: "order-attached",
    component: Exercise6,
    activity: {
      prompt: "Monte a frase para avisar que você está enviando um anexo:",
      words: ["Please", "find", "the", "presentation", "attached", "."],
      correctOrder: ["Please", "find", "the", "presentation", "attached", "."],
      successTitle: "Correto",
      successMessage: "Please find the presentation attached.",
    },
  },
  {
    key: "not-email-closing",
    component: Exercise8,
    activity: {
      prompt: "Qual destas palavras NÃO é um fechamento de e-mail?",
      image: ICB1.A9S2,
      options: ["Sincerely,", "Best regards,", "Attachment", "Thanks,"],
      correctAnswer: "Attachment",
      successTitle: "Correto",
      successMessage: "Attachment significa anexo, não fechamento de e-mail.",
    },
  },
  {
    key: "send-email-dialogue",
    component: Exercise2,
    activity: {
      prompt: "Complete a conversa",
      paragraphs: [
        [
          'David: "Not',
          { id: "b1", answer: "yet", options: ["yet", "attach", "already"] },
          ". I'm checking the spelling.\"",
        ],
        [
          "Sarah: \"Don't forget to",
          { id: "b2", answer: "attach", options: ["attach", "yet", "inquire"] },
          'the PDF file!"',
        ],
      ],
      successTitle: "Correto",
      successMessage: "A sequência correta é: yet / attach.",
    },
  },
  {
    key: "spell-inquire",
    component: Exercise13,
    needsSpeech: true,
    activity: {
      prompt:
        'Desembaralhe a palavra usada para "perguntar" ou "saber" sobre algo formalmente:',
      audioSource: require("../../../../../mp3/IC/B1/A7S7.mp3"),
      audioDurationMs: 1000,
      letters: ["I", "N", "Q", "U", "I", "R", "E"],
      correctWord: "INQUIRE",
      successTitle: "Correto",
      successMessage: 'A palavra é "INQUIRE".',
    },
  },
  {
    key: "professional-touch",
    component: Exercise17,
    activity: {
      label: "The Professional Touch",
      content: [
        `"David is writing an important email. He starts with 'Dear Ms. Garcia' because he doesn't know her well. He writes: 'I am writing to inquire about the partnership'. He attaches the Lingueto project to the message. He ends the email with 'Sincerely' and his full name. David knows that a good email can open many doors in the tech world!"`,
      ],
      continueLabel: "Continuar",
    },
  },
  {
    key: "write-investor-email",
    component: Exercise12,
    activity: {
      prompt: "O Camaleão te desafia!",
      instruction:
        "Você é o desenvolvedor do Lingueto. Escreva um e-mail para Mr. Anderson pedindo uma reunião.",
      helperText:
        'Inclua saudação formal, "I am writing to inquire about your availability for a meeting.", menção ao anexo, fechamento formal e assinatura.',
      image: ICB1.A9S3,
      placeholder:
        "Dear Mr. Anderson,\nI am writing to inquire about your availability for a meeting. Please find the project overview attached.\nSincerely,\nKaique",
      tipText: "Para tom formal, use Dear, attached e Sincerely.",
      minLength: 40,
      successTitle: "Correto",
      successMessage: "Ótimo! Seu e-mail está com tom profissional.",
    },
  },
  {
    key: "inbox-zero",
    component: Exercise17,
    activity: {
      label: "Inbox Zero!",
      content: [
        `Você aprendeu a transitar entre o formal e o semi-formal.

Recapitulando:
Dear / Sincerely = Formal.
Hi / Regards = Semi-formal.

Agora é só apertar o "Send"!

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

export default function B1IC07({ route, navigation }) {
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
