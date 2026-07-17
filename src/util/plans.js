// Codigos alinhados com a tabela `planos` do backend
// (banco/BANCO_API_SCHEMA_MYSQL_PT_v2.sql). Enquanto App Store e Play Store
// nao estao configuradas, a troca de plano e feita localmente (ver
// AuthContext.upgradeToFullAccessPlan) so para permitir testar o fluxo.
export const PLAN_FREE = "gratuito";
export const PLAN_FULL_ACCESS = "base";

export function getUserPlan(user) {
  return user?.plano || PLAN_FREE;
}

export function hasFullAccess(user) {
  return getUserPlan(user) === PLAN_FULL_ACCESS;
}
