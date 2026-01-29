'use client';

import React, { createContext, useContext, useState } from 'react';

type RearModeState = {
  isRearTireMode: boolean;
  setIsRearTireMode: (val: boolean) => void;
};

const RearModeContext = createContext<RearModeState | undefined>(undefined);

export const RearModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRearTireMode, setIsRearTireMode] = useState(false);

  return (
    <RearModeContext.Provider value={{ isRearTireMode, setIsRearTireMode }}>
      {children}
    </RearModeContext.Provider>
  );
};

export const useRearMode = () => {
  const ctx = useContext(RearModeContext);
  if (!ctx) {
    throw new Error('useRearMode must be used within RearModeProvider');
  }
  return ctx;
};

