import React from 'react';
import { useDispatch } from 'react-redux';
import { removeWidget } from '../features/dashboard/dashboardSlice';
import DoughnutChart from './charts/DoughnutChart';
import HorizontalBarChart from './charts/HorizontalBarChart';
import { XMarkIcon } from '@heroicons/react/24/solid';

const WidgetCard = ({ widget, categoryId }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeWidget({ categoryId, widgetId: widget.id }));
  };

  const renderContent = () => {
    switch (widget.type) {
      case 'doughnut':
        return <DoughnutChart data={widget.data} total={widget.data.total} />;
      case 'horizontalBar':
        return <HorizontalBarChart data={widget.data} />;
      case 'text':
        return <p className="text-sm text-gray-600 p-4 break-words">{widget.data.text}</p>;
      case 'noData':
        return (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 p-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h12M3.75 3h-1.5m1.5 0h16.5M3.75 12v6.75A2.25 2.25 0 0 0 6 21h12a2.25 2.25 0 0 0 2.25-2.25V12M3.75 12H21m-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <span>No Graph data available!</span>
          </div>
        );
      default:
        return <p className="p-4">Unsupported widget type</p>;
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-1 md:p-2 flex flex-col min-h-[180px] md:min-h-[200px]">
      <div className="flex justify-between items-center mb-1 md:mb-2 px-2 md:px-3 pt-2">
        <h3 className="text-xs md:text-sm font-semibold text-gray-700">{widget.title}</h3>
        <button
          onClick={handleRemove}
          className="text-gray-400 hover:text-red-500 transition-colors"
          title="Remove widget"
        >
          <XMarkIcon className="h-4 w-4 md:h-5 md:w-5" />
        </button>
      </div>
      <div className="flex-grow flex items-center justify-center p-1 md:p-2">
        {renderContent()}
      </div>
    </div>
  );
};

export default WidgetCard;