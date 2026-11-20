import { StyleSheet, View } from 'react-native';

import { AppText, PillButton, Screen } from '@/components';
import { type HomeStackScreenProps } from '@/navigation/types';
import { colors, layout } from '@/theme';

export function HomeScreen({ navigation }: HomeStackScreenProps<'Home'>) {
  return (
    <Screen background={colors.surface.white}>
      <View style={styles.content}>
        <AppText variant="greeting" color={colors.ink.navy}>
          Hello good Morning!
        </AppText>
        <PillButton
          label="Your Orders"
          labelVariant="button"
          onPress={() => navigation.navigate('Track')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: 24,
    paddingHorizontal: layout.screenPadding,
  },
});
