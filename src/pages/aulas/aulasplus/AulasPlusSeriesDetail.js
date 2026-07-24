import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, FONTS } from "./premiumTheme";
import { series } from "./premiumMockData";

export default function AulasPlusSeriesDetail({ route, navigation }) {
  const { seriesId } = route.params || {};
  const s = series.find((x) => x.id === seriesId);
  if (!s) return null;

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <LinearGradient
            colors={s.colors}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 0.9, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <LinearGradient
            colors={["rgba(15,17,30,0.95)", "rgba(15,17,30,0.35)", "transparent"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
          <SafeAreaView edges={["top"]}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons name="arrow-left" size={18} color="#fff" />
            </TouchableOpacity>
          </SafeAreaView>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>{s.title}</Text>
            <Text style={styles.bannerMeta}>Temporada 1 · {s.episodes} episódios</Text>
          </View>
        </View>

        <View style={styles.episodeList}>
          {s.episodesList.map((ep) => (
            <View key={ep.id} style={styles.epRow}>
              <View style={styles.epThumb}>
                <View style={styles.epPlayBadge}>
                  <MaterialCommunityIcons name="play" size={9} color="#fff" />
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.epTitle} numberOfLines={1}>{ep.title}</Text>
                <Text style={styles.epMeta}>Episódio {ep.n} · {ep.duration}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.footerNote}>
          <MaterialCommunityIcons name="information-outline" size={16} color={COLORS.textFaint} />
          <Text style={styles.footerNoteText}>
            Prévia do catálogo — esta série ainda está em produção.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg3 },
  banner: { height: 220, justifyContent: "flex-end" },
  backBtn: {
    marginTop: 16,
    marginLeft: 16,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerContent: { padding: 22 },
  bannerTitle: { color: COLORS.text, fontFamily: FONTS.headingXBold, fontSize: 22, marginBottom: 4 },
  bannerMeta: { color: "rgba(255,255,255,0.85)", fontFamily: FONTS.body, fontSize: 12.5 },

  episodeList: { padding: 20, gap: 10 },
  epRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 10,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  epThumb: {
    width: 76,
    height: 56,
    borderRadius: 10,
    backgroundColor: COLORS.card,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 4,
  },
  epPlayBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  epTitle: { color: COLORS.text, fontFamily: FONTS.bodyBold, fontSize: 13, marginBottom: 2 },
  epMeta: { color: COLORS.textMuted, fontFamily: FONTS.body, fontSize: 11 },

  footerNote: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 20,
    marginBottom: 30,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: COLORS.cardBorder,
  },
  footerNoteText: { flex: 1, color: COLORS.textFaint, fontFamily: FONTS.body, fontSize: 11.5 },
});
