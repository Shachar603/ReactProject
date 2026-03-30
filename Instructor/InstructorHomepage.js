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
import styles from './InstructorHomepage.styles';

const classGroups = [
  { name: 'קבוצת השיטור', time: '10:00 - 10:30' },
  { name: 'קבוצת צבי ים', time: '11:00 - 11:30' },
  { name: 'קבוצת דגים', time: '12:00 - 12:30' },
];

const StatChip = ({ label, value, color, textColor }) => (
  <View style={[styles.chip, { backgroundColor: color, borderColor: color }]}> 
    <Text style={[styles.chipText, { color: textColor || '#fff' }]}>{`${value} ${label}`}</Text>
  </View>
);

const GroupRow = ({ title, time }) => (
  <View style={styles.groupRow}>
    <View style={styles.groupTextWrap}>
      <Text style={styles.groupTitle}>{title}</Text>
      <Text style={styles.groupSubtitle}>{time}</Text>
    </View>

    <TouchableOpacity style={styles.cancelButton} activeOpacity={0.8}>
      <Text style={styles.cancelButtonText}>ביטול השיעור</Text>
    </TouchableOpacity>
  </View>
);

export default function InstructorHomepage() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <View style={styles.headerWaveBack} />
      <View style={styles.headerWaveFront} />

      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.75} style={styles.iconButton}>
          <Text style={styles.headerIcon}>☰</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>לוח מדריך</Text>
          <Text style={styles.headerSubtitle}>ניהול שיעורים וצפייה בקבוצות</Text>
        </View>

        <TouchableOpacity activeOpacity={0.75} style={styles.iconButton}>
          <Text style={styles.headerIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.headerDate}>24.12.2025</Text>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
        <View style={styles.chipRow}>
          <StatChip label="פעילים" value="5" color="#27B73C" textColor="#FFFFFF" />
          <StatChip label="מוגבל" value="1" color="#F19DBA" textColor="#7D2D52" />
          <StatChip label="פעילים" value="3" color="#A4D3F1" textColor="#1F5784" />
        </View>

        <View style={styles.mainCard}>
          <Text style={styles.sectionTitle}>קבוצות ושיעורים היום</Text>
          {classGroups.map((group) => (
            <GroupRow key={group.name} title={group.name} time={group.time} />
          ))}

          <View style={styles.bottomActions}>
            <TouchableOpacity activeOpacity={0.85} style={[styles.actionButton, { backgroundColor: '#3C96F0' }]}>
              <Text style={styles.actionButtonText}>הצג את כלל הקבוצות</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.85} style={[styles.actionButton, { backgroundColor: '#1A79D3' }]}>
              <Text style={styles.actionButtonText}>שלח הודעה לכלל הקבוצות</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.85} style={[styles.actionButton, { backgroundColor: '#1C74DE' }]}>
              <Text style={styles.actionButtonText}>יצירת קבוצה חדשה</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
