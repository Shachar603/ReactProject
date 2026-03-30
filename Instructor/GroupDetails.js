import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './InstructorHomepage.styles';

export default function GroupDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { group } = route.params || { group: { title: 'קבוצה', subtitle: '' } };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: '#F2F8FF' }]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <View style={styles.headerWaveBack} />
      <View style={styles.headerWaveFront} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.75} style={styles.iconButton}>
          <Text style={styles.headerIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { fontSize: 28 }]}>{group.title}</Text>
          <Text style={[styles.headerSubtitle, { fontSize: 14 }]}>{group.subtitle}</Text>
        </View>
        <View style={styles.iconButton} />
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 18, paddingBottom: 24 }}>
        <View style={{ borderRadius: 16, backgroundColor: '#fff', padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#D8E9FA' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ color: '#2B6D9F', fontSize: 14, fontWeight: '700' }}>נוכחות ממוצעת</Text>
              <Text style={{ color: '#2B6D9F', fontSize: 28, fontWeight: 'bold' }}>92%</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ color: '#2B6D9F', fontSize: 14, fontWeight: '700' }}>שיעורים בקרוב</Text>
              <Text style={{ color: '#2B6D9F', fontSize: 28, fontWeight: 'bold' }}>24</Text>
            </View>
          </View>

          <Text style={{ color: '#365E85', fontWeight: '700', marginBottom: 6 }}>מדדי ביצועים</Text>
          <View style={{ height: 10, backgroundColor: '#E3F0FF', borderRadius: 10, overflow: 'hidden', marginBottom: 10 }}>
            <View style={{ width: '85%', height: '100%', backgroundColor: '#3C96F0' }} />
          </View>
          <Text style={{ color: '#6A7C9A', fontSize: 12 }}>85% לעמידה ביעדי הקבוצה</Text>
        </View>

        <TouchableOpacity
          style={{
            borderRadius: 16,
            backgroundColor: '#3C96F0',
            paddingVertical: 12,
            paddingHorizontal: 16,
            marginBottom: 14,
            alignItems: 'center',
          }}
          activeOpacity={0.82}
          onPress={() => navigation.navigate('ChildList')}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>הצג את כל הילדים</Text>
        </TouchableOpacity>

        <View style={{ borderRadius: 16, backgroundColor: '#fff', padding: 16, borderWidth: 1, borderColor: '#D8E9FA' }}>
          <Text style={{ color: '#2B6D9F', fontSize: 16, fontWeight: '700', marginBottom: 8 }}>חברי קבוצה</Text>
          {[
            { name: 'עידו כהן', note: 'התקדמות מעולה' },
            { name: 'מיכל לוי', note: 'צורך חיזוק במהירות' },
            { name: 'דניאל יוסף', note: 'ביצועים טובים' },
            { name: 'עומר אברם', note: 'היענות טובה' },
          ].map((member) => (
            <View key={member.name} style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }}>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ color: '#233F5B', fontWeight: '700' }}>{member.name}</Text>
                <Text style={{ color: '#627789', fontSize: 12 }}>{member.note}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
