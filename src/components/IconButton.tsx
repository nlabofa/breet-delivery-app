import { type ReactNode } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { colors, radii, sizes } from '@/theme';

export type IconButtonProps = {
  icon: ReactNode;
  onPress: () => void;
  accessibilityLabel: string;
  variant?: 'soft' | 'ghost';
};

const HIT_SLOP = { top: 4, bottom: 4, left: 4, right: 4 };

export function IconButton({
  icon,
  onPress,
  accessibilityLabel,
  variant = 'soft',
}: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={HIT_SLOP}
      style={({ pressed }) => [
        styles.base,
        variant === 'soft' && styles.soft,
        pressed && styles.pressed,
      ]}
    >
      {icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: sizes.iconButton,
    height: sizes.iconButton,
    borderRadius: radii.iconButton,
    alignItems: 'center',
    justifyContent: 'center',
  },
  soft: {
    backgroundColor: colors.surface.soft,
  },
  pressed: {
    opacity: 0.7,
  },
});
