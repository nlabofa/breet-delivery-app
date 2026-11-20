import { StatusBar, type StatusBarStyle } from 'expo-status-bar';
import { type ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets, type Edge } from 'react-native-safe-area-context';

export type ScreenProps = {
  children: ReactNode;
  background: string;
  edges?: Edge[];
  statusBarStyle?: StatusBarStyle;
  style?: StyleProp<ViewStyle>;
};

export function Screen({
  children,
  background,
  edges = ['top'],
  statusBarStyle = 'dark',
  style,
}: ScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: background,
          paddingTop: edges.includes('top') ? insets.top : 0,
          paddingBottom: edges.includes('bottom') ? insets.bottom : 0,
        },
        style,
      ]}
    >
      <StatusBar style={statusBarStyle} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
