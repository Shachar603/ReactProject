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
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';
import styles from './ParentScheduleMeeting.styles';
import RoleMenuModal from '../RoleMenuModal';
import { parentMenuItems, parentMenuTitle } from '../roleMenus';

const weekdayHeaders = ['ש', 'ו', 'ה', 'ד', 'ג', 'ב', 'א'];
const dayPalette = ['#F2DDDE', '#EEE9BD', '#BFE6D8'];
const timeOptions = ['09:00', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00'];

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

const TimeClock = ({ selectedTime }) => {
  const [hourPart, minutePart] = selectedTime.split(':');
  const hour = parseInt(hourPart, 10);
  const minute = parseInt(minutePart, 10);

  const center = 140;
  const radius = 95;

  const hourAngle = ((hour % 12) + minute / 60) * 30 - 90;
  const minuteAngle = minute * 6 - 90;

  const hourX = center + Math.cos((hourAngle * Math.PI) / 180) * 46;
  const hourY = center + Math.sin((hourAngle * Math.PI) / 180) * 46;

  const minuteX = center + Math.cos((minuteAngle * Math.PI) / 180) * 66;
  const minuteY = center + Math.sin((minuteAngle * Math.PI) / 180) * 66;

  return (
    <View style={styles.clockWrap}>
      <Svg width={280} height={280}>
        <Circle cx={center} cy={center} r={radius + 12} fill="#E0EDF7" stroke="#9CCCF2" strokeWidth="3" />
        <Circle cx={center} cy={center} r={radius} fill="#D8E4EC" />

        <SvgText x={center} y={58} fill="#2B74C2" fontSize="40" textAnchor="middle">12</SvgText>
        <SvgText x={center + 86} y={center + 12} fill="#2B74C2" fontSize="40" textAnchor="middle">3</SvgText>
        <SvgText x={center} y={center + 98} fill="#2B74C2" fontSize="40" textAnchor="middle">6</SvgText>
        <SvgText x={center - 86} y={center + 12} fill="#2B74C2" fontSize="40" textAnchor="middle">9</SvgText>

        <Line x1={center} y1={center} x2={hourX} y2={hourY} stroke="#1E78DF" strokeWidth="8" strokeLinecap="round" />
        <Line x1={center} y1={center} x2={minuteX} y2={minuteY} stroke="#59A5EE" strokeWidth="5" strokeLinecap="round" />
        <Circle cx={center} cy={center} r={8} fill="#1E78DF" />
      </Svg>
    </View>
  );
};

export default function ParentScheduleMeeting({ route }) {
  const navigation = useNavigation();
  const { monthLabel, cells } = useMemo(() => getMonthConfig(), []);
  const mode = route?.params?.mode || 'date';
  const onSelectDate = route?.params?.onSelectDate;
  const onSelectTime = route?.params?.onSelectTime;

  const [selectedDay, setSelectedDay] = useState(route?.params?.selectedDay || null);
  const [selectedTime, setSelectedTime] = useState(route?.params?.selectedTime || '10:00');
  const [showTimeOptions, setShowTimeOptions] = useState(false);
  const [showNavMenu, setShowNavMenu] = useState(false);

  const onBackPress = () => {
    setShowTimeOptions(false);
    setShowNavMenu(true);
  };

  const onDayPress = (day) => {
    setSelectedDay(day);
  };

  const onConfirmDate = () => {
    if (!selectedDay) {
      return;
    }

    if (typeof onSelectDate === 'function') {
      onSelectDate({ day: selectedDay, monthLabel });
    }

    navigation.goBack();
  };

  const onConfirmTime = () => {
    if (typeof onSelectTime === 'function') {
      onSelectTime(selectedTime);
    }

    navigation.goBack();
  };

  const renderDateStep = () => (
    <>
      <View style={styles.headerWaveBack} />
      <View style={styles.headerWaveFront} />

      <View style={styles.headerDate}>
        <TouchableOpacity activeOpacity={0.75} style={styles.iconButton} onPress={onBackPress}>
          <Text style={styles.headerIcon}>☰</Text>
        </TouchableOpacity>

        <View style={styles.headerCenterDate}>
          <Text style={styles.headerTitleDate}>בחירת תאריך</Text>
        </View>

        <TouchableOpacity activeOpacity={0.75} style={styles.iconButton}>
          <Text style={styles.headerIcon}>⌕</Text>
          <Text style={styles.searchLabel}>חיפוש</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.mainCard}>
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
                  onPress={() => onDayPress(cell.day)}
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

          <TouchableOpacity activeOpacity={0.88} style={styles.confirmButtonShell} onPress={onConfirmDate}>
            <LinearGradient
              colors={['#38AEEF', '#2E95E3']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.confirmButton}
            >
              <Text style={styles.confirmButtonText}>בחירת תאריך</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );

  const renderTimeStep = () => (
    <>
      <View style={styles.bigCircleLeft} />
      <View style={styles.bigCircleRight} />

      <View style={styles.headerTime}>
        <TouchableOpacity activeOpacity={0.8} style={styles.backButton} onPress={onBackPress}>
          <Text style={styles.backButtonIcon}>☰</Text>
        </TouchableOpacity>

        <View style={styles.timeHeaderCenter}>
          <Text style={styles.timeHeaderTitle}>קביעת מפגש חדש</Text>
          <Text style={styles.timeHeaderSub}>תאריך נבחר: {selectedDay}.{monthLabel}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContentTime} showsVerticalScrollIndicator={false}>
        <View style={styles.mainCardTime}>
          <Text style={styles.timeStepTitle}>בחירת שעה</Text>

          <TimeClock selectedTime={selectedTime} />

          <TouchableOpacity
            activeOpacity={0.86}
            style={styles.selectedTimeBox}
            onPress={() => setShowTimeOptions((prev) => !prev)}
          >
            <Text style={styles.selectedTimeBig}>{selectedTime}</Text>
            <Text style={styles.chevron}>⌄</Text>
          </TouchableOpacity>

          {showTimeOptions && (
            <View style={styles.timeOptionsList}>
              {timeOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  activeOpacity={0.8}
                  style={[styles.timeOptionItem, selectedTime === option && styles.timeOptionItemSelected]}
                  onPress={() => {
                    setSelectedTime(option);
                    setShowTimeOptions(false);
                  }}
                >
                  <Text style={[styles.timeOptionText, selectedTime === option && styles.timeOptionTextSelected]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <TouchableOpacity
            activeOpacity={0.88}
            style={styles.confirmTimeButtonShell}
            onPress={onConfirmTime}
          >
            <LinearGradient
              colors={['#3D8FE9', '#1575E8']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.confirmTimeButton}
            >
              <Text style={styles.confirmTimeButtonText}>בחירת שעה</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <LinearGradient
        colors={['#E3F6FF', '#D7EFFC', '#C5E7FA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.aquaticBackground}
      />

      {mode === 'date' ? renderDateStep() : renderTimeStep()}

      <RoleMenuModal
        visible={showNavMenu}
        onClose={() => setShowNavMenu(false)}
        title={parentMenuTitle}
        items={parentMenuItems}
        navigation={navigation}
      />
    </SafeAreaView>
  );
}
