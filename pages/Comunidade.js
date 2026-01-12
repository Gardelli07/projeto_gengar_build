// CommunityScreen.js
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";

const { width } = Dimensions.get("window");

// Mock data: 3 cards (2 text, 1 audio)
const cards = [
  {
    id: "1",
    name: "Lucas",
    type: "text",
    title: "Bussines English: Networking & Small Talk",
    content:
      "Hi, I'm Lucas. I work in finance at ABC Company. What do you do at your company?",
  },
  {
    id: "2",
    name: "Lucas",
    type: "text",
    title: "Bussines English: Networking & Small Talk",
    content:
      "Hi, I'm Lucas. I work in finance at ABC Company. What do you do at your company?",
  },
  {
    id: "3",
    name: "Lucas",
    type: "audio",
    title: "Bussines English: Networking & Small Talk",
    content: null,
  },
];

function Avatar() {
  // Simple circle avatar that resembles the sample (blue sky + green hill)
  return (
    <View style={styles.avatar}>
      <View style={styles.avatarSky} />
      <View style={styles.avatarHill} />
    </View>
  );
}

function Waveform({ bars = 30, maxHeight = 30 }) {
  // Random-ish heights to simulate waveform - keep deterministic for visuals
  const heights = Array.from({ length: bars }, (_, i) => {
    // create a repeating pattern for nicer look
    const pattern = [6, 18, 12, 28, 22, 10, 24, 14];
    return pattern[i % pattern.length];
  });

  return (
    <View style={styles.waveContainer}>
      {heights.map((h, i) => (
        <View
          key={i}
          style={[
            styles.waveBar,
            { height: h, marginLeft: i === 0 ? 6 : 3, marginRight: 3 },
          ]}
        />
      ))}
    </View>
  );
}

function Card({ item }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Avatar />
        <Text style={styles.nameText}>{item.name}</Text>
      </View>

      <View style={styles.contentBox}>
        <Text style={styles.contentTitle}>{item.title}</Text>

        {item.type === "text" ? (
          <View style={styles.textBubble}>
            <Text style={styles.textBubbleInner}>{item.content}</Text>
          </View>
        ) : (
          <View style={styles.textBubble}>
            <View style={styles.audioRow}>
              <View style={styles.playButton}>
                <Text style={styles.playTriangle}>▶</Text>
              </View>

              <View style={styles.waveWrapper}>
                <Waveform bars={28} />
              </View>
            </View>
          </View>
        )}
      </View>

      <View style={styles.cardFooter}>
        <TouchableOpacity style={styles.outlineButton}>
          <Text style={styles.outlineButtonText}>Muito Bom!</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.outlineButton}>
          <Text style={styles.outlineButtonText}>Sugerir Correção</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function CommunityScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>
          Ajude outros alunos corrigindo seus exercícios
        </Text>

        <View style={styles.list}>
          {cards.map((c) => (
            <Card key={c.id} item={c} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#e6e6e6", // page bg like in sample
  },
  container: {
    padding: 16,
    paddingBottom: 48,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "800",
    color: "#0b0b0b",
    marginBottom: 18,
    lineHeight: 42,
    textAlign: "center",
  },

  list: {
    // cards stack
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 14,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e6e6e6",
    marginRight: 12,
    backgroundColor: "#dcebff",
  },
  avatarSky: {
    flex: 1,
    backgroundColor: "#dff0ff",
  },
  avatarHill: {
    position: "absolute",
    bottom: 0,
    height: 20,
    width: "120%",
    left: -10,
    backgroundColor: "#bfe9a6",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "800",
  },
  contentBox: {
    borderWidth: 1,
    borderColor: "#dedede",
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  contentTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  textBubble: {
    borderWidth: 6,
    borderColor: "#efefef",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    marginTop: 4,
  },
  textBubbleInner: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 26,
  },
  audioRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#ff8a00",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  playTriangle: {
    color: "#fff",
    fontWeight: "800",
    marginLeft: 2,
  },
  waveWrapper: {
    flex: 1,
    paddingVertical: 8,
    justifyContent: "center",
  },
  waveContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#0e3174",
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 6,
    height: 48,
    overflow: "hidden",
  },
  waveBar: {
    width: 4,
    backgroundColor: "#ff9a2a",
    borderRadius: 2,
    alignSelf: "flex-end",
  },
  cardFooter: {
    flexDirection: "row",
    marginTop: 14,
    justifyContent: "flex-start",
    gap: 8,
  },
  outlineButton: {
    borderWidth: 3,
    borderColor: "#0e3174",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 26,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 140,
  },
  outlineButtonText: {
    color: "#0e3174",
    fontSize: 16,
  },
});
