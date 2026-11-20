import { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import ChevronRight from '@assets/icons/chevron-right.svg';
import { AppText, EmojiBadge } from '@/components';
import { colors, sizes } from '@/theme';
import { type Shipment } from '@/types';
import { scale } from '@/utils/scale';

export type ShipmentRowProps = {
  shipment: Shipment;
  onPress: (shipment: Shipment) => void;
};

export const ShipmentRow = memo(function ShipmentRow({ shipment, onPress }: ShipmentRowProps) {
  return (
    <Pressable
      onPress={() => onPress(shipment)}
      accessibilityRole="button"
      accessibilityLabel={`${shipment.receipt}, ${shipment.status}`}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <EmojiBadge source={shipment.emoji} />
      <View style={styles.text}>
        <AppText variant="rowTitle" color={colors.ink.body}>
          {shipment.receipt}
        </AppText>
        <AppText variant="body" color={colors.ink.muted} style={styles.status}>
          {shipment.status}
        </AppText>
      </View>
      <ChevronRight {...sizes.chevron} color={colors.ink.body} style={styles.chevron} />
    </Pressable>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    flex: 1,
    marginStart: scale(16),
  },
  status: {
    marginTop: scale(6),
  },
  chevron: {
    marginEnd: scale(10),
  },
});
