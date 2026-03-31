import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Dimensions, Easing, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const variants = {
  manager: {
    gradient: ['#E4F6FF', '#D3EEFB', '#BEE3F7'],
    bubble: 'rgba(95, 177, 226, 0.22)',
    waveBack: 'rgba(126, 196, 237, 0.35)',
    waveFront: 'rgba(155, 213, 244, 0.45)',
  },
  instructor: {
    gradient: ['#EAF4FC', '#DCEEFF', '#CFE7FA'],
    bubble: 'rgba(100, 164, 230, 0.2)',
    waveBack: 'rgba(145, 196, 236, 0.33)',
    waveFront: 'rgba(176, 218, 247, 0.43)',
  },
  parent: {
    gradient: ['#E8F7FF', '#DBF1FC', '#CEEAF8'],
    bubble: 'rgba(85, 169, 223, 0.2)',
    waveBack: 'rgba(132, 191, 233, 0.34)',
    waveFront: 'rgba(163, 214, 245, 0.44)',
  },
  auth: {
    gradient: ['#DDECF7', '#D2E4F2', '#C8DDEA'],
    bubble: 'rgba(123, 167, 205, 0.18)',
    waveBack: 'rgba(157, 197, 227, 0.33)',
    waveFront: 'rgba(175, 210, 236, 0.42)',
  },
};

function Bubble({ color, delay, left, size, duration }) {
  const progress = useRef(new Animated.Value(0)).current;
  const sway = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const floatAnim = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(progress, {
          toValue: 1,
          duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    );

    const swayAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(sway, { toValue: 1, duration: 1800, useNativeDriver: true }),
        Animated.timing(sway, { toValue: -1, duration: 2600, useNativeDriver: true }),
        Animated.timing(sway, { toValue: 0, duration: 1800, useNativeDriver: true }),
      ]),
    );

    floatAnim.start();
    swayAnim.start();

    return () => {
      progress.stopAnimation();
      sway.stopAnimation();
    };
  }, [delay, duration, progress, sway]);

  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [height + 50, -120],
  });

  const opacity = progress.interpolate({
    inputRange: [0, 0.12, 0.85, 1],
    outputRange: [0, 0.9, 0.7, 0],
  });

  const translateX = sway.interpolate({
    inputRange: [-1, 1],
    outputRange: [-14, 14],
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.bubble,
        {
          left,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          transform: [{ translateY }, { translateX }],
          opacity,
        },
      ]}
    />
  );
}

export default function AquaticBackground({ variant = 'manager' }) {
  const theme = variants[variant] || variants.manager;
  const bubbles = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, index) => ({
        id: `bubble-${index}`,
        left: Math.random() * width,
        size: 10 + Math.random() * 22,
        delay: Math.floor(Math.random() * 12000),
        duration: 12000 + Math.floor(Math.random() * 8000),
      })),
    [],
  );

  return (
    <>
      <LinearGradient colors={theme.gradient} style={StyleSheet.absoluteFill} />

      <View pointerEvents="none" style={[styles.waveBack, { backgroundColor: theme.waveBack }]} />
      <View pointerEvents="none" style={[styles.waveFront, { backgroundColor: theme.waveFront }]} />

      {bubbles.map((bubble) => (
        <Bubble
          key={bubble.id}
          color={theme.bubble}
          left={bubble.left}
          size={bubble.size}
          delay={bubble.delay}
          duration={bubble.duration}
        />
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  waveBack: {
    position: 'absolute',
    top: 84,
    left: -28,
    right: -28,
    height: 92,
    borderRadius: 90,
  },
  waveFront: {
    position: 'absolute',
    top: 102,
    left: -18,
    right: -18,
    height: 82,
    borderRadius: 90,
  },
  bubble: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
});
