import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Easing,
  Image,
  Text,
  TouchableOpacity,
  Vibration,
  View,
  StyleSheet,
} from "react-native";
import { Audio } from "expo-audio";
import CORES from "../util/cores";
import { Images } from "../util/images";

export function Exercise16({ activity, styles, HeaderComponent, next }) {
  const bottomSafeSpace = 3;
  const recordingRef = useRef(null);
  const soundRef = useRef(null);
  const alertTranslateY = useRef(new Animated.Value(64)).current;
  const alertOpacity = useRef(new Animated.Value(0)).current;
  const blinkAnim = useRef(new Animated.Value(0)).current;

  const [audioUri, setAudioUri] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [result, setResult] = useState(null);

  const isCorrect = result === "correct";

  const wrongBackground = blinkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [CORES.WHITE, CORES.DANGER_LIGHT],
  });

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync().catch(() => {});
      }
    };
  }, []);

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

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão negada", "Permita o uso do microfone.");
        return;
      }

      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );
      await recording.startAsync();

      recordingRef.current = recording;
      setIsRecording(true);
      setIsPlaying(false);
      setResult(null);
    } catch (error) {
      console.warn("startRecording error", error);
      Alert.alert("Erro", "Não foi possível iniciar a gravação.");
    }
  };

  const stopRecording = async () => {
    try {
      if (!recordingRef.current) return;

      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();

      setAudioUri(uri);
      setIsRecording(false);
      recordingRef.current = null;
    } catch (error) {
      console.warn("stopRecording error", error);
      Alert.alert("Erro", "Não foi possível salvar a gravação.");
    }
  };

  const playRecording = async () => {
    try {
      if (!audioUri) return;

      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: true },
        (status) => {
          if (status.didJustFinish || !status.isLoaded) {
            setIsPlaying(false);
          } else {
            setIsPlaying(Boolean(status.isPlaying));
          }
        },
      );

      soundRef.current = sound;
      setIsPlaying(true);
    } catch (error) {
      console.warn("playRecording error", error);
      Alert.alert("Erro", "Não foi possível reproduzir o áudio.");
    }
  };

  const pauseRecording = async () => {
    try {
      if (!soundRef.current) return;
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    } catch (error) {
      console.warn("pauseRecording error", error);
    }
  };

  const resetRecording = async () => {
    if (soundRef.current) {
      await soundRef.current.unloadAsync().catch(() => {});
      soundRef.current = null;
    }

    setAudioUri(null);
    setIsPlaying(false);
    setIsRecording(false);
    setResult(null);
  };

  const handleSubmit = () => {
    if (!audioUri) {
      triggerWrongFeedback();
      return;
    }

    setResult("correct");
  };

  return (
    <View style={styles.slide}>
      <HeaderComponent />

      <Animated.View style={[styles.sendAudioBlock]}>
        <Text style={styles.sendAudioPrompt}>{activity.prompt}</Text>
        <Text style={styles.sendAudioInstruction}>{activity.instruction}</Text>
        <Text style={styles.sendAudioHelperText}>{activity.helperText}</Text>

        <Animated.View
          style={[
            styles.sendAudioContentCard,
            result === "wrong" && styles.sendAudioContentCardWrong,
            result === "wrong" && { backgroundColor: wrongBackground },
          ]}
        >
          <View style={styles.sendAudioAvatarWrap}>
            <Image source={activity.image} style={styles.sendAudioAvatar} />
          </View>

          <TouchableOpacity
            style={styles.sendAudioTipButton}
            onPress={() => setShowTip((current) => !current)}
          >
            <Text style={styles.sendAudioTipButtonText}>
              {activity.tipButtonLabel}
            </Text>
          </TouchableOpacity>

          {showTip && (
            <View style={styles.sendAudioTipCard}>
              <Text style={styles.sendAudioTipText}>{activity.tipText}</Text>
            </View>
          )}

          <View style={styles.sendAudioControls}>
            {!isRecording ? (
              <TouchableOpacity
                style={styles.sendAudioRecordButton}
                onPress={startRecording}
              >
                <Image
                  source={Images.microfone}
                  style={styles.sendAudioRecordImage}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.sendAudioStopButton}
                onPress={stopRecording}
              >
                <Text style={styles.sendAudioRecordIcon}>■</Text>
              </TouchableOpacity>
            )}

            <Text style={styles.sendAudioRecordLabel}>
              {isRecording ? activity.stopLabel : activity.recordLabel}
            </Text>
          </View>

          {audioUri && (
            <View style={styles.sendAudioActionsRow}>
              <TouchableOpacity
                style={styles.sendAudioActionButton}
                onPress={isPlaying ? pauseRecording : playRecording}
              >
                <Text style={styles.sendAudioActionButtonText}>
                  {isPlaying ? activity.pauseLabel : activity.playLabel}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.sendAudioActionButton}
                onPress={resetRecording}
              >
                <Text style={styles.sendAudioActionButtonText}>
                  {activity.rerecordLabel}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.sendAudioSubmitButton,
              !audioUri && styles.sendAudioSubmitButtonDisabled,
            ]}
            onPress={handleSubmit}
          >
            <Text style={styles.sendAudioSubmitButtonText}>
              {activity.submitLabel}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      {isCorrect && (
        <View style={styles.successAlertOverlay}>
          <Animated.View
            style={[
              styles.successAlertCard,
              styles.slide16SuccessAlertCard,
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

const ex16 = StyleSheet.create({
  sendAudioBlock: {
    width: "100%",
    alignItems: "center",
  },
  sendAudioPrompt: {
    width: "88%",
    textAlign: "left",
    fontSize: 22,
    color: "#7BA9D6",
    marginBottom: 6,
    fontWeight: "700",
  },
  sendAudioInstruction: {
    width: "88%",
    textAlign: "left",
    fontSize: 15,
    color: "#4F8A66",
    fontWeight: "700",
  },
  sendAudioHelperText: {
    width: "88%",
    textAlign: "left",
    fontSize: 14,
    color: "#5E7F6A",
    marginBottom: 18,
  },
  sendAudioAvatarWrap: {
    width: 78,
    height: 78,
    borderRadius: 39,
    overflow: "hidden",
    marginBottom: 14,
  },
  sendAudioAvatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  sendAudioContentCard: {
    width: "88%",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D6E6F7",
    backgroundColor: CORES.WHITE,
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 14,
  },
  sendAudioContentCardWrong: {
    borderColor: CORES.DANGER,
  },
  sendAudioTipButton: {
    minWidth: 102,
    minHeight: 34,
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: "#7BA9D6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    paddingHorizontal: 14,
  },
  sendAudioTipButtonText: {
    color: "#7BA9D6",
    fontSize: 14,
  },
  sendAudioTipCard: {
    width: "88%",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D6E6F7",
    backgroundColor: CORES.WHITE,
    padding: 12,
    marginBottom: 16,
  },
  sendAudioTipText: {
    color: CORES.TEXT_DARK,
    fontSize: 14,
    textAlign: "left",
  },
  sendAudioControls: {
    alignItems: "center",
    marginBottom: 14,
  },
  sendAudioRecordButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#7BA9D6",
    alignItems: "center",
    justifyContent: "center",
  },
  sendAudioStopButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: CORES.DANGER,
    alignItems: "center",
    justifyContent: "center",
  },
  sendAudioRecordIcon: {
    color: CORES.WHITE,
    fontSize: 24,
    fontWeight: "700",
  },
  sendAudioRecordImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  sendAudioRecordLabel: {
    color: "#7BA9D6",
    fontSize: 16,
    marginTop: 8,
  },
  sendAudioActionsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 14,
  },
  sendAudioActionButton: {
    minWidth: 96,
    minHeight: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#7BA9D6",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  sendAudioActionButtonText: {
    color: "#7BA9D6",
    fontSize: 14,
  },
  sendAudioSubmitButton: {
    minWidth: 132,
    minHeight: 42,
    borderRadius: 21,
    backgroundColor: CORES.SECONDARY,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  sendAudioSubmitButtonDisabled: {
    backgroundColor: "#B6C8DB",
  },
  sendAudioSubmitButtonText: {
    color: CORES.WHITE,
    fontSize: 15,
    fontWeight: "700",
  },
  slide16SuccessAlertCard: {
    marginHorizontal: 12,
    marginBottom: 0,
    zIndex: 200,
    elevation: 30,
  },
});

export default ex16;
