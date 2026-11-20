import { scale } from '@/utils/scale';

export const radii = {
  handle: scale(4),
  iconButton: scale(12),
  summaryCard: scale(24),
  pill: scale(28),
  card: scale(32),
  sheet: scale(35),
  receiptPill: scale(46),
  circle: 999,
} as const;

export const sizes = {
  avatar: scale(48),
  iconButton: scale(40),
  button: scale(56),
  badge: scale(56),
  emoji: scale(24),
  dot: scale(6),
  tabIcon: scale(24),
  googleBadge: scale(32),
  googleIcon: scale(20),
  arrow: { width: scale(19), height: scale(12) },
  chevron: { width: scale(8), height: scale(14) },
  bell: { width: scale(20), height: scale(22) },
} as const;
