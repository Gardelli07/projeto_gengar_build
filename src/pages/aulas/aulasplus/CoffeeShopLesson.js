import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, View, Text, Image, Pressable, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Speech from 'expo-speech';
import * as ImagePicker from 'expo-image-picker';
import {
  createAudioPlayer,
  setAudioModeAsync,
  RecordingPresets,
  requestRecordingPermissionsAsync,
  useAudioRecorder,
} from 'expo-audio';
import { useVideoPlayer, VideoView } from 'expo-video';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scopedKey } from '../../../util/userScope';

// ---------- Bundled lesson assets ----------
const ITEM_IMAGES = {
  espresso: require('../../../../assets/Aula Cafeteria/img-espresso.jpg'),
  americano: require('../../../../assets/Aula Cafeteria/img-americano.jpg'),
  cappuccino: require('../../../../assets/Aula Cafeteria/img-cappuccino.jpg'),
  latte: require('../../../../assets/Aula Cafeteria/img-latte.jpg'),
  mocha: require('../../../../assets/Aula Cafeteria/img-mocha.jpg'),
  coldbrew: require('../../../../assets/Aula Cafeteria/img-coldbrew.jpg'),
  icedlatte: require('../../../../assets/Aula Cafeteria/img-icedlatte.jpg'),
  icedamericano: require('../../../../assets/Aula Cafeteria/img-icedamericano.jpg'),
  greentea: require('../../../../assets/Aula Cafeteria/img-greentea.jpg'),
  earlgrey: require('../../../../assets/Aula Cafeteria/img-earlgrey.jpg'),
  chamomile: require('../../../../assets/Aula Cafeteria/img-chamomile.jpg'),
  croissant: require('../../../../assets/Aula Cafeteria/img-croissant.jpg'),
  muffin: require('../../../../assets/Aula Cafeteria/img-muffin.jpg'),
  cinnamonroll: require('../../../../assets/Aula Cafeteria/img-cinnamonRoll.jpg'),
  cookie: require('../../../../assets/Aula Cafeteria/img-cookie.jpg'),
  brownie: require('../../../../assets/Aula Cafeteria/img-brownie.jpg'),
  bananabread: require('../../../../assets/Aula Cafeteria/img-bananabread.jpg'),
  sandwichham: require('../../../../assets/Aula Cafeteria/img-sandwichham.jpg'),
  sandwichturkey: require('../../../../assets/Aula Cafeteria/img-sandwichturkey.jpg'),
};

const IMAGES = {
  welcome: require('../../../../assets/Aula Cafeteria/img-welcome.jpg'),
  diningHere: require('../../../../assets/Aula Cafeteria/img-diningHere.jpeg'),
  diningTogo: require('../../../../assets/Aula Cafeteria/img-diningTogo.jpeg'),
  cashBill: require('../../../../assets/Aula Cafeteria/img-cashBill.jpg'),
  baristaTakingOrder: require('../../../../assets/Aula Cafeteria/img-barista-talking-an-order.jpeg'),
  paymentCash: require('../../../../assets/Aula Cafeteria/img-cash.jpeg'),
  paymentCard: require('../../../../assets/Aula Cafeteria/img-card.jpeg'),
};

const VIDEOS = {
  welcome: require('../../../../assets/Aula Cafeteria/video-welcome.mp4'),
  anythingElse: require('../../../../assets/Aula Cafeteria/video-anythingElse.mp4'),
  tap: require('../../../../assets/Aula Cafeteria/video-tap.mp4'),
  goodbye: require('../../../../assets/Aula Cafeteria/video-goodbye.mp4'),
  baristaAsking: require('../../../../assets/Aula Cafeteria/video-barista-asking.mp4'),
};

const FOLLOWUP_VIDEOS = {
  'shots-shot': require('../../../../assets/Aula Cafeteria/video-shots.mp4'),
  'sizeTemp-size': require('../../../../assets/Aula Cafeteria/video-size.mp4'),
  'sizeTemp-temperature': require('../../../../assets/Aula Cafeteria/video-hotIced.mp4'),
  'sizeOnly-size': require('../../../../assets/Aula Cafeteria/video-size.mp4'),
  'warm-warm': require('../../../../assets/Aula Cafeteria/video-warm.mp4'),
  'toast-toast': require('../../../../assets/Aula Cafeteria/video-toast.mp4'),
};

const HERES_YOUR_CHANGE_KEY = 'audioHeresYourChange';

const AUDIO_MAP = {
  Espresso: require('../../../../assets/Aula Cafeteria/audio-espresso.mp3'),
  Americano: require('../../../../assets/Aula Cafeteria/audio-americano.mp3'),
  Cappuccino: require('../../../../assets/Aula Cafeteria/audio-cappuccino.mp3'),
  Latte: require('../../../../assets/Aula Cafeteria/audio-latte.mp3'),
  Mocha: require('../../../../assets/Aula Cafeteria/audio-mocha.mp3'),
  'Cold Brew': require('../../../../assets/Aula Cafeteria/audio-coldbrew.mp3'),
  'Iced Latte': require('../../../../assets/Aula Cafeteria/audio-icedlatte.mp3'),
  'Iced Americano': require('../../../../assets/Aula Cafeteria/audio-icedamericano.mp3'),
  'Green Tea': require('../../../../assets/Aula Cafeteria/audio-greentea.mp3'),
  'Earl Grey Tea': require('../../../../assets/Aula Cafeteria/audio-earlgrey.mp3'),
  'Chamomile Tea': require('../../../../assets/Aula Cafeteria/audio-chamomile.mp3'),
  'Butter Croissant': require('../../../../assets/Aula Cafeteria/audio-croissant.mp3'),
  'Blueberry Muffin': require('../../../../assets/Aula Cafeteria/audio-muffin.mp3'),
  'Cinnamon Roll': require('../../../../assets/Aula Cafeteria/audio-cinnamonroll.mp3'),
  'Chocolate Chip Cookie': require('../../../../assets/Aula Cafeteria/audio-cookie.mp3'),
  Brownie: require('../../../../assets/Aula Cafeteria/audio-brownie.mp3'),
  'Banana Bread': require('../../../../assets/Aula Cafeteria/audio-bananabread.mp3'),
  'Ham & Cheese Sandwich': require('../../../../assets/Aula Cafeteria/audio-sandwichham.mp3'),
  'Turkey Sandwich': require('../../../../assets/Aula Cafeteria/audio-sandwichturkey.mp3'),

  'Can I have': require('../../../../assets/Aula Cafeteria/audio-phrase-canihave.mp3'),
  "I'll have": require('../../../../assets/Aula Cafeteria/audio-phrase-illhave.mp3'),
  "I'd like": require('../../../../assets/Aula Cafeteria/audio-phrase-idlike.mp3'),

  'Can I have a large iced latte, please?': require('../../../../assets/Aula Cafeteria/audio-example-canihave.mp3'),
  "I'll have a cappuccino and a croissant.": require('../../../../assets/Aula Cafeteria/audio-example-illhave.mp3'),
  "I'd like a medium hot americano, to go.": require('../../../../assets/Aula Cafeteria/audio-example-idlike.mp3'),

  "No, that's all.": require('../../../../assets/Aula Cafeteria/audio-nothatsall.mp3'),
  "We're gonna call your name when your order is ready.": require('../../../../assets/Aula Cafeteria/audio-callname.mp3'),
  'Thank you.': require('../../../../assets/Aula Cafeteria/audio-thankyou.mp3'),
  'Have a good one!': require('../../../../assets/Aula Cafeteria/audio-havegoodone.mp3'),
  Change: require('../../../../assets/Aula Cafeteria/audio-change.mp3'),
  [HERES_YOUR_CHANGE_KEY]: require('../../../../assets/Aula Cafeteria/audio-hereschange.mp3'),
};

const MENU_ITEMS = [
  { id: 'espresso', name: 'Espresso', category: 'coffee', followupType: 'shots', basePrice: 2.75 },
  { id: 'americano', name: 'Americano', category: 'coffee', followupType: 'sizeTemp', basePrice: 3.25 },
  { id: 'cappuccino', name: 'Cappuccino', category: 'coffee', followupType: 'sizeTemp', basePrice: 4.25 },
  { id: 'latte', name: 'Latte', category: 'coffee', followupType: 'sizeTemp', basePrice: 4.50 },
  { id: 'mocha', name: 'Mocha', category: 'coffee', followupType: 'sizeTemp', basePrice: 4.75 },
  { id: 'coldbrew', name: 'Cold Brew', category: 'cold', followupType: 'sizeOnly', basePrice: 4.00 },
  { id: 'icedlatte', name: 'Iced Latte', category: 'cold', followupType: 'sizeOnly', basePrice: 4.75 },
  { id: 'icedamericano', name: 'Iced Americano', category: 'cold', followupType: 'sizeOnly', basePrice: 3.75 },
  { id: 'greentea', name: 'Green Tea', category: 'tea', followupType: 'sizeTemp', basePrice: 3.00 },
  { id: 'earlgrey', name: 'Earl Grey Tea', category: 'tea', followupType: 'sizeTemp', basePrice: 3.00 },
  { id: 'chamomile', name: 'Chamomile Tea', category: 'tea', followupType: 'sizeTemp', basePrice: 3.00 },
  { id: 'croissant', name: 'Butter Croissant', category: 'bakery', followupType: 'warm', basePrice: 3.50 },
  { id: 'muffin', name: 'Blueberry Muffin', category: 'bakery', followupType: 'warm', basePrice: 3.25 },
  { id: 'cinnamonroll', name: 'Cinnamon Roll', category: 'bakery', followupType: 'warm', basePrice: 3.75 },
  { id: 'cookie', name: 'Chocolate Chip Cookie', category: 'sweets', followupType: 'none', basePrice: 2.25 },
  { id: 'brownie', name: 'Brownie', category: 'sweets', followupType: 'none', basePrice: 2.75 },
  { id: 'bananabread', name: 'Banana Bread', category: 'sweets', followupType: 'warm', basePrice: 3.25 },
  { id: 'sandwichham', name: 'Ham & Cheese Sandwich', category: 'kitchen', followupType: 'toast', basePrice: 6.50 },
  { id: 'sandwichturkey', name: 'Turkey Sandwich', category: 'kitchen', followupType: 'toast', basePrice: 6.75 },
];

const CATEGORIES = [
  { id: 'coffee', label: '☕ Coffee Classics' },
  { id: 'cold', label: '🧊 Cold Favorites' },
  { id: 'tea', label: '🍵 Tea Selection' },
  { id: 'bakery', label: '🥐 Fresh Bakery' },
  { id: 'sweets', label: '🍪 Sweet Treats' },
  { id: 'kitchen', label: '🥪 Café Kitchen' },
];

const FOLLOWUP_SEQUENCES = {
  shots: [{ key: 'shot', question: 'Single or double shot?', tip: 'A single shot contains one serving of espresso. A double shot contains two servings.', options: [{ value: 'single', label: 'Single shot' }, { value: 'double', label: 'Double shot' }] }],
  sizeTemp: [
    { key: 'size', question: 'What size would you like?', options: [{ value: 'small', label: 'Small' }, { value: 'medium', label: 'Medium' }, { value: 'large', label: 'Large' }] },
    { key: 'temperature', question: 'Hot or iced?', options: [{ value: 'hot', label: 'Hot' }, { value: 'iced', label: 'Iced' }] },
  ],
  sizeOnly: [{ key: 'size', question: 'What size would you like?', options: [{ value: 'small', label: 'Small' }, { value: 'medium', label: 'Medium' }, { value: 'large', label: 'Large' }] }],
  warm: [{ key: 'warm', question: 'Would you like it warmed up?', options: [{ value: 'yes', label: 'Yes, please.' }, { value: 'no', label: 'No, thanks.' }] }],
  toast: [{ key: 'toast', question: 'Would you like that toasted?', options: [{ value: 'yes', label: 'Yes, please.' }, { value: 'no', label: 'No, thanks.' }] }],
  none: [],
};

const ORDER_PHRASES = [
  { key: 'canihave', label: 'Can I have...' },
  { key: 'illhave', label: "I'll have..." },
  { key: 'idlike', label: "I'd like..." },
];

const BADGES = [
  { id: 'firstOrder', icon: '☕', name: 'First Order', desc: 'Placed your first café order.' },
  { id: 'cafeExplorer', icon: '☕', name: 'Café Explorer', desc: 'Browsed every menu category.' },
  { id: 'listeningPro', icon: '☕', name: 'Listening Pro', desc: 'Practiced pronunciation with the listen button.' },
  { id: 'speakingStar', icon: '☕', name: 'Speaking Star', desc: 'Recorded yourself speaking twice.' },
  { id: 'perfectCustomer', icon: '☕', name: 'Perfect Customer', desc: 'Completed the order like a pro.' },
];

const TRANSLATIONS = {
  'Anything else today?': 'Mais alguma coisa hoje?',
  'Anything to drink with that?': 'Algo para beber com isso?',
  'For here or to go?': 'Para comer aqui ou para levar?',
  'Cash or card?': 'Dinheiro ou cartão?',
  'Single or double shot?': 'Dose única ou dupla?',
  'What size would you like?': 'Qual tamanho você gostaria?',
  'Hot or iced?': 'Quente ou gelado?',
  'Would you like it warmed up?': 'Gostaria de esquentar?',
  'Would you like that toasted?': 'Gostaria que fosse tostado?',
  "We're gonna call your name when your order is ready.": 'Vamos chamar seu nome quando seu pedido estiver pronto.',
  'Thank you.': 'Obrigado(a).',
  'Have a good one!': 'Tenha um bom dia! (informal)',
  'Thank you, you too.': 'Obrigado(a), você também.',
  'Tap here.': 'Toque aqui.',
  'You paid with a $20 bill.': 'Você pagou com uma nota de $20.',
};

const COLORS = {
  bg: '#fdfcfb', card: '#fefdfc', border: '#e9e4de', primary: '#5a3d2b', primaryDark: '#432e21',
  green: '#4caf7d', greenBg: '#e3f6ec', red: '#d4634a', redBg: '#fbeae5', amberBg: '#faeecb',
  textMuted: '#8a8078', textDark: '#3a2f26',
};

function fmt(n) { return '$' + n.toFixed(2); }

function translate(text) {
  if (TRANSLATIONS[text]) return TRANSLATIONS[text];
  for (const k of Object.keys(TRANSLATIONS)) if (text.startsWith(k)) return TRANSLATIONS[k];
  return '';
}

function speak(text) {
  Speech.stop();
  Speech.speak(text, { language: 'en-US', rate: 0.95 });
}

function formatDuration(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const sec = totalSeconds % 60;
  return `${m}:${String(sec).padStart(2, '0')}`;
}

const CORRECT_SOUND_SOURCE = require('../../../../assets/sounds/correct.wav');
let correctSoundPlayer = null;

function playCorrectSound() {
  try {
    if (!correctSoundPlayer) {
      correctSoundPlayer = createAudioPlayer(CORRECT_SOUND_SOURCE);
    }
    correctSoundPlayer.seekTo(0);
    correctSoundPlayer.play();
  } catch (e) {}
}

let currentPlayer = null;

function playRecordedAudio(asset) {
  if (currentPlayer) {
    const toRemove = currentPlayer;
    currentPlayer = null;
    try { toRemove.pause(); } catch (e) {}
    try { toRemove.remove(); } catch (e) {}
  }
  const player = createAudioPlayer(asset);
  currentPlayer = player;
  player.play();
}

function listenTo(text, audioKey) {
  Speech.stop();
  const asset = AUDIO_MAP[audioKey || text];
  if (asset) {
    try {
      playRecordedAudio(asset);
    } catch (e) {
      speak(text);
    }
  } else {
    speak(text);
  }
}

// ---------- Reusable primitives ----------
function PrimaryButton({ label, onPress, disabled, style, textStyle }) {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={[styles.primaryButton, disabled && styles.primaryButtonDisabled, style]}>
      <Text style={[styles.primaryButtonText, textStyle]}>{label}</Text>
    </Pressable>
  );
}

function OptionButton({ label, onPress, selected, style }) {
  return (
    <Pressable onPress={onPress} style={[styles.optionButton, selected && styles.optionButtonSelected, style]}>
      <Text style={styles.optionButtonText}>{label}</Text>
    </Pressable>
  );
}

function ListenButton({ text, audioKey, size = 44 }) {
  return (
    <Pressable onPress={() => listenTo(text, audioKey)} style={[styles.listenButton, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={{ fontSize: size * 0.4 }}>🔊</Text>
    </Pressable>
  );
}

function TranslateToggle({ visible, onToggle }) {
  return (
    <Pressable onPress={onToggle} style={styles.translateToggle}>
      <Text style={{ fontSize: 11, opacity: 0.6 }}>🌐</Text>
    </Pressable>
  );
}

function BaristaBubble({ text, showTranslation, ptOverride }) {
  const pt = ptOverride || translate(text);
  return (
    <View style={styles.bubble}>
      <Text style={styles.bubbleText}>🗣️ {text}</Text>
      {showTranslation && !!pt && <Text style={styles.bubblePt}>{pt}</Text>}
    </View>
  );
}

function MediaImage({ asset, aspectRatio = 1 }) {
  return (
    <View style={[styles.mediaSlot, styles.mediaFilled, { aspectRatio }]}>
      <Image source={asset} style={styles.mediaFilledInner} resizeMode="cover" />
    </View>
  );
}

function MediaVideo({ asset, aspectRatio = 16 / 9 }) {
  const player = useVideoPlayer(asset, p => {
    p.loop = true;
    p.play();
  });

  return (
    <View style={[styles.mediaSlot, styles.mediaFilled, styles.videoFrame, { aspectRatio }]}>
      <VideoView
        player={player}
        style={styles.mediaFilledInner}
        contentFit="cover"
        nativeControls
        allowsPictureInPicture={false}
      />
    </View>
  );
}

function MediaSlot({ uri, onPick, placeholder, aspectRatio = 16 / 9 }) {
  const pick = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) return;
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images', 'videos'], quality: 0.8 });
    if (!result.canceled) onPick(result.assets[0].uri);
  };
  return (
    <Pressable onPress={pick} style={[styles.mediaSlot, { aspectRatio }]}>
      <Text style={styles.mediaSlotText}>{uri ? '✓ Media selected — tap to replace' : placeholder}</Text>
    </Pressable>
  );
}

function FeedbackModal({ feedback, onDismiss }) {
  if (!feedback) return null;
  const isCorrect = feedback.correct;
  return (
    <View style={styles.modalOverlay}>
      <View style={[styles.modalCard, { borderColor: isCorrect ? COLORS.green : COLORS.red }]}>
        <Text style={{ fontSize: 20 }}>{isCorrect ? '✅' : '❌'}</Text>
        <Text style={[styles.modalTitle, { color: isCorrect ? COLORS.green : COLORS.red }]}>{isCorrect ? 'Correto!' : 'Não é bem isso'}</Text>
        <Text style={styles.modalMessage}>{feedback.message}</Text>
        <PrimaryButton label="Continuar" onPress={onDismiss} />
      </View>
    </View>
  );
}

function BadgeModal({ badge, onDismiss }) {
  if (!badge) return null;
  return (
    <View style={styles.modalOverlay}>
      <View style={[styles.modalCard, { borderColor: COLORS.green }]}>
        <View style={styles.badgeIconCircle}><Text style={{ fontSize: 30 }}>{badge.icon}</Text></View>
        <Text style={styles.modalEyebrow}>Badge Unlocked</Text>
        <Text style={styles.modalTitle}>{badge.name}</Text>
        <Text style={styles.modalMessage}>{badge.desc}</Text>
        <PrimaryButton label="Nice!" onPress={onDismiss} />
      </View>
    </View>
  );
}

// ---------- Main App ----------
export default function CoffeeShopLesson({ navigation }) {
  const [stage, setStage] = useState('welcome');
  const [stageHistory, setStageHistory] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('coffee');
  const [activeDraft, setActiveDraft] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [postMenuDestination, setPostMenuDestination] = useState('orderPhrase');
  const [orderPhrase, setOrderPhrase] = useState(null);
  const [priceSaying, setPriceSaying] = useState(null);
  const [diningOption, setDiningOption] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [recording, setRecording] = useState(false);
  const [recordedOk, setRecordedOk] = useState(false);
  const [recordedUri, setRecordedUri] = useState(null);
  const [tapConfirmed, setTapConfirmed] = useState(false);
  const [tapQuizCorrect, setTapQuizCorrect] = useState(false);
  const [tapQuizWrong, setTapQuizWrong] = useState(null);
  const [goodbyeQuizCorrect, setGoodbyeQuizCorrect] = useState(false);
  const [goodbyeQuizWrong, setGoodbyeQuizWrong] = useState(null);
  const [answerFeedback, setAnswerFeedback] = useState(null);
  const [xp, setXp] = useState(0);
  const [streakCount, setStreakCount] = useState(0);
  const [badges, setBadges] = useState({ firstOrder: false, cafeExplorer: false, listeningPro: false, speakingStar: false, perfectCustomer: false });
  const [celebratingBadge, setCelebratingBadge] = useState(null);
  const [visitedCategories, setVisitedCategories] = useState(['coffee']);
  const [listenCount, setListenCount] = useState(0);
  const [recordSuccesses, setRecordSuccesses] = useState(0);
  const [transcript, setTranscript] = useState([]);
  const [media, setMedia] = useState({});
  const [showTranslation, setShowTranslation] = useState(false);
  const [goodbyeChunkPt, setGoodbyeChunkPt] = useState({});
  const [showChangePt, setShowChangePt] = useState(false);
  const recorder = useAudioRecorder({ ...RecordingPresets.HIGH_QUALITY, isMeteringEnabled: true });
  // own stopwatch for the live counter: native durationMillis polling doesn't tick
  // smoothly in real time on all devices, so we track elapsed time in JS instead.
  const [recElapsedMs, setRecElapsedMs] = useState(0);
  const recStartRef = useRef(0);
  const liveSeconds = Math.floor(recElapsedMs / 1000);

  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem(await scopedKey('coffeeLessonStreak'));
      if (raw) { const data = JSON.parse(raw); setStreakCount(data.count || 0); }
    })();
    setAudioModeAsync({ playsInSilentMode: true }).catch(() => {});
    return () => {
      Speech.stop();
      if (currentPlayer) { try { currentPlayer.remove(); } catch (e) {} }
      recorder.stop().catch(() => {});
    };
  }, []);

  // ticks recElapsedMs every 200ms for as long as a recording is active
  useEffect(() => {
    if (!recording) return undefined;
    recStartRef.current = Date.now();
    setRecElapsedMs(0);
    const id = setInterval(() => setRecElapsedMs(Date.now() - recStartRef.current), 200);
    return () => clearInterval(id);
  }, [recording]);

  function goToStage(next, extraState = {}) {
    Speech.stop();
    setStageHistory(h => [...h, stage]);
    setStage(next);
    Object.entries(extraState).forEach(([k, v]) => {
      const setters = {
        priceSaying: setPriceSaying, recordedOk: setRecordedOk, diningOption: setDiningOption,
        paymentMethod: setPaymentMethod, tapConfirmed: setTapConfirmed, tapQuizCorrect: setTapQuizCorrect,
        tapQuizWrong: setTapQuizWrong, goodbyeQuizCorrect: setGoodbyeQuizCorrect, goodbyeQuizWrong: setGoodbyeQuizWrong,
        postMenuDestination: setPostMenuDestination, activeDraft: setActiveDraft,
      };
      if (setters[k]) setters[k](v);
    });
  }

  function goBack() {
    if (!stageHistory.length) return;
    Speech.stop();
    const prev = stageHistory[stageHistory.length - 1];
    setStageHistory(h => h.slice(0, -1));
    setStage(prev);
  }

  function logTurn(speaker, text) { setTranscript(t => [...t, { speaker, text }]); }
  function addXp(n) { playCorrectSound(); setXp(x => x + n); }

  function unlockBadge(id) {
    if (badges[id]) return;
    setBadges(b => ({ ...b, [id]: true }));
    setCelebratingBadge(BADGES.find(b => b.id === id));
  }

  function listenAndTrack(text) {
    speak(text);
    const next = listenCount + 1;
    setListenCount(next);
    if (next >= 6) unlockBadge('listeningPro');
  }

  function selectCategory(id) {
    const allVisited = new Set([...visitedCategories, id]).size === CATEGORIES.length;
    setActiveCategory(id);
    setVisitedCategories(v => v.includes(id) ? v : [...v, id]);
    if (allVisited) unlockBadge('cafeExplorer');
  }

  function computePrice(item, answers) {
    let p = item.basePrice;
    if (answers.size === 'small') p -= 0.5;
    if (answers.size === 'large') p += 0.75;
    if (answers.shot === 'double') p += 1.0;
    return Math.round(p * 100) / 100;
  }

  function itemBaseLabel(entry) {
    const it = MENU_ITEMS.find(m => m.id === entry.id);
    if (entry.followupType === 'shots') return (entry.shot === 'double' ? 'Double' : 'Single') + ' Shot ' + it.name;
    if (entry.followupType === 'sizeTemp' || entry.followupType === 'sizeOnly') {
      const sizeLabel = entry.size ? entry.size[0].toUpperCase() + entry.size.slice(1) : '';
      const tempLabel = entry.temperature === 'iced' ? 'Iced ' : '';
      return (sizeLabel ? sizeLabel + ' ' : '') + tempLabel + it.name;
    }
    if (entry.followupType === 'warm') return (entry.warm === 'yes' ? 'Warmed ' : '') + it.name;
    if (entry.followupType === 'toast') return (entry.toast === 'yes' ? 'Toasted ' : '') + it.name;
    return it.name;
  }

  function itemPhrasePart(entry) {
    const it = MENU_ITEMS.find(m => m.id === entry.id);
    const name = it.name.toLowerCase();
    if (entry.followupType === 'shots') return 'a ' + (entry.shot === 'double' ? 'double-shot' : 'single-shot') + ' espresso';
    if (entry.followupType === 'sizeTemp' || entry.followupType === 'sizeOnly') {
      const temp = entry.temperature === 'iced' ? 'iced ' : '';
      return 'a ' + (entry.size || 'medium') + ' ' + temp + name;
    }
    if (entry.followupType === 'warm') return entry.warm === 'yes' ? 'a warmed-up ' + name : 'a ' + name;
    if (entry.followupType === 'toast') return entry.toast === 'yes' ? 'a toasted ' + name : 'a ' + name;
    return 'a ' + name;
  }

  function selectItem(item) {
    const seq = FOLLOWUP_SEQUENCES[item.followupType];
    if (!seq.length) {
      const isFirst = selectedItems.length === 0;
      const price = computePrice(item, {});
      setSelectedItems(s => [...s, { uid: item.id + '-' + Date.now(), id: item.id, followupType: item.followupType, price }]);
      addXp(15);
      if (isFirst) unlockBadge('firstOrder');
      return;
    }
    goToStage('itemFollowup', { activeDraft: { item, answers: {}, stepIndex: 0 } });
    logTurn('barista', seq[0].question);
  }

  function chooseFollowupOption(value, label) {
    const draft = activeDraft;
    const seq = FOLLOWUP_SEQUENCES[draft.item.followupType];
    const step = seq[draft.stepIndex];
    const answers = { ...draft.answers, [step.key]: value };
    logTurn('learner', label);
    const nextIndex = draft.stepIndex + 1;
    if (nextIndex < seq.length) {
      setActiveDraft({ ...draft, answers, stepIndex: nextIndex });
      logTurn('barista', seq[nextIndex].question);
    } else {
      const isFirst = selectedItems.length === 0;
      const price = computePrice(draft.item, answers);
      const entry = { uid: draft.item.id + '-' + Date.now(), id: draft.item.id, followupType: draft.item.followupType, price, ...answers };
      setSelectedItems(s => [...s, entry]);
      setActiveDraft(null);
      goToStage('menuBrowse');
      addXp(15);
      if (isFirst) unlockBadge('firstOrder');
    }
  }

  function removeOneOfItem(itemId) {
    setSelectedItems(s => {
      const idx = [...s].reverse().findIndex(i => i.id === itemId);
      if (idx === -1) return s;
      const realIdx = s.length - 1 - idx;
      const next = [...s]; next.splice(realIdx, 1); return next;
    });
  }

  function orderTotal() { return Math.round(selectedItems.reduce((a, i) => a + i.price, 0) * 100) / 100; }

  function toThatsIt() { goToStage('anythingElseChoice'); logTurn('barista', 'Anything else today?'); }
  function anythingElseYes() { logTurn('learner', 'Yes, please.'); goToStage('menuBrowse'); }
  function anythingElseNo() {
    logTurn('learner', "That's all.");
    goToStage(postMenuDestination === 'orderPhrase' ? 'orderPhrase' : 'anythingElseFinal');
    if (postMenuDestination !== 'orderPhrase') logTurn('barista', 'Anything else today?');
  }

  function chooseOrderPhrase(key, label) { setOrderPhrase(key); goToStage('speakOrder'); logTurn('learner', label); addXp(10); }

  // real microphone recording for the "Record" practice prompts
  async function toggleRecord() {
    if (recording) {
      try {
        await recorder.stop();
        await setAudioModeAsync({ allowsRecording: false, playsInSilentMode: true });
        const status = recorder.getStatus();
        const uri = recorder.uri ?? status.url;
        setRecordedUri(uri || null);
      } catch (e) {}
      setRecording(false); setRecordedOk(true);
      setRecordSuccesses(n => { const next = n + 1; if (next >= 2) unlockBadge('speakingStar'); return next; });
      addXp(20);
      return;
    }
    // flip the UI on immediately so the recording indicator (and the stopwatch
    // effect keyed on `recording`) don't wait on the native setup round trip below
    setRecording(true); setRecordedOk(false); setRecordedUri(null);
    try {
      const { granted } = await requestRecordingPermissionsAsync();
      if (!granted) {
        setRecording(false);
        Alert.alert('Permissão necessária', 'Permita o uso do microfone para gravar sua voz.');
        return;
      }
      Speech.stop();
      if (currentPlayer) {
        const toRemove = currentPlayer;
        currentPlayer = null;
        try { toRemove.pause(); } catch (e) {}
        try { toRemove.remove(); } catch (e) {}
      }
      await setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });
      await recorder.prepareToRecordAsync();
      recorder.record();
    } catch (e) {
      setRecording(false);
      Alert.alert('Erro', 'Não foi possível iniciar a gravação.');
    }
  }

  function playMyRecording() {
    if (recordedUri) playRecordedAudio({ uri: recordedUri });
  }

  function RecordControl() {
    return (
      <>
        <Pressable onPress={toggleRecord} style={[styles.recordButton, recordedOk && styles.recordButtonDone]}>
          <Text style={styles.recordButtonText}>{recording ? `⏺ Recording...  ${formatDuration(liveSeconds)}` : recordedOk ? '✓ Recorded' : '🎙️ Record'}</Text>
        </Pressable>
        {recordedOk && !!recordedUri && (
          <Pressable onPress={playMyRecording} style={styles.playbackButton}>
            <Text style={styles.playbackButtonText}>▶ Play my recording</Text>
          </Pressable>
        )}
      </>
    );
  }

  function makeYourOrder() {
    const pastryOnly = selectedItems.length > 0 && selectedItems.every(i => ['bakery', 'sweets', 'kitchen'].includes(MENU_ITEMS.find(m => m.id === i.id).category));
    if (pastryOnly) { goToStage('addonOffer'); logTurn('barista', 'Anything to drink with that?'); }
    else { goToStage('anythingElseFinal'); logTurn('barista', 'Anything else today?'); }
  }

  function addonNo() { logTurn('learner', 'No thanks.'); goToStage('anythingElseFinal'); logTurn('barista', 'Anything else today?'); }
  function addonYes() { logTurn('learner', 'Yes, see the menu again.'); goToStage('menuBrowse', { postMenuDestination: 'final' }); }
  function continueToDining() { logTurn('learner', "No, that's all."); goToStage('diningChoice'); logTurn('barista', 'For here or to go?'); }

  function chooseDining(opt) {
    logTurn('learner', opt === 'here' ? 'For here.' : 'To go.');
    addXp(5);
    goToStage('totalCheck', { diningOption: opt, priceSaying: null, recordedOk: false });
    logTurn('barista', "That'll be " + fmt(orderTotal()) + '.');
  }

  function priceSentenceFor(key) {
    const total = fmt(orderTotal());
    const map = { thatllbe: "That'll be " + total + '.', yourtotalis: 'Your total is ' + total + '.', thatcomesto: 'That comes to ' + total + '.' };
    return map[key] || '';
  }

  function choosePriceSaying(key) { setPriceSaying(key); setRecordedOk(false); addXp(10); }

  function continueAfterPrice() {
    logTurn('learner', priceSentenceFor(priceSaying));
    goToStage('paymentChoice');
    logTurn('barista', 'Cash or card?');
  }

  function choosePayment(method) {
    logTurn('learner', method === 'card' ? 'Card, please.' : 'Cash, please.');
    addXp(5);
    goToStage(method === 'card' ? 'cardTap' : 'cashPaid', { paymentMethod: method, tapConfirmed: false, tapQuizCorrect: false, tapQuizWrong: null });
    if (method === 'card') logTurn('barista', 'Tap here.');
  }

  function tapTerminal() {
    if (tapConfirmed) return;
    setTapConfirmed(true); addXp(10);
  }

  function answerTapQuiz(key) {
    const explain = {
      correct: 'Correto! Para pagar com aproximação, basta encostar o cartão ou celular na maquininha por um segundo — não precisa inserir nem digitar senha.',
      wrong1: 'Não é isso. "Insert" seria para cartão com chip, mas aqui a pergunta é sobre pagamento por aproximação (tap).',
      wrong2: 'Não é isso. Assinar um recibo de papel não é como funciona o pagamento por aproximação (tap).',
    };
    if (key === 'correct') { setTapQuizCorrect(true); setTapQuizWrong(null); addXp(10); } else setTapQuizWrong(key);
    setAnswerFeedback({ correct: key === 'correct', message: explain[key] });
  }

  function cardContinue1() { goToStage('cardGoodbye', { goodbyeQuizCorrect: false, goodbyeQuizWrong: null }); logTurn('barista', "We're gonna call your name when your order is ready."); }
  function cashContinue() { goToStage('cashGoodbye', { goodbyeQuizCorrect: false, goodbyeQuizWrong: null }); logTurn('barista', "We're gonna call your name when your order is ready."); }

  function answerGoodbyeQuiz(key) {
    const explain = {
      correct: '"You too!" é a resposta natural e educada para "Have a good one" — significa "Você também!".',
      wrong1: 'Não é isso. "Yes, I have one" não faz sentido aqui — "Have a good one" não é uma pergunta.',
      wrong2: "Não é isso. \"No, I don't\" também não faz sentido — a frase é uma despedida educada.",
    };
    if (key === 'correct') { setGoodbyeQuizCorrect(true); setGoodbyeQuizWrong(null); addXp(10); } else setGoodbyeQuizWrong(key);
    setAnswerFeedback({ correct: key === 'correct', message: explain[key] });
  }

  async function goodbyeSaid() {
    logTurn('learner', 'Thank you, you too.');
    addXp(10);
    try {
      const todayStr = new Date().toDateString();
      const key = await scopedKey('coffeeLessonStreak');
      const raw = await AsyncStorage.getItem(key);
      let data = raw ? JSON.parse(raw) : { lastDate: null, count: 0 };
      if (data.lastDate !== todayStr) {
        const last = data.lastDate ? new Date(data.lastDate) : null;
        const diff = last ? new Date(todayStr) - last : Infinity;
        const isConsecutive = diff > 0 && diff <= 86400000 * 1.5;
        data = { lastDate: todayStr, count: isConsecutive ? data.count + 1 : 1 };
        await AsyncStorage.setItem(key, JSON.stringify(data));
      }
      setStreakCount(data.count);
    } catch (e) {}
    unlockBadge('perfectCustomer');
    goToStage('review');
  }

  function practiceAgain() {
    if (recording) recorder.stop().catch(() => {});
    setStage('welcome'); setStageHistory([]); setSelectedItems([]); setActiveCategory('coffee'); setActiveDraft(null);
    setCartOpen(false); setPostMenuDestination('orderPhrase'); setOrderPhrase(null); setPriceSaying(null);
    setDiningOption(null); setPaymentMethod(null); setRecording(false); setRecordedOk(false); setRecordedUri(null); setTapConfirmed(false);
    setTapQuizCorrect(false); setTapQuizWrong(null); setGoodbyeQuizCorrect(false); setGoodbyeQuizWrong(null);
    setXp(0); setTranscript([]); setVisitedCategories(['coffee']); setListenCount(0); setRecordSuccesses(0);
  }

  const STAGE_PROGRESS = { welcome: 0, menuIntro: 5, menuBrowse: 20, itemFollowup: 20, anythingElseChoice: 22, orderPhrase: 40, speakOrder: 50, addonOffer: 55, anythingElseFinal: 62, diningChoice: 72, totalCheck: 82, paymentChoice: 90, cardTap: 94, cardGoodbye: 97, cashPaid: 94, cashGoodbye: 97, review: 100 };
  const progressPercent = STAGE_PROGRESS[stage] ?? 0;
  const total = orderTotal();
  const change = Math.max(0, Math.round((20 - total) * 100) / 100);
  const cartItems = selectedItems.map(e => ({ uid: e.uid, label: itemBaseLabel(e), priceLabel: fmt(e.price) }));

  function Header() {
    return (
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={{ fontSize: 16, color: COLORS.primary }}>✕</Text>
        </Pressable>
        {stage !== 'welcome' && (
          <>
            {stageHistory.length > 0 && stage !== 'review' && (
              <Pressable onPress={goBack} style={styles.backButton}><Text style={{ fontSize: 16, color: COLORS.primary }}>←</Text></Pressable>
            )}
            <View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${progressPercent}%` }]} /></View>
            {streakCount > 0 && <Text style={styles.headerChip}>🔥{streakCount}</Text>}
            <Text style={styles.headerChip}>⚡ {xp} XP</Text>
            <Pressable onPress={() => setShowTranslation(v => !v)} style={[styles.ptButton, showTranslation && styles.ptButtonActive]}>
              <Text style={[styles.ptButtonText, showTranslation && { color: '#fff' }]}>🌐 PT</Text>
            </Pressable>
          </>
        )}
      </View>
    );
  }

  function renderScreen() {
    switch (stage) {
      case 'welcome':
        return (
          <View style={{ flex: 1 }}>
            <MediaImage asset={IMAGES.welcome} aspectRatio={572 / 800} />
            <View style={styles.section}>
              <Text style={styles.h1}>Buy Coffee Confidently in English</Text>
              <Text style={styles.bodyText}>Order drinks and food like a regular at a real café — vocabulary, listening, and speaking, all in one visit.</Text>
              {streakCount > 0 && <Text style={styles.streakLine}>🔥 {streakCount}-day streak — keep it going</Text>}
              <PrimaryButton label="Let's Have Coffee ☕" onPress={() => goToStage('menuIntro')} />
            </View>
          </View>
        );

      case 'menuIntro':
        return (
          <View style={styles.section}>
            <MediaVideo asset={VIDEOS.welcome} />
            <Text style={styles.bodyTextCenter}>Take a look at what's on the menu today.</Text>
            <PrimaryButton label="See Menu" onPress={() => goToStage('menuBrowse')} />
          </View>
        );

      case 'menuBrowse': {
        const items = MENU_ITEMS.filter(i => i.category === activeCategory);
        const countIn = (id) => selectedItems.filter(i => i.id === id).length;
        return (
          <View style={{ flex: 1 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow} contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}>
              {CATEGORIES.map(c => (
                <Pressable key={c.id} onPress={() => selectCategory(c.id)} style={[styles.categoryPill, activeCategory === c.id && styles.categoryPillActive]}>
                  <Text style={[styles.categoryPillText, activeCategory === c.id && { color: '#fff' }]}>{c.label}</Text>
                </Pressable>
              ))}
            </ScrollView>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.menuGrid}>
              {items.map(item => {
                const count = countIn(item.id);
                return (
                  <View key={item.id} style={styles.menuCard}>
                    {count > 0 && <View style={styles.menuBadge}><Text style={styles.menuBadgeText}>{count}</Text></View>}
                    {ITEM_IMAGES[item.id]
                      ? <MediaImage asset={ITEM_IMAGES[item.id]} aspectRatio={1} />
                      : <MediaSlot uri={media['item-' + item.id]} onPick={u => setMedia(m => ({ ...m, ['item-' + item.id]: u }))} placeholder="Photo" aspectRatio={1} />}
                    <Text style={styles.menuItemName}>{item.name}</Text>
                    <Text style={styles.menuItemPrice}>{fmt(item.basePrice)}+</Text>
                    <View style={{ flexDirection: 'row', gap: 6 }}>
                      <ListenButton text={item.name} size={36} />
                      <Pressable onPress={() => selectItem(item)} style={styles.addButton}><Text style={styles.addButtonText}>Add +</Text></Pressable>
                      {count > 0 && <Pressable onPress={() => removeOneOfItem(item.id)} style={styles.removeButton}><Text>🗑</Text></Pressable>}
                    </View>
                  </View>
                );
              })}
            </ScrollView>
            <View style={styles.cartBar}>
              <Pressable onPress={() => setCartOpen(v => !v)} style={styles.cartToggle}><Text style={styles.cartToggleText}>🛍️ {selectedItems.length} · {fmt(total)}</Text></Pressable>
              <PrimaryButton label="That's It" onPress={toThatsIt} style={{ flex: 1, backgroundColor: COLORS.green }} />
            </View>
            {cartOpen && (
              <View style={styles.cartDrawer}>
                {cartItems.length === 0 && <Text style={styles.emptyCartText}>Your order is empty — tap "Add +" on something tasty!</Text>}
                {cartItems.map(ci => <Text key={ci.uid} style={styles.cartLine}>{ci.label} — {ci.priceLabel}</Text>)}
              </View>
            )}
          </View>
        );
      }

      case 'itemFollowup': {
        if (!activeDraft) return null;
        const seq = FOLLOWUP_SEQUENCES[activeDraft.item.followupType];
        const step = seq[activeDraft.stepIndex];
        const followupVideo = FOLLOWUP_VIDEOS[activeDraft.item.followupType + '-' + step.key];
        return (
          <View style={styles.section}>
            {followupVideo
              ? <MediaVideo asset={followupVideo} />
              : <MediaSlot uri={media['followup-' + activeDraft.item.id]} onPick={u => setMedia(m => ({ ...m, ['followup-' + activeDraft.item.id]: u }))} placeholder="Video of the barista asking" />}
            <Text style={styles.eyebrow}>{activeDraft.item.name}</Text>
            <BaristaBubble text={step.question} showTranslation={showTranslation} />
            {step.options.map(o => <OptionButton key={o.value} label={o.label} onPress={() => chooseFollowupOption(o.value, o.label)} />)}
            {!!step.tip && <Text style={styles.tipText}>💡 {step.tip}</Text>}
          </View>
        );
      }

      case 'anythingElseChoice':
        return (
          <View style={styles.section}>
            <MediaVideo asset={VIDEOS.anythingElse} />
            <BaristaBubble text="Anything else today?" showTranslation={showTranslation} />
            <OptionButton label="Yes, please." onPress={anythingElseYes} />
            <OptionButton label="That's all." onPress={anythingElseNo} />
          </View>
        );

      case 'orderPhrase':
        return (
          <View style={styles.section}>
            <MediaImage asset={IMAGES.baristaTakingOrder} aspectRatio={16 / 9} />
            <Text style={styles.bodyTextCenter}>Três maneiras de fazer o pedido em inglês. Escute e escolha a que você mais gosta.</Text>
            {ORDER_PHRASES.map(p => (
              <View key={p.key} style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                <ListenButton text={p.label.replace('...', '')} />
                <OptionButton label={p.label} onPress={() => chooseOrderPhrase(p.key, p.label)} style={{ flex: 1 }} />
              </View>
            ))}
            <Text style={styles.eyebrow}>Examples</Text>
            {['Can I have a large iced latte, please?', "I'll have a cappuccino and a croissant.", "I'd like a medium hot americano, to go."].map(ex => (
              <View key={ex} style={styles.exampleRow}>
                <Text style={{ flex: 1 }}>{ex}</Text>
                <ListenButton text={ex} size={34} />
              </View>
            ))}
          </View>
        );

      case 'speakOrder': {
        const phraseMap = { canihave: 'Can I have', illhave: "I'll have", idlike: "I'd like" };
        const parts = selectedItems.map(itemPhrasePart);
        let joined = '';
        if (parts.length === 1) joined = parts[0];
        else if (parts.length > 1) joined = parts.slice(0, -1).join(', ') + ' and ' + parts[parts.length - 1];
        const sentence = orderPhrase ? phraseMap[orderPhrase] + (joined ? ' ' + joined : '') + '.' : '';
        return (
          <View style={[styles.section, { alignItems: 'center' }]}>
            <View style={styles.sentenceBox}><Text style={styles.sentenceText}>{sentence}</Text></View>
            <ListenButton text={sentence} size={52} />
            <RecordControl />
            <PrimaryButton label="Make Your Order" onPress={makeYourOrder} disabled={!recordedOk} />
          </View>
        );
      }

      case 'addonOffer':
        return (
          <View style={styles.section}>
            <MediaVideo asset={VIDEOS.baristaAsking} />
            <BaristaBubble text="Anything to drink with that?" showTranslation={showTranslation} />
            <OptionButton label="No thanks." onPress={addonNo} />
            <OptionButton label="Yes, see the menu again." onPress={addonYes} />
          </View>
        );

      case 'anythingElseFinal':
        return (
          <View style={[styles.section, { alignItems: 'center' }]}>
            <MediaVideo asset={VIDEOS.anythingElse} />
            <BaristaBubble text="Anything else today?" showTranslation={showTranslation} />
            <Text style={styles.sentenceTextSmall}>"No, that's all."</Text>
            <Text style={styles.hintText}>🎙️ Now it's your turn — record yourself saying it.</Text>
            <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
              <ListenButton text="No, that's all." />
            </View>
            <RecordControl />
            <PrimaryButton label="Continue" onPress={continueToDining} />
          </View>
        );

      case 'diningChoice':
        return (
          <View style={styles.section}>
            <BaristaBubble text="For here or to go?" showTranslation={showTranslation} />
            <View style={{ flexDirection: 'row', gap: 14 }}>
              <Pressable onPress={() => chooseDining('here')} style={styles.choiceCard}>
                <MediaImage asset={IMAGES.diningHere} aspectRatio={1} />
                <Text style={styles.choiceCardLabel}>For Here</Text>
              </Pressable>
              <Pressable onPress={() => chooseDining('togo')} style={styles.choiceCard}>
                <MediaImage asset={IMAGES.diningTogo} aspectRatio={1} />
                <Text style={styles.choiceCardLabel}>To Go</Text>
              </Pressable>
            </View>
          </View>
        );

      case 'totalCheck': {
        const sayings = [
          { key: 'thatllbe', label: "That'll be " + fmt(total) + '.' },
          { key: 'yourtotalis', label: 'Your total is ' + fmt(total) + '.' },
          { key: 'thatcomesto', label: 'That comes to ' + fmt(total) + '.' },
        ];
        const sentence = priceSaying ? priceSentenceFor(priceSaying) : '';
        return (
          <View style={[styles.section, { alignItems: 'center' }]}>
            <View style={styles.receiptBox}>
              <Text style={styles.eyebrow}>Your Receipt</Text>
              {cartItems.map(ci => <View key={ci.uid} style={styles.receiptRow}><Text>{ci.label}</Text><Text style={styles.receiptMuted}>{ci.priceLabel}</Text></View>)}
              <View style={styles.receiptDivider} />
              <View style={styles.receiptRow}><Text style={styles.receiptTotalLabel}>Total</Text><Text style={styles.receiptTotalLabel}>{fmt(total)}</Text></View>
            </View>
            <Text style={styles.bodyTextBold}>Ways a barista says the price</Text>
            {sayings.map(s => (
              <View key={s.key} style={{ flexDirection: 'row', gap: 8, alignItems: 'center', width: '100%' }}>
                <ListenButton text={s.label} />
                <OptionButton label={s.label} onPress={() => choosePriceSaying(s.key)} selected={priceSaying === s.key} style={{ flex: 1 }} />
              </View>
            ))}
            {!!priceSaying && (
              <View style={{ alignItems: 'center', gap: 12, width: '100%' }}>
                <View style={styles.sentenceBox}><Text style={styles.sentenceText}>{sentence}</Text></View>
                <ListenButton text={sentence} size={52} />
                <RecordControl />
                <PrimaryButton label="Continue" onPress={continueAfterPrice} disabled={!recordedOk} />
              </View>
            )}
          </View>
        );
      }

      case 'paymentChoice':
        return (
          <View style={styles.section}>
            <BaristaBubble text="Cash or card?" showTranslation={showTranslation} />
            <View style={{ flexDirection: 'row', gap: 14 }}>
              <Pressable onPress={() => choosePayment('cash')} style={styles.choiceCard}>
                <MediaImage asset={IMAGES.paymentCash} aspectRatio={1} />
                <Text style={styles.choiceCardLabel}>Cash</Text>
              </Pressable>
              <Pressable onPress={() => choosePayment('card')} style={styles.choiceCard}>
                <MediaImage asset={IMAGES.paymentCard} aspectRatio={1} />
                <Text style={styles.choiceCardLabel}>Card</Text>
              </Pressable>
            </View>
          </View>
        );

      case 'cardTap': {
        const tapOptions = [
          { key: 'wrong1', label: 'Insert your card into the machine.' },
          { key: 'correct', label: 'Hold your card or phone near the reader.' },
          { key: 'wrong2', label: 'Sign a paper receipt.' },
        ];
        return (
          <View style={[styles.section, { alignItems: 'center' }]}>
            <MediaVideo asset={VIDEOS.tap} />
            <BaristaBubble text="Tap here." showTranslation={showTranslation} />
            <Pressable onPress={tapTerminal} style={[styles.tapCircle, tapConfirmed && styles.tapCircleConfirmed]}>
              <Text style={{ fontSize: 38 }}>{tapConfirmed ? '✅' : '💳'}</Text>
              <Text style={styles.tapLabel}>{tapConfirmed ? 'Approved' : 'Tap card'}</Text>
            </Pressable>
            <View style={{ flexDirection: 'row', gap: 8, width: '100%' }}>
              <Text style={styles.hintText}>💡 To pay, hold your contactless card or phone near the card reader for a second — no PIN needed for small amounts.</Text>
              <Pressable onPress={() => setShowTranslation(v => !v)} style={styles.smallPtButton}><Text style={{ fontSize: 10 }}>🌐 PT</Text></Pressable>
            </View>
            {showTranslation && <Text style={styles.hintTextPt}>Para pagar, aproxime seu cartão sem contato ou celular da maquininha por um segundo — sem senha para valores pequenos.</Text>}
            {tapConfirmed && (
              <View style={{ width: '100%', gap: 10 }}>
                <Text style={styles.bodyTextBold}>What did the barista just ask you to do?</Text>
                {tapOptions.map(o => (
                  <OptionButton key={o.key} label={o.label} onPress={() => answerTapQuiz(o.key)} selected={tapQuizCorrect && o.key === 'correct'} />
                ))}
                {tapQuizCorrect && <PrimaryButton label="Continue" onPress={cardContinue1} />}
              </View>
            )}
          </View>
        );
      }

      case 'cardGoodbye':
      case 'cashGoodbye': {
        const chunks = [
          { text: "We're gonna call your name when your order is ready.", pt: TRANSLATIONS["We're gonna call your name when your order is ready."] },
          { text: 'Thank you.', pt: TRANSLATIONS['Thank you.'] },
          { text: 'Have a good one!', pt: TRANSLATIONS['Have a good one!'], note: '"Have a good one" is a casual, friendly way to say "have a good day."' },
        ];
        const replies = [
          { key: 'correct', label: 'You too!' },
          { key: 'wrong1', label: 'Yes, I have one.' },
          { key: 'wrong2', label: "No, I don't." },
        ];
        return (
          <View style={styles.section}>
            <MediaVideo asset={VIDEOS.goodbye} />
            <Text style={styles.eyebrow}>Breaking down what the barista said</Text>
            {chunks.map((c, idx) => (
              <View key={idx} style={styles.chunkCard}>
                <ListenButton text={c.text} size={36} />
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Text style={{ flex: 1, fontWeight: '600' }}>{c.text}</Text>
                    <Pressable onPress={() => setGoodbyeChunkPt(p => ({ ...p, [idx]: !p[idx] }))} style={styles.smallPtButton}><Text style={{ fontSize: 10 }}>🌐</Text></Pressable>
                  </View>
                  {goodbyeChunkPt[idx] && <Text style={styles.hintTextPt}>{c.pt}</Text>}
                  {!!c.note && <Text style={styles.tipText}>💡 {c.note}</Text>}
                </View>
              </View>
            ))}
            <Text style={styles.bodyTextBold}>What's a natural reply to "Have a good one"?</Text>
            {replies.map(r => <OptionButton key={r.key} label={r.label} onPress={() => answerGoodbyeQuiz(r.key)} selected={goodbyeQuizCorrect && r.key === 'correct'} />)}
            {goodbyeQuizCorrect && <PrimaryButton label={'"Thank you, you too."'} onPress={goodbyeSaid} style={{ backgroundColor: COLORS.green }} />}
          </View>
        );
      }

      case 'cashPaid':
        return (
          <View style={[styles.section, { alignItems: 'center' }]}>
            <MediaImage asset={IMAGES.cashBill} aspectRatio={16 / 9} />
            <BaristaBubble text="You paid with a $20 bill." showTranslation={showTranslation} />
            <View style={styles.receiptBox}>
              <View style={styles.receiptRow}><Text>Total</Text><Text>{fmt(total)}</Text></View>
              <View style={styles.receiptRow}><Text>Paid with</Text><Text>$20.00</Text></View>
              <View style={styles.receiptDivider} />
              <View style={styles.receiptRow}><Text style={styles.receiptTotalLabel}>Your Change</Text><Text style={styles.receiptTotalLabel}>{fmt(change)}</Text></View>
            </View>
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
              <Text style={styles.tipText}>💡 Change = Troco</Text>
              <ListenButton text="Change" size={32} />
            </View>
            <View style={styles.sentenceBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={{ flex: 1, fontWeight: '700' }}>"Here's your change, {fmt(change)}."</Text>
                <ListenButton text={`Here's your change, ${fmt(change)}.`} audioKey={HERES_YOUR_CHANGE_KEY} size={30} />
                <Pressable onPress={() => setShowChangePt(v => !v)} style={styles.smallPtButton}><Text style={{ fontSize: 10 }}>🌐</Text></Pressable>
              </View>
              {showChangePt && <Text style={styles.hintTextPt}>"Aqui está seu troco, {fmt(change)}."</Text>}
            </View>
            <RecordControl />
            <PrimaryButton label="Continue" onPress={cashContinue} />
          </View>
        );

      case 'review':
        return (
          <ScrollView contentContainerStyle={[styles.section, { alignItems: 'center' }]}>
            <View style={styles.trophyCircle}><Text style={{ fontSize: 44 }}>🏆</Text></View>
            <Text style={styles.h2}>Lesson Complete!</Text>
            <View style={{ flexDirection: 'row', gap: 18 }}>
              <Text style={styles.statText}>⚡ {xp} XP</Text>
              {streakCount > 0 && <Text style={styles.statText}>🔥 {streakCount}</Text>}
            </View>
            <Text style={styles.eyebrow}>Achievements</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
              {BADGES.map(b => (
                <View key={b.id} style={[styles.badgeChip, { opacity: badges[b.id] ? 1 : 0.4 }]}>
                  <Text style={{ fontSize: 20 }}>{b.icon}</Text>
                  <Text style={styles.badgeChipText}>{b.name}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.eyebrow}>Your Order</Text>
            {cartItems.map(ci => <View key={ci.uid} style={styles.receiptRowFull}><Text>{ci.label}</Text><Text style={styles.receiptMuted}>{ci.priceLabel}</Text></View>)}
            <PrimaryButton label="Practice Again" onPress={practiceAgain} />
            <PrimaryButton label="Voltar" onPress={() => navigation.goBack()} style={{ backgroundColor: 'transparent', borderWidth: 2, borderColor: COLORS.border }} textStyle={{ color: COLORS.primary }} />
          </ScrollView>
        );

      default:
        return null;
    }
  }

  return (
    <SafeAreaView style={styles.appRoot}>
      <Header />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        {renderScreen()}
      </ScrollView>
      <FeedbackModal feedback={answerFeedback} onDismiss={() => setAnswerFeedback(null)} />
      <BadgeModal badge={celebratingBadge} onDismiss={() => setCelebratingBadge(null)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appRoot: { flex: 1, backgroundColor: COLORS.bg },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  backButton: { width: 36, height: 36, borderRadius: 18, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center' },
  progressTrack: { flex: 1, height: 8, borderRadius: 99, backgroundColor: COLORS.border, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 99, backgroundColor: COLORS.green },
  headerChip: { fontWeight: '700', fontSize: 13, color: COLORS.primary },
  ptButton: { height: 32, paddingHorizontal: 10, borderRadius: 99, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center' },
  ptButtonActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  ptButtonText: { fontSize: 12, fontWeight: '700', color: COLORS.textDark },
  section: { padding: 20, gap: 16 },
  h1: { fontSize: 28, fontWeight: '800', color: COLORS.primaryDark, textAlign: 'center' },
  h2: { fontSize: 22, fontWeight: '800', color: COLORS.primaryDark },
  bodyText: { fontSize: 15, color: COLORS.textMuted, textAlign: 'center' },
  bodyTextCenter: { fontSize: 15, color: COLORS.textMuted, textAlign: 'center' },
  bodyTextBold: { fontWeight: '700', fontSize: 15, textAlign: 'left' },
  streakLine: { fontWeight: '700', color: '#c07a2e', textAlign: 'center' },
  primaryButton: { height: 58, borderRadius: 99, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center', width: '100%' },
  primaryButtonDisabled: { backgroundColor: '#c9bfb4' },
  primaryButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  optionButton: { minHeight: 56, borderRadius: 16, borderWidth: 2, borderColor: COLORS.border, backgroundColor: COLORS.card, justifyContent: 'center', paddingHorizontal: 16, width: '100%' },
  optionButtonSelected: { borderColor: COLORS.primary, backgroundColor: '#f7f0e6' },
  optionButtonText: { fontWeight: '700', fontSize: 15 },
  listenButton: { borderWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.card, alignItems: 'center', justifyContent: 'center' },
  translateToggle: { width: 22, height: 22, alignItems: 'center', justifyContent: 'center' },
  bubble: { backgroundColor: COLORS.card, borderRadius: 16, padding: 16 },
  bubbleText: { fontSize: 17, fontWeight: '600' },
  bubblePt: { marginTop: 4, fontSize: 13, color: COLORS.textMuted, fontStyle: 'italic' },
  mediaSlot: { width: '100%', borderRadius: 16, borderWidth: 2, borderColor: COLORS.border, borderStyle: 'dashed', backgroundColor: '#f2ece5', alignItems: 'center', justifyContent: 'center', padding: 12 },
  mediaSlotText: { fontSize: 12, color: COLORS.textMuted, textAlign: 'center' },
  mediaFilled: { borderWidth: 0, borderStyle: 'solid', backgroundColor: COLORS.border, padding: 0, overflow: 'hidden' },
  mediaFilledInner: { width: '100%', height: '100%' },
  videoFrame: { borderRadius: 12, borderWidth: 1, borderColor: 'rgba(58,47,38,0.12)', backgroundColor: '#f4f1ee' },
  modalOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center', padding: 24 },
  modalCard: { backgroundColor: COLORS.card, borderRadius: 18, padding: 24, width: '100%', maxWidth: 340, gap: 12, borderWidth: 2.5, alignItems: 'flex-start' },
  modalTitle: { fontWeight: '800', fontSize: 16 },
  modalMessage: { fontSize: 14, color: COLORS.textDark, lineHeight: 20 },
  modalEyebrow: { fontSize: 12, fontWeight: '700', color: COLORS.textMuted, textTransform: 'uppercase' },
  badgeIconCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: COLORS.greenBg, alignItems: 'center', justifyContent: 'center' },
  categoryRow: { flexGrow: 0, paddingVertical: 10 },
  categoryPill: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 99, borderWidth: 2, borderColor: COLORS.border, backgroundColor: COLORS.card },
  categoryPillActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  categoryPillText: { fontWeight: '700', fontSize: 13, color: COLORS.textDark },
  menuGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, padding: 16, paddingBottom: 140 },
  menuCard: { width: '47%', borderWidth: 1, borderColor: COLORS.border, borderRadius: 18, padding: 10, gap: 8, backgroundColor: COLORS.card, position: 'relative' },
  menuBadge: { position: 'absolute', top: 8, right: 8, backgroundColor: COLORS.green, borderRadius: 99, width: 22, height: 22, alignItems: 'center', justifyContent: 'center', zIndex: 2 },
  menuBadgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  menuItemName: { fontWeight: '700', fontSize: 14 },
  menuItemPrice: { fontSize: 12, color: COLORS.textMuted },
  addButton: { flex: 1, height: 38, borderRadius: 99, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center' },
  addButtonText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  removeButton: { width: 38, height: 38, borderRadius: 99, borderWidth: 1, borderColor: '#e3b3a4', backgroundColor: '#fbeae5', alignItems: 'center', justifyContent: 'center' },
  cartBar: { flexDirection: 'row', gap: 10, padding: 16, borderTopWidth: 1, borderTopColor: COLORS.border, backgroundColor: COLORS.card },
  cartToggle: { height: 50, paddingHorizontal: 16, borderRadius: 99, borderWidth: 2, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center' },
  cartToggleText: { fontWeight: '700', fontSize: 14 },
  cartDrawer: { padding: 12, backgroundColor: '#f2ece5', gap: 6 },
  cartLine: { fontSize: 13 },
  emptyCartText: { textAlign: 'center', color: COLORS.textMuted, fontSize: 13, padding: 10 },
  eyebrow: { fontWeight: '700', fontSize: 12, color: '#8a6a4c', textTransform: 'uppercase', letterSpacing: 0.5 },
  tipText: { fontSize: 13, color: '#8a6a4c', backgroundColor: COLORS.amberBg, padding: 12, borderRadius: 12 },
  exampleRow: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: COLORS.card, borderRadius: 12, padding: 10 },
  sentenceBox: { backgroundColor: COLORS.card, borderRadius: 16, padding: 18, width: '100%' },
  sentenceText: { fontWeight: '700', fontSize: 18, textAlign: 'center' },
  sentenceTextSmall: { fontWeight: '700', fontSize: 18 },
  hintText: { fontSize: 13, color: COLORS.textMuted, flex: 1 },
  hintTextPt: { fontSize: 13, color: COLORS.textMuted, fontStyle: 'italic', marginTop: 4 },
  recordButton: { paddingHorizontal: 20, height: 56, borderRadius: 99, backgroundColor: COLORS.red, alignItems: 'center', justifyContent: 'center' },
  recordButtonDone: { backgroundColor: COLORS.green },
  recordButtonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  playbackButton: { height: 40, paddingHorizontal: 18, borderRadius: 99, borderWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.card, alignItems: 'center', justifyContent: 'center' },
  playbackButtonText: { fontWeight: '700', fontSize: 13, color: COLORS.primary },
  choiceCard: { flex: 1, borderWidth: 2, borderColor: COLORS.border, borderRadius: 18, padding: 14, gap: 10, alignItems: 'center' },
  choiceCardLabel: { fontWeight: '700', fontSize: 15 },
  receiptBox: { width: '100%', backgroundColor: COLORS.card, borderWidth: 1.5, borderColor: COLORS.border, borderStyle: 'dashed', borderRadius: 14, padding: 16, gap: 8 },
  receiptRow: { flexDirection: 'row', justifyContent: 'space-between' },
  receiptRowFull: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#f2ece5', borderRadius: 10, padding: 8 },
  receiptMuted: { color: COLORS.textMuted },
  receiptDivider: { height: 1, backgroundColor: COLORS.border, marginVertical: 4 },
  receiptTotalLabel: { fontWeight: '800', fontSize: 20 },
  tapCircle: { width: 130, height: 130, borderRadius: 20, borderWidth: 3, borderColor: COLORS.primary, alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: COLORS.card },
  tapCircleConfirmed: { borderColor: COLORS.green, backgroundColor: COLORS.greenBg },
  tapLabel: { fontWeight: '700', fontSize: 13, color: COLORS.primary },
  smallPtButton: { height: 26, paddingHorizontal: 8, borderRadius: 99, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center' },
  chunkCard: { flexDirection: 'row', gap: 10, backgroundColor: COLORS.card, borderRadius: 12, padding: 12, alignItems: 'flex-start' },
  trophyCircle: { width: 96, height: 96, borderRadius: 48, backgroundColor: COLORS.greenBg, alignItems: 'center', justifyContent: 'center' },
  statText: { fontWeight: '700', fontSize: 16, color: COLORS.primary },
  badgeChip: { alignItems: 'center', gap: 4, padding: 8, borderRadius: 14, borderWidth: 1.5, borderColor: COLORS.border, width: 72 },
  badgeChipText: { fontSize: 9, textAlign: 'center', fontWeight: '600' },
});
