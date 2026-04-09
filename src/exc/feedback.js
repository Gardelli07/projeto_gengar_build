import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Feedback({ onContinue, continueLabel = "Continuar" }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.badgeWrap}>
          <View style={styles.badgeOuter}>
            <View style={styles.badgeInner}>
              <Ionicons name="checkmark" size={40} color="#FFFFFF" />
            </View>
          </View>
        </View>

        <Text style={styles.title}>Lição Completa!</Text>
        <Text style={styles.subtitle}>
          Você está arrasando! Continue assim.
        </Text>

        <View style={styles.metricsRow}>
          <View style={[styles.metricCard, styles.metricCardBlue]}>
            <Text style={[styles.metricValue, styles.metricValueBlue]}>85</Text>
            <Text style={styles.metricLabel}>XP</Text>
          </View>

          <View style={[styles.metricCard, styles.metricCardOrange]}>
            <Text style={[styles.metricValue, styles.metricValueOrange]}>
              92%
            </Text>
            <Text style={styles.metricLabel}>PRECISÃO</Text>
          </View>

          <View style={[styles.metricCard, styles.metricCardPurple]}>
            <Text style={[styles.metricValue, styles.metricValuePurple]}>
              7 {"\uD83D\uDD25"}
            </Text>
            <Text style={styles.metricLabel}>SEQUÊNCIA</Text>
          </View>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Progresso do Nível</Text>
            <Text style={styles.progressLevel}>Nível 7</Text>
          </View>

          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>

          <View style={styles.progressFooter}>
            <Text style={styles.progressFootText}>1240 XP</Text>
            <Text style={styles.progressFootText}>1,750 XP</Text>
          </View>
        </View>

        <View style={styles.bonusCard}>
          <View style={styles.bonusIconWrap}>
            <MaterialCommunityIcons
              name="lightning-bolt"
              size={14}
              color="#FF8A34"
            />
          </View>

          <View style={styles.bonusContent}>
            <Text style={styles.bonusTitle}>Resposta Rápida!</Text>
            <Text style={styles.bonusText}>
              3 respostas corretas em menos de 5s
            </Text>
          </View>

          <View style={styles.bonusPill}>
            <Text style={styles.bonusPillText}>+15 XP</Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.primaryButton}
          onPress={onContinue}
        >
          <Text style={styles.primaryButtonText}>{continueLabel}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 24,
    alignItems: "center",
  },
  badgeWrap: {
    marginTop: 6,
    marginBottom: 14,
  },
  badgeOuter: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#EAF1FF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#3E79F7",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  badgeInner: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: "#3E79F7",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "800",
    color: "#4381FF",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    color: "#7C8597",
    marginBottom: 24,
    textAlign: "center",
  },
  metricsRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  metricCard: {
    width: "30.5%",
    borderRadius: 13,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
  },
  metricCardBlue: {
    backgroundColor: "#EEF4FF",
    borderColor: "#E4ECFC",
  },
  metricCardOrange: {
    backgroundColor: "#FFF4EC",
    borderColor: "#FFE8D7",
  },
  metricCardPurple: {
    backgroundColor: "#F5F1FF",
    borderColor: "#ECE4FF",
  },
  metricValue: {
    fontSize: 27,
    fontWeight: "800",
    marginBottom: 2,
  },
  metricValueBlue: {
    color: "#4C84FF",
  },
  metricValueOrange: {
    color: "#FF873D",
  },
  metricValuePurple: {
    color: "#8263FF",
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#C0C6D4",
    letterSpacing: 0.4,
  },
  progressSection: {
    width: "100%",
    marginBottom: 26,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 11,
    color: "#76819A",
    fontWeight: "600",
  },
  progressLevel: {
    fontSize: 11,
    color: "#4B7FFF",
    fontWeight: "700",
  },
  progressTrack: {
    width: "100%",
    height: 6,
    borderRadius: 999,
    backgroundColor: "#E4E9F3",
    overflow: "hidden",
    marginBottom: 6,
  },
  progressFill: {
    width: "73%",
    height: "100%",
    backgroundColor: "#346EF1",
    borderRadius: 999,
  },
  progressFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressFootText: {
    fontSize: 10,
    color: "#A0A9BA",
    fontWeight: "500",
  },
  bonusCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF7F1",
    borderWidth: 1,
    borderColor: "#FFE7D9",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 34,
  },
  bonusIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFE9DB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  bonusContent: {
    flex: 1,
    paddingRight: 10,
  },
  bonusTitle: {
    fontSize: 13,
    color: "#3E4352",
    fontWeight: "800",
    marginBottom: 2,
  },
  bonusText: {
    fontSize: 11,
    lineHeight: 16,
    color: "#7E8796",
  },
  bonusPill: {
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#FFE8D8",
  },
  bonusPillText: {
    fontSize: 10,
    color: "#FF8A34",
    fontWeight: "800",
  },
  ratingSection: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
  },
  ratingTitle: {
    fontSize: 11,
    color: "#C1C7D4",
    fontWeight: "700",
    marginBottom: 12,
  },
  starsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  star: {
    marginHorizontal: 2,
  },
  primaryButton: {
    width: "100%",
    height: 54,
    borderRadius: 14,
    backgroundColor: "#356FF1",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#356FF1",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
    marginTop: "auto",
    marginBottom: 12,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  secondaryButton: {
    paddingVertical: 6,
  },
  secondaryButtonText: {
    fontSize: 12,
    color: "#A6ADBB",
    fontWeight: "600",
  },
});
