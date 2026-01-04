import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Button, Card, FAB, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Produtos({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const itensPorPagina = 5;

  async function carregarProdutos() {
    const lista = await db.select();
    setProdutos(lista);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", carregarProdutos);
    return unsubscribe;
  }, [navigation]);

  const totalPaginas = Math.max(1, Math.ceil(produtos.length / itensPorPagina));
  const produtosPaginados = produtos.slice(
    (pagina - 1) * itensPorPagina,
    pagina * itensPorPagina
  );

  const adicionarAoCarrinho = async (id) => {
    try {
      await db.addToCart(id);
      Alert.alert("Carrinho", "Produto adicionado ao carrinho!");
    } catch (e) {
      Alert.alert("Erro", "Não foi possível adicionar ao carrinho.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👿 Itens Gengar</Text>
      <FlatList
        data={produtosPaginados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProdutoDetalhe", { produto: item })
            }
          >
            <Card style={styles.card}>
              <Image source={{ uri: item.imagem }} style={styles.imagem} />
              <Card.Title
                title={item.nome}
                titleStyle={{ color: "#fff" }}
                subtitle={`R$ ${Number(item.preco).toFixed(2)}`}
                subtitleStyle={{ color: "#6A0DAD" }}
                right={() => (
                  <Icon.Button
                    name="cart-plus"
                    backgroundColor="#3e3b3b"
                    underlayColor="transparent"
                    color="#6A0DAD"
                    size={28}
                    onPress={() => adicionarAoCarrinho(item.id)}
                  />
                )}
              />
            </Card>
          </TouchableOpacity>
        )}
        ListFooterComponent={
          totalPaginas > 1 && (
            <View style={styles.pagination}>
              <Button
                mode="outlined"
                disabled={pagina === 1}
                onPress={() => setPagina(pagina - 1)}
                style={styles.pageBtn}
                labelStyle={{ color: "#fff", fontWeight: "bold" }}
              >
                Anterior
              </Button>
              <Text style={{ color: "#fff", marginHorizontal: 10 }}>
                Página {pagina} de {totalPaginas}
              </Text>
              <Button
                mode="outlined"
                disabled={pagina === totalPaginas}
                onPress={() => setPagina(pagina + 1)}
                style={styles.pageBtn}
                labelStyle={{ color: "#fff", fontWeight: "bold" }}
              >
                Próxima
              </Button>
            </View>
          )
        }
        ListEmptyComponent={
          <Text style={{ color: "#fff", textAlign: "center", marginTop: 30 }}>
            Nenhum produto cadastrado.
          </Text>
        }
      />
      <Button
        mode="contained"
        onPress={() => navigation.navigate("AdicionarProduto")}
        style={styles.button}
        labelStyle={{ color: "#fff", fontWeight: "bold" }}
      >
        ➕ Adicionar Produto
      </Button>
      <FAB
        icon="cart"
        style={styles.fab}
        color="#6A0DAD"
        onPress={() => navigation.navigate("Carrinho")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3e3b3b",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#6A0DAD",
    marginBottom: 15,
    textAlign: "center",
  },
  card: {
    marginBottom: 15,
    backgroundColor: "#2b0b45",
    borderRadius: 10,
    overflow: "hidden",
  },
  imagem: {
    width: "100%",
    aspectRatio: 1, // quadrada
    resizeMode: "cover",
  },
  button: {
    backgroundColor: "#6A0DAD",
    marginTop: 10,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  pageBtn: {
    borderColor: "#6A0DAD",
    borderWidth: 1,
    marginHorizontal: 5,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    backgroundColor: "#2b0b45",
    zIndex: 10,
  },
});
