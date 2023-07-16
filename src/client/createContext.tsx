import React, {
  createContext as createContextReact,
  useContext as useContextReact,
} from 'react';

export type ContextProviderProps<T> = T & {
  children: React.ReactNode;
};

export const createContext = <T,>() => {
  const Context = createContextReact<T | null>(null);

  const Provider = ({ children, ...value }: ContextProviderProps<T>) => (
    <Context.Provider value={value as T} children={children} />
  );

  const useContext = () => {
    const context = useContextReact(Context);

    if (!context) {
      throw new Error('useContext must be used within a provider');
    }

    return context;
  };

  return [Provider, useContext] as const;
};
