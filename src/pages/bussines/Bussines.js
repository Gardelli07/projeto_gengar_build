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
import { BussinesImages } from "../../util/images";
// Cadeado SVG como string
const lockIcon = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="5" y="10" width="14" height="9" rx="2" stroke="#888" stroke-width="2" fill="#eee"/>
  <path d="M8 10V7a4 4 0 1 1 8 0v3" stroke="#888" stroke-width="2" fill="none"/>
  <circle cx="12" cy="15" r="1.5" fill="#888"/>
</svg>
`;
const STORAGE_KEY = "@curso_progress_v1";
// Lista de módulos
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
    id: "l1",
    title: "Apresentar-se",
    type: "Aula",
    screen: "IntroBusinessEnglish",
    avatar: BussinesImages.aula1,
  },
  {
    module: 0,
    id: "l2",
    title: "Escreva seu email",
    type: "Aula",
    screen: "ProfessionalEmails",
    avatar: BussinesImages.email,
  },
  {
    module: 0,
    id: "l3",
    title: "Continuação: Escreva seu email",
    type: "Prática Oral",
    screen: "ProfessionalEmailsPart2",
    avatar: BussinesImages.email2,
  },
  {
    module: 0,
    id: "l4",
    title: "Quem é?",
    type: "IA",
    screen: "TelephoneConversations",
    avatar: BussinesImages.call,
  },
  {
    module: 0,
    id: "l5",
    title: "Marcando reuniões ",
    type: "IA",
    screen: "MeetingsQuiz",
    avatar: BussinesImages.agenda,
  },
  {
    module: 0,
    id: "l6",
    title: "Networking",
    type: "IA",
    screen: "NetworkingSmallTalk",
    avatar: BussinesImages.storm,
  },
  {
    module: 0,
    id: "l7",
    title: "Shall we start?",
    type: "IA",
    screen: "PracticeMeetingExpressions",
    avatar: BussinesImages.tradutor,
  },
  {
    module: 0,
    id: "l8",
    title: "Meetings",
    type: "IA",
    screen: "MeetingPhrasebook",
    avatar: BussinesImages.reuniao,
  },
  //modulo 2
  {
    module: 1,
    id: "l9",
    title: "What’s up?",
    type: "",
    screen: "",
    avatar: BussinesImages.hi2,
  },
  {
    module: 1,
    id: "20",
    title: "Cumprimentos",
    type: "",
    screen: "",
    avatar: BussinesImages.hi,
  },
  {
    module: 1,
    id: "21",
    title: "Q&A",
    type: "",
    screen: "",
    avatar: BussinesImages.conversa,
  },
  {
    module: 1,
    id: "22",
    title: "Diálogo no elevador",
    type: "",
    screen: "",
    avatar: BussinesImages.conversa2,
  },
  //modulo 3
  {
    module: 2,
    id: "23",
    title: "Trabalho na...",
    type: "",
    screen: "",
    avatar: BussinesImages.company,
  },
  {
    module: 2,
    id: "24",
    title: "Networking",
    type: "",
    screen: "",
    avatar: BussinesImages.storm,
  },
  {
    module: 2,
    id: "25",
    title: "Quem sou eu?",
    type: "",
    screen: "",
    avatar: BussinesImages.who,
  },
  {
    module: 2,
    id: "26",
    title: "Small talk",
    type: "",
    screen: "",
    avatar: BussinesImages.conversa2,
  },
  {
    module: 2,
    id: "27",
    title: "Contra o tempo",
    type: "",
    screen: "",
    avatar: BussinesImages.relogio,
  },
  //modulo 4
  {
    module: 3,
    id: "28",
    title: "introdução office",
    type: "",
    screen: "",
    avatar: BussinesImages.trabalho,
  },
  {
    module: 3,
    id: "29",
    title: "Objetos de escritório",
    type: "",
    screen: "",
    avatar: BussinesImages.material,
  },
  {
    module: 3,
    id: "30",
    title: "Complete a frase",
    type: "",
    screen: "",
    avatar: BussinesImages.celebro,
  },
  {
    module: 3,
    id: "31",
    title: "Situações de escritório",
    type: "",
    screen: "",
    avatar: BussinesImages.secretaria,
  },
  //modulo 5
  {
    module: 4,
    id: "32",
    title: "Formal email",
    type: "",
    screen: "",
    avatar: BussinesImages.envelope,
  },
  {
    module: 4,
    id: "33",
    title: "Como montar o email",
    type: "",
    screen: "",
    avatar: BussinesImages.celebro,
  },
  {
    module: 4,
    id: "34",
    title: "Saudação",
    type: "",
    screen: "",
    avatar: BussinesImages.hi,
  },
  {
    module: 4,
    id: "35",
    title: "Complete o email",
    type: "",
    screen: "",
    avatar: BussinesImages.mensagem,
  },
  {
    module: 4,
    id: "36",
    title: "Rescreva o email",
    type: "",
    screen: "",
    avatar: BussinesImages.secretario,
  },
  {
    module: 4,
    id: "37",
    title: "Situações",
    type: "",
    screen: "",
    avatar: BussinesImages.aula2,
  },
  {
    module: 4,
    id: "38",
    title: "Expressões chaves",
    type: "",
    screen: "",
    avatar: BussinesImages.menino,
  },
  {
    module: 4,
    id: "39",
    title: "Pedido formal",
    type: "",
    screen: "",
    avatar: BussinesImages.lupa,
  },
  {
    module: 4,
    id: "40",
    title: "Escolha a resposta",
    type: "",
    screen: "",
    avatar: BussinesImages.menino2,
  },
  {
    module: 4,
    id: "41",
    title: "Agradecimento",
    type: "",
    screen: "",
    avatar: BussinesImages.obrigado,
  },
  {
    module: 4,
    id: "42",
    title: "Escreva seu email",
    type: "",
    screen: "",
    avatar: BussinesImages.menina,
  },
  {
    module: 4,
    id: "43",
    title: "Confirme info",
    type: "",
    screen: "",
    avatar: BussinesImages.menina2,
  },
  {
    module: 4,
    id: "44",
    title: "I’m sorry",
    type: "",
    screen: "",
    avatar: BussinesImages.sorry,
  },
  {
    module: 4,
    id: "45",
    title: "Soluções",
    type: "",
    screen: "",
    avatar: BussinesImages.ideia,
  },
  {
    module: 4,
    id: "46",
    title: "Escrita errada",
    type: "",
    screen: "",
    avatar: BussinesImages.confuso,
  },
  {
    module: 4,
    id: "47",
    title: "Responda",
    type: "",
    screen: "",
    avatar: BussinesImages.mensagem2,
  },
  //modulo 6
  {
    module: 5,
    id: "48",
    title: "Vocabulário",
    type: "",
    screen: "",
    avatar: BussinesImages.livro,
  },
  {
    module: 5,
    id: "49",
    title: "Marcando reunião",
    type: "",
    screen: "",
    avatar: BussinesImages.agenda2,
  },
  {
    module: 5,
    id: "50",
    title: "Confirmando agenda",
    type: "",
    screen: "",
    avatar: BussinesImages.arquivo,
  },
  {
    module: 5,
    id: "51",
    title: "Minuta",
    type: "",
    screen: "",
    avatar: BussinesImages.texto,
  },
  {
    module: 5,
    id: "52",
    title: "Email de agenda",
    type: "",
    screen: "",
    avatar: BussinesImages.carta,
  },
  {
    module: 5,
    id: "53",
    title: "Listen",
    type: "",
    screen: "",
    avatar: BussinesImages.fone,
  },
  {
    module: 5,
    id: "54",
    title: "Expressões chaves",
    type: "",
    screen: "",
    avatar: BussinesImages.lupa2,
  },
  {
    module: 5,
    id: "55",
    title: "listen and complete",
    type: "",
    screen: "",
    avatar: BussinesImages.fone,
  },
  //modulo 7
  {
    module: 6,
    id: "56",
    title: "Apresentando ideias",
    type: "",
    screen: "",
    avatar: BussinesImages.aula3,
  },
  {
    module: 6,
    id: "57",
    title: "Coloque em ordem",
    type: "",
    screen: "",
    avatar: BussinesImages.aula4,
  },
  {
    module: 6,
    id: "58",
    title: "Complete as transições",
    type: "",
    screen: "",
    avatar: BussinesImages.celebro,
  },
  {
    module: 6,
    id: "59",
    title: "informal/formal",
    type: "",
    screen: "",
    avatar: BussinesImages.secretaria,
  },
  {
    module: 6,
    id: "60",
    title: "O que dizer?",
    type: "",
    screen: "",
    avatar: BussinesImages.what,
  },
  //modulo 8
  {
    module: 7,
    id: "61",
    title: "Could you ....?",
    type: "",
    screen: "",
    avatar: BussinesImages.confuso2,
  },
  {
    module: 7,
    id: "62",
    title: "Complete",
    type: "",
    screen: "",
    avatar: BussinesImages.arquivo,
  },
  {
    module: 7,
    id: "63",
    title: "Review",
    type: "",
    screen: "",
    avatar: BussinesImages.recap,
  },
  //modulo 9
  {
    module: 8,
    id: "64",
    title: "Good, but...",
    type: "",
    screen: "",
    avatar: BussinesImages.estrela,
  },
  {
    module: 8,
    id: "65",
    title: "Complete",
    type: "",
    screen: "",
    avatar: BussinesImages.fone,
  },
  //modulo 10
  {
    module: 9,
    id: "66",
    title: "Phone conversation",
    type: "",
    screen: "",
    avatar: BussinesImages.ligacao,
  },
  {
    module: 9,
    id: "67",
    title: "Listen",
    type: "",
    screen: "",
    avatar: BussinesImages.fone,
  },
  {
    module: 9,
    id: "68",
    title: "Pronunciation",
    type: "",
    screen: "",
    avatar: BussinesImages.tradutor2,
  },
  {
    module: 9,
    id: "69",
    title: "Call practice",
    type: "",
    screen: "",
    avatar: BussinesImages.telefone,
  },
  //modulo 11
  {
    module: 10,
    id: "70",
    title: "Listen",
    type: "",
    screen: "",
    avatar: BussinesImages.fone,
  },
  {
    module: 10,
    id: "71",
    title: "Vocabulário",
    type: "",
    screen: "",
    avatar: BussinesImages.livro,
  },
  {
    module: 10,
    id: "72",
    title: "Call practice",
    type: "",
    screen: "",
    avatar: BussinesImages.meninolivro,
  },
  {
    module: 10,
    id: "73",
    title: "Dialogue",
    type: "",
    screen: "",
    avatar: BussinesImages.conversa2,
  },
  //modulo 12
  {
    module: 11,
    id: "74",
    title: "Identificando problemas",
    type: "",
    screen: "",
    avatar: BussinesImages.config,
  },
  {
    module: 11,
    id: "75",
    title: "Explicando",
    type: "",
    screen: "",
    avatar: BussinesImages.aula5,
  },
  {
    module: 11,
    id: "76",
    title: "Sugerir soluções",
    type: "",
    screen: "",
    avatar: BussinesImages.ideia2,
  },
  {
    module: 11,
    id: "77",
    title: "Tomando decisões",
    type: "",
    screen: "",
    avatar: BussinesImages.diresao,
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
