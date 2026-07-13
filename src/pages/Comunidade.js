// Comunidade.js — Feed da Comunidade (redesign)
// React Native + Expo (Android/iOS)
// Deps usadas (já vêm no Expo): @expo/vector-icons
// Posts com: curtir (joinha) + contador e comentários em bottom-sheet.

import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import CORES from "../util/cores";

/* ------------------------------------------------------------------ */
/*  Mock — na integração real vem de GET /community/posts             */
/* ------------------------------------------------------------------ */
const INITIAL_POSTS = [
  {
    id: "1",
    name: "Lucas",
    initial: "L",
    color: "#2E6BF6",
    time: "há 2 h",
    course: "Bussines English",
    prompt: "Apresente-se e conte o que você faz no seu trabalho, como em uma conversa de networking.",
    type: "text",
    text: "Hi, I'm Lucas. I work in finance at ABC Company. What do you do at your company?",
    likes: 12,
    liked: false,
    comments: [
      { id: "c1", name: "Maria", initial: "M", color: "#7C5CFC", time: "há 1 h", text: 'Muito bom! Só um detalhe: "What do you do at your company?" soa mais natural como "What do you do for a living?" 🙂' },
      { id: "c2", name: "Ana", initial: "A", color: "#12B76A", time: "há 45 min", text: "Perfeito pra networking. Boa introdução!" },
    ],
  },
  {
    id: "2",
    name: "Beatriz",
    initial: "B",
    color: "#DD2590",
    time: "há 3 h",
    course: "Ingles Completo",
    prompt: "Grave um áudio lendo a frase em voz alta, destacando o som do \"th\" e as formas fracas das palavras.",
    type: "audio",
    duration: "0:14",
    likes: 9,
    liked: true,
    comments: [
      { id: "c3", name: "João", initial: "J", color: "#F76808", time: "há 2 h", text: 'Sua entonação melhorou muito! O "th" em "think" ficou bem claro 🔥' },
    ],
  },
  {
    id: "3",
    name: "João",
    initial: "J",
    color: "#F76808",
    time: "há 5 h",
    course: "Ingles para viagem",
    prompt: "Peça informações sobre o portão de embarque do seu voo no aeroporto.",
    type: "text",
    text: "Excuse me, where is the gate number twelve? My flight leaves in thirty minutes and I don't want to be late.",
    likes: 21,
    liked: false,
    comments: [
      { id: "c4", name: "Lucas", initial: "L", color: "#2E6BF6", time: "há 4 h", text: '"Gate number twelve" pode virar só "gate twelve" — mais comum no aeroporto.' },
      { id: "c5", name: "Beatriz", initial: "B", color: "#DD2590", time: "há 3 h", text: "Frase clara e educada, mandou bem!" },
      { id: "c6", name: "Ana", initial: "A", color: "#12B76A", time: "há 1 h", text: 'Só cuidado: "leaves" está certo, mas "departs" soa mais formal ✈️' },
    ],
  },
  {
    id: "4",
    name: "Ana",
    initial: "A",
    color: "#12B76A",
    time: "há 6 h",
    course: "Ingles Completo",
    prompt: "Grave um áudio contando como é a sua rotina diária, do café da manhã até a noite.",
    type: "audio",
    duration: "0:22",
    likes: 5,
    liked: false,
    comments: [],
  },
];

const WAVE = [8, 16, 10, 22, 14, 26, 12, 18, 9, 20, 15, 24, 11, 17, 13, 21, 10, 19, 14, 23, 12, 16, 8, 18, 15, 22, 11, 20, 13, 25, 10, 17, 14, 19];

/* ------------------------------------------------------------------ */
/*  Componentes menores                                               */
/* ------------------------------------------------------------------ */
function Avatar({ initial, color, size = 44 }) {
  return (
    <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2, backgroundColor: color }]}>
      <Text style={[styles.avatarText, { fontSize: size * 0.38 }]}>{initial}</Text>
    </View>
  );
}

function Waveform({ playing }) {
  const played = Math.floor(WAVE.length * (playing ? 0.7 : 0.38));
  return (
    <View style={styles.wave}>
      {WAVE.map((h, i) => (
        <View
          key={i}
          style={{
            flex: 1,
            marginHorizontal: 1.2,
            height: h,
            borderRadius: 2,
            backgroundColor: i < played ? CORES.COMUNIDADE_ACCENT : "#C7D0E0",
          }}
        />
      ))}
    </View>
  );
}

function AudioBody({ duration }) {
  const [playing, setPlaying] = useState(false);
  // Integração real: use expo-audio para tocar a URL do arquivo (arquivos.url)
  return (
    <View style={styles.audioBox}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => setPlaying((p) => !p)}
        style={styles.playBtn}
      >
        <Feather name={playing ? "pause" : "play"} size={16} color="#fff" style={playing ? null : { marginLeft: 2 }} />
      </TouchableOpacity>
      <Waveform playing={playing} />
      <Text style={styles.duration}>{duration}</Text>
    </View>
  );
}

/* ------------------------------------------------------------------ */
/*  Card do post                                                      */
/* ------------------------------------------------------------------ */
function PostCard({ post, onToggleLike, onOpenComments }) {
  const commentCount = post.comments.length;
  const commentLabel =
    commentCount === 0 ? "Comentar" : commentCount === 1 ? "Ver comentário" : "Ver comentários";

  return (
    <View style={styles.card}>
      {/* header */}
      <View style={styles.cardHeader}>
        <Avatar initial={post.initial} color={post.color} />
        <View style={{ flex: 1, marginLeft: 11 }}>
          <Text style={styles.name}>{post.name}</Text>
          <Text style={styles.metaText}>
            {post.time} · {post.course}
          </Text>
        </View>
      </View>

      {/* pergunta do exercício */}
      <View style={styles.promptBox}>
        <Feather name="help-circle" size={15} color={CORES.COMUNIDADE_TEXT_2} />
        <Text style={styles.promptText}>{post.prompt}</Text>
      </View>

      {/* body */}
      {post.type === "text" ? (
        <View style={styles.bubble}>
          <Text style={styles.bubbleText}>{post.text}</Text>
        </View>
      ) : (
        <AudioBody duration={post.duration} />
      )}

      {/* actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onToggleLike(post.id)}
          style={[
            styles.actionBtn,
            {
              backgroundColor: post.liked ? CORES.COMUNIDADE_ACCENT_SOFT : "#F4F6FB",
              borderColor: post.liked ? CORES.COMUNIDADE_ACCENT_BORDER : "#EEF1F7",
            },
          ]}
        >
          <Feather name="thumbs-up" size={16} color={post.liked ? CORES.COMUNIDADE_ACCENT : CORES.COMUNIDADE_MUTED} />
          <Text style={[styles.actionText, { color: post.liked ? CORES.COMUNIDADE_ACCENT : CORES.COMUNIDADE_MUTED }]}>
            {post.likes}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onOpenComments(post.id)}
          style={[styles.actionBtn, { backgroundColor: "#F4F6FB", borderColor: "#EEF1F7" }]}
        >
          <Feather name="message-circle" size={16} color={CORES.COMUNIDADE_MUTED} />
          <Text style={[styles.actionText, { color: CORES.COMUNIDADE_MUTED }]}>{commentCount}</Text>
        </TouchableOpacity>

        <View style={{ flex: 1 }} />
        <TouchableOpacity activeOpacity={0.6} onPress={() => onOpenComments(post.id)}>
          <Text style={styles.actionLink}>{commentLabel}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ------------------------------------------------------------------ */
/*  Bottom-sheet de comentários                                       */
/* ------------------------------------------------------------------ */
function CommentsSheet({ post, onClose, onSend }) {
  const [draft, setDraft] = useState("");
  const visible = !!post;

  const handleSend = () => {
    const t = draft.trim();
    if (!t) return;
    onSend(post.id, t);
    setDraft("");
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.scrim} onPress={onClose} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.sheetWrap}
        pointerEvents="box-none"
      >
        <View style={styles.sheet}>
          <View style={styles.grabber} />

          {/* header */}
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>
              Comentários · {post ? post.comments.length : 0}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Feather name="x" size={16} color={CORES.COMUNIDADE_MUTED} />
            </TouchableOpacity>
          </View>

          {/* contexto */}
          {post && (
            <View style={styles.context}>
              <Avatar initial={post.initial} color={post.color} size={32} />
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={styles.contextName}>{post.name}</Text>
                <Text numberOfLines={1} style={styles.contextSnippet}>
                  {post.type === "audio" ? `🎧 Mensagem de áudio · ${post.duration}` : post.text}
                </Text>
              </View>
            </View>
          )}

          {/* lista */}
          <FlatList
            data={post ? post.comments : []}
            keyExtractor={(c) => c.id}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 12 }}
            ListEmptyComponent={
              <Text style={styles.empty}>Seja o primeiro a comentar 💬</Text>
            }
            renderItem={({ item }) => (
              <View style={styles.commentRow}>
                <Avatar initial={item.initial} color={item.color} size={36} />
                <View style={{ flex: 1, marginLeft: 11 }}>
                  <View style={styles.commentHead}>
                    <Text style={styles.commentName}>{item.name}</Text>
                    <Text style={styles.commentTime}>{item.time}</Text>
                  </View>
                  <Text style={styles.commentText}>{item.text}</Text>
                </View>
              </View>
            )}
          />

          {/* input */}
          <View style={styles.inputBar}>
            <TextInput
              value={draft}
              onChangeText={setDraft}
              placeholder="Escreva uma correção ou elogio..."
              placeholderTextColor={CORES.COMUNIDADE_MUTED_2}
              style={styles.input}
              returnKeyType="send"
              onSubmitEditing={handleSend}
            />
            <TouchableOpacity onPress={handleSend} style={styles.sendBtn} activeOpacity={0.85}>
              <Feather name="send" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/*  Tela principal                                                    */
/* ------------------------------------------------------------------ */
export default function CommunityScreen() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [openId, setOpenId] = useState(null);

  const toggleLike = useCallback((id) => {
    // Integração real: POST/DELETE /community/posts/:id/likes
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
      )
    );
  }, []);

  const sendComment = useCallback((id, text) => {
    // Integração real: POST /community/posts/:id/comments
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              comments: [
                ...p.comments,
                { id: `local-${Date.now()}`, name: "Você", initial: "V", color: CORES.COMUNIDADE_ACCENT, time: "agora", text },
              ],
            }
          : p
      )
    );
  }, []);

  const openPost = posts.find((p) => p.id === openId) || null;

  return (
    <SafeAreaView style={styles.safe} edges={["left", "right"]}>
      {/* header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>Comunidade</Text>
            <Text style={styles.headerSub}>Ajude outros alunos corrigindo os exercícios</Text>
          </View>
          <View style={styles.headerIcon}>
            <Feather name="shield" size={20} color={CORES.COMUNIDADE_ACCENT} />
          </View>
        </View>
      </View>

      {/* feed */}
      <FlatList
        data={posts}
        keyExtractor={(p) => p.id}
        contentContainerStyle={styles.feed}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <PostCard post={item} onToggleLike={toggleLike} onOpenComments={setOpenId} />
        )}
        ListFooterComponent={
          <Text style={styles.footer}>Você chegou ao fim por hoje 🎉</Text>
        }
      />

      <CommentsSheet post={openPost} onClose={() => setOpenId(null)} onSend={sendComment} />
    </SafeAreaView>
  );
}

/* ------------------------------------------------------------------ */
/*  Estilos                                                           */
/* ------------------------------------------------------------------ */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: CORES.COMUNIDADE_BG },

  /* header */
  header: {
    backgroundColor: CORES.WHITE,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: CORES.COMUNIDADE_LINE,
  },
  headerRow: { flexDirection: "row", alignItems: "center" },
  headerTitle: { fontSize: 26, fontWeight: "800", color: CORES.COMUNIDADE_TEXT, letterSpacing: -0.5 },
  headerSub: { fontSize: 13.5, fontWeight: "500", color: CORES.COMUNIDADE_MUTED, marginTop: 3 },
  headerIcon: {
    width: 42, height: 42, borderRadius: 14, backgroundColor: "#F1F4FB",
    alignItems: "center", justifyContent: "center",
  },
  /* feed */
  feed: { padding: 16, paddingBottom: 28 },
  footer: { textAlign: "center", fontSize: 12.5, fontWeight: "600", color: "#B0B8C7", paddingVertical: 10 },

  /* card */
  card: {
    backgroundColor: CORES.WHITE,
    borderRadius: 22,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#101828",
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  cardHeader: { flexDirection: "row", alignItems: "center" },
  avatar: { alignItems: "center", justifyContent: "center" },
  avatarText: { color: "#fff", fontWeight: "800" },
  name: { fontSize: 15.5, fontWeight: "800", color: CORES.COMUNIDADE_TEXT },
  metaText: { fontSize: 12.5, fontWeight: "500", color: CORES.COMUNIDADE_MUTED_2, marginTop: 1 },
  promptBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 7,
    backgroundColor: "#F3F5FA",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#D8DEEA",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 13,
    marginBottom: 10,
  },
  promptText: {
    flex: 1,
    fontSize: 12.5,
    fontWeight: "600",
    fontStyle: "italic",
    color: CORES.COMUNIDADE_TEXT_2,
    lineHeight: 18,
  },

  /* text bubble */
  bubble: {
    backgroundColor: CORES.COMUNIDADE_BUBBLE,
    borderWidth: 1,
    borderColor: CORES.COMUNIDADE_BUBBLE_LINE,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 15,
  },
  bubbleText: { fontSize: 15.5, fontWeight: "600", color: "#1D2939", lineHeight: 23 },

  /* audio */
  audioBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(46,107,246,0.06)",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  playBtn: {
    width: 42, height: 42, borderRadius: 21, backgroundColor: CORES.COMUNIDADE_ACCENT,
    alignItems: "center", justifyContent: "center", marginRight: 12,
  },
  wave: { flex: 1, flexDirection: "row", alignItems: "flex-end", height: 34 },
  duration: { fontSize: 12.5, fontWeight: "700", color: CORES.COMUNIDADE_ACCENT, marginLeft: 10, minWidth: 30, textAlign: "right" },

  /* actions */
  actions: { flexDirection: "row", alignItems: "center", marginTop: 14 },
  actionBtn: {
    flexDirection: "row", alignItems: "center", gap: 7,
    paddingVertical: 8, paddingHorizontal: 14, borderRadius: 999, borderWidth: 1.5, marginRight: 8,
  },
  actionText: { fontSize: 13.5, fontWeight: "800" },
  actionLink: { fontSize: 12.5, fontWeight: "700", color: CORES.COMUNIDADE_MUTED_2 },

  /* sheet */
  scrim: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(16,24,40,0.45)" },
  sheetWrap: { flex: 1, justifyContent: "flex-end" },
  sheet: {
    height: "74%",
    backgroundColor: CORES.WHITE,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    overflow: "hidden",
  },
  grabber: { width: 40, height: 5, borderRadius: 999, backgroundColor: "#DCE1EA", alignSelf: "center", marginTop: 10, marginBottom: 4 },
  sheetHeader: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 20, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#F0F2F6",
  },
  sheetTitle: { fontSize: 17, fontWeight: "800", color: CORES.COMUNIDADE_TEXT },
  closeBtn: { width: 30, height: 30, borderRadius: 15, backgroundColor: "#F1F4FB", alignItems: "center", justifyContent: "center" },
  context: {
    flexDirection: "row", alignItems: "center",
    paddingHorizontal: 20, paddingVertical: 12,
    backgroundColor: "#F7F9FC", borderBottomWidth: 1, borderBottomColor: "#F0F2F6",
  },
  contextName: { fontSize: 13, fontWeight: "800", color: CORES.COMUNIDADE_TEXT },
  contextSnippet: { fontSize: 12.5, fontWeight: "500", color: CORES.COMUNIDADE_MUTED_2, marginTop: 1 },
  empty: { textAlign: "center", paddingVertical: 40, color: "#B0B8C7", fontSize: 14, fontWeight: "600" },
  commentRow: { flexDirection: "row", paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#F4F6FA" },
  commentHead: { flexDirection: "row", alignItems: "baseline", gap: 8 },
  commentName: { fontSize: 13.5, fontWeight: "800", color: CORES.COMUNIDADE_TEXT },
  commentTime: { fontSize: 11.5, fontWeight: "600", color: "#B0B8C7" },
  commentText: { fontSize: 14, fontWeight: "500", color: "#344054", lineHeight: 21, marginTop: 3 },
  inputBar: {
    flexDirection: "row", alignItems: "center", gap: 10,
    paddingHorizontal: 16, paddingTop: 12, paddingBottom: 16,
    borderTopWidth: 1, borderTopColor: "#F0F2F6", backgroundColor: CORES.WHITE,
  },
  input: {
    flex: 1, height: 42, borderWidth: 1.5, borderColor: "#E7EBF2", borderRadius: 999,
    paddingHorizontal: 16, fontSize: 14, color: CORES.COMUNIDADE_TEXT, backgroundColor: "#F7F9FC",
  },
  sendBtn: { width: 42, height: 42, borderRadius: 21, backgroundColor: CORES.COMUNIDADE_ACCENT, alignItems: "center", justifyContent: "center" },
});
