import React from 'react';

const HorizontalBarChart = ({ data }) => {
  const totalValue = data.segments.reduce((sum, seg) => sum + seg.value, 0);

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center text-xs mb-1">
        <span>{data.totalLabel}: <strong>{data.totalValue}</strong></span>
      </div>
      <div className="w-full h-4 bg-gray-200 rounded-full flex overflow-hidden">
        {data.segments.map((segment, index) => (
          <div
            key={index}
            className="h-full"
            style={{
              width: totalValue > 0 ? `${(segment.value / totalValue) * 100}%` : '0%',
              backgroundColor: segment.color,
            }}
            title={`${segment.label}: ${segment.value}`}
          ></div>
        ))}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs mt-1">
        {data.segments.map((segment, index) => (
          <div key={index} className="flex items-center">
            <span
              className="w-2 h-2 rounded-full mr-1.5"
              style={{ backgroundColor: segment.color }}
            ></span>
            {segment.label} ({segment.value})
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalBarChart;