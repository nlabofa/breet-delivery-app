import { StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import { Screen } from '@/components';
import { useDesignInsets } from '@/hooks/useDesignInsets';
import { type RootStackScreenProps } from '@/navigation/types';
import { colors, layout } from '@/theme';
import { scale } from '@/utils/scale';

import { DetailHeader } from './components/DetailHeader';
import { MapBackground } from './components/MapBackground';
import { ReceiptPill } from './components/ReceiptPill';

const HEADER_TOP = 40;
const PILL_TOP = 120;

export function TrackingDetailScreen({
  navigation,
  route,
}: RootStackScreenProps<'TrackingDetail'>) {
  const { receipt } = route.params;
  const { fromTop } = useDesignInsets();
  const sheetIndex = useSharedValue(0);

  return (
    <Screen background={colors.surface.soft} edges={[]}>
      <MapBackground sheetIndex={sheetIndex} />
      <View style={[styles.overlay, { top: fromTop(HEADER_TOP) }]}>
        <DetailHeader title="Tracking Details" onBackPress={() => navigation.goBack()} />
      </View>
      <View style={[styles.overlay, { top: fromTop(PILL_TOP) }]}>
        <ReceiptPill value={receipt} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: scale(layout.screenPadding),
    right: scale(layout.screenPadding),
  },
});
