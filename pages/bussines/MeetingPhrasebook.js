import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import * as Speech from "expo-speech";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@curso_progress_v1";

const expressions = [
  {
    section: "Starting the Meeting",
    subtitle: "Essential phrases to open your meetings professionally",
    cards: [
      {
        text: "Good morning, everyone. Let's get started.",
        desc: "Perfect opening to begin any meeting",
        audio: "expr1",
      },
      {
        text: "Thank you all for joining today's meeting.",
        desc: "Show appreciation for attendees' time",
        audio: "expr2",
      },
      {
        text: "The purpose of this meeting is to...",
        desc: "Clearly state the meeting objective",
        audio: "expr3",
      },
    ],
  },
  {
    section: "Talking about the Agenda",
    subtitle: "Navigate through meeting topics smoothly",
    cards: [
      {
        text: "Let's go through today's agenda.",
        desc: "Introduce the meeting structure",
        audio: "expr4",
      },
      {
        text: "The first item on the agenda is...",
        desc: "Start discussing specific topics",
        audio: "expr5",
      },
      {
        text: "Shall we move on to the next point?",
        desc: "Transition between agenda items",
        audio: "expr6",
      },
    ],
  },
  {
    section: "Asking for Clarification",
    subtitle: "Polite ways to ask for more information",
    cards: [
      {
        text: "Could you clarify that, please?",
        desc: "Ask for more detailed explanation",
        audio: "expr7",
      },
      {
        text: "Sorry, I didn't catch that. Could you repeat?",
        desc: "Politely ask someone to repeat",
        audio: "expr8",
      },
      {
        text: "What exactly do you mean by...?",
        desc: "Ask for specific clarification",
        audio: "expr9",
      },
    ],
  },
  {
    section: "Giving Opinions",
    subtitle: "Express your thoughts professionally",
    cards: [
      {
        text: "In my opinion, we should...",
        desc: "Share your perspective respectfully",
        audio: "expr10",
      },
      {
        text: "I agree with that point.",
        desc: "Show agreement with colleagues",
        audio: "expr11",
      },
      {
        text: "I see your point, but...",
        desc: "Politely disagree or add perspective",
        audio: "expr12",
      },
    ],
  },
  {
    section: "Closing the Meeting",
    subtitle: "End meetings professionally and effectively",
    cards: [
      {
        text: "Let's summarize the main points.",
        desc: "Recap key decisions and discussions",
        audio: "expr13",
      },
      {
        text: "Our next meeting will be on...",
        desc: "Schedule follow-up meetings",
        audio: "expr14",
      },
      {
        text: "Thank you for your time today.",
        desc: "Express gratitude and close gracefully",
        audio: "expr15",
      },
    ],
  },
];

const audioTexts = {
  expr1: "Good morning, everyone. Let's get started.",
  expr2: "Thank you all for joining today's meeting.",
  expr3: "The purpose of this meeting is to discuss our quarterly results.",
  expr4: "Let's go through today's agenda.",
  expr5: "The first item on the agenda is our sales performance.",
  expr6: "Shall we move on to the next point?",
  expr7: "Could you clarify that, please?",
  expr8: "Sorry, I didn't catch that. Could you repeat?",
  expr9: "What exactly do you mean by cost optimization?",
  expr10: "In my opinion, we should focus on digital marketing.",
  expr11: "I agree with that point.",
  expr12: "I see your point, but we need to consider the budget.",
  expr13: "Let's summarize the main points.",
  expr14: "Our next meeting will be on Friday at two p.m.",
  expr15: "Thank you for your time today.",
};

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

export default function MeetingPhrasebook({ navigation, route }) {
  const [page, setPage] = useState(0);
  const [markedCompleteLocal, setMarkedCompleteLocal] = useState(false);

  const lesson = route?.params?.lesson;

  const handlePlayAudio = (audioId) => {
    const text = audioTexts[audioId] || "Audio not available";
    Speech.speak(text, { language: "en-US", rate: 0.8 });
  };

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

  useEffect(() => {
    const isLastPage = page === expressions.length;

    if (isLastPage && !markedCompleteLocal) {
      if (lesson?.id) {
        markLessonComplete(lesson.id);
      } else {
        console.warn("lesson.id não encontrado — progresso não salvo.");
        setMarkedCompleteLocal(true);
      }
    }
  }, [page, markedCompleteLocal, lesson]);

  if (page === 0) {
    return (
      <View style={[styles.screen, styles.introBg]}>
        <ScrollView contentContainerStyle={styles.centered}>
          <Text style={styles.emoji}>🗓️</Text>
          <Text style={styles.title}>Meeting Phrasebook</Text>
          <Text style={styles.subtitle}>
            Click, listen, and repeat the most common meeting expressions.
          </Text>
          <TouchableOpacity style={styles.startBtn} onPress={() => setPage(1)}>
            <Text style={styles.startBtnText}>▶ Start</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  const section = expressions[page - 1];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.centered}>
      <Text style={styles.sectionTitle}>{section.section}</Text>
      <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>

      {section.cards.map((card, idx) => (
        <View key={idx} style={styles.card}>
          <View style={styles.cardTextBlock}>
            <Text style={styles.cardText}>{`"${card.text}"`}</Text>
            <Text style={styles.cardDesc}>{card.desc}</Text>
          </View>
          <TouchableOpacity
            style={styles.audioBtn}
            onPress={() => handlePlayAudio(card.audio)}
          >
            <Text style={styles.audioBtnText}>🎧</Text>
          </TouchableOpacity>
        </View>
      ))}

      <View style={styles.navRow}>
        {page > 1 && (
          <TouchableOpacity
            style={styles.navBtn}
            onPress={() => setPage(page - 1)}
          >
            <Text style={styles.navBtnText}>← Previous</Text>
          </TouchableOpacity>
        )}

        {page < expressions.length && (
          <TouchableOpacity
            style={styles.navBtn}
            onPress={() => setPage(page + 1)}
          >
            <Text style={styles.navBtnText}>Next →</Text>
          </TouchableOpacity>
        )}

        {page === expressions.length && (
          <TouchableOpacity style={styles.navBtn} onPress={() => setPage(0)}>
            <Text style={styles.navBtnText}>🏠 Home</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  introBg: {
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
  sectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#022b62",
    marginBottom: 8,
    textAlign: "center",
  },
  sectionSubtitle: {
    fontSize: 18,
    color: "#64748b",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderColor: "#d1d5db",
    borderWidth: 2,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    width: 340,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 1,
  },
  cardTextBlock: {
    flex: 1,
    marginRight: 12,
  },
  cardText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#022b62",
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 15,
    color: "#64748b",
  },
  audioBtn: {
    backgroundColor: "#ec651d",
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  audioBtnText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 340,
    marginTop: 16,
    marginBottom: 24,
    alignSelf: "center",
  },
  navBtn: {
    backgroundColor: "#ec651d",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 999,
    marginHorizontal: 4,
  },
  navBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
