import { Orientation } from '../../types';

export type TitleLineWidthType =
  | 'full'
  | 'half'
  | 'quarter'
  | 'large-half'
  | 'less-half';

export const drawLine = (
  orientation: Orientation,
  width: TitleLineWidthType,
  isColored: boolean,
  color: string,
) => ({
  canvas: [
    {
      type: 'line',
      x1: 0,
      y1: 5,
      x2: lineWidth(width, orientation),
      y2: 5,
      lineWidth: 1.5,
      lineColor: isColored ? color : '#000',
    },
  ],
});

function lineWidth(width: TitleLineWidthType, orientation: Orientation) {
  if (orientation === Orientation.LANDSCAPE) {
    switch (width) {
      case 'full':
        return 620;
      case 'half':
        return 300;
      case 'quarter':
        return 210;
      case 'large-half':
        return 340;
      case 'less-half':
        return 260;
      default:
        return 620;
    }
  } else {
    switch (width) {
      case 'full':
        return 590;
      case 'half':
        return 285;
      case 'quarter':
        return 145;
      case 'large-half':
        return 335;
      case 'less-half':
        return 240;
      default:
        return 590;
    }
  }
}
