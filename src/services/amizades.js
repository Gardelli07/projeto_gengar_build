import api from "./api";

export async function fetchAmigos() {
  const resposta = await api.get("/amizades");
  return resposta?.amigos || [];
}

export async function fetchPedidos(direcao) {
  const resposta = await api.get("/amizades/pedidos", { params: { direcao } });
  return resposta?.pedidos || [];
}

export function enviarPedidoAmizade(usuarioId) {
  return api.post("/amizades/pedidos", { usuario_id: String(usuarioId) });
}

export function aceitarPedidoAmizade(pedidoId) {
  return api.post(`/amizades/pedidos/${pedidoId}/aceitar`);
}

export function recusarPedidoAmizade(pedidoId) {
  return api.post(`/amizades/pedidos/${pedidoId}/recusar`);
}

export function desfazerAmizade(usuarioId) {
  return api.delete(`/amizades/${usuarioId}`);
}
