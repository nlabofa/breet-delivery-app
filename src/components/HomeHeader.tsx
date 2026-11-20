import { type ImageSource } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import BellIcon from '@assets/icons/bell.svg';
import { colors } from '@/theme';
import { scale } from '@/utils/scale';

import { AppText } from './AppText';
import { Avatar } from './Avatar';
import { IconButton } from './IconButton';

export type HomeHeaderProps = {
  avatar: ImageSource | number;
  greeting: string;
  onBellPress?: () => void;
};

export function HomeHeader({ avatar, greeting, onBellPress = () => {} }: HomeHeaderProps) {
  return (
    <View>
      <View style={styles.row}>
        <Avatar source={avatar} />
        <IconButton
          icon={<BellIcon width={20} height={22} color={colors.ink.title} />}
          onPress={onBellPress}
          accessibilityLabel="Notifications"
        />
      </View>
      <AppText
        variant="greeting"
        color={colors.ink.navy}
        accessibilityRole="header"
        style={styles.greeting}
      >
        {greeting}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    marginTop: scale(24),
  },
});
