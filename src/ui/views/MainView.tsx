import React from 'react';
import Sidebar from '../components/Sidebar';
import ContentArea from '../components/ContentArea';
import Dashboard from './Dashboard';
import { useAppContext } from '../context/AppContext';

const MainView: React.FC = () => {
  const { activeView } = useAppContext();

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'settings':
        return <div>Settings Page</div>;
      case 'about':
        return <div>About Page</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-full">
      <Sidebar />
      <ContentArea>
        {renderContent()}
      </ContentArea>
    </div>
  );
};

export default MainView;