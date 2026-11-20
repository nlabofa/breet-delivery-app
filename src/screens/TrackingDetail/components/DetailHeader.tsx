import { StyleSheet, View } from 'react-native';

import ChevronLeft from '@assets/icons/chevron-left.svg';
import { AppText, IconButton } from '@/components';
import { colors, sizes } from '@/theme';

export type DetailHeaderProps = {
  title: string;
  onBackPress: () => void;
};

export function DetailHeader({ title, onBackPress }: DetailHeaderProps) {
  return (
    <View style={styles.row}>
      <IconButton
        variant="ghost"
        icon={<ChevronLeft {...sizes.chevron} color={colors.ink.backChevron} />}
        onPress={onBackPress}
        accessibilityLabel="Go back"
      />
      <View pointerEvents="none" style={styles.titleWrap}>
        <AppText variant="headerTitle" color={colors.ink.navy} accessibilityRole="header">
          {title}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    height: sizes.iconButton,
    justifyContent: 'center',
  },
  titleWrap: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
