import { Image } from 'expo-image';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { designFrame } from '@/utils/scale';

const frames: Record<string, number[]> = __DEV__
  ? {
      Login: [require('@assets/design/login.png')],
      Home: [require('@assets/design/home.png')],
      Track: [require('@assets/design/track.png')],
      TrackingDetail: [
        require('@assets/design/tracking-detail.png'),
        require('@assets/design/tracking-detail-expanded.png'),
      ],
    }
  : {};

const OPACITY_STEPS = [0, 0.5, 1];

type DesignOverlayProps = {
  routeName: string | undefined;
};

export function DesignOverlay({ routeName }: DesignOverlayProps) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [opacityStep, setOpacityStep] = useState(0);
  const [variant, setVariant] = useState(0);

  const sources = routeName ? frames[routeName] : undefined;
  const source = sources?.[variant % sources.length];
  const opacity = OPACITY_STEPS[opacityStep] ?? 0;

  return (
    <>
      {source && opacity > 0 ? (
        <View pointerEvents="none" style={StyleSheet.absoluteFill}>
          <Image
            source={source}
            contentFit="fill"
            style={{
              width,
              height: (width / designFrame.width) * designFrame.height,
              opacity,
            }}
          />
        </View>
      ) : null}
      <Pressable
        onPress={() => setOpacityStep((step) => (step + 1) % OPACITY_STEPS.length)}
        onLongPress={() => setVariant((value) => value + 1)}
        style={[styles.toggle, { bottom: insets.bottom + 96 }]}
      >
        <Text style={styles.toggleLabel}>{Math.round(opacity * 100)}</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  toggle: {
    position: 'absolute',
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 0, 128, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleLabel: {
    color: '#FFFFFF',
    fontSize: 10,
  },
});
