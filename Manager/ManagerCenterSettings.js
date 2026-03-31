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
import styles from './ManagerCenterSettings.styles';
import RoleMenuModal from '../RoleMenuModal';
import { managerMenuItems, managerMenuTitle } from '../roleMenus';
import RoleHeader from '../components/ui/RoleHeader';
import AquaticBackground from '../components/ui/AquaticBackground';
import PrimaryButton from '../components/ui/PrimaryButton';

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
      <AquaticBackground variant="manager" />
      <RoleHeader
        title="הגדרות מרכז"
        subtitle="ניהול פרטי המרכז והעדפות המערכת"
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

          <PrimaryButton
            label="שמירת הגדרות"
            style={styles.saveButtonShell}
            gradientStyle={styles.saveButton}
            textStyle={styles.saveButtonText}
            colorsOverride={['#2E77BC', '#255E97']}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
