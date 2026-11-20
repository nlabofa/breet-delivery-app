import { type ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, radii, sizes, type TypographyVariant } from '@/theme';

import { scale } from '@/utils/scale';

import { AppText } from './AppText';
import { PressableScale } from './PressableScale';

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
    <PressableScale
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      style={[styles.container, { paddingStart, paddingEnd }, style]}
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
    </PressableScale>
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
  leadingOverlay: {
    position: 'absolute',
    left: scale(12),
  },
  label: {
    flex: 1,
  },
});
