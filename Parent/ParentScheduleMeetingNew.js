import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './ParentScheduleMeetingNew.styles';

const formatToday = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  return `${day}.${month}.${year}`;
};

export default function ParentScheduleMeetingNew({ route }) {
  const navigation = useNavigation();
  const [meetingNotes, setMeetingNotes] = useState('');

  const selectedDate = useMemo(() => route?.params?.selectedDate || formatToday(), [route?.params?.selectedDate]);
  const selectedDay = useMemo(() => {
    const day = parseInt((route?.params?.selectedDate || formatToday()).split('.')[0], 10);
    return Number.isNaN(day) ? null : day;
  }, [route?.params?.selectedDate]);
  const selectedTime = route?.params?.selectedTime || '10:00';

  const openDatePicker = () => {
    navigation.navigate('ParentScheduleMeeting', {
      mode: 'date',
      selectedDay,
      onSelectDate: (payload) => {
        const monthParts = payload.monthLabel.split('.');
        const month = String(monthParts[0]).padStart(2, '0');
        const year = monthParts[1];
        const day = String(payload.day).padStart(2, '0');

        navigation.navigate('ParentScheduleMeetingNew', {
          selectedDate: `${day}.${month}.${year}`,
          selectedTime,
        });
      },
    });
  };

  const openTimePicker = () => {
    navigation.navigate('ParentScheduleMeeting', {
      mode: 'time',
      selectedTime,
      onSelectTime: (time) => {
        navigation.navigate('ParentScheduleMeetingNew', {
          selectedDate,
          selectedTime: time,
        });
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <LinearGradient
        colors={['#BFE5FF', '#AFDBF8', '#A2D4F4']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.aquaticBackground}
      />

      <View style={styles.bigCircleLeft} />
      <View style={styles.bigCircleRight} />

      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.8} style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonIcon}>‹</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>קביעת מפגש חדש</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.mainCard}>
          <Text style={styles.sectionTitle}>פרטי המפגש</Text>

          <TouchableOpacity activeOpacity={0.88} style={styles.fieldCard} onPress={openDatePicker}>
            <View style={styles.fieldIconWrap}>
              <Text style={styles.fieldIcon}>□</Text>
            </View>

            <View style={styles.fieldTextWrap}>
              <Text style={styles.fieldLabel}>תאריך</Text>
              <Text style={styles.fieldValue}>{selectedDate}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.88} style={styles.fieldCard} onPress={openTimePicker}>
            <View style={styles.fieldIconWrap}>
              <Text style={styles.fieldIcon}>◌</Text>
            </View>

            <View style={styles.fieldTextWrap}>
              <Text style={styles.fieldLabel}>שעה</Text>
              <Text style={styles.fieldValue}>{selectedTime}</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.notesWrap}>
            <Text style={styles.notesLabel}>הערות נוספות</Text>
            <TextInput
              value={meetingNotes}
              onChangeText={setMeetingNotes}
              multiline
              textAlignVertical="top"
              placeholder="כתוב כאן..."
              placeholderTextColor="#92A6B8"
              style={styles.notesInput}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.88}
            style={styles.submitButtonShell}
            onPress={() => navigation.goBack()}
          >
            <LinearGradient
              colors={['#3D8FE9', '#1575E8']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>קבע פגישה</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}