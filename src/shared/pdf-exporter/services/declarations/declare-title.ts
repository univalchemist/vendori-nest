import { QuoteTemplateEnum } from '../../../../oem/main/oem-companies/oem-company.enums';
import { SectionHeader } from '../../constants';
import svgIcons from '../../icons/svg-icons';
import { Orientation } from '../../types';
import { TitleLineWidthType, drawLine } from '../generics';

interface TitleProps {
  title: string;
  width: TitleLineWidthType;
  color?: string;
  marginBottom?: number;
  marginTop?: number;
  quoteTemplate: QuoteTemplateEnum;
}

export const declareTitle = ({
  title,
  color,
  width = 'full',
  marginBottom = 8,
  marginTop = 8,
  quoteTemplate,
}: TitleProps) => {
  const isColored =
    quoteTemplate === QuoteTemplateEnum.COLORED_LANDSCAPE ||
    quoteTemplate === QuoteTemplateEnum.COLORED_PORTRAIT;

  const orientation: Orientation =
    quoteTemplate === QuoteTemplateEnum.COLORED_LANDSCAPE ||
    quoteTemplate === QuoteTemplateEnum.LANDSCAPE
      ? Orientation.LANDSCAPE
      : Orientation.PORTRAIT;

  const result = {
    stack: [
      {
        columns: [
          {
            svg: iconSvg(title, color, isColored),
            width: 10,
            height: 10,
            margin: [0, marginTop, 0, 0],
          },
          {
            text: title,
            style: 'blackText',
            color: isColored ? color : '#000',
            margin: [5, marginTop, 0, 0],
          },
        ],
        columnGap: 0,
      },
      drawLine(orientation, width, isColored, color),
      { text: '', fontSize: 6, margin: [0, 0, 0, marginBottom] },
    ],
  };

  return result;
};
function iconSvg(name: string, color: string, isColored = false) {
  switch (name) {
    case SectionHeader.OVERVIEW:
      return svgIcons({ color, isColored }).overview;
    case SectionHeader.DETAILS:
      return svgIcons({ color, isColored }).details;
    case SectionHeader.INVOICE_SCHEDULE:
      return svgIcons({ color, isColored }).schedule;
    case SectionHeader.BREAKDOWN:
      return svgIcons({ color, isColored }).breakdown;
    case SectionHeader.COMMENTS:
      return svgIcons({ color, isColored }).comments;
    case SectionHeader.CONTACTS:
      return svgIcons({ color, isColored }).contacts;
    default:
      break;
  }
}
