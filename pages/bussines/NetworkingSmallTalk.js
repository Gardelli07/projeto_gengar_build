import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
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

const exercises = [
  {
    title: "Dialogue 1 - Introduction",
    subtitle: "Listen and identify what the person is doing",
    audio: "audio1",
    question: "O que a pessoa está fazendo?",
    options: [
      { text: "Se apresentando", correct: true },
      { text: "Encerrando a reunião", correct: false },
      { text: "Agradecendo pelo feedback", correct: false },
    ],
  },
  {
    title: "Dialogue 2 - Asking Questions",
    subtitle: "Listen and identify the question being asked",
    audio: "audio2",
    question: "Qual foi a pergunta feita?",
    options: [
      { text: "Qual é a sua função na empresa", correct: true },
      { text: "Onde é a próxima reunião", correct: false },
      { text: "Quanto tempo dura o projeto", correct: false },
    ],
  },
  {
    title: "Dialogue 3 - Common Ground",
    subtitle: ",Listen and identify the speaker's intention",
    audio: "audio3",
    question: "O que a pessoa está tentando fazer?",
    options: [
      { text: "Encontrar algo em comum", correct: true },
      { text: "Criticar a outra pessoa", correct: false },
      { text: "Encerrar a conversa", correct: false },
    ],
  },
  {
    title: "Dialogue 4 - Small Talk",
    subtitle: "Listen and identify the type of conversation",
    audio: "audio4",
    question: "Que tipo de conversa é essa?",
    options: [
      { text: "Small talk", correct: true },
      { text: "Pedido de informações formais", correct: false },
      { text: "Feedback de desempenho", correct: false },
    ],
  },
];

const quiz = [
  {
    audio: "quiz1",
    question: "What is the person doing?",
    options: [
      { text: "A) Introducing themselves", correct: true },
      { text: "B) Ending the conversation", correct: false },
      { text: "C) Asking for help", correct: false },
    ],
  },
  {
    audio: "quiz2",
    question: "What type of conversation is this?",
    options: [
      { text: "A) Formal meeting", correct: false },
      { text: "B) Small talk", correct: true },
      { text: "C) Job interview", correct: false },
    ],
  },
  {
    audio: "quiz3",
    question: "What is the speaker trying to do?",
    options: [
      { text: "A) Find common ground", correct: true },
      { text: "B) End the conversation", correct: false },
      { text: "C) Give instructions", correct: false },
    ],
  },
];

const audioTexts = {
  audio1: "Hi, my name is Sarah. I work in marketing at BEA.",
  audio2: "So, what do you do at your company?",
  audio3: "Oh, really? I also enjoy running in my free time.",
  audio4: "Is this your first time at this conference?",
  audio5: "Nice talking to you. Hope to see you again.",
  audio6:
    "Imagine you're meeting a new colleague. Introduce yourself and ask them about their job.",
  quiz1: "Hi, my name is Sarah. I work in marketing at BEA.",
  quiz2: "Is this your first time at this conference?",
  quiz3: "Oh, really? I also enjoy running in my free time.",
};

export default function NetworkingSmallTalk({ navigation, route }) {
  const [page, setPage] = useState(0); // 0 = intro, 1-4 = exercises, 5 = order, 6 = networking, 7 = quiz, 8 = results
  const [score, setScore] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [answered, setAnswered] = useState(Array(exercises.length).fill(false));
  const [quizAnswered, setQuizAnswered] = useState(
    Array(quiz.length).fill(false)
  );
  const [networkingText, setNetworkingText] = useState("");
  const [networkingFeedback, setNetworkingFeedback] = useState("");
  const [networkingDone, setNetworkingDone] = useState(false);

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
    setNetworkingText("");
    setNetworkingFeedback("");
    setNetworkingDone(false);
    setMarkedCompleteLocal(false);
  };

  // Networking feedback logic
  const checkNetworking = () => {
    const text = networkingText.trim().toLowerCase();
    const hasGreeting =
      text.includes("hi") ||
      text.includes("hello") ||
      text.includes("good morning") ||
      text.includes("good afternoon");
    const hasName =
      text.includes("i'm") ||
      text.includes("my name is") ||
      text.includes("i am");
    const hasRole =
      text.includes("work") ||
      text.includes("job") ||
      text.includes("company") ||
      text.includes("department");
    const hasQuestion =
      text.includes("what do you do") ||
      text.includes("what about you") ||
      text.includes("your job") ||
      text.includes("your work") ||
      text.includes("your company");
    const isCorrectStructure = hasGreeting && hasName && hasRole && hasQuestion;
    if (isCorrectStructure) {
      setNetworkingFeedback(
        "✅ Perfect! That's a natural networking introduction."
      );
      if (!networkingDone) {
        setScore((s) => s + 1);
        setNetworkingDone(true);
      }
    } else {
      let suggestions = [];
      if (!hasGreeting) suggestions.push("Include a greeting (Hi, Hello)");
      if (!hasName)
        suggestions.push("Introduce yourself (I'm... / My name is...)");
      if (!hasRole) suggestions.push("Mention your work/company");
      if (!hasQuestion)
        suggestions.push("Ask about their job (What do you do?)");
      setNetworkingFeedback("❌ Try again. " + suggestions.join(" "));
    }
  };

  // Intro page
  if (page === 0) {
    return (
      <View style={[styles.screen, styles.introBg]}>
        <ScrollView contentContainerStyle={styles.centered}>
          <Text style={styles.emoji}>🤝</Text>
          <Text style={styles.title}>Networking & Small Talk</Text>
          <Text style={styles.subtitle}>
            Listen to common business phrases and practice your responses.
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

  // Networking activity page
  if (page === exercises.length + 1) {
    return (
      <ScrollView style={styles.screen} contentContainerStyle={styles.centered}>
        <Text style={styles.dialogueTitle}>Your Turn - Roleplay</Text>
        <Text style={styles.dialogueSubtitle}>
          Practice introducing yourself and asking about someone's job
        </Text>
        <TouchableOpacity
          style={styles.audioBtn}
          onPress={() => handlePlayAudio("audio6")}
        >
          <Text style={styles.audioBtnText}>🔊 Listen to Instructions</Text>
        </TouchableOpacity>
        <Text style={styles.question}>Write Your Introduction</Text>
        <Text style={styles.subtitleSmall}>
          Write how you would introduce yourself and ask about their job.
          Include: greeting, your name, your role, and a question about their
          work.
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Example: Hi, I'm Lucas. I work in finance at ABC Company. What do you do at your company?"
          value={networkingText}
          onChangeText={setNetworkingText}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity
          style={[
            styles.nextBtn,
            { opacity: networkingText.length > 15 ? 1 : 0.5 },
          ]}
          onPress={checkNetworking}
          disabled={networkingText.length <= 15}
        >
          <Text style={styles.nextBtnText}>✓ Check My Introduction</Text>
        </TouchableOpacity>
        {!!networkingFeedback && (
          <Text
            style={
              networkingFeedback.startsWith("✅")
                ? styles.correctText
                : styles.incorrectText
            }
          >
            {networkingFeedback}
          </Text>
        )}
        {networkingFeedback.startsWith("✅") && (
          <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
            <Text style={styles.nextBtnText}>Final Quiz →</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    );
  }

  // Quiz page
  if (page === exercises.length + 2) {
    return (
      <ScrollView
        style={[styles.screen, styles.quizBg]}
        contentContainerStyle={styles.centered}
      >
        <Text style={styles.quizTitle}>📊 Final Quiz</Text>
        <Text style={styles.quizSubtitle}>
          Test your networking conversation skills
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
  if (page === exercises.length + 3) {
    const totalScore = score + quizScore;
    const totalPossible = exercises.length + 1 + quiz.length; // +1 for networking
    const percentage = (totalScore / totalPossible) * 100;
    const passed = percentage >= 70;
    return (
      <View style={[styles.screen, passed ? styles.introBg : styles.quizBg]}>
        <ScrollView contentContainerStyle={styles.centered}>
          <Text style={styles.emoji}>{passed ? "🎉" : "💡"}</Text>
          <Text style={styles.title}>
            {passed ? "Great networking skills!" : "Keep practicing!"}
          </Text>
          <Text style={styles.subtitle}>
            {passed
              ? "You're ready for small talk at events."
              : "Listen again and practice the natural flow of conversation."}
          </Text>
          <Text style={styles.scoreText}>
            Total Score: {totalScore}/{totalPossible} ({percentage.toFixed(0)}%)
          </Text>
          <View style={styles.resultsBlock}>
            <Text style={styles.resultDetail}>
              Exercises: {score}/{exercises.length + 1}
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
                "PracticeMeetingExpressions";
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
  subtitleSmall: {
    fontSize: 16,
    color: "#64748b",
    marginBottom: 12,
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
  correctText: {
    color: "#10b981",
    fontSize: 18,
    marginTop: 12,
    textAlign: "center",
  },
  incorrectText: {
    color: "#ef4444",
    fontSize: 18,
    marginTop: 12,
    textAlign: "center",
  },
  textInput: {
    borderColor: "#d1d5db",
    borderWidth: 2,
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    width: 320,
    minHeight: 80,
    marginBottom: 10,
    backgroundColor: "#fff",
    color: "#1e293b",
    textAlignVertical: "top",
    alignSelf: "center",
  },
});
