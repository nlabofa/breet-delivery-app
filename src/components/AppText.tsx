import { Platform, StyleSheet, Text, type TextProps, type TextStyle } from 'react-native';

import { typography, type TypographyVariant } from '@/theme';

export type AppTextProps = TextProps & {
  variant: TypographyVariant;
  color: string;
  align?: TextStyle['textAlign'];
};

export function AppText({ variant, color, align, style, ...rest }: AppTextProps) {
  return (
    <Text
      {...rest}
      style={[styles.base, typography[variant], { color, textAlign: align }, style]}
    />
  );
}

const styles = StyleSheet.create({
  base: Platform.select({
    android: { includeFontPadding: false },
    default: {},
  }),
});
