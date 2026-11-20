import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { colors, radii, sizes } from '@/theme';

export type EmojiBadgeProps = {
  source: number;
  tone?: 'soft' | 'yellow';
};

export function EmojiBadge({ source, tone = 'soft' }: EmojiBadgeProps) {
  return (
    <View style={[styles.badge, tone === 'yellow' ? styles.yellow : styles.soft]}>
      <Image source={source} style={styles.emoji} contentFit="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    width: sizes.badge,
    height: sizes.badge,
    borderRadius: radii.circle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  soft: {
    backgroundColor: colors.surface.soft,
  },
  yellow: {
    backgroundColor: colors.brand.yellow,
  },
  emoji: {
    width: sizes.emoji,
    height: sizes.emoji,
  },
});
