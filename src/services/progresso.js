import api from "./api";

export function concluirAula(conteudoId, acuracia) {
  return api.post("/progresso/concluir-aula", {
    conteudo_id: String(conteudoId),
    acuracia: Math.max(0, Math.min(100, Math.round(acuracia))),
  });
}

export async function fetchAulasConcluidas() {
  const resposta = await api.get("/progresso/aulas-concluidas");
  return resposta?.conteudo_ids || [];
}

export async function fetchResumoProgresso() {
  const resposta = await api.get("/progresso/resumo");
  return {
    streakAtual: resposta?.sequencia?.sequencia_atual ?? 0,
    melhorStreak: resposta?.sequencia?.melhor_sequencia ?? 0,
    xpTotal: resposta?.xp_total ?? 0,
  };
}
