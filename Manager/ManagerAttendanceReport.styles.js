import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#D9DEE3',
  },
  aquaticBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  waterGlowLarge: {
    position: 'absolute',
    top: -70,
    right: -40,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
  },
  waterGlowSmall: {
    position: 'absolute',
    top: 180,
    left: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(128, 208, 247, 0.24)',
  },
  headerWaveBack: {
    position: 'absolute',
    top: 86,
    left: -40,
    right: -40,
    height: 86,
    borderRadius: 90,
    backgroundColor: '#9CCEF1',
    opacity: 0.6,
  },
  headerWaveFront: {
    position: 'absolute',
    top: 102,
    left: -25,
    right: -25,
    height: 78,
    borderRadius: 90,
    backgroundColor: '#BEE0F7',
  },
  header: {
    marginTop: 12,
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 28,
    color: '#1D2935',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    color: '#1F8FD7',
    fontSize: 34,
    fontWeight: '700',
    writingDirection: 'rtl',
  },
  headerSubtitle: {
    marginTop: 2,
    color: '#7D95AA',
    fontSize: 12,
    writingDirection: 'rtl',
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingTop: 24,
    paddingBottom: 24,
  },
  mainCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#8CC6ED',
    backgroundColor: '#F3F5F8',
    padding: 16,
    paddingBottom: 14,
  },
  sectionTitle: {
    color: '#2B6D9F',
    fontSize: 31,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  summaryGrid: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
  },
  summaryCard: {
    width: '46.8%',
    minHeight: 92,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryPresent: {
    backgroundColor: '#C9E8D9',
  },
  summaryAbsent: {
    backgroundColor: '#F0D8DA',
  },
  summaryLate: {
    backgroundColor: '#EEEABF',
  },
  summaryValue: {
    fontSize: 34,
    fontWeight: '700',
  },
  valuePresent: {
    color: '#2E8DBF',
  },
  valueAbsent: {
    color: '#D95B53',
  },
  valueLate: {
    color: '#AFA140',
  },
  summaryLabel: {
    marginTop: 2,
    color: '#7B8A95',
    fontSize: 16,
    writingDirection: 'rtl',
  },
  dailyTitle: {
    marginTop: 12,
  },
  dailyRow: {
    marginTop: 10,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowPresent: {
    backgroundColor: '#C0E6D7',
  },
  rowAbsent: {
    backgroundColor: '#F4DDE1',
  },
  rowLate: {
    backgroundColor: '#F0EDC8',
  },
  dailyStatus: {
    color: '#2B72AA',
    fontSize: 24,
    writingDirection: 'rtl',
  },
  dailyDate: {
    color: '#2B72AA',
    fontSize: 24,
  },
  exportButtonShell: {
    marginTop: 14,
    borderRadius: 24,
    overflow: 'hidden',
    alignSelf: 'center',
    width: '79%',
    maxWidth: 350,
  },
  exportButton: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exportButtonText: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '700',
    writingDirection: 'rtl',
  },
});

export default styles;
