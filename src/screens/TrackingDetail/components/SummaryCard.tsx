import { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components';
import { colors, radii } from '@/theme';
import { scale } from '@/utils/scale';

export type SummarySection = {
  id: string;
  title: string;
  subtitle: string;
};

export type SummaryCardProps = {
  sections: SummarySection[];
};

export function SummaryCard({ sections }: SummaryCardProps) {
  return (
    <View style={styles.card}>
      {sections.map((section, index) => (
        <Fragment key={section.id}>
          {index > 0 ? <View style={styles.divider} /> : null}
          <View>
            <AppText variant="cardTitle" color={colors.ink.title}>
              {section.title}
            </AppText>
            <AppText variant="caption" color={colors.ink.mutedOnYellow} style={styles.subtitle}>
              {section.subtitle}
            </AppText>
          </View>
        </Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: scale(238),
    borderRadius: radii.summaryCard,
    backgroundColor: colors.brand.yellow,
    paddingHorizontal: scale(24),
    paddingTop: scale(24),
  },
  subtitle: {
    marginTop: scale(8),
  },
  divider: {
    height: 1,
    backgroundColor: colors.line.dividerOnYellow,
    marginTop: scale(16),
    marginBottom: scale(15),
  },
});
