import { ImageVO } from '@/domain/components/valueObjects/ImageVO';
import { tokens } from '../tokens/design-tokens';
import { IconVO } from '@/domain/components/valueObjects/IconVO';
import { IconButtonVO } from '@/domain/components/valueObjects/IconButtonVO';
import { AppBarVO } from '@/domain/components/valueObjects/AppBarVO';
//import { TextVO } from '@/domain/components/valueObjects/TextVO';

const titleImage = ImageVO.createJSON({
  src: 'assets/logo/LogoMobi.svg',
  height: 24,
  fit: 'contain',
});

// const titleText = TextVO.createJSON({
//   data: 'My Application',
//   style: {
//     color: tokens.colors.darkGray,
//     fontSize: tokens.fontSize.medium,
//     fontWeight: tokens.fontWeight.bold,
//   },
// });

const menuIcon = IconVO.createJSON({
  icon: 'menu',
  color: tokens.colors.darkGray,
  size: tokens.iconSize.small,
});

const leadingButton = IconButtonVO.createJSON({
  icon: menuIcon,
  onPressed: { action: 'openDrawer' },
});

export const customHeader = AppBarVO.createJSON({
  backgroundColor: tokens.colors.secondary,
  foregroundColor: tokens.colors.darkGray,
  centerTitle: true,
  elevation: tokens.elevation.none,
  title: titleImage,
  leading: leadingButton,
});
