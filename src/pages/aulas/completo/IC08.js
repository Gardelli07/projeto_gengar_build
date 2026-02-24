import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TelaBasica() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>IC08</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // centraliza verticalmente
    alignItems: "center", // centraliza horizontalmente
    backgroundColor: "#fff",
  },
  texto: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
