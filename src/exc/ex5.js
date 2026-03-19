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

export function Exercise5({ activity, styles, HeaderComponent, next }) {
  const bottomSafeSpace = 3;
  const alertTranslateY = useRef(new Animated.Value(64)).current;
  const alertOpacity = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const blinkAnim = useRef(new Animated.Value(0)).current;

  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);

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

      <View style={styles.completePhraseBlock}>
        <Text style={styles.completePhraseTitle}>{activity.title}</Text>

        <View style={styles.completePhraseMediaCard}>
          <Image source={activity.image} style={styles.completePhraseImage} />
        </View>

        <View style={styles.completePhraseSentencePill}>
          <Text style={styles.completePhraseSentenceText}>
            {activity.sentenceStart}
          </Text>

          <Animated.View
            style={[
              styles.completePhraseBlank,
              isCorrect && styles.completePhraseBlankCorrect,
              result === "wrong" && styles.completePhraseBlankWrong,
              result === "wrong" && { backgroundColor: wrongBackground },
              result === "wrong" && {
                transform: [{ translateX: shakeTranslateX }],
              },
            ]}
          >
            <Text
              style={[
                styles.completePhraseBlankText,
                isCorrect && styles.completePhraseBlankTextCorrect,
              ]}
            >
              {selected || "_____"}
            </Text>
          </Animated.View>

          <Text style={styles.completePhraseSentenceText}>
            {activity.sentenceEnd}
          </Text>
        </View>

        <View style={styles.completePhraseOptionsRow}>
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
                  styles.completePhraseOptionWrap,
                  optionIsWrong && {
                    transform: [{ translateX: shakeTranslateX }],
                  },
                ]}
              >
                <Animated.View
                  style={[
                    styles.completePhraseOption,
                    optionIsCorrect && styles.completePhraseOptionCorrect,
                    optionIsWrong && styles.completePhraseOptionWrong,
                    optionIsWrong && { backgroundColor: wrongBackground },
                  ]}
                >
                  <TouchableOpacity
                    style={styles.completePhraseOptionTouch}
                    onPress={() => handleSelect(option)}
                    activeOpacity={0.9}
                    disabled={isCorrect}
                  >
                    <Text
                      style={[
                        styles.completePhraseOptionText,
                        optionIsCorrect &&
                          styles.completePhraseOptionTextCorrect,
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
              styles.slide6SuccessAlertCard,
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

const ex5 = StyleSheet.create({
  completePhraseBlock: {
    width: "100%",
    alignItems: "center",
  },
  completePhraseTitle: {
    width: "88%",
    textAlign: "left",
    fontSize: 15,
    color: CORES.PRIMARY,
    marginBottom: 10,
    fontWeight: "700",
  },
  completePhraseMediaCard: {
    width: "88%",
    height: 150,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 12,
    backgroundColor: CORES.SURFACE_MUTED,
  },
  completePhraseImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  completePhraseSentencePill: {
    width: "88%",
    minHeight: 38,
    borderRadius: 19,
    backgroundColor: CORES.PRIMARY,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  completePhraseSentenceText: {
    color: CORES.WHITE,
    fontSize: 15,
    fontWeight: "700",
  },
  completePhraseBlank: {
    minWidth: 68,
    minHeight: 26,
    borderRadius: 13,
    backgroundColor: CORES.WHITE,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  completePhraseBlankCorrect: {
    backgroundColor: CORES.SUCCESS_BG,
    borderWidth: 1,
    borderColor: CORES.SUCCESS,
  },
  completePhraseBlankWrong: {
    borderWidth: 1,
    borderColor: CORES.DANGER,
  },
  completePhraseBlankText: {
    color: CORES.PRIMARY,
    fontSize: 14,
    fontWeight: "700",
  },
  completePhraseBlankTextCorrect: {
    color: CORES.SUCCESS_DARK,
  },
  completePhraseOptionsRow: {
    flexDirection: "row",
    gap: 16,
  },
  completePhraseOptionWrap: {
    minWidth: 70,
  },
  completePhraseOption: {
    minWidth: 70,
    minHeight: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: CORES.PRIMARY,
    backgroundColor: CORES.WHITE,
  },
  completePhraseOptionTouch: {
    flex: 1,
    minHeight: 32,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  completePhraseOptionText: {
    fontSize: 14,
    color: CORES.PRIMARY,
    textAlign: "center",
  },
  completePhraseOptionCorrect: {
    backgroundColor: CORES.SUCCESS_BG,
    borderColor: CORES.SUCCESS,
  },
  completePhraseOptionWrong: {
    borderColor: CORES.DANGER,
  },
  completePhraseOptionTextCorrect: {
    color: CORES.SUCCESS_DARK,
    fontWeight: "700",
  },
  slide6SuccessAlertCard: {
    marginHorizontal: 12,
    marginBottom: 0,
    zIndex: 200,
    elevation: 30,
  },
});

export default ex5;
