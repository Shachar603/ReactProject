import React, { useRef, useEffect, useState, useMemo } from 'react';
import {
  StyleSheet, Text, View, Animated, Dimensions, TouchableOpacity,
  TextInput, StatusBar, Easing, KeyboardAvoidingView, Platform,
  Switch, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Svg, { Path } from 'react-native-svg';
import PrimaryButton from './components/ui/PrimaryButton';
import AppCard from './components/ui/AppCard';
import { colors, shadows } from './theme/tokens';

const { width, height } = Dimensions.get('window');
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const API_BASE_URL = Platform.OS === 'android'
  ? 'http://10.0.2.2:5202/api'
  : 'http://localhost:5202/api';

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
    <Animated.View
      style={[styles.waveContainer, { transform: [{ translateX }] }]}
    >
      <Svg
        width={2400}
        height={150}
        viewBox="0 0 2400 150"
        preserveAspectRatio="none"
      >
        <Path fill={color} d={d} />
      </Svg>
    </Animated.View>
  );
};

// ========================================
// 2. FLOATING BUBBLES
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
        setConfig({
          size: Math.random() * 30 + 10,
          left: Math.random() * width,
        });
        startFloat();
      }
    });
  };

  useEffect(() => {
    startFloat();

    const swayAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(sway, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(sway, {
          toValue: -1,
          duration: 4000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(sway, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );
    swayAnim.start();

    return () => {
      progress.stopAnimation();
      sway.stopAnimation();
    };
  }, []);

  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [height + 50, -150],
  });

  const opacity = progress.interpolate({
    inputRange: [0, 0.1, 0.8, 1],
    outputRange: [0, 0.7, 0.7, 0],
  });

  const translateX = sway.interpolate({
    inputRange: [-1, 1],
    outputRange: [-20, 20],
  });

  return (
    <Animated.View
      style={[
        styles.bubbleWrapper,
        {
          width: config.size,
          height: config.size,
          borderRadius: config.size / 2,
          left: config.left,
          transform: [{ translateY }, { translateX }],
          opacity,
        },
      ]}
    >
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.85)", "rgba(255, 255, 255, 0.2)"]}
        style={{
          flex: 1,
          borderRadius: config.size / 2,
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.6)",
        }}
      />
    </Animated.View>
  );
};

// ========================================
// 3. LOGIN SCREEN COMPONENT
// ========================================
export default function LoginPage({ navigation }) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = useMemo(
    () => email.trim().length > 0 && password.length > 0,
    [email, password],
  );

  const bubblePool = useMemo(
    () => Array.from({ length: 6 }).map((_, i) => i),
    [],
  );

  const navBg = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: ["rgba(0, 105, 148, 0.3)", "rgba(0, 105, 148, 0.75)"],
    extrapolate: "clamp",
  });

  const handleLogin = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password) {
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: normalizedEmail,
          password,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        Alert.alert('פרטי התחברות שגויים', payload?.message ?? 'אימייל או סיסמה שגויים.');
        return;
      }

      const role = (payload?.role ?? '').toLowerCase();

      if (role === 'manager') {
        navigation.replace('ManagerHomepage', {
          managerAuth: {
            email: normalizedEmail,
            password,
          },
        });
        return;
      }

      if (role === 'instructor') {
        navigation.replace('InstructorHomepage');
        return;
      }

      if (role === 'parent') {
        navigation.replace('ParentHomepage');
        return;
      }

      Alert.alert('שגיאה', 'לא זוהתה הרשאת משתמש מתאימה.');
    } catch (error) {
      Alert.alert(
        'שגיאת שרת',
        'לא ניתן להתחבר לשרת כרגע. ודאו שה-ServerSide רץ וכתובת ה-API מתאימה לסביבה שלכם.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />

      {/* Bright Surface Ocean — matches the top of Homepage before scroll */}
      <LinearGradient
        colors={["#0099cc", "#006994", "#003d5c"]}
        style={StyleSheet.absoluteFill}
      />

      {/* INFINITE BUBBLE POOL */}
      {bubblePool.map((id) => (
        <Bubble key={id} />
      ))}

      {/* Bottom Aligned Waves — lighter tones */}
      <Wave
        color="rgba(0, 212, 255, 0.3)"
        duration={8000}
        startPosition={0}
        d="M0,75 C200,45 400,105 600,75 C800,45 1000,105 1200,75 L1200,150 L0,150 Z M1200,75 C1400,45 1600,105 1800,75 C2000,45 2200,105 2400,75 L2400,150 L1200,150 Z"
      />
      <Wave
        color="rgba(0, 230, 255, 0.25)"
        duration={6000}
        startPosition={-600}
        d="M0,100 C300,60 500,130 800,90 C1000,60 1100,120 1200,100 L1200,150 L0,150 Z M1200,100 C1500,60 1700,130 2000,90 C2200,60 2300,120 2400,100 L2400,150 L1200,150 Z"
      />

      {/* NAVBAR */}
      <AnimatedBlurView
        intensity={20}
        tint="dark"
        style={[styles.navbar, { backgroundColor: navBg }]}
      >
        <View style={styles.navBrand}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backArrow}>→</Text>
          </TouchableOpacity>
          <LinearGradient
            colors={["#00d4ff", "#0099cc"]}
            style={styles.logoIcon}
          >
            <Text style={styles.logoEmoji}>🌊</Text>
          </LinearGradient>
          <Text style={styles.logoText}>Aqua Oasis</Text>
        </View>
      </AnimatedBlurView>

      {/* MAIN SCROLL CONTENT */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <Animated.ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false },
          )}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* LOGIN CARD */}
          <AppCard useBlur blurIntensity={30} blurTint="default" style={styles.loginCard}>
            <View style={styles.loginIconContainer}>
              <LinearGradient
                colors={["#00d4ff", "#0099cc"]}
                style={styles.loginIconGradient}
              >
                <Text style={styles.loginEmoji}>🐚</Text>
              </LinearGradient>
            </View>
            <Text style={styles.loginHeader}>ברוכים השבים</Text>
            <Text style={styles.loginSub}>
              התחברו לחשבון שלכם ב־Aqua Oasis
            </Text>

            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>כתובת אימייל</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholder="you@example.com"
                placeholderTextColor="rgba(255,255,255,0.45)"
                textAlign="right"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>סיסמה</Text>
              <View style={styles.passwordRow}>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  style={[styles.input, { flex: 1, borderBottomWidth: 0 }]}
                  placeholder="הכניסו סיסמה"
                  placeholderTextColor="rgba(255,255,255,0.45)"
                  textAlign="right"
                  secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible((prev) => !prev)}
                >
                  <Text style={styles.eyeIcon}>
                    {isPasswordVisible ? "🙈" : "👁️"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Meta Row */}
            <View style={styles.metaRow}>
              <View style={styles.toggleRow}>
                <Switch
                  value={rememberMe}
                  onValueChange={setRememberMe}
                  trackColor={{ false: 'rgba(255,255,255,0.25)', true: 'rgba(0,212,255,0.5)' }}
                  thumbColor={rememberMe ? '#00d4ff' : '#ccc'}
                  ios_backgroundColor="rgba(255,255,255,0.25)"
                />
                <Text style={styles.metaText}>זכור אותי</Text>
              </View>

              <TouchableOpacity activeOpacity={0.8}>
                <Text style={styles.forgotText}>שכחת סיסמה?</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <PrimaryButton
              label={isSubmitting ? 'מתחבר...' : '🔑  התחברות'}
              style={styles.loginBtn}
              gradientStyle={styles.btnGradient}
              textStyle={styles.loginBtnText}
              onPress={handleLogin}
              disabled={!isFormValid || isSubmitting}
            />
          </AppCard>
        </Animated.ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// ========================================
// STYLES
// ========================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#006994' },
  keyboardView: { flex: 1 },
  scrollContent: {
    paddingTop: 120,
    paddingBottom: 60,
    paddingHorizontal: '5%',
    flexGrow: 1,
    justifyContent: 'center',
  },
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
    paddingTop:
      Platform.OS === "ios" ? 50 : (StatusBar.currentHeight || 20) + 15,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 100,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.15)",
  },
  navBrand: { flexDirection: "row", alignItems: "center" },
  backArrow: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginRight: 12,
  },
  logoIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  logoEmoji: { fontSize: 18, includeFontPadding: false },
  logoText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    includeFontPadding: false,
  },

  // --- LOGIN CARD (lighter glassmorphism) ---
  loginCard: {
    borderRadius: 30,
    padding: 40,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
    overflow: "hidden",
    zIndex: 10,
  },
  loginIconContainer: { alignItems: "center", marginBottom: 20 },
  loginIconGradient: {
    width: 70,
    height: 70,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#00d4ff",
    shadowOpacity: 0.4,
    shadowRadius: 25,
  },
  loginEmoji: { fontSize: 32 },
  loginHeader: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.15)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  loginSub: {
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginBottom: 35,
    fontSize: 14,
  },

  // --- INPUTS ---
  inputGroup: { marginBottom: 25 },
  label: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 12,
    marginBottom: 8,
    paddingLeft: 2,
    textAlign: 'right',
  },
  input: {
    color: "#fff",
    fontSize: 16,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "rgba(255, 255, 255, 0.3)",
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "rgba(255, 255, 255, 0.3)",
  },
  eyeIcon: { fontSize: 18, padding: 10, opacity: 0.85 },

  // --- META ROW ---
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 28,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
  forgotText: {
    color: '#b3ecff',
    fontSize: 13,
    fontWeight: '600',
  },

  // --- LOGIN BUTTON ---
  loginBtn: {
    borderRadius: 30,
    overflow: "hidden",
    ...shadows.glowPrimary,
  },
  btnGradient: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  loginBtnText: {
    color: "#001529",
    fontWeight: "bold",
    fontSize: 18,
  },
});