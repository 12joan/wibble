import { ContextProviderProps, createContext } from '../createContext';

type TDicePickerContext = {
  isOpen: boolean;
  close: () => void;
};

export type DicePickerProviderProps = ContextProviderProps<TDicePickerContext>;
export const [DicePickerProvider, useDicePickerContext] =
  createContext<TDicePickerContext>();
