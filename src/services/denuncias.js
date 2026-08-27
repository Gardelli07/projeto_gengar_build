import api from "./api";

export function denunciarPost(postId, motivo, descricao) {
  return api.post("/denuncias", { tipo_alvo: "post", alvo_id: postId, motivo, descricao });
}

export function denunciarComentario(comentarioId, motivo, descricao) {
  return api.post("/denuncias", { tipo_alvo: "comentario", alvo_id: comentarioId, motivo, descricao });
}

export function denunciarUsuario(usuarioId, motivo, descricao) {
  return api.post("/denuncias", { tipo_alvo: "usuario", alvo_id: usuarioId, motivo, descricao });
}
