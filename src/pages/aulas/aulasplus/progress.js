import AsyncStorage from "@react-native-async-storage/async-storage";
import { scopedKey } from "../../../util/userScope";
import { concluirAulaPlus, fetchAulasPlusConcluidas } from "../../../services/aulasPlus";
import * as dailyGoals from "../../../util/dailyGoals";
import { aulasPlusLessons } from "./lessons";

const PROGRESS_STORAGE_KEY = "@aulas_plus_progresso";
const LESSON_STATE_PREFIX = "@aulas_plus_lesson_state";

/* ---------------------------------------------------------------------
 * Conclusao de aula: alimenta o carrossel "Continue de onde parou" da
 * AulasPlusHome. So sabe "concluida ou nao" por aula inteira.
 * ------------------------------------------------------------------- */

export async function loadAulasPlusProgress() {
  try {
    const raw = await AsyncStorage.getItem(await scopedKey(PROGRESS_STORAGE_KEY));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

async function saveAulasPlusProgress(progress) {
  await AsyncStorage.setItem(await scopedKey(PROGRESS_STORAGE_KEY), JSON.stringify(progress));
}

// Lista (na ordem do catalogo) das aulas Plus ainda nao concluidas. Plural
// porque a secao "Continue de onde parou" e um carrossel horizontal - quanto
// mais aulas o catalogo tiver, mais cards da pra rolar.
export function getPendingAulasPlusLessons(progressMap) {
  return aulasPlusLessons.filter((lesson) => !progressMap[lesson.id]);
}

// Soma o XP real creditado em cada aula Plus concluida. Derivado do proprio
// mapa de progresso (cada entrada guarda { xpGanho }), entao Home.js e
// Profile.js sempre leem o mesmo numero que foi de fato gravado na conclusao
// - nao um valor fixo de catalogo, e nao um contador separado que podia
// dessincronizar do progresso.
export function getAulasPlusXpTotal(progressMap) {
  return Object.values(progressMap).reduce(
    (total, entry) => total + (entry?.xpGanho || 0),
    0,
  );
}

// Local-first: grava o progresso no aparelho na hora (a UI reage
// imediatamente), guardando o XP REAL creditado nessa conclusao (ver
// getAulasPlusXpTotal). Tambem credita via dailyGoals - isso alimenta as
// metas diarias (ex: "Concluir 1 atividade"), um sistema de bonus separado,
// nao o XP total em si. Depois tenta sincronizar com o backend em
// best-effort. Nao reenvia se a aula ja estava marcada como concluida
// localmente.
export async function recordAulasPlusLessonCompletion(lesson, xpGanho) {
  const progress = await loadAulasPlusProgress();
  if (progress[lesson.id]) return null;

  await saveAulasPlusProgress({ ...progress, [lesson.id]: { xpGanho } });
  dailyGoals.recordLessonCompleted({ xp: xpGanho }).catch(() => {});

  try {
    return await concluirAulaPlus(lesson.id, xpGanho);
  } catch {
    return null;
  }
}

// Restaura, a partir do backend, as aulas Plus que o usuario ja concluiu em
// qualquer aparelho/instalacao - incluindo o XP real de cada uma, para o
// total continuar correto num aparelho novo. So adiciona conclusoes, nunca
// remove - mesmo principio do syncCourseProgressFromServer (courseCatalog.js).
export async function syncAulasPlusProgressFromServer() {
  let concluidas;
  try {
    concluidas = await fetchAulasPlusConcluidas();
  } catch {
    return;
  }
  if (!concluidas || concluidas.length === 0) return;

  const current = await loadAulasPlusProgress();
  const next = { ...current };
  let changed = false;
  for (const { codigo, xp_ganho } of concluidas) {
    if (!next[codigo]) {
      next[codigo] = { xpGanho: xp_ganho };
      changed = true;
    }
  }
  if (changed) await saveAulasPlusProgress(next);
}

/* ---------------------------------------------------------------------
 * Retomar de onde parou DENTRO de uma aula: cada tela decide o que salvar
 * (formato de estado livre, so precisa ser serializavel em JSON). So local
 * no aparelho - parte do estado (uris de audio gravado) so faz sentido
 * neste mesmo aparelho.
 * ------------------------------------------------------------------- */

export async function loadAulasPlusLessonState(lessonId) {
  try {
    const raw = await AsyncStorage.getItem(
      await scopedKey(`${LESSON_STATE_PREFIX}:${lessonId}`),
    );
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function saveAulasPlusLessonState(lessonId, state) {
  try {
    await AsyncStorage.setItem(
      await scopedKey(`${LESSON_STATE_PREFIX}:${lessonId}`),
      JSON.stringify(state),
    );
  } catch {
    // Falha ao salvar o progresso dentro da aula nao deve interromper a licao.
  }
}

export async function clearAulasPlusLessonState(lessonId) {
  try {
    await AsyncStorage.removeItem(await scopedKey(`${LESSON_STATE_PREFIX}:${lessonId}`));
  } catch {
    // Melhor esforco - se nao limpar agora, o proximo save sobrescreve.
  }
}

// Apaga todo o progresso local das Aulas Plus (conclusoes + estado interno
// de cada aula) para o usuario ativo. Usado pelo botao "Resetar aulas
// concluidas" do perfil, junto com clearAllLocalProgress() (courseCatalog.js).
export async function clearAllAulasPlusProgress() {
  await AsyncStorage.removeItem(await scopedKey(PROGRESS_STORAGE_KEY));
  await Promise.all(aulasPlusLessons.map((lesson) => clearAulasPlusLessonState(lesson.id)));
}
