import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './ManagerCenterSettings.styles';
import RoleMenuModal from '../RoleMenuModal';
import { managerMenuItems, managerMenuTitle } from '../roleMenus';

const ToggleRow = ({ label, value, onValueChange, disabled = false }) => (
  <View style={styles.toggleRow}>
    <Switch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      trackColor={{ false: '#D6D6D8', true: '#88D5FF' }}
      thumbColor={value ? '#27A7F0' : '#BFBFBF'}
      ios_backgroundColor="#D6D6D8"
    />
    <Text style={styles.toggleLabel}>{label}</Text>
  </View>
);

export default function ManagerCenterSettings({ navigation }) {
  const [sendAutoReports, setSendAutoReports] = useState(true);
  const [receiveAlerts, setReceiveAlerts] = useState(true);
  const [showKidsAdvanced, setShowKidsAdvanced] = useState(false);
  const [showNavMenu, setShowNavMenu] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <LinearGradient
        colors={['#E4F6FF', '#CFEAFB', '#B9DFF5', '#AAD8F2']}
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
          <Text style={styles.headerTitle}>הגדרות מרכז</Text>
          <Text style={styles.headerSubtitle}>ניהול פרטי המרכז והעדפות המערכת</Text>
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
          <Text style={styles.sectionTitle}>פרטי המרכז</Text>

          <Text style={styles.fieldLabel}>שם המרכז</Text>
          <TextInput
            style={styles.input}
            placeholder="מים שווים"
            placeholderTextColor="#98A3AD"
            textAlign="right"
          />

          <Text style={styles.fieldLabel}>כתובת</Text>
          <TextInput
            style={[styles.input, styles.inputMultiline]}
            placeholder="הבריכה העירונית, נתניה"
            placeholderTextColor="#98A3AD"
            textAlign="right"
            multiline
          />

          <Text style={[styles.sectionTitle, styles.systemSectionTitle]}>העדפות מערכת</Text>

          <ToggleRow
            label={'שליחת דו"ח אוטומטי להורים (אחרי כל שיעור)'}
            value={sendAutoReports}
            onValueChange={setSendAutoReports}
          />

          <ToggleRow
            label="קבלת התראות מדריכים"
            value={receiveAlerts}
            onValueChange={setReceiveAlerts}
          />

          <ToggleRow
            label="הצגת התקדמות להורים"
            value={showKidsAdvanced}
            onValueChange={setShowKidsAdvanced}
          />

          <TouchableOpacity activeOpacity={0.85} style={styles.saveButtonShell}>
            <LinearGradient
              colors={['#31A5EA', '#2A8FD9']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.saveButton}
            >
              <Text style={styles.saveButtonText}>שמירת הגדרות</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
