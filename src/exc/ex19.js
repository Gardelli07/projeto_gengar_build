import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import { createAudioPlayer } from "expo-audio";
import CORES from "../util/cores";

const normalizeText = (value) =>
  String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();

export function Exercise19({
  activity,
  styles,
  HeaderComponent,
  next,
  onAttempt,
  speak,
}) {
  const bottomSafeSpace = 3;
  const audioProgressAnim = useRef(new Animated.Value(0)).current;
  const alertTranslateY = useRef(new Animated.Value(64)).current;
  const alertOpacity = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const blinkAnim = useRef(new Animated.Value(0)).current;
  const playerRef = useRef(null);
  const playbackSubscriptionRef = useRef(null);

  const [typedText, setTypedText] = useState("");
  const [result, setResult] = useState(null);

  const audioPromptText =
    activity.audioText || activity.spokenText || activity.correctAnswer || "";
  const audioRate = activity.audioRate || 0.85;
  const estimatedDurationMs =
    activity.audioDurationMs ||
    Math.max(
      900,
      Math.round(((audioPromptText.length / 5) * 60000) / 140 / audioRate),
    );

  const isCorrect = result === "correct";
  const isWrong = result === "wrong";

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
        console.warn("Exercise19 playAudio error", error);
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

  const handleSubmit = () => {
    const typed = normalizeText(typedText);
    const expected = normalizeText(activity.correctAnswer || audioPromptText);

    if (!typed || typed !== expected) {
      onAttempt?.({ isCorrect: false });
      triggerWrongFeedback();
      return;
    }

    onAttempt?.({ isCorrect: true });
    setResult("correct");
  };

  return (
    <View style={styles.slide}>
      <HeaderComponent />

      <View style={styles.writeAudioBlock}>
        <Text style={styles.writeAudioPrompt}>{activity.prompt}</Text>

        <TouchableOpacity style={styles.writeAudioPlayer} onPress={playAudio}>
          <Text style={styles.writeAudioPlayIcon}>▶</Text>
          <View style={styles.writeAudioBar}>
            <Animated.View
              style={[
                styles.writeAudioProgress,
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

        <Animated.View
          style={[
            styles.writeAudioInputWrap,
            isWrong && styles.writeAudioInputWrapWrong,
            isCorrect && styles.writeAudioInputWrapCorrect,
            isWrong && { backgroundColor: wrongBackground },
            isWrong && { transform: [{ translateX: shakeTranslateX }] },
          ]}
        >
          <TextInput
            value={typedText}
            onChangeText={(value) => {
              setTypedText(value);
              if (result) setResult(null);
            }}
            style={styles.writeAudioInput}
            placeholder={activity.placeholder}
            placeholderTextColor="#8BB7E0"
            autoCapitalize="sentences"
            autoCorrect={false}
          />
        </Animated.View>

        <TouchableOpacity
          style={[
            styles.writeAudioSubmitButton,
            !typedText.trim() && styles.writeAudioSubmitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!typedText.trim() || isCorrect || isWrong}
        >
          <Text style={styles.writeAudioSubmitButtonText}>
            {activity.submitLabel}
          </Text>
        </TouchableOpacity>
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
                {isWrong
                  ? activity.errorTitle || "Incorreto"
                  : activity.successTitle}
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
                  isWrong
                    ? styles.feedbackTitleWrong
                    : styles.feedbackTitleCorrect,
                ]}
              >
                {isWrong ? "X Tente novamente" : "✓ Muito bem!"}
              </Text>
              <Text style={styles.feedbackTextBlack}>
                {isWrong
                  ? activity.errorMessage || activity.successMessage
                  : activity.successMessage}
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.alertContinueButton,
                isWrong && styles.resultAlertButtonWrong,
              ]}
              onPress={next}
            >
              <Text style={styles.alertContinueButtonText}>
                {isWrong
                  ? activity.wrongButtonLabel || "Próxima Atividade"
                  : activity.nextButtonLabel || "Próxima Atividade"}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </View>
  );
}

const ex19 = StyleSheet.create({
  writeAudioBlock: {
    width: "100%",
    alignItems: "center",
  },
  writeAudioPrompt: {
    width: "88%",
    color: "#78A2CC",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 18,
  },
  writeAudioPlayer: {
    width: "88%",
    height: 40,
    backgroundColor: "#78A2CC",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 28,
  },
  writeAudioPlayIcon: {
    color: CORES.WHITE_SHORT,
    fontSize: 18,
    fontWeight: "700",
  },
  writeAudioBar: {
    flex: 1,
    height: 6,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 3,
    overflow: "hidden",
  },
  writeAudioProgress: {
    height: "100%",
    backgroundColor: CORES.WHITE_SHORT,
    borderRadius: 3,
  },
  writeAudioInputWrap: {
    width: "58%",
    borderBottomWidth: 1,
    borderBottomColor: "#78A2CC",
    marginBottom: 20,
  },
  writeAudioInputWrapWrong: {
    borderBottomColor: CORES.DANGER,
  },
  writeAudioInputWrapCorrect: {
    borderBottomColor: CORES.SUCCESS,
  },
  writeAudioInput: {
    minHeight: 34,
    color: CORES.PRIMARY,
    fontSize: 13,
    textAlign: "center",
    paddingVertical: 3,
    textDecorationLine: "underline",
    fontFamily: "serif",
  },
  writeAudioSubmitButton: {
    minWidth: 152,
    height: 44,
    borderRadius: 8,
    backgroundColor: CORES.SECONDARY,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  writeAudioSubmitButtonDisabled: {
    backgroundColor: "#B6C8DB",
  },
  writeAudioSubmitButtonText: {
    color: CORES.WHITE_SHORT,
    fontSize: 15,
    fontWeight: "700",
  },
});

export default ex19;

/*

  {
    component: Exercise19,
    needsSpeech: true,
    activity: {
      prompt: "Escreva a frase do áudio.",
      audioText: "I am working now.",
      correctAnswer: "I am working now.",
      placeholder: "I am working now.",
      submitLabel: "Responder",
      successTitle: "Correto",
      successMessage: "Você escreveu a frase do áudio corretamente.",
      errorMessage: "Ouça o áudio novamente e confira a frase.",
    },
  },

*/
