import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { addWidget, removeWidget, addCustomTextWidget, selectWidgetTemplates, selectCategories } from '../features/dashboard/dashboardSlice';
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const MODAL_TABS = ['CSPM', 'CWPP', 'Image', 'Ticket'];

const AddWidgetModal = ({ isOpen, onClose, categoryId }) => {
  const dispatch = useDispatch();
  const allWidgetTemplates = useSelector(selectWidgetTemplates);
  const categories = useSelector(selectCategories);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplateIds, setSelectedTemplateIds] = useState({});
  const [activeTab, setActiveTab] = useState(MODAL_TABS[0]);
  
  const [customWidgetName, setCustomWidgetName] = useState('');
  const [customWidgetText, setCustomWidgetText] = useState('');

  const currentCategory = categories.find(cat => cat.id === categoryId);

  useEffect(() => {
    if (isOpen && currentCategory) {
      const initialSelected = {};
      allWidgetTemplates.forEach(template => {
        if (currentCategory.widgets.some(w => w.sourceTemplateId === template.id)) {
          initialSelected[template.id] = true;
        } else {
          initialSelected[template.id] = false;
        }
      });
      setSelectedTemplateIds(initialSelected);
      setActiveTab(MODAL_TABS[0]); 
    } else {
        setSearchTerm('');
        setCustomWidgetName('');
        setCustomWidgetText('');
        setSelectedTemplateIds({});
    }
  }, [isOpen, currentCategory, allWidgetTemplates]);

  if (!isOpen || !currentCategory) return null;

  const filteredTemplates = allWidgetTemplates.filter(
    template => template.tabKey === activeTab &&
                template.categoryAffinity.includes(categoryId) &&
                template.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleTemplate = (templateId) => {
    setSelectedTemplateIds(prev => ({ ...prev, [templateId]: !prev[templateId] }));
  };
  
  const handleAddCustomWidget = (e) => {
    e.preventDefault();
    if (customWidgetName.trim() && customWidgetText.trim()) {
        dispatch(addCustomTextWidget({
            categoryId,
            widgetName: customWidgetName,
            widgetText: customWidgetText
        }));
        setCustomWidgetName('');
        setCustomWidgetText('');
    }
  };

  const handleConfirm = () => {
    allWidgetTemplates
      .filter(t => t.categoryAffinity.includes(categoryId))
      .forEach(template => {
      const isCheckedInModal = !!selectedTemplateIds[template.id];
      const existingWidget = currentCategory.widgets.find(w => w.sourceTemplateId === template.id);

      if (isCheckedInModal && !existingWidget) {
        const newWidgetData = {
          ...template, 
          id: `${template.id}-${nanoid()}`,
          sourceTemplateId: template.id 
        };
        dispatch(addWidget({ categoryId, widgetData: newWidgetData }));
      } else if (!isCheckedInModal && existingWidget) {
        dispatch(removeWidget({ categoryId, widgetId: existingWidget.id }));
      }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Personalise your dashboard</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-4 border-b border-gray-200">
            <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                {MODAL_TABS.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`${
                    activeTab === tab
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
                >
                    {tab}
                </button>
                ))}
            </nav>
        </div>
        
        <div className="mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={`Search in ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="overflow-y-auto flex-grow mb-4 pr-2 space-y-2 min-h-[200px]">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template) => (
              <label key={template.id} className="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  checked={!!selectedTemplateIds[template.id]}
                  onChange={() => handleToggleTemplate(template.id)}
                />
                <span className="ml-3 text-sm text-gray-700">{template.title}</span>
              </label>
            ))
          ) : (
            <p className="text-sm text-gray-500 p-4 text-center">
                No widgets found for "{searchTerm}" in {activeTab} for this category.
            </p>
          )}
        </div>
        
        {activeTab === 'Ticket' && (
             <form onSubmit={handleAddCustomWidget} className="mb-4 p-3 border border-gray-200 rounded-md bg-gray-50">
                <h3 className="text-md font-semibold mb-2 text-gray-700">Create Custom Text Widget</h3>
                <div className="mb-2">
                    <label htmlFor="customWidgetName" className="block text-sm font-medium text-gray-700 mb-1">Widget Name</label>
                    <input 
                        type="text" 
                        id="customWidgetName"
                        value={customWidgetName}
                        onChange={(e) => setCustomWidgetName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        placeholder="E.g., Urgent Alert Summary"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="customWidgetText" className="block text-sm font-medium text-gray-700 mb-1">Widget Text</label>
                    <textarea 
                        id="customWidgetText"
                        value={customWidgetText}
                        onChange={(e) => setCustomWidgetText(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        placeholder="Enter content..."
                        rows="2"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md">
                    Add Custom Widget
                </button>
            </form>
        )}


        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetModal;