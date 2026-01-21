import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Svg, { Circle } from "react-native-svg";

/* ================= ICON ================= */

const lockIcon = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
 xmlns="http://www.w3.org/2000/svg">
  <rect x="5" y="10" width="14" height="9" rx="2"
   stroke="#888" stroke-width="2" fill="#eee"/>
  <path d="M8 10V7a4 4 0 1 1 8 0v3"
   stroke="#888" stroke-width="2" fill="none"/>
  <circle cx="12" cy="15" r="1.5" fill="#888"/>
</svg>
`;

/* ================= CONFIG ================= */

const STORAGE_KEY = "@progesso_ingles_completo";

/* ================= DATA ================= */

const modules = [
  "Introdução ao inglês para negócios",
  "Cumprimentos e Small Talk",
  "Apresentando a empresa",
  "Vocabulário de escritório",
  "E-mails profissionais",
  "Reuniões e agendas",
];

const sampleLessons = [
  {
    module: 0,
    id: "1",
    title: "TESTE2",
    type: "Aula",
    screen: "Teste2",
    avatar: require("../../../assets/Bussines/aula1.png"),
  },
  {
    module: 0,
    id: "2",
    title: "TESTE3",
    type: "Aula",
    screen: "Teste3",
    avatar: require("../../../assets/Bussines/aula1.png"),
  },
  {
    module: 0,
    id: "3",
    title: "Apresentar-se",
    type: "Aula",
    screen: "IntroBusinessEnglish",
    avatar: require("../../../assets/Bussines/aula1.png"),
  },
  {
    module: 2,
    id: "4",
    title: "Apresentar-se",
    type: "Aula",
    screen: "",
    avatar: require("../../../assets/Bussines/aula1.png"),
  },
];

/* ================= STORAGE ================= */

async function loadProgress() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/* ================= UI ================= */

function ProgressCircle({ percent, size = 90, strokeWidth = 8 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent / 100);

  return (
    <Svg width={size} height={size}>
      <Circle
        stroke="#e6e6e6"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <Circle
        stroke="#ff6a00"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        fill="none"
      />
      <Text
        style={{
          position: "absolute",
          width: size,
          top: size / 2 - 10,
          textAlign: "center",
          fontWeight: "700",
        }}
      >
        {Math.round(percent)}%
      </Text>
    </Svg>
  );
}

/* ================= SCREEN ================= */

export default function Inglescompleto({ navigation, route }) {
  const autoOpenLessonId = route?.params?.autoOpenLessonId;

  const [progressMap, setProgressMap] = useState({});
  const openedRef = useRef(false);

  /* ===== Reload progress when focused ===== */
  useEffect(() => {
    const sub = navigation.addListener("focus", async () => {
      const p = await loadProgress();
      setProgressMap(p);
    });
    return sub;
  }, [navigation]);

  /* ===== Auto-open next lesson ===== */
  useEffect(() => {
    if (!autoOpenLessonId || openedRef.current) return;

    const lesson = sampleLessons.find(
      (l) => String(l.id) === String(autoOpenLessonId),
    );

    if (lesson) {
      openedRef.current = true;

      // limpa o param para não reabrir depois
      navigation.setParams({ autoOpenLessonId: null });

      // abre a próxima aula SEM empilhar
      requestAnimationFrame(() => {
        navigation.replace(lesson.screen, {
          lesson,
          lessons: sampleLessons,
        });
      });
    }
  }, [autoOpenLessonId, navigation]);

  /* ===== Progress ===== */
  const totalLessons = sampleLessons.length;
  const completedCount = sampleLessons.filter((l) => progressMap[l.id]).length;

  const percent = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  /* ===== Navigation ===== */
  const goToLesson = (lesson) => {
    navigation.navigate(lesson.screen, {
      lesson,
      lessons: sampleLessons,
    });
  };

  const handleReset = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setProgressMap({});
    } catch (e) {
      // erro ignorado
    }
  };

  /* ===== Render ===== */
  let lastModule = -1;

  const renderLesson = ({ item, index }) => {
    const done = !!progressMap[item.id];
    const showModule = item.module !== lastModule;
    lastModule = item.module;

    return (
      <>
        {showModule && (
          <View style={styles.moduleBar}>
            <Text style={styles.moduleBarText}>{modules[item.module]}</Text>
          </View>
        )}

        <View style={styles.lessonRow}>
          <View style={styles.timelineColumn}>
            <View
              style={[
                styles.timelineCircleOuter,
                done && styles.timelineCircleDone,
              ]}
            >
              <Image source={item.avatar} style={styles.avatar} />
            </View>
            {index < sampleLessons.length - 1 && (
              <View style={styles.timelineLine} />
            )}
          </View>

          <TouchableOpacity
            style={styles.lessonCard}
            onPress={() => goToLesson(item)}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text style={styles.lessonTitle}>{item.title}</Text>
                <Text style={styles.lessonSubtitle}>{item.type}</Text>
              </View>

              <View style={{ flexDirection: "row", gap: 8 }}>
                {done && <Text style={styles.lessonAction}>Concluído</Text>}
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.progressRow}>
        <ProgressCircle percent={percent} />
        <View style={{ marginLeft: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: "700" }}>
            {Math.round(percent)}% concluído
          </Text>
          <Text style={{ color: "#666" }}>
            {completedCount} de {totalLessons} aulas
          </Text>
          <View style={{ marginTop: 8, width: 160 }}>
            <Button
              title="Resetar progresso"
              onPress={handleReset}
              color="#ff3b30"
            />
          </View>
        </View>
      </View>

      <FlatList
        data={sampleLessons}
        renderItem={renderLesson}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
      />
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fafafa",
  },

  moduleBar: {
    backgroundColor: "#e8e8e8",
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  moduleBarText: {
    fontWeight: "700",
    fontSize: 16,
    color: "#0f3b77",
  },

  lessonRow: {
    flexDirection: "row",
    marginBottom: 10,
  },

  timelineColumn: {
    width: 80,
    alignItems: "center",
  },

  timelineCircleOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 8,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },

  timelineCircleDone: {
    borderColor: "#29cc74",
  },

  avatar: {
    width: 66,
    height: 66,
    borderRadius: 33,
  },

  timelineLine: {
    width: 2,
    height: 36,
    backgroundColor: "#eee",
    marginTop: 6,
  },

  lessonCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginLeft: 8,
    elevation: 1,
  },

  lessonTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  lessonSubtitle: {
    color: "#888",
    marginTop: 4,
  },

  lessonAction: {
    color: "#0f3b77",
    fontWeight: "700",
  },
});
