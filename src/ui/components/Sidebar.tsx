import React from 'react';
import { useAppContext, AppViews } from '../context/AppContext';

const Sidebar: React.FC = () => {
  const { setActiveView } = useAppContext();

  const handleNavClick = (view: AppViews) => {
    setActiveView(view);
  };

  return (
    <div className="sidebar">
      <button onClick={() => handleNavClick(AppViews.Dashboard)}>Dashboard</button>
      <button onClick={() => handleNavClick(AppViews.Settings)}>Settings</button>
      <button onClick={() => handleNavClick(AppViews.About)}>About</button>
    </div>
  );
};

export default Sidebar;
