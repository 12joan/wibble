import React, { useMemo, useRef, useState } from 'react';
import * as Icons from 'react-bootstrap-icons';
import { getDiceRollRequestPartsNotation } from '../core/dice/getDiceRollRequestPartsNotation';
import { parseDiceNotation } from '../core/dice/parseDiceNotation';
import { useAppContext } from './appContext';
import { Button } from './Button';
import { InputGroup } from './Input';

export const DiceRollerNotationInput = () => {
  const { performDiceRoll, postingAs, isConnected } = useAppContext();

  const inputRef = useRef<HTMLInputElement>(null);

  const [diceNotation, setDiceNotation] = useState('');
  const [diceNotationHistory, setDiceNotationHistory] = useState<string[]>([]);
  const [diceNotationHistoryCursor, setDiceNotationHistoryCursor] =
    useState(-1);

  const diceNotationIsEmpty = diceNotation.trim().length === 0;

  const parsedDiceNotation = useMemo(
    () => parseDiceNotation(diceNotation),
    [diceNotation]
  );

  const diceNotationIsValid = parsedDiceNotation !== null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (diceNotationIsEmpty || !diceNotationIsValid) return;

    performDiceRoll({
      label: getDiceRollRequestPartsNotation(parsedDiceNotation),
      postingAs,
      parts: parsedDiceNotation,
    });

    setDiceNotationHistory((history) => {
      const newHistory = [...history];
      if (diceNotationHistoryCursor !== -1) {
        // Remove old entry from history
        newHistory.splice(diceNotationHistoryCursor, 1);
      }

      newHistory.unshift(diceNotation);
      return newHistory;
    });

    setDiceNotationHistoryCursor(-1);
    setDiceNotation('');

    inputRef.current!.focus();
  };

  const stepThroughDiceNotationHistory = (step: number) => {
    const newCursor = diceNotationHistoryCursor + step;
    if (newCursor < -1 || newCursor >= diceNotationHistory.length) return;
    setDiceNotationHistoryCursor(newCursor);

    if (newCursor === -1) {
      setDiceNotation('');
    } else {
      setDiceNotation(diceNotationHistory[newCursor]);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      stepThroughDiceNotationHistory(1);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      stepThroughDiceNotationHistory(-1);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contents">
      <InputGroup className="grow">
        <InputGroup.Input
          ref={inputRef}
          value={diceNotation}
          onChange={(event) => setDiceNotation(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="1d20 + 7"
          aria-label="Dice notation"
        />

        <Button
          type="submit"
          shape="icon"
          color="subtle"
          className="my-1 mr-1"
          disabled={diceNotationIsEmpty || !diceNotationIsValid || !isConnected}
          aria-label="Submit roll"
          // TODO: Use a real tooltip
          title={diceNotationIsValid ? undefined : 'Invalid notation'}
        >
          <Icons.SendFill aria-hidden className="w-6" />
        </Button>
      </InputGroup>
    </form>
  );
};
