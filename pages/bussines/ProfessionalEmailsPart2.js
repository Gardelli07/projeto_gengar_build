import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");
const SlideNavContext = React.createContext(null);
const SLIDE_COUNT = 10;
const STORAGE_KEY = "@curso_progress_v1";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

function updateProgress(progressAnim, index, total) {
  if (!progressAnim) return;
  Animated.timing(progressAnim, {
    toValue: (index + 1) / total,
    duration: 400,
    useNativeDriver: false,
  }).start();
}
function useSlideNavigation({
  currentSlideIndex,
  currentSlide,
  setCurrentSlideIndex,
  totalSlides,
  progressAnim,
}) {
  const lockRef = useRef(false);

  const next = () => {
    if (lockRef.current) return;
    lockRef.current = true;
    setTimeout(() => (lockRef.current = false), 350);

    if (currentSlideIndex < totalSlides - 1) {
      const nextIndex = currentSlideIndex + 1;
      setCurrentSlideIndex(nextIndex);
      updateProgress(progressAnim, nextIndex, totalSlides);
    }
  };

  const prev = () => {
    if (lockRef.current) return;
    lockRef.current = true;
    setTimeout(() => (lockRef.current = false), 350);

    if (currentSlideIndex > 0) {
      const prevIndex = currentSlideIndex - 1;
      setCurrentSlideIndex(prevIndex);
      updateProgress(progressAnim, prevIndex, totalSlides);
    }
  };
  function renderNextButton(index) {
    if (index !== currentSlideIndex) return null;
    return (
      <TouchableOpacity style={styles.nextButton} onPress={next}>
        <Text style={styles.nextButtonText}>Próximo →</Text>
      </TouchableOpacity>
    );
  }
  function renderPrevButton(index) {
    if (index !== currentSlideIndex || index === 0) return null;
    return (
      <TouchableOpacity style={styles.nextButton} onPress={prev}>
        <Text style={styles.nextButtonText}>← Voltar</Text>
      </TouchableOpacity>
    );
  }
  return { renderNextButton, renderPrevButton };
}
export default function ProfessionalEmailsMobile({ route, navigation }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const lesson = route?.params?.lesson;

  // local flag to avoid multiple saves
  const [markedCompleteLocal, setMarkedCompleteLocal] = useState(false);

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

  const progressAnim = useRef(
    new Animated.Value((currentSlide + 1) / SLIDE_COUNT)
  ).current;

  useEffect(() => {
    updateProgress(progressAnim, currentSlide, SLIDE_COUNT);
  }, [currentSlide]);

  // marca automaticamente a lição ao chegar no último slide
  useEffect(() => {
    const isLast = currentSlide === SLIDE_COUNT - 1;
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
          "Nenhum lesson.id disponível em route.params — não foi possível salvar progresso."
        );
        setMarkedCompleteLocal(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide]);

  const slideNav = useSlideNavigation({
    currentSlideIndex: currentSlide,
    setCurrentSlideIndex: setCurrentSlide,
    totalSlides: SLIDE_COUNT,
    progressAnim,
  });
  return (
    <SlideNavContext.Provider value={slideNav}>
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {currentSlide === 0 && <Slide1 />}
          {currentSlide === 1 && <Slide2 />}
          {currentSlide === 2 && <Slide3 />}
          {currentSlide === 3 && <Slide4 />}
          {currentSlide === 4 && <Slide5 />}
          {currentSlide === 5 && <Slide6 />}
          {currentSlide === 6 && <Slide7 />}
          {currentSlide === 7 && <Slide8 />}
          {currentSlide === 8 && <Slide9 />}
          {currentSlide === 9 && <Slide10 />}
        </ScrollView>
      </View>
    </SlideNavContext.Provider>
  );
}
function useNav() {
  return (
    React.useContext(SlideNavContext) || {
      renderNextButton: () => null,
      renderPrevButton: () => null,
    }
  );
}

function Slide1() {
  const { renderNextButton } = useNav();
  return (
    <View style={styles.hero}>
      <Text style={styles.heroIcon}>📧</Text>
      <Text style={styles.heroTitle}>Professional Emails</Text>
      <Text style={styles.heroSubtitle}>
        Part 2: Useful Vocabulary and Expressions
      </Text>
      <View style={{ marginTop: 32 }}>
        {renderNextButton(
          0,
          <View style={styles.heroButton}>
            <Text style={styles.heroButtonText}>Começar Aula</Text>
          </View>
        )}
      </View>
    </View>
  );
}

function Slide2() {
  const { renderPrevButton, renderNextButton } = useNav();
  return (
    <View style={styles.slide}>
      <View style={{ alignItems: "center", marginBottom: 32 }}>
        <Text style={styles.dialogueTitle}>Objetivo da Aula</Text>
        <View style={styles.slideObjectiveBox}>
          <View>
            <Text style={styles.slideObjectiveText}>
              🎯 Aprender expressões-chave para redigir e-mails formais claros e
              profissionais. claros e profissionais.
            </Text>
          </View>
        </View>
        <View style={styles.slideObjectiveGrid}>
          <View style={styles.slideObjectiveGridItem}>
            <Text style={{ fontSize: 28 }}>📚</Text>
            <Text style={styles.slideObjectiveGridTitle}>Vocabulário</Text>
            <Text style={styles.slideObjectiveGridDesc}>
              Expressões essenciais para e-mails
            </Text>
          </View>
          <View style={styles.slideObjectiveGridItem}>
            <Text style={{ fontSize: 28 }}>🔄</Text>
            <Text style={styles.slideObjectiveGridTitle}>Substituições</Text>
            <Text style={styles.slideObjectiveGridDesc}>
              Transformar informal em formal
            </Text>
          </View>
          <View style={styles.slideObjectiveGridItem}>
            <Text style={{ fontSize: 28 }}>✍️</Text>
            <Text style={styles.slideObjectiveGridTitle}>Prática</Text>
            <Text style={styles.slideObjectiveGridDesc}>
              Aplicar em situações reais
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonRow}>
        {renderPrevButton(1)}
        {renderNextButton(1)}
      </View>
    </View>
  );
}

function Slide3() {
  const { renderPrevButton, renderNextButton } = useNav();
  const [selectedExpression, setSelectedExpression] = useState(null);
  const [selectedMeaning, setSelectedMeaning] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [showResult, setShowResult] = useState(false);
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
  const expressions = [
    {
      key: "conversation",
      en: "As per our conversation",
      pt: "Conforme conversamos",
    },
    { key: "attached", en: "Please find attached", pt: "Segue anexo" },
    { key: "forward", en: "I look forward to", pt: "Aguardo / Espero" },
    { key: "unfortunately", en: "Unfortunately", pt: "Infelizmente" },
    { key: "regarding", en: "Regarding", pt: "Referente a" },
  ];
  function selectExpressionCard(key) {
    if (matchedPairs.includes(key)) return;
    setSelectedExpression(key);
    if (selectedMeaning) checkForMatch(key, selectedMeaning);
  }
  function selectMeaningCard(key) {
    if (matchedPairs.includes(key)) return;
    setSelectedMeaning(key);
    if (selectedExpression) checkForMatch(selectedExpression, key);
  }
  function checkForMatch(exprKey, meanKey) {
    if (exprKey === meanKey) {
      setMatchedPairs([...matchedPairs, exprKey]);
      setSelectedExpression(null);
      setSelectedMeaning(null);
      if (matchedPairs.length + 1 === expressions.length) setShowResult(true);
    } else {
      setSelectedExpression(null);
      setSelectedMeaning(null);
    }
  }
  function resetMatching() {
    setMatchedPairs([]);
    setSelectedExpression(null);
    setSelectedMeaning(null);
    setShowResult(false);
  }
  return (
    <View style={styles.slide}>
      <Text style={[styles.slideObjectiveTitle]}>Vocabulário-Chave</Text>
      <Text
        style={{
          fontSize: 16,
          color: "#555",
          marginBottom: 16,
          textAlign: "center",
        }}
      >
        Expressões essenciais para e-mails profissionais
      </Text>
      <View style={{ flexDirection: "row", gap: 12 }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#222",
              marginBottom: 12,
            }}
          >
            📚 Expressões Importantes
          </Text>
          {renderPhraseItem(
            "💬As per our conversation",
            "Conforme conversamos",
            false
          )}
          {renderPhraseItem("📎Please find attached", "Segue anexo", false)}
          {renderPhraseItem(
            "⏰I look forward to your reply",
            "Aguardo sua resposta",
            false
          )}
          {renderPhraseItem("😔Unfortunately", "Infelizmente", false)}
          {renderPhraseItem("📋Regarding", "Referente a", false)}
        </View>
      </View>
      <View style={[styles.exerciseCard, { flex: 1 }]}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#222",
            marginBottom: 12,
          }}
        >
          🎯 Jogo de Associação
        </Text>
        <Text style={{ fontSize: 16, color: "#555", marginBottom: 12 }}>
          Ligue a expressão em inglês ao significado em português:
        </Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{ fontWeight: "bold", color: "#222", marginBottom: 4 }}
            >
              Inglês:
            </Text>
            {expressions.map((expr) => (
              <TouchableOpacity
                key={expr.key}
                style={[
                  styles.vocabCard,
                  matchedPairs.includes(expr.key)
                    ? styles.vocabCardMatched
                    : selectedExpression === expr.key
                    ? styles.vocabCardSelected
                    : null,
                ]}
                onPress={() => selectExpressionCard(expr.key)}
                disabled={matchedPairs.includes(expr.key)}
              >
                <Text>{expr.en}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{ fontWeight: "bold", color: "#222", marginBottom: 4 }}
            >
              Português:
            </Text>
            {expressions.map((expr) => (
              <TouchableOpacity
                key={expr.key}
                style={[
                  styles.vocabCard,
                  matchedPairs.includes(expr.key)
                    ? styles.vocabCardMatched
                    : selectedMeaning === expr.key
                    ? styles.vocabCardSelected
                    : null,
                ]}
                onPress={() => selectMeaningCard(expr.key)}
                disabled={matchedPairs.includes(expr.key)}
              >
                <Text>{expr.pt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={{ alignItems: "center", marginVertical: 12 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#222" }}>
            Acertos: {matchedPairs.length}/5
          </Text>
          <TouchableOpacity style={styles.resetButton} onPress={resetMatching}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              🔄 Reiniciar
            </Text>
          </TouchableOpacity>
        </View>
        {showResult && (
          <View
            style={[
              styles.feedbackBox,
              { backgroundColor: "#f0fdf4", borderColor: "#22c55e" },
            ]}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#22c55e",
                marginBottom: 8,
              }}
            >
              🎉 Parabéns!
            </Text>
            <Text style={{ fontSize: 16, color: "#222" }}>
              Você associou todas as expressões corretamente! Agora você conhece
              vocabulário essencial para e-mails profissionais.
            </Text>
          </View>
        )}
      </View>
      <View style={styles.buttonRow}>
        {renderPrevButton(2)}
        {renderNextButton(2)}
      </View>
    </View>
  );
}

function Slide4() {
  const questions = [
    {
      parts: ['"', ' your request, we are sending the updated contract."'],
      options: [
        { label: "Regarding", correct: true },
        { label: "About", correct: false },
        { label: "For", correct: false },
      ],
    },
    {
      parts: ['"', ' the file for your review."'],
      options: [
        { label: "Here is", correct: false },
        { label: "Please find attached", correct: true },
        { label: "I'm sending", correct: false },
      ],
    },
    {
      parts: [
        '"',
        ' our phone call yesterday, I am confirming the meeting details."',
      ],
      options: [
        { label: "After", correct: false },
        { label: "As per our conversation", correct: true },
        { label: "Following", correct: false },
      ],
    },
    {
      parts: ['"', ', we cannot process your request at this time."'],
      options: [
        { label: "Sorry", correct: false },
        { label: "Unfortunately", correct: true },
        { label: "Sadly", correct: false },
      ],
    },
    {
      parts: ['"I ', ' hearing from you soon."'],
      options: [
        { label: "hope", correct: false },
        { label: "want", correct: false },
        { label: "look forward to", correct: true },
      ],
    },
  ];
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [selectedText, setSelectedText] = useState(
    Array(questions.length).fill("_______")
  );
  const [openPopup, setOpenPopup] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const score = answers.filter(Boolean).length;
  const { renderPrevButton, renderNextButton } = useNav();
  function togglePopup(idx) {
    if (answers[idx] !== null) return;
    setOpenPopup(openPopup === idx ? null : idx);
  }
  function selectOption(qIdx, option) {
    if (answers[qIdx] !== null) return;

    const newAnswers = [...answers];
    const newTexts = [...selectedText];

    newAnswers[qIdx] = option.correct;
    newTexts[qIdx] = option.label;

    setAnswers(newAnswers);
    setSelectedText(newTexts);
    setOpenPopup(null);
  }
  function reset() {
    setAnswers(Array(questions.length).fill(null));
    setSelectedText(Array(questions.length).fill("_______"));
    setShowResult(false);
    setOpenPopup(null);
  }
  function checkAll() {
    if (answers.some((a) => a === null)) return;
    setShowResult(true);
  }
  return (
    <View style={styles.slide}>
      <View style={{ alignItems: "center", marginBottom: 24 }}>
        <Text style={[styles.slideObjectiveTitle, { fontSize: 28 }]}>
          Complete a Frase
        </Text>
        <Text style={{ fontSize: 16, color: "#555" }}>
          Toque no espaço em branco para escolher a melhor opção
        </Text>
      </View>
      <View style={styles.exerciseCard}>
        {questions.map((q, idx) => (
          <View key={idx} style={styles.questionContainer}>
            <View style={{ position: "relative" }}>
              <Text style={styles.questionText}>
                {idx + 1}. {q.parts[0]}
                <Text
                  onPress={() => togglePopup(idx)}
                  style={[
                    styles.inlineBlank,
                    answers[idx] === true && styles.inlineBlankCorrect,
                    answers[idx] === false && styles.inlineBlankWrong,
                  ]}
                >
                  {selectedText[idx]}
                </Text>
                {q.parts[1]}
              </Text>
              {openPopup === idx && (
                <View style={styles.inlinePopupFloating}>
                  {q.options.map((opt, oIdx) => (
                    <Text
                      key={oIdx}
                      style={styles.popupOptionCompact}
                      onPress={() => selectOption(idx, opt)}
                    >
                      {opt.label}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          </View>
        ))}
        <View style={{ alignItems: "center", marginVertical: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Pontuação: {score}/{questions.length}
          </Text>
          <TouchableOpacity style={styles.resetButton} onPress={reset}>
            <Text style={{ color: "#fff", fontWeight: "700" }}>
              🔄 Reiniciar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.checkButton} onPress={checkAll}>
            <Text style={{ color: "#fff", fontWeight: "700" }}>
              Ver Resultado
            </Text>
          </TouchableOpacity>
        </View>
        {showResult && (
          <View style={styles.feedbackBox}>
            <Text style={{ fontSize: 18, fontWeight: "700" }}>
              {score === questions.length
                ? "🌟 Perfeito! Você acertou todas!"
                : `👍 Você acertou ${score} de ${questions.length}`}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.buttonRow}>
        {renderPrevButton(3)}
        {renderNextButton(3)}
      </View>
    </View>
  );
}

function Slide5() {
  const questions = [
    {
      informal: "Can you send me the file?",
      options: [
        { label: "Could you please send me the file?", correct: true },
        { label: "Send me the file, please.", correct: false },
      ],
    },
    {
      informal: "Thanks for getting back to me.",
      options: [
        { label: "Thanks for your reply.", correct: false },
        { label: "Thank you for your prompt response.", correct: true },
      ],
    },
    {
      informal: "I can't make it to the meeting.",
      options: [
        {
          label: "Unfortunately, I will not be able to attend the meeting.",
          correct: true,
        },
        { label: "I won't be at the meeting.", correct: false },
      ],
    },
    {
      informal: "Let me know what you think.",
      options: [
        { label: "Tell me your thoughts.", correct: false },
        { label: "I look forward to your feedback.", correct: true },
      ],
    },
    {
      informal: "Here's the document you wanted.",
      options: [
        {
          label: "Please find attached the requested document.",
          correct: true,
        },
        { label: "I'm sending the document you asked for.", correct: false },
      ],
    },
  ];
  const [answers, setAnswers] = useState(Array(5).fill(null));
  const [showResult, setShowResult] = useState(false);
  const score = answers.filter((a) => a === true).length;

  function selectOption(qIdx, oIdx) {
    if (answers[qIdx] !== null) return;
    const correct = questions[qIdx].options[oIdx].correct;
    const newAnswers = [...answers];
    newAnswers[qIdx] = correct;
    setAnswers(newAnswers);
  }
  function checkAll() {
    if (answers.some((a) => a === null)) return;
    setShowResult(true);
  }
  function reset() {
    setAnswers(Array(5).fill(null));
    setShowResult(false);
  }
  const { renderPrevButton, renderNextButton } = useNav();
  return (
    <View style={styles.slide}>
      <View style={{ alignItems: "center", marginBottom: 14 }}>
        <Text style={[styles.slideObjectiveTitle, { fontSize: 28 }]}>
          Substituindo Informal por Formal
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: "#555",
            textAlign: "center",
          }}
        >
          Transforme frases informais em profissionais
        </Text>
      </View>
      <View style={[styles.exerciseCard, { marginBottom: 0 }]}>
        {questions.map((q, qIdx) => (
          <View key={qIdx} style={{ marginBottom: 16 }}>
            <Text style={styles.informalLabel}>Informal: {q.informal}</Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
              {q.options.map((opt, oIdx) => (
                <TouchableOpacity
                  key={oIdx}
                  style={[
                    styles.choiceButton,
                    answers[qIdx] !== null
                      ? opt.correct
                        ? styles.choiceButtonCorrect
                        : styles.choiceButtonIncorrect
                      : null,
                  ]}
                  onPress={() => selectOption(qIdx, oIdx)}
                  disabled={answers[qIdx] !== null}
                >
                  <Text>{opt.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
        <View style={{ alignItems: "center", marginVertical: 12 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#222" }}>
            Transformações corretas: {score}/5
          </Text>
          <TouchableOpacity style={styles.resetButton} onPress={reset}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              🔄 Reiniciar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.checkButton} onPress={checkAll}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              🎯 Verificar Respostas
            </Text>
          </TouchableOpacity>
        </View>
        {showResult && (
          <View
            style={[
              styles.feedbackBox,
              score === 5
                ? { backgroundColor: "#f0fdf4", borderColor: "#22c55e" }
                : score >= 3
                ? { backgroundColor: "#f0fdf4", borderColor: "#22c55e" }
                : { backgroundColor: "#fef2f2", borderColor: "#ef4444" },
            ]}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color:
                  score === 5 ? "#22c55e" : score >= 3 ? "#2563eb" : "#ef4444",
                marginBottom: 8,
              }}
            >
              {score === 5
                ? "🎉 Excelente! Você sabe perfeitamente como transformar linguagem informal em formal!"
                : score >= 3
                ? `✨ Muito bem! Você acertou ${score} de 5 transformações. Você está no caminho certo!`
                : `📚 Continue praticando! Você acertou ${score} de 5 transformações. Foque nas expressões formais!`}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.buttonRow}>
        {renderPrevButton(4)}
        {renderNextButton(4)}
      </View>
    </View>
  );
}

function Slide6() {
  const slots = [
    {
      id: 1,
      label: "Primeira expressão",
      correct: "💬As per our conversation",
    },
    { id: 2, label: "Segunda expressão", correct: "📎Please find attached" },
    { id: 3, label: "Terceira expressão", correct: "😔Unfortunately" },
    { id: 4, label: "Quarta expressão", correct: "🙏Thank you for" },
  ];
  const expressions = [
    "💬As per our conversation",
    "📎Please find attached",
    "😔Unfortunately",
    "🙏Thank you for",
    "🤞I hope",
    "📋Regarding",
  ];
  const [filledSlots, setFilledSlots] = useState(Array(4).fill(null));
  const [usedExpressions, setUsedExpressions] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const score = filledSlots.filter(
    (val, idx) => val === slots[idx].correct
  ).length;
  function selectExpression(slotIdx, expr) {
    if (usedExpressions.includes(expr)) return;
    const newFilled = [...filledSlots];
    newFilled[slotIdx] = expr;
    setFilledSlots(newFilled);
    setUsedExpressions([...usedExpressions, expr]);
  }
  function reset() {
    setFilledSlots(Array(4).fill(null));
    setUsedExpressions([]);
    setShowResult(false);
  }
  function checkAll() {
    if (filledSlots.some((s) => !s)) return;
    setShowResult(true);
  }
  const { renderPrevButton, renderNextButton } = useNav();
  return (
    <View style={styles.slide}>
      <View style={{ alignItems: "center", marginBottom: 14 }}>
        <Text style={[styles.slideObjectiveTitle, { fontSize: 28 }]}>
          Encontre a Expressão Correta
        </Text>
        <Text style={{ fontSize: 16, color: "#64748b", textAlign: "center" }}>
          Arraste as expressões para completar o e-mail (toque para selecionar)
        </Text>
      </View>
      <View style={styles.exerciseCard}>
        <Text style={styles.sectionLabel}>📧 E-mail para completar:</Text>
        <View style={styles.emailBox}>
          <Text style={styles.emailMonospace}>
            To: client@company.com{"\n"}Subject: Project Update
          </Text>
          <Text style={styles.emailMonospace}>Dear Mr. Anderson,</Text>
          {slots.map((slot, idx) => (
            <View key={slot.id} style={styles.slotRow}>
              <TouchableOpacity
                style={[
                  styles.dropZone,
                  filledSlots[idx] && styles.dropZoneFilled,
                ]}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.dropZoneText,
                    {
                      color: filledSlots[idx] ? "#22c55e" : "#94a3b8",
                    },
                  ]}
                >
                  {filledSlots[idx] || slot.label}
                </Text>
              </TouchableOpacity>
              <Text style={styles.emailSnippet}>
                {idx === 0 &&
                  "our meeting yesterday, I wanted to provide you with an update on the project."}
                {idx === 1 && "the revised timeline for your review."}
                {idx === 2 &&
                  ", there will be a slight delay in the delivery due to technical issues."}
                {idx === 3 && "your understanding and patience."}
              </Text>
            </View>
          ))}
          <Text style={styles.emailMonospace}>
            Best regards,{"\n"}Sarah Johnson
          </Text>
        </View>
        <Text style={styles.sectionLabel}>📝 Expressões disponíveis:</Text>
        <View style={styles.expressionList}>
          {expressions.map((expr) => (
            <TouchableOpacity
              key={expr}
              style={[
                styles.expressionCard,
                usedExpressions.includes(expr) && styles.expressionUsed,
              ]}
              onPress={() => {
                const slotIdx = filledSlots.findIndex((s) => !s);
                if (slotIdx !== -1) selectExpression(slotIdx, expr);
              }}
              disabled={usedExpressions.includes(expr)}
              activeOpacity={0.8}
            >
              <Text style={{ fontWeight: "700", color: "#0f172a" }}>
                {expr}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ alignItems: "center", marginVertical: 12 }}>
          <Text style={styles.filledCounter}>
            Preenchido: {filledSlots.filter(Boolean).length}/4
          </Text>
          <TouchableOpacity style={styles.resetButton} onPress={reset}>
            <Text style={{ color: "#fff", fontWeight: "700" }}>
              🔄 Reiniciar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.checkButton} onPress={checkAll}>
            <Text style={{ color: "#fff", fontWeight: "700" }}>
              ✅ Verificar E-mail
            </Text>
          </TouchableOpacity>
        </View>
        {showResult && (
          <View
            style={[
              styles.feedbackBox,
              score >= 2
                ? { backgroundColor: "#f0fdf4", borderColor: "#22c55e" }
                : { backgroundColor: "#fef2f2", borderColor: "#ef4444" },
            ]}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: score >= 2 ? "#16a34a" : "#ef4444",
                marginBottom: 8,
              }}
            >
              {score === 4
                ? "🏆 E-mail Perfeito!"
                : score >= 2
                ? `👍 Bom trabalho! ${score} de 4 corretas.`
                : `💪 Continue praticando! ${score} de 4 corretas.`}
            </Text>
            {slots.map((slot, idx) =>
              filledSlots[idx] ? (
                <Text
                  key={slot.id}
                  style={{
                    fontSize: 14,
                    color:
                      filledSlots[idx] === slot.correct ? "#22c55e" : "#ef4444",
                  }}
                >
                  {filledSlots[idx] === slot.correct
                    ? `✅ Posição ${idx + 1}: "${filledSlots[idx]}"`
                    : `💡 Posição ${idx + 1}: "${filledSlots[idx]}" → "${
                        slot.correct
                      }"`}
                </Text>
              ) : null
            )}
          </View>
        )}
      </View>
      <View style={styles.buttonRow}>
        {renderPrevButton(5)}
        {renderNextButton(5)}
      </View>
    </View>
  );
}

function Slide7() {
  const [emailText, setEmailText] = useState(
    "Dear Sir/Madam,\n\nAs per our conversation...\n\n[Continue reescrevendo o e-mail de forma formal aqui]\n\nBest regards,\n[Seu nome]"
  );
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  function evaluateRewrite() {
    const emailLower = emailText.toLowerCase();
    let score = 0;
    let feedbackArr = [];
    const expressions = [
      {
        phrases: ["dear sir", "dear madam", "dear sir/madam"],
        name: "Saudação formal",
        example: "Dear Sir/Madam",
      },
      {
        phrases: [
          "as per our conversation",
          "following our conversation",
          "regarding our conversation",
        ],
        name: "Referência à conversa",
        example: "As per our conversation",
      },
      {
        phrases: ["could you please", "would you please", "i would appreciate"],
        name: "Solicitação educada",
        example: "Could you please provide",
      },
      {
        phrases: ["thank you for", "i appreciate"],
        name: "Agradecimento formal",
        example: "Thank you for your assistance",
      },
      {
        phrases: ["best regards", "sincerely", "kind regards"],
        name: "Despedida profissional",
        example: "Best regards",
      },
    ];
    expressions.forEach((expr) => {
      let found = false;
      expr.phrases.forEach((phrase) => {
        if (emailLower.includes(phrase)) found = true;
      });

      if (found) {
        score++;
        feedbackArr.push(`✅ ${expr.name}: Excelente uso!`);
      } else {
        feedbackArr.push(`💡 ${expr.name}: Considere usar "${expr.example}"`);
      }
    });

    setFeedback(feedbackArr.join("\n"));
    setShowResult(true);
  }
  const { renderPrevButton, renderNextButton } = useNav();
  return (
    <View style={styles.slide}>
      <View style={{ alignItems: "center" }}>
        <Text style={[styles.slideObjectiveTitle, { fontSize: 28 }]}>
          Reescrevendo um E-mail
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: "#555",
            marginBottom: 14,
            textAlign: "center",
          }}
        >
          Transforme este e-mail informal em profissional
        </Text>
      </View>
      <View style={[styles.exerciseCard, { marginBottom: 0 }]}>
        <Text style={{ fontWeight: "bold", color: "#ef4444", marginBottom: 8 }}>
          ❌ E-mail Informal:
        </Text>
        <View
          style={{
            backgroundColor: "#fef2f2",
            borderRadius: 12,
            padding: 12,
            marginBottom: 12,
          }}
        >
          <Text style={{ fontFamily: "monospace", fontSize: 15 }}>
            Hey there,
            {"\n"}Hope you're doing well. Can you send me the price list we
            talked about on the phone? I need it ASAP for my boss.
            {"\n"}Thanks a bunch!
            {"\n"}Mike
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <Text style={{ fontWeight: "bold", color: "#22c55e" }}>
            ✅ Sua Versão Formal:
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: "#e0f2fe",
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 20,
            }}
            onPress={() => setShowHelp(!showHelp)}
          >
            <Text style={{ color: "#0284c7", fontWeight: "bold" }}>Help</Text>
          </TouchableOpacity>
        </View>
        {showHelp && (
          <View style={{ gap: 12, marginBottom: 12 }}>
            <View
              style={{
                backgroundColor: "#f0f9ff",
                borderRadius: 12,
                padding: 12,
                borderWidth: 1,
                borderColor: "#38bdf8",
              }}
            >
              <Text style={{ fontWeight: "bold", marginBottom: 6 }}>
                💡 Dicas para Reescrita:
              </Text>
              <Text>
                • Evite linguagem informal (Hey, ASAP, Thanks a bunch)
              </Text>
              <Text>• Use frases completas e educadas</Text>
              <Text>• Seja claro e objetivo</Text>
              <Text>• Utilize despedidas profissionais</Text>
            </View>
            <View
              style={{
                backgroundColor: "#f0fdf4",
                borderRadius: 12,
                padding: 12,
                borderWidth: 1,
                borderColor: "#22c55e",
              }}
            >
              <Text style={{ fontWeight: "bold", marginBottom: 6 }}>
                📚 Expressões para Usar:
              </Text>
              <Text>• Dear Sir/Madam,</Text>
              <Text>• As per our conversation,</Text>
              <Text>• Could you please provide…</Text>
              <Text>• Thank you for your assistance</Text>
              <Text>• Best regards,</Text>
            </View>
          </View>
        )}
        <TextInput
          style={styles.textAreaCustom}
          multiline
          value={emailText}
          onChangeText={setEmailText}
        />
        <TouchableOpacity
          style={[styles.checkButton, { marginTop: 16 }]}
          onPress={evaluateRewrite}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            📝 Avaliar Reescrita
          </Text>
        </TouchableOpacity>
        {showResult && (
          <View
            style={[
              styles.feedbackBox,
              {
                backgroundColor: "#f0fdf4",
                borderColor: "#22c55e",
                marginTop: 12,
              },
            ]}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#22c55e",
                marginBottom: 8,
              }}
            >
              📊 Avaliação da Reescrita:
            </Text>
            <Text style={{ fontSize: 15 }}>{feedback}</Text>
          </View>
        )}
      </View>
      <View style={styles.buttonRow}>
        {renderPrevButton(6)}
        {renderNextButton(6)}
      </View>
    </View>
  );
}

function Slide8() {
  const expressions = [
    { label: "Please find attached", appropriate: true },
    { label: "Hey there", appropriate: false },
    { label: "As per our conversation", appropriate: true },
    { label: "ASAP", appropriate: false },
    { label: "I look forward to", appropriate: true },
    { label: "Thanks a bunch", appropriate: false },
    { label: "Unfortunately", appropriate: true },
    { label: "Can you gimme", appropriate: false },
    { label: "Regarding", appropriate: true },
    { label: "Talk soon", appropriate: false },
    { label: "Could you please", appropriate: true },
    { label: "What's up?", appropriate: false },
  ];
  const [selected, setSelected] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const correctCount = selected.filter(
    (idx) => expressions[idx]?.appropriate
  ).length;
  const incorrectCount = selected.filter(
    (idx) => !expressions[idx]?.appropriate
  ).length;
  function selectCard(idx) {
    if (selected.includes(idx)) return;
    setSelected([...selected, idx]);
  }
  function finishChallenge() {
    setShowResult(true);
  }
  function reset() {
    setSelected([]);
    setShowResult(false);
  }
  const { renderPrevButton, renderNextButton } = useNav();
  return (
    <View style={styles.slide}>
      <View style={{ alignItems: "center", marginBottom: 14 }}>
        <Text style={[styles.slideObjectiveTitle, { fontSize: 28 }]}>
          Desafio Rápido
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: "#555",
            textAlign: "center",
          }}
        >
          Clique apenas nas expressões apropriadas para e-mails formais
        </Text>
      </View>
      <View style={styles.exerciseCard}>
        <View style={styles.chipsWrapper}>
          {expressions.map((expr, idx) => {
            const isSelected = selected.includes(idx);
            return (
              <TouchableOpacity
                key={expr.label}
                style={[
                  styles.expressionCard2,
                  isSelected &&
                    (expr.appropriate
                      ? styles.expressionCardAppropriate
                      : styles.expressionCardInappropriate),
                  isSelected && styles.expressionCardDisabled,
                ]}
                onPress={() => selectCard(idx)}
                disabled={isSelected}
              >
                <Text style={styles.expressionText}>{expr.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.checkButton}
            onPress={finishChallenge}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              ✅ Finalizar Desafio
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resetButton} onPress={reset}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              🔄 Reiniciar Desafio
            </Text>
          </TouchableOpacity>
        </View>
        {showResult && (
          <View
            style={[
              styles.feedbackBox,
              correctCount >= 7
                ? { backgroundColor: "#f0fdf4", borderColor: "#22c55e" }
                : { backgroundColor: "#fef2f2", borderColor: "#ef4444" },
            ]}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color:
                  correctCount >= 9
                    ? "#22c55e"
                    : correctCount >= 7
                    ? "#2563eb"
                    : "#ef4444",
                marginBottom: 8,
              }}
            >
              {correctCount >= 9
                ? "🏆 Excelente! Você domina perfeitamente as expressões formais!"
                : correctCount >= 7
                ? "👍 Muito bem! Você tem um bom conhecimento das expressões apropriadas!"
                : "💪 Continue estudando! Revise as expressões formais."}
            </Text>
            <Text style={styles.feedbackSummary}>
              ✅ Corretas: {correctCount} | ❌ Incorretas: {incorrectCount} | 🎯
              Restantes: {expressions.length - selected.length}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.buttonRow}>
        {renderPrevButton(7)}
        {renderNextButton(7)}
      </View>
    </View>
  );
}

function Slide9() {
  const [emailText, setEmailText] = useState(
    "Dear Sir/Madam,\n\nAs per our conversation yesterday...\n\n[Continue escrevendo seu e-mail aqui usando as expressões formais]\n\nBest regards,\n[Seu nome]"
  );
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const keyExpressions = [
    { phrase: "as per our conversation", name: "Referência à conversa" },
    { phrase: "please find attached", name: "Anexo mencionado" },
    { phrase: "i look forward to", name: "Expectativa de resposta" },
    { phrase: "could you please", name: "Solicitação educada" },
    { phrase: "thank you for", name: "Agradecimento" },
  ];
  function evaluateFinalEmail() {
    const emailLower = emailText.toLowerCase();
    let score = 0;
    let feedbackArr = [];
    keyExpressions.forEach((expr) => {
      if (emailLower.includes(expr.phrase)) {
        score++;
        feedbackArr.push(`✅ ${expr.name}: Perfeito!`);
      } else {
        feedbackArr.push(`⚪ ${expr.name}: Não encontrado`);
      }
    });
    setFeedback(feedbackArr.join("\n"));
    setShowResult(true);
  }
  const { renderPrevButton, renderNextButton } = useNav();
  return (
    <View style={styles.slide}>
      <View style={{ alignItems: "center", marginBottom: 14 }}>
        <Text style={[styles.slideObjectiveTitle, { fontSize: 28 }]}>
          Crie Seu E-mail
        </Text>
        <Text style={{ fontSize: 18, color: "#555", textAlign: "center" }}>
          Aplique todo o vocabulário aprendido
        </Text>
      </View>
      <View style={styles.exerciseCard}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionLabel}>📋 Situação:</Text>
          <TouchableOpacity
            style={styles.helpButton}
            onPress={() => setShowHelp((s) => !s)}
          >
            <Text style={{ color: "#0369a1", fontWeight: "700" }}>
              {showHelp ? "Fechar" : "Help"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.situationBox}>
          <Text style={{ fontSize: 15, color: "#0b1220", marginBottom: 8 }}>
            Você precisa solicitar um orçamento para serviços de consultoria
            para sua empresa. Vocês conversaram por telefone ontem. Inclua pelo
            menos 3 expressões aprendidas.
          </Text>
          <Text style={{ fontSize: 13, color: "#6b7280" }}>
            • Para: consulting@businesssolutions.com{"\n"}• Assunto: Request for
            Consulting Services Quote
          </Text>
        </View>
        {showHelp && (
          <View style={styles.helpCardsContainer}>
            <View style={styles.checklistCard}>
              <Text style={{ fontWeight: "700", marginBottom: 8 }}>
                ✅ Checklist de Expressões:
              </Text>
              <View style={styles.checklistItem}>
                <View style={styles.checklistBullet} />
                <Text>As per our conversation</Text>
              </View>
              <View style={styles.checklistItem}>
                <View style={styles.checklistBullet} />
                <Text>Please find attached</Text>
              </View>
              <View style={styles.checklistItem}>
                <View style={styles.checklistBullet} />
                <Text>I look forward to</Text>
              </View>
              <View style={styles.checklistItem}>
                <View style={styles.checklistBullet} />
                <Text>Could you please</Text>
              </View>
              <View style={styles.checklistItem}>
                <View style={styles.checklistBullet} />
                <Text>Thank you for</Text>
              </View>
            </View>
            <View style={styles.expressionsCard}>
              <Text style={{ fontWeight: "700", marginBottom: 8 }}>
                💡 Expressões Úteis:
              </Text>
              <View style={styles.expressionItem}>
                <Text>• Indicação: "As per our conversation yesterday..."</Text>
              </View>
              <View style={styles.expressionItem}>
                <Text>
                  • Solicitação: "Could you please provide a detailed quote..."
                </Text>
              </View>
              <View style={styles.expressionItem}>
                <Text>
                  • Anexo: "Please find attached the project specifications..."
                </Text>
              </View>
              <View style={styles.expressionItem}>
                <Text>
                  • Urgência educada: "I would appreciate if you could send this
                  at your earliest convenience..."
                </Text>
              </View>
              <View style={styles.expressionItem}>
                <Text>
                  • Fechamento: "I look forward to hearing from you soon."
                </Text>
              </View>
            </View>
          </View>
        )}
        <TextInput
          style={styles.textAreaCustom}
          multiline
          value={emailText}
          onChangeText={setEmailText}
        />
        <TouchableOpacity
          style={styles.checkButton}
          onPress={evaluateFinalEmail}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            📊 Avaliar Meu E-mail
          </Text>
        </TouchableOpacity>
        {showResult && (
          <View
            style={[
              styles.feedbackBox,
              {
                backgroundColor: "#f0fdf4",
                borderColor: "#22c55e",
                marginTop: 12,
              },
            ]}
          >
            <Text style={styles.feedbackTitle}>🏆 Avaliação Final:</Text>
            <Text style={{ fontSize: 15, color: "#222", marginBottom: 4 }}>
              {feedback}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.buttonRow}>
        {renderPrevButton(8)}
        {renderNextButton(8)}
      </View>
    </View>
  );
}

function Slide10() {
  const { renderPrevButton } = useNav();
  return (
    <View style={styles.slide}>
      <View style={{ alignItems: "center", marginBottom: 14 }}>
        <Text style={[styles.slideObjectiveTitle, { fontSize: 28 }]}>
          Resumo e Dicas
        </Text>
        <Text style={styles.slideObjectiveGridDesc}>
          Guia completo de vocabulário para e-mails profissionais
        </Text>
      </View>
      <View style={styles.exerciseCard}>
        <View style={styles.summaryBlock}>
          <Text style={styles.summaryTitleOrange}>Vocabulário Essencial</Text>
          <Text style={styles.summaryText3}>
            As per our conversation{"\n"}
            <Text style={styles.summaryText2}>Conforme conversamos</Text>
            {"\n"}
            Please find attached{"\n"}
            <Text style={styles.summaryText2}>Segue anexo</Text>
            {"\n"}I look forward to{"\n"}
            <Text style={styles.summaryText2}>Aguardo</Text>
            {"\n"}
            Unfortunately{"\n"}
            <Text style={styles.summaryText2}>Infelizmente</Text>
            {"\n"}
            Regarding {"\n"}
            <Text style={styles.summaryText2}>Conforme conversamos</Text>
          </Text>
        </View>
        <View style={styles.summaryBlock}>
          <Text style={styles.summaryTitleBlue}>Dicas Importantes</Text>
          <Text style={styles.summaryText}>
            ✨ Mantenha frases curtas{"\n"}
            🚫 Evite abreviações informais{"\n"}
            🎯 Use expressões-chave
          </Text>
        </View>
        <View style={styles.summaryHighlight}>
          <Text style={styles.summaryTitleGreen}>Transformações</Text>
          <Text style={styles.summaryText}>
            ❌ Informal: Can you send me...{"\n"}✅ Formal: Could you please
            provide...{"\n\n"}❌ Informal: Thanks a bunch{"\n"}✅ Formal: Thank
            you for your assistance{"\n\n"}❌ Informal: Let me know{"\n"}✅
            Formal: I look forward to your feedback{"\n\n"}❌ Informal: Here's
            the file{"\n"}✅ Formal: Please find attached
          </Text>
        </View>
        <View style={styles.congratsBox}>
          <Text style={styles.congratsTitle}>🎉 Parabéns!</Text>
          <Text style={styles.congratsText}>
            Você dominou o vocabulário essencial para e-mails profissionais!
          </Text>
        </View>
        <View style={styles.summaryBlock}>
          <Text style={styles.summaryTitleBlue}>📈 Próximos Passos</Text>
          <Text style={styles.summaryText}>
            🎯 Continue praticando{"\n"}• Use as expressões em e-mails reais
            {"\n"}• Crie um banco de frases úteis{"\n"}• Pratique transformações
            diariamente
          </Text>
        </View>
      </View>
      <View style={styles.buttonRow}>{renderPrevButton(9)}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  bold: { fontWeight: "bold", color: "#222" },
  slide: {
    flex: 1,
    width: "100%",
    alignSelf: "stretch",
    padding: width < 400 ? 16 : 24,
    backgroundColor: "#fff",
    alignContent: "center",
  },
  slideObjectiveTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#022b62",
    marginBottom: 6,
    textAlign: "center",
  },
  slideObjectiveBox: {
    backgroundColor: "#fff",
    borderRadius: 22,
    width: width * 0.9,
    marginBottom: windowWidth < 400 ? 12 : 24,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  slideObjectiveText: {
    fontSize: 20,
    color: "#222",
    fontWeight: "400",
    padding: 12,
    justifyContent: "center",
  },
  slideObjectiveGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: windowWidth < 400 ? 8 : 16,
  },
  slideObjectiveGridTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginBottom: windowWidth < 400 ? 4 : 8,
  },
  slideObjectiveGridDesc: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
  },
  nextButton: {
    backgroundColor: "#ec651d",
    width: 180,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  nextButtonDisabled: { opacity: 0.5 },
  nextButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  hero: {
    backgroundColor: "#022b62",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: windowWidth < 400 ? 24 : 36,
    paddingHorizontal: windowWidth < 400 ? 12 : 24,
    flexGrow: 1,
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
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
  dialogueTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0B3B66",
    textAlign: "center",
    marginTop: 12,
    marginBottom: 12,
  },
  slideObjectiveGridItem: {
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
    minWidth: width * 0.3,
  },
  slideObjectiveGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  phraseTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#022b62",
  },
  phrasePhonetic: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 6,
  },
  phraseTranslation: {
    fontSize: 14,
    color: "#0f172a",
    marginTop: 6,
  },
  phraseItem: {
    backgroundColor: "#fff7ed",
    borderLeftWidth: 4,
    borderLeftColor: "#ec651d",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    maxWidth: 340,
  },
  exerciseCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#eef2f7",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 6,
    width: "100%",
  },
  vocabCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 52,
    justifyContent: "center",
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#e6e9ef",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  vocabCardMatched: {
    borderColor: "#16a34a",
    backgroundColor: "#ecfdf5",
  },
  vocabCardSelected: {
    borderColor: "#f97316",
    backgroundColor: "#fff7ed",
  },
  resetButton: {
    marginTop: 10,
    backgroundColor: "#1f2937",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  feedbackBox: {
    borderWidth: 1,
    borderColor: "#22c55e",
    backgroundColor: "#f0fdf4",
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
  },
  questionContainer: {
    marginBottom: 18,
  },
  questionText: {
    fontSize: 16,
    color: "#1f2937",
    lineHeight: 24,
  },
  inlineBlank: {
    backgroundColor: "#f1f5f9",
    color: "#0f172a",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    fontWeight: "700",
  },
  inlineBlankCorrect: {
    backgroundColor: "#dcfce7",
    color: "#166534",
  },
  inlineBlankWrong: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
  },
  inlinePopupFloating: {
    position: "absolute",
    top: -46,
    left: 0,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    flexDirection: "row",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 50,
  },
  popupOptionCompact: {
    backgroundColor: "#f8fafc",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#0f172a",
  },
  //slide5
  informalLabel: {
    fontSize: 16,
    color: "#ef4444",
    marginBottom: 8,
    fontWeight: "600",
    paddingHorizontal: 6,
  },
  checkButton: {
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
  },
  choiceButtonIncorrect: {
    backgroundColor: "#fff1f2",
    borderColor: "#ef4444",
  },
  choiceButtonCorrect: {
    backgroundColor: "#ecfdf5",
    borderColor: "#22c55e",
  },
  choiceButton: {
    flex: 1,
    minWidth: 140,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e6e9ee",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    marginRight: 8,
  },
  //slide6
  sectionLabel: {
    fontWeight: "700",
    color: "#222",
    marginBottom: 8,
  },
  emailBox: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  emailMonospace: {
    fontFamily: "monospace",
    fontSize: 15,
    color: "#0b1220",
    marginBottom: 6,
  },
  slotRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  dropZone: {
    flex: 1,
    minHeight: 48,
    borderRadius: 10,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "#e6eef8",
    backgroundColor: "#ffffff",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  dropZoneFilled: {
    borderStyle: "solid",
    borderColor: "#22c55e",
    backgroundColor: "#ecfdf5",
  },
  dropZoneText: {
    fontWeight: "700",
    color: "#111827",
  },
  emailSnippet: {
    flex: 1.8,
    fontFamily: "monospace",
    fontSize: 15,
    marginLeft: 8,
    color: "#111827",
  },
  expressionList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  expressionCard: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#e6e9ee",
    minWidth: 140,
    marginRight: 8,
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  expressionUsed: {
    opacity: 0.45,
  },
  filledCounter: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
    textAlign: "center",
  },
  //slide8
  chipsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  expressionText: {
    fontWeight: "700",
    color: "#0f172a",
    textAlign: "center",
    fontSize: 13,
  },
  expressionCardAppropriate: {
    backgroundColor: "#ecfdf5",
    borderColor: "#22c55e",
  },
  expressionCardInappropriate: {
    backgroundColor: "#fff1f2",
    borderColor: "#ef4444",
  },
  expressionCardDisabled: {
    opacity: 0.5,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 12,
  },
  feedbackSummary: {
    fontSize: 15,
    color: "#111827",
    marginBottom: 6,
  },
  expressionCard2: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#e6e9ee",
    width: "30%",
    marginBottom: 10,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  //slide9
  situationBox: {
    backgroundColor: "#f1f9ff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e6f3ff",
  },
  helpButton: {
    backgroundColor: "#eef2ff",
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#cfe7ff",
  },
  helpCardsContainer: {
    marginBottom: 12,
    gap: 10,
  },
  checklistCard: {
    backgroundColor: "#f0fdf4",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#dcfce7",
  },
  expressionsCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e6eef8",
  },
  checklistItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  checklistBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#22c55e",
    marginRight: 8,
  },
  expressionItem: {
    marginBottom: 6,
  },
  textAreaCustom: {
    width: "100%",
    minHeight: 160,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e6eef8",
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 12,
    textAlignVertical: "top",
    fontFamily: "monospace",
    fontSize: 15,
    color: "#0f172a",
    marginBottom: 12,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#16a34a",
    marginBottom: 8,
  },
  //slide10
  summarySection: {
    marginBottom: 14,
  },
  summaryTitleOrange: {
    fontWeight: "800",
    color: "#ec651d",
    fontSize: 16,
    marginBottom: 6,
  },
  summaryTitleBlue: {
    fontWeight: "800",
    color: "#2563eb",
    fontSize: 16,
    marginBottom: 6,
  },
  summaryTitleGreen: {
    fontWeight: "800",
    color: "#22c55e",
    fontSize: 16,
    marginBottom: 6,
  },
  summaryText: {
    fontSize: 15,
    color: "#222",
    lineHeight: 22,
  },
  summaryText2: {
    fontSize: 13,
    color: "#313131",
    lineHeight: 22,
  },
  summaryText3: {
    fontSize: 17,
    color: "#141414",
    lineHeight: 22,
  },
  summaryBlock: {
    backgroundColor: "#f8fafc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e6eef8",
  },
  summaryHighlight: {
    backgroundColor: "#fff7ed",
    borderLeftWidth: 4,
    borderLeftColor: "#ec651d",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  congratsBox: {
    backgroundColor: "#f0fdf4",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#dcfce7",
    alignItems: "center",
    marginBottom: 14,
  },
  congratsTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#16a34a",
    marginBottom: 6,
  },
  congratsText: {
    fontSize: 15,
    color: "#14532d",
    textAlign: "center",
    lineHeight: 22,
  },
});
