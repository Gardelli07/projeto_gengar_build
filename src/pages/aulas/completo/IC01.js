import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Speech from "expo-speech";
import CORES from "../../../util/cores";
import { Images } from "../../../util/images";

/* ================= SPEECH ================= */

export function useSpeech() {
  const speak = ({
    text,
    language = "en-US",
    rate = 0.9,
    pitch = 1.0,
    stopBefore = true,
  }) => {
    if (!text) return;
    if (stopBefore) Speech.stop();
    Speech.speak(text, { language, rate, pitch });
  };

  return { speak };
}

/* ================= CONTEXT ================= */

const SlideNavContext = React.createContext(null);

/* ================= CONFIG ================= */

const SLIDE_COUNT = 8;
const STORAGE_KEY = "@progesso_ingles_completo";

/* ================= STORAGE ================= */

async function loadProgress() {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
}

async function saveProgress(progress) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

/* ================= PROGRESS ================= */

function updateProgress(progressAnim, index, total) {
  Animated.timing(progressAnim, {
    toValue: (index + 1) / total,
    duration: 300,
    useNativeDriver: false,
  }).start();
}

/* ================= NAV HOOK ================= */

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
    setTimeout(() => (lockRef.current = false), 300);

    const idx = currentSlideIndex + 1;
    setCurrentSlideIndex(idx);
    updateProgress(progressAnim, idx, totalSlides);
  };

  const prev = () => {
    if (lockRef.current || currentSlideIndex === 0) return;
    lockRef.current = true;
    setTimeout(() => (lockRef.current = false), 300);

    const idx = currentSlideIndex - 1;
    setCurrentSlideIndex(idx);
    updateProgress(progressAnim, idx, totalSlides);
  };

  function renderNextButton(index) {
    if (index !== currentSlideIndex) return null;
    return (
      <TouchableOpacity style={styles.nextButton} onPress={next}>
        <Text style={styles.nextButtonText}>Próximo →</Text>
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

  return { renderNextButton, renderPrevButton };
}

/* ================= HEADER ================= */

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

/* ================= SCREEN ================= */

export default function Base({ route, navigation }) {
  const lesson = route?.params?.lesson;
  const lessons = route?.params?.lessons;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [done, setDone] = useState(false);

  const progressAnim = useRef(new Animated.Value(1 / SLIDE_COUNT)).current;

  useEffect(() => {
    updateProgress(progressAnim, currentSlide, SLIDE_COUNT);
  }, [currentSlide]);

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
    const progress = await loadProgress();
    await saveProgress({ ...progress, [lesson.id]: true });

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

/* ================= CONTEXT HOOK ================= */

function useNav() {
  return React.useContext(SlideNavContext);
}

/* ================= SLIDES (exemplo) ================= */

function Slide1() {
  const { renderNextButton } = useNav();
  return (
    <View style={styles.slide}>
      <SlideHeader />
      <Text style={styles.heroIcon}>👋</Text>
      <Text style={styles.heroTitle}>How do you say{"\n"}"oi" in English?</Text>
      <Text style={styles.heroSubtitle}>Como dizer "oi" em inglês?</Text>
      {renderNextButton(0)}
    </View>
  );
}

function Slide2() {
  const { renderNextButton } = useNav();
  const { speak } = useSpeech();

  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [blinkWrong, setBlinkWrong] = useState(false);

  const playAudio = () => {
    speak({ text: "Hello", language: "en-US", rate: 0.85 });
  };

  const handleSelect = (option) => {
    if (option === "Hello") {
      setSelected(option);
      setIsCorrect(true);
    } else {
      setSelected(option);
      setBlinkWrong(true);

      setTimeout(() => {
        setBlinkWrong(false);
        setSelected(null);
      }, 400);
    }
  };

  return (
    <View style={styles.slide}>
      <SlideHeader />

      <Text style={styles.exerciseTitle}>Escute e complete</Text>

      {/* CARD ÚNICO */}
      <View style={styles.mediaWrapper}>
        {/* IMAGEM */}
        <View style={styles.mediaCard}>
          <Image source={Images.teacher} style={styles.mediaImage} />
        </View>

        {/* ÁUDIO COLADO */}
        <TouchableOpacity style={styles.audioButton} onPress={playAudio}>
          <Text style={styles.audioIcon}>▶</Text>
          <View style={styles.audioBar}>
            <View style={styles.audioProgress} />
          </View>
        </TouchableOpacity>
      </View>

      {/* OPÇÕES */}
      <View style={styles.optionsRow}>
        {["Hello", "Hélo"].map((option) => {
          const isRight = option === "Hello" && isCorrect;
          const isWrong = option === selected && blinkWrong;

          return (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionPill,
                isRight && styles.optionCorrect,
                isWrong && styles.optionBlinkWrong,
              ]}
              onPress={() => handleSelect(option)}
              disabled={isCorrect}
            >
              <Text
                style={[styles.optionText, isRight && styles.optionCorrectText]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* FEEDBACK + PRÓXIMO */}
      {isCorrect && (
        <>
          <View style={styles.feedbackBox}>
            <Text style={styles.feedbackTitle}>✓ Correto!</Text>
            <Text style={styles.feedbackText}>
              “Hello” significa “oi” em inglês.
            </Text>
          </View>

          {renderNextButton(1)}
        </>
      )}
    </View>
  );
}

function Slide3() {
  const { renderNextButton } = useNav();
  const { speak } = useSpeech();

  return (
    <View style={styles.slide}>
      <SlideHeader />

      <Text style={styles.slideObjectiveTitle}>Hi</Text>
      <Text style={styles.slideObjectiveSubtitle}>Oi</Text>

      <View style={styles.objectiveRow}>
        <Text style={styles.objectiveRowText}>Mais comum</Text>
      </View>

      <TouchableOpacity
        style={styles.listenButton}
        onPress={() =>
          speak({ text: "Hi", language: "en-US", rate: 0.85, pitch: 1.05 })
        }
      >
        <Text style={styles.listenButtonText}>🔊 Ouvir</Text>
      </TouchableOpacity>

      {renderNextButton(2)}
    </View>
  );
}

function Slide4() {
  const { renderNextButton } = useNav();
  const { speak } = useSpeech();

  return (
    <View style={styles.slide}>
      <SlideHeader />

      <Text style={styles.slideObjectiveTitle}>Hey</Text>
      <Text style={styles.slideObjectiveSubtitle}>Oi / E aí</Text>

      <View style={styles.objectiveRow}>
        <Text style={styles.objectiveRowText}>Informal</Text>
      </View>

      <TouchableOpacity
        style={styles.listenButton}
        onPress={() =>
          speak({ text: "Hey", language: "en-US", rate: 0.85, pitch: 1.05 })
        }
      >
        <Text style={styles.listenButtonText}>🔊 Ouvir</Text>
      </TouchableOpacity>

      {renderNextButton(3)}
    </View>
  );
}

function Slide5() {
  const { renderNextButton } = useNav();
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [blinkWrong, setBlinkWrong] = useState(false);

  const options = ["Hello", "Hi", "Hey"];
  const correctAnswer = "Hey";

  const handlePress = (option) => {
    if (option === correctAnswer) {
      setSelected(option);
      setIsCorrect(true);
    } else {
      setSelected(option);
      setBlinkWrong(true);
      setTimeout(() => {
        setBlinkWrong(false);
        setSelected(null);
      }, 500);
    }
  };

  return (
    <View style={styles.slide}>
      <SlideHeader />

      <Text style={styles.questionTitle}>👆 Toque na forma mais informal</Text>

      {options.map((option) => {
        const isSelected = selected === option;
        const isRight = option === correctAnswer && isCorrect;
        const isWrong = isSelected && blinkWrong;

        return (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              isRight && styles.correctOption,
              isWrong && styles.wrongOption,
            ]}
            onPress={() => handlePress(option)}
            disabled={isCorrect}
          >
            <Text style={[styles.optionText, isRight && styles.correctText]}>
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}

      {isCorrect && (
        <View style={styles.successBox}>
          <Text style={styles.successTitle}>✓ Correto!</Text>
          <Text style={styles.successText}>
            “Hey” é a forma mais informal e casual.
          </Text>
        </View>
      )}

      {renderNextButton(4)}
    </View>
  );
}

function Slide6() {
  const { renderNextButton } = useNav();

  const correctWord = "HELLO";
  const letters = ["O", "L", "H", "L", "E"];

  const [selectedLetters, setSelectedLetters] = useState([]);
  const [availableLetters, setAvailableLetters] = useState(letters);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelectLetter = (letter, index) => {
    if (isCorrect) return;

    const newSelected = [...selectedLetters, letter];
    const newAvailable = [...availableLetters];
    newAvailable.splice(index, 1);

    setSelectedLetters(newSelected);
    setAvailableLetters(newAvailable);

    if (newSelected.join("") === correctWord) {
      setIsCorrect(true);
    }
  };

  const handleClear = () => {
    setSelectedLetters([]);
    setAvailableLetters(letters);
    setIsCorrect(false);
  };

  return (
    <View style={styles.slide}>
      <SlideHeader />

      <Text style={styles.questionTitle}>✍️ Forme a palavra correta</Text>

      <Text style={styles.wordHint}>Olá</Text>

      <View style={styles.dropArea}>
        {selectedLetters.map((letter, index) => (
          <View key={index} style={styles.letterBoxActive}>
            <Text style={styles.letterTextActive}>{letter}</Text>
          </View>
        ))}
      </View>

      <View style={styles.lettersRow}>
        {availableLetters.map((letter, index) => (
          <TouchableOpacity
            key={index}
            style={styles.letterBox}
            onPress={() => handleSelectLetter(letter, index)}
          >
            <Text style={styles.letterText}>{letter}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
        <Text style={styles.clearButtonText}>🧹 Limpar</Text>
      </TouchableOpacity>

      {isCorrect && (
        <View style={styles.successBox}>
          <Text style={styles.successTitle}>✓ Perfeito!</Text>
          <Text style={styles.successText}>
            Você escreveu “HELLO” corretamente!
          </Text>
        </View>
      )}

      {renderNextButton(5)}
    </View>
  );
}

function Slide7() {
  const { renderNextButton } = useNav();

  const correctWord = "HI";
  const letters = ["I", "H"];

  const [selectedLetters, setSelectedLetters] = useState([]);
  const [availableLetters, setAvailableLetters] = useState(letters);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelectLetter = (letter, index) => {
    if (isCorrect) return;

    const newSelected = [...selectedLetters, letter];
    const newAvailable = [...availableLetters];
    newAvailable.splice(index, 1);

    setSelectedLetters(newSelected);
    setAvailableLetters(newAvailable);

    if (newSelected.join("") === correctWord) {
      setIsCorrect(true);
    }
  };

  const handleClear = () => {
    setSelectedLetters([]);
    setAvailableLetters(letters);
    setIsCorrect(false);
  };

  return (
    <View style={styles.slide}>
      <SlideHeader />

      <Text style={styles.questionTitle}>✍️ Forme a palavra correta</Text>

      <Text style={styles.wordHint}>Oi</Text>

      <View style={styles.dropArea}>
        {selectedLetters.map((letter, index) => (
          <View key={index} style={styles.letterBoxActive}>
            <Text style={styles.letterTextActive}>{letter}</Text>
          </View>
        ))}
      </View>

      <View style={styles.lettersRow}>
        {availableLetters.map((letter, index) => (
          <TouchableOpacity
            key={index}
            style={styles.letterBox}
            onPress={() => handleSelectLetter(letter, index)}
          >
            <Text style={styles.letterText}>{letter}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
        <Text style={styles.clearButtonText}>🧹 Limpar</Text>
      </TouchableOpacity>

      {isCorrect && (
        <View style={styles.successBox}>
          <Text style={styles.successTitle}>✓ Perfeito!</Text>
          <Text style={styles.successText}>
            Você escreveu “HI” corretamente!
          </Text>
        </View>
      )}

      {renderNextButton(6)}
    </View>
  );
}

function Slide8() {
  const { renderPrevButton, goToNextLesson } = useNav();

  return (
    <View style={styles.slide}>
      <SlideHeader />

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.nextLessonButton}
          onPress={goToNextLesson}
        >
          <Text style={styles.nextLessonButtonText}>Próxima lição →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    margin: 20,
  },
  /* HEADER */
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#F5F5F5", // IMPORTANTE
    zIndex: 10,
  },
  headerButton: {
    width: 32,
    alignItems: "center",
  },
  headerProgress: {
    flex: 1,
    height: 4,
    backgroundColor: "#e5e7eb",
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

  /* BUTTONS */
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
    color: "#fff",
    fontWeight: "700",
  },
  nextLessonButton: {
    backgroundColor: "#0f73ff",
    width: 180,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  nextLessonButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  //capa slide 1
  heroIcon: { fontSize: 56, marginBottom: 18 },
  heroTitle: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 12,
    width: "90%",
  },
  heroSubtitle: {
    color: "#B8C5D3",
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 16,
    lineHeight: 22,
  },
  //quiz slide 5
  optionButton: {
    borderWidth: 1,
    width: "80%",
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 12,
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  correctOption: { backgroundColor: "#E9F7EE", borderColor: "#2ECC71" },
  correctText: { color: "#2ECC71", fontWeight: "700" },
  wrongOption: { backgroundColor: "#FDECEC", borderColor: "#E74C3C" },
  //slide 5 e 6 e 7
  successBox: {
    backgroundColor: "#E9F7EE",
    borderWidth: 1,
    width: "90%",
    borderColor: "#2ECC71",
    borderRadius: 12,
    padding: 14,
    marginTop: 12,
  },
  successTitle: { color: "#2ECC71", fontWeight: "700", marginBottom: 6 },
  successText: { color: "#2ECC71", fontSize: 14 },
  //slide 2
  optionText: { fontSize: 20, fontWeight: "500", color: "#333" },

  //testeeeeeeeeeeeeeeeeeeeeeeeeee

  exerciseTitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 12,
    fontWeight: "600",
  },

  mediaCard: {
    width: "85%",
    height: 190,
    backgroundColor: "#38BDF8",
    borderRadius: 16,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  mediaImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },

  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },

  playIcon: {
    fontSize: 22,
    marginLeft: 3,
  },

  phraseBox: {
    width: "70%",
    marginVertical: 14,
  },

  phraseLine: {
    height: 4,
    backgroundColor: "#D1D5DB",
    borderRadius: 2,
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
    paddingHorizontal: 22,
    paddingVertical: 8,
    backgroundColor: "#FFF",
  },

  optionPillText: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
  },

  optionCorrect: {
    backgroundColor: "#D1FAE5",
    borderColor: "#22C55E",
  },

  optionCorrectText: {
    color: "#16A34A",
    fontWeight: "700",
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

  feedbackTitle: {
    color: "#16A34A",
    fontWeight: "700",
    marginBottom: 4,
  },

  feedbackText: {
    color: "#065F46",
    fontSize: 14,
  },

  playBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: CORES.PRIMARY,
    width: "85%",
    height: 48,
    borderRadius: 12,
    marginBottom: 14,
    gap: 8,
  },

  playBarIcon: {
    color: "#FFFFFF",
    fontSize: 18,
    marginTop: 2,
  },

  playBarText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  line: {
    width: "65%",
    height: 3,
    backgroundColor: "#D1D5DB",
    borderRadius: 2,
    marginBottom: 14,
  },

  optionWrong: {
    backgroundColor: "#FEE2E2",
    borderColor: "#EF4444",
  },

  audioButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CORES.PRIMARY,
    width: "88%",
    height: 48,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    paddingHorizontal: 16,
    marginBottom: 16,
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
    width: "45%",
    height: "100%",
    backgroundColor: "#FFF",
    borderRadius: 3,
  },

  optionWrong: {
    backgroundColor: "#FEE2E2",
    borderColor: "#EF4444",
  },

  optionCorrect: {
    backgroundColor: "#DCFCE7",
    borderColor: "#22C55E",
  },

  optionCorrectText: {
    color: "#16A34A",
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
    width: "45%",
    height: "100%",
    backgroundColor: "#FFF",
    borderRadius: 3,
  },

  optionBlinkWrong: {
    backgroundColor: "#FEE2E2",
    borderColor: "#EF4444",
  },
});
