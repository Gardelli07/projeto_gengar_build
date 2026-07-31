import api from "./api";

function unwrapUsuario(resposta) {
  const payload = resposta?.dados || resposta?.data || resposta;
  return payload?.usuario || payload;
}

export async function atualizarNomeExibicao(nomeExibicao) {
  const resposta = await api.patch("/usuarios/perfil", {
    nome_exibicao: nomeExibicao,
  });
  return unwrapUsuario(resposta);
}

export async function atualizarFotoPerfil(uri, mimeType) {
  const type = mimeType || "image/jpeg";
  const formData = new FormData();
  formData.append("foto", {
    uri: uri.includes("://") ? uri : `file://${uri}`,
    name: `foto-perfil-${Date.now()}.${type.split("/")[1] || "jpg"}`,
    type,
  });

  const resposta = await api.post("/usuarios/foto", formData);
  return unwrapUsuario(resposta);
}
