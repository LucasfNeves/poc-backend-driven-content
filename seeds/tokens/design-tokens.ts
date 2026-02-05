export const tokens = {
  colors: {
    white: 0xffffffff,
    darkGray: 0xff323241,
    primary: 0xffc31900,
    secondary: 0xfff3f3f3,
    textPrimary: 0xff3c3c3c,
    textSecondary: 0xff676767,
    secondaryYellow: 0xfffff6db,
  },
  fontSize: {
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24,
  },
  iconSize: {
    small: 24,
    medium: 32,
    large: 48,
  },
  elevation: {
    none: 0,
    low: 2,
    medium: 4,
    high: 8,
  },
  fontWeight: {
    normal: 'w400',
    bold: 'w700',
  },
} as const;
