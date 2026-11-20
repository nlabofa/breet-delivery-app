import { useState } from 'react';
import { Platform, StyleSheet, TextInput, View } from 'react-native';

import ArrowRight from '@assets/icons/arrow-right.svg';
import CardBackground from '@assets/illustrations/track-card.svg';
import { AppText, PillButton } from '@/components';
import { colors, radii, sizes, typography } from '@/theme';
import { moderateScale, scale } from '@/utils/scale';

const CARD = { width: scale(327), height: scale(308) };
const INNER_PADDING = scale(24);

export type TrackPackageCardProps = {
  onTrackPress: (receipt: string) => void;
};

export function TrackPackageCard({ onTrackPress }: TrackPackageCardProps) {
  const [receipt, setReceipt] = useState('');

  return (
    <View style={styles.card}>
      <CardBackground width={CARD.width} height={CARD.height} style={StyleSheet.absoluteFill} />
      <AppText variant="title" color={colors.ink.heading} accessibilityRole="header">
        Track Your Package
      </AppText>
      <AppText variant="bodyCompact" color={colors.ink.mutedOnYellow} style={styles.subtitle}>
        Enter the receipt number that has been given by the officer
      </AppText>
      <TextInput
        value={receipt}
        onChangeText={setReceipt}
        placeholder="Enter the receipt number"
        placeholderTextColor={colors.line.inputOnYellow}
        autoCapitalize="characters"
        autoCorrect={false}
        returnKeyType="search"
        onSubmitEditing={() => onTrackPress(receipt)}
        accessibilityLabel="Receipt number"
        style={styles.input}
      />
      <PillButton
        label="Track Now"
        labelVariant="button"
        labelAlign="start"
        trailing={<ArrowRight {...sizes.arrow} color={colors.surface.white} />}
        paddingStart={scale(34)}
        paddingEnd={scale(28)}
        onPress={() => onTrackPress(receipt)}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD.width,
    height: CARD.height,
    paddingHorizontal: INNER_PADDING,
    paddingTop: scale(53),
  },
  subtitle: {
    marginTop: scale(8),
    width: moderateScale(251),
  },
  input: {
    ...typography.body,
    ...Platform.select({ android: { includeFontPadding: false }, default: {} }),
    marginTop: scale(29),
    height: sizes.button,
    borderRadius: radii.pill,
    borderWidth: 0.5,
    borderColor: colors.line.inputOnYellow,
    paddingHorizontal: scale(34),
    paddingVertical: 0,
    color: colors.line.inputOnYellow,
  },
  button: {
    marginTop: scale(10),
  },
});
