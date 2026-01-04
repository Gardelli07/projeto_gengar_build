import React, { useState } from "react";
import {
  SafeAreaView,
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

const { width } = Dimensions.get("window");
const ORANGE = "#f47c2c"; // cor laranja similar ao design

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleSignIn() {
    // validação simples (troque pela lógica do seu backend)
    if (!email.trim() || !senha.trim()) {
      Alert.alert("Atenção", "Preencha email e senha.");
      return;
    }
    // Exemplo: apenas log no console — substitua pela autenticação real
    console.log("Entrando com:", { email, senha });
    Alert.alert("Sucesso", `Entrando como ${email}`);
    // navigation.navigate("Home"); // se tiver navegação
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
          {/* Imagem do topo */}
          <Image
            source={require("../assets/logo2.png")}
            style={styles.logo}
            resizeMode="contain"
            accessible
            accessibilityLabel="Logo tigre"
          />

          {/* Título grande */}
          <Text style={styles.title}>LOGIN</Text>

          {/* Campo Email */}
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
              textContentType="emailAddress"
            />
          </View>

          {/* Campo Senha */}
          <View style={styles.fieldWrap}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              value={senha}
              onChangeText={setSenha}
              placeholder="••••••••"
              placeholderTextColor="#999"
              style={styles.input}
              secureTextEntry
              textContentType="password"
            />
          </View>

          {/* Botão */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleSignIn}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>

          {/* Texto cadastro */}
          <View style={styles.signUpWrap}>
            <Text style={styles.noAccount}>Não tem uma conta?</Text>
            <TouchableOpacity
              onPress={() => Alert.alert("Cadastro", "Navegar para cadastro")}
            >
              <Text style={styles.signUpText}>cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#e8e8e8", // fundo semelhante ao design
  },
  container: {
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  logo: {
    width: width * 1,
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
    borderColor: ORANGE,
    paddingHorizontal: 12,
    fontSize: 18,
    borderRadius: 4,
    paddingTop: 10,
    paddingBottom: 10,
  },
  button: {
    backgroundColor: "#f47c2c",
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 10,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
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
