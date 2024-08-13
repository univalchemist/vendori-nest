import { CompanyColorsType } from '../../types';

type PageSize = {
  height: number;
  width: number;
};

export function declareBackgroundImage(
  pageSize: PageSize,
  isEvenPage: boolean,
  colors: CompanyColorsType,
) {
  const background = {
    canvas: [
      {
        type: 'rect',
        x: 0,
        y: 0,
        w: pageSize.width,
        h: pageSize.height,
      },
    ],
  };

  return background;
}
