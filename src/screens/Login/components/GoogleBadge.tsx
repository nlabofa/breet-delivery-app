import { StyleSheet, View } from 'react-native';

import GoogleIcon from '@assets/icons/google.svg';
import { colors, radii } from '@/theme';

const SIZE = 32;
const ICON = 20;

export function GoogleBadge() {
  return (
    <View style={styles.badge}>
      <GoogleIcon width={ICON} height={ICON} />
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    width: SIZE,
    height: SIZE,
    borderRadius: radii.circle,
    backgroundColor: colors.overlay.googleCircle,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
