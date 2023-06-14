import React, { useState } from 'react';
import { TDiceRollResult } from '../core/dice/types';
import { TPostingAs } from '../core/types';
import { AppProvider } from './appContext';
import { CharacterSheet } from './CharacterSheet';
import { DiceRoller } from './DiceRoller';
import { useSocket } from './useSocket';

export const App = () => {
  const [diceRollResults, setDiceRollResults] = useState<TDiceRollResult[]>([]);

  const [postingAs, setPostingAs] = useState<TPostingAs>({
    id: Math.random().toString(36).substr(2, 9),
    name: 'Anonymous',
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isConnected, performDiceRoll } = useSocket({
    onDiceRollResult: (result) => {
      setDiceRollResults((prev) => [...prev, result]);
    },
  });

  return (
    <AppProvider postingAs={postingAs} performDiceRoll={performDiceRoll}>
      <div className="flex h-screen relative">
        <main className="w-full max-w-md h-full relative">
          <DiceRoller diceRollResults={diceRollResults} />
        </main>

        <div className="grow p-8 space-y-8 bg-foreground rounded-l-xl shadow-xl max-md:hidden">
          <CharacterSheet postingAs={postingAs} setPostingAs={setPostingAs} />
        </div>
      </div>
    </AppProvider>
  );
};
