import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text, Alert } from "react-native";
import { Button, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as db from "../db"; // <-- IMPORTA O BANCO

export default function AdicionarProduto({ route, navigation }) {
  const { editar } = route.params || {};
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [imagem, setImagem] = useState(null);

  useEffect(() => {
    if (editar) {
      setNome(editar.nome);
      setDescricao(editar.descricao || "");
      setPreco(editar.preco ? String(editar.preco) : "");
      setImagem(editar.imagem);
    }
  }, [editar]);

  const escolherImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Conceda acesso à galeria para escolher uma imagem.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  };

  const salvarProduto = async () => {
    if (nome.trim() === "" || !imagem || preco.trim() === "") {
      Alert.alert("Atenção", "Preencha o nome, preço e escolha uma imagem.");
      return;
    }
    // Troca vírgula por ponto e remove espaços
    const precoFormatado = preco.replace(",", ".").replace(/[^0-9.]/g, "");
    const precoNumero = Number(precoFormatado);

    if (isNaN(precoNumero) || precoNumero <= 0) {
      Alert.alert("Atenção", "Digite um preço válido maior que zero.");
      return;
    }

    try {
      if (editar) {
        await db.update(editar.id, nome, descricao, precoNumero, imagem);
      } else {
        await db.insert(nome, descricao, precoNumero, imagem);
      }
      navigation.goBack();
    } catch (e) {
      Alert.alert("Erro", "Não foi possível salvar o produto.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{editar ? "✏️ Editar Produto" : "➕ Novo Produto"}</Text>
      <TextInput
        mode="outlined"
        label="Nome do Produto"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
        theme={{
          colors: { text: "#fff", placeholder: "#fff", primary: "#6A0DAD" },
        }}
        textColor="#fff"
      />
      <TextInput
        mode="outlined"
        label="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        style={styles.input}
        theme={{
          colors: { text: "#fff", placeholder: "#fff", primary: "#6A0DAD" },
        }}
        textColor="#fff"
      />
      <TextInput
        mode="outlined"
        label="Preço"
        value={preco}
        onChangeText={setPreco}
        keyboardType="decimal-pad"
        style={styles.input}
        theme={{
          colors: { text: "#fff", placeholder: "#fff", primary: "#6A0DAD" },
        }}
        textColor="#fff"
      />
      <TouchableOpacity style={styles.imgPicker} onPress={escolherImagem}>
        {imagem ? (
          <>
            <Image source={{ uri: imagem }} style={styles.preview} />
            <Text style={styles.chooseText}>📷 Escolher imagem</Text>
          </>
        ) : (
          <Text style={styles.chooseText}>📷 Escolher imagem</Text>
        )}
      </TouchableOpacity>
      <Button
        mode="contained"
        onPress={salvarProduto}
        style={styles.button}
        labelStyle={{ text: "#fff", color: "#fff", fontWeight: "bold" }}
      >
        {editar ? "Salvar Alterações" : "Adicionar Produto"}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  chooseText: {
    position: "absolute",
    color: "#fff", // texto em branco para ficar legível
    fontWeight: "bold",
    alignSelf: "center",
    bottom: 10,
    backgroundColor: "#3e3b3b", // use 6 dígitos ou rgba para segurança
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  container: {
    flex: 1,
    backgroundColor: "#3e3b3b", // corrigido (camelCase) e sem alpha problemático
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6A0DAD",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 10,
    backgroundColor: "#2b0b45",
  },
  imgPicker: {
    backgroundColor: "#2b0b45",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#333",
  },
  preview: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#6A0DAD",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
});

