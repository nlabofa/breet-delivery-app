import { StyleSheet, View } from 'react-native';

import { AppText, PillButton, Screen } from '@/components';
import { type RootStackScreenProps } from '@/navigation/types';
import { colors, layout } from '@/theme';

export function TrackingDetailScreen({
  navigation,
  route,
}: RootStackScreenProps<'TrackingDetail'>) {
  return (
    <Screen background={colors.surface.soft}>
      <View style={styles.content}>
        <AppText variant="headerTitle" color={colors.ink.navy}>
          Tracking Details
        </AppText>
        <AppText variant="label" color={colors.ink.receipt}>
          {route.params.receipt}
        </AppText>
        <PillButton label="Back" onPress={() => navigation.goBack()} />
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
