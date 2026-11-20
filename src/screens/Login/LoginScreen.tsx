import { StyleSheet, View } from 'react-native';

import { AppText, PillButton, Screen } from '@/components';
import { type RootStackScreenProps } from '@/navigation/types';
import { colors, layout } from '@/theme';

export function LoginScreen({ navigation }: RootStackScreenProps<'Login'>) {
  return (
    <Screen background={colors.brand.yellow}>
      <View style={styles.content}>
        <AppText variant="display" color={colors.ink.heading} align="center">
          Welcome to E-Bikes
        </AppText>
        <PillButton
          label="Login with Google"
          onPress={() =>
            navigation.replace('Main', { screen: 'HomeTab', params: { screen: 'Home' } })
          }
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
