import React from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';

export default function RoleMenuModal({ visible, onClose, title, items, navigation, routeParams = {} }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-start' }}
        onPress={onClose}
      >
        <Pressable
          style={{
            marginTop: 80,
            marginHorizontal: 10,
            borderRadius: 16,
            backgroundColor: '#fff',
            padding: 16,
            minHeight: 260,
          }}
          onPress={(event) => event.stopPropagation()}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#1D2935' }}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={{ padding: 6 }}>
              <Text style={{ fontSize: 18 }}>✕</Text>
            </TouchableOpacity>
          </View>

          {items.map((item) => (
            <TouchableOpacity
              key={item.label}
              onPress={() => {
                onClose();
                if (typeof item.action === 'function') {
                  item.action();
                  return;
                }
                navigation.navigate(item.screen, { ...routeParams, ...(item.params || {}) });
              }}
              style={{
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#E0E8F2',
              }}
            >
              <Text style={{ textAlign: 'right', color: '#1A79D3', fontSize: 16, fontWeight: '700' }}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
