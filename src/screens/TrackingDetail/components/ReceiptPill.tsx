import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components';
import { colors, radii, sizes } from '@/theme';
import { scale } from '@/utils/scale';

export type ReceiptPillProps = {
  value: string;
};

export function ReceiptPill({ value }: ReceiptPillProps) {
  return (
    <View style={styles.outer} accessibilityLabel={`Receipt number ${value}`} accessible>
      <View style={styles.inner}>
        <AppText variant="label" color={colors.ink.receipt} align="center">
          {value}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    height: scale(88),
    borderRadius: radii.receiptPill,
    backgroundColor: colors.brand.yellow,
    padding: scale(16),
  },
  inner: {
    height: sizes.button,
    borderRadius: radii.pill,
    borderWidth: 0.5,
    borderColor: colors.ink.receipt,
    justifyContent: 'center',
  },
});
