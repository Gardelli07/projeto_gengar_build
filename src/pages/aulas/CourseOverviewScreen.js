import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CORES from "../../util/cores";

const THEME = {
  bg: "#F5F5F5",
  white: "#FFFFFF",
  textStrong: "#1B2233",
  textSoft: "#7C8292",
  border: "#E8DDD0",
  shadow: "#000000",
};

async function loadProgress(storageKey) {
  try {
    const raw = await AsyncStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export default function CourseOverviewScreen({
  navigation,
  route,
  courseName,
  storageKey,
  moduleDefs,
  lessons,
}) {
  const autoOpenLessonId = route?.params?.autoOpenLessonId;
  const openedRef = useRef(false);
  const [progressMap, setProgressMap] = useState({});
  const [openModuleId, setOpenModuleId] = useState(0);

  useEffect(() => {
    const sub = navigation.addListener("focus", async () => {
      const progress = await loadProgress(storageKey);
      setProgressMap(progress);
    });
    return sub;
  }, [navigation, storageKey]);

  useEffect(() => {
    loadProgress(storageKey).then((progress) => setProgressMap(progress));
  }, [storageKey]);

  useEffect(() => {
    if (!autoOpenLessonId || openedRef.current) return;

    const lesson = lessons.find(
      (item) => String(item.id) === String(autoOpenLessonId),
    );

    if (!lesson?.screen) return;

    openedRef.current = true;
    navigation.setParams({ autoOpenLessonId: null });

    requestAnimationFrame(() => {
      navigation.replace(lesson.screen, {
        lesson,
        lessons,
      });
    });
  }, [autoOpenLessonId, lessons, navigation]);

  const lessonsByModule = useMemo(() => {
    return moduleDefs.reduce((acc, moduleItem) => {
      acc[moduleItem.id] = lessons.filter(
        (lesson) => lesson.module === moduleItem.id,
      );
      return acc;
    }, {});
  }, [lessons, moduleDefs]);

  const goToLesson = (lesson) => {
    if (!lesson?.screen) return;

    navigation.navigate(lesson.screen, {
      lesson,
      lessons,
    });
  };

  const toggleModule = (moduleItem) => {
    if (moduleItem.locked) return;
    setOpenModuleId((prev) => (prev === moduleItem.id ? null : moduleItem.id));
  };

  return (
    <SafeAreaView
      style={styles.safe}
      edges={["top", "left", "right", "bottom"]}
    >
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerBlock}>
          <Text style={styles.courseName}>{courseName}</Text>
        </View>

        {moduleDefs.map((moduleItem) => {
          const moduleLessons = lessonsByModule[moduleItem.id] || [];
          const moduleCompleted = moduleLessons.filter(
            (lesson) => progressMap[lesson.id],
          ).length;
          const isOpen = openModuleId === moduleItem.id;

          return (
            <View key={moduleItem.id} style={styles.moduleWrap}>
              <TouchableOpacity
                style={[
                  styles.moduleCard,
                  moduleItem.locked && styles.moduleCardLocked,
                ]}
                onPress={() => toggleModule(moduleItem)}
                activeOpacity={0.9}
              >
                <View
                  style={[
                    styles.moduleIndex,
                    {
                      backgroundColor: moduleItem.locked
                        ? "#D9DEE7"
                        : moduleItem.accent || "#6C63FF",
                    },
                  ]}
                >
                  <Text style={styles.moduleIndexText}>
                    {moduleItem.id + 1}
                  </Text>
                </View>

                <View style={styles.moduleTextArea}>
                  <Text
                    style={[
                      styles.moduleTitle,
                      moduleItem.locked && styles.lockedText,
                    ]}
                  >
                    {moduleItem.name}
                  </Text>
                  {!moduleItem.locked && (
                    <Text style={styles.moduleMeta}>
                      {moduleCompleted}/{moduleLessons.length} aulas concluidas
                    </Text>
                  )}
                </View>

                <MaterialCommunityIcons
                  name={isOpen ? "chevron-up" : "chevron-down"}
                  size={20}
                  color={moduleItem.locked ? "#B8C2CF" : "#7D8698"}
                />
              </TouchableOpacity>

              {isOpen && !moduleItem.locked && (
                <View style={styles.lessonContainer}>
                  {moduleLessons.map((lesson, index) => {
                    const done = !!progressMap[lesson.id];
                    const isPlayable = !!lesson.screen;
                    const isLast = index === moduleLessons.length - 1;

                    return (
                      <TouchableOpacity
                        key={lesson.id}
                        style={[
                          styles.lessonButton,
                          !isLast && styles.lessonDivider,
                        ]}
                        onPress={() => goToLesson(lesson)}
                        disabled={!isPlayable}
                        activeOpacity={0.85}
                      >
                        <View style={styles.lessonLeft}>
                          <View
                            style={[
                              styles.lessonIndex,
                              done && styles.lessonIndexDone,
                            ]}
                          >
                            <Text
                              style={[
                                styles.lessonIndexText,
                                done && styles.lessonIndexTextDone,
                              ]}
                            >
                              {index + 1}
                            </Text>
                          </View>

                          <View style={styles.lessonTextArea}>
                            <Text
                              style={[
                                styles.lessonTitle,
                                !isPlayable && styles.lockedText,
                              ]}
                            >
                              {lesson.title}
                            </Text>
                          </View>
                        </View>

                        <MaterialCommunityIcons
                          name={done ? "check-circle" : "chevron-right"}
                          size={18}
                          color={
                            done
                              ? "#26BA86"
                              : isPlayable
                                ? "#9AA5B6"
                                : "#CDD3DC"
                          }
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: THEME.bg,
  },
  scroll: {
    flex: 1,
    backgroundColor: THEME.bg,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 40,
  },
  headerBlock: {
    marginBottom: 12,
  },
  courseName: {
    color: THEME.textStrong,
    fontSize: 31,
    fontWeight: "800",
  },
  moduleWrap: {
    marginTop: 12,
  },
  moduleCard: {
    backgroundColor: THEME.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    paddingHorizontal: 14,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: THEME.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  moduleCardLocked: {
    backgroundColor: "#F8F9FB",
  },
  moduleIndex: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  moduleIndexText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
  moduleTextArea: {
    flex: 1,
  },
  moduleTitle: {
    color: THEME.textStrong,
    fontSize: 18,
    fontWeight: "800",
  },
  moduleSubtitle: {
    color: "#51596B",
    fontSize: 13,
    marginTop: 3,
    fontWeight: "600",
  },
  moduleMeta: {
    color: CORES.PRIMARY,
    fontSize: 12,
    marginTop: 6,
    fontWeight: "700",
  },
  lockedText: {
    color: "#B2BCC8",
  },
  lessonContainer: {
    marginTop: 8,
    backgroundColor: THEME.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: THEME.border,
    overflow: "hidden",
  },
  lessonButton: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  lessonDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#EEF1F5",
  },
  lessonLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  lessonIndex: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#E9EDF2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  lessonIndexDone: {
    backgroundColor: "#DCF4EA",
  },
  lessonIndexText: {
    color: "#59667B",
    fontSize: 12,
    fontWeight: "800",
  },
  lessonIndexTextDone: {
    color: "#1D9A6D",
  },
  lessonTextArea: {
    flex: 1,
    paddingRight: 12,
  },
  lessonTitle: {
    color: THEME.textStrong,
    fontSize: 15,
    fontWeight: "400",
  },
  lessonType: {
    color: "#7B8698",
    fontSize: 12,
    marginTop: 2,
    fontWeight: "600",
  },
});
