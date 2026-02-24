import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Animated,
  Dimensions,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-audio";
import CORES from "../../../util/cores";

const { width } = Dimensions.get("window");
const TOTAL_SLIDES = 7;
const STORAGE_KEY = "@curso_progress_v1";

export default function MobileLessonComponent({ route, navigation }) {
  // try to get lesson from route params (CourseScreen envia { lesson })
  const lesson = route?.params?.lesson;

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [currentRecordingType, setCurrentRecordingType] = useState(null);
  const [recordingsMap, setRecordingsMap] = useState({});
  const [recordedURIs, setRecordedURIs] = useState({});
  const [soundsMap, setSoundsMap] = useState({});

  // Inputs / estados de atividades
  const [informalName, setInformalName] = useState("");
  const [informalIntro, setInformalIntro] = useState("");
  const [informalGenerated, setInformalGenerated] = useState("");
  const [informalResultVisible, setInformalResultVisible] = useState(false);

  const [formalName, setFormalName] = useState("");
  const [formalCompany, setFormalCompany] = useState("");
  const [formalDepartment, setFormalDepartment] = useState("");
  const [formalGenerated, setFormalGenerated] = useState("");
  const [formalResultVisible, setFormalResultVisible] = useState(false);

  const [writingInformal, setWritingInformal] = useState("");
  const [writingInformalFeedback, setWritingInformalFeedback] = useState("");
  const [writingInformalVisible, setWritingInformalVisible] = useState(false);

  const [writingFormal, setWritingFormal] = useState("");
  const [writingFormalFeedback, setWritingFormalFeedback] = useState("");
  const [writingFormalVisible, setWritingFormalVisible] = useState(false);

  const [roleplayResultVisible, setRoleplayResultVisible] = useState(false);

  // local flag to avoid multiple saves
  const [markedCompleteLocal, setMarkedCompleteLocal] = useState(false);

  const progressAnim = useRef(new Animated.Value(0)).current;

  // --- progress helpers ---
  async function loadProgress() {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      console.warn("loadProgress error", e);
      return {};
    }
  }

  async function saveProgress(progress) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn("saveProgress error", e);
    }
  }

  // marca lição como concluída (por id) — usa mesma chave que Bussines.js
  async function markLessonComplete(lessonId) {
    if (!lessonId) {
      console.warn("markLessonComplete called without lessonId");
      return;
    }

    try {
      const p = await loadProgress();

      if (p[lessonId]) {
        // já marcado
        return;
      }

      const newP = { ...p, [lessonId]: true };
      await saveProgress(newP);
      setMarkedCompleteLocal(true);
    } catch (e) {
      console.warn("markLessonComplete error", e);
    }
  }

  // Gera apresentação formal baseada nos campos preenchidos
  function generateFormalIntro() {
    const name = (formalName || "").trim();
    const company = (formalCompany || "").trim();
    const dept = (formalDepartment || "").trim();

    if (!name || !company || !dept) {
      Alert.alert(
        "Atenção",
        "Preencha nome completo, empresa e departamento para gerar a apresentação.",
      );
      return;
    }

    const intro = `Hello, my name is ${name}. I work at ${company} in the ${dept} department. Pleased to meet you.`;
    setFormalGenerated(intro);
    setFormalResultVisible(true);
  }

  // Verifica apresentação informal escrita pelo aluno
  function checkInformalWriting() {
    if (!writingInformal || writingInformal.length <= 10) {
      Alert.alert(
        "Atenção",
        "Por favor, escreva uma apresentação informal mais completa!",
      );
      return;
    }

    const text = writingInformal.toLowerCase();
    const hasHi = text.includes("hi") || text.includes("hey");
    const hasName =
      text.includes("i'm") ||
      text.includes("im ") ||
      text.includes("my name is");
    const hasHow =
      text.includes("how's") ||
      text.includes("how is") ||
      text.includes("how are you");

    let feedback = "Legal! ";
    let score = 0;
    if (hasHi) {
      feedback += "✅ Você usou um cumprimento informal. ";
      score++;
    }
    if (hasName) {
      feedback += "✅ Você se apresentou. ";
      score++;
    }
    if (hasHow) {
      feedback += "✅ Você manteve a conversa amigável. ";
      score++;
    }

    if (score >= 3)
      feedback +=
        "Excelente! Sua apresentação informal está natural e simpática.";
    else if (score === 2)
      feedback +=
        "Muito bom! Experimente adicionar uma pergunta como 'How's it going?'";
    else
      feedback +=
        "Bom início! Tente usar: Hi/Hey, seu nome e uma pergunta simples.";

    setWritingInformalFeedback(feedback);
    setWritingInformalVisible(true);
  }

  function checkFormalWriting() {
    if (!writingFormal || writingFormal.length <= 10) {
      Alert.alert(
        "Atenção",
        "Por favor, escreva uma apresentação mais completa!",
      );
      return;
    }

    const text = writingFormal.toLowerCase();
    const hasHello = text.includes("hello");
    const hasFullName = text.includes("my name is");
    const hasCompany = text.includes("work at") || text.includes("company");
    const hasPleased = text.includes("pleased") || text.includes("meet");

    let feedback = "Excelente! ";
    let score = 0;
    if (hasHello) {
      feedback += "✅ Você usou um cumprimento formal. ";
      score++;
    }
    if (hasFullName) {
      feedback += "✅ Você se apresentou formalmente. ";
      score++;
    }
    if (hasCompany) {
      feedback += "✅ Você mencionou sua empresa. ";
      score++;
    }
    if (hasPleased) {
      feedback += "✅ Você foi cortês. ";
      score++;
    }

    if (score >= 3)
      feedback += "Sua apresentação formal está profissional e completa!";
    else if (score >= 2)
      feedback += "Muito bom! Considere incluir mais detalhes profissionais.";
    else
      feedback +=
        "Bom início! Lembre-se: Hello, nome completo, empresa e cortesia.";

    setWritingFormalFeedback(feedback);
    setWritingFormalVisible(true);
  }

  function startRecording(type) {
    (async () => {
      try {
        if (isRecording) return;
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permissão negada",
            "Permita o uso do microfone nas configurações.",
          );
          return;
        }

        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const recording = new Audio.Recording();
        await recording.prepareToRecordAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
        );
        await recording.startAsync();

        setRecordingsMap((p) => ({ ...p, [type]: recording }));
        setIsRecording(true);
        setCurrentRecordingType(type);
      } catch (e) {
        console.warn("startRecording error", e);
        Alert.alert("Erro", "Não foi possível iniciar a gravação.");
      }
    })();
  }

  function stopRecording(type) {
    (async () => {
      try {
        const rec = recordingsMap[type];
        if (!rec) {
          setIsRecording(false);
          setCurrentRecordingType(null);
          return;
        }
        await rec.stopAndUnloadAsync();
        const uri = rec.getURI();
        setRecordedURIs((p) => ({ ...p, [type]: uri }));
        setRecordingsMap((p) => {
          const copy = { ...p };
          delete copy[type];
          return copy;
        });
        setIsRecording(false);
        setCurrentRecordingType(null);
        Alert.alert(
          "Gravação",
          "Gravação salva! Você pode reproduzir ou regravar.",
        );
      } catch (e) {
        console.warn("stopRecording error", e);
        Alert.alert("Erro", "Não foi possível salvar a gravação.");
      }
    })();
  }

  async function playRecording(type) {
    try {
      const uri = recordedURIs[type];
      if (!uri) return;
      if (soundsMap[type]) {
        try {
          await soundsMap[type].unloadAsync();
        } catch (e) {}
      }
      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true },
      );
      setSoundsMap((p) => ({ ...p, [type]: sound }));
    } catch (e) {
      console.warn("playRecording error", e);
      Alert.alert("Erro", "Não foi possível reproduzir o áudio.");
    }
  }

  function reRecord(type) {
    setRecordedURIs((p) => {
      const copy = { ...p };
      delete copy[type];
      return copy;
    });
    if (soundsMap[type]) {
      (async () => {
        try {
          await soundsMap[type].unloadAsync();
        } catch (e) {}
        setSoundsMap((p) => {
          const copy = { ...p };
          delete copy[type];
          return copy;
        });
      })();
    }
  }

  useEffect(() => {
    return () => {
      Object.values(recordingsMap).forEach((rec) => {
        try {
          rec.stopAndUnloadAsync();
        } catch (e) {}
      });
      Object.values(soundsMap).forEach((s) => {
        try {
          s.unloadAsync();
        } catch (e) {}
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reinicia a lição e limpa estados visíveis/gerados
  function restartLesson() {
    setCurrentSlideIndex(0);
    // Limpa resultados informais
    setInformalGenerated("");
    setInformalResultVisible(false);
    setInformalName("");
    setInformalIntro("");

    // Limpa resultados formais
    setFormalGenerated("");
    setFormalResultVisible(false);
    setFormalName("");
    setFormalCompany("");
    setFormalDepartment("");

    // Limpa textos de escrita e feedback
    setWritingInformal("");
    setWritingInformalFeedback("");
    setWritingInformalVisible(false);

    setWritingFormal("");
    setWritingFormalFeedback("");
    setWritingFormalVisible(false);

    setRoleplayResultVisible(false);
  }

  function renderPhraseItem(title, phonetic, translation, formal) {
    return (
      <View
        style={[
          styles.phraseItem,
          formal && styles.formalPhrase,
          { width: width * 0.7 },
        ]}
      >
        <Text style={styles.phraseTitle}>{title}</Text>
        <Text style={styles.phrasePhonetic}>{phonetic}</Text>
        <Text style={styles.phraseTranslation}>{translation}</Text>
      </View>
    );
  }

  // ----- helper: render Next button for a given slide index
  function renderNextButton(index) {
    // show button when user is on the provided index
    if (currentSlideIndex === index && currentSlideIndex < TOTAL_SLIDES - 1) {
      return (
        <View style={{ alignItems: "center", marginTop: 18 }}>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() =>
              setCurrentSlideIndex((i) => Math.min(i + 1, TOTAL_SLIDES - 1))
            }
            accessibilityLabel="Próximo slide"
          >
            <Text style={styles.btnText}>Próximo →</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }

  // marca automaticamente a lição ao chegar no último slide
  useEffect(() => {
    const isLast = currentSlideIndex === TOTAL_SLIDES - 1;
    if (isLast && !markedCompleteLocal) {
      if (lesson && lesson.id) {
        // marca e volta para tela de curso para atualizar porcentagem
        markLessonComplete(lesson.id).then(() => {
          // pequeno delay para o usuário ver o alerta; depois volta para a tela do curso
          setTimeout(() => {
            // volta para a tela anterior (CourseScreen) que recarrega o progresso no focus
          }, 800);
        });
      } else {
        // se não tiver lesson.id, apenas marca flag local (não salva) e avisa dev
        console.warn(
          "Nenhum lesson.id disponível em route.params — não foi possível salvar progresso.",
        );
        setMarkedCompleteLocal(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlideIndex]);

  // Render helpers para cada slide (mantive seu conteúdo original)
  function renderSlide1() {
    return (
      <ScrollView contentContainerStyle={styles.hero}>
        <Text style={styles.heroIcon}>🤝</Text>
        <Text style={styles.heroTitle}>Business English</Text>
        <Text style={styles.heroSubtitle}>
          Aprenda a se apresentar formal e informalmente no trabalho.
        </Text>
        <TouchableOpacity
          accessibilityLabel="Começar aula"
          testID="hero-start"
          style={styles.heroButton}
          onPress={() => setCurrentSlideIndex(1)}
        >
          <Text style={styles.heroButtonText}>▶ Começar</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  function renderSlide2() {
    return (
      <ScrollView contentContainerStyle={styles.dialogueWrapper}>
        <Text style={styles.dialogueTitle}>Objetivo da Aula</Text>
        <Text style={styles.dialogueSubtitle}>
          Aprender a se apresentar de forma formal e informal no ambiente de
          trabalho.
        </Text>

        <View style={styles.objectiveCard}>
          <Text style={styles.objectiveIcon}>🎯</Text>
          <Text style={styles.objectiveText}>
            Pratique apresentações com foco em clareza, tom profissional e
            cordialidade.
          </Text>
        </View>

        <Text style={{ fontWeight: "bold", marginTop: 16 }}>Opções:</Text>
        <View style={styles.optionCard}>
          <Text style={styles.optionIcon}>💬</Text>
          <Text style={styles.optionTitle}>Diálogos</Text>
          <Text style={styles.optionText}>
            Frases essenciais para conversas profissionais.
          </Text>
        </View>
        <View style={styles.optionCard}>
          <Text style={styles.optionIcon}>📖</Text>
          <Text style={styles.optionTitle}>Prática</Text>
          <Text style={styles.optionText}>
            Exercícios interativos para fixar o aprendizado.
          </Text>
        </View>
        {renderNextButton(1)}
      </ScrollView>
    );
  }

  function renderSlide3() {
    return (
      <ScrollView contentContainerStyle={styles.slideContent}>
        <Text style={styles.sectionTitle}>Cumprimentos Informais</Text>
        <Text style={styles.sectionSubtitle}>
          Para colegas próximos e situações casuais
        </Text>

        <Text style={styles.sectionHeading}>🤝 Frases Informais</Text>
        {renderPhraseItem(
          '"Hi, I\'m [nome]"',
          "🔊 /haɪ, aɪm [nome]/",
          "Oi, eu sou [nome]",
          false,
        )}
        {renderPhraseItem(
          '"Hey, nice to meet you!"',
          "🔊 /heɪ, naɪs tu mit ju/",
          "Oi, prazer em conhecê-lo!",
          false,
        )}
        {renderPhraseItem(
          '"How\'s it going?"',
          "🔊 /haʊz ɪt ˈɡoʊɪŋ/",
          "Como vai?",
          false,
        )}
        <View style={styles.tipBox}>
          <Text style={styles.tipTitle}>💡Dica:</Text>
          <Text style={styles.tipText}>
            Use cumprimentos informais com colegas próximos, amigos do trabalho
            ou em ambientes descontraídos.
          </Text>
        </View>

        <View style={styles.exerciseCard}>
          <Text style={styles.cardTitle}>✍️ Sua Apresentação Informal</Text>
          <Text style={styles.paragraph}>
            Escreva sua própria apresentação informal:
          </Text>

          <Text style={styles.label}>Seu nome:</Text>
          <TextInput
            placeholder="Digite seu nome"
            style={[styles.input, styles.singleLine]}
            value={informalName}
            onChangeText={setInformalName}
          />

          <Text style={styles.label}>Sua apresentação informal:</Text>
          <TextInput
            placeholder="Ex: Hi, I'm Maria! Nice to meet you. How's it going?"
            style={[styles.input, styles.multiline]}
            value={informalIntro}
            onChangeText={setInformalIntro}
            multiline
          />

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => {
              if (!informalName || informalName.trim() === "") {
                Alert.alert("Atenção", "Por favor, digite seu nome primeiro!");
                return;
              }
              const examples = [
                `Hi, I'm ${informalName}! Nice to meet you. How's it going?`,
                `Hey there! I'm ${informalName}. How's your day going?`,
                `Hi! ${informalName} here. Great to meet you!`,
              ];
              const randomExample =
                examples[Math.floor(Math.random() * examples.length)];
              setInformalGenerated(randomExample);
              setInformalResultVisible(true);
            }}
          >
            <Text style={styles.btnText}>Gerar Exemplo</Text>
          </TouchableOpacity>

          {informalResultVisible && (
            <View style={styles.feedbackBox}>
              <Text style={styles.feedbackTitle}>✅ Exemplo gerado:</Text>
              <Text style={styles.feedbackText}>{informalGenerated}</Text>
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.recordButton,
              isRecording &&
                currentRecordingType === "informal" &&
                styles.recording,
            ]}
            onPress={() => {
              if (isRecording && currentRecordingType === "informal")
                stopRecording("informal");
              else startRecording("informal");
            }}
          >
            <Text style={styles.recordBtnText}>
              {isRecording && currentRecordingType === "informal"
                ? "⏹ Parar gravação"
                : "🎤 Pratique sua pronúncia"}
            </Text>
          </TouchableOpacity>
          <Text style={styles.smallText}>
            Grave-se falando sua apresentação informal
          </Text>

          {recordedURIs["informal"] && (
            <View style={{ alignItems: "center", marginTop: 8 }}>
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={() => playRecording("informal")}
              >
                <Text style={styles.btnText}>▶ Reproduzir Gravação</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.primaryBtn,
                  { marginTop: 8, backgroundColor: "#ef4444" },
                ]}
                onPress={() => reRecord("informal")}
              >
                <Text style={styles.btnText}>🔁 Regravar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {renderNextButton(2)}
      </ScrollView>
    );
  }

  function renderSlide4() {
    return (
      <ScrollView contentContainerStyle={styles.slideContent}>
        <Text style={styles.sectionTitle}>Cumprimentos Formais</Text>
        <Text style={styles.sectionSubtitle}>
          Para reuniões, chefes e clientes
        </Text>

        <Text style={styles.sectionHeading}>🎩 Frases Formais</Text>
        {renderPhraseItem(
          '"Hello, my name is [nome]"',
          "🔊 /həˈloʊ, maɪ neɪm ɪz [nome]/",
          "Olá, meu nome é [nome]",
          true,
        )}
        {renderPhraseItem(
          '"I work at [empresa] in the [departamento] department"',
          "🔊 /aɪ wɜrk æt [empresa] ɪn ðə [departamento] dɪˈpɑrtmənt/",
          "Trabalho na [empresa] no departamento de [departamento]",
          true,
        )}
        {renderPhraseItem(
          '"Pleased to meet you"',
          "🔊 /plizd tu mit ju/",
          "Prazer em conhecê-lo",
          true,
        )}
        <View style={styles.tipBox}>
          <Text style={styles.tipTitle}>💼 Dica:</Text>
          <Text style={styles.tipText}>
            Use cumprimentos formais em reuniões, com chefes, clientes ou em
            situações profissionais importantes.
          </Text>
        </View>

        <View style={styles.exerciseCard}>
          <Text style={styles.cardTitle}>✍️ Sua Apresentação Formal</Text>
          <Text style={styles.paragraph}>
            Escreva sua própria apresentação formal:
          </Text>

          <Text style={styles.label}>Seu nome completo:</Text>
          <TextInput
            placeholder="Digite seu nome completo"
            style={[styles.input, styles.singleLine]}
            value={formalName}
            onChangeText={setFormalName}
          />

          <Text style={styles.label}>Sua empresa:</Text>
          <TextInput
            placeholder="Ex: Google, Microsoft..."
            style={[styles.input, styles.singleLine]}
            value={formalCompany}
            onChangeText={setFormalCompany}
          />

          <Text style={styles.label}>Seu departamento:</Text>
          <TextInput
            placeholder="Ex: Marketing, IT, Sales..."
            style={[styles.input, styles.singleLine]}
            value={formalDepartment}
            onChangeText={setFormalDepartment}
          />

          <TouchableOpacity
            style={[styles.primaryBtn, styles.blueBtn]}
            onPress={generateFormalIntro}
          >
            <Text style={styles.btnText}>Gerar Apresentação Formal</Text>
          </TouchableOpacity>

          {formalResultVisible && (
            <View style={styles.feedbackBox}>
              <Text style={styles.feedbackTitle}>
                ✅ Sua apresentação formal:
              </Text>
              <Text style={styles.feedbackText}>{formalGenerated}</Text>
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.recordButton,
              isRecording &&
                currentRecordingType === "formal" &&
                styles.recording,
            ]}
            onPress={() => {
              if (isRecording && currentRecordingType === "formal")
                stopRecording("formal");
              else startRecording("formal");
            }}
          >
            <Text style={styles.recordBtnText}>
              {isRecording && currentRecordingType === "formal"
                ? "⏹ Parar gravação"
                : "🎤 Pratique sua pronúncia"}
            </Text>
          </TouchableOpacity>
          <Text style={styles.smallText}>
            Grave-se falando sua apresentação formal
          </Text>

          {recordedURIs["formal"] && (
            <View style={{ alignItems: "center", marginTop: 8 }}>
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={() => playRecording("formal")}
              >
                <Text style={styles.btnText}>▶ Reproduzir Gravação</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.primaryBtn,
                  { marginTop: 8, backgroundColor: "#ef4444" },
                ]}
                onPress={() => reRecord("formal")}
              >
                <Text style={styles.btnText}>🔁 Regravar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {renderNextButton(3)}
      </ScrollView>
    );
  }

  function renderSlide5() {
    return (
      <ScrollView contentContainerStyle={styles.slideContent}>
        <Text style={styles.sectionTitle}>Role-Play Simples</Text>
        <Text style={styles.sectionSubtitle}>Pratique com situações reais</Text>

        <Text style={styles.sectionHeading}>🎭 Instruções</Text>
        <View style={styles.instructionBox}>
          <Text style={styles.paragraph}>Pratique estas situações:</Text>
          <Text style={styles.listItem}>
            🤝 Cumprimente informalmente um colega
          </Text>
          <Text style={styles.listItem}>
            💼 Cumprimente formalmente seu chefe
          </Text>
          <Text style={styles.listItem}>🎯 Apresente-se em uma reunião</Text>
        </View>
        <View style={styles.tipBox}>
          <Text style={styles.tipEmoji}>🎬</Text>
          <Text style={styles.tipTitle}>Como praticar:</Text>
          <Text style={styles.tipText}>
            • Grave um áudio ou vídeo {"\n"}• Pratique com um colega {"\n"}•
            Fale em frente ao espelho {"\n"}• Repita até se sentir confiante
          </Text>
        </View>

        <View style={styles.exerciseCard}>
          <Text style={styles.cardTitle}>🎬 Cenários de Prática</Text>

          <View style={styles.scenarioBoxOrange}>
            <Text style={styles.scenarioTitle}>Cenário 1: Informal</Text>
            <Text style={styles.paragraph}>
              Você encontra um colega no corredor da empresa.
            </Text>
            <View style={styles.convoBubbleA}>
              <Text style={styles.paragraph}>
                <Text style={{ fontWeight: "700" }}>Você:</Text> "Hi! How's it
                going?"
              </Text>
            </View>
            <View style={styles.convoBubbleB}>
              <Text style={styles.paragraph}>
                <Text style={{ fontWeight: "700" }}>Colega:</Text> "Hey! Good,
                thanks. How about you?"
              </Text>
            </View>
          </View>

          <View style={styles.scenarioBoxBlue}>
            <Text style={styles.scenarioTitle}>Cenário 2: Formal</Text>
            <Text style={styles.paragraph}>
              Você está em uma reunião com clientes.
            </Text>
            <View style={styles.convoBubbleA}>
              <Text style={styles.paragraph}>
                <Text style={{ fontWeight: "700" }}>Você:</Text> "Hello, my name
                is [seu nome]. I work at [empresa] in the marketing department."
              </Text>
            </View>
            <View style={styles.convoOrange}>
              <Text style={styles.paragraph}>
                <Text style={{ fontWeight: "700" }}>Cliente:</Text> "Pleased to
                meet you. I'm John from ABC Corp."
              </Text>
            </View>
          </View>

          <View style={styles.rowFlex}>
            <TouchableOpacity
              style={[
                styles.recordButton,
                styles.flex1,
                isRecording &&
                  currentRecordingType === "roleplay" &&
                  styles.recording,
              ]}
              onPress={() => {
                if (isRecording && currentRecordingType === "roleplay")
                  stopRecording("roleplay");
                else startRecording("roleplay");
              }}
            >
              <Text style={styles.recordBtnText}>
                {isRecording && currentRecordingType === "roleplay"
                  ? "⏹ Parar gravação"
                  : "🎤 Gravar Áudio"}
              </Text>
            </TouchableOpacity>

            {recordedURIs["roleplay"] && (
              <View style={{ alignItems: "center", marginTop: 8 }}>
                <TouchableOpacity
                  style={styles.primaryBtn}
                  onPress={() => playRecording("roleplay")}
                >
                  <Text style={styles.btnText}>▶ Reproduzir Gravação</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.primaryBtn,
                    { marginTop: 8, backgroundColor: "#ef4444" },
                  ]}
                  onPress={() => reRecord("roleplay")}
                >
                  <Text style={styles.btnText}>🔁 Regravar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {roleplayResultVisible && (
            <View style={styles.feedbackBox}>
              <Text style={styles.feedbackTitle}>✅ Ótimo trabalho!</Text>
              <Text style={styles.feedbackText}>
                Continue praticando para melhorar sua fluência e confiança!
              </Text>
            </View>
          )}
        </View>

        {renderNextButton(4)}
      </ScrollView>
    );
  }

  function renderSlide6() {
    return (
      <ScrollView contentContainerStyle={styles.slideContent}>
        <Text style={styles.sectionTitle}>Sua Apresentação</Text>
        <Text style={styles.sectionSubtitle}>
          Escreva suas próprias apresentações
        </Text>

        <View style={styles.exerciseCardLarge}>
          <Text style={styles.cardTitle}>🤝 Apresentação Informal</Text>
          <View style={styles.modelBox}>
            <Text style={styles.modelTitle}>Modelo de frases:</Text>
            <Text style={styles.modelText}>
              • "Hi, I'm [nome]"{"\n"}• "Nice to meet you!"{"\n"}• "I work in
              [área]"{"\n"}• "How's your day going?"
            </Text>
          </View>

          <Text style={styles.label}>Escreva sua apresentação informal:</Text>
          <TextInput
            placeholder="Ex: Hi, I'm Maria!..."
            style={[styles.input, styles.multiline]}
            value={writingInformal}
            onChangeText={setWritingInformal}
            multiline
          />
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={checkInformalWriting}
          >
            <Text style={styles.btnText}>Verificar Apresentação</Text>
          </TouchableOpacity>
          {writingInformalVisible && (
            <View style={styles.feedbackBox}>
              <Text style={styles.feedbackTitle}>✅ Feedback:</Text>
              <Text style={styles.feedbackText}>{writingInformalFeedback}</Text>
            </View>
          )}
        </View>

        <View style={styles.exerciseCardLarge}>
          <Text style={styles.cardTitle}>💼 Apresentação Formal</Text>
          <View style={styles.modelBoxBlue}>
            <Text style={styles.modelTitle}>Modelo de frases:</Text>
            <Text style={styles.modelText}>
              • "Hello, my name is [nome]"{"\n"}• "I work at [empresa]"{"\n"}•
              "I'm in the [departamento] department"{"\n"}• "Pleased to meet
              you"
            </Text>
          </View>
          <Text style={styles.label}>Escreva sua apresentação formal:</Text>
          <TextInput
            placeholder="Ex: Hello, my name is Maria Silva..."
            style={[styles.input, styles.multiline]}
            value={writingFormal}
            onChangeText={setWritingFormal}
            multiline
          />
          <TouchableOpacity
            style={[styles.primaryBtn, styles.blueBtn]}
            onPress={checkFormalWriting}
          >
            <Text style={styles.btnText}>Verificar Apresentação</Text>
          </TouchableOpacity>
          {writingFormalVisible && (
            <View style={styles.feedbackBox}>
              <Text style={styles.feedbackTitle}>✅ Feedback:</Text>
              <Text style={styles.feedbackText}>{writingFormalFeedback}</Text>
            </View>
          )}
        </View>

        {renderNextButton(5)}
      </ScrollView>
    );
  }

  function renderSlide7() {
    return (
      <ScrollView
        contentContainerStyle={[styles.slideContent, { paddingBottom: 40 }]}
      >
        <Text style={styles.sectionTitle}>Resumo e Dicas</Text>
        <Text style={styles.sectionSubtitle}>Principais pontos da aula</Text>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.bigEmoji}>🤝</Text>
            <Text style={styles.summaryTitle}>Informal</Text>
            <Text style={styles.summaryText}>
              Quando usar:{"\n"}• Amigos do trabalho{"\n"}• Colegas próximos
              {"\n"}• Ambientes descontraídos{"\n"}• Coffee breaks
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.bigEmoji}>💼</Text>
            <Text style={styles.summaryTitle}>Formal</Text>
            <Text style={styles.summaryText}>
              Quando usar:{"\n"}• Reuniões importantes{"\n"}• Chefes e diretores
              {"\n"}• Clientes externos{"\n"}• Apresentações
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.tipsBlock,
            { marginTop: 24, width: "100%", maxWidth: 400 },
          ]}
        >
          <Text style={styles.cardTitle}>Dicas para o Sucesso</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 8,
              marginBottom: 8,
            }}
          >
            <View style={styles.tipSmall}>
              <Text style={styles.tipEmoji}>🗣️</Text>
              <Text style={styles.tipSmallTitle}>
                Pratique em{"\n"} voz alta
              </Text>
            </View>
            <View style={styles.tipSmall}>
              <Text style={styles.tipEmoji}>🎧</Text>
              <Text style={styles.tipSmallTitle}>Ouça {"\n"}nativos</Text>
            </View>
            <View style={styles.tipSmall}>
              <Text style={styles.tipEmoji}>💪</Text>
              <Text style={styles.tipSmallTitle}>Seja {"\n"}confiante</Text>
            </View>
          </View>
          <View style={styles.centerBoxLarge}>
            <Text style={styles.congratsTitle}>🎉 Parabéns!</Text>
            <Text style={styles.paragraph}>
              Você completou a introdução ao Business English!
            </Text>
            <TouchableOpacity
              style={styles.primaryBtnLarge}
              onPress={restartLesson}
            >
              <Text style={styles.btnText}>🔄 Revisar Aula</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.primaryBtnLarge,
                styles.blueBtn,
                { marginTop: 12 },
              ]}
              onPress={() => {
                const nextScreen =
                  route?.params?.nextScreen ||
                  route?.params?.lesson?.nextScreen ||
                  "ProfessionalEmails";
                const lessonToPass = route?.params?.lesson || route?.params;
                if (navigation && nextScreen) {
                  navigation.reset({
                    index: 1,
                    routes: [
                      { name: "Bussines" },
                      {
                        name: nextScreen,
                        params: { lesson: lessonToPass },
                      },
                    ],
                  });
                }
              }}
              accessibilityLabel="Próxima atividade"
            >
              <Text style={styles.btnText}>Próxima Atividade →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }

  // função que escolhe o slide atual
  function renderCurrentSlide() {
    switch (currentSlideIndex) {
      case 0:
        return renderSlide1();
      case 1:
        return renderSlide2();
      case 2:
        return renderSlide3();
      case 3:
        return renderSlide4();
      case 4:
        return renderSlide5();
      case 5:
        return renderSlide6();
      case 6:
        return renderSlide7();
      default:
        return null;
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.slideWrapper, { padding: 0 }]}>
        {renderCurrentSlide()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Layout
  container: { flex: 1, backgroundColor: "#f8fafc" },
  // Slides
  slideWrapper: { flex: 1 },
  slideContent: { paddingBottom: 140, alignItems: "center" },
  dialogueWrapper: {
    paddingBottom: 120,
    alignItems: "center",
    paddingHorizontal: 18,
    backgroundColor: "#fff",
  },

  // Emojis & headings
  emojiRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  emoji: { fontSize: 56, marginHorizontal: 10 },
  emojiRowSmall: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  emojiSmall: { fontSize: 36, marginHorizontal: 10, opacity: 0.95 },

  // Typography tokens
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: CORES.PRIMARY,
    textAlign: "center",
  },
  whiteBox: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  bigHeading: {
    fontSize: 32,
    fontWeight: "800",
    color: CORES.PRIMARY,
    textAlign: "center",
    marginBottom: 14,
  },
  centerBox: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  bigEmoji: { fontSize: 30, marginBottom: 8 },
  bigEmoji: {
    fontSize: 30,
    marginBottom: 8,
    textAlign: "center",
    alignSelf: "center",
  },
  paragraph: {
    fontSize: 16,
    color: CORES.PRIMARY,
    textAlign: "center",
    lineHeight: 22,
  },
  gradientText: { color: CORES.SECONDARY, fontWeight: "700" },

  // Grid
  rowGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 16,
  },
  gridItem: { flex: 1, alignItems: "center", padding: 8 },
  gridEmoji: { fontSize: 40, marginBottom: 6 },
  gridTitle: { fontSize: 18, fontWeight: "700", color: CORES.PRIMARY },
  gridText: { fontSize: 14, color: "#64748b", textAlign: "center" },

  // Sections & columns
  sectionTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: CORES.PRIMARY,
    marginBottom: 6,
    marginTop: 12,
  },
  sectionSubtitle: { fontSize: 16, color: "#64748b", marginBottom: 12 },
  twoColumn: { flexDirection: "row", width: "100%" },
  leftColumn: { flex: 1, paddingRight: 8 },
  rightColumn: { flex: 1, paddingLeft: 8 },
  sectionHeading: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    color: CORES.PRIMARY,
  },

  // Phrase items
  phraseItem: {
    backgroundColor: "#fff7ed",
    borderLeftWidth: 4,
    borderLeftColor: CORES.SECONDARY,
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    maxWidth: 340,
  },
  formalPhrase: { backgroundColor: "#f0f9ff", borderLeftColor: CORES.PRIMARY },
  phraseTitle: { fontSize: 18, fontWeight: "700", color: CORES.PRIMARY },
  phrasePhonetic: { fontSize: 14, color: "#64748b", marginTop: 6 },
  phraseTranslation: { fontSize: 14, color: "#0f172a", marginTop: 6 },

  // Tips
  tipBox: {
    backgroundColor: "#fff7ed",
    borderColor: "#f59e0b",
    borderWidth: 2,
    borderRadius: 12,
    padding: 12,
    width: width * 0.85,
    marginBottom: 16,
  },
  tipTitle: { fontSize: 20, fontWeight: "700", color: "#b45309" },
  tipText: { color: "#92400e", marginTop: 6, textAlign: "justify" },

  // Exercise cards
  exerciseCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    borderColor: "#d1d5db",
    borderWidth: 2,
    width: 340,
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 1,
  },
  exerciseCardLarge: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    shadowColor: CORES.PRIMARY,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    flex: 1,
    margin: 6,
    maxWidth: 340,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: CORES.PRIMARY,
    marginBottom: 8,
    textAlign: "center",
  },

  // Inputs
  label: { fontSize: 14, color: CORES.PRIMARY, marginTop: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 16,
    padding: 12,
    backgroundColor: "#fff",
    marginTop: 6,
    width: width * 0.75,
  },
  singleLine: { height: 44 },
  multiline: { minHeight: 100, textAlignVertical: "top" },

  // Buttons (pill)
  primaryBtn: {
    backgroundColor: CORES.SECONDARY,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 999,
    alignItems: "center",
    marginTop: 10,
    minHeight: 44,
    justifyContent: "center",
  },
  primaryBtnLarge: {
    backgroundColor: CORES.SECONDARY,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 999,
    alignItems: "center",
    marginTop: 12,
    minHeight: 48,
    justifyContent: "center",
  },
  btnText: { color: "#fff", fontWeight: "800", fontSize: 18 },
  blueBtn: { backgroundColor: "#2563eb" },

  // Feedback states
  feedbackBox: {
    backgroundColor: "#d1fae5",
    borderColor: "#10b981",
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginTop: 10,
  },
  feedbackTitle: { fontSize: 16, fontWeight: "800", color: "#064e3b" },
  feedbackText: { marginTop: 6, color: "#064e3b" },

  // Record / media buttons
  recordButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },

  recording: { backgroundColor: "#ef4444" },
  recordBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  smallText: { fontSize: 12, color: "#64748b", marginTop: 6 },

  // Scenario boxes
  instructionBox: { backgroundColor: "#fff", padding: 12, borderRadius: 12 },
  listItem: { marginTop: 6, fontSize: 14, color: CORES.PRIMARY },
  scenarioBoxOrange: {
    backgroundColor: "#fff7ed",
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  scenarioBoxBlue: {
    backgroundColor: "#f0f9ff",
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  scenarioTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#b45309",
    marginBottom: 6,
  },
  convoBubbleA: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginTop: 6,
  },
  convoBubbleB: {
    backgroundColor: "#f0f9ff",
    padding: 10,
    borderRadius: 10,
    marginTop: 6,
  },
  convoOrange: {
    backgroundColor: "#fff7ed",
    padding: 10,
    borderRadius: 10,
    marginTop: 6,
  },

  rowFlex: {
    flexDirection: "column",
    maxHeight: 200,
    width: "100%",
    marginTop: 12,
  },

  flex1: { flex: 1, margin: 4 },

  // Models
  modelBox: {
    backgroundColor: "#fff7ed",
    padding: 12,
    borderRadius: 12,
    marginVertical: 8,
  },
  modelBoxBlue: {
    backgroundColor: "#f0f9ff",
    padding: 12,
    borderRadius: 12,
    marginVertical: 8,
  },
  modelTitle: { fontWeight: "700", color: "#b45309" },
  modelText: { color: "#92400e", marginTop: 6 },

  // ===== SUMMARY =====
  summaryRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },

  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 10, // ✅ só 2px além do texto
    alignItems: "center",
    elevation: 3,
    alignSelf: "center", // ✅ largura baseada no conteúdo
    width: width * 0.45,
    height: width * 0.65,
  },

  bigEmoji: {
    fontSize: width > 400 ? 36 : 30,
    marginBottom: 6,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2563eb",
    marginTop: 6,
    textAlign: "center",
  },
  summaryText: {
    marginTop: 8,
    color: CORES.PRIMARY,
    paddingHorizontal: 13,
    fontSize: width > 400 ? 14 : 13,
    lineHeight: 20,
  },

  // Tips
  tipsBlock: { marginTop: 12 },
  tipsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  tipSmall: { flex: 1, alignItems: "center", padding: 8 },
  tipSmallTitle: { marginTop: 6, fontWeight: "700", textAlign: "center" },
  congratsTitle: { fontSize: 20, fontWeight: "800", marginBottom: 6 },
  centerBoxLarge: {
    backgroundColor: "#f8ebdaff",
    padding: 14,
    borderRadius: 22,
    alignItems: "center",
    marginTop: 12,
    width: width * 0.85,
    maxWidth: 360,
    alignSelf: "center",
  },

  // Intro / Hero (Networking-style)
  hero: {
    backgroundColor: CORES.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 36,
    paddingHorizontal: 24,
    flexGrow: 1,
  },
  heroIcon: { fontSize: 56, marginBottom: 18 },
  heroTitle: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 12,
  },
  heroSubtitle: {
    color: "#B8C5D3",
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 16,
    lineHeight: 22,
  },
  heroButton: {
    marginTop: 28,
    width: "72%",
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F07A2E",
    flexDirection: "row",
    paddingHorizontal: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 6,
  },
  heroButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 6,
  },

  // Dialogue-style objective / options
  dialogueTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0B3B66",
    textAlign: "center",
    marginTop: 12,
  },
  dialogueSubtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#6E7B8B",
    textAlign: "center",
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 20,
  },
  objectiveCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 16,
  },
  objectiveIcon: { fontSize: 44, marginBottom: 10 },
  objectiveText: {
    fontSize: 16,
    color: "#0f172a",
    textAlign: "center",
    lineHeight: 22,
  },
  optionGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 12,
  },
  optionCard: {
    flex: 1,
    backgroundColor: "#F2F4F6",
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginHorizontal: 6,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#E6EAF0",
    alignItems: "center",
  },
  optionIcon: { fontSize: 26, marginBottom: 8 },
  optionTitle: { fontSize: 16, fontWeight: "700", color: "#0B3B66" },
  optionText: {
    fontSize: 14,
    color: "#243948",
    textAlign: "center",
    marginTop: 6,
  },
  tipEmoji: { fontSize: 25, marginBottom: 4 },
});
