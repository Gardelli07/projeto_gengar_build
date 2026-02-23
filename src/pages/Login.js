import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import getDB from "../../bd";
import { useAuth } from "../context/AuthContext";
import CORES from "../util/cores";

const { width } = Dimensions.get("window");

/* 🔁 função reutilizável e escalável */
function getHomeRouteByEmpresa(empresa) {
  if (!empresa) return "Home";

  const formatted =
    empresa.charAt(0).toUpperCase() + empresa.slice(1).toLowerCase();

  return `Home${formatted}`;
}

export default function LoginScreen({ navigation }) {
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleSignIn() {
    if (!email.trim() || !senha.trim()) {
      Alert.alert("Atenção", "Preencha email e senha.");
      return;
    }

    try {
      const db = await getDB();

      const result = await db.getFirstAsync(
        "SELECT * FROM Usuario WHERE login = ? AND senha = ?",
        [email, senha],
      );

      if (!result) {
        Alert.alert("Erro", "Usuário ou senha inválidos");
        return;
      }

      // 🔐 salva no contexto
      signIn({
        login: result.login,
        tipo: result.tipo,
        empresa: result.empresa,
      });

      // 🎯 rota dinâmica por empresa
      const homeRoute = getHomeRouteByEmpresa(result.empresa);

      Alert.alert("Sucesso", `Bem-vindo ${result.login}`);

      // 🔁 reset (não volta pro login)
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "Tabs",
            state: {
              routes: [{ name: homeRoute }],
            },
          },
        ],
      });
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Erro ao realizar login");
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>LOGIN</Text>

          <View style={styles.fieldWrap}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="seu@email.com"
              placeholderTextColor="#999"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.fieldWrap}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              value={senha}
              onChangeText={setSenha}
              placeholder="••••••••"
              placeholderTextColor="#999"
              style={styles.input}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSignIn}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <View style={styles.signUpWrap}>
            <Text style={styles.noAccount}>Não tem uma conta?</Text>
            <TouchableOpacity
              onPress={() =>
                Alert.alert("Cadastro", "Tela de cadastro em breve")
              }
            >
              <Text style={styles.signUpText}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ================= ESTILOS ================= */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#e8e8e8",
  },
  container: {
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  logo: {
    width: width,
    height: 250,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 18,
    letterSpacing: 2,
    color: "#000",
    textAlign: "center",
  },
  fieldWrap: {
    width: "100%",
    marginBottom: 18,
  },
  label: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
    color: "#111",
  },
  input: {
    height: 70,
    backgroundColor: "#fff",
    borderWidth: 4,
    borderColor: CORES.SECONDARY,
    paddingHorizontal: 12,
    fontSize: 18,
    borderRadius: 4,
  },
  button: {
    backgroundColor: CORES.SECONDARY,
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 2,
    alignItems: "center",
    width: 200,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
  },
  signUpWrap: {
    marginTop: 14,
    alignItems: "center",
  },
  noAccount: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },
  signUpText: {
    fontSize: 20,
    fontWeight: "800",
    textDecorationLine: "underline",
  },
});
