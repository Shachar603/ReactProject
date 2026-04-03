import React, { useMemo, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import PrimaryButton from './components/ui/PrimaryButton';
import AppCard from './components/ui/AppCard';
import { colors, radius } from './theme/tokens';
import AquaticBackground from './components/ui/AquaticBackground';

const API_BASE_URL = Platform.OS === 'android'
  ? 'http://10.0.2.2:5202/api'
  : 'http://localhost:5202/api';

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = useMemo(() => email.trim().length > 0 && password.length > 0, [email, password]);

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
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#d8e6f2" />

      <AquaticBackground variant="auth" />

      <View style={styles.headerRow}>
        <TouchableOpacity activeOpacity={0.8} style={styles.hamburgerBtn}>
          <View style={styles.hamburgerLine} />
          <View style={styles.hamburgerLine} />
          <View style={styles.hamburgerLine} />
        </TouchableOpacity>

        <Text style={styles.headerText}>ברוכים השבים!</Text>
      </View>

<<<<<<< HEAD
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
            <Text style={styles.logoEmoji}>🐚</Text>
          </LinearGradient>
          <Text style={styles.logoText}>ACM</Text>
        </View>
      </AnimatedBlurView>

      {/* MAIN SCROLL CONTENT */}
=======
>>>>>>> 08033713c1a1efe11528b415f5c67ac5ef0c4572
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.centerWrap}
      >
<<<<<<< HEAD
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
              התחברו לחשבון שלכם ב־ACM
            </Text>
=======
        <AppCard style={styles.card}>
          <Text style={styles.title}>התחברות</Text>
>>>>>>> 08033713c1a1efe11528b415f5c67ac5ef0c4572

          <Text style={styles.label}>אימייל</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholder="you@example.com"
            placeholderTextColor="#a6afbe"
            autoCapitalize="none"
            keyboardType="email-address"
            textAlign="left"
          />

          <Text style={styles.label}>סיסמה</Text>
          <View style={styles.passwordRow}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              style={styles.passwordInput}
              placeholder="••••••••"
              placeholderTextColor="#a6afbe"
              secureTextEntry={!isPasswordVisible}
              textAlign="left"
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible((prev) => !prev)}
              style={styles.eyeButton}
              activeOpacity={0.7}
            >
              <Text style={styles.eyeText}>{isPasswordVisible ? 'הסתר' : 'הצג'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.toggleRow}>
              <Switch
                value={rememberMe}
                onValueChange={setRememberMe}
                trackColor={{ false: '#c9d0dd', true: '#9cc8ed' }}
                thumbColor={rememberMe ? '#5ea8df' : '#f1f5fb'}
                ios_backgroundColor="#c9d0dd"
              />
              <Text style={styles.metaText}>זכור אותי</Text>
            </View>

            <TouchableOpacity activeOpacity={0.8}>
              <Text style={styles.forgotText}>שכחת סיסמה?</Text>
            </TouchableOpacity>
          </View>

          <PrimaryButton
            style={styles.loginBtn}
            onPress={handleLogin}
            disabled={!isFormValid || isSubmitting}
            label={isSubmitting ? 'מתחבר...' : 'התחברות'}
            textStyle={styles.loginText}
            gradientStyle={styles.loginBtnGradient}
            colorsOverride={isFormValid && !isSubmitting ? ['#3aa8eb', '#2d94dd'] : ['#91bddd', '#84b4d6']}
          />

          <View style={styles.mascot}>
            <Text style={styles.mascotFace}>☺</Text>
          </View>
        </AppCard>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#d8e6f2',
  },
  waveTopBack: {
    position: 'absolute',
    top: 88,
    left: -10,
    right: -10,
    height: 48,
    backgroundColor: '#b6d9f4',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    opacity: 0.9,
  },
  waveTopFront: {
    position: 'absolute',
    top: 96,
    left: -10,
    right: -10,
    height: 42,
    backgroundColor: '#a7cfee',
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    opacity: 0.8,
  },
  headerRow: {
    marginTop: Platform.OS === 'ios' ? 56 : 28,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  headerText: {
    color: '#7892ad',
    fontSize: 13,
  },
  hamburgerBtn: {
    width: 28,
    height: 24,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  hamburgerLine: {
    height: 3,
    borderRadius: 2,
    backgroundColor: '#131d2a',
  },
  centerWrap: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingBottom: 42,
  },
<<<<<<< HEAD
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
    fontSize: 28,
    fontWeight: "900",
    includeFontPadding: false,
    letterSpacing: 2,
  },

  // --- LOGIN CARD (lighter glassmorphism) ---
  loginCard: {
    borderRadius: 30,
    padding: 40,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
=======
  card: {
    borderRadius: radius.lg,
    backgroundColor: colors.loginSurface,
>>>>>>> 08033713c1a1efe11528b415f5c67ac5ef0c4572
    borderWidth: 1,
    borderColor: '#9bc7ea',
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 76,
    minHeight: 520,
  },
  title: {
    textAlign: 'center',
    fontSize: 48,
    color: '#1e63a1',
    fontWeight: '300',
    marginBottom: 16,
  },
  label: {
    color: '#7c8fa8',
    textAlign: 'right',
    marginBottom: 8,
    marginTop: 6,
    fontSize: 14,
  },
  input: {
    backgroundColor: colors.loginField,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 44,
    color: colors.loginText,
    marginBottom: 4,
  },
  passwordRow: {
    backgroundColor: colors.loginField,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    marginBottom: 2,
  },
  passwordInput: {
    flex: 1,
    height: 44,
    color: colors.loginText,
    paddingRight: 8,
  },
  eyeButton: {
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  eyeText: {
    color: '#7f8fa5',
    fontSize: 11,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    color: '#6f839c',
    fontSize: 12,
  },
  forgotText: {
    color: '#2c79b8',
    fontSize: 13,
  },
  loginBtn: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  loginBtnGradient: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '300',
  },
  mascot: {
    position: 'absolute',
    right: 22,
    bottom: 18,
    width: 40,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f1b9cf',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mascotFace: {
    color: '#7a4760',
    fontSize: 18,
  },
});