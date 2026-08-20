import api from "./api";

export async function fetchNotificacoes({ pagina } = {}) {
  const resposta = await api.get("/notificacoes", { params: { pagina } });
  return {
    notificacoes: resposta?.notificacoes || [],
    temMais: !!resposta?.tem_mais,
  };
}

export async function fetchContagemNaoLidas() {
  const resposta = await api.get("/notificacoes/nao-lidas/contagem");
  return resposta?.total || 0;
}

export function marcarNotificacaoLida(notificacaoId) {
  return api.post(`/notificacoes/${notificacaoId}/marcar-lida`);
}

export function marcarTodasNotificacoesLidas() {
  return api.post("/notificacoes/marcar-todas-lidas");
}
