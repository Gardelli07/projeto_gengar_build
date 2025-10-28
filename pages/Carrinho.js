import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, FlatList } from "react-native";
import { Text, Button, IconButton } from "react-native-paper";
import * as db from "../db";

export default function Carrinho() {
  const [itens, setItens] = useState([]);

  async function carregar() {
    setItens(await db.getCart());
  }

  useEffect(() => {
    carregar();
  }, []);

  const remover = async (id) => {
    await db.removeFromCart(id);
    carregar();
  };

  const limpar = async () => {
    await db.clearCart();
    carregar();
  };

  const total = itens.reduce((s, i) => s + i.preco * i.quantidade, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Carrinho</Text>
      <FlatList
        data={itens}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.imagem }} style={styles.imagem} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.preco}>
                {item.quantidade} x R$ {Number(item.preco).toFixed(2)}
              </Text>
            </View>
            <IconButton icon="minus" onPress={() => remover(item.produto_id)} />
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ color: "#fff", textAlign: "center", marginTop: 30 }}>
            Carrinho vazio.
          </Text>
        }
      />
      <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>
      <Button mode="contained" style={styles.button} onPress={limpar}>
        Limpar Carrinho
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#3e3b3b", padding: 20 },
  title: { color: "#6A0DAD", fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  item: { flexDirection: "row", alignItems: "center", marginBottom: 15, backgroundColor: "#2b0b45", borderRadius: 8, padding: 8 },
  imagem: { width: 60, height: 60, borderRadius: 8 },
  nome: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  preco: { color: "#6A0DAD", fontSize: 14 },
  total: { color: "#fff", fontSize: 18, fontWeight: "bold", marginTop: 20, textAlign: "center" },
  button: { backgroundColor: "#6A0DAD", marginTop: 10 },
});