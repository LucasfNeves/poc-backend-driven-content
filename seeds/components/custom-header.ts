import { TextVO } from '@/domain/components/valueObjects/TextVO';
import { tokens } from '../tokens/design-tokens';
import { IconVO } from '@/domain/components/valueObjects/IconVO';
import { IconButtonVO } from '@/domain/components/valueObjects/IconButtonVO';
import { AppBarVO } from '@/domain/components/valueObjects/AppBarVO';

const titleText = TextVO.createJSON({
  data: 'MOBi',
  style: {
    fontSize: tokens.fontSize.xlarge,
    fontWeight: tokens.fontWeight.bold,
    color: tokens.colors.darkGray,
  },
});

const menuIcon = IconVO.createJSON({
  icon: 'menu',
  color: tokens.colors.darkGray,
  size: tokens.iconSize.large,
});

const leadingButton = IconButtonVO.createJSON({
  icon: menuIcon,
  onPressed: { action: 'openDrawer' },
});

export const customHeader = AppBarVO.createJSON({
  backgroundColor: tokens.colors.white,
  foregroundColor: tokens.colors.darkGray,
  centerTitle: true,
  elevation: tokens.elevation.none,
  title: titleText,
  leading: leadingButton,
});
