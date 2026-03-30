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
import styles from './ParentHomepage.styles';

const recentActivities = [
  {
    date: '24.12.2025',
    title: 'תרגול ציפה',
    desc: 'שיפור ביכולת שמירה על איזון',
  },
  {
    date: '12.11.2025',
    title: 'כניסה למים',
    desc: 'ביטחון בעלייה וירידה מהמקצה',
  },
  {
    date: '17.9.2025',
    title: 'שליטה נשימתית',
    desc: 'יכולת נשיפה ארוכה מתחת למים',
  },
];

const ActivityCard = ({ date, title, desc }) => (
  <View style={styles.activityCard}>
    <Text style={styles.activityDate}>{date}</Text>

    <View style={styles.activityTextWrap}>
      <Text style={styles.activityTitle}>{title}</Text>
      <Text style={styles.activityDesc}>{desc}</Text>
    </View>
  </View>
);

const ActionButton = ({ label, onPress }) => (
  <TouchableOpacity activeOpacity={0.86} style={styles.actionButtonShell} onPress={onPress}>
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

export default function ParentHomepage() {
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
        <TouchableOpacity activeOpacity={0.75} style={styles.iconButton}>
          <Text style={styles.headerIcon}>☰</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>לוח הורה</Text>
          <Text style={styles.headerSubtitle}>מעקב אחרי התקדמות הילד</Text>
        </View>

        <TouchableOpacity activeOpacity={0.75} style={styles.iconButton}>
          <Text style={styles.headerIcon}>⌕</Text>
          <Text style={styles.searchLabel}>חיפוש</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.mainCard}>
          <View style={styles.topInfoRow}>
            <Text style={styles.bellIcon}>🔔</Text>

            <View style={styles.greetingWrap}>
              <Text style={styles.greeting}>
                שלום ענבל! <Text style={styles.childName}>נעמה</Text>
              </Text>
              <Text style={styles.greetingSub}>סקירה כללית של ההתקדמות של נעמה</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>פעילויות אחרונות</Text>

          {recentActivities.map((activity) => (
            <ActivityCard
              key={activity.date}
              date={activity.date}
              title={activity.title}
              desc={activity.desc}
            />
          ))}

          <Text style={styles.instructorText}>שם המדריך: שי שוורצנגר</Text>

          <ActionButton label="צ'אט עם מדריך" onPress={() => navigation.navigate('ParentChat')} />
          <ActionButton
            label='דו"ח התקדמות של הילד'
            onPress={() => navigation.navigate('ParentProgressReport')}
          />
          <ActionButton label="קביעת מפגש" onPress={() => navigation.navigate('ParentScheduleMeetingNew')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
