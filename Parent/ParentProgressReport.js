import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './ParentProgressReport.styles';
import RoleMenuModal from '../RoleMenuModal';
import { parentMenuItems, parentMenuTitle } from '../roleMenus';
import RoleHeader from '../components/ui/RoleHeader';
import AquaticBackground from '../components/ui/AquaticBackground';
import PrimaryButton from '../components/ui/PrimaryButton';

const reportRows = [
  { label: 'שליטה בנשימות', value: 0.8, percent: '80%' },
  { label: 'ציפה על הגב', value: 0.65, percent: '65%' },
  { label: 'ציפה על הבטן', value: 0.9, percent: '90%' },
  { label: 'תנועות ידיים', value: 0.72, percent: '72%' },
  { label: 'תנועות רגליים', value: 0.6, percent: '60%' },
];

const ProgressBar = ({ label, value, percent }) => (
  <View style={styles.progressItem}>
    <View style={styles.progressLabelRow}>
      <Text style={styles.progressLabel}>{label}</Text>
      <Text style={styles.progressPercent}>{percent}</Text>
    </View>

    <View style={styles.progressTrack}>
      <View style={[styles.progressFill, { width: `${value * 100}%` }]} />
    </View>
  </View>
);

const ActionButton = ({ label }) => (
  <PrimaryButton
    label={label}
    style={styles.actionButtonShell}
    gradientStyle={styles.actionButton}
    textStyle={styles.actionButtonText}
    colorsOverride={['#2E77BC', '#255E97']}
  />
);

export default function ParentProgressReport({ navigation }) {
  const [showNavMenu, setShowNavMenu] = React.useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <AquaticBackground variant="parent" />
      <RoleHeader
        title="דו״ח התקדמות מפורט"
        subtitle="ניתוח ביצועי ילד לפי תרגילי השחיה"
        onMenuPress={() => setShowNavMenu(true)}
        rightIcon="⌕"
        rightLabel="חיפוש"
      />

      <RoleMenuModal
        visible={showNavMenu}
        onClose={() => setShowNavMenu(false)}
        title={parentMenuTitle}
        items={parentMenuItems}
        navigation={navigation}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.mainCard}>
          <View style={styles.reportHeader}>
            <Text style={styles.reportChild}>עומר - קבוצת דולפינים</Text>
            <Text style={styles.reportDate}>תאריכים: החודש האחרון</Text>
          </View>

          <Text style={styles.sectionTitle}>מדדי התקדמות</Text>

          {reportRows.map((item) => (
            <ProgressBar
              key={item.label}
              label={item.label}
              value={item.value}
              percent={item.percent}
            />
          ))}

          <Text style={styles.sectionTitle}>הערות מהמדריך</Text>
          <View style={styles.notesBox}>
            <Text style={styles.notesText}>נעמת מראה שיפור עקבי...</Text>
          </View>

          <ActionButton label='הורדת דו״ח PDF' />
        </View>

        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
          <Text style={styles.bottomLink}>חזרה ללוח הורה</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
