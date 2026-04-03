import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import { colors, shadows } from '../theme/tokens';

const { width } = Dimensions.get('window');

function clamp(min, val, max) {
  return Math.min(Math.max(val, min), max);
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgDeep },
  scrollContent: { paddingTop: 110, paddingBottom: 60 },

  /* Waves & Bubbles */
  waveContainer: {
    position: 'absolute', bottom: 0, left: 0,
    width: 2400, height: 150, zIndex: 0,
  },
  bubbleWrapper: { position: 'absolute', zIndex: 1 },

  /* ── Navbar ── */
  navbar: {
    position: 'absolute', top: 0, left: 0, right: 0,
    paddingTop: Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight || 20) + 15,
    paddingBottom: 14,
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 100,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  navIconBtn: {
    width: 40, height: 40,
    justifyContent: 'center', alignItems: 'center',
  },
  hamburgerLine: {
    width: 22, height: 2,
    backgroundColor: '#fff', borderRadius: 2,
  },
  navCenter: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  navLogo: {
    width: 32, height: 32, borderRadius: 16,
    justifyContent: 'center', alignItems: 'center',
  },
  navLogoEmoji: { fontSize: 16 },
  navTitle: {
    color: '#fff', fontSize: 18, fontWeight: '700',
    writingDirection: 'rtl',
  },
  navBell: { fontSize: 20 },

  /* ── Hero ── */
  hero: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '8%',
    paddingTop: 30,
    paddingBottom: 10,
    zIndex: 10,
  },
  heroWelcome: {
    fontSize: clamp(26, width * 0.075, 34),
    fontWeight: '300',
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    writingDirection: 'rtl',
    marginBottom: 6,
  },
  heroChildRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  heroChildLabel: {
    fontSize: clamp(20, width * 0.06, 28),
    fontWeight: '400',
    color: 'rgba(255,255,255,0.75)',
    writingDirection: 'rtl',
  },
  heroChildName: {
    fontSize: clamp(28, width * 0.08, 38),
    fontWeight: '800',
    color: '#00d4ff',
    textShadowColor: 'rgba(0,212,255,0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
    writingDirection: 'rtl',
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '300',
    writingDirection: 'rtl',
  },

  /* ── Stats row ── */
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    marginTop: 28,
    gap: 10,
    zIndex: 10,
  },
  statCardOuter: { flex: 1 },
  statCard: {
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
  },
  statIconWrap: {
    width: 48, height: 48, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 10,
  },
  statIcon: { fontSize: 22 },
  statValue: {
    color: '#fff', fontSize: 18, fontWeight: '700',
    marginBottom: 4, writingDirection: 'rtl',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.55)', fontSize: 11,
    fontWeight: '500', writingDirection: 'rtl',
  },

  /* ── Section shared ── */
  section: {
    marginTop: 36,
    paddingHorizontal: '5%',
    zIndex: 10,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 18,
    gap: 8,
  },
  sectionDot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: '#00d4ff',
    shadowColor: '#00d4ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },
  sectionTitle: {
    fontSize: 22, fontWeight: '700',
    color: '#fff',
    writingDirection: 'rtl',
  },

  /* ── Activity cards ── */
  activityCard: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  activityAccent: {
    position: 'absolute',
    right: 0, top: 12, bottom: 12,
    width: 3, borderRadius: 3,
  },
  activityBody: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingRight: 18,
  },
  activityIconWrap: { marginRight: 14 },
  activityIconBg: {
    width: 48, height: 48, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  activityIcon: { fontSize: 22 },
  activityTextWrap: { flex: 1 },
  activityTitle: {
    color: '#fff', fontSize: 16, fontWeight: '700',
    textAlign: 'right', writingDirection: 'rtl',
    marginBottom: 3,
  },
  activityDesc: {
    color: 'rgba(255,255,255,0.55)', fontSize: 13,
    textAlign: 'right', writingDirection: 'rtl',
    lineHeight: 19,
  },
  activityDateBadge: {
    backgroundColor: 'rgba(0,212,255,0.12)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,212,255,0.2)',
  },
  activityDate: {
    color: '#00d4ff', fontSize: 12, fontWeight: '700',
  },

  /* ── Instructor card ── */
  instructorCard: {
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
  },
  instructorAvatar: {
    width: 52, height: 52, borderRadius: 16,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#00d4ff',
    shadowOpacity: 0.3,
    shadowRadius: 14,
  },
  instructorInitials: {
    color: '#001529', fontSize: 18, fontWeight: '800',
  },
  instructorInfo: {
    flex: 1,
    marginRight: 14,
    marginLeft: 14,
  },
  instructorName: {
    color: '#fff', fontSize: 17, fontWeight: '700',
    textAlign: 'right', writingDirection: 'rtl',
  },
  instructorRole: {
    color: 'rgba(255,255,255,0.5)', fontSize: 12,
    textAlign: 'right', writingDirection: 'rtl',
    marginTop: 3,
  },
  chatBtn: { borderRadius: 14, overflow: 'hidden' },
  chatBtnGradient: {
    width: 44, height: 44,
    justifyContent: 'center', alignItems: 'center',
    borderRadius: 14,
  },
  chatBtnIcon: { fontSize: 20 },

  /* ── Action buttons ── */
  actionsSection: {
    marginTop: 34,
    paddingHorizontal: '5%',
    gap: 12,
    zIndex: 10,
  },
  actionBtnOuter: {
    borderRadius: 18,
    overflow: 'hidden',
    ...shadows.glowPrimary,
  },
  actionBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 22,
    borderRadius: 18,
  },
  actionBtnIcon: { fontSize: 22, marginRight: 14 },
  actionBtnLabel: {
    flex: 1,
    color: '#001529',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  actionBtnArrow: {
    color: 'rgba(0,21,41,0.5)',
    fontSize: 20,
    fontWeight: '700',
  },

  /* ── Footer ── */
  footer: {
    marginTop: 60,
    paddingTop: 30,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    zIndex: 10,
  },
  footerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  footerEmoji: { fontSize: 22 },
  footerBrandText: { color: '#fff', fontSize: 20, fontWeight: '600' },
  footerText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 13,
    marginBottom: 8,
    textAlign: 'center',
  },
  footerCopy: { color: 'rgba(255,255,255,0.3)', fontSize: 11 },
});

export default styles;
