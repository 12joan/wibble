import React, { useMemo } from 'react';
import { useAppContext } from '../appContext';
import { InputGroup } from '../Input';
import { useOverridable } from '../useOverridable';
import { BackAndCancel } from './BackAndCancel';
import { useDicePickerContext } from './dicePickerContext';
import { MenuItem, NavMenuItem } from './MenuItem';
import {
  TDicePickerState,
  useDicePickerState,
  useNavigateWithState,
} from './state';

import { getDiceRollRequestPartsNotation } from '~/core/dice/getDiceRollRequestPartsNotation';
import { parseDiceNotation } from '~/core/dice/parseDiceNotation';

const removeLastPart = (state: TDicePickerState): TDicePickerState => ({
  ...state,
  diceRollRequestParts: state.diceRollRequestParts.slice(0, -1),
});

export const ReviewDiceRoll = () => {
  const navigate = useNavigateWithState();
  const { performDiceRoll, postingAs, isConnected } = useAppContext();
  const { close } = useDicePickerContext();
  const { diceRollRequestParts, label } = useDicePickerState();
  const hasOnePart = diceRollRequestParts.length === 1;

  const setLabel = (label: string) => {
    navigate('/review-dice-roll', {
      transformState: (state) => ({
        ...state,
        label,
      }),
      replace: true,
    });
  };

  const notation = useMemo(
    () => getDiceRollRequestPartsNotation(diceRollRequestParts),
    [diceRollRequestParts]
  );

  const [temporaryNotation, setTemporaryNotation] = useOverridable(notation);
  const parsedNotation = useMemo(
    () => parseDiceNotation(temporaryNotation),
    [temporaryNotation]
  );

  const overriddenDiceRollRequestParts =
    parsedNotation && parsedNotation.length > 0
      ? parsedNotation
      : diceRollRequestParts;

  const commitOverride = () => {
    if (!parsedNotation || parsedNotation.length === 0) {
      setTemporaryNotation(notation);
      return;
    }

    navigate('/review-dice-roll', {
      transformState: (state) => ({
        ...state,
        diceRollRequestParts: parsedNotation,
      }),
      replace: true,
    });

    setTemporaryNotation(getDiceRollRequestPartsNotation(parsedNotation));
  };

  const handleConfirmRoll = () => {
    performDiceRoll({
      label: /[^\s]/.test(label) ? label : notation,
      postingAs,
      parts: overriddenDiceRollRequestParts,
    });

    close();
  };

  const submitOnEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleConfirmRoll();
    }
  };

  return (
    <>
      <BackAndCancel />

      <h1 className="font-medium">What&apos;s next?</h1>

      <div>
        <InputGroup className="rounded-b-none border-b-0">
          <InputGroup.Input
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            onKeyDown={submitOnEnter}
            aria-label="Dice roll label"
            placeholder="Add a label"
            className="rounded-b-none border-b-0"
          />
        </InputGroup>

        <InputGroup className="rounded-t-none">
          <InputGroup.Input
            value={temporaryNotation}
            onChange={(event) => setTemporaryNotation(event.target.value)}
            onKeyDown={submitOnEnter}
            onBlur={commitOverride}
            aria-label="Dice notation"
          />
        </InputGroup>
      </div>

      <div>
        <NavMenuItem to="/pick-die-type" children="Add dice" />
        <NavMenuItem to="/pick-modifier" children="Add modifier" />

        <NavMenuItem
          to={hasOnePart ? '/pick-die-type' : '/review-dice-roll'}
          transformState={removeLastPart}
          className="text-danger"
        >
          Remove last part
        </NavMenuItem>
      </div>

      <div>
        <MenuItem
          className="text-primary"
          disabled={!isConnected}
          onClick={handleConfirmRoll}
          children="Confirm roll"
        />
      </div>
    </>
  );
};
