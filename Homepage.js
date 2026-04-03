import React, { useRef, useEffect, useState, useMemo } from "react";
import {
  StyleSheet, Text, View, Animated, Dimensions, TouchableOpacity,
  TextInput, StatusBar, Easing, KeyboardAvoidingView, Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import PrimaryButton from './components/ui/PrimaryButton';
import AppCard from './components/ui/AppCard';
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
// 2. TRULY INFINITE REINCARNATING BUBBLES
// ========================================
const Bubble = () => {
  const progress = useRef(new Animated.Value(0)).current;
  const sway = useRef(new Animated.Value(0)).current;

  // State holds the random properties so they can change on every trip up!
  const [config, setConfig] = useState({
    size: Math.random() * 30 + 10,
    left: Math.random() * width,
  });

  const durationRef = useRef(Math.random() * 16000 + 14000);
  const isFirstRun = useRef(true);

  const startFloat = () => {
    progress.setValue(0);

    // Stagger the very first run over 30 seconds to prevent clumps
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
        // REINCARNATION: Generate entirely new random properties for the next cycle
        durationRef.current = Math.random() * 16000 + 14000; // New speed
        setConfig({
          size: Math.random() * 30 + 10, // New size
          left: Math.random() * width, // New horizontal position
        });

        // Loop it back up!
        startFloat();
      }
    });
  };

  useEffect(() => {
    startFloat();

    // Smooth left/right swaying
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
  }, []); // Run once on mount

  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [height + 50, -150],
  });

  const opacity = progress.interpolate({
    inputRange: [0, 0.1, 0.8, 1],
    outputRange: [0, 1, 1, 0],
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
        colors={["rgba(255, 255, 255, 0.95)", "rgba(255, 255, 255, 0.1)"]}
        style={{
          flex: 1,
          borderRadius: config.size / 2,
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.4)",
        }}
      />
    </Animated.View>
  );
};

// ========================================
// 3. HOME SCREEN COMPONENT
// ========================================
export default function Homepage() {
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [showPassword, setShowPassword] = useState(false);

  // Mount a smaller fixed pool so fewer bubbles are visible at once.
  const bubblePool = useMemo(
    () => Array.from({ length: 6 }).map((_, i) => i),
    [],
  );

  const surfaceOpacity = scrollY.interpolate({
    inputRange: [0, height * 0.8],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const navBg = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: ["rgba(0, 21, 41, 0.4)", "rgba(0, 21, 41, 0.85)"],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />

      {/* Deep Ocean Base */}
      <LinearGradient
        colors={["#003d5c", "#002a4d", colors.bgDeep]}
        style={StyleSheet.absoluteFill}
      />

      {/* Surface Water */}
      <Animated.View
        style={[StyleSheet.absoluteFill, { opacity: surfaceOpacity }]}
      >
        <LinearGradient
          colors={["#0099cc", "#006994", "#003d5c"]}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      {/* INFINITE BUBBLE POOL */}
      {bubblePool.map((id) => (
        <Bubble key={id} />
      ))}

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
      <AnimatedBlurView
        intensity={20}
        tint="dark"
        style={[styles.navbar, { backgroundColor: navBg }]}
      >
        <View style={styles.navBrand}>
          <LinearGradient
            colors={["#00d4ff", "#0099cc"]}
            style={styles.logoIcon}
          >
            <Text style={styles.logoEmoji}>🐚</Text>
          </LinearGradient>
          <Text style={styles.logoText}>ACM</Text>
        </View>

        <TouchableOpacity style={styles.hamburger}>
          <View style={styles.hamburgerLine} />
          <View style={{ height: 5 }} />
          <View style={styles.hamburgerLine} />
          <View style={{ height: 5 }} />
          <View style={styles.hamburgerLine} />
        </TouchableOpacity>
      </AnimatedBlurView>

      {/* MAIN SCROLL CONTENT */}
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HERO SECTION */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>צללו אל</Text>
          <Text style={[styles.heroTitle, styles.gradientText]}>הרוגע</Text>
          <Text style={styles.heroSubtitle}>
            חוו את השילוב המושלם בין עומק הים לבין חוויית בריכה חלומית.
            הבריחה השקטה שלכם מחכה.
          </Text>
          <PrimaryButton
            label="גלה תכונות"
            style={styles.primaryBtn}
            gradientStyle={styles.btnGradient}
            textStyle={styles.primaryBtnText}
          />

          <PrimaryButton
            label="לוח מדריך"
            style={[styles.primaryBtn, styles.secondaryHeroBtn]}
            gradientStyle={styles.btnGradient}
            textStyle={styles.primaryBtnText}
            onPress={() => navigation.navigate("InstructorHomepage")}
          />

          <PrimaryButton
            label="התחברות מנהל"
            style={[styles.primaryBtn, styles.secondaryHeroBtn]}
            gradientStyle={styles.btnGradient}
            textStyle={styles.primaryBtnText}
            onPress={() => navigation.navigate("Login")}
          />

          <PrimaryButton
            label="לוח הורה"
            style={[styles.primaryBtn, styles.secondaryHeroBtn]}
            gradientStyle={styles.btnGradient}
            textStyle={styles.primaryBtnText}
            onPress={() => navigation.navigate("ParentHomepage")}
          />
        </View>

        {/* FEATURES SECTION */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>תכונות</Text>
            <Text style={styles.sectionSubtitle}>
              כל מה שצריך לחוויית מים מושלמת במקום אחד
            </Text>
          </View>

          <View style={styles.featuresGrid}>
            {[
              {
                icon: "🌡️",
                title: "טמפרטורה חכמה",
                desc: "עקבו בזמן אמת אחר טמפרטורת הבריכה עם חיישנים מתקדמים",
              },
              {
                icon: "🌊",
                title: "תחזית גלים",
                desc: "קבלו תחזית מדויקת של גאות ומזג אוויר לפעילויות בחוף",
              },
              {
                icon: "🏊",
                title: "מעקב אימונים",
                desc: "נהלו אימוני שחייה ושפרו ביצועים לאורך זמן",
              },
              {
                icon: "🎯",
                title: "מעצב וירטואלי",
                desc: "עצבו את בריכת החלומות שלכם עם כלי הדמיה תלת-ממדי אינטראקטיבי",
              },
            ].map((f, i) => (
              <AppCard useBlur blurIntensity={30} blurTint="dark" style={styles.featureCard} key={i}>
                <View style={styles.featureIconContainer}>
                  <Text style={styles.featureIcon}>{f.icon}</Text>
                </View>
                <Text style={styles.featureTitle}>{f.title}</Text>
                <Text style={styles.featureDesc}>{f.desc}</Text>
              </AppCard>
            ))}
          </View>
        </View>

        {/* LOGIN SECTION */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.section}
        >
          <AppCard useBlur blurIntensity={40} blurTint="dark" style={styles.loginCard}>
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

            <View style={styles.inputGroup}>
              <Text style={styles.label}>כתובת אימייל</Text>
              <TextInput
                style={styles.input}
                placeholder="הכניסו אימייל"
                placeholderTextColor="rgba(255,255,255,0.4)"
                textAlign="right"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>סיסמה</Text>
              <View style={styles.passwordRow}>
                <TextInput
                  style={[styles.input, { flex: 1, borderBottomWidth: 0 }]}
                  placeholder="הכניסו סיסמה"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  textAlign="right"
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={styles.eyeIcon}>
                    {showPassword ? "🙈" : "👁️"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <PrimaryButton
              label="כניסה"
              style={styles.loginBtn}
              gradientStyle={styles.btnGradient}
              textStyle={styles.primaryBtnText}
            />
          </AppCard>
        </KeyboardAvoidingView>

        {/* FOOTER */}
        <View style={styles.footer}>
          <View style={styles.footerBrand}>
            <Text style={styles.footerEmoji}>🐚</Text>
            <Text style={styles.footerBrandText}>ACM</Text>
          </View>
          <Text style={styles.footerText}>
            נבנה באהבה 💙 לכל אוהבי המים
          </Text>
          <Text style={styles.copyright}>
            © 2024 ACM. כל הזכויות שמורות.
          </Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

// `Homepage` is the main component for this file; navigator lives in App.js.
// App-level navigation is now handled in `App.js`, so we don't need another default export here.

// ========================================
// STYLES
// ========================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgDeep },
  scrollContent: { paddingTop: 100, paddingBottom: 60 },
  waveContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 2400,
    height: 150,
    zIndex: 0,
  },
  bubbleWrapper: { position: "absolute", zIndex: 1 },

  // --- UPDATED SMALLER HEADER STYLES ---
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
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  navBrand: { flexDirection: "row", alignItems: "center" },
  logoIcon: {
    width: 34,
    height: 34,
    borderRadius: 17, // Reduced from 45
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  logoEmoji: { fontSize: 18, includeFontPadding: false }, // Reduced from 22
  logoText: {
    color: "#fff",
    fontSize: 28, // Increased from 20 for 'big' look
    fontWeight: "900", // Bolder for logo feel
    includeFontPadding: false,
    letterSpacing: 2, // Spaced logo look
  }, // Reduced from 25

  hamburger: { flexDirection: "column", justifyContent: "center" },
  hamburgerLine: {
    width: 24,
    height: 2,
    backgroundColor: "#fff",
    borderRadius: 2,
  }, // Reduced from 28

  hero: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: height * 0.7,
    paddingHorizontal: "5%",
    zIndex: 10,
  },
  heroTitle: {
    fontSize: clamp(40, width * 0.12, 60),
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
    lineHeight: 60,
  },
  gradientText: {
    color: "#00d4ff",
    textShadowColor: "rgba(0, 212, 255, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  heroSubtitle: {
    color: "rgba(255, 255, 255, 0.85)",
    textAlign: "center",
    fontSize: 16,
    marginTop: 25,
    marginBottom: 40,
    lineHeight: 26,
    fontWeight: "300",
  },

  primaryBtn: {
    width: "80%",
    maxWidth: 300,
    borderRadius: 50,
    overflow: "hidden",
    ...shadows.glowPrimary,
  },
  secondaryHeroBtn: {
    marginTop: 14,
  },
  btnGradient: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtnText: { color: "#001529", fontWeight: "bold", fontSize: 16 },

  section: { marginTop: 40, paddingHorizontal: "5%", zIndex: 10 },
  sectionHeader: { alignItems: "center", marginBottom: 40 },
  sectionTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 10,
  },
  sectionSubtitle: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 20,
  },

  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureCard: {
    width: "100%",
    borderRadius: 24,
    padding: 30,
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.18)",
    overflow: "hidden",
    alignItems: "center",
  },
  featureIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: "rgba(0, 212, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  featureIcon: { fontSize: 36 },
  featureTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  featureDesc: {
    color: "rgba(255, 255, 255, 0.75)",
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
  },

  loginCard: {
    borderRadius: 30,
    padding: 40,
    marginTop: 40,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.18)",
    overflow: "hidden",
  },
  loginIconContainer: { alignItems: "center", marginBottom: 20 },
  loginIconGradient: {
    width: 70,
    height: 70,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#00d4ff",
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  loginEmoji: { fontSize: 32 },
  loginHeader: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  loginSub: {
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    marginBottom: 35,
    fontSize: 14,
  },

  inputGroup: { marginBottom: 25 },
  label: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 12,
    marginBottom: 8,
    paddingLeft: 2,
  },
  input: {
    color: "#fff",
    fontSize: 16,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
  },
  eyeIcon: { fontSize: 18, padding: 10, opacity: 0.8 },
  loginBtn: { borderRadius: 30, overflow: "hidden", marginTop: 10 },

  footer: {
    marginTop: 80,
    paddingTop: 40,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    zIndex: 10,
  },
  footerBrand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
  },
  footerEmoji: { fontSize: 24 },
  footerBrandText: { color: "#fff", fontSize: 22, fontWeight: "600" },
  footerText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
  copyright: { color: "rgba(255, 255, 255, 0.4)", fontSize: 12 },
});

function clamp(min, val, max) {
  return Math.min(Math.max(val, min), max);
}
