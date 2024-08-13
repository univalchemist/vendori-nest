import { ChartSeries } from '../../../types';

import * as echarts from 'echarts';

export function renderChart(xAxisLabels: string[], series: ChartSeries[]) {
  const chart = echarts.init(null, null, {
    renderer: 'svg',
    ssr: true,
    width: 400,
    height: 300,
  });

  chart.setOption({
    grid: {
      left: '15%',
      top: '10%',
      right: '5%',
      bottom: '10%',
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore:next-line
    silent: true,
    animation: false,
    backgroundColor: '#FFF',
    xAxis: {
      type: 'category',
      data: xAxisLabels,
      axisLine: {
        lineStyle: {
          color: '#000',
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        interval: 0,
        lineHeight: 1,
        fontSize: 7,
        fontWeight: 500,
        color: '#000',
      },
    },
    yAxis: {
      axisLabel: {
        lineHeight: 1,
        fontSize: 7,
        fontWeight: 500,
        color: '#000',
      },
      axisLine: {
        lineStyle: {
          color: '#000',
        },
      },
    },
    series,
  });

  return chart.renderToSVGString();
}
