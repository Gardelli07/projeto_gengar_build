import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import CORES from "../util/cores";
// import * as Speech from 'expo-speech'; // Descomente se quiser usar áudio

const SLIDES = [
  {
    type: "goal",
    title: "Causes & Consequences",
    subtitle: "Understand how to explain causes and consequences at work.",
    button: "Iniciar Lição",
  },
  {
    type: "vocab",
    word: "Cause",
    translation: "causa",
  },
  {
    type: "vocab",
    word: "Consequence",
    translation: "consequência",
  },
  {
    type: "vocab",
    word: "Result",
    translation: "resultado",
  },
  {
    type: "quiz",
    question: "Cause",
    instruction: "👉 Select the correct meaning.",
    options: [
      { text: "solução", correct: false },
      { text: "atraso", correct: false },
      { text: "causa", correct: true },
    ],
    feedback: "“Cause” significa o motivo ou razão de algo acontecer.",
  },
  {
    type: "phrase",
    english: "Because of…",
    portuguese: "Por causa de…",
  },
  {
    type: "phrase",
    english: "As a result…",
    portuguese: "Como resultado…",
  },
  {
    type: "quiz",
    question: "There was a delay ___ the system error.",
    instruction: "👉 Complete the sentence.",
    options: [
      { text: "result", correct: false },
      { text: "because of", correct: true },
      { text: "suggest", correct: false },
    ],
    feedback: "Usamos “because of” para indicar a causa.",
  },
  {
    type: "phrase",
    english: "The meeting was canceled because of a problem.",
    portuguese: "A reunião foi cancelada por causa de um problema.",
  },
  {
    type: "quiz-audio",
    instruction: "👉 What happened?",
    phrase: "The file was incorrect. As a result, we missed the deadline.",
    options: [
      { text: "The deadline changed", correct: false },
      { text: "They missed the deadline", correct: true },
      { text: "There was no problem", correct: false },
    ],
    feedback: "“As a result” mostra a consequência do problema.",
  },
  {
    type: "quiz",
    question: "❌ The system failed.",
    instruction: "👉 Match the cause to the consequence.",
    options: [
      { text: "We lost important data.", correct: true },
      { text: "We fixed the problem.", correct: false },
      { text: "No impact.", correct: false },
    ],
    feedback: "A falha no sistema causou a perda de dados.",
  },
  {
    type: "quiz",
    question:
      '"The internet was down. As a result, the team couldn\'t join the meeting."',
    instruction: "👉 What is the consequence?",
    options: [
      { text: "The internet problem", correct: false },
      { text: "The team missed the meeting", correct: true },
      { text: "The meeting was successful", correct: false },
    ],
    feedback: "A consequência vem depois de “as a result”.",
  },
  {
    type: "quiz",
    question: '"The report had errors."',
    instruction: "👉 Choose the best sentence.",
    options: [
      { text: "Because of the report.", correct: false },
      { text: "As a result, we revised it.", correct: true },
      { text: "The report cause.", correct: false },
    ],
    feedback: "“As a result” introduz a consequência correta.",
  },
  {
    type: "writing",
    question: "There was a delay because of __________.",
    placeholder: "Digite aqui...",
    feedback: 'Você usou "because of" para explicar a causa.',
  },
  {
    type: "review",
    items: [
      "✔ Cause",
      "✔ Consequence",
      "✔ Result",
      "✔ Because of…",
      "✔ As a result…",
    ],
  },
  {
    type: "completion",
    icon: "🎉",
    title: "Lição Completa!",
    subtitle: "You can now explain causes and consequences at work.",
    button: "➡ Próxima lição",
  },
];

const TOTAL_SLIDES = SLIDES.length;

export default function LessonComponent() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [writingValue, setWritingValue] = useState("");
  const [showWritingFeedback, setShowWritingFeedback] = useState(false);
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Atualiza barra de progresso animada
  React.useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: (currentSlide + 1) / TOTAL_SLIDES,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [currentSlide]);

  // Função para simular áudio
  const speak = (text, lang = "en-US") => {
    // Speech.speak(text, { language: lang, rate: 0.9 });
  };

  // Navegação
  const goToSlide = (idx) => {
    setCurrentSlide(Math.max(0, Math.min(idx, TOTAL_SLIDES - 1)));
    setShowWritingFeedback(false);
  };
  const nextSlide = () => goToSlide(currentSlide + 1);
  const previousSlide = () => goToSlide(currentSlide - 1);

  // Seleção de opção
  const handleSelectOption = (slideIdx, optIdx, correct) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [slideIdx]: { selected: optIdx, correct },
    }));
  };

  // Envio de escrita
  const handleSubmitWriting = () => {
    if (writingValue.trim().length > 0) {
      setShowWritingFeedback(true);
      setTimeout(() => {
        nextSlide();
        setWritingValue("");
        setShowWritingFeedback(false);
      }, 2000);
    }
  };

  // Resetar lição
  const resetLesson = () => {
    setCurrentSlide(0);
    setSelectedOptions({});
    setWritingValue("");
    setShowWritingFeedback(false);
  };

  // Renderização dos slides
  const renderSlide = (slide, idx) => {
    switch (slide.type) {
      case "goal":
        return (
          <View style={styles.centered}>
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.subtitle}>{slide.subtitle}</Text>
            <TouchableOpacity style={styles.btnPrimary} onPress={nextSlide}>
              <Text style={styles.btnText}>{slide.button}</Text>
            </TouchableOpacity>
          </View>
        );
      case "vocab":
        return (
          <View style={styles.centered}>
            <Text style={styles.title}>Vocabulário</Text>
            <View style={styles.vocabCard}>
              <Text style={styles.vocabWord}>{slide.word}</Text>
              <Text style={styles.vocabTranslation}>{slide.translation}</Text>
            </View>
            <TouchableOpacity
              style={styles.btnPrimary}
              onPress={() => speak(slide.word)}
            >
              <Text style={styles.btnText}>🔊 Listen</Text>
            </TouchableOpacity>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.btnSecondary}
                onPress={previousSlide}
              >
                <Text style={styles.btnText}>← Voltar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSecondary} onPress={nextSlide}>
                <Text style={styles.btnText}>Pular</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnPrimary} onPress={nextSlide}>
                <Text style={styles.btnText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case "phrase":
        return (
          <View style={styles.centered}>
            <Text style={styles.title}>Frase Útil</Text>
            <View style={styles.phraseBox}>
              <Text style={styles.phraseEnglish}>{slide.english}</Text>
              <Text style={styles.phrasePortuguese}>{slide.portuguese}</Text>
            </View>
            <TouchableOpacity
              style={styles.btnPrimary}
              onPress={() => speak(slide.english)}
            >
              <Text style={styles.btnText}>🔊 Listen</Text>
            </TouchableOpacity>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.btnSecondary}
                onPress={previousSlide}
              >
                <Text style={styles.btnText}>← Voltar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSecondary} onPress={nextSlide}>
                <Text style={styles.btnText}>Pular</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnPrimary} onPress={nextSlide}>
                <Text style={styles.btnText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case "quiz":
        return (
          <View style={styles.centered}>
            <Text style={styles.instruction}>{slide.instruction}</Text>
            <Text style={styles.title}>{slide.question}</Text>
            <View style={styles.optionsContainer}>
              {slide.options.map((opt, i) => {
                const selected = selectedOptions[idx]?.selected === i;
                const correct = selectedOptions[idx]?.correct;
                return (
                  <TouchableOpacity
                    key={i}
                    style={[
                      styles.option,
                      selected && correct ? styles.optionSelected : null,
                      selected && !correct ? styles.optionWrong : null,
                    ]}
                    disabled={!!selectedOptions[idx]}
                    onPress={() => handleSelectOption(idx, i, opt.correct)}
                  >
                    <Text style={styles.optionText}>{opt.text}</Text>
                    {selected && correct ? (
                      <Text style={styles.optionCheck}>✅</Text>
                    ) : null}
                  </TouchableOpacity>
                );
              })}
            </View>
            {selectedOptions[idx]?.correct ? (
              <View style={styles.feedbackBox}>
                <Text style={styles.feedbackTitle}>Why this is correct:</Text>
                <Text style={styles.feedbackText}>{slide.feedback}</Text>
              </View>
            ) : null}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.btnSecondary}
                onPress={previousSlide}
              >
                <Text style={styles.btnText}>← Voltar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSecondary} onPress={nextSlide}>
                <Text style={styles.btnText}>Pular</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.btnPrimary,
                  !selectedOptions[idx]?.correct && { opacity: 0.5 },
                ]}
                onPress={nextSlide}
                disabled={!selectedOptions[idx]?.correct}
              >
                <Text style={styles.btnText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case "quiz-audio":
        return (
          <View style={styles.centered}>
            <Text style={styles.title}>Exercício de Escuta</Text>
            <TouchableOpacity
              style={styles.phraseBox}
              onPress={() => speak(slide.phrase)}
            >
              <Text style={styles.phraseEnglish}>🎧 Click to listen</Text>
            </TouchableOpacity>
            <Text style={styles.instruction}>{slide.instruction}</Text>
            <View style={styles.optionsContainer}>
              {slide.options.map((opt, i) => {
                const selected = selectedOptions[idx]?.selected === i;
                const correct = selectedOptions[idx]?.correct;
                return (
                  <TouchableOpacity
                    key={i}
                    style={[
                      styles.option,
                      selected && correct ? styles.optionSelected : null,
                      selected && !correct ? styles.optionWrong : null,
                    ]}
                    disabled={!!selectedOptions[idx]}
                    onPress={() => handleSelectOption(idx, i, opt.correct)}
                  >
                    <Text style={styles.optionText}>{opt.text}</Text>
                    {selected && correct ? (
                      <Text style={styles.optionCheck}>✅</Text>
                    ) : null}
                  </TouchableOpacity>
                );
              })}
            </View>
            {selectedOptions[idx]?.correct ? (
              <View style={styles.feedbackBox}>
                <Text style={styles.feedbackTitle}>Why this is correct:</Text>
                <Text style={styles.feedbackText}>{slide.feedback}</Text>
              </View>
            ) : null}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.btnSecondary}
                onPress={previousSlide}
              >
                <Text style={styles.btnText}>← Voltar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSecondary} onPress={nextSlide}>
                <Text style={styles.btnText}>Pular</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.btnPrimary,
                  !selectedOptions[idx]?.correct && { opacity: 0.5 },
                ]}
                onPress={nextSlide}
                disabled={!selectedOptions[idx]?.correct}
              >
                <Text style={styles.btnText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case "writing":
        return (
          <View style={styles.centered}>
            <Text style={styles.title}>Escrita Guiada</Text>
            <Text style={styles.instruction}>👉 Complete the sentence:</Text>
            <Text style={styles.title}>{slide.question}</Text>
            <TextInput
              style={styles.inputField}
              placeholder={slide.placeholder}
              value={writingValue}
              onChangeText={setWritingValue}
              editable={!showWritingFeedback}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.btnSecondary}
                onPress={previousSlide}
              >
                <Text style={styles.btnText}>← Voltar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSecondary} onPress={nextSlide}>
                <Text style={styles.btnText}>Pular</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnPrimary}
                onPress={handleSubmitWriting}
              >
                <Text style={styles.btnText}>✉ Enviar para comunidade</Text>
              </TouchableOpacity>
            </View>
            {showWritingFeedback ? (
              <View style={styles.feedbackBox}>
                <Text style={styles.feedbackTitle}>✅ Ótimo!</Text>
                <Text style={styles.feedbackText}>{slide.feedback}</Text>
              </View>
            ) : null}
          </View>
        );
      case "review":
        return (
          <View style={styles.centered}>
            <Text style={styles.title}>Revisão da Lição</Text>
            <Text style={styles.subtitle}>Você aprendeu:</Text>
            <View style={styles.reviewList}>
              {slide.items.map((item, i) => (
                <Text key={i} style={styles.reviewItem}>
                  {item}
                </Text>
              ))}
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.btnSecondary}
                onPress={previousSlide}
              >
                <Text style={styles.btnText}>← Voltar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSecondary} onPress={nextSlide}>
                <Text style={styles.btnText}>Pular</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnPrimary} onPress={nextSlide}>
                <Text style={styles.btnText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case "completion":
        return (
          <View style={styles.centered}>
            <Text style={styles.completionIcon}>{slide.icon}</Text>
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.subtitle}>{slide.subtitle}</Text>
            <TouchableOpacity style={styles.btnPrimary} onPress={resetLesson}>
              <Text style={styles.btnText}>{slide.button}</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  // Layout principal
  return (
    <View style={styles.appWrapper}>
      {/* Barra de progresso */}
      <View style={styles.progressContainer}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={previousSlide}
          disabled={currentSlide === 0}
        >
          <Text style={styles.backBtnText}>←</Text>
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>
      {/* Slide atual */}
      <ScrollView
        style={styles.slideWrapper}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps="handled"
      >
        {renderSlide(SLIDES[currentSlide], currentSlide)}
      </ScrollView>
      {/* Barra de navegação inferior */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={[styles.navBtn, currentSlide === 0 && { opacity: 0.5 }]}
          onPress={previousSlide}
          disabled={currentSlide === 0}
        >
          <Text style={styles.navBtnText}>Anterior</Text>
        </TouchableOpacity>
        <View style={styles.navProgress}>
          <Text style={styles.navProgressText}>
            {currentSlide + 1} / {TOTAL_SLIDES}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.navBtn,
            currentSlide === TOTAL_SLIDES - 1 && { opacity: 0.5 },
          ]}
          onPress={nextSlide}
          disabled={currentSlide === TOTAL_SLIDES - 1}
        >
          <Text style={styles.navBtnText}>Próximo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Estilos adaptados para mobile
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  appWrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  progressContainer: {
    width: "100%",
    height: 12,
    backgroundColor: "#e8eaed",
    position: "relative",
    justifyContent: "center",
  },
  backBtn: {
    position: "absolute",
    left: 12,
    zIndex: 10,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#dadce0",
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    top: -12,
  },
  backBtnText: {
    color: CORES.PRIMARY,
    fontWeight: "bold",
    fontSize: 20,
  },
  progressBar: {
    height: "100%",
    backgroundColor: CORES.SECONDARY,
    borderRadius: 6,
  },
  slideWrapper: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  title: {
    fontSize: 28,
    color: CORES.PRIMARY,
    fontWeight: "800",
    marginBottom: 16,
    textAlign: "center",
    fontFamily: "Inter",
  },
  subtitle: {
    fontSize: 18,
    color: "#5f6368",
    marginBottom: 24,
    fontWeight: "400",
    textAlign: "center",
    fontFamily: "Inter",
  },
  instruction: {
    fontSize: 18,
    color: CORES.PRIMARY,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
    fontFamily: "Inter",
  },
  vocabCard: {
    backgroundColor: "transparent",
    paddingVertical: 32,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginBottom: 24,
    alignItems: "center",
    width: "100%",
    maxWidth: 340,
  },
  vocabWord: {
    fontSize: 32,
    color: CORES.PRIMARY,
    fontWeight: "800",
    marginBottom: 8,
    fontFamily: "Inter",
  },
  vocabTranslation: {
    fontSize: 22,
    color: "#5f6368",
    fontWeight: "600",
    fontFamily: "Inter",
  },
  phraseBox: {
    backgroundColor: CORES.PRIMARY,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    width: "100%",
    maxWidth: 380,
    alignItems: "center",
    shadowColor: CORES.PRIMARY,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  phraseEnglish: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
    fontFamily: "Inter",
  },
  phrasePortuguese: {
    fontSize: 18,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "500",
    textAlign: "center",
    fontFamily: "Inter",
  },
  optionsContainer: {
    width: "100%",
    maxWidth: 340,
    marginBottom: 24,
  },
  option: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#dadce0",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    fontSize: 18,
    color: "#202124",
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "left",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionText: {
    fontSize: 18,
    color: "#202124",
    fontWeight: "600",
    fontFamily: "Inter",
  },
  optionCheck: {
    fontSize: 22,
    marginLeft: 8,
  },
  optionSelected: {
    borderColor: "#34a853",
    backgroundColor: "#e6f4ea",
    color: "#137333",
  },
  optionWrong: {
    borderColor: "#ea4335",
    backgroundColor: "#fce8e6",
  },
  feedbackBox: {
    backgroundColor: "#e6f4ea",
    borderWidth: 2,
    borderColor: "#34a853",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    width: "100%",
    maxWidth: 340,
  },
  feedbackTitle: {
    color: "#137333",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4,
    textAlign: "left",
    fontFamily: "Inter",
  },
  feedbackText: {
    color: "#137333",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "left",
    fontFamily: "Inter",
  },
  inputField: {
    width: "100%",
    maxWidth: 340,
    paddingVertical: 14,
    paddingHorizontal: 18,
    fontSize: 16,
    borderWidth: 2,
    borderColor: "#dadce0",
    borderRadius: 12,
    marginBottom: 16,
    fontFamily: "Inter",
    fontWeight: "500",
    backgroundColor: "#fff",
  },
  reviewList: {
    width: "100%",
    maxWidth: 340,
    marginBottom: 24,
  },
  reviewItem: {
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    fontSize: 18,
    color: CORES.PRIMARY,
    fontWeight: "700",
    textAlign: "left",
    fontFamily: "Inter",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    gap: 8,
  },
  btnPrimary: {
    backgroundColor: CORES.SECONDARY,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginHorizontal: 4,
    marginBottom: 8,
    shadowColor: CORES.SECONDARY,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  btnSecondary: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#dadce0",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginHorizontal: 4,
    marginBottom: 8,
  },
  btnText: {
    color: CORES.PRIMARY,
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Inter",
  },
  completionIcon: {
    fontSize: 72,
    marginBottom: 16,
    textAlign: "center",
  },
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 64,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#e8eaed",
    paddingHorizontal: 16,
  },
  navBtn: {
    backgroundColor: CORES.SECONDARY,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  navBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    fontFamily: "Inter",
  },
  navProgress: {
    flex: 1,
    alignItems: "center",
  },
  navProgressText: {
    color: CORES.PRIMARY,
    fontWeight: "700",
    fontSize: 16,
    fontFamily: "Inter",
  },
});
