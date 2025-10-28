import React from "react";
import { View, StyleSheet, Image, Alert } from "react-native";
import { Text, Button } from "react-native-paper";
import * as db from "../db";

export default function ProdutoDetalhe({ route, navigation }) {
  const { produto } = route.params;

  const excluirProduto = async () => {
    Alert.alert("Confirmar exclusão", "Deseja realmente excluir este produto?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          await db.remove(produto.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: produto.imagem }} style={styles.imagem} />
      <Text style={styles.nome}>{produto.nome}</Text>
      <Text style={styles.preco}>R$ {Number(produto.preco).toFixed(2)}</Text>
      <Text style={styles.descricao}>{produto.descricao}</Text>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate("AdicionarProduto", { editar: produto })}
      >
        Editar
      </Button>
      <Button
        mode="contained"
        style={[styles.button, { backgroundColor: "red" }]}
        onPress={excluirProduto}
      >
        Excluir
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#3e3b3b", padding: 20, alignItems: "center" },
  imagem: { width: 200, height: 200, borderRadius: 10, marginBottom: 20 },
  nome: { color: "#6A0DAD", fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  preco: { color: "#fff", fontSize: 20, marginBottom: 10 },
  descricao: { color: "#fff", fontSize: 16, marginBottom: 30, textAlign: "center" },
  button: { backgroundColor: "#6A0DAD", marginTop: 10, width: "100%" },
});