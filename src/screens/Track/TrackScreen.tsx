import { StyleSheet, View } from 'react-native';

import { AppText, PillButton, Screen } from '@/components';
import { type HomeStackScreenProps } from '@/navigation/types';
import { colors, layout } from '@/theme';

export function TrackScreen({ navigation }: HomeStackScreenProps<'Track'>) {
  return (
    <Screen background={colors.surface.white}>
      <View style={styles.content}>
        <AppText variant="title" color={colors.ink.heading}>
          Track Your Package
        </AppText>
        <PillButton
          label="Track Now"
          labelVariant="button"
          onPress={() => navigation.navigate('TrackingDetail', { receipt: 'SCP6653728497' })}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: 24,
    paddingHorizontal: layout.screenPadding,
  },
});
