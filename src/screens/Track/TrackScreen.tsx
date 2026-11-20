import { useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { HomeHeader, Screen } from '@/components';
import { currentUser } from '@/data/user';
import { useDesignInsets } from '@/hooks/useDesignInsets';
import { type HomeStackScreenProps } from '@/navigation/types';
import { colors, layout } from '@/theme';
import { scale } from '@/utils/scale';

import { TrackPackageCard } from './components/TrackPackageCard';

const HEADER_TOP = 40;
const DEFAULT_RECEIPT = 'SCP6653728497';

export function TrackScreen({ navigation }: HomeStackScreenProps<'Track'>) {
  const { fromTop } = useDesignInsets();

  const openDetail = useCallback(
    (receipt: string) =>
      navigation.navigate('TrackingDetail', { receipt: receipt.trim() || DEFAULT_RECEIPT }),
    [navigation],
  );

  return (
    <Screen background={colors.surface.white} edges={[]}>
      <ScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.content, { paddingTop: fromTop(HEADER_TOP) }]}
      >
        <HomeHeader avatar={currentUser.avatar} greeting={currentUser.greeting} />
        <View style={styles.card}>
          <TrackPackageCard onTrackPress={openDetail} />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: scale(layout.screenPadding),
    paddingBottom: scale(layout.screenPadding),
  },
  card: {
    marginTop: scale(37),
  },
});
