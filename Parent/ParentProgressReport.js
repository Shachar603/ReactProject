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
import styles from './ParentProgressReport.styles';

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
      <LinearGradient
        colors={['#39A9EA', '#2293DE']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={[styles.progressFill, { width: `${value * 100}%` }]}
      />
    </View>
  </View>
);

const ActionButton = ({ label }) => (
  <TouchableOpacity activeOpacity={0.86} style={styles.actionButtonShell}>
    <LinearGradient
      colors={['#38AEEF', '#2E95E3']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.actionButton}
    >
      <Text style={styles.actionButtonText}>{label}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

export default function ParentProgressReport({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <LinearGradient
        colors={['#E3F6FF', '#D7EFFC', '#C5E7FA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.aquaticBackground}
      />

      <View style={styles.headerWaveBack} />
      <View style={styles.headerWaveFront} />

      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.75} style={styles.iconButton}>
          <Text style={styles.headerIcon}>☰</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>דו״ח התקדמות מפורט</Text>
          <Text style={styles.headerSubtitle}>ניתוח ביצועי ילד לפי תרגילי השחיה</Text>
        </View>

        <TouchableOpacity activeOpacity={0.75} style={styles.iconButton}>
          <Text style={styles.headerIcon}>⌕</Text>
          <Text style={styles.searchLabel}>חיפוש</Text>
        </TouchableOpacity>
      </View>

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
