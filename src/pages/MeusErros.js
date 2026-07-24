import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchErrosExercicios } from "../services/erros";
import { findLessonByScreen } from "../util/courseCatalog";
import { parseChaveSlide } from "../util/erroReview";
import CORES from "../util/cores";

const BACK_IMAGE = require("../../assets/seta.png");

function formatData(iso) {
  if (!iso) return "";
  const data = new Date(iso);
  if (Number.isNaN(data.getTime())) return "";
  return data.toLocaleDateString("pt-BR");
}

// Agrupa os erros por aula: se o usuario errou varios slides da mesma
// aula, "Refazer" deve abrir so esses slides, nao a aula inteira.
function buildErrorGroups(erros) {
  const groups = new Map();
  const orphans = [];

  for (const erro of erros) {
    const parsed = parseChaveSlide(erro.chave_slide);
    const found = parsed ? findLessonByScreen(parsed.screen) : null;

    if (!parsed || !found) {
      orphans.push({ key: erro.chave_slide, date: formatData(erro.criado_em) });
      continue;
    }

    const groupKey = found.lesson.screen;
    if (!groups.has(groupKey)) {
      groups.set(groupKey, {
        key: groupKey,
        title: found.lesson.title,
        subtitle: `${found.courseName} · ${found.level}`,
        lesson: found.lesson,
        lessons: found.lessons,
        slideIndexSet: new Set(),
        latestDate: erro.criado_em,
      });
    }

    const group = groups.get(groupKey);
    group.slideIndexSet.add(parsed.slideIndex);
    if (new Date(erro.criado_em) > new Date(group.latestDate)) {
      group.latestDate = erro.criado_em;
    }
  }

  const groupList = [...groups.values()]
    .map((group) => {
      const slideIndices = [...group.slideIndexSet].sort((a, b) => a - b);
      return {
        key: group.key,
        title: group.title,
        subtitle: group.subtitle,
        lesson: group.lesson,
        lessons: group.lessons,
        slideIndices,
        count: slideIndices.length,
        date: formatData(group.latestDate),
        latestDate: group.latestDate,
      };
    })
    .sort((a, b) => new Date(b.latestDate) - new Date(a.latestDate));

  return { groupList, orphans };
}

function useFocusRefresh(callback, navigation) {
  React.useEffect(() => {
    callback();
    const sub = navigation.addListener("focus", callback);
    return sub;
  }, [callback, navigation]);
}

export default function MeusErrosScreen({ navigation }) {
  const [groups, setGroups] = useState([]);
  const [orphans, setOrphans] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusRefresh(
    useCallback(async () => {
      setLoading(true);
      try {
        const lista = await fetchErrosExercicios();
        const { groupList, orphans: orphanList } = buildErrorGroups(lista);
        setGroups(groupList);
        setOrphans(orphanList);
      } catch {
        setGroups([]);
        setOrphans([]);
      } finally {
        setLoading(false);
      }
    }, []),
    navigation,
  );

  const handleRetry = (group) => {
    navigation.navigate(group.lesson.screen, {
      lesson: group.lesson,
      lessons: group.lessons,
      reviewMode: true,
      reviewSlideIndices: group.slideIndices,
    });
  };

  const isEmpty = groups.length === 0 && orphans.length === 0;

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.headerButton}
        >
          <Image source={BACK_IMAGE} style={styles.headerBackImage} />
        </Pressable>
        <Text style={styles.headerTitle}>Meus erros</Text>
        <View style={styles.headerButton} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <ActivityIndicator
            style={{ marginTop: 40 }}
            color={CORES.PROFILE_BLUE}
          />
        ) : isEmpty ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🎉</Text>
            <Text style={styles.emptyTitle}>Nenhum erro por aqui!</Text>
            <Text style={styles.emptyText}>
              Quando você errar um exercício em alguma aula, ele aparece aqui
              para você revisar com uma dica.
            </Text>
          </View>
        ) : (
          <>
            {groups.map((group) => (
              <Pressable
                key={group.key}
                style={({ pressed }) => [
                  styles.card,
                  pressed && styles.cardPressed,
                ]}
                onPress={() => handleRetry(group)}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{group.title}</Text>
                  <Text style={styles.cardSubtitle}>{group.subtitle}</Text>
                  <Text style={styles.cardCount}>
                    {group.count === 1
                      ? "1 exercício para revisar"
                      : `${group.count} exercícios para revisar`}
                  </Text>
                  {!!group.date && (
                    <Text style={styles.cardDate}>
                      Última tentativa em {group.date}
                    </Text>
                  )}
                </View>
                <Text style={styles.cardAction}>Refazer</Text>
              </Pressable>
            ))}

            {orphans.map((orphan) => (
              <View key={orphan.key} style={styles.card}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>Exercício</Text>
                  {!!orphan.date && (
                    <Text style={styles.cardDate}>
                      Última tentativa em {orphan.date}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: CORES.PROFILE_BG },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerButton: { width: 36, height: 36, alignItems: "center", justifyContent: "center" },
  headerBackImage: { width: 20, height: 20, resizeMode: "contain" },
  headerTitle: { fontSize: 18, fontWeight: "900", color: CORES.PROFILE_NAVY },

  scroll: { padding: 16, paddingTop: 4, paddingBottom: 28 },

  emptyState: { alignItems: "center", marginTop: 60, paddingHorizontal: 24 },
  emptyEmoji: { fontSize: 40, marginBottom: 10 },
  emptyTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: CORES.PROFILE_NAVY,
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 14,
    color: CORES.PROFILE_MUTED,
    textAlign: "center",
    lineHeight: 20,
  },

  card: {
    backgroundColor: CORES.WHITE,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#2E4A78",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  cardPressed: { backgroundColor: "#F7F9FC" },
  cardTitle: { fontSize: 15, fontWeight: "800", color: CORES.PROFILE_NAVY },
  cardSubtitle: {
    fontSize: 12,
    fontWeight: "700",
    color: CORES.PROFILE_MUTED_LIGHT,
    marginTop: 2,
  },
  cardCount: {
    fontSize: 13,
    fontWeight: "700",
    color: CORES.PROFILE_BLUE,
    marginTop: 6,
  },
  cardDate: {
    fontSize: 12,
    color: CORES.PROFILE_MUTED,
    marginTop: 4,
  },
  cardAction: {
    fontSize: 13,
    fontWeight: "800",
    color: CORES.PROFILE_BLUE,
    marginLeft: 12,
  },
});
