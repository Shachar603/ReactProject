import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './ParentProgressReport.styles';

const reportRows = [
  { label: 'ציפה וביטחון במים', value: 'התקדמות טובה מאוד' },
  { label: 'שליטה נשימתית', value: 'שיפור יציב משבוע לשבוע' },
  { label: 'כניסה ויציאה עצמאית', value: 'זקוקה לעוד חיזוק קל' },
  { label: 'שיתוף פעולה בשיעור', value: 'מצוין' },
];

export default function ParentProgressReport() {
  const navigation = useNavigation();

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
        <TouchableOpacity activeOpacity={0.75} style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Text style={styles.headerIcon}>‹</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>דו"ח התקדמות</Text>
          <Text style={styles.headerSubtitle}>סיכום החודש האחרון</Text>
        </View>

        <View style={styles.iconButton} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.mainCard}>
          <Text style={styles.childName}>נעמה שוורצנגר</Text>
          <Text style={styles.reportDate}>תאריכים: החודש האחרון</Text>

          {reportRows.map((row) => (
            <View key={row.label} style={styles.reportRow}>
              <Text style={styles.reportLabel}>{row.label}</Text>
              <Text style={styles.reportValue}>{row.value}</Text>
            </View>
          ))}

          <TouchableOpacity activeOpacity={0.88} style={styles.buttonShell} onPress={() => navigation.goBack()}>
            <LinearGradient
              colors={['#38AEEF', '#2E95E3']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>חזרה ללוח הורה</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
