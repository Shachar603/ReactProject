import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './InstructorHomepage.styles';
import RoleMenuModal from '../RoleMenuModal';
import { instructorMenuItems, instructorMenuTitle } from '../roleMenus';
import RoleHeader from '../components/ui/RoleHeader';
import PrimaryButton from '../components/ui/PrimaryButton';
import AquaticBackground from '../components/ui/AquaticBackground';

const initialClassGroups = [
  { name: 'קבוצת השיטור', time: '10:00 - 10:30' },
  { name: 'קבוצת צבי ים', time: '11:00 - 11:30' },
  { name: 'קבוצת דגים', time: '12:00 - 12:30' },
];

const StatChip = ({ label, value, color, textColor }) => (
  <View style={[styles.chip, { backgroundColor: color, borderColor: color }]}> 
    <Text style={[styles.chipText, { color: textColor || '#fff' }]}>{`${value} ${label}`}</Text>
  </View>
);

const GroupRow = ({ title, time, onCancel }) => (
  <View style={styles.groupRow}>
    <TouchableOpacity style={styles.cancelButton} activeOpacity={0.8} onPress={onCancel}>
      <Text style={styles.cancelButtonText}>ביטול השיעור</Text>
    </TouchableOpacity>

    <View style={styles.groupTextWrap}>
      <Text style={styles.groupTitle}>{title}</Text>
      <Text style={styles.groupSubtitle}>{time}</Text>
    </View>
  </View>
);

export default function InstructorHomepage() {
  const navigation = useNavigation();
  const [classGroups, setClassGroups] = React.useState(initialClassGroups);
  const [showNavMenu, setShowNavMenu] = React.useState(false);
  const [showCreateGroupModal, setShowCreateGroupModal] = React.useState(false);
  const [showBroadcastModal, setShowBroadcastModal] = React.useState(false);
  const [broadcastMessage, setBroadcastMessage] = React.useState('');
  const [newGroupName, setNewGroupName] = React.useState('קבוצת דגים');
  const [newLessonTime, setNewLessonTime] = React.useState('12:00 - 12:30');
  const [newAge, setNewAge] = React.useState('10');
  const [newParticipants, setNewParticipants] = React.useState('5');

  const createGroup = () => {
    if (!newGroupName.trim()) {
      alert('נא להזין שם קבוצה');
      return;
    }
    setClassGroups((prev) => [...prev, { name: newGroupName, time: newLessonTime }]);
    setShowCreateGroupModal(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <AquaticBackground variant="instructor" />

      <RoleHeader
        title="לוח מדריך"
        subtitle="ניהול שיעורים וצפייה בקבוצות"
        onMenuPress={() => setShowNavMenu(true)}
        rightIcon="🔍"
      />

      <Text style={styles.headerDate}>24.12.2025</Text>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
        <View style={styles.chipRow}>
          <StatChip label="פעילים" value="5" color="#3C96F0" textColor="#FFFFFF" />
          <StatChip label="מוגבל" value="1" color="#3C96F0" textColor="#FFFFFF" />
          <StatChip label="פעילים" value="3" color="#3C96F0" textColor="#FFFFFF" />
        </View>

        <View style={styles.mainCard}>
          <Text style={styles.sectionTitle}>קבוצות ושיעורים היום</Text>
          {classGroups.map((group) => (
            <GroupRow
              key={group.name}
              title={group.name}
              time={group.time}
              onCancel={() => setClassGroups((prev) => prev.filter((g) => g.name !== group.name))}
            />
          ))}

          <View style={styles.bottomActions}>
            <PrimaryButton
              label="הצג את כלל הקבוצות"
              style={styles.actionButton}
              textStyle={styles.actionButtonText}
              onPress={() => navigation.navigate('SelectGroup')}
              colorsOverride={['#3C96F0', '#3C96F0']}
            />

            <PrimaryButton
              label="שדר הודעה"
              style={styles.actionButton}
              textStyle={styles.actionButtonText}
              onPress={() => setShowBroadcastModal(true)}
              colorsOverride={['#3C96F0', '#3C96F0']}
            />

            <PrimaryButton
              label="צור קבוצה חדשה"
              style={styles.actionButton}
              textStyle={styles.actionButtonText}
              onPress={() => setShowCreateGroupModal(true)}
              colorsOverride={['#3C96F0', '#3C96F0']}
            />
          </View>
        </View>

        <RoleMenuModal
          visible={showNavMenu}
          onClose={() => setShowNavMenu(false)}
          title={instructorMenuTitle}
          items={instructorMenuItems}
          navigation={navigation}
        />

        <Modal visible={showCreateGroupModal} transparent animationType="slide">
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 16 }}>
            <View style={{ backgroundColor: '#fff', borderRadius: 18, padding: 16 }}>
              <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 10 }}>יצירת קבוצה חדשה</Text>

              <Text style={{ marginBottom: 6, fontWeight: '700' }}>שם קבוצה</Text>
              <TextInput
                value={newGroupName}
                onChangeText={setNewGroupName}
                style={{ backgroundColor: '#F7FAFF', borderRadius: 10, padding: 10, marginBottom: 10, borderWidth: 1, borderColor: '#D1E5FD' }}
              />

              <Text style={{ marginBottom: 6, fontWeight: '700' }}>זמן שיעור</Text>
              <TextInput
                value={newLessonTime}
                onChangeText={setNewLessonTime}
                placeholder="12:00 - 12:30"
                style={{ backgroundColor: '#F7FAFF', borderRadius: 10, padding: 10, marginBottom: 10, borderWidth: 1, borderColor: '#D1E5FD' }}
              />

              <Text style={{ marginBottom: 6, fontWeight: '700' }}>גיל</Text>
              <TextInput
                value={newAge}
                onChangeText={(value) => setNewAge(value.replace(/[^0-9]/g, ''))}
                keyboardType="numeric"
                style={{ backgroundColor: '#F7FAFF', borderRadius: 10, padding: 10, marginBottom: 10, borderWidth: 1, borderColor: '#D1E5FD' }}
              />

              <Text style={{ marginBottom: 6, fontWeight: '700' }}>מספר משתתפים</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 14, gap: 6 }}>
                {['5','6','7','8','9','10','11','12'].map((n) => (
                  <TouchableOpacity
                    key={n}
                    onPress={() => setNewParticipants(n)}
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 12,
                      borderRadius: 10,
                      backgroundColor: newParticipants === n ? '#1A79D3' : '#EAF2FB',
                    }}
                  >
                    <Text style={{ color: newParticipants === n ? '#fff' : '#1A79D3', fontWeight: '700' }}>{n}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
                <TouchableOpacity
                  onPress={() => setShowCreateGroupModal(false)}
                  style={{ flex: 1, backgroundColor: '#CCC', borderRadius: 12, padding: 12, alignItems: 'center' }}
                >
                  <Text>ביטול</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={createGroup}
                  style={{ flex: 1, backgroundColor: '#1A79D3', borderRadius: 12, padding: 12, alignItems: 'center' }}
                >
                  <Text style={{ color: '#fff', fontWeight: '700' }}>שמור</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal visible={showBroadcastModal} transparent animationType="fade">
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 16 }}>
            <View style={{ backgroundColor: '#fff', borderRadius: 18, padding: 16 }}>
              <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 10 }}>שידור הודעה לכל קבוצות</Text>
              <TextInput
                value={broadcastMessage}
                onChangeText={setBroadcastMessage}
                placeholder="הקלד הודעה..."
                multiline
                style={{ minHeight: 90, backgroundColor: '#F7FAFF', borderRadius: 10, padding: 10, marginBottom: 10, borderWidth: 1, borderColor: '#D1E5FD' }}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
                <TouchableOpacity
                  onPress={() => setShowBroadcastModal(false)}
                  style={{ flex: 1, backgroundColor: '#CCC', borderRadius: 12, padding: 12, alignItems: 'center' }}
                >
                  <Text>ביטול</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (!broadcastMessage.trim()) {
                      alert('נא להזין הודעה');
                      return;
                    }
                    alert('ההודעה נשלחה בהצלחה!');
                    setBroadcastMessage('');
                    setShowBroadcastModal(false);
                  }}
                  style={{ flex: 1, backgroundColor: '#1A79D3', borderRadius: 12, padding: 12, alignItems: 'center' }}
                >
                  <Text style={{ color: '#fff', fontWeight: '700' }}>שלח</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

      </ScrollView>
    </SafeAreaView>
  );
}
