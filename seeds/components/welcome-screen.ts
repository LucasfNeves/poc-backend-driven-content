import { TextVO } from '@/domain/components/valueObjects/TextVO';
import { ImageVO } from '@/domain/components/valueObjects/ImageVO';
import { SizedBoxVO } from '@/domain/components/valueObjects/SizedBoxVO';
import { SpacerVO } from '@/domain/components/valueObjects/SpacerVO';
import { AppBarVO } from '@/domain/components/valueObjects/AppBarVO';
import { IconVO } from '@/domain/components/valueObjects/IconVO';
import { IconButtonVO } from '@/domain/components/valueObjects/IconButtonVO';
import { ScaffoldVO } from '@/domain/components/valueObjects/ScaffoldVO';
import { PaddingVO } from '@/domain/components/valueObjects/PaddingVO';
import { ColumnVO } from '@/domain/components/valueObjects/ColumnVO';
import { RowVO } from '@/domain/components/valueObjects/RowVO';
import { ContainerVO } from '@/domain/components/valueObjects/ContainerVO';
import { tokens } from '../tokens/design-tokens';

const welcomeImage = ImageVO.createJSON({
  src: 'https://raw.githubusercontent.com/StacDev/stac/refs/heads/dev/assets/Welcome%20to.png',
});

const title = TextVO.createJSON({
  data: 'Stac Playground',
  style: {
    fontSize: 36,
    fontWeight: 'w600',
  },
});

const description = TextVO.createJSON({
  data: 'Ronadlo, Messi, Neymar... Who is the GOAT? Discover the ultimate football showdown in our Stac Playground! Dive into stats, highlights, and fan debates to crown the true legend of the game. Join us now and let the GOAT debate begin!',
  style: {
    fontSize: 18,
    fontWeight: 'w400',
  },
});

const followText = TextVO.createJSON({
  data: 'Follow us for more updates:',
  style: {
    fontSize: 18,
    fontWeight: 'w400',
    color: 0x80010810,
  },
});

const createSocialRow = (iconUrl: string, text: string) =>
  RowVO.createJSON({
    spacing: 20,
    children: [
      ContainerVO.createJSON({
        width: 44,
        height: 44,
        decoration: { borderRadius: 12 },
        clipBehavior: 'hardEdge',
        child: ImageVO.createJSON({ src: iconUrl }),
      }),
      TextVO.createJSON({
        data: text,
        style: {
          fontSize: 18,
          fontWeight: 'w500',
        },
      }),
    ],
  });

export const welcomeScreen = ScaffoldVO.createJSON({
  appBar: AppBarVO.createJSON({
    backgroundColor: tokens.colors.secondary,
    foregroundColor: tokens.colors.darkGray,
    centerTitle: true,
    elevation: tokens.elevation.none,
    title: ImageVO.createJSON({
      src: 'assets/logo/LogoMobi.svg',
      height: 24,
      fit: 'contain',
    }),
    leading: IconButtonVO.createJSON({
      icon: IconVO.createJSON({
        icon: 'menu',
        color: tokens.colors.darkGray,
        size: tokens.iconSize.small,
      }),
      onPressed: { action: 'openDrawer' },
    }),
  }),
  body: PaddingVO.createJSON({
    padding: {
      top: 80,
      left: 24,
      right: 24,
      bottom: 24,
    },
    child: ColumnVO.createJSON({
      crossAxisAlignment: 'start',
      children: [
        SizedBoxVO.createJSON({ height: 40 }),
        welcomeImage,
        title,
        SizedBoxVO.createJSON({ height: 32 }),
        description,
        SpacerVO.createJSON(),
        ContainerVO.createJSON({
          height: 1,
          width: 1000,
          color: 0x20010810,
        }),
        SizedBoxVO.createJSON({ height: 24 }),
        followText,
        SizedBoxVO.createJSON({ height: 20 }),
        ColumnVO.createJSON({
          spacing: 20,
          children: [
            createSocialRow(
              'https://raw.githubusercontent.com/StacDev/stac/refs/heads/dev/assets/github.png',
              'github.com/LucasfNeves',
            ),
            createSocialRow(
              'https://raw.githubusercontent.com/StacDev/stac/refs/heads/dev/assets/x.png',
              'x.com/LucasfNeves',
            ),
            createSocialRow(
              'https://raw.githubusercontent.com/StacDev/stac/refs/heads/dev/assets/linkedin.png',
              '/company/LucasfNeves',
            ),
          ],
        }),
      ],
    }),
  }),
});
