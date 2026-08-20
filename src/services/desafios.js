import api from "./api";

export async function fetchMetasDesafio() {
  const resposta = await api.get("/desafios/metas");
  return resposta?.metas || [];
}

export async function fetchDesafioAtivo() {
  const resposta = await api.get("/desafios/ativo");
  return resposta?.desafio || null;
}

export async function fetchEstatisticasDesafios() {
  const resposta = await api.get("/desafios/estatisticas");
  return {
    total: resposta?.total || 0,
    vitorias: resposta?.vitorias || 0,
    percentualVitorias: resposta?.percentual_vitorias || 0,
  };
}

export async function fetchDesafio(desafioId) {
  const resposta = await api.get(`/desafios/${desafioId}`);
  return resposta?.desafio || null;
}

export async function criarDesafio(amigoId, metaId) {
  const resposta = await api.post("/desafios", { amigo_id: String(amigoId), meta_id: String(metaId) });
  return resposta?.desafio || null;
}

export function aceitarDesafio(desafioId) {
  return api.post(`/desafios/${desafioId}/aceitar`);
}

export function recusarDesafio(desafioId) {
  return api.post(`/desafios/${desafioId}/recusar`);
}

export function cancelarDesafio(desafioId) {
  return api.delete(`/desafios/${desafioId}`);
}
