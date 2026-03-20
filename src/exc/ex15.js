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

export function Exercise15({ activity, styles, HeaderComponent, next }) {
  const bottomSafeSpace = 3;
  const alertTranslateY = useRef(new Animated.Value(64)).current;
  const alertOpacity = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const blinkAnim = useRef(new Animated.Value(0)).current;

  const [selectedImageId, setSelectedImageId] = useState(null);
  const [selectedWordId, setSelectedWordId] = useState(null);
  const [matchedImageIds, setMatchedImageIds] = useState([]);
  const [matchedWordIds, setMatchedWordIds] = useState([]);
  const [result, setResult] = useState(null);

  const allMatched = matchedImageIds.length === activity.pairs.length;
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
    if (!selectedImageId || !selectedWordId || allMatched) return;

    const matchedPair = activity.pairs.find(
      (pair) =>
        pair.imageId === selectedImageId && pair.wordId === selectedWordId,
    );

    if (matchedPair) {
      setMatchedImageIds((current) => [...current, matchedPair.imageId]);
      setMatchedWordIds((current) => [...current, matchedPair.wordId]);
      setSelectedImageId(null);
      setSelectedWordId(null);
      setResult(null);
      return;
    }

    triggerWrongFeedback();
  }, [selectedImageId, selectedWordId]);

  useEffect(() => {
    if (allMatched) {
      setResult("correct");
    }
  }, [allMatched]);

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
      setSelectedImageId(null);
      setSelectedWordId(null);
      setResult(null);
      blinkAnim.setValue(0);
    });
  };

  return (
    <View style={styles.slide}>
      <HeaderComponent />

      <Animated.View
        style={[
          styles.matchMediaWordBlock,
          result === "wrong" && {
            transform: [{ translateX: shakeTranslateX }],
          },
        ]}
      >
        <Text style={styles.fastTypePrompt}>{activity.prompt}</Text>

        <View style={styles.matchMediaWordImagesRow}>
          {activity.images.map((imageOption) => {
            const isSelected = selectedImageId === imageOption.id;
            const isMatched = matchedImageIds.includes(imageOption.id);
            const showWrong = result === "wrong" && isSelected;

            return (
              <Animated.View
                key={imageOption.id}
                style={[
                  styles.matchMediaWordImageCard,
                  isSelected && styles.matchMediaWordImageCardSelected,
                  isMatched && styles.matchMediaWordImageCardCorrect,
                  showWrong && styles.matchMediaWordImageCardWrong,
                  showWrong && { backgroundColor: wrongBackground },
                ]}
              >
                <TouchableOpacity
                  style={styles.matchMediaWordImageTouch}
                  onPress={() => setSelectedImageId(imageOption.id)}
                  disabled={isMatched || isCorrect}
                  activeOpacity={0.9}
                >
                  <Image
                    source={imageOption.image}
                    style={styles.matchMediaWordImage}
                  />
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        <View style={styles.matchMediaWordOptionsRow}>
          {activity.words.map((wordOption) => {
            const isSelected = selectedWordId === wordOption.id;
            const isMatched = matchedWordIds.includes(wordOption.id);
            const showWrong = result === "wrong" && isSelected;

            return (
              <Animated.View
                key={wordOption.id}
                style={[
                  styles.matchMediaWordOptionWrap,
                  showWrong && { backgroundColor: wrongBackground },
                ]}
              >
                <Animated.View
                  style={[
                    styles.matchMediaWordOption,
                    isSelected && styles.matchMediaWordOptionSelected,
                    isMatched && styles.matchMediaWordOptionCorrect,
                    showWrong && styles.matchMediaWordOptionWrong,
                  ]}
                >
                  <TouchableOpacity
                    style={styles.matchMediaWordOptionTouch}
                    onPress={() => setSelectedWordId(wordOption.id)}
                    disabled={isMatched || isCorrect}
                    activeOpacity={0.9}
                  >
                    <Text
                      style={[
                        styles.matchMediaWordOptionText,
                        isMatched && styles.matchMediaWordOptionTextCorrect,
                      ]}
                    >
                      {wordOption.label}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              </Animated.View>
            );
          })}
        </View>
      </Animated.View>

      {isCorrect && (
        <View style={styles.successAlertOverlay}>
          <Animated.View
            style={[
              styles.successAlertCard,
              styles.slide15SuccessAlertCard,
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

const ex15 = StyleSheet.create({
  matchMediaWordBlock: {
    width: "100%",
    alignItems: "center",
  },
  matchMediaWordSubtitle: {
    width: "88%",
    textAlign: "center",
    fontSize: 13,
    color: "#7BA9D6",
    marginBottom: 16,
    fontWeight: "700",
  },
  matchMediaWordImagesRow: {
    width: "88%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  matchMediaWordImageCard: {
    width: "48%",
    height: 100,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#D6E6F7",
    backgroundColor: CORES.WHITE,
    overflow: "hidden",
  },
  matchMediaWordImageCardSelected: {
    borderColor: "#7BA9D6",
  },
  matchMediaWordImageCardCorrect: {
    borderColor: CORES.SUCCESS,
    backgroundColor: CORES.SUCCESS_BG,
  },
  matchMediaWordImageCardWrong: {
    borderColor: CORES.DANGER,
  },
  matchMediaWordImageTouch: {
    flex: 1,
  },
  matchMediaWordImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  matchMediaWordOptionsRow: {
    width: "88%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  matchMediaWordOptionWrap: {
    borderRadius: 18,
  },
  matchMediaWordOption: {
    minWidth: 92,
    minHeight: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#D6E6F7",
    backgroundColor: CORES.WHITE,
  },
  matchMediaWordOptionSelected: {
    borderColor: "#7BA9D6",
  },
  matchMediaWordOptionCorrect: {
    backgroundColor: CORES.SUCCESS_BG,
    borderColor: CORES.SUCCESS,
  },
  matchMediaWordOptionWrong: {
    borderColor: CORES.DANGER,
  },
  matchMediaWordOptionTouch: {
    flex: 1,
    minHeight: 38,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  matchMediaWordOptionText: {
    color: CORES.TEXT_DARK,
    fontSize: 14,
    textAlign: "center",
  },
  matchMediaWordOptionTextCorrect: {
    color: CORES.SUCCESS_DARK,
    fontWeight: "700",
  },
  slide15SuccessAlertCard: {
    marginHorizontal: 12,
    marginBottom: 0,
    zIndex: 200,
    elevation: 30,
  },
});

export default ex15;
