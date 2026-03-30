import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#D8EEFB',
  },
  aquaticBackground: {
    ...StyleSheet.absoluteFillObject,
  },

  headerWaveBack: {
    position: 'absolute',
    top: 88,
    left: -12,
    right: -12,
    height: 95,
    borderRadius: 55,
    backgroundColor: 'rgba(131, 190, 232, 0.30)',
  },
  headerWaveFront: {
    position: 'absolute',
    top: 102,
    left: -22,
    right: -18,
    height: 82,
    borderRadius: 55,
    backgroundColor: 'rgba(149, 207, 244, 0.45)',
  },

  header: {
    paddingTop: (StatusBar.currentHeight || 0) + 14,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButton: {
    minWidth: 48,
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 32,
    color: '#1789CD',
    lineHeight: 34,
    fontWeight: '700',
  },
  searchLabel: {
    color: '#517796',
    fontSize: 15,
    marginTop: 2,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    color: '#1E7FC0',
    fontSize: 40,
    fontWeight: '700',
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  headerSubtitle: {
    color: '#5E7B95',
    marginTop: 6,
    fontSize: 15,
    textAlign: 'center',
    writingDirection: 'rtl',
  },

  chatCard: {
    flex: 1,
    marginTop: 14,
    marginHorizontal: 22,
    marginBottom: 20,
    backgroundColor: '#F2F5F8',
    borderRadius: 36,
    borderWidth: 2,
    borderColor: '#A5D4F6',
    padding: 14,
    shadowColor: '#5AADE0',
    shadowOpacity: 0.14,
    shadowRadius: 10,
    elevation: 2,
  },
  messagesContainer: {
    paddingVertical: 8,
    gap: 10,
  },
  messageRow: {
    flexDirection: 'row',
  },
  messageRowRight: {
    justifyContent: 'flex-end',
  },
  messageRowLeft: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '78%',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  parentBubble: {
    backgroundColor: '#CFE3EF',
    borderTopRightRadius: 8,
  },
  instructorBubble: {
    backgroundColor: '#E9DCBD',
    borderTopLeftRadius: 8,
  },
  messageText: {
    fontSize: 20,
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  parentMessageText: {
    color: '#155D9A',
  },
  instructorMessageText: {
    color: '#A27111',
  },

  inputBar: {
    marginTop: 14,
    backgroundColor: '#DADFE7',
    borderRadius: 22,
    minHeight: 64,
    paddingLeft: 10,
    paddingRight: 8,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    minHeight: 48,
    color: '#1E2E3D',
    fontSize: 22,
    paddingHorizontal: 8,
    paddingTop: 10,
  },
  sendButtonShell: {
    borderRadius: 22,
    overflow: 'hidden',
  },
  sendButton: {
    minWidth: 90,
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  sendButtonText: {
    color: '#EFF9FF',
    fontSize: 30,
    fontWeight: '500',
    writingDirection: 'rtl',
  },
});

export default styles;
