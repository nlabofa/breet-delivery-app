import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { useCallback, useMemo, type ReactNode } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, type SharedValue } from 'react-native-reanimated';

import { useDesignInsets } from '@/hooks/useDesignInsets';
import { colors, layout, radii } from '@/theme';
import { scale } from '@/utils/scale';

const FRAME_COLLAPSED_HEIGHT = 120;
const FRAME_EXPANDED_TOP = 104;
const BACKDROP_OPACITY = 0.5;
const BODY_FADE_END = 0.25;

export type TrackingSheetProps = {
  animatedIndex: SharedValue<number>;
  header: ReactNode;
  children?: ReactNode;
};

export function TrackingSheet({ animatedIndex, header, children }: TrackingSheetProps) {
  const { height } = useWindowDimensions();
  const { fromTop, insets } = useDesignInsets();

  const snapPoints = useMemo(
    () => [scale(FRAME_COLLAPSED_HEIGHT) + insets.bottom, height - fromTop(FRAME_EXPANDED_TOP)],
    [fromTop, height, insets.bottom],
  );

  const bodyStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animatedIndex.value, [0, BODY_FADE_END], [0, 1], 'clamp'),
  }));

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={1}
        disappearsOnIndex={0}
        opacity={BACKDROP_OPACITY}
        pressBehavior="collapse"
      />
    ),
    [],
  );

  return (
    <BottomSheet
      index={0}
      snapPoints={snapPoints}
      animatedIndex={animatedIndex}
      enableDynamicSizing={false}
      enablePanDownToClose={false}
      handleComponent={SheetHandle}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.background}
    >
      <View style={styles.header}>{header}</View>
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Animated.View style={[styles.body, bodyStyle]}>{children}</Animated.View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
}

function SheetHandle() {
  return (
    <View
      style={styles.handleArea}
      accessibilityRole="adjustable"
      accessibilityLabel="Tracking details sheet"
    >
      <View style={styles.grabber} />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.surface.white,
    borderTopLeftRadius: radii.sheet,
    borderTopRightRadius: radii.sheet,
  },
  handleArea: {
    alignItems: 'center',
    paddingTop: scale(16),
    paddingBottom: scale(24),
  },
  grabber: {
    width: scale(48),
    height: scale(5),
    borderRadius: radii.handle,
    backgroundColor: colors.line.handle,
  },
  header: {
    paddingHorizontal: scale(layout.screenPadding),
  },
  content: {
    paddingHorizontal: scale(layout.screenPadding),
    paddingTop: scale(30),
    paddingBottom: scale(layout.screenPadding),
  },
  body: {
    gap: scale(24),
  },
});
