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
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
const { width } = Dimensions.get("window");
const SlideNavContext = React.createContext(null);
const SLIDE_COUNT = 10;
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
export default function ProfessionalEmailsMobile() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const progressAnim = useRef(
    new Animated.Value((currentSlide + 1) / SLIDE_COUNT)
  ).current;

  useEffect(() => {
    updateProgress(progressAnim, currentSlide, SLIDE_COUNT);
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
      <Text style={styles.heroSubtitle}>Part 1: Formal Email Structure </Text>
      <View style={{ marginTop: 32 }}>
        <View style={styles.buttonRow}>{renderNextButton(0)}</View>
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
        <View>
          <Text style={styles.slideObjectiveText}>
            🎯 Aprender a estrutura básica de um e-mail formal em inglês para
            ambiente profissional.
          </Text>
        </View>
        <View style={styles.slideObjectiveGrid}>
          <View style={styles.slideObjectiveGridItem}>
            <Text style={{ fontSize: 28 }}>📋</Text>
            <Text style={styles.slideObjectiveGridTitle}>Estrutura</Text>
            <Text style={styles.slideObjectiveGridDesc}>
              5 partes essenciais do e-mail
            </Text>
          </View>
          <View style={styles.slideObjectiveGridItem}>
            <Text style={{ fontSize: 28 }}>💬</Text>
            <Text style={styles.slideObjectiveGridTitle}>Frases</Text>
            <Text style={styles.slideObjectiveGridDesc}>
              Expressões formais comuns
            </Text>
          </View>
          <View style={styles.slideObjectiveGridItem}>
            <Text style={{ fontSize: 28 }}>✅</Text>
            <Text style={styles.slideObjectiveGridTitle}>Prática</Text>
            <Text style={styles.slideObjectiveGridDesc}>
              Exercícios interativos
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
  const initialParts = [
    { key: "signature", label: "✍️ Signature" },
    { key: "greeting", label: "👋 Greeting" },
    { key: "body", label: "📝 Body" },
    { key: "closing", label: "🤝 Closing" },
    { key: "introduction", label: "🎯 Introduction" },
  ];
  const [availableParts, setAvailableParts] = useState(initialParts);
  const [emailStructureOrder, setEmailStructureOrder] = useState([
    null,
    null,
    null,
    null,
    null,
  ]);

  const correctOrder = [
    "greeting",
    "introduction",
    "body",
    "closing",
    "signature",
  ];

  const [feedback, setFeedback] = useState(null);
  function checkEmailStructure() {
    let correctCount = 0;

    for (let i = 0; i < correctOrder.length; i++) {
      if (emailStructureOrder[i] === correctOrder[i]) {
        correctCount++;
      }
    }

    if (correctCount === 5) {
      setFeedback({
        success: true,
        message:
          "🎉 Perfeito! Você organizou todas as partes na ordem correta!",
      });
    } else {
      setFeedback({
        success: false,
        message: `👍 Você acertou ${correctCount} de 5 posições.\nOrdem correta: Greeting → Introduction → Body → Closing → Signature`,
      });
    }
  }

  function placePartIntoNextSlot(partKey) {
    const nextIndex = emailStructureOrder.findIndex((p) => p === null);
    if (nextIndex === -1) return;
    const newOrder = [...emailStructureOrder];
    newOrder[nextIndex] = partKey;
    setEmailStructureOrder(newOrder);
    setAvailableParts((prev) => prev.filter((p) => p.key !== partKey));
  }

  const { renderPrevButton, renderNextButton } = useNav();
  return (
    <View style={styles.slide}>
      <Text style={[styles.slideObjectiveTitle]}>
        Estrutura Padrão de E-mail Formal
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: "#555",
          marginBottom: 16,
          textAlign: "center",
        }}
      >
        5 partes essenciais na ordem correta
      </Text>

      <View style={styles.leftColumn}>
        <Text style={styles.sectionTitle}>📋 Partes do E-mail</Text>
        <View style={styles.partBox}>
          <Text style={styles.partEmoji}>👋</Text>
          <View>
            <Text style={styles.partTitle}>1. Greeting</Text>
            <Text style={styles.partText}>Saudação inicial</Text>
            <Text style={styles.partItalic}>
              'Dear Mr. Smith,' / 'Dear Sir/Madam,'
            </Text>
          </View>
        </View>
        <View style={styles.partBoxBlue}>
          <Text style={styles.partEmoji}>🎯</Text>
          <View>
            <Text style={styles.partTitle}>2. Introduction</Text>
            <Text style={styles.partText}>Motivo do e-mail</Text>
            <Text style={styles.partItalic}>
              'I am writing to inquire about...'
            </Text>
          </View>
        </View>
        <View style={styles.partBoxGreen}>
          <Text style={styles.partEmoji}>📝</Text>
          <View>
            <Text style={styles.partTitle}>3. Body</Text>
            <Text style={styles.partText}>Conteúdo principal</Text>
            <Text style={styles.partItalic}>'Could you please provide...'</Text>
          </View>
        </View>
        <View style={styles.partBoxPurple}>
          <Text style={styles.partEmoji}>🤝</Text>
          <View>
            <Text style={styles.partTitle}>4. Closing</Text>
            <Text style={styles.partText}>Fechamento educado</Text>
            <Text style={styles.partItalic}>'Thank you for your time.'</Text>
          </View>
        </View>
        <View style={styles.partBoxGray}>
          <Text style={styles.partEmoji}>✍️</Text>
          <View>
            <Text style={styles.partTitle}>5. Signature</Text>
            <Text style={styles.partText}>Despedida e nome</Text>
            <Text style={styles.partItalic}>'Best regards, John Smith'</Text>
          </View>
        </View>
      </View>

      <View style={styles.exerciseCard}>
        <Text style={styles.exerciseTitle}>🎯 Arraste e Solte</Text>
        <Text style={styles.exerciseText}>
          Organize as partes do e-mail na ordem correta:
        </Text>

        <Text style={{ fontWeight: "700", marginTop: 12 }}>
          Partes disponíveis:
        </Text>
        <View style={styles.partsWrap}>
          {availableParts.map((p) => (
            <TouchableOpacity
              key={p.key}
              style={styles.emailPart}
              onPress={() => placePartIntoNextSlot(p.key)}
            >
              <Text style={{ fontWeight: "600", textAlign: "center" }}>
                {p.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={{ fontWeight: "700", marginTop: 12 }}>Ordem correta:</Text>
        {[0, 1, 2, 3, 4].map((i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.dropSlot,
              emailStructureOrder[i] ? styles.dropSlotFilled : null,
            ]}
            onPress={() => {
              if (emailStructureOrder[i]) removeFromSlot(i);
            }}
          >
            <Text style={{ color: "#4b5563" }}>
              {emailStructureOrder[i]
                ? initialParts.find((x) => x.key === emailStructureOrder[i])
                    .label
                : `Arraste aqui a ${
                    i + 1
                  }ª parte (toque um item acima para colocar)`}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.verifyButton}
          onPress={checkEmailStructure}
        >
          <Text style={styles.verifyButtonText}>✅ Verificar Ordem</Text>
        </TouchableOpacity>

        {feedback && (
          <View
            style={[
              styles.feedbackBox,
              {
                borderColor: feedback.success ? "#22c55e" : "#f97316",
                backgroundColor: feedback.success ? "#f0fdf4" : "#fff7ed",
              },
            ]}
          >
            <Text style={{ fontSize: 18, fontWeight: "700" }}>
              {feedback.message}
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
  const [phraseScore, setPhraseScore] = useState(0);
  const [phraseAnswers, setPhraseAnswers] = useState([null, null, null]);
  const [phraseFeedback, setPhraseFeedback] = useState(null);

  function selectPhrase(questionIndex, optionIndex, isCorrect) {
    if (phraseAnswers[questionIndex] !== null) return;

    // atualiza respostas localmente
    const newAnswers = [...phraseAnswers];
    newAnswers[questionIndex] = optionIndex;
    setPhraseAnswers(newAnswers);

    // lista das respostas corretas (0 = opção 0 é correta, 1 = opção 1 é correta, etc.)
    // ajuste se você mudar as corretas no futuro
    const correctAnswers = [0, 1, 2];

    // calcula o score a partir das respostas atuais (evita ler phraseScore antigo)
    const scoreFromAnswers = newAnswers.reduce((acc, ans, idx) => {
      if (ans === null) return acc;
      return acc + (ans === correctAnswers[idx] ? 1 : 0);
    }, 0);

    // atualiza o score visível
    setPhraseScore(scoreFromAnswers);

    // quando todas respondidas, mostra o feedback
    if (newAnswers.every((a) => a !== null)) {
      // pequeno delay para dar sensação de processamento (opcional)
      setTimeout(() => {
        if (scoreFromAnswers === 3) {
          setPhraseFeedback({
            success: true,
            message: "🌟 Excelente! Você dominou as frases formais!",
          });
        } else if (scoreFromAnswers >= 2) {
          setPhraseFeedback({
            success: true,
            message: `👍 Bom trabalho! Você acertou ${scoreFromAnswers} de 3 perguntas.`,
          });
        } else {
          setPhraseFeedback({
            success: false,
            message: `💪 Continue praticando! Você acertou ${scoreFromAnswers} de 3 perguntas.`,
          });
        }
      }, 250);
    } else {
      // opcional: limpa feedback anterior caso a pessoa esteja respondendo novamente
      if (phraseFeedback) setPhraseFeedback(null);
    }
  }

  function getOptionStyle(questionIndex, optionIndex, isCorrect) {
    // ainda não respondeu essa pergunta
    if (phraseAnswers[questionIndex] === null) {
      return styles.phraseOption;
    }

    // resposta correta → verde
    if (isCorrect) {
      return [styles.phraseOption, styles.correctOption];
    }

    // resposta errada selecionada → vermelho
    if (phraseAnswers[questionIndex] === optionIndex) {
      return [styles.phraseOption, styles.wrongOption];
    }

    // outras opções após responder
    return [styles.phraseOption, styles.disabledOption];
  }

  const { renderPrevButton, renderNextButton } = useNav();
  return (
    <View style={styles.slide}>
      <View style={{ alignItems: "center", marginBottom: 24 }}>
        <Text style={[styles.slideObjectiveTitle, { fontSize: 28 }]}>
          Frases Comuns
        </Text>
        <Text style={{ fontSize: 16, color: "#555" }}>
          Expressões formais para cada situação
        </Text>
      </View>

      <View style={styles.leftColumn}>
        <Text style={styles.sectionTitle}>💬 Vocabulário Essencial</Text>
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>👋 Greetings (Saudações)</Text>
          <View>
            <Text>
              <Text style={{ fontWeight: "700" }}>Formal:</Text> "Dear Mr./Ms.
              [Last Name],"
            </Text>
            <Text>
              <Text style={{ fontWeight: "700" }}>
                Quando não souber o nome:
              </Text>{" "}
              "Dear Sir/Madam,"
            </Text>
            <Text>
              <Text style={{ fontWeight: "700" }}>Para departamento:</Text>{" "}
              "Dear Hiring Manager,"
            </Text>
          </View>
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>🎯 Introduction (Introdução)</Text>
          <View>
            <Text>"I am writing to inquire about..."</Text>
            <Text>"I would like to request information..."</Text>
            <Text>"I am contacting you regarding..."</Text>
          </View>
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>🤝 Closings (Fechamentos)</Text>
          <View>
            <Text>
              <Text style={{ fontWeight: "700" }}>Formal:</Text> "Sincerely," /
              "Yours faithfully,"
            </Text>
            <Text>
              <Text style={{ fontWeight: "700" }}>Semi-formal:</Text> "Best
              regards," / "Kind regards,"
            </Text>
            <Text>
              <Text style={{ fontWeight: "700" }}>Agradecimento:</Text> "Thank
              you for your time."
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.exerciseCard}>
        <Text style={styles.exerciseTitle}>🎯 Quiz Rápido</Text>
        <Text style={styles.exerciseText}>
          Escolha a frase mais adequada para cada situação:
        </Text>

        <View style={{ marginTop: 12 }}>
          <View style={styles.quizQuestion}>
            <Text style={{ fontWeight: "700" }}>
              1. Você quer solicitar informações sobre um produto:
            </Text>
            <View>
              <TouchableOpacity
                style={getOptionStyle(0, 0, true)}
                onPress={() => selectPhrase(0, 0, true)}
                disabled={phraseAnswers[0] !== null}
              >
                <Text>"I am writing to inquire about your products."</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={getOptionStyle(0, 1, false)}
                onPress={() => selectPhrase(0, 1, false)}
                disabled={phraseAnswers[0] !== null}
              >
                <Text>"Hey, tell me about your stuff."</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={getOptionStyle(0, 2, false)}
                onPress={() => selectPhrase(0, 2, false)}
                disabled={phraseAnswers[0] !== null}
              >
                <Text>"Can you give me info on products?"</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.quizQuestion}>
            <Text style={{ fontWeight: "700" }}>
              2. Você não sabe o nome da pessoa:
            </Text>
            <View>
              <TouchableOpacity
                style={getOptionStyle(1, 0, false)}
                onPress={() => selectPhrase(1, 0, false)}
                disabled={phraseAnswers[1] !== null}
              >
                <Text>"Hello there,"</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={getOptionStyle(1, 1, true)}
                onPress={() => selectPhrase(1, 1, true)}
                disabled={phraseAnswers[1] !== null}
              >
                <Text>"Dear Sir/Madam,"</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={getOptionStyle(1, 2, false)}
                onPress={() => selectPhrase(1, 2, false)}
                disabled={phraseAnswers[1] !== null}
              >
                <Text>"Hi everyone,"</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.quizQuestion}>
            <Text style={{ fontWeight: "700" }}>
              3. Fechamento formal para uma empresa:
            </Text>
            <View>
              <TouchableOpacity
                style={getOptionStyle(2, 0, false)}
                onPress={() => selectPhrase(2, 0, false)}
                disabled={phraseAnswers[2] !== null}
              >
                <Text>"See you later,"</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={getOptionStyle(2, 1, false)}
                onPress={() => selectPhrase(2, 1, false)}
                disabled={phraseAnswers[2] !== null}
              >
                <Text>"Cheers,"</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={getOptionStyle(2, 2, true)}
                onPress={() => selectPhrase(2, 2, true)}
                disabled={phraseAnswers[2] !== null}
              >
                <Text>"Best regards,"</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ alignItems: "center", marginTop: 12 }}>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 16,
              color: phraseFeedback
                ? phraseFeedback.success
                  ? "#16a34a"
                  : "#ea580c"
                : "#111827",
            }}
          >
            Pontuação: {phraseScore}/3
          </Text>
        </View>

        {phraseFeedback && (
          <View
            style={[
              styles.feedbackBox,
              {
                borderColor: phraseFeedback.success ? "#22c55e" : "#f97316",
                backgroundColor: phraseFeedback.success ? "#f0fdf4" : "#fff7ed",
              },
            ]}
          >
            <Text style={{ fontSize: 18, fontWeight: "700" }}>
              {phraseFeedback.message}
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => {
            setPhraseAnswers([null, null, null]);
            setPhraseScore(0);
            setPhraseFeedback(null);
          }}
        >
          <Text>🔄 Reiniciar Desafio</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        {renderPrevButton(3)}
        {renderNextButton(3)}
      </View>
    </View>
  );
}

function Slide5() {
  const templateOptions = {
    1: { options: ["Dear", "Hey", "Hello"], correct: "Dear" },
    2: { options: ["writing", "texting", "messaging"], correct: "writing" },
    3: { options: ["give", "provide", "send"], correct: "provide" },
    4: { options: ["appreciate", "like", "want"], correct: "appreciate" },
    5: { options: ["time", "help", "attention"], correct: "time" },
    6: { options: ["Best regards", "See you", "Bye"], correct: "Best regards" },
  };

  const [templateAnswers, setTemplateAnswers] = useState({});
  const [activeBlank, setActiveBlank] = useState(null);
  const [templateFeedback, setTemplateFeedback] = useState(null);
  const [templateScore, setTemplateScore] = useState(0);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  function showBlankOptions(blankNum, e) {
    const { pageX, pageY } = e.nativeEvent;
    setPopupPosition({ x: pageX, y: pageY });
    setActiveBlank(blankNum);
  }

  function selectBlankOption(blankNum, option) {
    setTemplateAnswers((prev) => ({ ...prev, [blankNum]: option }));
    setActiveBlank(null);
  }

  function checkEmailTemplate() {
    if (Object.keys(templateAnswers).length < 6) {
      setTemplateFeedback({
        success: false,
        message: "⚠️ Por favor, preencha todas as lacunas antes de verificar.",
        details: [],
      });
      return;
    }

    let score = 0;
    let feedback = [];

    for (let i = 1; i <= 6; i++) {
      const userAnswer = templateAnswers[i];
      const correctAnswer = templateOptions[i].correct;

      if (userAnswer === correctAnswer) {
        score++;
        feedback.push(`✅ Lacuna ${i}: "${userAnswer}" — Correto`);
      } else {
        feedback.push(
          `❌ Lacuna ${i}: "${userAnswer}" → Correto: "${correctAnswer}"`
        );
      }
    }

    setTemplateScore(score);

    setTemplateFeedback({
      success: score >= 4,
      message:
        score === 6
          ? "🎉 Perfeito! Você completou o e-mail corretamente!"
          : score >= 4
          ? `👍 Bom trabalho! Você acertou ${score} de 6 lacunas.`
          : `💪 Continue praticando! Você acertou ${score} de 6 lacunas.`,
      details: feedback,
    });
  }

  const { renderPrevButton, renderNextButton } = useNav();

  return (
    <View style={styles.slide}>
      <View style={{ alignItems: "center" }}>
        <Text style={[styles.slideObjectiveTitle, { fontSize: 28 }]}>
          E-mail Modelo
        </Text>
        <Text style={{ fontSize: 18, color: "#555", textAlign: "center" }}>
          Complete as lacunas com as opções corretas
        </Text>
      </View>

      <View style={styles.templateCard}>
        <Text style={{ fontSize: 36, textAlign: "center" }}>📝</Text>
        <Text style={styles.exerciseTitle}>Preencha as Lacunas</Text>

        <View style={styles.emailTemplate}>
          <Text>
            <Text style={{ fontWeight: "700" }}>To:</Text> info@company.com
          </Text>
          <Text>
            <Text style={{ fontWeight: "700" }}>Subject:</Text> Product
            Information Request
          </Text>

          <Text style={{ marginTop: 12, lineHeight: 24 }}>
            <TouchableOpacity
              onPressIn={(e) => showBlankOptions(1, e)}
              style={[
                styles.blankSpace,
                templateAnswers[1] && styles.blankFilled,
              ]}
            >
              <Text>{templateAnswers[1] || "_______"}</Text>
            </TouchableOpacity>
            Mr. Johnson,{"\n\n"}I am
            <TouchableOpacity
              onPressIn={(e) => showBlankOptions(2, e)}
              style={[
                styles.blankSpaceInline,
                templateAnswers[2] && styles.blankFilled,
              ]}
            >
              <Text>{templateAnswers[2] || "_______"}</Text>
            </TouchableOpacity>
            to inquire about your new software products.{"\n\n"}
            Could you please
            <TouchableOpacity
              onPressIn={(e) => showBlankOptions(3, e)}
              style={[
                styles.blankSpaceInline,
                templateAnswers[3] && styles.blankFilled,
              ]}
            >
              <Text>{templateAnswers[3] || "_______"}</Text>
            </TouchableOpacity>
            me with the following information:{"\n"}- Product specifications
            {"\n"}- Pricing details{"\n"}- Available support options{"\n\n"}I
            would
            <TouchableOpacity
              onPressIn={(e) => showBlankOptions(4, e)}
              style={[
                styles.blankSpaceInline,
                templateAnswers[4] && styles.blankFilled,
              ]}
            >
              <Text>{templateAnswers[4] || "_______"}</Text>
            </TouchableOpacity>
            any information you can provide.{"\n\n"}
            Thank you for your
            <TouchableOpacity
              onPressIn={(e) => showBlankOptions(5, e)}
              style={[
                styles.blankSpaceInline,
                templateAnswers[5] && styles.blankFilled,
              ]}
            >
              <Text>{templateAnswers[5] || "_______"}</Text>
            </TouchableOpacity>
            .{"\n\n"}
            <TouchableOpacity
              onPressIn={(e) => showBlankOptions(6, e)}
              style={[
                styles.blankSpaceInline,
                templateAnswers[6] && styles.blankFilled,
              ]}
            >
              <Text>{templateAnswers[6] || "_______"}</Text>
            </TouchableOpacity>
            ,{"\n"}Sarah Wilson
          </Text>
        </View>

        <Modal transparent visible={activeBlank !== null} animationType="fade">
          <TouchableWithoutFeedback onPress={() => setActiveBlank(null)}>
            <View style={{ flex: 1 }}>
              <View
                style={[
                  styles.popupContainer,
                  {
                    left: Math.max(popupPosition.x - 120, 10),
                    top: Math.max(popupPosition.y - 60, 10),
                  },
                ]}
              >
                {activeBlank &&
                  templateOptions[activeBlank].options.map((opt) => (
                    <TouchableOpacity
                      key={opt}
                      style={styles.phraseOption}
                      onPress={() => selectBlankOption(activeBlank, opt)}
                    >
                      <Text>{opt}</Text>
                    </TouchableOpacity>
                  ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <View style={{ alignItems: "center", marginTop: 12 }}>
          <TouchableOpacity
            style={styles.verifyButton}
            onPress={checkEmailTemplate}
          >
            <Text style={styles.verifyButtonText}>✅ Verificar E-mail</Text>
          </TouchableOpacity>

          {templateFeedback && (
            <View
              style={[
                styles.feedbackBox,
                {
                  borderColor: templateFeedback.success ? "#16a34a" : "#ea580c",
                  backgroundColor: templateFeedback.success
                    ? "#ecfdf5"
                    : "#fff7ed",
                },
              ]}
            >
              <Text style={{ fontWeight: "700", fontSize: 16 }}>
                {templateFeedback.message}
              </Text>

              {templateFeedback.details.map((item, index) => (
                <Text key={index}>{item}</Text>
              ))}

              <Text style={{ marginTop: 8, fontWeight: "700" }}>
                Pontuação: {templateScore}/6
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.buttonRow}>
        {renderPrevButton(4)}
        {renderNextButton(4)}
      </View>
    </View>
  );
}

function Slide6() {
  const [foundErrors, setFoundErrors] = useState([]);
  const totalErrors = 6;

  const errorTexts = {
    1: '"Hey" → muito informal',
    2: '"Wanna" → use "would like to"',
    3: '"pretty good" → use "well-qualified"',
    4: '"gimme" → use "provide me with"',
    5: '"Thx" → use "Thank you"',
    6: '"Later" → use "Best regards"',
  };

  function findError(errorNum) {
    if (!errorTexts[errorNum]) return;
    if (foundErrors.includes(errorNum)) return;
    setFoundErrors((prev) => [...prev, errorNum]);
  }

  function resetErrorGame() {
    setFoundErrors([]);
  }

  const { renderPrevButton, renderNextButton } = useNav();

  return (
    <View style={styles.slide}>
      <View style={{ alignItems: "center" }}>
        <Text style={[styles.slideObjectiveTitle, { fontSize: 28 }]}>
          Encontre o Erro
        </Text>
        <Text style={{ fontSize: 16, color: "#64748b", textAlign: "center" }}>
          Clique nos erros de formalidade no e-mail
        </Text>
      </View>

      <View style={styles.templateCard}>
        <Text style={{ fontSize: 36, textAlign: "center" }}>🔍</Text>
        <Text style={styles.exerciseTitle}>Caça aos Erros</Text>
        <Text>Este e-mail tem 6 erros de formalidade. Encontre todos!</Text>

        <View style={{ marginTop: 12 }}>
          <Text>
            <Text style={{ fontWeight: "700" }}>To:</Text> manager@company.com
          </Text>
          <Text>
            <Text style={{ fontWeight: "700" }}>Subject:</Text> Job Application
          </Text>

          {/* Parágrafo principal com textos inline clicáveis */}
          <Text style={{ marginTop: 12, lineHeight: 24 }}>
            <Text
              onPress={() => findError(1)}
              accessibilityRole="button"
              style={[
                styles.inlineError,
                foundErrors.includes(1) && styles.errorFound,
              ]}
            >
              Hey
            </Text>{" "}
            there,{"\n\n"}
            I'm writing about the job you posted.
            <Text
              onPress={() => findError(2)}
              accessibilityRole="button"
              style={[
                styles.inlineError,
                foundErrors.includes(2) && styles.errorFound,
              ]}
            >
              {" "}
              Wanna
            </Text>{" "}
            know more about it.{"\n\n"}I think I'm
            <Text
              onPress={() => findError(3)}
              accessibilityRole="button"
              style={[
                styles.inlineError,
                foundErrors.includes(3) && styles.errorFound,
              ]}
            >
              {" "}
              pretty good
            </Text>{" "}
            for this position because I have experience and stuff.{"\n\n"}Can
            you
            <Text
              onPress={() => findError(4)}
              accessibilityRole="button"
              style={[
                styles.inlineError,
                foundErrors.includes(4) && styles.errorFound,
              ]}
            >
              {" "}
              gimme
            </Text>{" "}
            more info about the salary and benefits?{"\n\n"}
            <Text
              onPress={() => findError(5)}
              accessibilityRole="button"
              style={[
                styles.inlineError,
                foundErrors.includes(5) && styles.errorFound,
              ]}
            >
              Thx
            </Text>{" "}
            for reading this.{"\n\n"}
            <Text
              onPress={() => findError(6)}
              accessibilityRole="button"
              style={[
                styles.inlineError,
                foundErrors.includes(6) && styles.errorFound,
              ]}
            >
              Later
            </Text>
            , Mike
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 12,
            justifyContent: "space-between",
          }}
        >
          <View style={styles.foundBox}>
            <Text style={{ fontWeight: "700" }}>❌ Erros Encontrados:</Text>
            {foundErrors.length === 0 ? (
              <Text style={{ color: "#555" }}>Nenhum ainda</Text>
            ) : (
              foundErrors.map((n) => <Text key={n}>• {errorTexts[n]}</Text>)
            )}
          </View>

          <View style={styles.correctionsBox}>
            <Text style={{ fontWeight: "700" }}>✅ Correções:</Text>

            {foundErrors.length === 0 ? (
              <Text style={{ color: "#555" }}>Ainda não há correções</Text>
            ) : (
              <>
                {foundErrors.includes(1) && (
                  <Text>"Hey" → "Dear Sir/Madam"</Text>
                )}
                {foundErrors.includes(2) && (
                  <Text>"Wanna" → "I would like to"</Text>
                )}
                {foundErrors.includes(3) && (
                  <Text>"pretty good" → "well-qualified"</Text>
                )}
                {foundErrors.includes(4) && (
                  <Text>"gimme" → "provide me with"</Text>
                )}
                {foundErrors.includes(5) && <Text>"Thx" → "Thank you"</Text>}
                {foundErrors.includes(6) && (
                  <Text>"Later" → "Best regards"</Text>
                )}
              </>
            )}
          </View>
        </View>

        <View style={{ alignItems: "center", marginTop: 12 }}>
          <Text>
            Erros encontrados: {foundErrors.length}/{totalErrors}
          </Text>

          <TouchableOpacity style={styles.resetButton} onPress={resetErrorGame}>
            <Text style={{ color: "#fff" }}>🔄 Reiniciar</Text>
          </TouchableOpacity>

          {foundErrors.length === totalErrors && (
            <Text
              style={{
                marginTop: 8,
                fontWeight: "700",
                color: "#16a34a",
                textAlign: "center",
              }}
            >
              🎉 Parabéns! Você encontrou todos os erros!
            </Text>
          )}
        </View>
      </View>

      <View style={styles.buttonRow}>
        {renderPrevButton(5)}
        {renderNextButton(5)}
      </View>
    </View>
  );
}

function Slide7() {
  const [comparisonAnswers, setComparisonAnswers] = useState([
    null,
    null,
    null,
    null,
  ]);
  const [comparisonFeedback, setComparisonFeedback] = useState(null);

  function selectComparison(questionIndex, isCorrect) {
    if (comparisonAnswers[questionIndex] !== null) return;
    const next = [...comparisonAnswers];
    next[questionIndex] = isCorrect;
    setComparisonAnswers(next);
  }

  function checkComparisons() {
    const score = comparisonAnswers.filter(Boolean).length;

    if (score === 4) {
      setComparisonFeedback({
        success: true,
        message:
          "🌟 Perfeito! Você identificou todas as opções formais corretamente!",
      });
    } else if (score >= 2) {
      setComparisonFeedback({
        success: true,
        message: `👍 Bom trabalho! Você acertou ${score} de 4 comparações.`,
      });
    } else {
      setComparisonFeedback({
        success: false,
        message: `💪 Continue estudando! Você acertou ${score} de 4 comparações.`,
      });
    }
  }

  const { renderPrevButton, renderNextButton } = useNav();

  return (
    <View style={styles.slide}>
      <View style={{ alignItems: "center" }}>
        <Text style={[styles.slideObjectiveTitle, { fontSize: 28 }]}>
          Escolha Correta
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: "#555",
            marginBottom: 14,
            textAlign: "center",
          }}
        >
          Formal vs Informal - Clique na opção adequada
        </Text>

        <View style={styles.templateCard}>
          <Text style={{ fontSize: 36, textAlign: "center" }}>⚖️</Text>
          <Text style={styles.exerciseTitle}>Formal ou Informal?</Text>
          <Text>
            Para cada situação, escolha a frase mais adequada para ambiente
            profissional:
          </Text>

          <View style={{ marginTop: 12 }}>
            {/* QUESTÃO 1 */}
            <View style={styles.comparisonQuestion}>
              <Text style={{ fontWeight: "700", textAlign: "center" }}>
                1. Saudação inicial:
              </Text>
              <View style={styles.compareRow}>
                <TouchableOpacity
                  style={[
                    styles.comparisonCard,
                    comparisonAnswers[0] === true && styles.correctCard,
                  ]}
                  onPress={() => selectComparison(0, true)}
                >
                  <Text style={{ fontWeight: "700" }}>Opção A</Text>
                  <Text>"Dear Ms. Johnson,"</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.comparisonCard,
                    comparisonAnswers[0] === false && styles.incorrectCard,
                  ]}
                  onPress={() => selectComparison(0, false)}
                >
                  <Text style={{ fontWeight: "700" }}>Opção B</Text>
                  <Text>"Hey Johnson!"</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* QUESTÃO 2 */}
            <View style={styles.comparisonQuestion}>
              <Text style={{ fontWeight: "700", textAlign: "center" }}>
                2. Solicitando informações:
              </Text>
              <View style={styles.compareRow}>
                <TouchableOpacity
                  style={[
                    styles.comparisonCard,
                    comparisonAnswers[1] === false && styles.incorrectCard,
                  ]}
                  onPress={() => selectComparison(1, false)}
                >
                  <Text style={{ fontWeight: "700" }}>Opção A</Text>
                  <Text>"I need info ASAP!"</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.comparisonCard,
                    comparisonAnswers[1] === true && styles.correctCard,
                  ]}
                  onPress={() => selectComparison(1, true)}
                >
                  <Text style={{ fontWeight: "700" }}>Opção B</Text>
                  <Text>"Could you please provide me with information..."</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* QUESTÃO 3 */}
            <View style={styles.comparisonQuestion}>
              <Text style={{ fontWeight: "700", textAlign: "center" }}>
                3. Fechamento do e-mail:
              </Text>
              <View style={styles.compareRow}>
                <TouchableOpacity
                  style={[
                    styles.comparisonCard,
                    comparisonAnswers[2] === true && styles.correctCard,
                  ]}
                  onPress={() => selectComparison(2, true)}
                >
                  <Text style={{ fontWeight: "700" }}>Opção A</Text>
                  <Text>"Thank you for your time and consideration."</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.comparisonCard,
                    comparisonAnswers[2] === false && styles.incorrectCard,
                  ]}
                  onPress={() => selectComparison(2, false)}
                >
                  <Text style={{ fontWeight: "700" }}>Opção B</Text>
                  <Text>"Thanks, bye!"</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* QUESTÃO 4 */}
            <View style={styles.comparisonQuestion}>
              <Text style={{ fontWeight: "700", textAlign: "center" }}>
                4. Despedida:
              </Text>
              <View style={styles.compareRow}>
                <TouchableOpacity
                  style={[
                    styles.comparisonCard,
                    comparisonAnswers[3] === false && styles.incorrectCard,
                  ]}
                  onPress={() => selectComparison(3, false)}
                >
                  <Text style={{ fontWeight: "700" }}>Opção A</Text>
                  <Text>"See ya later!"</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.comparisonCard,
                    comparisonAnswers[3] === true && styles.correctCard,
                  ]}
                  onPress={() => selectComparison(3, true)}
                >
                  <Text style={{ fontWeight: "700" }}>Opção B</Text>
                  <Text>"Best regards,"</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* RESULTADO */}
            <View style={{ alignItems: "center", marginTop: 12 }}>
              <Text style={{ fontWeight: "700" }}>
                Pontuação: {comparisonAnswers.filter(Boolean).length}/4
              </Text>

              <TouchableOpacity
                style={styles.verifyButton}
                onPress={checkComparisons}
              >
                <Text style={styles.verifyButtonText}>📊 Ver Resultado</Text>
              </TouchableOpacity>

              {comparisonFeedback && (
                <View
                  style={[
                    styles.feedbackBox,
                    {
                      borderColor: comparisonFeedback.success
                        ? "#16a34a"
                        : "#ea580c",
                      backgroundColor: comparisonFeedback.success
                        ? "#ecfdf5"
                        : "#fff7ed",
                      marginTop: 8,
                    },
                  ]}
                >
                  <Text
                    style={{
                      fontWeight: "700",
                      color: comparisonFeedback.success ? "#166534" : "#9a3412",
                      textAlign: "center",
                    }}
                  >
                    {comparisonFeedback.message}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>

      <View style={styles.buttonRow}>
        {renderPrevButton(6)}
        {renderNextButton(6)}
      </View>
    </View>
  );
}

function Slide8() {
  const [userEmail, setUserEmail] = useState(
    "Dear Sir/Madam,\n\nI am writing to inquire about...\n\n[Continue escrevendo seu e-mail aqui]\n\nBest regards,\n[Seu nome]"
  );
  const [checklist, setChecklist] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [resultMessage, setResultMessage] = useState(null);

  const { renderPrevButton, renderNextButton } = useNav();

  function evaluateEmail() {
    const email = userEmail.trim();
    if (email.length < 50) {
      setResultMessage({
        text: "⚠️ Escreva um e-mail mais completo antes de avaliar.",
        color: "#dc2626",
      });
      return;
    }

    const emailLower = email.toLowerCase();
    let score = 0;
    let newChecklist = [false, false, false, false, false];

    // Saudação
    if (
      emailLower.includes("dear sir") ||
      emailLower.includes("dear madam") ||
      emailLower.includes("dear mr") ||
      emailLower.includes("dear ms")
    ) {
      score++;
      newChecklist[0] = true;
    }

    // Introdução
    if (
      emailLower.includes("writing to") ||
      emailLower.includes("contacting") ||
      emailLower.includes("inquire")
    ) {
      score++;
      newChecklist[1] = true;
    }

    // Perguntas específicas
    if (
      emailLower.includes("price") ||
      emailLower.includes("cost") ||
      emailLower.includes("support") ||
      emailLower.includes("trial")
    ) {
      score++;
      newChecklist[2] = true;
    }

    // Agradecimento
    if (emailLower.includes("thank you")) {
      score++;
      newChecklist[3] = true;
    }

    // Despedida
    if (
      emailLower.includes("best regards") ||
      emailLower.includes("sincerely") ||
      emailLower.includes("kind regards")
    ) {
      score++;
      newChecklist[4] = true;
    }

    setChecklist(newChecklist);

    if (score === 5) {
      setResultMessage({
        text: "🏆 E-mail Perfeito! Seu e-mail está totalmente profissional e bem estruturado!",
        color: "#16a34a",
      });
    } else if (score >= 3) {
      setResultMessage({
        text: `👍 Bom e-mail! Você acertou ${score} de 5 elementos.`,
        color: "#2563eb",
      });
    } else {
      setResultMessage({
        text: `💪 Continue praticando! Você acertou ${score} de 5 elementos.`,
        color: "#ca8a04",
      });
    }
  }

  return (
    <View style={styles.slide}>
      <View style={{ alignItems: "center" }}>
        <Text style={[styles.slideObjectiveTitle, { fontSize: 28 }]}>
          Criando o Seu E-mail
        </Text>
        <Text style={{ fontSize: 18, color: "#555", textAlign: "center" }}>
          Pratique escrevendo um e-mail formal
        </Text>

        <View style={styles.templateCard}>
          <Text style={{ fontSize: 36, textAlign: "center" }}>✍️</Text>
          <Text style={styles.exerciseTitle}>Exercício de Escrita</Text>

          <View style={styles.card}>
            {/* Título */}
            <View style={styles.header}>
              <Text style={styles.headerIcon}>📋</Text>
              <Text style={styles.headerTitle}>Situação:</Text>
            </View>

            {/* Descrição */}
            <Text style={styles.description}>
              Você trabalha em uma empresa e precisa solicitar informações sobre
              um novo software para seu departamento.
            </Text>

            {/* Conteúdo em duas colunas */}
            <View style={styles.columns}>
              {/* Coluna esquerda */}
              <View style={styles.column}>
                <Text style={styles.columnTitle}>📌 Detalhes:</Text>

                <Text style={styles.item}>• Para: sales@techcompany.com</Text>
                <Text style={styles.item}>
                  • Assunto: Software Information Request
                </Text>
                <Text style={styles.item}>
                  • Você não conhece o nome da pessoa
                </Text>
              </View>

              {/* Coluna direita */}
              <View style={styles.column}>
                <Text style={styles.columnTitleBlue}>❓ O que perguntar:</Text>

                <Text style={styles.item}>• Preço do software</Text>
                <Text style={styles.item}>• Opções de suporte técnico</Text>
                <Text style={styles.item}>• Período de teste gratuito</Text>
              </View>
            </View>
          </View>

          <Text style={{ marginTop: 12 }}>Escreva seu e-mail formal:</Text>
          <TextInput
            multiline
            style={styles.textArea}
            value={userEmail}
            onChangeText={setUserEmail}
          />

          <View style={{ flexDirection: "row", marginTop: 12 }}>
            <View style={styles.checklistBox}>
              <Text style={{ fontWeight: "700" }}>✅ Checklist:</Text>
              <Text>{checklist[0] ? "✅" : "⬜"} Saudação formal</Text>
              <Text>{checklist[1] ? "✅" : "⬜"} Motivo claro</Text>
              <Text>{checklist[2] ? "✅" : "⬜"} Perguntas específicas</Text>
              <Text>{checklist[3] ? "✅" : "⬜"} Agradecimento</Text>
              <Text>{checklist[4] ? "✅" : "⬜"} Despedida formal</Text>
            </View>

            <View style={styles.tipsBox}>
              <Text style={{ fontWeight: "700" }}>💡 Frases Úteis:</Text>
              <Text>"I am writing to inquire about..."</Text>
              <Text>"Could you please provide information about..."</Text>
              <Text>"Thank you for your time."</Text>
            </View>
          </View>

          <View style={{ alignItems: "center", marginTop: 12 }}>
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={evaluateEmail}
            >
              <Text style={styles.verifyButtonText}>📝 Avaliar Meu E-mail</Text>
            </TouchableOpacity>

            {resultMessage && (
              <Text
                style={{
                  marginTop: 10,
                  fontWeight: "700",
                  color: resultMessage.color,
                  textAlign: "center",
                }}
              >
                {resultMessage.text}
              </Text>
            )}
          </View>
        </View>
      </View>

      <View style={styles.buttonRow}>
        {renderPrevButton(7)}
        {renderNextButton(7)}
      </View>
    </View>
  );
}

function Slide9() {
  const finalQuizQuestions = [
    {
      question: "Qual é a primeira parte de um e-mail formal?",
      options: ["Body", "Greeting", "Closing", "Signature"],
      correct: 1,
    },
    {
      question:
        "Como você deve começar um e-mail quando não conhece o nome da pessoa?",
      options: ["Hey there", "Dear Sir/Madam", "Hello", "Hi everyone"],
      correct: 1,
    },
    {
      question: "Qual frase é mais formal para solicitar informações?",
      options: [
        "Give me info",
        "I need to know",
        "Could you please provide",
        "Tell me about",
      ],
      correct: 2,
    },
    {
      question: "Qual é a ordem correta das partes do e-mail?",
      options: [
        "Body, Greeting, Closing",
        "Greeting, Introduction, Body, Closing, Signature",
        "Introduction, Body, Greeting",
        "Signature, Body, Greeting",
      ],
      correct: 1,
    },
    {
      question: "Como você deve terminar um e-mail formal?",
      options: ["See ya!", "Best regards,", "Later,", "Bye!"],
      correct: 1,
    },
    {
      question: "Qual palavra é mais apropriada em e-mails formais?",
      options: ["Wanna", "Would like to", "Gonna", "Gotta"],
      correct: 1,
    },
    {
      question: "O que você deve evitar em e-mails profissionais?",
      options: [
        "Saudação formal",
        "Linguagem informal",
        "Agradecimentos",
        "Despedida educada",
      ],
      correct: 1,
    },
    {
      question: "Qual é a melhor forma de agradecer em um e-mail formal?",
      options: ["Thx", "Thanks", "Thank you for your time", "Ty"],
      correct: 2,
    },
  ];

  const [finalQuizAnswers, setFinalQuizAnswers] = useState([]);
  const [quizResult, setQuizResult] = useState(null);
  const [quizChecked, setQuizChecked] = useState(false); // indica que o usuário finalizou

  function submitFinalQuiz() {
    const answered = finalQuizAnswers.filter((a) => a !== undefined).length;

    if (answered < finalQuizQuestions.length) {
      setQuizResult({
        text: "⚠️ Responda todas as perguntas antes de finalizar o quiz.",
        color: "#dc2626",
      });
      return;
    }

    let score = 0;
    finalQuizAnswers.forEach((answer, index) => {
      if (answer === finalQuizQuestions[index].correct) score++;
    });

    let message = `🎯 Pontuação Final: ${score}/${finalQuizQuestions.length}\n`;

    if (score === finalQuizQuestions.length) {
      message +=
        "🏆 Perfeito! Você dominou completamente a estrutura de e-mails formais!";
    } else if (score >= 6) {
      message +=
        "🌟 Excelente! Você tem um ótimo conhecimento sobre e-mails profissionais!";
    } else if (score >= 4) {
      message +=
        "👍 Bom trabalho! Continue praticando para melhorar ainda mais!";
    } else {
      message +=
        "💪 Continue estudando! Revise a estrutura e a linguagem formal.";
    }

    setQuizResult({
      text: message,
      color: score >= 6 ? "#16a34a" : score >= 4 ? "#2563eb" : "#ca8a04",
    });

    setQuizChecked(true); // bloqueia alterações após finalizar
  }

  function resetFinalQuiz() {
    setFinalQuizAnswers([]);
    setQuizResult(null);
    setQuizChecked(false);
  }

  function selectFinalAnswer(questionIndex, optionIndex) {
    // Permite trocar a resposta livremente enquanto o quiz NÃO estiver finalizado
    if (quizChecked) return; // bloqueia quando já foi finalizado
    const next = [...finalQuizAnswers];
    next[questionIndex] = optionIndex;
    setFinalQuizAnswers(next);
  }

  const { renderPrevButton, renderNextButton } = useNav();

  return (
    <View style={styles.slide}>
      <View style={{ alignItems: "center", marginBottom: 14 }}>
        <Text style={[styles.slideObjectiveTitle, { fontSize: 28 }]}>
          Quiz Final
        </Text>
        <Text style={{ fontSize: 18, color: "#555", textAlign: "center" }}>
          Teste todos os seus conhecimentos
        </Text>
      </View>

      <View style={styles.slideCard}>
        <View style={styles.templateCard}>
          <Text style={{ fontSize: 36, textAlign: "center" }}>🏆</Text>
          <Text style={styles.exerciseTitle}>Desafio Final</Text>
          <Text>8 perguntas sobre estrutura e formalidade de e-mails</Text>

          <View style={{ marginTop: 12 }}>
            {finalQuizQuestions.map((q, idx) => (
              <View key={idx} style={styles.quizQuestionLarge}>
                <Text style={{ fontWeight: "700" }}>
                  {idx + 1}. {q.question}
                </Text>

                {q.options.map((opt, oi) => {
                  // estilo quando não foi finalizado: marca seleção atual (azul)
                  const baseStyle = styles.quizOption;
                  const isSelected = finalQuizAnswers[idx] === oi;

                  // se o quiz foi finalizado, destacamos apenas a opção escolhida:
                  // - verde: se a escolhida for correta
                  // - vermelho: se a escolhida for incorreta
                  let checkedStyle = null;
                  if (quizChecked && isSelected) {
                    if (oi === q.correct) {
                      checkedStyle = {
                        borderColor: "#16a34a",
                        backgroundColor: "#ecfdf5",
                      };
                    } else {
                      checkedStyle = {
                        borderColor: "#ef4444",
                        backgroundColor: "#fff1f2",
                      };
                    }
                  } else if (!quizChecked && isSelected) {
                    // seleção pré-verificação
                    checkedStyle = {
                      borderColor: "#2563eb",
                      backgroundColor: "#eff6ff",
                    };
                  }

                  return (
                    <TouchableOpacity
                      key={oi}
                      style={[baseStyle, checkedStyle]}
                      onPress={() => selectFinalAnswer(idx, oi)}
                      activeOpacity={0.8}
                      disabled={quizChecked} // bloqueia toques após verificação
                    >
                      <Text>{opt}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>

          <View style={{ alignItems: "center", marginTop: 12 }}>
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={submitFinalQuiz}
            >
              <Text style={styles.verifyButtonText}>🎯 Finalizar Quiz</Text>
            </TouchableOpacity>

            <Text style={{ marginTop: 8 }}>
              Progresso:{" "}
              {finalQuizAnswers.filter((a) => a !== undefined).length}/
              {finalQuizQuestions.length}
            </Text>

            {quizResult && (
              <>
                <Text
                  style={{
                    marginTop: 10,
                    fontWeight: "700",
                    textAlign: "center",
                    color: quizResult.color,
                  }}
                >
                  {quizResult.text}
                </Text>

                <TouchableOpacity
                  style={[
                    styles.verifyButton,
                    { marginTop: 10, backgroundColor: "#9ba6b6" },
                  ]}
                  onPress={resetFinalQuiz}
                >
                  <Text style={styles.verifyButtonText}>🔄 Reiniciar Quiz</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
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
          Guia completo para e-mails profissionais
        </Text>
      </View>
      <View style={styles.exerciseCard}>
        <View style={styles.summaryBlock}>
          <Text style={styles.summaryTitleBlue}>Estrutura</Text>
          <Text style={styles.summaryText3}>
            1. Greeting{"\n"}
            <Text style={styles.summaryText2}>Dear Mr./Ms. [Name]</Text>
            {"\n"}
            2. Introduction{"\n"}
            <Text style={styles.summaryText2}>I am writing to...</Text>
            {"\n"}3. Body{"\n"}
            <Text style={styles.summaryText2}>Could you please...</Text>
            {"\n"}
            4. Closing{"\n"}
            <Text style={styles.summaryText2}>Thank you for...</Text>
            {"\n"}
            5. Signature {"\n"}
            <Text style={styles.summaryText2}>Best regards, [Name]</Text>
          </Text>
        </View>
        <View style={styles.congratsBox2}>
          <Text style={styles.summaryTitleGreen}>Dicas Importantes</Text>
          <Text style={styles.summaryText}>
            👋 Sempre use saudação formal{"\n"}
            <Text style={styles.summaryText2}>
              Evite "Hey" ou "Hi" em contextos profissionais
            </Text>
            🎯 Seja claro e direto{"\n"}
            <Text style={styles.summaryText2}>
              Explique o motivo do e-mail logo no início
            </Text>
            {"\n"}🔍 Revise antes de enviar{"\n"}
            <Text style={styles.summaryText2}>
              Verifique gramática, ortografia e tom
            </Text>
          </Text>
        </View>
        <View style={styles.summaryHighlight}>
          <Text style={styles.summaryTitleOrange}>Evite</Text>
          <Text style={styles.summaryText}>
            <Text style={styles.summaryTitleRed}>Linguagem Informal:</Text>
            {"\n"}❌ "Hey" → ✅ "Dear" {"\n"}❌ "Wanna" → ✅ "Would like to"
            {"\n"}❌ "Thx" → ✅ "Thank you"
            {"\n"}
            <Text style={styles.summaryTitleRed}>Erros Comuns:</Text>
            {"\n"}• Assunto vago ou ausente {"\n"}• Texto muito longo {"\n"}•
            Sem despedida formal
          </Text>
        </View>
        <View style={styles.congratsBox}>
          <Text style={styles.congratsTitle}>🎉 Parabéns!</Text>
          <Text style={styles.congratsText}>
            Você completou a aula de Professional Emails! Agora você sabe como
            estruturar e-mails formais em inglês!
          </Text>
        </View>
        <View style={styles.summaryBlock}>
          <Text style={styles.summaryTitleBlue}>📈 Próximos Passos</Text>
          <Text style={styles.summaryText}>
            📧 Pratique:{"\n"}• Escreva e-mails reais
            {"\n"}• Use templates como base{"\n"}• Peça feedback de colegas
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
  slide: {
    flex: 1,
    width: width,
    alignSelf: "stretch",
    justifyContent: "center", // eixo vertical
    alignItems: "center", // eixo horizontal
  },
  slideObjectiveTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#022b62",
    marginBottom: 6,
    textAlign: "center",
  },
  slideObjectiveText: {
    fontSize: 20,
    color: "#222",
    fontWeight: "400",
    padding: 12,
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    textAlign: "center",
    maxWidth: 360,
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
    marginTop: 10,
    marginBottom: 20,
  },
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
    backgroundColor: "#fff",
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
    width: width * 0.95,
  },
  feedbackBox: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
  },
  leftColumn: { flex: 1, paddingRight: 8, marginBottom: 16, padding: 12 },
  templateCard: {
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 12,
    width: width * 0.95,
    justifyContent: "center",
  },
  //uso comum daqui pra cima

  //slide3
  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
  },
  partBox: {
    backgroundColor: "#fff7ed",
    padding: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  partBoxBlue: {
    backgroundColor: "#eff6ff",
    padding: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  partBoxGreen: {
    backgroundColor: "#ecfbf3",
    padding: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  partBoxPurple: {
    backgroundColor: "#faf5ff",
    padding: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  partBoxGray: {
    backgroundColor: "#f8fafc",
    padding: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  exerciseTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginTop: 6,
    textAlign: "center",
  },
  exerciseText: { color: "#374151", marginTop: 6 },
  partsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 1,
    marginTop: 1,
  },
  emailPart: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 5,
    borderRadius: 12,
    margin: 4,
    minWidth: 90,
    alignItems: "center",
  },
  dropSlot: {
    backgroundColor: "#f8fafc",
    borderWidth: 2,
    borderColor: "#cbd5e1",
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  dropSlotFilled: { borderColor: "#22c55e", backgroundColor: "#f0fdf4" },
  verifyButton: {
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: "#9ce7b8",
    alignItems: "center",
    justifyContent: "center",
  },

  //slide4
  tipCard: {
    backgroundColor: "#fff7ed",
    padding: 12,
    borderRadius: 12,
    marginTop: 12,
  },
  tipTitle: { fontWeight: "800", color: "#c2410c", marginBottom: 6 },
  quizQuestion: { marginTop: 8 },
  quizQuestionLarge: { marginTop: 8 },
  quizOption: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 10,
    borderRadius: 8,
    marginTop: 6,
  },
  phraseOption: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999, // pill style
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",

    // se seu RN não suporta "gap"
    marginRight: 6,
    marginBottom: 6,
  },
  correctOption: {
    borderColor: "#22c55e",
    backgroundColor: "#f0fdf4",
  },
  wrongOption: {
    borderColor: "#ef4444",
    backgroundColor: "#fef2f2",
  },
  disabledOption: {
    opacity: 0.7,
  },
  resetButton: {
    marginTop: 10,
    backgroundColor: "#bdbec0",
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

  //slide5
  emailTemplate: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  blankSpace: {
    backgroundColor: "#fff",
    borderBottomWidth: 2,
    borderBottomColor: "#ec651d",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    width: 120,
    alignItems: "center",
    marginBottom: 8,
  },
  blankSpaceInline: {
    backgroundColor: "#fff",
    borderBottomWidth: 2,
    borderBottomColor: "#ec651d",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  blankFilled: { borderBottomColor: "#16a34a" },
  popupContainer: {
    position: "absolute",
    maxWidth: "80%", // melhor que width fixa
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#fff",
    flexDirection: "row",
    flexWrap: "wrap",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,

    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  //slide6
  inlineError: {
    backgroundColor: "transparent",
    borderWidth: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginHorizontal: 0,
    marginVertical: 0,
    alignSelf: "baseline",
  },
  errorFound: {
    textDecorationColor: "#166332",
    textDecorationStyle: "solid",
    backgroundColor: "#90dfad",
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 10,
  },
  foundBox: {
    flex: 1,
    backgroundColor: "#fee2e2",
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
    width: "48%",
    minWidth: 120,
  },
  correctionsBox: {
    flex: 1,
    backgroundColor: "#ecfdf5",
    padding: 8,
    borderRadius: 8,
    width: "48%",
    minWidth: 120,
  },

  //slide7
  comparisonQuestion: { marginTop: 8 },
  compareRow: { flexDirection: "row" },
  comparisonCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    flex: 1,
    margin: 4,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  correctCard: {
    borderColor: "#22c55e",
    borderWidth: 2,
    backgroundColor: "#f0fdf4",
  },
  incorrectCard: {
    borderColor: "#ef4444",
    borderWidth: 2,
    backgroundColor: "#fef2f2",
  },

  //slide8
  card: {
    backgroundColor: "#f8fafc",
    borderRadius: 14,
    padding: 16,
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginTop: 6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  headerIcon: {
    fontSize: 20,
    marginRight: 6,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0f172a",
  },
  description: {
    fontSize: 15,
    color: "#334155",
    marginBottom: 14,
    lineHeight: 22,
  },
  columns: {
    flexDirection: width < 420 ? "column" : "row",
    gap: 12,
  },
  column: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  columnTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 6,
    color: "#7c2d12",
  },
  columnTitleBlue: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 6,
    color: "#1d4ed8",
  },
  item: {
    fontSize: 14,
    color: "#334155",
    marginBottom: 4,
    lineHeight: 20,
  },
  textArea: {
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 12,
    minHeight: 140,
    marginTop: 8,
    textAlignVertical: "top",
    backgroundColor: "#fff",
  },
  checklistBox: {
    flex: 1,
    backgroundColor: "#ecfdf5",
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  tipsBox: { flex: 1, backgroundColor: "#eff6ff", padding: 8, borderRadius: 8 },

  //slide10
  summarySection: {
    marginBottom: 14,
  },
  summaryTitleOrange: {
    fontWeight: "800",
    color: "#ec2b1d",
    fontSize: 20,
    marginBottom: 6,
  },
  summaryTitleRed: {
    fontWeight: "400",
    color: "#f13628",
    fontSize: 16,
    marginBottom: 6,
  },
  summaryTitleBlue: {
    fontWeight: "800",
    color: "#2563eb",
    fontSize: 20,
    marginBottom: 6,
  },
  summaryTitleGreen: {
    fontWeight: "800",
    color: "#22c55e",
    fontSize: 20,
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
  congratsBox2: {
    backgroundColor: "#f0fdf4",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#dcfce7",
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
