import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Text,
  TouchableOpacity,
  Vibration,
  View,
  StyleSheet,
} from "react-native";
import CORES from "../util/cores";

export function Exercise13({ activity, styles, HeaderComponent, next, speak }) {
  const bottomSafeSpace = 3;

  const shuffleArray = (items) => {
    const shuffled = [...items];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[randomIndex]] = [
        shuffled[randomIndex],
        shuffled[index],
      ];
    }
    return shuffled;
  };

  const shuffledLetters = useMemo(
    () => shuffleArray(activity.letters),
    [activity.letters],
  );
  const audioProgressAnim = useRef(new Animated.Value(0)).current;
  const alertTranslateY = useRef(new Animated.Value(64)).current;
  const alertOpacity = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const blinkAnim = useRef(new Animated.Value(0)).current;

  const [selectedLetters, setSelectedLetters] = useState([]);
  const [result, setResult] = useState(null);

  const estimatedDurationMs = Math.max(
    1200,
    Math.round(
      ((activity.audioText.length / 5) * 60000) / 140 / activity.audioRate,
    ),
  );

  const isCorrect = result === "correct";

  const shakeTranslateX = shakeAnim.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, -8, 8, -8, 0],
  });

  const wrongBackground = blinkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [CORES.WHITE, CORES.DANGER_LIGHT],
  });

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

  const playAudio = () => {
    audioProgressAnim.stopAnimation();
    audioProgressAnim.setValue(0);
    Animated.timing(audioProgressAnim, {
      toValue: 1,
      duration: estimatedDurationMs,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    speak({
      text: activity.audioText,
      language: "en-US",
      rate: activity.audioRate,
      onDone: () => audioProgressAnim.setValue(1),
      onStopped: () => audioProgressAnim.stopAnimation(),
      onError: () => audioProgressAnim.stopAnimation(),
    });
  };

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
      setResult(null);
      setSelectedLetters([]);
      blinkAnim.setValue(0);
    });
  };

  const handleLetterPress = (letter, indexKey) => {
    if (isCorrect || selectedLetters.some((item) => item.key === indexKey))
      return;

    const nextLetters = [...selectedLetters, { key: indexKey, value: letter }];
    setSelectedLetters(nextLetters);

    const nextWord = nextLetters.map((item) => item.value).join("");
    const correctWord = activity.correctWord;

    if (!correctWord.startsWith(nextWord)) {
      triggerWrongFeedback();
      return;
    }

    if (nextWord === correctWord) {
      setResult("correct");
    }
  };

  const handleSelectedLetterPress = (indexKey) => {
    if (isCorrect) return;
    setSelectedLetters((current) =>
      current.filter((item) => item.key !== indexKey),
    );
  };

  return (
    <View style={styles.slide}>
      <HeaderComponent />

      <View style={styles.spellWordBlock}>
        <Text style={styles.fastTypePrompt}>{activity.prompt}</Text>

        <View style={styles.spellWordAudioCard}>
          <TouchableOpacity
            style={styles.spellWordAudioButton}
            onPress={playAudio}
          >
            <Text style={styles.audioIcon}>▶</Text>
            <View style={styles.audioBar}>
              <Animated.View
                style={[
                  styles.audioProgress,
                  {
                    width: audioProgressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0%", "100%"],
                    }),
                  },
                ]}
              />
            </View>
          </TouchableOpacity>
        </View>

        <Animated.View
          style={[
            styles.spellWordAnswerBox,
            isCorrect && styles.spellWordAnswerBoxCorrect,
            result === "wrong" && styles.spellWordAnswerBoxWrong,
            result === "wrong" && { backgroundColor: wrongBackground },
            result === "wrong" && {
              transform: [{ translateX: shakeTranslateX }],
            },
          ]}
        >
          {selectedLetters.length === 0 ? (
            <Text style={styles.spellWordPlaceholder}>_____</Text>
          ) : (
            selectedLetters.map((item) => (
              <TouchableOpacity
                key={item.key}
                style={[
                  styles.spellWordSelectedLetter,
                  isCorrect && styles.spellWordSelectedLetterCorrect,
                ]}
                onPress={() => handleSelectedLetterPress(item.key)}
                disabled={isCorrect}
              >
                <Text
                  style={[
                    styles.spellWordSelectedLetterText,
                    isCorrect && styles.spellWordSelectedLetterTextCorrect,
                  ]}
                >
                  {item.value}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </Animated.View>

        <View style={styles.spellWordOptionsRow}>
          {shuffledLetters.map((letter, index) => {
            const key = `${letter}-${index}`;
            const used = selectedLetters.some((item) => item.key === key);

            return (
              <TouchableOpacity
                key={key}
                style={[
                  styles.spellWordOption,
                  used && styles.spellWordOptionUsed,
                ]}
                onPress={() => handleLetterPress(letter, key)}
                disabled={used || isCorrect}
              >
                <Text
                  style={[
                    styles.spellWordOptionText,
                    used && styles.spellWordOptionTextUsed,
                  ]}
                >
                  {letter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {isCorrect && (
        <View style={styles.successAlertOverlay}>
          <Animated.View
            style={[
              styles.successAlertCard,
              styles.slide13SuccessAlertCard,
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

const ex13 = StyleSheet.create({
  spellWordBlock: {
    width: "100%",
    alignItems: "center",
  },
  spellWordAudioCard: {
    width: "88%",
    marginBottom: 12,
  },
  spellWordAudioButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7BA9D6",
    width: "100%",
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 16,
    gap: 12,
  },
  spellWordAnswerBox: {
    width: "88%",
    minHeight: 58,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: CORES.PRIMARY,
    backgroundColor: CORES.WHITE,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 6,
    marginBottom: 18,
  },
  spellWordAnswerBoxCorrect: {
    backgroundColor: CORES.SUCCESS_BG,
    borderColor: CORES.SUCCESS,
  },
  spellWordAnswerBoxWrong: {
    borderColor: CORES.DANGER,
  },
  spellWordPlaceholder: {
    color: CORES.PRIMARY,
    fontSize: 14,
  },
  spellWordSelectedLetter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#7BA9D6",
    backgroundColor: "#7BA9D6",
    alignItems: "center",
    justifyContent: "center",
  },
  spellWordSelectedLetterCorrect: {
    backgroundColor: CORES.SUCCESS_BG,
    borderColor: CORES.SUCCESS,
  },
  spellWordSelectedLetterText: {
    color: CORES.WHITE,
    fontSize: 13,
    fontWeight: "700",
  },
  spellWordSelectedLetterTextCorrect: {
    color: CORES.SUCCESS_DARK,
  },
  spellWordOptionsRow: {
    width: "88%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  spellWordOption: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#7BA9D6",
    backgroundColor: CORES.WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
  spellWordOptionUsed: {
    backgroundColor: CORES.SURFACE_MUTED,
    borderColor: CORES.BORDER_LIGHT,
  },
  spellWordOptionText: {
    color: CORES.PRIMARY,
    fontSize: 13,
    fontWeight: "700",
  },
  spellWordOptionTextUsed: {
    color: "#93C5FD",
  },
  slide13SuccessAlertCard: {
    marginHorizontal: 12,
    marginBottom: 0,
    zIndex: 200,
    elevation: 30,
  },
});

export default ex13;
