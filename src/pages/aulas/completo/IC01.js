import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Speech from "expo-speech";
import geral from "../../../exc/geral";
import ex1, { Exercise1 } from "../../../exc/ex1";
import ex14, { Exercise14 } from "../../../exc/ex14";
import ex2, { Exercise2 } from "../../../exc/ex2";
import ex3, { Exercise3 } from "../../../exc/ex3";
import ex4, { Exercise4 } from "../../../exc/ex4";
import ex5, { Exercise5 } from "../../../exc/ex5";
import ex6, { Exercise6 } from "../../../exc/ex6";
import { Images } from "../../../util/images";

const SlideNavContext = React.createContext(null);

const SLIDE_COUNT = 8;
const STORAGE_KEY = "@progesso_ingles_completo";
const styles = {
  ...geral,
  ...ex14,
  ...ex1,
  ...ex2,
  ...ex3,
  ...ex4,
  ...ex5,
  ...ex6,
};

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

    const idx = currentSlideIndex + 1;
    setCurrentSlideIndex(idx);
    updateProgress(progressAnim, idx, totalSlides);
  };

  const prev = () => {
    if (lockRef.current || currentSlideIndex === 0) return;
    lockRef.current = true;
    setTimeout(() => {
      lockRef.current = false;
    }, 300);

    const idx = currentSlideIndex - 1;
    setCurrentSlideIndex(idx);
    updateProgress(progressAnim, idx, totalSlides);
  };

  function renderPrevButton() {
    if (currentSlideIndex === 0) return null;
    return (
      <TouchableOpacity onPress={prev} style={styles.headerCircleButton}>
        <Image source={Images.seta} style={styles.headerCircleImage} />
      </TouchableOpacity>
    );
  }

  return { renderPrevButton, next };
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

function Slide8() {
  const { goToNextLesson } = useNav();

  return (
    <View style={styles.slide}>
      <SlideHeader />

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.nextLessonButton}
          onPress={goToNextLesson}
        >
          <Text style={styles.nextLessonButtonText}>Próxima lição -&gt;</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function Base({ route, navigation }) {
  const lesson = route?.params?.lesson;
  const lessons = route?.params?.lessons;
  const { speak } = useSpeech();

  const [currentSlide, setCurrentSlide] = useState(0);
  const progressAnim = useRef(new Animated.Value(1 / SLIDE_COUNT)).current;

  useEffect(() => {
    updateProgress(progressAnim, currentSlide, SLIDE_COUNT);
  }, [currentSlide, progressAnim]);

  const slideNav = useSlideNavigation({
    currentSlideIndex: currentSlide,
    setCurrentSlideIndex: setCurrentSlide,
    totalSlides: SLIDE_COUNT,
    progressAnim,
  });

  const slide1Activity = {
    title: "Escute e complete",
    image: Images.teacher,
    options: ["Hello", "Hélo"],
    correctAnswer: "Hello",
    audioRate: 0.85,
    successTitle: "Correto",
    feedbackMessage: 'Usamos "Hello" para dizer "oi".',
  };

  const slide2Activity = {
    title: "Encontre a tradução",
    pairs: [
      { en: "Hello", pt: "oi" },
      { en: "fine", pt: "bem/legal" },
      { en: "bye", pt: "tchau" },
    ],
    successTitle: "Excelente",
    successMessage: "Você acertou todas as traduções.",
  };

  const slide3Activity = {
    title: "Completar o Texto",
    paragraphs: [
      [
        "This is my friend Peter. He",
        { id: "blank-1", answer: "is", options: ["is", "are", "am"] },
        "25 years old.",
      ],
      [
        "Peter",
        {
          id: "blank-2",
          answer: "lives",
          options: ["live", "lives", "living"],
        },
        "in New York with his family.",
      ],
      [
        "He",
        {
          id: "blank-3",
          answer: "works",
          options: ["works", "work", "working"],
        },
        "in a big bank. He likes his job.",
      ],
      [
        "On weekends, he",
        {
          id: "blank-4",
          answer: "plays",
          options: ["play", "plays", "playing"],
        },
        "soccer in the park.",
      ],
    ],
    successTitle: "Excelente",
    successMessage: "Você completou o texto corretamente.",
  };

  const slide4Activity = {
    title: "Escute e responda",
    image: require("../../../../assets/Bussines/relogio.png"),
    audioText: "He wakes up at 6am every day.",
    prompt: "He wakes up at 6am every day.",
    options: ["true", "false"],
    correctAnswer: "true",
    audioRate: 0.85,
    successTitle: "Correto",
    successMessage: 'A frase "He wakes up at 6am every day." esta correta.',
  };

  const slide5Activity = {
    title: "Corrija",
    image: require("../../../../assets/Cursos/bussines.jpg"),
    wrongSentence: "She take the bus.",
    options: ["She takes the bus.", "She take the bus."],
    correctAnswer: "She takes the bus.",
    successTitle: "Correto",
    successMessage: 'A forma correta e "She takes the bus."',
  };

  const slide6Activity = {
    title: "Complete a frase",
    image: require("../../../../assets/Cursos/bussines.jpg"),
    sentenceStart: "She",
    sentenceEnd: "the bus.",
    options: ["take", "takes"],
    correctAnswer: "takes",
    successTitle: "Correto",
    successMessage: 'A forma correta e "She takes the bus."',
  };

  const slide7Activity = {
    title: "Coloque a frase em ordem.",
    image: Images.teacher,
    audioText: "Hello, my name is Laura.",
    words: ["Hello", "name's", "my", "Laura"],
    correctOrder: ["Hello", "my", "name's", "Laura"],
    audioRate: 0.85,
    successTitle: "Correto",
    successMessage: `A frase correta e "Hello my name's Laura."`,
  };

  const findNextLesson = () => {
    if (!lessons || !lesson) return null;
    const idx = lessons.findIndex((l) => String(l.id) === String(lesson.id));
    return lessons[idx + 1] || null;
  };

  const goToNextLesson = async () => {
    if (lesson?.id != null) {
      const progress = await loadProgress();
      await saveProgress({ ...progress, [lesson.id]: true });
    }

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
          goToNextLesson,
        }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {currentSlide === 0 && (
            <Exercise14
              activity={slide1Activity}
              styles={styles}
              HeaderComponent={SlideHeader}
              next={slideNav.next}
              speak={speak}
            />
          )}
          {currentSlide === 1 && (
            <Exercise1
              activity={slide2Activity}
              styles={styles}
              HeaderComponent={SlideHeader}
              next={slideNav.next}
            />
          )}
          {currentSlide === 2 && (
            <Exercise2
              activity={slide3Activity}
              styles={styles}
              HeaderComponent={SlideHeader}
              next={slideNav.next}
            />
          )}
          {currentSlide === 3 && (
            <Exercise3
              activity={slide4Activity}
              styles={styles}
              HeaderComponent={SlideHeader}
              next={slideNav.next}
              speak={speak}
            />
          )}
          {currentSlide === 4 && (
            <Exercise4
              activity={slide5Activity}
              styles={styles}
              HeaderComponent={SlideHeader}
              next={slideNav.next}
            />
          )}
          {currentSlide === 5 && (
            <Exercise5
              activity={slide6Activity}
              styles={styles}
              HeaderComponent={SlideHeader}
              next={slideNav.next}
            />
          )}
          {currentSlide === 6 && (
            <Exercise6
              activity={slide7Activity}
              styles={styles}
              HeaderComponent={SlideHeader}
              next={slideNav.next}
              speak={speak}
            />
          )}
          {currentSlide === 7 && <Slide8 />}
        </ScrollView>
      </SlideNavContext.Provider>
    </SafeAreaView>
  );
}
