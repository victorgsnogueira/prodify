import React from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from './Dashboard';
import TextSpeech from './TextSpeech';
import { useAppContext } from '../context/AppContext';

const MainView: React.FC = () => {
  const { activeView } = useAppContext();

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'textaudio':
        return <TextSpeech />;
      case 'settings':
        return <div>Settings Page</div>;
      case 'about':
        return <div>About Page</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-full w-full bg-[#121212]">
      <Sidebar />
      {renderContent()}
    </div>
  );
};

export default MainView;
