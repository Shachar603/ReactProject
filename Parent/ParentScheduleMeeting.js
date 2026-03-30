import React, { useMemo, useState } from 'react';
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
import styles from './ParentScheduleMeeting.styles';

const weekdayHeaders = ['ש', 'ו', 'ה', 'ד', 'ג', 'ב', 'א'];
const timeSlots = ['09:00', '10:30', '12:00', '13:30', '15:00'];
const dayPalette = ['#F2DDDE', '#EEE9BD', '#BFE6D8'];

const getMonthConfig = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const leadingPlaceholders = (firstDay + 1) % 7;
  const cells = [];

  for (let i = 0; i < leadingPlaceholders; i += 1) {
    cells.push({ key: `blank-start-${i}`, isPlaceholder: true });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({
      key: `day-${day}`,
      day,
      isPlaceholder: false,
      color: dayPalette[(day - 1) % dayPalette.length],
    });
  }

  while (cells.length % 7 !== 0) {
    cells.push({ key: `blank-end-${cells.length}`, isPlaceholder: true });
  }

  return {
    monthLabel: `${month + 1}.${year}`,
    cells,
  };
};

export default function ParentScheduleMeeting() {
  const navigation = useNavigation();
  const { monthLabel, cells } = useMemo(() => getMonthConfig(), []);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

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
          <Text style={styles.headerIcon}>☰</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>קביעת מפגש</Text>
          <Text style={styles.headerSubtitle}>בחרו תאריך ושעה לפגישה עם המדריך</Text>
        </View>

        <TouchableOpacity activeOpacity={0.75} style={styles.iconButton}>
          <Text style={styles.headerIcon}>⌕</Text>
          <Text style={styles.searchLabel}>חיפוש</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.mainCard}>
          <View style={styles.monthRow}>
            <Text style={styles.monthLabel}>חודש: {monthLabel}</Text>
          </View>

          <View style={styles.weekdayRow}>
            {weekdayHeaders.map((weekday) => (
              <Text key={weekday} style={styles.weekdayText}>
                {weekday}
              </Text>
            ))}
          </View>

          <View style={styles.calendarGrid}>
            {cells.map((cell) => {
              if (cell.isPlaceholder) {
                return <View key={cell.key} style={styles.dayPlaceholder} />;
              }

              const isSelected = selectedDay === cell.day;

              return (
                <TouchableOpacity
                  key={cell.key}
                  activeOpacity={0.85}
                  style={styles.dayOuter}
                  onPress={() => setSelectedDay(cell.day)}
                >
                  <View
                    style={[
                      styles.dayChip,
                      { backgroundColor: cell.color },
                      isSelected && styles.dayChipSelected,
                    ]}
                  >
                    <Text style={[styles.dayText, isSelected && styles.dayTextSelected]}>{cell.day}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.timeTitle}>בחרו שעה</Text>

          <View style={styles.timeSlotsRow}>
            {timeSlots.map((slot) => {
              const isSelected = selectedTime === slot;
              return (
                <TouchableOpacity
                  key={slot}
                  activeOpacity={0.86}
                  style={[styles.timeChip, isSelected && styles.timeChipSelected]}
                  onPress={() => setSelectedTime(slot)}
                >
                  <Text style={[styles.timeText, isSelected && styles.timeTextSelected]}>{slot}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            activeOpacity={0.88}
            style={styles.confirmButtonShell}
            onPress={() => navigation.goBack()}
            disabled={!selectedDay || !selectedTime}
          >
            <LinearGradient
              colors={selectedDay && selectedTime ? ['#38AEEF', '#2E95E3'] : ['#9DCBE7', '#8CB6D4']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.confirmButton}
            >
              <Text style={styles.confirmButtonText}>קביעת מפגש</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
