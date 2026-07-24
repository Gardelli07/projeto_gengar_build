import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchAulasConcluidas } from "../services/progresso";
import { scopedKey } from "./userScope";
import {
  BUSSINES_STORAGE_KEY,
  bussinesModuleDefs,
  bussinesSampleLessons,
} from "../pages/aulas/bussines";
import {
  BUSSINES_B1_STORAGE_KEY,
  bussinesB1ModuleDefs,
  bussinesB1SampleLessons,
} from "../pages/aulas/bussines/B1";
import {
  INGLES_COMPLETO_STORAGE_KEY,
  inglesModuleDefs,
  inglesSampleLessons,
} from "../pages/aulas/completo/A0-A1";
import {
  INGLES_COMPLETO_STORAGE_KEY as INGLES_COMPLETO_A2_STORAGE_KEY,
  inglesModuleDefs as inglesA2ModuleDefs,
  inglesSampleLessons as inglesA2SampleLessons,
} from "../pages/aulas/completo/A2";
import {
  INGLES_COMPLETO_STORAGE_KEY as INGLES_COMPLETO_B1_STORAGE_KEY,
  inglesModuleDefs as inglesB1ModuleDefs,
  inglesSampleLessons as inglesB1SampleLessons,
} from "../pages/aulas/completo/B1";
import {
  TRAVEL_STORAGE_KEY,
  travelModuleDefs,
  travelSampleLessons,
} from "../pages/aulas/viagem/A1";

export const COURSE_OPTIONS = [
  "Ingles Completo",
  "Bussines English",
  "Ingles para viagem",
];
export const LEVEL_OPTIONS = [
  "Starter",
  "Elementary",
  "Intermediate",
  "Advanced",
];

export const LEVEL_CONFIG = {
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

export const COURSE_CONFIG = {
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

export const BUSINESS_LEVEL_CONFIG = {
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

export const TRAVEL_LEVEL_CONFIG = {
  Starter: {
    folder: "A1",
    routeName: "TravelEnglish",
    storageKey: TRAVEL_STORAGE_KEY,
    moduleDefs: travelModuleDefs,
    lessons: travelSampleLessons,
    available: true,
  },
};

export const COURSE_LEVEL_AVAILABILITY = {
  "Ingles Completo": ["Starter", "Elementary", "Intermediate"],
  "Bussines English": ["Starter", "Intermediate"],
  "Ingles para viagem": ["Starter"],
};

export function getCourseLevelConfig(courseName, level) {
  if (courseName === "Bussines English") {
    return BUSINESS_LEVEL_CONFIG[level] ?? BUSINESS_LEVEL_CONFIG.Starter;
  }
  if (courseName === "Ingles para viagem") {
    return TRAVEL_LEVEL_CONFIG[level] ?? TRAVEL_LEVEL_CONFIG.Starter;
  }
  return LEVEL_CONFIG[level] ?? LEVEL_CONFIG.Starter;
}

export async function loadProgress(storageKey) {
  try {
    const raw = await AsyncStorage.getItem(await scopedKey(storageKey));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

async function mergeCompletedLessonsIntoStorage(storageKey, lessons, completedIds) {
  const relevantIds = lessons
    .map((lesson) => String(lesson.id))
    .filter((id) => completedIds.has(id));
  if (relevantIds.length === 0) return;

  const current = await loadProgress(storageKey);
  const next = { ...current };
  let changed = false;
  for (const id of relevantIds) {
    if (!next[id]) {
      next[id] = true;
      changed = true;
    }
  }
  if (changed) {
    await AsyncStorage.setItem(await scopedKey(storageKey), JSON.stringify(next));
  }
}

// Restaura, a partir do backend, as aulas que o usuario ja concluiu em
// qualquer aparelho/instalacao. So adiciona conclusoes, nunca remove -
// o progresso local continua sendo a fonte de verdade para o que ja foi
// salvo neste aparelho.
export async function syncCourseProgressFromServer() {
  let completedIds;
  try {
    completedIds = new Set(await fetchAulasConcluidas());
  } catch {
    return;
  }
  if (completedIds.size === 0) return;

  const configs = [
    ...Object.values(LEVEL_CONFIG),
    ...Object.values(BUSINESS_LEVEL_CONFIG),
    ...Object.values(TRAVEL_LEVEL_CONFIG),
  ].filter((config) => config.available);

  await Promise.all(
    configs.map((config) =>
      mergeCompletedLessonsIntoStorage(
        config.storageKey,
        config.lessons,
        completedIds,
      ),
    ),
  );
}

export function findLessonByScreen(screen) {
  for (const courseName of COURSE_OPTIONS) {
    for (const level of LEVEL_OPTIONS) {
      if (!COURSE_LEVEL_AVAILABILITY[courseName]?.includes(level)) continue;
      const config = getCourseLevelConfig(courseName, level);
      if (!config.available) continue;
      const lesson = config.lessons.find((item) => item.screen === screen);
      if (lesson) {
        return { lesson, lessons: config.lessons, courseName, level };
      }
    }
  }
  return null;
}

export async function loadGlobalProgressStats() {
  let completed = 0;
  let total = 0;

  for (const level of LEVEL_OPTIONS) {
    const courses = COURSE_OPTIONS.filter((courseName) =>
      COURSE_LEVEL_AVAILABILITY[courseName]?.includes(level),
    );
    for (const courseName of courses) {
      const config = getCourseLevelConfig(courseName, level);
      if (!config.available) continue;
      const progress = await loadProgress(config.storageKey);
      total += config.lessons.length;
      completed += config.lessons.filter(
        (lesson) => progress[lesson.id],
      ).length;
    }
  }

  return { completed, total };
}
