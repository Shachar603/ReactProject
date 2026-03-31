import React from 'react';
import { SafeAreaView, StatusBar, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './InstructorHomepage.styles';
import RoleMenuModal from '../RoleMenuModal';
import { instructorMenuItems, instructorMenuTitle } from '../roleMenus';


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

      <View style={styles.headerWaveBack} />
      <View style={styles.headerWaveFront} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => setShowNavMenu(true)} activeOpacity={0.75} style={styles.iconButton}>
          <Text style={[styles.headerIcon, { color: '#1A79D3' }]}>☰</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { fontSize: 24, color: '#1C6DBE' }]}>פרופיל ילד</Text>
          <Text style={[styles.headerSubtitle, { fontSize: 14 }]}>סקירה אישית ועדכונים לאורך זמן</Text>
        </View>

        <TouchableOpacity activeOpacity={0.75} style={styles.iconButton}>
          <Text style={[styles.headerIcon, { color: '#1A79D3' }]}>🔍</Text>
        </TouchableOpacity>
      </View>

      <RoleMenuModal
        visible={showNavMenu}
        onClose={() => setShowNavMenu(false)}
        title={instructorMenuTitle}
        items={instructorMenuItems}
        navigation={navigation}
      />

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}>
        <View style={{ marginTop: 16, marginBottom: 12, alignItems: 'center' }}>
          <View style={{ width: 96, height: 96, borderRadius: 48, backgroundColor: '#A9D5FF', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#1C6DBE' }}>
            <Text style={{ color: '#1C6DBE', fontSize: 48, fontWeight: '700' }}>{initial}</Text>
          </View>
          <Text style={{ marginTop: 10, fontSize: 26, fontWeight: '800', color: '#1D3F6F', writingDirection: 'rtl' }}>{child.name}</Text>
          <Text style={{ marginTop: 4, fontSize: 16, fontWeight: '600', color: '#3968A7', writingDirection: 'rtl' }}>{child.class} • {child.status}</Text>
        </View>

        <View style={{ borderRadius: 20, backgroundColor: '#F5FAFF', borderWidth: 1, borderColor: '#C9E4FD', padding: 14, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 3 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#2B6D9F', marginBottom: 10, writingDirection: 'rtl' }}>אירועים אחרונים</Text>

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
                      backgroundColor: '#1A79D3',
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
                      backgroundColor: '#D33C40',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: 12,
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: 12, fontWeight: '700', writingDirection: 'rtl' }}>מחק</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <Text style={{ color: '#2F78C9', fontWeight: '700', writingDirection: 'rtl' }}>{item.label}</Text>
                  <Text style={{ color: '#5F7D9E', fontSize: 13, writingDirection: 'rtl' }}>{item.info}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={{ marginTop: 16, gap: 10 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ParentChat', { child, fromInstructor: true })}
            style={{ borderRadius: 18, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1A79D3' }}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 17, fontWeight: '700', writingDirection: 'rtl' }}>צ׳אט עם ההורה</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('ParentProgressReport', { child })}
            style={{ borderRadius: 18, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#3C96F0' }}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 17, fontWeight: '700', writingDirection: 'rtl' }}>דיווח התקדמות הילד</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ borderRadius: 18, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#7D92A7' }}>
            <Text style={{ color: '#FFFFFF', fontSize: 17, fontWeight: '700', writingDirection: 'rtl' }}>ערוך פרטי פרופיל</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
