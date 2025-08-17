import { useMemo, useState } from 'react';
import { useChart } from '../hooks/useChart';
import { type VolatilityDataPoint } from '../api/deribit';
import { type Time } from 'lightweight-charts';

interface VolatilityChartProps {
  data: VolatilityDataPoint[];
  height?: number;
}

type TimeRange = '1D' | '1W' | '1M';
export const VolatilityChart = ({ 
  data, 
  height = 400 
}: VolatilityChartProps) => {
  const [selectedRange, setSelectedRange] = useState<TimeRange>('1M');
  const chartData = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) return [];
    
    const groups = new Map();
    
    data.forEach(point => {
      const date = new Date(point[0]);
      let groupKey;
      
      if (selectedRange === '1D') {
        groupKey = date.toDateString();
      } else if (selectedRange === '1W') {
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        groupKey = weekStart.toDateString();
      } else {
        groupKey = `${date.getFullYear()}-${date.getMonth()}`;
      }
      
      if (!groups.has(groupKey)) {
        groups.set(groupKey, []);
      }
      groups.get(groupKey).push(point);
    });
    
    return Array.from(groups.entries())
      .map(([_, groupData]) => {
        if (groupData.length === 0) return null;
        
        
        const sortedData = groupData.sort((a: VolatilityDataPoint, b: VolatilityDataPoint) => a[0] - b[0]);
        const firstPoint = sortedData[0];
        const lastPoint = sortedData[sortedData.length - 1];
        const allHighs = sortedData.map((p: VolatilityDataPoint) => p[2]);
        const allLows = sortedData.map((p: VolatilityDataPoint) => p[3]);
        
        return {
          time: Math.floor(lastPoint[0] / 1000) as Time,
          open: firstPoint[1],
          high: Math.max(...allHighs),
          low: Math.min(...allLows),
          close: lastPoint[4],
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
      .sort((a, b) => (a.time as number) - (b.time as number));
  }, [data, selectedRange]);

  const { chartContainerRef } = useChart({
    data: chartData.map(point => ({
      time: point.time,
      open: point.open,
      high: point.high,
      low: point.low,
      close: point.close,
      value: point.close
    })),
    height,
    lineColor: '#2962FF',
    lineWidth: 2,
  });

  return (
    <div className="volatilityChart">
        <nav className="timeRangeSelector" role="tablist">
          {(['1D', '1W', '1M'] as TimeRange[]).map(range => (
            <button
              key={range}
              role="tab"
              aria-selected={selectedRange === range}
              className={`rangeButton ${selectedRange === range ? 'active' : ''}`}
              onClick={() => setSelectedRange(range)}
            >
              {range}
            </button>
          ))}
        </nav>
      <figure 
        ref={chartContainerRef} 
        className="chartContainer"
        style={{ height: `${height}px` }}
      />
    </div>
  );
};
