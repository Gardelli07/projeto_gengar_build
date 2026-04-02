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

export function Exercise4({ activity, styles, HeaderComponent, next }) {
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

      <View style={styles.correctSentenceBlock}>
        <Text style={styles.fastTypePrompt}>{activity.prompt}</Text>

        <View style={styles.correctSentenceMediaCard}>
          <Image source={activity.image} style={styles.correctSentenceImage} />
        </View>

        <View style={styles.correctSentencePromptPill}>
          <Text style={styles.correctSentencePromptText}>
            {activity.wrongSentence}
          </Text>
        </View>

        <View style={styles.correctSentenceOptionsList}>
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
                  styles.correctSentenceOptionWrap,
                  optionIsWrong && {
                    transform: [{ translateX: shakeTranslateX }],
                  },
                ]}
              >
                <Animated.View
                  style={[
                    styles.correctSentenceOption,
                    optionIsCorrect && styles.correctSentenceOptionCorrect,
                    optionIsWrong && styles.correctSentenceOptionWrong,
                    optionIsWrong && { backgroundColor: wrongBackground },
                  ]}
                >
                  <TouchableOpacity
                    style={styles.correctSentenceOptionTouch}
                    onPress={() => handleSelect(option)}
                    activeOpacity={0.9}
                    disabled={isCorrect}
                  >
                    <Text
                      style={[
                        styles.correctSentenceOptionText,
                        optionIsCorrect &&
                          styles.correctSentenceOptionTextCorrect,
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
              styles.slide5SuccessAlertCard,
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

const ex4 = StyleSheet.create({
  correctSentenceBlock: {
    width: "100%",
    alignItems: "center",
  },

  correctSentenceMediaCard: {
    width: "88%",
    height: 150,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 12,
    backgroundColor: CORES.SURFACE_MUTED,
  },
  correctSentenceImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  correctSentencePromptPill: {
    width: "88%",
    minHeight: 36,
    borderRadius: 18,
    backgroundColor: CORES.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  correctSentencePromptText: {
    color: CORES.WHITE,
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },
  correctSentenceOptionsList: {
    width: "88%",
    gap: 8,
  },
  correctSentenceOptionWrap: {
    width: "100%",
  },
  correctSentenceOption: {
    width: "100%",
    minHeight: 34,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: CORES.PRIMARY,
    backgroundColor: CORES.WHITE,
  },
  correctSentenceOptionTouch: {
    flex: 1,
    minHeight: 34,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  correctSentenceOptionText: {
    fontSize: 14,
    color: CORES.PRIMARY,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  correctSentenceOptionCorrect: {
    backgroundColor: CORES.SUCCESS_BG,
    borderColor: CORES.SUCCESS,
  },
  correctSentenceOptionWrong: {
    borderColor: CORES.DANGER,
  },
  correctSentenceOptionTextCorrect: {
    color: CORES.SUCCESS_DARK,
    fontWeight: "700",
    textDecorationLine: "none",
  },
  slide5SuccessAlertCard: {
    marginHorizontal: 12,
    marginBottom: 0,
    zIndex: 200,
    elevation: 30,
  },
});

export default ex4;

/*

{
    component: Exercise4,
    activity: {
      prompt: "Corrija",
      image: require("../../../../assets/Cursos/bussines.jpg"),
      wrongSentence: "She take the bus.",
      options: ["She takes the bus.", "She take the bus."],
      correctAnswer: "She takes the bus.",
      successTitle: "Correto",
      successMessage: 'A forma correta e "She takes the bus."',
    },
  },

*/
