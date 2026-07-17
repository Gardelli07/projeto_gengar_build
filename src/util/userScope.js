import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_STORAGE_KEY = "@lingueto:user";

// undefined = ainda nao resolvido nesta sessao do app, null = sem usuario logado
let activeUserId;

function extractUserId(user) {
  if (!user) return null;
  return user.id ?? user.usuario_id ?? user.uid ?? user.login ?? user.email ?? null;
}

// Chamado pelo AuthContext sempre que o usuario logado muda (login, logout,
// atualizacao de perfil) para manter o progresso das aulas isolado por conta
// mesmo trocando de usuario sem fechar o app.
export function setActiveUser(user) {
  activeUserId = extractUserId(user);
}

export async function getActiveUserId() {
  if (activeUserId !== undefined) return activeUserId;
  try {
    const raw = await AsyncStorage.getItem(USER_STORAGE_KEY);
    activeUserId = raw ? extractUserId(JSON.parse(raw)) : null;
  } catch {
    activeUserId = null;
  }
  return activeUserId;
}

// Prefixa uma chave de armazenamento com o id do usuario ativo para que o
// progresso de aulas, sequencia, etc. nao seja compartilhado entre contas
// diferentes no mesmo aparelho.
export async function scopedKey(baseKey) {
  const userId = await getActiveUserId();
  return userId ? `${baseKey}::u${userId}` : baseKey;
}
