import { type BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as Haptics from 'expo-haptics';
import { type FC } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
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
const PRESS_DIP = { scale: 0.82, duration: 90 };
const BOUNCE = { damping: 9, stiffness: 320, mass: 0.6 };

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
          void Haptics.selectionAsync();
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
          <TabButton
            key={route.key}
            Icon={Icon}
            label={tab.label}
            focused={focused}
            onPress={onPress}
          />
        );
      })}
    </View>
  );
}

type TabButtonProps = {
  Icon: FC<SvgProps>;
  label: string;
  focused: boolean;
  onPress: () => void;
};

function TabButton({ Icon, label, focused, onPress }: TabButtonProps) {
  const reduceMotion = useReducedMotion();
  const iconScale = useSharedValue(1);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.get() }],
  }));

  const handlePress = () => {
    if (!reduceMotion) {
      iconScale.set(
        withSequence(
          withTiming(PRESS_DIP.scale, { duration: PRESS_DIP.duration }),
          withSpring(1, BOUNCE),
        ),
      );
    }
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="tab"
      accessibilityLabel={label}
      accessibilityState={{ selected: focused }}
      hitSlop={12}
    >
      <Animated.View style={iconStyle}>
        <Icon
          width={sizes.tabIcon}
          height={sizes.tabIcon}
          color={focused ? colors.icon.tabActive : colors.icon.tabInactive}
        />
      </Animated.View>
    </Pressable>
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
