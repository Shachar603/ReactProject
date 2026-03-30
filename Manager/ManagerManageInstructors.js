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
import styles from './ManagerManageInstructors.styles';

const instructors = [
  { id: '1', name: 'נועה לוי', expertise: 'מדריכת צבי ים', initial: 'נ' },
  { id: '2', name: 'רועי כהן', expertise: 'מדריך דולפינים', initial: 'ר' },
  { id: '3', name: 'תמר לוי', expertise: 'מדריכת דגים', initial: 'ת' },
  { id: '4', name: 'דוד קרני', expertise: 'מדריך סוסוני ים', initial: 'ד' },
];

const InstructorRow = ({ name, expertise, initial }) => (
  <View style={styles.instructorRow}>
    <View style={styles.instructorMetaWrap}>
      <Text style={styles.instructorName}>{name}</Text>
      <Text style={styles.instructorExpertise}>{expertise}</Text>
      <TouchableOpacity activeOpacity={0.85} style={styles.editButton}>
        <Text style={styles.editButtonText}>עריכה</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.avatarCircle}>
      <Text style={styles.avatarText}>{initial}</Text>
    </View>
  </View>
);

export default function ManagerManageInstructors() {
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
        <TouchableOpacity activeOpacity={0.75} style={styles.iconButton}>
          <Text style={styles.headerIcon}>☰</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>ניהול מדריכים</Text>
          <Text style={styles.headerSubtitle}>הוספה, עריכה ומעקב אחר מדריכים</Text>
        </View>

        <TouchableOpacity activeOpacity={0.75} style={styles.iconButton}>
          <Text style={styles.headerIcon}>⌕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.mainCard}>
          <Text style={styles.sectionTitle}>רשימת מדריכים</Text>

          {instructors.map((instructor) => (
            <InstructorRow
              key={instructor.id}
              name={instructor.name}
              expertise={instructor.expertise}
              initial={instructor.initial}
            />
          ))}

          <TouchableOpacity activeOpacity={0.85} style={styles.addButtonShell}>
            <LinearGradient
              colors={['#31A5EA', '#2A8FD9']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.addButton}
            >
              <Text style={styles.addButtonText}>הוספת מדריך חדש</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
