import React, { useState } from 'react';
import { getDiceRollResultTotal } from '../core/dice/getDiceRollResultTotal';
import { parseDiceNotation } from '../core/dice/parseDiceNotation';
import { TDiceRollResult, TDie } from '../core/dice/types';
import { useAppContext } from './appContext';
import { DiceRollResultPart } from './DiceRollResultPart';
import { getDieShape } from './dieShapes';
import { DieButtonSVG } from './DieSVG';
import { ReverseScroll } from './ReverseScroll';

export interface DiceRollerProps {
  diceRollResults: TDiceRollResult[];
}

export const DiceRoller = ({ diceRollResults }: DiceRollerProps) => {
  const { performDiceRoll } = useAppContext();
  const [diceNotation, setDiceNotation] = useState('');
  const [diceNotationHistory, setDiceNotationHistory] = useState<string[]>([]);
  const [diceNotationHistoryCursor, setDiceNotationHistoryCursor] =
    useState(-1);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (/^\s*$/.test(diceNotation)) return;
    const parts = parseDiceNotation(diceNotation);
    if (!parts) throw new Error('Invalid dice notation');
    performDiceRoll({ label: diceNotation, parts });

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
      <ReverseScroll className="grow px-4 pt-4">
        {diceRollResults.map((result, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="p-3 flex gap-3 items-center first:rounded-t-lg last:rounded-b-lg bg-foreground border-x first:border-t border-b"
          >
            <div className="flex flex-col grow">
              {result.label && (
                <div className="text-sm font-medium">{result.label}</div>
              )}

              <div className="text-xl">{getDiceRollResultTotal(result)}</div>
            </div>

            <div className="flex flex-wrap items-center">
              {result.parts.map((part, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <DiceRollResultPart key={index} part={part} />
              ))}
            </div>
          </div>
        ))}
      </ReverseScroll>

      <div className="p-4 flex gap-2">
        <form
          onSubmit={handleSubmit}
          className="grow border rounded-lg focus-within:ring-2 ring-blue-500 flex bg-foreground"
        >
          <input
            type="text"
            value={diceNotation}
            onChange={(event) => setDiceNotation(event.target.value)}
            onKeyDown={handleKeyDown}
            className="grow py-2 pl-3 bg-transparent outline-none"
            placeholder="1d20 + 7"
            aria-label="Dice notation"
          />

          <button
            type="submit"
            className="p-2 my-2 mr-2 h-8 w-8 rounded-lg bg-slate-300 dark:bg-slate-700"
          />
        </form>
      </div>
    </div>
  );
};
