import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';

import { AppText, EmojiBadge } from '@/components';
import { colors, radii, sizes } from '@/theme';
import { type TrackingEvent } from '@/types';
import { scale } from '@/utils/scale';

export type HistoryTimelineProps = {
  events: TrackingEvent[];
  sheetIndex: SharedValue<number>;
};

const ROW_GAP = scale(32);

// The sheet index is 0 when collapsed and 1 when expanded. The history plays once the
// sheet settles open, because it sits below the summary card and is off screen for most
// of the drag. It resets once the sheet is low enough that the timeline is hidden again.
const OPEN_AT_INDEX = 0.98;
const RESET_AT_INDEX = 0.25;

const REVEAL_DURATION = 1100;
// Fractions of the reveal over which each part animates.
const CONNECTOR_REVEAL = [0, 0.65];
const ROW_REVEAL_START = 0.05;
const ROW_REVEAL_STEP = 0.2;
const ROW_REVEAL_SPAN = 0.45;
const ROW_SLIDE = scale(16);

const PULSE_DURATION = 1800;
const PULSE_GROWTH = 0.45;

function easeOut(value: number) {
  'worklet';
  return 1 - (1 - value) ** 3;
}

function rowProgress(reveal: number, index: number) {
  'worklet';
  const start = ROW_REVEAL_START + index * ROW_REVEAL_STEP;
  return easeOut(interpolate(reveal, [start, start + ROW_REVEAL_SPAN], [0, 1], 'clamp'));
}

export function HistoryTimeline({ events, sheetIndex }: HistoryTimelineProps) {
  const reduceMotion = useReducedMotion();
  const reveal = useSharedValue(reduceMotion ? 1 : 0);
  const pulse = useSharedValue(0);

  useAnimatedReaction(
    () => sheetIndex.get(),
    (index, previous) => {
      if (reduceMotion) return;
      const isOpen = index >= OPEN_AT_INDEX;
      const wasOpen = previous !== null && previous >= OPEN_AT_INDEX;

      if (isOpen && !wasOpen) {
        const startPulse = () => {
          'worklet';
          pulse.set(
            withRepeat(
              withTiming(1, { duration: PULSE_DURATION, easing: Easing.out(Easing.quad) }),
              -1,
            ),
          );
        };
        if (reveal.get() >= 1) {
          startPulse();
        } else {
          reveal.set(
            withTiming(1, { duration: REVEAL_DURATION }, (finished) => {
              if (finished) startPulse();
            }),
          );
        }
      } else if (!isOpen && wasOpen) {
        cancelAnimation(pulse);
        pulse.set(0);
      }

      if (index <= RESET_AT_INDEX && reveal.get() > 0) {
        cancelAnimation(reveal);
        reveal.set(0);
      }
    },
    [reduceMotion],
  );

  const connectorStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scaleY: easeOut(interpolate(reveal.get(), CONNECTOR_REVEAL, [0, 1], 'clamp')),
      },
    ],
  }));

  return (
    <View>
      <AppText variant="section" color={colors.ink.title} accessibilityRole="header">
        History
      </AppText>
      <View style={styles.list}>
        <Animated.View style={[styles.connector, connectorStyle]} />
        {events.map((event, index) => (
          <TimelineItem
            key={event.id}
            event={event}
            index={index}
            reveal={reveal}
            pulse={event.highlighted && !reduceMotion ? pulse : undefined}
          />
        ))}
      </View>
    </View>
  );
}

type TimelineItemProps = {
  event: TrackingEvent;
  index: number;
  reveal: SharedValue<number>;
  pulse?: SharedValue<number>;
};

const TimelineItem = memo(function TimelineItem({
  event,
  index,
  reveal,
  pulse,
}: TimelineItemProps) {
  const rowStyle = useAnimatedStyle(() => {
    const progress = rowProgress(reveal.get(), index);
    return {
      opacity: progress,
      transform: [{ translateY: (1 - progress) * ROW_SLIDE }],
    };
  });

  const badgeStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(rowProgress(reveal.get(), index), [0, 0.7, 1], [0.6, 1.08, 1]) },
    ],
  }));

  const ringStyle = useAnimatedStyle(() => {
    const value = pulse ? pulse.get() : 0;
    return {
      opacity: interpolate(value, [0, 0.15, 1], [0, 0.5, 0]),
      transform: [{ scale: 1 + PULSE_GROWTH * value }],
    };
  });

  return (
    <Animated.View
      style={[styles.row, rowStyle]}
      accessible
      accessibilityLabel={`${event.title}, ${event.location}, ${event.time}`}
    >
      <Animated.View style={badgeStyle}>
        {pulse ? <Animated.View style={[styles.ring, ringStyle]} /> : null}
        <EmojiBadge source={event.emoji} tone={event.highlighted ? 'yellow' : 'soft'} />
      </Animated.View>
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
    </Animated.View>
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
    transformOrigin: 'top',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ring: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: radii.circle,
    backgroundColor: colors.brand.yellow,
  },
  text: {
    flex: 1,
    marginStart: scale(16),
  },
  location: {
    marginTop: scale(8),
  },
});
