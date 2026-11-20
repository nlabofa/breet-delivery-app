import { Pressable, StyleSheet, View } from 'react-native';

import MoreIcon from '@assets/icons/more.svg';
import { AppText } from '@/components';
import { colors } from '@/theme';
import { scale } from '@/utils/scale';

export type EtaHeaderProps = {
  label: string;
  value: string;
  onMorePress?: () => void;
};

export function EtaHeader({ label, value, onMorePress = () => {} }: EtaHeaderProps) {
  return (
    <View style={styles.row}>
      <View>
        <AppText variant="body" color={colors.ink.muted}>
          {label}
        </AppText>
        <AppText variant="eta" color={colors.ink.title} style={styles.value}>
          {value}
        </AppText>
      </View>
      <Pressable
        onPress={onMorePress}
        accessibilityRole="button"
        accessibilityLabel="More options"
        hitSlop={12}
        style={styles.more}
      >
        <MoreIcon width={scale(13)} height={scale(3)} color={colors.ink.more} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  value: {
    marginTop: scale(3),
  },
  more: {
    width: scale(24),
    height: scale(24),
    marginTop: scale(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
