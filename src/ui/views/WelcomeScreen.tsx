import React from 'react';
import { useAppContext } from '../context/AppContext';
import prodifyLogo from '../assets/prodify.svg';

const WelcomeScreen: React.FC = () => {
  const { setShowWelcome } = useAppContext();

  const handleStart = () => {
    setShowWelcome(false); // Muda para a tela principal
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-[#9fa0ff]"> {/* Fundo escurecido para #9fa0ff */}
      {/* Div principal */}
      <div className="flex w-3/4 max-w-3xl bg-white rounded-lg shadow-lg p-6">
        {/* Lado esquerdo (botão COMEÇAR) */}
        <div className="flex-1 flex items-center justify-center p-4">
          <button
            onClick={handleStart}
            className="bg-[#324681] hover:bg-[#8e94f2] text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-300"
          >
            COMEÇAR
          </button>
        </div>

        {/* Divisória */}
        <div className="w-px bg-[#324681] mx-6"></div> {/* Divisória mais escura */}
        
        {/* Lado direito (Logo e Slogan) */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
          <img src={prodifyLogo} alt="Prodify Logo" className="h-16 mb-4" /> {/* Logo ajustada */}
          <p className="text-[#324681] font-semibold text-[16px]">{`Aumente sua produtividade sem complicação.`}</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
