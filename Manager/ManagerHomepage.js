import React, { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './ManagerHomepage.styles';

const groupCards = [
  'קבוצת אלופונים',
  'קבוצת צבי ים',
  'קבוצת דגים',
  'קבוצת סוסוני ים',
];

const StatCard = ({ number, label, variant }) => (
  <View style={[styles.statCard, variant === 'warm' ? styles.statCardWarm : styles.statCardCool]}>
    <Text style={[styles.statNumber, variant === 'warm' ? styles.statNumberWarm : styles.statNumberCool]}>
      {number}
    </Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const GroupRow = ({ title }) => (
  <View style={styles.groupRow}>
    <TouchableOpacity activeOpacity={0.85} style={styles.editButton}>
      <Text style={styles.editButtonText}>עריכה</Text>
    </TouchableOpacity>

    <View style={styles.groupTextWrap}>
      <Text style={styles.groupTitle}>{title}</Text>
      <Text style={styles.groupSubtitle}>ניהול מדריכים וילדים</Text>
    </View>
  </View>
);

export default function ManagerHomepage({ navigation }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigateToCenterSettings = () => {
    setIsMenuOpen(false);
    navigation.navigate('ManagerCenterSettings');
  };

  const navigateToSystemReports = () => {
    navigation.navigate('ManagerSystemReports');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <LinearGradient
        colors={['#DFF4FF', '#CDEBFA', '#B8DFF5', '#A5D6F1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.aquaticBackground}
      />
      <View style={styles.waterGlowLarge} pointerEvents="none" />
      <View style={styles.waterGlowSmall} pointerEvents="none" />

      <View style={styles.headerWaveBack} />
      <View style={styles.headerWaveFront} />

      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.iconButton}
          onPress={() => setIsMenuOpen((prev) => !prev)}
        >
          <Text style={styles.headerIcon}>☰</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>פאנל מנהל</Text>
          <Text style={styles.headerSubtitle}>ניהול חכם למערכת צפייה ונתונים</Text>
        </View>

        <TouchableOpacity activeOpacity={0.7} style={styles.iconButton}>
          <Text style={styles.headerIcon}>⌕</Text>
        </TouchableOpacity>
      </View>

      {isMenuOpen ? (
        <Pressable style={styles.menuBackdrop} onPress={() => setIsMenuOpen(false)}>
          <View style={styles.menuPanel}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.menuItem}
              onPress={navigateToCenterSettings}
            >
              <Text style={styles.menuItemText}>הגדרות מרכז</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      ) : null}

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.mainCard}>
          <Text style={styles.sectionTitle}>סטטיסטיקות מרכז</Text>

          <View style={styles.statsRow}>
            <StatCard number="42" label="ילדים פעילים" variant="cool" />
            <StatCard number="6" label="מדריכים" variant="warm" />
          </View>

          <Text style={[styles.sectionTitle, styles.groupsTitle]}>ניהול קבוצות</Text>

          {groupCards.map((groupName) => (
            <GroupRow key={groupName} title={groupName} />
          ))}

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.reportButtonShell}
            onPress={navigateToSystemReports}
          >
            <LinearGradient
              colors={['#31A5EA', '#2A8FD9']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.reportButton}
            >
              <Text style={styles.reportButtonText}>דו"חות מערכת</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}