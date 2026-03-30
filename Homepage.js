import React, { useRef, useEffect, useState } from 'react';
import { registerRootComponent } from 'expo';
import {
  StyleSheet, Text, View, Animated, Dimensions, TouchableOpacity,
  TextInput, StatusBar, Easing, KeyboardAvoidingView, Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Svg, { Path } from 'react-native-svg';

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
        })
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.waveContainer, { transform: [{ translateX }] }]}>
      <Svg width={2400} height={150} viewBox="0 0 2400 150" preserveAspectRatio="none">
        <Path fill={color} d={d} />
      </Svg>
    </Animated.View>
  );
};

// ========================================
// 2. FLAWLESS 3D BUBBLES (Recursive Fix)
// ========================================
const Bubble = ({ size, left, duration, delay }) => {
  const progress = useRef(new Animated.Value(0)).current;
  const sway = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const float = Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration,
        delay,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

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
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    float.start();
    swayAnim.start();

    return () => {
      float.stop();
      swayAnim.stop();
    };
  }, []);

  // Smooth vertical movement (NO reset)
  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [height + 50, -150],
  });

  // Fade in/out smoothly
  const opacity = progress.interpolate({
    inputRange: [0, 0.1, 0.8, 1],
    outputRange: [0, 1, 1, 0],
  });

  // Side sway
  const translateX = sway.interpolate({
    inputRange: [-1, 1],
    outputRange: [-20, 20],
  });

  return (
    <Animated.View
      style={[
        styles.bubbleWrapper,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          left,
          transform: [{ translateY }, { translateX }],
          opacity,
        },
      ]}
    >
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.1)']}
        style={{
          flex: 1,
          borderRadius: size / 2,
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.4)',
        }}
      />
    </Animated.View>
  );
};

// ========================================
// 3. MAIN APP COMPONENT
// ========================================
export default function App() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [showPassword, setShowPassword] = useState(false);

  const surfaceOpacity = scrollY.interpolate({
    inputRange: [0, height * 0.8],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const navBg = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: ['rgba(0, 21, 41, 0.4)', 'rgba(0, 21, 41, 0.85)'],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      {/* Deep Ocean Base */}
      <LinearGradient colors={['#003d5c', '#002a4d', '#001529']} style={StyleSheet.absoluteFill} />

      {/* Surface Water */}
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: surfaceOpacity }]}>
        <LinearGradient colors={['#0099cc', '#006994', '#003d5c']} style={StyleSheet.absoluteFill} />
      </Animated.View>

      {/* Flawless Bubbles */}
      <Bubble size={15} left={width * 0.15} duration={12000} delay={0} />
      <Bubble size={30} left={width * 0.5} duration={16000} delay={2000} />
      <Bubble size={12} left={width * 0.8} duration={9000} delay={1000} />
      <Bubble size={45} left={width * 0.3} duration={18000} delay={4000} />
      <Bubble size={20} left={width * 0.75} duration={14000} delay={6000} />

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
          <LinearGradient colors={['#00d4ff', '#0099cc']} style={styles.logoIcon}>
            <Text style={styles.logoEmoji}>🌊</Text>
          </LinearGradient>
          <Text style={styles.logoText}>Aqua Oasis</Text>
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
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        
        {/* HERO SECTION */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Dive Into</Text>
          <Text style={[styles.heroTitle, styles.gradientText]}>Serenity</Text>
          <Text style={styles.heroSubtitle}>
            Experience the perfect blend of ocean depths and poolside paradise. Your tranquil escape awaits.
          </Text>
          <TouchableOpacity style={styles.primaryBtn}>
            <LinearGradient colors={['#00d4ff', '#0099cc']} style={styles.btnGradient}>
              <Text style={styles.primaryBtnText}>Explore Features</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* FEATURES SECTION */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Features</Text>
            <Text style={styles.sectionSubtitle}>Everything you need for the perfect aquatic lifestyle</Text>
          </View>
          
          <View style={styles.featuresGrid}>
            {[
              { icon: '🌡️', title: 'Smart Temp', desc: 'Monitor pool temperatures in real-time with our advanced IoT sensors' },
              { icon: '🌊', title: 'Tide Forecasts', desc: 'Get accurate ocean tide and weather forecasts for your beach activities' },
              { icon: '🏊', title: 'Workout Tracker', desc: 'Track your swimming workouts and improve your performance' },
              { icon: '🎯', title: 'Virtual Designer', desc: 'Design your dream pool with our interactive 3D visualization tool' }
            ].map((f, i) => (
              <BlurView intensity={30} tint="dark" style={styles.featureCard} key={i}>
                <View style={styles.featureIconContainer}>
                  <Text style={styles.featureIcon}>{f.icon}</Text>
                </View>
                <Text style={styles.featureTitle}>{f.title}</Text>
                <Text style={styles.featureDesc}>{f.desc}</Text>
              </BlurView>
            ))}
          </View>
        </View>

        {/* LOGIN SECTION */}
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.section}>
          <BlurView intensity={40} tint="dark" style={styles.loginCard}>
            <View style={styles.loginIconContainer}>
              <LinearGradient colors={['#00d4ff', '#0099cc']} style={styles.loginIconGradient}>
                 <Text style={styles.loginEmoji}>🐚</Text>
              </LinearGradient>
            </View>
            <Text style={styles.loginHeader}>Welcome Back</Text>
            <Text style={styles.loginSub}>Sign in to your Aqua Oasis account</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email address</Text>
              <TextInput style={styles.input} placeholderTextColor="rgba(255,255,255,0.4)" keyboardType="email-address" autoCapitalize="none" />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordRow}>
                <TextInput style={[styles.input, { flex: 1, borderBottomWidth: 0 }]} secureTextEntry={!showPassword} />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.loginBtn}>
              <LinearGradient colors={['#00d4ff', '#0099cc']} style={styles.btnGradient}>
                <Text style={styles.primaryBtnText}>Dive In</Text>
              </LinearGradient>
            </TouchableOpacity>
          </BlurView>
        </KeyboardAvoidingView>

        {/* FOOTER */}
        <View style={styles.footer}>
          <View style={styles.footerBrand}>
            <Text style={styles.footerEmoji}>🌊</Text>
            <Text style={styles.footerBrandText}>Aqua Oasis</Text>
          </View>
          <Text style={styles.footerText}>Made with 💙 for water lovers everywhere</Text>
          <Text style={styles.copyright}>© 2024 Aqua Oasis. All rights reserved.</Text>
        </View>

      </Animated.ScrollView>
    </View>
  );
}

// ========================================
// STYLES
// ========================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#001529' },
  scrollContent: { paddingTop: 100, paddingBottom: 60 },
  waveContainer: { position: 'absolute', bottom: 0, left: 0, width: 2400, height: 150, zIndex: 0 },
  bubbleWrapper: { position: 'absolute', zIndex: 1 },
  
  navbar: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,

  height: 90, // fixed height
  paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight || 20,

  paddingHorizontal: '5%',

  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',

  zIndex: 100,
  borderBottomWidth: 1,
  borderBottomColor: 'rgba(255,255,255,0.1)',
},
  navBrand: { flexDirection: 'row', alignItems: 'center' },
  logoIcon: {
    width: 45, height: 45, borderRadius: 22.5, 
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  logoEmoji: { fontSize: 22, includeFontPadding: false },
  logoText: { color: '#fff', fontSize: 25, fontWeight: '700', includeFontPadding: false },
  
  hamburger: { flexDirection: 'column', justifyContent: 'center' },
  hamburgerLine: { width: 28, height: 2, backgroundColor: '#fff', borderRadius: 2 },

  hero: { alignItems: 'center', justifyContent: 'center', minHeight: height * 0.7, paddingHorizontal: '5%', zIndex: 10 },
  heroTitle: { fontSize: clamp(40, width * 0.12, 60), fontWeight: '800', color: '#fff', textAlign: 'center', lineHeight: 60 },
  gradientText: { color: '#00d4ff', textShadowColor: 'rgba(0, 212, 255, 0.5)', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 20 },
  heroSubtitle: { color: 'rgba(255, 255, 255, 0.85)', textAlign: 'center', fontSize: 16, marginTop: 25, marginBottom: 40, lineHeight: 26, fontWeight: '300' },
  
  primaryBtn: { width: '80%', maxWidth: 300, borderRadius: 50, overflow: 'hidden', shadowColor: '#00d4ff', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 5 },
  btnGradient: { paddingVertical: 16, alignItems: 'center', justifyContent: 'center' },
  primaryBtnText: { color: '#001529', fontWeight: 'bold', fontSize: 16 },

  section: { marginTop: 40, paddingHorizontal: '5%', zIndex: 10 },
  sectionHeader: { alignItems: 'center', marginBottom: 40 },
  sectionTitle: { fontSize: 32, fontWeight: '700', color: '#fff', marginBottom: 10 },
  sectionSubtitle: { color: 'rgba(255, 255, 255, 0.7)', fontSize: 14, textAlign: 'center', paddingHorizontal: 20 },
  
  featuresGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  featureCard: {
    width: '100%', borderRadius: 24, padding: 30, marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.18)', overflow: 'hidden', alignItems: 'center'
  },
  featureIconContainer: {
    width: 80, height: 80, borderRadius: 24, backgroundColor: 'rgba(0, 212, 255, 0.15)',
    justifyContent: 'center', alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  featureIcon: { fontSize: 36 },
  featureTitle: { color: '#fff', fontSize: 18, fontWeight: '700', marginBottom: 10 },
  featureDesc: { color: 'rgba(255, 255, 255, 0.75)', fontSize: 14, lineHeight: 22, textAlign: 'center' },

  loginCard: {
    borderRadius: 30, padding: 40, marginTop: 40, backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.18)', overflow: 'hidden'
  },
  loginIconContainer: { alignItems: 'center', marginBottom: 20 },
  loginIconGradient: { width: 70, height: 70, borderRadius: 20, justifyContent: 'center', alignItems: 'center', shadowColor: '#00d4ff', shadowOpacity: 0.3, shadowRadius: 20 },
  loginEmoji: { fontSize: 32 },
  loginHeader: { color: '#fff', fontSize: 24, fontWeight: '700', textAlign: 'center', marginBottom: 8 },
  loginSub: { color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center', marginBottom: 35, fontSize: 14 },
  
  inputGroup: { marginBottom: 25 },
  label: { color: 'rgba(255, 255, 255, 0.5)', fontSize: 12, marginBottom: 8, paddingLeft: 2 },
  input: { color: '#fff', fontSize: 16, paddingVertical: 10, borderBottomWidth: 2, borderBottomColor: 'rgba(255, 255, 255, 0.2)' },
  passwordRow: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'rgba(255, 255, 255, 0.2)' },
  eyeIcon: { fontSize: 18, padding: 10, opacity: 0.8 },
  loginBtn: { borderRadius: 30, overflow: 'hidden', marginTop: 10 },

  footer: { marginTop: 80, paddingTop: 40, paddingBottom: 20, borderTopWidth: 1, borderTopColor: 'rgba(255, 255, 255, 0.1)', alignItems: 'center', zIndex: 10 },
  footerBrand: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 15 },
  footerEmoji: { fontSize: 24 },
  footerBrandText: { color: '#fff', fontSize: 22, fontWeight: '600' },
  footerText: { color: 'rgba(255, 255, 255, 0.6)', fontSize: 14, marginBottom: 10, textAlign: 'center' },
  copyright: { color: 'rgba(255, 255, 255, 0.4)', fontSize: 12 },
});

function clamp(min, val, max) { return Math.min(Math.max(val, min), max); }

registerRootComponent(App);