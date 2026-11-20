import { StyleSheet } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, type SharedValue } from 'react-native-reanimated';

import MapIllustration from '@assets/illustrations/map.svg';
import { useDesignInsets } from '@/hooks/useDesignInsets';
import { designFrame, scale } from '@/utils/scale';

import { ROUTE_BLEED, RouteOverlay } from './RouteOverlay';

const MAP_TOP = -63;
const MAP_SHIFT_WHEN_EXPANDED = scale(-215);
const ROUTE_ORIGIN = { x: 41 - ROUTE_BLEED, y: 333 - ROUTE_BLEED };

export type MapBackgroundProps = {
  sheetIndex: SharedValue<number>;
};

export function MapBackground({ sheetIndex }: MapBackgroundProps) {
  const { fromTop } = useDesignInsets();

  const parallaxStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(sheetIndex.value, [0, 1], [0, MAP_SHIFT_WHEN_EXPANDED], 'clamp'),
      },
    ],
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, parallaxStyle]}
      accessible
      accessibilityRole="image"
      accessibilityLabel="Map showing the delivery route"
    >
      <MapIllustration
        width={scale(designFrame.width)}
        height={scale(designFrame.height)}
        style={[styles.layer, { top: fromTop(MAP_TOP) }]}
      />
      <RouteOverlay
        style={[styles.layer, { left: scale(ROUTE_ORIGIN.x), top: fromTop(ROUTE_ORIGIN.y) }]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  layer: {
    position: 'absolute',
  },
});
