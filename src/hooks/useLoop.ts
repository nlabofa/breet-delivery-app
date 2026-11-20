import { useEffect } from 'react';
import {
  cancelAnimation,
  Easing,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

// Eases 0 → 1 → 0 forever. Starting and returning at 0 keeps the rest pose on the design.
export function useLoop(duration: number) {
  const reduceMotion = useReducedMotion();
  const value = useSharedValue(0);

  useEffect(() => {
    if (reduceMotion) return;
    value.set(withRepeat(withTiming(1, { duration, easing: Easing.inOut(Easing.sin) }), -1, true));
    return () => cancelAnimation(value);
  }, [duration, reduceMotion, value]);

  return value;
}
