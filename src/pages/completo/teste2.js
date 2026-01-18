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

/* ================= CONTEXT ================= */

const SlideNavContext = React.createContext(null);

/* ================= CONFIG ================= */

const SLIDE_COUNT = 10;
const STORAGE_KEY = "@curso_progress_v1";

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
    duration: 350,
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

/* ================= BASE SCREEN ================= */

export default function BASE({ route, navigation }) {
  const lesson = route?.params?.lesson;
  const lessons = route?.params?.lessons;
  const nextLessonParam = route?.params?.nextLesson;
  const nextLessonScreenParam = route?.params?.nextLessonScreen;

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
        if (!progress[lesson.id]) {
          await saveProgress({ ...progress, [lesson.id]: true });
        }
        setDone(true);
      })();
    }
  }, [currentSlide, lesson?.id, done, progressAnim]);

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

  const goToNextLesson = async () => {
    if (lesson?.id && !done) {
      const progress = await loadProgress();
      if (!progress[lesson.id]) {
        await saveProgress({ ...progress, [lesson.id]: true });
      }
      setDone(true);
    }

    const nextFromArray = findNextLessonFromArray();
    if (nextFromArray) {
      navigation.navigate(nextFromArray.screen || "Lesson", {
        lesson: nextFromArray,
        lessons,
      });
      return;
    }

    if (nextLessonScreenParam) {
      navigation.navigate(nextLessonScreenParam, {
        lesson: nextLessonParam || null,
        lessons: lessons || null,
      });
    }
  };

  return (
    <SlideNavContext.Provider value={{ ...slideNav, goToNextLesson }}>
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
  return <View style={styles.hero}>{renderNextButton(0)}</View>;
}

function Slide2() {
  const { renderPrevButton, renderNextButton } = useNav();
  return (
    <View style={styles.slide}>
      <Text style={styles.slideObjectiveTitle}>Objetivo da Aula</Text>
      <View style={styles.buttonRow}>
        {renderPrevButton(1)}
        {renderNextButton(1)}
      </View>
    </View>
  );
}

function Slide3() {
  const { renderPrevButton, renderNextButton } = useNav();
  return (
    <View style={styles.slide}>
      <Text style={styles.slideObjectiveTitle}>
        Estrutura Padrão de E-mail Formal
      </Text>
      <View style={styles.buttonRow}>
        {renderPrevButton(2)}
        {renderNextButton(2)}
      </View>
    </View>
  );
}

function Slide4() {
  const { renderPrevButton, renderNextButton } = useNav();
  return (
    <View style={styles.slide}>
      <Text style={styles.slideObjectiveTitle}>Frases Comuns</Text>
      <View style={styles.buttonRow}>
        {renderPrevButton(3)}
        {renderNextButton(3)}
      </View>
    </View>
  );
}

function Slide5() {
  const { renderPrevButton, renderNextButton } = useNav();
  return (
    <View style={styles.slide}>
      <Text style={styles.slideObjectiveTitle}>E-mail Modelo</Text>
      <View style={styles.buttonRow}>
        {renderPrevButton(4)}
        {renderNextButton(4)}
      </View>
    </View>
  );
}

function Slide6() {
  const { renderPrevButton, renderNextButton } = useNav();
  return (
    <View style={styles.slide}>
      <Text style={styles.slideObjectiveTitle}>Encontre o Erro</Text>
      <View style={styles.buttonRow}>
        {renderPrevButton(5)}
        {renderNextButton(5)}
      </View>
    </View>
  );
}

function Slide7() {
  const { renderPrevButton, renderNextButton } = useNav();
  return (
    <View style={styles.slide}>
      <Text style={styles.slideObjectiveTitle}>Escolha Correta</Text>
      <View style={styles.buttonRow}>
        {renderPrevButton(6)}
        {renderNextButton(6)}
      </View>
    </View>
  );
}

function Slide8() {
  const { renderPrevButton, renderNextButton } = useNav();
  return (
    <View style={styles.slide}>
      <Text style={styles.slideObjectiveTitle}>Criando o Seu E-mail</Text>
      <View style={styles.buttonRow}>
        {renderPrevButton(7)}
        {renderNextButton(7)}
      </View>
    </View>
  );
}

function Slide9() {
  const { renderPrevButton, renderNextButton } = useNav();
  return (
    <View style={styles.slide}>
      <Text style={styles.slideObjectiveTitle}>Quiz Final</Text>
      <View style={styles.buttonRow}>
        {renderPrevButton(8)}
        {renderNextButton(8)}
      </View>
    </View>
  );
}

function Slide10() {
  const { renderPrevButton, goToNextLesson } = useNav();

  return (
    <View style={styles.slide}>
      <Text style={styles.slideObjectiveTitle}>Resumo e Dicas</Text>

      <View style={styles.buttonRow}>
        {renderPrevButton(9)}

        <TouchableOpacity
          style={styles.nextLessonButton}
          onPress={goToNextLesson}
        >
          <Text style={styles.nextLessonButtonText}>
            Ir para próxima lição →
          </Text>
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
  },
  slideObjectiveTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#022b62",
    marginBottom: 6,
    textAlign: "center",
  },
  nextButton: {
    backgroundColor: "#ec651d",
    width: 180,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  nextButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  nextLessonButton: {
    backgroundColor: "#0f73ff",
    paddingHorizontal: 18,
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
    gap: 12,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: "#e0e0e0ab",
    width: "100%",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#ec651d",
    borderRadius: 2,
  },
  doneText: {
    marginTop: 8,
    color: "#29cc74",
    fontWeight: "800",
    fontSize: 16,
  },
  //slide 1
  hero: {
    backgroundColor: "#022b62",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
  },
  heroIcon: { fontSize: 56, marginBottom: 18 },
  heroTitle: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 12,
  },
  heroSubtitle: {
    color: "#B8C5D3",
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 16,
    lineHeight: 22,
  },
});
