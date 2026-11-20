import LottieView from 'lottie-react-native';
import { StyleSheet, View } from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';

import { AppText } from '@/components';
import { colors } from '@/theme';
import { moderateScale, scale } from '@/utils/scale';

const ANIMATION_SIZE = scale(161);

export function SquadInvite() {
  const reduceMotion = useReducedMotion();

  return (
    <View style={styles.container}>
      <View
        accessible
        accessibilityRole="image"
        accessibilityLabel="Cyclist riding an e-bike"
        style={styles.animation}
      >
        <LottieView
          source={require('@assets/lottie/cyclist.json')}
          autoPlay={!reduceMotion}
          loop
          style={styles.fill}
        />
      </View>
      <AppText variant="bodyTight" color={colors.ink.grey} style={styles.copy}>
        You too can join our Elite squad of E-bikers
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: scale(154),
  },
  animation: {
    position: 'absolute',
    left: 0,
    top: scale(-7),
    width: ANIMATION_SIZE,
    height: ANIMATION_SIZE,
  },
  fill: {
    flex: 1,
  },
  copy: {
    position: 'absolute',
    left: scale(161),
    top: scale(46),
    width: moderateScale(166),
  },
});
