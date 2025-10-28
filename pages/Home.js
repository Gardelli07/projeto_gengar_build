import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
<Text style={{ color: '#fff' }}>
{`⣿⣿⡛⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢱⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠟
⣿⣿⣷⠀⠀⠉⠛⠻⢿⣟⢻⣿⠟⢸⠏⠀⢨⣿⠿⠻⢛⣽⠿⠟⠛⠉⠁⠀⢠⣾
⣿⣿⣿⣇⠀⠀⠀⠀⠀⠈⠀⠈⠀⠀⠀⠀⠈⠁⠀⠀⠁⠀⠀⠀⠀⠀⠀⣰⣿⣿
⣿⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⣿
⣿⡿⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⣰⣿⣿⣿⢿⣿
⣿⣿⣦⡉⠀⠉⠀⠀⠸⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⣠⡾⠀⠀⠀⠀⠉⢁⣴⣿⣿
⣿⣿⣿⡿⠆⠀⠀⠀⠀⠹⣿⣇⣄⠀⠀⠀⢀⣤⣺⡿⠁⠀⠀⠀⠀⠀⣼⣿⣿⣿
⣿⣿⡿⠃⠀⠀⠀⠀⠀⢦⡀⠉⠉⠁⠀⠀⠉⠉⠉⠀⣠⠂⠀⠀⠀⠘⢿⣿⣿⣿
⣿⠏⠠⢀⠀⠀⠀⠀⠀⠘⣇⣿⣏⣿⣿⢸⣿⡇⣿⡇⠃⠀⠀⠀⠀⠀⠀⠹⣿⣿
⠏⠀⠀⠠⡈⠀⠀⠀⠀⠀⠀⠛⠃⠻⠿⠸⠿⠃⠋⠁⠀⠀⠀⠀⠀⠀⠐⠀⠹⣿
⠀⠀⠀⢤⣾⣆⠀⠀⠀⠀⠁⠐⠀⠁⠀⠀⠀⠀⠂⠀⠀⠀⠀⠀⣠⣀⠀⠀⠀⣻
⣶⡀⣇⣾⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⠀⡀⠀⣾
⣿⣿⣿⣿⠿⠿⠛⠓⠀⠀⠀⣦⡀⠀⠀⠀⠀⠀⣤⠂⠀⠀⠘⠉⣫⣽⣷⣇⣾⣿
⣿⣿⣿⣿⣿⣶⣤⣀⠀⠀⢄⡘⠉⠉⠀⠀⠈⠉⢋⡄⠀⠀⠠⠾⢟⣿⣿⣿⣿⣿
⣿⣿⣿⡿⠿⠿⣮⣉⠉⠀⠀⠙⢴⣴⢶⣶⡦⣷⠞⠀⠀⠀⣠⣴⣿⠿⢿⣿⣿⣿
⣿⠟⠛⠀⠀⠀⠀⠈⠑⠦⡀⠀⠀⠈⠈⠁⠁⠁⠀⠀⣀⠜⠋⠁⠀⠀⠀⠻⠿⣿
⣿⠀⣄⠀⠰⣾⣿⣷⡄⢀⡟⡆⠀⢀⠠⠄⠄⠠⣴⣿⡀⢀⣶⣶⣶⡄⠀⢀⡀⢺
⣿⣤⣿⣷⣄⠹⣿⣿⡕⣼⡀⠁⠀⠀⠀⠀⠀⠠⠈⠽⢷⣬⡟⣿⡿⢀⣴⣿⣃⣼
⣿⣿⣿⣿⣿⣿⣿⣿⣆⠈⠁⣿⣦⢀⠀⠀⠀⣴⣿⠀⠀⢦⣴⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⡿⣉⠉⢀⡀⠈⠙⠋⠁⠈⠙⠋⠡⠀⠠⠦⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣷⣏⠁⠀⠀⠙⠻⠟⠋⠀⠀⢀⠚⣹⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⣦⣿⣠⣤⢀⣀⣄⣠⣤⣘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿`}
      </Text>

      <Text style={styles.title}>👻 Bem-vindo ao Loja do Gengar!</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("Produtos")}
        style={styles.button}
        labelStyle={{ color: "#fff", fontWeight: "bold" }}
      >
        Ver Catalogo
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3e3b3b",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6A0DAD",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#6A0DAD",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});
