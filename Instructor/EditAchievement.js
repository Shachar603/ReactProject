import React, { useState } from 'react';
import { SafeAreaView, StatusBar, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditAchievement() {
  const navigation = useNavigation();
  const route = useRoute();
  const achievement = route.params?.achievement || { label: '', info: '', color: '#FF4D61' };

  const [title, setTitle] = useState(achievement.label);
  const [info, setInfo] = useState(achievement.info);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E8ECEF' }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <View style={{ flex: 1, padding: 16, justifyContent: 'center' }}>
        <View style={{ borderRadius: 20, backgroundColor: '#FFFFFF', padding: 20, shadowColor: '#000', shadowOpacity: 0.12, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 6 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: '800', color: '#1A79D3' }}>עריכת הישג</Text>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 6 }}>
              <Text style={{ color: '#1C6DBE', fontSize: 16 }}>✕</Text>
            </TouchableOpacity>
          </View>

          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Text style={{ fontSize: 14, color: '#415974', marginBottom: 6 }}>שם הישג</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              style={{ borderWidth: 1, borderColor: '#BDDAF7', borderRadius: 12, padding: 12, marginBottom: 14, backgroundColor: '#F6F9FF', writingDirection: 'rtl' }}
              placeholder="שם הישג"
            />

            <Text style={{ fontSize: 14, color: '#415974', marginBottom: 6 }}>פרטים / תיאור</Text>
            <TextInput
              value={info}
              onChangeText={setInfo}
              multiline
              numberOfLines={4}
              style={{ borderWidth: 1, borderColor: '#BDDAF7', borderRadius: 12, padding: 12, minHeight: 88, backgroundColor: '#F6F9FF', textAlignVertical: 'top', writingDirection: 'rtl' }}
              placeholder="פרטים נוספים"
            />

            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ flex: 1, marginRight: 8, backgroundColor: '#F5FBFF', borderWidth: 1, borderColor: '#E4E9EF', borderRadius: 14, height: 46, justifyContent: 'center', alignItems: 'center' }}
              >
                <Text style={{ color: '#315C8A', fontWeight: '700' }}>בטל</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  // TODO: save logic - integrate with your backend/state as needed
                  navigation.goBack();
                }}
                style={{ flex: 1, marginLeft: 8, backgroundColor: '#4DA7FF', borderRadius: 14, height: 46, justifyContent: 'center', alignItems: 'center' }}
              >
                <Text style={{ color: 'white', fontWeight: '700' }}>שמירה</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </SafeAreaView>
  );
}
