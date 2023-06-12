import React, { useState } from 'react';
import { TDiceRollResult } from '../core/dice/types';
import { AppProvider } from './appContext';
import { DiceRoller } from './DiceRoller';
import { useSocket } from './useSocket';

export const App = () => {
  const [diceRollResults, setDiceRollResults] = useState<TDiceRollResult[]>([]);

  const { isConnected, performDiceRoll } = useSocket({
    onDiceRollResult: (result) => {
      setDiceRollResults((prev) => [...prev, result]);
    },
  });

  return (
    <AppProvider performDiceRoll={performDiceRoll}>
      <div className="flex h-screen relative">
        <main className="w-full max-w-md h-full relative">
          <DiceRoller diceRollResults={diceRollResults} />
        </main>

        <div className="grow p-8 space-y-8">
          <p>isConnected: {isConnected ? 'true' : 'false'}</p>
        </div>
      </div>
    </AppProvider>
  );
};
