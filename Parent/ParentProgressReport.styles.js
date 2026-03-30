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
    fontSize: 44,
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

  scrollContent: {
    paddingHorizontal: 22,
    paddingBottom: 34,
    paddingTop: 20,
  },
  mainCard: {
    backgroundColor: '#F5F6F8',
    borderRadius: 36,
    borderWidth: 2,
    borderColor: '#A5D4F6',
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 18,
  },

  reportHeader: {
    marginBottom: 10,
  },
  reportChild: {
    color: '#1A67A8',
    textAlign: 'right',
    fontSize: 26,
    writingDirection: 'rtl',
  },
  reportDate: {
    color: '#798C9D',
    textAlign: 'right',
    marginTop: 4,
    marginBottom: 8,
    fontSize: 14,
    writingDirection: 'rtl',
  },

  sectionTitle: {
    color: '#1B69A6',
    textAlign: 'right',
    fontSize: 40,
    marginTop: 6,
    marginBottom: 8,
    writingDirection: 'rtl',
  },

  progressItem: {
    marginBottom: 14,
  },
  progressLabelRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressLabel: {
    color: '#1E5F95',
    textAlign: 'right',
    fontSize: 18,
    writingDirection: 'rtl',
  },
  progressPercent: {
    color: '#60768A',
    textAlign: 'right',
    fontSize: 16,
  },
  progressTrack: {
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E1E6EE',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 12,
  },

  notesBox: {
    marginTop: 6,
    marginBottom: 12,
    minHeight: 120,
    borderRadius: 20,
    backgroundColor: '#DDE2EE',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  notesText: {
    color: '#8F9AAF',
    fontSize: 16,
    textAlign: 'right',
    writingDirection: 'rtl',
  },

  actionButtonShell: {
    borderRadius: 30,
    overflow: 'hidden',
    marginTop: 4,
    marginBottom: 10,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 30,
  },
  actionButtonText: {
    color: '#EFF9FF',
    fontSize: 40,
    fontWeight: '500',
    writingDirection: 'rtl',
  },

  bottomLink: {
    marginTop: 8,
    color: '#E7EEF7',
    textAlign: 'center',
    fontSize: 28,
    writingDirection: 'rtl',
  },
});

export default styles;
