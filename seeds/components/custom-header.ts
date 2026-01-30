import { AppBarBuilder } from '@/domain/components/builders/AppBarBuilder';
import { ImageBuilder } from '@/domain/components/builders/ImageBuilder';
import { IconBuilder } from '@/domain/components/builders/IconBuilder';
import { IconButtonBuilder } from '@/domain/components/builders/IconButtonBuilder';
import { DesignTokens } from '@/domain/components/constants/DesignTokens';

export const customHeader = AppBarBuilder.create({
  backgroundColor: DesignTokens.colors.black,
  foregroundColor: DesignTokens.colors.black,
  centerTitle: true,
  elevation: DesignTokens.elevation.none,
  title: ImageBuilder.create('assets/logo.svg', {
    height: 40,
    fit: 'contain',
  }),
  leading: IconButtonBuilder.create(
    IconBuilder.create('menu', {
      color: DesignTokens.colors.black,
      size: DesignTokens.iconSize.medium,
    }),
  ),
  actions: [
    IconButtonBuilder.create(
      IconBuilder.create('search', {
        color: DesignTokens.colors.black,
        size: DesignTokens.iconSize.medium,
      }),
    ),
  ],
});
