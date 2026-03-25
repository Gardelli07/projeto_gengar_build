import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  View,
  StyleSheet,
} from "react-native";
import CORES from "../util/cores";

export function Exercise11({ activity, styles, HeaderComponent, next }) {
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const wrongBlinkAnim = useRef(new Animated.Value(0)).current;
  const correctBlinkAnim = useRef(new Animated.Value(0)).current;

  const words = activity.words || [];
  const secondsPerWord = activity.secondsPerWord || 5;

  const [screen, setScreen] = useState("statement");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [timeLeft, setTimeLeft] = useState(secondsPerWord);
  const [result, setResult] = useState(null);
  const [answers, setAnswers] = useState([]);

  const currentWord = words[currentIndex];
  const isFinished = currentIndex >= words.length;
  const correctCount = answers.filter((item) => item.isCorrect).length;
  const wrongAnswers = answers.filter((item) => !item.isCorrect);

  const summaryTone =
    correctCount <= 1 ? "danger" : correctCount <= 3 ? "warning" : "success";

  const shakeTranslateX = shakeAnim.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, -8, 8, -8, 0],
  });

  const wrongBackground = wrongBlinkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [CORES.WHITE, CORES.DANGER_LIGHT],
  });

  const correctBackground = correctBlinkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [CORES.WHITE, CORES.SUCCESS_BG],
  });

  const goToNextWord = (answer) => {
    const updatedAnswers = [...answers, answer];
    const nextIndex = currentIndex + 1;

    setAnswers(updatedAnswers);
    setTypedText("");
    setResult(null);
    setCurrentIndex(nextIndex);
    setTimeLeft(secondsPerWord);

    if (nextIndex >= words.length) {
      setScreen("feedback");
    }
  };

  useEffect(() => {
    if (screen !== "exercise" || isFinished) return;
    if (result !== null) return;

    if (timeLeft <= 0) {
      triggerWrongFeedback(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((current) => current - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, screen, isFinished, result]);

  const triggerWrongFeedback = (byTimeout = false) => {
    if (!currentWord) return;

    setResult("wrong");
    Vibration.vibrate(140);
    shakeAnim.setValue(0);
    wrongBlinkAnim.setValue(0);

    Animated.parallel([
      Animated.timing(shakeAnim, {
        toValue: 1,
        duration: 480,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.sequence([
        Animated.timing(wrongBlinkAnim, {
          toValue: 1,
          duration: 120,
          useNativeDriver: false,
        }),
        Animated.timing(wrongBlinkAnim, {
          toValue: 0,
          duration: 120,
          useNativeDriver: false,
        }),
        Animated.timing(wrongBlinkAnim, {
          toValue: 1,
          duration: 120,
          useNativeDriver: false,
        }),
        Animated.timing(wrongBlinkAnim, {
          toValue: 0,
          duration: 120,
          useNativeDriver: false,
        }),
      ]),
    ]).start(() => {
      wrongBlinkAnim.setValue(0);
      goToNextWord({
        expected: currentWord,
        typed: typedText.trim(),
        isCorrect: false,
        reason: byTimeout ? "timeout" : "wrong",
      });
    });
  };

  const triggerCorrectFeedback = (value) => {
    if (!currentWord) return;

    setResult("correct");
    Vibration.vibrate(40);
    correctBlinkAnim.setValue(0);

    Animated.sequence([
      Animated.timing(correctBlinkAnim, {
        toValue: 1,
        duration: 110,
        useNativeDriver: false,
      }),
      Animated.timing(correctBlinkAnim, {
        toValue: 0,
        duration: 110,
        useNativeDriver: false,
      }),
      Animated.timing(correctBlinkAnim, {
        toValue: 1,
        duration: 110,
        useNativeDriver: false,
      }),
      Animated.timing(correctBlinkAnim, {
        toValue: 0,
        duration: 110,
        useNativeDriver: false,
      }),
    ]).start(() => {
      correctBlinkAnim.setValue(0);
      goToNextWord({
        expected: currentWord,
        typed: value.trim(),
        isCorrect: true,
        reason: "correct",
      });
    });
  };

  const handleChangeText = (value) => {
    if (screen !== "exercise" || isFinished || result !== null) return;

    setTypedText(value);

    if (!currentWord) return;

    if (value.trim().toLowerCase() === currentWord.toLowerCase()) {
      triggerCorrectFeedback(value);
    }
  };

  const renderStatementScreen = () => (
    <View style={styles.fastTypeIntroCard}>
      <Text style={styles.fastTypeIntroTitle}>Desafio de Escrita!</Text>

      <Text style={styles.fastTypeIntroText}>
        Você verá{" "}
        <Text style={styles.fastTypeIntroAccentBlue}>
          {words.length} palavras
        </Text>
        , uma após a outra.
      </Text>

      <Text style={styles.fastTypeIntroText}>
        Você terá{" "}
        <Text style={styles.fastTypeIntroAccentBlue}>
          {secondsPerWord} segundos
        </Text>{" "}
        para escrever cada palavra.
      </Text>

      <Text style={styles.fastTypeIntroText}>
        Escreva o mais rápido que puder!
      </Text>

      <Text style={styles.fastTypeIntroHighlight}>
        Não pare
        <Text style={styles.fastTypeIntroText}>
          {" "}
          - a próxima palavra aparecera rapidamente!
        </Text>
      </Text>

      <Text style={styles.fastTypeIntroFooter}>Prepare-se... e foque!</Text>

      <TouchableOpacity
        style={styles.fastTypeIntroContinue}
        onPress={() => setScreen("exercise")}
      >
        <Text style={styles.fastTypeIntroContinueText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );

  const renderExerciseScreen = () => (
    <View style={styles.fastTypeBlock}>
      <Text style={styles.fastTypePrompt}>{activity.prompt}</Text>

      {currentWord ? (
        <>
          <Animated.View style={[styles.fastTypeWordPill]}>
            <Text style={styles.fastTypeWordPillText}>{currentWord}</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.fastTypeInputWrap,
              result === "wrong" && styles.fastTypeInputWrapWrong,
              result === "correct" && styles.fastTypeInputWrapCorrect,
              result === "wrong" && { backgroundColor: wrongBackground },
              result === "correct" && { backgroundColor: correctBackground },
              result === "wrong" && {
                transform: [{ translateX: shakeTranslateX }],
              },
            ]}
          >
            <TextInput
              value={typedText}
              onChangeText={handleChangeText}
              style={styles.fastTypeInput}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder=""
              placeholderTextColor="#8BB7E0"
            />
          </Animated.View>

          <Text style={styles.fastTypeTimer}>{timeLeft}s</Text>
        </>
      ) : null}
    </View>
  );

  const renderFeedbackItem = (item, index) => (
    <View key={`${item.expected}-${index}`} style={styles.fastTypeFeedbackItem}>
      <Text
        style={[
          styles.fastTypeFeedbackLineIcon,
          styles.fastTypeFeedbackLineIconWrong,
        ]}
      >
        ✕
      </Text>
      <View style={styles.fastTypeFeedbackCopy}>
        <Text style={styles.fastTypeFeedbackWrongWord}>{item.expected}</Text>
        <View style={styles.fastTypeFeedbackLine}>
          <Text style={styles.fastTypeFeedbackLineIcon}>✍</Text>
          <Text style={styles.fastTypeFeedbackLineText}>
            você escreveu: {item.typed || "..."}
          </Text>
        </View>
        <View style={styles.fastTypeFeedbackLine}>
          <Text style={styles.fastTypeFeedbackLineIcon}>💡</Text>
          <Text style={styles.fastTypeFeedbackLineText}>
            correto: {item.expected}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderFeedbackScreen = () => (
    <View style={styles.fastTypeFeedbackCard}>
      <Text style={styles.fastTypeFeedbackHeader}>Resultado do Desafio</Text>
      <Text style={styles.fastTypeFeedbackScore}>
        {correctCount} / {words.length} palavras corretas
      </Text>

      <View style={styles.fastTypeFeedbackSummaryRow}>
        <View
          style={[
            styles.fastTypeFeedbackSummaryDot,
            summaryTone === "danger" && styles.fastTypeFeedbackSummaryDotDanger,
            summaryTone === "warning" &&
              styles.fastTypeFeedbackSummaryDotWarning,
            summaryTone === "success" &&
              styles.fastTypeFeedbackSummaryDotSuccess,
          ]}
        />
        <Text style={styles.fastTypeFeedbackSummary}>
          Bom desempenho! Você está evoluindo.
        </Text>
      </View>

      <Text style={styles.fastTypeFeedbackSectionTitle}>
        Corrija seus erros
      </Text>

      <View style={styles.fastTypeFeedbackList}>
        {wrongAnswers.length > 0 ? (
          wrongAnswers.map(renderFeedbackItem)
        ) : (
          <View style={styles.fastTypeFeedbackPerfectRow}>
            <Text style={styles.fastTypeFeedbackPerfectIcon}>✓</Text>
            <Text style={styles.fastTypeFeedbackPerfectText}>
              Você acertou todas as palavras.
            </Text>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.fastTypeNextButton} onPress={next}>
        <Text style={styles.fastTypeNextButtonText}>Proxima atividade</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.slide}>
      <HeaderComponent />

      {screen === "statement" && renderStatementScreen()}
      {screen === "exercise" && renderExerciseScreen()}
      {screen === "feedback" && renderFeedbackScreen()}
    </View>
  );
}

const ex11 = StyleSheet.create({
  fastTypeBlock: {
    width: "100%",
    alignItems: "center",
  },
  fastTypeWordPill: {
    width: "50%",
    minHeight: 44,
    borderRadius: 10,
    backgroundColor: "#76A8D7",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    marginBottom: 26,
    paddingHorizontal: 16,
  },
  fastTypeWordPillText: {
    color: CORES.WHITE,
    fontSize: 16,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  fastTypeInputWrap: {
    width: "38%",
    borderBottomWidth: 2,
    borderBottomColor: "#8EB8E0",
    marginBottom: 12,
  },
  fastTypeInputWrapWrong: {
    borderBottomColor: CORES.DANGER,
  },
  fastTypeInputWrapCorrect: {
    borderBottomColor: CORES.SUCCESS,
  },
  fastTypeInput: {
    minHeight: 34,
    color: CORES.PRIMARY,
    fontSize: 16,
    textAlign: "center",
    paddingVertical: 4,
    fontWeight: "700",
  },
  fastTypeTimer: {
    width: "88%",
    textAlign: "center",
    fontSize: 12,
    color: "#78A2CC",
    fontWeight: "700",
  },
  fastTypeIntroCard: {
    width: "100%",
    minHeight: 248,
    backgroundColor: CORES.WHITE,
    borderWidth: 1,
    borderColor: "#9DC0E4",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    justifyContent: "flex-start",
  },
  fastTypeIntroTitle: {
    color: "#5D97CC",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  fastTypeIntroText: {
    color: "#3D3D3D",
    fontSize: 13,
    lineHeight: 21,
    marginBottom: 5,
  },
  fastTypeIntroAccentBlue: {
    color: "#5D97CC",
    fontWeight: "700",
  },
  fastTypeIntroHighlight: {
    color: "#2E7D32",
    fontSize: 13,
    lineHeight: 21,
    marginTop: 10,
    fontWeight: "700",
  },
  fastTypeIntroFooter: {
    color: "#76A8D7",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 10,
  },
  fastTypeIntroContinue: {
    alignSelf: "flex-start",
    marginTop: "auto",
  },
  fastTypeIntroContinueText: {
    color: "#5D97CC",
    fontSize: 13,
    fontWeight: "700",
  },
  fastTypeFeedbackCard: {
    width: "100%",
    minHeight: 248,
    paddingHorizontal: 2,
    paddingVertical: 4,
    justifyContent: "flex-start",
  },
  fastTypeFeedbackHeader: {
    color: "#5D97CC",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 10,
  },
  fastTypeFeedbackScore: {
    color: "#3D3D3D",
    fontSize: 13,
    marginBottom: 8,
  },
  fastTypeFeedbackSummaryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  fastTypeFeedbackSummaryDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  fastTypeFeedbackSummaryDotDanger: {
    backgroundColor: "#E53935",
  },
  fastTypeFeedbackSummaryDotWarning: {
    backgroundColor: "#E2A72E",
  },
  fastTypeFeedbackSummaryDotSuccess: {
    backgroundColor: "#2EAF50",
  },
  fastTypeFeedbackSummary: {
    color: "#3D3D3D",
    fontSize: 13,
  },
  fastTypeFeedbackSectionTitle: {
    color: "#5D97CC",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 10,
  },
  fastTypeFeedbackList: {
    gap: 14,
  },
  fastTypeFeedbackItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  fastTypeFeedbackCopy: {
    flex: 1,
  },
  fastTypeFeedbackWrongWord: {
    color: "#222222",
    fontSize: 15,
    marginBottom: 2,
  },
  fastTypeFeedbackLine: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginTop: 3,
  },
  fastTypeFeedbackLineIcon: {
    fontSize: 16,
    lineHeight: 18,
    width: 18,
    textAlign: "center",
  },
  fastTypeFeedbackLineIconWrong: {
    color: "#FF4B6E",
    marginTop: 1,
    fontSize: 16,
    lineHeight: 18,
    width: 18,
    textAlign: "center",
  },
  fastTypeFeedbackLineText: {
    color: "#4A4A4A",
    fontSize: 13,
    lineHeight: 18,
  },
  fastTypeFeedbackPerfectRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  fastTypeFeedbackPerfectIcon: {
    color: CORES.SUCCESS_TEXT,
    fontSize: 14,
    fontWeight: "700",
  },
  fastTypeFeedbackPerfectText: {
    color: "#3D3D3D",
    fontSize: 13,
  },
  fastTypeNextButton: {
    marginTop: 18,
    alignSelf: "center",
    minWidth: 180,
    height: 44,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: CORES.SECONDARY,
    alignItems: "center",
    justifyContent: "center",
  },
  fastTypeNextButtonText: {
    color: CORES.WHITE_SHORT,
    fontSize: 14,
    fontWeight: "700",
  },
});

export default ex11;
