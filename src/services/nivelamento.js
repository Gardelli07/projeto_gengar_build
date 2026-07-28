import api from "./api";

export function resetarNivelamento() {
  return api.delete("/nivelamento/resetar");
}
