import api from "./api";

export async function fetchPerfilPublico(usuarioId) {
  const resposta = await api.get(`/usuarios/${usuarioId}`);
  return resposta?.usuario || null;
}
