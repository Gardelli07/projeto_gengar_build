import React, { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Svg, { Path } from "react-native-svg";
import { fetchContagemNaoLidas } from "../services/notificacoesFeed";
import CORES from "../util/cores";

const IconBell = ({ size = 20, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <Path d="M13.7 21a2 2 0 0 1-3.4 0" />
  </Svg>
);

// Contador atualiza quando a tela que o usa ganha foco - sem push real, o
// jeito de saber de notificacao nova e reabrir/voltar pra essa tela.
export default function NotificationBell({ color = CORES.PROFILE_NAVY, style }) {
  const navigation = useNavigation();
  const [contagem, setContagem] = useState(0);

  useFocusEffect(
    useCallback(() => {
      let ativo = true;
      fetchContagemNaoLidas()
        .then((total) => {
          if (ativo) setContagem(total);
        })
        .catch(() => {});
      return () => {
        ativo = false;
      };
    }, []),
  );

  return (
    <Pressable onPress={() => navigation.navigate("Notificacoes")} style={[styles.wrap, style]} hitSlop={10}>
      <IconBell color={color} />
      {contagem > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{contagem > 9 ? "9+" : contagem}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { width: 32, height: 32, alignItems: "center", justifyContent: "center" },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    paddingHorizontal: 3,
    backgroundColor: CORES.PROFILE_DANGER,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: CORES.WHITE,
  },
  badgeText: { color: "#fff", fontSize: 9.5, fontWeight: "800" },
});
