import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Speech from "expo-speech";
import CORES from "../../../util/cores";
import { Images } from "../../../util/images";

const SlideNavContext = React.createContext(null);

const SLIDE_COUNT = 8;
const STORAGE_KEY = "@progesso_ingles_completo";

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

  function renderNextButton(index) {
    if (index !== currentSlideIndex) return null;
    return (
      <TouchableOpacity style={styles.nextButton} onPress={next}>
        <Text style={styles.nextButtonText}>Proximo -&gt;</Text>
      </TouchableOpacity>
    );
  }

  function renderPrevButton() {
    if (currentSlideIndex === 0) return null;
    return (
      <TouchableOpacity onPress={prev} style={styles.headerCircleButton}>
        <Image source={Images.seta} style={styles.headerCircleImage} />
      </TouchableOpacity>
    );
  }

  return { renderNextButton, renderPrevButton, next };
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

function Slide1() {
  const { next } = useNav();
  const { speak } = useSpeech();
  const insets = useSafeAreaInsets();
  const options = ["Hello", "Hélo"];
  const correctAnswer = "Hello";
  const activityImage = Images.teacher;
  const audioRate = 0.85;
  const audioProgressAnim = useRef(new Animated.Value(0)).current;
  const estimatedDurationMs = Math.max(
    900,
    Math.round(((correctAnswer.length / 5) * 60000) / 140 / audioRate),
  );

  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);

  const playAudio = () => {
    audioProgressAnim.stopAnimation();
    audioProgressAnim.setValue(0);
    Animated.timing(audioProgressAnim, {
      toValue: 1,
      duration: estimatedDurationMs,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    speak({
      text: correctAnswer,
      language: "en-US",
      rate: audioRate,
      onDone: () => audioProgressAnim.setValue(1),
      onStopped: () => audioProgressAnim.stopAnimation(),
      onError: () => audioProgressAnim.stopAnimation(),
    });
  };

  const handleSelect = (option) => {
    setSelected(option);
    setResult(option === correctAnswer ? "correct" : "wrong");
  };

  const isCorrect = result === "correct";
  const isWrong = result === "wrong";

  return (
    <View style={styles.slide}>
      <SlideHeader />

      <Text style={styles.exerciseTitle}>Escute e complete</Text>

      <View style={styles.mediaWrapper}>
        <View style={styles.mediaCard}>
          <Image source={activityImage} style={styles.mediaImage} />
        </View>

        <TouchableOpacity style={styles.audioButton} onPress={playAudio}>
          <Text style={styles.audioIcon}>▶</Text>
          <View style={styles.audioBar}>
            <Animated.View
              style={[
                styles.audioProgress,
                {
                  width: audioProgressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "100%"],
                  }),
                },
              ]}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={[styles.resultBar]}>
        <Text
          style={[
            styles.resultBarText,
            isCorrect && styles.resultBarTextCorrect,
            isWrong && styles.resultBarTextWrong,
          ]}
        >
          {selected || " "}
        </Text>
        <View
          style={[
            styles.resultUnderline,
            isCorrect && styles.resultUnderlineCorrect,
            isWrong && styles.resultUnderlineWrong,
          ]}
        />
      </View>

      <View style={styles.optionsRow}>
        {options.map((option) => {
          const optionIsCorrect =
            selected === option && option === correctAnswer;
          const optionIsWrong = selected === option && option !== correctAnswer;

          return (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionPill,
                optionIsCorrect && styles.optionCorrect,
                optionIsWrong && styles.optionBlinkWrong,
              ]}
              onPress={() => handleSelect(option)}
              disabled={isCorrect}
            >
              <Text
                style={[
                  styles.optionText,
                  optionIsCorrect && styles.optionCorrectText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {isWrong && (
        <View style={[styles.feedbackBox, styles.feedbackBoxWrong]}>
          <Text style={[styles.feedbackTitle, styles.feedbackTitleWrong]}>
            x Sorry!
          </Text>
          <Text style={styles.feedbackTextBlack}>
            {`Usamos "${correctAnswer}" para dizer "oi".`}
          </Text>
        </View>
      )}

      {isCorrect && (
        <View style={styles.successAlertOverlay}>
          <View
            style={[
              styles.successAlertCard,
              { paddingBottom: Math.max(16, insets.bottom + 10) },
            ]}
          >
            <View style={styles.successHeaderRow}>
              <View style={styles.successIconWrap}>
                <Text style={styles.successIcon}>v</Text>
              </View>
              <Text style={styles.successAlertTitle}>Correto</Text>
            </View>

            <View
              style={[
                styles.feedbackBox,
                styles.feedbackBoxCorrect,
                styles.alertFeedbackBox,
              ]}
            >
              <Text style={[styles.feedbackTitle, styles.feedbackTitleCorrect]}>
                v Correto!
              </Text>
              <Text style={styles.feedbackTextBlack}>
                {`Usamos "${correctAnswer}" para dizer "oi".`}
              </Text>
            </View>

            <TouchableOpacity style={styles.alertContinueButton} onPress={next}>
              <Text style={styles.alertContinueButtonText}>Proximo -&gt;</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

function Slide2() {
  const { renderNextButton } = useNav();

  return (
    <View style={styles.slide}>
      <SlideHeader />

      {renderNextButton(1)}
    </View>
  );
}

function Slide3() {
  const { renderNextButton } = useNav();

  return (
    <View style={styles.slide}>
      <SlideHeader />

      {renderNextButton(2)}
    </View>
  );
}

function Slide4() {
  const { renderNextButton } = useNav();

  return (
    <View style={styles.slide}>
      <SlideHeader />

      {renderNextButton(3)}
    </View>
  );
}

function Slide5() {
  const { renderNextButton } = useNav();

  return (
    <View style={styles.slide}>
      <SlideHeader />

      {renderNextButton(4)}
    </View>
  );
}

function Slide6() {
  const { renderNextButton } = useNav();

  return (
    <View style={styles.slide}>
      <SlideHeader />

      {renderNextButton(5)}
    </View>
  );
}

function Slide7() {
  const { renderNextButton } = useNav();

  return (
    <View style={styles.slide}>
      <SlideHeader />

      {renderNextButton(6)}
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
          <Text style={styles.nextLessonButtonText}>Proxima licao -&gt;</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function Base({ route, navigation }) {
  const lesson = route?.params?.lesson;
  const lessons = route?.params?.lessons;

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
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <SlideNavContext.Provider
        value={{
          ...slideNav,
          progressAnim,
          goBack: () => navigation.goBack(),
          goToNextLesson,
        }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {currentSlide === 0 && <Slide1 />}
          {currentSlide === 1 && <Slide2 />}
          {currentSlide === 2 && <Slide3 />}
          {currentSlide === 3 && <Slide4 />}
          {currentSlide === 4 && <Slide5 />}
          {currentSlide === 5 && <Slide6 />}
          {currentSlide === 6 && <Slide7 />}
          {currentSlide === 7 && <Slide8 />}
        </ScrollView>
      </SlideNavContext.Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    margin: 20,
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#F5F5F5",
    zIndex: 10,
  },
  headerButton: {
    width: 32,
    alignItems: "center",
  },
  headerProgress: {
    flex: 1,
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    marginHorizontal: 8,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: CORES.PRIMARY,
    borderRadius: 2,
  },
  headerCircleButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: CORES.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },
  headerCircleImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  nextButton: {
    backgroundColor: CORES.SECONDARY,
    width: 180,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    marginHorizontal: 4,
  },
  nextButtonText: {
    color: "#FFF",
    fontWeight: "700",
  },
  nextLessonButton: {
    backgroundColor: "#0F73FF",
    width: 180,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  nextLessonButtonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  exerciseTitle: {
    width: "88%",
    textAlign: "left",
    fontSize: 18,
    color: CORES.PRIMARY,
    marginBottom: 12,
    fontWeight: "700",
  },
  mediaWrapper: {
    width: "88%",
    marginBottom: 14,
  },
  mediaCard: {
    width: "100%",
    height: 190,
    backgroundColor: "#38BDF8",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    overflow: "hidden",
  },
  mediaImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  audioButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CORES.PRIMARY,
    width: "100%",
    height: 48,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    paddingHorizontal: 16,
    gap: 12,
  },
  audioIcon: {
    color: "#FFF",
    fontSize: 18,
  },
  audioBar: {
    flex: 1,
    height: 6,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 3,
    overflow: "hidden",
  },
  audioProgress: {
    height: "100%",
    backgroundColor: "#FFF",
    borderRadius: 3,
  },

  resultBar: {
    width: "56%",
    minHeight: 46,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  resultBarText: {
    fontSize: 28,
    fontFamily: "serif",
    fontWeight: "500",
    color: "#111827",
  },
  resultBarTextCorrect: {
    color: "#16A34A",
  },
  resultBarTextWrong: {
    color: "#DC2626",
  },
  resultUnderline: {
    width: "55%",
    height: 2,
    marginTop: 2,
    borderRadius: 2,
    backgroundColor: "#D1D5DB",
  },
  resultUnderlineCorrect: {
    backgroundColor: "#22C55E",
  },
  resultUnderlineWrong: {
    backgroundColor: "#EF4444",
  },

  optionsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
  },
  optionPill: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#FFF",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  optionCorrect: {
    backgroundColor: "#DCFCE7",
    borderColor: "#22C55E",
  },
  optionCorrectText: {
    color: "#16A34A",
    fontWeight: "700",
  },
  optionBlinkWrong: {
    backgroundColor: "#FEE2E2",
    borderColor: "#EF4444",
  },

  feedbackBox: {
    width: "85%",
    borderWidth: 1,
    borderColor: "#22C55E",
    backgroundColor: "#ECFDF5",
    borderRadius: 12,
    padding: 14,
    marginTop: 14,
  },
  feedbackBoxCorrect: {
    borderColor: "#22C55E",
    backgroundColor: "#ECFDF5",
  },
  feedbackBoxWrong: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
  feedbackTitle: {
    color: "#16A34A",
    fontWeight: "700",
    marginBottom: 4,
  },
  feedbackTitleCorrect: {
    color: "#16A34A",
  },
  feedbackTitleWrong: {
    color: "#DC2626",
  },
  feedbackTextBlack: {
    color: "#000",
    fontSize: 14,
  },
  successAlertOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
  },
  successAlertCard: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 22,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  successHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  successIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#DCFCE7",
    alignItems: "center",
    justifyContent: "center",
  },
  successIcon: {
    color: "#16A34A",
    fontSize: 16,
    fontWeight: "700",
  },
  successAlertTitle: {
    color: "#15803D",
    fontSize: 18,
    fontWeight: "800",
  },
  alertFeedbackBox: {
    width: "100%",
    marginTop: 0,
    marginBottom: 12,
  },
  alertContinueButton: {
    width: "100%",
    height: 50,
    borderRadius: 14,
    backgroundColor: CORES.SECONDARY,
    alignItems: "center",
    justifyContent: "center",
  },
  alertContinueButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
