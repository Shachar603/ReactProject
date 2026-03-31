import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './ManagerManageChildren.styles';
import RoleMenuModal from '../RoleMenuModal';
import { managerMenuItems, managerMenuTitle } from '../roleMenus';
import RoleHeader from '../components/ui/RoleHeader';
import AquaticBackground from '../components/ui/AquaticBackground';
import PrimaryButton from '../components/ui/PrimaryButton';

const children = [
  { id: '1', name: 'אורי לוי', group: 'קבוצת דולפינים', initial: 'א' },
  { id: '2', name: 'מאיה כהן', group: 'קבוצת צבי ים', initial: 'מ' },
  { id: '3', name: 'דניאל אמיר', group: 'קבוצת דגים', initial: 'ד' },
  { id: '4', name: 'שירה ברק', group: 'קבוצת דולפינים', initial: 'ש' },
];

const ChildRow = ({ name, group, initial }) => (
  <View style={styles.childRow}>
    <View style={styles.childMetaWrap}>
      <Text style={styles.childName}>{name}</Text>
      <Text style={styles.childGroup}>גיל 6 · {group}</Text>
      <TouchableOpacity activeOpacity={0.85} style={styles.editButton}>
        <Text style={styles.editButtonText}>עריכה</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.avatarCircle}>
      <Text style={styles.avatarText}>{initial}</Text>
    </View>
  </View>
);

export default function ManagerManageChildren({ navigation }) {
  const [showNavMenu, setShowNavMenu] = React.useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <AquaticBackground variant="manager" />
      <RoleHeader
        title="ניהול ילדים"
        subtitle="צפייה, עריכה ושיוך לקבוצות"
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
          <Text style={styles.sectionTitle}>רשימת ילדים</Text>

          {children.map((child) => (
            <ChildRow
              key={child.id}
              name={child.name}
              group={child.group}
              initial={child.initial}
            />
          ))}

          <PrimaryButton
            label="הוספת ילד חדש"
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
