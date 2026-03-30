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
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#1E7FC0',
    fontSize: 34,
    fontWeight: '700',
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  headerSubtitle: {
    color: '#5E7B95',
    marginTop: 6,
    fontSize: 14,
    textAlign: 'center',
    writingDirection: 'rtl',
    paddingHorizontal: 8,
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
    paddingBottom: 22,
    shadowColor: '#5AADE0',
    shadowOpacity: 0.14,
    shadowRadius: 10,
    elevation: 2,
  },

  monthRow: {
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  monthLabel: {
    color: '#1B68A6',
    fontSize: 18,
    writingDirection: 'rtl',
  },

  weekdayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  weekdayText: {
    width: '14.285%',
    textAlign: 'center',
    color: '#246CA8',
    fontSize: 22,
    writingDirection: 'rtl',
  },

  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
    marginBottom: 18,
  },
  dayOuter: {
    width: '14.285%',
    alignItems: 'center',
  },
  dayPlaceholder: {
    width: '14.285%',
    height: 40,
  },
  dayChip: {
    minWidth: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayChipSelected: {
    borderWidth: 2,
    borderColor: '#1887D4',
  },
  dayText: {
    color: '#0D5E9C',
    fontSize: 26,
    lineHeight: 28,
  },
  dayTextSelected: {
    color: '#0D5E9C',
    fontWeight: '700',
  },

  timeTitle: {
    color: '#1B68A6',
    fontSize: 24,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 10,
    marginTop: 4,
  },
  timeSlotsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    gap: 8,
    marginBottom: 26,
  },
  timeChip: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#B2D9F4',
    backgroundColor: '#EAF5FC',
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  timeChipSelected: {
    backgroundColor: '#D3EEFF',
    borderColor: '#2D96E3',
  },
  timeText: {
    color: '#1C6DAA',
    fontSize: 16,
    fontWeight: '500',
  },
  timeTextSelected: {
    color: '#105F9A',
    fontWeight: '700',
  },

  confirmButtonShell: {
    borderRadius: 30,
    overflow: 'hidden',
    alignSelf: 'center',
    width: '72%',
  },
  confirmButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 30,
  },
  confirmButtonText: {
    color: '#EFF9FF',
    fontSize: 32,
    fontWeight: '500',
    writingDirection: 'rtl',
  },
});

export default styles;
