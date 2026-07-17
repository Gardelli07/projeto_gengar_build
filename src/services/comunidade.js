import api from "./api";

export async function fetchPosts({ pagina } = {}) {
  const resposta = await api.get("/comunidade/posts", { params: { pagina } });
  return {
    posts: resposta?.posts || [],
    temMais: !!resposta?.tem_mais,
  };
}

export function criarPost(texto, { aulaPrompt, cursoNome } = {}) {
  const body = { texto };
  if (aulaPrompt) body.aula_prompt = aulaPrompt;
  if (cursoNome) body.curso_nome = cursoNome;
  return api.post("/comunidade/posts", body);
}

export function criarPostAudio(arquivoId, { origem, aulaPrompt, cursoNome } = {}) {
  const body = { arquivo_id: arquivoId, origem };
  if (aulaPrompt) body.aula_prompt = aulaPrompt;
  if (cursoNome) body.curso_nome = cursoNome;
  return api.post("/comunidade/posts", body);
}

export function deletarPost(postId) {
  return api.delete(`/comunidade/posts/${postId}`);
}

export function curtirPost(postId) {
  return api.post(`/comunidade/posts/${postId}/curtir`);
}

export function descurtirPost(postId) {
  return api.delete(`/comunidade/posts/${postId}/curtir`);
}

export async function fetchComentarios(postId) {
  const resposta = await api.get(`/comunidade/posts/${postId}/comentarios`);
  return resposta?.comentarios || [];
}

export function enviarComentario(postId, texto) {
  return api.post(`/comunidade/posts/${postId}/comentarios`, { texto });
}

export function deletarComentario(postId, comentarioId) {
  return api.delete(`/comunidade/posts/${postId}/comentarios/${comentarioId}`);
}
