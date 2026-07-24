import React, { useCallback, useState } from "react";
import {
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
import Svg, { Path, Circle } from "react-native-svg";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../services/api";
import { getLevelProgress, XP_PER_LESSON } from "../util/xp";
import { loadGlobalProgressStats } from "../util/courseCatalog";
import { fetchResumoProgresso } from "../services/progresso";
import { hasFullAccess } from "../util/plans";
import CORES from "../util/cores";

/* ---------- ícones ---------- */
const IconEdit = ({ size = 17, color = CORES.PROFILE_BLUE }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <Path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
  </Svg>
);

const IconArrow = ({ size = 17, color = "#16305C" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M5 12h14" />
    <Path d="M12 5l7 7-7 7" />
  </Svg>
);

const IconChevron = ({ size = 18, color = CORES.PROFILE_ARROW }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M9 18l6-6-6-6" />
  </Svg>
);

const IconBell = ({ size = 19, color = CORES.PROFILE_BLUE }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <Path d="M13.7 21a2 2 0 0 1-3.4 0" />
  </Svg>
);

const IconGlobe = ({ size = 19, color = CORES.PROFILE_BLUE }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx={12} cy={12} r={10} />
    <Path d="M2 12h20" />
    <Path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </Svg>
);

const IconShield = ({ size = 19, color = CORES.PROFILE_BLUE }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </Svg>
);

const IconLogout = ({ size = 18, color = CORES.PROFILE_DANGER }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <Path d="M16 17l5-5-5-5" />
    <Path d="M21 12H9" />
  </Svg>
);

const IconCrown = ({ size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={CORES.PROFILE_GOLD}>
    <Path d="M3 6l4.5 4L12 4l4.5 6L21 6l-1.5 12h-15L3 6z" />
  </Svg>
);

const IconCheck = ({ size = 19, color = CORES.PROFILE_GREEN }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx={12} cy={12} r={9} />
    <Path d="M8.5 12.3l2.3 2.3 4.7-4.9" />
  </Svg>
);

/* ---------- linha da seção Conta ---------- */
function Row({ icon, label, right, isLast, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        !isLast && styles.rowBorder,
        pressed && { backgroundColor: "#F7F9FC" },
      ]}
    >
      <View style={styles.rowIcon}>{icon}</View>
      <Text style={styles.rowLabel}>{label}</Text>
      {right}
    </Pressable>
  );
}

const comingSoon = (title) => () => Alert.alert(title, "Em breve.");

export default function ProfileScreen({ navigation }) {
  const { user, signOut, downgradeToFreePlan } = useAuth();
  const fullAccess = hasFullAccess(user);

  const displayName = user?.nome_exibicao?.trim() || user?.login || "Usuário";
  const email = user?.email || user?.login || "";
  const avatarUri = user?.foto_url ? `${API_URL}${user.foto_url}` : null;

  const [totalXp, setTotalXp] = useState(0);
  const [streak, setStreak] = useState(0);

  useFocusRefresh(
    useCallback(async () => {
      const [stats, resumo] = await Promise.all([
        loadGlobalProgressStats(),
        fetchResumoProgresso().catch(() => null),
      ]);
      setTotalXp(stats.completed * XP_PER_LESSON);
      if (resumo) setStreak(resumo.streakAtual);
    }, []),
    navigation,
  );

  const levelProgress = getLevelProgress(totalXp);

  // As lojas ainda nao estao configuradas, entao essa troca de plano e so
  // local (AsyncStorage), pra permitir testar o app com tudo liberado antes
  // da integracao real de compra existir.
  const handlePlanAction = () => {
    if (fullAccess) {
      Alert.alert(
        "Voltar para o Gratuito",
        "A integração com as lojas ainda não está pronta — isso só troca o plano localmente, para teste. Deseja continuar?",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Voltar", onPress: downgradeToFreePlan },
        ],
      );
      return;
    }
    navigation.navigate("Paywall");
  };

  const handleLogout = () => {
    Alert.alert("Sair da conta", "Tem certeza que deseja sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: () => {
          signOut();
          const rootNavigation = navigation.getParent() ?? navigation;
          rootNavigation.reset({ index: 0, routes: [{ name: "Login" }] });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["left", "right"]}>
      <StatusBar barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* hero */}
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
              <Text style={styles.subtitle}>Aprendendo Inglês 🇬🇧</Text>
              <View style={styles.levelBadge}>
                <Text style={styles.levelBadgeText}>Nível {levelProgress.currentLevel}</Text>
              </View>
            </View>
          </View>
          <Pressable style={styles.editBtn} onPress={comingSoon("Editar perfil")}>
            <IconEdit />
            <Text style={styles.editBtnText}>Editar perfil</Text>
          </Pressable>
        </View>

        {/* stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={[styles.statNum, { color: CORES.PROFILE_GREEN }]}>{totalXp}</Text>
            <Text style={styles.statLabel}>XP total</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNum, { color: CORES.PROFILE_NAVY }]}>{levelProgress.currentLevel}</Text>
            <Text style={styles.statLabel}>Nível</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNum, { color: CORES.PROFILE_AMBER }]}>{streak} 🔥</Text>
            <Text style={styles.statLabel}>Sequência</Text>
          </View>
        </View>

        {/* assinatura */}
        <Text style={styles.sectionLabel}>ASSINATURA</Text>
        <View style={styles.planCard}>
          <View style={styles.planBlob} />
          <View style={styles.planTitleRow}>
            <IconCrown />
            <Text style={styles.planTitle}>
              {fullAccess ? "Plano Base (tudo liberado)" : "Plano Gratuito"}
            </Text>
          </View>
          <Text style={styles.planDesc}>
            {fullAccess
              ? "Todas as lições, cursos e níveis estão liberados neste plano de teste."
              : "Desbloqueie lições ilimitadas, correções prioritárias na comunidade e sem anúncios."}
          </Text>
          <Pressable style={styles.planBtn} onPress={handlePlanAction}>
            <Text style={styles.planBtnText}>
              {fullAccess ? "Voltar para o Gratuito" : "Assinar o Premium"}
            </Text>
            <IconArrow />
          </Pressable>
        </View>

        {/* conta */}
        <Text style={styles.sectionLabel}>CONTA</Text>
        <View style={styles.accountCard}>
          <Row
            icon={<IconCheck />}
            label="Conta conectada"
            right={
              <View style={styles.activeChip}>
                <Text style={styles.activeChipText}>Ativo</Text>
              </View>
            }
          />
          {!!email && <Text style={styles.emailUnder}>{email}</Text>}

          <Row icon={<IconBell />} label="Notificações" right={<IconChevron />} onPress={comingSoon("Notificações")} />
          <Row
            icon={<IconGlobe />}
            label="Idioma do app"
            right={
              <View style={styles.rightPair}>
                <Text style={styles.rightValue}>Português</Text>
                <IconChevron />
              </View>
            }
            onPress={comingSoon("Idioma do app")}
          />
          <Row
            icon={<IconShield />}
            label="Privacidade e segurança"
            right={<IconChevron />}
            isLast
            onPress={comingSoon("Privacidade e segurança")}
          />
        </View>

        {/* sair */}
        <Pressable style={styles.logoutBtn} onPress={handleLogout}>
          <IconLogout />
          <Text style={styles.logoutText}>Sair da conta</Text>
        </Pressable>

        <Text style={styles.version}>Lingueto · versão 1.0.4</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function useFocusRefresh(callback, navigation) {
  React.useEffect(() => {
    callback();
    const sub = navigation.addListener("focus", callback);
    return sub;
  }, [callback, navigation]);
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

  scroll: { backgroundColor: CORES.PROFILE_BG, padding: 16, paddingTop: 16, paddingBottom: 28 },

  heroCard: { backgroundColor: CORES.WHITE, borderRadius: 22, padding: 20, paddingTop: 22, ...shadow },
  heroRow: { flexDirection: "row", alignItems: "center", gap: 16 },
  avatar: {
    width: 76, height: 76, borderRadius: 38, backgroundColor: CORES.PROFILE_BLUE,
    alignItems: "center", justifyContent: "center", overflow: "hidden",
  },
  avatarImg: { width: 76, height: 76 },
  avatarInitial: { color: "#fff", fontSize: 32, fontWeight: "900" },
  name: { fontSize: 24, fontWeight: "900", color: CORES.PROFILE_NAVY, lineHeight: 26 },
  subtitle: { fontSize: 14, fontWeight: "700", color: CORES.PROFILE_MUTED, marginTop: 3 },
  levelBadge: {
    alignSelf: "flex-start", backgroundColor: CORES.PROFILE_NAVY, borderRadius: 999,
    paddingVertical: 4, paddingHorizontal: 12, marginTop: 8,
  },
  levelBadgeText: { color: "#fff", fontSize: 12, fontWeight: "800" },
  editBtn: {
    marginTop: 18, borderWidth: 1.5, borderColor: "#DDE5F0", borderRadius: 14,
    paddingVertical: 13, flexDirection: "row", alignItems: "center",
    justifyContent: "center", gap: 8,
  },
  editBtnText: { color: CORES.PROFILE_BLUE, fontSize: 15, fontWeight: "800" },

  statsRow: { flexDirection: "row", gap: 10, marginTop: 14 },
  statCard: {
    flex: 1, backgroundColor: CORES.WHITE, borderRadius: 16, paddingVertical: 14,
    alignItems: "center", ...shadow, shadowOpacity: 0.05,
  },
  statNum: { fontSize: 20, fontWeight: "900" },
  statLabel: { fontSize: 11, fontWeight: "700", color: CORES.PROFILE_MUTED, marginTop: 2 },

  sectionLabel: {
    marginTop: 22, marginBottom: 10, fontSize: 13, fontWeight: "800",
    color: CORES.PROFILE_MUTED, letterSpacing: 0.6,
  },

  planCard: { backgroundColor: CORES.PROFILE_NAVY, borderRadius: 22, padding: 20, overflow: "hidden",
    shadowColor: "#16305C", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.25, shadowRadius: 24, elevation: 6 },
  planBlob: {
    position: "absolute", top: -30, right: -20, width: 120, height: 120,
    borderRadius: 60, backgroundColor: "rgba(110,151,192,0.25)",
  },
  planTitleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  planTitle: { color: "#fff", fontSize: 18, fontWeight: "900" },
  planDesc: { color: "#B9CADF", fontSize: 14, fontWeight: "600", marginTop: 6, lineHeight: 20 },
  planBtn: {
    marginTop: 16, alignSelf: "flex-start", backgroundColor: CORES.PROFILE_GOLD,
    borderRadius: 13, paddingVertical: 13, paddingHorizontal: 20,
    flexDirection: "row", alignItems: "center", gap: 8,
  },
  planBtnText: { color: CORES.PROFILE_NAVY, fontSize: 15, fontWeight: "900" },

  accountCard: { backgroundColor: CORES.WHITE, borderRadius: 20, overflow: "hidden", ...shadow, shadowOpacity: 0.05 },
  row: { flexDirection: "row", alignItems: "center", gap: 14, paddingVertical: 15, paddingHorizontal: 18 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: CORES.PROFILE_BORDER },
  rowIcon: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: CORES.PROFILE_CHIP_BG,
    alignItems: "center", justifyContent: "center",
  },
  rowLabel: { flex: 1, fontSize: 15, fontWeight: "800", color: CORES.PROFILE_NAVY },
  rightPair: { flexDirection: "row", alignItems: "center", gap: 4 },
  rightValue: { fontSize: 14, fontWeight: "700", color: CORES.PROFILE_MUTED_LIGHT },
  activeChip: { backgroundColor: CORES.PROFILE_GREEN_BG, borderRadius: 999, paddingVertical: 4, paddingHorizontal: 10 },
  activeChipText: { fontSize: 12, fontWeight: "800", color: CORES.PROFILE_GREEN },
  emailUnder: {
    marginTop: -8, marginBottom: 4, marginLeft: 68, paddingBottom: 12,
    fontSize: 13, fontWeight: "600", color: CORES.PROFILE_MUTED_LIGHT,
    borderBottomWidth: 1, borderBottomColor: CORES.PROFILE_BORDER,
  },

  logoutBtn: {
    marginTop: 14, backgroundColor: CORES.WHITE, borderRadius: 18, paddingVertical: 16,
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10,
    ...shadow, shadowOpacity: 0.05,
  },
  logoutText: { color: CORES.PROFILE_DANGER, fontSize: 15, fontWeight: "800" },

  version: { textAlign: "center", color: "#B4BFCF", fontSize: 12, fontWeight: "700", marginTop: 18 },
});
