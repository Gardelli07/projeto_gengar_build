import api from "./api";

let cachedMapPromise = null;

function buildAccessMap(cursos) {
  const map = {};
  for (const curso of cursos || []) {
    for (const nivel of curso.niveis || []) {
      for (const modulo of nivel.modulos || []) {
        for (const aula of modulo.aulas || []) {
          if (aula.nome_tela) map[aula.nome_tela] = !!aula.gratuita;
        }
      }
    }
  }
  return map;
}

export function fetchAulaAccessMap() {
  if (!cachedMapPromise) {
    cachedMapPromise = api
      .get("/conteudos", { authenticated: false })
      .then(buildAccessMap)
      .catch((error) => {
        cachedMapPromise = null;
        throw error;
      });
  }
  return cachedMapPromise;
}
