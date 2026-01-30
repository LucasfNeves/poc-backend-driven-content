import { CustomHeaderBuilder } from '@/domain/components/builders/CustomHeaderBuilder';
import { defaultBuilderFactory } from '@/domain/components/builders/BuilderFactory';
import { DesignTokens } from '@/domain/components/constants/DesignTokens';

export const customHeader = new CustomHeaderBuilder(defaultBuilderFactory)
  .backgroundColor(DesignTokens.colors.background)
  .foregroundColor(DesignTokens.colors.text)
  .title('MOBi', DesignTokens.fontSize.xlarge)
  .leadingIcon('menu')
  .build();
