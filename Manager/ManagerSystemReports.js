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
import styles from './ManagerSystemReports.styles';
import RoleMenuModal from '../RoleMenuModal';
import { managerMenuItems, managerMenuTitle } from '../roleMenus';

const reportCards = [
  {
    title: 'ניהול ילדים',
    subtitle: 'מעקב אחר סדרי משמעת וחידושים',
    route: 'ManagerManageChildren',
  },
  {
    title: 'דו"ח נוכחות',
    subtitle: 'הופעות, חיסורים ואיחורים',
    route: 'ManagerAttendanceReport',
  },
  {
    title: 'ניהול מדריכים',
    subtitle: 'זמני משמרת, הכשרה ומשובים',
    route: 'ManagerManageInstructors',
  },
  {
    title: 'דו"ח קבוצות',
    subtitle: 'השוואת ביצועים בין קבוצות',
  },
];

const ReportCard = ({ title, subtitle, onOpen }) => (
  <View style={styles.reportCard}>
    <TouchableOpacity activeOpacity={0.85} style={styles.openButton} onPress={onOpen}>
      <Text style={styles.openButtonText}>פתיחה</Text>
    </TouchableOpacity>

    <View style={styles.reportTextWrap}>
      <Text style={styles.reportTitle}>{title}</Text>
      <Text style={styles.reportSubtitle}>{subtitle}</Text>
    </View>
  </View>
);

export default function ManagerSystemReports({ navigation }) {
  const [showNavMenu, setShowNavMenu] = React.useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <LinearGradient
        colors={['#DFF4FF', '#CDEBFA', '#B8DFF5', '#A5D6F1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.aquaticBackground}
      />
      <View style={styles.waterGlowLarge} pointerEvents="none" />
      <View style={styles.waterGlowSmall} pointerEvents="none" />

      <View style={styles.headerWaveBack} />
      <View style={styles.headerWaveFront} />

      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.75} style={styles.iconButton} onPress={() => setShowNavMenu(true)}>
          <Text style={styles.headerIcon}>☰</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>דו"חות מערכת</Text>
          <Text style={styles.headerSubtitle}>סקירה חודשית ונתוני התקדמות</Text>
        </View>

        <TouchableOpacity activeOpacity={0.75} style={styles.iconButton}>
          <Text style={styles.headerIcon}>⌕</Text>
        </TouchableOpacity>
      </View>

      <RoleMenuModal
        visible={showNavMenu}
        onClose={() => setShowNavMenu(false)}
        title={managerMenuTitle}
        items={managerMenuItems}
        navigation={navigation}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.mainCard}>
          <Text style={styles.sectionTitle}>דו"חות זמינים</Text>

          {reportCards.map((card) => (
            <ReportCard
              key={card.title}
              title={card.title}
              subtitle={card.subtitle}
              onOpen={() => card.route && navigation.navigate(card.route)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
