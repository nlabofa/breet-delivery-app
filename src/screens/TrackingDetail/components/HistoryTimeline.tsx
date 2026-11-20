import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText, EmojiBadge } from '@/components';
import { colors, sizes } from '@/theme';
import { type TrackingEvent } from '@/types';
import { scale } from '@/utils/scale';

export type HistoryTimelineProps = {
  events: TrackingEvent[];
};

const ROW_GAP = scale(32);

export function HistoryTimeline({ events }: HistoryTimelineProps) {
  return (
    <View>
      <AppText variant="section" color={colors.ink.title} accessibilityRole="header">
        History
      </AppText>
      <View style={styles.list}>
        <View style={styles.connector} />
        {events.map((event) => (
          <TimelineItem key={event.id} event={event} />
        ))}
      </View>
    </View>
  );
}

type TimelineItemProps = {
  event: TrackingEvent;
};

const TimelineItem = memo(function TimelineItem({ event }: TimelineItemProps) {
  return (
    <View
      style={styles.row}
      accessible
      accessibilityLabel={`${event.title}, ${event.location}, ${event.time}`}
    >
      <EmojiBadge source={event.emoji} tone={event.highlighted ? 'yellow' : 'soft'} />
      <View style={styles.text}>
        <AppText variant="timelineTitle" color={colors.ink.body}>
          {event.title}
        </AppText>
        <AppText variant="body" color={colors.ink.muted} style={styles.location}>
          {event.location}
        </AppText>
      </View>
      <AppText variant="time" color={colors.ink.muted}>
        {event.time}
      </AppText>
    </View>
  );
});

const styles = StyleSheet.create({
  list: {
    marginTop: scale(24),
    gap: ROW_GAP,
  },
  connector: {
    position: 'absolute',
    left: sizes.badge / 2,
    top: scale(28),
    height: scale(177),
    width: 1.5,
    backgroundColor: colors.line.timeline,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    marginStart: scale(16),
  },
  location: {
    marginTop: scale(8),
  },
});
