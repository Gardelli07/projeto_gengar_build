import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";

// ✅ Lucide oficial para React Native
import { Crown } from "lucide-react-native";

export default function Home() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CourseCard
          title="Inglês para negócios"
          description="Aprenda vocabulário e gramática do inglês neste curso"
          image={require("../assets/Cursos/bussines.jpg")}
          premium
          onPress={() => navigation.navigate("Bussines")}
        />

        <CourseCard
          title="Pronúncia do inglês"
          description="Melhore suas habilidades e fale com mais confiança"
          image={require("../assets/Cursos/pronuncia.jpg")}
          premium
          onPress={() => navigation.navigate("Teste1")}
        />

        <CourseCard
          title="O mundo em inglês"
          description="Aprenda inglês com vídeos do The New York Times"
          image={require("../assets/Cursos/mundo.jpg")}
          premium
          onPress={() => navigation.navigate("NetworkingSmallTalk")}
        />

        <CourseCard
          title="Inglês para viagens"
          description="Aprenda palavras e frases úteis para sua viagem"
          image={require("../assets/Cursos/viagem.jpg")}
          premium
          onPress={() => navigation.navigate("PracticeMeetingExpressions")}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

/* ================= COMPONENTE ================= */

function CourseCard({ title, description, image, premium, onPress }) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <View style={styles.textContainer}>
        {premium && (
          <View style={styles.premiumBadge}>
            <Crown size={14} color="#FFFFFF" strokeWidth={2} />
            <Text style={styles.premiumText}>PREMIUM</Text>
          </View>
        )}

        <Text style={styles.title}>{title}</Text>

        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>

        {premium && <Text style={styles.cta}>EXPERIMENTE GRÁTIS</Text>}
      </View>

      <Image source={image} style={styles.image} />
    </TouchableOpacity>
  );
}

/* ================= ESTILOS ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e8e8",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
    marginHorizontal: 14,
    marginVertical: 8,
    overflow: "hidden", // 🔥 garante que a imagem respeite o arredondado

    // Android
    elevation: 3,

    // iOS
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  textContainer: {
    flex: 1,
    padding: 14, // padding só no conteúdo
    justifyContent: "center",
  },

  premiumBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#f47c2c",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 6,
    gap: 4,
  },

  premiumText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },

  description: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 6,
  },

  cta: {
    fontSize: 14,
    fontWeight: "700",
    color: "#10b981b9",
  },

  image: {
    width: 110, // ✅ limite de largura
    height: "100%", // ✅ ocupa de cima a baixo
    resizeMode: "cover", // ✅ não distorce
  },
});
