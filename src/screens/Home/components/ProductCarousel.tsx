import { Image } from 'expo-image';
import { memo, useCallback } from 'react';
import { StyleSheet, View, type ListRenderItem } from 'react-native';
import Animated, {
  cancelAnimation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';

import { PageDots } from '@/components';
import { colors, layout, radii } from '@/theme';
import { type Product } from '@/types';
import { scale } from '@/utils/scale';

const CARD_WIDTH = scale(255);
const CARD_HEIGHT = scale(265);
const CARD_GAP = scale(10);
const SNAP_INTERVAL = CARD_WIDTH + CARD_GAP;
const IMAGE = { width: scale(199), height: scale(229), left: scale(28), top: scale(18) };

// Depth only shows while a swipe is in progress, so the carousel settles back on the Figma frame.
const NEIGHBOUR_SCALE = 0.94;
const PARALLAX_SHIFT = scale(24);
const SWIPE_IN = { duration: 160 };
const SWIPE_OUT = { duration: 260 };
const RELEASE_GRACE = 350;

export type ProductCarouselProps = {
  items: Product[];
};

export function ProductCarousel({ items }: ProductCarouselProps) {
  const reduceMotion = useReducedMotion();
  const progress = useSharedValue(0);
  const swiping = useSharedValue(0);
  const swipeStartPage = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      progress.set(event.contentOffset.x / SNAP_INTERVAL);
    },
    onBeginDrag: () => {
      if (reduceMotion) return;
      swipeStartPage.set(Math.round(progress.get()));
      cancelAnimation(swiping);
      swiping.set(withTiming(1, SWIPE_IN));
    },
    onEndDrag: () => {
      if (reduceMotion) return;
      // Covers a release that snaps without a momentum phase.
      swiping.set(withDelay(RELEASE_GRACE, withTiming(0, SWIPE_OUT)));
    },
    onMomentumBegin: () => {
      if (reduceMotion) return;
      cancelAnimation(swiping);
      swiping.set(withTiming(1, SWIPE_IN));
    },
    onMomentumEnd: () => {
      if (reduceMotion) return;
      swiping.set(withTiming(0, SWIPE_OUT));
    },
  });

  const renderItem: ListRenderItem<Product> = useCallback(
    ({ item, index }) => (
      <ProductCard
        product={item}
        index={index}
        progress={progress}
        swiping={swiping}
        swipeStartPage={swipeStartPage}
      />
    ),
    [progress, swiping, swipeStartPage],
  );

  return (
    <View>
      <Animated.FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={SNAP_INTERVAL}
        decelerationRate="fast"
        disableIntervalMomentum
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.content}
        ItemSeparatorComponent={Separator}
        getItemLayout={(_, index) => ({
          length: SNAP_INTERVAL,
          offset: scale(layout.screenPadding) + SNAP_INTERVAL * index,
          index,
        })}
        accessibilityRole="adjustable"
        accessibilityLabel="E-bike carousel"
      />
      <View style={styles.dots}>
        <PageDots
          count={items.length}
          progress={progress}
          activeColor={colors.dot.active}
          inactiveColor={colors.dot.inactive}
          spacing={13}
          stretch={swiping}
        />
      </View>
    </View>
  );
}

function Separator() {
  return <View style={styles.separator} />;
}

type ProductCardProps = {
  product: Product;
  index: number;
  progress: SharedValue<number>;
  swiping: SharedValue<number>;
  swipeStartPage: SharedValue<number>;
};

const ProductCard = memo(function ProductCard({
  product,
  index,
  progress,
  swiping,
  swipeStartPage,
}: ProductCardProps) {
  const cardStyle = useAnimatedStyle(() => {
    const distance = Math.min(Math.abs(progress.get() - index), 1);
    return {
      transform: [{ scale: 1 - (1 - NEIGHBOUR_SCALE) * distance * swiping.get() }],
    };
  });

  // Only the card under the finger gets parallax: its bike lags behind the swipe.
  const imageStyle = useAnimatedStyle(() => {
    if (swipeStartPage.get() !== index) return { transform: [{ translateX: 0 }] };
    const offset = Math.max(-1, Math.min(progress.get() - index, 1));
    return {
      transform: [{ translateX: offset * PARALLAX_SHIFT * swiping.get() }],
    };
  });

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.get(), [index - 1, index, index + 1], [1, 0, 1], 'clamp'),
  }));

  return (
    <Animated.View style={[styles.card, cardStyle]}>
      <Animated.View style={[styles.image, imageStyle]}>
        <Image source={product.image} contentFit="contain" style={styles.fill} />
      </Animated.View>
      <Animated.View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, styles.fade, fadeStyle]}
      />
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: scale(layout.screenPadding),
  },
  dots: {
    marginTop: scale(30),
  },
  separator: {
    width: CARD_GAP,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: radii.card,
    backgroundColor: colors.surface.soft,
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    width: IMAGE.width,
    height: IMAGE.height,
    left: IMAGE.left,
    top: IMAGE.top,
  },
  fill: {
    width: '100%',
    height: '100%',
  },
  fade: {
    backgroundColor: colors.surface.softFaded,
  },
});
