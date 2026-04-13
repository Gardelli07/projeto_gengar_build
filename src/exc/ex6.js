import React, { useEffect, useMemo, useRef, useState } from "react";
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
import { createAudioPlayer } from "expo-audio";
import CORES from "../util/cores";

export function Exercise6({
  activity,
  styles,
  HeaderComponent,
  next,
  speak,
  onAttempt,
}) {
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

  const shuffledOptions = useMemo(
    () => shuffleArray(activity.words),
    [activity.words],
  );

  const audioProgressAnim = useRef(new Animated.Value(0)).current;
  const alertTranslateY = useRef(new Animated.Value(64)).current;
  const alertOpacity = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const blinkAnim = useRef(new Animated.Value(0)).current;
  const playerRef = useRef(null);
  const playbackSubscriptionRef = useRef(null);

  const [selectedWords, setSelectedWords] = useState([]);
  const [result, setResult] = useState(null);
  const audioPromptText =
    activity.audioText ||
    activity.spokenText ||
    (activity.correctOrder || []).join(" ");
  const audioRate = activity.audioRate || 0.85;

  const estimatedDurationMs =
    activity.audioDurationMs ||
    Math.max(
      1200,
      Math.round(((audioPromptText.length / 5) * 60000) / 140 / audioRate),
    );

  const isCorrect = result === "correct";
  const isWrong = result === "wrong";
  const wrongMessage = activity.feedbackMessage || activity.successMessage;

  const shakeTranslateX = shakeAnim.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, -8, 8, -8, 0],
  });

  const wrongBackground = blinkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [CORES.WHITE, CORES.DANGER_LIGHT],
  });

  const clearPlayback = () => {
    if (playbackSubscriptionRef.current) {
      playbackSubscriptionRef.current.remove();
      playbackSubscriptionRef.current = null;
    }

    if (playerRef.current) {
      playerRef.current.remove();
      playerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      clearPlayback();
      audioProgressAnim.stopAnimation();
    };
  }, [audioProgressAnim]);

  useEffect(() => {
    if (isCorrect || isWrong) {
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
  }, [isCorrect, isWrong, alertOpacity, alertTranslateY]);

  const playAudio = async () => {
    audioProgressAnim.stopAnimation();
    audioProgressAnim.setValue(0);
    Animated.timing(audioProgressAnim, {
      toValue: 1,
      duration: estimatedDurationMs,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    if (activity.audioSource) {
      try {
        clearPlayback();

        const player = createAudioPlayer(activity.audioSource);
        playbackSubscriptionRef.current = player.addListener(
          "playbackStatusUpdate",
          (status) => {
            if (status.didJustFinish) {
              audioProgressAnim.stopAnimation();
              audioProgressAnim.setValue(1);
              clearPlayback();
            }
          },
        );

        playerRef.current = player;
        player.play();
        return;
      } catch (error) {
        console.warn("Exercise6 playAudio error", error);
        audioProgressAnim.stopAnimation();
        audioProgressAnim.setValue(0);
      }
    }

    clearPlayback();
    audioProgressAnim.stopAnimation();
    audioProgressAnim.setValue(0);
    Animated.timing(audioProgressAnim, {
      toValue: 1,
      duration: estimatedDurationMs,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    speak?.({
      text: audioPromptText,
      language: activity.audioLanguage || "en-US",
      rate: audioRate,
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
    ]).start();
  };

  const handleWordPress = (word) => {
    if (isCorrect || isWrong || selectedWords.includes(word)) return;

    const nextWords = [...selectedWords, word];
    setSelectedWords(nextWords);

    if (nextWords.length === activity.correctOrder.length) {
      const isAnswerCorrect = nextWords.every(
        (selectedWord, index) => selectedWord === activity.correctOrder[index],
      );

      if (isAnswerCorrect) {
        onAttempt?.({ isCorrect: true });
        setResult("correct");
        return;
      }

      onAttempt?.({ isCorrect: false });
      triggerWrongFeedback();
    }
  };

  const handleSelectedWordPress = (word) => {
    if (isCorrect || isWrong) return;
    setSelectedWords((current) => current.filter((item) => item !== word));
  };

  return (
    <View style={styles.slide}>
      <HeaderComponent />

      <View style={styles.orderSentenceBlock}>
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

        <Animated.View
          style={[
            styles.orderSentenceAnswerBox,
            isCorrect && styles.orderSentenceAnswerBoxCorrect,
            isWrong && styles.orderSentenceAnswerBoxWrong,
            isWrong && { backgroundColor: wrongBackground },
            isWrong && { transform: [{ translateX: shakeTranslateX }] },
          ]}
        >
          {selectedWords.length === 0 ? (
            <Text style={styles.orderSentencePlaceholder}>_____</Text>
          ) : (
            selectedWords.map((word) => (
              <TouchableOpacity
                key={`selected-${word}`}
                style={[
                  styles.orderSentenceSelectedWord,
                  isCorrect && styles.orderSentenceSelectedWordCorrect,
                ]}
                onPress={() => handleSelectedWordPress(word)}
                disabled={isCorrect || isWrong}
              >
                <Text
                  style={[
                    styles.orderSentenceSelectedWordText,
                    isCorrect && styles.orderSentenceSelectedWordTextCorrect,
                  ]}
                >
                  {word}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </Animated.View>

        <View style={styles.orderSentenceOptionsRow}>
          {shuffledOptions.map((word) => {
            const used = selectedWords.includes(word);

            return (
              <TouchableOpacity
                key={word}
                style={[
                  styles.orderSentenceOption,
                  used && styles.orderSentenceOptionUsed,
                ]}
                onPress={() => handleWordPress(word)}
                disabled={used || isCorrect || isWrong}
              >
                <Text
                  style={[
                    styles.orderSentenceOptionText,
                    used && styles.orderSentenceOptionTextUsed,
                  ]}
                >
                  {word}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {(isCorrect || isWrong) && (
        <View style={styles.successAlertOverlay}>
          <Animated.View
            style={[
              styles.successAlertCard,
              styles.resultAlertCard,
              isCorrect
                ? styles.resultAlertCardCorrect
                : styles.resultAlertCardWrong,
              styles.slide7SuccessAlertCard,
              { paddingBottom: bottomSafeSpace + 1 },
              {
                opacity: alertOpacity,
                transform: [{ translateY: alertTranslateY }],
              },
            ]}
          >
            <View style={styles.successHeaderRow}>
              <View
                style={[
                  styles.successIconWrap,
                  isWrong && styles.resultAlertIconWrapWrong,
                ]}
              >
                <Text
                  style={[
                    styles.successIcon,
                    isWrong && styles.resultAlertIconWrong,
                  ]}
                >
                  {isWrong ? "X" : "✓"}
                </Text>
              </View>
              <Text
                style={[
                  styles.successAlertTitle,
                  isWrong && styles.resultAlertTitleWrong,
                ]}
              >
                {isWrong ? activity.errorTitle || "Incorreto" : activity.successTitle}
              </Text>
            </View>

            <View
              style={[
                styles.feedbackBox,
                isWrong ? styles.feedbackBoxWrong : styles.feedbackBoxCorrect,
                styles.alertFeedbackBox,
              ]}
            >
              <Text
                style={[
                  styles.feedbackTitle,
                  isWrong ? styles.feedbackTitleWrong : styles.feedbackTitleCorrect,
                ]}
              >
                {isWrong ? "X Tente novamente" : "✓ Muito bem!"}
              </Text>
              <Text style={styles.feedbackTextBlack}>
                {isWrong ? wrongMessage : activity.successMessage}
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.alertContinueButton,
                isWrong && styles.resultAlertButtonWrong,
              ]}
              onPress={next}
            >
              <Text style={styles.alertContinueButtonText}>Próxima atividade</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </View>
  );
}

const ex6 = StyleSheet.create({
  orderSentenceBlock: {
    width: "100%",
    alignItems: "center",
  },
  orderSentenceAnswerBox: {
    width: "88%",
    minHeight: 54,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: CORES.PRIMARY,
    backgroundColor: CORES.WHITE,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 6,
    marginBottom: 14,
  },
  orderSentenceAnswerBoxCorrect: {
    backgroundColor: CORES.SUCCESS_BG,
    borderColor: CORES.SUCCESS,
  },
  orderSentenceAnswerBoxWrong: {
    borderColor: CORES.DANGER,
  },
  orderSentencePlaceholder: {
    color: CORES.PRIMARY,
    fontSize: 14,
  },
  orderSentenceSelectedWord: {
    minHeight: 26,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: CORES.PRIMARY,
    backgroundColor: CORES.WHITE,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  orderSentenceSelectedWordCorrect: {
    backgroundColor: CORES.SUCCESS_BG,
    borderColor: CORES.SUCCESS,
  },
  orderSentenceSelectedWordText: {
    color: CORES.PRIMARY,
    fontSize: 13,
  },
  orderSentenceSelectedWordTextCorrect: {
    color: CORES.SUCCESS_DARK,
    fontWeight: "700",
  },
  orderSentenceOptionsRow: {
    width: "88%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },
  orderSentenceOption: {
    minHeight: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: CORES.PRIMARY,
    backgroundColor: CORES.BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  orderSentenceOptionUsed: {
    backgroundColor: CORES.SURFACE_MUTED,
    borderColor: CORES.BORDER_LIGHT,
  },
  orderSentenceOptionText: {
    color: CORES.PRIMARY,
    fontSize: 13,
    textDecorationLine: "underline",
  },
  orderSentenceOptionTextUsed: {
    color: "#93C5FD",
    textDecorationLine: "none",
  },
  slide7SuccessAlertCard: {
    marginHorizontal: 12,
    marginBottom: 0,
    zIndex: 200,
    elevation: 30,
  },
});

export default ex6;
