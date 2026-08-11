import api from "./api";

export function fetchAulasPlusRanking() {
  return api
    .get("/aulas-plus/ranking", { authenticated: false })
    .then((resposta) => ({
      trending: resposta?.trending || [],
      destaque: resposta?.destaque || [],
    }));
}

// Cada item vem como { codigo, xp_ganho } - o xp_ganho e o valor REAL que foi
// creditado na conclusao (pode variar por aula, ver CoffeeShopLesson), nao um
// valor fixo de catalogo. Necessario para reconstruir o XP total ao
// sincronizar em um aparelho novo.
export async function fetchAulasPlusConcluidas() {
  const resposta = await api.get("/aulas-plus/concluidas");
  return resposta?.concluidas || [];
}

export function concluirAulaPlus(codigo, xpGanho) {
  return api.post("/aulas-plus/concluir", { codigo, xp_ganho: xpGanho });
}
