import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { DesignOverlay } from '@/dev/DesignOverlay';
import { RootNavigator } from '@/navigation/RootNavigator';

export function App() {
  const navigationRef = useNavigationContainerRef();
  const [routeName, setRouteName] = useState<string>();

  const syncRouteName = () => setRouteName(navigationRef.getCurrentRoute()?.name);

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <NavigationContainer
            ref={navigationRef}
            onReady={syncRouteName}
            onStateChange={syncRouteName}
          >
            <RootNavigator />
          </NavigationContainer>
          {__DEV__ ? <DesignOverlay routeName={routeName} /> : null}
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
