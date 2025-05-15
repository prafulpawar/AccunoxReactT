import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import initialDashboardData from './initialData.json';

const widgetTemplates = [
  { id: 'template-cloud-accounts', tabKey: 'CSPM', categoryAffinity: ['cspm'], title: "Cloud Accounts", type: "doughnut", data: { labels: ["Connected", "Not Connected"], values: [10, 5], colors: ["#4ADE80", "#F87171"], total: 15 } },
  { id: 'template-cloud-risk', tabKey: 'CSPM', categoryAffinity: ['cspm'], title: "Cloud Account Risk Assessment", type: "doughnut", data: { labels: ["Risk A", "Risk B", "Risk C"], values: [20, 30, 50], colors: ["#22D3EE", "#A78BFA", "#FBBF24"], total: 100 } },
  { id: 'template-custom-text', tabKey: 'Ticket', categoryAffinity: ['cspm', 'cwpp', 'registry'], title: "Generic Text Widget", type: "text", data: { text: "This is a template text widget." } },
  { id: 'template-namespace-alerts', tabKey: 'CWPP', categoryAffinity: ['cwpp'], title: "Top 5 Namespace Specific Alerts", type: "noData", data: {} },
  { id: 'template-workload-alerts', tabKey: 'CWPP', categoryAffinity: ['cwpp'], title: "Workload Alerts", type: "noData", data: {} },
  { id: 'template-image-risk', tabKey: 'Image', categoryAffinity: ['registry'], title: "Image Risk Assessment", type: "horizontalBar", data: { totalLabel: "Template Vulns", totalValue: 100, segments: [{ "label": "Critical", "value": 10, "color": "#DC2626" }, { "label": "High", "value": 90, "color": "#F97316" }] } },
  { id: 'template-image-issues', tabKey: 'Image', categoryAffinity: ['registry'], title: "Image Security Issues", type: "horizontalBar", data: { totalLabel: "Template Images", totalValue: 5, segments: [{ "label": "High", "value": 5, "color": "#F97316" }] } },
  { id: 'template-ticket-status', tabKey: 'Ticket', categoryAffinity: ['cspm', 'cwpp'], title: "Ticket Status Overview", type: "text", data: { text: "Open Tickets: 5, Closed Tickets: 20."} }
];

export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchData',
  async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(initialDashboardData);
      }, 500);
    });
  }
);

const initialState = {
  categories: [],
  widgetTemplates: widgetTemplates,
  status: 'idle',
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addWidget: (state, action) => {
      const { categoryId, widgetData } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        const newWidget = {
          ...widgetData,
          id: widgetData.id || `${widgetData.sourceTemplateId}-${nanoid()}`
        };
        category.widgets.push(newWidget);
      }
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter(w => w.id !== widgetId);
      }
    },
    addCustomTextWidget: (state, action) => {
        const { categoryId, widgetName, widgetText } = action.payload;
        const category = state.categories.find(cat => cat.id === categoryId);
        if (category) {
            const newWidget = {
                id: `custom-${nanoid()}`,
                title: widgetName,
                type: 'text',
                data: { text: widgetText },
                sourceTemplateId: null
            };
            category.widgets.push(newWidget);
        }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  addWidget,
  removeWidget,
  addCustomTextWidget,
} = dashboardSlice.actions;

export const selectCategories = (state) => state.dashboard.categories;
export const selectWidgetTemplates = (state) => state.dashboard.widgetTemplates;
export const selectDashboardStatus = (state) => state.dashboard.status;
export const selectDashboardError = (state) => state.dashboard.error;

export default dashboardSlice.reducer;