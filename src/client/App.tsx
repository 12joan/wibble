import React, { useState } from 'react';
import { TDiceRollResult } from '../core/dice/types';
import { TPostingAs } from '../core/types';
import { AppProvider } from './appContext';
import { BottomSheet } from './BottomSheet';
import { CharacterSheet } from './CharacterSheet';
import { DiceRoller } from './DiceRoller';
import { useEventEmitter } from './eventEmitter';
import { useBreakpoints } from './useBreakpoints';
import { useSocket } from './useSocket';

export const App = () => {
  const [diceRollResults, setDiceRollResults] = useState<TDiceRollResult[]>([]);
  const onPerformDiceRoll = useEventEmitter();

  const [postingAs, setPostingAs] = useState<TPostingAs>({
    id: Math.random().toString(36).substr(2, 9),
    name: 'Anonymous',
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isConnected, performDiceRoll: upstreamPerformDiceRoll } = useSocket({
    onDiceRollResult: (result) => {
      setDiceRollResults((prev) => [...prev, result]);
    },
  });

  const performDiceRoll: typeof upstreamPerformDiceRoll = (...args) => {
    upstreamPerformDiceRoll(...args);
    onPerformDiceRoll.dispatchEvent();
  };

  const characterSheet = (
    <CharacterSheet postingAs={postingAs} setPostingAs={setPostingAs} />
  );

  const { md: isDesktop } = useBreakpoints();

  const wrapControls = (children: React.ReactNode) =>
    isDesktop ? (
      children
    ) : (
      <BottomSheet header={children}>
        <div className="px-4 pb-4">{characterSheet}</div>
      </BottomSheet>
    );

  return (
    <AppProvider
      postingAs={postingAs}
      performDiceRoll={performDiceRoll}
      onPerformDiceRoll={onPerformDiceRoll}
    >
      <div className="flex h-[100dvh] relative">
        <main className="w-full md:max-w-md h-full relative">
          <DiceRoller
            diceRollResults={diceRollResults}
            wrapControls={wrapControls}
          />
        </main>

        {isDesktop && (
          <div className="grow p-8 space-y-8 bg-foreground rounded-l-xl shadow-xl">
            {characterSheet}
          </div>
        )}
      </div>
    </AppProvider>
  );
};
