import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './ManagerHomepage.styles';
import RoleMenuModal from '../RoleMenuModal';
import { managerMenuItems, managerMenuTitle } from '../roleMenus';
import RoleHeader from '../components/ui/RoleHeader';
import PrimaryButton from '../components/ui/PrimaryButton';
import AquaticBackground from '../components/ui/AquaticBackground';

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

export default function ManagerHomepage({ navigation, route }) {
  const [showNavMenu, setShowNavMenu] = useState(false);

  const navigateToSystemReports = () => {
    navigation.navigate('ManagerSystemReports', route?.params || {});
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <AquaticBackground variant="manager" />

      <RoleHeader
        title="פאנל מנהל"
        subtitle="ניהול חכם למערכת צפייה ונתונים"
        onMenuPress={() => setShowNavMenu(true)}
        rightIcon="⌕"
      />

      <RoleMenuModal
        visible={showNavMenu}
        onClose={() => setShowNavMenu(false)}
        title={managerMenuTitle}
        items={managerMenuItems}
        navigation={navigation}
        routeParams={route?.params || {}}
      />

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

          <PrimaryButton
            label={'דו"חות מערכת'}
            style={styles.reportButtonShell}
            gradientStyle={styles.reportButton}
            textStyle={styles.reportButtonText}
            onPress={navigateToSystemReports}
            colorsOverride={['#31A5EA', '#2A8FD9']}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}