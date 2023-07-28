import { ContextProviderProps, createContext } from './createContext';
import { TEventEmitter } from './eventEmitter';
import { TProfilesStore, TProfileStore } from './profilesStore';
import { useSocket } from './useSocket';

import { TDiceRollResult, TPostingAs } from '~/core/types';

type TAppContext = {
  isConnected: boolean;
  profilesStore: TProfilesStore;
  currentProfileStore: TProfileStore;
  diceRollResults: TDiceRollResult[];
  deletedDiceRollIds: TDiceRollResult['id'][];
  postingAs: TPostingAs;
  performDiceRoll: ReturnType<typeof useSocket>['performDiceRoll'];
  deleteDiceRoll: ReturnType<typeof useSocket>['deleteDiceRoll'];
  onPerformDiceRoll: TEventEmitter;
  onBottomSheetOpenChange: TEventEmitter<[boolean]>;
};

export type AppProviderProps = ContextProviderProps<TAppContext>;
export const [AppProvider, useAppContext] = createContext<TAppContext>();
