import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import CORES from "../util/cores";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function shuffleArray(items) {
  const nextItems = [...items];

  for (let index = nextItems.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [nextItems[index], nextItems[randomIndex]] = [
      nextItems[randomIndex],
      nextItems[index],
    ];
  }

  return nextItems;
}

function formatRemainingTime(ms) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0",
  )}:${String(seconds).padStart(2, "0")}`;
}

export function Exercise10({ activity, styles, HeaderComponent, next }) {
  const bottomSafeSpace = 3;
  const alertTranslateY = useRef(new Animated.Value(64)).current;
  const alertOpacity = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const blinkAnim = useRef(new Animated.Value(0)).current;

  const questions = useMemo(
    () =>
      (activity.questions || []).slice(0, 10).map((question) => ({
        ...question,
        options: shuffleArray(question.options || []),
      })),
    [activity.questions],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [result, setResult] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [lockUntil, setLockUntil] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);

  const currentQuestion = questions[currentIndex];
  const isCorrect = result === "correct";
  const isWrong = result === "wrong";
  const isLocked = Boolean(lockUntil && lockUntil > Date.now());

  const shakeTranslateX = shakeAnim.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, -8, 8, -8, 0],
  });

  const wrongBackground = blinkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [CORES.WHITE, CORES.DANGER_LIGHT],
  });

  useEffect(() => {
    let isMounted = true;

    async function loadLock() {
      if (!activity.lockStorageKey) return;

      const raw = await AsyncStorage.getItem(activity.lockStorageKey);
      const storedLockUntil = raw ? Number(raw) : null;

      if (!isMounted) return;

      if (storedLockUntil && storedLockUntil > Date.now()) {
        setLockUntil(storedLockUntil);
        setRemainingTime(storedLockUntil - Date.now());
        return;
      }

      if (storedLockUntil) {
        await AsyncStorage.removeItem(activity.lockStorageKey);
      }
    }

    loadLock();

    return () => {
      isMounted = false;
    };
  }, [activity.lockStorageKey]);

  useEffect(() => {
    if (!isLocked) {
      setRemainingTime(null);
      return;
    }

    const timer = setInterval(async () => {
      const diff = lockUntil - Date.now();

      if (diff <= 0) {
        clearInterval(timer);
        setLockUntil(null);
        setRemainingTime(null);
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setResult(null);
        setIsFinished(false);

        if (activity.lockStorageKey) {
          await AsyncStorage.removeItem(activity.lockStorageKey);
        }

        return;
      }

      setRemainingTime(diff);
    }, 1000);

    return () => clearInterval(timer);
  }, [activity.lockStorageKey, isLocked, lockUntil]);

  useEffect(() => {
    if (isFinished) {
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
  }, [alertOpacity, alertTranslateY, isFinished]);

  const triggerWrongFeedback = async () => {
    const nextLockUntil = Date.now() + ONE_DAY_MS;

    setResult("wrong");
    setLockUntil(nextLockUntil);
    setRemainingTime(nextLockUntil - Date.now());

    Vibration.vibrate(180);
    shakeAnim.setValue(0);
    blinkAnim.setValue(0);

    if (activity.lockStorageKey) {
      await AsyncStorage.setItem(
        activity.lockStorageKey,
        String(nextLockUntil),
      );
    }

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
      blinkAnim.setValue(0);
    });
  };

  const resetLockManually = async () => {
    if (activity.lockStorageKey) {
      await AsyncStorage.removeItem(activity.lockStorageKey);
    }

    setLockUntil(null);
    setRemainingTime(null);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setResult(null);
    setIsFinished(false);
  };

  const advanceQuestion = () => {
    const nextIndex = currentIndex + 1;

    if (nextIndex >= questions.length) {
      setIsFinished(true);
      return;
    }

    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setSelectedAnswer(null);
      setResult(null);
    }, 650);
  };

  const handleSelect = async (option) => {
    if (!currentQuestion || isLocked || isFinished || isCorrect) return;

    setSelectedAnswer(option);

    if (option === currentQuestion.correctAnswer) {
      setResult("correct");
      Vibration.vibrate(40);
      advanceQuestion();
      return;
    }

    await triggerWrongFeedback();
  };

  return (
    <View style={styles.slide}>
      <HeaderComponent />

      <View style={styles.chatQuizBlock}>
        <Text style={styles.fastTypePrompt}>{activity.prompt}</Text>

        <View style={styles.chatQuizCard}>
          <Text style={styles.chatQuizTitle}>{activity.title}</Text>

          {currentQuestion ? (
            <>
              <View style={styles.chatQuizMessageRow}>
                <Image
                  source={currentQuestion.image}
                  style={styles.chatQuizAvatar}
                />
                <View style={styles.chatQuizQuestionBubble}>
                  <Text style={styles.chatQuizQuestionText}>
                    {currentQuestion.question}
                  </Text>
                </View>
              </View>

              <Animated.View
                style={[
                  styles.chatQuizAnswerRow,
                  isWrong && { transform: [{ translateX: shakeTranslateX }] },
                ]}
              >
                <Animated.View
                  style={[
                    styles.chatQuizAnswerBubble,
                    styles.chatQuizAnswerBubblePending,
                    isCorrect && styles.chatQuizAnswerBubbleCorrect,
                    isWrong && styles.chatQuizAnswerBubbleWrong,
                    isWrong && { backgroundColor: wrongBackground },
                  ]}
                >
                  {selectedAnswer ? (
                    <Text
                      style={[
                        styles.chatQuizAnswerText,
                        isCorrect && styles.chatQuizAnswerTextCorrect,
                      ]}
                    >
                      {selectedAnswer}
                    </Text>
                  ) : null}
                </Animated.View>
                <Image
                  source={activity.userImage}
                  style={styles.chatQuizAvatar}
                />
              </Animated.View>

              <View style={styles.chatQuizOptionsWrap}>
                {currentQuestion.options.map((option) => {
                  const isSelected = selectedAnswer === option;
                  const showAsCorrect = isSelected && isCorrect;
                  const showAsWrong = isSelected && isWrong;

                  return (
                    <TouchableOpacity
                      key={`${currentQuestion.question}-${option}`}
                      style={[
                        styles.chatQuizOptionButton,
                        showAsCorrect && styles.chatQuizOptionButtonCorrect,
                        showAsWrong && styles.chatQuizOptionButtonWrong,
                      ]}
                      activeOpacity={0.9}
                      onPress={() => handleSelect(option)}
                      disabled={
                        isLocked || isFinished || Boolean(selectedAnswer)
                      }
                    >
                      <Text
                        style={[
                          styles.chatQuizOptionText,
                          showAsCorrect && styles.chatQuizOptionTextCorrect,
                        ]}
                      >
                        {option}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <Text style={styles.chatQuizProgressText}>
                Pergunta {Math.min(currentIndex + 1, questions.length)} de{" "}
                {questions.length}
              </Text>
            </>
          ) : null}
        </View>

        {isLocked ? (
          <View style={[styles.feedbackBox, styles.chatQuizLockBox]}>
            <Text style={styles.chatQuizLockTitle}>Tentativa bloqueada</Text>
            <Text style={styles.feedbackTextBlack}>
              Você errou uma resposta. Tente novamente em{" "}
              {formatRemainingTime(remainingTime || 0)}.
            </Text>
            <TouchableOpacity
              style={styles.chatQuizResetButton}
              onPress={resetLockManually}
              activeOpacity={0.9}
            >
              <Text style={styles.chatQuizResetButtonText}>Resetar timer</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>

      {isFinished && (
        <View style={styles.successAlertOverlay}>
          <Animated.View
            style={[
              styles.successAlertCard,
              styles.resultAlertCard,
              styles.resultAlertCardCorrect,
              styles.chatQuizSuccessAlertCard,
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
              <Text style={styles.alertContinueButtonText}>
                Próxima Atividade
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </View>
  );
}

const ex10 = StyleSheet.create({
  chatQuizBlock: {
    width: "100%",
    alignItems: "center",
  },
  chatQuizCard: {
    width: "88%",
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#7BA9D6",
    backgroundColor: CORES.WHITE,
    paddingHorizontal: 14,
    paddingVertical: 16,
    minHeight: 360,
  },
  chatQuizTitle: {
    color: "#7BA9D6",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 14,
    textAlign: "center",
  },
  chatQuizMessageRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 12,
  },
  chatQuizAnswerRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    gap: 8,
    marginBottom: 18,
    minHeight: 48,
  },
  chatQuizAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  chatQuizQuestionBubble: {
    maxWidth: "78%",
    backgroundColor: "#EAF4FF",
    borderRadius: 16,
    borderTopLeftRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#C6E1FF",
  },
  chatQuizQuestionText: {
    color: "#3172A5",
    fontSize: 14,
    fontWeight: "600",
  },
  chatQuizAnswerBubble: {
    maxWidth: "76%",
    backgroundColor: "#DFF1FF",
    borderRadius: 16,
    borderTopRightRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#8CC5F0",
  },
  chatQuizAnswerBubblePending: {
    minWidth: 116,
    minHeight: 38,
    justifyContent: "center",
    backgroundColor: CORES.WHITE,
    borderColor: "#B9D9F2",
  },
  chatQuizAnswerBubbleCorrect: {
    backgroundColor: CORES.SUCCESS_BG,
    borderColor: CORES.SUCCESS,
  },
  chatQuizAnswerBubbleWrong: {
    borderColor: CORES.DANGER,
  },
  chatQuizAnswerText: {
    color: "#2A7DBD",
    fontSize: 14,
    fontWeight: "700",
  },
  chatQuizAnswerTextCorrect: {
    color: CORES.SUCCESS_TEXT,
  },
  chatQuizOptionsWrap: {
    width: "100%",
    gap: 10,
  },
  chatQuizOptionButton: {
    width: "100%",
    minHeight: 36,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#7BA9D6",
    backgroundColor: "#F7FBFF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 7,
  },
  chatQuizOptionButtonCorrect: {
    backgroundColor: CORES.SUCCESS_BG,
    borderColor: CORES.SUCCESS,
  },
  chatQuizOptionButtonWrong: {
    borderColor: CORES.DANGER,
  },
  chatQuizOptionText: {
    color: "#3172A5",
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
  },
  chatQuizOptionTextCorrect: {
    color: CORES.SUCCESS_TEXT,
  },
  chatQuizProgressText: {
    marginTop: 14,
    textAlign: "center",
    color: "#7BA9D6",
    fontSize: 13,
    fontWeight: "700",
  },
  chatQuizLockBox: {
    width: "88%",
    marginTop: 16,
    borderColor: CORES.DANGER,
    backgroundColor: CORES.DANGER_LIGHT,
  },
  chatQuizLockTitle: {
    color: CORES.DANGER,
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4,
  },
  chatQuizSuccessAlertCard: {
    paddingBottom: 18,
  },
  chatQuizResetButton: {
    marginTop: 12,
    alignSelf: "flex-start",
    minHeight: 36,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: CORES.DANGER,
    backgroundColor: CORES.WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
  chatQuizResetButtonText: {
    color: CORES.DANGER,
    fontSize: 13,
    fontWeight: "800",
  },
});

export default ex10;

/*

{
    component: Exercise10,
    activity: {
      prompt: "Responda as questões",
      title: "Conversa",
      userImage: BussinesImages.menina2,
      lockStorageKey: "@ic01_exercise10_lock_until",
      questions: [
        {
          image: BussinesImages.secretaria,
          question: "Hello! How are you?",
          options: ["I'm fine, and you?", "Good night!", "See you tomorrow!"],
          correctAnswer: "I'm fine, and you?",
        },
        {
          image: BussinesImages.menino,
          question: "What's your name?",
          options: [
            "My name is Ana.",
            "I am from Brazil.",
            "I am 25 years old.",
          ],
          correctAnswer: "My name is Ana.",
        },
        {
          image: BussinesImages.menina,
          question: "Where are you from?",
          options: ["I am from Brazil.", "I am a teacher.", "I am fine."],
          correctAnswer: "I am from Brazil.",
        },
        {
          image: BussinesImages.secretario,
          question: "Nice to meet you.",
          options: [
            "Nice to meet you too.",
            "How old are you?",
            "See you at home.",
          ],
          correctAnswer: "Nice to meet you too.",
        },
        {
          image: BussinesImages.menino2,
          question: "How old are you?",
          options: [
            "I am 25 years old.",
            "I am from Mexico.",
            "My name is Leo.",
          ],
          correctAnswer: "I am 25 years old.",
        },
        {
          image: BussinesImages.menina,
          question: "Are you a student?",
          options: ["Yes, I am.", "No, she isn't.", "Good afternoon."],
          correctAnswer: "Yes, I am.",
        },
        {
          image: BussinesImages.secretaria,
          question: "What do you do?",
          options: ["I work in a bank.", "I live in Canada.", "I am 20."],
          correctAnswer: "I work in a bank.",
        },
        {
          image: BussinesImages.menino,
          question: "Do you speak English?",
          options: ["Yes, a little.", "I am in class.", "My name is Bob."],
          correctAnswer: "Yes, a little.",
        },
        {
          image: BussinesImages.menina2,
          question: "See you later!",
          options: ["See you!", "How are you?", "I am from Spain."],
          correctAnswer: "See you!",
        },
        {
          image: BussinesImages.secretario,
          question: "Have a nice day!",
          options: [
            "Thanks, you too!",
            "My name is Carol.",
            "I am 18 years old.",
          ],
          correctAnswer: "Thanks, you too!",
        },
      ],
      successTitle: "Correto",
      successMessage: "Você acertou todas as 10 respostas da conversa.",
    },
  },

*/
