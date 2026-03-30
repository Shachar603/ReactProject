import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';

const participantsOptions = ['5','6','7','8','9','10','11','12'];

export default function CreateGroup({ navigation }) {
  const [participants, setParticipants] = React.useState('5');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F9FF' }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <View style={{ padding: 16 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 14 }}>
          <Text style={{ color: '#1A79D3', fontWeight: '700' }}>← חזרה</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 10 }}>יצירת קבוצה חדשה</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 30 }}>
        <Text style={{ marginBottom: 6, fontWeight: '700' }}>שם קבוצת דוגמא</Text>
        <TextInput value="קבוצת דגים" editable={false} style={{ backgroundColor: '#fff', borderRadius: 10, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: '#D1E5FD' }} />

        <Text style={{ marginBottom: 6, fontWeight: '700' }}>זמן שיעור</Text>
        <TextInput value="12:00 - 12:30" editable={false} style={{ backgroundColor: '#fff', borderRadius: 10, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: '#D1E5FD' }} />

        <Text style={{ marginBottom: 6, fontWeight: '700' }}>כיתה</Text>
        <TextInput value="כיתה ד'" editable={false} style={{ backgroundColor: '#fff', borderRadius: 10, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: '#D1E5FD' }} />

        <Text style={{ marginBottom: 6, fontWeight: '700' }}>מספר משתתפים</Text>
        <View style={{ backgroundColor: '#fff', borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: '#D1E5FD', padding: 8 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {participantsOptions.map((value) => (
              <TouchableOpacity
                key={value}
                onPress={() => setParticipants(value)}
                style={{
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  borderRadius: 8,
                  backgroundColor: participants === value ? '#1A79D3' : '#EAF2FB',
                }}
              >
                <Text style={{ color: participants === value ? '#fff' : '#2B6D9F', fontWeight: '700' }}>{value}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={{ marginBottom: 6, fontWeight: '700' }}>מדריך</Text>
        <TextInput value="יוסי כהן" editable={false} style={{ backgroundColor: '#fff', borderRadius: 10, padding: 12, marginBottom: 24, borderWidth: 1, borderColor: '#D1E5FD' }} />

        <TouchableOpacity
          onPress={() => alert('קבוצה חדשה נוצרה (דוגמא)')}
          style={{ backgroundColor: '#1A79D3', borderRadius: 16, height: 50, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>שמור קבוצה</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
