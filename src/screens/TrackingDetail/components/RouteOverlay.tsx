import { useEffect } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedProps,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Path } from 'react-native-svg';

import { colors } from '@/theme';
import { scale } from '@/utils/scale';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ROUTE_PATH =
  'M8 146.5L37.255 163.365C43.9964 167.251 52.5969 163.792 54.7705 156.32L57.4815 147.001C58.1455 144.719 59.4725 142.685 61.2942 141.157L99.5433 109.09C104.324 105.082 105.236 98.0793 101.642 92.9803L93.3049 81.1535C89.5293 75.7974 90.7487 68.4028 96.0441 64.5426L132.733 37.7975C137.04 34.6578 142.902 34.7353 147.124 37.9878L174.75 59.2673C176.23 60.4067 177.954 61.1852 179.787 61.5409L201.933 65.8377C207.04 66.8287 212.205 64.4154 214.721 59.8616L217.904 54.1017C219.839 50.6007 223.391 48.2939 227.377 47.9503L245.56 46.3828C248.424 46.1358 251.105 44.8687 253.114 42.812L271 24.5';
const ROUTE_LENGTH = 383;

const ARTBOARD = { width: 295, height: 168 };
// Extra room around the Figma artboard so the pulse ring isn't clipped.
export const ROUTE_BLEED = 12;

const START = { x: 8, y: 147 };
const END = { x: 271, y: 24 };
const HALO_RADIUS = 24;
const PULSE_GROWTH = 10;

const COMET_GLOW = 56;
const COMET_CORE = 18;

const DRAW_DELAY = 200;
const DRAW_DURATION = 1200;
const PULSE_DURATION = 1800;

const cometDash = (length: number) => [length, ROUTE_LENGTH + length];

export type RouteOverlayProps = {
  style?: StyleProp<ViewStyle>;
};

export function RouteOverlay({ style }: RouteOverlayProps) {
  const reduceMotion = useReducedMotion();
  const progress = useSharedValue(reduceMotion ? 1 : 0);
  const pulse = useSharedValue(0);

  useEffect(() => {
    if (reduceMotion) return;
    progress.set(
      withDelay(
        DRAW_DELAY,
        withTiming(
          1,
          { duration: DRAW_DURATION, easing: Easing.inOut(Easing.cubic) },
          (finished) => {
            if (finished) {
              pulse.set(
                withRepeat(
                  withTiming(1, { duration: PULSE_DURATION, easing: Easing.out(Easing.quad) }),
                  -1,
                ),
              );
            }
          },
        ),
      ),
    );
  }, [reduceMotion, progress, pulse]);

  const routeProps = useAnimatedProps(() => ({
    strokeDashoffset: ROUTE_LENGTH * (1 - progress.get()),
  }));

  const cometGlowProps = useAnimatedProps(() => ({
    strokeDashoffset: COMET_GLOW - progress.get() * ROUTE_LENGTH,
    strokeOpacity: interpolate(progress.get(), [0, 0.05, 0.85, 1], [0, 0.45, 0.45, 0]),
  }));

  const cometCoreProps = useAnimatedProps(() => ({
    strokeDashoffset: COMET_CORE - progress.get() * ROUTE_LENGTH,
    strokeOpacity: interpolate(progress.get(), [0, 0.05, 0.85, 1], [0, 1, 1, 0]),
  }));

  const pulseProps = useAnimatedProps(() => ({
    r: HALO_RADIUS + PULSE_GROWTH * pulse.get(),
    opacity: progress.get() < 1 ? 0 : interpolate(pulse.get(), [0, 0.15, 1], [0, 0.2, 0]),
  }));

  const width = ARTBOARD.width + ROUTE_BLEED * 2;
  const height = ARTBOARD.height + ROUTE_BLEED * 2;

  return (
    <Svg
      width={scale(width)}
      height={scale(height)}
      viewBox={`${-ROUTE_BLEED} ${-ROUTE_BLEED} ${width} ${height}`}
      style={style}
    >
      <AnimatedPath
        d={ROUTE_PATH}
        fill="none"
        stroke={colors.route.line}
        strokeWidth={5}
        strokeLinecap="round"
        strokeDasharray={[ROUTE_LENGTH, ROUTE_LENGTH]}
        animatedProps={routeProps}
      />
      {reduceMotion ? null : (
        <>
          <AnimatedPath
            d={ROUTE_PATH}
            fill="none"
            stroke={colors.route.comet}
            strokeWidth={9}
            strokeLinecap="round"
            strokeDasharray={cometDash(COMET_GLOW)}
            animatedProps={cometGlowProps}
          />
          <AnimatedPath
            d={ROUTE_PATH}
            fill="none"
            stroke={colors.route.comet}
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray={cometDash(COMET_CORE)}
            animatedProps={cometCoreProps}
          />
        </>
      )}
      <Circle cx={START.x} cy={START.y} r={8} fill={colors.route.line} />
      <Circle cx={START.x} cy={START.y} r={4} fill={colors.surface.white} />
      <Circle cx={END.x} cy={END.y} r={HALO_RADIUS} fill={colors.route.marker} opacity={0.15} />
      {reduceMotion ? null : (
        <AnimatedCircle
          cx={END.x}
          cy={END.y}
          fill={colors.route.marker}
          animatedProps={pulseProps}
        />
      )}
      <Circle cx={END.x} cy={END.y} r={8} fill={colors.route.marker} />
      <Circle cx={END.x} cy={END.y} r={4} fill={colors.surface.white} />
    </Svg>
  );
}
