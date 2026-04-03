import React, { useRef, useEffect, useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import RoleMenuModal from '../RoleMenuModal';
import { parentMenuItems, parentMenuTitle } from '../roleMenus';
import { colors } from '../theme/tokens';
import styles from './ParentHomepage.styles';

const { width, height } = Dimensions.get('window');
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

/* ============================================================
   ANIMATED WAVE
   ============================================================ */
const Wave = ({ color, duration, startPosition, d }) => {
  const translateX = useRef(new Animated.Value(startPosition)).current;

  useEffect(() => {
    const toPos = startPosition === 0 ? -600 : 0;
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: toPos,
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

/* ============================================================
   INFINITE REINCARNATING BUBBLES
   ============================================================ */
const Bubble = () => {
  const progress = useRef(new Animated.Value(0)).current;
  const sway = useRef(new Animated.Value(0)).current;

  const [config, setConfig] = useState({
    size: Math.random() * 28 + 8,
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
          size: Math.random() * 28 + 8,
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
      style={[
        styles.bubbleWrapper,
        {
          width: config.size,
          height: config.size,
          borderRadius: config.size / 2,
          left: config.left,
          transform: [{ translateY }, { translateX: translateXVal }],
          opacity,
        },
      ]}
    >
      <LinearGradient
        colors={['rgba(255,255,255,0.85)', 'rgba(255,255,255,0.08)']}
        style={{ flex: 1, borderRadius: config.size / 2, borderWidth: 1, borderColor: 'rgba(255,255,255,0.35)' }}
      />
    </Animated.View>
  );
};

/* ============================================================
   ANIMATED STAT CARD
   ============================================================ */
const StatCard = ({ icon, value, label, delay = 0 }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, delay, useNativeDriver: true }),
      Animated.timing(slideAnim, {
        toValue: 0, duration: 600, delay,
        easing: Easing.out(Easing.back(1.2)), useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1, duration: 600, delay,
        easing: Easing.out(Easing.back(1.2)), useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.statCardOuter,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }, { scale: scaleAnim }] },
      ]}
    >
      <BlurView intensity={25} tint="dark" style={styles.statCard}>
        <LinearGradient
          colors={['rgba(0,212,255,0.18)', 'rgba(0,153,204,0.06)']}
          style={styles.statIconWrap}
        >
          <Text style={styles.statIcon}>{icon}</Text>
        </LinearGradient>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </BlurView>
    </Animated.View>
  );
};

/* ============================================================
   ANIMATED ACTIVITY CARD
   ============================================================ */
const ActivityCard = ({ date, title, desc, icon, index }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    const delay = 500 + index * 150;
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, delay, useNativeDriver: true }),
      Animated.timing(slideAnim, {
        toValue: 0, duration: 500, delay,
        easing: Easing.out(Easing.quad), useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }], marginBottom: 14 }}>
      <BlurView intensity={18} tint="dark" style={styles.activityCard}>
        {/* Gradient accent line on the right */}
        <LinearGradient
          colors={['#00d4ff', '#0077aa']}
          style={styles.activityAccent}
        />

        <View style={styles.activityBody}>
          {/* Icon */}
          <View style={styles.activityIconWrap}>
            <LinearGradient
              colors={['rgba(0,212,255,0.22)', 'rgba(0,153,204,0.08)']}
              style={styles.activityIconBg}
            >
              <Text style={styles.activityIcon}>{icon}</Text>
            </LinearGradient>
          </View>

          {/* Text */}
          <View style={styles.activityTextWrap}>
            <Text style={styles.activityTitle}>{title}</Text>
            <Text style={styles.activityDesc}>{desc}</Text>
          </View>

          {/* Date badge */}
          <View style={styles.activityDateBadge}>
            <Text style={styles.activityDate}>{date}</Text>
          </View>
        </View>
      </BlurView>
    </Animated.View>
  );
};

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
const recentActivities = [
  { date: '24.12', title: 'תרגול ציפה', desc: 'שיפור ביכולת שמירה על איזון', icon: '🏊' },
  { date: '12.11', title: 'כניסה למים', desc: 'ביטחון בעלייה וירידה מהמקצה', icon: '🌊' },
  { date: '17.9', title: 'שליטה נשימתית', desc: 'יכולת נשיפה ארוכה מתחת למים', icon: '💨' },
];

const actionButtons = [
  { label: "צ'אט עם מדריך", icon: '💬', screen: 'ParentChat', gradient: ['#00d4ff', '#0099cc'] },
  { label: 'דו"ח התקדמות הילד', icon: '📊', screen: 'ParentProgressReport', gradient: ['#00b8d4', '#0088a0'] },
  { label: 'קביעת מפגש', icon: '📅', screen: 'ParentScheduleMeetingNew', gradient: ['#00897B', '#00695C'] },
];

export default function ParentHomepage() {
  const navigation = useNavigation();
  const [showNavMenu, setShowNavMenu] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  // Hero animations
  const heroFade = useRef(new Animated.Value(0)).current;
  const heroSlide = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(heroFade, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(heroSlide, {
        toValue: 0, duration: 800,
        easing: Easing.out(Easing.quad), useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const bubblePool = useMemo(() => Array.from({ length: 6 }).map((_, i) => i), []);

  const surfaceOpacity = scrollY.interpolate({
    inputRange: [0, height * 0.6],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const navBg = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: ['rgba(0, 21, 41, 0.35)', 'rgba(0, 21, 41, 0.88)'],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* ── Deep ocean base ── */}
      <LinearGradient
        colors={['#004466', '#002e4a', colors.bgDeep]}
        style={StyleSheet.absoluteFill}
      />

      {/* ── Surface water shimmer ── */}
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: surfaceOpacity }]}>
        <LinearGradient
          colors={['#0099bb', '#006e8a', '#004466']}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      {/* ── Bubbles ── */}
      {bubblePool.map((id) => (
        <Bubble key={id} />
      ))}

      {/* ── Waves ── */}
      <Wave
        color="rgba(0,153,204,0.25)"
        duration={9000}
        startPosition={0}
        d="M0,75 C200,45 400,105 600,75 C800,45 1000,105 1200,75 L1200,150 L0,150 Z M1200,75 C1400,45 1600,105 1800,75 C2000,45 2200,105 2400,75 L2400,150 L1200,150 Z"
      />
      <Wave
        color="rgba(0,212,255,0.18)"
        duration={7000}
        startPosition={-600}
        d="M0,100 C300,60 500,130 800,90 C1000,60 1100,120 1200,100 L1200,150 L0,150 Z M1200,100 C1500,60 1700,130 2000,90 C2200,60 2300,120 2400,100 L2400,150 L1200,150 Z"
      />

      {/* ── NAVBAR ── */}
      <AnimatedBlurView
        intensity={20}
        tint="dark"
        style={[styles.navbar, { backgroundColor: navBg }]}
      >
        <TouchableOpacity
          style={styles.navIconBtn}
          activeOpacity={0.7}
          onPress={() => setShowNavMenu(true)}
        >
          <View style={styles.hamburgerLine} />
          <View style={{ height: 5 }} />
          <View style={styles.hamburgerLine} />
          <View style={{ height: 5 }} />
          <View style={styles.hamburgerLine} />
        </TouchableOpacity>

        <View style={styles.navCenter}>
          <LinearGradient colors={['#00d4ff', '#0099cc']} style={styles.navLogo}>
            <Text style={styles.navLogoEmoji}>🐬</Text>
          </LinearGradient>
          <Text style={styles.navTitle}>לוח הורה</Text>
        </View>

        <TouchableOpacity style={styles.navIconBtn} activeOpacity={0.7}>
          <Text style={styles.navBell}>🔔</Text>
        </TouchableOpacity>
      </AnimatedBlurView>

      {/* ── Navigation menu modal ── */}
      <RoleMenuModal
        visible={showNavMenu}
        onClose={() => setShowNavMenu(false)}
        title={parentMenuTitle}
        items={parentMenuItems}
        navigation={navigation}
      />

      {/* ── SCROLL CONTENT ── */}
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── HERO GREETING ── */}
        <Animated.View
          style={[
            styles.hero,
            { opacity: heroFade, transform: [{ translateY: heroSlide }] },
          ]}
        >
          <Text style={styles.heroWelcome}>שלום ענבל! 👋</Text>
          <View style={styles.heroChildRow}>
            <Text style={styles.heroChildLabel}>מעקב אחרי </Text>
            <Text style={styles.heroChildName}>נעמה</Text>
          </View>
          <Text style={styles.heroSubtitle}>
            סקירה כללית של ההתקדמות והפעילויות האחרונות
          </Text>
        </Animated.View>

        {/* ── STATS ROW ── */}
        <View style={styles.statsRow}>
          <StatCard icon="⭐" value="דרג 3" label="רמת שחייה" delay={200} />
          <StatCard icon="📅" value="24" label="שיעורים" delay={350} />
          <StatCard icon="🏆" value="87%" label="התקדמות" delay={500} />
        </View>

        {/* ── RECENT ACTIVITIES ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionDot} />
            <Text style={styles.sectionTitle}>פעילויות אחרונות</Text>
          </View>

          {recentActivities.map((activity, i) => (
            <ActivityCard key={activity.date} {...activity} index={i} />
          ))}
        </View>

        {/* ── INSTRUCTOR CARD ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionDot} />
            <Text style={styles.sectionTitle}>המדריך שלכם</Text>
          </View>

          <BlurView intensity={22} tint="dark" style={styles.instructorCard}>
            <LinearGradient
              colors={['#00d4ff', '#0077aa']}
              style={styles.instructorAvatar}
            >
              <Text style={styles.instructorInitials}>שש</Text>
            </LinearGradient>

            <View style={styles.instructorInfo}>
              <Text style={styles.instructorName}>שי שוורצנגר</Text>
              <Text style={styles.instructorRole}>מדריך שחייה ראשי</Text>
            </View>

            <TouchableOpacity
              style={styles.chatBtn}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('ParentChat')}
            >
              <LinearGradient
                colors={['#00d4ff', '#0099cc']}
                style={styles.chatBtnGradient}
              >
                <Text style={styles.chatBtnIcon}>💬</Text>
              </LinearGradient>
            </TouchableOpacity>
          </BlurView>
        </View>

        {/* ── ACTION BUTTONS ── */}
        <View style={styles.actionsSection}>
          {actionButtons.map((action, i) => (
            <TouchableOpacity
              key={i}
              style={styles.actionBtnOuter}
              activeOpacity={0.85}
              onPress={() => navigation.navigate(action.screen)}
            >
              <LinearGradient
                colors={action.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.actionBtnGradient}
              >
                <Text style={styles.actionBtnIcon}>{action.icon}</Text>
                <Text style={styles.actionBtnLabel}>{action.label}</Text>
                <Text style={styles.actionBtnArrow}>←</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── FOOTER ── */}
        <View style={styles.footer}>
          <View style={styles.footerBrand}>
            <Text style={styles.footerEmoji}>🌊</Text>
            <Text style={styles.footerBrandText}>Aqua Oasis</Text>
          </View>
          <Text style={styles.footerText}>
            נבנה באהבה 💙 לכל אוהבי המים
          </Text>
          <Text style={styles.footerCopy}>© 2024 Aqua Oasis. כל הזכויות שמורות.</Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
}
