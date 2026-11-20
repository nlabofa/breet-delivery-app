import { type ReactNode } from 'react';
import { ScrollView, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { HomeHeader, Screen } from '@/components';
import { products } from '@/data/products';
import { currentUser } from '@/data/user';
import { useDesignInsets } from '@/hooks/useDesignInsets';
import { type HomeStackScreenProps } from '@/navigation/types';
import { colors, layout } from '@/theme';
import { scale } from '@/utils/scale';

import { OrdersBanner } from './components/OrdersBanner';
import { ProductCarousel } from './components/ProductCarousel';
import { SquadInvite } from './components/SquadInvite';

const HEADER_TOP = 40;
const ENTER_DELAY = 120;
const ENTER_STEP = 90;
const ENTER_DURATION = 450;

export function HomeScreen({ navigation }: HomeStackScreenProps<'Home'>) {
  const { fromTop } = useDesignInsets();

  return (
    <Screen background={colors.surface.white} edges={[]}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: fromTop(HEADER_TOP) }}
      >
        <Section order={0} style={styles.header}>
          <HomeHeader avatar={currentUser.avatar} greeting={currentUser.greeting} />
        </Section>
        <Section order={1} style={styles.carousel}>
          <ProductCarousel items={products} />
        </Section>
        <Section order={2} style={styles.banner}>
          <OrdersBanner onOrdersPress={() => navigation.navigate('Track')} />
        </Section>
        <Section order={3}>
          <SquadInvite />
        </Section>
      </ScrollView>
    </Screen>
  );
}

type SectionProps = {
  order: number;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
};

// Layout entering animations follow the system Reduce Motion setting by default.
function Section({ order, style, children }: SectionProps) {
  return (
    <Animated.View
      entering={FadeInUp.delay(ENTER_DELAY + order * ENTER_STEP).duration(ENTER_DURATION)}
      style={style}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: scale(layout.screenPadding),
  },
  carousel: {
    marginTop: scale(40),
  },
  banner: {
    marginTop: scale(25),
  },
});
