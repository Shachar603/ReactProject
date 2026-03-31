import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './InstructorHomepage.styles';
import RoleMenuModal from '../RoleMenuModal';
import { instructorMenuItems, instructorMenuTitle } from '../roleMenus';
import RoleHeader from '../components/ui/RoleHeader';
import AquaticBackground from '../components/ui/AquaticBackground';
import AppCard from '../components/ui/AppCard';
import PrimaryButton from '../components/ui/PrimaryButton';

export default function GroupDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { group } = route.params || { group: { title: 'קבוצה', subtitle: '' } };
  const [showNavMenu, setShowNavMenu] = React.useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <AquaticBackground variant="instructor" />
      <RoleHeader
        title={group.title}
        subtitle={group.subtitle}
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
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.helperTitle}>נוכחות ממוצעת</Text>
              <Text style={{ color: '#204A78', fontSize: 28, fontWeight: '800' }}>92%</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.helperTitle}>שיעורים בקרוב</Text>
              <Text style={{ color: '#204A78', fontSize: 28, fontWeight: '800' }}>24</Text>
            </View>
          </View>

          <Text style={styles.helperTitle}>מדדי ביצועים</Text>
          <View style={{ height: 10, backgroundColor: '#E9F2FC', borderRadius: 10, overflow: 'hidden', marginBottom: 10 }}>
            <View style={{ width: '85%', height: '100%', backgroundColor: '#2C6FAF' }} />
          </View>
          <Text style={styles.helperText}>85% לעמידה ביעדי הקבוצה</Text>
        </AppCard>

        <PrimaryButton
          label="הצג את כל הילדים"
          style={{ marginTop: 14, borderRadius: 14 }}
          onPress={() => navigation.navigate('ChildList')}
          colorsOverride={['#2F6EAB', '#225A91']}
        />

        <AppCard style={[styles.surfaceCard, { marginTop: 14 }]}>
          <Text style={styles.helperTitle}>חברי קבוצה</Text>
          {[
            { name: 'עידו כהן', note: 'התקדמות מעולה' },
            { name: 'מיכל לוי', note: 'צורך חיזוק במהירות' },
            { name: 'דניאל יוסף', note: 'ביצועים טובים' },
            { name: 'עומר אברם', note: 'היענות טובה' },
          ].map((member) => (
            <View key={member.name} style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#EDF2F7', paddingBottom: 8 }}>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ color: '#1F5E9B', fontWeight: '700', writingDirection: 'rtl' }}>{member.name}</Text>
                <Text style={{ color: '#607286', fontSize: 12, writingDirection: 'rtl' }}>{member.note}</Text>
              </View>
            </View>
          ))}
        </AppCard>
      </ScrollView>
    </SafeAreaView>
  );
}
