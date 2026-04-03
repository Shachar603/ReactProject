import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './ManagerSystemReports.styles';
import RoleMenuModal from '../RoleMenuModal';
import { managerMenuItems, managerMenuTitle } from '../roleMenus';
import RoleHeader from '../components/ui/RoleHeader';
import AquaticBackground from '../components/ui/AquaticBackground';

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

export default function ManagerSystemReports({ navigation, route }) {
  const [showNavMenu, setShowNavMenu] = React.useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <AquaticBackground variant="manager" />
      <RoleHeader
        title={'דו"חות מערכת'}
        subtitle="סקירה חודשית ונתוני התקדמות"
        onMenuPress={() => setShowNavMenu(true)}
        rightIcon="⌕"
      />

      <RoleMenuModal
        visible={showNavMenu}
        onClose={() => setShowNavMenu(false)}
        title={managerMenuTitle}
        items={managerMenuItems}
        navigation={navigation}
        routeParams={route?.params || {}}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.mainCard}>
          <Text style={styles.sectionTitle}>דו"חות זמינים</Text>

          {reportCards.map((card) => (
            <ReportCard
              key={card.title}
              title={card.title}
              subtitle={card.subtitle}
              onOpen={() => card.route && navigation.navigate(card.route, route?.params || {})}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
