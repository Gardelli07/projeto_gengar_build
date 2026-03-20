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
  const bottomSafeSpace = 3;
  const alertTranslateY = useRef(new Animated.Value(64)).current;
  const alertOpacity = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const blinkAnim = useRef(new Animated.Value(0)).current;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [timeLeft, setTimeLeft] = useState(activity.secondsPerWord || 5);
  const [result, setResult] = useState(null);
  const [lastCompletedWord, setLastCompletedWord] = useState("");

  const words = activity.words || [];
  const currentWord = words[currentIndex];
  const isFinished = currentIndex >= words.length;
  const isCorrect = result === "correct";
  const displayedWord = isFinished ? lastCompletedWord : currentWord;

  const shakeTranslateX = shakeAnim.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, -8, 8, -8, 0],
  });

  const wrongBackground = blinkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [CORES.WHITE, CORES.DANGER_LIGHT],
  });

  useEffect(() => {
    if (isFinished) {
      setResult("correct");
      return;
    }

    if (result === "wrong") return;

    if (timeLeft <= 0) {
      triggerWrongFeedback();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((current) => current - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isFinished, result]);

  useEffect(() => {
    if (isCorrect) {
      alertTranslateY.setValue(64);
      alertOpacity.setValue(0);
      Animated.parallel([
        Animated.timing(alertTranslateY, {
          toValue: 0,
          duration: 260,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(alertOpacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
      return;
    }

    alertTranslateY.setValue(64);
    alertOpacity.setValue(0);
  }, [isCorrect, alertOpacity, alertTranslateY]);

  const triggerWrongFeedback = () => {
    setResult("wrong");
    Vibration.vibrate(140);
    shakeAnim.setValue(0);
    blinkAnim.setValue(0);

    Animated.parallel([
      Animated.timing(shakeAnim, {
        toValue: 1,
        duration: 480,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.sequence([
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 120,
          useNativeDriver: false,
        }),
        Animated.timing(blinkAnim, {
          toValue: 0,
          duration: 120,
          useNativeDriver: false,
        }),
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 120,
          useNativeDriver: false,
        }),
        Animated.timing(blinkAnim, {
          toValue: 0,
          duration: 120,
          useNativeDriver: false,
        }),
      ]),
    ]).start(() => {
      setTypedText("");
      setTimeLeft(activity.secondsPerWord || 5);
      setResult(null);
      blinkAnim.setValue(0);
    });
  };

  const handleChangeText = (value) => {
    if (isFinished || result === "wrong") return;

    setTypedText(value);

    if (!currentWord) return;

    if (value.trim().toLowerCase() === currentWord.toLowerCase()) {
      const nextIndex = currentIndex + 1;
      setLastCompletedWord(currentWord);
      setTypedText("");
      setCurrentIndex(nextIndex);
      setTimeLeft(activity.secondsPerWord || 5);
    }
  };

  return (
    <View style={styles.slide}>
      <HeaderComponent />

      <View style={styles.fastTypeBlock}>
        <Text style={styles.fastTypePrompt}>{activity.prompt}</Text>
        <Text style={styles.fastTypeTitle}>{activity.title}</Text>

        {displayedWord ? (
          <>
            <View
              style={[
                styles.fastTypeWordPill,
                isFinished && styles.fastTypeWordPillCorrect,
              ]}
            >
              <Text
                style={[
                  styles.fastTypeWordPillText,
                  isFinished && styles.fastTypeWordPillTextCorrect,
                ]}
              >
                {displayedWord}
              </Text>
            </View>

            <Animated.View
              style={[
                styles.fastTypeInputWrap,
                result === "wrong" && styles.fastTypeInputWrapWrong,
                result === "wrong" && { backgroundColor: wrongBackground },
                result === "wrong" && {
                  transform: [{ translateX: shakeTranslateX }],
                },
                isFinished && styles.fastTypeInputWrapCorrect,
              ]}
            >
              {isFinished ? (
                <Text style={styles.fastTypeInputDoneText}>
                  {displayedWord}
                </Text>
              ) : (
                <TextInput
                  value={typedText}
                  onChangeText={handleChangeText}
                  style={styles.fastTypeInput}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder={activity.placeholder}
                  placeholderTextColor="#8BB7E0"
                />
              )}
            </Animated.View>

            {!isFinished && (
              <>
                <Text style={styles.fastTypeTimer}>
                  {timeLeft} segundos para digitar
                </Text>
                <Text style={styles.fastTypeProgress}>
                  Palavra {currentIndex + 1} de {words.length}
                </Text>
              </>
            )}
          </>
        ) : null}
      </View>

      {isCorrect && (
        <View style={styles.successAlertOverlay}>
          <Animated.View
            style={[
              styles.successAlertCard,
              styles.slide11SuccessAlertCard,
              { paddingBottom: bottomSafeSpace + 1 },
              {
                opacity: alertOpacity,
                transform: [{ translateY: alertTranslateY }],
              },
            ]}
          >
            <View style={styles.successHeaderRow}>
              <View style={styles.successIconWrap}>
                <Text style={styles.successIcon}>✓</Text>
              </View>
              <Text style={styles.successAlertTitle}>
                {activity.successTitle}
              </Text>
            </View>

            <View
              style={[
                styles.feedbackBox,
                styles.feedbackBoxCorrect,
                styles.alertFeedbackBox,
              ]}
            >
              <Text style={[styles.feedbackTitle, styles.feedbackTitleCorrect]}>
                ✓ Muito bem!
              </Text>
              <Text style={styles.feedbackTextBlack}>
                {activity.successMessage}
              </Text>
            </View>

            <TouchableOpacity style={styles.alertContinueButton} onPress={next}>
              <Text style={styles.alertContinueButtonText}>Próximo -&gt;</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </View>
  );
}

const ex11 = StyleSheet.create({
  fastTypeBlock: {
    width: "100%",
    alignItems: "center",
  },
  fastTypeTitle: {
    width: "88%",
    textAlign: "center",
    fontSize: 16,
    color: CORES.TEXT_DARK,
    marginBottom: 18,
    fontWeight: "700",
  },
  fastTypeWordPill: {
    width: "45%",
    minHeight: 38,
    borderRadius: 10,
    backgroundColor: "#7BA9D6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
    paddingHorizontal: 16,
  },
  fastTypeWordPillText: {
    color: CORES.WHITE,
    fontSize: 16,
    fontWeight: "700",
  },
  fastTypeWordPillCorrect: {
    backgroundColor: CORES.SUCCESS,
  },
  fastTypeWordPillTextCorrect: {
    color: CORES.WHITE,
  },
  fastTypeInputWrap: {
    width: "48%",
    borderBottomWidth: 2,
    borderBottomColor: "#7BA9D6",
    marginBottom: 18,
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
  },
  fastTypeInputDoneText: {
    minHeight: 34,
    color: CORES.SUCCESS_DARK,
    fontSize: 16,
    textAlign: "center",
    paddingVertical: 4,
    fontWeight: "700",
  },
  fastTypeTimer: {
    width: "88%",
    textAlign: "center",
    fontSize: 16,
    color: "#166534",
    fontWeight: "700",
    marginBottom: 6,
  },
  fastTypeProgress: {
    width: "88%",
    textAlign: "center",
    fontSize: 13,
    color: CORES.PRIMARY,
  },
  slide11SuccessAlertCard: {
    marginHorizontal: 12,
    marginBottom: 0,
    zIndex: 200,
    elevation: 30,
  },
});

export default ex11;
