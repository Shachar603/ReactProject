import React from 'react';
import { SafeAreaView, StatusBar, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './InstructorHomepage.styles';
import RoleMenuModal from '../RoleMenuModal';
import { instructorMenuItems, instructorMenuTitle } from '../roleMenus';
import RoleHeader from '../components/ui/RoleHeader';
import AquaticBackground from '../components/ui/AquaticBackground';
import AppCard from '../components/ui/AppCard';
import PrimaryButton from '../components/ui/PrimaryButton';


export default function ChildProfile() {
  const navigation = useNavigation();
  const route = useRoute();
  const child = route.params?.child || { name: 'אור', class: 'כיתה ח', status: 'פעיל' };
  const initial = child.name[0] || 'א';
  const [showNavMenu, setShowNavMenu] = React.useState(false);

  const [events, setEvents] = React.useState([
    { label: 'משימת בית חדשה', info: 'קריאה באורך 20 דקות', color: '#FF4D61' },
    { label: 'נוכחות מלאה', info: '10/10 שיעורים', color: '#27B73C' },
    { label: 'ציון מבחן', info: '95%', color: '#3C9EF4' },
  ]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <AquaticBackground variant="instructor" />
      <RoleHeader
        title="פרופיל ילד"
        subtitle="סקירה אישית ועדכונים לאורך זמן"
        onMenuPress={() => setShowNavMenu(true)}
        rightIcon="🔍"
      />

      <RoleMenuModal
        visible={showNavMenu}
        onClose={() => setShowNavMenu(false)}
        title={instructorMenuTitle}
        items={instructorMenuItems}
        navigation={navigation}
      />

      <ScrollView contentContainerStyle={styles.screenContent} showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 16, marginBottom: 12, alignItems: 'center' }}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>{initial}</Text>
          </View>
          <Text style={styles.profileName}>{child.name}</Text>
          <Text style={styles.profileMeta}>{child.class} • {child.status}</Text>
        </View>

        <AppCard style={styles.surfaceCard}>
          <Text style={styles.helperTitle}>אירועים אחרונים</Text>

          {events.map((item, idx) => {
            return (
              <View
                key={idx}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                  borderBottomColor: idx < 2 ? '#E5F1FB' : 'transparent',
                  borderBottomWidth: 1,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={() => {
                      navigation.navigate('EditAchievement', {
                        achievement: item,
                        index: idx,
                        onSave: (updatedItem) => {
                          setEvents((prev) => prev.map((ev, i) => (i === idx ? updatedItem : ev)));
                        },
                      });
                    }}
                    style={{
                      minWidth: 70,
                      height: 30,
                      borderRadius: 15,
                      backgroundColor: '#1F5E9B',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: 12,
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: 12, fontWeight: '700', writingDirection: 'rtl' }}>עדכן</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={() => setEvents((prev) => prev.filter((_, i) => i !== idx))}
                    style={{
                      minWidth: 70,
                      height: 30,
                      borderRadius: 15,
                      backgroundColor: '#B73A3C',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: 12,
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: 12, fontWeight: '700', writingDirection: 'rtl' }}>מחק</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <Text style={{ color: '#1F5E9B', fontWeight: '700', writingDirection: 'rtl' }}>{item.label}</Text>
                  <Text style={{ color: '#607286', fontSize: 13, writingDirection: 'rtl' }}>{item.info}</Text>
                </View>
              </View>
            );
          })}
        </AppCard>

        <View style={{ marginTop: 16, gap: 10 }}>
          <PrimaryButton
            label="צ׳אט עם ההורה"
            onPress={() => navigation.navigate('ParentChat', { child, fromInstructor: true })}
            style={{ borderRadius: 18 }}
            textStyle={{ color: '#FFFFFF', fontSize: 17, fontWeight: '700', writingDirection: 'rtl' }}
            colorsOverride={['#1F5E9B', '#184C7D']}
          />

          <PrimaryButton
            label="דיווח התקדמות הילד"
            onPress={() => navigation.navigate('ParentProgressReport', { child })}
            style={{ borderRadius: 18 }}
            textStyle={{ color: '#FFFFFF', fontSize: 17, fontWeight: '700', writingDirection: 'rtl' }}
            colorsOverride={['#2E77BC', '#255E97']}
          />

          <PrimaryButton
            label="ערוך פרטי פרופיל"
            style={{ borderRadius: 18 }}
            textStyle={{ color: '#FFFFFF', fontSize: 17, fontWeight: '700', writingDirection: 'rtl' }}
            colorsOverride={['#6D8094', '#586A7D']}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
