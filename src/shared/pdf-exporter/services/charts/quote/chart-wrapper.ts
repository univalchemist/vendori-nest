import { SectionHeader } from '../../../constants';
import { ChartSeries, CompanyColorsType } from '../../../types';
import { renderChart } from './default-chart';

export function drawChart(
  wrapperName: string = SectionHeader.ANNUAL_COST_NET_PRICE,
  xAxisLabels: string[],
  series: ChartSeries[],
  chartWidth = 230,
  colors: CompanyColorsType,
  size: 'sm' | 'lg' = 'lg',
) {
  const chartWrapper = getChartWrapper(wrapperName, colors, size);
  const chart = renderChart(xAxisLabels, series);

  chartWrapper.table.body.push([
    {
      margin: size === 'lg' ? [0, 8, 0, 0] : [0, 4, 0, 0],
      width: chartWidth,
      svg: chart,
    } as any,
  ]);

  return chartWrapper;
}

function getChartWrapper(
  wrapperName: string = SectionHeader.ANNUAL_COST_NET_PRICE,
  colors: CompanyColorsType,
  size: 'sm' | 'lg' = 'lg',
) {
  return {
    layout: {
      vLineWidth: () => 0,
      hLineWidth: () => 0,
      paddingTop: () => 0,
      paddingLeft: () => 0,
      paddingRight: () => 0,
      paddingBottom: () => 2,
    },
    table: {
      widths: ['*'],
      body: [
        [
          {
            text: wrapperName,
            bold: true,
            fontSize: size === 'lg' ? 7 : 6,
            color: '#000',
          },
        ],
      ],
    },
  };
}
