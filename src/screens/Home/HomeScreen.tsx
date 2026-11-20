import { ScrollView, StyleSheet, View } from 'react-native';

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

export function HomeScreen({ navigation }: HomeStackScreenProps<'Home'>) {
  const { fromTop } = useDesignInsets();

  return (
    <Screen background={colors.surface.white} edges={[]}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: fromTop(HEADER_TOP) }}
      >
        <View style={styles.header}>
          <HomeHeader avatar={currentUser.avatar} greeting={currentUser.greeting} />
        </View>
        <View style={styles.carousel}>
          <ProductCarousel items={products} />
        </View>
        <View style={styles.banner}>
          <OrdersBanner onOrdersPress={() => navigation.navigate('Track')} />
        </View>
        <SquadInvite />
      </ScrollView>
    </Screen>
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
