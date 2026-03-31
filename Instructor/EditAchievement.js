import React, { useState } from 'react';
import { SafeAreaView, StatusBar, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AquaticBackground from '../components/ui/AquaticBackground';
import AppCard from '../components/ui/AppCard';
import PrimaryButton from '../components/ui/PrimaryButton';

export default function EditAchievement() {
  const navigation = useNavigation();
  const route = useRoute();
  const achievement = route.params?.achievement || { label: '', info: '', color: '#FF4D61' };

  const [title, setTitle] = useState(achievement.label);
  const [info, setInfo] = useState(achievement.info);

  const onSave = route.params?.onSave;

  return (
    <SafeAreaView style={localStyles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <AquaticBackground variant="instructor" />
      <View style={localStyles.container}>
        <AppCard style={localStyles.card}>
          <View style={localStyles.cardHeader}>
            <Text style={localStyles.title}>עריכת הישג</Text>
            <TouchableOpacity onPress={() => navigation.goBack()} style={localStyles.closeButton}>
              <Text style={localStyles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Text style={localStyles.label}>שם הישג</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              style={localStyles.input}
              placeholder="שם הישג"
            />

            <Text style={localStyles.label}>פרטים / תיאור</Text>
            <TextInput
              value={info}
              onChangeText={setInfo}
              multiline
              numberOfLines={4}
              style={localStyles.textarea}
              placeholder="פרטים נוספים"
            />

            <View style={localStyles.actionsRow}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={localStyles.cancelButton}
              >
                <Text style={localStyles.cancelText}>בטל</Text>
              </TouchableOpacity>

              <PrimaryButton
                label="שמירה"
                onPress={() => {
                  const updated = {
                    label: title,
                    info: info,
                    color: achievement.color || '#FF4D61',
                  };
                  if (onSave) {
                    onSave(updated);
                  }
                  navigation.goBack();
                }}
                style={localStyles.saveButton}
                colorsOverride={['#2F6EAB', '#225A91']}
                textStyle={{ color: '#fff', fontWeight: '700', writingDirection: 'rtl' }}
              />
            </View>
          </KeyboardAvoidingView>
        </AppCard>
      </View>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F6FA',
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(51, 110, 163, 0.12)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F5E9B',
    writingDirection: 'rtl',
  },
  closeButton: { padding: 6 },
  closeText: { color: '#1F5E9B', fontSize: 16 },
  label: {
    fontSize: 14,
    color: '#415974',
    marginBottom: 6,
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  input: {
    borderWidth: 1,
    borderColor: '#C9DBEE',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    backgroundColor: '#F8FBFF',
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#C9DBEE',
    borderRadius: 12,
    padding: 12,
    minHeight: 88,
    backgroundColor: '#F8FBFF',
    textAlignVertical: 'top',
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#F5FAFF',
    borderWidth: 1,
    borderColor: '#DCE5EF',
    borderRadius: 14,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelText: {
    color: '#315C8A',
    fontWeight: '700',
    writingDirection: 'rtl',
  },
  saveButton: {
    flex: 1,
    marginLeft: 8,
    borderRadius: 14,
  },
});
