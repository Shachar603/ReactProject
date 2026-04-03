import React from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './ManagerManageInstructors.styles';
import RoleMenuModal from '../RoleMenuModal';
import { managerMenuItems, managerMenuTitle } from '../roleMenus';
import RoleHeader from '../components/ui/RoleHeader';
import AquaticBackground from '../components/ui/AquaticBackground';
import PrimaryButton from '../components/ui/PrimaryButton';

const API_BASE_URL = Platform.OS === 'android'
  ? 'http://10.0.2.2:5202/api'
  : 'http://localhost:5202/api';

const initialInstructors = [
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

export default function ManagerManageInstructors({ navigation, route }) {
  const [showNavMenu, setShowNavMenu] = React.useState(false);
  const [instructors, setInstructors] = React.useState(initialInstructors);
  const [accountType, setAccountType] = React.useState('Instructor');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const managerAuth = route?.params?.managerAuth;

  const canSubmit =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    email.trim().length > 0 &&
    password.length > 0 &&
    !!managerAuth?.email &&
    !!managerAuth?.password;

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setPhone('');
  };

  const handleCreateAccount = async () => {
    if (!managerAuth?.email || !managerAuth?.password) {
      Alert.alert('אין הרשאת מנהל', 'נדרש להתחבר מחדש כמנהל כדי ליצור משתמשים.');
      return;
    }

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password) {
      Alert.alert('שדות חסרים', 'יש למלא שם פרטי, שם משפחה, אימייל וסיסמה.');
      return;
    }

    const endpoint = accountType === 'Parent' ? 'parent/manager-create' : 'instructor/manager-create';

    const body = {
      managerEmail: managerAuth.email,
      managerPassword: managerAuth.password,
      email: email.trim().toLowerCase(),
      password,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      ...(accountType === 'Parent' ? { phone: phone.trim() || null } : {}),
    };

    try {
      setIsSubmitting(true);

      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      let payload = null;
      try {
        payload = await response.json();
      } catch {
        payload = null;
      }

      if (!response.ok) {
        Alert.alert('יצירת משתמש נכשלה', payload?.message ?? 'אירעה שגיאה בשמירת המשתמש.');
        return;
      }

      if (accountType === 'Instructor') {
        const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
        const initial = fullName[0] || '?';

        setInstructors((prev) => [
          {
            id: String(payload?.id ?? Date.now()),
            name: fullName,
            expertise: 'מדריך חדש',
            initial,
          },
          ...prev,
        ]);
      }

      Alert.alert('הצלחה', accountType === 'Instructor' ? 'המדריך נוצר בהצלחה.' : 'ההורה נוצר בהצלחה.');
      resetForm();
    } catch (error) {
      Alert.alert('שגיאת שרת', 'לא ניתן ליצור משתמש כרגע. ודאו שהשרת רץ ונסו שוב.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
        routeParams={route?.params || {}}
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

          <Text style={[styles.sectionTitle, styles.createSectionTitle]}>יצירת משתמש חדש</Text>

          <View style={styles.accountTypeRow}>
            <TouchableOpacity
              onPress={() => setAccountType('Parent')}
              activeOpacity={0.85}
              style={[styles.accountTypeChip, accountType === 'Parent' ? styles.accountTypeChipActive : null]}
            >
              <Text style={[styles.accountTypeChipText, accountType === 'Parent' ? styles.accountTypeChipTextActive : null]}>הורה</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setAccountType('Instructor')}
              activeOpacity={0.85}
              style={[styles.accountTypeChip, accountType === 'Instructor' ? styles.accountTypeChipActive : null]}
            >
              <Text style={[styles.accountTypeChipText, accountType === 'Instructor' ? styles.accountTypeChipTextActive : null]}>מדריך</Text>
            </TouchableOpacity>
          </View>

          {!managerAuth?.email ? (
            <Text style={styles.sessionWarning}>לא זוהתה התחברות מנהל פעילה. התחברו מחדש כמנהל.</Text>
          ) : null}

          <Text style={styles.fieldLabel}>שם פרטי</Text>
          <TextInput
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
            placeholder="שם פרטי"
            placeholderTextColor="#98A3AD"
            textAlign="right"
          />

          <Text style={styles.fieldLabel}>שם משפחה</Text>
          <TextInput
            value={lastName}
            onChangeText={setLastName}
            style={styles.input}
            placeholder="שם משפחה"
            placeholderTextColor="#98A3AD"
            textAlign="right"
          />

          <Text style={styles.fieldLabel}>אימייל</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholder="example@email.com"
            placeholderTextColor="#98A3AD"
            autoCapitalize="none"
            keyboardType="email-address"
            textAlign="left"
          />

          <Text style={styles.fieldLabel}>סיסמה</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            placeholder="לפחות 6 תווים"
            placeholderTextColor="#98A3AD"
            secureTextEntry
            textAlign="left"
          />

          {accountType === 'Parent' ? (
            <>
              <Text style={styles.fieldLabel}>טלפון (אופציונלי)</Text>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                style={styles.input}
                placeholder="0500000000"
                placeholderTextColor="#98A3AD"
                keyboardType="phone-pad"
                textAlign="left"
              />
            </>
          ) : null}

          <PrimaryButton
            label={isSubmitting ? 'שומר...' : accountType === 'Instructor' ? 'יצירת מדריך חדש' : 'יצירת הורה חדש'}
            style={styles.addButtonShell}
            gradientStyle={styles.addButton}
            textStyle={styles.addButtonText}
            colorsOverride={['#2E77BC', '#255E97']}
            onPress={handleCreateAccount}
            disabled={!canSubmit || isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
