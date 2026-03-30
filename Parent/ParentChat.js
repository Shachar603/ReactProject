import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './ParentChat.styles';

const initialMessages = [
  {
    id: '1',
    side: 'right',
    text: 'היי, רק רציתי לשאול איך נעמה התקדמה היום?',
  },
  {
    id: '2',
    side: 'left',
    text: 'נעמה הייתה מקסימה! שיפור משמעותי בשליטה בנשימות.',
  },
  {
    id: '3',
    side: 'right',
    text: 'איזו אלופה! תודה רבה 🙏',
  },
];

const MessageBubble = ({ side, text }) => {
  const isRight = side === 'right';

  return (
    <View style={[styles.messageRow, isRight ? styles.messageRowRight : styles.messageRowLeft]}>
      <View style={[styles.bubble, isRight ? styles.parentBubble : styles.instructorBubble]}>
        <Text style={[styles.messageText, isRight ? styles.parentMessageText : styles.instructorMessageText]}>
          {text}
        </Text>
      </View>
    </View>
  );
};

export default function ParentChat({ navigation }) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) {
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        side: 'right',
        text: trimmed,
      },
    ]);
    setInput('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <LinearGradient
        colors={['#E3F6FF', '#D7EFFC', '#C5E7FA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.aquaticBackground}
      />

      <View style={styles.headerWaveBack} />
      <View style={styles.headerWaveFront} />

      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.75} style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Text style={styles.headerIcon}>☰</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>צ'אט</Text>
          <Text style={styles.headerSubtitle}>תקשורת בין מדריך להורה</Text>
        </View>

        <TouchableOpacity activeOpacity={0.75} style={styles.iconButton}>
          <Text style={styles.headerIcon}>⌕</Text>
          <Text style={styles.searchLabel}>חיפוש</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.chatCard}>
        <ScrollView contentContainerStyle={styles.messagesContainer} showsVerticalScrollIndicator={false}>
          {messages.map((message) => (
            <MessageBubble key={message.id} side={message.side} text={message.text} />
          ))}
        </ScrollView>

        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            placeholder="..."
            placeholderTextColor="#7A8592"
            value={input}
            onChangeText={setInput}
            multiline
            textAlign="right"
          />

          <TouchableOpacity activeOpacity={0.86} style={styles.sendButtonShell} onPress={handleSend}>
            <LinearGradient
              colors={['#38AEEF', '#2E95E3']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.sendButton}
            >
              <Text style={styles.sendButtonText}>שליחה</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
