import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';

import { TabBar } from '@/components';

import { HomeStackNavigator } from './HomeStackNavigator';
import { type MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const inertTab = {
  tabPress: (event: { preventDefault: () => void }) => event.preventDefault(),
};

function EmptyTab() {
  return <View />;
}

export function MainTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen name="HomeTab" component={HomeStackNavigator} />
      <Tab.Screen name="SavedTab" component={EmptyTab} listeners={inertTab} />
      <Tab.Screen name="SendTab" component={EmptyTab} listeners={inertTab} />
      <Tab.Screen name="SettingsTab" component={EmptyTab} listeners={inertTab} />
    </Tab.Navigator>
  );
}
