import { StyleSheet } from 'react-native';
import { spacing, radius, typography } from '../theme/tokens';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F6FA',
  },

  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    paddingTop: spacing.lg,
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(51, 110, 163, 0.12)',
    padding: spacing.lg,
  },

  topInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  bellIcon: {
    fontSize: 30,
    marginTop: -4,
  },
  greetingWrap: {
    flex: 1,
  },
  greeting: {
    color: '#1F5E9B',
    fontSize: 24,
    textAlign: 'right',
    writingDirection: 'rtl',
    fontWeight: '700',
  },
  childName: {
    color: '#0F2E4A',
    fontWeight: '800',
  },
  greetingSub: {
    color: '#607286',
    marginTop: 4,
    textAlign: 'right',
    fontSize: 14,
    writingDirection: 'rtl',
  },

  sectionTitle: {
    color: '#204A78',
    fontSize: typography.title,
    textAlign: 'right',
    marginTop: spacing.lg,
    marginBottom: spacing.md,
    writingDirection: 'rtl',
  },

  activityCard: {
    backgroundColor: '#F8FBFF',
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  activityDate: {
    color: '#30495F',
    fontSize: 14,
    fontWeight: '600',
  },
  activityTextWrap: {
    flex: 1,
    marginLeft: 14,
  },
  activityTitle: {
    color: '#1F5E9B',
    textAlign: 'right',
    fontSize: 18,
    writingDirection: 'rtl',
    fontWeight: '700',
  },
  activityDesc: {
    color: '#607286',
    textAlign: 'right',
    marginTop: 2,
    fontSize: 14,
    writingDirection: 'rtl',
  },

  instructorText: {
    color: '#1E5086',
    textAlign: 'right',
    marginTop: 8,
    marginBottom: 14,
    fontSize: 16,
    writingDirection: 'rtl',
  },

  actionButtonShell: {
    borderRadius: radius.md,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderRadius: 30,
  },
  actionButtonText: {
    color: '#EFF9FF',
    fontSize: 16,
    fontWeight: '700',
    writingDirection: 'rtl',
  },
});

export default styles;
