import { z } from 'zod';
import { SchemaGenerator } from '../../helpers/SchemaGenerator';
import {
  FontWeight,
  TextAlign,
  BoxFit,
  MaterialIcon,
  MaterialColor,
  ThemeColor,
  MainAxisAlignment,
  CrossAxisAlignment,
} from '@/domain/enums';

export const fontWeightSchema = SchemaGenerator.fromEnum(FontWeight).describe(
  'Font weight must be one of: w100, w200, w300, w400, w500, w600, w700, w800, w900',
);
export const textAlignSchema = SchemaGenerator.fromEnum(TextAlign).describe(
  'Text alignment must be one of: left, right, center, justify, start, end',
);
export const boxFitSchema = SchemaGenerator.fromEnum(BoxFit).describe(
  'Box fit must be one of: contain, cover, fill, fitWidth, fitHeight, none, scaleDown',
);
export const mainAxisAlignmentSchema = SchemaGenerator.fromEnum(MainAxisAlignment).describe(
  'Main axis alignment must be one of: start, end, center, spaceBetween, spaceAround, spaceEvenly',
);
export const crossAxisAlignmentSchema = SchemaGenerator.fromEnum(CrossAxisAlignment).describe(
  'Cross axis alignment must be one of: start, end, center, stretch, baseline',
);
export const materialIconSchema = SchemaGenerator.fromEnum(MaterialIcon);
export const materialColorSchema = SchemaGenerator.fromEnum(MaterialColor);
export const themeColorSchema = SchemaGenerator.fromEnum(ThemeColor);
export const colorSchema = z
  .union([
    materialColorSchema,
    themeColorSchema,
    z
      .number()
      .int()
      .min(0)
      .max(0xffffffff, 'Color must be a valid 32-bit integer (0xAARRGGBB format)'),
  ])
  .describe(
    'Color must be a Material color name, theme color, or a 32-bit integer in 0xAARRGGBB format',
  );
