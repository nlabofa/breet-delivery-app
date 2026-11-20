import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { scale } from '@/utils/scale';

const FRAME_STATUS_BAR = 44;
const FRAME_HOME_INDICATOR = 34;

export function useDesignInsets() {
  const insets = useSafeAreaInsets();

  return {
    insets,
    fromTop: (frameY: number) => insets.top + scale(frameY - FRAME_STATUS_BAR),
    fromBottom: (frameGap: number) =>
      insets.bottom + Math.max(0, scale(frameGap - FRAME_HOME_INDICATOR)),
  };
}
