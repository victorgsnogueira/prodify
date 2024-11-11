import React from 'react';
import { useAppContext } from './context/AppContext';
import WelcomeScreen from './views/WelcomeScreen';
import MainView from './views/MainView';

const App: React.FC = () => {
  const { showWelcome } = useAppContext();

  return (
    <div className="h-screen w-screen bg-gray-800 text-white">
      {showWelcome ? <WelcomeScreen /> : <MainView />}
    </div>
  );
};

export default App;