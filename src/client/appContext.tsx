import React, { createContext, useContext } from 'react';
import { useSocket } from './useSocket';

type TAppContext = {
  performDiceRoll: ReturnType<typeof useSocket>['performDiceRoll'];
};

const AppContext = createContext<TAppContext | null>(null);

export interface AppProviderProps extends TAppContext {
  children: React.ReactNode;
}

export const AppProvider = ({ children, ...value }: AppProviderProps) => {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }

  return context;
};
