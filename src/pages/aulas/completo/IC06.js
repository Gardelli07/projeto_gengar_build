import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Speech from "expo-speech";
import { Audio } from "expo-audio";
import CORES from "../../../util/cores";

export function useSpeech() {
  const speak = ({
    text,
    language = "en-US",
    rate = 0.9,
    pitch = 1.0,
    stopBefore = true,
  }) => {
    if (!text) return;

    if (stopBefore) {
      Speech.stop();
    }

    Speech.speak(text, {
      language,
      rate,
      pitch,
    });
  };

  const stop = () => {
    Speech.stop();
  };

  return {
    speak,
    stop,
  };
}

/* ================= CONTEXT ================= */

const SlideNavContext = React.createContext(null);

/* ================= CONFIG ================= */

const SLIDE_COUNT = 10;
const STORAGE_KEY = "@progesso_ingles_completo";

/* ================= STORAGE ================= */

async function loadProgress() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.warn("loadProgress error", e);
    return {};
  }
}

async function saveProgress(progress) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.warn("saveProgress error", e);
  }
}

/* ================= PROGRESS BAR ================= */

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
    if (lockRef.current) return;
    lockRef.current = true;
    setTimeout(() => (lockRef.current = false), 300);

    if (currentSlideIndex < totalSlides - 1) {
      const nextIndex = currentSlideIndex + 1;
      setCurrentSlideIndex(nextIndex);
      updateProgress(progressAnim, nextIndex, totalSlides);
    }
  };

  const prev = () => {
    if (lockRef.current) return;
    lockRef.current = true;
    setTimeout(() => (lockRef.current = false), 300);

    if (currentSlideIndex > 0) {
      const prevIndex = currentSlideIndex - 1;
      setCurrentSlideIndex(prevIndex);
      updateProgress(progressAnim, prevIndex, totalSlides);
    }
  };

  function renderNextButton(index) {
    if (index !== currentSlideIndex) return null;
    return (
      <TouchableOpacity style={styles.nextButton} onPress={next}>
        <Text style={styles.nextButtonText}>Próximo →</Text>
      </TouchableOpacity>
    );
  }

  function renderPrevButton(index) {
    if (index !== currentSlideIndex || index === 0) return null;
    return (
      <TouchableOpacity style={styles.nextButton} onPress={prev}>
        <Text style={styles.nextButtonText}>← Voltar</Text>
      </TouchableOpacity>
    );
  }

  return { renderNextButton, renderPrevButton };
}

/* ================= SCREEN ================= */

export default function Base({ route, navigation }) {
  const lesson = route?.params?.lesson;
  const lessons = route?.params?.lessons;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [done, setDone] = useState(false);

  const progressAnim = useRef(
    new Animated.Value((currentSlide + 1) / SLIDE_COUNT),
  ).current;

  useEffect(() => {
    let mounted = true;

    (async () => {
      if (!lesson?.id) return;
      const progress = await loadProgress();
      if (mounted) setDone(!!progress[lesson.id]);
    })();

    return () => (mounted = false);
  }, [lesson?.id]);

  useEffect(() => {
    updateProgress(progressAnim, currentSlide, SLIDE_COUNT);

    if (currentSlide === SLIDE_COUNT - 1 && lesson?.id && !done) {
      (async () => {
        const progress = await loadProgress();
        await saveProgress({ ...progress, [lesson.id]: true });
        setDone(true);
      })();
    }
  }, [currentSlide, lesson?.id, done]);

  const slideNav = useSlideNavigation({
    currentSlideIndex: currentSlide,
    setCurrentSlideIndex: setCurrentSlide,
    totalSlides: SLIDE_COUNT,
    progressAnim,
  });

  const findNextLessonFromArray = () => {
    if (!lessons || !lesson) return null;
    const idx = lessons.findIndex((l) => String(l.id) === String(lesson.id));
    if (idx === -1 || idx === lessons.length - 1) return null;
    return lessons[idx + 1];
  };

  /* ========= FUNÇÃO FINAL (SEM EMPILHAR) ========= */

  const goToNextLessonAndReturn = async () => {
    if (lesson?.id && !done) {
      const progress = await loadProgress();
      await saveProgress({ ...progress, [lesson.id]: true });
      setDone(true);
    }

    const nextLesson = findNextLessonFromArray();

    navigation.replace("Inglescompleto", {
      autoOpenLessonId: nextLesson?.id || null,
    });
  };

  return (
    <SlideNavContext.Provider
      value={{
        ...slideNav,
        goToNextLesson: goToNextLessonAndReturn,
        goBack: () => navigation.goBack(),
      }}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.progressBarContainer}>
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

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {currentSlide === 0 && <Slide1 />}
          {currentSlide === 1 && <Slide2 />}
          {currentSlide === 2 && <Slide3 />}
          {currentSlide === 3 && <Slide4 />}
          {currentSlide === 4 && <Slide5 />}
          {currentSlide === 5 && <Slide6 />}
          {currentSlide === 6 && <Slide7 />}
          {currentSlide === 7 && <Slide8 />}
          {currentSlide === 8 && <Slide9 />}
          {currentSlide === 9 && <Slide10 />}
        </ScrollView>
      </View>
    </SlideNavContext.Provider>
  );
}

/* ================= CONTEXT HOOK ================= */

function useNav() {
  return React.useContext(SlideNavContext);
}

/* ================= SLIDES ================= */

function Slide1() {
  const { renderNextButton } = useNav();
  return (
    <View style={styles.hero}>
      <Text style={styles.heroIcon}>🌍</Text>
      <Text style={styles.heroTitle}>De onde você é?</Text>
      <Text style={styles.heroSubtitle}>
        Aprenda a perguntar sobre origem e nacionalidade
      </Text>

      {renderNextButton(0)}
    </View>
  );
}

function Slide2() {
  const { renderPrevButton, renderNextButton } = useNav();
  const { speak } = useSpeech();

  return (
    <View style={styles.slide}>
      <Text style={styles.slideObjectiveTitle}>Where are you from?</Text>
      <Text style={styles.slideObjectiveSubtitle}>De onde você é?</Text>

      <TouchableOpacity
        style={styles.listenButton}
        onPress={() =>
          speak({
            text: "Where are you from?",
            language: "en-US",
            rate: 0.85,
            pitch: 1.05,
          })
        }
      >
        <Text style={styles.listenButtonText}>🔊 Ouvir</Text>
      </TouchableOpacity>

      {/* Navegação */}
      <View style={styles.buttonRow}>
        {renderPrevButton(1)}
        {renderNextButton(1)}
      </View>
    </View>
  );
}

function Slide3() {
  const { renderPrevButton, renderNextButton } = useNav();
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [blinkWrong, setBlinkWrong] = useState(false);

  const options = ["are", "is"];
  const correctAnswer = ["are"];

  const handlePress = (option) => {
    if (correctAnswer.includes(option)) {
      setSelected(option);
      setIsCorrect(true);
    } else {
      setSelected(option);
      setBlinkWrong(true);

      // efeito de piscar
      setTimeout(() => {
        setBlinkWrong(false);
        setSelected(null);
      }, 500);
    }
  };

  return (
    <View style={styles.slide}>
      <Text>✏️ Complete a Frase</Text>
      <Text style={styles.questionTitle}>Where ___ you from?</Text>

      {options.map((option) => {
        const isSelected = selected === option;
        const isRight =
          isCorrect && isSelected && correctAnswer.includes(option);

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
            "Where ARE you from?" está perfeito! Usamos "are" com "you". "Is"
            seria usado com he/she/it.
          </Text>
        </View>
      )}

      <View style={styles.buttonRow}>
        {renderPrevButton(2)}
        {renderNextButton(2)}
      </View>
    </View>
  );
}

function Slide4() {
  const { renderPrevButton, renderNextButton } = useNav();

  const recordingRef = useRef(null);
  const [audioUri, setAudioUri] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  /* 🔊 Frase modelo */
  const speakModel = () => {
    Speech.speak("Where are you from?", {
      language: "en-US",
      rate: 0.85,
      pitch: 1.05,
    });
  };

  /* 🎙️ Iniciar gravação */
  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );

      await recording.startAsync();
      recordingRef.current = recording;
      setIsRecording(true);
    } catch (err) {
      console.log("Erro ao gravar:", err);
    }
  };

  /* ⏹️ Parar gravação */
  const stopRecording = async () => {
    try {
      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();
      setAudioUri(uri);
      setIsRecording(false);
      recordingRef.current = null;
    } catch (err) {
      console.log("Erro ao parar gravação:", err);
    }
  };

  /* ▶️ Ouvir meu áudio */
  const playMyAudio = async () => {
    if (!audioUri) return;

    const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
    await sound.playAsync();
  };

  /* 🔁 Regravar */
  const resetRecording = () => {
    setAudioUri(null);
    setIsRecording(false);
  };

  return (
    <View style={styles.slide}>
      <Text style={styles.questionTitle}>🗣️ Agora é sua vez! </Text>

      {/* Card da frase */}
      <View style={styles.speakCard}>
        <Text style={styles.speakPhrase}>👉 Pergunte de onde a pessoa é</Text>
        <Text style={styles.speakHint}>Use a frase que você aprendeu!</Text>
      </View>

      {/* Card de dica */}
      <View style={styles.tipCard}>
        <Text style={styles.tipText}>
          💬 Modelo: {"\n"}"Where are you from?"
        </Text>
      </View>

      {/* Frase modelo */}
      <TouchableOpacity style={styles.modelButton} onPress={speakModel}>
        <Text style={styles.modelButtonText}>🔊 Ouvir modelo</Text>
      </TouchableOpacity>

      {/* Gravação */}
      {!isRecording ? (
        <TouchableOpacity style={styles.recordButton} onPress={startRecording}>
          <Text style={styles.recordButtonText}>🎙️ Gravar minha voz</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.stopButton} onPress={stopRecording}>
          <Text style={styles.stopButtonText}>⏹️ Parar gravação</Text>
        </TouchableOpacity>
      )}

      {/* Playback */}
      {audioUri && (
        <View style={styles.audioActions}>
          <TouchableOpacity style={styles.playButton} onPress={playMyAudio}>
            <Text style={styles.playButtonText}>▶️ Ouvir meu áudio</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.reRecordButton}
            onPress={resetRecording}
          >
            <Text style={styles.reRecordButtonText}>🔁 Regravar</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.buttonRow}>
        {renderPrevButton(3)}
        {renderNextButton(3)}
      </View>
    </View>
  );
}

function Slide5() {
  const { renderPrevButton, renderNextButton } = useNav();
  const { speak } = useSpeech();

  return (
    <View style={styles.slide}>
      <View style={styles.tipCard}>
        <Text style={styles.tipText2}>where</Text>
        <Text style={styles.tipText3}> /wer/</Text>
        <Text>Som parecido com "uér" em português</Text>
      </View>

      <TouchableOpacity
        style={styles.listenButton}
        onPress={() =>
          speak({
            text: "where",
            language: "en-US",
            rate: 0.85,
            pitch: 1.05,
          })
        }
      >
        <Text style={styles.listenButtonText}>🔊 Ouvir "where"</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.listenButton}
        onPress={() =>
          speak({
            text: "where are you from?",
            language: "en-US",
            rate: 0.85,
            pitch: 1.05,
          })
        }
      >
        <Text style={styles.listenButtonText}>🔊 Ouvir frase completa</Text>
      </TouchableOpacity>

      {/* Navegação */}
      <View style={styles.buttonRow}>
        {renderPrevButton(4)}
        {renderNextButton(4)}
      </View>
    </View>
  );
}

function Slide6() {
  const { renderPrevButton, renderNextButton } = useNav();

  const correctWord = "whereareyoufrom?";
  const letters = ["where", "from", "you", "?", "are"];

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
      <Text style={styles.questionTitle}>
        ✍️ Organize as palavras para {"\n"} formar a pergunta:
      </Text>

      <Text style={styles.wordHint}>"De onde você é?"</Text>

      {/* Área de resposta */}
      <View
        style={[
          styles.dropArea,
          selectedLetters.length > 0 && styles.dropAreaFilled,
        ]}
      >
        {selectedLetters.map((letter, index) => (
          <View key={index} style={styles.letterBoxActive}>
            <Text style={styles.letterTextActive}>{letter}</Text>
          </View>
        ))}
      </View>

      {/* Letras disponíveis */}
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

      {/* Botão Limpar */}
      <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
        <Text style={styles.clearButtonText}>🧹 Limpar</Text>
      </TouchableOpacity>

      {/* Feedback */}
      {isCorrect && (
        <View style={styles.successBox}>
          <Text style={styles.successTitle}>✓ Perfeito!</Text>
          <Text style={styles.successText}>
            "Where are you from?" está correto! Você organizou as palavras
            perfeitamente! 🎉
          </Text>
        </View>
      )}

      {/* Navegação */}
      <View style={styles.buttonRow}>
        {renderPrevButton(5)}
        {renderNextButton(5)}
      </View>
    </View>
  );
}

function Slide7() {
  const { renderPrevButton, renderNextButton } = useNav();
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [blinkWrong, setBlinkWrong] = useState(false);

  const options = [
    "Where you from?",
    "Where are you from?",
    "Where is you from?",
  ];
  const correctAnswer = ["Where are you from?"];

  const handlePress = (option) => {
    if (correctAnswer.includes(option)) {
      setSelected(option);
      setIsCorrect(true);
    } else {
      setSelected(option);
      setBlinkWrong(true);

      // efeito de piscar
      setTimeout(() => {
        setBlinkWrong(false);
        setSelected(null);
      }, 500);
    }
  };

  return (
    <View style={styles.slide}>
      <Text style={styles.questionTitle}>
        Como se diz "De onde você é?" em inglês?
      </Text>

      {options.map((option) => {
        const isSelected = selected === option;
        const isRight =
          isCorrect && isSelected && correctAnswer.includes(option);

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
            "Where are you from?" está perfeito! Não esqueça do "are"!
          </Text>
        </View>
      )}

      {/* Navegação */}
      <View style={styles.buttonRow}>
        {renderPrevButton(6)}
        {renderNextButton(6)}
      </View>
    </View>
  );
}

function Slide8() {
  const { renderPrevButton, renderNextButton } = useNav();
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [blinkWrong, setBlinkWrong] = useState(false);
  const { speak } = useSpeech();

  const options = ["Qual é seu nome?", "De onde você é?", "Como você está?"];
  const correctAnswer = "De onde você é?";

  const handlePress = (option) => {
    if (option === correctAnswer) {
      setSelected(option);
      setIsCorrect(true);
    } else {
      setSelected(option);
      setBlinkWrong(true);

      // efeito de piscar
      setTimeout(() => {
        setBlinkWrong(false);
        setSelected(null);
      }, 500);
    }
  };

  return (
    <View style={styles.slide}>
      <Text style={styles.questionTitle}>
        🎧 Ouça e escolha a frase correta
      </Text>

      <TouchableOpacity
        style={styles.btnOuvir}
        onPress={() =>
          speak({
            text: "Where are you from?",
            language: "en-US",
            rate: 0.85,
            pitch: 1.05,
          })
        }
      >
        <Text style={styles.btnOuvirText}>🔊 Ouvir</Text>
      </TouchableOpacity>

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
            Excelente! A pessoa está perguntando de onde você é!
          </Text>
        </View>
      )}

      {/* Navegação */}
      <View style={styles.buttonRow}>
        {renderPrevButton(7)}
        {renderNextButton(7)}
      </View>
    </View>
  );
}

function Slide9() {
  const { renderPrevButton, renderNextButton } = useNav();
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [blinkWrong, setBlinkWrong] = useState(false);

  const options = ["What", "When", "Where"];
  const correctAnswer = ["Where"];

  const handlePress = (option) => {
    if (correctAnswer.includes(option)) {
      setSelected(option);
      setIsCorrect(true);
    } else {
      setSelected(option);
      setBlinkWrong(true);

      // efeito de piscar
      setTimeout(() => {
        setBlinkWrong(false);
        setSelected(null);
      }, 500);
    }
  };

  return (
    <View style={styles.slide}>
      <Text style={styles.questionTitle}>Qual palavra significa "onde"?</Text>

      {options.map((option) => {
        const isSelected = selected === option;
        const isRight =
          isCorrect && isSelected && correctAnswer.includes(option);

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
            "Where" significa "onde"! "What" = "o que", "When" = "quando".
          </Text>
        </View>
      )}

      {/* Navegação */}
      <View style={styles.buttonRow}>
        {renderPrevButton(8)}
        {renderNextButton(8)}
      </View>
    </View>
  );
}

function Slide10() {
  const { renderPrevButton, goToNextLesson } = useNav();

  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -12,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, []);

  return (
    <View style={styles.slide}>
      <Animated.Text
        style={[styles.emoji, { transform: [{ translateY: bounceAnim }] }]}
      >
        🎉
      </Animated.Text>

      <Text style={styles.congrats}>Parabéns!</Text>

      <Text style={styles.description}>
        Você completou a lição com sucesso!
      </Text>
      <View style={styles.successCard}>
        <Text style={styles.successCardTitle}>Você agora sabe:</Text>

        <View style={styles.successItem}>
          <Text>✅</Text>
          <Text style={styles.successItemText}>Perguntar de onde alguém é</Text>
        </View>

        <View style={styles.successItem}>
          <Text>✅</Text>
          <Text style={styles.successItemText}>
            Pronunciar "where" corretamente
          </Text>
        </View>

        <View style={styles.successItem}>
          <Text>✅</Text>
          <Text style={styles.successItemText}>Usar "are" com "you"</Text>
        </View>

        <View style={styles.successItem}>
          <Text>✅</Text>
          <Text style={styles.successItemText}>
            {" "}
            Traduzir e entender a frase
          </Text>
        </View>

        <View style={styles.successItem}>
          <Text>✅</Text>
          <Text style={styles.successItemText}>Usar em conversas reais</Text>
        </View>
      </View>

      <Text style={styles.confidenceText}>
        Continue praticando e você vai dominar! 💪
      </Text>

      <View style={styles.buttonRow}>
        {renderPrevButton(9)}
        <TouchableOpacity
          style={styles.nextLessonButton}
          onPress={goToNextLesson}
          accessible={false}
          focusable={false}
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
  slideObjectiveTitle: {
    fontSize: 45,
    fontWeight: "700",
    color: "#0A3D91",
    marginBottom: 6,
    textAlign: "center",
  },
  slideObjectiveSubtitle: {
    fontSize: 20,
    color: "#7A7A7A",
    marginBottom: 14,
  },
  objectiveRow: {
    backgroundColor: "#FF7A2F",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 24,
  },
  objectiveRowText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  listenButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF7A2F",
    width: "40%",
    paddingVertical: 12,
    borderRadius: 14,
    elevation: 8,
  },
  listenButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 6,
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
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  nextLessonButton: {
    backgroundColor: "#0f73ff",
    paddingHorizontal: 5,
    width: 180,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  nextLessonButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 6,
    width: "95%",
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: "#e0e0e0ab",
    width: "100%",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: CORES.SECONDARY,
    borderRadius: 2,
  },
  //capa
  hero: {
    backgroundColor: CORES.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    width: "100%",
  },
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
  //quiz
  quiztitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#09234d",
    textAlign: "center",
  },
  quizsubtitle: {
    fontSize: 14,
    color: "#3a4553",
    textAlign: "center",
  },
  highlightBox: {
    backgroundColor: "#e2e2e27a",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    margin: 6,
    marginBottom: 24,
  },
  questionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#0A3D91",
    textAlign: "center",
    marginBottom: 24,
  },
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
  optionText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#333",
  },
  correctOption: {
    backgroundColor: "#E9F7EE",
    borderColor: "#2ECC71",
  },
  correctText: {
    color: "#2ECC71",
    fontWeight: "700",
  },
  wrongOption: {
    backgroundColor: "#FDECEC",
    borderColor: "#E74C3C",
  },
  successBox: {
    backgroundColor: "#E9F7EE",
    borderWidth: 1,
    width: "90%",
    borderColor: "#2ECC71",
    borderRadius: 12,
    padding: 14,
    marginTop: 12,
  },
  successTitle: {
    color: "#2ECC71",
    fontWeight: "700",
    marginBottom: 6,
  },
  successText: {
    color: "#2ECC71",
    fontSize: 14,
  },
  allBox: {
    backgroundColor: "#c4c8d8",
    borderWidth: 1,
    width: "90%",
    borderColor: "#355bd8",
    borderRadius: 12,
    padding: 14,
    marginTop: 12,
  },
  allTitle: {
    color: "#355bd8",
    fontWeight: "700",
    marginBottom: 6,
  },
  allText: {
    color: "#355bd8",
    fontSize: 14,
  },
  allOption: {
    backgroundColor: "#c4c8d8",
    borderColor: "#355bd8",
  },
  allText: {
    color: "#355bd8",
    fontWeight: "700",
  },
  // jogo de soletrar
  dropArea: {
    width: "85%",
    minHeight: 70,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#000000",
    borderRadius: 14,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  dropAreaFrases: {
    width: "90%",
    minHeight: 150,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#000000",
    borderRadius: 14,
    padding: 10,

    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",

    marginBottom: 20,
  },

  dropAreaFilled: {
    borderColor: "#FF7A2F",
  },
  lettersRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginHorizontal: 6,
    marginBottom: 16,
  },

  letterBox: {
    minHeight: 44,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    marginHorizontal: 4,
  },

  letterText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0A3D91",
  },

  letterBoxActive: {
    minHeight: 44,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: "#FF7A2F",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },
  letterBoxActiveFrases: {
    minHeight: 44,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: "#FF7A2F",

    justifyContent: "center",

    marginBottom: 8, // 👈 troca do horizontal
    width: "100%", // 👈 ESSENCIAL
  },

  letterTextActive: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },

  wordHint: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#0A3D91",
    marginBottom: 20,
  },
  clearButton: {
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 16,
  },
  clearButtonText: {
    fontSize: 14,
    color: "#0A3D91",
    fontWeight: "500",
  },
  //slide final
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  congrats: {
    fontSize: 18,
    color: "#64748b",
    marginBottom: 6,
  },
  description: {
    fontSize: 16,
    color: "#334155",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  bold: {
    fontWeight: "700",
  },
  restartButton: {
    backgroundColor: "#f97316",
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 14,
  },
  restartButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  backButton: {
    position: "absolute",
    bottom: 24,
    left: 16,
  },
  successCard: {
    backgroundColor: "#ecfdf3", // verde bem clarinho
    borderColor: "#22c55e", // verde principal
    borderWidth: 2,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
  },
  successCardTitle: {
    color: "#15803d",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  successItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  successItemText: {
    color: "#166534",
    fontSize: 14,
    marginLeft: 8,
  },
  confidenceText: {
    marginTop: 20,
    fontSize: 14,
    color: "#475569", // cinza suave
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 24,
  },
  //botão ouvir pergunta
  btnOuvir: {
    backgroundColor: "#4f8dfd",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 26,
    alignSelf: "center",
    marginBottom: 12,
  },
  btnOuvirText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  dialogHint: {
    fontSize: 14,
    color: "#2563eb",
    marginBottom: 12,
    textAlign: "center",
  },

  dialogBox: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    width: "100%",
    maxWidth: 340,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 20,
  },

  dialogLine: {
    marginBottom: 14,
  },

  speaker: {
    fontSize: 10,
    color: "#64748b",
    marginBottom: 2,
    textTransform: "uppercase",
  },

  dialogText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e3a8a",
  },

  listenButton: {
    backgroundColor: "#3b82f6",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 24,
  },

  listenButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  modelButton: {
    backgroundColor: "#2563EB",
    padding: 12,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 14,
  },

  modelButtonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },

  recordButton: {
    backgroundColor: "#EF4444",
    paddingVertical: 14,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 14,
  },

  recordButtonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },

  stopButton: {
    backgroundColor: "#DC2626",
    paddingVertical: 14,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    marginBottom: 14,
  },

  stopButtonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },

  audioActions: {
    marginTop: 12,
    alignItems: "center",
  },

  playButton: {
    backgroundColor: "#22C55E",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 10,
  },

  playButtonText: {
    color: "#FFF",
    fontWeight: "700",
  },

  reRecordButton: {
    backgroundColor: "#F59E0B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  reRecordButtonText: {
    color: "#FFF",
    fontWeight: "700",
  },
  speakCard: {
    width: "90%",
    backgroundColor: "#EEF4FF",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 18,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2563EB",
    marginBottom: 18,
  },

  speakPhrase: {
    fontSize: 20,
    fontWeight: "800",
    color: "#2563EB",
    marginBottom: 8,
    textAlign: "center",
  },

  speakHint: {
    fontSize: 14,
    color: "#475569",
    textAlign: "center",
  },

  tipCard: {
    width: "90%",
    backgroundColor: "#FFF7ED",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FB923C",
    marginBottom: 22,
  },

  tipText: {
    color: "#C2410C",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  tipText2: {
    color: "#C2410C",
    fontSize: 34,
    fontWeight: "900",
    textAlign: "center",
  },
  tipText3: {
    color: "#2c2826",
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 6,
  },
});
