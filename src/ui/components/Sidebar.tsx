import React from 'react';
import { useAppContext } from '../context/AppContext';
import { AppViews } from '../context/AppContext';
import prodifyLogo from '../assets/prodify.svg';
const Sidebar: React.FC = () => {
  const { activeView, setActiveView } = useAppContext();

  const getButtonClasses = (view: AppViews) => {
    const isActive = activeView === view;
    return `
      flex items-center py-2 px-4 mb-[2px] w-full h-[60px] rounded-xl
      ${isActive ? 'bg-[#121212] text-white' : 'bg-[#212121] text-[#ffffff]'}
      hover:bg-[#161616] transition duration-100 outline-none focus:outline-none
    `;
  };

  return (
    <div className="w-64 rounded-e-md bg-[#212121] text-white p-4">
      <div className='flex items-center justify-center mb-[20px]'>
        <img className='w-[100px]' src={prodifyLogo} alt="Prodify Logo" />
      </div>

      {/* Botão Dashboard */}
      <button
        className={getButtonClasses(AppViews.Dashboard)}
        onClick={() => setActiveView(AppViews.Dashboard)}
      >
        Dashboard
      </button>

      {/* Botão Texto ↔ Áudio */}
      <button
        className={getButtonClasses(AppViews.TextAudio)}
        onClick={() => setActiveView(AppViews.TextAudio)}
      >
        <span>Texto ↔ Audio</span>
      </button>

      {/* Botão Configurações */}
      <button
        className={getButtonClasses(AppViews.Settings)}
        onClick={() => setActiveView(AppViews.Settings)}
      >
        Configurações
      </button>

      {/* Botão Sobre */}
      <button
        className={getButtonClasses(AppViews.About)}
        onClick={() => setActiveView(AppViews.About)}
      >
        Sobre
      </button>
    </div>
  );
};

export default Sidebar;
