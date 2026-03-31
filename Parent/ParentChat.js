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
import { useRoute } from '@react-navigation/native';
import styles from './ParentChat.styles';
import RoleMenuModal from '../RoleMenuModal';
import { parentMenuItems, parentMenuTitle } from '../roleMenus';
import RoleHeader from '../components/ui/RoleHeader';
import AquaticBackground from '../components/ui/AquaticBackground';
import PrimaryButton from '../components/ui/PrimaryButton';

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
  const route = useRoute();
  const fromInstructor = route.params?.fromInstructor ?? false;
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [showNavMenu, setShowNavMenu] = useState(false);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) {
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        side: fromInstructor ? 'left' : 'right',
        text: trimmed,
      },
    ]);
    setInput('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <AquaticBackground variant="parent" />
      <RoleHeader
        title="צ'אט"
        subtitle="תקשורת בין מדריך להורה"
        onMenuPress={() => setShowNavMenu(true)}
        rightIcon="⌕"
        rightLabel="חיפוש"
      />

      <RoleMenuModal
        visible={showNavMenu}
        onClose={() => setShowNavMenu(false)}
        title={parentMenuTitle}
        items={parentMenuItems}
        navigation={navigation}
      />

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

          <PrimaryButton
            label="שליחה"
            onPress={handleSend}
            style={styles.sendButtonShell}
            gradientStyle={styles.sendButton}
            textStyle={styles.sendButtonText}
            colorsOverride={['#2E77BC', '#255E97']}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
