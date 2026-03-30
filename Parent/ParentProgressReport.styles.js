import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#DCEFFC',
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
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButton: {
    minWidth: 48,
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 38,
    color: '#1789CD',
    lineHeight: 40,
    fontWeight: '700',
  },
  searchLabel: {
    color: '#517796',
    fontSize: 14,
    marginTop: 1,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    color: '#1E7FC0',
    fontSize: 41,
    fontWeight: '500',
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  headerSubtitle: {
    color: '#5E7B95',
    marginTop: 4,
    fontSize: 14,
    textAlign: 'center',
    writingDirection: 'rtl',
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 26,
    paddingTop: 20,
  },
  mainCard: {
    backgroundColor: '#F2F5F8',
    borderRadius: 38,
    borderWidth: 2,
    borderColor: '#A5D4F6',
    paddingHorizontal: 20,
    paddingVertical: 22,
    shadowColor: '#5AADE0',
    shadowOpacity: 0.14,
    shadowRadius: 10,
    elevation: 2,
  },

  reportHeader: {
    marginBottom: 14,
  },
  reportChild: {
    color: '#1B67A5',
    fontSize: 40,
    textAlign: 'right',
    fontWeight: '500',
    writingDirection: 'rtl',
  },
  reportDate: {
    color: '#6F8396',
    marginTop: 2,
    textAlign: 'right',
    fontSize: 14,
    writingDirection: 'rtl',
  },

  sectionTitle: {
    color: '#1E7FC0',
    fontSize: 44,
    textAlign: 'right',
    marginTop: 8,
    marginBottom: 10,
    writingDirection: 'rtl',
  },

  progressItem: {
    marginBottom: 20,
  },
  progressLabelRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    color: '#2A6EA9',
    textAlign: 'right',
    fontSize: 16,
    writingDirection: 'rtl',
  },
  progressPercent: {
    color: '#6A7F93',
    fontSize: 16,
  },
  progressTrack: {
    height: 26,
    borderRadius: 13,
    backgroundColor: '#D9DFE8',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 13,
  },

  feedbackTitle: {
    color: '#1E7FC0',
    textAlign: 'right',
    marginTop: 4,
    marginBottom: 12,
    fontSize: 44,
    writingDirection: 'rtl',
  },
  feedbackBox: {
    minHeight: 130,
    borderRadius: 22,
    backgroundColor: '#DDE0E8',
    paddingHorizontal: 18,
    paddingVertical: 18,
    marginBottom: 18,
    justifyContent: 'flex-start',
  },
  feedbackText: {
    color: '#9199AA',
    textAlign: 'right',
    fontSize: 17,
    writingDirection: 'rtl',
  },

  actionButtonShell: {
    borderRadius: 31,
    overflow: 'hidden',
    marginHorizontal: 38,
    marginBottom: 2,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 31,
  },
  actionButtonText: {
    color: '#EFF9FF',
    fontSize: 19,
    fontWeight: '500',
    writingDirection: 'rtl',
  },
});

export default styles;
