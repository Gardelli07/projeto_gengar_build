import { Platform } from "react-native";
import api from "./api";

// Gera um identificador so para preencher os campos que a API exige do
// recibo da loja. Em MODO_SANDBOX_COMPRAS o backend ignora o conteudo desses
// campos (ver compraSandbox em compras.service.ts) — eles so existem aqui
// pra passar pela validacao de formato do endpoint real.
function idSandbox() {
  return `sandbox-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function validarCompraSandbox() {
  const plataforma = Platform.OS === "ios" ? "ios" : "android";

  return api.post("/assinaturas/validar-compra", {
    plataforma,
    token_compra: idSandbox(),
    id_produto: `sandbox_base_${plataforma}`,
    ...(plataforma === "ios" ? { id_transacao: idSandbox() } : {}),
  });
}
