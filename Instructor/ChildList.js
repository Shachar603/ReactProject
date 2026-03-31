import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './InstructorHomepage.styles';
import RoleMenuModal from '../RoleMenuModal';
import { instructorMenuItems, instructorMenuTitle } from '../roleMenus';
import RoleHeader from '../components/ui/RoleHeader';
import AquaticBackground from '../components/ui/AquaticBackground';
import AppCard from '../components/ui/AppCard';


const children = [
  { name: 'אור', class: 'כיתה ח', status: 'פעיל' },
  { name: 'מאיה', class: 'כיתה ז', status: 'פעיל' },
  { name: 'דניאל', class: 'כיתה ו', status: 'פעיל' },
  { name: 'שירה', class: 'כיתה ח', status: 'פעיל' },
  { name: 'עומר', class: 'כיתה ז', status: 'פעיל' },
];

export default function ChildList() {
  const navigation = useNavigation();
  const [showNavMenu, setShowNavMenu] = React.useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <AquaticBackground variant="instructor" />
      <RoleHeader
        title="בחר ילד"
        subtitle="בחר את הילד כדי לצפות בפרטיו"
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
        <AppCard style={styles.surfaceCard}>
          <Text style={styles.helperTitle}>רשימת הילדים</Text>
          {children.map((child) => (
            <View key={child.name} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12, borderWidth: 1, borderColor: '#DFEAF6', backgroundColor: '#F8FBFF' }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ChildProfile', { child })}
                activeOpacity={0.7}
                style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(31, 94, 155, 0.15)', justifyContent: 'center', alignItems: 'center', marginRight: 10 }}
              >
                <Text style={{ color: '#1F5E9B', fontWeight: '700' }}>{child.name[0]}</Text>
              </TouchableOpacity>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text style={{ color: '#1F5E9B', fontWeight: '700', writingDirection: 'rtl' }}>{child.name}</Text>
                <Text style={{ color: '#607286', fontSize: 12, writingDirection: 'rtl' }}>{child.class} • {child.status}</Text>
              </View>
            </View>
          ))}
        </AppCard>
      </ScrollView>
    </SafeAreaView>
  );
}
