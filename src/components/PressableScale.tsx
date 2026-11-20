import * as Haptics from 'expo-haptics';
import {
  Pressable,
  type GestureResponderEvent,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const PRESS_IN = { duration: 90 };
const RELEASE = { damping: 18, stiffness: 320, mass: 0.6 };

export type PressableScaleProps = Omit<PressableProps, 'style'> & {
  style?: StyleProp<ViewStyle>;
  pressedScale?: number;
  haptic?: boolean;
};

export function PressableScale({
  pressedScale = 0.97,
  haptic = true,
  onPressIn,
  onPressOut,
  onPress,
  style,
  ...rest
}: PressableScaleProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.get() }],
  }));

  const handlePressIn = (event: GestureResponderEvent) => {
    scale.set(withTiming(pressedScale, PRESS_IN));
    onPressIn?.(event);
  };

  const handlePressOut = (event: GestureResponderEvent) => {
    scale.set(withSpring(1, RELEASE));
    onPressOut?.(event);
  };

  const handlePress = (event: GestureResponderEvent) => {
    if (haptic) {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress?.(event);
  };

  return (
    <AnimatedPressable
      {...rest}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      style={[style, animatedStyle]}
    />
  );
}
