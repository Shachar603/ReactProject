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
import { LinearGradient } from 'expo-linear-gradient';

const MANAGER_USER = {
  email: 'manager@aqua.co.il',
  password: 'Manager123!'
};

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isFormValid = useMemo(() => email.trim().length > 0 && password.length > 0, [email, password]);

  const handleLogin = () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedEmail === MANAGER_USER.email && password === MANAGER_USER.password) {
      navigation.replace('ManagerHomepage');
      return;
    }

    Alert.alert(
      'פרטי התחברות שגויים',
      'רק משתמש מנהל מורשה יכול להתחבר. בדקו את האימייל והסיסמה ונסו שוב.'
    );
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#d8e6f2" />

      <LinearGradient
        colors={['#d8e6f2', '#d2e2f0', '#cddfec']}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.waveTopBack} pointerEvents="none" />
      <View style={styles.waveTopFront} pointerEvents="none" />

      <View style={styles.headerRow}>
        <TouchableOpacity activeOpacity={0.8} style={styles.hamburgerBtn}>
          <View style={styles.hamburgerLine} />
          <View style={styles.hamburgerLine} />
          <View style={styles.hamburgerLine} />
        </TouchableOpacity>

        <Text style={styles.headerText}>ברוכים השבים!</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.centerWrap}
      >
        <View style={styles.card}>
          <Text style={styles.title}>התחברות</Text>

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

          <TouchableOpacity
            style={[styles.loginBtn, !isFormValid && styles.loginBtnDisabled]}
            activeOpacity={isFormValid ? 0.85 : 1}
            onPress={handleLogin}
            disabled={!isFormValid}
          >
            <LinearGradient
              colors={isFormValid ? ['#3aa8eb', '#2d94dd'] : ['#91bddd', '#84b4d6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.loginBtnGradient}
            >
              <Text style={styles.loginText}>התחברות</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.mascot}>
            <Text style={styles.mascotFace}>☺</Text>
          </View>
        </View>
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
  card: {
    borderRadius: 24,
    backgroundColor: '#eef1f8',
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
    backgroundColor: '#dfe4ee',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 44,
    color: '#233041',
    marginBottom: 4,
  },
  passwordRow: {
    backgroundColor: '#dfe4ee',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    marginBottom: 2,
  },
  passwordInput: {
    flex: 1,
    height: 44,
    color: '#233041',
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
  loginBtnDisabled: {
    opacity: 0.75,
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