import { type BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { type CompositeScreenProps, type NavigatorScreenParams } from '@react-navigation/native';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';

export type HomeStackParamList = {
  Home: undefined;
  Track: undefined;
};

export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  SavedTab: undefined;
  SendTab: undefined;
  SettingsTab: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Main: NavigatorScreenParams<MainTabParamList>;
  TrackingDetail: { receipt: string };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export type HomeStackScreenProps<T extends keyof HomeStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, T>,
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList>,
    NativeStackScreenProps<RootStackParamList>
  >
>;

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootStackParamList {}
  }
}
