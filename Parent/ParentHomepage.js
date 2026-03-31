import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './ParentHomepage.styles';
import RoleMenuModal from '../RoleMenuModal';
import { parentMenuItems, parentMenuTitle } from '../roleMenus';
import RoleHeader from '../components/ui/RoleHeader';
import PrimaryButton from '../components/ui/PrimaryButton';
import AquaticBackground from '../components/ui/AquaticBackground';

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
  <PrimaryButton
    label={label}
    onPress={onPress}
    style={styles.actionButtonShell}
    gradientStyle={styles.actionButton}
    textStyle={styles.actionButtonText}
    colorsOverride={['#38AEEF', '#2E95E3']}
  />
);

export default function ParentHomepage() {
  const navigation = useNavigation();
  const [showNavMenu, setShowNavMenu] = React.useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <AquaticBackground variant="parent" />

      <RoleHeader
        title="לוח הורה"
        subtitle="מעקב אחרי התקדמות הילד"
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
