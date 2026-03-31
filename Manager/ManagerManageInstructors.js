import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './ManagerManageInstructors.styles';
import RoleMenuModal from '../RoleMenuModal';
import { managerMenuItems, managerMenuTitle } from '../roleMenus';
import RoleHeader from '../components/ui/RoleHeader';
import AquaticBackground from '../components/ui/AquaticBackground';
import PrimaryButton from '../components/ui/PrimaryButton';

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

export default function ManagerManageInstructors({ navigation }) {
  const [showNavMenu, setShowNavMenu] = React.useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <AquaticBackground variant="manager" />
      <RoleHeader
        title="ניהול מדריכים"
        subtitle="הוספה, עריכה ומעקב אחר מדריכים"
        onMenuPress={() => setShowNavMenu(true)}
        rightIcon="⌕"
      />

      <RoleMenuModal
        visible={showNavMenu}
        onClose={() => setShowNavMenu(false)}
        title={managerMenuTitle}
        items={managerMenuItems}
        navigation={navigation}
      />

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

          <PrimaryButton
            label="הוספת מדריך חדש"
            style={styles.addButtonShell}
            gradientStyle={styles.addButton}
            textStyle={styles.addButtonText}
            colorsOverride={['#2E77BC', '#255E97']}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
