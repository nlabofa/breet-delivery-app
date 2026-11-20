import { type TextStyle } from 'react-native';

import { moderateScale } from '@/utils/scale';

export const fontFamily = {
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  semiBold: 'Inter-SemiBold',
  bold: 'Inter-Bold',
  button: 'Lato-SemiBold',
} as const;

type Spec = {
  family: string;
  size: number;
  lineHeight?: number;
  letterSpacingEm?: number;
};

const make = ({ family, size, lineHeight, letterSpacingEm = 0 }: Spec): TextStyle => ({
  fontFamily: family,
  fontSize: moderateScale(size),
  lineHeight: lineHeight === undefined ? undefined : moderateScale(lineHeight),
  letterSpacing: moderateScale(size * letterSpacingEm),
});

export const typography = {
  display: make({ family: fontFamily.semiBold, size: 24, lineHeight: 32, letterSpacingEm: 0.02 }),
  eta: make({ family: fontFamily.semiBold, size: 24, lineHeight: 24, letterSpacingEm: 0.0208 }),
  greeting: make({ family: fontFamily.bold, size: 18, lineHeight: 22 }),
  title: make({ family: fontFamily.semiBold, size: 18, lineHeight: 24, letterSpacingEm: 0.0278 }),
  headerTitle: make({
    family: fontFamily.semiBold,
    size: 18,
    lineHeight: 22,
    letterSpacingEm: 0.02,
  }),
  section: make({ family: fontFamily.semiBold, size: 16, lineHeight: 24, letterSpacingEm: 0.0313 }),
  cardTitle: make({
    family: fontFamily.semiBold,
    size: 16,
    lineHeight: 19,
    letterSpacingEm: 0.0313,
  }),
  rowTitle: make({ family: fontFamily.medium, size: 14, lineHeight: 17, letterSpacingEm: 0.02 }),
  timelineTitle: make({
    family: fontFamily.semiBold,
    size: 14,
    lineHeight: 17,
    letterSpacingEm: 0.02,
  }),
  label: make({ family: fontFamily.medium, size: 14, lineHeight: 24, letterSpacingEm: 0.0357 }),
  footer: make({ family: fontFamily.medium, size: 14, lineHeight: 25, letterSpacingEm: 0.0357 }),
  footerStrong: make({
    family: fontFamily.semiBold,
    size: 14,
    lineHeight: 25,
    letterSpacingEm: 0.0357,
  }),
  button: make({ family: fontFamily.button, size: 14, lineHeight: 24, letterSpacingEm: 0.0357 }),
  body: make({ family: fontFamily.regular, size: 14, lineHeight: 24, letterSpacingEm: 0.0357 }),
  bodyCompact: make({
    family: fontFamily.regular,
    size: 14,
    lineHeight: 20,
    letterSpacingEm: 0.0357,
  }),
  bodyTight: make({
    family: fontFamily.regular,
    size: 14,
    lineHeight: 18,
    letterSpacingEm: 0.0357,
  }),
  caption: make({ family: fontFamily.regular, size: 12, lineHeight: 15, letterSpacingEm: 0.0417 }),
  time: make({ family: fontFamily.regular, size: 12, lineHeight: 24, letterSpacingEm: 0.0417 }),
} as const;

export type TypographyVariant = keyof typeof typography;
