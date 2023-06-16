import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { TDiceRollRequestPart, TDie } from '~/core/dice/types';

export type TDicePickerState = {
  diceRollRequestParts: TDiceRollRequestPart[];
  composingDie: TDie | null;
};

const initialState: TDicePickerState = {
  diceRollRequestParts: [],
  composingDie: null,
};

export const useDicePickerState = () => {
  const { state } = useLocation();
  return (state ?? initialState) as TDicePickerState;
};

export type NavigateOptions = {
  to: number | string;
  transformState?: (state: TDicePickerState) => TDicePickerState;
  replace?: boolean;
};

export const useNavigateWithState = () => {
  const navigate = useNavigate();
  const state = useDicePickerState();

  return useCallback(
    ({ to, transformState = (state) => state, replace }: NavigateOptions) => {
      if (typeof to === 'number') {
        navigate(to);
      } else {
        navigate(to, {
          state: transformState(state),
          replace,
        });
      }
    },
    [navigate, state]
  );
};

export const DebugState = () => {
  const state = useDicePickerState();

  return <pre className="text-xs">{JSON.stringify(state, null, 2)}</pre>;
};
