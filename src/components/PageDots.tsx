import { StyleSheet, View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  type SharedValue,
} from 'react-native-reanimated';

import { sizes } from '@/theme';
import { scale } from '@/utils/scale';

export type PageDotsProps = {
  count: number;
  progress: SharedValue<number>;
  activeColor: string;
  inactiveColor: string;
  spacing: number;
  stretch?: SharedValue<number>;
};

const STRETCH_WIDTH = scale(10);

export function PageDots({
  count,
  progress,
  activeColor,
  inactiveColor,
  spacing,
  stretch,
}: PageDotsProps) {
  return (
    <View style={[styles.row, { gap: spacing - sizes.dot }]} accessibilityRole="none">
      {Array.from({ length: count }, (_, index) => (
        <Dot
          key={index}
          index={index}
          progress={progress}
          activeColor={activeColor}
          inactiveColor={inactiveColor}
          stretch={stretch}
        />
      ))}
    </View>
  );
}

type DotProps = Pick<PageDotsProps, 'progress' | 'activeColor' | 'inactiveColor' | 'stretch'> & {
  index: number;
};

function Dot({ index, progress, activeColor, inactiveColor, stretch }: DotProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const closeness = 1 - Math.min(Math.abs(progress.get() - index), 1);
    return {
      width: sizes.dot + STRETCH_WIDTH * closeness * (stretch ? stretch.get() : 0),
      backgroundColor: interpolateColor(
        progress.get(),
        [index - 1, index, index + 1],
        [inactiveColor, activeColor, inactiveColor],
      ),
    };
  });

  return <Animated.View testID="page-dot" style={[styles.dot, animatedStyle]} />;
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
