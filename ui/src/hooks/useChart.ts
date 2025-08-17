import { useEffect, useRef } from 'react';
import { createChart, ColorType, CandlestickSeries, type Time } from 'lightweight-charts';

interface ChartData {
  time: Time;
  open: number;
  high: number;
  low: number;
  close: number;
  value: number;
}

interface UseChartOptions {
  data: ChartData[];
  height?: number;
  lineColor?: string;
  lineWidth?: number;
}

export const useChart = ({ 
  data, 
  height = 400, 
  lineColor = '#2962FF', 
  lineWidth = 2 
}: UseChartOptions) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null);

  useEffect(() => {
    if (!data.length || !chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#231924' },
        textColor: '#ffffff',
      },
      grid: {
        vertLines: { color: 'rgba(252, 114, 255, 0.1)' },
        horzLines: { color: 'rgba(252, 114, 255, 0.1)' },
      },
      rightPriceScale: {
        borderColor: 'rgba(252, 114, 255, 0.2)',
        textColor: '#ffffff',
      },
      timeScale: {
        borderColor: 'rgba(252, 114, 255, 0.2)',
      },
      crosshair: {
        mode: 1,
      },
      width: chartContainerRef.current.clientWidth,
      height,
    });

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#3ab561',
      downColor: '#f16054',
      borderVisible: false,
      wickUpColor: '#3ab561',
      wickDownColor: '#f16054',
    });

    candlestickSeries.setData(data);
    chart.timeScale().fitContent();
    chartRef.current = chart;

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({ 
          width: chartContainerRef.current.clientWidth 
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartRef.current?.remove();
      chartRef.current = null;
    };
  }, [data, height, lineColor, lineWidth]);

  return { chartContainerRef };
};
