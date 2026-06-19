import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Svg, { Circle, Text as SvgText, TSpan } from "react-native-svg";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CORES from "../util/cores";
import { LESSON_STREAK_STORAGE_KEY } from "../util/lessonPerformance";
import { getLevelProgress, XP_PER_LESSON } from "../util/xp";
import {
  BUSSINES_STORAGE_KEY,
  bussinesModuleDefs,
  bussinesSampleLessons,
} from "./aulas/bussines";
import {
  BUSSINES_B1_STORAGE_KEY,
  bussinesB1ModuleDefs,
  bussinesB1SampleLessons,
} from "./aulas/bussines/B1";
import {
  INGLES_COMPLETO_STORAGE_KEY,
  inglesModuleDefs,
  inglesSampleLessons,
} from "./aulas/completo/A0-A1";
import {
  INGLES_COMPLETO_STORAGE_KEY as INGLES_COMPLETO_A2_STORAGE_KEY,
  inglesModuleDefs as inglesA2ModuleDefs,
  inglesSampleLessons as inglesA2SampleLessons,
} from "./aulas/completo/A2";
import {
  INGLES_COMPLETO_STORAGE_KEY as INGLES_COMPLETO_B1_STORAGE_KEY,
  inglesModuleDefs as inglesB1ModuleDefs,
  inglesSampleLessons as inglesB1SampleLessons,
} from "./aulas/completo/B1";
import {
  TRAVEL_STORAGE_KEY,
  travelModuleDefs,
  travelSampleLessons,
} from "./aulas/viagem/A1";

const KAIQUE_PHOTO = require("../../assets/Foto kaique.jpeg");

const THEME = {
  bg: "#F5F5F5",
  white: "#FFFFFF",
  textStrong: "#173B6E",
  textSoft: "#7E8DA3",
  green: "#26BA86",
  lightBar: "#DFE5ED",
  border: "#E6ECF3",
};

export const COURSE_OPTIONS = [
  "Ingles Completo",
  "Bussines English",
  "Ingles para viagem",
];
export const LEVEL_OPTIONS = ["Starter", "Elementary", "Intermediate", "Advanced"];

const LEVEL_CONFIG = {
  Starter: {
    folder: "A0-A1",
    routeName: "Inglescompleto",
    storageKey: INGLES_COMPLETO_STORAGE_KEY,
    moduleDefs: inglesModuleDefs,
    lessons: inglesSampleLessons,
    available: true,
  },
  Elementary: {
    folder: "A2",
    routeName: "InglescompletoA2",
    storageKey: INGLES_COMPLETO_A2_STORAGE_KEY,
    moduleDefs: inglesA2ModuleDefs,
    lessons: inglesA2SampleLessons,
    available: true,
  },
  Intermediate: {
    folder: "B1",
    routeName: "InglescompletoB1",
    storageKey: INGLES_COMPLETO_B1_STORAGE_KEY,
    moduleDefs: inglesB1ModuleDefs,
    lessons: inglesB1SampleLessons,
    available: true,
  },
  Advanced: {
    folder: "C1-C2",
    routeName: null,
    storageKey: "@progesso_ingles_completo_C1-C2",
    moduleDefs: [],
    lessons: [],
    available: false,
  },
};

const COURSE_CONFIG = {
  "Ingles Completo": {
    courseId: "ingles_completo",
    defaultLevel: "Starter",
  },
  "Bussines English": {
    courseId: "bussines",
    defaultLevel: "Starter",
  },
  "Ingles para viagem": {
    courseId: "travel",
    defaultLevel: "Starter",
  },
};

const BUSINESS_LEVEL_CONFIG = {
  Starter: {
    folder: "A1",
    routeName: "Bussines",
    storageKey: BUSSINES_STORAGE_KEY,
    moduleDefs: bussinesModuleDefs,
    lessons: bussinesSampleLessons,
    available: true,
  },
  Intermediate: {
    folder: "B1",
    routeName: "BussinesB1",
    storageKey: BUSSINES_B1_STORAGE_KEY,
    moduleDefs: bussinesB1ModuleDefs,
    lessons: bussinesB1SampleLessons,
    available: true,
  },
};

const TRAVEL_LEVEL_CONFIG = {
  Starter: {
    folder: "A1",
    routeName: "TravelEnglish",
    storageKey: TRAVEL_STORAGE_KEY,
    moduleDefs: travelModuleDefs,
    lessons: travelSampleLessons,
    available: true,
  },
};

const COURSE_LEVEL_AVAILABILITY = {
  "Ingles Completo": ["Starter", "Elementary", "Intermediate"],
  "Bussines English": ["Starter", "Intermediate"],
  "Ingles para viagem": ["Starter"],
};

async function loadProgress(storageKey) {
  try {
    const raw = await AsyncStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function ProgressCircle({ percent, size = 70, strokeWidth = 4 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent / 100);

  return (
    <Svg width={size} height={size}>
      <Circle
        stroke="#EAEFF5"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <Circle
        stroke={CORES.PRIMARY}
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
      <SvgText
        x={size / 2}
        y={size / 2 + 6}
        textAnchor="middle"
        fill={THEME.textStrong}
        fontWeight="800"
        fontSize={16}
      >
        {Math.round(percent)}
        <TSpan dx={-1.5}>%</TSpan>
      </SvgText>
    </Svg>
  );
}

export default function Inglescompleto({ navigation, route }) {
  const autoOpenLessonId = route?.params?.autoOpenLessonId;
  const initialCourse = route?.params?.initialCourse ?? null;
  const initialLevel = route?.params?.initialLevel ?? "Starter";
  const openedRef = useRef(false);

  const [progressMap, setProgressMap] = useState({});
  const [openModuleId, setOpenModuleId] = useState(0);
  const [isSectionMenuOpen, setIsSectionMenuOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(initialCourse);
  const [selectedLevel, setSelectedLevel] = useState(initialLevel ?? "Starter");
  const activeLevel = selectedLevel ?? "Starter";
  const activeLevelConfig = LEVEL_CONFIG[activeLevel] ?? LEVEL_CONFIG.Starter;
  const activeBusinessLevelConfig =
    BUSINESS_LEVEL_CONFIG[activeLevel] ?? BUSINESS_LEVEL_CONFIG.Starter;
  const activeTravelLevelConfig =
    TRAVEL_LEVEL_CONFIG[activeLevel] ?? TRAVEL_LEVEL_CONFIG.Starter;
  const isCourseList = !selectedCourse;

  const allLessons = useMemo(
    () => [
      ...inglesSampleLessons,
      ...inglesA2SampleLessons,
      ...inglesB1SampleLessons,
      ...bussinesSampleLessons,
      ...bussinesB1SampleLessons,
      ...travelSampleLessons,
    ],
    [],
  );
  const activeCourseId =
    COURSE_CONFIG[selectedCourse]?.courseId ?? "ingles_completo";
  const activeStorageKey =
    activeCourseId === "bussines"
      ? activeBusinessLevelConfig.storageKey
      : activeCourseId === "travel"
        ? activeTravelLevelConfig.storageKey
      : activeLevelConfig.storageKey;
  const activeModuleDefs = useMemo(() => {
    if (activeCourseId === "bussines") {
      return activeBusinessLevelConfig.moduleDefs;
    }
    if (activeCourseId === "travel") {
      return activeTravelLevelConfig.moduleDefs;
    }
    return activeLevelConfig.moduleDefs;
  }, [
    activeCourseId,
    activeBusinessLevelConfig,
    activeTravelLevelConfig,
    activeLevelConfig,
  ]);
  const activeLessons = useMemo(
    () => {
      if (activeCourseId === "bussines") return activeBusinessLevelConfig.lessons;
      if (activeCourseId === "travel") return activeTravelLevelConfig.lessons;
      return activeLevelConfig.lessons;
    },
    [
      activeCourseId,
      activeBusinessLevelConfig,
      activeTravelLevelConfig,
      activeLevelConfig,
    ],
  );
  const availableCourseOptions = useMemo(
    () =>
      COURSE_OPTIONS.filter((courseName) =>
        COURSE_LEVEL_AVAILABILITY[courseName]?.includes(activeLevel),
      ),
    [activeLevel],
  );

  useEffect(() => {
    const sub = navigation.addListener("focus", async () => {
      const p = await loadProgress(activeStorageKey);
      setProgressMap(p);
    });
    return sub;
  }, [navigation, activeStorageKey]);

  useEffect(() => {
    loadProgress(activeStorageKey).then((p) => setProgressMap(p));
    setOpenModuleId(0);
  }, [activeStorageKey]);

  useEffect(() => {
    if (route?.params?.initialCourse !== undefined) {
      setSelectedCourse(route.params.initialCourse);
    }
    if (route?.params?.initialLevel !== undefined) {
      setSelectedLevel(route.params.initialLevel ?? "Starter");
    }
  }, [route?.params?.initialCourse, route?.params?.initialLevel]);

  useEffect(() => {
    if (!autoOpenLessonId || openedRef.current) return;

    const lesson = activeLessons.find(
      (item) => String(item.id) === String(autoOpenLessonId),
    ) || allLessons.find(
      (item) => String(item.id) === String(autoOpenLessonId),
    );

    if (!lesson) return;

    openedRef.current = true;
    navigation.setParams({ autoOpenLessonId: null });

    requestAnimationFrame(() => {
      const lessonList = activeLessons.some(
        (item) =>
          item.screen === lesson.screen &&
          String(item.id) === String(lesson.id),
      )
        ? activeLessons
        : allLessons;
      navigation.replace(lesson.screen, {
        lesson,
        lessons: lessonList,
      });
    });
  }, [autoOpenLessonId, navigation, allLessons, activeLessons]);

  const totalLessons = activeLessons.length;
  const completedCount = activeLessons.filter(
    (item) => progressMap[item.id],
  ).length;
  const percent = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;
  const totalXp = completedCount * XP_PER_LESSON;
  const levelProgress = useMemo(() => getLevelProgress(totalXp), [totalXp]);

  const lessonsByModule = useMemo(() => {
    return activeModuleDefs.reduce((acc, moduleItem) => {
      acc[moduleItem.id] = activeLessons.filter(
        (lesson) => lesson.module === moduleItem.id,
      );
      return acc;
    }, {});
  }, [activeModuleDefs, activeLessons]);

  const firstPendingLesson =
    activeLessons.find((item) => !progressMap[item.id]) || activeLessons[0];

  const goToLesson = (lesson) => {
    if (!lesson?.screen) return;
    navigation.navigate(lesson.screen, {
      lesson,
      lessons: activeLessons,
    });
  };

  const toggleModule = (moduleItem) => {
    if (moduleItem.locked) return;
    setOpenModuleId((prev) => (prev === moduleItem.id ? null : moduleItem.id));
  };

  const resetAllCompletedLessons = () => {
    Alert.alert(
      "Resetar progresso",
      "Isso vai limpar as aulas concluídas e zerar a sequência. Continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Resetar",
          style: "destructive",
          onPress: async () => {
            await Promise.all([
              AsyncStorage.removeItem(INGLES_COMPLETO_STORAGE_KEY),
              AsyncStorage.removeItem(INGLES_COMPLETO_A2_STORAGE_KEY),
              AsyncStorage.removeItem(INGLES_COMPLETO_B1_STORAGE_KEY),
              AsyncStorage.removeItem(BUSSINES_STORAGE_KEY),
              AsyncStorage.removeItem(BUSSINES_B1_STORAGE_KEY),
              AsyncStorage.removeItem(TRAVEL_STORAGE_KEY),
              AsyncStorage.removeItem(LESSON_STREAK_STORAGE_KEY),
            ]);

            setProgressMap({});
          },
        },
      ],
    );
  };

  const sectionButtonLabel =
    selectedCourse ? `${selectedCourse} - ${activeLevel}` : activeLevel;

  const openCourseFromViewAll = (courseName) => {
    if (!COURSE_LEVEL_AVAILABILITY[courseName]?.includes(activeLevel)) {
      Alert.alert(
        "Curso em breve",
        `${courseName} ainda nao esta disponivel em ${activeLevel}.`,
      );
      return;
    }

    const routeName =
      courseName === "Ingles Completo"
        ? activeLevelConfig.routeName
        : courseName === "Bussines English"
          ? activeBusinessLevelConfig.routeName
          : activeTravelLevelConfig.routeName;

    if (courseName === "Ingles Completo" && !activeLevelConfig.available) {
      Alert.alert(
        "Nivel em breve",
        `${activeLevel} (${activeLevelConfig.folder}) ainda nao tem aulas cadastradas.`,
      );
      return;
    }

    if (routeName) {
      navigation.navigate(routeName, {
        initialCourse: courseName,
        initialLevel: activeLevel,
      });
      return;
    }

    setSelectedCourse(courseName);
    setSelectedLevel(activeLevel);
    setIsSectionMenuOpen(false);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["left", "right"]}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.greetingRow}>
          <View style={styles.avatar}>
            <Image source={KAIQUE_PHOTO} style={styles.avatarImage} />
            <View style={styles.onlineDot} />
          </View>

          <View>
            <Text style={styles.hello}>Hello,</Text>
            <Text style={styles.userName}>Kaique</Text>
          </View>

          <View style={styles.statsArea}>
            <View style={styles.statRow}>
              <MaterialCommunityIcons
                name="star"
                size={14}
                color={CORES.PRIMARY}
              />
              <Text style={styles.statText}>{totalXp.toLocaleString()}</Text>
              <Text style={styles.statLabel}>XP</Text>
            </View>
          </View>
        </View>

        <View style={styles.levelRow}>
          <View style={styles.levelBadge}>
            <Text style={styles.levelBadgeText}>
              {levelProgress.currentLevel}
            </Text>
          </View>
          <Text style={styles.levelText}>
            Level {levelProgress.currentLevel}
          </Text>
        </View>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${Math.max(levelProgress.levelPercent, 8)}%` },
            ]}
          />
        </View>
        <Text style={styles.xpText}>
          {levelProgress.xpInsideLevel} / {levelProgress.levelRange} XP para o
          Nivel {levelProgress.nextLevel}
        </Text>

        <TouchableOpacity
          style={styles.resetProgressButton}
          onPress={resetAllCompletedLessons}
          activeOpacity={0.85}
        >
          <MaterialCommunityIcons
            name="restore"
            size={15}
            color="#C25757"
          />
          <Text style={styles.resetProgressButtonText}>
            Resetar aulas concluídas
          </Text>
        </TouchableOpacity>

        <View style={styles.continueCard}>
          <ProgressCircle percent={percent} />
          <View style={styles.continueTextArea}>
            <Text style={styles.continueLabel}>Continue learning</Text>
            <Text style={styles.continueTitle}>
              {firstPendingLesson
                ? firstPendingLesson.title
                : "All lessons done"}
            </Text>
            <Text style={styles.continueMeta}>8 min + {XP_PER_LESSON} XP</Text>
          </View>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => goToLesson(firstPendingLesson)}
            activeOpacity={0.9}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
            <MaterialCommunityIcons name="arrow-right" size={16} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.dailyGoal}>
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={16}
            color={THEME.green}
          />
          <View style={styles.dailyGoalTextWrap}>
            <Text style={styles.dailyGoalTitle}>Daily Goal</Text>
            <Text style={styles.dailyGoalText}>2 of 3 lessons completed</Text>
          </View>
          <View style={styles.dailyDots}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
          </View>
        </View>

        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Cursos</Text>
          <View style={styles.sectionMenuWrap}>
            <TouchableOpacity
              style={styles.sectionMenuButton}
              onPress={() => {
                if (isSectionMenuOpen) {
                  setIsSectionMenuOpen(false);
                  return;
                }
                setIsSectionMenuOpen(true);
              }}
              activeOpacity={0.85}
            >
              <Text style={styles.sectionAction}>{sectionButtonLabel}</Text>
              <MaterialCommunityIcons
                name={isSectionMenuOpen ? "chevron-up" : "chevron-down"}
                size={16}
                color={CORES.PRIMARY}
              />
            </TouchableOpacity>

            {isSectionMenuOpen && (
              <View style={styles.sectionMenuDropdown}>
                {LEVEL_OPTIONS.map((level) => (
                  <TouchableOpacity
                    key={level}
                    style={styles.sectionMenuItem}
                    onPress={() => {
                      setSelectedLevel(level);
                      setSelectedCourse(null);
                      setIsSectionMenuOpen(false);
                    }}
                    activeOpacity={0.85}
                  >
                    <Text
                      style={[
                        styles.sectionMenuText,
                        activeLevel === level ? styles.sectionMenuTextActive : null,
                      ]}
                    >
                      {level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        {isCourseList
          ? availableCourseOptions.length > 0
            ? availableCourseOptions.map((courseName) => (
                <TouchableOpacity
                  key={courseName}
                  style={styles.moduleButton}
                  onPress={() => openCourseFromViewAll(courseName)}
                  activeOpacity={0.9}
                >
                  <View
                    style={[
                      styles.moduleIconWrap,
                      {
                        backgroundColor:
                          courseName === "Bussines English"
                            ? "#4A9CFF"
                            : courseName === "Ingles para viagem"
                              ? "#26BA86"
                            : THEME.green,
                      },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="book-open-variant"
                      size={16}
                      color="#FFFFFF"
                    />
                  </View>

                  <View style={styles.moduleTextArea}>
                    <Text style={styles.moduleTitle}>{courseName}</Text>
                    <Text style={styles.moduleSubtitle}>
                      {courseName === "Ingles Completo"
                        ? `${activeLevel} - ${activeLevelConfig.folder}`
                        : courseName === "Bussines English"
                          ? `${activeLevel} - ${activeBusinessLevelConfig.folder}`
                          : `${activeLevel} - ${activeTravelLevelConfig.folder}`}
                    </Text>
                  </View>

                  <View style={styles.moduleRight}>
                    <MaterialCommunityIcons
                      name="chevron-right"
                      size={20}
                      color="#8A97AA"
                    />
                  </View>
                </TouchableOpacity>
              ))
            : (
                <View style={styles.emptyCourses}>
                  <Text style={styles.emptyLessonText}>
                    Nenhum curso disponivel em {activeLevel}.
                  </Text>
                </View>
              )
          : activeModuleDefs.map((moduleItem) => {
              const moduleLessons = lessonsByModule[moduleItem.id] || [];
              const moduleCompleted = moduleLessons.filter(
                (l) => progressMap[l.id],
              ).length;
              const modulePercent =
                moduleLessons.length > 0
                  ? Math.round((moduleCompleted / moduleLessons.length) * 100)
                  : 0;
              const isOpen = openModuleId === moduleItem.id;

              return (
                <View key={moduleItem.id}>
                  <TouchableOpacity
                    style={[
                      styles.moduleButton,
                      isOpen && {
                        borderColor: moduleItem.locked
                          ? THEME.border
                          : CORES.PRIMARY,
                      },
                      moduleItem.locked && styles.lockedModule,
                    ]}
                    onPress={() => toggleModule(moduleItem)}
                    activeOpacity={0.9}
                  >
                    <View
                      style={[
                        styles.moduleIconWrap,
                        {
                          backgroundColor: moduleItem.locked
                            ? "#C6CFDB"
                            : moduleItem.accent,
                        },
                      ]}
                    >
                      <MaterialCommunityIcons
                        name={moduleItem.icon}
                        size={16}
                        color="#FFFFFF"
                      />
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
                      <Text
                        style={[
                          styles.moduleSubtitle,
                          moduleItem.locked && styles.lockedText,
                        ]}
                      >
                        {moduleItem.subtitle}
                      </Text>
                    </View>

                    <View style={styles.moduleRight}>
                      <Text
                        style={[
                          styles.modulePercent,
                          moduleItem.locked && styles.lockedText,
                        ]}
                      >
                        {moduleItem.locked ? "0%" : `${modulePercent}%`}
                      </Text>
                      <MaterialCommunityIcons
                        name={isOpen ? "chevron-up" : "chevron-down"}
                        size={20}
                        color={moduleItem.locked ? "#B8C2CF" : "#8A97AA"}
                      />
                    </View>
                  </TouchableOpacity>

                  {isOpen && !moduleItem.locked && (
                    <View style={styles.dropdown}>
                      {moduleLessons.length === 0 && (
                        <View style={styles.emptyLesson}>
                          <Text style={styles.emptyLessonText}>
                            No lessons available.
                          </Text>
                        </View>
                      )}

                      {moduleLessons.map((lesson) => {
                        const done = !!progressMap[lesson.id];

                        return (
                          <TouchableOpacity
                            key={lesson.id}
                            style={styles.lessonButton}
                            onPress={() => goToLesson(lesson)}
                            activeOpacity={0.85}
                          >
                            <View style={styles.lessonLeft}>
                              <MaterialCommunityIcons
                                name={
                                  done ? "check-circle" : "play-circle-outline"
                                }
                                size={18}
                                color={done ? THEME.green : CORES.PRIMARY}
                              />
                              <Text style={styles.lessonText}>
                                {lesson.title}
                              </Text>
                            </View>
                            <MaterialCommunityIcons
                              name="chevron-right"
                              size={18}
                              color="#8A97AA"
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
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  greetingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: CORES.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    position: "relative",
    backgroundColor: THEME.white,
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 99,
    backgroundColor: THEME.green,
    borderWidth: 1.8,
    borderColor: THEME.white,
    position: "absolute",
    right: -1,
    bottom: -1,
  },
  hello: {
    fontSize: 12,
    color: "#8FA0B7",
    fontWeight: "600",
  },
  userName: {
    fontSize: 25,
    color: THEME.textStrong,
    fontWeight: "800",
    marginTop: -2,
  },
  statsArea: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    color: THEME.textStrong,
    fontWeight: "800",
    fontSize: 13,
  },
  statLabel: {
    color: "#9AA5B6",
    fontSize: 11,
    fontWeight: "700",
  },
  levelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  levelBadge: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: THEME.textStrong,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 7,
  },
  levelBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },
  levelText: {
    color: THEME.textStrong,
    fontWeight: "700",
    fontSize: 14,
  },
  progressTrack: {
    width: "100%",
    height: 5,
    borderRadius: 8,
    backgroundColor: THEME.lightBar,
    overflow: "hidden",
    marginTop: 10,
  },
  progressFill: {
    height: "100%",
    borderRadius: 8,
    backgroundColor: CORES.PRIMARY,
  },
  xpText: {
    alignSelf: "flex-end",
    marginTop: 7,
    color: "#8998AB",
    fontSize: 12,
    fontWeight: "600",
  },
  resetProgressButton: {
    marginTop: 14,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#F1CACA",
    backgroundColor: "#FFF5F5",
  },
  resetProgressButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#C25757",
  },
  continueCard: {
    marginTop: 18,
    backgroundColor: THEME.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F1E5DB",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  continueTextArea: {
    flex: 1,
    marginLeft: 12,
  },
  continueLabel: {
    color: "#A0ABC0",
    fontSize: 12,
    fontWeight: "600",
  },
  continueTitle: {
    color: THEME.textStrong,
    fontSize: 19,
    fontWeight: "800",
    marginTop: -1,
  },
  continueMeta: {
    color: "#8D9DB2",
    fontSize: 12,
    marginTop: 3,
    fontWeight: "600",
  },
  continueButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 13,
    backgroundColor: CORES.PRIMARY,
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
  dailyGoal: {
    marginTop: 14,
    borderRadius: 12,
    backgroundColor: "#E8EDF3",
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  dailyGoalTextWrap: {
    marginLeft: 10,
  },
  dailyGoalTitle: {
    color: THEME.textStrong,
    fontSize: 13,
    fontWeight: "700",
  },
  dailyGoalText: {
    marginTop: 2,
    color: "#8C99AE",
    fontSize: 12,
    fontWeight: "600",
  },
  dailyDots: {
    marginLeft: "auto",
    flexDirection: "row",
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: "#BFC8D4",
  },
  dotActive: {
    backgroundColor: CORES.PRIMARY,
  },
  sectionRow: {
    marginTop: 16,
    marginBottom: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: THEME.textStrong,
    fontSize: 24,
    fontWeight: "800",
  },
  sectionAction: {
    color: CORES.PRIMARY,
    fontSize: 13,
    fontWeight: "700",
  },
  sectionMenuWrap: {
    position: "relative",
  },
  sectionMenuButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderColor: CORES.PRIMARY,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#EEF4FF",
  },
  sectionMenuDropdown: {
    position: "absolute",
    top: 40,
    right: 0,
    width: 220,
    backgroundColor: THEME.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: THEME.border,
    overflow: "hidden",
    zIndex: 20,
    elevation: 4,
  },
  sectionMenuItem: {
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  sectionMenuText: {
    color: THEME.textStrong,
    fontSize: 13,
    fontWeight: "600",
  },
  sectionMenuTextActive: {
    color: CORES.PRIMARY,
    fontWeight: "700",
  },
  sectionMenuBackText: {
    color: CORES.PRIMARY,
    fontSize: 13,
    fontWeight: "700",
  },
  sectionMenuBackRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  moduleButton: {
    marginTop: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: THEME.border,
    backgroundColor: THEME.white,
    paddingHorizontal: 12,
    paddingVertical: 11,
    flexDirection: "row",
    alignItems: "center",
  },
  lockedModule: {
    backgroundColor: "#F6F8FA",
    borderColor: "#EBEFF4",
  },
  moduleIconWrap: {
    width: 31,
    height: 31,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  moduleTextArea: {
    flex: 1,
  },
  moduleTitle: {
    color: THEME.textStrong,
    fontSize: 14,
    fontWeight: "800",
  },
  moduleSubtitle: {
    color: "#7D8CA1",
    fontSize: 12,
    marginTop: 2,
    fontWeight: "600",
  },
  moduleRight: {
    marginLeft: 8,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  modulePercent: {
    fontSize: 13,
    fontWeight: "800",
    color: CORES.PRIMARY,
    marginBottom: 2,
  },
  lockedText: {
    color: "#B4BFCC",
  },
  dropdown: {
    marginTop: 8,
    backgroundColor: THEME.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E8EDF4",
    overflow: "hidden",
  },
  emptyLesson: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  emptyCourses: {
    marginTop: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
    backgroundColor: THEME.white,
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  emptyLessonText: {
    color: "#8C99AE",
    fontSize: 12,
    fontWeight: "600",
  },
  lessonButton: {
    paddingHorizontal: 12,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  lessonLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexShrink: 1,
  },
  lessonText: {
    color: "#2E4769",
    fontSize: 13,
    fontWeight: "700",
  },
});
