import { StyleSheet } from 'react-native';
import { colors, spacing, radius, typography, shadows } from '../theme/tokens';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F6FA',
  },

  // Shared screen padding for Instructor flow
  screenContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },

  // Neutral business card surface
  surfaceCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(51, 110, 163, 0.12)',
    backgroundColor: '#FFFFFF',
    padding: spacing.lg,
  },

  helperCard: {
    marginTop: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: 'rgba(143, 176, 214, 0.45)',
    backgroundColor: '#FFFFFF',
    padding: spacing.lg,
  },
  helperTitle: {
    color: '#204A78',
    fontSize: 14,
    fontWeight: '700',
    writingDirection: 'rtl',
    textAlign: 'right',
    marginBottom: spacing.xs,
  },
  helperText: {
    color: '#607286',
    fontSize: 13,
    lineHeight: 20,
    writingDirection: 'rtl',
    textAlign: 'right',
  },

  rowRightIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#1F5E9B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowRightIconText: {
    color: '#fff',
    fontWeight: '800',
  },

  profileAvatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: 'rgba(31, 94, 155, 0.10)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(31, 94, 155, 0.22)',
  },
  profileAvatarText: {
    color: '#1F5E9B',
    fontSize: 44,
    fontWeight: '800',
  },
  profileName: {
    marginTop: spacing.sm,
    fontSize: 24,
    fontWeight: '800',
    color: '#163A61',
    writingDirection: 'rtl',
    textAlign: 'center',
  },
  profileMeta: {
    marginTop: spacing.xs,
    fontSize: 14,
    fontWeight: '600',
    color: '#5A7494',
    writingDirection: 'rtl',
    textAlign: 'center',
  },
  headerDate: {
    marginTop: spacing.sm,
    textAlign: 'center',
    color: '#4B6A96',
    fontSize: 16,
    fontWeight: '600',
    writingDirection: 'rtl',
  },
  chipRow: {
    marginTop: spacing.lg,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  chip: {
    flex: 1,
    marginHorizontal: spacing.xs,
    borderRadius: radius.md,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    backgroundColor: 'rgba(60, 150, 240, 0.06)',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E5086',
    writingDirection: 'rtl',
  },
  mainCard: {
    marginTop: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(51, 110, 163, 0.12)',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    ...shadows.glowPrimary,
  },
  sectionTitle: {
    color: '#204A78',
    fontSize: typography.title,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  groupRow: {
    marginTop: spacing.md,
    borderRadius: radius.md,
    backgroundColor: '#F7FAFE',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(143, 176, 214, 0.5)',
  },
  cancelButton: {
    backgroundColor: '#FCE9EA',
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    minWidth: 96,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#C0392B',
    fontWeight: '600',
    fontSize: 13,
    writingDirection: 'rtl',
  },
  groupTextWrap: {
    alignItems: 'flex-end',
    flex: 1,
    marginRight: 8,
  },
  groupTitle: {
    color: '#1F5E9B',
    fontSize: 18,
    fontWeight: '600',
    writingDirection: 'rtl',
  },
  groupSubtitle: {
    color: '#8A96A8',
    fontSize: 13,
    marginTop: 2,
    writingDirection: 'rtl',
  },
  bottomActions: {
    marginTop: spacing.lg,
    gap: 10,
  },
  actionButton: {
    borderRadius: radius.md,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: spacing.xs,
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    writingDirection: 'rtl',
  },
});

export default styles;
