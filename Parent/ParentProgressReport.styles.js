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
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    fontSize: 40,
    color: '#1789CD',
    lineHeight: 42,
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    color: '#1E7FC0',
    fontSize: 32,
    fontWeight: '700',
    writingDirection: 'rtl',
  },
  headerSubtitle: {
    color: '#5E7B95',
    marginTop: 4,
    fontSize: 14,
    writingDirection: 'rtl',
  },

  scrollContent: {
    paddingHorizontal: 22,
    paddingBottom: 34,
    paddingTop: 20,
  },
  mainCard: {
    backgroundColor: '#F2F5F8',
    borderRadius: 36,
    borderWidth: 2,
    borderColor: '#A5D4F6',
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 22,
  },

  childName: {
    color: '#1A5F99',
    textAlign: 'right',
    fontSize: 28,
    fontWeight: '700',
    writingDirection: 'rtl',
  },
  reportDate: {
    color: '#6F8296',
    textAlign: 'right',
    marginTop: 4,
    marginBottom: 16,
    fontSize: 15,
    writingDirection: 'rtl',
  },

  reportRow: {
    backgroundColor: '#E7EBF1',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  reportLabel: {
    color: '#1A67A8',
    textAlign: 'right',
    fontSize: 18,
    writingDirection: 'rtl',
  },
  reportValue: {
    color: '#5D768D',
    textAlign: 'right',
    marginTop: 2,
    fontSize: 14,
    writingDirection: 'rtl',
  },

  buttonShell: {
    borderRadius: 28,
    overflow: 'hidden',
    marginTop: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  buttonText: {
    color: '#EFF9FF',
    fontSize: 18,
    fontWeight: '600',
    writingDirection: 'rtl',
  },
});

export default styles;
