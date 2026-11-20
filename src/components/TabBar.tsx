import { type BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { type FC } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { type SvgProps } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BookmarkIcon from '@assets/icons/tab-bookmark.svg';
import HomeIcon from '@assets/icons/tab-home.svg';
import SendIcon from '@assets/icons/tab-send.svg';
import SettingsIcon from '@assets/icons/tab-settings.svg';
import { colors, sizes } from '@/theme';
import { scale } from '@/utils/scale';

const ICON_TOP = scale(24);
const MIN_BOTTOM = 32;

const tabs: Record<string, { Icon: FC<SvgProps>; label: string }> = {
  HomeTab: { Icon: HomeIcon, label: 'Home' },
  SavedTab: { Icon: BookmarkIcon, label: 'Saved' },
  SendTab: { Icon: SendIcon, label: 'Send' },
  SettingsTab: { Icon: SettingsIcon, label: 'Settings' },
};

export function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, MIN_BOTTOM) }]}>
      {state.routes.map((route, index) => {
        const tab = tabs[route.name];
        if (!tab) return null;

        const focused = state.index === index;
        const { Icon } = tab;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            accessibilityRole="tab"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: focused }}
            hitSlop={12}
          >
            <Icon
              width={sizes.tabIcon}
              height={sizes.tabIcon}
              color={focused ? colors.icon.tabActive : colors.icon.tabInactive}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: ICON_TOP,
    paddingHorizontal: scale(40),
    backgroundColor: colors.surface.soft,
  },
});
