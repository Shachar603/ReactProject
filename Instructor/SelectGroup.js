import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import styles from './InstructorHomepage.styles';
import RoleMenuModal from '../RoleMenuModal';
import { instructorMenuItems, instructorMenuTitle } from '../roleMenus';

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
    <SafeAreaView style={[styles.safeArea, { backgroundColor: '#F2F8FF' }]}> 
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <View style={styles.headerWaveBack} />
      <View style={styles.headerWaveFront} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => setShowNavMenu(true)} activeOpacity={0.75} style={styles.iconButton}>
          <Text style={styles.headerIcon}>☰</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { fontSize: 28 }]}>בחר קבוצה</Text>
          <Text style={styles.headerSubtitle}>בחר קבוצה לצפה בפרטי השיעור</Text>
        </View>
        <View style={styles.iconButton} />
      </View>

      <RoleMenuModal
        visible={showNavMenu}
        onClose={() => setShowNavMenu(false)}
        title={instructorMenuTitle}
        items={instructorMenuItems}
        navigation={navigation}
      />

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 24 }}>
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
            <View style={{ width: 34, height: 34, borderRadius: 12, backgroundColor: '#3C96F0', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>✎</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ borderRadius: 16, borderWidth: 1, borderColor: '#d0e6ff', backgroundColor: '#fff', padding: 14, shadowColor: '#000', shadowOpacity: 0.08, shadowOffset: { width: 0, height: 4 }, shadowRadius: 6, elevation: 2 }}>
          <Text style={{ color: '#2B6D9F', fontSize: 16, fontWeight: '700', marginBottom: 4 }}>איך לבחור?</Text>
          <Text style={{ color: '#6A7C9A', fontSize: 14, lineHeight: 20 }}>לחץ על קבוצה כדי לראות את כל התלמידים והשיעורים המתוזמנים.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
