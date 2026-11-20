import { type ReactNode } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, radii, sizes, type TypographyVariant } from '@/theme';

import { AppText } from './AppText';

export type PillButtonProps = {
  label: string;
  onPress: () => void;
  labelVariant?: Extract<TypographyVariant, 'label' | 'button'>;
  labelAlign?: 'center' | 'start';
  leading?: ReactNode;
  trailing?: ReactNode;
  paddingStart?: number;
  paddingEnd?: number;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};

export function PillButton({
  label,
  onPress,
  labelVariant = 'label',
  labelAlign = 'center',
  leading,
  trailing,
  paddingStart = 0,
  paddingEnd = 0,
  style,
  accessibilityLabel,
}: PillButtonProps) {
  const centered = labelAlign === 'center';

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      style={({ pressed }) => [
        styles.container,
        { paddingStart, paddingEnd },
        pressed && styles.pressed,
        style,
      ]}
    >
      {leading ? <View style={centered ? styles.leadingOverlay : undefined}>{leading}</View> : null}
      <AppText
        variant={labelVariant}
        color={colors.surface.white}
        align={centered ? 'center' : 'left'}
        style={styles.label}
      >
        {label}
      </AppText>
      {trailing}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: sizes.button,
    borderRadius: radii.pill,
    backgroundColor: colors.ink.black,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.85,
  },
  leadingOverlay: {
    position: 'absolute',
    left: 12,
  },
  label: {
    flex: 1,
  },
});
