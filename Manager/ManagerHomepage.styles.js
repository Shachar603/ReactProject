import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#D9DEE3',
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
    fontSize: 32,
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
    paddingBottom: 18,
  },
  sectionTitle: {
    color: '#2B6D9F',
    fontSize: 24,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  statsRow: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    height: 92,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statCardCool: {
    backgroundColor: '#D9EAF6',
  },
  statCardWarm: {
    backgroundColor: '#EEE1D8',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '700',
  },
  statNumberCool: {
    color: '#2C8CCB',
  },
  statNumberWarm: {
    color: '#E28328',
  },
  statLabel: {
    color: '#89939B',
    fontSize: 16,
    writingDirection: 'rtl',
  },
  groupsTitle: {
    marginTop: 18,
  },
  groupRow: {
    marginTop: 10,
    borderRadius: 14,
    backgroundColor: '#E7E9EE',
    paddingVertical: 13,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#2994DD',
    borderRadius: 16,
    minWidth: 64,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    writingDirection: 'rtl',
  },
  groupTextWrap: {
    alignItems: 'flex-end',
  },
  groupTitle: {
    color: '#2C75AE',
    fontSize: 22,
    writingDirection: 'rtl',
  },
  groupSubtitle: {
    color: '#A2A7AE',
    fontSize: 15,
    marginTop: 2,
    writingDirection: 'rtl',
  },
  reportButtonShell: {
    marginTop: 16,
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'center',
    width: '78%',
    maxWidth: 320,
  },
  reportButton: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    writingDirection: 'rtl',
  },
});

export default styles;