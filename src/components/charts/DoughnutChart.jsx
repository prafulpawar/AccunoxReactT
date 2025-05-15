import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ data, total }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Dataset',
        data: data.values,
        backgroundColor: data.colors,
        borderColor: data.colors.map(color => color + 'B3'),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 12,
          padding: 15,
          font: { size: 10 }
        }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += context.parsed;
            }
            return label;
          }
        }
      }
    },
    cutout: '60%',
  };

  return (
    <div className="relative h-40 w-full flex items-center justify-center">
      <Doughnut data={chartData} options={options} />
      {total !== undefined && (
        <div className="absolute text-center">
          <div className="text-xl font-bold">{total}</div>
          <div className="text-xs text-gray-500">Total</div>
        </div>
      )}
    </div>
  );
};

export default DoughnutChart;