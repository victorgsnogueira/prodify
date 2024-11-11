import React from 'react';

const ContentArea: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-3/4 p-8 bg-gray-700">
      {children}
    </div>
  );
};

export default ContentArea;
