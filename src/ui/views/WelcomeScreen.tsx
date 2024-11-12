import React from 'react';
import { useAppContext } from '../context/AppContext';
import prodifyLogo from '../assets/prodify.svg';

const WelcomeScreen: React.FC = () => {
  const { setShowWelcome } = useAppContext();

  const handleStart = () => {
    setShowWelcome(false);
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-[#121212]">
      <div className="relative flex w-4/5 max-w-4xl bg-[#000000] rounded-3xl shadow-lg overflow-hidden">
        
        <div className="w-1/2 bg-[#232121] flex flex-col justify-center p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Estamos felizes em ter você conosco!{String.fromCodePoint(0x1F389)}</h2>
          <p className="text-lg mb-6">
            Comece agora e aumente sua produtividade sem complicação.
          </p>
          <div className="flex space-x-4">
            <span className="bg-[#274ca7] rounded-full w-10 h-10 flex items-center justify-center">
            </span>
            <span className="bg-[#121212] rounded-full w-10 h-10 flex items-center justify-center">
            </span>
          </div>
        </div>

        <div className="w-1/2 bg-[#6C63FF] flex flex-col items-center justify-center p-8">
          <img src={prodifyLogo} alt="Prodify Logo" className="h-16 mb-6" />
          <button
            onClick={handleStart}
            className="bg-[#121212] hover:bg-[#282828] text-white font-bold py-3 px-12 rounded-full shadow-lg transition duration-300"
          >
            Começar
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
