import React, { useEffect } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import CORES from "../util/cores";
import { useAuth } from "../context/AuthContext";
import { syncCourseProgressFromServer } from "../util/courseCatalog";

export default function SplashScreen({ navigation }) {
  const { user, carregando } = useAuth();

  useEffect(() => {
    if (carregando) return;

    let cancelled = false;
    const minDelay = new Promise((resolve) => setTimeout(resolve, 1500));
    // Espera o progresso salvo no backend chegar antes de navegar (com um
    // teto de tempo) para as telas de curso ja abrirem com os dados certos.
    const progressSync = user
      ? Promise.race([
          syncCourseProgressFromServer().catch(() => {}),
          new Promise((resolve) => setTimeout(resolve, 4000)),
        ])
      : Promise.resolve();

    Promise.all([minDelay, progressSync]).then(() => {
      if (cancelled) return;
      if (!user) {
        navigation.replace("Login");
      } else if (!user.teste_nivelamento_concluido) {
        navigation.replace("PlacementFlow");
      } else {
        navigation.replace("Tabs");
      }
    });

    return () => {
      cancelled = true;
    };
  }, [navigation, carregando, user]);

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <Text
        style={{ color: "#000000", fontSize: 24, fontWeight: "bold" }}
      ></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CORES.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 20,
    resizeMode: "contain",
  },
});
