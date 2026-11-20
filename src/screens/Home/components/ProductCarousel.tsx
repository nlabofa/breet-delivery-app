import { Image } from 'expo-image';
import { memo, useCallback } from 'react';
import { StyleSheet, View, type ListRenderItem } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
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

export type ProductCarouselProps = {
  items: Product[];
};

export function ProductCarousel({ items }: ProductCarouselProps) {
  const progress = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((event) => {
    progress.value = event.contentOffset.x / SNAP_INTERVAL;
  });

  const renderItem: ListRenderItem<Product> = useCallback(
    ({ item, index }) => <ProductCard product={item} index={index} progress={progress} />,
    [progress],
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
};

const ProductCard = memo(function ProductCard({ product, index, progress }: ProductCardProps) {
  const fadeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [index - 1, index, index + 1], [1, 0, 1], 'clamp'),
  }));

  return (
    <View style={styles.card}>
      <Image source={product.image} contentFit="contain" style={styles.image} />
      <Animated.View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, styles.fade, fadeStyle]}
      />
    </View>
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
  fade: {
    backgroundColor: colors.surface.softFaded,
  },
});
