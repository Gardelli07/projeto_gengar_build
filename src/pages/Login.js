import React, { useState, useEffect } from "react";
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
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as AppleAuthentication from "expo-apple-authentication";

import { useAuth } from "../context/AuthContext";
import api, { setAccessToken } from "../services/api";
import CORES from "../util/cores";

WebBrowser.maybeCompleteAuthSession();

const { width } = Dimensions.get("window");

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

  const [googleRequest, googleResponse, googlePromptAsync] =
    Google.useAuthRequest({
      clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
      androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
      iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    });

  useEffect(() => {
    if (googleResponse?.type === "success") {
      const idToken = googleResponse.params?.id_token;
      if (idToken) {
        handleSocialLogin("google", { idToken, plataforma: Platform.OS });
      } else {
        Alert.alert("Erro", "Não foi possível obter o token do Google.");
      }
    }
  }, [googleResponse]);

  async function handleSocialLogin(provider, tokenPayload) {
    try {
      const endpoint = provider === "google" ? "/auth/google" : "/auth/apple";
      const response = await api.post(endpoint, tokenPayload, {
        authenticated: false,
      });

      const payload = response?.dados || response?.data || response;
      const userData = payload?.usuario || payload?.user || payload;
      const token = payload?.access_token || payload?.token;
      const company =
        userData?.empresa?.codigo ||
        userData?.empresa_codigo ||
        userData?.empresa;
      const empresa =
        typeof company === "string" ? company.toLowerCase() : company;

      if (token) await setAccessToken(token);

      signIn({
        ...userData,
        tipo: userData?.perfil || userData?.tipo,
        empresa,
      });

      const homeRoute = getHomeRouteByEmpresa(empresa);
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "Tabs",
            state: { routes: [{ name: homeRoute }] },
          },
        ],
      });
    } catch (error) {
      Alert.alert("Erro", error.message || "Erro ao realizar login social");
    }
  }

  async function handleAppleSignIn() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      await handleSocialLogin("apple", {
        identityToken: credential.identityToken,
        plataforma: Platform.OS,
      });
    } catch (error) {
      if (error.code === "ERR_REQUEST_CANCELED") return;
      Alert.alert("Erro", error.message || "Erro ao realizar login com Apple");
    }
  }

  async function handleSignIn() {
    if (!email.trim() || !senha.trim()) {
      Alert.alert("Atenção", "Preencha email e senha.");
      return;
    }

    try {
      const response = await api.post(
        "/auth/corporativo/login",
        {
          login: email.trim(),
          senha,
          plataforma: Platform.OS,
        },
        { authenticated: false },
      );

      const payload = response?.dados || response?.data || response;
      const userData = payload?.usuario || payload?.user || payload;
      const token = payload?.access_token || payload?.token;
      const company =
        userData?.empresa?.codigo ||
        userData?.empresa_codigo ||
        userData?.empresa;
      const empresa =
        typeof company === "string" ? company.toLowerCase() : company;

      if (token) await setAccessToken(token);

      signIn({
        ...userData,
        login: userData?.login || email.trim(),
        tipo: userData?.perfil || userData?.tipo,
        empresa,
      });

      const homeRoute = getHomeRouteByEmpresa(empresa);

      Alert.alert("Sucesso", `Bem-vindo ${userData?.login || email.trim()}`);

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
      Alert.alert("Erro", error.message || "Erro ao realizar login");
    }
  }

  return (
    <SafeAreaView style={styles.safe} edges={["left", "right"]}>
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

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OU</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={[styles.socialButton, styles.googleButton]}
            onPress={() => googlePromptAsync()}
            disabled={!googleRequest}
            activeOpacity={0.8}
          >
            <Text style={styles.googleIcon}>G</Text>
            <Text style={styles.googleButtonText}>Entrar com Google</Text>
          </TouchableOpacity>

          {Platform.OS === "ios" && (
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={
                AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
              }
              buttonStyle={
                AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
              }
              cornerRadius={4}
              style={styles.appleButton}
              onPress={handleAppleSignIn}
            />
          )}

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
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#bbb",
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: "700",
    color: "#666",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 54,
    borderRadius: 4,
    marginBottom: 12,
  },
  googleButton: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#ddd",
  },
  googleIcon: {
    fontSize: 20,
    fontWeight: "900",
    color: "#4285F4",
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  appleButton: {
    width: "100%",
    height: 54,
    marginBottom: 12,
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
