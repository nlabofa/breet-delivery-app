import { Image, type ImageSource } from 'expo-image';
import { StyleSheet } from 'react-native';

import { colors, sizes } from '@/theme';

export type AvatarProps = {
  source: ImageSource | number;
  size?: number;
  accessibilityLabel?: string;
};

export function Avatar({
  source,
  size = sizes.avatar,
  accessibilityLabel = 'Profile photo',
}: AvatarProps) {
  return (
    <Image
      source={source}
      contentFit="cover"
      accessible
      accessibilityLabel={accessibilityLabel}
      style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: colors.surface.soft,
  },
});
