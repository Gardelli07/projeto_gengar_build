import AsyncStorage from "@react-native-async-storage/async-storage";
import { scopedKey } from "./userScope";

// Garante no maximo 1 post de comunidade por slide de exercicio: guarda o
// vinculo slide <-> post criado para nao duplicar quando o usuario refaz a
// aula, mas libera o slide de novo se o post for excluido da comunidade.
const BASE_KEY = "@lingueto:comunidade_slide_posts";

async function readStore() {
  try {
    const raw = await AsyncStorage.getItem(await scopedKey(BASE_KEY));
    const parsed = raw ? JSON.parse(raw) : null;
    return {
      bySlide: parsed?.bySlide || {},
      byPost: parsed?.byPost || {},
    };
  } catch {
    return { bySlide: {}, byPost: {} };
  }
}

async function writeStore(store) {
  await AsyncStorage.setItem(await scopedKey(BASE_KEY), JSON.stringify(store));
}

export async function getSlidePostId(slideKey) {
  if (!slideKey) return null;
  const store = await readStore();
  return store.bySlide[slideKey] || null;
}

export async function markSlidePosted(slideKey, postId) {
  if (!slideKey || postId == null) return;
  const store = await readStore();
  const postIdKey = String(postId);
  store.bySlide[slideKey] = postIdKey;
  store.byPost[postIdKey] = slideKey;
  await writeStore(store);
}

export async function unmarkSlideByPostId(postId) {
  if (postId == null) return;
  const store = await readStore();
  const postIdKey = String(postId);
  const slideKey = store.byPost[postIdKey];
  if (!slideKey) return;
  delete store.byPost[postIdKey];
  if (store.bySlide[slideKey] === postIdKey) {
    delete store.bySlide[slideKey];
  }
  await writeStore(store);
}
