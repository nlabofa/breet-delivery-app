import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import ChevronRight from '@assets/icons/chevron-right.svg';
import { AppText, EmojiBadge, PressableScale } from '@/components';
import { colors, sizes } from '@/theme';
import { type Shipment } from '@/types';
import { scale } from '@/utils/scale';

export type ShipmentRowProps = {
  shipment: Shipment;
  onPress: (shipment: Shipment) => void;
};

export const ShipmentRow = memo(function ShipmentRow({ shipment, onPress }: ShipmentRowProps) {
  return (
    <PressableScale
      onPress={() => onPress(shipment)}
      pressedScale={0.98}
      accessibilityRole="button"
      accessibilityLabel={`${shipment.receipt}, ${shipment.status}`}
      style={styles.row}
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
    </PressableScale>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
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
