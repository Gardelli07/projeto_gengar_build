import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as Speech from "expo-speech";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BEA_ORANGE = "#ec651d";
const BEA_BLUE = "#022b62";

const STORAGE_KEY = "@curso_progress_v1";

const slides = [
  {
    id: 1,
    type: "intro",
    title: "Telephone Call Practice",
    subtitle: "Listen carefully and choose the correct answer.",
  },
  {
    id: 2,
    title: "Dialogue 1",
    subtitle: "Listen to the greeting",
    audioId: "dialogue1",
    question: "O que a pessoa disse?",
    options: [
      { text: "Good evening, this is Anna from BEA.", correct: false },
      { text: "Good morning, this is Anna from BEA.", correct: true },
      { text: "Good night, this is Anna from BEA.", correct: false },
    ],
  },
  {
    id: 3,
    title: "Dialogue 2",
    subtitle: "Listen to the request",
    audioId: "dialogue2",
    question: "O que a pessoa está pedindo?",
    options: [
      { text: "Para confirmar uma reunião.", correct: false },
      { text: "Para falar com o Sr. Johnson.", correct: true },
      { text: "Para deixar uma mensagem.", correct: false },
    ],
  },
  {
    id: 4,
    title: "Dialogue 3",
    subtitle: "Listen to the message",
    audioId: "dialogue3",
    question: "Qual foi a instrução?",
    options: [
      { text: "Ligar de volta às 3 p.m.", correct: true },
      { text: "Encerrar a ligação.", correct: false },
      { text: "Enviar um e-mail.", correct: false },
    ],
  },
  {
    id: 5,
    title: "Dialogue 4",
    subtitle: "Listen to the confirmation",
    audioId: "dialogue4",
    question: "Qual foi o horário da reunião confirmado?",
    options: [
      { text: "9 a.m.", correct: false },
      { text: "10 a.m.", correct: true },
      { text: "11 a.m.", correct: false },
    ],
  },
  {
    id: 6,
    title: "Dialogue 5",
    subtitle: "Listen to the problem",
    audioId: "dialogue5",
    question: "O que a pessoa pediu?",
    options: [
      { text: "Repetir a informação.", correct: true },
      { text: "Encerrar a ligação.", correct: false },
      { text: "Transferir a chamada.", correct: false },
    ],
  },
  {
    id: 7,
    title: "Final Roleplay",
    subtitle: "Listen and respond",
    audioId: "dialogue6",
    question: "Como você responderia a essa ligação?",
    options: [
      { text: "Sorry, wrong number.", correct: false },
      { text: "Of course, I'll give you the information.", correct: true },
      { text: "I don't know who you are.", correct: false },
    ],
  },
  { id: 8, type: "results" },
];

const audioTexts = {
  dialogue1: "Good morning, this is Anna from BEA.",
  dialogue2: "Hello, may I speak to Mister Johnson, please?",
  dialogue3: "Could you tell him I will call back at 3 p.m.?",
  dialogue4: "I am calling to confirm tomorrow's meeting at 10 a.m.",
  dialogue5: "Sorry, the line is bad. Could you repeat that, please?",
  dialogue6: "Good afternoon, I need some information about your services.",
};

/* ---------- funções puras ---------- */
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

/* ---------- componente ---------- */
export default function SlideLessonComponent({ route, navigation }) {
  // page é 1-based no seu código original
  const [page, setPage] = useState(1);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState({});
  const currentSlide = slides[page - 1];
  const totalQuestions = 6;
  const percentage = Math.round((score / totalQuestions) * 100);

  // se a navegação fornece lesson, pega aqui (opcional)
  const lesson = route?.params?.lesson;

  // flag local para evitar múltiplos saves
  const [markedCompleteLocal, setMarkedCompleteLocal] = useState(false);

  function playAudio(audioId) {
    Speech.speak(audioTexts[audioId], { language: "en-US", rate: 0.9 });
  }

  function selectAnswer(option, index) {
    if (answered[page]) return;
    setAnswered({ ...answered, [page]: index });
    if (option.correct) setScore((s) => s + 1);
  }

  /* ---------- função que salva progresso (usa setter local) ---------- */
  async function markLessonComplete(lessonId) {
    if (!lessonId) {
      console.warn("markLessonComplete called without lessonId");
      return;
    }
    try {
      const p = await loadProgress();
      if (p[lessonId]) {
        setMarkedCompleteLocal(true);
        return;
      }
      const newP = { ...p, [lessonId]: true };
      await saveProgress(newP);
      setMarkedCompleteLocal(true);
    } catch (e) {
      console.warn("markLessonComplete error", e);
    }
  }

  /* ---------- effect que dispara quando chega no último slide ---------- */
  useEffect(() => {
    const totalSlides = slides.length; // 8 no seu array
    const isLast = page === totalSlides;
    if (isLast && !markedCompleteLocal) {
      if (lesson && lesson.id) {
        // salva progresso silenciosamente
        markLessonComplete(lesson.id);
      } else {
        // se não tiver id, marca localmente (não salva)
        console.warn(
          "Nenhum lesson.id disponível — progresso não salvo no AsyncStorage."
        );
        setMarkedCompleteLocal(true);
      }
    }
  }, [page, markedCompleteLocal, lesson]);

  /* ---------- UI ---------- */
  return (
    <View
      style={[
        styles.screen,
        currentSlide.type === "intro" || currentSlide.type === "results"
          ? styles.introBg
          : styles.lightBg,
      ]}
    >
      <ScrollView contentContainerStyle={styles.centered}>
        {/* INTRO */}
        {currentSlide.type === "intro" && (
          <>
            <Text style={styles.emoji}>📞</Text>
            <Text style={styles.title}>{currentSlide.title}</Text>
            <Text style={styles.subtitle}>{currentSlide.subtitle}</Text>

            <TouchableOpacity
              style={styles.startBtn}
              onPress={() => setPage(2)}
            >
              <Text style={styles.startBtnText}>▶ Start</Text>
            </TouchableOpacity>
          </>
        )}

        {/* DIALOGUES */}
        {currentSlide.audioId && (
          <>
            <Text style={styles.sectionTitle}>{currentSlide.title}</Text>
            <Text style={styles.sectionSubtitle}>{currentSlide.subtitle}</Text>

            <TouchableOpacity
              style={styles.audioBtn}
              onPress={() => playAudio(currentSlide.audioId)}
            >
              <Text style={styles.audioBtnText}>🎧 Play</Text>
            </TouchableOpacity>

            <View style={styles.card}>
              <Text style={styles.questionTitle}>{currentSlide.question}</Text>

              {currentSlide.options.map((opt, idx) => {
                const selected = answered[page] === idx;
                return (
                  <TouchableOpacity
                    key={idx}
                    style={[
                      styles.optionBtn,
                      selected &&
                        (opt.correct ? styles.correct : styles.incorrect),
                    ]}
                    onPress={() => selectAnswer(opt, idx)}
                  >
                    <Text style={styles.optionText}>{opt.text}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              style={styles.navBtn}
              onPress={() => setPage(page + 1)}
              disabled={!answered[page]}
            >
              <Text style={styles.navBtnText}>Next →</Text>
            </TouchableOpacity>
          </>
        )}

        {/* RESULTS */}
        {currentSlide.type === "results" && (
          <>
            <Text style={styles.emoji}>{percentage >= 70 ? "🎉" : "💡"}</Text>
            <Text style={styles.title}>
              {percentage >= 70 ? "Excellent!" : "Keep Practicing!"}
            </Text>
            <Text style={styles.subtitle}>
              {percentage >= 70
                ? "You're ready for real phone calls."
                : "Listen again and repeat the dialogues for better practice."}
            </Text>

            <Text style={[styles.subtitle, { color: "#fff", marginTop: 8 }]}>
              Your Score: {score}/{totalQuestions} ({percentage}%)
            </Text>

            <TouchableOpacity
              style={styles.startBtn}
              onPress={() => {
                setPage(1);
                setScore(0);
                setAnswered({});
                setMarkedCompleteLocal(false); // permite salvar novamente se refizer
              }}
            >
              <Text style={styles.startBtnText}>
                {percentage >= 70 ? "🔄 Practice Again" : "🔄 Try Again"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.startBtn,
                { backgroundColor: BEA_BLUE, marginTop: 12 },
              ]}
              onPress={() => {
                const nextScreen =
                  route?.params?.nextScreen ||
                  route?.params?.lesson?.nextScreen ||
                  "MeetingsQuiz";
                const lessonToPass = route?.params?.lesson || route?.params;
                if (navigation && nextScreen) {
                  navigation.reset({
                    index: 1,
                    routes: [
                      { name: "Bussines" },
                      {
                        name: nextScreen,
                        params: { lesson: lessonToPass },
                      },
                    ],
                  });
                }
              }}
              accessibilityLabel="Próxima atividade"
            >
              <Text style={styles.startBtnText}>Próxima Atividade →</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  introBg: { backgroundColor: BEA_BLUE },
  lightBg: { backgroundColor: "#fff" },

  centered: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    flexGrow: 1,
  },

  emoji: { fontSize: 64, marginBottom: 24 },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 18,
    color: "#cbd5e1",
    textAlign: "center",
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: BEA_BLUE,
    marginBottom: 8,
    textAlign: "center",
  },

  sectionSubtitle: {
    fontSize: 16,
    color: "#64748b",
    marginBottom: 16,
    textAlign: "center",
  },

  card: {
    width: 340,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#d1d5db",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },

  questionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: BEA_BLUE,
    marginBottom: 12,
  },

  optionBtn: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },

  optionText: { fontSize: 16 },

  correct: { backgroundColor: "#ecfdf5", borderColor: "#10b981" },
  incorrect: { backgroundColor: "#fff1f2", borderColor: "#ef4444" },

  audioBtn: {
    backgroundColor: BEA_ORANGE,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 999,
    marginBottom: 16,
  },

  audioBtnText: { color: "#fff", fontWeight: "bold" },

  startBtn: {
    backgroundColor: "#ec651d",
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 999,
  },

  startBtnText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  navBtn: {
    backgroundColor: BEA_ORANGE,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 999,
  },

  navBtnText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
});
