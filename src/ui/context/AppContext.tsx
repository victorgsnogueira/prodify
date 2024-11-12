// AppContext.tsx

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export enum AppViews {
  Dashboard = 'dashboard',
  Settings = 'settings',
  About = 'about',
  TextAudio = 'textaudio'
}

interface AppContextProps {
  showWelcome: boolean;
  setShowWelcome: (value: boolean) => void;
  activeView: AppViews;
  setActiveView: (view: AppViews) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Verificar o localStorage para ver se a tela de boas-vindas já foi exibida
  const [showWelcome, setShowWelcome] = useState<boolean>(localStorage.getItem('welcomeShown') === null);
  const [activeView, setActiveView] = useState(AppViews.Dashboard);

  useEffect(() => {
    // Quando a tela de boas-vindas for fechada, marcamos no localStorage
    if (!showWelcome) {
      localStorage.setItem('welcomeShown', 'true');
    }
  }, [showWelcome]);

  return (
    <AppContext.Provider value={{ showWelcome, setShowWelcome, activeView, setActiveView }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
