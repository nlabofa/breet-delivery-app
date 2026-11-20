import { StyleSheet, View } from 'react-native';

import GoogleIcon from '@assets/icons/google.svg';
import { colors, radii, sizes } from '@/theme';

export function GoogleBadge() {
  return (
    <View style={styles.badge}>
      <GoogleIcon width={sizes.googleIcon} height={sizes.googleIcon} />
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    width: sizes.googleBadge,
    height: sizes.googleBadge,
    borderRadius: radii.circle,
    backgroundColor: colors.overlay.googleCircle,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
