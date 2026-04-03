import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  StyleSheet, Text, View, Animated, Dimensions, TouchableOpacity,
  TextInput, StatusBar, Easing, KeyboardAvoidingView, Platform, FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Svg, { Path } from 'react-native-svg';
import { useRoute } from '@react-navigation/native';
import AppCard from './components/ui/AppCard';
import PrimaryButton from './components/ui/PrimaryButton';
import { colors, shadows } from './theme/tokens';

const { width, height } = Dimensions.get('window');
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

// ========================================
// 1. SEAMLESS ANIMATED WAVES
// ========================================
const Wave = ({ color, duration, startPosition, d }) => {
  const translateX = useRef(new Animated.Value(startPosition)).current;

  useEffect(() => {
    const toPosition = startPosition === 0 ? -600 : 0;
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: toPosition,
          duration: duration / 2,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: startPosition,
          duration: duration / 2,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [duration, startPosition]);

  return (
    <Animated.View style={[styles.waveContainer, { transform: [{ translateX }] }]}>
      <Svg width={2400} height={150} viewBox="0 0 2400 150" preserveAspectRatio="none">
        <Path fill={color} d={d} />
      </Svg>
    </Animated.View>
  );
};

// ========================================
// 2. TRULY INFINITE REINCARNATING BUBBLES
// ========================================
const Bubble = () => {
  const progress = useRef(new Animated.Value(0)).current;
  const sway = useRef(new Animated.Value(0)).current;
  const [config, setConfig] = useState({
    size: Math.random() * 30 + 10,
    left: Math.random() * width,
  });
  const durationRef = useRef(Math.random() * 16000 + 14000);
  const isFirstRun = useRef(true);

  const startFloat = () => {
    progress.setValue(0);
    const delay = isFirstRun.current ? Math.random() * 30000 : 0;
    isFirstRun.current = false;

    Animated.sequence([
      Animated.delay(delay),
      Animated.timing(progress, {
        toValue: 1,
        duration: durationRef.current,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        durationRef.current = Math.random() * 16000 + 14000;
        setConfig({ size: Math.random() * 30 + 10, left: Math.random() * width });
        startFloat();
      }
    });
  };

  useEffect(() => {
    startFloat();
    const swayAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(sway, { toValue: 1, duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(sway, { toValue: -1, duration: 4000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(sway, { toValue: 0, duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    );
    swayAnim.start();
    return () => { progress.stopAnimation(); sway.stopAnimation(); };
  }, []);

  const translateY = progress.interpolate({ inputRange: [0, 1], outputRange: [height + 50, -150] });
  const opacity = progress.interpolate({ inputRange: [0, 0.1, 0.8, 1], outputRange: [0, 1, 1, 0] });
  const translateXVal = sway.interpolate({ inputRange: [-1, 1], outputRange: [-20, 20] });

  return (
    <Animated.View
      style={[styles.bubbleWrapper, {
        width: config.size, height: config.size, borderRadius: config.size / 2,
        left: config.left, transform: [{ translateY }, { translateX: translateXVal }], opacity,
      }]}
    >
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.95)", "rgba(255, 255, 255, 0.1)"]}
        style={{ flex: 1, borderRadius: config.size / 2, borderWidth: 1, borderColor: "rgba(255, 255, 255, 0.4)" }}
      />
    </Animated.View>
  );
};

// ========================================
// 3. MESSAGE BUBBLE
// ========================================
const MessageBubble = ({ side, text }) => {
  const isRight = side === 'right';
  return (
    <View style={[styles.messageRow, isRight ? styles.messageRowRight : styles.messageRowLeft]}>
      <View style={[styles.bubble, isRight ? styles.myBubble : styles.theirBubble]}>
        <Text style={[styles.messageText, isRight ? styles.myMessageText : styles.theirMessageText]}>
          {text}
        </Text>
      </View>
    </View>
  );
};

// ========================================
// 4. CHAT PAGE
// ========================================
const initialMessages = [
  { id: '1', side: 'right', text: 'היי, רק רציתי לשאול איך נעמה התקדמה היום?' },
  { id: '2', side: 'left', text: 'נעמה הייתה מקסימה! שיפור משמעותי בשליטה בנשימות.' },
  { id: '3', side: 'right', text: 'איזו אלופה! תודה רבה 🙏' },
];

export default function ChatPage({ navigation }) {
  const route = useRoute();
  const fromInstructor = route.params?.fromInstructor ?? false;
  const scrollY = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  const bubblePool = useMemo(() => Array.from({ length: 6 }).map((_, i) => i), []);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      { id: String(prev.length + 1), side: fromInstructor ? 'left' : 'right', text: trimmed },
    ]);
    setInput('');
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const navBg = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: ["rgba(0, 21, 41, 0.4)", "rgba(0, 21, 41, 0.85)"],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      {/* Deep Ocean Base */}
      <LinearGradient colors={["#003d5c", "#002a4d", colors.bgDeep]} style={StyleSheet.absoluteFill} />

      {/* Surface Water */}
      <View style={[StyleSheet.absoluteFill]}>
        <LinearGradient colors={["#0099cc", "#006994", "#003d5c"]} style={StyleSheet.absoluteFill} />
      </View>

      {/* INFINITE BUBBLE POOL */}
      {bubblePool.map((id) => <Bubble key={id} />)}

      {/* Bottom Aligned Waves */}
      <Wave
        color="rgba(0, 153, 204, 0.3)"
        duration={8000}
        startPosition={0}
        d="M0,75 C200,45 400,105 600,75 C800,45 1000,105 1200,75 L1200,150 L0,150 Z M1200,75 C1400,45 1600,105 1800,75 C2000,45 2200,105 2400,75 L2400,150 L1200,150 Z"
      />
      <Wave
        color="rgba(0, 212, 255, 0.25)"
        duration={6000}
        startPosition={-600}
        d="M0,100 C300,60 500,130 800,90 C1000,60 1100,120 1200,100 L1200,150 L0,150 Z M1200,100 C1500,60 1700,130 2000,90 C2200,60 2300,120 2400,100 L2400,150 L1200,150 Z"
      />

      {/* NAVBAR */}
      <AnimatedBlurView intensity={20} tint="dark" style={[styles.navbar, { backgroundColor: navBg }]}>
        <View style={styles.navBrand}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backArrow}>×</Text>
          </TouchableOpacity>
          <LinearGradient colors={["#00d4ff", "#0099cc"]} style={styles.logoIcon}>
            <Text style={styles.logoEmoji}>🐚</Text>
          </LinearGradient>
          <Text style={styles.logoText}>ACM</Text>
        </View>

        <View style={styles.navTitleWrap}>
          <Text style={styles.navTitle}>צ'אט</Text>
          <Text style={styles.navSubtitle}>תקשורת בין מדריך להורה</Text>
        </View>
      </AnimatedBlurView>

      {/* CHAT BODY */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.chatBody}
        keyboardVerticalOffset={0}
      >
        {/* Messages Area */}
        <AppCard useBlur blurIntensity={25} blurTint="dark" style={styles.chatCard}>
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={({ item }) => <MessageBubble side={item.side} text={item.text} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messagesContainer}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />
        </AppCard>

        {/* Input Bar */}
        <AppCard useBlur blurIntensity={30} blurTint="dark" style={styles.inputCard}>
          <View style={styles.inputBar}>
            <TextInput
              style={styles.input}
              placeholder="הקלידו הודעה..."
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={input}
              onChangeText={setInput}
              multiline
              textAlign="right"
            />
            <PrimaryButton
              label="שליחה"
              onPress={handleSend}
              style={styles.sendButtonShell}
              gradientStyle={styles.sendButton}
              textStyle={styles.sendButtonText}
            />
          </View>
        </AppCard>
      </KeyboardAvoidingView>
    </View>
  );
}

// ========================================
// STYLES
// ========================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgDeep },
  waveContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 2400,
    height: 150,
    zIndex: 0,
  },
  bubbleWrapper: { position: "absolute", zIndex: 1 },

  // --- NAVBAR ---
  navbar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: Platform.OS === "ios" ? 50 : (StatusBar.currentHeight || 20) + 15,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 100,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  navBrand: { flexDirection: "row", alignItems: "center" },
  backButton: { marginRight: 15, padding: 5 },
  backArrow: { color: '#fff', fontSize: 28, lineHeight: 30, opacity: 0.8 },
  logoIcon: {
    width: 34, height: 34, borderRadius: 17,
    justifyContent: "center", alignItems: "center", marginRight: 10,
  },
  logoEmoji: { fontSize: 18, includeFontPadding: false },
  logoText: {
    color: "#fff", fontSize: 28, fontWeight: "900",
    includeFontPadding: false, letterSpacing: 2,
  },
  navTitleWrap: { alignItems: 'flex-end' },
  navTitle: {
    color: '#fff', fontSize: 18, fontWeight: '700',
    textShadowColor: 'rgba(0, 212, 255, 0.4)', textShadowRadius: 8,
  },
  navSubtitle: { color: 'rgba(255,255,255,0.55)', fontSize: 11, marginTop: 2 },

  // --- CHAT BODY ---
  chatBody: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 110 : (StatusBar.currentHeight || 20) + 80,
    paddingHorizontal: 14,
    paddingBottom: 14,
    zIndex: 10,
  },
  chatCard: {
    flex: 1,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    overflow: "hidden",
    marginBottom: 12,
  },
  messagesContainer: {
    paddingVertical: 16,
    paddingHorizontal: 14,
    gap: 10,
  },

  // --- MESSAGE BUBBLES ---
  messageRow: { flexDirection: 'row' },
  messageRowRight: { justifyContent: 'flex-end' },
  messageRowLeft: { justifyContent: 'flex-start' },
  bubble: {
    maxWidth: '78%',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  myBubble: {
    backgroundColor: 'rgba(0, 200, 120, 0.25)',
    borderWidth: 1,
    borderColor: 'rgba(0, 220, 130, 0.4)',
    borderTopRightRadius: 6,
  },
  theirBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderTopLeftRadius: 6,
  },
  messageText: {
    fontSize: 15,
    writingDirection: 'rtl',
    textAlign: 'right',
    lineHeight: 22,
  },
  myMessageText: { color: '#a8ffd4' },
  theirMessageText: { color: 'rgba(255, 255, 255, 0.85)' },

  // --- INPUT BAR ---
  inputCard: {
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    overflow: "hidden",
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 10,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    minHeight: 44,
    color: '#fff',
    fontSize: 15,
    paddingHorizontal: 8,
    paddingTop: 10,
  },
  sendButtonShell: {
    borderRadius: 14,
    overflow: 'hidden',
    ...shadows.glowPrimary,
  },
  sendButton: {
    minWidth: 85,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  sendButtonText: {
    color: '#001529',
    fontSize: 15,
    fontWeight: '700',
  },
});
