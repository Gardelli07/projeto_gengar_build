import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, FONTS } from "./premiumTheme";
import { aulasPlusLessons } from "./lessons";
import { benefits, comingSoonCourses, continueItems, series, trending } from "./premiumMockData";

const { width: SCREEN_W } = Dimensions.get("window");

function ProgressBar({ progress }) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(anim, { toValue: progress, duration: 900, useNativeDriver: false }).start();
  }, [anim, progress]);
  const widthPct = anim.interpolate({ inputRange: [0, 100], outputRange: ["0%", "100%"] });
  return (
    <View style={styles.progressTrack}>
      <Animated.View style={[styles.progressFill, { width: widthPct }]} />
    </View>
  );
}

function PulsingBadge({ children, style }) {
  const scale = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.05, duration: 1300, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 1300, useNativeDriver: true }),
      ]),
    ).start();
  }, [scale]);
  return <Animated.View style={[style, { transform: [{ scale }] }]}>{children}</Animated.View>;
}

function CardBg({ image, colors, style, children }) {
  if (image) {
    return (
      <ImageBackground
        source={image}
        style={[style, styles.cardBgClip]}
        imageStyle={{ width: style.width, height: style.height }}
        resizeMode="cover"
      >
        {children}
      </ImageBackground>
    );
  }
  return (
    <LinearGradient colors={colors} style={style}>
      {children}
    </LinearGradient>
  );
}

function WaveBars() {
  const bars = useRef([0, 1, 2, 3, 4].map(() => new Animated.Value(0))).current;
  useEffect(() => {
    const loops = bars.map((bar, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(bar, { toValue: 1, duration: 550 + i * 60, useNativeDriver: false }),
          Animated.timing(bar, { toValue: 0, duration: 550 + i * 60, useNativeDriver: false }),
        ]),
      ),
    );
    loops.forEach((l) => l.start());
    return () => loops.forEach((l) => l.stop());
  }, [bars]);

  return (
    <View style={styles.waveRow}>
      {bars.map((bar, i) => (
        <Animated.View
          key={i}
          style={[
            styles.waveBar,
            { height: bar.interpolate({ inputRange: [0, 1], outputRange: [6, 24] }) },
          ]}
        />
      ))}
    </View>
  );
}

export default function AulasPlusHome({ navigation }) {
  const goToLesson = (lesson) => navigation.navigate(lesson.screen);
  const goToSeries = (s) => navigation.navigate("AulasPlusSeriesDetail", { seriesId: s.id });
  const goToPaywall = () => navigation.navigate("Paywall");
  const goHome = () => navigation.navigate("Tabs", { screen: "Home" });

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={[COLORS.bg1, COLORS.bg2, COLORS.bg3]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
        <StatusBar barStyle="light-content" />

        <ScrollView contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                <MaterialCommunityIcons name="arrow-left" size={16} color={COLORS.textMuted} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerLeft} onPress={goHome} activeOpacity={0.8}>
                <LinearGradient colors={[COLORS.primary, COLORS.primaryLight]} style={styles.logo}>
                  <Text style={styles.logoText}>L</Text>
                </LinearGradient>
                <Text style={styles.wordmark}>Lingueto</Text>
              </TouchableOpacity>
            </View>
            <PulsingBadge style={styles.premiumBadgeWrap}>
              <LinearGradient colors={[COLORS.gold, COLORS.goldDark]} style={styles.premiumBadge}>
                <MaterialCommunityIcons name="crown" size={12} color="#241a00" />
                <Text style={styles.premiumBadgeText}>PREMIUM</Text>
              </LinearGradient>
            </PulsingBadge>
          </View>

          {/* Search */}
          <View style={styles.searchWrap}>
            <View style={styles.searchBox}>
              <MaterialCommunityIcons name="magnify" size={16} color={COLORS.textFaint} />
              <TextInput
                placeholder="Buscar aulas, cursos, séries..."
                placeholderTextColor={COLORS.textFaint}
                style={styles.searchInput}
                editable={false}
              />
            </View>
          </View>

          {/* Hero */}
          <View style={styles.heroCard}>
            <LinearGradient
              colors={["#3A4BC7", "#24308f", "#141726"]}
              start={{ x: 0.1, y: 0 }}
              end={{ x: 0.8, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.heroGlow} pointerEvents="none" />
            <View style={styles.heroContent}>
              <View style={styles.heroPill}>
                <MaterialCommunityIcons name="star-four-points" size={11} color={COLORS.text} />
                <Text style={styles.heroPillText}>LINGUETO ORIGINALS</Text>
              </View>
              <Text style={styles.heroTitle}>Domine o inglês{"\n"}como nunca antes.</Text>
              <Text style={styles.heroSubtitle}>
                Aulas premium e conteúdo exclusivo — feitos para quem leva o inglês a sério.
              </Text>
              {aulasPlusLessons.length > 0 && (
                <TouchableOpacity
                  style={styles.heroCta}
                  activeOpacity={0.9}
                  onPress={() => goToLesson(aulasPlusLessons[0])}
                >
                  <LinearGradient colors={[COLORS.gold, COLORS.goldDark]} style={styles.heroCtaBg}>
                    <MaterialCommunityIcons name="play" size={13} color="#241a00" />
                    <Text style={styles.heroCtaText}>Assistir agora</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Continue Learning */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Continue de onde parou</Text>
            <Text style={styles.link}>Ver tudo</Text>
          </View>
          <FlatList
            horizontal
            data={continueItems}
            keyExtractor={(i) => i.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselPad}
            ItemSeparatorComponent={() => <View style={{ width: 14 }} />}
            renderItem={({ item }) => (
              <View style={styles.continueCard}>
                <CardBg image={item.image} colors={item.colors} style={styles.continueThumb}>
                  <View style={styles.playBadge}>
                    <MaterialCommunityIcons name="play" size={11} color="#fff" />
                  </View>
                </CardBg>
                <View style={{ padding: 12 }}>
                  <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                  <Text style={styles.cardSub}>{item.sub}</Text>
                  <ProgressBar progress={item.progress} />
                  <Text style={styles.cardFaint}>{item.minutesLeft} min restantes</Text>
                </View>
              </View>
            )}
          />

          {/* Featured Courses */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Cursos em destaque</Text>
          </View>
          <FlatList
            horizontal
            data={[
              ...aulasPlusLessons.map((l) => ({
                id: l.id,
                title: l.title,
                meta: `${l.subtitle} · ${l.duration}`,
                tag: l.tag,
                colors: l.colors,
                image: l.image,
                lesson: l,
              })),
              ...comingSoonCourses,
            ]}
            keyExtractor={(i) => i.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselPad}
            ItemSeparatorComponent={() => <View style={{ width: 14 }} />}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.courseCard}
                activeOpacity={item.lesson ? 0.85 : 1}
                disabled={!item.lesson}
                onPress={() => item.lesson && goToLesson(item.lesson)}
              >
                <CardBg image={item.image} colors={item.colors} style={styles.courseThumb}>
                  {item.tag ? (
                    <View style={styles.tagChip}>
                      <Text style={styles.tagChipText}>{item.tag}</Text>
                    </View>
                  ) : null}
                </CardBg>
                <View style={{ padding: 13 }}>
                  <Text style={[styles.cardTitle, !item.lesson && styles.textMutedTitle]} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.cardSub}>{item.meta}</Text>
                </View>
              </TouchableOpacity>
            )}
          />

          {/* Learning Series */}
          <View style={{ paddingHorizontal: 20, marginBottom: 12 }}>
            <Text style={styles.sectionTitle}>Séries de aprendizado</Text>
            <Text style={styles.sectionSubtitle}>Organizadas em temporadas e episódios</Text>
          </View>
          <View style={{ paddingHorizontal: 20, gap: 12 }}>
            {series.map((s) => (
              <TouchableOpacity key={s.id} style={styles.seriesRow} onPress={() => goToSeries(s)} activeOpacity={0.85}>
                <LinearGradient colors={s.colors} style={styles.seriesThumb} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{s.title}</Text>
                  <Text style={styles.cardSub}>Temporada 1 · {s.episodes} episódios</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={18} color={COLORS.textFaint} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Trending */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>🔥 Em alta essa semana</Text>
          </View>
          <FlatList
            horizontal
            data={trending}
            keyExtractor={(i) => i.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselPad}
            ItemSeparatorComponent={() => <View style={{ width: 14 }} />}
            renderItem={({ item }) => (
              <View style={styles.trendWrap}>
                <Text style={styles.rankNumeral}>{item.rank}</Text>
                <View style={styles.trendCard}>
                  <LinearGradient colors={item.colors} style={styles.trendThumb} />
                  <View style={{ padding: 10 }}>
                    <Text style={styles.cardTitleSm} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.cardFaint}>{item.plays} alunos</Text>
                  </View>
                </View>
              </View>
            )}
          />

          {/* AI Coach */}
          <View style={styles.aiCard}>
            <LinearGradient
              colors={["#4a3f9e", "#241f4a"]}
              style={StyleSheet.absoluteFill}
              start={{ x: 0.2, y: 0 }}
              end={{ x: 0.9, y: 1 }}
            />
            <View style={styles.aiHeaderRow}>
              <View style={styles.aiPill}>
                <MaterialCommunityIcons name="microphone" size={12} color={COLORS.text} />
                <Text style={styles.aiPillText}>AI SPEAKING COACH</Text>
              </View>
              <View style={styles.comingSoonBadge}>
                <Text style={styles.comingSoonText}>EM BREVE</Text>
              </View>
            </View>
            <Text style={styles.aiTitle}>Converse. Erre. Melhore.</Text>
            <Text style={styles.aiSubtitle}>
              Pratique conversas reais em inglês com feedback instantâneo de pronúncia e gramática.
            </Text>
            <Text style={styles.aiDisabledNote}>
              Ainda não disponível — estamos preparando essa novidade para você.
            </Text>
            <WaveBars />
            <View style={styles.aiCtaDisabled}>
              <MaterialCommunityIcons name="lock-outline" size={14} color="rgba(255,255,255,0.6)" />
              <Text style={styles.aiCtaDisabledText}>Em breve</Text>
            </View>
          </View>

          {/* Premium Benefits */}
          <View style={{ paddingHorizontal: 20, marginBottom: 12 }}>
            <Text style={styles.sectionTitle}>Por que ser Premium</Text>
          </View>
          <View style={styles.benefitsGrid}>
            {benefits.map((b) => (
              <View key={b.id} style={styles.benefitCard}>
                <Text style={{ fontSize: 22, marginBottom: 8 }}>{b.emoji}</Text>
                <Text style={styles.benefitTitle}>{b.title}</Text>
                <Text style={styles.benefitDesc}>{b.desc}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Sticky CTA */}
        <View style={styles.stickyFooter}>
          <TouchableOpacity activeOpacity={0.9} onPress={goToPaywall}>
            <LinearGradient colors={[COLORS.gold, COLORS.goldDark]} style={styles.bottomCta}>
              <MaterialCommunityIcons name="crown" size={16} color="#241a00" />
              <Text style={styles.bottomCtaText}>Ativar Lingueto Premium</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const CARD_RADIUS = 16;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg3 },

  cardBgClip: { overflow: "hidden" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 18,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  backBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
  },
  logo: { width: 30, height: 30, borderRadius: 9, alignItems: "center", justifyContent: "center" },
  logoText: { color: "#fff", fontFamily: FONTS.headingXBold, fontSize: 15 },
  wordmark: { color: COLORS.text, fontFamily: FONTS.heading, fontSize: 17 },
  premiumBadgeWrap: { borderRadius: 100 },
  premiumBadge: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 100 },
  premiumBadgeText: { color: "#241a00", fontFamily: FONTS.bodyBold, fontSize: 12.5 },

  searchWrap: { paddingHorizontal: 16, marginBottom: 22 },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  searchInput: { flex: 1, color: COLORS.text, fontFamily: FONTS.body, fontSize: 13.5 },

  heroCard: { marginHorizontal: 16, marginBottom: 28, borderRadius: 24, overflow: "hidden", minHeight: 300 },
  heroGlow: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: COLORS.gold,
    opacity: 0.22,
    top: -70,
    right: -60,
  },
  heroContent: { flex: 1, justifyContent: "flex-end", padding: 22 },
  heroPill: {
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 100,
    marginBottom: 12,
  },
  heroPillText: { color: COLORS.text, fontFamily: FONTS.bodySemi, fontSize: 11.5, letterSpacing: 0.3 },
  heroTitle: { color: COLORS.text, fontFamily: FONTS.headingXBold, fontSize: 27, lineHeight: 32, marginBottom: 8 },
  heroSubtitle: { color: "rgba(255,255,255,0.85)", fontFamily: FONTS.body, fontSize: 14, marginBottom: 18, maxWidth: 280 },
  heroCta: { alignSelf: "flex-start", borderRadius: 14, overflow: "hidden" },
  heroCtaBg: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 22, paddingVertical: 13 },
  heroCtaText: { color: "#241a00", fontFamily: FONTS.heading, fontSize: 14.5 },

  sectionHeaderRow: {
    paddingHorizontal: 20,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  sectionTitle: { color: COLORS.text, fontFamily: FONTS.heading, fontSize: 17 },
  sectionSubtitle: { color: COLORS.textMuted, fontFamily: FONTS.body, fontSize: 12.5, marginTop: 2 },
  link: { color: COLORS.textMuted, fontFamily: FONTS.body, fontSize: 12.5 },
  carouselPad: { paddingHorizontal: 20, paddingBottom: 8 },

  continueCard: { width: 190, borderRadius: CARD_RADIUS, backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.cardBorder, overflow: "hidden" },
  continueThumb: { width: 190, height: 106, justifyContent: "flex-end", alignItems: "flex-end", padding: 8 },
  playBadge: { width: 30, height: 30, borderRadius: 15, backgroundColor: "rgba(0,0,0,0.5)", alignItems: "center", justifyContent: "center" },
  cardTitle: { color: COLORS.text, fontFamily: FONTS.bodyBold, fontSize: 13.5, marginBottom: 4 },
  textMutedTitle: { color: COLORS.textMuted },
  cardTitleSm: { color: COLORS.text, fontFamily: FONTS.bodyBold, fontSize: 12.5, marginBottom: 3 },
  cardSub: { color: COLORS.textMuted, fontFamily: FONTS.body, fontSize: 11.5, marginBottom: 8 },
  cardFaint: { color: COLORS.textFaint, fontFamily: FONTS.body, fontSize: 10.5 },
  progressTrack: { height: 5, borderRadius: 100, backgroundColor: "rgba(255,255,255,0.08)", overflow: "hidden", marginBottom: 6 },
  progressFill: { height: "100%", borderRadius: 100, backgroundColor: COLORS.primary },

  courseCard: { width: 230, borderRadius: 18, backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.cardBorder, overflow: "hidden" },
  courseThumb: { width: 230, height: 128 },
  tagChip: { position: "absolute", top: 10, left: 10, backgroundColor: COLORS.gold, paddingHorizontal: 9, paddingVertical: 3, borderRadius: 100 },
  tagChipText: { color: "#241a00", fontFamily: FONTS.bodyBold, fontSize: 10.5 },

  seriesRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    padding: 12,
    borderRadius: CARD_RADIUS,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  seriesThumb: { width: 64, height: 64, borderRadius: 14 },

  trendWrap: { width: 164, paddingLeft: 22 },
  rankNumeral: {
    position: "absolute",
    left: -6,
    top: 6,
    fontFamily: FONTS.headingXBold,
    fontSize: 56,
    color: "rgba(255,255,255,0.09)",
  },
  trendCard: { borderRadius: 14, overflow: "hidden", backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.cardBorder },
  trendThumb: { height: 90 },

  aiCard: { marginHorizontal: 20, marginBottom: 26, borderRadius: 22, padding: 24, overflow: "hidden" },
  aiHeaderRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 14 },
  aiPill: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "rgba(255,255,255,0.1)", paddingHorizontal: 11, paddingVertical: 5, borderRadius: 100 },
  aiPillText: { color: COLORS.text, fontFamily: FONTS.bodySemi, fontSize: 11 },
  comingSoonBadge: { backgroundColor: COLORS.gold, paddingHorizontal: 11, paddingVertical: 5, borderRadius: 100 },
  comingSoonText: { color: "#241a00", fontFamily: FONTS.bodyBold, fontSize: 11 },
  aiTitle: { color: COLORS.text, fontFamily: FONTS.headingXBold, fontSize: 20, marginBottom: 8 },
  aiSubtitle: { color: "rgba(255,255,255,0.82)", fontFamily: FONTS.body, fontSize: 13.5, marginBottom: 12, maxWidth: 250 },
  aiDisabledNote: { color: COLORS.textMuted, fontFamily: FONTS.body, fontSize: 12, marginBottom: 16 },
  waveRow: { flexDirection: "row", alignItems: "flex-end", gap: 4, height: 26, marginBottom: 18 },
  waveBar: { width: 4, borderRadius: 2, backgroundColor: COLORS.gold },
  aiCtaDisabled: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
  },
  aiCtaDisabledText: { color: "rgba(255,255,255,0.6)", fontFamily: FONTS.bodyBold, fontSize: 13.5 },

  benefitsGrid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 20, gap: 12, marginBottom: 12 },
  benefitCard: {
    width: (SCREEN_W - 40 - 12) / 2,
    borderRadius: CARD_RADIUS,
    padding: 15,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  benefitTitle: { color: COLORS.text, fontFamily: FONTS.bodyBold, fontSize: 13, marginBottom: 3 },
  benefitDesc: { color: COLORS.textMuted, fontFamily: FONTS.body, fontSize: 11, lineHeight: 15 },

  stickyFooter: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 14,
    backgroundColor: "rgba(15,17,30,0.92)",
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
  },
  bottomCta: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 16, paddingVertical: 15 },
  bottomCtaText: { color: "#241a00", fontFamily: FONTS.headingXBold, fontSize: 14.5 },
});
