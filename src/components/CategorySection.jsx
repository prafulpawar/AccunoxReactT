import React, { useState } from 'react';
import WidgetCard from './WidgetCard';
import AddWidgetModal from './AddWidgetModal';
import { PlusIcon } from '@heroicons/react/24/solid';

const CategorySection = ({ category }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3 md:mb-4">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">{category.name}</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs md:text-sm font-medium py-1.5 px-2.5 md:py-2 md:px-3 rounded-md flex items-center"
        >
          <PlusIcon className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-1.5" />
          Add Widget
        </button>
      </div>
      {category.widgets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
          {category.widgets.map((widget) => (
            <WidgetCard key={widget.id} widget={widget} categoryId={category.id} />
          ))}
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg p-10 text-center text-gray-500">
            No widgets in this category. Click "Add Widget" to add some.
        </div>
      )}
      <AddWidgetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categoryId={category.id}
      />
    </div>
  );
};

export default CategorySection;