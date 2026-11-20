import { StyleSheet, View } from 'react-native';

import ArrowRight from '@assets/icons/arrow-right.svg';
import { AppText, PillButton } from '@/components';
import { colors } from '@/theme';
import { moderateScale, scale } from '@/utils/scale';

export type OrdersBannerProps = {
  onOrdersPress: () => void;
};

export function OrdersBanner({ onOrdersPress }: OrdersBannerProps) {
  return (
    <View style={styles.banner}>
      <AppText variant="bodyTight" color={colors.ink.mutedOnYellow} style={styles.copy}>
        {'Gotten your\nE-Bike yet?'}
      </AppText>
      <PillButton
        label="Your Orders"
        labelVariant="button"
        labelAlign="start"
        trailing={<ArrowRight width={19} height={12} color={colors.surface.white} />}
        paddingStart={scale(29)}
        paddingEnd={scale(36)}
        onPress={onOrdersPress}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: scale(109),
    backgroundColor: colors.brand.yellow,
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: scale(32),
    paddingEnd: scale(27),
    justifyContent: 'space-between',
  },
  copy: {
    width: moderateScale(106),
  },
  button: {
    width: scale(183),
  },
});
