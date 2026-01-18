import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
  Platform,
  StatusBar,
} from "react-native";
import { SvgXml } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Svg, { Circle } from "react-native-svg";

const lockIcon = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="5" y="10" width="14" height="9" rx="2" stroke="#888" stroke-width="2" fill="#eee"/>
  <path d="M8 10V7a4 4 0 1 1 8 0v3" stroke="#888" stroke-width="2" fill="none"/>
  <circle cx="12" cy="15" r="1.5" fill="#888"/>
</svg>
`;

const STORAGE_KEY = "@curso_progress_v1";

const modules = [
  "Introdução ao inglês para negócios",
  "Cumprimentos e Small Talk",
  "Apresentando a empresa",
  "Vocabulário de escritório",
  "E-mails profissionais",
  "Reuniões e agendas",
  "Business presentation",
  "Pedindo e dando informações",
  "Feedback and Review",
  "Telefonemas",
  "Apresentações curtas",
  "Problemas e soluções",
];

const sampleLessons = [
  //modulo 1
  {
    module: 0,
    id: "1",
    title: "TESTE",
    type: "Aula",
    screen: "Teste2",
    avatar: require("../../assets/Bussines/aula1.png"),
  },
  {
    module: 0,
    id: "2",
    title: "Apresentar-se",
    type: "Aula",
    screen: "IntroBusinessEnglish",
    avatar: require("../../assets/Bussines/aula1.png"),
  },
  {
    module: 0,
    id: "3",
    title: "Apresentar-se",
    type: "Aula",
    screen: "IntroBusinessEnglish",
    avatar: require("../../assets/Bussines/aula1.png"),
  },
  {
    module: 0,
    id: "4",
    title: "Apresentar-se",
    type: "Aula",
    screen: "IntroBusinessEnglish",
    avatar: require("../../assets/Bussines/aula1.png"),
  },
  {
    module: 0,
    id: "5",
    title: "Apresentar-se",
    type: "Aula",
    screen: "IntroBusinessEnglish",
    avatar: require("../../assets/Bussines/aula1.png"),
  },
  {
    module: 0,
    id: "6",
    title: "Apresentar-se",
    type: "Aula",
    screen: "IntroBusinessEnglish",
    avatar: require("../../assets/Bussines/aula1.png"),
  },
];

// Small helper to persist progress as an object { lessonId: true }
async function saveProgress(progress) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.warn("saveProgress error", e);
  }
}

async function loadProgress() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.warn("loadProgress error", e);
    return {};
  }
}

function ProgressCircle({ percent, size = 70, strokeWidth = 8 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - percent / 100);

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
        strokeLinecap="round"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        fill="none"
      />
      <Text
        style={{
          position: "absolute",
          width: size,
          textAlign: "center",
          top: size / 2 - 8,
          fontWeight: "600",
        }}
      >
        {Math.round(percent)}%
      </Text>
    </Svg>
  );
}

function CourseScreen({ navigation }) {
  // Função para resetar progresso
  const resetProgress = async () => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({}));
    setProgressMap({});
  };
  const [progressMap, setProgressMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sub = navigation.addListener("focus", () => {
      // reload progress whenever screen focused
      loadProgress().then((p) => {
        setProgressMap(p);
        setLoading(false);
      });
    });

    return sub;
  }, [navigation]);

  // Considera TODAS as aulas, inclusive as trancadas
  const totalLessons = sampleLessons.length;

  const completedCount = sampleLessons.filter((l) => progressMap[l.id]).length;

  const percent = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  const goToLesson = (lesson) => {
    navigation.navigate(lesson.screen, { lesson });
  };

  // Renderiza as aulas agrupadas por módulo, com barra de título
  let lastModule = -1;
  const renderLesson = ({ item, index }) => {
    const done = !!progressMap[item.id];
    const showModuleBar = item.module !== lastModule;
    lastModule = item.module;
    // Desativa a partir do módulo 2 (module >= 2)
    const locked = item.module >= 1;
    return (
      <>
        {showModuleBar && (
          <View style={styles.moduleBar}>
            <Text style={styles.moduleBarText}>{modules[item.module]}</Text>
          </View>
        )}
        <View style={styles.lessonRow}>
          <View style={styles.timelineColumn}>
            <View style={styles.circleWrapper}>
              <View
                style={[
                  styles.timelineCircleOuter,
                  done && styles.timelineCircleDone,
                ]}
              >
                <Image source={item.avatar} style={styles.avatar} />
              </View>
            </View>
            {index < sampleLessons.length - 1 && (
              <View style={styles.timelineLine} />
            )}
          </View>
          <TouchableOpacity
            style={[styles.lessonCard, locked && { opacity: 0.5 }]}
            onPress={() => !locked && goToLesson(item)}
            disabled={locked}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text style={[styles.lessonTitle, done && { color: "#999" }]}>
                  {item.title}
                </Text>
                <Text style={styles.lessonSubtitle}>{item.type}</Text>
              </View>
              <View
                style={{ alignItems: "flex-end", flexDirection: "row", gap: 8 }}
              >
                {locked && <SvgXml xml={lockIcon} width={24} height={24} />}
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
      <StatusBar barStyle="light-content" />

      <View style={styles.progressRow}>
        <ProgressCircle percent={percent} size={90} strokeWidth={8} />
        <View
          style={{ marginLeft: 16, flexDirection: "row", alignItems: "center" }}
        >
          <View>
            <Text style={{ fontSize: 18, fontWeight: "700" }}>
              {Math.round(percent)}% concluído
            </Text>
            <Text style={{ color: "#666" }}>
              {completedCount} de {sampleLessons.length} aulas
            </Text>
          </View>
          <TouchableOpacity
            onPress={resetProgress}
            style={{
              marginLeft: 16,
              backgroundColor: "#eee",
              padding: 8,
              borderRadius: 8,
            }}
            accessibilityLabel="Resetar progresso"
          >
            <Text style={{ color: "#ff6a00", fontWeight: "bold" }}>
              Resetar
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={sampleLessons}
        renderItem={renderLesson}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
      />

      {/* Barra de navegação original do app */}
      {/* Para usar a barra de abas original, remova a View abaixo e use a navegação principal do app */}
    </SafeAreaView>
  );
}

function ActivityScreen({ route, navigation }) {
  const { lesson } = route.params;
  const [done, setDone] = useState(false);

  useEffect(() => {
    loadProgress().then((p) => setDone(!!p[lesson.id]));
  }, [lesson.id]);

  const toggleDone = async () => {
    const p = await loadProgress();
    const newP = { ...p, [lesson.id]: !p[lesson.id] };
    await saveProgress(newP);
    setDone(!done);
    // go back to let CourseScreen refresh on focus
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.safe, { padding: 20 }]}>
      <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 8 }}>
        {lesson.title}
      </Text>
      <Text style={{ color: "#666", marginBottom: 24 }}>
        Tipo: {lesson.type}
      </Text>

      <Button
        title={done ? "Marcar como não concluído" : "Marcar como concluído"}
        onPress={toggleDone}
      />

      <View style={{ height: 20 }} />
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();

export default CourseScreen;

const styles = StyleSheet.create({
  moduleBar: {
    backgroundColor: "#e8e8e8",
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 18,
    marginBottom: 6,
    borderRadius: 8,
    alignItems: "center",
  },
  moduleBarText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#0f3b77",
    letterSpacing: 0.5,
    textAlign: "center",
  },
  safe: { flex: 1, backgroundColor: "#fff" },
  header: {
    padding: 16,
    backgroundColor: "#0f3b77",
    paddingTop: Platform.OS === "android" ? 20 : 16,
  },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "700" },
  headerSubtitle: { color: "#fff", opacity: 0.85 },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fafafa",
  },
  lessonRow: { flexDirection: "row", marginBottom: 8 },
  timelineColumn: { width: 80, alignItems: "center" },
  circleWrapper: { alignItems: "center", marginTop: 4 },
  timelineCircleOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 8,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  timelineCircleDone: { borderColor: "#29cc74" },
  avatar: { width: 66, height: 66, borderRadius: 33 },
  timelineLine: { width: 2, height: 36, backgroundColor: "#eee", marginTop: 6 },
  lessonCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginLeft: 8,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  lessonTitle: { fontSize: 18, fontWeight: "700" },
  lessonSubtitle: { color: "#888", marginTop: 6 },
  lessonAction: { color: "#0f3b77", fontWeight: "700" },
  // bottomNav removido para usar a barra de navegação original do app
});
