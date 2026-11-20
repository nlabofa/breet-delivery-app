import { StyleSheet, View } from 'react-native';

import LoginWave from '@assets/illustrations/login-wave.svg';
import { useDesignInsets } from '@/hooks/useDesignInsets';
import { colors, radii } from '@/theme';
import { scale } from '@/utils/scale';

const CIRCLE = { x: -250, y: -33, size: 556 };
const WAVE = { y: -25, width: 188, height: 183 };
const WAVE_OFFSETS = [225, 241, 259];

export function LoginBackground() {
  const { fromTop } = useDesignInsets();

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
      {WAVE_OFFSETS.map((x) => (
        <LoginWave
          key={x}
          width={scale(WAVE.width)}
          height={scale(WAVE.height)}
          style={[styles.wave, { left: scale(x), top: fromTop(WAVE.y) }]}
        />
      ))}
    </View>
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
