import { zip } from 'lodash';
import { generateInsecureRandomId } from '../insecureRandomId';
import { MAX_DICE } from './constants';
import {
  TDiceRollRequest,
  TDiceRollResult,
  TDiceRollResultPart,
  TDiceRollResultPartDice,
  TDiceRollResultPartModifier,
} from './types';

export interface PerformDiceRollRequestOptions {
  randomDieRoll: (sides: number) => Promise<number>;
}

export const performDiceRollRequest = async (
  request: TDiceRollRequest,
  { randomDieRoll }: PerformDiceRollRequestOptions
): Promise<TDiceRollResult | null> => {
  const partsDieSides: number[][] = request.parts.map((part) => {
    if (part.type !== 'dice') return [];

    return Array.from({ length: part.count }, () => {
      if (['20A', '20D'].includes(part.die as string)) {
        return [20, 20];
      }

      if (typeof part.die === 'number') {
        return [part.die];
      }

      throw new Error(`Unknown die: ${part.die}`);
    }).flat(1);
  });

  if (partsDieSides.flat(1).length > MAX_DICE) {
    // eslint-disable-next-line no-console
    console.warn('Too many dice requested');
    return null;
  }

  const partsDieValues: number[][] = await Promise.all(
    partsDieSides.map((part) =>
      Promise.all(part.map((die) => randomDieRoll(die)))
    )
  );

  const parts: TDiceRollResultPart[] = zip(request.parts, partsDieValues).map(
    ([part, values]) => {
      if (part!.type === 'dice') {
        return {
          ...part,
          values,
        } as TDiceRollResultPartDice;
      }

      return part as TDiceRollResultPartModifier;
    }
  );

  return {
    ...request,
    id: generateInsecureRandomId(),
    parts,
  };
};
