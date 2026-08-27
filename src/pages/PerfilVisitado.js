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
import { fetchPerfilPublico } from "../services/usuarios";
import { enviarPedidoAmizade, aceitarPedidoAmizade, desfazerAmizade } from "../services/amizades";
import { denunciarUsuario } from "../services/denuncias";
import { getLevelProgress } from "../util/xp";
import CORES from "../util/cores";
import ReportSheet from "../components/ReportSheet";

const IconArrowLeft = ({ size = 20, color = CORES.PROFILE_NAVY }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M19 12H5" />
    <Path d="M12 19l-7-7 7-7" />
  </Svg>
);

const IconUserPlus = ({ size = 17, color = "#fff" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <Path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
    <Path d="M19 8v6M22 11h-6" />
  </Svg>
);

const IconCheck = ({ size = 17, color = "#fff" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M20 6L9 17l-5-5" />
  </Svg>
);

const IconFlag = ({ size = 18, color = CORES.PROFILE_NAVY }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <Path d="M4 22V15" />
  </Svg>
);

const IconSwords = ({ size = 17, color = CORES.PROFILE_NAVY }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M14.5 17.5L3 6V3h3l11.5 11.5" />
    <Path d="M13 19l6-6" />
    <Path d="M16 16l4 4" />
    <Path d="M19 21l2-2" />
    <Path d="M21.5 5.5L18 9M18 9l-2.5-2.5L19 3h3v3l-2 2" />
  </Svg>
);

export default function PerfilVisitado({ route, navigation }) {
  const usuarioId = route?.params?.usuarioId;
  const [perfil, setPerfil] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
  const [processandoAcao, setProcessandoAcao] = useState(false);
  const [reportVisible, setReportVisible] = useState(false);
  const [reportSending, setReportSending] = useState(false);

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro(false);
    try {
      const dados = await fetchPerfilPublico(usuarioId);
      setPerfil(dados);
    } catch {
      setErro(true);
    } finally {
      setCarregando(false);
    }
  }, [usuarioId]);

  React.useEffect(() => {
    carregar();
  }, [carregar]);

  const handleAcaoAmizade = async () => {
    if (!perfil || processandoAcao) return;
    setProcessandoAcao(true);
    try {
      if (perfil.relacao === "nenhuma") {
        await enviarPedidoAmizade(perfil.id);
      } else if (perfil.relacao === "pendente_enviado") {
        await desfazerAmizade(perfil.id);
      } else if (perfil.relacao === "pendente_recebido") {
        await aceitarPedidoAmizade(perfil.pedido_id);
      }
      await carregar();
    } catch (error) {
      Alert.alert("Erro", error.message || "Não foi possível completar a ação. Tente novamente.");
    } finally {
      setProcessandoAcao(false);
    }
  };

  const handleSubmitReport = async (motivo, descricao) => {
    if (!perfil) return;
    setReportSending(true);
    try {
      await denunciarUsuario(perfil.id, motivo, descricao);
      setReportVisible(false);
      Alert.alert("Denúncia enviada", "Nossa equipe vai analisar em breve.");
    } catch (error) {
      if (error?.status === 409) {
        Alert.alert("Já denunciado", "Você já denunciou esse usuário.");
      } else {
        Alert.alert("Erro", error.message || "Não foi possível enviar sua denúncia. Tente novamente.");
      }
    } finally {
      setReportSending(false);
    }
  };

  const displayName = perfil?.nome_exibicao?.trim() || "Usuário";
  const avatarUri = perfil?.foto_url ? `${API_URL}${perfil.foto_url}` : null;
  const levelProgress = getLevelProgress(perfil?.xp_total || 0);

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10} style={styles.backBtn}>
          <IconArrowLeft />
        </Pressable>
        <Text style={styles.headerTitle}>Perfil</Text>
        {perfil ? (
          <Pressable onPress={() => setReportVisible(true)} hitSlop={10} style={styles.backBtn}>
            <IconFlag />
          </Pressable>
        ) : (
          <View style={styles.backBtn} />
        )}
      </View>

      {carregando ? (
        <View style={styles.centered}>
          <ActivityIndicator color={CORES.PROFILE_BLUE} />
        </View>
      ) : erro || !perfil ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>Não foi possível carregar esse perfil.</Text>
          <Pressable style={styles.retryBtn} onPress={carregar}>
            <Text style={styles.retryText}>Tentar de novo</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.heroCard}>
            <View style={styles.heroRow}>
              <View style={styles.avatar}>
                {avatarUri ? (
                  <Image source={{ uri: avatarUri }} style={styles.avatarImg} />
                ) : (
                  <Text style={styles.avatarInitial}>{displayName.charAt(0).toUpperCase()}</Text>
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{displayName}</Text>
                <View style={styles.levelBadge}>
                  <Text style={styles.levelBadgeText}>Nível {levelProgress.currentLevel}</Text>
                </View>
              </View>
            </View>

            {perfil.relacao !== "voce_mesmo" && (
              <View style={styles.actionsRow}>
                {perfil.relacao === "nenhuma" && (
                  <Pressable style={[styles.actionBtn, styles.primaryBtn]} onPress={handleAcaoAmizade} disabled={processandoAcao}>
                    {processandoAcao ? <ActivityIndicator color="#fff" /> : (
                      <>
                        <IconUserPlus />
                        <Text style={styles.primaryBtnText}>Adicionar amigo</Text>
                      </>
                    )}
                  </Pressable>
                )}
                {perfil.relacao === "pendente_enviado" && (
                  <Pressable style={[styles.actionBtn, styles.mutedBtn]} onPress={handleAcaoAmizade} disabled={processandoAcao}>
                    {processandoAcao ? <ActivityIndicator color={CORES.PROFILE_MUTED} /> : (
                      <Text style={styles.mutedBtnText}>Pedido enviado · cancelar</Text>
                    )}
                  </Pressable>
                )}
                {perfil.relacao === "pendente_recebido" && (
                  <Pressable style={[styles.actionBtn, styles.primaryBtn]} onPress={handleAcaoAmizade} disabled={processandoAcao}>
                    {processandoAcao ? <ActivityIndicator color="#fff" /> : (
                      <>
                        <IconCheck />
                        <Text style={styles.primaryBtnText}>Aceitar pedido</Text>
                      </>
                    )}
                  </Pressable>
                )}
                {perfil.relacao === "amigos" && (
                  <View style={[styles.actionBtn, styles.friendsChip]}>
                    <IconCheck color={CORES.PROFILE_GREEN} />
                    <Text style={styles.friendsChipText}>Amigos</Text>
                  </View>
                )}
                {perfil.relacao === "amigos" && !perfil.tem_desafio_com_usuario && (
                  <Pressable
                    style={[styles.actionBtn, styles.challengeBtn]}
                    onPress={() => navigation.navigate("Desafios", { amigoId: perfil.id })}
                  >
                    <IconSwords />
                    <Text style={styles.challengeBtnText}>Desafiar</Text>
                  </Pressable>
                )}
              </View>
            )}
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={[styles.statNum, { color: CORES.PROFILE_GREEN }]}>{perfil.xp_total}</Text>
              <Text style={styles.statLabel}>XP total</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statNum, { color: CORES.PROFILE_NAVY }]}>{levelProgress.currentLevel}</Text>
              <Text style={styles.statLabel}>Nível</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statNum, { color: CORES.PROFILE_AMBER }]}>{perfil.streak_atual} 🔥</Text>
              <Text style={styles.statLabel}>Sequência</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={[styles.statNum, { color: CORES.PROFILE_NAVY }]}>{perfil.desafios_total}</Text>
              <Text style={styles.statLabel}>Desafios</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statNum, { color: CORES.PROFILE_GOLD }]}>{perfil.desafios_vitorias}</Text>
              <Text style={styles.statLabel}>Vitórias</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statNum, { color: CORES.PROFILE_GREEN }]}>{perfil.desafios_percentual_vitorias}%</Text>
              <Text style={styles.statLabel}>Aproveitamento</Text>
            </View>
          </View>
        </ScrollView>
      )}

      <ReportSheet
        visible={reportVisible}
        sending={reportSending}
        onClose={() => !reportSending && setReportVisible(false)}
        onSubmit={handleSubmitReport}
      />
    </SafeAreaView>
  );
}

const shadow = {
  shadowColor: "#2E4A78",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.07,
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

  centered: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, gap: 14 },
  errorText: { color: CORES.PROFILE_MUTED, fontSize: 14, fontWeight: "600", textAlign: "center" },
  retryBtn: { backgroundColor: CORES.PROFILE_BLUE, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 20 },
  retryText: { color: "#fff", fontWeight: "800" },

  scroll: { padding: 16, paddingTop: 4, paddingBottom: 28 },

  heroCard: { backgroundColor: CORES.WHITE, borderRadius: 22, padding: 20, ...shadow },
  heroRow: { flexDirection: "row", alignItems: "center", gap: 16 },
  avatar: {
    width: 76, height: 76, borderRadius: 38, backgroundColor: CORES.PROFILE_BLUE,
    alignItems: "center", justifyContent: "center", overflow: "hidden",
  },
  avatarImg: { width: 76, height: 76 },
  avatarInitial: { color: "#fff", fontSize: 32, fontWeight: "900" },
  name: { fontSize: 22, fontWeight: "900", color: CORES.PROFILE_NAVY, lineHeight: 25 },
  levelBadge: {
    alignSelf: "flex-start", backgroundColor: CORES.PROFILE_NAVY, borderRadius: 999,
    paddingVertical: 4, paddingHorizontal: 12, marginTop: 8,
  },
  levelBadgeText: { color: "#fff", fontSize: 12, fontWeight: "800" },

  actionsRow: { flexDirection: "row", gap: 10, marginTop: 18, flexWrap: "wrap" },
  actionBtn: {
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8,
    borderRadius: 14, paddingVertical: 13, paddingHorizontal: 16, minHeight: 46,
  },
  primaryBtn: { backgroundColor: CORES.PROFILE_BLUE, flex: 1 },
  primaryBtnText: { color: "#fff", fontSize: 14.5, fontWeight: "800" },
  mutedBtn: { backgroundColor: CORES.PROFILE_CHIP_BG, flex: 1 },
  mutedBtnText: { color: CORES.PROFILE_MUTED, fontSize: 14.5, fontWeight: "800" },
  friendsChip: { backgroundColor: CORES.PROFILE_GREEN_BG, flex: 1 },
  friendsChipText: { color: CORES.PROFILE_GREEN, fontSize: 14.5, fontWeight: "800" },
  challengeBtn: { backgroundColor: CORES.PROFILE_GOLD, flex: 1 },
  challengeBtnText: { color: CORES.PROFILE_NAVY, fontSize: 14.5, fontWeight: "800" },

  statsRow: { flexDirection: "row", gap: 10, marginTop: 14 },
  statCard: {
    flex: 1, backgroundColor: CORES.WHITE, borderRadius: 16, paddingVertical: 14,
    alignItems: "center", ...shadow, shadowOpacity: 0.05,
  },
  statNum: { fontSize: 20, fontWeight: "900" },
  statLabel: { fontSize: 11, fontWeight: "700", color: CORES.PROFILE_MUTED, marginTop: 2 },
});
