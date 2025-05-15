import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCategories,
  fetchDashboardData,
  selectDashboardStatus,
  selectDashboardError,
} from '../features/dashboard/dashboardSlice';
import CategorySection from '../components/CategorySection';
import Header from '../components/Header';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const status = useSelector(selectDashboardStatus);
  const error = useSelector(selectDashboardError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDashboardData());
    }
  }, [status, dispatch]);

  let content;

  if (status === 'loading' || status === 'idle') {
    content = <div className="p-10 text-center text-xl font-semibold text-gray-600">Loading dashboard...</div>;
  } else if (status === 'succeeded') {
    content = categories.map((category) => (
      <CategorySection key={category.id} category={category} />
    ));
  } else if (status === 'failed') {
    content = <div className="p-10 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto p-3 md:p-6">
        {content}
      </main>
    </div>
  );
};

export default DashboardPage;