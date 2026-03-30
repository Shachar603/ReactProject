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

  scrollContent: {
    paddingHorizontal: 22,
    paddingBottom: 34,
    paddingTop: 22,
  },
  mainCard: {
    backgroundColor: '#F2F5F8',
    borderRadius: 36,
    borderWidth: 2,
    borderColor: '#A5D4F6',
    padding: 18,
    shadowColor: '#5AADE0',
    shadowOpacity: 0.14,
    shadowRadius: 10,
    elevation: 2,
  },

  topInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  bellIcon: {
    fontSize: 40,
    marginTop: -8,
  },
  greetingWrap: {
    flex: 1,
  },
  greeting: {
    color: '#1A5F99',
    fontSize: 34,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  childName: {
    color: '#0F2E4A',
    fontWeight: '800',
  },
  greetingSub: {
    color: '#6F8296',
    marginTop: 4,
    textAlign: 'right',
    fontSize: 16,
    writingDirection: 'rtl',
  },

  sectionTitle: {
    color: '#1E7FC0',
    fontSize: 34,
    textAlign: 'right',
    marginTop: 28,
    marginBottom: 14,
    writingDirection: 'rtl',
  },

  activityCard: {
    backgroundColor: '#E7EBF1',
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  activityDate: {
    color: '#131B29',
    fontSize: 22,
    fontWeight: '500',
  },
  activityTextWrap: {
    flex: 1,
    marginLeft: 14,
  },
  activityTitle: {
    color: '#1A67A8',
    textAlign: 'right',
    fontSize: 30,
    writingDirection: 'rtl',
  },
  activityDesc: {
    color: '#76889A',
    textAlign: 'right',
    marginTop: 2,
    fontSize: 14,
    writingDirection: 'rtl',
  },

  instructorText: {
    color: '#1E5F95',
    textAlign: 'right',
    marginTop: 8,
    marginBottom: 14,
    fontSize: 24,
    writingDirection: 'rtl',
  },

  actionButtonShell: {
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 10,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderRadius: 30,
  },
  actionButtonText: {
    color: '#EFF9FF',
    fontSize: 18,
    fontWeight: '500',
    writingDirection: 'rtl',
  },
});

export default styles;
