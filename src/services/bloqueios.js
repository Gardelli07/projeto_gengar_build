import api from "./api";

export async function fetchBloqueios() {
  const resposta = await api.get("/bloqueios");
  return resposta?.bloqueios || [];
}

export function bloquearUsuario(usuarioId) {
  return api.post("/bloqueios", { usuario_id: String(usuarioId) });
}

export function desbloquearUsuario(usuarioId) {
  return api.delete(`/bloqueios/${usuarioId}`);
}
