import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './ManagerAttendanceReport.styles';
import RoleMenuModal from '../RoleMenuModal';
import { managerMenuItems, managerMenuTitle } from '../roleMenus';
import RoleHeader from '../components/ui/RoleHeader';
import AquaticBackground from '../components/ui/AquaticBackground';
import PrimaryButton from '../components/ui/PrimaryButton';

const summaryCards = [
  { id: 'present', value: '22', label: 'ימי נוכחות', tone: 'present' },
  { id: 'absent', value: '5', label: 'חיסורים', tone: 'absent' },
  { id: 'late', value: '3', label: 'איחורים', tone: 'late' },
];

const dailyRows = [
  { id: '01', date: '01.06', status: 'נוכח', tone: 'present' },
  { id: '02', date: '02.06', status: 'חיסור', tone: 'absent' },
  { id: '03', date: '03.06', status: 'נוכח', tone: 'present' },
  { id: '04', date: '04.06', status: 'איחור', tone: 'late' },
  { id: '05', date: '05.06', status: 'נוכח', tone: 'present' },
  { id: '06', date: '06.06', status: 'נוכח', tone: 'present' },
];

const SummaryCard = ({ value, label, tone }) => (
  <View style={[styles.summaryCard, tone === 'present' ? styles.summaryPresent : null, tone === 'absent' ? styles.summaryAbsent : null, tone === 'late' ? styles.summaryLate : null]}>
    <Text style={[styles.summaryValue, tone === 'present' ? styles.valuePresent : null, tone === 'absent' ? styles.valueAbsent : null, tone === 'late' ? styles.valueLate : null]}>{value}</Text>
    <Text style={styles.summaryLabel}>{label}</Text>
  </View>
);

const DailyRow = ({ date, status, tone }) => (
  <View style={[styles.dailyRow, tone === 'present' ? styles.rowPresent : null, tone === 'absent' ? styles.rowAbsent : null, tone === 'late' ? styles.rowLate : null]}>
    <Text style={styles.dailyStatus}>{status}</Text>
    <Text style={styles.dailyDate}>{date}</Text>
  </View>
);

export default function ManagerAttendanceReport({ navigation }) {
  const [showNavMenu, setShowNavMenu] = React.useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <AquaticBackground variant="manager" />
      <RoleHeader
        title={'דו"ח נוכחות מפורט'}
        subtitle="נתוני חיסורים, איחורים ונוכחות לפי תאריכים"
        onMenuPress={() => setShowNavMenu(true)}
        rightIcon="⌕"
      />

      <RoleMenuModal
        visible={showNavMenu}
        onClose={() => setShowNavMenu(false)}
        title={managerMenuTitle}
        items={managerMenuItems}
        navigation={navigation}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.mainCard}>
          <Text style={styles.sectionTitle}>סיכום חודשי</Text>

          <View style={styles.summaryGrid}>
            <SummaryCard value={summaryCards[0].value} label={summaryCards[0].label} tone={summaryCards[0].tone} />
            <SummaryCard value={summaryCards[1].value} label={summaryCards[1].label} tone={summaryCards[1].tone} />
            <SummaryCard value={summaryCards[2].value} label={summaryCards[2].label} tone={summaryCards[2].tone} />
          </View>

          <Text style={[styles.sectionTitle, styles.dailyTitle]}>פירוט יומי</Text>

          {dailyRows.map((row) => (
            <DailyRow key={row.id} date={row.date} status={row.status} tone={row.tone} />
          ))}
        </View>

        <PrimaryButton
          label={'הורדת דו"ח PDF'}
          style={styles.exportButtonShell}
          gradientStyle={styles.exportButton}
          textStyle={styles.exportButtonText}
          colorsOverride={['#2E77BC', '#255E97']}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
