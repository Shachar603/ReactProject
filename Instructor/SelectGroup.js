import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import styles from './InstructorHomepage.styles';
import RoleMenuModal from '../RoleMenuModal';
import { instructorMenuItems, instructorMenuTitle } from '../roleMenus';
import RoleHeader from '../components/ui/RoleHeader';
import AquaticBackground from '../components/ui/AquaticBackground';
import AppCard from '../components/ui/AppCard';

const groups = [
  { title: 'קבוצת השיטור', subtitle: 'יום ב׳ וש׳, 10:00 - 11:00' },
  { title: 'קבוצת צבי ים', subtitle: 'יום ג׳ , 11:30 - 12:30' },
  { title: 'קבוצת דגים', subtitle: 'יום ד׳ וש׳, 12:45 - 13:45' },
  { title: 'קבוצת כרישים', subtitle: 'יום ה׳, 14:00 - 15:00' },
  { title: 'קבוצת לווייתנים', subtitle: 'יום ו׳, 15:15 - 16:15' },
];

export default function SelectGroup({ navigation }) {
  const [showNavMenu, setShowNavMenu] = React.useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <AquaticBackground variant="instructor" />

      <RoleHeader
        title="בחר קבוצה"
        subtitle="בחר קבוצה לצפה בפרטי השיעור"
        onMenuPress={() => setShowNavMenu(true)}
        rightIcon=""
      />

      <RoleMenuModal
        visible={showNavMenu}
        onClose={() => setShowNavMenu(false)}
        title={instructorMenuTitle}
        items={instructorMenuItems}
        navigation={navigation}
      />

      <ScrollView contentContainerStyle={styles.screenContent} showsVerticalScrollIndicator={false}>
        {groups.map((g) => (
          <TouchableOpacity
            key={g.title}
            style={[styles.groupRow, { marginBottom: 12 }]}
            activeOpacity={0.82}
            onPress={() => navigation.navigate('GroupDetails', { group: g })}
          >
            <View style={styles.groupTextWrap}>
              <Text style={styles.groupTitle}>{g.title}</Text>
              <Text style={styles.groupSubtitle}>{g.subtitle}</Text>
            </View>
            <View style={styles.rowRightIcon}>
              <Text style={styles.rowRightIconText}>›</Text>
            </View>
          </TouchableOpacity>
        ))}

        <AppCard style={styles.helperCard}>
          <Text style={styles.helperTitle}>איך לבחור?</Text>
          <Text style={styles.helperText}>לחץ על קבוצה כדי לראות את כל התלמידים והשיעורים המתוזמנים.</Text>
        </AppCard>
      </ScrollView>
    </SafeAreaView>
  );
}
