import React, { createContext, useContext } from 'react';

type TDicePickerContext = {
  isOpen: boolean;
  close: () => void;
};

const DicePickerContext = createContext<TDicePickerContext | null>(null);

export interface DicePickerProviderProps extends TDicePickerContext {
  children: React.ReactNode;
}

export const DicePickerProvider = ({
  children,
  ...value
}: DicePickerProviderProps) => {
  return (
    <DicePickerContext.Provider value={value}>
      {children}
    </DicePickerContext.Provider>
  );
};

export const useDicePickerContext = () => {
  const context = useContext(DicePickerContext);

  if (!context) {
    throw new Error(
      'useDicePickerContext must be used within a DicePickerProvider'
    );
  }

  return context;
};
