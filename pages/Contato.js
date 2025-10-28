import React, { useState } from "react";
import { View, StyleSheet, Text, Alert, Modal } from "react-native";
import { TextInput, Button } from "react-native-paper";

export default function Contato() {
  const [nome, setNome] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [visivel, setVisivel] = useState(false);

  const handleEnviar = () => {
    setVisivel(true);
    setNome("");
    setMensagem("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📞 Fale Conosco</Text>

      <TextInput
        mode="outlined"
        label="Seu Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
        theme={{
          colors: { text: "#fff", placeholder: "#aaa", primary: "#6A0DAD" },
        }}
        textColor="#fff"
      />

      <TextInput
        mode="outlined"
        label="Sua Mensagem"
        value={mensagem}
        onChangeText={setMensagem}
        multiline
        style={styles.input}
        theme={{
          colors: { text: "#fff", placeholder: "#fff", primary: "#6A0DAD" },
        }}
        textColor="#fff"
      />

      <Button
        mode="contained"
        style={styles.button}
        labelStyle={{ color: "#fff", fontWeight: "bold" }}
        onPress={handleEnviar}
      >
        Enviar
      </Button>

      <Modal
        transparent
        visible={visivel}
        animationType="fade"
        onRequestClose={() => setVisivel(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#3e3b3b",
          }}
        >
          <View
            style={{
              backgroundColor: "#3e3b3b",
              padding: 30,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#6A0DAD",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Obrigado pelo feedback
            </Text>
            <Button
              mode="contained"
              style={{
                marginTop: 15,
                backgroundColor: "#6A0DAD",
              }}
              labelStyle={{ color: "#fff" }}
              onPress={() => setVisivel(false)}
            >
              OK
            </Button>
          </View>
        </View>
      </Modal>
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#6A0DAD",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 15,
    backgroundColor: "#2b0b45",
  },
  button: {
    backgroundColor: "#6A0DAD",
  },
});
