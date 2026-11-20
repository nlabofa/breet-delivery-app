import { StyleSheet, View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  type SharedValue,
} from 'react-native-reanimated';

import { sizes } from '@/theme';

export type PageDotsProps = {
  count: number;
  progress: SharedValue<number>;
  activeColor: string;
  inactiveColor: string;
  spacing: number;
};

export function PageDots({ count, progress, activeColor, inactiveColor, spacing }: PageDotsProps) {
  return (
    <View style={[styles.row, { gap: spacing - sizes.dot }]} accessibilityRole="none">
      {Array.from({ length: count }, (_, index) => (
        <Dot
          key={index}
          index={index}
          progress={progress}
          activeColor={activeColor}
          inactiveColor={inactiveColor}
        />
      ))}
    </View>
  );
}

type DotProps = Pick<PageDotsProps, 'progress' | 'activeColor' | 'inactiveColor'> & {
  index: number;
};

function Dot({ index, progress, activeColor, inactiveColor }: DotProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [index - 1, index, index + 1],
      [inactiveColor, activeColor, inactiveColor],
    ),
  }));

  return <Animated.View style={[styles.dot, animatedStyle]} />;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: sizes.dot,
    height: sizes.dot,
    borderRadius: sizes.dot / 2,
  },
});
