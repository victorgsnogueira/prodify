import React from 'react';
import { useAppContext } from '../context/AppContext';

const Dashboard: React.FC = () => {
  const { setShowWelcome } = useAppContext();

  const resetWelcome = () => {
    localStorage.removeItem('welcomeShown');
    setShowWelcome(true);
    window.location.reload();
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold text-white">Dashboard</h1>
      <button 
        onClick={resetWelcome} 
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Resetar para Boas-vindas
      </button>
    </div>
  );
};

export default Dashboard;
