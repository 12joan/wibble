import { zip } from 'lodash';
import { generateInsecureRandomId } from '../insecureRandomId';
import {
  TDiceRollRequest,
  TDiceRollResult,
  TDiceRollResultPart,
  TDiceRollResultPartDice,
  TDiceRollResultPartModifier,
} from '../types';
import { MAX_DICE } from './constants';
import { getDieSides } from './getDieSides';

export interface PerformDiceRollRequestOptions {
  randomDieRoll: (sides: number) => Promise<number>;
  randomId?: () => string;
}

export const performDiceRollRequest = async (
  request: TDiceRollRequest,
  {
    randomDieRoll,
    randomId = generateInsecureRandomId,
  }: PerformDiceRollRequestOptions
): Promise<TDiceRollResult | null> => {
  const partsDieSides: number[][] = request.parts.map((part) => {
    if (part.type !== 'dice') return [];

    return Array.from({ length: part.count }, () => getDieSides(part.die)).flat(
      1
    );
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
    id: randomId(),
    parts,
  };
};
