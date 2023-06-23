import React, { useState } from 'react';
import { TDiceRollResult } from '../core/dice/types';
import { TPostingAs } from '../core/types';
import { Panel } from './panel/Panel';
import { AppProvider } from './appContext';
import { BottomSheet } from './BottomSheet';
import { DiceRoller } from './DiceRoller';
import { useEventEmitter } from './eventEmitter';
import { useCurrentProfileStore, useProfilesStore } from './profilesStore';
import { useBreakpoints } from './useBreakpoints';
import { useSocket } from './useSocket';

export const App = () => {
  const [diceRollResults, setDiceRollResults] = useState<TDiceRollResult[]>([]);
  const onPerformDiceRoll = useEventEmitter();
  const onBottomSheetOpenChange = useEventEmitter<[boolean]>();

  const profilesStore = useProfilesStore();
  const currentProfileStore = useCurrentProfileStore(profilesStore);
  const currentProfile = currentProfileStore.get();

  const postingAs: TPostingAs = {
    id: currentProfile.id,
    name: currentProfile.postingAsName,
  };

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

  const { md: isDesktop } = useBreakpoints();

  const wrapControls = (children: React.ReactNode) =>
    isDesktop ? (
      children
    ) : (
      <BottomSheet header={children}>
        <div className="p-4">
          <Panel />
        </div>
      </BottomSheet>
    );

  return (
    <AppProvider
      profilesStore={profilesStore}
      currentProfileStore={currentProfileStore}
      postingAs={postingAs}
      performDiceRoll={performDiceRoll}
      onPerformDiceRoll={onPerformDiceRoll}
      onBottomSheetOpenChange={onBottomSheetOpenChange}
    >
      <div className="flex h-[100dvh] relative">
        <main className="shrink-0 w-full md:max-w-md h-full relative">
          <DiceRoller
            diceRollResults={diceRollResults}
            wrapControls={wrapControls}
          />
        </main>

        {isDesktop && (
          <aside className="grow p-8 bg-foreground rounded-l-xl shadow-xl overflow-y-auto">
            <Panel />
          </aside>
        )}
      </div>
    </AppProvider>
  );
};
