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
import styles from './ManagerManageChildren.styles';
import RoleMenuModal from '../RoleMenuModal';
import { managerMenuItems, managerMenuTitle } from '../roleMenus';

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
        <TouchableOpacity activeOpacity={0.75} style={styles.iconButton} onPress={() => setShowNavMenu(true)}>
          <Text style={styles.headerIcon}>☰</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>ניהול ילדים</Text>
          <Text style={styles.headerSubtitle}>צפייה, עריכה ושיוך לקבוצות</Text>
        </View>

        <TouchableOpacity activeOpacity={0.75} style={styles.iconButton}>
          <Text style={styles.headerIcon}>⌕</Text>
        </TouchableOpacity>
      </View>

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

          <TouchableOpacity activeOpacity={0.85} style={styles.addButtonShell}>
            <LinearGradient
              colors={['#31A5EA', '#2A8FD9']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.addButton}
            >
              <Text style={styles.addButtonText}>הוספת ילד חדש</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
