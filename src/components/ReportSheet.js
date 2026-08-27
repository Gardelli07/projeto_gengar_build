import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import CORES from "../util/cores";

const MOTIVOS = [
  { value: "spam", label: "Spam ou propaganda" },
  { value: "conteudo_ofensivo", label: "Conteúdo ofensivo ou discurso de ódio" },
  { value: "assedio", label: "Assédio ou bullying" },
  { value: "conteudo_sexual", label: "Conteúdo sexual impróprio" },
  { value: "informacao_falsa", label: "Informação falsa ou enganosa" },
  { value: "outro", label: "Outro" },
];

// Sheet reutilizado para denunciar posts, comentarios e usuarios da
// comunidade — quem abre decide o alvo (ver Comunidade.js/PerfilVisitado.js).
export default function ReportSheet({ visible, sending, onClose, onSubmit }) {
  const [motivo, setMotivo] = useState(null);
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    if (visible) {
      setMotivo(null);
      setDescricao("");
    }
  }, [visible]);

  const descricaoObrigatoria = motivo === "outro";
  const podeEnviar = !!motivo && (!descricaoObrigatoria || descricao.trim().length > 0) && !sending;

  const handleSubmit = () => {
    if (!podeEnviar) return;
    onSubmit(motivo, descricao.trim() || undefined);
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

          <View style={styles.header}>
            <Text style={styles.title}>Denunciar</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Feather name="x" size={16} color={CORES.COMUNIDADE_MUTED} />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>Por que você está denunciando isso?</Text>

          <View style={styles.options}>
            {MOTIVOS.map((opcao) => {
              const selecionado = motivo === opcao.value;
              return (
                <TouchableOpacity
                  key={opcao.value}
                  style={styles.option}
                  activeOpacity={0.7}
                  onPress={() => setMotivo(opcao.value)}
                >
                  <View style={[styles.radio, selecionado && styles.radioSelected]}>
                    {selecionado && <View style={styles.radioDot} />}
                  </View>
                  <Text style={styles.optionLabel}>{opcao.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TextInput
            value={descricao}
            onChangeText={setDescricao}
            placeholder={
              descricaoObrigatoria
                ? "Conte mais detalhes (obrigatório para 'Outro')"
                : "Detalhes adicionais (opcional)"
            }
            placeholderTextColor={CORES.COMUNIDADE_MUTED_2}
            style={styles.input}
            multiline
            editable={!sending}
          />

          <TouchableOpacity
            onPress={handleSubmit}
            style={[styles.submitBtn, { opacity: podeEnviar ? 1 : 0.5 }]}
            activeOpacity={0.85}
            disabled={!podeEnviar}
          >
            {sending ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.submitBtnText}>Enviar denúncia</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrim: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(16,24,40,0.45)" },
  sheetWrap: { flex: 1, justifyContent: "flex-end" },
  sheet: {
    backgroundColor: CORES.WHITE,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingBottom: 24,
  },
  grabber: { width: 40, height: 5, borderRadius: 999, backgroundColor: "#DCE1EA", alignSelf: "center", marginTop: 10, marginBottom: 4 },
  header: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 20, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#F0F2F6",
  },
  title: { fontSize: 17, fontWeight: "800", color: CORES.COMUNIDADE_TEXT },
  closeBtn: { width: 30, height: 30, borderRadius: 15, backgroundColor: "#F1F4FB", alignItems: "center", justifyContent: "center" },
  subtitle: {
    fontSize: 13.5, fontWeight: "700", color: CORES.COMUNIDADE_TEXT_2,
    paddingHorizontal: 20, marginTop: 16, marginBottom: 8,
  },
  options: { paddingHorizontal: 20 },
  option: { flexDirection: "row", alignItems: "center", paddingVertical: 10 },
  radio: {
    width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: "#D0D5DD",
    alignItems: "center", justifyContent: "center", marginRight: 12,
  },
  radioSelected: { borderColor: CORES.COMUNIDADE_ACCENT },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: CORES.COMUNIDADE_ACCENT },
  optionLabel: { flex: 1, fontSize: 14.5, fontWeight: "600", color: CORES.COMUNIDADE_TEXT },
  input: {
    minHeight: 70,
    borderWidth: 1.5,
    borderColor: "#E7EBF2",
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 20,
    marginTop: 8,
    fontSize: 14.5,
    color: CORES.COMUNIDADE_TEXT,
    backgroundColor: "#F7F9FC",
    textAlignVertical: "top",
  },
  submitBtn: {
    height: 48, borderRadius: 999, backgroundColor: CORES.COMUNIDADE_ACCENT,
    alignItems: "center", justifyContent: "center",
    marginHorizontal: 20, marginTop: 16,
  },
  submitBtnText: { color: "#fff", fontWeight: "800", fontSize: 15 },
});
