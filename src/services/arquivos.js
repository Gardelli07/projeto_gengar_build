import api from "./api";

function ensureFileScheme(uri) {
  if (!uri || uri.includes("://")) return uri;
  return `file://${uri}`;
}

function extensionFromMime(mimeType) {
  const subtype = mimeType && mimeType.split("/")[1];
  return subtype ? `.${subtype.split(";")[0]}` : "";
}

export function enviarArquivo(uri, { tipo, nome, mimeType, duracaoSegundos } = {}) {
  const formData = new FormData();
  formData.append("arquivo", {
    uri: ensureFileScheme(uri),
    name: nome || `arquivo-${Date.now()}${extensionFromMime(mimeType)}`,
    type: mimeType || "application/octet-stream",
  });
  if (tipo) formData.append("tipo", tipo);
  if (duracaoSegundos != null) {
    formData.append("duracao_segundos", String(Math.round(duracaoSegundos)));
  }
  return api.post("/arquivos", formData);
}
