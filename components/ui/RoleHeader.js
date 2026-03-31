import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

export default function RoleHeader({
  title,
  subtitle,
  onMenuPress,
  onRightPress,
  rightIcon = '⌕',
  rightLabel,
}) {
  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.75} style={styles.iconButton} onPress={onMenuPress}>
        <Text style={styles.headerIcon}>☰</Text>
      </TouchableOpacity>

      <View style={styles.headerCenter}>
        <Text style={styles.headerTitle}>{title}</Text>
        {!!subtitle && <Text style={styles.headerSubtitle}>{subtitle}</Text>}
      </View>

      <TouchableOpacity activeOpacity={0.75} style={styles.iconButton} onPress={onRightPress}>
        <Text style={styles.headerIcon}>{rightIcon}</Text>
        {!!rightLabel && <Text style={styles.searchLabel}>{rightLabel}</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 12,
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 12,
  },
  iconButton: {
    minWidth: 44,
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 28,
    color: '#1D2935',
  },
  headerCenter: {
    alignItems: 'center',
    flex: 1,
  },
  headerTitle: {
    color: '#1F8FD7',
    fontSize: 32,
    fontWeight: '700',
    writingDirection: 'rtl',
    textAlign: 'center',
  },
  headerSubtitle: {
    marginTop: 2,
    color: '#7D95AA',
    fontSize: 12,
    writingDirection: 'rtl',
    textAlign: 'center',
  },
  searchLabel: {
    color: '#517796',
    fontSize: 12,
    marginTop: 2,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
});
