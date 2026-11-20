import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, type SharedValue } from 'react-native-reanimated';

import LoginWave from '@assets/illustrations/login-wave.svg';
import { useDesignInsets } from '@/hooks/useDesignInsets';
import { useLoop } from '@/hooks/useLoop';
import { colors, radii } from '@/theme';
import { scale } from '@/utils/scale';

const CIRCLE = { x: -250, y: -33, size: 556 };
const WAVE = { y: -25, width: 188, height: 183 };
const WAVE_OFFSETS = [225, 241, 259];
const WAVE_DRIFT_DURATION = 5600;
// Each line drifts a little further than the one before, so they fan apart and close back up.
const WAVE_DRIFT = [scale(5), scale(8), scale(11)];

export function LoginBackground() {
  const { fromTop } = useDesignInsets();
  const drift = useLoop(WAVE_DRIFT_DURATION);

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <View
        style={[
          styles.circle,
          {
            left: scale(CIRCLE.x),
            top: fromTop(CIRCLE.y),
            width: scale(CIRCLE.size),
            height: scale(CIRCLE.size),
          },
        ]}
      />
      {WAVE_OFFSETS.map((x, index) => (
        <DriftingWave
          key={x}
          drift={drift}
          distance={WAVE_DRIFT[index] ?? 0}
          style={{ left: scale(x), top: fromTop(WAVE.y) }}
        />
      ))}
    </View>
  );
}

type DriftingWaveProps = {
  drift: SharedValue<number>;
  distance: number;
  style: { left: number; top: number };
};

function DriftingWave({ drift, distance, style }: DriftingWaveProps) {
  const driftStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: drift.get() * distance },
      { translateY: drift.get() * distance * 0.5 },
    ],
  }));

  return (
    <Animated.View style={[styles.wave, style, driftStyle]}>
      <LoginWave width={scale(WAVE.width)} height={scale(WAVE.height)} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    borderRadius: radii.circle,
    backgroundColor: colors.brand.yellowDeep,
  },
  wave: {
    position: 'absolute',
  },
});
