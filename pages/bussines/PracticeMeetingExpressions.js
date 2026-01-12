import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import * as Speech from "expo-speech";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@curso_progress_v1";

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

// Dados simplificados para exemplo. Adapte conforme o conteúdo do teste.html
const exercises = [
  {
    title: "Exercise 1 - Starting a Meeting",
    subtitle: "Listen and choose the correct answer",
    audio: "audio1",
    question: "O que foi dito?",
    options: [
      { text: "Dar boas-vindas e iniciar a reunião", correct: true },
      { text: "Encerrar a reunião", correct: false },
      { text: "Pedir opinião", correct: false },
    ],
  },
  {
    title: "Exercise 2 - Agenda Items",
    subtitle: "Listen and identify the agenda item",
    audio: "audio2",
    question: "Qual é o primeiro item da agenda?",
    options: [
      { text: "Resultados de vendas", correct: true },
      { text: "Discussão de orçamento", correct: false },
      { text: "Agradecimento", correct: false },
    ],
  },
  {
    title: "Exercise 4 - Listening & Response",
    subtitle: "Listen and identify what was confirmed",
    audio: "audio5",
    question: "O que foi confirmado?",
    options: [
      { text: "Próxima reunião na sexta", correct: true },
      { text: "Mudança de pauta", correct: false },
      { text: "Encerramento", correct: false },
    ],
  },
  {
    title: "Exercise 5 - Roleplay",
    subtitle: "Listen and choose the best response",
    audio: "audio6",
    question: "Qual seria a melhor resposta?",
    options: [
      { text: "Confirmar disponibilidade", correct: true },
      { text: "Recusar reunião", correct: false },
      { text: "Ignorar", correct: false },
    ],
  },
];

const quiz = [
  {
    audio: "quiz1",
    question: "What is the speaker doing?",
    options: [
      { text: "A) Starting the meeting", correct: true },
      { text: "B) Ending the meeting", correct: false },
      { text: "C) Asking for opinion", correct: false },
    ],
  },
  {
    audio: "quiz2",
    question: "What is being discussed?",
    options: [
      { text: "A) Sales results", correct: true },
      { text: "B) Budget", correct: false },
      { text: "C) Next meeting", correct: false },
    ],
  },
  {
    audio: "quiz3",
    question: "What is being confirmed?",
    options: [
      { text: "A) Next meeting", correct: true },
      { text: "B) Agenda", correct: false },
      { text: "C) Closing", correct: false },
    ],
  },
];

const audioTexts = {
  audio1: "Good morning, everyone. Let's get started.",
  audio2: "The first item on the agenda is sales results.",
  audio3: "Could you clarify that, please?",
  audio4: "Let's summarize the main points.",
  audio5: "Our next meeting will be on Friday at 2 p.m.",
  audio6: "Could you share your opinion on this point?",
  quiz1: "Good morning, everyone. Let's get started.",
  quiz2: "The first item on the agenda is sales results.",
  quiz3: "Our next meeting will be on Friday at 2 p.m.",
};

export default function PracticeMeetingExpressions({ navigation, route }) {
  const [page, setPage] = useState(0); // 0 = intro, 1-4 = exercises, 5 = quiz, 6 = results
  const [score, setScore] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [answered, setAnswered] = useState(Array(exercises.length).fill(false));
  const [quizAnswered, setQuizAnswered] = useState(
    Array(quiz.length).fill(false)
  );

  const [markedCompleteLocal, setMarkedCompleteLocal] = useState(false);

  const RESULTS_PAGE = exercises.length + 2; // same calculation as in UI logic
  const lesson = route?.params?.lesson;

  useEffect(() => {
    // Quando o usuário chega na página de resultados, marca progresso (se ainda não marcado)
    if (page === RESULTS_PAGE && !markedCompleteLocal) {
      if (lesson?.id) {
        markLessonComplete(lesson.id);
      } else {
        console.warn("lesson.id não encontrado — progresso não salvo.");
        setMarkedCompleteLocal(true);
      }
    }
  }, [page, markedCompleteLocal, lesson]);

  async function markLessonComplete(lessonId) {
    if (!lessonId) return;

    try {
      const progress = await loadProgress();
      if (progress[lessonId]) {
        setMarkedCompleteLocal(true);
        return;
      }

      const newProgress = { ...progress, [lessonId]: true };
      await saveProgress(newProgress);
      setMarkedCompleteLocal(true);
    } catch (e) {
      console.warn("markLessonComplete error", e);
    }
  }

  const handlePlayAudio = (audioId) => {
    const text = audioTexts[audioId] || "Audio not available";
    Speech.speak(text, { language: "en-US", rate: 0.8, pitch: 1 });
  };

  const handleSelectAnswer = (exerciseIdx, optionIdx) => {
    if (answered[exerciseIdx]) return;
    const isCorrect = exercises[exerciseIdx].options[optionIdx].correct;
    setAnswered((prev) => {
      const arr = [...prev];
      arr[exerciseIdx] = true;
      return arr;
    });
    if (isCorrect) setScore((s) => s + 1);
  };

  const handleSelectQuiz = (quizIdx, optionIdx) => {
    if (quizAnswered[quizIdx]) return;
    const isCorrect = quiz[quizIdx].options[optionIdx].correct;
    setQuizAnswered((prev) => {
      const arr = [...prev];
      arr[quizIdx] = true;
      return arr;
    });
    if (isCorrect) setQuizScore((s) => s + 1);
  };

  const handleNext = () => setPage((p) => p + 1);

  const handleRestart = () => {
    setPage(0);
    setScore(0);
    setQuizScore(0);
    setAnswered(Array(exercises.length).fill(false));
    setQuizAnswered(Array(quiz.length).fill(false));
    setMarkedCompleteLocal(false);
  };

  // Intro page
  if (page === 0) {
    return (
      <View style={[styles.screen, styles.introBg]}>
        <ScrollView contentContainerStyle={styles.centered}>
          <Text style={styles.emoji}>🗓️</Text>
          <Text style={styles.title}>Practice Meeting Expressions</Text>
          <Text style={styles.subtitle}>
            Listen, choose, and organize common meeting phrases.
          </Text>
          <TouchableOpacity style={styles.startBtn} onPress={handleNext}>
            <Text style={styles.startBtnText}>▶ Start</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  // Exercise pages
  if (page > 0 && page <= exercises.length) {
    const d = exercises[page - 1];
    const isAnswered = answered[page - 1];
    return (
      <ScrollView style={styles.screen} contentContainerStyle={styles.centered}>
        <Text style={styles.dialogueTitle}>{d.title}</Text>
        <Text style={styles.dialogueSubtitle}>{d.subtitle}</Text>
        <TouchableOpacity
          style={styles.audioBtn}
          onPress={() => handlePlayAudio(d.audio)}
        >
          <Text style={styles.audioBtnText}>🔊 Play Audio</Text>
        </TouchableOpacity>
        <Text style={styles.question}>{d.question}</Text>
        {d.options.map((opt, idx) => {
          let btnStyle = [styles.answerBtn];
          let txtStyle = [styles.answerBtnText];
          if (isAnswered) {
            if (opt.correct) btnStyle.push(styles.correctBtn);
            if (
              !opt.correct &&
              answered[page - 1] &&
              idx === d.options.findIndex((o) => o.correct)
            )
              btnStyle.push(styles.correctBtn);
            if (
              !opt.correct &&
              idx ===
                d.options.findIndex(
                  (o, i) => answered[page - 1] && i === idx && !o.correct
                )
            )
              btnStyle.push(styles.incorrectBtn);
          }
          return (
            <TouchableOpacity
              key={idx}
              style={btnStyle}
              disabled={isAnswered}
              onPress={() => handleSelectAnswer(page - 1, idx)}
            >
              <Text style={txtStyle}>{opt.text}</Text>
            </TouchableOpacity>
          );
        })}
        {isAnswered && (
          <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
            <Text style={styles.nextBtnText}>Continue →</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    );
  }

  // Quiz page
  if (page === exercises.length + 1) {
    return (
      <ScrollView
        style={[styles.screen, styles.quizBg]}
        contentContainerStyle={styles.centered}
      >
        <Text style={styles.quizTitle}>📊 Final Quiz</Text>
        <Text style={styles.quizSubtitle}>
          Test your understanding with these 3 questions
        </Text>
        {quiz.map((q, idx) => (
          <View key={idx} style={styles.quizBlock}>
            <TouchableOpacity
              style={styles.audioBtn}
              onPress={() => handlePlayAudio(q.audio)}
            >
              <Text style={styles.audioBtnText}>🔊 Play Audio</Text>
            </TouchableOpacity>
            <Text style={[styles.question, styles.quizQuestion]}>
              {q.question}
            </Text>
            {q.options.map((opt, oidx) => {
              let btnStyle = [styles.quizBtn];
              if (quizAnswered[idx]) {
                if (opt.correct) btnStyle.push(styles.correctBtn);
                if (
                  !opt.correct &&
                  quizAnswered[idx] &&
                  oidx === q.options.findIndex((o) => o.correct)
                )
                  btnStyle.push(styles.correctBtn);
                if (
                  !opt.correct &&
                  oidx ===
                    q.options.findIndex(
                      (o, i) => quizAnswered[idx] && i === oidx && !o.correct
                    )
                )
                  btnStyle.push(styles.incorrectBtn);
              }
              return (
                <TouchableOpacity
                  key={oidx}
                  style={btnStyle}
                  disabled={quizAnswered[idx]}
                  onPress={() => handleSelectQuiz(idx, oidx)}
                >
                  <Text style={styles.quizBtnText}>{opt.text}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
        {quizAnswered.every(Boolean) && (
          <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
            <Text style={styles.nextBtnText}>Show Results</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    );
  }

  // Results page
  if (page === exercises.length + 2) {
    const totalScore = score + quizScore;
    const totalPossible = exercises.length + quiz.length;
    const percentage = (totalScore / totalPossible) * 100;
    const passed = percentage >= 70;
    return (
      <View style={[styles.screen, passed ? styles.introBg : styles.quizBg]}>
        <ScrollView contentContainerStyle={styles.centered}>
          <Text style={styles.emoji}>{passed ? "🎉" : "💡"}</Text>
          <Text style={styles.title}>
            {passed ? "Excellent!" : "Keep Practicing!"}
          </Text>
          <Text style={styles.subtitle}>
            {passed
              ? "You can use meeting phrases with confidence."
              : "Review the audios again and focus on meeting vocabulary."}
          </Text>
          <Text style={styles.scoreText}>
            Total Score: {totalScore}/{totalPossible} ({percentage.toFixed(0)}%)
          </Text>
          <View style={styles.resultsBlock}>
            <Text style={styles.resultDetail}>
              Exercises: {score}/{exercises.length}
            </Text>
            <Text style={styles.resultDetail}>
              Quiz: {quizScore}/{quiz.length}
            </Text>
          </View>
          <TouchableOpacity style={styles.startBtn} onPress={handleRestart}>
            <Text style={styles.startBtnText}>
              {passed ? "🚀 Practice Again" : "🔄 Try Again"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nextBtn}
            onPress={() =>
              navigation && navigation.goBack && navigation.goBack()
            }
          >
            <Text style={styles.nextBtnText}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.nextBtn,
              { backgroundColor: "#2563eb", marginTop: 20 },
            ]}
            onPress={() => {
              const nextScreen =
                route?.params?.nextScreen ||
                route?.params?.lesson?.nextScreen ||
                "MeetingPhrasebook";
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
            <Text style={styles.nextBtnText}>Próxima Atividade →</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  introBg: {
    backgroundColor: "#022b62",
  },
  quizBg: {
    backgroundColor: "#022b62",
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    flexGrow: 1,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 24,
    textAlign: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    color: "#cbd5e1",
    marginBottom: 32,
    textAlign: "center",
  },
  startBtn: {
    backgroundColor: "#ec651d",
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 999,
    marginTop: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  startBtnText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  dialogueTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#022b62",
    marginBottom: 8,
    textAlign: "center",
  },
  dialogueSubtitle: {
    fontSize: 18,
    color: "#64748b",
    marginBottom: 16,
    textAlign: "center",
  },
  audioBtn: {
    backgroundColor: "#ec651d",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 999,
    marginBottom: 16,
    alignSelf: "center",
  },
  audioBtnText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  question: {
    fontSize: 20,
    fontWeight: "600",
    color: "#022b62",
    marginBottom: 12,
    textAlign: "center",
  },
  answerBtn: {
    backgroundColor: "#f1f5f9",
    borderColor: "#d1d5db",
    borderWidth: 2,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    width: 320,
    alignSelf: "center",
  },
  answerBtnText: {
    fontSize: 18,
    color: "#1e293b",
  },
  correctBtn: {
    borderColor: "#10b981",
    backgroundColor: "#d1fae5",
  },
  incorrectBtn: {
    borderColor: "#ef4444",
    backgroundColor: "#fee2e2",
  },
  nextBtn: {
    backgroundColor: "#ec651d",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 999,
    marginTop: 18,
    alignSelf: "center",
  },
  nextBtnText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  quizTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    textAlign: "center",
  },
  quizSubtitle: {
    fontSize: 18,
    color: "#cbd5e1",
    marginBottom: 24,
    textAlign: "center",
  },
  quizBlock: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    width: 340,
    alignSelf: "center",
  },
  quizBtn: {
    backgroundColor: "#B2BFCF",
    borderColor: "rgb(255, 255, 255)",
    borderWidth: 2,
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
    width: 300,
    alignSelf: "center",
  },
  quizQuestion: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 10,
    textAlign: "center",
  },
  quizBtnText: {
    fontSize: 18,
    color: "#022b62",
    fontWeight: "700",
    textAlign: "center",
  },
  scoreText: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 16,
    textAlign: "center",
  },
  resultsBlock: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    width: 320,
    alignSelf: "center",
  },
  resultDetail: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 4,
    textAlign: "center",
  },
});
