import { Dimensions, PixelRatio } from 'react-native';

const DESIGN_WIDTH = 375;
const DESIGN_HEIGHT = 812;

const { width, height } = Dimensions.get('window');
const widthRatio = width / DESIGN_WIDTH;

export const scale = (size: number) => PixelRatio.roundToNearestPixel(size * widthRatio);

export const moderateScale = (size: number, factor = 0.5) =>
  PixelRatio.roundToNearestPixel(size + (scale(size) - size) * factor);

export const verticalScale = (size: number) =>
  PixelRatio.roundToNearestPixel(size * (height / DESIGN_HEIGHT));

export const designFrame = { width: DESIGN_WIDTH, height: DESIGN_HEIGHT } as const;
