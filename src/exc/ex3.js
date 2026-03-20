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

export function Exercise3({ activity, styles, HeaderComponent, next, speak }) {
  const bottomSafeSpace = 3;
  const audioProgressAnim = useRef(new Animated.Value(0)).current;
  const alertTranslateY = useRef(new Animated.Value(64)).current;
  const alertOpacity = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const blinkAnim = useRef(new Animated.Value(0)).current;

  const [selected, setSelected] = useState(null);
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
      blinkAnim.setValue(0);
    });
  };

  const handleSelect = (option) => {
    if (isCorrect) return;

    setSelected(option);

    if (option === activity.correctAnswer) {
      setResult("correct");
      return;
    }

    triggerWrongFeedback();
  };

  return (
    <View style={styles.slide}>
      <HeaderComponent />

      <View style={styles.listenAnswerBlock}>
        <Text style={styles.fastTypePrompt}>{activity.prompt}</Text>

        <View style={styles.listenAnswerMediaWrapper}>
          <View style={styles.listenAnswerMediaCard}>
            <Image source={activity.image} style={styles.listenAnswerImage} />
          </View>

          <TouchableOpacity
            style={styles.listenAnswerAudioButton}
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

        <Text style={styles.listenAnswerDialogue}>{activity.dialogue}</Text>

        <View style={styles.listenAnswerOptionsRow}>
          {activity.options.map((option) => {
            const optionIsCorrect =
              selected === option &&
              option === activity.correctAnswer &&
              isCorrect;
            const optionIsWrong =
              selected === option &&
              option !== activity.correctAnswer &&
              result === "wrong";

            return (
              <Animated.View
                key={option}
                style={[
                  styles.listenAnswerOptionWrap,
                  optionIsWrong && {
                    transform: [{ translateX: shakeTranslateX }],
                  },
                ]}
              >
                <Animated.View
                  style={[
                    styles.listenAnswerOption,
                    optionIsCorrect && styles.listenAnswerOptionCorrect,
                    optionIsWrong && styles.listenAnswerOptionWrong,
                    optionIsWrong && { backgroundColor: wrongBackground },
                  ]}
                >
                  <TouchableOpacity
                    style={styles.listenAnswerOptionTouch}
                    onPress={() => handleSelect(option)}
                    activeOpacity={0.9}
                    disabled={isCorrect}
                  >
                    <Text
                      style={[
                        styles.listenAnswerOptionText,
                        optionIsCorrect && styles.listenAnswerOptionTextCorrect,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              </Animated.View>
            );
          })}
        </View>
      </View>

      {isCorrect && (
        <View style={styles.successAlertOverlay}>
          <Animated.View
            style={[
              styles.successAlertCard,
              styles.slide4SuccessAlertCard,
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

const ex3 = StyleSheet.create({
  listenAnswerBlock: {
    width: "100%",
    alignItems: "center",
  },
  listenAnswerDialogue: {
    width: "88%",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 22,
    color: CORES.PRIMARY,
    fontWeight: "700",
    marginBottom: 16,
  },
  listenAnswerOptionsRow: {
    flexDirection: "row",
    gap: 12,
  },
  listenAnswerOptionWrap: {
    minWidth: 86,
  },
  listenAnswerOption: {
    height: 40,
    minWidth: 86,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D8E1EC",
    backgroundColor: CORES.WHITE,
  },
  listenAnswerOptionTouch: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  listenAnswerOptionText: {
    fontSize: 16,
    color: "#64748B",
    fontWeight: "600",
  },
  listenAnswerOptionCorrect: {
    backgroundColor: CORES.SUCCESS_BG,
    borderColor: CORES.SUCCESS,
  },
  listenAnswerOptionWrong: {
    borderColor: CORES.DANGER,
  },
  listenAnswerOptionTextCorrect: {
    color: CORES.SUCCESS_DARK,
  },
  slide4SuccessAlertCard: {
    marginHorizontal: 12,
    marginBottom: 0,
    zIndex: 200,
    elevation: 30,
  },
});

export default ex3;
