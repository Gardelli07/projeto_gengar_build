import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  Text,
  TouchableOpacity,
  Vibration,
  View,
  StyleSheet,
} from "react-native";
import CORES from "../util/cores";

export function Exercise14({ activity, styles, HeaderComponent, next, speak }) {
  const bottomSafeSpace = 3;
  const audioProgressAnim = useRef(new Animated.Value(0)).current;
  const alertTranslateY = useRef(new Animated.Value(64)).current;
  const alertOpacity = useRef(new Animated.Value(0)).current;
  const blinkAnim = useRef(new Animated.Value(0)).current;

  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);

  const estimatedDurationMs = Math.max(
    900,
    Math.round(
      ((activity.correctAnswer.length / 5) * 60000) / 140 / activity.audioRate,
    ),
  );

  const wrongBackground = blinkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [CORES.DANGER_BG, CORES.DANGER_LIGHT],
  });

  const isCorrect = result === "correct";
  const isWrong = result === "wrong";

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
      text: activity.correctAnswer,
      language: "en-US",
      rate: activity.audioRate,
      onDone: () => audioProgressAnim.setValue(1),
      onStopped: () => audioProgressAnim.stopAnimation(),
      onError: () => audioProgressAnim.stopAnimation(),
    });
  };

  const handleSelect = (option) => {
    setSelected(option);

    if (option === activity.correctAnswer) {
      setResult("correct");
      return;
    }

    setResult("wrong");
    Vibration.vibrate(140);
    blinkAnim.setValue(0);

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
    ]).start();
  };

  return (
    <View style={styles.slide}>
      <HeaderComponent />

      <Text style={styles.fastTypePrompt}>{activity.prompt}</Text>

      <View style={styles.mediaWrapper}>
        <View style={styles.mediaCard}>
          <Image source={activity.image} style={styles.mediaImage} />
        </View>

        <TouchableOpacity style={styles.audioButton} onPress={playAudio}>
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

      <View style={styles.resultBar}>
        <Text
          style={[
            styles.resultBarText,
            isCorrect && styles.resultBarTextCorrect,
            isWrong && styles.resultBarTextWrong,
          ]}
        >
          {selected || " "}
        </Text>
        <View
          style={[
            styles.resultUnderline,
            isCorrect && styles.resultUnderlineCorrect,
            isWrong && styles.resultUnderlineWrong,
          ]}
        />
      </View>

      <View style={styles.optionsRow}>
        {activity.options.map((option) => {
          const optionIsCorrect =
            selected === option && option === activity.correctAnswer;
          const optionIsWrong =
            selected === option && option !== activity.correctAnswer;

          return (
            <Animated.View
              key={option}
              style={[
                styles.optionPill,
                optionIsCorrect && styles.optionCorrect,
                optionIsWrong && styles.optionBlinkWrong,
                optionIsWrong && { backgroundColor: wrongBackground },
              ]}
            >
              <TouchableOpacity
                style={styles.optionPillTouch}
                onPress={() => handleSelect(option)}
                disabled={isCorrect}
              >
                <Text
                  style={[
                    styles.optionText,
                    optionIsCorrect && styles.optionCorrectText,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>

      {isWrong && (
        <View style={[styles.feedbackBox, styles.feedbackBoxWrong]}>
          <Text style={[styles.feedbackTitle, styles.feedbackTitleWrong]}>
            x Sorry!
          </Text>
          <Text style={styles.feedbackTextBlack}>
            {activity.feedbackMessage}
          </Text>
        </View>
      )}

      {isCorrect && (
        <View style={styles.successAlertOverlay}>
          <Animated.View
            style={[
              styles.successAlertCard,
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
                ✓ Correto!
              </Text>
              <Text style={styles.feedbackTextBlack}>
                {activity.feedbackMessage}
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

const ex14 = StyleSheet.create({
  mediaWrapper: {
    width: "88%",
    marginBottom: 14,
  },
  mediaCard: {
    width: "100%",
    height: 190,
    backgroundColor: "#38BDF8",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    overflow: "hidden",
  },
  mediaImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  audioButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CORES.PRIMARY,
    width: "100%",
    height: 48,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    paddingHorizontal: 16,
    gap: 12,
  },
  resultBar: {
    width: "56%",
    minHeight: 46,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  resultBarText: {
    fontSize: 28,
    fontFamily: "serif",
    fontWeight: "500",
    color: CORES.TEXT_DARK,
  },
  resultBarTextCorrect: {
    color: CORES.SUCCESS_TEXT,
  },
  resultBarTextWrong: {
    color: CORES.DANGER_TEXT,
  },
  resultUnderline: {
    width: "55%",
    height: 2,
    marginTop: 2,
    borderRadius: 2,
    backgroundColor: "#D1D5DB",
  },
  resultUnderlineCorrect: {
    backgroundColor: CORES.SUCCESS,
  },
  resultUnderlineWrong: {
    backgroundColor: CORES.DANGER,
  },
  optionsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
  },
  optionPill: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 20,
    backgroundColor: CORES.WHITE_SHORT,
  },
  optionPillTouch: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  optionCorrect: {
    backgroundColor: CORES.SUCCESS_BG,
    borderColor: CORES.SUCCESS,
  },
  optionCorrectText: {
    color: CORES.SUCCESS_TEXT,
    fontWeight: "700",
  },
  optionBlinkWrong: {
    backgroundColor: CORES.DANGER_BG,
    borderColor: CORES.DANGER,
  },
  feedbackBoxWrong: {
    borderColor: CORES.DANGER,
    backgroundColor: "#FEF2F2",
  },
  feedbackTitleWrong: {
    color: CORES.DANGER_TEXT,
  },
});

export default ex14;
