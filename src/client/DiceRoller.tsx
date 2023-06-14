import React, { useState, useRef } from 'react';
import * as Icons from 'react-bootstrap-icons';
import { getDiceRollRequestPartsNotation } from '../core/dice/getDiceRollRequestPartsNotation';
import { getDiceRollResultTotal } from '../core/dice/getDiceRollResultTotal';
import { parseDiceNotation } from '../core/dice/parseDiceNotation';
import { TDiceRollResult } from '../core/dice/types';
import { useAppContext } from './appContext';
import { DiceRollResultPart } from './DiceRollResultPart';
import { ReverseScroll } from './ReverseScroll';
import { Button } from './Button';

export interface DiceRollerProps {
  diceRollResults: TDiceRollResult[];
}

export const DiceRoller = ({ diceRollResults }: DiceRollerProps) => {
  const { performDiceRoll } = useAppContext();

  const inputRef = useRef<HTMLInputElement>(null);

  const [diceNotation, setDiceNotation] = useState('');
  const [diceNotationHistory, setDiceNotationHistory] = useState<string[]>([]);
  const [diceNotationHistoryCursor, setDiceNotationHistoryCursor] =
    useState(-1);

  const diceNotationIsEmpty = diceNotation.trim().length === 0;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (diceNotationIsEmpty) return;

    const parts = parseDiceNotation(diceNotation);
    if (!parts) throw new Error('Invalid dice notation');

    performDiceRoll({
      label: getDiceRollRequestPartsNotation(parts),
      parts,
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
    <div className="h-full flex flex-col">
      <ReverseScroll className="grow px-4 pt-4 flex flex-col">
        {diceRollResults.map((result, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="p-3 flex gap-3 items-center first:rounded-t-lg last:rounded-b-lg bg-foreground border-x first:border-t border-b first:mt-auto"
          >
            <div className="flex flex-col grow">
              {result.label && (
                <div className="text-sm font-medium">{result.label}</div>
              )}

              <div className="text-xl">{getDiceRollResultTotal(result)}</div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {result.parts.map((part, index) => (
                <DiceRollResultPart
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  part={part}
                  isFirst={index === 0}
                />
              ))}
            </div>
          </div>
        ))}
      </ReverseScroll>

      <div className="p-4 flex gap-2">
        <form
          onSubmit={handleSubmit}
          className="grow border rounded-lg has-lifted-focus-ring:focus-ring flex bg-foreground"
        >
          <input
            ref={inputRef}
            type="text"
            value={diceNotation}
            onChange={(event) => setDiceNotation(event.target.value)}
            onKeyDown={handleKeyDown}
            className="grow py-2 pl-3 bg-transparent lift-focus-ring"
            placeholder="1d20 + 7"
            aria-label="Dice notation"
          />

          <Button
            type="submit"
            variant="iconSubtle"
            className="my-1 mr-1"
            disabled={diceNotationIsEmpty}
            aria-label="Submit roll"
          >
            <Icons.SendFill aria-hidden />
          </Button>
        </form>
      </div>
    </div>
  );
};
