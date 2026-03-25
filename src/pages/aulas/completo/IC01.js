import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Speech from "expo-speech";
import geral from "../../../exc/geral";
import ex1, { Exercise1 } from "../../../exc/ex1";
import ex14, { Exercise14 } from "../../../exc/ex14";
import ex2, { Exercise2 } from "../../../exc/ex2";
import ex3, { Exercise3 } from "../../../exc/ex3";
import ex4, { Exercise4 } from "../../../exc/ex4";
import ex5, { Exercise5 } from "../../../exc/ex5";
import ex6, { Exercise6 } from "../../../exc/ex6";
import ex7, { Exercise7 } from "../../../exc/ex7";
import ex8, { Exercise8 } from "../../../exc/ex8";
import ex9, { Exercise9 } from "../../../exc/ex9";
import ex10, { Exercise10 } from "../../../exc/ex10";
import ex11, { Exercise11 } from "../../../exc/ex11";
import ex12, { Exercise12 } from "../../../exc/ex12";
import ex13, { Exercise13 } from "../../../exc/ex13";
import ex15, { Exercise15 } from "../../../exc/ex15";
import ex16, { Exercise16 } from "../../../exc/ex16";
import { BussinesImages, Images } from "../../../util/images";

const SlideNavContext = React.createContext(null);

const STORAGE_KEY = "@progesso_ingles_completo";

const styles = {
  ...geral,
  ...ex14,
  ...ex1,
  ...ex2,
  ...ex3,
  ...ex4,
  ...ex5,
  ...ex6,
  ...ex7,
  ...ex8,
  ...ex9,
  ...ex10,
  ...ex11,
  ...ex12,
  ...ex13,
  ...ex15,
  ...ex16,
};

const LESSON_SLIDES = [
  {
    component: Exercise1,
    activity: {
      prompt: "Encontre a tradução",
      pairs: [
        { en: "Hello", pt: "oi" },
        { en: "fine", pt: "bem/legal" },
        { en: "bye", pt: "tchau" },
      ],
      successTitle: "Excelente",
      successMessage: "Você acertou todas as traduções.",
    },
  },
  {
    component: Exercise2,
    activity: {
      prompt: "Completar o Texto",
      paragraphs: [
        [
          "This is my friend Peter. He",
          { id: "blank-1", answer: "is", options: ["is", "are", "am"] },
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
      successTitle: "Excelente",
      successMessage: "Você completou o texto corretamente.",
    },
  },
  {
    component: Exercise3,
    needsSpeech: true,
    activity: {
      prompt: "Escute e responda",
      image: require("../../../../assets/Bussines/relogio.png"),
      audioText: "He wakes up at 6am every day.",
      dialogue: "He wakes up at 6am every day.",
      options: ["true", "false"],
      correctAnswer: "true",
      audioRate: 0.85,
      successTitle: "Correto",
      successMessage: 'A frase "He wakes up at 6am every day." esta correta.',
    },
  },
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
  {
    component: Exercise5,
    activity: {
      prompt: "Complete a frase",
      image: require("../../../../assets/Cursos/bussines.jpg"),
      sentenceStart: "She",
      sentenceEnd: "the bus.",
      options: ["take", "takes"],
      correctAnswer: "takes",
      successTitle: "Correto",
      successMessage: 'A forma correta e "She takes the bus."',
    },
  },
  {
    component: Exercise6,
    needsSpeech: true,
    activity: {
      prompt: "Coloque a frase em ordem.",
      image: Images.teacher,
      audioText: "Hello, my name is Laura.",
      words: ["Hello", "name's", "my", "Laura"],
      correctOrder: ["Hello", "my", "name's", "Laura"],
      audioRate: 0.85,
      successTitle: "Correto",
      successMessage: `A frase correta e "Hello my name's Laura."`,
    },
  },
  {
    component: Exercise7,
    activity: {
      prompt: "Monte o diálogo na ordem certa",
      options: [
        "I wake up at 6am.",
        "then I have breakfast.",
        "I go to work.",
        "I have lunch at 12pm.",
      ],
      correctOrder: [
        "I wake up at 6am.",
        "then I have breakfast.",
        "I go to work.",
        "I have lunch at 12pm.",
      ],
      successTitle: "Correto",
      successMessage: "Você colocou o diálogo na ordem certa.",
    },
  },
  {
    component: Exercise8,
    activity: {
      prompt: "Oque é essa imagen?",
      image: require("../../../../assets/Bussines/agenda2.png"),
      options: ["Banana", "Apple", "Grape"],
      correctAnswer: "Apple",
      successTitle: "Correto",
      successMessage: 'A resposta correta é "Apple".',
    },
  },
  {
    component: Exercise9,
    activity: {
      prompt: "O que é a palavra?",
      question: "Phone",
      correctOptionId: "phone",
      options: [
        { id: "phone", image: BussinesImages.telefone },
        { id: "book", image: BussinesImages.livro },
        { id: "email", image: BussinesImages.email },
        { id: "clock", image: BussinesImages.relogio },
      ],
      successTitle: "Correto",
      successMessage: 'A imagem correta representa "phone".',
    },
  },
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
          options: ["My name is Ana.", "I am from Brazil.", "I am 25 years old."],
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
          options: ["Nice to meet you too.", "How old are you?", "See you at home."],
          correctAnswer: "Nice to meet you too.",
        },
        {
          image: BussinesImages.menino2,
          question: "How old are you?",
          options: ["I am 25 years old.", "I am from Mexico.", "My name is Leo."],
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
          options: ["Thanks, you too!", "My name is Carol.", "I am 18 years old."],
          correctAnswer: "Thanks, you too!",
        },
      ],
      successTitle: "Correto",
      successMessage: "Você acertou todas as 10 respostas da conversa.",
    },
  },
  {
    component: Exercise11,
    activity: {
      prompt: "Escreva rápido",
      title: "Escreva a palavra abaixo",
      placeholder: "Digite aqui",
      secondsPerWord: 5,
      words: ["Hello", "Bye", "Fine", "Thanks", "Sorry"],
      successTitle: "Correto",
      successMessage: "Você digitou todas as palavras no tempo certo.",
    },
  },
  {
    component: Exercise12,
    activity: {
      prompt: "Write your introduction",
      instruction: "Escreva brevemente sobre você em inglês.",
      helperText: "Use as frases estudadas anteriormente",
      placeholder: "Hello...",
      tipText: "Hello, my name is Ana. I am from Brazil. I am fine.",
      minLength: 3,
      successTitle: "Correto",
      successMessage: "Seu texto foi preenchido com sucesso.",
    },
  },
  {
    component: Exercise13,
    needsSpeech: true,
    activity: {
      prompt: "Escreva a palavra",
      audioText: "hello",
      audioRate: 0.85,
      letters: ["H", "E", "L", "L", "O"],
      correctWord: "HELLO",
      successTitle: "Correto",
      successMessage: 'A palavra correta é "HELLO".',
    },
  },
  {
    component: Exercise14,
    needsSpeech: true,
    activity: {
      prompt: "Escute e complete",
      image: Images.teacher,
      options: ["Hello", "Hélo"],
      correctAnswer: "Hello",
      audioRate: 0.85,
      successTitle: "Correto",
      feedbackMessage: 'Usamos "Hello" para dizer "oi".',
    },
  },
  {
    component: Exercise15,
    activity: {
      prompt: "Clique na imagem e na palavra",
      images: [
        { id: "meeting", image: BussinesImages.reuniao },
        { id: "phone", image: BussinesImages.telefone },
      ],
      words: [
        { id: "meeting-word", label: "Hey" },
        { id: "phone-word", label: "Hello" },
      ],
      pairs: [
        { imageId: "meeting", wordId: "meeting-word" },
        { imageId: "phone", wordId: "phone-word" },
      ],
      successTitle: "Correto",
      successMessage: "Você formou os dois pares corretamente.",
    },
  },
  {
    component: Exercise16,
    activity: {
      prompt: "Speaking",
      instruction: "Fale brevemente sobre você em inglês.",
      helperText: "(Use as frases estudadas anteriormente)",
      image: BussinesImages.menina2,
      tipButtonLabel: "Tip",
      tipText: "Hello, my name is Ana. I am from Brazil. I am fine.",
      recordLabel: "Speak",
      stopLabel: "Parar",
      playLabel: "Ouvir",
      pauseLabel: "Pausar",
      rerecordLabel: "Regravar",
      submitLabel: "Enviar áudio",
      successTitle: "Correto",
      successMessage: "Seu áudio foi gravado com sucesso.",
    },
  },
  {
    key: "lesson-finish",
    type: "finish",
  },
];

const SLIDE_COUNT = LESSON_SLIDES.length;

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

    const nextIndex = currentSlideIndex + 1;
    setCurrentSlideIndex(nextIndex);
    updateProgress(progressAnim, nextIndex, totalSlides);
  };

  const prev = () => {
    if (lockRef.current || currentSlideIndex === 0) return;
    lockRef.current = true;
    setTimeout(() => {
      lockRef.current = false;
    }, 300);

    const previousIndex = currentSlideIndex - 1;
    setCurrentSlideIndex(previousIndex);
    updateProgress(progressAnim, previousIndex, totalSlides);
  };

  function renderPrevButton() {
    if (currentSlideIndex === 0) return null;

    return (
      <TouchableOpacity onPress={prev} style={styles.headerCircleButton}>
        <Image source={Images.seta} style={styles.headerCircleImage} />
      </TouchableOpacity>
    );
  }

  return { next, renderPrevButton };
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

function LessonFinishSlide({ onPressNextLesson }) {
  return (
    <View style={styles.slide}>
      <SlideHeader />

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.nextLessonButton}
          onPress={onPressNextLesson}
        >
          <Text style={styles.nextLessonButtonText}>Próxima lição -&gt;</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function LessonSlideRenderer({ slide, next, speak, onPressNextLesson }) {
  if (slide.type === "finish") {
    return <LessonFinishSlide onPressNextLesson={onPressNextLesson} />;
  }

  const ExerciseComponent = slide.component;

  return (
    <ExerciseComponent
      activity={slide.activity}
      styles={styles}
      HeaderComponent={SlideHeader}
      next={next}
      {...(slide.needsSpeech ? { speak } : {})}
    />
  );
}

export default function IC01({ route, navigation }) {
  const lesson = route?.params?.lesson;
  const lessons = route?.params?.lessons;
  const { speak } = useSpeech();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const progressAnim = useRef(new Animated.Value(1 / SLIDE_COUNT)).current;

  useEffect(() => {
    updateProgress(progressAnim, currentSlideIndex, SLIDE_COUNT);
  }, [currentSlideIndex, progressAnim]);

  const slideNav = useSlideNavigation({
    currentSlideIndex,
    setCurrentSlideIndex,
    totalSlides: SLIDE_COUNT,
    progressAnim,
  });

  const currentSlide = LESSON_SLIDES[currentSlideIndex];

  const findNextLesson = () => {
    if (!lessons || !lesson) return null;
    const lessonIndex = lessons.findIndex(
      (lessonItem) => String(lessonItem.id) === String(lesson.id),
    );
    return lessons[lessonIndex + 1] || null;
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
        }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <LessonSlideRenderer
            slide={currentSlide}
            next={slideNav.next}
            speak={speak}
            onPressNextLesson={goToNextLesson}
          />
        </ScrollView>
      </SlideNavContext.Provider>
    </SafeAreaView>
  );
}
