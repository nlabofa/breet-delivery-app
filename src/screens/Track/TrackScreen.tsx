import { useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppText, HomeHeader, Screen } from '@/components';
import { shipments } from '@/data/shipments';
import { currentUser } from '@/data/user';
import { useDesignInsets } from '@/hooks/useDesignInsets';
import { type HomeStackScreenProps } from '@/navigation/types';
import { colors, layout } from '@/theme';
import { type Shipment } from '@/types';
import { scale } from '@/utils/scale';

import { ShipmentRow } from './components/ShipmentRow';
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

  const openShipment = useCallback(
    (shipment: Shipment) => openDetail(shipment.receipt),
    [openDetail],
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
        <AppText
          variant="section"
          color={colors.ink.title}
          accessibilityRole="header"
          style={styles.historyTitle}
        >
          Tracking history
        </AppText>
        <View style={styles.history}>
          {shipments.map((shipment) => (
            <ShipmentRow key={shipment.id} shipment={shipment} onPress={openShipment} />
          ))}
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
  historyTitle: {
    marginTop: scale(40),
  },
  history: {
    marginTop: scale(16),
    gap: scale(24),
  },
});
