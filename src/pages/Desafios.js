import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { API_URL } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { fetchAmigos } from "../services/amizades";
import {
  fetchMetasDesafio,
  fetchDesafioAtivo,
  criarDesafio,
  aceitarDesafio,
  recusarDesafio,
  cancelarDesafio,
} from "../services/desafios";
import CORES from "../util/cores";

const IconArrowLeft = ({ size = 20, color = CORES.PROFILE_NAVY }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M19 12H5" />
    <Path d="M12 19l-7-7 7-7" />
  </Svg>
);

function Avatar({ uri, nome, size = 44 }) {
  return (
    <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}>
      {uri ? (
        <Image source={{ uri }} style={{ width: size, height: size }} />
      ) : (
        <Text style={styles.avatarInitial}>{(nome || "U").charAt(0).toUpperCase()}</Text>
      )}
    </View>
  );
}

function diasRestantes(expiraEm) {
  if (!expiraEm) return null;
  const diffMs = new Date(expiraEm).getTime() - Date.now();
  return Math.max(0, Math.ceil(diffMs / 86400000));
}

/* ---------- card do desafio pendente/ativo atual ---------- */
function CardDesafioAtual({ desafio, currentUserId, onAceitar, onRecusar, onCancelar, processando }) {
  const souDesafiado = String(desafio.desafiado.id) === String(currentUserId);
  const souDesafiante = String(desafio.desafiante.id) === String(currentUserId);
  const outro = souDesafiado ? desafio.desafiante : desafio.desafiado;

  return (
    <View style={styles.currentCard}>
      <View style={styles.currentHeader}>
        <Avatar uri={outro.foto_url ? `${API_URL}${outro.foto_url}` : null} nome={outro.nome} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.currentTitle}>{desafio.meta.titulo}</Text>
          <Text style={styles.currentSubtitle}>
            {souDesafiado ? `${outro.nome} te desafiou` : `Você desafiou ${outro.nome}`}
          </Text>
        </View>
      </View>

      <Text style={styles.currentDesc}>{desafio.meta.descricao}</Text>
      <Text style={styles.currentReward}>Vale +{desafio.xp_recompensa} XP</Text>

      {desafio.status === "pendente" && souDesafiado && (
        <View style={styles.currentActions}>
          <Pressable style={[styles.primaryBtn, { flex: 1 }]} onPress={onAceitar} disabled={processando}>
            {processando ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryBtnText}>Aceitar</Text>}
          </Pressable>
          <Pressable style={[styles.mutedBtn, { flex: 1 }]} onPress={onRecusar} disabled={processando}>
            <Text style={styles.mutedBtnText}>Recusar</Text>
          </Pressable>
        </View>
      )}

      {desafio.status === "pendente" && souDesafiante && (
        <View style={styles.currentActions}>
          <View style={[styles.waitingChip, { flex: 1 }]}>
            <Text style={styles.waitingChipText}>Esperando {outro.nome} responder…</Text>
          </View>
          <Pressable style={[styles.mutedBtn, { flex: 1 }]} onPress={onCancelar} disabled={processando}>
            {processando ? <ActivityIndicator color={CORES.PROFILE_MUTED} /> : <Text style={styles.mutedBtnText}>Cancelar</Text>}
          </Pressable>
        </View>
      )}

      {desafio.status === "ativo" && (
        <View style={styles.progressSection}>
          <ProgressoLado nome={desafio.desafiante.nome} progresso={desafio.desafiante.progresso} alvo={desafio.meta.valor_alvo} destaque={souDesafiante} />
          <ProgressoLado nome={desafio.desafiado.nome} progresso={desafio.desafiado.progresso} alvo={desafio.meta.valor_alvo} destaque={souDesafiado} />
          <Text style={styles.expiraText}>
            {diasRestantes(desafio.expira_em)} dia{diasRestantes(desafio.expira_em) === 1 ? "" : "s"} restante{diasRestantes(desafio.expira_em) === 1 ? "" : "s"}
          </Text>
        </View>
      )}
    </View>
  );
}

function ProgressoLado({ nome, progresso, alvo, destaque }) {
  const percent = alvo > 0 ? Math.min(100, (progresso / alvo) * 100) : 0;
  return (
    <View style={{ marginTop: 10 }}>
      <View style={styles.progressLabelRow}>
        <Text style={[styles.progressName, destaque && styles.progressNameMe]}>{destaque ? "Você" : nome}</Text>
        <Text style={styles.progressValue}>{progresso} / {alvo}</Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${Math.max(percent, 3)}%` }, destaque && styles.progressFillMe]} />
      </View>
    </View>
  );
}

/* ---------- seletor de amigo + meta ---------- */
export default function Desafios({ route, navigation }) {
  const { user } = useAuth();
  const currentUserId = user?.id;
  const amigoPreSelecionado = route?.params?.amigoId ?? null;

  const [carregando, setCarregando] = useState(true);
  const [desafioAtual, setDesafioAtual] = useState(null);
  const [amigos, setAmigos] = useState([]);
  const [metas, setMetas] = useState([]);
  const [amigoId, setAmigoId] = useState(amigoPreSelecionado ? String(amigoPreSelecionado) : null);
  const [metaId, setMetaId] = useState(null);
  const [processando, setProcessando] = useState(false);

  const carregar = useCallback(async () => {
    setCarregando(true);
    try {
      const atual = await fetchDesafioAtivo();
      setDesafioAtual(atual);
      if (!atual) {
        const [listaAmigos, listaMetas] = await Promise.all([fetchAmigos(), fetchMetasDesafio()]);
        setAmigos(listaAmigos);
        setMetas(listaMetas);
      }
    } catch {
      // mantem o ultimo estado bom
    } finally {
      setCarregando(false);
    }
  }, []);

  React.useEffect(() => {
    const sub = navigation.addListener("focus", carregar);
    return sub;
  }, [navigation, carregar]);

  const handleAceitar = async () => {
    setProcessando(true);
    try {
      await aceitarDesafio(desafioAtual.id);
      await carregar();
    } catch (error) {
      Alert.alert("Erro", error.message || "Não foi possível aceitar o desafio.");
    } finally {
      setProcessando(false);
    }
  };

  const handleRecusar = async () => {
    setProcessando(true);
    try {
      await recusarDesafio(desafioAtual.id);
      await carregar();
    } catch (error) {
      Alert.alert("Erro", error.message || "Não foi possível recusar o desafio.");
    } finally {
      setProcessando(false);
    }
  };

  const handleCancelar = async () => {
    setProcessando(true);
    try {
      await cancelarDesafio(desafioAtual.id);
      await carregar();
    } catch (error) {
      Alert.alert("Erro", error.message || "Não foi possível cancelar o desafio.");
    } finally {
      setProcessando(false);
    }
  };

  const handleEnviarDesafio = async () => {
    if (!amigoId || !metaId) return;
    setProcessando(true);
    try {
      await criarDesafio(amigoId, metaId);
      await carregar();
    } catch (error) {
      Alert.alert("Erro", error.message || "Não foi possível criar o desafio.");
    } finally {
      setProcessando(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10} style={styles.backBtn}>
          <IconArrowLeft />
        </Pressable>
        <Text style={styles.headerTitle}>Desafios</Text>
        <View style={styles.backBtn} />
      </View>

      {carregando ? (
        <View style={styles.centered}>
          <ActivityIndicator color={CORES.PROFILE_BLUE} />
        </View>
      ) : desafioAtual ? (
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <CardDesafioAtual
            desafio={desafioAtual}
            currentUserId={currentUserId}
            onAceitar={handleAceitar}
            onRecusar={handleRecusar}
            onCancelar={handleCancelar}
            processando={processando}
          />
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {amigos.length === 0 ? (
            <Text style={styles.emptyText}>
              Você ainda não tem amigos pra desafiar. Visite o perfil de alguém na comunidade e adicione.
            </Text>
          ) : (
            <>
              <Text style={styles.sectionLabel}>ESCOLHA UM AMIGO</Text>
              <View style={styles.friendsRow}>
                {amigos.map((amigo) => {
                  const selecionado = String(amigo.id) === String(amigoId);
                  return (
                    <Pressable
                      key={amigo.id}
                      style={styles.friendItem}
                      onPress={() => setAmigoId(String(amigo.id))}
                    >
                      <View style={[styles.friendAvatarWrap, selecionado && styles.friendAvatarWrapActive]}>
                        <Avatar uri={amigo.foto_url ? `${API_URL}${amigo.foto_url}` : null} nome={amigo.nome} size={56} />
                      </View>
                      <Text style={styles.friendName} numberOfLines={1}>{amigo.nome}</Text>
                    </Pressable>
                  );
                })}
              </View>

              <Text style={styles.sectionLabel}>ESCOLHA UMA META</Text>
              {metas.map((meta) => {
                const selecionado = meta.id === metaId;
                return (
                  <Pressable
                    key={meta.id}
                    style={[styles.metaCard, selecionado && styles.metaCardActive]}
                    onPress={() => setMetaId(meta.id)}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={styles.metaTitle}>{meta.titulo}</Text>
                      <Text style={styles.metaDesc}>{meta.descricao}</Text>
                      <Text style={styles.metaMeta}>{meta.prazo_dias} dias de prazo</Text>
                    </View>
                    <Text style={styles.metaXp}>+{meta.xp_recompensa} XP</Text>
                  </Pressable>
                );
              })}

              <Pressable
                style={[styles.sendBtn, (!amigoId || !metaId) && styles.sendBtnDisabled]}
                onPress={handleEnviarDesafio}
                disabled={!amigoId || !metaId || processando}
              >
                {processando ? <ActivityIndicator color="#fff" /> : <Text style={styles.sendBtnText}>Desafiar</Text>}
              </Pressable>
            </>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const shadow = {
  shadowColor: "#2E4A78",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.05,
  shadowRadius: 14,
  elevation: 3,
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: CORES.PROFILE_BG },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: { width: 32, height: 32, alignItems: "center", justifyContent: "center" },
  headerTitle: { fontSize: 16, fontWeight: "800", color: CORES.PROFILE_NAVY },

  centered: { flex: 1, alignItems: "center", justifyContent: "center" },
  scroll: { padding: 16, paddingTop: 4, paddingBottom: 28 },
  emptyText: { color: CORES.PROFILE_MUTED, fontSize: 14, fontWeight: "600", textAlign: "center", marginTop: 30 },

  avatar: {
    backgroundColor: CORES.PROFILE_BLUE, alignItems: "center", justifyContent: "center", overflow: "hidden",
  },
  avatarInitial: { color: "#fff", fontWeight: "900" },

  sectionLabel: {
    marginTop: 18, marginBottom: 10, fontSize: 13, fontWeight: "800",
    color: CORES.PROFILE_MUTED, letterSpacing: 0.6,
  },

  friendsRow: { flexDirection: "row", flexWrap: "wrap", gap: 14 },
  friendItem: { width: 68, alignItems: "center" },
  friendAvatarWrap: { borderRadius: 32, padding: 2, borderWidth: 2, borderColor: "transparent" },
  friendAvatarWrapActive: { borderColor: CORES.PROFILE_BLUE },
  friendName: { fontSize: 11.5, fontWeight: "700", color: CORES.PROFILE_NAVY, marginTop: 4, textAlign: "center" },

  metaCard: {
    flexDirection: "row", alignItems: "center", gap: 10,
    backgroundColor: CORES.WHITE, borderRadius: 16, padding: 14, marginBottom: 10,
    borderWidth: 2, borderColor: "transparent", ...shadow,
  },
  metaCardActive: { borderColor: CORES.PROFILE_BLUE },
  metaTitle: { fontSize: 14.5, fontWeight: "800", color: CORES.PROFILE_NAVY },
  metaDesc: { fontSize: 12.5, fontWeight: "600", color: CORES.PROFILE_MUTED, marginTop: 2 },
  metaMeta: { fontSize: 11.5, fontWeight: "600", color: CORES.PROFILE_MUTED_LIGHT, marginTop: 4 },
  metaXp: { fontSize: 13, fontWeight: "900", color: CORES.PROFILE_GREEN },

  sendBtn: {
    marginTop: 20, backgroundColor: CORES.PROFILE_BLUE, borderRadius: 14,
    paddingVertical: 15, alignItems: "center", justifyContent: "center",
  },
  sendBtnDisabled: { opacity: 0.5 },
  sendBtnText: { color: "#fff", fontSize: 15, fontWeight: "800" },

  currentCard: { backgroundColor: CORES.WHITE, borderRadius: 20, padding: 18, ...shadow },
  currentHeader: { flexDirection: "row", alignItems: "center" },
  currentTitle: { fontSize: 16, fontWeight: "900", color: CORES.PROFILE_NAVY },
  currentSubtitle: { fontSize: 12.5, fontWeight: "600", color: CORES.PROFILE_MUTED, marginTop: 2 },
  currentDesc: { fontSize: 13.5, fontWeight: "600", color: CORES.PROFILE_MUTED, marginTop: 14, lineHeight: 19 },
  currentReward: { fontSize: 13, fontWeight: "900", color: CORES.PROFILE_GREEN, marginTop: 8 },

  currentActions: { flexDirection: "row", gap: 10, marginTop: 18 },
  primaryBtn: { backgroundColor: CORES.PROFILE_BLUE, borderRadius: 14, paddingVertical: 13, alignItems: "center" },
  primaryBtnText: { color: "#fff", fontSize: 14.5, fontWeight: "800" },
  mutedBtn: { backgroundColor: CORES.PROFILE_CHIP_BG, borderRadius: 14, paddingVertical: 13, alignItems: "center" },
  mutedBtnText: { color: CORES.PROFILE_MUTED, fontSize: 14.5, fontWeight: "800" },
  waitingChip: { backgroundColor: CORES.PROFILE_CHIP_BG, borderRadius: 14, paddingVertical: 13, alignItems: "center", justifyContent: "center" },
  waitingChipText: { color: CORES.PROFILE_MUTED, fontSize: 12.5, fontWeight: "700", textAlign: "center" },

  progressSection: { marginTop: 18 },
  progressLabelRow: { flexDirection: "row", justifyContent: "space-between" },
  progressName: { fontSize: 12.5, fontWeight: "700", color: CORES.PROFILE_MUTED },
  progressNameMe: { color: CORES.PROFILE_NAVY, fontWeight: "800" },
  progressValue: { fontSize: 12.5, fontWeight: "700", color: CORES.PROFILE_MUTED },
  progressTrack: { height: 10, borderRadius: 5, backgroundColor: CORES.PROFILE_CHIP_BG, marginTop: 6, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 5, backgroundColor: CORES.PROFILE_ARROW },
  progressFillMe: { backgroundColor: CORES.PROFILE_BLUE },
  expiraText: { fontSize: 12, fontWeight: "700", color: CORES.PROFILE_AMBER, marginTop: 14, textAlign: "center" },
});
