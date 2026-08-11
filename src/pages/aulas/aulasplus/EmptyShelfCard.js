import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, FONTS } from "./premiumTheme";

// Estado "vazio, esperando dado real" para as prateleiras da AulasPlusHome.
// Generaliza o padrao que o card "AI Coach" ja usa nessa mesma tela: em vez
// de a secao inteira sumir quando ainda nao ha dado suficiente, ela continua
// no lugar com um aviso curto.
export default function EmptyShelfCard({ icon = "timer-sand", message, width = 220 }) {
  return (
    <View style={[styles.card, { width }]}>
      <MaterialCommunityIcons name={icon} size={20} color={COLORS.textFaint} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 106,
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: COLORS.cardBorder,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 16,
  },
  text: {
    color: COLORS.textFaint,
    fontFamily: FONTS.body,
    fontSize: 11.5,
    textAlign: "center",
  },
});
