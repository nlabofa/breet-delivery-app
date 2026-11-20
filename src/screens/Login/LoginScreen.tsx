import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import LoginBoxes from '@assets/illustrations/login-boxes.svg';
import { AppText, PageDots, PillButton, Screen } from '@/components';
import { useDesignInsets } from '@/hooks/useDesignInsets';
import { useLoop } from '@/hooks/useLoop';
import { type RootStackScreenProps } from '@/navigation/types';
import { colors, layout } from '@/theme';
import { moderateScale, scale } from '@/utils/scale';

import { GoogleBadge } from './components/GoogleBadge';
import { LoginBackground } from './components/LoginBackground';

const ILLUSTRATION = { x: 35, y: 135, width: 306, height: 236 };
const FOOTER_GAP_TO_FRAME_BOTTOM = 48;
const SUBTITLE_WIDTH = 304;
const FLOAT_DURATION = 3200;
const FLOAT_HEIGHT = scale(6);

export function LoginScreen({ navigation }: RootStackScreenProps<'Login'>) {
  const { fromTop, fromBottom } = useDesignInsets();
  const activePage = useSharedValue(0);
  const float = useLoop(FLOAT_DURATION);

  const floatStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -float.get() * FLOAT_HEIGHT }],
  }));

  const enterApp = () =>
    navigation.replace('Main', { screen: 'HomeTab', params: { screen: 'Home' } });

  return (
    <Screen background={colors.brand.yellow} edges={[]}>
      <LoginBackground />
      <Animated.View
        style={[
          styles.illustration,
          { left: scale(ILLUSTRATION.x), top: fromTop(ILLUSTRATION.y) },
          floatStyle,
        ]}
        accessible
        accessibilityRole="image"
        accessibilityLabel="Boxes ready for delivery"
      >
        <LoginBoxes width={scale(ILLUSTRATION.width)} height={scale(ILLUSTRATION.height)} />
      </Animated.View>
      <View style={[styles.bottom, { paddingBottom: fromBottom(FOOTER_GAP_TO_FRAME_BOTTOM) }]}>
        <AppText
          variant="display"
          color={colors.ink.heading}
          align="center"
          accessibilityRole="header"
        >
          Welcome to E-Bikes
        </AppText>
        <AppText
          variant="body"
          color={colors.ink.mutedOnYellow}
          align="center"
          style={styles.subtitle}
        >
          Buying Electric bikes just got a lot easier, Try us today.
        </AppText>
        <View style={styles.dots}>
          <PageDots
            count={3}
            progress={activePage}
            activeColor={colors.dot.active}
            inactiveColor={colors.dot.inactiveOnYellow}
            spacing={22}
          />
        </View>
        <PillButton
          label="Login with Google"
          leading={<GoogleBadge />}
          onPress={enterApp}
          style={styles.button}
        />
        <View style={styles.footer}>
          <AppText variant="footer" color={colors.ink.mutedOnYellow}>
            Don’t have any account?
          </AppText>
          <Pressable onPress={enterApp} accessibilityRole="button" hitSlop={12}>
            <AppText variant="footerStrong" color={colors.ink.heading}>
              Sign Up
            </AppText>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  illustration: {
    position: 'absolute',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: scale(layout.screenPadding),
  },
  subtitle: {
    width: moderateScale(SUBTITLE_WIDTH),
    alignSelf: 'center',
    marginTop: scale(8),
  },
  dots: {
    marginTop: scale(24),
  },
  button: {
    marginTop: scale(48),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: scale(8),
    marginTop: scale(48),
  },
});
