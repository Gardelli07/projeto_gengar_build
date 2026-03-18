import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Speech from "expo-speech";
import CORES from "../../../util/cores";
import { Images } from "../../../util/images";

const SlideNavContext = React.createContext(null);

const SLIDE_COUNT = 8;
const STORAGE_KEY = "@progesso_ingles_completo";

function useSpeech() {
  const speak = ({ text, stopBefore = true, ...speechOptions }) => {
    if (!text) return;
    if (stopBefore) Speech.stop();
    Speech.speak(text, speechOptions);
  };

  return { speak };
}

async function loadProgress() {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
}

async function saveProgress(progress) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function updateProgress(progressAnim, index, total) {
  Animated.timing(progressAnim, {
    toValue: (index + 1) / total,
    duration: 300,
    useNativeDriver: false,
  }).start();
}

function useSlideNavigation({
  currentSlideIndex,
  setCurrentSlideIndex,
  totalSlides,
  progressAnim,
}) {
  const lockRef = useRef(false);

  const next = () => {
    if (lockRef.current || currentSlideIndex >= totalSlides - 1) return;
    lockRef.current = true;
    setTimeout(() => {
      lockRef.current = false;
    }, 300);

    const idx = currentSlideIndex + 1;
    setCurrentSlideIndex(idx);
    updateProgress(progressAnim, idx, totalSlides);
  };

  const prev = () => {
    if (lockRef.current || currentSlideIndex === 0) return;
    lockRef.current = true;
    setTimeout(() => {
      lockRef.current = false;
    }, 300);

    const idx = currentSlideIndex - 1;
    setCurrentSlideIndex(idx);
    updateProgress(progressAnim, idx, totalSlides);
  };

  function renderNextButton(index) {
    if (index !== currentSlideIndex) return null;
    return (
      <TouchableOpacity style={styles.nextButton} onPress={next}>
        <Text style={styles.nextButtonText}>Proximo -&gt;</Text>
      </TouchableOpacity>
    );
  }

  function renderPrevButton() {
    if (currentSlideIndex === 0) return null;
    return (
      <TouchableOpacity onPress={prev} style={styles.headerCircleButton}>
        <Image source={Images.seta} style={styles.headerCircleImage} />
      </TouchableOpacity>
    );
  }

  return { renderNextButton, renderPrevButton, next };
}

function useNav() {
  return React.useContext(SlideNavContext);
}

function SlideHeader() {
  const { progressAnim, goBack, renderPrevButton } = useNav();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={goBack} style={styles.headerCircleButton}>
        <Image source={Images.x} style={styles.headerCircleImage} />
      </TouchableOpacity>

      <View style={styles.headerProgress}>
        <Animated.View
          style={[
            styles.progressBarFill,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>

      <View style={styles.headerButton}>{renderPrevButton()}</View>
    </View>
  );
}

function Slide1() {
  const { next } = useNav();
  const { speak } = useSpeech();
  const bottomSafeSpace = 3;
  const options = ["Hello", "Hélo"];
  const correctAnswer = "Hello";
  const activityImage = Images.teacher;
  const audioRate = 0.85;
  const audioProgressAnim = useRef(new Animated.Value(0)).current;
  const estimatedDurationMs = Math.max(
    900,
    Math.round(((correctAnswer.length / 5) * 60000) / 140 / audioRate),
  );

  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const alertTranslateY = useRef(new Animated.Value(64)).current;
  const alertOpacity = useRef(new Animated.Value(0)).current;
  const blinkAnim = useRef(new Animated.Value(0)).current;

  const wrongBackground = blinkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#FEE2E2", "#FCA5A5"],
  });

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
      text: correctAnswer,
      language: "en-US",
      rate: audioRate,
      onDone: () => audioProgressAnim.setValue(1),
      onStopped: () => audioProgressAnim.stopAnimation(),
      onError: () => audioProgressAnim.stopAnimation(),
    });
  };

  const handleSelect = (option) => {
    setSelected(option);

    if (option === correctAnswer) {
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

  return (
    <View style={styles.slide}>
      <SlideHeader />

      <Text style={styles.exerciseTitle}>Escute e complete</Text>

      <View style={styles.mediaWrapper}>
        <View style={styles.mediaCard}>
          <Image source={activityImage} style={styles.mediaImage} />
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

      <View style={[styles.resultBar]}>
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
        {options.map((option) => {
          const optionIsCorrect =
            selected === option && option === correctAnswer;
          const optionIsWrong = selected === option && option !== correctAnswer;

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
            {`Usamos "${correctAnswer}" para dizer "oi".`}
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
              <Text style={styles.successAlertTitle}>Correto</Text>
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
                {`Usamos "${correctAnswer}" para dizer "oi".`}
              </Text>
            </View>

            <TouchableOpacity style={styles.alertContinueButton} onPress={next}>
              <Text style={styles.alertContinueButtonText}>Proximo -&gt;</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </View>
  );
}

function Slide2() {
  const { next } = useNav();
  const bottomSafeSpace = 3;

  const pairs = [
    { en: "Hello", pt: "oi" },
    { en: "fine", pt: "bem/legal" },
    { en: "bye", pt: "tchau" },
  ];

  const shuffleArray = (items) => {
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[randomIndex]] = [
        shuffled[randomIndex],
        shuffled[i],
      ];
    }
    return shuffled;
  };

  const englishOptions = useMemo(
    () => shuffleArray(pairs.map((item) => item.en)),
    [],
  );
  const translationOptions = useMemo(
    () => shuffleArray(pairs.map((item) => item.pt)),
    [],
  );

  const [selectedEnglish, setSelectedEnglish] = useState(null);
  const [selectedTranslation, setSelectedTranslation] = useState(null);
  const [matchedEnglish, setMatchedEnglish] = useState([]);
  const [matchedTranslations, setMatchedTranslations] = useState([]);
  const [wrongPair, setWrongPair] = useState(null);

  const shakeAnim = useRef(new Animated.Value(0)).current;
  const blinkAnim = useRef(new Animated.Value(0)).current;
  const alertTranslateY = useRef(new Animated.Value(64)).current;
  const alertOpacity = useRef(new Animated.Value(0)).current;

  const allMatched = matchedEnglish.length === pairs.length;

  const shakeTranslateX = shakeAnim.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, -8, 8, -8, 0],
  });

  const wrongBackground = blinkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#FEE2E2", "#FCA5A5"],
  });

  const isCorrectPair = (en, pt) => {
    return pairs.some((pair) => pair.en === en && pair.pt === pt);
  };

  const triggerWrongFeedback = (en, pt) => {
    setWrongPair({ en, pt });
    shakeAnim.setValue(0);
    blinkAnim.setValue(0);

    Animated.parallel([
      Animated.timing(shakeAnim, {
        toValue: 1,
        duration: 520,
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
      ]),
    ]).start(() => {
      setWrongPair(null);
      blinkAnim.setValue(0);
    });
  };

  useEffect(() => {
    if (!selectedEnglish || !selectedTranslation) return;

    if (isCorrectPair(selectedEnglish, selectedTranslation)) {
      setMatchedEnglish((prev) => [...prev, selectedEnglish]);
      setMatchedTranslations((prev) => [...prev, selectedTranslation]);
      setSelectedEnglish(null);
      setSelectedTranslation(null);
      setWrongPair(null);
      return;
    }

    triggerWrongFeedback(selectedEnglish, selectedTranslation);
    setSelectedEnglish(null);
    setSelectedTranslation(null);
  }, [selectedEnglish, selectedTranslation]);

  useEffect(() => {
    if (allMatched) {
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
  }, [allMatched, alertOpacity, alertTranslateY]);

  const getEnglishCardStyle = (word) => {
    const matched = matchedEnglish.includes(word);
    const selected = selectedEnglish === word;
    const wrong = wrongPair?.en === word;

    return [
      styles.matchCard,
      styles.matchCardEnglish,
      selected && styles.matchCardSelected,
      matched && styles.matchCardCorrect,
      wrong && styles.matchCardWrong,
      wrong && { backgroundColor: wrongBackground },
      wrong && { transform: [{ translateX: shakeTranslateX }] },
    ];
  };

  const getTranslationCardStyle = (word) => {
    const matched = matchedTranslations.includes(word);
    const selected = selectedTranslation === word;
    const wrong = wrongPair?.pt === word;

    return [
      styles.matchCard,
      styles.matchCardTranslation,
      selected && styles.matchCardTranslationSelected,
      matched && styles.matchCardCorrect,
      wrong && styles.matchCardWrong,
      wrong && { backgroundColor: wrongBackground },
      wrong && { transform: [{ translateX: shakeTranslateX }] },
    ];
  };

  return (
    <View style={styles.slide}>
      <SlideHeader />

      <View style={styles.matchBlock}>
        <Text style={styles.exerciseTitle}>Encontre a tradução</Text>

        <View style={styles.matchList}>
          {englishOptions.map((word) => {
            const matched = matchedEnglish.includes(word);

            return (
              <Animated.View key={word} style={getEnglishCardStyle(word)}>
                <TouchableOpacity
                  style={styles.matchCardButton}
                  onPress={() => setSelectedEnglish(word)}
                  disabled={matched || allMatched}
                >
                  <Text
                    style={[
                      styles.matchCardText,
                      matched && styles.matchCardTextCorrect,
                    ]}
                  >
                    {word}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        <View style={styles.matchList}>
          {translationOptions.map((word) => {
            const matched = matchedTranslations.includes(word);

            return (
              <Animated.View key={word} style={getTranslationCardStyle(word)}>
                <TouchableOpacity
                  style={styles.matchCardButton}
                  onPress={() => setSelectedTranslation(word)}
                  disabled={matched || allMatched}
                >
                  <Text
                    style={[
                      styles.matchCardText,
                      styles.matchCardTextTranslation,
                      matched && styles.matchCardTextCorrect,
                    ]}
                  >
                    {word}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </View>

      {allMatched && (
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
              <Text style={styles.successAlertTitle}>Excelente</Text>
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
                Você acertou todas as traduções.
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

function Slide3() {
  const { next } = useNav();
  const bottomSafeSpace = 3;
  const activity = {
    title: "Completar o Texto",
    paragraphs: [
      [
        "This is my friend Peter. He",
        {
          id: "blank-1",
          answer: "is",
          options: ["is", "are", "am"],
        },
        "25 years old.",
      ],
      [
        "Peter",
        {
          id: "blank-2",
          answer: "lives",
          options: ["live", "lives", "living"],
        },
        "in New York with his family.",
      ],
      [
        "He",
        {
          id: "blank-3",
          answer: "works",
          options: ["works", "work", "working"],
        },
        "in a big bank. He likes his job.",
      ],
      [
        "On weekends, he",
        {
          id: "blank-4",
          answer: "plays",
          options: ["play", "plays", "playing"],
        },
        "soccer in the park.",
      ],
    ],
  };
  const successTitle = "Excelente";
  const successMessage = "Você completou o texto corretamente.";

  const tokenizeTextFragment = (text, keyPrefix) =>
    text
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word, index, array) => (
        <Text key={`${keyPrefix}-${word}-${index}`} style={styles.completeWord}>
          {index === array.length - 1 ? word : `${word} `}
        </Text>
      ));

  const blankMap = useMemo(() => {
    const entries = activity.paragraphs.flatMap((paragraph) =>
      paragraph
        .filter((item) => typeof item !== "string")
        .map((blank) => [blank.id, blank]),
    );

    return Object.fromEntries(entries);
  }, [activity.paragraphs]);

  const blankIds = useMemo(() => Object.keys(blankMap), [blankMap]);
  const [answers, setAnswers] = useState({});
  const [activeBlankId, setActiveBlankId] = useState(null);
  const [wrongBlankId, setWrongBlankId] = useState(null);

  const shakeAnim = useRef(new Animated.Value(0)).current;
  const blinkAnim = useRef(new Animated.Value(0)).current;
  const alertTranslateY = useRef(new Animated.Value(64)).current;
  const alertOpacity = useRef(new Animated.Value(0)).current;

  const shakeTranslateX = shakeAnim.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
    outputRange: [0, -7, 7, -6, 6, 0],
  });

  const wrongBackground = blinkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#FFFFFF", "#FCA5A5"],
  });

  const allCorrect =
    blankIds.length > 0 &&
    blankIds.every((blankId) => answers[blankId] === blankMap[blankId].answer);

  useEffect(() => {
    if (allCorrect) {
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
  }, [allCorrect, alertOpacity, alertTranslateY]);

  const triggerWrongFeedback = (blankId) => {
    setWrongBlankId(blankId);
    shakeAnim.setValue(0);
    blinkAnim.setValue(0);
    Vibration.vibrate(140);

    Animated.parallel([
      Animated.timing(shakeAnim, {
        toValue: 1,
        duration: 420,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.sequence([
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 110,
          useNativeDriver: false,
        }),
        Animated.timing(blinkAnim, {
          toValue: 0,
          duration: 110,
          useNativeDriver: false,
        }),
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 110,
          useNativeDriver: false,
        }),
        Animated.timing(blinkAnim, {
          toValue: 0,
          duration: 110,
          useNativeDriver: false,
        }),
      ]),
    ]).start(() => {
      setWrongBlankId(null);
      blinkAnim.setValue(0);
    });
  };

  const handleOptionPress = (blank, option) => {
    if (option === blank.answer) {
      setAnswers((prev) => ({ ...prev, [blank.id]: option }));
      setWrongBlankId(null);
      setActiveBlankId(null);
      return;
    }

    setActiveBlankId(null);
    triggerWrongFeedback(blank.id);
  };

  const renderBlank = (blank) => {
    const selectedValue = answers[blank.id];
    const isCorrect = selectedValue === blank.answer;
    const isWrong = wrongBlankId === blank.id;
    const isOpen = activeBlankId === blank.id;

    return (
      <Animated.View
        key={blank.id}
        style={[
          styles.blankWrapper,
          isOpen && styles.blankWrapperOpen,
          isWrong && { transform: [{ translateX: shakeTranslateX }] },
        ]}
      >
        <Animated.View
          style={[
            styles.blankButton,
            isCorrect && styles.blankButtonCorrect,
            isWrong && styles.blankButtonWrong,
            isWrong && { backgroundColor: wrongBackground },
          ]}
        >
          <TouchableOpacity
            style={styles.blankButtonTouchArea}
            activeOpacity={0.9}
            disabled={isCorrect || allCorrect}
            onPress={() =>
              setActiveBlankId((current) =>
                current === blank.id ? null : blank.id,
              )
            }
          >
            <Text
              style={[
                styles.blankButtonText,
                isCorrect && styles.blankButtonTextCorrect,
              ]}
            >
              {selectedValue || "..."}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {isOpen && !isCorrect && (
          <View style={styles.blankOptionsMenu}>
            {blank.options.map((option) => (
              <TouchableOpacity
                key={`${blank.id}-${option}`}
                style={[
                  styles.blankOptionItem,
                  option === blank.options[blank.options.length - 1] &&
                    styles.blankOptionItemLast,
                ]}
                activeOpacity={0.85}
                onPress={() => handleOptionPress(blank, option)}
              >
                <Text style={styles.blankOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </Animated.View>
    );
  };

  return (
    <View style={styles.slide}>
      <SlideHeader />

      <View style={styles.completeActivityBlock}>
        <Text style={styles.exerciseTitle}>{activity.title}</Text>

        <View style={styles.completeCard}>
          {activity.paragraphs.map((paragraph, paragraphIndex) => (
            <View
              key={`paragraph-${paragraphIndex}`}
              style={styles.completeLine}
            >
              {paragraph.map((item, itemIndex) =>
                typeof item === "string"
                  ? tokenizeTextFragment(
                      item,
                      `paragraph-${paragraphIndex}-${itemIndex}`,
                    )
                  : renderBlank(item),
              )}
            </View>
          ))}
        </View>
      </View>

      {allCorrect && (
        <View style={styles.successAlertOverlay}>
          <Animated.View
            style={[
              styles.successAlertCard,
              styles.slide3SuccessAlertCard,
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
              <Text style={styles.successAlertTitle}>{successTitle}</Text>
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
              <Text style={styles.feedbackTextBlack}>{successMessage}</Text>
            </View>

            <TouchableOpacity style={styles.alertContinueButton} onPress={next}>
              <Text style={styles.alertContinueButtonText}>Proximo -&gt;</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </View>
  );
}

function Slide4() {
  const { next } = useNav();
  const { speak } = useSpeech();
  const bottomSafeSpace = 3;
  const activity = {
    title: "Escute e responda",
    image: require("../../../../assets/Bussines/relogio.png"),
    audioText: "He wakes up at 6am every day.",
    prompt: "He wakes up at 6am every day.",
    options: ["true", "false"],
    correctAnswer: "true",
    successTitle: "Correto",
    successMessage: 'A frase "He wakes up at 6am every day." esta correta.',
  };
  const audioRate = 0.85;
  const estimatedDurationMs = Math.max(
    1200,
    Math.round(((activity.audioText.length / 5) * 60000) / 140 / audioRate),
  );

  const audioProgressAnim = useRef(new Animated.Value(0)).current;
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
    outputRange: ["#FFFFFF", "#FCA5A5"],
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
      <SlideHeader />

      <View style={styles.listenAnswerBlock}>
        <Text style={styles.listenAnswerTitle}>{activity.title}</Text>

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

        <Text style={styles.listenAnswerPrompt}>{activity.prompt}</Text>

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
              <Text style={styles.alertContinueButtonText}>Proximo -&gt;</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </View>
  );
}

function Slide5() {
  const { next } = useNav();
  const bottomSafeSpace = 3;
  const activity = {
    title: "Corrija",
    image: require("../../../../assets/Cursos/bussines.jpg"),
    wrongSentence: "She take the bus.",
    options: ["She takes the bus.", "She take the bus."],
    correctAnswer: "She takes the bus.",
    successTitle: "Correto",
    successMessage: 'A forma correta e "She takes the bus."',
  };

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
    outputRange: ["#FFFFFF", "#FCA5A5"],
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
      <SlideHeader />

      <View style={styles.correctSentenceBlock}>
        <Text style={styles.correctSentenceTitle}>{activity.title}</Text>

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
              <Text style={styles.alertContinueButtonText}>Proximo -&gt;</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </View>
  );
}

function Slide6() {
  const { next } = useNav();
  const bottomSafeSpace = 3;
  const activity = {
    title: "Complete a frase",
    image: require("../../../../assets/Cursos/bussines.jpg"),
    sentenceStart: "She",
    sentenceEnd: "the bus.",
    options: ["take", "takes"],
    correctAnswer: "takes",
    successTitle: "Correto",
    successMessage: 'A forma correta e "She takes the bus."',
  };

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
    outputRange: ["#FFFFFF", "#FCA5A5"],
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
      <SlideHeader />

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
              <Text style={styles.alertContinueButtonText}>Proximo -&gt;</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </View>
  );
}

function Slide7() {
  const { next } = useNav();
  const { speak } = useSpeech();
  const bottomSafeSpace = 3;
  const activity = {
    title: "Coloque a frase em ordem.",
    image: Images.teacher,
    audioText: "Hello, my name is Laura.",
    words: ["Hello", "name's", "my", "Laura"],
    correctOrder: ["Hello", "my", "name's", "Laura"],
    successTitle: "Correto",
    successMessage: 'A frase correta e "Hello my name\'s Laura."',
  };
  const audioRate = 0.85;
  const estimatedDurationMs = Math.max(
    1200,
    Math.round(((activity.audioText.length / 5) * 60000) / 140 / audioRate),
  );

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

  const shuffledOptions = useMemo(() => shuffleArray(activity.words), []);
  const audioProgressAnim = useRef(new Animated.Value(0)).current;
  const alertTranslateY = useRef(new Animated.Value(64)).current;
  const alertOpacity = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const blinkAnim = useRef(new Animated.Value(0)).current;

  const [selectedWords, setSelectedWords] = useState([]);
  const [result, setResult] = useState(null);

  const isCorrect = result === "correct";

  const shakeTranslateX = shakeAnim.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, -8, 8, -8, 0],
  });

  const wrongBackground = blinkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#FFFFFF", "#FCA5A5"],
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
    ]).start(() => {
      setResult(null);
      setSelectedWords([]);
      blinkAnim.setValue(0);
    });
  };

  const handleWordPress = (word) => {
    if (isCorrect || selectedWords.includes(word)) return;

    const nextWords = [...selectedWords, word];
    setSelectedWords(nextWords);

    const isPrefixCorrect = nextWords.every(
      (selectedWord, index) => selectedWord === activity.correctOrder[index],
    );

    if (!isPrefixCorrect) {
      triggerWrongFeedback();
      return;
    }

    if (nextWords.length === activity.correctOrder.length) {
      setResult("correct");
    }
  };

  const handleSelectedWordPress = (word) => {
    if (isCorrect) return;
    setSelectedWords((current) => current.filter((item) => item !== word));
  };

  const usedWords = selectedWords;

  return (
    <View style={styles.slide}>
      <SlideHeader />

      <View style={styles.orderSentenceBlock}>
        <Text style={styles.orderSentenceTitle}>{activity.title}</Text>

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
            result === "wrong" && styles.orderSentenceAnswerBoxWrong,
            result === "wrong" && { backgroundColor: wrongBackground },
            result === "wrong" && { transform: [{ translateX: shakeTranslateX }] },
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
                disabled={isCorrect}
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
            const used = usedWords.includes(word);

            return (
              <TouchableOpacity
                key={word}
                style={[
                  styles.orderSentenceOption,
                  used && styles.orderSentenceOptionUsed,
                ]}
                onPress={() => handleWordPress(word)}
                disabled={used || isCorrect}
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

      {isCorrect && (
        <View style={styles.successAlertOverlay}>
          <Animated.View
            style={[
              styles.successAlertCard,
              styles.slide7SuccessAlertCard,
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
              <Text style={styles.alertContinueButtonText}>Proximo -&gt;</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </View>
  );
}

function Slide8() {
  const { goToNextLesson } = useNav();

  return (
    <View style={styles.slide}>
      <SlideHeader />

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.nextLessonButton}
          onPress={goToNextLesson}
        >
          <Text style={styles.nextLessonButtonText}>Próxima lição -&gt;</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function Base({ route, navigation }) {
  const lesson = route?.params?.lesson;
  const lessons = route?.params?.lessons;

  const [currentSlide, setCurrentSlide] = useState(0);
  const progressAnim = useRef(new Animated.Value(1 / SLIDE_COUNT)).current;

  useEffect(() => {
    updateProgress(progressAnim, currentSlide, SLIDE_COUNT);
  }, [currentSlide, progressAnim]);

  const slideNav = useSlideNavigation({
    currentSlideIndex: currentSlide,
    setCurrentSlideIndex: setCurrentSlide,
    totalSlides: SLIDE_COUNT,
    progressAnim,
  });

  const findNextLesson = () => {
    if (!lessons || !lesson) return null;
    const idx = lessons.findIndex((l) => String(l.id) === String(lesson.id));
    return lessons[idx + 1] || null;
  };

  const goToNextLesson = async () => {
    if (lesson?.id != null) {
      const progress = await loadProgress();
      await saveProgress({ ...progress, [lesson.id]: true });
    }

    navigation.replace("Inglescompleto", {
      autoOpenLessonId: findNextLesson()?.id || null,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
      <SlideNavContext.Provider
        value={{
          ...slideNav,
          progressAnim,
          goBack: () => navigation.goBack(),
          goToNextLesson,
        }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {currentSlide === 0 && <Slide1 />}
          {currentSlide === 1 && <Slide2 />}
          {currentSlide === 2 && <Slide3 />}
          {currentSlide === 3 && <Slide4 />}
          {currentSlide === 4 && <Slide5 />}
          {currentSlide === 5 && <Slide6 />}
          {currentSlide === 6 && <Slide7 />}
          {currentSlide === 7 && <Slide8 />}
        </ScrollView>
      </SlideNavContext.Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingTop: 150,
    marginHorizontal: 20,
    marginBottom: 0,
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#F5F5F5",
    zIndex: 10,
  },
  headerButton: {
    width: 32,
    alignItems: "center",
  },
  headerProgress: {
    flex: 1,
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    marginHorizontal: 8,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: CORES.PRIMARY,
    borderRadius: 2,
  },
  headerCircleButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: CORES.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },
  headerCircleImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  nextButton: {
    backgroundColor: CORES.SECONDARY,
    width: 180,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    marginHorizontal: 4,
  },
  nextButtonText: {
    color: "#FFF",
    fontWeight: "700",
  },
  nextLessonButton: {
    backgroundColor: "#0F73FF",
    width: 180,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  nextLessonButtonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  exerciseTitle: {
    width: "88%",
    textAlign: "left",
    fontSize: 18,
    color: CORES.PRIMARY,
    marginBottom: 12,
    fontWeight: "700",
  },
  completeActivityBlock: {
    width: "100%",
    alignItems: "center",
  },
  completeCard: {
    width: "88%",
    minHeight: 360,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: CORES.PRIMARY,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 16,
    overflow: "visible",
  },
  completeLine: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 12,
    overflow: "visible",
  },
  completeWord: {
    fontSize: 16,
    lineHeight: 30,
    color: "#1F2937",
  },
  blankWrapper: {
    position: "relative",
    marginHorizontal: 3,
    marginVertical: 2,
    alignItems: "flex-start",
    zIndex: 1,
    overflow: "visible",
  },
  blankWrapperOpen: {
    zIndex: 50,
    elevation: 20,
  },
  blankButton: {
    minWidth: 50,
    height: 34,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: CORES.PRIMARY,
    backgroundColor: "#FFFFFF",
  },
  blankButtonTouchArea: {
    flex: 1,
    minWidth: 50,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  blankButtonCorrect: {
    backgroundColor: "#DCFCE7",
    borderColor: "#22C55E",
  },
  blankButtonWrong: {
    borderColor: "#EF4444",
  },
  blankButtonText: {
    fontSize: 15,
    color: "#6B7280",
  },
  blankButtonTextCorrect: {
    color: "#15803D",
    fontWeight: "700",
  },
  blankOptionsMenu: {
    position: "absolute",
    top: 38,
    left: 0,
    minWidth: 78,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: CORES.PRIMARY,
    borderRadius: 8,
    overflow: "hidden",
    zIndex: 60,
    elevation: 24,
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  blankOptionItem: {
    minHeight: 34,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#DBEAFE",
  },
  blankOptionItemLast: {
    borderBottomWidth: 0,
  },
  blankOptionText: {
    fontSize: 15,
    color: "#111827",
  },
  slide3SuccessAlertCard: {
    marginHorizontal: 12,
    marginBottom: 0,
    zIndex: 200,
    elevation: 30,
  },
  listenAnswerBlock: {
    width: "100%",
    alignItems: "center",
  },
  listenAnswerTitle: {
    width: "88%",
    textAlign: "left",
    fontSize: 15,
    color: CORES.PRIMARY,
    marginBottom: 10,
    fontWeight: "700",
  },
  listenAnswerMediaWrapper: {
    width: "88%",
    marginBottom: 12,
  },
  listenAnswerMediaCard: {
    width: "100%",
    height: 190,
    backgroundColor: "#DDE7F5",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    overflow: "hidden",
  },
  listenAnswerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  listenAnswerAudioButton: {
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
  listenAnswerPrompt: {
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
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#DCFCE7",
    borderColor: "#22C55E",
  },
  listenAnswerOptionWrong: {
    borderColor: "#EF4444",
  },
  listenAnswerOptionTextCorrect: {
    color: "#15803D",
  },
  slide4SuccessAlertCard: {
    marginHorizontal: 12,
    marginBottom: 0,
    zIndex: 200,
    elevation: 30,
  },
  correctSentenceBlock: {
    width: "100%",
    alignItems: "center",
  },
  correctSentenceTitle: {
    width: "88%",
    textAlign: "left",
    fontSize: 15,
    color: CORES.PRIMARY,
    marginBottom: 10,
    fontWeight: "700",
  },
  correctSentenceMediaCard: {
    width: "88%",
    height: 150,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 12,
    backgroundColor: "#DDE7F5",
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
    color: "#FFFFFF",
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
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#DCFCE7",
    borderColor: "#22C55E",
  },
  correctSentenceOptionWrong: {
    borderColor: "#EF4444",
  },
  correctSentenceOptionTextCorrect: {
    color: "#15803D",
    fontWeight: "700",
    textDecorationLine: "none",
  },
  slide5SuccessAlertCard: {
    marginHorizontal: 12,
    marginBottom: 0,
    zIndex: 200,
    elevation: 30,
  },
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
    backgroundColor: "#DDE7F5",
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
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  completePhraseBlank: {
    minWidth: 68,
    minHeight: 26,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  completePhraseBlankCorrect: {
    backgroundColor: "#DCFCE7",
    borderWidth: 1,
    borderColor: "#22C55E",
  },
  completePhraseBlankWrong: {
    borderWidth: 1,
    borderColor: "#EF4444",
  },
  completePhraseBlankText: {
    color: CORES.PRIMARY,
    fontSize: 14,
    fontWeight: "700",
  },
  completePhraseBlankTextCorrect: {
    color: "#15803D",
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
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#DCFCE7",
    borderColor: "#22C55E",
  },
  completePhraseOptionWrong: {
    borderColor: "#EF4444",
  },
  completePhraseOptionTextCorrect: {
    color: "#15803D",
    fontWeight: "700",
  },
  slide6SuccessAlertCard: {
    marginHorizontal: 12,
    marginBottom: 0,
    zIndex: 200,
    elevation: 30,
  },
  orderSentenceBlock: {
    width: "100%",
    alignItems: "center",
  },
  orderSentenceTitle: {
    width: "88%",
    textAlign: "left",
    fontSize: 15,
    color: CORES.PRIMARY,
    marginBottom: 10,
    fontWeight: "700",
  },
  orderSentenceAnswerBox: {
    width: "88%",
    minHeight: 54,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: CORES.PRIMARY,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 6,
    marginBottom: 14,
  },
  orderSentenceAnswerBoxCorrect: {
    backgroundColor: "#DCFCE7",
    borderColor: "#22C55E",
  },
  orderSentenceAnswerBoxWrong: {
    borderColor: "#EF4444",
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
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  orderSentenceSelectedWordCorrect: {
    backgroundColor: "#DCFCE7",
    borderColor: "#22C55E",
  },
  orderSentenceSelectedWordText: {
    color: CORES.PRIMARY,
    fontSize: 13,
  },
  orderSentenceSelectedWordTextCorrect: {
    color: "#15803D",
    fontWeight: "700",
  },
  orderSentenceOptionsRow: {
    width: "88%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  orderSentenceOption: {
    minHeight: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: CORES.PRIMARY,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  orderSentenceOptionUsed: {
    backgroundColor: "#EFF6FF",
    borderColor: "#BFDBFE",
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
  matchBlock: {
    width: "88%",
    alignItems: "center",
  },
  matchList: {
    width: "100%",
    gap: 10,
    marginTop: 4,
  },
  matchCard: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 20,
    overflow: "hidden",
  },
  matchCardEnglish: {
    backgroundColor: "#FFFFFF",
    borderColor: "#60A5FA",
  },
  matchCardTranslation: {
    backgroundColor: "#5FA1D6",
    borderColor: "#5FA1D6",
  },
  matchCardSelected: {
    borderColor: "#2563EB",
    borderWidth: 2,
  },
  matchCardTranslationSelected: {
    backgroundColor: "#4A8FC8",
    borderColor: "#2563EB",
    borderWidth: 2,
  },
  matchCardCorrect: {
    backgroundColor: "#DCFCE7",
    borderColor: "#22C55E",
    borderWidth: 2,
  },
  matchCardWrong: {
    borderColor: "#EF4444",
    borderWidth: 2,
  },
  matchCardButton: {
    width: "100%",
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  matchCardText: {
    fontSize: 19,
    color: "#397BB2",
    fontFamily: "serif",
  },
  matchCardTextTranslation: {
    color: "#FFFFFF",
  },
  matchCardTextCorrect: {
    color: "#166534",
    fontWeight: "700",
  },
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
  audioIcon: {
    color: "#FFF",
    fontSize: 18,
  },
  audioBar: {
    flex: 1,
    height: 6,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 3,
    overflow: "hidden",
  },
  audioProgress: {
    height: "100%",
    backgroundColor: "#FFF",
    borderRadius: 3,
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
    color: "#111827",
  },
  resultBarTextCorrect: {
    color: "#16A34A",
  },
  resultBarTextWrong: {
    color: "#DC2626",
  },
  resultUnderline: {
    width: "55%",
    height: 2,
    marginTop: 2,
    borderRadius: 2,
    backgroundColor: "#D1D5DB",
  },
  resultUnderlineCorrect: {
    backgroundColor: "#22C55E",
  },
  resultUnderlineWrong: {
    backgroundColor: "#EF4444",
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
    backgroundColor: "#FFF",
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
    backgroundColor: "#DCFCE7",
    borderColor: "#22C55E",
  },
  optionCorrectText: {
    color: "#16A34A",
    fontWeight: "700",
  },
  optionBlinkWrong: {
    backgroundColor: "#FEE2E2",
    borderColor: "#EF4444",
  },

  feedbackBox: {
    width: "85%",
    borderWidth: 1,
    borderColor: "#22C55E",
    backgroundColor: "#ECFDF5",
    borderRadius: 12,
    padding: 14,
    marginTop: 14,
  },
  feedbackBoxCorrect: {
    borderColor: "#22C55E",
    backgroundColor: "#ECFDF5",
  },
  feedbackBoxWrong: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
  feedbackTitle: {
    color: "#16A34A",
    fontWeight: "700",
    marginBottom: 4,
  },
  feedbackTitleCorrect: {
    color: "#16A34A",
  },
  feedbackTitleWrong: {
    color: "#DC2626",
  },
  feedbackTextBlack: {
    color: "#000",
    fontSize: 14,
  },
  successAlertOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    zIndex: 200,
    elevation: 30,
  },
  successAlertCard: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 22,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  successHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  successIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#DCFCE7",
    alignItems: "center",
    justifyContent: "center",
  },
  successIcon: {
    color: "#16A34A",
    fontSize: 16,
    fontWeight: "700",
  },
  successAlertTitle: {
    color: "#15803D",
    fontSize: 18,
    fontWeight: "800",
  },
  alertFeedbackBox: {
    width: "100%",
    marginTop: 12,
    marginBottom: 8,
  },
  alertContinueButton: {
    width: "100%",
    height: 50,
    borderRadius: 14,
    backgroundColor: CORES.SECONDARY,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
  },
  alertContinueButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
