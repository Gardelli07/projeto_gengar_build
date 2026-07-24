import api from "./api";

export function registrarTentativaExercicio({
  conteudoId,
  chaveSlide,
  tipoExercicio,
  correta,
}) {
  return api.post("/progresso/tentativa-exercicio", {
    conteudo_id: conteudoId != null ? String(conteudoId) : undefined,
    chave_slide: chaveSlide,
    tipo_exercicio: tipoExercicio,
    correta: Boolean(correta),
  });
}

export async function fetchErrosExercicios() {
  const resposta = await api.get("/progresso/erros");
  return resposta?.erros || [];
}
