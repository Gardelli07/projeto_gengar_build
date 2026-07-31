// Comunidade.js — Feed da Comunidade
// React Native + Expo (Android/iOS)
// Deps usadas (já vêm no Expo): @expo/vector-icons
// Posts com: curtir (joinha) + contador e comentários em bottom-sheet.

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { createAudioPlayer } from "expo-audio";
import CORES from "../util/cores";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../services/api";
import {
  fetchPosts,
  criarPost,
  deletarPost,
  curtirPost,
  descurtirPost,
  fetchComentarios,
  enviarComentario,
  deletarComentario,
} from "../services/comunidade";
import { unmarkSlideByPostId } from "../util/exercisePosts";

const WAVE = [8, 16, 10, 22, 14, 26, 12, 18, 9, 20, 15, 24, 11, 17, 13, 21, 10, 19, 14, 23, 12, 16, 8, 18, 15, 22, 11, 20, 13, 25, 10, 17, 14, 19];

const AVATAR_COLORS = ["#2E6BF6", "#7C5CFC", "#12B76A", "#DD2590", "#F76808", "#0BA5EC", "#EE46BC"];

/* ------------------------------------------------------------------ */
/*  Helpers de mapeamento (backend -> shape usado pelo componente)     */
/* ------------------------------------------------------------------ */
function colorFromId(seed) {
  const str = String(seed ?? "");
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function extractUserId(user) {
  if (!user) return null;
  return user.id ?? user.usuario_id ?? user.uid ?? user.login ?? user.email ?? null;
}

function formatRelativeTime(isoString) {
  if (!isoString) return "";
  const diffMs = Date.now() - new Date(isoString).getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "agora";
  if (diffMin < 60) return `há ${diffMin} min`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `há ${diffH} h`;
  const diffD = Math.floor(diffH / 24);
  return `há ${diffD} d`;
}

function resolveMediaUrl(path) {
  return path ? `${API_URL}${path}` : null;
}

function formatDuration(totalSeconds) {
  const s = Math.max(0, Math.round(totalSeconds || 0));
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${String(sec).padStart(2, "0")}`;
}

function mapPost(raw) {
  const nome = raw?.usuario?.nome || "Usuário";
  const isAudio = raw?.tipo === "audio";
  return {
    id: String(raw.id),
    name: nome,
    initial: nome.charAt(0).toUpperCase(),
    color: colorFromId(raw?.usuario?.id ?? nome),
    avatarUrl: resolveMediaUrl(raw?.usuario?.foto_url),
    time: formatRelativeTime(raw?.criado_em),
    course: raw?.curso_nome || null,
    prompt: raw?.aula_prompt || null,
    type: isAudio ? "audio" : "text",
    text: raw?.texto || "",
    duration: isAudio ? formatDuration(raw?.duracao_segundos) : null,
    audioUrl: resolveMediaUrl(raw?.audio_url),
    likes: raw?.curtidas || 0,
    liked: !!raw?.curtido_pelo_usuario,
    commentsTotal: raw?.comentarios_total || 0,
    ownerId: raw?.usuario?.id ?? null,
  };
}

function mapComment(raw) {
  const nome = raw?.usuario?.nome || "Você";
  return {
    id: String(raw.id),
    name: nome,
    initial: nome.charAt(0).toUpperCase(),
    color: colorFromId(raw?.usuario?.id ?? nome),
    avatarUrl: resolveMediaUrl(raw?.usuario?.foto_url),
    time: formatRelativeTime(raw?.criado_em) || "agora",
    text: raw?.texto || "",
    ownerId: raw?.usuario?.id ?? null,
  };
}

/* ------------------------------------------------------------------ */
/*  Componentes menores                                               */
/* ------------------------------------------------------------------ */
function Avatar({ initial, color, size = 44, uri }) {
  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={{ width: size, height: size, borderRadius: size / 2 }}
      />
    );
  }
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

function AudioBody({ audioUrl, duration }) {
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef(null);
  const subscriptionRef = useRef(null);

  useEffect(() => {
    return () => {
      subscriptionRef.current?.remove();
      playerRef.current?.remove();
    };
  }, []);

  const togglePlayback = async () => {
    if (!audioUrl) return;

    try {
      if (!playerRef.current) {
        const player = createAudioPlayer({ uri: audioUrl });
        subscriptionRef.current = player.addListener(
          "playbackStatusUpdate",
          (status) => {
            if (status.didJustFinish) {
              player.seekTo(0);
              setPlaying(false);
            }
          }
        );
        playerRef.current = player;
      }

      if (playing) {
        playerRef.current.pause();
        setPlaying(false);
      } else {
        playerRef.current.play();
        setPlaying(true);
      }
    } catch (error) {
      console.error("[comunidade] falha ao reproduzir audio:", error);
    }
  };

  return (
    <View style={styles.audioBox}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={togglePlayback}
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
function PostCard({ post, isMine, onToggleLike, onOpenComments, onDeletePost }) {
  const commentCount = post.commentsTotal;
  const commentLabel =
    commentCount === 0 ? "Comentar" : commentCount === 1 ? "Ver comentário" : "Ver comentários";

  return (
    <View style={styles.card}>
      {/* header */}
      <View style={styles.cardHeader}>
        <Avatar initial={post.initial} color={post.color} uri={post.avatarUrl} />
        <View style={{ flex: 1, marginLeft: 11 }}>
          <Text style={styles.name}>{post.name}</Text>
          <Text style={styles.metaText}>
            {post.time}
            {post.course ? ` · ${post.course}` : ""}
          </Text>
        </View>
        {isMine && (
          <TouchableOpacity
            onPress={() => onDeletePost(post.id)}
            style={styles.deleteBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Feather name="trash-2" size={17} color={CORES.COMUNIDADE_MUTED_2} />
          </TouchableOpacity>
        )}
      </View>

      {/* pergunta do exercício (quando o post vem de uma aula) */}
      {!!post.prompt && (
        <View style={styles.promptBox}>
          <Feather name="help-circle" size={15} color={CORES.COMUNIDADE_TEXT_2} />
          <Text style={styles.promptText}>{post.prompt}</Text>
        </View>
      )}

      {/* body */}
      {post.type === "text" ? (
        <View style={styles.bubble}>
          <Text style={styles.bubbleText}>{post.text}</Text>
        </View>
      ) : (
        <AudioBody audioUrl={post.audioUrl} duration={post.duration} />
      )}

      {/* actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onToggleLike(post)}
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
function CommentsSheet({ post, comments, loading, error, sending, currentUserId, onClose, onSend, onRetry, onDeleteComment }) {
  const [draft, setDraft] = useState("");
  const visible = !!post;

  const handleSend = () => {
    const t = draft.trim();
    if (!t || sending) return;
    onSend(post.id, t);
    setDraft("");
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.scrim} onPress={onClose} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.sheetWrap}
        pointerEvents="box-none"
      >
        <View style={styles.sheet}>
          <View style={styles.grabber} />

          {/* header */}
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>
              Comentários · {comments ? comments.length : post?.commentsTotal ?? 0}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Feather name="x" size={16} color={CORES.COMUNIDADE_MUTED} />
            </TouchableOpacity>
          </View>

          {/* contexto */}
          {post && (
            <View style={styles.context}>
              <Avatar initial={post.initial} color={post.color} size={32} uri={post.avatarUrl} />
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
            data={comments || []}
            keyExtractor={(c) => c.id}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 12 }}
            ListEmptyComponent={
              loading ? (
                <ActivityIndicator style={{ marginTop: 40 }} color={CORES.COMUNIDADE_ACCENT} />
              ) : error ? (
                <View style={{ alignItems: "center", marginTop: 30 }}>
                  <Text style={styles.empty}>{error}</Text>
                  <TouchableOpacity onPress={onRetry} style={styles.retryBtn}>
                    <Text style={styles.retryText}>Tentar novamente</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={styles.empty}>Seja o primeiro a comentar 💬</Text>
              )
            }
            renderItem={({ item }) => {
              const isMine = item.ownerId != null && String(item.ownerId) === String(currentUserId);
              return (
                <View style={styles.commentRow}>
                  <Avatar initial={item.initial} color={item.color} size={36} uri={item.avatarUrl} />
                  <View style={{ flex: 1, marginLeft: 11 }}>
                    <View style={styles.commentHead}>
                      <Text style={styles.commentName}>{item.name}</Text>
                      <Text style={styles.commentTime}>{item.time}</Text>
                    </View>
                    <Text style={styles.commentText}>{item.text}</Text>
                  </View>
                  {isMine && (
                    <TouchableOpacity
                      onPress={() => onDeleteComment(post.id, item.id)}
                      style={styles.commentDeleteBtn}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Feather name="trash-2" size={15} color={CORES.COMUNIDADE_MUTED_2} />
                    </TouchableOpacity>
                  )}
                </View>
              );
            }}
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
              editable={!sending}
            />
            <TouchableOpacity onPress={handleSend} style={styles.sendBtn} activeOpacity={0.85} disabled={sending}>
              {sending ? <ActivityIndicator color="#fff" size="small" /> : <Feather name="send" size={18} color="#fff" />}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/*  Bottom-sheet de novo post                                         */
/* ------------------------------------------------------------------ */
function NewPostSheet({ visible, text, sending, onChangeText, onClose, onSubmit }) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.scrim} onPress={onClose} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.sheetWrap}
        pointerEvents="box-none"
      >
        <View style={styles.newPostSheet}>
          <View style={styles.grabber} />

          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Novo post</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Feather name="x" size={16} color={CORES.COMUNIDADE_MUTED} />
            </TouchableOpacity>
          </View>

          <View style={{ paddingHorizontal: 20, paddingTop: 14 }}>
            <TextInput
              value={text}
              onChangeText={onChangeText}
              placeholder="Compartilhe algo em inglês com a comunidade..."
              placeholderTextColor={CORES.COMUNIDADE_MUTED_2}
              style={styles.newPostInput}
              multiline
              editable={!sending}
              autoFocus
            />
          </View>

          <View style={styles.newPostFooter}>
            <TouchableOpacity
              onPress={onSubmit}
              style={[styles.publishBtn, { opacity: text.trim() && !sending ? 1 : 0.5 }]}
              activeOpacity={0.85}
              disabled={!text.trim() || sending}
            >
              {sending ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.publishBtnText}>Publicar</Text>
              )}
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
  const { user } = useAuth();
  const currentUserId = extractUserId(user);
  const ownAvatarUrl = resolveMediaUrl(user?.foto_url);

  // A listagem de posts/comentários pode não trazer a foto do próprio usuário
  // (o backend às vezes só inclui id/nome do autor). Como já temos a foto do
  // usuário logado via AuthContext, preenchemos aqui para não depender disso.
  const withOwnAvatar = useCallback(
    (item) => {
      if (item.avatarUrl || !ownAvatarUrl) return item;
      if (item.ownerId != null && String(item.ownerId) === String(currentUserId)) {
        return { ...item, avatarUrl: ownAvatarUrl };
      }
      return item;
    },
    [currentUserId, ownAvatarUrl]
  );

  const [posts, setPosts] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [temMais, setTemMais] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [erroInicial, setErroInicial] = useState(null);

  const [openId, setOpenId] = useState(null);
  const [commentsState, setCommentsState] = useState({});
  const [sendingComment, setSendingComment] = useState(false);
  const requestedCommentsRef = useRef(new Set());

  const [composerVisible, setComposerVisible] = useState(false);
  const [composerText, setComposerText] = useState("");
  const [composerSending, setComposerSending] = useState(false);

  const carregarPosts = useCallback(async (paginaAlvo, { modo } = {}) => {
    try {
      const { posts: novos, temMais: proximaTemMais } = await fetchPosts({ pagina: paginaAlvo });
      const mapeados = novos.map(mapPost).map(withOwnAvatar);
      setPosts((prev) => (modo === "append" ? [...prev, ...mapeados] : mapeados));
      setTemMais(proximaTemMais);
      setPagina(paginaAlvo);
      setErroInicial(null);
    } catch (error) {
      console.error("[comunidade] falha ao carregar posts:", error?.status, error?.message, error);
      if (modo !== "append") {
        setErroInicial(
          error?.message
            ? `Não foi possível carregar a comunidade: ${error.message}`
            : "Não foi possível carregar a comunidade. Tente novamente."
        );
      }
    } finally {
      setLoadingInitial(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  }, [withOwnAvatar]);

  // Recarrega o feed sempre que a aba Comunidade ganha foco (nao so na
  // primeira montagem), ja que o React Navigation mantem a tela montada ao
  // trocar de aba e o useEffect de montagem sozinho nao dispararia de novo.
  useFocusEffect(
    useCallback(() => {
      carregarPosts(1);
    }, [carregarPosts]),
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    carregarPosts(1);
  }, [carregarPosts]);

  const onEndReached = useCallback(() => {
    if (loadingMore || loadingInitial || refreshing || !temMais) return;
    setLoadingMore(true);
    carregarPosts(pagina + 1, { modo: "append" });
  }, [carregarPosts, loadingMore, loadingInitial, refreshing, temMais, pagina]);

  const toggleLike = useCallback((post) => {
    const wasLiked = post.liked;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === post.id ? { ...p, liked: !wasLiked, likes: wasLiked ? p.likes - 1 : p.likes + 1 } : p
      )
    );

    const acao = wasLiked ? descurtirPost(post.id) : curtirPost(post.id);
    acao.catch((error) => {
      console.error("[comunidade] falha ao curtir/descurtir:", error?.status, error?.message, error);
      setPosts((prev) =>
        prev.map((p) => (p.id === post.id ? { ...p, liked: wasLiked, likes: post.likes } : p))
      );
      Alert.alert("Erro", error?.message || "Não foi possível registrar sua curtida. Tente novamente.");
    });
  }, []);

  const loadComments = useCallback((postId, { force } = {}) => {
    if (!force && requestedCommentsRef.current.has(postId)) return;
    requestedCommentsRef.current.add(postId);
    setCommentsState((prev) => ({
      ...prev,
      [postId]: { items: prev[postId]?.items || [], loading: true, error: null },
    }));

    fetchComentarios(postId)
      .then((lista) => {
        setCommentsState((prev) => ({
          ...prev,
          [postId]: { items: lista.map(mapComment).map(withOwnAvatar), loading: false, error: null },
        }));
      })
      .catch((error) => {
        console.error("[comunidade] falha ao carregar comentários:", error?.status, error?.message, error);
        requestedCommentsRef.current.delete(postId);
        setCommentsState((prev) => ({
          ...prev,
          [postId]: {
            items: prev[postId]?.items || [],
            loading: false,
            error: error?.message || "Não foi possível carregar os comentários.",
          },
        }));
      });
  }, [withOwnAvatar]);

  const openComments = useCallback(
    (postId) => {
      setOpenId(postId);
      loadComments(postId);
    },
    [loadComments]
  );

  const sendComment = useCallback(async (postId, texto) => {
    setSendingComment(true);
    try {
      const novo = await enviarComentario(postId, texto);
      const mapped = withOwnAvatar(mapComment(novo));
      setCommentsState((prev) => {
        const atual = prev[postId] || { items: [], loading: false, error: null };
        return { ...prev, [postId]: { ...atual, items: [...atual.items, mapped] } };
      });
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, commentsTotal: p.commentsTotal + 1 } : p))
      );
    } catch (error) {
      console.error("[comunidade] falha ao enviar comentário:", error?.status, error?.message, error);
      Alert.alert("Erro", error?.message || "Não foi possível enviar seu comentário. Tente novamente.");
    } finally {
      setSendingComment(false);
    }
  }, [withOwnAvatar]);

  const deletePost = useCallback(
    (postId) => {
      Alert.alert(
        "Excluir post",
        "Tem certeza que deseja excluir este post? Essa ação não pode ser desfeita.",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Excluir",
            style: "destructive",
            onPress: () => {
              const anterior = posts;
              setPosts((prev) => prev.filter((p) => p.id !== postId));
              setOpenId((atual) => (atual === postId ? null : atual));
              deletarPost(postId)
                .then(() => unmarkSlideByPostId(postId))
                .catch((error) => {
                  console.error("[comunidade] falha ao excluir post:", error?.status, error?.message, error);
                  setPosts(anterior);
                  Alert.alert("Erro", error?.message || "Não foi possível excluir o post. Tente novamente.");
                });
            },
          },
        ]
      );
    },
    [posts]
  );

  const deleteComment = useCallback(
    (postId, commentId) => {
      Alert.alert("Excluir comentário", "Tem certeza que deseja excluir este comentário?", [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            const estadoAnterior = commentsState[postId];
            setCommentsState((prev) => {
              const atual = prev[postId];
              if (!atual) return prev;
              return { ...prev, [postId]: { ...atual, items: atual.items.filter((c) => c.id !== commentId) } };
            });
            setPosts((prev) =>
              prev.map((p) => (p.id === postId ? { ...p, commentsTotal: Math.max(0, p.commentsTotal - 1) } : p))
            );
            deletarComentario(postId, commentId).catch((error) => {
              console.error("[comunidade] falha ao excluir comentário:", error?.status, error?.message, error);
              if (estadoAnterior) {
                setCommentsState((prev) => ({ ...prev, [postId]: estadoAnterior }));
              }
              setPosts((prev) =>
                prev.map((p) => (p.id === postId ? { ...p, commentsTotal: p.commentsTotal + 1 } : p))
              );
              Alert.alert("Erro", error?.message || "Não foi possível excluir o comentário. Tente novamente.");
            });
          },
        },
      ]);
    },
    [commentsState]
  );

  const submitComposer = useCallback(async () => {
    const texto = composerText.trim();
    if (!texto) return;
    setComposerSending(true);
    try {
      const novo = await criarPost(texto);
      setPosts((prev) => [withOwnAvatar(mapPost(novo)), ...prev]);
      setComposerText("");
      setComposerVisible(false);
    } catch (error) {
      console.error("[comunidade] falha ao publicar post:", error?.status, error?.message, error);
      Alert.alert("Erro", error?.message || "Não foi possível publicar seu post. Tente novamente.");
    } finally {
      setComposerSending(false);
    }
  }, [composerText, withOwnAvatar]);

  const openPost = posts.find((p) => p.id === openId) || null;
  const openPostComments = openId ? commentsState[openId] : null;

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
      {loadingInitial && posts.length === 0 ? (
        <View style={styles.centerState}>
          <ActivityIndicator color={CORES.COMUNIDADE_ACCENT} size="large" />
        </View>
      ) : erroInicial && posts.length === 0 ? (
        <View style={styles.centerState}>
          <Text style={styles.empty}>{erroInicial}</Text>
          <TouchableOpacity onPress={() => carregarPosts(1)} style={styles.retryBtn}>
            <Text style={styles.retryText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(p) => p.id}
          contentContainerStyle={styles.feed}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onEndReachedThreshold={0.4}
          onEndReached={onEndReached}
          renderItem={({ item }) => (
            <PostCard
              post={item}
              isMine={item.ownerId != null && String(item.ownerId) === String(currentUserId)}
              onToggleLike={toggleLike}
              onOpenComments={openComments}
              onDeletePost={deletePost}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>Nenhum post ainda. Seja o primeiro a compartilhar!</Text>
          }
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator style={{ paddingVertical: 16 }} color={CORES.COMUNIDADE_ACCENT} />
            ) : !temMais && posts.length > 0 ? (
              <Text style={styles.footer}>Você chegou ao fim por hoje 🎉</Text>
            ) : null
          }
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.85}
        onPress={() => setComposerVisible(true)}
      >
        <Feather name="edit-3" size={20} color="#fff" />
      </TouchableOpacity>

      <CommentsSheet
        post={openPost}
        comments={openPostComments?.items}
        loading={!!openPostComments?.loading}
        error={openPostComments?.error}
        sending={sendingComment}
        currentUserId={currentUserId}
        onClose={() => setOpenId(null)}
        onSend={sendComment}
        onRetry={() => openId && loadComments(openId, { force: true })}
        onDeleteComment={deleteComment}
      />

      <NewPostSheet
        visible={composerVisible}
        text={composerText}
        sending={composerSending}
        onChangeText={setComposerText}
        onClose={() => !composerSending && setComposerVisible(false)}
        onSubmit={submitComposer}
      />
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
  centerState: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 30 },

  /* fab */
  fab: {
    position: "absolute",
    right: 20,
    bottom: 24,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: CORES.COMUNIDADE_ACCENT,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#101828",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },

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
  deleteBtn: { padding: 6, marginLeft: 8 },
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
    marginTop: 13,
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
    marginTop: 13,
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
  retryBtn: { marginTop: 12, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 999, backgroundColor: CORES.COMUNIDADE_ACCENT_SOFT },
  retryText: { color: CORES.COMUNIDADE_ACCENT, fontWeight: "800", fontSize: 13.5 },
  commentRow: { flexDirection: "row", alignItems: "flex-start", paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#F4F6FA" },
  commentDeleteBtn: { padding: 4, marginLeft: 6 },
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

  /* novo post */
  newPostSheet: {
    minHeight: 260,
    backgroundColor: CORES.WHITE,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    overflow: "hidden",
  },
  newPostInput: {
    minHeight: 110,
    borderWidth: 1.5,
    borderColor: "#E7EBF2",
    borderRadius: 16,
    padding: 14,
    fontSize: 15,
    color: CORES.COMUNIDADE_TEXT,
    backgroundColor: "#F7F9FC",
    textAlignVertical: "top",
  },
  newPostFooter: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 20 },
  publishBtn: {
    height: 48, borderRadius: 999, backgroundColor: CORES.COMUNIDADE_ACCENT,
    alignItems: "center", justifyContent: "center",
  },
  publishBtnText: { color: "#fff", fontWeight: "800", fontSize: 15 },
});
