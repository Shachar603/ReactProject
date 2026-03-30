import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './InstructorHomepage.styles';

const children = [
  { name: 'אור', class: 'כיתה ח', status: 'פעיל' },
  { name: 'מאיה', class: 'כיתה ז', status: 'פעיל' },
  { name: 'דניאל', class: 'כיתה ו', status: 'פעיל' },
  { name: 'שירה', class: 'כיתה ח', status: 'פעיל' },
  { name: 'עומר', class: 'כיתה ז', status: 'פעיל' },
];

export default function ChildList() {
  const navigation = useNavigation();

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
          <Text style={[styles.headerTitle, { fontSize: 28 }]}>בחר ילד</Text>
          <Text style={[styles.headerSubtitle, { fontSize: 14 }]}>בחר את הילד כדי לצפות בפרטיו</Text>
        </View>

        <View style={styles.iconButton} />
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 18, paddingBottom: 24 }}>
        <View style={{ marginVertical: 10, borderRadius: 16, backgroundColor: '#fff', padding: 14, borderWidth: 1, borderColor: '#D8E9FA' }}>
          <Text style={{ color: '#2B6D9F', fontWeight: '700', fontSize: 16 }}>רשימת הילדים</Text>
          {children.map((child) => (
            <View key={child.name} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12, borderWidth: 1, borderColor: '#E6F0FF', backgroundColor: '#FAFDFF' }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ChildProfile', { child })}
                activeOpacity={0.7}
                style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: '#C4E4FF', justifyContent: 'center', alignItems: 'center', marginRight: 10 }}
              >
                <Text style={{ color: '#2F78C9', fontWeight: '700' }}>{child.name[0]}</Text>
              </TouchableOpacity>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text style={{ color: '#233F5B', fontWeight: '700' }}>{child.name}</Text>
                <Text style={{ color: '#6A7C9A', fontSize: 12 }}>{child.class} • {child.status}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
